<!-- components/Toast.vue -->
<template>
  <div class="fixed top-5 right-5 z-50">
    <transition-group name="fade" tag="div">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        :class="[
          'mb-2 px-4 py-2 rounded text-white cursor-pointer',
          {
            'bg-blue-500': toast.type === 'info',
            'bg-green-500': toast.type === 'success',
            'bg-orange-500': toast.type === 'warning',
            'bg-red-500': toast.type === 'error'
          }
        ]"
        @click="removeToast(index)"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  toasts: {
    type: Array,
    default: () => [],
  },
});

// Function to remove toast; you might want to emit this or handle it differently
const removeToast = (index: number) => {
  // Handle toast removal logic
};
</script>
