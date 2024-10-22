// composables/useFindFirstFocusableElement.ts
import { ref, onMounted, nextTick } from 'vue';

// List of focusable selectors
const focusableSelectors = [
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
];

export function useFindFirstFocusableElement(scope: HTMLElement | Document = document) {
  const element = ref<HTMLElement | null>(null);
   // Ensure the DOM has been updated
   nextTick().then(() => {
    // Find the first element that matches the focusable selectors
    element.value = scope.querySelector<HTMLElement>(focusableSelectors.join(', '));
 
    element.value?.focus()
    
  });
;

  return { element };
}
