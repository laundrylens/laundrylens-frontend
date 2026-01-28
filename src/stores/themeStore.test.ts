import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useThemeStore } from './themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useThemeStore.setState({ theme: 'system' })
    // Clear localStorage
    localStorage.clear()
    // Reset document class list
    document.documentElement.classList.remove('dark')
  })

  describe('initial state', () => {
    it('has system as default theme', () => {
      const { theme } = useThemeStore.getState()
      expect(theme).toBe('system')
    })
  })

  describe('setTheme', () => {
    it('sets theme to light', () => {
      const { setTheme } = useThemeStore.getState()
      setTheme('light')

      const { theme } = useThemeStore.getState()
      expect(theme).toBe('light')
    })

    it('sets theme to dark', () => {
      const { setTheme } = useThemeStore.getState()
      setTheme('dark')

      const { theme } = useThemeStore.getState()
      expect(theme).toBe('dark')
    })

    it('sets theme to system', () => {
      const { setTheme } = useThemeStore.getState()
      setTheme('system')

      const { theme } = useThemeStore.getState()
      expect(theme).toBe('system')
    })

    it('adds dark class when theme is dark', () => {
      const { setTheme } = useThemeStore.getState()
      setTheme('dark')

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('removes dark class when theme is light', () => {
      document.documentElement.classList.add('dark')
      const { setTheme } = useThemeStore.getState()
      setTheme('light')

      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('getEffectiveTheme', () => {
    it('returns light for light theme', () => {
      const { setTheme, getEffectiveTheme } = useThemeStore.getState()
      setTheme('light')

      expect(getEffectiveTheme()).toBe('light')
    })

    it('returns dark for dark theme', () => {
      const { setTheme, getEffectiveTheme } = useThemeStore.getState()
      setTheme('dark')

      expect(getEffectiveTheme()).toBe('dark')
    })

    it('returns based on system preference for system theme', () => {
      // Mock the matchMedia result
      const mockMatchMedia = vi.fn().mockReturnValue({
        matches: true, // Prefer dark
        addEventListener: vi.fn(),
      })
      vi.stubGlobal('matchMedia', mockMatchMedia)

      const { getEffectiveTheme } = useThemeStore.getState()
      expect(getEffectiveTheme()).toBe('dark')

      vi.unstubAllGlobals()
    })
  })
})
