<script lang="ts" setup>
// import HorizontalMenu from "@/components/menu/horizontal/MenuDropDown.vue";
import MenuLogo from "@/components/menu/logo/MenuLogo.vue";
import Vertical from "@/components/menu/vertical/MenuDropDown.vue";
import MenuMobile from "@/components/menu/mobile/Mobile.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

interface MenuComponent {
  isOpen: boolean;
}

const appStore = useAppStore();
const {device} = storeToRefs(appStore);
const menuRef = ref<MenuComponent | null>(null);

const handleClickMenu = () => {
  if (menuRef.value) {
    menuRef.value.isOpen = !menuRef.value.isOpen;
  }
};

</script>
<template>
  
  <Vertical type="ipad" v-if="device != 'mobile'" ref="menuRef"> </Vertical>
  <!-- <MenuMobile :type="device" v-if="device == 'mobile'"> </MenuMobile>  -->
  <div class="">
    <MenuLogo :type="device" @clickMenu="handleClickMenu" />
    <div class="HorizontalMenu w-full relative top-[4rem] bg-bg_layout">
      <div class="ln-container">
        <!-- <HorizontalMenu v-if="device == 'pc'" /> -->
      </div>
    </div>
  </div>

  <div class="ln-container pt-20">
 
  </div>
</template>
<style>
body {
  background: #f5f5f9;
}
.ln-container {
  padding-right: 0rem;
  padding-left: 0rem;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 1400px) {
  .ln-container {
    max-width: 1440px;
  }
}
@media (min-width: 768px) {
  .ln-container {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
.no-select {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera, and Edge */
}
.text-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
