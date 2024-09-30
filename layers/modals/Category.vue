<script setup lang="ts">

import VModal from "@/components/ui/Modal/Modal.vue";
import VModalBody from "@/components/ui/Modal/ModalBody.vue";
import VModalFooter from "@/components/ui/Modal/ModalFooter.vue";
import VModalHeader from "@/components/ui/Modal/ModalHeader.vue";
</script>

<template>
  
  <VModal>
    <template #activator="{ open }">
      <div @click="open">
        <slot>ok</slot>
      </div>
      
    </template>
    <VModalHeader dismissable>
      Category Search
    </VModalHeader>

    <VModalBody>
      Your payment has been successfully submitted. We've sent you an email with all of the details of your order.
    </VModalBody>

    <VModalFooter>
      <button >ok</button>
    </VModalFooter>

  </VModal>
</template>