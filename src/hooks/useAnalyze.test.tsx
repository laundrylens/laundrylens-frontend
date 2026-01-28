import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAnalyze } from './useAnalyze'
import { analyzeApi } from '../api'
import type { AnalysisResult } from '../types'

// Mock the API
vi.mock('../api', () => ({
  analyzeApi: {
    analyzeImage: vi.fn(),
  },
}))

const mockResult: AnalysisResult = {
  id: 'analysis-123',
  imageUrl: 'blob:http://localhost:3000/mock-url',
  symbols: [
    {
      id: '1',
      code: 'wash-40',
      name: '40°C 세탁',
      description: '40°C 이하의 물로 세탁하세요.',
      category: 'wash',
      imageUrl: '/symbols/wash-40.svg',
      country: 'KR',
    },
  ],
  analyzedAt: '2025-01-28T12:00:00.000Z',
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useAnalyze', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns mutation object with initial state', () => {
    const { result } = renderHook(() => useAnalyze(), {
      wrapper: createWrapper(),
    })

    expect(result.current.mutate).toBeDefined()
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('analyzes image successfully', async () => {
    vi.mocked(analyzeApi.analyzeImage).mockResolvedValueOnce({
      success: true,
      result: mockResult,
    })

    const { result } = renderHook(() => useAnalyze(), {
      wrapper: createWrapper(),
    })

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      result.current.mutate(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockResult)
    expect(analyzeApi.analyzeImage).toHaveBeenCalledWith(mockFile)
  })

  it('handles error when analysis fails', async () => {
    vi.mocked(analyzeApi.analyzeImage).mockResolvedValueOnce({
      success: false,
      result: mockResult,
    })

    const { result } = renderHook(() => useAnalyze(), {
      wrapper: createWrapper(),
    })

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      result.current.mutate(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
    expect(result.current.error?.message).toBe('분석에 실패했습니다.')
  })

  it('handles network error', async () => {
    vi.mocked(analyzeApi.analyzeImage).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(() => useAnalyze(), {
      wrapper: createWrapper(),
    })

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      result.current.mutate(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
  })

  it('calls onSuccess callback on successful analysis', async () => {
    vi.mocked(analyzeApi.analyzeImage).mockResolvedValueOnce({
      success: true,
      result: mockResult,
    })

    const onSuccess = vi.fn()

    const { result } = renderHook(() => useAnalyze({ onSuccess }), {
      wrapper: createWrapper(),
    })

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      result.current.mutate(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(onSuccess).toHaveBeenCalledWith(mockResult)
  })

  it('calls onError callback on failed analysis', async () => {
    vi.mocked(analyzeApi.analyzeImage).mockRejectedValueOnce(
      new Error('Analysis failed')
    )

    const onError = vi.fn()

    const { result } = renderHook(() => useAnalyze({ onError }), {
      wrapper: createWrapper(),
    })

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      result.current.mutate(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(onError).toHaveBeenCalled()
  })

  it('resets state when reset is called', async () => {
    vi.mocked(analyzeApi.analyzeImage).mockResolvedValueOnce({
      success: true,
      result: mockResult,
    })

    const { result } = renderHook(() => useAnalyze(), {
      wrapper: createWrapper(),
    })

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      result.current.mutate(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    act(() => {
      result.current.reset()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false)
    })

    expect(result.current.data).toBeUndefined()
  })
})
