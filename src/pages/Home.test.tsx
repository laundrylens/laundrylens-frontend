import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  }

  describe('Hero Section', () => {
    it('renders main headline', () => {
      renderHome()
      expect(screen.getByText(/AI가 읽어드립니다/)).toBeInTheDocument()
    })

    it('renders sub headline', () => {
      renderHome()
      expect(screen.getByText(/사진 한 장으로 세탁 기호를 분석하고/)).toBeInTheDocument()
    })

    it('renders CTA buttons', () => {
      renderHome()
      expect(screen.getByText('지금 분석 시작하기')).toBeInTheDocument()
      expect(screen.getByText('세탁 기호 알아보기')).toBeInTheDocument()
    })

    it('links to analyze page', () => {
      renderHome()
      const analyzeLink = screen.getByText('지금 분석 시작하기').closest('a')
      expect(analyzeLink).toHaveAttribute('href', '/analyze')
    })

    it('links to symbols page', () => {
      renderHome()
      const symbolsLink = screen.getByText('세탁 기호 알아보기').closest('a')
      expect(symbolsLink).toHaveAttribute('href', '/symbols')
    })
  })

  describe('Features Section', () => {
    it('renders section title', () => {
      renderHome()
      expect(screen.getByText("LaundryLens의 기능")).toBeInTheDocument()
    })

    it('renders all feature cards', () => {
      renderHome()
      expect(screen.getByText('AI 이미지 분석')).toBeInTheDocument()
      expect(screen.getByText('소재별 가이드')).toBeInTheDocument()
      expect(screen.getByText('기호 사전')).toBeInTheDocument()
      expect(screen.getByText('분석 기록')).toBeInTheDocument()
    })

    it('renders feature descriptions', () => {
      renderHome()
      expect(screen.getByText(/사진 한 장으로 세탁 기호를 자동으로 인식/)).toBeInTheDocument()
    })
  })

  describe('How It Works Section', () => {
    it('renders section title', () => {
      renderHome()
      expect(screen.getByText('3단계로 간단하게')).toBeInTheDocument()
    })

    it('renders all steps', () => {
      renderHome()
      expect(screen.getByText('사진 촬영')).toBeInTheDocument()
      expect(screen.getByText('AI 분석')).toBeInTheDocument()
      expect(screen.getByText('결과 확인')).toBeInTheDocument()
    })
  })

  describe('Pricing Preview Section', () => {
    it('renders section title', () => {
      renderHome()
      expect(screen.getByText('합리적인 요금제')).toBeInTheDocument()
    })

    it('renders all plan names', () => {
      renderHome()
      expect(screen.getByText('무료')).toBeInTheDocument()
      expect(screen.getByText('베이직')).toBeInTheDocument()
      expect(screen.getByText('프리미엄')).toBeInTheDocument()
    })

    it('renders plan prices', () => {
      renderHome()
      expect(screen.getByText('0원')).toBeInTheDocument()
      expect(screen.getByText('4,900원/월')).toBeInTheDocument()
      expect(screen.getByText('9,900원/월')).toBeInTheDocument()
    })

    it('shows popular badge for basic plan', () => {
      renderHome()
      expect(screen.getByText('인기')).toBeInTheDocument()
    })

    it('links to pricing page', () => {
      renderHome()
      const pricingLink = screen.getByText('요금제 자세히 보기').closest('a')
      expect(pricingLink).toHaveAttribute('href', '/pricing')
    })
  })

  describe('CTA Section', () => {
    it('renders final CTA title', () => {
      renderHome()
      expect(screen.getByText('지금 바로 시작하세요')).toBeInTheDocument()
    })

    it('renders final CTA button', () => {
      renderHome()
      expect(screen.getByText('무료로 분석 시작하기')).toBeInTheDocument()
    })
  })
})
