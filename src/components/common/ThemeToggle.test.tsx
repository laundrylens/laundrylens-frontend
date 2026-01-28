import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'
import { useThemeStore } from '../../stores/themeStore'

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useThemeStore.setState({ theme: 'system' })
    document.documentElement.classList.remove('dark')
  })

  it('renders the toggle button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows system mode label by default', () => {
    render(<ThemeToggle />)
    expect(screen.getByLabelText(/시스템 설정/)).toBeInTheDocument()
  })

  it('cycles through themes on click', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')

    // System -> Light
    fireEvent.click(button)
    expect(screen.getByLabelText(/라이트 모드/)).toBeInTheDocument()

    // Light -> Dark
    fireEvent.click(button)
    expect(screen.getByLabelText(/다크 모드/)).toBeInTheDocument()

    // Dark -> System
    fireEvent.click(button)
    expect(screen.getByLabelText(/시스템 설정/)).toBeInTheDocument()
  })

  it('updates store when theme changes', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(useThemeStore.getState().theme).toBe('light')

    fireEvent.click(button)
    expect(useThemeStore.getState().theme).toBe('dark')

    fireEvent.click(button)
    expect(useThemeStore.getState().theme).toBe('system')
  })

  it('applies dark class when theme is set to dark', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')

    // System -> Light -> Dark
    fireEvent.click(button)
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when theme is set to light', () => {
    document.documentElement.classList.add('dark')
    render(<ThemeToggle />)
    const button = screen.getByRole('button')

    // System -> Light
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
