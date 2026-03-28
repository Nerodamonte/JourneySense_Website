import { useOutletContext } from "react-router-dom";
import type { StaffOutletContext } from "../../layouts/staffOutletContext";

const LOCATIONS = [
  {
    name: "Sunset Beach Resort",
    address: "123 Ocean Drive, Maldives",
    moods: ["Romantic", "Relax", "Nature"],
    rating: 4.3,
    status: "Active" as const,
  },
  {
    name: "Alpine Vista Lodge",
    address: "45 Mountain Rd, Switzerland",
    moods: ["Adventure", "Nature"],
    rating: 4.8,
    status: "Active" as const,
  },
  {
    name: "Hidden Garden Café",
    address: "8 Lane, Kyoto",
    moods: ["Cultural", "Foodie"],
    rating: 3.9,
    status: "Hidden" as const,
  },
];

const moodColors = ["bg-pink-100 text-pink-800", "bg-sky-100 text-sky-800", "bg-emerald-100 text-emerald-800", "bg-violet-100 text-violet-800"];

export default function StaffDashboardPage() {
  const { setSidebarCollapsed } = useOutletContext<StaffOutletContext>();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-white/80 backdrop-blur border-b border-stone-200/80">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 shrink-0"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#c5a070] flex items-center justify-center text-white text-xs font-bold shrink-0">J</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-stone-800 truncate font-['Cormorant_Garamond',serif]">Journey Sense</p>
              <p className="text-xs text-stone-500 truncate">Staff Dashboard</p>
            </div>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full ring-2 ring-white shadow shrink-0 bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face')] bg-cover bg-center" />
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Manage Locations</h2>
              <p className="text-sm text-stone-500 mt-1">Search, filter and manage all your locations.</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">View Ratings &amp; Feedback</h2>
              <p className="text-sm text-stone-500 mt-1">Review and respond to all feedback from customers.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-4 sm:p-5">
          <div className="flex flex-col xl:flex-row gap-3 xl:items-end">
            <div className="relative flex-1 min-w-0">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search by location name or address"
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-[#c5a070]/40"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-700">
                <option>Location Type</option>
                <option>Resort</option>
                <option>Dining</option>
              </select>
              <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-700">
                <option>Mood Tags</option>
              </select>
              <select className="text-sm rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-700">
                <option>Rating Range</option>
              </select>
              <button type="button" className="rounded-xl bg-[#c5a070] hover:bg-[#b08f5f] text-white text-sm font-semibold px-5 py-2.5 shadow-sm">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="bg-[#f5f0e8] text-left text-xs uppercase tracking-wide text-stone-600 font-semibold">
                  <th className="px-4 py-3">Location Name</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Moods</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {LOCATIONS.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-stone-50/40"}>
                    <td className="px-4 py-3 font-semibold text-stone-900">{row.name}</td>
                    <td className="px-4 py-3 text-stone-600">{row.address}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.moods.map((m, j) => (
                          <span key={m} className={`px-2 py-0.5 rounded-full text-xs font-medium ${moodColors[j % moodColors.length]}`}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-amber-500">★★★★☆</span>
                      <span className="ml-1 text-stone-700 font-medium">{row.rating}</span>
                    </td>
                    <td className="px-4 py-3">
                      {row.status === "Active" ? (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white">Active</span>
                      ) : (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-white">Hidden</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button type="button" className="text-sky-600 hover:underline text-xs font-medium mr-2">View</button>
                      <button type="button" className="text-sky-600 hover:underline text-xs font-medium mr-2">Edit</button>
                      {row.status === "Active" ? (
                        <button type="button" className="text-red-600 hover:underline text-xs font-medium">Disable</button>
                      ) : (
                        <button type="button" className="text-emerald-600 hover:underline text-xs font-medium">Enable</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
