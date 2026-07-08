import type { IbanBicConfig, LoremIpsumConfig, MockTypeConfig } from '~/types/mock-types'

/**
 * Default configurations for each mock data type.
 * Extend this record when adding new mock types.
 */
const defaultConfigs: Record<string, MockTypeConfig> = {
  'lorem-ipsum': {
    mode: 'paragraphs',
    count: 1,
    startWithClassic: false,
  } satisfies LoremIpsumConfig,
  'iban-bic': {
    country: 'DE',
    generateBic: false,
  } satisfies IbanBicConfig,
}

/**
 * Generic composable for persisting mock-type settings across navigation
 * and full page refreshes.
 *
 * Uses Nuxt's `useCookie` under the hood so settings survive client-side
 * route changes and full page reloads. The cookie is JSON-serialized.
 *
 * @example
 * const { useConfig, updateConfig, resetConfig } = useMockSettings()
 * const loremConfig = useConfig<LoremIpsumConfig>('lorem-ipsum')
 * updateConfig('iban-bic', { country: 'FR', generateBic: true })
 */
export function useMockSettings() {
  const stored = useCookie<Record<string, MockTypeConfig>>('mock-settings', {
    default: () => ({}),
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    path: '/',
  })

  /**
   * Persist a slug's config by replacing the entire stored object
   * (useCookie only detects .value reassignments, not deep mutations).
   */
  function persist(slug: string, config: MockTypeConfig): void {
    stored.value = { ...stored.value, [slug]: config }
  }

  /**
   * Get or create a reactive config ref for a given mock-type slug.
   * The ref is automatically synced to the cookie on change.
   */
  function useConfig<const T extends MockTypeConfig = MockTypeConfig>(slug: string): Ref<T> {
    if (!(slug in stored.value) && slug in defaultConfigs) {
      persist(slug, { ...defaultConfigs[slug]! } as T)
    }

    const config = ref<T>((stored.value[slug] ?? defaultConfigs[slug] ?? {}) as T)

    watch(
      config,
      (val) => {
        persist(slug, { ...val } as MockTypeConfig)
      },
      { deep: true },
    )

    return config
  }

  /**
   * Directly update the stored config for a slug (useful for one-off mutations).
   */
  function updateConfig(slug: string, config: MockTypeConfig): void {
    persist(slug, { ...config })
  }

  /**
   * Reset a slug's config back to its default.
   */
  function resetConfig(slug: string): void {
    if (slug in defaultConfigs) {
      persist(slug, { ...defaultConfigs[slug]! })
    }
    else {
      const next = { ...stored.value }
      delete next[slug]
      stored.value = next
    }
  }

  return {
    /** The raw underlying useCookie ref (for debugging or direct access). */
    stored,
    useConfig,
    updateConfig,
    resetConfig,
  }
}
