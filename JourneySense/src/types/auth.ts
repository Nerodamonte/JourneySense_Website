export type PortalRole = 'admin' | 'staff' | 'traveler'

export interface AuthCredentials {
  accessToken: string
  refreshToken: string
  userId: string
  email: string
  role: string
}

export interface LoginResponse {
  userId: string
  email: string
  role: string
  accessToken: string
  refreshToken: string
}
