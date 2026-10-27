export interface Bank {
  /** National bank identifier as it appears in the BBAN */
  code: string
  name: string
  bic: string
}

export interface CountryBanks {
  /** Position of the bank identifier within the BBAN */
  offset: number
  banks: Bank[]
}

/**
 * A curated set of well-known banks per SEPA country, keyed by the bank
 * identifier used in the national BBAN. It is not exhaustive: an IBAN whose
 * bank code is missing here may still belong to a real bank.
 */
export const banksByCountry: Record<string, CountryBanks> = {
  AT: { offset: 0, banks: [
    { code: '20111', name: 'Erste Bank', bic: 'GIBAATWW' },
    { code: '31000', name: 'Raiffeisen Bank International', bic: 'RZBAATWW' },
    { code: '12000', name: 'UniCredit Bank Austria', bic: 'BKAUATWW' },
    { code: '14000', name: 'BAWAG P.S.K.', bic: 'BAWAATWW' },
  ] },
  BE: { offset: 0, banks: [
    { code: '001', name: 'BNP Paribas Fortis', bic: 'GEBABEBB' },
    { code: '734', name: 'KBC Bank', bic: 'KREDBEBB' },
    { code: '310', name: 'ING Belgium', bic: 'BBRUBEBB' },
    { code: '068', name: 'Belfius Bank', bic: 'GKCCBEBB' },
    { code: '979', name: 'Argenta', bic: 'ARSPBE22' },
  ] },
  BG: { offset: 0, banks: [
    { code: 'UNCR', name: 'UniCredit Bulbank', bic: 'UNCRBGSF' },
    { code: 'STSA', name: 'DSK Bank', bic: 'STSABGSF' },
    { code: 'UBBS', name: 'United Bulgarian Bank', bic: 'UBBSBGSF' },
    { code: 'BPBI', name: 'Postbank (Eurobank Bulgaria)', bic: 'BPBIBGSF' },
  ] },
  HR: { offset: 0, banks: [
    { code: '2360000', name: 'Zagrebačka banka', bic: 'ZABAHR2X' },
    { code: '2340009', name: 'Privredna banka Zagreb', bic: 'PBZGHR2X' },
    { code: '2402006', name: 'Erste&Steiermärkische Bank', bic: 'ESBCHR22' },
    { code: '2484008', name: 'Raiffeisenbank Austria', bic: 'RZBHHR2X' },
    { code: '2407000', name: 'OTP banka', bic: 'OTPVHR2X' },
  ] },
  CY: { offset: 0, banks: [
    { code: '002', name: 'Bank of Cyprus', bic: 'BCYPCY2N' },
    { code: '005', name: 'Hellenic Bank', bic: 'HEBACY2N' },
  ] },
  CZ: { offset: 0, banks: [
    { code: '0800', name: 'Česká spořitelna', bic: 'GIBACZPX' },
    { code: '0300', name: 'ČSOB', bic: 'CEKOCZPP' },
    { code: '0100', name: 'Komerční banka', bic: 'KOMBCZPP' },
    { code: '5500', name: 'Raiffeisenbank', bic: 'RZBCCZPP' },
    { code: '2010', name: 'Fio banka', bic: 'FIOBCZPP' },
  ] },
  DK: { offset: 0, banks: [
    { code: '3000', name: 'Danske Bank', bic: 'DABADKKK' },
    { code: '2000', name: 'Nordea Danmark', bic: 'NDEADKKK' },
  ] },
  EE: { offset: 0, banks: [
    { code: '22', name: 'Swedbank', bic: 'HABAEE2X' },
    { code: '10', name: 'SEB Pank', bic: 'EEUHEE2X' },
    { code: '77', name: 'LHV Pank', bic: 'LHVBEE22' },
    { code: '42', name: 'Coop Pank', bic: 'EKRDEE22' },
  ] },
  FI: { offset: 0, banks: [
    { code: '1', name: 'Nordea', bic: 'NDEAFIHH' },
    { code: '5', name: 'OP Financial Group', bic: 'OKOYFIHH' },
    { code: '8', name: 'Danske Bank', bic: 'DABAFIHH' },
    { code: '31', name: 'Handelsbanken', bic: 'HANDFIHH' },
  ] },
  FR: { offset: 0, banks: [
    { code: '30004', name: 'BNP Paribas', bic: 'BNPAFRPP' },
    { code: '30003', name: 'Société Générale', bic: 'SOGEFRPP' },
    { code: '30002', name: 'LCL', bic: 'CRLYFRPP' },
    { code: '20041', name: 'La Banque Postale', bic: 'PSSTFRPP' },
    { code: '30066', name: 'CIC', bic: 'CMCIFRPP' },
  ] },
  DE: { offset: 0, banks: [
    { code: '10070000', name: 'Deutsche Bank', bic: 'DEUTDEBB' },
    { code: '10040000', name: 'Commerzbank', bic: 'COBADEBB' },
    { code: '10010010', name: 'Postbank', bic: 'PBNKDEFF' },
    { code: '12030000', name: 'Deutsche Kreditbank (DKB)', bic: 'BYLADEM1001' },
    { code: '50010517', name: 'ING-DiBa', bic: 'INGDDEFF' },
    { code: '10050000', name: 'Berliner Sparkasse', bic: 'BELADEBE' },
  ] },
  GR: { offset: 0, banks: [
    { code: '011', name: 'National Bank of Greece', bic: 'ETHNGRAA' },
    { code: '017', name: 'Piraeus Bank', bic: 'PIRBGRAA' },
    { code: '014', name: 'Alpha Bank', bic: 'CRBAGRAA' },
    { code: '026', name: 'Eurobank', bic: 'ERBKGRAA' },
  ] },
  HU: { offset: 0, banks: [
    { code: '117', name: 'OTP Bank', bic: 'OTPVHUHB' },
    { code: '104', name: 'K&H Bank', bic: 'OKHBHUHB' },
    { code: '120', name: 'Raiffeisen Bank', bic: 'UBRTHUHB' },
    { code: '116', name: 'Erste Bank Hungary', bic: 'GIBAHUHB' },
  ] },
  IS: { offset: 0, banks: [
    { code: '01', name: 'Landsbankinn', bic: 'NBIIISRE' },
    { code: '03', name: 'Arion banki', bic: 'ESJAISRE' },
    { code: '05', name: 'Íslandsbanki', bic: 'GLITISRE' },
  ] },
  IE: { offset: 0, banks: [
    { code: 'AIBK', name: 'AIB', bic: 'AIBKIE2D' },
    { code: 'BOFI', name: 'Bank of Ireland', bic: 'BOFIIE2D' },
    { code: 'IPBS', name: 'PTSB', bic: 'IPBSIE2D' },
  ] },
  IT: { offset: 1, banks: [
    { code: '03069', name: 'Intesa Sanpaolo', bic: 'BCITITMM' },
    { code: '02008', name: 'UniCredit', bic: 'UNCRITMM' },
    { code: '05034', name: 'Banco BPM', bic: 'BAPPIT21' },
    { code: '01005', name: 'BNL BNP Paribas', bic: 'BNLIITRR' },
    { code: '01030', name: 'Monte dei Paschi di Siena', bic: 'PASCITMM' },
  ] },
  LV: { offset: 0, banks: [
    { code: 'HABA', name: 'Swedbank', bic: 'HABALV22' },
    { code: 'UNLA', name: 'SEB banka', bic: 'UNLALV2X' },
    { code: 'PARX', name: 'Citadele banka', bic: 'PARXLV22' },
    { code: 'RIKO', name: 'Luminor Bank', bic: 'RIKOLV2X' },
  ] },
  LI: { offset: 0, banks: [
    { code: '08800', name: 'Liechtensteinische Landesbank', bic: 'LILALI2X' },
    { code: '08810', name: 'LGT Bank', bic: 'BLFLLI2X' },
    { code: '08805', name: 'VP Bank', bic: 'VPBVLI2X' },
  ] },
  LT: { offset: 0, banks: [
    { code: '73000', name: 'Swedbank', bic: 'HABALT22' },
    { code: '70440', name: 'SEB bankas', bic: 'CBVILT2X' },
    { code: '40100', name: 'Luminor Bank', bic: 'AGBLLT2X' },
    { code: '71800', name: 'Šiaulių bankas', bic: 'CBSBLT26' },
  ] },
  LU: { offset: 0, banks: [
    { code: '001', name: 'Spuerkeess (BCEE)', bic: 'BCEELULL' },
    { code: '002', name: 'Banque Internationale à Luxembourg', bic: 'BILLLULL' },
    { code: '003', name: 'BGL BNP Paribas', bic: 'BGLLLULL' },
    { code: '014', name: 'ING Luxembourg', bic: 'CELLLULL' },
    { code: '111', name: 'POST Luxembourg', bic: 'CCPLLULL' },
  ] },
  MT: { offset: 0, banks: [
    { code: 'VALL', name: 'Bank of Valletta', bic: 'VALLMTMT' },
    { code: 'MMEB', name: 'HSBC Bank Malta', bic: 'MMEBMTMT' },
    { code: 'APSB', name: 'APS Bank', bic: 'APSBMTMT' },
  ] },
  MC: { offset: 0, banks: [
    { code: '12739', name: 'CFM Indosuez Wealth Management', bic: 'CFMOMCMX' },
  ] },
  NL: { offset: 0, banks: [
    { code: 'ABNA', name: 'ABN AMRO', bic: 'ABNANL2A' },
    { code: 'INGB', name: 'ING Bank', bic: 'INGBNL2A' },
    { code: 'RABO', name: 'Rabobank', bic: 'RABONL2U' },
    { code: 'SNSB', name: 'SNS', bic: 'SNSBNL2A' },
    { code: 'TRIO', name: 'Triodos Bank', bic: 'TRIONL2U' },
    { code: 'BUNQ', name: 'bunq', bic: 'BUNQNL2A' },
    { code: 'ASNB', name: 'ASN Bank', bic: 'ASNBNL21' },
    { code: 'KNAB', name: 'Knab', bic: 'KNABNL2H' },
  ] },
  NO: { offset: 0, banks: [
    { code: '7001', name: 'DNB Bank', bic: 'DNBANOKK' },
    { code: '6001', name: 'Nordea Bank Norge', bic: 'NDEANOKK' },
    { code: '3201', name: 'SpareBank 1 SR-Bank', bic: 'SPSONO22' },
  ] },
  PL: { offset: 0, banks: [
    { code: '102', name: 'PKO Bank Polski', bic: 'BPKOPLPW' },
    { code: '124', name: 'Bank Pekao', bic: 'PKOPPLPW' },
    { code: '114', name: 'mBank', bic: 'BREXPLPW' },
    { code: '105', name: 'ING Bank Śląski', bic: 'INGBPLPW' },
    { code: '109', name: 'Santander Bank Polska', bic: 'WBKPPLPP' },
  ] },
  PT: { offset: 0, banks: [
    { code: '0035', name: 'Caixa Geral de Depósitos', bic: 'CGDIPTPL' },
    { code: '0033', name: 'Millennium BCP', bic: 'BCOMPTPL' },
    { code: '0007', name: 'Novo Banco', bic: 'BESCPTPL' },
    { code: '0018', name: 'Santander Totta', bic: 'TOTAPTPL' },
    { code: '0010', name: 'Banco BPI', bic: 'BBPIPTPL' },
  ] },
  RO: { offset: 0, banks: [
    { code: 'BTRL', name: 'Banca Transilvania', bic: 'BTRLRO22' },
    { code: 'RNCB', name: 'Banca Comercială Română', bic: 'RNCBROBU' },
    { code: 'BRDE', name: 'BRD - Groupe Société Générale', bic: 'BRDEROBU' },
    { code: 'INGB', name: 'ING Bank Romania', bic: 'INGBROBU' },
    { code: 'RZBR', name: 'Raiffeisen Bank Romania', bic: 'RZBRROBU' },
  ] },
  SM: { offset: 1, banks: [
    { code: '08540', name: 'Banca di San Marino', bic: 'MAOISMSM' },
  ] },
  SK: { offset: 0, banks: [
    { code: '0900', name: 'Slovenská sporiteľňa', bic: 'GIBASKBX' },
    { code: '0200', name: 'Všeobecná úverová banka', bic: 'SUBASKBX' },
    { code: '1100', name: 'Tatra banka', bic: 'TATRSKBX' },
    { code: '7500', name: 'ČSOB', bic: 'CEKOSKBX' },
  ] },
  SI: { offset: 0, banks: [
    { code: '02', name: 'NLB', bic: 'LJBASI2X' },
    { code: '03', name: 'SKB banka', bic: 'SKBASI2X' },
    { code: '04', name: 'Nova KBM', bic: 'KBMASI2X' },
    { code: '10', name: 'Intesa Sanpaolo Bank', bic: 'BAKOSI2X' },
  ] },
  ES: { offset: 0, banks: [
    { code: '0049', name: 'Banco Santander', bic: 'BSCHESMM' },
    { code: '0182', name: 'BBVA', bic: 'BBVAESMM' },
    { code: '2100', name: 'CaixaBank', bic: 'CAIXESBB' },
    { code: '0081', name: 'Banco Sabadell', bic: 'BSABESBB' },
    { code: '0128', name: 'Bankinter', bic: 'BKBKESMM' },
  ] },
  SE: { offset: 0, banks: [
    { code: '500', name: 'SEB', bic: 'ESSESESS' },
    { code: '600', name: 'Handelsbanken', bic: 'HANDSESS' },
    { code: '300', name: 'Nordea', bic: 'NDEASESS' },
    { code: '800', name: 'Swedbank', bic: 'SWEDSESS' },
  ] },
  CH: { offset: 0, banks: [
    { code: '00230', name: 'UBS Switzerland', bic: 'UBSWCHZH80A' },
    { code: '09000', name: 'PostFinance', bic: 'POFICHBE' },
    { code: '00700', name: 'Zürcher Kantonalbank', bic: 'ZKBKCHZZ80A' },
    { code: '80808', name: 'Raiffeisen Schweiz', bic: 'RAIFCH22' },
  ] },
  GB: { offset: 0, banks: [
    { code: 'BARC', name: 'Barclays', bic: 'BARCGB22' },
    { code: 'HBUK', name: 'HSBC UK', bic: 'HBUKGB4B' },
    { code: 'LOYD', name: 'Lloyds Bank', bic: 'LOYDGB2L' },
    { code: 'NWBK', name: 'NatWest', bic: 'NWBKGB2L' },
  ] },
}
