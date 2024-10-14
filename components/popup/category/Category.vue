<script setup lang="ts">
import VModal from "@/components/ui/Modal/Modal.vue";
import VModalBody from "@/components/ui/Modal/ModalBody.vue";
import VModalFooter from "@/components/ui/Modal/ModalFooter.vue";
import VModalHeader from "@/components/ui/Modal/ModalHeader.vue";
import CollapseSearch from "@/components/form/CollapseSearch.vue";
import VButton from "@/components/form/Button.vue";
import Pagination from "@/components/ui/Pagination/Pagination.vue";
import VTable from "@/components/form/Table.vue";
const pageSize = ref(20);
const currentPage = ref(9);

const datax = [
  {
    id: "#3949",
    customer: "Albert Flores",
    guests: 1,
    checkIn: "Sep 12, 2 PM",
    checkout: "Sep 14, 12 PM",
    booked: "Aug 4, 2024, 12:44 PM",
    totalPayout: "$115.50",
    status: "Pending",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3947",
    customer: "Cameron Williamson",
    guests: 2,
    checkIn: "Sep 15, 4 PM",
    checkout: "Sep 16, 12 PM",
    booked: "Sep 2, 2024, 3:35 PM",
    totalPayout: "$80.50",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3946",
    customer: "Annette Black",
    guests: 2,
    checkIn: "Sep 20, 2 PM",
    checkout: "Sep 24, 12 PM",
    booked: "Sep 19, 2024, 10:14 PM",
    totalPayout: "$170.70",
    status: "Pending",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3943",
    customer: "Darrell Steward",
    guests: 1,
    checkIn: "Sep 26, 2 PM",
    checkout: "Sep 28, 12 PM",
    booked: "Sep 10, 2024, 10:55 PM",
    totalPayout: "$115.50",
    status: "Active",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  },
  {
    id: "#3942",
    customer: "Jerome Bell",
    guests: 2,
    checkIn: "Sep 28, 5 PM",
    checkout: "Sep 30, 7 PM",
    booked: "Sep 20, 2024, 1:45 PM",
    totalPayout: "$130.40",
    status: "Upcoming",
    avatar: "https://via.placeholder.com/150"
  }
];

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
          <div>dfd</div>
        </template>
      </CollapseSearch>
      <Pagination :totalPages="100" v-model="currentPage" v-model:page-size="pageSize" />
      <VTable class="mt-2" :data="datax" :headers="headers"></VTable>
    </template>
    <template #footer>
      <div class="flex justify-end p-2">
        <VButton type="button" class="px-4 text-s4">Search</VButton>
      </div>
    </template>
  </VModal>
</template>