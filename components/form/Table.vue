<template>
    <div class="overflow-x-auto">
      <table class="min-w-full text-left table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-700">
            <th
              v-for="(header, index) in headers"
              :key="index"
              :style="{ width: widths[index] || 'auto' }"
              class="py-2 px-4"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in data" :key="booking.id" class="border-t">
            <td class="py-3 px-4">{{ booking.id }}</td>
            <td class="py-3 px-4">
              <div class="flex items-center space-x-3">
                <img :src="booking.avatar" class="w-10 h-10 rounded-full" alt="Avatar" />
                <div>
                  <p>{{ booking.customer }}</p>
                  <p class="text-gray-500 text-sm">{{ booking.guests }} guests</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">{{ booking.checkIn }}</td>
            <td class="py-3 px-4">{{ booking.checkout }}</td>
            <td class="py-3 px-4">{{ booking.booked }}</td>
            <td class="py-3 px-4">{{ booking.totalPayout }}</td>
            <td class="py-3 px-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-semibold',
                  booking.status === 'Pending' ? 'bg-blue-100 text-blue-600' :
                  booking.status === 'Upcoming' ? 'bg-green-100 text-green-600' :
                  'bg-pink-100 text-pink-600'
                ]"
              >
                {{ booking.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7a2 2 0 100 4 2 2 0 000-4zm-7 9a7 7 0 1114 0H5z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  // Define the props the component will accept
  const props = defineProps({
    data: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    widths: {
      type: Array,
      default: () => []
    }
  })
  </script>
  
  <style scoped>
  /* Additional custom styles (optional) */
  </style>
  