import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../../api/axios'
import type { AdminJourneyListItemDto, PortalPagedResult } from '../../types/portal'
import { getApiErrorMessage } from '../../utils/apiMessage'
import { formatDate } from '../../utils/format'

const PAGE_SIZE = 20

const card = 'rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'

function displayJourneyStatus(status?: string | null): string {
  const s = status?.trim()
  if (!s) return '—'
  return s
}

export default function AdminJourneysPage() {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PortalPagedResult<AdminJourneyListItemDto> | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get<PortalPagedResult<AdminJourneyListItemDto>>('/api/admin/journeys', {
        params: { page, pageSize: PAGE_SIZE },
      })
      setData(res.data)
    } catch (e) {
      toast.error(getApiErrorMessage(e, 'Không tải được danh sách hành trình'))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    void load()
  }, [load])

  const items = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  return (
    <main className="min-h-0 flex-1 overflow-auto bg-gradient-to-b from-[#fdfbf7] via-[#faf6ef] to-[#f5f0e8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-stone-900 sm:text-3xl">Hành trình</h1>

        <section className={`${card} overflow-hidden p-0`}>
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full table-fixed text-sm">
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[30%]" />
                <col className="w-[14%]" />
                <col className="w-[16%]" />
                <col className="w-[120px]" />
              </colgroup>
              <thead>
                <tr className="bg-[#f5f0e8] text-left text-xs font-semibold uppercase tracking-wide text-stone-600">
                  <th className="px-4 py-3">Điểm đi</th>
                  <th className="px-4 py-3">Điểm đến</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Tạo lúc</th>
                  <th className="px-4 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-stone-500">
                      Đang tải…
                    </td>
                  </tr>
                )}

                {!loading && items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-stone-500">
                      Chưa có hành trình
                    </td>
                  </tr>
                )}

                {!loading &&
                  items.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'}>
                      <td className="px-4 py-3 font-semibold text-stone-900 truncate" title={row.originAddress ?? ''}>
                        {row.originAddress ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-stone-700 truncate" title={row.destinationAddress ?? ''}>
                        {row.destinationAddress ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-800">
                          {displayJourneyStatus(row.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600">{formatDate(row.createdAt)}</td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          to={`/admin/journeys/${row.id}`}
                          className="inline-flex items-center justify-center rounded-lg p-2 text-amber-800 transition-colors hover:bg-amber-50"
                          title="Xem chi tiết"
                          aria-label="Xem chi tiết"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.75}
                              d="M15 12a3 3 0 11-6 0 4 4 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.75}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {!loading && totalCount > 0 && (
            <div className="flex flex-col items-stretch justify-between gap-3 border-t border-stone-100 bg-stone-50/50 px-4 py-3 sm:flex-row sm:items-center">
              <span className="text-sm text-stone-600">
                Trang {page} / {totalPages} · {totalCount} hành trình
              </span>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm hover:bg-stone-50 disabled:opacity-40"
                >
                  Trước
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm hover:bg-stone-50 disabled:opacity-40"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
