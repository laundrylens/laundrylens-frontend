import { useQuery } from '@tanstack/react-query'
import { symbolApi } from '../api'
import type { CountryCode, CategoryCode } from '../components/symbols'

interface UseSymbolsOptions {
  country?: CountryCode
  categories?: CategoryCode[]
  enabled?: boolean
}

export function useSymbols(options: UseSymbolsOptions = {}) {
  const { country, categories, enabled = true } = options

  return useQuery({
    queryKey: ['symbols', { country, categories }],
    queryFn: () =>
      symbolApi.getSymbols({
        country,
        category: categories,
      }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSymbol(id: string | null) {
  return useQuery({
    queryKey: ['symbol', id],
    queryFn: () => symbolApi.getSymbol(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}
