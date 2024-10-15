<template>
  <div class="flex items-end justify-between">
    <div class="flex items-end">
      <div class="w-[100px]">
        <label for="" class="mr-2 pageSize text-s4 text-secondary-800">Page Size:</label>
        <VSelect v-model="selectedPageSize" placeholder="" :items="pageSizes" :hideCheckIcon="true"></VSelect>
      </div>
      <span class="ml-2 mb-[5px] text-s3">Total records:{{totalPages}}</span>
    </div>
    <div class="flex items-center">
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded text-s4 text-secondary-800"
      >«</button>
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded text-s4 text-secondary-800"
      >‹</button>
      <button
        v-if="currentPage - 1 > 1"
        @click="goToPage(1)"
        :class="['px-3 py-1 border rounded text-s4 text-secondary-800', { 'bg-primary-400 text-white': 1 === currentPage }]"
      >1</button>
      <button
        v-if="currentPage - 1 > 1"
        class="px-3 py-1 border rounded text-s4 text-secondary-800"
      >....</button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="['px-3 py-1 border rounded text-s4 text-secondary-800', { 'bg-primary-400 text-white': page === currentPage }]"
      >{{ page }}</button>
      <button
        v-if="totalPages - 2 >= currentPage"
        class="px-3 py-1 border rounded text-s4 text-secondary-800"
      >....</button>
      <button
        v-if="currentPage != totalPages && totalPages - 2 >= currentPage"
        @click="goToPage(totalPages)"
        :class="['px-3 py-1 border rounded text-s4 text-secondary-800', { 'bg-primary-400 text-white': totalPages === currentPage }]"
      >{{ totalPages }}</button>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded text-s4 text-secondary-800"
      >›</button>
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded text-s4 text-secondary-800"
      >»</button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import VSelect from "@/components/ui/Select/Select.vue";
// Props to pass into the component
const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  },
  // totalRecord: {
  //   type: Number,
  //   required: true,
  // },
  modelValue: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
});

const emit = defineEmits([
  "update:modelValue",
  "update:modelPageSize",
  "changePage"
]);

const pageSizes = ref([
  { value: 20, text: "20" },
  { value: 50, text: "50" },
  { value: 100, text: "100" }
]);
// Local states for pagination
const currentPage = ref(props.modelValue);
const selectedPageSize = ref(props.pageSize);

// console.log('totalRecord:', props.totalRecord);

const visiblePages = computed(() => {
  const pages = [];
  const startPage = Math.max(1, currentPage.value - 1);
  const endPage = Math.min(props.totalPages, currentPage.value + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page: number) => {
  currentPage.value = page;
  emitUpdate();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const goToNextPage = () => {
  if (currentPage.value < props.totalPages) {
    goToPage(currentPage.value + 1);
  }
};

const emitUpdate = () => {
  emit("update:modelValue", currentPage.value);
  emit("changePage");
};

const onPageSizeChange = () => {
  emit("changePage");
};
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
