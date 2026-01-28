import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'
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

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  })

  it('renders the logo', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('LaundryLens')).toBeInTheDocument()
    expect(screen.getByLabelText('LaundryLens 홈')).toBeInTheDocument()
  })

  it('renders default navigation items', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('기호 사전')).toBeInTheDocument()
    expect(screen.getByText('이미지 분석')).toBeInTheDocument()
    expect(screen.getByText('세탁 가이드')).toBeInTheDocument()
  })

  it('renders custom navigation items', () => {
    const customNavItems = [{ label: 'Custom Link', href: '/custom' }]
    renderWithRouter(<Header navItems={customNavItems} />)
    expect(screen.getByText('Custom Link')).toBeInTheDocument()
    expect(screen.queryByText('기호 사전')).not.toBeInTheDocument()
  })

  it('renders login button when not logged in', () => {
    renderWithRouter(<Header />)
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument()
  })

  it('renders logout button and nickname when logged in', () => {
    useAuthStore.setState({
      user: {
        id: '1',
        email: 'test@example.com',
        nickname: '테스트유저',
        provider: 'kakao',
      },
      accessToken: 'test-token',
      refreshToken: 'test-refresh',
      isAuthenticated: true,
    })

    renderWithRouter(<Header />)
    expect(screen.getByText('테스트유저님')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '로그인' })).not.toBeInTheDocument()
  })

  it('navigates to login page when login button is clicked', () => {
    renderWithRouter(<Header />)
    fireEvent.click(screen.getByRole('button', { name: '로그인' }))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('has proper navigation landmark', () => {
    renderWithRouter(<Header />)
    expect(screen.getByRole('navigation', { name: '메인 네비게이션' })).toBeInTheDocument()
  })
})
