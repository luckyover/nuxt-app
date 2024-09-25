<script setup lang="ts">
import Message  from '@/components/common/Message.vue';
import { useToast } from '@/composables/useToast';
import Toast from '@/components/common/Toast.vue';
const { toasts } = useToast();
</script>
<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
      <Toast :toasts="toasts" />
      <Message/>

      
     <NuxtPage />
  </div>
</template>
