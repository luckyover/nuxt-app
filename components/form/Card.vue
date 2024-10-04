<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
});


</script>

<template>
     <div class="rounded-lg shadow-md shadow-primary-300 bg-white flex flex-col h-[85vh]">
      <div class="card-title rounded-t-lg bg-primary-300 px-6">
        <h4 class="py-1 text-s4  text-wh-100">{{props.title}}</h4>
      </div>

      <div class="card-body  flex flex-col h-full overflow-y-auto">
        <div class="mb-3 text-right sticky px-6 py-4 bg-white z-10 top-0">
            <slot name="action"></slot>
        </div>
        <div class="px-6 py-4">
            <slot name="body"></slot>
        </div>
       
      </div>
    </div>
</template>
  

