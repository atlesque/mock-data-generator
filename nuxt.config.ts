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
      meta: [
        { property: 'og:site_name', content: 'Mock Data Generator' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://mock-data.atlesque.dev/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Mock Data Generator logo with the tagline: placeholder text and valid test data, generated in your browser' },
        { name: 'twitter:card', content: 'summary_large_image' },
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
