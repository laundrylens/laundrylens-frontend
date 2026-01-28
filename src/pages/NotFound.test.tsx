import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )
}

describe('NotFound', () => {
  it('renders 404 heading', () => {
    renderWithRouter()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders error message', () => {
    renderWithRouter()
    expect(screen.getByText('페이지를 찾을 수 없습니다.')).toBeInTheDocument()
  })

  it('renders detailed description', () => {
    renderWithRouter()
    expect(screen.getByText('요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.')).toBeInTheDocument()
  })

  it('renders home link button', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: '홈으로 돌아가기' })).toHaveAttribute('href', '/')
  })
})
