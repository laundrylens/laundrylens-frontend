import { describe, it, expect } from 'vitest'
import { env } from './env'

describe('env', () => {
  it('has apiBaseUrl defined', () => {
    expect(env.apiBaseUrl).toBeDefined()
    expect(typeof env.apiBaseUrl).toBe('string')
  })

  it('has appName defined', () => {
    expect(env.appName).toBeDefined()
    expect(typeof env.appName).toBe('string')
  })

  it('has appEnv defined', () => {
    expect(env.appEnv).toBeDefined()
    expect(typeof env.appEnv).toBe('string')
  })

  it('has boolean environment flags', () => {
    expect(typeof env.isDev).toBe('boolean')
    expect(typeof env.isProd).toBe('boolean')
    expect(typeof env.isTest).toBe('boolean')
  })

  it('provides default values for missing env vars', () => {
    // Default values should be set even without .env file
    expect(env.apiBaseUrl).toContain('localhost')
    expect(env.appName).toBe('LaundryLens')
  })
})
