<script setup lang="ts">
import Message  from '@/components/common/Message.vue';
import Toast from '@/components/common/Toast.vue';
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
</script>
<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
      <Toast/>
      <Message/>

      
     <NuxtPage />
  </div>
</template>
