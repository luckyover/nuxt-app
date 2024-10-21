<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

const isLoadingModal = computed(() => appStore.isLoadingModal);

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    persistent?: boolean
    fullscreen?: boolean
    title?: string
    size?: string
  }>(),
  {
    modelValue: false,
    persistent: false,
    fullscreen: false,
    title: '',
    size:'xl'
  },
)

const sizeClass = computed(() => {
    return {
        'sm': 'sm:max-w-[50%]',
        'md': 'sm:max-w-[60%]',
        'lg': 'sm:max-w-[70%]',
        'xl': 'sm:max-w-[80%]',
        '2xl': 'sm:max-w-[90%]'
    }[props.size]
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'modalClosed'): void; // Define the new event here
  (e: 'modalOpen'): void; // Define the new event here
}>()

const { modelValue } = toRefs(props)

const isOpen = ref(modelValue.value)

watch(modelValue, (value) => {
  isOpen.value = value
})

function closeModal() {
  isOpen.value = false
  emit('modalClosed'); 
}

function openModal() {
  isOpen.value = true
  emit('modalOpen');
}

function onModalClose() {
  if (!props.persistent)
    closeModal()
}

watch(isOpen, (value) => {
  emit('update:modelValue', value)
})

const api = {
  isOpen,
  open: openModal,
  close: closeModal,
}

provide('modal', api)
</script>

<template>
  <ClientOnly>
    <slot name="activator" :open="openModal" :on="{ click: openModal }" />
     <Teleport to="body">
        <div v-if="isOpen" class="main-popup fixed inset-0 px-3 py-6 z-[101]" scroll-region
            >
            <div class="fixed inset-0 transform transition-all" @click="onModalClose" >
                <div class="absolute inset-0 bg-gray-500 opacity-25" />
            </div>

            <Transition enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100" enter-active-class="ease-out duration-300"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
                leave-active-class="ease-in duration-500" appear>
                <div v-if="isOpen"
                    class="relative  max-h-[90vh] mb-6 bg-white rounded-lg overflow-hidden shadow-lg shadow-primary-300 transform transition-all sm:w-full sm:mx-auto"
                    :class="sizeClass">
                    <div class="relative w-full max-h-full">
                        <div class="relative bg-white rounded-lg shadow-lg shadow-primary-300 ">
                            <div
                                class="flex bg-primary-300 items-center justify-between p-4 md:p-2 border-b rounded-t ">
                                <h3 class="text-sm text-wh-100  px-3">{{ props.title }}</h3>
                              
                                <Icon name="mdi:close"  @click="onModalClose"   class="size-5 cursor-pointer text-white  hover:text-gray-200"></Icon>
                            </div>
                            <div class="p-4 md:p-5 overflow-y-auto max-h-[750px]">
                                <slot name="body"></slot>
                            </div>
                            <div class="border-t rounded-b bg-gray-100">
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </div>
                    <LoadingSpinner v-if="isLoadingModal"/>
                </div>
                  
            </Transition>
          
        </div>
    </Teleport>
  </ClientOnly>
</template>
