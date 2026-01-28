import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SymbolGrid from './SymbolGrid'
import type { Symbol } from '../../types'

const mockSymbols: Symbol[] = [
  {
    id: '1',
    code: 'wash-40',
    name: '40°C 물세탁',
    description: '40°C 이하의 물로 세탁하세요.',
    category: 'wash',
    imageUrl: '/symbols/wash-40.svg',
    country: 'KR',
  },
  {
    id: '2',
    code: 'bleach-no',
    name: '표백 금지',
    description: '표백제를 사용하지 마세요.',
    category: 'bleach',
    imageUrl: '/symbols/bleach-no.svg',
    country: 'KR',
  },
  {
    id: '3',
    code: 'dry-tumble',
    name: '텀블 건조',
    description: '건조기 사용 가능합니다.',
    category: 'dry',
    imageUrl: '/symbols/dry-tumble.svg',
    country: 'KR',
  },
]

describe('SymbolGrid', () => {
  it('renders all symbols', () => {
    render(<SymbolGrid symbols={mockSymbols} />)

    expect(screen.getByText('40°C 물세탁')).toBeInTheDocument()
    expect(screen.getByText('표백 금지')).toBeInTheDocument()
    expect(screen.getByText('텀블 건조')).toBeInTheDocument()
  })

  it('renders empty state when no symbols', () => {
    render(<SymbolGrid symbols={[]} />)

    expect(screen.getByText('표시할 기호가 없습니다.')).toBeInTheDocument()
  })

  it('renders custom empty message', () => {
    render(<SymbolGrid symbols={[]} emptyMessage="검색 결과가 없습니다." />)

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument()
  })

  it('calls onSymbolClick when a symbol card is clicked', () => {
    const onSymbolClick = vi.fn()
    render(<SymbolGrid symbols={mockSymbols} onSymbolClick={onSymbolClick} />)

    fireEvent.click(screen.getByRole('button', { name: /40°C 물세탁/ }))
    expect(onSymbolClick).toHaveBeenCalledWith(mockSymbols[0])
  })

  it('has proper list role for accessibility', () => {
    render(<SymbolGrid symbols={mockSymbols} />)

    expect(
      screen.getByRole('list', { name: '세탁 기호 목록' })
    ).toBeInTheDocument()
  })

  it('renders list items for each symbol', () => {
    render(<SymbolGrid symbols={mockSymbols} />)

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })

  it('applies custom className', () => {
    render(<SymbolGrid symbols={mockSymbols} className="custom-class" />)

    const grid = screen.getByRole('list')
    expect(grid).toHaveClass('custom-class')
  })
})
