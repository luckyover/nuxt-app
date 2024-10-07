<template>
  <div class="relative">
    <button 
      @click="toggleDropdown" 
      class="bg-blue-500 text-white p-2 rounded"
    >
      {{ selectedOption || "Select an option" }}
    </button>
    <div 
      v-if="isOpen" 
      class="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10"
    >
      <ul class="max-h-60 overflow-y-auto">
        <li 
          v-for="option in options" 
          :key="option" 
          @click="selectOption(option)" 
          class="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const selectedOption = ref(null);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
