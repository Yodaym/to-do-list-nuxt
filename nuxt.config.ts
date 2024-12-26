// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-12-24',
});