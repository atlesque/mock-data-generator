import type { MockTypeDescriptor } from '~/types/mock-types'

const mockTypes: MockTypeDescriptor[] = [
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text for your designs and mockups.',
    icon: 'i-lucide-text',
    seo: {
      title: 'Lorem Ipsum Placeholder Text Generator',
      description: 'Generate Lorem Ipsum placeholder text by paragraphs, sentences, words or characters for your designs and mockups. Copy or download it in one click.',
    },
  },
  {
    slug: 'iban-bic',
    name: 'IBAN / BIC',
    description: 'Generate valid IBAN and BIC codes for any SEPA country.',
    icon: 'i-lucide-credit-card',
    seo: {
      title: 'IBAN / BIC Generator for SEPA Countries',
      description: 'Generate valid, checksum-verified IBAN and BIC codes for any SEPA country, optionally tied to a real bank. Copy or download test data in one click.',
    },
  },
]

export function useMockTypes() {
  const types = ref<MockTypeDescriptor[]>(mockTypes)

  function lookupBySlug(slug: string): MockTypeDescriptor | undefined {
    return types.value.find(t => t.slug === slug)
  }

  return {
    types,
    lookupBySlug,
  }
}
