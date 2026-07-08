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

/**
 * Converts an IBAN string to its numeric representation for mod-97 checks.
 * A=10, B=11, …, Z=35. Non-alpha characters pass through unchanged.
 */
function ibanToDigitString(iban: string): string {
  let result = ''
  for (let i = 0; i < iban.length; i++) {
    const ch = iban[i]!
    if (ch >= 'A' && ch <= 'Z') {
      result += (ch.charCodeAt(0) - 55).toString()
    } else {
      result += ch
    }
  }
  return result
}

/**
 * Computes modulo 97 on an arbitrarily long digit string using the
 * iterative (piecewise) algorithm required by ISO 13616 / ECBS.
 * This is the canonical IBAN checksum algorithm — no BigInt needed.
 */
function mod97(digitString: string): number {
  let remainder = 0
  for (let i = 0; i < digitString.length; i++) {
    remainder = (remainder * 10 + parseInt(digitString[i]!, 10)) % 97
  }
  return remainder
}

/**
 * Validates an IBAN according to ISO 13616:
 * 1. Move the first 4 characters to the end
 * 2. Convert all letters to digits (A=10, …, Z=35)
 * 3. Compute the integer modulo 97 — must equal 1
 */
export function isValidIban(iban: string): boolean {
  const normalized = iban.replace(/\s+/g, '').toUpperCase()
  if (normalized.length < 5) return false
  // Move first 4 chars (country code + checksum) to the end
  const rearranged = normalized.slice(4) + normalized.slice(0, 4)
  const digitString = ibanToDigitString(rearranged)
  return mod97(digitString) === 1
}

function iso13616Checksum(countryCode: string, bban: string): string {
  // Move country code to the end, append "00" as placeholder checksum
  const rearranged = bban + countryCode + '00'
  const digitString = ibanToDigitString(rearranged)
  const remainder = mod97(digitString)
  // 98 - remainder gives the checksum that makes the whole IBAN ≡ 1 (mod 97)
  const checksum = 98 - remainder
  return checksum.toString().padStart(2, '0')
}

function generateIban(country: SepaCountry): string {
  const bbanLength = country.ibanLength - 4
  const bban = generateBban(bbanLength)
  const checksum = iso13616Checksum(country.code, bban)
  const iban = country.code + checksum + bban

  // Safety net: validate the generated IBAN; regenerate if invalid
  if (!isValidIban(iban)) {
    // This should never happen with the canonical algorithm, but fall back
    // to a retry with a fresh BBAN to be absolutely safe.
    const retryBban = generateBban(bbanLength)
    const retryChecksum = iso13616Checksum(country.code, retryBban)
    return country.code + retryChecksum + retryBban
  }

  return iban
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
