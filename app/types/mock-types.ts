export interface MockTypeDescriptor {
  slug: string
  name: string
  description: string
  icon: string
}

export interface LoremIpsumConfig {
  mode: 'paragraphs' | 'sentences' | 'words' | 'chars'
  count: number
  startWithClassic: boolean
}

export interface IbanBicConfig {
  country: string
  generateBic: boolean
}

export type MockTypeConfig = LoremIpsumConfig | IbanBicConfig

export interface GeneratedOutput {
  type: string
  data: string[]
  config: MockTypeConfig
  timestamp: number
}
