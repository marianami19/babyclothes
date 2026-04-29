'use client'

import { useState } from 'react'
import {
  ETHNICITIES,
  AGE_OPTIONS,
  ALL_SIZES,
  getSuggestedSize,
  getSizeFromHeight,
  type SizeRecommendation,
} from '@/lib/sizeGuide'

interface Props {
  onSizeSelected: (size: string) => void
  onClose: () => void
}

export default function SizeGuideModal({ onSizeSelected, onClose }: Props) {
  const [ethnicity, setEthnicity]     = useState('')
  const [ageMonths, setAgeMonths]     = useState<number | ''>('')
  const [recommendation, setRec]      = useState<SizeRecommendation | null>(null)
  const [useCustom, setUseCustom]     = useState(false)
  const [customHeight, setCustomH]    = useState('')

  const handleCalculate = () => {
    if (!ethnicity || ageMonths === '') return
    const rec = getSuggestedSize(ethnicity, Number(ageMonths))
    setRec(rec)
    setUseCustom(false)
    setCustomH('')
  }

  const customSize = customHeight
    ? getSizeFromHeight(Number(customHeight))
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>

        <h2 className="mb-1 font-display text-xl font-semibold text-pink-500">
          Find Your Baby's Size
        </h2>
        <p className="mb-5 text-sm text-gray-500">
          We'll suggest a size based on typical measurements for your baby's background and age — you can always adjust.
        </p>

        {/* Ethnicity */}
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Baby's Ethnic Background
        </label>
        <select
          value={ethnicity}
          onChange={(e) => { setEthnicity(e.target.value); setRec(null) }}
          className="mb-4 w-full rounded-xl border border-pink-100 bg-blush/30 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-baby-pink"
        >
          <option value="">Select background…</option>
          {ETHNICITIES.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>

        {/* Age */}
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Baby's Age
        </label>
        <select
          value={ageMonths}
          onChange={(e) => { setAgeMonths(Number(e.target.value)); setRec(null) }}
          className="mb-5 w-full rounded-xl border border-pink-100 bg-blush/30 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-baby-pink"
        >
          <option value="">Select age…</option>
          {AGE_OPTIONS.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>

        <button
          onClick={handleCalculate}
          disabled={!ethnicity || ageMonths === ''}
          className="mb-5 w-full rounded-xl bg-baby-pink py-3 text-sm font-semibold text-white transition-opacity hover:bg-rose disabled:opacity-40"
        >
          Calculate Suggested Size
        </button>

        {/* Suggestion */}
        {recommendation && (
          <div className="mb-5 rounded-2xl bg-blush p-4 text-sm">
            <p className="mb-3 font-semibold text-pink-600">
              Typical measurements for{' '}
              {ETHNICITIES.find((e) => e.value === ethnicity)?.label ?? ethnicity} babies at{' '}
              {AGE_OPTIONS.find((a) => a.value === Number(ageMonths))?.label ?? `${ageMonths}m`}:
            </p>
            <div className="mb-3 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <div className="text-xs text-gray-400">Height</div>
                <div className="font-bold text-gray-700">{recommendation.heightCm} cm</div>
              </div>
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <div className="text-xs text-gray-400">Weight</div>
                <div className="font-bold text-gray-700">{recommendation.weightKg} kg</div>
              </div>
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <div className="text-xs text-gray-400">Chest</div>
                <div className="font-bold text-gray-700 text-xs leading-tight">{recommendation.chestRange}</div>
              </div>
            </div>
            <p className="mb-3 text-center text-gray-600">
              Suggested size:{' '}
              <span className="text-lg font-bold text-pink-500">{recommendation.size}</span>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => { onSizeSelected(recommendation.size); onClose() }}
                className="flex-1 rounded-xl bg-baby-pink py-2 text-sm font-semibold text-white hover:bg-rose transition-colors"
              >
                Use {recommendation.size}
              </button>
              <button
                onClick={() => setUseCustom(true)}
                className="flex-1 rounded-xl border border-pink-200 py-2 text-sm font-semibold text-pink-500 hover:bg-blush transition-colors"
              >
                Enter my own
              </button>
            </div>
          </div>
        )}

        {/* Custom measurement */}
        {useCustom && (
          <div className="rounded-2xl bg-lavender/20 p-4 text-sm">
            <p className="mb-3 font-semibold text-purple-600">Enter your baby's height</p>
            <p className="mb-3 text-xs text-gray-500">
              Measure from the top of the head to the heel while baby lies flat.{' '}
              <a href="/size-guide" target="_blank" className="underline text-pink-500">
                How to measure →
              </a>
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="e.g. 65"
                value={customHeight}
                onChange={(e) => setCustomH(e.target.value)}
                className="flex-1 rounded-xl border border-purple-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-lavender"
              />
              <span className="flex items-center text-sm text-gray-500">cm</span>
            </div>
            {customSize && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3">
                <span className="text-gray-600">Recommended size:</span>
                <span className="text-lg font-bold text-pink-500">{customSize}</span>
              </div>
            )}
            {customSize && (
              <button
                onClick={() => { onSizeSelected(customSize); onClose() }}
                className="mt-3 w-full rounded-xl bg-lavender py-2 text-sm font-semibold text-purple-800 hover:bg-purple-200 transition-colors"
              >
                Use {customSize}
              </button>
            )}
          </div>
        )}

        {/* Skip */}
        <button
          onClick={() => { onSizeSelected('ALL'); onClose() }}
          className="mt-4 w-full text-center text-xs text-gray-400 underline hover:text-gray-600"
        >
          Skip — show all sizes
        </button>
      </div>
    </div>
  )
}
