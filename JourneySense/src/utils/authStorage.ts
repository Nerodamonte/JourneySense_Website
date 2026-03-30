import type { AuthCredentials } from '../types/auth'

export const AUTH_STORAGE_KEY = 'journeySense.portal.v1'

export function readStoredAuth(): AuthCredentials | null {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as Partial<AuthCredentials>
    if (!p.accessToken || !p.refreshToken || !p.userId || !p.email || !p.role) return null
    return {
      accessToken: p.accessToken,
      refreshToken: p.refreshToken,
      userId: p.userId,
      email: p.email,
      role: p.role,
    }
  } catch {
    return null
  }
}

export function writeStoredAuth(c: AuthCredentials) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(c))
}

export function clearStoredAuth() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY)
}

export function getStoredAccessToken(): string | null {
  return readStoredAuth()?.accessToken ?? null
}
