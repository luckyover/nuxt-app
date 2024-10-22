<template>
  <div class="overflow-x-auto">
    <table
      :class="class"
      class="table-auto min-w-full mt-2 text-left border-collapse text-s4 text-secondary-800"
    >
      <thead class="sticky top-[-20px] z-10 rounded-lg overflow-hidden">
        <tr class="h-[8px] bg-white">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :style="{ width: header.width || 'auto' }"
          ></th>
        </tr>
        <tr class="bg-gray-100 text-secondary-800">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :style="{ width: header.width || 'auto' }"
            class="py-2 px-4"
          >
            {{ header.column }}
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr v-for="(item, index) in data" :key="item.id" class="border-t">
          <td class="py-3 px-4" v-for="(header, index) in headers" :key="index">
            <!-- For text type -->
            <span
              v-if="header.type == 'text'"
              :class="[header.name == 'id' ? 'text-primary-500' : '']"
              >{{ header.name == 'id' ? '#' + item[header.name] : item[header.name] }}</span
            >

            <!-- For status type -->
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-semibold',
                item[header.name] === 'Pending'
                  ? 'bg-blue-100 text-blue-600'
                  : item[header.name] === 'Upcoming'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-pink-100 text-pink-600',
              ]"
              v-if="header.type == 'status'"
              >{{ item[header.name] }}</span
            >

            <span v-if="header.type == 'action'">
              <VDropdown right>
                <template #activator>
                  <VDropdownButton :as="VButton" color="primary">
                    <Icon name="bx:dots-vertical-rounded"></Icon>
                  </VDropdownButton>
                </template>
                <VDropdownItem icon="ic:edit">Edit</VDropdownItem>
                <VDropdownItem icon="ic:round-copy-all">Copy</VDropdownItem>
                <!-- <VDropdownItem divider />
                <VDropdownItem icon="ic:round-delete">Delete</VDropdownItem> -->
              </VDropdown>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="data.length == 0" class="text-center mt-2 text-secondary-800 text-s4">No results found</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import VDropdown from "@/components/ui/Dropdown/Dropdown.vue";
import VDropdownItem from "@/components/ui/Dropdown/DropdownItem.vue";
import VDropdownButton from "@/components/ui/Dropdown/DropdownButton.vue";
import VButton from "@/components/form/Button.vue";
// Define the props the component will accept
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  class: {
    type: String,
  },
  widths: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
/* Additional custom styles (optional) */
</style>
