<template>
  <div class="space-y-4">
    <USelect
      :model-value="config.country"
      :items="countryOptions"
      label="Country"
      placeholder="Select a country..."
      @update:model-value="(v: string) => emit('update:config', { ...config, country: v })"
    />

    <UCheckbox
      :model-value="config.generateBic"
      label="Generate BIC"
      description="Also generate a BIC (Business Identifier Code)"
      @update:model-value="(v: boolean) => emit('update:config', { ...config, generateBic: v })"
    />

    <UCheckbox
      :model-value="config.realBank ?? false"
      label="Real bank only"
      description="Only use bank codes of known banks, so the IBAN can be traced to a real bank"
      @update:model-value="(v: boolean) => emit('update:config', { ...config, realBank: v })"
    />
  </div>
</template>

<script setup lang="ts">
import type { IbanBicConfig } from '~/types/mock-types'
import { sepaCountries } from '~/data/sepa-countries'

const props = defineProps<{
  config: IbanBicConfig
}>()

const emit = defineEmits<{
  'update:config': [config: IbanBicConfig]
}>()

const countryOptions = sepaCountries.map(c => ({
  label: `${c.name} (${c.code})`,
  value: c.code,
}))
</script>
