import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AnalysisResultView from './AnalysisResult'
import type { AnalysisResult, Symbol } from '../../types'

const mockSymbols: Symbol[] = [
  {
    id: 'sym-1',
    code: 'W001',
    name: '물세탁 가능',
    description: '물세탁이 가능합니다.',
    category: 'wash',
    imageUrl: '/symbols/w001.svg',
    country: 'KR',
  },
  {
    id: 'sym-2',
    code: 'B001',
    name: '표백 금지',
    description: '표백제를 사용하지 마세요.',
    category: 'bleach',
    imageUrl: '/symbols/b001.svg',
    country: 'KR',
  },
]

const mockResult: AnalysisResult = {
  id: 'result-1',
  imageUrl: '/uploads/test.jpg',
  symbols: mockSymbols,
  analyzedAt: '2025-01-28T10:00:00Z',
}

const emptyResult: AnalysisResult = {
  id: 'result-2',
  imageUrl: '/uploads/test.jpg',
  symbols: [],
  analyzedAt: '2025-01-28T10:00:00Z',
}

describe('AnalysisResultView', () => {
  const mockOnReset = vi.fn()
  const mockOnSymbolClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('with symbols', () => {
    it('renders analysis result header', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      expect(screen.getByText('분석 결과')).toBeInTheDocument()
    })

    it('displays symbol count', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      expect(screen.getByText('2개의 기호를 인식했습니다.')).toBeInTheDocument()
    })

    it('renders reset button', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      expect(screen.getByRole('button', { name: '다시 분석' })).toBeInTheDocument()
    })

    it('calls onReset when reset button is clicked', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      fireEvent.click(screen.getByRole('button', { name: '다시 분석' }))
      expect(mockOnReset).toHaveBeenCalledTimes(1)
    })

    it('renders symbol list', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      expect(screen.getByText('물세탁 가능')).toBeInTheDocument()
      expect(screen.getByText('표백 금지')).toBeInTheDocument()
    })

    it('displays symbol descriptions', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      expect(screen.getByText('물세탁이 가능합니다.')).toBeInTheDocument()
      expect(screen.getByText('표백제를 사용하지 마세요.')).toBeInTheDocument()
    })

    it('displays category labels', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      expect(screen.getByText('세탁')).toBeInTheDocument()
      expect(screen.getByText('표백')).toBeInTheDocument()
    })

    it('renders symbol images', () => {
      render(<AnalysisResultView result={mockResult} onReset={mockOnReset} />)
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(2)
      expect(images[0]).toHaveAttribute('src', '/symbols/w001.svg')
    })

    it('calls onSymbolClick when symbol is clicked', () => {
      render(
        <AnalysisResultView
          result={mockResult}
          onReset={mockOnReset}
          onSymbolClick={mockOnSymbolClick}
        />
      )
      const symbolCards = screen.getAllByRole('button')
      // First button is "다시 분석", symbol cards start from index 1
      fireEvent.click(symbolCards[1])
      expect(mockOnSymbolClick).toHaveBeenCalledWith('sym-1')
    })

    it('supports keyboard navigation for symbols', () => {
      render(
        <AnalysisResultView
          result={mockResult}
          onReset={mockOnReset}
          onSymbolClick={mockOnSymbolClick}
        />
      )
      const symbolCards = screen.getAllByRole('button')
      fireEvent.keyDown(symbolCards[1], { key: 'Enter' })
      expect(mockOnSymbolClick).toHaveBeenCalledWith('sym-1')
    })
  })

  describe('without symbols', () => {
    it('shows empty state message', () => {
      render(<AnalysisResultView result={emptyResult} onReset={mockOnReset} />)
      expect(screen.getByText('인식된 기호가 없습니다')).toBeInTheDocument()
    })

    it('shows empty state description', () => {
      render(<AnalysisResultView result={emptyResult} onReset={mockOnReset} />)
      expect(screen.getByText(/이미지가 선명하지 않거나/)).toBeInTheDocument()
    })

    it('displays zero count', () => {
      render(<AnalysisResultView result={emptyResult} onReset={mockOnReset} />)
      expect(screen.getByText('0개의 기호를 인식했습니다.')).toBeInTheDocument()
    })
  })
})
