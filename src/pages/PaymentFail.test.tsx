import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PaymentFail from './PaymentFail'

describe('PaymentFail', () => {
  const renderPage = (code?: string, message?: string) => {
    const params = new URLSearchParams()
    if (code) params.set('code', code)
    if (message) params.set('message', message)
    const path = `/payment/fail${params.toString() ? `?${params.toString()}` : ''}`

    return render(
      <MemoryRouter initialEntries={[path]}>
        <PaymentFail />
      </MemoryRouter>
    )
  }

  it('renders fail title', () => {
    renderPage()
    expect(screen.getByText('결제에 실패했습니다')).toBeInTheDocument()
  })

  it('renders default error message', () => {
    renderPage()
    expect(screen.getByText('결제 처리 중 오류가 발생했습니다.')).toBeInTheDocument()
  })

  it('renders error code', () => {
    renderPage('PAY_PROCESS_CANCELED')
    expect(screen.getByText('PAY_PROCESS_CANCELED')).toBeInTheDocument()
  })

  it('renders specific error description for canceled payment', () => {
    renderPage('PAY_PROCESS_CANCELED')
    expect(screen.getByText('결제가 취소되었습니다.')).toBeInTheDocument()
  })

  it('renders specific error description for card rejection', () => {
    renderPage('REJECT_CARD_COMPANY')
    expect(screen.getByText('카드사에서 결제가 거절되었습니다.')).toBeInTheDocument()
  })

  it('renders custom error message', () => {
    renderPage('CUSTOM_ERROR', '커스텀 에러 메시지입니다.')
    expect(screen.getByText('커스텀 에러 메시지입니다.')).toBeInTheDocument()
  })

  it('renders "다시 시도하기" button', () => {
    renderPage()
    expect(screen.getByText('다시 시도하기')).toBeInTheDocument()
  })

  it('renders "홈으로 이동" button', () => {
    renderPage()
    expect(screen.getByText('홈으로 이동')).toBeInTheDocument()
  })

  it('links to pricing page for retry', () => {
    renderPage()
    const retryLink = screen.getByText('다시 시도하기').closest('a')
    expect(retryLink).toHaveAttribute('href', '/pricing')
  })

  it('links to home page', () => {
    renderPage()
    const homeLink = screen.getByText('홈으로 이동').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders help text', () => {
    renderPage()
    expect(screen.getByText(/문제가 계속되면 고객센터로 문의/)).toBeInTheDocument()
  })
})
