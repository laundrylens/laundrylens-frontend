import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the logo', () => {
    render(<Footer />)
    expect(screen.getByText('LaundryLens')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<Footer />)
    expect(screen.getByText(/세탁기호를 쉽게 이해하고/)).toBeInTheDocument()
  })

  it('renders default link groups', () => {
    render(<Footer />)
    expect(screen.getByText('서비스')).toBeInTheDocument()
    expect(screen.getByText('지원')).toBeInTheDocument()
    expect(screen.getByText('법적 고지')).toBeInTheDocument()
  })

  it('renders links within groups', () => {
    render(<Footer />)
    expect(screen.getByText('기호 사전')).toBeInTheDocument()
    expect(screen.getByText('이용약관')).toBeInTheDocument()
    expect(screen.getByText('개인정보처리방침')).toBeInTheDocument()
  })

  it('renders custom link groups', () => {
    const customGroups = [
      {
        title: 'Custom Group',
        links: [{ label: 'Custom Link', href: '/custom' }],
      },
    ]
    render(<Footer linkGroups={customGroups} />)
    expect(screen.getByText('Custom Group')).toBeInTheDocument()
    expect(screen.getByText('Custom Link')).toBeInTheDocument()
  })

  it('renders copyright with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('has proper footer landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo', { name: '사이트 푸터' })).toBeInTheDocument()
  })
})
