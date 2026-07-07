// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
