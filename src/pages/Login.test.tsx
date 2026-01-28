import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )
}

describe('Login', () => {
  it('renders the logo and app name', () => {
    renderWithRouter()
    expect(screen.getByText('LaundryLens')).toBeInTheDocument()
  })

  it('renders the login heading', () => {
    renderWithRouter()
    expect(screen.getByRole('heading', { name: '로그인' })).toBeInTheDocument()
  })

  it('renders the description text', () => {
    renderWithRouter()
    expect(screen.getByText('소셜 계정으로 간편하게 시작하세요')).toBeInTheDocument()
  })

  it('renders social login buttons area', () => {
    renderWithRouter()
    expect(screen.getByTestId('social-login-buttons')).toBeInTheDocument()
  })

  it('renders Kakao login button', () => {
    renderWithRouter()
    expect(screen.getByRole('button', { name: '카카오로 로그인' })).toBeInTheDocument()
  })

  it('renders Google login button', () => {
    renderWithRouter()
    expect(screen.getByRole('button', { name: '구글로 로그인' })).toBeInTheDocument()
  })

  it('renders guest continue link', () => {
    renderWithRouter()
    const guestLink = screen.getByRole('link', { name: '비회원으로 계속하기' })
    expect(guestLink).toBeInTheDocument()
    expect(guestLink).toHaveAttribute('href', '/')
  })

  it('renders guest usage info', () => {
    renderWithRouter()
    expect(screen.getByText(/비회원도 하루 5회까지/)).toBeInTheDocument()
  })
})
