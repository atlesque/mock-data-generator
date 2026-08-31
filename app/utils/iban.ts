import type { SepaCountry } from '../data/sepa-countries.ts'
import { isValidIBAN, validateIBAN } from 'ibantools'

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

function belgianNationalChecksum(firstTenDigits: string): string {
  const remainder = BigInt(firstTenDigits) % 97n
  const checksum = remainder === 0n ? 97n : remainder
  return checksum.toString().padStart(2, '0')
}

function generateBelgianBban(): string {
  const firstTenDigits = generateDigits(10)
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

function generateMod97Bban(prefixLength: number): string {
  const prefix = generateDigits(prefixLength)
  for (let check = 0; check < 100; check++) {
    const suffix = check.toString().padStart(2, '0')
    if (mod97(prefix + suffix) === 1n) return prefix + suffix
  }
  throw new Error('Unable to generate a MOD-97 BBAN.')
}

function generateFrenchBban(): string {
  const prefix = generateDigits(10) + generateAlphanumeric(11)
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

function generateCroatianBban(): string {
  const bankBranch = generateDigits(6)
  const account = generateDigits(9)
  return bankBranch + mod1110CheckDigit(bankBranch) + account + mod1110CheckDigit(account)
}

function generateCzechOrSlovakBban(): string {
  const prefix = generateDigits(4) + generateDigits(5)
  const account = generateDigits(9)
  return prefix + weightedMod11CheckDigit(prefix.slice(4), [10, 5, 8, 4, 2, 1])
    + account + weightedMod11CheckDigit(account, [6, 3, 7, 9, 10, 5, 8, 4, 2, 1])
}

function generateEstonianBban(): string {
  const firstTwoDigits = generateDigits(2)
  const checkingPart = generateDigits(13)
  const weights = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7]
  return firstTwoDigits + checkingPart + weightedMod10CheckDigit(checkingPart, weights)
}

function generateHungarianBban(): string {
  const bankBranch = generateDigits(7)
  const account = generateDigits(15)
  const weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3]
  return bankBranch + weightedMod10CheckDigit(bankBranch, weights)
    + account + weightedMod10CheckDigit(account, weights)
}

function generateNorwegianBban(): string {
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  while (true) {
    const account = generateDigits(10)
    const sum = Array.from(account).reduce((total, character, index) => (
      total + Number(character) * weights[index]!
    ), 0)
    const remainder = sum % 11
    const check = remainder === 0 ? 0 : 11 - remainder
    if (check <= 9) return account + check.toString()
  }
}

function generatePolishBban(): string {
  const bankBranch = generateDigits(7)
  const account = generateDigits(16)
  return bankBranch + weightedMod10CheckDigit(bankBranch, [3, 9, 7, 1, 3, 9, 7]) + account
}

function generateSpanishBban(): string {
  const bankBranch = generateDigits(8)
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

function generateBban(country: SepaCountry): string {
  switch (country.code) {
    case 'BE': return generateBelgianBban()
    case 'BG': return generateLetters(4) + generateDigits(6) + generateAlphanumeric(8)
    case 'HR': return generateCroatianBban()
    case 'CY': return generateDigits(8) + generateAlphanumeric(16)
    case 'CZ':
    case 'SK': return generateCzechOrSlovakBban()
    case 'EE': return generateEstonianBban()
    case 'FR':
    case 'MC': return generateFrenchBban()
    case 'HU': return generateHungarianBban()
    case 'IE': return generateAlphanumeric(4) + generateDigits(14)
    case 'IT': return generateLetters(1) + generateDigits(10) + generateAlphanumeric(12)
    case 'LV': return generateLetters(4) + generateAlphanumeric(13)
    case 'LI': return generateDigits(5) + generateAlphanumeric(12)
    case 'LU': return generateDigits(3) + generateAlphanumeric(13)
    case 'MT': return generateLetters(4) + generateDigits(5) + generateAlphanumeric(18)
    case 'GR': return generateDigits(7) + generateAlphanumeric(16)
    case 'NL': return generateLetters(4) + generateDigits(10)
    case 'NO': return generateNorwegianBban()
    case 'PL': return generatePolishBban()
    case 'PT': return generateMod97Bban(19)
    case 'RO': return generateLetters(4) + generateAlphanumeric(16)
    case 'SM': return generateLetters(1) + generateDigits(10) + generateAlphanumeric(12)
    case 'SI': return generateMod97Bban(13)
    case 'ES': return generateSpanishBban()
    case 'CH': return generateDigits(5) + generateAlphanumeric(12)
    case 'GB': return generateLetters(4) + generateDigits(14)
    default: return generateDigits(country.ibanLength - 4)
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

export function generateIban(country: SepaCountry): string {
  let lastCandidate = ''

  for (let attempt = 0; attempt < MAX_IBAN_ATTEMPTS; attempt++) {
    const bban = generateBban(country)
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
