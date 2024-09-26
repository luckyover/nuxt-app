<template>
    <button
      :class="buttonClasses"
      :type="type"
      :disabled="disabled"
      @click="handleClick"
    >
      <slot></slot> <!-- Default slot for button content -->
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
    },
  });
  
  const buttonClasses = computed(() => {
    const baseClasses = 'px-4 py-2 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-600',
      secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      // Add more variants as needed
    };
    return `${baseClasses} ${variants[props.variant]}`;
  });
  
  const handleClick = (event: Event) => {
    if (props.disabled) {
      event.preventDefault(); // Prevent click event if disabled
    }
  };
  </script>

  