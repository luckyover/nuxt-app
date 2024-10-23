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
  product_id: "",
  category_id: "",
  product_nm: "",
  description: "",
  price: "",
  price_sub: "",
  qty_sell: "",
  rating: "",
  img: "",
  brands: "",
  s_title: "",
  m_description: "",
  s_slug: ""
};

const data = ref({ ...defaultData });

const { selectAutoComplete } = useSelectAutoComplete(data);

const save = async () => {
  const response = await api.post("product/save", data.value);
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
  const response = await api.post("product/delete", data.value);
  if (response.data.status === 200) {
    appStore.showToast({
      message: "Successfully deleted!",
      type: "success",
      duration: 3000
    });
    setTimeout(() => {
      data.value = { ...data.value, ...defaultData };
    }, 3000);
  }
};
</script>
<template>
  <Layout>
    <VCard title="Product">
      <template #action>
        <VButton type="button" class="px-4 text-s4" @click="save">Save</VButton>
        <VButton
          variant="danger"
          type="button"
          class="px-4 ml-2 text-s4"
          @click="handelDelete"
        >Delete</VButton>
      </template>
      <template #body>
        <div class="grid md:grid-cols-2 gap-2">
          <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
            <Autocomplete
              v-model="selectAutoComplete"
              screen="product"
              itemText="product_nm"
              :isLoading="true"
              itemValue="product_id"
              name="id"
              label="Product ID"
              :is-search="true"
              popup_name="product"
            ></Autocomplete>

            <TextInput v-model="data.name" label="Product name" name="product_nm" type="text" />
          </div>
          <div>
            <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
              <Autocomplete
                v-model="selectAutoComplete"
                screen="category"
                itemText="name"
                :isLoading="true"
                itemValue="id"
                name="id"
                label="Category ID"
                :is-search="true"
                popup_name="Category"
              ></Autocomplete>

              <TextInput v-model="data.name" label="Category name" name="category_id" type="text" />
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-2">
          <div class="grid md:grid-cols-4 gap-2">
            <TextInput v-model="data.seo_title" label="Price" name="seo_title" type="text" />
            <TextInput v-model="data.seo_title" label="Price sub" name="seo_title" type="text" />
            <TextInput v-model="data.seo_title" label="Quantity sell" name="seo_title" type="text" />
            <TextInput v-model="data.seo_title" label="Rating" name="seo_title" type="text" />
          </div>
          <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
            <Autocomplete
              v-model="selectAutoComplete"
              screen="product"
              itemText="product_nm"
              :isLoading="true"
              itemValue="product_id"
              name="id"
              label="Product ID"
              :is-search="true"
              popup_name="product"
            ></Autocomplete>

            <TextInput v-model="data.name" label="Product name" name="product_nm" type="text" />
          </div>
          <TextInput v-model="data.seo_title" label="Seo Slug" name="seo_title" type="text" />

          <TextInput v-model="data.seo_title" label="Seo title" name="seo_title" type="text" />
          <VTextarea
            v-model="data.meta_description"
            label="Meta description"
            name="meta_description"
            :rows="3"
          />
          <VTextarea
            v-model="data.meta_description"
            label="Description"
            name="meta_description"
            :rows="3"
          />
          <VInputFile label="Slider"/>
          <VInputFile label="Image"/>
        </div>
      </template>
    </VCard>
  </Layout>
</template>
