<script setup lang="ts">
import { ref } from "vue";
import MenuChildDropDown from "@/components/menu/horizontal/MenuChildDropDown.vue";
import menu from "@/data/menu";
import { useTab } from "@/composables/tab-menu.ts";

const menu_inner = ref<HTMLElement | null>(null); 
useTab(menu_inner); 

</script>
<template>
  <div class="w-full  mx-auto " id="horizontal">
    <ul class="menu-inner overflow-x-auto overflow-y-hidden" ref="menu_inner">
      <MenuChildDropDown
        v-for="(item, index) in menu"
        :key="index"
        :item="item"
        :parent="true"
      />
    </ul>
  </div>
</template>

<style lang="scss">
#horizontal .menu-inner {
  display: flex;
  scrollbar-width: none;
  scroll-behavior: smooth;
  transition: margin 0.3s;
  .menu-link {
    position: relative;
    padding: 9px 35px 9px 16px;
    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 2px);
      right: calc(1rem + 0.21em);
      display: block;
      width: 0.42em;
      height: 0.42em;
      border: 1.5px solid #384551;
      border-bottom: 0;
      border-left: 0;
      transform: translateY(-50%) rotate(135deg);
    }
  }
}
#horizontal .menu-link {
  border-radius: 0.375rem;
  padding: 9px 35px 9px 16px;
  &:hover {
    background-color: rgba(67, 89, 113, 0.04);
  }
}
///ul child
#horizontal .menu-sub {
  position: absolute;
  width: 14.5rem;
  padding: 0.325rem 0;
  border-radius: 0.375rem;
  background: #fff;
  box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);
  .menu-item:not(.has-child) > .menu-link {
    &::after {
      width: 0em;
      height: 0em;
      display: none;
    }
  }
  .menu-item.has-child > .menu-link {
    &::after {
      transform: translateY(-50%) rotate(45deg);
    }
  }
}
#horizontal .menu-item {
  position: relative;
}
#horizontal .menu-inner > .menu-item {
  position: unset;
}
#horizontal .menu-inner > .menu-item:not(.item-child) > .menu-sub.right {
  margin-left: -80px;
  left: unset;
}
#horizontal .menu-sub.right {
  left: calc(-100% + 35px);
}
#horizontal .item-child > .menu-sub {
  left: 100%;
  top: 2px;
  width: 100%;
  padding: 0.425rem 0;
}
#horizontal .item-child > .menu-sub.right {
  left: -100%;
  top: 2px;
  width: 100%;
  padding: 0.425rem 0;
}

#horizontal .menu-link.not-icon:before {
  content: "";
  position: absolute;
  left: 1.4375rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: #b4bdc6 !important;
}
#horizontal .menu-horizontal-prev.disabled, .menu-horizontal-next.disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

#horizontal .menu-horizontal-prev {
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 2.25rem;
  height: 2.25rem;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid;
    border-top: 0;
    border-right: 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
#horizontal .menu-horizontal-next {
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 2.25rem;
  height: 2.25rem;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid;
    border-top: 0;
    border-left: 0;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
