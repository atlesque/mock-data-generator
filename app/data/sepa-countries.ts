export interface SepaCountry {
  code: string
  name: string
  ibanLength: number
}

export const sepaCountries: SepaCountry[] = [
  { code: 'AT', name: 'Austria', ibanLength: 20 },
  { code: 'BE', name: 'Belgium', ibanLength: 16 },
  { code: 'BG', name: 'Bulgaria', ibanLength: 22 },
  { code: 'HR', name: 'Croatia', ibanLength: 21 },
  { code: 'CY', name: 'Cyprus', ibanLength: 28 },
  { code: 'CZ', name: 'Czech Republic', ibanLength: 24 },
  { code: 'DK', name: 'Denmark', ibanLength: 18 },
  { code: 'EE', name: 'Estonia', ibanLength: 20 },
  { code: 'FI', name: 'Finland', ibanLength: 18 },
  { code: 'FR', name: 'France', ibanLength: 27 },
  { code: 'DE', name: 'Germany', ibanLength: 22 },
  { code: 'GR', name: 'Greece', ibanLength: 27 },
  { code: 'HU', name: 'Hungary', ibanLength: 28 },
  { code: 'IS', name: 'Iceland', ibanLength: 26 },
  { code: 'IE', name: 'Ireland', ibanLength: 22 },
  { code: 'IT', name: 'Italy', ibanLength: 27 },
  { code: 'LV', name: 'Latvia', ibanLength: 21 },
  { code: 'LI', name: 'Liechtenstein', ibanLength: 21 },
  { code: 'LT', name: 'Lithuania', ibanLength: 20 },
  { code: 'LU', name: 'Luxembourg', ibanLength: 20 },
  { code: 'MT', name: 'Malta', ibanLength: 31 },
  { code: 'MC', name: 'Monaco', ibanLength: 27 },
  { code: 'NL', name: 'Netherlands', ibanLength: 18 },
  { code: 'NO', name: 'Norway', ibanLength: 15 },
  { code: 'PL', name: 'Poland', ibanLength: 28 },
  { code: 'PT', name: 'Portugal', ibanLength: 25 },
  { code: 'RO', name: 'Romania', ibanLength: 24 },
  { code: 'SM', name: 'San Marino', ibanLength: 27 },
  { code: 'SK', name: 'Slovakia', ibanLength: 24 },
  { code: 'SI', name: 'Slovenia', ibanLength: 19 },
  { code: 'ES', name: 'Spain', ibanLength: 24 },
  { code: 'SE', name: 'Sweden', ibanLength: 24 },
  { code: 'CH', name: 'Switzerland', ibanLength: 21 },
  { code: 'GB', name: 'United Kingdom', ibanLength: 22 },
]
