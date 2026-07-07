<template>
  <div class="mx-auto w-full max-w-5xl px-4 py-8">
    <div class="mb-8 flex justify-center">
      <MockTypeSearch v-model="query" />
    </div>

    <div
      v-if="results.length === 0"
      class="py-16 text-center"
    >
      <UIcon
        name="i-lucide-search-x"
        class="mx-auto size-12 text-muted"
      />
      <p class="mt-4 text-muted">
        No mock data types found for "{{ query }}"
      </p>
    </div>

    <div
      v-else
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <MockTypeCard
        v-for="mockType in results"
        :key="mockType.slug"
        :mock-type="mockType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MockTypeDescriptor } from '~/types/mock-types'

const { types } = useMockTypes()
const { query, results } = useFuzzySearch<MockTypeDescriptor>(types, ['name', 'description'])
</script>
