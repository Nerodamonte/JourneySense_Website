import { Link, Navigate, useParams } from "react-router-dom";
import { getAccountDetailView } from "../../data/mockAccounts";
import type { RowRole, RowStatus } from "../../data/mockAccounts";

function rolePillDetail(role: RowRole) {
  if (role === "User") return "bg-stone-200 text-stone-700";
  if (role === "Staff") return "bg-violet-100 text-violet-800";
  return "bg-orange-100 text-orange-800";
}

function statusPill(status: RowStatus) {
  return status === "Active"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-red-100 text-red-700";
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${count} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill={i <= count ? "currentColor" : "none"} stroke="currentColor">
          <path
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3l2.08 6.42H21l-5.42 3.94 2.08 6.42L12 15.84 6.34 19.78l2.08-6.42L3 9.42h6.92L12 3z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function UserAccountDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  if (!userId) return <Navigate to="/admin/accounts" replace />;

  const account = getAccountDetailView(userId);
  if (!account) return <Navigate to="/admin/accounts" replace />;

  return (
    <div className="min-h-screen bg-[#fff9f0] font-['Lato',system-ui,sans-serif] text-stone-800">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white/95 backdrop-blur border-b border-stone-200/80">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/admin/accounts"
            className="p-2 -ml-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 shrink-0"
            aria-label="Quay lại danh sách"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-stone-700 hidden sm:inline">Journey Sense</span>
            </div>
            <span className="hidden sm:inline h-5 w-px bg-stone-200 shrink-0" aria-hidden />
            <h1 className="text-sm sm:text-base font-semibold text-stone-900 truncate">User Account Detail</h1>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 ring-2 ring-white shadow-sm shrink-0" />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-6 text-center">
              <img
                src={account.profileImageUrl}
                alt=""
                className="w-28 h-28 mx-auto rounded-full object-cover ring-4 ring-stone-100 shadow-md"
              />
              <h2 className="mt-4 text-xl font-bold text-stone-900 font-['Cormorant_Garamond',serif]">{account.name}</h2>
              <p className="mt-1 text-sm text-stone-500">{account.email}</p>
              <p className="text-sm text-stone-500">{account.phone}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${rolePillDetail(account.role)}`}>
                  {account.role}
                </span>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusPill(account.status)}`}>
                  {account.status}
                </span>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Membership &amp; Points</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between gap-3">
                  <span className="text-stone-500">Current Plan</span>
                  <span className="font-semibold text-stone-800 text-right">{account.membershipPlan}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-stone-500">Points Wallet</span>
                  <span className="font-semibold text-stone-800">{account.pointsWallet.toLocaleString()}</span>
                </li>
              </ul>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Travel Vibes</h3>
              <div className="flex flex-wrap gap-2">
                {account.travelVibes.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-100/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Account Actions</h3>
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8b7355] hover:bg-[#7a6549] text-white text-sm font-semibold py-3 px-4 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Edit Account Information
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold py-3 px-4 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                  </svg>
                  Reset Password
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-3 px-4 border border-red-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Suspend Account
                </button>
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-4">Journey Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#faf6ef] border border-stone-100 p-4 text-center">
                  <p className="text-2xl font-bold text-stone-900">{account.journeyTotal}</p>
                  <p className="text-xs text-stone-500 mt-1">Total Journeys</p>
                </div>
                <div className="rounded-xl bg-[#faf6ef] border border-stone-100 p-4 text-center">
                  <p className="text-2xl font-bold text-stone-900">{account.avgRating}</p>
                  <p className="text-xs text-stone-500 mt-1">Avg Rating</p>
                </div>
                <div className="rounded-xl bg-[#faf6ef] border border-stone-100 p-4 text-center">
                  <p className="text-2xl font-bold text-stone-900 flex items-center justify-center gap-1">
                    {account.pointsUsed.toLocaleString()}
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-8-8 16" />
                    </svg>
                  </p>
                  <p className="text-xs text-stone-500 mt-1">Points Used</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-4">Recent Journeys</h3>
              <ul className="divide-y divide-stone-100">
                {account.recentJourneys.length === 0 ? (
                  <li className="py-4 text-sm text-stone-500">Chưa có hành trình.</li>
                ) : (
                  account.recentJourneys.map((j) => (
                    <li key={`${j.route}-${j.date}`} className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-stone-900">{j.route}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{j.date}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Stars count={j.stars} />
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">{j.category}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <button
                type="button"
                className="mt-4 w-full sm:w-auto rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-sm font-semibold py-2.5 px-4 transition-colors"
              >
                View All Journey History
              </button>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-4">Account Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <dt className="text-stone-500">Account Created</dt>
                  <dd className="font-medium text-stone-900 sm:text-right">{account.accountCreatedLabel}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <dt className="text-stone-500">Last Login</dt>
                  <dd className="font-medium text-stone-900 sm:text-right">{account.lastLoginLabel}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <dt className="text-stone-500">Account ID</dt>
                  <dd className="font-medium text-stone-900 sm:text-right font-mono text-xs sm:text-sm">{account.accountIdLabel}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
