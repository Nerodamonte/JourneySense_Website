import axios, { AxiosHeaders } from 'axios'
import { toast } from 'sonner'
import { logout } from '../actions/authActions'
import { clearStoredAuth, getStoredAccessToken } from '../utils/authStorage'
import { store } from '../store'

const base = import.meta.env.VITE_API_BASE_URL ?? ''

const api = axios.create({
  baseURL: base || undefined,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = getStoredAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.delete('Content-Type')
    } else {
      delete (config.headers as Record<string, unknown>)['Content-Type']
    }
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      store.dispatch(logout())
      clearStoredAuth()
      const loginPath = '/login'
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith(loginPath)) {
        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
        window.location.assign(loginPath)
      }
    }
    return Promise.reject(err)
  },
)

export default api
