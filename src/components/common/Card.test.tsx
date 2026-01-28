import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card data-testid="card">Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card data-testid="card">Default</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('shadow-card')
  })

  it('applies elevated variant styles', () => {
    render(<Card data-testid="card" variant="elevated">Elevated</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('shadow-elevated')
  })

  it('applies outlined variant styles', () => {
    render(<Card data-testid="card" variant="outlined">Outlined</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('border')
  })

  it('applies padding styles', () => {
    const { rerender } = render(<Card data-testid="card" padding="sm">Small padding</Card>)
    expect(screen.getByTestId('card').className).toContain('p-4')

    rerender(<Card data-testid="card" padding="lg">Large padding</Card>)
    expect(screen.getByTestId('card').className).toContain('p-8')

    rerender(<Card data-testid="card" padding="none">No padding</Card>)
    expect(screen.getByTestId('card').className).not.toContain('p-4')
  })

  it('applies hoverable styles', () => {
    render(<Card data-testid="card" hoverable>Hoverable</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('hover:shadow-elevated')
    expect(card.className).toContain('cursor-pointer')
  })

  it('applies custom className', () => {
    render(<Card data-testid="card" className="custom-class">Custom</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('custom-class')
  })
})
