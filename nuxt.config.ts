// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/main.scss', // This will include the Tailwind and custom SCSS globally
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-jsonld', '@nuxtjs/seo', '@vite-pwa/nuxt','@nuxt/image'],
 
})