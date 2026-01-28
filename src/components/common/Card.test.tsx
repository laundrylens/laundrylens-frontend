import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card', () => {
  it('children을 렌더링한다', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('기본 variant 스타일을 적용한다', () => {
    render(<Card data-testid="card">Default</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('shadow-card')
  })

  it('elevated variant 스타일을 적용한다', () => {
    render(<Card variant="elevated" data-testid="card">Elevated</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('shadow-elevated')
  })

  it('outlined variant 스타일을 적용한다', () => {
    render(<Card variant="outlined" data-testid="card">Outlined</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('border')
  })

  it('hoverable 상태에서 hover 스타일을 적용한다', () => {
    render(<Card hoverable data-testid="card">Hoverable</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('다양한 padding 스타일을 적용한다', () => {
    const { rerender } = render(<Card padding="none" data-testid="card">No Padding</Card>)
    let card = screen.getByTestId('card')
    expect(card).not.toHaveClass('p-4')
    expect(card).not.toHaveClass('p-6')
    expect(card).not.toHaveClass('p-8')

    rerender(<Card padding="sm" data-testid="card">Small Padding</Card>)
    card = screen.getByTestId('card')
    expect(card).toHaveClass('p-4')

    rerender(<Card padding="lg" data-testid="card">Large Padding</Card>)
    card = screen.getByTestId('card')
    expect(card).toHaveClass('p-8')
  })
})
