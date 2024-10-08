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
  
  export function useScrollParent(target, callback) {
    const targetRef = ref(target);
    
    watch(
      targetRef,
      (el) => {
        if (el) {
          console.log(targetRef.value.$slots);
          console.log(targetRef.value.$props);
          
          const targetElement = unref(targetRef)?.$el || unref(targetRef);
          const { getScrollableParent } = usePosition();
          const scrollParent = getScrollableParent(targetElement);
        
          const cleanup =  useEventListener(scrollParent, 'scroll', callback);
          return cleanup
        }
      },
      { immediate: true }
    );

    
  }
  