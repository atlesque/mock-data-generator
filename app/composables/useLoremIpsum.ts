import { loremIpsumWords } from '~/data/lorem-ipsum-words'
import type { LoremIpsumConfig } from '~/types/mock-types'

const CLASSIC_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

function randomWord(): string {
  return loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)]!
}

function randomSentence(minWords = 5, maxWords = 15): string {
  const length = minWords + Math.floor(Math.random() * (maxWords - minWords + 1))
  const words: string[] = []
  for (let i = 0; i < length; i++) {
    words.push(randomWord())
  }
  return words.join(' ') + '.'
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generateParagraphs(count: number, startWithClassic: boolean): string[] {
  const paragraphs: string[] = []

  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 6)
    const sentences: string[] = []
    for (let j = 0; j < sentenceCount; j++) {
      sentences.push(randomSentence())
    }
    paragraphs.push(sentences.join(' '))
  }

  if (startWithClassic) {
    paragraphs[0] = CLASSIC_START + ' ' + paragraphs[0]!
  }

  return paragraphs
}

function generateSentences(count: number, startWithClassic: boolean): string[] {
  const sentences: string[] = []

  for (let i = 0; i < count; i++) {
    sentences.push(randomSentence())
  }

  if (startWithClassic) {
    sentences[0] = CLASSIC_START
  }

  return sentences
}

function generateWords(count: number, startWithClassic: boolean): string[] {
  if (startWithClassic) {
    const classicWords = CLASSIC_START.replace(/\.$/, '').split(' ')
    const remaining = Math.max(0, count - classicWords.length)
    const extraWords: string[] = []
    for (let i = 0; i < remaining; i++) {
      extraWords.push(randomWord())
    }
    return [...classicWords, ...extraWords]
  }

  const words: string[] = []
  for (let i = 0; i < count; i++) {
    words.push(randomWord())
  }
  return words
}

function generateChars(count: number, startWithClassic: boolean): string[] {
  let text: string

  if (startWithClassic) {
    text = CLASSIC_START + ' '
  }
  else {
    text = ''
  }

  while (text.length < count) {
    text += randomWord() + ' '
  }

  const trimmed = text.slice(0, count)
  const lastSpace = trimmed.lastIndexOf(' ')
  const result = lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed
  return [result]
}

export function useLoremIpsum(config: Ref<LoremIpsumConfig>) {
  const output = computed<string[]>(() => {
    const { mode, count, startWithClassic } = config.value

    switch (mode) {
      case 'paragraphs':
        return generateParagraphs(count, startWithClassic)
      case 'sentences':
        return generateSentences(count, startWithClassic)
      case 'words':
        return generateWords(count, startWithClassic)
      case 'chars':
        return generateChars(count, startWithClassic)
      default:
        return []
    }
  })

  function regenerate() {
    triggerRef(config)
  }

  return {
    output,
    regenerate,
  }
}
