// useClickOutside.js
import { ref, unref } from 'vue'
import { useEventListener } from '@/composables/useEventListener'

export function useClickOutside(target, callback) {
  const targetRef = ref(target)

  // Hàm kiểm tra nếu nhấp chuột bên ngoài phần tử
  const onClick = (event) => {
    const el = unref(targetRef)
    if (el && !el.contains(event.target)) {
      callback(event)
    }
  }

  // Sử dụng useEventListener để lắng nghe sự kiện click
  useEventListener(document, 'click', onClick)

  // Trả về targetRef nếu cần truy cập bên ngoài
  return targetRef
}
