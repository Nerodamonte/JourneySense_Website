import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../../api/axios'
import { getApiErrorMessage } from '../../utils/apiMessage'
import type { AuditLogListItemDto, PortalPagedResult } from '../../types/portal'
import { formatDate } from '../../utils/format'

export default function AdminAuditPage() {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PortalPagedResult<AuditLogListItemDto> | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get<PortalPagedResult<AuditLogListItemDto>>('/api/admin/audit-logs', {
        params: { page, pageSize: 25 },
      })
      setResult(data)
    } catch (e) {
      toast.error(getApiErrorMessage(e))
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    void load()
  }, [load])

  const items = result?.items ?? []
  const total = result?.totalCount ?? 0
  const pageSize = result?.pageSize ?? 25
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-bold text-stone-900 font-['Cormorant_Garamond',serif] text-2xl">Audit logs</h1>
        <Link to="/admin/dashboard" className="text-sm text-amber-700 hover:underline">
          ← Dashboard
        </Link>
      </div>
      <div className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-[#f5f0e8] text-left text-xs uppercase text-stone-600 font-semibold">
                <th className="px-4 py-3">Thời gian</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-stone-500">
                    Đang tải…
                  </td>
                </tr>
              )}
              {!loading &&
                items.map((row) => (
                  <tr key={row.id} className="bg-white">
                    <td className="px-4 py-3 whitespace-nowrap text-stone-600">{formatDate(row.createdAt)}</td>
                    <td className="px-4 py-3 text-stone-800">{row.actorEmail ?? row.actorUserId ?? '—'}</td>
                    <td className="px-4 py-3">{String(row.actionType)}</td>
                    <td className="px-4 py-3">
                      {row.entityType ?? '—'}
                      {row.entityId ? ` (${row.entityId})` : ''}
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500 max-w-xs truncate" title={row.newValues ?? ''}>
                      {row.newValues ?? row.oldValues ?? '—'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-stone-100 bg-stone-50/50">
          <span className="text-sm text-stone-600">
            Trang {page} / {totalPages} · {total} bản ghi
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-sm disabled:opacity-40"
            >
              Trước
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-sm disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
