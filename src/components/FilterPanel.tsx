'use client'

import { useState } from 'react'
import { SlidersHorizontal, X, Ruler } from 'lucide-react'
import { ALL_SIZES, MATERIALS } from '@/lib/sizeGuide'
import SizeGuideModal from './SizeGuideModal'

export interface Filters {
  gender:   string
  size:     string
  material: string
}

interface Props {
  filters:  Filters
  onChange: (filters: Filters) => void
}

const GENDERS = [
  { value: 'ALL',    label: 'All'    },
  { value: 'FEMALE', label: 'Girl'   },
  { value: 'MALE',   label: 'Boy'    },
  { value: 'UNISEX', label: 'Unisex' },
]

export default function FilterPanel({ filters, onChange }: Props) {
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)

  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value })

  const activeCount = [
    filters.gender   !== 'ALL',
    filters.size     !== 'ALL',
    filters.material !== 'ALL',
  ].filter(Boolean).length

  const inner = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold text-gray-700">
          <SlidersHorizontal className="h-4 w-4 text-pink-400" /> Filters
        </h2>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ gender: 'ALL', size: 'ALL', material: 'ALL' })}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      {/* Gender */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Gender</h3>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              onClick={() => set('gender', g.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                filters.gender === g.value
                  ? 'bg-baby-pink text-white shadow-sm'
                  : 'border border-white/60 bg-white/40 text-gray-500 backdrop-blur-sm hover:bg-white/70'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </section>

      {/* Size */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Size</h3>
          <button
            onClick={() => setShowSizeModal(true)}
            className="flex items-center gap-1 text-xs font-medium text-pink-400 underline hover:text-rose"
          >
            <Ruler className="h-3 w-3" /> Find my size
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', ...ALL_SIZES].map((s) => (
            <button
              key={s}
              onClick={() => set('size', s)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                filters.size === s
                  ? 'bg-baby-pink text-white shadow-sm'
                  : 'border border-white/60 bg-white/40 text-gray-500 backdrop-blur-sm hover:bg-white/70'
              }`}
            >
              {s === 'ALL' ? 'All' : s}
            </button>
          ))}
        </div>
      </section>

      {/* Material */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Material</h3>
        <div className="space-y-1.5">
          {['ALL', ...MATERIALS].map((m) => (
            <button
              key={m}
              onClick={() => set('material', m)}
              className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-all ${
                filters.material === m
                  ? 'bg-baby-pink font-semibold text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              {m === 'ALL' ? 'All Materials' : m}
            </button>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-4 py-2.5 text-sm font-medium text-gray-600 backdrop-blur-sm shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4 text-pink-400" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-baby-pink text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="relative ml-auto h-full w-72 overflow-y-auto rounded-l-3xl border-l border-white/60 bg-white/80 p-5 shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mt-8">{inner}</div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-60 flex-shrink-0 rounded-3xl border border-white/60 bg-white/50 p-5 shadow-card backdrop-blur-sm lg:block">
        {inner}
      </aside>

      {showSizeModal && (
        <SizeGuideModal
          onSizeSelected={(size) => set('size', size)}
          onClose={() => setShowSizeModal(false)}
        />
      )}
    </>
  )
}
