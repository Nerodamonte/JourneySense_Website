import { Link, useOutletContext } from "react-router-dom";
import type { StaffOutletContext } from "../../layouts/staffOutletContext";

const ROWS = [
  {
    route: "Tokyo → Kyoto Express",
    sub: "Shinkansen · Regional",
    user: "anna.k@travel.com",
    mood: "Cultural",
    moodClass: "bg-sky-100 text-sky-800",
    rating: 5,
    preview: "Absolutely seamless ride — the aisle was quiet and the staff were wonderful...",
    date: "Jan 15, 2024",
    actions: "view-hide" as const,
  },
  {
    route: "Downtown Night Loop",
    sub: "Bus · City",
    user: "mike.r@gmail.com",
    mood: "Adventure",
    moodClass: "bg-emerald-100 text-emerald-800",
    rating: 4,
    preview: "Great vibe in the evening but signage at stop 3 was unclear.",
    date: "Jan 14, 2024",
    actions: "view-flag" as const,
  },
  {
    route: "Coastal Scenic Route",
    sub: "Train · Coastal",
    user: "sofi.l@email.com",
    mood: "Relaxation",
    moodClass: "bg-violet-100 text-violet-800",
    rating: 2,
    preview: "Too crowded during peak hours; seating policy should improve.",
    date: "Jan 12, 2024",
    actions: "view-hide" as const,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-400 text-sm tracking-tight">
      {"★".repeat(n)}
      <span className="text-stone-300">{"★".repeat(5 - n)}</span>
      <span className="text-stone-700 ml-1 font-medium">{n}.0</span>
    </span>
  );
}

export default function StaffFeedbackPage() {
  const { setSidebarCollapsed } = useOutletContext<StaffOutletContext>();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#faf7f0]">
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-8 py-4 bg-white/90 backdrop-blur border-b border-stone-200/80">
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
          <span className="text-lg font-semibold text-stone-800 font-['Cormorant_Garamond',serif] hidden sm:inline">Journey Sense</span>
          <span className="hidden sm:inline h-5 w-px bg-stone-200" />
          <h1 className="text-base sm:text-lg font-bold text-stone-900 truncate">Route Ratings &amp; Feedback</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-stone-800">Sarah Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face')] bg-cover bg-center ring-2 ring-white shadow" />
          <button type="button" className="p-1 text-stone-400 hidden sm:block" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-8 space-y-5">
        <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1 min-w-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search by route name or user email..."
              className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#e5c167]/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5">
              <option>All Ratings</option>
            </select>
            <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5">
              <option>All moods</option>
            </select>
            <button type="button" className="rounded-xl bg-[#e5c167] hover:bg-[#d4b35a] text-stone-900 text-sm font-semibold px-5 py-2.5">
              Apply Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { title: "Average Rating", value: "4.2", sub: "", iconBg: "bg-emerald-100", icon: "★", stars: true },
            { title: "Total Feedback", value: "1,247", sub: "+12% from last month", subClass: "text-emerald-600", iconBg: "bg-sky-100" },
            { title: "Low Ratings", value: "23", sub: "+5% from last month", subClass: "text-red-600", iconBg: "bg-red-100" },
            { title: "This Week", value: "89", sub: "+8% from last month", subClass: "text-emerald-600", iconBg: "bg-violet-100" },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 flex gap-4">
              <div className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center text-lg shrink-0`}>{card.icon || "💬"}</div>
              <div>
                <p className="text-xs text-stone-500 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-stone-900 mt-0.5">{card.value}</p>
                {card.stars && <p className="text-amber-400 text-sm mt-1">★★★★☆</p>}
                {card.sub && <p className={`text-xs mt-1 ${card.subClass}`}>{card.sub}</p>}
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-100">
            <h2 className="text-sm font-bold text-stone-900">Recent Feedback</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500 font-semibold">
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Mood</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Feedback Preview</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {ROWS.map((row) => (
                  <tr key={row.route} className="bg-white">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-stone-900">{row.route}</p>
                      <p className="text-xs text-stone-500">{row.sub}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0" />
                        <span className="text-stone-600 text-xs">{row.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${row.moodClass}`}>{row.mood}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Stars n={row.rating} />
                    </td>
                    <td className="px-4 py-3 text-stone-600 max-w-[200px] truncate">{row.preview}</td>
                    <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Link to="/staff/feedback/1" className="text-sky-600 hover:underline text-xs font-medium mr-2">
                        View
                      </Link>
                      {row.actions === "view-flag" ? (
                        <button type="button" className="text-red-600 hover:underline text-xs font-medium">Flag</button>
                      ) : (
                        <button type="button" className="text-sky-600 hover:underline text-xs font-medium">Hide</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-stone-100 bg-stone-50/50">
            <button type="button" className="px-3 py-1.5 text-sm rounded-lg border border-stone-200 bg-white text-stone-600">
              Previous
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p} type="button" className={`px-3 py-1.5 text-sm rounded-lg ${p === 1 ? "bg-[#e5c167] text-stone-900 font-semibold" : "border border-stone-200 bg-white"}`}>
                {p}
              </button>
            ))}
            <button type="button" className="px-3 py-1.5 text-sm rounded-lg border border-stone-200 bg-white text-stone-600">
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
