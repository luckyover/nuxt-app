<script setup lang="ts">
import { ref, unref, watch } from "vue";
import Layout from "@/components/layout/admin/layout.vue";
import TextInput from "@/components/form/TextInput.vue";
import VButton from "@/components/form/Button.vue";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete.vue";
import VCard from "@/components/form/Card.vue";
import useApi from "@/composables/useApi";
import { useAppStore } from "@/stores/app";
import { useSelectAutoComplete } from "@/composables/useSelectAutoComplete";
import { debounce } from "@/composables//debounce";
const appStore = useAppStore();
const api = useApi();

const defaultData = {
  id: "",
  name: "",
  slug: "",
  seo_title: "",
  meta_description: ""
};

const data = ref({ ...defaultData });

const { selectAutoComplete } = useSelectAutoComplete(data, {
  idField: "id",
  nameField: "name"
});

const save = async () => {
  const response = await api.post("category/save", data.value);
  if (response.data.status === 200) {
    appStore.showToast({
      message: "",
      type: "success",
      duration: 3000
    });
    data.value = { ...data.value, ...response.data.data };
  }
};

const findCategory = async (id: string) => {
  const response = await api.post("category/find", { id: id });
  if (response.data.data && Object.keys(response.data.data).length > 0) {
    data.value = { ...data.value, ...response.data.data };
  } else {
    data.value = {
      ...defaultData,
      id: data.value.id // Giữ lại id
    };
  }
};

watch(
  () => data.value.id, // Theo dõi id
  newVal => {
    findCategory(newVal); 
  }
);
</script>
<template>
  <Layout>
    <VCard title="Category">
      <template #action>
        <VButton type="button" class="px-4 text-s4" @click="save">Save</VButton>
        <VButton variant="danger" type="button" class="px-4 ml-2 text-s4">Delete</VButton>
      </template>
      <template #body>
        <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
          <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
            <Autocomplete
              v-model="selectAutoComplete"
              screen="category"
              itemText="name"
              itemValue="id"
              label="ID"
              :is-search="true"
              popup_name="Category"
            ></Autocomplete>

            <TextInput v-model="data.name" label="Category name" name="name" type="text" />
          </div>
          <div>
            <TextInput v-model="data.slug" label="Slug" name="slug" type="text" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-2">
          <TextInput v-model="data.seo_title" label="Seo title" name="seo_title" type="text" />
          <VTextarea
            v-model="data.meta_description"
            label="Meta description"
            name="meta_description"
            rows="3"
          />
        </div>
      </template>
    </VCard>
  </Layout>
</template>
