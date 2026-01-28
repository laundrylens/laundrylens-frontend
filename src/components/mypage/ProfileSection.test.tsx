import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProfileSection from './ProfileSection'
import { useAuthStore } from '../../stores/authStore'

// Mock auth store
vi.mock('../../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

describe('ProfileSection', () => {
  const mockUser = {
    id: '1',
    email: 'test@test.com',
    nickname: '테스트',
    provider: 'kakao' as const,
    profileImage: 'https://example.com/profile.jpg',
  }

  const mockLogout = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      login: vi.fn(),
      logout: mockLogout,
      updateUser: vi.fn(),
      setTokens: vi.fn(),
      accessToken: 'token',
      refreshToken: 'refresh',
    })
  })

  it('renders user nickname', () => {
    render(<ProfileSection user={mockUser} />)
    expect(screen.getByText('테스트')).toBeInTheDocument()
  })

  it('renders user email', () => {
    render(<ProfileSection user={mockUser} />)
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  it('renders login provider', () => {
    render(<ProfileSection user={mockUser} />)
    expect(screen.getByText('카카오')).toBeInTheDocument()
  })

  it('renders profile image when available', () => {
    render(<ProfileSection user={mockUser} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/profile.jpg')
  })

  it('renders initial when no profile image', () => {
    const userWithoutImage = { ...mockUser, profileImage: undefined }
    render(<ProfileSection user={userWithoutImage} />)
    expect(screen.getByText('테')).toBeInTheDocument()
  })

  it('renders delete account button', () => {
    render(<ProfileSection user={mockUser} />)
    expect(screen.getByText('회원탈퇴')).toBeInTheDocument()
  })

  it('opens delete confirmation modal when button clicked', () => {
    render(<ProfileSection user={mockUser} />)
    fireEvent.click(screen.getByText('회원탈퇴'))
    expect(screen.getByText(/정말로 탈퇴하시겠습니까/)).toBeInTheDocument()
  })

  it('closes modal when cancel clicked', () => {
    render(<ProfileSection user={mockUser} />)
    fireEvent.click(screen.getByText('회원탈퇴'))
    fireEvent.click(screen.getByRole('button', { name: '취소' }))
    expect(screen.queryByText('정말로 탈퇴하시겠습니까?')).not.toBeInTheDocument()
  })

  it('calls logout when delete confirmed', () => {
    render(<ProfileSection user={mockUser} />)
    fireEvent.click(screen.getByText('회원탈퇴'))
    fireEvent.click(screen.getByText('탈퇴하기'))
    expect(mockLogout).toHaveBeenCalled()
  })
})
