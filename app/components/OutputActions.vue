<template>
  <div class="flex flex-wrap gap-2">
    <UButton
      color="neutral"
      variant="outline"
      icon="i-lucide-copy"
      size="sm"
      label="Copy"
      @click="handleCopy"
    />
    <UButton
      color="neutral"
      variant="outline"
      icon="i-lucide-download"
      size="sm"
      label="Download"
      @click="handleDownload"
    />
    <UButton
      color="neutral"
      variant="outline"
      icon="i-lucide-refresh-cw"
      size="sm"
      label="Regenerate"
      @click="$emit('regenerate')"
    />
    <span
      v-if="copySuccess"
      class="flex items-center gap-1 text-sm text-success"
    >
      <UIcon name="i-lucide-check" class="size-4" />
      Copied!
    </span>
    <span
      v-if="copyError"
      class="text-sm text-error"
    >
      {{ copyError }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  output: string
  filename?: string
}>()

defineEmits<{
  regenerate: []
}>()

const { copied: copySuccess, error: copyError, copyToClipboard, reset } = useClipboard()
const { downloadAsFile } = useDownload()

async function handleCopy() {
  reset()
  await copyToClipboard(props.output)
}

function handleDownload() {
  downloadAsFile(props.output, `${props.filename ?? 'output'}.txt`)
}
</script>
