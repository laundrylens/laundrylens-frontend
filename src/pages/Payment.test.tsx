import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Payment from './Payment'
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

// Mock payment API
vi.mock('../api/paymentApi', () => ({
  paymentApi: {
    preparePayment: vi.fn().mockResolvedValue({
      success: true,
      orderId: 'test-order',
      orderName: '베이직 플랜 (월간)',
      amount: 3900,
      customerKey: 'customer-123',
    }),
    confirmPayment: vi.fn().mockResolvedValue({
      success: true,
      paymentKey: 'payment-123',
      orderId: 'test-order',
      status: 'DONE',
    }),
  },
}))

describe('Payment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderPayment = (initialPath = '/payment?plan=basic') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Payment />
      </MemoryRouter>
    )
  }

  describe('unauthenticated user', () => {
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

    it('redirects to login', () => {
      renderPayment()
      expect(mockNavigate).toHaveBeenCalledWith('/login', expect.any(Object))
    })
  })

  describe('authenticated user', () => {
    beforeEach(() => {
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: true,
        user: {
          id: '1',
          email: 'test@test.com',
          nickname: '테스트',
          provider: 'kakao',
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
      renderPayment()
      await waitFor(() => {
        expect(screen.getByText('결제하기')).toBeInTheDocument()
      })
    })

    it('renders order info', async () => {
      renderPayment()
      await waitFor(() => {
        expect(screen.getByText('주문 정보')).toBeInTheDocument()
        expect(screen.getByText('베이직 플랜')).toBeInTheDocument()
      })
    })

    it('renders customer info', async () => {
      renderPayment()
      await waitFor(() => {
        expect(screen.getByText('결제자 정보')).toBeInTheDocument()
        expect(screen.getByText(/test@test.com/)).toBeInTheDocument()
      })
    })

    it('renders payment amount', async () => {
      renderPayment()
      await waitFor(() => {
        expect(screen.getByText('₩3,900/월')).toBeInTheDocument()
      })
    })

    it('renders action buttons', async () => {
      renderPayment()
      await waitFor(() => {
        expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /결제하기/ })).toBeInTheDocument()
      })
    })

    it('redirects to pricing for free plan', () => {
      renderPayment('/payment?plan=free')
      expect(mockNavigate).toHaveBeenCalledWith('/pricing')
    })
  })
})
