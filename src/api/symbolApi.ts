import type { Symbol } from '../types'
import type { CountryCode } from '../components/symbols'
import type { CategoryCode } from '../components/symbols'
import { mockSymbols } from '../mocks/symbols'
import { env } from '../config'

interface GetSymbolsParams {
  country?: CountryCode
  category?: CategoryCode[]
}

interface SymbolsResponse {
  symbols: Symbol[]
  total: number
}

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const symbolApi = {
  async getSymbols(params?: GetSymbolsParams): Promise<SymbolsResponse> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${env.apiBaseUrl}/symbols`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // })
    // return response.json()

    // Mock implementation
    if (env.isDev) {
      console.log('[symbolApi] getSymbols', params)
    }

    await delay(300) // Simulate network delay

    let filteredSymbols = [...mockSymbols]

    if (params?.country) {
      filteredSymbols = filteredSymbols.filter(
        (s) => s.country === params.country
      )
    }

    if (params?.category && params.category.length > 0) {
      filteredSymbols = filteredSymbols.filter((s) =>
        params.category!.includes(s.category)
      )
    }

    return {
      symbols: filteredSymbols,
      total: filteredSymbols.length,
    }
  },

  async getSymbol(id: string): Promise<Symbol | null> {
    // TODO: Replace with actual API call
    // const response = await fetch(`${env.apiBaseUrl}/symbols/${id}`)
    // return response.json()

    if (env.isDev) {
      console.log('[symbolApi] getSymbol', id)
    }

    await delay(200)

    const symbol = mockSymbols.find((s) => s.id === id)
    return symbol || null
  },
}
