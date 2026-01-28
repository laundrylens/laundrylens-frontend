import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CountryTabs from './CountryTabs'
import type { CountryCode } from './CountryTabs'

describe('CountryTabs', () => {
  const defaultProps = {
    selected: 'KR' as CountryCode,
    onSelect: vi.fn(),
  }

  it('renders all country tabs', () => {
    render(<CountryTabs {...defaultProps} />)

    expect(screen.getByRole('tab', { name: /한국/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /미국/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /일본/ })).toBeInTheDocument()
  })

  it('renders country flags', () => {
    render(<CountryTabs {...defaultProps} />)

    expect(screen.getByText('🇰🇷')).toBeInTheDocument()
    expect(screen.getByText('🇺🇸')).toBeInTheDocument()
    expect(screen.getByText('🇯🇵')).toBeInTheDocument()
  })

  it('marks selected tab with aria-selected', () => {
    render(<CountryTabs {...defaultProps} selected="US" />)

    expect(screen.getByRole('tab', { name: /한국/ })).toHaveAttribute(
      'aria-selected',
      'false'
    )
    expect(screen.getByRole('tab', { name: /미국/ })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByRole('tab', { name: /일본/ })).toHaveAttribute(
      'aria-selected',
      'false'
    )
  })

  it('calls onSelect when tab is clicked', () => {
    const onSelect = vi.fn()
    render(<CountryTabs {...defaultProps} onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('tab', { name: /미국/ }))
    expect(onSelect).toHaveBeenCalledWith('US')

    fireEvent.click(screen.getByRole('tab', { name: /일본/ }))
    expect(onSelect).toHaveBeenCalledWith('JP')
  })

  it('has tablist role for accessibility', () => {
    render(<CountryTabs {...defaultProps} />)

    expect(
      screen.getByRole('tablist', { name: '국가 선택' })
    ).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<CountryTabs {...defaultProps} className="custom-class" />)

    const tablist = screen.getByRole('tablist')
    expect(tablist).toHaveClass('custom-class')
  })
})
