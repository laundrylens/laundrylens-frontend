import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import GoogleLoginButton from './GoogleLoginButton'

describe('GoogleLoginButton', () => {
  it('renders the button with correct text', () => {
    render(<GoogleLoginButton />)
    expect(screen.getByText('Google로 시작하기')).toBeInTheDocument()
  })

  it('has correct aria-label for accessibility', () => {
    render(<GoogleLoginButton />)
    expect(screen.getByRole('button', { name: '구글로 로그인' })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<GoogleLoginButton onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<GoogleLoginButton disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<GoogleLoginButton onClick={handleClick} disabled />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<GoogleLoginButton className="custom-class" />)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('has white background with border', () => {
    render(<GoogleLoginButton />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-white')
    expect(button).toHaveClass('border')
  })
})
