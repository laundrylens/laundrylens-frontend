import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PaymentSuccess from './PaymentSuccess'

describe('PaymentSuccess', () => {
  const renderPage = (orderId?: string) => {
    const path = orderId ? `/payment/success?orderId=${orderId}` : '/payment/success'
    return render(
      <MemoryRouter initialEntries={[path]}>
        <PaymentSuccess />
      </MemoryRouter>
    )
  }

  it('renders success title', () => {
    renderPage()
    expect(screen.getByText('결제가 완료되었습니다!')).toBeInTheDocument()
  })

  it('renders success description', () => {
    renderPage()
    expect(screen.getByText(/구독이 성공적으로 활성화되었습니다/)).toBeInTheDocument()
  })

  it('renders order id when provided', () => {
    renderPage('order-12345')
    expect(screen.getByText('order-12345')).toBeInTheDocument()
  })

  it('renders "분석 시작하기" button', () => {
    renderPage()
    expect(screen.getByText('분석 시작하기')).toBeInTheDocument()
  })

  it('renders "마이페이지로 이동" button', () => {
    renderPage()
    expect(screen.getByText('마이페이지로 이동')).toBeInTheDocument()
  })

  it('links to analyze page', () => {
    renderPage()
    const analyzeLink = screen.getByText('분석 시작하기').closest('a')
    expect(analyzeLink).toHaveAttribute('href', '/analyze')
  })

  it('links to mypage', () => {
    renderPage()
    const mypageLink = screen.getByText('마이페이지로 이동').closest('a')
    expect(mypageLink).toHaveAttribute('href', '/mypage')
  })
})
