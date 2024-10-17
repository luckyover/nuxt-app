// composables/useSelectAutoComplete.ts
import { computed,type  Ref } from 'vue';

export function useSelectAutoComplete(
  data: Ref<{ [key: string]: any }>,
  fields: { idField: string; nameField: string }  // Trường động
) {
  const selectAutoComplete = computed({
    set(item: { [key: string]: any }) {
      data.value[fields.idField] = item[fields.idField] || '';
      data.value[fields.nameField] = item[fields.nameField] || '';
    },
    get() {
      return {
        [fields.idField]: data.value[fields.idField],
        [fields.nameField]: data.value[fields.nameField],
      };
    },
  });

  return { selectAutoComplete };
}
