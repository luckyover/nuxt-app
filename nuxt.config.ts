// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    'layers/modals',
    'layers/ui'
  ],
  css: [
    '@/assets/main.scss', // This will include the Tailwind and custom SCSS globally
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"' }
      ]
    }
  },
  modules: [
    'nuxt-jsonld',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-headlessui',
    '@nuxt/icon',
    '@headlessui-float/nuxt'
  ],
  routeRules: {
    '/admin/**': { appMiddleware: 'auth-admin' },
    '/**': {
      appMiddleware: 'check-device',  // Apply checkDevice middleware for the root route
  },
  },

  runtimeConfig: {
    public: {
      API_URI: process.env.API_URI || 'http://localhost:3000', // Default value if not set
      API_PATH: process.env.API_PATH || '/api',
      API_KEY: process.env.API_KEY,
      API_TIMEOUT: process.env.API_TIMEOUT || '60000',
    },
  },
  
})