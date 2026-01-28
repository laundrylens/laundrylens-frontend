import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useAuthStore } from '../../stores'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('LogoutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set up authenticated state
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        nickname: 'Test User',
        provider: 'kakao',
      },
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
      isAuthenticated: true,
    })
  })

  it('renders logout button', () => {
    renderWithRouter(<LogoutButton />)
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument()
  })

  it('calls logout and navigates to home on click', () => {
    renderWithRouter(<LogoutButton />)

    const button = screen.getByRole('button', { name: '로그아웃' })
    fireEvent.click(button)

    // Check that auth state is reset
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)

    // Check navigation
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
  })

  it('navigates to custom redirect path', () => {
    renderWithRouter(<LogoutButton redirectTo="/login" />)

    const button = screen.getByRole('button', { name: '로그아웃' })
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })

  it('applies custom className', () => {
    renderWithRouter(<LogoutButton className="custom-class" />)

    const button = screen.getByRole('button', { name: '로그아웃' })
    expect(button).toHaveClass('custom-class')
  })
})
