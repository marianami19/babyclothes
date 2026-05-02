import Link from 'next/link'
import { ETHNICITIES, AGE_OPTIONS, getSuggestedSize } from '@/lib/sizeGuide'

export const metadata = { title: 'Size Guide | Little & Loved' }

const STEPS = [
  {
    number: '1', title: 'Height / Body Length', icon: '📏',
    color: 'bg-baby-pink/30 text-pink-500',
    how: 'Lay your baby flat on a firm surface. Place a soft book against the top of their head and another against their heel (foot flexed upward at 90°). Measure the distance between the two books.',
    tip: 'Always measure without shoes. Add 1–2 cm if measuring with clothes on.',
  },
  {
    number: '2', title: 'Chest Circumference', icon: '🔵',
    color: 'bg-powder-blue/40 text-blue-500',
    how: 'Wrap a soft measuring tape around the fullest part of the chest — just under the armpits. Keep the tape snug but not tight, running parallel to the floor.',
    tip: 'Measure while baby is calm and breathing normally. Add 1–2 cm ease for a comfortable fit.',
  },
  {
    number: '3', title: 'Waist', icon: '🟣',
    color: 'bg-lavender/40 text-purple-500',
    how: 'Find the natural waistline — the narrowest part of the torso between ribs and hips. Wrap tape horizontally, loose enough to slide one finger underneath.',
    tip: 'Important for trousers, shorts, and leggings.',
  },
  {
    number: '4', title: 'Weight', icon: '⚖️',
    color: 'bg-mint/40 text-green-500',
    how: 'Use a baby scale at home or visit your local health clinic. Alternatively, weigh yourself holding baby, then subtract your own weight.',
    tip: 'Weight helps confirm size when height is borderline between two sizes.',
  },
]

const SIZE_CHART = [
  { size: 'NB',     height: '< 56 cm',   chest: '33–35 cm', weight: '< 4 kg',     age: '0–1 months' },
  { size: '0-3m',   height: '56–62 cm',  chest: '35–40 cm', weight: '4–6 kg',     age: '0–3 months' },
  { size: '3-6m',   height: '62–68 cm',  chest: '40–44 cm', weight: '6–7.5 kg',   age: '3–6 months' },
  { size: '6-9m',   height: '68–74 cm',  chest: '44–47 cm', weight: '7.5–9 kg',   age: '6–9 months' },
  { size: '9-12m',  height: '74–80 cm',  chest: '47–48 cm', weight: '9–10.5 kg',  age: '9–12 months' },
  { size: '12-18m', height: '80–86 cm',  chest: '48–50 cm', weight: '10.5–12 kg', age: '12–18 months' },
  { size: '18-24m', height: '86–92 cm',  chest: '50–52 cm', weight: '12–13.5 kg', age: '18–24 months' },
  { size: '2T',     height: '92–98 cm',  chest: '52–54 cm', weight: '13.5–15 kg', age: '2 years' },
  { size: '3T',     height: '98–104 cm', chest: '54–56 cm', weight: '15–17 kg',   age: '3 years' },
]

const KEY_AGES = [0, 3, 6, 12, 18, 24, 36]

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

      {/* Hero */}
      <section className="mb-10 rounded-3xl border border-white/60 bg-white/40 px-6 py-10 text-center backdrop-blur-sm shadow-card">
        <h1 className="mb-2 font-display text-3xl font-semibold text-gray-800 sm:text-4xl">
          Baby Size Guide
        </h1>
        <p className="mx-auto max-w-lg text-sm text-gray-500 sm:text-base">
          How to measure your baby, our clothing size chart, and typical sizes by ethnicity and age.
        </p>
      </section>

      {/* How to measure */}
      <section className="mb-12">
        <h2 className="mb-5 font-display text-2xl font-semibold text-gray-700">
          How to Measure Your Baby
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {STEPS.map((step) => (
            <div key={step.number} className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-card backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${step.color}`}>
                  {step.icon}
                </span>
                <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
                  {step.number}. {step.title}
                </h3>
              </div>
              <p className="mb-3 text-sm text-gray-600 leading-relaxed">{step.how}</p>
              <div className="rounded-xl bg-blush/60 px-3 py-2 text-xs text-pink-600">
                💡 {step.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Tips panel */}
        <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-5 shadow-card backdrop-blur-sm">
          <h3 className="mb-4 font-semibold text-gray-700 text-sm sm:text-base">Measurement Tips</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: '🛏️', text: 'Lay baby flat on a changing mat for most accurate height.' },
              { icon: '📐', text: 'Always use a soft cloth tape — never a rigid metal one.' },
              { icon: '😊', text: 'Measure when baby is calm, ideally after a feed.' },
              { icon: '↔️', text: 'Between sizes? Always size up — babies grow fast!' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 rounded-xl bg-blush/30 p-3 text-sm text-gray-600">
                <span className="text-xl">{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard size chart */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-semibold text-gray-700">
          Clothing Size Chart
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/60 bg-white/60 shadow-card backdrop-blur-sm">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="bg-blush/60 text-left text-xs font-semibold uppercase tracking-wide text-pink-500">
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Height</th>
                <th className="hidden px-4 py-3 sm:table-cell">Chest</th>
                <th className="px-4 py-3">Weight</th>
                <th className="hidden px-4 py-3 sm:table-cell">Age (approx.)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row, i) => (
                <tr key={row.size} className={i % 2 === 0 ? 'bg-white/40' : 'bg-blush/20'}>
                  <td className="px-4 py-3 font-bold text-pink-500">{row.size}</td>
                  <td className="px-4 py-3 text-gray-600">{row.height}</td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{row.chest}</td>
                  <td className="px-4 py-3 text-gray-600">{row.weight}</td>
                  <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ethnicity reference table */}
      <section className="mb-12">
        <h2 className="mb-2 font-display text-2xl font-semibold text-gray-700">
          Typical Size by Ethnicity &amp; Age
        </h2>
        <p className="mb-5 text-sm text-gray-400">
          Based on WHO Child Growth Standards with regional adjustments. 50th-percentile estimates — every baby is unique.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/60 bg-white/60 shadow-card backdrop-blur-sm">
          <table className="w-full min-w-[480px] text-xs sm:text-sm">
            <thead>
              <tr className="bg-blush/60 text-left text-xs font-semibold uppercase tracking-wide text-pink-500">
                <th className="px-3 py-3 sm:px-4">Background</th>
                {KEY_AGES.map((a) => (
                  <th key={a} className="px-2 py-3 text-center sm:px-3">
                    {a === 0 ? 'NB' : a < 12 ? `${a}m` : a === 12 ? '1yr' : a === 36 ? '3yr' : `${a}m`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ETHNICITIES.map((eth, i) => (
                <tr key={eth.value} className={i % 2 === 0 ? 'bg-white/40' : 'bg-blush/20'}>
                  <td className="px-3 py-2.5 font-medium text-gray-700 sm:px-4">
                    <span className="block max-w-[120px] truncate sm:max-w-none" title={eth.label}>
                      {eth.label}
                    </span>
                  </td>
                  {KEY_AGES.map((age) => {
                    const rec = getSuggestedSize(eth.value, age)
                    return (
                      <td key={age} className="px-2 py-2.5 text-center sm:px-3">
                        <span className="rounded-full bg-baby-pink/20 px-1.5 py-0.5 text-xs font-semibold text-pink-600 sm:px-2">
                          {rec.size}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Adjustments from WHO median: African +2 cm, European +0.5 cm, East Asian −1 cm, Southeast Asian −2 cm, South Asian −1.5 cm.
        </p>
      </section>

      {/* CTA */}
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-baby-pink/30 to-powder-blue/30 p-8 text-center backdrop-blur-sm">
        <p className="mb-4 font-display text-xl text-pink-500">Ready to find the perfect fit?</p>
        <Link
          href="/"
          className="inline-block rounded-full bg-baby-pink px-8 py-3 font-semibold text-white hover:bg-rose transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}
