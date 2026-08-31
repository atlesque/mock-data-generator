import { sepaCountries, type SepaCountry } from '~/data/sepa-countries'
import type { IbanBicConfig } from '~/types/mock-types'
import { generateIban } from '~/utils/iban'

function randomAlpha(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return letters[Math.floor(Math.random() * letters.length)]!
}

function randomAlphanumeric(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return chars[Math.floor(Math.random() * chars.length)]!
}

function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, '$1 ').trim()
}

function generateBic(countryCode: string): string {
  const bankCode = randomAlpha() + randomAlpha() + randomAlpha() + randomAlpha()
  const locationCode = randomAlphanumeric() + randomAlphanumeric()
  return bankCode + countryCode + locationCode
}

export function useIbanBic(config: Ref<IbanBicConfig>) {
  const country = computed<SepaCountry>(() => {
    const found = sepaCountries.find(c => c.code === config.value.country)
    return found ?? sepaCountries[0]!
  })

  const result = computed<{ iban: string; bic?: string }>(() => {
    const c = country.value
    const iban = generateIban(c)
    const bic = config.value.generateBic ? generateBic(c.code) : undefined
    return { iban, bic }
  })

  function regenerate() {
    triggerRef(config)
  }

  return {
    result,
    country,
    regenerate,
  }
}

export { formatIban }
