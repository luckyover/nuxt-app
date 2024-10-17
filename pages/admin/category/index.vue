<script setup lang="ts">
import { ref,unref } from "vue";
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



const save  = async () => {
 const response = await api.post("category/save", data.value);
   
    if (response.data.status === 200) {
      appStore.showToast({
          message: '',
          type: 'success',
          duration: 3000,
        });
         data.value = { ...data.value, ...response.data.data };
    }
    
};

const selectAutoComplete = computed({
  set(item :{[key: string]: any}){
    data.value.id =  item?.id || '';
    data.value.name =  item?.name || '';
  },
  get(){
    return {
      id:data.value.id,
      name:data.value.name
    }
  }
})
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
       {{ data }}
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
              name="slug"
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
