import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MyPage from './MyPage'
import { useAuthStore } from '../stores/authStore'

// Mock auth store
vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

describe('MyPage', () => {
  const mockUser = {
    id: '1',
    email: 'test@test.com',
    nickname: '테스트',
    provider: 'kakao' as const,
    subscription: {
      planId: 'basic' as const,
      analysisCount: 30,
      analysisUsed: 10,
      expiresAt: '2025-02-28',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderMyPage = () => {
    return render(
      <BrowserRouter>
        <MyPage />
      </BrowserRouter>
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
      renderMyPage()
      // Navigate component will redirect, but we can't test the actual redirect in unit tests
      // The component should render null or redirect
      expect(screen.queryByText('마이페이지')).not.toBeInTheDocument()
    })
  })

  describe('when authenticated', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: true,
        user: mockUser,
        login: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
        setTokens: vi.fn(),
        accessToken: 'token',
        refreshToken: 'refresh',
      })
    })

    it('renders page title', () => {
      renderMyPage()
      expect(screen.getByText('마이페이지')).toBeInTheDocument()
    })

    it('renders all tabs', () => {
      renderMyPage()
      expect(screen.getByText('프로필')).toBeInTheDocument()
      expect(screen.getByText('구독 현황')).toBeInTheDocument()
      expect(screen.getByText('결제 내역')).toBeInTheDocument()
    })

    it('shows profile tab by default', () => {
      renderMyPage()
      expect(screen.getByText('프로필 정보')).toBeInTheDocument()
    })

    it('switches to subscription tab when clicked', () => {
      renderMyPage()
      fireEvent.click(screen.getByText('구독 현황'))
      expect(screen.getByText('현재 구독')).toBeInTheDocument()
    })

    it('switches to history tab when clicked', () => {
      renderMyPage()
      fireEvent.click(screen.getByText('결제 내역'))
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })
})
