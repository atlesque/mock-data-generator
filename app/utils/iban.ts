import type { SepaCountry } from '../data/sepa-countries.ts'
import { banksByCountry, type Bank } from '../data/banks.ts'
import { isValidIBAN, validateIBAN } from 'ibantools'

export interface GenerateIbanOptions {
  /** Only use bank codes of known banks for the selected country */
  realBank?: boolean
}

const MAX_IBAN_ATTEMPTS = 5

function randomDigit(): number {
  return Math.floor(Math.random() * 10)
}

function randomAlpha(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return letters[Math.floor(Math.random() * letters.length)]!
}

function randomAlphanumeric(): string {
  return randomDigit() < 5 ? randomDigit().toString() : randomAlpha()
}

function generateRandom(length: number, nextCharacter: () => string): string {
  let bban = ''
  for (let i = 0; i < length; i++) {
    bban += nextCharacter()
  }
  return bban
}

function generateDigits(length: number): string {
  return generateRandom(length, () => randomDigit().toString())
}

function generateLetters(length: number): string {
  return generateRandom(length, randomAlpha)
}

function generateAlphanumeric(length: number): string {
  return generateRandom(length, randomAlphanumeric)
}

/** Generates a segment of the given length that starts with the bank code, if any */
function withBankCode(bankCode: string | undefined, length: number, generate: (length: number) => string): string {
  if (!bankCode) return generate(length)
  return bankCode + generate(length - bankCode.length)
}

function belgianNationalChecksum(firstTenDigits: string): string {
  const remainder = BigInt(firstTenDigits) % 97n
  const checksum = remainder === 0n ? 97n : remainder
  return checksum.toString().padStart(2, '0')
}

function generateBelgianBban(bankCode?: string): string {
  const firstTenDigits = withBankCode(bankCode, 10, generateDigits)
  return firstTenDigits + belgianNationalChecksum(firstTenDigits)
}

function mod97(value: string, convertLetters = false): bigint {
  const numericValue = convertLetters
    ? Array.from(value).map(character => {
        if (/\d/.test(character)) return character
        const frenchLetterValues = '12345678912345678923456789'
        return frenchLetterValues[character.charCodeAt(0) - 65]!
      }).join('')
    : value
  return BigInt(numericValue) % 97n
}

function ibanNumericValue(value: string): string {
  return Array.from(value).map(character => (
    /\d/.test(character) ? character : (character.charCodeAt(0) - 55).toString()
  )).join('')
}

function generateMod97Bban(prefixLength: number, bankCode?: string): string {
  const prefix = withBankCode(bankCode, prefixLength, generateDigits)
  for (let check = 0; check < 100; check++) {
    const suffix = check.toString().padStart(2, '0')
    if (mod97(prefix + suffix) === 1n) return prefix + suffix
  }
  throw new Error('Unable to generate a MOD-97 BBAN.')
}

function generateFrenchBban(bankCode?: string): string {
  const prefix = withBankCode(bankCode, 10, generateDigits) + generateAlphanumeric(11)
  for (let check = 0; check < 100; check++) {
    const suffix = check.toString().padStart(2, '0')
    if (mod97(prefix + suffix, true) === 0n) return prefix + suffix
  }
  throw new Error('Unable to generate a French BBAN checksum.')
}

function mod1110CheckDigit(value: string): string {
  let number = 10
  for (const character of value) {
    number += Number(character)
    if (number % 10 !== 0) number %= 10
    number = (number * 2) % 11
  }
  const check = 11 - number
  return (check === 10 ? 0 : check).toString()
}

function weightedMod11CheckDigit(value: string, weights: number[]): string {
  const sum = Array.from(value).reduce((total, character, index) => (
    total + Number(character) * weights[index]!
  ), 0)
  const remainder = sum % 11
  const check = remainder === 0 || remainder === 1 ? remainder : 11 - remainder
  return check.toString()
}

function weightedMod10CheckDigit(value: string, weights: number[]): string {
  const sum = Array.from(value).reduce((total, character, index) => (
    total + Number(character) * weights[index]!
  ), 0)
  const remainder = sum % 10
  return (remainder === 0 ? 0 : 10 - remainder).toString()
}

function generateCroatianBban(bankCode?: string): string {
  // Croatian bank codes already include their check digit
  const bankBranch = bankCode ?? withCheckDigit(generateDigits(6))
  return bankBranch + withCheckDigit(generateDigits(9))
}

function withCheckDigit(value: string): string {
  return value + mod1110CheckDigit(value)
}

function generateCzechOrSlovakBban(bankCode?: string): string {
  const prefix = withBankCode(bankCode, 4, generateDigits) + generateDigits(5)
  const account = generateDigits(9)
  return prefix + weightedMod11CheckDigit(prefix.slice(4), [10, 5, 8, 4, 2, 1])
    + account + weightedMod11CheckDigit(account, [6, 3, 7, 9, 10, 5, 8, 4, 2, 1])
}

function generateEstonianBban(bankCode?: string): string {
  const firstTwoDigits = withBankCode(bankCode, 2, generateDigits)
  const checkingPart = generateDigits(13)
  const weights = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7]
  return firstTwoDigits + checkingPart + weightedMod10CheckDigit(checkingPart, weights)
}

function generateHungarianBban(bankCode?: string): string {
  const bankBranch = withBankCode(bankCode, 7, generateDigits)
  const account = generateDigits(15)
  const weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3]
  return bankBranch + weightedMod10CheckDigit(bankBranch, weights)
    + account + weightedMod10CheckDigit(account, weights)
}

function generateNorwegianBban(bankCode?: string): string {
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  while (true) {
    const account = withBankCode(bankCode, 10, generateDigits)
    const sum = Array.from(account).reduce((total, character, index) => (
      total + Number(character) * weights[index]!
    ), 0)
    const remainder = sum % 11
    const check = remainder === 0 ? 0 : 11 - remainder
    if (check <= 9) return account + check.toString()
  }
}

function generatePolishBban(bankCode?: string): string {
  const bankBranch = withBankCode(bankCode, 7, generateDigits)
  const account = generateDigits(16)
  return bankBranch + weightedMod10CheckDigit(bankBranch, [3, 9, 7, 1, 3, 9, 7]) + account
}

function generateSpanishBban(bankCode?: string): string {
  const bankBranch = withBankCode(bankCode, 8, generateDigits)
  const account = generateDigits(10)
  const bankWeights = [4, 8, 5, 10, 9, 7, 3, 6]
  const accountWeights = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6]
  return bankBranch + weightedSpanishCheckDigit(bankBranch, bankWeights)
    + weightedSpanishCheckDigit(account, accountWeights) + account
}

function weightedSpanishCheckDigit(value: string, weights: number[]): string {
  const sum = Array.from(value).reduce((total, character, index) => (
    total + Number(character) * weights[index]!
  ), 0)
  const remainder = sum % 11
  return (remainder === 0 ? 0 : remainder === 1 ? 1 : 11 - remainder).toString()
}

function generateBban(country: SepaCountry, bankCode?: string): string {
  const digits = (length: number) => withBankCode(bankCode, length, generateDigits)
  const letters = (length: number) => withBankCode(bankCode, length, generateLetters)
  const alphanumeric = (length: number) => withBankCode(bankCode, length, generateAlphanumeric)

  switch (country.code) {
    case 'BE': return generateBelgianBban(bankCode)
    case 'BG': return letters(4) + generateDigits(6) + generateAlphanumeric(8)
    case 'HR': return generateCroatianBban(bankCode)
    case 'CY': return digits(8) + generateAlphanumeric(16)
    case 'CZ':
    case 'SK': return generateCzechOrSlovakBban(bankCode)
    case 'EE': return generateEstonianBban(bankCode)
    case 'FR':
    case 'MC': return generateFrenchBban(bankCode)
    case 'HU': return generateHungarianBban(bankCode)
    case 'IE': return alphanumeric(4) + generateDigits(14)
    case 'IT':
    case 'SM': return generateLetters(1) + digits(10) + generateAlphanumeric(12)
    case 'LV': return letters(4) + generateAlphanumeric(13)
    case 'LI': return digits(5) + generateAlphanumeric(12)
    case 'LU': return digits(3) + generateAlphanumeric(13)
    case 'MT': return letters(4) + generateDigits(5) + generateAlphanumeric(18)
    case 'GR': return digits(7) + generateAlphanumeric(16)
    case 'NL': return letters(4) + generateDigits(10)
    case 'NO': return generateNorwegianBban(bankCode)
    case 'PL': return generatePolishBban(bankCode)
    case 'PT': return generateMod97Bban(19, bankCode)
    case 'RO': return letters(4) + generateAlphanumeric(16)
    case 'SI': return generateMod97Bban(13, bankCode)
    case 'ES': return generateSpanishBban(bankCode)
    case 'CH': return digits(5) + generateAlphanumeric(12)
    case 'GB': return letters(4) + generateDigits(14)
    default: return digits(country.ibanLength - 4)
  }
}

function iso13616Checksum(countryCode: string, bban: string): string {
  const countryDigits = (countryCode.charCodeAt(0) - 55).toString()
    + (countryCode.charCodeAt(1) - 55).toString()
  const rearranged = bban + countryDigits + '00'
  const mod = BigInt(ibanNumericValue(rearranged)) % 97n
  const checksum = 98n - mod
  return checksum.toString().padStart(2, '0')
}

/**
 * Looks up the bank behind an IBAN in the bundled bank dataset.
 * Returns undefined when the bank code is not a known bank.
 */
export function identifyBank(iban: string): Bank | undefined {
  const normalized = iban.replace(/\s+/g, '').toUpperCase()
  const countryBanks = banksByCountry[normalized.slice(0, 2)]
  if (!countryBanks) return undefined

  const bban = normalized.slice(4)
  return countryBanks.banks.find(bank => bban.startsWith(bank.code, countryBanks.offset))
}

/** Whether "real bank only" generation is supported for the given country */
export function hasKnownBanks(countryCode: string): boolean {
  return (banksByCountry[countryCode]?.banks.length ?? 0) > 0
}

function pickBank(country: SepaCountry): Bank {
  const banks = banksByCountry[country.code]?.banks
  if (!banks?.length) {
    throw new Error(`No known banks are available for ${country.name}.`)
  }
  return banks[Math.floor(Math.random() * banks.length)]!
}

export function generateIban(country: SepaCountry, options: GenerateIbanOptions = {}): string {
  let lastCandidate = ''

  for (let attempt = 0; attempt < MAX_IBAN_ATTEMPTS; attempt++) {
    const bankCode = options.realBank ? pickBank(country).code : undefined
    const bban = generateBban(country, bankCode)
    const checksum = iso13616Checksum(country.code, bban)
    lastCandidate = country.code + checksum + bban

    if (isValidIBAN(lastCandidate)) return lastCandidate
  }

  const validation = validateIBAN(lastCandidate)
  throw new Error(
    `Unable to generate a valid ${country.name} IBAN after ${MAX_IBAN_ATTEMPTS} attempts. `
    + `Validation errors: ${validation.errorCodes.join(', ') || 'unknown'}.`,
  )
}
