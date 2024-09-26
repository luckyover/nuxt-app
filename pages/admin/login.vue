<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from '#app'; // Use both router and route from #app
import { useUser } from "@/composables/useUser";
import TextInput from "@/components/form/TextInput.vue";
import Button from "@/components/form/Button.vue";
import useApi from "@/composables/useApi";
import { useAppStore } from "@/stores/app";

const api = useApi();
const router = useRouter(); // Initialize the router
const route = useRoute();   // Initialize the route to get query parameters

const appStore = useAppStore();
const { login } = useUser();

const data = ref({
  email: "",
  password: "",
});

const fetchLogin = async () => {
  try {
    const response = await api.post("/login", data.value);

    if (response.data.status === 200) {
      // Login the user
      login(response.data.data.token, response.data.data.user);

      // Get redirectFrom query or set default to '/admin/dashboard'
    
      const redirectTo = route.query.redirect  || '/admin/dashboard';
      await router.push(redirectTo); // Navigate to the redirectTo route
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>

<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <form @submit.prevent="fetchLogin">
        <div class="mb-4">
          <TextInput
            v-model="data.email"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
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

        <Button type="submit" class="w-full rounded-lg text-white">
          Login
        </Button>
      </form>
    </div>
  </div>
</template>
