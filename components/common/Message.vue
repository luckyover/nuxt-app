<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const emit = defineEmits()
const appStore = useAppStore();
const { isShowMessage, message } = storeToRefs(appStore)

const closeDialog = () => {
  appStore.hideMessage();
}

const handleOK = () => {
  appStore.exeCallback(true);
}

</script>
<template>
  <Dialog :open="isShowMessage" @close="closeDialog" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30"/>
      <DialogPanel class="mx-auto max-w-sm rounded bg-white p-6 z-20">
        <DialogTitle class="text-lg font-bold">Deactivate account</DialogTitle>
        <DialogDescription>
          This will permanently deactivate your account.
        </DialogDescription>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <div class="mt-4">
          <button @click="handleOK">Ok</button>
          <button @click="closeDialog" class="mr-2">Cancel</button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>



