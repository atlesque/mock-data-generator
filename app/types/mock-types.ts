export interface MockTypeDescriptor {
  slug: string
  name: string
  description: string
  icon: string
  /** Page-specific title and meta description for the generator page */
  seo: {
    title: string
    description: string
  }
}

export interface LoremIpsumConfig {
  mode: 'paragraphs' | 'sentences' | 'words' | 'chars'
  count: number
  startWithClassic: boolean
}

export interface IbanBicConfig {
  country: string
  generateBic: boolean
  /** Only generate IBANs whose bank code belongs to a known bank */
  realBank?: boolean
}

export type MockTypeConfig = LoremIpsumConfig | IbanBicConfig

export interface GeneratedOutput {
  type: string
  data: string[]
  config: MockTypeConfig
  timestamp: number
}
