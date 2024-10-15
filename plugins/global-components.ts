// plugins/global-components.ts
import { defineNuxtPlugin } from '#app'
import TextInput from "@/components/form/TextInput.vue";
import VButton from "@/components/form/Button.vue";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TextInput', TextInput)
  nuxtApp.vueApp.component('VButton', VButton)
})
