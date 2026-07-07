<template>
  <div class="rounded-lg border border-default bg-elevated p-4">
    <div
      v-if="output.length === 0"
      class="py-8 text-center text-muted text-sm"
    >
      Configure options and click Regenerate to generate Lorem Ipsum text.
    </div>
    <div
      v-for="(item, index) in output"
      v-else
      :key="index"
      class="mb-3 last:mb-0"
    >
      <p class="leading-relaxed text-default">
        {{ item }}
      </p>
      <hr
        v-if="index < output.length - 1 && output.length > 1"
        class="my-3 border-default"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  output: string[]
}>()
</script>
