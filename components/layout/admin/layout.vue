<script lang="ts" setup>
// import HorizontalMenu from "@/components/menu/horizontal/MenuDropDown.vue";
import MenuLogo from "@/components/menu/logo/MenuLogo.vue";
import Vertical from "@/components/menu/vertical/MenuDropDown.vue";
import MenuMobile from "@/components/menu/mobile/Mobile.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { onMounted, onUnmounted, ref,nextTick  } from "vue";
import { useAppStore } from "@/stores/app";
import {useFindFirstFocusableElement} from "@/composables/useFindFirstFocusableElement"

interface MenuComponent {
  isOpen: boolean;
}

const menuRef = ref<MenuComponent | null>(null);

const appStore = useAppStore();
const device = computed(() => appStore.device);
const hasMounted = ref(false);
const isOpenVertical = computed(() => appStore.isOpenVertical);
const isLoadingModal = computed(() => appStore.isLoadingModal);

const handleClickMenu = () => {
  appStore.setOpenVertical(!isOpenVertical.value);
};

const containerClass = computed(() => {
  return (isOpenVertical.value && device.value == 'pc') ? 'w-calc-menu' : (!isOpenVertical.value && device.value == 'pc') ? 'w-calc-menu-close' : '';
});

onMounted(() => {
  hasMounted.value = true;
  if(device.value == 'pc'){
    useFindFirstFocusableElement()
  }
});
</script>
<template>
  <div v-if="hasMounted">
    <Vertical :type="device" ref="menuRef"> </Vertical>
    <!-- <MenuMobile :type="device" v-if="device == 'mobile'"> </MenuMobile>  -->
    <div class="container-wrap ml-auto transition-all duration-400 ease-in-out " :class="containerClass" >
      <div class="py-4 sticky top-0 ln-container  ">
        <MenuLogo :type="device" @clickMenu="handleClickMenu" />
        <!-- <div class="HorizontalMenu w-full relative top-[4rem] bg-bg_layout">
          <div class="ln-container"> -->
            <!-- <HorizontalMenu v-if="device == 'pc'" /> -->
          <!-- </div>
        </div> -->
      </div>
      <div class="ln-container ">
          <slot></slot>
      </div>
    </div>
  </div>
  <LoadingSpinner v-if="!isLoadingModal" />
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
.duration-400{
  transition-duration: 450ms;
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
body{
  overflow: hidden;
}
</style>
