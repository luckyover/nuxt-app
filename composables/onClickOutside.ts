import { ref, unref } from 'vue';
import { useEventListener } from '@/composables/useEventListener';

export function useClickOutside(
  target: HTMLElement | { $el: HTMLElement | null } | null,
  callback: (event: MouseEvent) => void
) {
  const targetRef = ref(target);

  // Function to check if the click is outside the element
  const onClick = (event: Event) => {
    const el = unref(targetRef);
    
    // If el is an object, use its $el property; otherwise, use el directly
    const element = el instanceof HTMLElement ? el : el?.$el;

    // Check if the element is valid and if the click target is outside of it
    if (element && !element.contains(event.target as Node)) {
      callback(event as MouseEvent); // Type assertion here
    }
  };

  // Use useEventListener to listen for click events on the document
  useEventListener(document, 'click', onClick);

  // Return targetRef if external access is needed
  return targetRef;
}
