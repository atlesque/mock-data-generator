const SITE_URL = 'https://mock-data.atlesque.dev'
const SITE_NAME = 'Mock Data Generator'

interface PageSeo {
  /** Page title without the site name suffix; also used as og:title */
  title: string
  description: string
  /** Route path, e.g. "/iban-bic". Normalised to the trailing-slash URL Cloudflare Pages serves. */
  path: string
}

export function usePageSeo(seo: MaybeRefOrGetter<PageSeo>) {
  const url = computed(() => {
    const path = toValue(seo).path.replace(/\/?$/, '/')
    return `${SITE_URL}${path}`
  })

  useHead({
    // The home page title already contains the site name
    titleTemplate: () => toValue(seo).path === '/' ? '%s' : `%s | ${SITE_NAME}`,
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    title: () => toValue(seo).title,
    description: () => toValue(seo).description,
    ogTitle: () => toValue(seo).title,
    ogDescription: () => toValue(seo).description,
    ogUrl: url,
  })
}
