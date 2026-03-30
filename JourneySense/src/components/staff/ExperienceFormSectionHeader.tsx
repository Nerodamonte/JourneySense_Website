import type { ReactNode } from 'react'

export function ExperienceFormSectionHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <header className="mb-6 flex items-start gap-3 border-b border-stone-100 pb-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800 shadow-sm">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-semibold leading-snug text-stone-900 font-['Cormorant_Garamond',serif]">{title}</h2>
      </div>
    </header>
  )
}

export const experienceFieldLabel = 'block text-xs font-semibold text-stone-600 mb-1.5 tracking-wide'
export const experienceInputClass =
  'w-full rounded-xl border border-stone-200/90 bg-white px-3.5 py-2.5 text-sm text-stone-800 shadow-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/35 focus:border-amber-400/55'
export const experienceSelectClass = `${experienceInputClass} cursor-pointer`
