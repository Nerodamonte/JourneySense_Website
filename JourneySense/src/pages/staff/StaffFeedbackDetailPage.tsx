import { Link, useOutletContext, useParams } from "react-router-dom";
import type { StaffOutletContext } from "../../layouts/staffOutletContext";

const STAR_BARS = [
  { stars: 5, pct: 45 },
  { stars: 4, pct: 30 },
  { stars: 3, pct: 15 },
  { stars: 2, pct: 7 },
  { stars: 1, pct: 3 },
];

export default function StaffFeedbackDetailPage() {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const { setSidebarCollapsed } = useOutletContext<StaffOutletContext>();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#fffaf3]">
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-8 py-4 bg-white/95 border-b border-stone-200/80">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">J</div>
          <span className="text-sm font-semibold text-stone-800 hidden sm:inline font-['Cormorant_Garamond',serif]">Journey Sense</span>
          <span className="hidden md:inline h-5 w-px bg-stone-200" />
          <h1 className="text-sm sm:text-base font-bold text-stone-900 truncate">Route Feedback Detail</h1>
          {feedbackId && <span className="text-xs text-stone-400 hidden lg:inline">#{feedbackId}</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Admin Staff</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-stone-200 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face')] bg-cover ring-2 ring-white" />
          <button type="button" className="p-1 text-stone-400 hidden sm:block" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h2 className="text-xs font-bold uppercase tracking-wide text-stone-500 mb-4">User &amp; Route Overview</h2>
              <p className="text-lg font-bold text-stone-900">Sarah Mitchell</p>
              <p className="text-sm text-amber-700 font-semibold mt-1">Downtown Express Route</p>
              <div className="flex items-start gap-2 mt-4 text-sm text-stone-600">
                <span className="text-emerald-500 text-lg leading-none">📍</span>
                <span>Central Terminal</span>
                <span className="text-stone-300">→</span>
                <span className="text-red-500 text-lg leading-none">📍</span>
                <span>Harbor District</span>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h2 className="text-xs font-bold uppercase tracking-wide text-stone-500 mb-3">Journey Context</h2>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-stone-500">Date</dt>
                  <dd className="font-medium text-stone-900">March 18, 2025</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Duration</dt>
                  <dd className="font-medium text-stone-900">32 minutes</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Start — End</dt>
                  <dd className="font-medium text-stone-900">8:10 AM — 8:42 AM</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Stops</dt>
                  <dd className="font-medium text-stone-900">6 stops</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden">
              <h2 className="text-xs font-bold uppercase tracking-wide text-stone-500 px-5 pt-5 pb-2">Route Map Preview</h2>
              <div className="h-48 bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50 relative mx-5 mb-5 rounded-xl border border-stone-100">
                <div className="absolute inset-4 border-2 border-dashed border-white/80 rounded-lg opacity-60" />
                <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white shadow" />
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-red-500 ring-2 ring-white shadow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-[#d4a373]/80 rounded-full rotate-12" />
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-stone-900 mb-4">Rating Summary</h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-amber-400 text-2xl">★★★★</span>
                <span className="text-stone-300 text-2xl">★</span>
                <span className="text-lg font-bold text-stone-900">4.0</span>
                <span className="text-stone-500 text-sm">/ 5</span>
              </div>
              <div className="space-y-2">
                {STAR_BARS.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-16 text-stone-500">{row.stars} ★</span>
                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#d4a373] rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-8 text-stone-600 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-stone-900 mb-4">User Feedback</h2>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face')] bg-cover shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">Sarah Mitchell</p>
                  <p className="text-xs text-stone-500">March 18, 2025</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-stone-700 leading-relaxed">
                The Downtown Express was mostly smooth and on time. Air conditioning was strong and seating was clean. Only
                suggestion: clearer announcements before the Harbor District stop during rush hour.
              </p>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-stone-900 mb-2">Staff Internal Notes</h2>
              <textarea
                rows={4}
                placeholder="Add internal notes visible only to staff..."
                className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a373]/40"
              />
              <div className="mt-2 flex justify-end">
                <button type="button" className="rounded-xl bg-[#d4a373] hover:bg-[#c49363] text-white text-sm font-semibold px-4 py-2">
                  Save Note
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8 pt-6 border-t border-stone-200/80">
          <Link to="/staff/feedback" className="text-sm font-medium text-[#d4a373] hover:underline">
            ← Back to Feedback List
          </Link>
          <div className="flex flex-wrap gap-2 justify-end">
            <button type="button" className="rounded-xl border-2 border-[#fd7e14] text-[#fd7e14] hover:bg-orange-50 text-sm font-semibold px-4 py-2">
              Flag Route
            </button>
            <button type="button" className="rounded-xl bg-[#28a745] hover:bg-[#23963d] text-white text-sm font-semibold px-4 py-2">
              Mark as Reviewed
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
