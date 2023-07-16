// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
  ],
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BACK_URL || 'http://localhost:3001',
    },
  },
  auth: {
    // The module is enabled. Change this to disable the module
    isEnabled: true,
    // origin: PROCESS.ENV.AUTH_ORIGIN,
    globalAppMiddleware: true,
  },
  devtools: { enabled: true }
})
