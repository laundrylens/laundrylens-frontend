import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />)
    expect(screen.getByText('LaundryLens')).toBeInTheDocument()
    expect(screen.getByLabelText('LaundryLens 홈')).toBeInTheDocument()
  })

  it('renders default navigation items', () => {
    render(<Header />)
    expect(screen.getByText('기호 사전')).toBeInTheDocument()
    expect(screen.getByText('이미지 분석')).toBeInTheDocument()
    expect(screen.getByText('세탁 가이드')).toBeInTheDocument()
  })

  it('renders custom navigation items', () => {
    const customNavItems = [
      { label: 'Custom Link', href: '/custom' },
    ]
    render(<Header navItems={customNavItems} />)
    expect(screen.getByText('Custom Link')).toBeInTheDocument()
    expect(screen.queryByText('기호 사전')).not.toBeInTheDocument()
  })

  it('renders login button when not logged in', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument()
  })

  it('renders mypage button when logged in', () => {
    render(<Header isLoggedIn />)
    expect(screen.getByRole('button', { name: '마이페이지' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '로그인' })).not.toBeInTheDocument()
  })

  it('calls onLoginClick when login button is clicked', () => {
    const handleLogin = vi.fn()
    render(<Header onLoginClick={handleLogin} />)
    fireEvent.click(screen.getByRole('button', { name: '로그인' }))
    expect(handleLogin).toHaveBeenCalledTimes(1)
  })

  it('has proper navigation landmark', () => {
    render(<Header />)
    expect(screen.getByRole('navigation', { name: '메인 네비게이션' })).toBeInTheDocument()
  })
})
