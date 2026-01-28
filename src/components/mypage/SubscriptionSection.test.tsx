import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SubscriptionSection from './SubscriptionSection'

describe('SubscriptionSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderSection = (subscription?: {
    planId: 'free' | 'basic' | 'premium'
    analysisCount: number
    analysisUsed: number
    expiresAt?: string
  }) => {
    const user = {
      id: '1',
      email: 'test@test.com',
      nickname: '테스트',
      provider: 'kakao' as const,
      subscription,
    }
    return render(
      <BrowserRouter>
        <SubscriptionSection user={user} />
      </BrowserRouter>
    )
  }

  describe('free plan user', () => {
    it('shows free plan', () => {
      renderSection()
      expect(screen.getByText('무료 플랜')).toBeInTheDocument()
    })

    it('shows upgrade button', () => {
      renderSection()
      expect(screen.getByText('업그레이드')).toBeInTheDocument()
    })

    it('shows usage as 0/5', () => {
      renderSection()
      expect(screen.getByText('0 / 5회')).toBeInTheDocument()
    })
  })

  describe('basic plan user', () => {
    const basicSubscription = {
      planId: 'basic' as const,
      analysisCount: 30,
      analysisUsed: 15,
      expiresAt: '2025-02-28',
    }

    it('shows basic plan', () => {
      renderSection(basicSubscription)
      expect(screen.getByText('베이직 플랜')).toBeInTheDocument()
    })

    it('shows active badge', () => {
      renderSection(basicSubscription)
      expect(screen.getByText('활성')).toBeInTheDocument()
    })

    it('shows usage correctly', () => {
      renderSection(basicSubscription)
      expect(screen.getByText('15 / 30회')).toBeInTheDocument()
    })

    it('shows cancel subscription button', () => {
      renderSection(basicSubscription)
      expect(screen.getByText('구독 취소')).toBeInTheDocument()
    })

    it('shows plan change button', () => {
      renderSection(basicSubscription)
      expect(screen.getByText('플랜 변경')).toBeInTheDocument()
    })

    it('opens cancel modal when button clicked', () => {
      renderSection(basicSubscription)
      fireEvent.click(screen.getByText('구독 취소'))
      expect(screen.getByText('정말로 구독을 취소하시겠습니까?')).toBeInTheDocument()
    })
  })

  describe('plan features', () => {
    it('shows plan features', () => {
      renderSection()
      expect(screen.getByText('플랜 혜택')).toBeInTheDocument()
      expect(screen.getByText('월 5회 분석')).toBeInTheDocument()
    })
  })
})
