import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PricingModal, { PLANS } from './PricingModal'

describe('PricingModal', () => {
  const mockOnClose = vi.fn()
  const mockOnSelectPlan = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when closed', () => {
    it('does not render content when not open', () => {
      render(
        <PricingModal
          isOpen={false}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      expect(screen.queryByText('요금제 선택')).not.toBeInTheDocument()
    })
  })

  describe('when open', () => {
    it('renders modal title', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      expect(screen.getByText('요금제 선택')).toBeInTheDocument()
    })

    it('renders description', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      expect(screen.getByText(/더 많은 분석이 필요하신가요/)).toBeInTheDocument()
    })

    it('renders all plans', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      // Check for plan names - "무료" may appear twice
      expect(screen.getAllByText('무료').length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('베이직')).toBeInTheDocument()
      expect(screen.getByText('프리미엄')).toBeInTheDocument()
    })

    it('renders plan prices', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      // "무료" appears twice (name and priceLabel), so we check for multiple
      expect(screen.getAllByText('무료').length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('₩3,900/월')).toBeInTheDocument()
      expect(screen.getByText('₩9,900/월')).toBeInTheDocument()
    })

    it('renders analysis counts', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('30')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('renders features for each plan', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      // Free plan features
      expect(screen.getByText('월 5회 분석')).toBeInTheDocument()
      // Premium plan features
      expect(screen.getByText('세탁 가이드 제공')).toBeInTheDocument()
    })

    it('shows recommended badge for basic plan', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      expect(screen.getByText('추천')).toBeInTheDocument()
    })
  })

  describe('current plan', () => {
    it('shows "현재 플랜" for current plan', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
          currentPlanId="free"
        />
      )
      expect(screen.getByText('현재 플랜')).toBeInTheDocument()
    })

    it('disables button for current plan', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
          currentPlanId="free"
        />
      )
      expect(screen.getByText('현재 플랜')).toBeDisabled()
    })
  })

  describe('interactions', () => {
    it('calls onSelectPlan when plan is selected', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
          currentPlanId="free"
        />
      )
      const selectButtons = screen.getAllByText('선택하기')
      fireEvent.click(selectButtons[0]) // Basic plan
      expect(mockOnSelectPlan).toHaveBeenCalledWith('basic')
    })

    it('calls onClose when modal is closed', () => {
      render(
        <PricingModal
          isOpen={true}
          onClose={mockOnClose}
          onSelectPlan={mockOnSelectPlan}
        />
      )
      // Find and click the close button
      const closeButton = screen.getByRole('button', { name: /닫기/ })
      fireEvent.click(closeButton)
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('PLANS constant', () => {
    it('exports PLANS array', () => {
      expect(PLANS).toBeDefined()
      expect(PLANS.length).toBe(3)
    })

    it('has correct plan structure', () => {
      const freePlan = PLANS.find((p) => p.id === 'free')
      expect(freePlan).toBeDefined()
      expect(freePlan?.name).toBe('무료')
      expect(freePlan?.price).toBe(0)
      expect(freePlan?.analysisCount).toBe(5)
    })
  })
})
