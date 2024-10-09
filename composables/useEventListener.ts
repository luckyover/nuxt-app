import { ref, watch, getCurrentScope, onScopeDispose } from 'vue';

type Fn = () => void;

const tryOnScopeDispose = (fn: Fn): boolean => {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
};

export function useEventListener<T extends HTMLElement | Document>(
  target: Ref<T | null> | T,
  event: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions
) {
  const targetRef = ref(target) as Ref<T | null>; // Ref for the target element

  // Register and unregister listener
  const registerListener = (element: T | null) => {
    element?.addEventListener(event, listener, options);
  };

  const removeListener = (element: T | null) => {
    element?.removeEventListener(event, listener, options);
  };

  // Watch the target and automatically register/unregister the listener when the target changes
  const stopWatch = watch(
    () => targetRef.value,
    (newTarget, oldTarget) => {
      if (oldTarget) removeListener(oldTarget); // Unregister old listener
      if (newTarget) registerListener(newTarget); // Register new listener
    },
    { immediate: true, flush: 'post' } // Watch immediately when composable initializes
  );

  // Stop listener and stop the watcher
  const stop = () => {
    removeListener(targetRef.value);
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return stop;
}
