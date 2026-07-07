<template>
  <div class="space-y-4">
    <USelect
      :model-value="config.mode"
      :items="modeOptions"
      label="Generation Mode"
      @update:model-value="(v: LoremIpsumConfig['mode']) => emit('update:config', { ...config, mode: v })"
    />

    <UInput
      :model-value="String(config.count)"
      type="number"
      label="Count"
      :min="1"
      :max="100"
      @update:model-value="(v: string) => emit('update:config', { ...config, count: Math.max(1, Math.min(100, parseInt(v) || 1)) })"
    />

    <UCheckbox
      :model-value="config.startWithClassic"
      label="Start with classic"
      description="Always begin with 'Lorem ipsum dolor sit amet…'"
      @update:model-value="(v: boolean) => emit('update:config', { ...config, startWithClassic: v })"
    />
  </div>
</template>

<script setup lang="ts">
import type { LoremIpsumConfig } from '~/types/mock-types'

const props = defineProps<{
  config: LoremIpsumConfig
}>()

const emit = defineEmits<{
  'update:config': [config: LoremIpsumConfig]
}>()

const modeOptions = [
  { label: 'Paragraphs', value: 'paragraphs' },
  { label: 'Sentences', value: 'sentences' },
  { label: 'Words', value: 'words' },
  { label: 'Characters', value: 'chars' },
]
</script>
