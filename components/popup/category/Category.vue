<script setup lang="ts">
import VModal from "@/components/ui/Modal/Modal.vue";
import CollapseSearch from "@/components/form/CollapseSearch.vue";
import Pagination from "@/components/ui/Pagination/Pagination.vue";
import type { IDataTable } from "@/types/app";
import VTable from "@/components/form/Table.vue";
import useApi from "@/composables/useApi";
import { ref , nextTick} from "vue";

const api = useApi();
const searchCondition = ref({
  name: "",
});
const itemFirst = ref<HTMLInputElement | null>(null)

const dataTable = ref<IDataTable>({
  data: [],
  total: 0,
  pageSize: 20,
  current_page: 1,
});
const headers = [
  { name: "id", column: "#", type: "text", width: "5%" },
  { name: "name", column: "Name", type: "text", width: "10%" },
  { name: "seo_title", column: "Seo-Title", type: "text", width: "10%" },
  { name: "checkout", column: "Checkout", type: "text", width: "10%" },
  { name: "slug", column: "Slug", type: "text", width: "10%" },
  { name: "created_at", column: "Created-At", type: "text", width: "10%" },
  { name: "updated_at", column: "Updated-At", type: "text", width: "10%" },
  // { name: "status", column: "Status", type: "status", width: "10%" },
  // { name: "", column: "Actions", type: "action", width: "5%" }
];

const Search = async () => {
  const response = await api.post("category/search", searchCondition.value, {
    isModal: true,
  });

  if (response.data.status === 200) {
    dataTable.value = { ...dataTable.value, ...response.data.data };
  }
};

const handleModalClose = () => {
  dataTable.value = {
    data: [],
    total: 0,
    pageSize: 20,
    current_page: 1,
  };
  searchCondition.value = {
    name: "",
  };
};

</script>

<template>
  <VModal title="Category Search" @modal-closed="handleModalClose" >
    <template #activator="{ open }">
      <div @click="open">
        <slot></slot>
      </div>
    </template>
    <template #body>
      <CollapseSearch>
        <template #content>
          <div class="grid md:grid-cols-4 gap-2">
            <TextInput
              v-model="searchCondition.name"
              label="Category name"
              name="Category name"
              type="text"
            />
          </div>
        </template>
      </CollapseSearch>
      <Pagination
        :totalItems="dataTable.total"
        v-model="dataTable.current_page"
        v-model:page-size="dataTable.pageSize"
      />
      <VTable class="mt-2" :data="dataTable.data" :headers="headers"></VTable>
    </template>
    <template #footer>
      <div class="flex justify-end p-2">
        <VButton type="button" class="px-4 text-s4" @click="Search"
          >Search</VButton
        >
      </div>
    </template>
  </VModal>
</template>
