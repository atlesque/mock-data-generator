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
        <div class="mt-1 flex items-center gap-2">
          <p class="font-mono text-lg text-highlighted tracking-wider">
            {{ formatIban(result.iban) }}
          </p>
          <div class="flex items-center gap-1">
            <span
              v-if="ibanCopied"
              class="text-xs text-success"
            >Copied!</span>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-copy"
              size="xs"
              @click="copyIban"
            />
          </div>
        </div>
      </div>
      <div>
        <span class="text-xs font-medium uppercase tracking-wide text-muted">Bank</span>
        <p
          v-if="result.bank"
          class="mt-1 flex items-center gap-1.5 text-highlighted"
        >
          <UIcon name="i-lucide-landmark" class="size-4 text-success" />
          {{ result.bank.name }}
        </p>
        <p
          v-else
          class="mt-1 flex items-center gap-1.5 text-sm text-warning"
        >
          <UIcon name="i-lucide-triangle-alert" class="size-4" />
          Bank code not linked to a known bank. Enable "Real bank only" to always get one.
        </p>
      </div>
      <div v-if="result.bic">
        <span class="text-xs font-medium uppercase tracking-wide text-muted">BIC</span>
        <div class="mt-1 flex items-center gap-2">
          <p class="font-mono text-lg text-highlighted tracking-wider">
            {{ result.bic }}
          </p>
          <div class="flex items-center gap-1">
            <span
              v-if="bicCopied"
              class="text-xs text-success"
            >Copied!</span>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-copy"
              size="xs"
              @click="copyBic"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIban, type IbanBicResult } from '~/composables/useIbanBic'

const props = defineProps<{
  result: IbanBicResult
}>()

const { copyToClipboard: copyIbanToClipboard } = useClipboard()
const { copyToClipboard: copyBicToClipboard } = useClipboard()

const ibanCopied = ref(false)
const bicCopied = ref(false)

async function copyIban() {
  ibanCopied.value = false
  const success = await copyIbanToClipboard(props.result.iban)
  if (success) {
    ibanCopied.value = true
    setTimeout(() => { ibanCopied.value = false }, 2000)
  }
}

async function copyBic() {
  bicCopied.value = false
  const success = await copyBicToClipboard(props.result.bic ?? '')
  if (success) {
    bicCopied.value = true
    setTimeout(() => { bicCopied.value = false }, 2000)
  }
}
</script>
