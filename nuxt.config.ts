// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],
  ssr: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  nitro: {
    prerender: {
      routes: ['/', '/lorem-ipsum', '/iban-bic'],
    },
  },
  vite: {
    optimizeDeps: {
      include: ['fuse.js'],
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  devtools: { enabled: true },
  devServer: {
    port: 8550,
  },
  compatibilityDate: '2024-04-03',
})
