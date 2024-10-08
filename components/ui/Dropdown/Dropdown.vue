<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import type { DropdownItemProps } from "./types";
import DropdownItem from "./DropdownItem.vue";
import { onMounted, onUnmounted, nextTick, ref } from "vue";
import { usePosition } from "@/composables/position";
import {useScrollParent} from '@/composables/useScrollParent';
const { getScrollableParent } = usePosition();

withDefaults(
  defineProps<{
    modelValue?: boolean;
    btnProps?: Record<string, any>;
    label?: string;
    right?: boolean;
    items?: DropdownItemProps[];
  }>(),
  {
    modelValue: false,
    btnProps: () => ({
      variant: "secondary",
    }),
    label: "Options",
    right: false,
    items: () => [],
  }
);

const menu_drop = ref(null);
const isOpen = ref(false);

  const closeRef = ref(null); // Tạo ref để lưu hàm close

    // Hàm để lưu hàm close vào ref
    const initializeClose = (close) => {
      if (close && !closeRef.value) { // Chỉ lưu nếu hàm close chưa được lưu
        closeRef.value = close;
      }
      return true; // Điều kiện để v-if luôn là true
    };


const onScroll = () => {
 const test = menu_drop.value.$slots.open;
 console.log(test);
 

  // if (closeRef.value) {
  //   closeRef.value(); // Gọi hàm close từ ref khi cuộn
  // }
};

useScrollParent(menu_drop,onScroll)

</script>

<template>
  <Menu as="div" class="relative inline-block text-left" ref="menu_drop" v-slot="{ close,open }" >
    <template v-if="initializeClose(close)" />
   
    <Float
      portal
      flip
      enter="transition duration-200 ease-out"
      enter-from="scale-95 opacity-0"
      enter-to="scale-100 opacity-100"
      leave="transition duration-150 ease-in"
      leave-from="scale-100 opacity-100"
      leave-to="scale-95 opacity-0"
    >
      <div>
        <slot name="activator" :btn-props="btnProps" :label="label">
        <MenuButton as="button" class="text-sm" v-bind="btnProps">
          {{ label }}
          <Icon
            name="heroicons:chevron-down"
            class="w-4 h-4 inline"
            aria-hidden="true"
          />
        </MenuButton>
      </slot>
      </div>
      <MenuItems
        class="z-10 p-1 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <slot>
          <DropdownItem v-for="item in items" :key="item.text" v-bind="item" />
        </slot>
      </MenuItems>
    </Float>
  </Menu>
</template>
