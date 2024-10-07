// useEventListener.js
import { ref, watch } from 'vue'

const tryOnScopeDispose = (fn: Fn): boolean => {
    if (getCurrentScope()) {
        onScopeDispose(fn);
        return true;
    }
    return false;
};

export function useEventListener(target, event, listener, options = {}) {
  const targetRef = ref(target) // Để linh hoạt cho việc truyền target dạng reactive

  // Đăng ký và hủy bỏ listener
  const registerListener = (element) => element?.addEventListener(event, listener, options)
  const removeListener = (element) => element?.removeEventListener(event, listener, options)

  // Theo dõi target và tự động đăng ký/hủy bỏ listener khi target thay đổi
  const stopWatch = watch(
    () => targetRef.value,
    (newTarget, oldTarget) => {
      if (oldTarget) removeListener(oldTarget) // Hủy bỏ listener cũ
      if (newTarget) registerListener(newTarget) // Đăng ký listener mới
    },
    { immediate: true, flush: 'post' } // Theo dõi ngay khi composable khởi tạo
  )

  // Hàm stop listener, dừng cả watch
  const stop = () => {
    removeListener(targetRef.value)
    stopWatch()
  }

  tryOnScopeDispose(stop);

  return stop
}
