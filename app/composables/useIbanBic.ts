import type { Bank } from '~/data/banks'
import { sepaCountries, type SepaCountry } from '~/data/sepa-countries'
import type { IbanBicConfig } from '~/types/mock-types'
import { generateIban, identifyBank } from '~/utils/iban'

export interface IbanBicResult {
  iban: string
  bic?: string
  /** The bank behind the IBAN, when its bank code is a known bank */
  bank?: Bank
}

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

  const result = computed<IbanBicResult>(() => {
    const c = country.value
    const iban = generateIban(c, { realBank: config.value.realBank })
    const bank = identifyBank(iban)
    const bic = config.value.generateBic ? (bank?.bic ?? generateBic(c.code)) : undefined
    return { iban, bic, bank }
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
