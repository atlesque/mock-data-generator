<template>
  <div class="flex flex-wrap gap-2">
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

const { downloadAsFile } = useDownload()

function handleDownload() {
  downloadAsFile(props.output, `${props.filename ?? 'output'}.txt`)
}
</script>
