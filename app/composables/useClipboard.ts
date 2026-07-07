export function useClipboard() {
  const copied = ref(false)
  const error = ref<string | null>(null)

  async function copyToClipboard(text: string): Promise<boolean> {
    error.value = null
    copied.value = false

    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      return true
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy to clipboard'
      return false
    }
  }

  function reset() {
    copied.value = false
    error.value = null
  }

  return {
    copied,
    error,
    copyToClipboard,
    reset,
  }
}
