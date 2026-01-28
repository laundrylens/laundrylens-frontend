import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import KakaoLoginButton from './KakaoLoginButton'

describe('KakaoLoginButton', () => {
  it('renders the button with correct text', () => {
    render(<KakaoLoginButton />)
    expect(screen.getByText('카카오로 시작하기')).toBeInTheDocument()
  })

  it('has correct aria-label for accessibility', () => {
    render(<KakaoLoginButton />)
    expect(screen.getByRole('button', { name: '카카오로 로그인' })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<KakaoLoginButton onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<KakaoLoginButton disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<KakaoLoginButton onClick={handleClick} disabled />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<KakaoLoginButton className="custom-class" />)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('has kakao brand color background', () => {
    render(<KakaoLoginButton />)
    expect(screen.getByRole('button')).toHaveClass('bg-[#FEE500]')
  })
})
