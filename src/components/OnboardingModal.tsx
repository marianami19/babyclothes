'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, Baby, Ruler, Leaf, Sparkles } from 'lucide-react'
import { ETHNICITIES, AGE_OPTIONS, getSuggestedSize } from '@/lib/sizeGuide'

export interface OnboardingResult {
  gender:   string
  size:     string
  material: string
}

interface Props {
  onComplete: (result: OnboardingResult) => void
  onSkip:     () => void
}

const STORAGE_KEY = 'll-onboarding-done'

const GENDERS = [
  { value: 'FEMALE', label: 'Girl',       emoji: '👧', color: 'bg-baby-pink/30 border-baby-pink/50   text-pink-600'   },
  { value: 'MALE',   label: 'Boy',        emoji: '👦', color: 'bg-powder-blue/30 border-sky/50 text-blue-600'   },
  { value: 'ALL',    label: 'Surprise!',  emoji: '✨', color: 'bg-lavender/30 border-lavender/60 text-purple-600' },
]

const MATERIAL_OPTIONS = [
  { value: 'Organic Cotton',      label: 'Organic Cotton',  icon: '🌿' },
  { value: 'Bamboo',              label: 'Bamboo',          icon: '🎋' },
  { value: 'GOTS Certified Cotton', label: 'GOTS Cotton',  icon: '✅' },
  { value: 'Merino Wool',         label: 'Merino Wool',     icon: '🐑' },
  { value: 'ALL',                 label: 'No preference',   icon: '💛' },
]

export function useShowOnboarding() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true)
  }, [])
  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setShow(false)
  }
  return { show, dismiss }
}

export default function OnboardingModal({ onComplete, onSkip }: Props) {
  const [step,      setStep]      = useState(0)
  const [gender,    setGender]    = useState('')
  const [ageMonths, setAgeMonths] = useState<number | ''>('')
  const [ethnicity, setEthnicity] = useState('')
  const [material,  setMaterial]  = useState('')

  const suggestedSize = ethnicity && ageMonths !== ''
    ? getSuggestedSize(ethnicity, Number(ageMonths)).size
    : null

  const handleComplete = () => {
    onComplete({
      gender:   gender   || 'ALL',
      size:     suggestedSize || 'ALL',
      material: material === 'ALL' ? 'ALL' : material || 'ALL',
    })
  }

  const steps = [
    // Step 0: Welcome
    <div key="welcome" className="text-center">
      <div className="mb-5 flex justify-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-baby-pink/40 to-lavender/40 text-4xl shadow-lg backdrop-blur-sm">
          🌸
        </span>
      </div>
      <h2 className="mb-2 font-display text-2xl font-semibold text-gray-800">
        Welcome to Little &amp; Loved
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-gray-500">
        Every piece here is made with your baby's delicate skin in mind — certified organic,
        baby-safe, and crafted with love. Let us personalise your experience.
      </p>
      <button
        onClick={() => setStep(1)}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-baby-pink py-3.5 font-semibold text-white shadow-sm transition hover:bg-rose"
      >
        Let's get started <ChevronRight className="h-4 w-4" />
      </button>
      <button onClick={onSkip} className="w-full text-sm text-gray-400 underline hover:text-gray-600">
        Skip — take me to the shop
      </button>
    </div>,

    // Step 1: Gender
    <div key="gender">
      <div className="mb-1 flex items-center gap-2 text-pink-400">
        <Baby className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">Step 1 of 3</span>
      </div>
      <h2 className="mb-1 font-display text-xl font-semibold text-gray-800">
        Who are we shopping for?
      </h2>
      <p className="mb-5 text-sm text-gray-400">We'll show the most relevant items first.</p>
      <div className="mb-6 grid grid-cols-3 gap-3">
        {GENDERS.map((g) => (
          <button
            key={g.value}
            onClick={() => setGender(g.value)}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
              gender === g.value ? g.color + ' scale-105 shadow-sm' : 'border-gray-100 bg-white/50 text-gray-500 hover:border-gray-200'
            }`}
          >
            <span className="text-3xl">{g.emoji}</span>
            <span className="text-sm font-semibold">{g.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setStep(2)}
        disabled={!gender}
        className="w-full rounded-2xl bg-baby-pink py-3 font-semibold text-white transition hover:bg-rose disabled:opacity-40"
      >
        Next →
      </button>
      <button onClick={() => { setGender('ALL'); setStep(2) }} className="mt-2 w-full text-center text-xs text-gray-400 underline">
        Skip this step
      </button>
    </div>,

    // Step 2: Age + ethnicity
    <div key="size">
      <div className="mb-1 flex items-center gap-2 text-pink-400">
        <Ruler className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">Step 2 of 3</span>
      </div>
      <h2 className="mb-1 font-display text-xl font-semibold text-gray-800">
        Let's find the right size
      </h2>
      <p className="mb-4 text-sm text-gray-400">We'll suggest a size based on typical measurements.</p>

      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">Baby's Age</label>
      <select
        value={ageMonths}
        onChange={(e) => setAgeMonths(Number(e.target.value))}
        className="mb-4 w-full rounded-xl border border-pink-100 bg-white/60 p-3 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-baby-pink"
      >
        <option value="">Select age…</option>
        {AGE_OPTIONS.map((a) => (
          <option key={a.value} value={a.value}>{a.label}</option>
        ))}
      </select>

      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">Ethnic Background</label>
      <select
        value={ethnicity}
        onChange={(e) => setEthnicity(e.target.value)}
        className="mb-5 w-full rounded-xl border border-pink-100 bg-white/60 p-3 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-baby-pink"
      >
        <option value="">Select background…</option>
        {ETHNICITIES.map((e) => (
          <option key={e.value} value={e.value}>{e.label}</option>
        ))}
      </select>

      {suggestedSize && (
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-blush px-4 py-3 text-sm">
          <span className="text-gray-600">Suggested size:</span>
          <span className="text-lg font-bold text-pink-500">{suggestedSize}</span>
        </div>
      )}

      <button
        onClick={() => setStep(3)}
        className="w-full rounded-2xl bg-baby-pink py-3 font-semibold text-white transition hover:bg-rose"
      >
        Next →
      </button>
      <button onClick={() => setStep(3)} className="mt-2 w-full text-center text-xs text-gray-400 underline">
        Skip — I'll choose size myself
      </button>
    </div>,

    // Step 3: Material
    <div key="material">
      <div className="mb-1 flex items-center gap-2 text-pink-400">
        <Leaf className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">Step 3 of 3</span>
      </div>
      <h2 className="mb-1 font-display text-xl font-semibold text-gray-800">
        Any material preference?
      </h2>
      <p className="mb-4 text-sm text-gray-400">All our materials are 100% baby-safe.</p>
      <div className="mb-5 space-y-2">
        {MATERIAL_OPTIONS.map((m) => (
          <button
            key={m.value}
            onClick={() => setMaterial(m.value)}
            className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm transition-all ${
              material === m.value
                ? 'border-baby-pink bg-blush font-semibold text-pink-600'
                : 'border-gray-100 bg-white/50 text-gray-600 hover:border-gray-200'
            }`}
          >
            <span className="text-xl">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleComplete}
        disabled={!material}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-baby-pink py-3.5 font-semibold text-white transition hover:bg-rose disabled:opacity-40"
      >
        <Sparkles className="h-4 w-4" /> Show my picks!
      </button>
      <button onClick={() => { setMaterial('ALL'); handleComplete() }} className="mt-2 w-full text-center text-xs text-gray-400 underline">
        Skip — show everything
      </button>
    </div>,
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-3xl border border-white/60 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
        <button
          onClick={onSkip}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-300 transition hover:bg-gray-100 hover:text-gray-500"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Progress bar */}
        {step > 0 && (
          <div className="mb-5 flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-baby-pink' : 'bg-gray-100'}`}
              />
            ))}
          </div>
        )}

        {steps[step]}
      </div>
    </div>
  )
}
