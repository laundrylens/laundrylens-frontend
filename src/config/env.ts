/**
 * Environment configuration
 * Provides type-safe access to environment variables with defaults
 */

export const env = {
  /** API base URL */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',

  /** Application name */
  appName: import.meta.env.VITE_APP_NAME || 'LaundryLens',

  /** Current environment */
  appEnv: import.meta.env.VITE_APP_ENV || 'development',

  /** Is development environment */
  isDev: import.meta.env.VITE_APP_ENV === 'development' || import.meta.env.DEV,

  /** Is production environment */
  isProd: import.meta.env.VITE_APP_ENV === 'production' || import.meta.env.PROD,

  /** Is test environment */
  isTest: import.meta.env.VITE_APP_ENV === 'test' || import.meta.env.MODE === 'test',
} as const

/**
 * Validates that all required environment variables are set
 * Call this at app startup in development to catch missing config early
 */
export function validateEnv(): void {
  const required = ['VITE_API_BASE_URL'] as const
  const missing: string[] = []

  for (const key of required) {
    if (!import.meta.env[key]) {
      missing.push(key)
    }
  }

  if (missing.length > 0 && env.isDev) {
    console.warn(
      `[LaundryLens] Missing environment variables: ${missing.join(', ')}\n` +
      'Copy .env.example to .env.local and fill in the values.'
    )
  }
}
