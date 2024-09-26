<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import TextInput from "@/components/form/TextInput.vue";
import Button from "@/components/form/Button.vue";
import useApi from "@/composables/useApi";
import { useAppStore } from "@/stores/app";
import { ref } from "vue";
const appStore = useAppStore();
const api = useApi();

const { login } = useUser();
const users = ref([]);
const data = ref({
  email: "",
  password: "",
});

const fetchLogin = async () => {
  api.post("/login", data.value); //lưu thông tin login
};

let handleClick = () => {
  appStore.showMessage({
    type: 1,
    content: "E500",
    callback: (ok) => {
      if (ok) {
        console.log("Confirmed z");
      }
    },
  });
};
</script>
<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <form method="POST">
        <div class="mb-4">
          <TextInput
            v-model="data.email"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your username"
          />
        </div>

        <div class="mb-6">
          <TextInput
            v-model="data.password"
            label="Password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            autocomplete="current-password"
          />
        </div>

        <Button  class="w-full rounded-lg text-white" @click="fetchLogin">
          Login
        </Button >

      </form>
    </div>
  </div>
</template>
