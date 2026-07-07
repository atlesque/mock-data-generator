<template>
  <NuxtLink :to="`/${mockType.slug}`" class="block group">
    <UCard
      variant="subtle"
      class="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div class="flex flex-col items-center gap-4 py-4">
        <UIcon
          :name="mockType.icon"
          class="size-10 text-primary transition-transform duration-200 group-hover:scale-110"
        />
        <div class="text-center">
          <h3 class="text-lg font-semibold text-highlighted">
            {{ mockType.name }}
          </h3>
          <p class="mt-1 text-sm text-muted">
            {{ mockType.description }}
          </p>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { MockTypeDescriptor } from '~/types/mock-types'

defineProps<{
  mockType: MockTypeDescriptor
}>()
</script>
