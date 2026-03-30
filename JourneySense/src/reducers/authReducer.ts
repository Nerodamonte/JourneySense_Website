import * as T from '../constants/authTypes'
import type { AuthCredentials } from '../types/auth'

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  userId: string | null
  email: string | null
  role: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userId: null,
  email: null,
  role: null,
  isAuthenticated: false,
}

export default function authReducer(
  state: AuthState = initialState,
  action: { type: string; payload?: AuthCredentials },
): AuthState {
  switch (action.type) {
    case T.AUTH_SET_CREDENTIALS:
      if (!action.payload) return state
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      }
    case T.AUTH_LOGOUT:
      return initialState
    default:
      return state
  }
}
