<script setup lang="ts">
import type { IMenuResponsive } from "@/types/menu/menu";
import DropDown from "@/components/common/DropDown.vue";

import useApi from "@/composables/useApi";
import { useAppStore } from "@/stores/app";

const api = useApi();
const router = useRouter(); // Initialize the router
const route = useRoute();   // Initialize the route to get query parameters


const { logout } = useUser();

const emit = defineEmits(["clickMenu"]);
const props = defineProps<IMenuResponsive>();
const handelClickMenu = () => {
  emit("clickMenu");
};


const fetchLogout = async () => {
  try {

    const response = await api.post("/logout");

    if (response.data.status === 200) {
      // logout the user
      logout();
      await router.push('/admin/login'); // Navigate to the redirectTo route
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>
<template>
  <!-- Layout wrapper -->
  <nav
    class="rounded-md transition-all duration-500 ease-in-out z-50 layout-navbar w-full justify-start navbar h-16 flex sticky inset-x-0 inset-y-0 bg-bg_layout text-nav py-1"
    id="layout-navbar"
  >
    <div
      class="flex w-full flex-wrap justify-between items-center px-8 md:px-6"
    >
      <div class="navbar-brand flex items-center gap-2">
        <div
          class="layout-menu-toggle navbar-nav pt-[10px]"
          v-if="type == 'ipad'"
        >
          <a
            class="nav-item nav-link px-0 me-xl-4"
            href="javascript:void(0)"
            @click="handelClickMenu"
          >
            <Icon name="bx:menu" class="h-6 w-6"></Icon>
          </a>
        </div>
        <a
          href="javascript:void(0)"
          class="app-brand-link flex items-center gap-2"
        >
          <!-- <span class="app-brand-logo"> Logo </span>
          <span class="app-brand-text text-3xl font-bold lowercase">Sneat</span> -->
        </a>

        <a
          href="javascript:void(0);"
          class="mobile hidden layout-menu-toggle bg-bgm border-7 border-bod border-solid rounded-full left-3r absolute"
        >
          <i
            class="justify-center bx bx-chevron-left bx-sm align-middle text-txw w-6 h-6 !flex items-center"
          ></i>
        </a>
      </div>

      <div class="navbar-nav-right flex" id="navbar-collapse">
        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <!-- Search -->

          <li>
            <DropDown>
              <template #data-click>
                <div class="w-10 h-10 rounded-full">
                  <img src="assets/imgs/avatar_default.jpg" alt="" />
                </div>
              </template>
              <template #data-content>
                <ul class="p-2 bg-white rounded-[0.357rem]">
                  <li class="text-menu flex items-center gap-1 cursor-pointer hover:bg-bg_link p-1" @click="fetchLogout">
                    <Icon name="bx:power-off" class="w-5 h-5"></Icon>
                      <span>Log Out</span>
                  </li>
                </ul>
              </template>
            </DropDown>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
