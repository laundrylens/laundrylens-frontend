import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PaymentHistorySection from './PaymentHistorySection'

describe('PaymentHistorySection', () => {
  it('renders section title', () => {
    render(<PaymentHistorySection />)
    expect(screen.getByText('결제 내역')).toBeInTheDocument()
  })

  it('renders payment table on desktop', () => {
    render(<PaymentHistorySection />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders table headers', () => {
    render(<PaymentHistorySection />)
    expect(screen.getByText('날짜')).toBeInTheDocument()
    expect(screen.getByText('상품')).toBeInTheDocument()
    expect(screen.getByText('금액')).toBeInTheDocument()
    expect(screen.getByText('상태')).toBeInTheDocument()
  })

  it('renders payment records', () => {
    render(<PaymentHistorySection />)
    expect(screen.getAllByText('베이직 플랜').length).toBeGreaterThanOrEqual(1)
  })

  it('renders completed status badges', () => {
    render(<PaymentHistorySection />)
    expect(screen.getAllByText('완료').length).toBeGreaterThanOrEqual(1)
  })

  it('formats currency correctly', () => {
    render(<PaymentHistorySection />)
    expect(screen.getAllByText(/₩3,900/).length).toBeGreaterThanOrEqual(1)
  })
})
