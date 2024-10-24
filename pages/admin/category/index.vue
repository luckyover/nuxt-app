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

const appStore = useAppStore();
const api = useApi();

const defaultData = {
  category_id: "",
  category_nm: "",
  s_slug: "",
  s_title: "",
  m_description: ""
};

const data = ref({ ...defaultData });

const { selectAutoComplete } = useSelectAutoComplete(data);

const save = async () => {
  const response = await api.post("category/save", data.value);
  if (response.data.status === 200) {
    appStore.showToast({
      message: "Successfully saved!",
      type: "success",
      duration: 3000
    });
    data.value = { ...data.value, ...response.data.data };
  }
};
const handelDelete = async () => {
  const response = await api.post("category/delete", data.value);
  if (response.data.status === 200) {
    appStore.showToast({
      message: "Successfully deleted!",
      type: "success",
      duration: 3000
    });
    setTimeout(() => {
      data.value = { ...data.value, ...defaultData  };
    }, 3000);
   
  }
};

</script>
<template>
  <Layout>
    <VCard title="Category">
      <template #action>
        <VButton type="button" class="px-4 text-s4" @click="save">Save</VButton>
        <VButton variant="danger" type="button" class="px-4 ml-2 text-s4" @click="handelDelete">Delete</VButton>
      </template>
      <template #body>
      
        <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
          <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
            <Autocomplete
              v-model="selectAutoComplete"
              screen="category"
              itemText="category_nm"
              :isLoading="true"
              itemValue="category_id"
              name="category_id"
              label="Category ID"
              :is-search="true"
              popup_name="Category"
            ></Autocomplete>

            <TextInput v-model="data.category_nm" label="Category name" name="category_nm" type="text" />
          </div>
          <div>
            <TextInput v-model="data.s_slug" label="Slug" name="s_slug" type="text" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-2">
          <TextInput v-model="data.s_title" label="Seo title" name="s_title" type="text" />
          <VTextarea
            v-model="data.m_description"
            label="Meta description"
            name="m_description"
            rows="3"
          />
        </div>
      </template>
    </VCard>
  </Layout>
</template>
