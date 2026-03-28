import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { StaffOutletContext } from "../../layouts/staffOutletContext";

const MOODS = ["Relaxed", "Adventure", "Cultural", "Romantic", "Foodie", "Nature"] as const;
const IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=120&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=200&h=120&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=120&fit=crop",
];

export default function StaffEditJourneyPage() {
  const { journeyId } = useParams<{ journeyId: string }>();
  const { setSidebarCollapsed } = useOutletContext<StaffOutletContext>();
  const [name, setName] = useState("Sunset Beach Paradise Experience");
  const [location, setLocation] = useState("Bali, Indonesia - Seminyak Beach Area");
  const [rating, setRating] = useState(4);
  const [moods, setMoods] = useState<string[]>(["Relaxed", "Romantic", "Nature"]);

  const toggleMood = (m: string) => {
    setMoods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#fdfbf7]">
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
          <span className="text-sm font-semibold text-stone-800 font-['Cormorant_Garamond',serif] hidden sm:inline">Journey Sense</span>
          <span className="hidden md:inline h-5 w-px bg-stone-200" />
          <h1 className="text-base font-bold text-stone-900 truncate">Edit Journey {journeyId && <span className="text-stone-400 font-normal text-sm">#{journeyId}</span>}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-stone-200 bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face')] bg-cover ring-2 ring-white" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-sm font-bold text-stone-900 mb-4">Journey Information</h2>
              <label className="text-xs font-semibold text-stone-600">Journey Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm mb-4"
              />
              <label className="text-xs font-semibold text-stone-600 flex items-center gap-1">
                Additional Location
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm"
              />
              <div className="mt-4 h-56 rounded-xl overflow-hidden border border-stone-200 relative bg-[url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop')] bg-cover bg-center">
                <span className="absolute top-2 right-2 text-xs bg-white/90 px-2 py-1 rounded-lg shadow">Seminyak Beach</span>
                <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full ring-2 ring-white shadow" />
                <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-red-500 rounded-full ring-2 ring-white shadow" />
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-sm font-bold text-stone-900 mb-3">Journey Moods</h2>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleMood(m)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      moods.includes(m) ? "bg-[#faf6ef] border-[#c5a070] text-stone-900" : "bg-white border-stone-200 text-stone-600"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-sm font-bold text-stone-900 mb-3">Journey Images</h2>
              <div className="flex flex-wrap gap-3">
                {IMAGES.map((src) => (
                  <img key={src} src={src} alt="" className="w-28 h-20 object-cover rounded-lg border border-stone-100" />
                ))}
                <button
                  type="button"
                  className="w-28 h-20 rounded-lg border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 text-xs gap-1 hover:bg-stone-50"
                >
                  <span className="text-lg">+</span>
                  Add Image
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-sm font-bold text-stone-900 mb-2">Journey Quality Rating</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-xl text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button key={i} type="button" onClick={() => setRating(i)} className={i <= rating ? "" : "text-stone-200"}>
                      ★
                    </button>
                  ))}
                </div>
                <span className="text-sm font-semibold text-stone-700">{rating}.0 / 5.0</span>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-8">
              <button type="button" className="text-red-600 text-sm font-semibold inline-flex items-center gap-2 hover:underline">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Journey
              </button>
              <div className="flex gap-2 justify-end">
                <button type="button" className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700">
                  Cancel
                </button>
                <button type="button" className="rounded-xl bg-[#c5a070] hover:bg-[#b08f5f] text-white px-5 py-2.5 text-sm font-semibold shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-5 sticky top-4">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 mb-4">
                <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live Preview
              </div>
              <div className="rounded-xl overflow-hidden border border-stone-100 shadow-md">
                <div className="h-32 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop')] bg-cover bg-center" />
                <div className="p-4">
                  <h3 className="font-bold text-stone-900 leading-tight">{name}</h3>
                  <p className="text-xs text-stone-500 mt-2 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {location}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {moods.map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-amber-400 text-sm">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-900">Quality Rating</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-sky-50 border border-sky-100 px-3 py-2 text-xs text-sky-900">
                Review Updates: Changes reflect here in real time as you edit the form.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
