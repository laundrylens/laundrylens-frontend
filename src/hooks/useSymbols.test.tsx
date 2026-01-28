import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSymbols, useSymbol } from './useSymbols'
import { symbolApi } from '../api'
import type { Symbol } from '../types'

// Mock the API
vi.mock('../api', () => ({
  symbolApi: {
    getSymbols: vi.fn(),
    getSymbol: vi.fn(),
  },
}))

const mockSymbols: Symbol[] = [
  {
    id: '1',
    code: 'wash-40',
    name: '40°C 세탁',
    description: '40°C 이하의 물로 세탁하세요.',
    category: 'wash',
    imageUrl: '/symbols/wash-40.svg',
    country: 'KR',
  },
  {
    id: '2',
    code: 'bleach-no',
    name: '표백 금지',
    description: '표백제를 사용하지 마세요.',
    category: 'bleach',
    imageUrl: '/symbols/bleach-no.svg',
    country: 'KR',
  },
]

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useSymbols', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches symbols successfully', async () => {
    vi.mocked(symbolApi.getSymbols).mockResolvedValueOnce({
      symbols: mockSymbols,
      total: 2,
    })

    const { result } = renderHook(() => useSymbols(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data?.symbols).toHaveLength(2)
    expect(result.current.data?.total).toBe(2)
  })

  it('filters by country', async () => {
    vi.mocked(symbolApi.getSymbols).mockResolvedValueOnce({
      symbols: mockSymbols,
      total: 2,
    })

    const { result } = renderHook(() => useSymbols({ country: 'KR' }), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(symbolApi.getSymbols).toHaveBeenCalledWith({
      country: 'KR',
      category: undefined,
    })
  })

  it('filters by categories', async () => {
    const filteredSymbols = mockSymbols.filter((s) => s.category === 'wash')
    vi.mocked(symbolApi.getSymbols).mockResolvedValueOnce({
      symbols: filteredSymbols,
      total: 1,
    })

    const { result } = renderHook(
      () => useSymbols({ categories: ['wash'] }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(symbolApi.getSymbols).toHaveBeenCalledWith({
      country: undefined,
      category: ['wash'],
    })
  })

  it('handles error state', async () => {
    vi.mocked(symbolApi.getSymbols).mockRejectedValueOnce(
      new Error('API Error')
    )

    const { result } = renderHook(() => useSymbols(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
  })

  it('does not fetch when disabled', () => {
    renderHook(() => useSymbols({ enabled: false }), {
      wrapper: createWrapper(),
    })

    expect(symbolApi.getSymbols).not.toHaveBeenCalled()
  })
})

describe('useSymbol', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches single symbol successfully', async () => {
    vi.mocked(symbolApi.getSymbol).mockResolvedValueOnce(mockSymbols[0])

    const { result } = renderHook(() => useSymbol('1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data?.id).toBe('1')
    expect(result.current.data?.name).toBe('40°C 세탁')
  })

  it('does not fetch when id is null', () => {
    renderHook(() => useSymbol(null), {
      wrapper: createWrapper(),
    })

    expect(symbolApi.getSymbol).not.toHaveBeenCalled()
  })
})
