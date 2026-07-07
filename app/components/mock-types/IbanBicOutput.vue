<template>
  <div class="rounded-lg border border-default bg-elevated p-4">
    <div
      v-if="!result.iban"
      class="py-8 text-center text-muted text-sm"
    >
      Configure options and click Regenerate to generate an IBAN.
    </div>
    <div v-else class="space-y-3">
      <div>
        <span class="text-xs font-medium uppercase tracking-wide text-muted">IBAN</span>
        <p class="mt-1 font-mono text-lg text-highlighted tracking-wider">
          {{ formatIban(result.iban) }}
        </p>
      </div>
      <div v-if="result.bic">
        <span class="text-xs font-medium uppercase tracking-wide text-muted">BIC</span>
        <p class="mt-1 font-mono text-lg text-highlighted tracking-wider">
          {{ result.bic }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIban } from '~/composables/useIbanBic'

defineProps<{
  result: { iban: string; bic?: string }
}>()
</script>
