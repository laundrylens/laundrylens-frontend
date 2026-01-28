import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RemainingAnalysis from './RemainingAnalysis'

describe('RemainingAnalysis', () => {
  describe('basic rendering', () => {
    it('renders component', () => {
      render(<RemainingAnalysis used={3} total={10} />)
      expect(screen.getByText('분석 횟수')).toBeInTheDocument()
    })

    it('displays plan name', () => {
      render(<RemainingAnalysis used={3} total={10} planName="프리미엄" />)
      expect(screen.getByText('프리미엄')).toBeInTheDocument()
    })

    it('shows default plan name', () => {
      render(<RemainingAnalysis used={3} total={10} />)
      expect(screen.getByText('무료')).toBeInTheDocument()
    })
  })

  describe('count display', () => {
    it('shows remaining count', () => {
      render(<RemainingAnalysis used={3} total={10} />)
      expect(screen.getByText('7')).toBeInTheDocument()
      expect(screen.getByText('/ 10회 남음')).toBeInTheDocument()
    })

    it('shows zero when exhausted', () => {
      render(<RemainingAnalysis used={10} total={10} />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('handles over-usage', () => {
      render(<RemainingAnalysis used={12} total={10} />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('progress bar', () => {
    it('renders progressbar with correct values', () => {
      render(<RemainingAnalysis used={5} total={10} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '5')
      expect(progressbar).toHaveAttribute('aria-valuemax', '10')
    })

    it('shows 50% width at half usage', () => {
      render(<RemainingAnalysis used={5} total={10} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveStyle({ width: '50%' })
    })

    it('caps at 100% for over-usage', () => {
      render(<RemainingAnalysis used={15} total={10} />)
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveStyle({ width: '100%' })
    })
  })

  describe('warning states', () => {
    it('shows low warning when 3 or fewer remaining', () => {
      render(<RemainingAnalysis used={7} total={10} />)
      expect(screen.getByText('분석 횟수가 얼마 남지 않았습니다.')).toBeInTheDocument()
    })

    it('does not show low warning when more than 3 remaining', () => {
      render(<RemainingAnalysis used={6} total={10} />)
      expect(screen.queryByText('분석 횟수가 얼마 남지 않았습니다.')).not.toBeInTheDocument()
    })

    it('shows exhausted message when none remaining', () => {
      render(<RemainingAnalysis used={10} total={10} />)
      expect(screen.getByRole('alert')).toHaveTextContent('분석 횟수를 모두 사용했습니다')
    })

    it('shows exhausted instead of low warning when none remaining', () => {
      render(<RemainingAnalysis used={10} total={10} />)
      expect(screen.queryByText('분석 횟수가 얼마 남지 않았습니다.')).not.toBeInTheDocument()
    })
  })

  describe('upgrade button', () => {
    it('renders upgrade button when onUpgrade provided', () => {
      const mockOnUpgrade = vi.fn()
      render(<RemainingAnalysis used={3} total={10} onUpgrade={mockOnUpgrade} />)
      expect(screen.getByRole('button', { name: '업그레이드' })).toBeInTheDocument()
    })

    it('does not render upgrade button when onUpgrade not provided', () => {
      render(<RemainingAnalysis used={3} total={10} />)
      expect(screen.queryByRole('button', { name: '업그레이드' })).not.toBeInTheDocument()
    })

    it('calls onUpgrade when button is clicked', () => {
      const mockOnUpgrade = vi.fn()
      render(<RemainingAnalysis used={3} total={10} onUpgrade={mockOnUpgrade} />)
      fireEvent.click(screen.getByRole('button', { name: '업그레이드' }))
      expect(mockOnUpgrade).toHaveBeenCalledTimes(1)
    })
  })
})
