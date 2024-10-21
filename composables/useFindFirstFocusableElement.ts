// composables/useFindFirstFocusableElement.ts
import { ref, onMounted } from 'vue';

// List of focusable selectors
const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
];

export function useFindFirstFocusableElement(scope: Element | Document = document) {
  const element = ref<Element | null>(null);

  onMounted(() => {
    // Find the first element that matches the focusable selectors
    element.value = scope.querySelector(focusableSelectors.join(', '));
  });

  return { element };
}
