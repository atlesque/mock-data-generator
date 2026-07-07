import { sepaCountries, type SepaCountry } from '~/data/sepa-countries'
import type { IbanBicConfig } from '~/types/mock-types'

function randomDigit(): number {
  return Math.floor(Math.random() * 10)
}

function randomAlpha(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return letters[Math.floor(Math.random() * letters.length)]!
}

function randomAlphanumeric(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return chars[Math.floor(Math.random() * chars.length)]!
}

function generateBban(length: number): string {
  let bban = ''
  for (let i = 0; i < length; i++) {
    bban += randomDigit().toString()
  }
  return bban
}

function iso13616Checksum(countryCode: string, bban: string): string {
  const countryDigits = (countryCode.charCodeAt(0) - 55).toString()
    + (countryCode.charCodeAt(1) - 55).toString()
  const rearranged = bban + countryDigits + '00'
  const mod = BigInt(rearranged) % 97n
  const checksum = 98n - mod
  return checksum.toString().padStart(2, '0')
}

function generateIban(country: SepaCountry): string {
  const bbanLength = country.ibanLength - 4
  const bban = generateBban(bbanLength)
  const checksum = iso13616Checksum(country.code, bban)
  return country.code + checksum + bban
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
