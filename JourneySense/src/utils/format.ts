export function formatDate(iso?: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

export function displayRole(role: string): string {
  const r = role?.toLowerCase()
  if (r === 'traveler') return 'Du khách'
  if (r === 'staff') return 'Nhân viên'
  if (r === 'admin') return 'Quản trị'
  return role
}

export function displayStatus(status: string): string {
  const s = status?.toLowerCase()
  if (s === 'active') return 'Hoạt động'
  if (s === 'suspended') return 'Đã đình chỉ'
  return status
}
