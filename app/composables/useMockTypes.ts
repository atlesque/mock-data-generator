import type { MockTypeDescriptor } from '~/types/mock-types'

const mockTypes: MockTypeDescriptor[] = [
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text for your designs and mockups.',
    icon: 'i-lucide-text',
  },
  {
    slug: 'iban-bic',
    name: 'IBAN / BIC',
    description: 'Generate valid IBAN and BIC codes for any SEPA country.',
    icon: 'i-lucide-credit-card',
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
