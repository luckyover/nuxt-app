<script setup lang="ts">
import { ref } from "vue";
import Layout from "@/components/layout/admin/layout.vue";
import TextInput from "@/components/form/TextInput.vue";
import VButton from "@/components/form/Button.vue";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete.vue";
import VCard from "@/components/form/Card.vue";
import VTable from "@/components/form/Table.vue";

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
  }
]

const headers = [
  {name:'id',column:'#',type:'text',width:'5%'},
  {name:'customer',column:'Customer',type:'text',width:'10%'},
  {name:'checkIn',column:'Check-In',type:'text',width:'10%'},
  {name:'checkout',column:'Checkout',type:'text',width:'10%'},
  {name:'booked',column:'Booked',type:'text',width:'10%'},
  {name:'totalPayout',column:'Total Payout',type:'text',width:'10%'},
  {name:'status',column:'Status',type:'status',width:'10%'},
  {name:'',column:'Actions',type:'action',width:'5%'},
]

</script>
<template>
  <Layout>
    <VCard title="Category">
      <template #action>
        <VButton type="button" class="px-4 text-s4">Save</VButton>
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
        <VTable :data="datax" :headers="headers" :widths="widths"></VTable>
      </template>
     
    </VCard>
   
  </Layout>
</template>
