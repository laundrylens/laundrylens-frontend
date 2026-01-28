import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AnalysisHistoryDetail from './AnalysisHistoryDetail'
import { useAuthStore } from '../stores/authStore'

// Mock auth store
vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

describe('AnalysisHistoryDetail', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  const renderAnalysisHistoryDetail = (id: string = 'analysis-001') => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/history/${id}`]}>
          <Routes>
            <Route path="/history/:id" element={<AnalysisHistoryDetail />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  describe('when not authenticated', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
        setTokens: vi.fn(),
        accessToken: null,
        refreshToken: null,
      })
    })

    it('redirects to login page', () => {
      renderAnalysisHistoryDetail()
      expect(screen.queryByText('분석 결과 상세')).not.toBeInTheDocument()
    })
  })

  describe('when authenticated', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          email: 'test@test.com',
          nickname: '테스트',
          provider: 'kakao',
          subscription: {
            planId: 'basic',
            analysisCount: 30,
            analysisUsed: 5,
            expiresAt: '2025-12-31',
          },
        },
        login: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
        setTokens: vi.fn(),
        accessToken: 'token',
        refreshToken: 'refresh',
      })
    })

    it('renders back link to history', () => {
      renderAnalysisHistoryDetail()
      const backLink = screen.getByText('분석 이력으로')
      expect(backLink.closest('a')).toHaveAttribute('href', '/history')
    })

    it('shows loading state initially', () => {
      renderAnalysisHistoryDetail()
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('renders page title after loading', async () => {
      renderAnalysisHistoryDetail()

      await waitFor(() => {
        expect(screen.getByText('분석 결과 상세')).toBeInTheDocument()
      })
    })

    it('renders tips section after loading', async () => {
      renderAnalysisHistoryDetail()

      await waitFor(() => {
        expect(screen.getByText('세탁 팁')).toBeInTheDocument()
      })
    })

    it('renders action buttons', async () => {
      renderAnalysisHistoryDetail()

      await waitFor(() => {
        expect(screen.getByText('새로운 분석 시작')).toBeInTheDocument()
        expect(screen.getByText('소재별 가이드 보기')).toBeInTheDocument()
      })
    })
  })
})
