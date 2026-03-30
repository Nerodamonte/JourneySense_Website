import axios from 'axios'

export function getApiErrorMessage(e: unknown, fallback = 'Đã có lỗi xảy ra'): string {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data as { message?: string }
    if (typeof data?.message === 'string' && data.message) return data.message
    if (e.response?.status === 401) return 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.'
    if (e.response?.status === 403) return 'Bạn không có quyền thực hiện thao tác này.'
    if (e.message) return e.message
    return fallback
  }
  if (e instanceof Error) return e.message
  return fallback
}
