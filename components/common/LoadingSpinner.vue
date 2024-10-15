<template>
  <div  class="loading-overlay" :class="{'loading-modal': isLoadingModal}" v-if="isLoading">
    <div class="loadding">
      <div class="circle bg-white"></div>
      <div class="circle bg-white"></div>
      <div class="circle bg-white"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <span>Loading</span>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/stores/app";

const loadingStore = useAppStore();
const isLoading = computed(() => loadingStore.isLoading);
const isLoadingModal = computed(() => loadingStore.isLoadingModal);
</script>
  
  <style scoped>

  .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it appears on top */
}

.loading-overlay.loading-modal {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: unset;
  height: unset;
}



.loadding{
    width:200px;
    height:40px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
.circle{
    width:12px;
    height:12px;
    position: absolute;
    border-radius: 50%;
    left:30%;
    transform-origin: 50%;
    animation: circle .5s alternate infinite ease;
}

@keyframes circle{
    0%{
        top:40px;
        height:5px;
        border-radius: 50px 50px 25px 25px;
        transform: scaleX(1.7);
    }
    40%{
        height:20px;
        border-radius: 50%;
        transform: scaleX(1);
    }
    100%{
        top:0%;
    }
}
.circle:nth-child(2){
    left:45%;
    animation-delay: .2s;
}
.circle:nth-child(3){
    left:auto;
    right:30%;
    animation-delay: .3s;
}
.shadow{
    width:12px;
    height:4px;
    border-radius: 50%;
    background-color: rgba(0,0,0,.5);
    position: absolute;
    top:42px;
    transform-origin: 50%;
    z-index: -1;
    left:30%;
    filter: blur(1px);
    animation: shadow .5s alternate infinite ease;
}

@keyframes shadow{
    0%{
        transform: scaleX(1.5);
    }
    40%{
        transform: scaleX(1);
        opacity: .7;
    }
    100%{
        transform: scaleX(.2);
        opacity: .4;
    }
}
.shadow:nth-child(4){
    left: 45%;
    animation-delay: .2s
}
.shadow:nth-child(5){
    left:auto;
    right:30%;
    animation-delay: .3s;
}
.loadding span{
    position: absolute;
    top:60px;
    font-size: 12px;
    letter-spacing: 7px;
    color: #fff;
    left:30%;
}

</style>
  