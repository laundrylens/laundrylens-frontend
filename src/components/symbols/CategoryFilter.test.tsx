import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CategoryFilter from './CategoryFilter'
import type { CategoryCode } from './CategoryFilter'

describe('CategoryFilter', () => {
  const defaultProps = {
    selected: [] as CategoryCode[],
    onToggle: vi.fn(),
  }

  it('renders all category buttons', () => {
    render(<CategoryFilter {...defaultProps} />)

    expect(screen.getByRole('button', { name: /세탁/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /표백/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /건조/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /다림질/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /드라이클리닝/ })).toBeInTheDocument()
  })

  it('renders category icons', () => {
    render(<CategoryFilter {...defaultProps} />)

    expect(screen.getByText('🫧')).toBeInTheDocument()
    expect(screen.getByText('⚗️')).toBeInTheDocument()
    expect(screen.getByText('☀️')).toBeInTheDocument()
    expect(screen.getByText('🔥')).toBeInTheDocument()
    expect(screen.getByText('🧪')).toBeInTheDocument()
  })

  it('marks selected categories with aria-pressed', () => {
    render(<CategoryFilter {...defaultProps} selected={['wash', 'dry']} />)

    expect(screen.getByRole('button', { name: /세탁/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: /표백/ })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    expect(screen.getByRole('button', { name: /건조/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('calls onToggle when button is clicked', () => {
    const onToggle = vi.fn()
    render(<CategoryFilter {...defaultProps} onToggle={onToggle} />)

    fireEvent.click(screen.getByRole('button', { name: /세탁/ }))
    expect(onToggle).toHaveBeenCalledWith('wash')

    fireEvent.click(screen.getByRole('button', { name: /건조/ }))
    expect(onToggle).toHaveBeenCalledWith('dry')
  })

  it('has group role for accessibility', () => {
    render(<CategoryFilter {...defaultProps} />)

    expect(
      screen.getByRole('group', { name: '카테고리 필터' })
    ).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<CategoryFilter {...defaultProps} className="custom-class" />)

    const group = screen.getByRole('group')
    expect(group).toHaveClass('custom-class')
  })
})
