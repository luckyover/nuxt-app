<script setup lang="ts">
import { ref } from "vue";
import Layout from "@/components/layout/admin/layout.vue";
import TextInput from "@/components/form/TextInput.vue";

const data = ref({
  id: "",
  slug: "",
  seo_title: "",
  meta_description: ""
});
</script>
<template>
  <Layout>
    <div class="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
      <div class="card-title bg-gray-300 px-6">
        <h4 class="py-1 font-medium w">Category</h4>
      </div>

      <div class="card-body px-6 py-4">
        <div class="grid md:grid-cols-2 gap-2">
          <div class="grid md:grid-cols-[200px_repeat(1,1fr)] gap-2">
            <TextInput v-model="data.id" label="ID" name="id" type="text" />
            <TextInput v-model="data.slug" label="Slug" name="Slug" type="text" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-2">
          <TextInput v-model="data.seo_title" label="Seo title" name="seo_title" type="text" />
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



