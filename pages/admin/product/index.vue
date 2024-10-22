<script setup lang="ts">
import { ref } from "vue";
import Layout from "@/components/layout/admin/layout.vue";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete.vue";
import VCard from "@/components/form/Card.vue";
import useApi from "@/composables/useApi";
import { useAppStore } from "@/stores/app";
import { useSelectAutoComplete } from "@/composables/useSelectAutoComplete";

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
    <VCard title="Product">
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
              itemText="name"
              :isLoading="true"
              itemValue="id"
              name="id"
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
            :rows="3"
          />
          <VInputFile/>
        </div>
      </template>
    </VCard>
  </Layout>
</template>
