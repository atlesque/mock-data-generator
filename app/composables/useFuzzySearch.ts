import Fuse from 'fuse.js'

export function useFuzzySearch<T>(
  items: Ref<T[]>,
  keys: string[],
  options?: {
    threshold?: number
    limit?: number
  },
) {
  const query = ref('')

  const fuse = computed(() => new Fuse(items.value, {
    keys,
    threshold: options?.threshold ?? 0.4,
    includeScore: true,
  }))

  const results = computed<T[]>(() => {
    const q = query.value.trim()
    if (!q) {
      return items.value.slice(0, options?.limit)
    }

    const searchResults = fuse.value.search(q)
    const limited = options?.limit
      ? searchResults.slice(0, options.limit)
      : searchResults

    return limited.map(r => r.item)
  })

  return {
    query,
    results,
  }
}
