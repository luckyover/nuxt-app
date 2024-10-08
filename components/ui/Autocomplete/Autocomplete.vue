<script setup lang="ts">
import type { PropType } from "vue";
import { computed, ref } from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from "@headlessui/vue";

import PopupCategory from "@/components/popup/category/Category.vue";

interface Item extends Record<string, any> {
  value: string | number;
  text: string;
}

type ModelValue = Item | Item[] | undefined | null;

const props = defineProps({
  modelValue: {
    type: Object as PropType<ModelValue>,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  items: {
    type: Array as PropType<Item[]>,
    default: () => [] as Item[],
  },
  itemText: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  itemValue: {
    type: String,
    default: "value",
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
  popup_name: {
    type: String,
    default: "",
  },
});

const isOpen = ref(false);

const popup = computed(() => {
  switch (props.popup_name) {
    case "Category":
      return PopupCategory;
    default:
      return undefined;
  }
});

const emit = defineEmits<{
  (e: "update:modelValue", value: ModelValue | ModelValue[]): void;
}>();

const defaultValue = props.multiple
  ? Array.isArray(props.modelValue)
    ? props.modelValue
    : [props.modelValue] // Ensure it's an array
  : props.modelValue;
const selected = ref<ModelValue | ModelValue[]>(defaultValue);
const query = ref("");
const isFocused = ref(false);

function onFocus() {
  isFocused.value = true;
}

function onBlur() {
  isFocused.value = false;
}

const isFocus = computed(() => (isFocused.value ? "is-focus" : ""));

const filteredItems = computed(() =>
  query.value === ""
    ? props.items
    : props.items.filter((item) =>
        item[props.itemText]
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const removeSelected = (idx: number) => {
  if (props.multiple) (selected.value as ModelValue[])?.splice(idx, 1);
};

const clear = () => {
  if (props.multiple) selected.value = [];
  else selected.value = null;
};

watch(selected, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <div>
    <label class="block text-s4 text-secondary-800">{{ label }}</label>
    <Combobox v-model="selected" :multiple="multiple">
      <div class="relative mt-1">
        <div
          :class="isFocus"
          class="relative w-full border-gray-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-200 border cursor-default overflow-hidden rounded-md bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ul
            v-if="multiple && (selected as ModelValue[])?.length > 0"
            class="flex flex-wrap gap-2 items-center mx-1.5 mt-1.5"
          >
            <li
              v-for="(item, idx) in selected"
              :key="idx"
              class="rounded-lg flex items-center gap-2 shrink-0 bg-gray-100 pl-3 pr-2"
            >
              <span class="text-sm">{{ (item as Item)[itemValue] }}</span>
              <button
                title="Remove item"
                class="text-lg rounded-full text-gray-500 hover:text-gray-700"
                type="button"
                @click="removeSelected(idx)"
              >
                <Icon name="heroicons:x-mark-20-solid" class="h-4 w-4" />
              </button>
            </li>
          </ul>
          <ComboboxInput
            class="w-full border-none h-[32px] py-2 pl-2 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
            :display-value="(item) => (item as Item)?.[itemValue]"
            :placeholder="placeholder"
            @change="query = $event.target.value"
            @focus="onFocus"
            @blur="onBlur"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-2">
            <!-- <button v-if="multiple ? (selected as ModelValue[])?.length > 0 : selected" type="button" aria-label="Clear" @click="clear">
              <Icon
                name="heroicons:x-mark-20-solid"
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button> -->
            <!-- <ComboboxButton>
              <Icon
                name="heroicons:chevron-down-20-solid"
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton> -->
         
            <component :is="popup"  v-if="isSearch">
              <button class="flex">
                <Icon
                  name="mdi:search"
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </component>
          </div>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nothing found.
            </div>
            <ComboboxOption
              v-for="item in filteredItems"
              :key="item.id"
              v-slot="{ selected, active }"
              as="template"
              :value="item"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-gray-100 text-gray-900': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ item[itemText] }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500"
                >
                  <Icon
                    name="heroicons:check-20-solid"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
<style scoped>
.is-focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(170 171 255 / var(--tw-ring-opacity));
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-border-opacity: 1;
  border-color: rgb(105 107 255 / var(--tw-border-opacity));
}
</style>
