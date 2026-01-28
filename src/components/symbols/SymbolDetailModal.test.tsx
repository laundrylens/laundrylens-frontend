import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SymbolDetailModal from './SymbolDetailModal'
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

describe('SymbolDetailModal', () => {
  const defaultProps = {
    symbol: mockSymbol,
    isOpen: true,
    onClose: vi.fn(),
  }

  it('renders symbol name as title', () => {
    render(<SymbolDetailModal {...defaultProps} />)

    expect(screen.getByText('40°C 물세탁')).toBeInTheDocument()
  })

  it('renders symbol image', () => {
    render(<SymbolDetailModal {...defaultProps} />)

    const img = screen.getByRole('img', { name: '40°C 물세탁' })
    expect(img).toHaveAttribute('src', '/symbols/wash-40.svg')
  })

  it('renders symbol category', () => {
    render(<SymbolDetailModal {...defaultProps} />)

    expect(screen.getByText('세탁')).toBeInTheDocument()
  })

  it('renders symbol description', () => {
    render(<SymbolDetailModal {...defaultProps} />)

    expect(
      screen.getByText('40°C 이하의 물로 세탁하세요.')
    ).toBeInTheDocument()
  })

  it('renders symbol code', () => {
    render(<SymbolDetailModal {...defaultProps} />)

    expect(screen.getByText('wash-40')).toBeInTheDocument()
  })

  it('renders country comparison placeholder', () => {
    render(<SymbolDetailModal {...defaultProps} />)

    expect(screen.getByText('다른 국가의 같은 기호')).toBeInTheDocument()
    expect(screen.getByText('API 연동 후 표시됩니다.')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<SymbolDetailModal {...defaultProps} onClose={onClose} />)

    fireEvent.click(screen.getByRole('button', { name: '닫기' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not render when symbol is null', () => {
    render(<SymbolDetailModal {...defaultProps} symbol={null} />)

    expect(screen.queryByText('40°C 물세탁')).not.toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<SymbolDetailModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('40°C 물세탁')).not.toBeInTheDocument()
  })
})
