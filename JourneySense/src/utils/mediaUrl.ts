/**
 * Nối URL ảnh API (vd. `/uploads/...`) với `VITE_API_BASE_URL`.
 * @see JourneySense_BackEnd/docs/MICRO_EXPERIENCE_FE.md
 */
export function resolveApiMediaUrl(url: string): string {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  const base = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
  return `${base}${url.startsWith('/') ? url : `/${url}`}`
}
