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
  category_nm: "",
  product_nm: "",
  description: "",
  price: "",
  price_sub: "",
  qty_sell: "",
  rating: "",
  img: [],
  brand_id: "",
  brand_nm: "",
  s_title: "",
  m_description: "",
  s_slug: ""
};

const data = ref({ ...defaultData });

const { selectAutoComplete } = useSelectAutoComplete(data);
const { selectAutoComplete:selectCategory } = useSelectAutoComplete(data,['category_id','category_nm']);

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

            <TextInput v-model="data.product_nm" label="Product name" name="product_nm" type="text" />
          </div>
          <div>
            <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
              <Autocomplete
                v-model="selectCategory"
                screen="category"
                itemText="category_nm"
                :isLoading="true"
                itemValue="category_id"
                name="category_id"
                label="Category ID"
                :is-search="true"
                popup_name="Category"
              ></Autocomplete>

              <TextInput v-model="data.category_nm" label="Category name" name="" type="text" />
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-2">
          <div class="grid md:grid-cols-4 gap-2">
            <TextInput v-model="data.price" label="Price" name="price" type="text" />
            <TextInput v-model="data.price_sub" label="Price sub" name="price_sub" type="text" />
            <TextInput v-model="data.qty_sell" label="Quantity sell" name="qty_sell" type="text" />
            <TextInput v-model="data.rating" label="Rating" name="rating" type="text" />
          </div>
          <div class="grid md:grid-cols-[170px_repeat(1,1fr)] gap-2">
            <Autocomplete
              v-model="selectAutoComplete"
              screen="product"
              itemText="product_nm"
              :isLoading="true"
              itemValue="brand_id"
              name="id"
              label="Brand ID"
              :is-search="true"
              popup_name="product"
            ></Autocomplete>

            <TextInput v-model="data.brand_nm" label="Brand name" name="" type="text" />
          </div>
          <TextInput v-model="data.s_slug" label="Seo Slug" name="s_slug" type="text" />

          <TextInput v-model="data.s_title" label="Seo title" name="s_title" type="text" />
          <VTextarea
            v-model="data.m_description"
            label="Meta description"
            name="meta_description"
            :rows="3"
          />
          <VTextarea
            v-model="data.description"
            label="Description"
            name="meta_description"
            :rows="3"
          />
          <VInputFile label="Slider"/>
          <VInputFile v-model="data.img" label="Image"/>
        </div>
      </template>
    </VCard>
  </Layout>
</template>
