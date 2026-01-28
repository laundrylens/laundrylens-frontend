export interface Symbol {
  id: string
  code: string
  name: string
  description: string
  category: 'wash' | 'bleach' | 'dry' | 'iron' | 'dryclean'
  imageUrl: string
  country: 'KR' | 'US' | 'JP'
}

export interface SymbolTranslation {
  symbolId: string
  country: 'KR' | 'US' | 'JP'
  name: string
  description: string
}
