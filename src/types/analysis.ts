import type { Symbol } from './symbol'

export interface AnalysisResult {
  id: string
  imageUrl: string
  symbols: Symbol[]
  analyzedAt: string
}
