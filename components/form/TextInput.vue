<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
const model = defineModel<string>({ required: true });
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  autocomplete: {
    // Thêm thuộc tính autocomplete
    type: String,
    default: "",
  },
  maxlength: {
    type: Number,
    default: 255,
  },
});

const inputRef = ref<HTMLInputElement | null>(null);
const appStore = useAppStore();
const { errors } = storeToRefs(appStore);

const inputClasses = computed(() => {
  return `mt-1 block w-full p-2  text-gray-800 text-sm pl-2 border rounded-md h-[32px]
           ${errors.value[props.name] ? "border-red-600" : "border-gray-300"} 
           focus:border-primary-400 focus:ring-1 focus:ring-primary-200 focus:outline-none`;
});

watch(
  () => errors.value[props.name],
  (newValue) => {
    if (newValue && Object.keys(errors.value)[0] == props.name) {
      if (inputRef.value) {
        inputRef.value.focus(); // Tự động focus vào ô input khi có lỗi
      }
    }
  }
);
</script>

<template>
  <div class="mb-1">
    <label class="block text-s4 text-secondary-800">{{ label }}</label>
    <input
      :type="type"
      v-model="model"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', modelValue)"
      :placeholder="placeholder"
      :class="inputClasses"
      :autocomplete="autocomplete"
      ref="inputRef"
    />
    <span
      v-if="errors[name] && errors[name].length > 0"
      class="text-red-600 text-s3"
    >
      {{ errors[name][0] }}
    </span>
  </div>
</template>
