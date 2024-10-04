<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import type { DropdownItemProps } from './types'
import DropdownItem from './DropdownItem.vue'
withDefaults(
  defineProps<{
    modelValue?: boolean
    btnProps?: Record<string, any>
    label?: string
    right?: boolean
    items?: DropdownItemProps[]
  }>(),
  {
    modelValue: false,
    btnProps: () => ({
      variant: 'secondary',
    }),
    label: 'Options',
    right: false,
    items: () => [],
  },
)

</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <Float 
      portal
      :allowed-placements="['top', 'bottom', 'left', 'right']"
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
      >
        <slot>
          <DropdownItem v-for="item in items" :key="item.text" v-bind="item" />
        </slot>
      </MenuItems>
    </Float>
  </Menu>
 
</template>
