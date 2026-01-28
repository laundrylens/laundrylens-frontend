import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Home Content</div>} />
          <Route path="/test" element={<div>Test Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Layout', () => {
  it('renders Header component', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation', { name: '메인 네비게이션' })).toBeInTheDocument()
  })

  it('renders Footer component', () => {
    renderWithRouter()
    expect(screen.getByRole('contentinfo', { name: '사이트 푸터' })).toBeInTheDocument()
  })

  it('renders child content via Outlet', () => {
    renderWithRouter('/')
    expect(screen.getByText('Home Content')).toBeInTheDocument()
  })

  it('renders different content for different routes', () => {
    renderWithRouter('/test')
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('has proper layout structure with flex column', () => {
    const { container } = renderWithRouter()
    const layoutDiv = container.firstChild as HTMLElement
    expect(layoutDiv).toHaveClass('min-h-screen', 'flex', 'flex-col')
  })

  it('has main element with flex-1 for content area', () => {
    renderWithRouter()
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1')
  })
})
