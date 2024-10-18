// composables/useSelectAutoComplete.ts
import { computed,type  Ref } from 'vue';

export function useSelectAutoComplete(
  data: Ref<{ [key: string]: any }>,
  keys?: string[] // Trường động
) {
  const selectAutoComplete = computed({
    set(item: { [key: string]: any }) {
      if (keys) {
        keys.forEach(key => {
          data.value[key] = item[key] || '';  // Set từng trường nếu có
        });
      } else {
        Object.assign(data.value, item);  // Set toàn bộ dữ liệu nếu không có fields
      }
    },
    get() {
      return keys 
        ? Object.fromEntries(keys.map(key => [key, data.value[key]]))  // Trả về các trường cụ thể
        : { ...data.value };  // Trả về toàn bộ dữ liệu nếu không có keys
    },
  });

  return { selectAutoComplete };
}
