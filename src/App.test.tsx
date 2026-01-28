import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders with router and shows home page', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('홈')
  })

  it('renders header with LaundryLens logo', () => {
    render(<App />)
    expect(screen.getByLabelText('LaundryLens 홈')).toBeInTheDocument()
  })

  it('renders navigation', () => {
    render(<App />)
    expect(screen.getByRole('navigation', { name: '메인 네비게이션' })).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(<App />)
    expect(screen.getByRole('contentinfo', { name: '사이트 푸터' })).toBeInTheDocument()
  })
})
