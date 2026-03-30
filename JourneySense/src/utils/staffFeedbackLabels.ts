/** Hiển thị tiếng Việt cho giá trị moderation từ API (pending / approved / rejected). */
export function moderationStatusVi(status: string | null | undefined): string {
  const k = (status ?? '').trim().toLowerCase()
  if (k === 'pending') return 'Chờ duyệt'
  if (k === 'approved') return 'Đã duyệt'
  if (k === 'rejected') return 'Đã từ chối'
  return status?.trim() || '—'
}

/** Lớp Tailwind cho badge trạng thái (đồng bộ bảng và chi tiết). */
export function moderationStatusBadgeClass(status: string | null | undefined): string {
  const k = (status ?? '').trim().toLowerCase()
  const base = 'text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center'
  if (k === 'pending') return `${base} bg-amber-100 text-amber-900 ring-1 ring-amber-200/70`
  if (k === 'approved') return `${base} bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/70`
  if (k === 'rejected') return `${base} bg-red-100 text-red-900 ring-1 ring-red-200/70`
  return `${base} bg-stone-100 text-stone-700 ring-1 ring-stone-200/80`
}
