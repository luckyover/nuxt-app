<script setup lang="ts">
import { useUser } from "@/composables/useUser";

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
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <div class="relative mt-1">
            <input
              type="email"
              id="email"
              name="email"
              v-model="data.email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="you@gmail.com"
            />
          </div>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <div class="relative mt-1">
            <input
              type="password"
              id="password"
              name="password"
              v-model="data.password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="At least 8 characters"
            />
          </div>
        </div>

        <button
          type="button"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:bg-blue-600"
          @click="fetchLogin"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
