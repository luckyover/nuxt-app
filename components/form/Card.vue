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
     <div class="rounded-lg shadow-md shadow-primary-300 bg-white flex flex-col h-[calc(100vh-120px)]">
      <div class="card-title rounded-t-lg bg-primary-300 px-4 md:px-6">
        <h4 class="py-1 text-s4  text-wh-100">{{props.title}}</h4>
      </div>

      <div class="card-body  flex flex-col h-full overflow-y-auto">
        <div class="text-right sticky px-4 md:px-6 py-4 bg-white z-10 top-0">
            <slot name="action"></slot>
        </div>
        <Transition enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                enter-active-class="ease-out duration-300"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
                leave-active-class="ease-in duration-500" appear>
        <div class="px-4 md:px-6 py-4 grid gap-y-2">
         
            <slot name="body"></slot>
         
        </div>
      </transition>
      </div>
    </div>
</template>
  

