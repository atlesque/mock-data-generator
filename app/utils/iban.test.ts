import assert from 'node:assert/strict'
import test from 'node:test'
import { isValidIBAN } from 'ibantools'
import { sepaCountries } from '../data/sepa-countries.ts'
import { generateIban } from './iban.ts'

function hasValidIso13616Checksum(iban: string): boolean {
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, letter => (letter.charCodeAt(0) - 55).toString())
  return BigInt(numeric) % 97n === 1n
}

test('generated Belgian IBANs pass ibantools validation', () => {
  const belgium = sepaCountries.find(country => country.code === 'BE')!

  for (let i = 0; i < 100; i++) {
    const iban = generateIban(belgium)
    assert.equal(iban.length, 16)
    assert.equal(isValidIBAN(iban), true)
    assert.equal(hasValidIso13616Checksum(iban), true)
  }
})

test('every supported SEPA country generates IBANs accepted by ibantools', () => {
  for (const country of sepaCountries) {
    for (let i = 0; i < 10; i++) {
      assert.equal(isValidIBAN(generateIban(country)), true, country.code)
    }
  }
})

test('ibantools rejects the reported invalid IBAN and accepts valid examples', () => {
  assert.equal(isValidIBAN('BE38065691244716'), false)
  assert.equal(isValidIBAN('BE29522227985664'), true)
  assert.equal(isValidIBAN('BE68539007547034'), true)
})

test('generated IBANs use 97 for a Belgian zero remainder', () => {
  const belgium = sepaCountries.find(country => country.code === 'BE')!
  const originalRandom = Math.random
  const digits = [9, 7, 0, 0, 9, 7, 0, 0, 0, 0]
  let digitIndex = 0
  Math.random = () => (digits[digitIndex++]! + 0.1) / 10

  try {
    const iban = generateIban(belgium)
    assert.equal(iban.slice(4), '970097000097')
    assert.equal(isValidIBAN(iban), true)
  }
  finally {
    Math.random = originalRandom
  }
})

test('fails clearly after five invalid candidates', () => {
  assert.throws(
    () => generateIban({ code: 'ZZ', name: 'Test', ibanLength: 16 }),
    /Unable to generate a valid Test IBAN after 5 attempts/,
  )
})
