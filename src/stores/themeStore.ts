import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  getEffectiveTheme: () => 'light' | 'dark'
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme: Theme) => {
        set({ theme })
        applyTheme(theme)
      },
      getEffectiveTheme: () => {
        const { theme } = get()
        if (theme === 'system') {
          if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
            try {
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            } catch {
              return 'light'
            }
          }
          return 'light'
        }
        return theme
      },
    }),
    {
      name: 'laundrylens-theme',
    }
  )
)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  let isDark = theme === 'dark'

  if (theme === 'system' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    try {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      isDark = false
    }
  }

  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Initialize theme on load
export function initializeTheme() {
  const savedTheme = localStorage.getItem('laundrylens-theme')
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme)
      if (parsed.state?.theme) {
        applyTheme(parsed.state.theme)
      }
    } catch {
      applyTheme('system')
    }
  } else {
    applyTheme('system')
  }
}

// Listen for system theme changes
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const { theme } = useThemeStore.getState()
      if (theme === 'system') {
        applyTheme('system')
      }
    })
  } catch {
    // Ignore errors in environments where matchMedia is not supported
  }
}
