import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SymbolCard from './SymbolCard'
import type { Symbol } from '../../types'

const mockSymbol: Symbol = {
  id: '1',
  code: 'wash-40',
  name: '40°C 물세탁',
  description: '40°C 이하의 물로 세탁하세요.',
  category: 'wash',
  imageUrl: '/symbols/wash-40.svg',
  country: 'KR',
}

describe('SymbolCard', () => {
  it('renders symbol image', () => {
    render(<SymbolCard symbol={mockSymbol} />)

    const img = screen.getByRole('img', { name: '40°C 물세탁' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/symbols/wash-40.svg')
  })

  it('renders symbol name', () => {
    render(<SymbolCard symbol={mockSymbol} />)

    expect(screen.getByText('40°C 물세탁')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    const onClick = vi.fn()
    render(<SymbolCard symbol={mockSymbol} onClick={onClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledWith(mockSymbol)
  })

  it('calls onClick when Enter key is pressed', () => {
    const onClick = vi.fn()
    render(<SymbolCard symbol={mockSymbol} onClick={onClick} />)

    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledWith(mockSymbol)
  })

  it('calls onClick when Space key is pressed', () => {
    const onClick = vi.fn()
    render(<SymbolCard symbol={mockSymbol} onClick={onClick} />)

    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: ' ' })
    expect(onClick).toHaveBeenCalledWith(mockSymbol)
  })

  it('has proper accessibility attributes', () => {
    render(<SymbolCard symbol={mockSymbol} />)

    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('aria-label', '40°C 물세탁 기호 상세보기')
  })

  it('applies custom className', () => {
    render(<SymbolCard symbol={mockSymbol} className="custom-class" />)

    const card = screen.getByRole('button')
    expect(card).toHaveClass('custom-class')
  })
})
