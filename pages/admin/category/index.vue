<script setup lang="ts">
import { ref } from "vue";
import Layout from "@/components/layout/admin/layout.vue";
import TextInput from "@/components/form/TextInput.vue";
import Button from "@/components/form/Button.vue";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete.vue";
import PopupCategory from "@/layers/modals/Category.vue";
const data = ref({
  id: "",
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
</script>
<template>
  <Layout>
    <div class="rounded-lg shadow-lg bg-white flex flex-col">
      <div class="card-title rounded-t-lg bg-gray-300 px-6">
        <h4 class="py-1 font-medium">Category</h4>
      </div>

      <div class="card-body px-6 py-4 flex flex-col">
        <div class="mb-3 text-right">
          <Button type="button" class="px-4 text-sm">Save</Button>
          <Button variant="danger" type="button" class="px-4 ml-2 text-sm"
            >Delete</Button
          >
        </div>

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
          <TextInput
            v-model="data.meta_description"
            label="Meta description"
            name="meta_description"
            type="text"
          />
        </div>
      </div>
    </div>

  </Layout>

 
</template>
