import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Symbols from './Symbols'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('Symbols', () => {
  it('renders page title', () => {
    renderWithRouter(<Symbols />)
    expect(screen.getByRole('heading', { name: '기호 사전' })).toBeInTheDocument()
  })

  it('renders page description', () => {
    renderWithRouter(<Symbols />)
    expect(
      screen.getByText('세탁 기호를 검색하고 의미를 알아보세요.')
    ).toBeInTheDocument()
  })

  it('renders filter section', () => {
    renderWithRouter(<Symbols />)
    expect(screen.getByRole('region', { name: '필터' })).toBeInTheDocument()
  })

  it('renders symbol list section', () => {
    renderWithRouter(<Symbols />)
    expect(screen.getByRole('region', { name: '기호 목록' })).toBeInTheDocument()
  })

  it('renders empty state when no symbols', () => {
    renderWithRouter(<Symbols />)
    expect(screen.getByText('기호를 검색해보세요')).toBeInTheDocument()
    expect(
      screen.getByText('필터를 선택하거나 검색어를 입력하세요.')
    ).toBeInTheDocument()
  })
})
