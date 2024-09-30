<script setup lang="ts">

import VModal from "@/components/ui/Modal/Modal.vue";
import VModalBody from "@/components/ui/Modal/ModalBody.vue";
import VModalFooter from "@/components/ui/Modal/ModalFooter.vue";
import VModalHeader from "@/components/ui/Modal/ModalHeader.vue";
import Button from "@/components/form/Button.vue";
</script>

<template>
  
  <VModal title="Category Search">
    <template #activator="{ open }">
      <div @click="open">
        <slot></slot>
      </div>
     </template>
    <template #body>
        Your payment has been successfully submitted. We've sent you an email with all of the details of your order.
    </template>
    <template #footer>
        <div class="flex justify-end p-2">
          <Button type="button" class="px-4 text-sm">Search</Button>
        </div>   
     </template>

 
  </VModal>
</template>