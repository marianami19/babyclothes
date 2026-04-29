'use client'

import { useState } from 'react'
import { ALL_SIZES, MATERIALS } from '@/lib/sizeGuide'
import SizeGuideModal from './SizeGuideModal'

export interface Filters {
  gender: string
  size: string
  material: string
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
}

const GENDERS = [
  { value: 'ALL',    label: 'All' },
  { value: 'FEMALE', label: 'Girl' },
  { value: 'MALE',   label: 'Boy' },
  { value: 'UNISEX', label: 'Unisex' },
]

export default function FilterPanel({ filters, onChange }: Props) {
  const [showSizeModal, setShowSizeModal] = useState(false)

  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value })

  return (
    <>
      <aside className="w-full space-y-6 rounded-2xl bg-white p-5 shadow-card lg:w-64 lg:flex-shrink-0">
        <h2 className="font-display text-lg font-semibold text-pink-500">Filters</h2>

        {/* Gender */}
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Gender</h3>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => set('gender', g.value)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  filters.gender === g.value
                    ? 'bg-baby-pink text-white'
                    : 'bg-blush text-pink-400 hover:bg-baby-pink/40'
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
              className="flex items-center gap-1 text-xs font-medium text-pink-400 hover:text-pink-600 underline"
            >
              Find my baby's size
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => set('size', 'ALL')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filters.size === 'ALL'
                  ? 'bg-baby-pink text-white'
                  : 'bg-blush text-pink-400 hover:bg-baby-pink/40'
              }`}
            >
              All
            </button>
            {ALL_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => set('size', s)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  filters.size === s
                    ? 'bg-baby-pink text-white'
                    : 'bg-blush text-pink-400 hover:bg-baby-pink/40'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Material */}
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Material</h3>
          <div className="space-y-1.5">
            <button
              onClick={() => set('material', 'ALL')}
              className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                filters.material === 'ALL'
                  ? 'bg-baby-pink text-white font-semibold'
                  : 'text-gray-600 hover:bg-blush'
              }`}
            >
              All Materials
            </button>
            {MATERIALS.map((m) => (
              <button
                key={m}
                onClick={() => set('material', m)}
                className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  filters.material === m
                    ? 'bg-baby-pink text-white font-semibold'
                    : 'text-gray-600 hover:bg-blush'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        {/* Reset */}
        {(filters.gender !== 'ALL' || filters.size !== 'ALL' || filters.material !== 'ALL') && (
          <button
            onClick={() => onChange({ gender: 'ALL', size: 'ALL', material: 'ALL' })}
            className="w-full rounded-xl border border-pink-200 py-2 text-sm text-pink-400 hover:bg-blush transition-colors"
          >
            Clear all filters
          </button>
        )}
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
