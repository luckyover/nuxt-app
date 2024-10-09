<template>
    <div v-if="isLoading" class="loading-spinner">
      <!-- You can customize this with a spinner or loading message -->
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAppStore } from "@/stores/app";
  
  const loadingStore = useAppStore();
  const isLoading = computed(() => loadingStore.isLoading);
  </script>
  
  <style scoped>
  .loading-spinner {
    /* Add your loading spinner styles here */
  }
  </style>
  