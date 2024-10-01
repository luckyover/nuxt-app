<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    open: {
    type: Boolean,
    default: ''
  },
});
const isOpen = ref<Boolean>(props.open)
const toggleCollapse = () => {
    isOpen.value = !isOpen.value
}
const classIcon = computed (()=>{
    return isOpen.value ? 'ph:minus-fill' : 'ph:plus-fill';
})
</script>
<template>
      
      
    <div class="flex items-center mt-2">
        <div class="text-white cursor-pointer flex ml-[-3px]" @click="toggleCollapse">
            <Icon :name="classIcon" class="size-7 bg-black"></Icon>
        </div>
        <div class="text-sm pl-2 ">Advanced Search</div>
    </div>

    <div class="wrapper-content grid duration-500 ease-out mt-2 "
        :class="isOpen ? 'is-open grid-rows-[1fr]' : 'grid-rows-[0fr]'">
        <div class="overflow-hidden bg-gray-100 rounded ">
            <div class="px-3 py-2">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
    <div class="mt-2">
        <slot name="suffix"></slot>
    </div>
</template>
