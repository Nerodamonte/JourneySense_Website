import axios from 'axios'

const base = import.meta.env.VITE_API_BASE_URL ?? ''

export const publicApi = axios.create({
  baseURL: base || undefined,
  headers: { 'Content-Type': 'application/json' },
})
