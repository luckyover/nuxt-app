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
  category_nm: "",
  total: 0,
  page_size: 20,
  page: 1,
});
const isShowCollapse = ref(true)
const dataTable = ref<IDataTable[]>([]);
const headers = [
  { name: "category_id", column: "#", type: "text", width: "5%" },
  { name: "category_nm", column: "Name", type: "text", width: "10%" },
  { name: "s_title", column: "Seo-Title", type: "text", width: "10%" },
  { name: "s_slug", column: "Slug", type: "text", width: "10%" },
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
    dataTable.value = response.data.data.data;
    searchCondition.value = {...searchCondition.value,...response.data.data.pagination}

    isShowCollapse.value = false;
  }
};

const handleModalClose = () => {
  dataTable.value = []
  searchCondition.value = {
      category_nm: "",
      total: 0,
      page_size: 20,
      page: 1,
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
      <CollapseSearch v-model:open="isShowCollapse">

        <template #content>
          <div class="grid md:grid-cols-4 gap-2">
            <TextInput
              v-model="searchCondition.category_nm"
              label="Category name"
              name="Category name"
              type="text"
            />
          </div>
        </template>
      </CollapseSearch>
      <Pagination
        :totalItems="searchCondition.total"
        v-model="searchCondition.page"
        v-model:page-size="searchCondition.page_size"
        :on-search="Search"
        
      />
      <VTable class="mt-2" :data="dataTable" :headers="headers"></VTable>
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
