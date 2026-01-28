import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Pricing from './Pricing'
import { useAuthStore } from '../stores/authStore'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock auth store
vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

describe('Pricing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      setUser: vi.fn(),
    })
  })

  const renderPricing = () => {
    return render(
      <BrowserRouter>
        <Pricing />
      </BrowserRouter>
    )
  }

  describe('page layout', () => {
    it('renders page title', () => {
      renderPricing()
      expect(screen.getByRole('heading', { name: '요금제' })).toBeInTheDocument()
    })

    it('renders page description', () => {
      renderPricing()
      expect(screen.getByText(/더 많은 분석이 필요하신가요/)).toBeInTheDocument()
    })

    it('renders FAQ section', () => {
      renderPricing()
      expect(screen.getByText('자주 묻는 질문')).toBeInTheDocument()
    })
  })

  describe('plans display', () => {
    it('renders all three plans', () => {
      renderPricing()
      expect(screen.getAllByText('무료').length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('베이직')).toBeInTheDocument()
      expect(screen.getByText('프리미엄')).toBeInTheDocument()
    })

    it('renders plan prices', () => {
      renderPricing()
      expect(screen.getByText('₩3,900/월')).toBeInTheDocument()
      expect(screen.getByText('₩9,900/월')).toBeInTheDocument()
    })

    it('renders analysis counts', () => {
      renderPricing()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('30')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('shows recommended badge for basic plan', () => {
      renderPricing()
      expect(screen.getByText('추천')).toBeInTheDocument()
    })
  })

  describe('unauthenticated user', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn(),
      })
    })

    it('navigates to login when selecting paid plan', () => {
      renderPricing()
      const subscribeButtons = screen.getAllByText('구독하기')
      fireEvent.click(subscribeButtons[0])
      expect(mockNavigate).toHaveBeenCalledWith('/login', expect.any(Object))
    })

    it('shows "현재 플랜" for free plan (default)', () => {
      renderPricing()
      expect(screen.getByText('현재 플랜')).toBeInTheDocument()
    })
  })

  describe('authenticated user with free plan', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: true,
        user: { id: '1', email: 'test@test.com', subscription: { planId: 'free' } },
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn(),
      })
    })

    it('shows "현재 플랜" for free plan', () => {
      renderPricing()
      expect(screen.getByText('현재 플랜')).toBeInTheDocument()
    })

    it('disables button for current plan', () => {
      renderPricing()
      expect(screen.getByText('현재 플랜')).toBeDisabled()
    })

    it('navigates to payment when selecting paid plan', () => {
      renderPricing()
      const subscribeButtons = screen.getAllByText('구독하기')
      fireEvent.click(subscribeButtons[0])
      expect(mockNavigate).toHaveBeenCalledWith('/payment?plan=basic')
    })
  })

  describe('authenticated user with basic plan', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: true,
        user: { id: '1', email: 'test@test.com', subscription: { planId: 'basic' } },
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn(),
      })
    })

    it('shows "현재 플랜" for basic plan', () => {
      renderPricing()
      const currentPlanButtons = screen.getAllByText('현재 플랜')
      expect(currentPlanButtons.length).toBe(1)
    })
  })

  describe('FAQ section', () => {
    it('renders FAQ questions', () => {
      renderPricing()
      expect(screen.getByText('무료 플랜으로도 분석이 가능한가요?')).toBeInTheDocument()
      expect(screen.getByText('구독을 취소하면 어떻게 되나요?')).toBeInTheDocument()
      expect(screen.getByText('결제 수단은 무엇이 있나요?')).toBeInTheDocument()
    })

    it('renders FAQ answers', () => {
      renderPricing()
      expect(screen.getByText(/월 5회까지 세탁기호 분석/)).toBeInTheDocument()
      expect(screen.getByText(/무료 플랜으로 전환됩니다/)).toBeInTheDocument()
    })
  })
})
