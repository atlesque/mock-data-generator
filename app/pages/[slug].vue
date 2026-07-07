<template>
  <div class="mx-auto w-full max-w-5xl px-4 py-8">
    <NuxtLink
      to="/"
      class="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-highlighted transition-colors"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      Back to all types
    </NuxtLink>

    <template v-if="mockType">
      <div class="mb-8">
        <div class="flex items-center gap-3">
          <UIcon :name="mockType.icon" class="size-8 text-primary" />
          <h2 class="text-2xl font-bold text-highlighted">
            {{ mockType.name }}
          </h2>
        </div>
        <p class="mt-2 text-muted">
          {{ mockType.description }}
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            Configuration
          </h3>
          <UCard>
            <LoremIpsumConfig
              v-if="mockType.slug === 'lorem-ipsum'"
              :config="(config as LoremIpsumConfig)"
              @update:config="onConfigUpdate"
            />
            <IbanBicConfig
              v-else-if="mockType.slug === 'iban-bic'"
              :config="(config as IbanBicConfig)"
              @update:config="onConfigUpdate"
            />
          </UCard>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            Output
          </h3>

          <ClientOnly>
            <LoremIpsumOutput
              v-if="mockType.slug === 'lorem-ipsum'"
              :output="(generated as { data: string[] }).data"
            />
            <IbanBicOutput
              v-else-if="mockType.slug === 'iban-bic'"
              :result="(generated as { iban: string; bic?: string })"
            />

            <div class="mt-4">
              <OutputActions
                :output="outputText"
                :filename="mockType.slug"
                @regenerate="regenerate"
              />
            </div>

            <template #fallback>
              <div class="rounded-lg border border-default bg-elevated p-4">
                <div class="py-8 text-center text-muted text-sm">
                  Loading&hellip;
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </template>

    <div
      v-else
      class="py-16 text-center"
    >
      <UIcon
        name="i-lucide-alert-triangle"
        class="mx-auto size-12 text-muted"
      />
      <p class="mt-4 text-muted">
        Mock data type not found.
      </p>
      <UButton
        to="/"
        color="primary"
        variant="outline"
        label="Back to Home"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoremIpsumConfig, IbanBicConfig, MockTypeConfig } from '~/types/mock-types'

const route = useRoute()
const slug = route.params.slug as string

const { lookupBySlug } = useMockTypes()
const mockType = computed(() => lookupBySlug(slug))

// Default configs
const loremConfig = ref<LoremIpsumConfig>({
  mode: 'paragraphs',
  count: 1,
  startWithClassic: false,
})

const ibanConfig = ref<IbanBicConfig>({
  country: 'DE',
  generateBic: false,
})

const config = computed<MockTypeConfig>(() => {
  if (mockType.value?.slug === 'lorem-ipsum') return loremConfig.value
  return ibanConfig.value
})

// Generation composables
const loremGen = useLoremIpsum(loremConfig)
const ibanGen = useIbanBic(ibanConfig)

const generated = computed(() => {
  if (mockType.value?.slug === 'lorem-ipsum') {
    return { data: loremGen.output.value }
  }
  return ibanGen.result.value
})

const outputText = computed(() => {
  if (mockType.value?.slug === 'lorem-ipsum') {
    return (generated.value as { data: string[] }).data.join('\n\n')
  }
  const r = generated.value as { iban: string; bic?: string }
  return r.bic ? `${r.iban}\n${r.bic}` : r.iban
})

function onConfigUpdate(newConfig: MockTypeConfig) {
  if (mockType.value?.slug === 'lorem-ipsum') {
    loremConfig.value = newConfig as LoremIpsumConfig
  }
  else {
    ibanConfig.value = newConfig as IbanBicConfig
  }
}

function regenerate() {
  if (mockType.value?.slug === 'lorem-ipsum') {
    loremGen.regenerate()
  }
  else {
    ibanGen.regenerate()
  }
}
</script>
