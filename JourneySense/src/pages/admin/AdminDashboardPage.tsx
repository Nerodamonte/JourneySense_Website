import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import api from '../../api/axios'
import type { AdminAnalyticsSummaryResponse } from '../../types/portal'
import { getApiErrorMessage } from '../../utils/apiMessage'

const ROLE_COLORS = ['#c5a070', '#5c8f7a', '#7c6f9e']
const ACTIVE_COLORS = ['#2f9e6a', '#d4cfc4']
const BAR_COLORS = ['#c5a070', '#b08f5f', '#9a7b4f', '#7d6a54']

function formatVi(n: number) {
  return n.toLocaleString('vi-VN')
}

function formatChartTooltipValue(value: number | string | ReadonlyArray<number | string> | undefined) {
  if (value == null) return ''
  if (Array.isArray(value)) {
    const n = Number(value[0])
    return Number.isFinite(n) ? formatVi(n) : ''
  }
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? formatVi(n) : ''
}

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<AdminAnalyticsSummaryResponse | null>(null)

  const load = useCallback(async () => {
    try {
      const { data } = await api.get<AdminAnalyticsSummaryResponse>('/api/admin/analytics/summary')
      setSummary(data)
    } catch (e) {
      toast.error(getApiErrorMessage(e, 'Không tải được dữ liệu thống kê'))
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const roleChart = useMemo(() => {
    if (!summary) return []
    return [
      { name: 'Du khách', value: summary.usersTraveler },
      { name: 'Nhân viên', value: summary.usersStaff },
      { name: 'Quản trị', value: summary.usersAdmin },
    ].filter((d) => d.value > 0)
  }, [summary])

  const activeChart = useMemo(() => {
    if (!summary) return []
    const inactive = Math.max(0, summary.usersTotal - summary.usersActive)
    const rows = [
      { name: 'Đang hoạt động', value: summary.usersActive },
      { name: 'Không hoạt động', value: inactive },
    ]
    return rows.filter((d) => d.value > 0)
  }, [summary])

  const systemBar = useMemo(() => {
    if (!summary) return []
    return [
      { name: 'Trải nghiệm đang mở', value: summary.experiencesActive },
      { name: 'Chuyến', value: summary.journeysTotal },
      { name: 'Phản hồi chờ duyệt', value: summary.feedbacksPendingModeration },
      { name: 'Tổng người dùng', value: summary.usersTotal },
    ]
  }, [summary])

  const chartCard = 'rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'

  return (
    <main className="min-h-0 flex-1 overflow-auto bg-gradient-to-b from-[#fdfbf7] via-[#faf6ef] to-[#f5f0e8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-stone-900 sm:text-3xl">Bảng điều khiển</h1>

        {!summary && (
          <div className={`${chartCard} py-16 text-center text-stone-500`}>Đang tải dữ liệu…</div>
        )}

        {summary && (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className={chartCard}>
                <h2 className="mb-4 font-['Cormorant_Garamond',serif] text-lg font-semibold text-stone-900">Người dùng theo vai trò</h2>
                <div className="h-[300px] w-full min-h-[260px]">
                  {roleChart.length === 0 ? (
                    <p className="flex h-full items-center justify-center text-stone-500">Chưa có dữ liệu</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roleChart}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius="48%"
                          outerRadius="78%"
                          paddingAngle={2}
                        >
                          {roleChart.map((_, i) => (
                            <Cell key={i} fill={ROLE_COLORS[i % ROLE_COLORS.length]} stroke="#fff" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={formatChartTooltipValue}
                          contentStyle={{
                            borderRadius: '12px',
                            border: '1px solid #e7e5e4',
                            fontSize: '14px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                {roleChart.length > 0 && (
                  <ul className="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-stone-100 pt-4 text-[15px] text-stone-700">
                    {roleChart.map((d, i) => (
                      <li key={d.name} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: ROLE_COLORS[i % ROLE_COLORS.length] }} />
                        <span className="font-medium">{d.name}</span>
                        <span className="text-stone-600">{formatVi(d.value)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={chartCard}>
                <h2 className="mb-4 font-['Cormorant_Garamond',serif] text-lg font-semibold text-stone-900">
                  Trạng thái tài khoản
                </h2>
                <div className="h-[300px] w-full min-h-[260px]">
                  {activeChart.length === 0 ? (
                    <p className="flex h-full items-center justify-center text-stone-500">Chưa có dữ liệu</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activeChart}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius="48%"
                          outerRadius="78%"
                          paddingAngle={2}
                        >
                          {activeChart.map((_, i) => (
                            <Cell key={i} fill={ACTIVE_COLORS[i % ACTIVE_COLORS.length]} stroke="#fff" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={formatChartTooltipValue}
                          contentStyle={{
                            borderRadius: '12px',
                            border: '1px solid #e7e5e4',
                            fontSize: '14px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                {activeChart.length > 0 && (
                  <ul className="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-stone-100 pt-4 text-[15px] text-stone-700">
                    {activeChart.map((d, i) => (
                      <li key={d.name} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: ACTIVE_COLORS[i % ACTIVE_COLORS.length] }} />
                        <span className="font-medium">{d.name}</span>
                        <span className="text-stone-600">{formatVi(d.value)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={chartCard}>
              <h2 className="mb-4 font-['Cormorant_Garamond',serif] text-lg font-semibold text-stone-900">Hoạt động hệ thống</h2>
              <div className="h-[340px] w-full min-h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={systemBar} margin={{ top: 8, right: 8, left: 8, bottom: 48 }}>
                    <CartesianGrid strokeDasharray="4 6" stroke="#e7e5e4" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#57534e', fontSize: 13 }}
                      interval={0}
                      angle={-18}
                      textAnchor="end"
                      height={56}
                    />
                    <YAxis tick={{ fill: '#57534e', fontSize: 13 }} tickFormatter={(v) => formatVi(Number(v))} width={56} />
                    <Tooltip
                      formatter={formatChartTooltipValue}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e7e5e4',
                        fontSize: '14px',
                      }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={56}>
                      {systemBar.map((_, i) => (
                        <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
