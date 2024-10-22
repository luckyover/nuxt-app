<script setup lang="ts">
import { ref } from "vue";
import { useFindFirstFocusableElement } from "@/composables/useFindFirstFocusableElement";
const props = defineProps({
  open: {
    type: Boolean,
    default: "",
  },
});
const emit = defineEmits(["update:open"]);
const collapseWrap = ref<HTMLElement | null>(null); // Reference to the collapsible content

const isOpen = ref<Boolean>(props.open);
const toggleCollapse = () => {
  isOpen.value = !isOpen.value;
  emit("update:open", isOpen.value);
  focusFirst()
  
};
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);
const focusFirst = () => {
  if(collapseWrap.value && isOpen.value == true){
    useFindFirstFocusableElement(collapseWrap.value);
  }
}
onMounted(() => {
  focusFirst()
});
const classIcon = computed(() => {
  return isOpen.value ? "ph:minus-fill" : "ph:plus-fill";
});
</script>
<template>
  <div class="flex items-center mt-2">
    <div
      class="text-white cursor-pointer flex ml-[-3px]"
      @click="toggleCollapse"
    >
      <Icon :name="classIcon" class="size-7 bg-black"></Icon>
    </div>
    <div class="text-s4 pl-2 text-secondary-800">Advanced Search</div>
  </div>

  <div
    class="wrapper-content grid duration-400 ease-out mt-2 text-s4 text-secondary-800"
    :class="isOpen ? 'is-open grid-rows-[1fr]' : 'grid-rows-[0fr]'"
  >
    <div class="overflow-hidden bg-gray-100 rounded" ref="collapseWrap">
      <div class="px-3 py-2">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
  <div class="mt-2">
    <slot name="suffix"></slot>
  </div>
</template>
