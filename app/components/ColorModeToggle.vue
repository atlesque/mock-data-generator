<script setup lang="ts">
const colorMode = useColorMode()

const modes = [
  { value: 'system', icon: 'i-lucide-monitor' },
  { value: 'light', icon: 'i-lucide-sun' },
  { value: 'dark', icon: 'i-lucide-moon' },
]

const currentIndex = computed(() => modes.findIndex(m => m.value === colorMode.preference))
const currentMode = computed(() => modes[currentIndex.value])

function cycle() {
  const next = (currentIndex.value + 1) % modes.length
  colorMode.preference = modes[next].value
}
</script>

<template>
  <UButton
    :icon="currentMode.icon"
    color="neutral"
    variant="ghost"
    square
    :aria-label="`Color mode: ${currentMode.value}`"
    @click="cycle"
  />
</template>
