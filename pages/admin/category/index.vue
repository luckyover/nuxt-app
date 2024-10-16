<script setup lang="ts">
import { ref } from "vue";
import Layout from "@/components/layout/admin/layout.vue";
import TextInput from "@/components/form/TextInput.vue";
import VButton from "@/components/form/Button.vue";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete.vue";
import VCard from "@/components/form/Card.vue";
import useApi from "@/composables/useApi";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const api = useApi()

const data = ref({
  id: "",
  name: "",
  slug: "",
  seo_title: "",
  meta_description: "",
});

const items = ref([
  { value: 1, text: "Wade Cooper" },
  { value: 2, text: "Arlene Mccoy" },
  { value: 3, text: "Devon Webb" },
  { value: 4, text: "Tom Cook" },
  { value: 5, text: "Tanya Fox" },
  { value: 6, text: "Hellen Schmidt" },
]);

const selected = ref({ value: 1, text: "Wade Cooper" });


const save  = async () => {
  try {
    const response = await api.post("category/save", data.value);

    if (response.data.status === 200) {
      appStore.showToast({
          message: '',
          type: 'success',
          duration: 3000,
        });
    }
  } catch (error) {
    alert('Category save error:' + error);
  }
};
</script>
<template>
  <Layout>
    <VCard title="Category">
      <template #action>
        <VButton type="button" class="px-4 text-s4" @click="save">Save</VButton>
        <VButton variant="danger" type="button" class="px-4 ml-2 text-s4"
          >Delete</VButton
        >
      </template>
      <template #body>
        <div class="grid md:grid-cols-2 gap-2">
          <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
            <Autocomplete
              v-model="selected"
              :items="items"
              label="ID"
              :is-search="true"
              popup_name="Category"
            ></Autocomplete>
           
             <TextInput
            v-model="data.name"
            label="Category name"
            name="name"
            type="text"
          />
          </div>
          <div>
             <TextInput
              v-model="data.slug"
              label="Slug"
              name="Slug"
              type="text"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-2">
          <TextInput
            v-model="data.seo_title"
            label="Seo title"
            name="seo_title"
            type="text"
          />
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
