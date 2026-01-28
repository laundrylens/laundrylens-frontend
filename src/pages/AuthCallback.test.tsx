import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AuthCallback from './AuthCallback'
import { useAuthStore } from '../stores'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderWithRouter = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/auth/callback/:provider" element={<AuthCallback />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('AuthCallback', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  })

  it('processes valid code and shows success', async () => {
    renderWithRouter('/auth/callback/kakao?code=test-code')
    // Since the mock API resolves immediately, we expect success state
    await waitFor(() => {
      expect(screen.getByText('로그인 성공!')).toBeInTheDocument()
    })
  })

  it('shows error when code is missing', async () => {
    renderWithRouter('/auth/callback/kakao')
    await waitFor(() => {
      expect(screen.getByText('로그인 실패')).toBeInTheDocument()
      expect(screen.getByText('인가 코드가 없습니다.')).toBeInTheDocument()
    })
  })

  it('shows error when error parameter is present', async () => {
    renderWithRouter('/auth/callback/kakao?error=access_denied')
    await waitFor(() => {
      expect(screen.getByText('로그인 실패')).toBeInTheDocument()
      expect(screen.getByText('로그인이 취소되었습니다.')).toBeInTheDocument()
    })
  })

  it('shows error for unsupported provider', async () => {
    renderWithRouter('/auth/callback/facebook?code=test-code')
    await waitFor(() => {
      expect(screen.getByText('로그인 실패')).toBeInTheDocument()
      expect(screen.getByText('지원하지 않는 로그인 방식입니다.')).toBeInTheDocument()
    })
  })

  it('shows success state with valid code and provider', async () => {
    renderWithRouter('/auth/callback/kakao?code=test-code')
    await waitFor(() => {
      expect(screen.getByText('로그인 성공!')).toBeInTheDocument()
    })
  })

  it('renders retry button on error', async () => {
    renderWithRouter('/auth/callback/kakao')
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '다시 시도하기' })).toBeInTheDocument()
    })
  })
})
