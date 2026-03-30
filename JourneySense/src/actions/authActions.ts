import axios from 'axios'
import type { AuthCredentials, LoginResponse } from '../types/auth'
import * as T from '../constants/authTypes'
import { publicApi } from '../api/publicApi'
import { clearStoredAuth, writeStoredAuth } from '../utils/authStorage'
import type { AppDispatch } from '../store'

export const setCredentials = (payload: AuthCredentials) =>
  ({ type: T.AUTH_SET_CREDENTIALS, payload } as const)

export const logout = () => {
  clearStoredAuth()
  return { type: T.AUTH_LOGOUT } as const
}

export function loginUser(email: string, password: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await publicApi.post<LoginResponse>('/api/auth/login', { email, password })
      const payload: AuthCredentials = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userId: String(data.userId),
        email: data.email,
        role: data.role,
      }
      writeStoredAuth(payload)
      dispatch(setCredentials(payload))
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const msg =
          (e.response?.data as { message?: string })?.message ??
          (e.response?.status === 401 ? 'Email hoặc mật khẩu không đúng' : e.message)
        throw new Error(msg || 'Đăng nhập thất bại')
      }
      throw new Error('Đăng nhập thất bại')
    }
  }
}
