// usePosition.js
 const usePosition = () => {
    const isScrollable = function (el: HTMLElement | null): boolean {
      if (el) {
        const hasScrollableContent = el.scrollHeight > el.clientHeight;
        const overflowYStyle = window.getComputedStyle(el).overflowY;
        const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;
  
        return hasScrollableContent && !isOverflowHidden;
      }
      return false; // Return false when no element is provided
    };
  
    const getScrollableParent = function (el: HTMLElement | null): Window | HTMLElement {
      // Check if `el` is null, or is `document.body`, or is a document fragment
      if (!el || el === document.body || el.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        return window;
      }
  
      // Check if the current element is scrollable
      if (isScrollable(el)) {
        return el;
      }
  
      // Otherwise, find the parent element
      return getScrollableParent((el.assignedSlot ? el.assignedSlot.parentNode : el.parentNode) as HTMLElement);
    };
  
    return {
      getScrollableParent,
    };
  };
  
  // useScrollParent.js
  import { ref, unref } from 'vue';
  import { useEventListener } from '@/composables/useEventListener';
  type TargetType = HTMLElement | { $el: HTMLElement | null };

  export function useScrollParent(target: TargetType  | null, callback: EventListener) {
    const targetRef = ref(target);
    let cleanup: (() => void) | null = null; 
    watch(
      targetRef,
      (el) => {
        if (el) {
          if (cleanup) {
            cleanup(); // Call the previous cleanup function if it exists
          }

          const targetElement = (unref(targetRef) as { $el?: HTMLElement })?.$el || unref(targetRef);
          if (targetElement instanceof HTMLElement) {
            const { getScrollableParent } = usePosition();
            const scrollParent = getScrollableParent(targetElement);
          
            if (scrollParent instanceof HTMLElement) {
              cleanup = useEventListener(scrollParent, 'scroll', callback); // Set up the listener and store cleanup function
            }
          
          }
        
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
  