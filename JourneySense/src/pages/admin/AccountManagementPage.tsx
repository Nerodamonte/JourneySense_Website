import { useState } from "react";
import { Link } from "react-router-dom";
import type { RowRole, RowStatus } from "../../data/mockAccounts";
import { MOCK_USERS } from "../../data/mockAccounts";

function roleBadgeClass(role: RowRole) {
  switch (role) {
    case "User":
      return "bg-sky-100 text-sky-800";
    case "Staff":
      return "bg-violet-100 text-violet-800";
    case "Admin":
      return "bg-orange-100 text-orange-800";
  }
}

function statusBadgeClass(status: RowStatus) {
  return status === "Active"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-red-100 text-red-700";
}

const navItems = [
  {
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Users",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "Reports",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AccountManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "staff">("users");
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = 147;
  const perPage = 10;

  return (
    <div className="min-h-screen flex bg-[#faf8f3] font-['Lato',system-ui,sans-serif] text-stone-800">
      {/* Sidebar */}
      <aside
        className={`shrink-0 border-r border-stone-200/80 bg-white/80 backdrop-blur-sm flex flex-col transition-[width] duration-300 ease-out ${
          sidebarCollapsed ? "w-[72px]" : "w-[220px]"
        }`}
      >
        <div className={`flex items-center gap-2 px-3 py-4 border-b border-stone-100 ${sidebarCollapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center shadow-sm shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          {!sidebarCollapsed && (
            <span className="text-sm font-semibold tracking-wide text-stone-700 truncate">Journey Sense</span>
          )}
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.label === "Users"
                  ? "bg-amber-50 text-amber-700"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
            >
              <span className={item.label === "Users" ? "text-amber-600" : "text-stone-500"}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className={`w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-stone-600 hover:bg-stone-50 transition-colors ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
            title={sidebarCollapsed ? "Mở sidebar" : "Thu sidebar"}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5v14" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19v-14" />
              )}
            </svg>
            {!sidebarCollapsed && <span>Thu gọn</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="shrink-0 flex items-center justify-between gap-4 px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-stone-200/80">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarCollapsed((c) => !c)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-bold text-stone-900 truncate font-['Cormorant_Garamond',serif] text-xl sm:text-2xl">
              Account Management
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="text-right hidden sm:block min-w-0">
              <p className="text-sm font-semibold text-stone-800 truncate">Adela User</p>
              <p className="text-xs text-stone-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 ring-2 ring-white shadow-sm shrink-0" />
            <button type="button" className="p-1 text-stone-400 hover:text-stone-600" aria-label="Menu tài khoản">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="shrink-0 px-6 pt-4 flex gap-6 border-b border-stone-200/60 bg-[#faf8f3]">
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "users"
                ? "border-amber-400 text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Users
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("staff")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "staff"
                ? "border-amber-400 text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Staff
          </button>
        </div>

        <main className="flex-1 p-6 overflow-auto">
          {/* Toolbar card */}
          <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-4 sm:p-5 mb-5">
            <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
              <div className="relative flex-1 min-w-0">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search by name, email, or phone"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/30">
                  <option>All Roles</option>
                  <option>User</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </select>
                <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/30">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>
                <button
                  type="button"
                  className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-700 inline-flex items-center gap-2 hover:bg-stone-50"
                >
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date Range
                </button>
                <button
                  type="button"
                  className="ml-auto xl:ml-0 inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold px-4 py-2.5 shadow-sm transition-colors"
                >
                  <span className="text-lg leading-none">+</span>
                  Create Account
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="bg-[#f5f0e8] text-left text-xs uppercase tracking-wide text-stone-600 font-semibold">
                    <th className="px-4 py-3.5 w-14">Avatar</th>
                    <th className="px-4 py-3.5">Full Name</th>
                    <th className="px-4 py-3.5">Email</th>
                    <th className="px-4 py-3.5">Phone</th>
                    <th className="px-4 py-3.5">Role</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Created Date</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {MOCK_USERS.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-stone-50/40"}>
                      <td className="px-4 py-3">
                        {row.initials ? (
                          <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-600 text-xs font-semibold flex items-center justify-center">
                            {row.initials}
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-stone-300 to-stone-400" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-stone-900">{row.name}</td>
                      <td className="px-4 py-3 text-stone-600">{row.email}</td>
                      <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.phone}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeClass(row.role)}`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.created}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1 text-stone-400">
                          <Link
                            to={`/admin/accounts/${row.id}`}
                            className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-600 inline-flex"
                            title="Xem chi tiết"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button type="button" className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-600" title="Sửa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button type="button" className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-600" title="Chặn / xóa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3.5 border-t border-stone-100 bg-stone-50/50">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <span>Show</span>
                <select className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>per page</span>
              </div>
              <p className="text-sm text-stone-500 text-center sm:text-left">
                Showing {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, totalResults)} of {totalResults} results
              </p>
              <div className="flex items-center justify-center gap-1">
                <button
                  type="button"
                  className="p-2 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 disabled:opacity-40"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`min-w-[2.25rem] py-1.5 px-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === p
                        ? "bg-amber-400 text-white shadow-sm"
                        : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  className="p-2 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50"
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
