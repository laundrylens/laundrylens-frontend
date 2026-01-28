import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AnalysisHistory from './AnalysisHistory'
import { useAuthStore } from '../stores/authStore'

// Mock auth store
vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

// Mock history API
vi.mock('../api/historyApi', () => ({
  historyApi: {
    getHistory: vi.fn().mockResolvedValue({
      items: [
        {
          id: 'analysis-001',
          imageUrl: 'https://example.com/image1.jpg',
          analyzedAt: new Date().toISOString(),
          symbolCount: 5,
          summary: '물세탁 가능, 표백 금지',
        },
        {
          id: 'analysis-002',
          imageUrl: 'https://example.com/image2.jpg',
          analyzedAt: new Date().toISOString(),
          symbolCount: 3,
          summary: '손세탁 권장',
        },
      ],
      totalCount: 2,
      page: 1,
      pageSize: 10,
      hasMore: false,
    }),
    deleteHistory: vi.fn().mockResolvedValue({ success: true }),
  },
}))

describe('AnalysisHistory', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderAnalysisHistory = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnalysisHistory />
        </BrowserRouter>
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
      renderAnalysisHistory()
      expect(screen.queryByText('분석 이력')).not.toBeInTheDocument()
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

    it('renders page title', async () => {
      renderAnalysisHistory()
      expect(screen.getByText('분석 이력')).toBeInTheDocument()
    })

    it('renders page description', () => {
      renderAnalysisHistory()
      expect(screen.getByText(/이전에 분석한 세탁 기호 결과를 확인하세요/)).toBeInTheDocument()
    })

    it('displays content after loading', async () => {
      renderAnalysisHistory()
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByText(/분석 이력/)).toBeInTheDocument()
      })
    })

    it('renders history items after loading', async () => {
      renderAnalysisHistory()

      await waitFor(() => {
        expect(screen.getByText(/물세탁 가능, 표백 금지/)).toBeInTheDocument()
      })
    })

    it('shows symbol count for each item', async () => {
      renderAnalysisHistory()

      await waitFor(() => {
        expect(screen.getByText(/5개 기호 감지/)).toBeInTheDocument()
        expect(screen.getByText(/3개 기호 감지/)).toBeInTheDocument()
      })
    })

    it('renders detail links for each item', async () => {
      renderAnalysisHistory()

      await waitFor(() => {
        const detailButtons = screen.getAllByText('상세 보기')
        expect(detailButtons.length).toBe(2)
      })
    })

    it('renders new analysis CTA', () => {
      renderAnalysisHistory()
      expect(screen.getByText('새 분석 시작')).toBeInTheDocument()
    })
  })
})
