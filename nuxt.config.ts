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
      htmlAttrs: { lang: 'en' },
      // Shared link-preview defaults; pages set title, description and URLs via usePageSeo().
      // There is no 1200x630 share image yet, so X/Twitter uses the small "summary" card.
      meta: [
        { property: 'og:site_name', content: 'Mock Data Generator' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      // Shared opt-in consent banner; loads analytics only after "Allow".
      script: [
        { src: 'https://tools.atlesque.dev/consent.js', defer: true },
      ],
    },
  },
  devtools: { enabled: true },
  devServer: {
    port: 8550,
  },
  compatibilityDate: '2024-04-03',
})
