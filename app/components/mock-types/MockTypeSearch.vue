<template>
  <div class="w-full">
    <UInput
      v-model="searchQuery"
      class="w-full"
      icon="i-lucide-search"
      placeholder="Search mock data types..."
      size="lg"
      color="neutral"
      variant="outline"
    />
  </div>
</template>

<script setup lang="ts">
const searchQuery = defineModel<string>({ required: true })
</script>
