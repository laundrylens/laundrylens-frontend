import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'
import type { User } from './authStore'

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  nickname: 'TestUser',
  profileImage: 'https://example.com/image.jpg',
  provider: 'kakao',
}

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  })

  it('has correct initial state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('login sets user and tokens', () => {
    const { login } = useAuthStore.getState()
    login(mockUser, 'access-token', 'refresh-token')

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.accessToken).toBe('access-token')
    expect(state.refreshToken).toBe('refresh-token')
    expect(state.isAuthenticated).toBe(true)
  })

  it('logout clears all auth data', () => {
    const { login, logout } = useAuthStore.getState()
    login(mockUser, 'access-token', 'refresh-token')
    logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.accessToken).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('updateUser updates user partially', () => {
    const { login, updateUser } = useAuthStore.getState()
    login(mockUser, 'access-token', 'refresh-token')
    updateUser({ nickname: 'UpdatedNickname' })

    const state = useAuthStore.getState()
    expect(state.user?.nickname).toBe('UpdatedNickname')
    expect(state.user?.email).toBe(mockUser.email)
  })

  it('updateUser does nothing when user is null', () => {
    const { updateUser } = useAuthStore.getState()
    updateUser({ nickname: 'UpdatedNickname' })

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
  })

  it('setTokens updates only tokens', () => {
    const { login, setTokens } = useAuthStore.getState()
    login(mockUser, 'old-access', 'old-refresh')
    setTokens('new-access', 'new-refresh')

    const state = useAuthStore.getState()
    expect(state.accessToken).toBe('new-access')
    expect(state.refreshToken).toBe('new-refresh')
    expect(state.user).toEqual(mockUser)
  })
})
