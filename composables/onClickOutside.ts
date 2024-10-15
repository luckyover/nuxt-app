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

    let cleanup: (() => void) | null = null; 
    watch(
      targetRef,
      (el) => {
        if (el) {
          if (cleanup) {
            cleanup(); // Call the previous cleanup function if it exists
          }
          cleanup = useEventListener(document, 'click', onClick); // Set up the listener and store cleanup function
        }
      },
      { immediate: true }
    );
    return () => {
      if (cleanup) {
        cleanup(); // Cleanup if it exists
      }
    };
 
}
