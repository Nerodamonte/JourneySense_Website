import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { StaffOutletContext } from "../../layouts/staffOutletContext";

const MOODS = ["Relaxed", "Adventure", "Cultural", "Romantic", "Foodie", "Nature"] as const;

export default function StaffCreateJourneyPage() {
  const { setSidebarCollapsed } = useOutletContext<StaffOutletContext>();
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["Adventure", "Nature"]);
  const [rating, setRating] = useState(0);

  const toggleMood = (m: string) => {
    setSelectedMoods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#fff9f2]">
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-8 py-4 bg-white border-b border-stone-200/80">
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
          <div className="w-9 h-9 rounded-lg bg-[#ff8c00] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
            </svg>
          </div>
          <div className="min-w-0 hidden sm:block">
            <p className="text-sm font-semibold text-stone-800 font-['Cormorant_Garamond',serif]">Journey Sense</p>
            <p className="text-xs text-stone-500">Travel Management</p>
          </div>
          <span className="hidden md:inline h-8 w-px bg-stone-200 mx-1" />
          <h1 className="text-base sm:text-lg font-bold text-stone-900 truncate">Create Journey</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-stone-800">Alex Chen</p>
            <p className="text-xs text-stone-500">Quality Team</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-stone-300 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face')] bg-cover ring-2 ring-white" />
          <button type="button" className="p-1 text-stone-400 hidden sm:block" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center">
        <div className="w-full max-w-3xl rounded-2xl bg-white border border-stone-100 shadow-lg p-6 sm:p-8 space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#ff8c00]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </span>
              <h2 className="text-sm font-bold text-stone-900">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-600">Journey Name *</label>
                <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm" placeholder="e.g. Sunset Ridge Trail" />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 flex items-center gap-1">
                  Location / Address *
                  <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </label>
                <input className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm" placeholder="Search address" />
              </div>
            </div>
            <div className="mt-4 h-40 rounded-xl bg-stone-100 border border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 text-sm">
              <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map previews will appear here
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-pink-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 9.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <h2 className="text-sm font-bold text-stone-900">Journey Moods</h2>
            </div>
            <p className="text-xs text-stone-500 mb-3">Select multiple moods to help personalize recommendations.</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMood(m)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    selectedMoods.includes(m)
                      ? "bg-amber-50 border-amber-300 text-amber-900"
                      : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sky-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <h2 className="text-sm font-bold text-stone-900">Journey Images</h2>
            </div>
            <div className="h-36 rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 text-sm">
              <svg className="w-10 h-10 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Drag &amp; Drop images here or click to browse files
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-500">★</span>
              <h2 className="text-sm font-bold text-stone-900">Journey Quality Rating</h2>
            </div>
            <p className="text-xs text-stone-500 mb-2">Initial quality rating set by staff — helps refine recommendations.</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" onClick={() => setRating(i)} className="p-1 text-2xl text-amber-400 hover:scale-110 transition-transform">
                  {i <= rating ? "★" : <span className="text-stone-200">★</span>}
                </button>
              ))}
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button type="button" className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50">
              Cancel
            </button>
            <button type="button" className="rounded-xl bg-[#ff8c00] hover:bg-[#e67e00] text-white px-5 py-2.5 text-sm font-semibold shadow-sm inline-flex items-center gap-1">
              <span>+</span> Create Journey
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
