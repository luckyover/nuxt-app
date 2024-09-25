<!-- components/Toast.vue -->
<template>
  <div class="fixed top-5 right-5 z-50">
    <transition-group name="fade" tag="div" appear>
      <div v-for="(toast, index) in toasts" :key="index"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
         class="transition-all duration-300 ease-linear"
      >
        <div
          class="flex mb-2 items-center border-l-4  bg-white border border-gray-300 p-3 rounded-lg shadow-lg max-w-sm"
          :class="{
              'border-l-green-500':toast.type === 'success',
              'border-l-red-500':toast.type === 'error',
              'border-l-blue-500': toast.type === 'info',
              'border-l-orange-500': toast.type === 'warning'
          }"
             
        >
  
          <!-- Icon and message content -->
          <div class="flex items-center flex-grow">

            <Icon :name="iconNames[toast.type]" 
            class="w-6 h-6 text-green-500 mr-2"
            :class="iconClasses[toast.type]"
             />
        

            <div>
              <p class="font-semibold text-gray-900">Thành công!</p>
              <p class="text-sm text-gray-600">Bạn đã đăng ký thành công tài khoản tại F8.</p>
            </div>
          </div>

          <!-- Close button -->
          <button class="text-gray-400 hover:text-gray-600" @click="removeToast(index)">
            <Icon name="mdi:remove" 
            class="w-6 h-6"
           
             />
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  toasts: {
    type: Array,
    default: () => []
  }
});

// Computed property for icon names
const iconNames = computed(() => ({
  success: 'heroicons-solid:check-circle',
  error: 'fa-solid:exclamation-circle',
  info: 'heroicons-solid:information-circle',
  warning: 'heroicons-solid:exclamation',
}));

// Computed property for icon classes
const iconClasses = computed(() => ({
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-orange-500',
}));

// Function to remove toast; you might want to emit this or handle it differently
const removeToast = (index: number) => {
  // Handle toast removal logic
    props.toasts.splice(index, 1);
};
</script>
