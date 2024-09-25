// composables/useToast.js
import { ref } from 'vue';
import type { Toast } from '@/types/app'
const toasts: Ref<Toast[]> = ref([]);

export const useToast = () => {
  const showToast = (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
    const toast = { message, type };
    toasts.value.push(toast);
    // Automatically remove the toast after the specified duration
    // setTimeout(() => {
    //   removeToast(toasts.value.length - 1); // Remove the last toast added
    // }, duration);
  };

  const removeToast = (index:number) => {
    toasts.value.splice(index, 1); // Remove the toast at the given index
  };

  return { showToast, toasts, removeToast };
};
