<script setup lang="ts">
import VModal from "@/components/ui/Modal/Modal.vue";
import CollapseSearch from "@/components/form/CollapseSearch.vue";
import Pagination from "@/components/ui/Pagination/Pagination.vue";
import type { IDataTable} from '@/types/app'
import VTable from "@/components/form/Table.vue";
import useApi from "@/composables/useApi";

import { ref } from "vue";

const api = useApi()
const pageSize = ref(20);
const currentPage = ref(9);
const searchCondition = ref({
    name:"",
})

const dataTable = ref<IDataTable>({
    data:[],
    total: 0,
    pageSize:20,
    current_page:1
});



const headers = [
  { name: "id", column: "#", type: "text", width: "5%" },
  { name: "customer", column: "Customer", type: "text", width: "10%" },
  { name: "checkIn", column: "Check-In", type: "text", width: "10%" },
  { name: "checkout", column: "Checkout", type: "text", width: "10%" },
  { name: "booked", column: "Booked", type: "text", width: "10%" },
  { name: "totalPayout", column: "Total Payout", type: "text", width: "10%" },
  { name: "status", column: "Status", type: "status", width: "10%" },
  { name: "", column: "Actions", type: "action", width: "5%" }
];

const Search = async () => {
    const response = await api.post("category/search", searchCondition.value,{isModal:true});

    if (response.data.status === 200) {
      appStore.showToast({
          message: error.response.data.message || error.message,
          type: 'error',
          duration: 3000,
      });
    }
};
</script>

<template>
  <VModal title="Category Search">
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
      <Pagination :totalPages="dataTable.total" v-model="dataTable.current_page" v-model:page-size="dataTable.pageSize" />
      <VTable class="mt-2" :data="dataTable.data" :headers="headers"></VTable>
    </template>
    <template #footer>
      <div class="flex justify-end p-2">
        <VButton type="button" class="px-4 text-s4" @click="Search">Search</VButton>
      </div>
    </template>
  </VModal>
</template>