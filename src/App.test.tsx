import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders LaundryLens title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('LaundryLens')
  })

  it('renders description text', () => {
    render(<App />)
    expect(screen.getByText('세탁기호를 쉽게 이해하세요')).toBeInTheDocument()
  })
})
