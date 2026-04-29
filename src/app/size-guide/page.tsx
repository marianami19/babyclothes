import Link from 'next/link'
import { ETHNICITIES, AGE_OPTIONS, getSuggestedSize } from '@/lib/sizeGuide'

export const metadata = { title: 'Size Guide | Little & Loved' }

const STEPS = [
  {
    number: '1',
    title: 'Height / Body Length',
    color: 'bg-baby-pink',
    icon: '📏',
    how: 'Lay your baby flat on a firm surface. Place a book flat against the top of their head and another against their heel (foot flexed upward). Measure the distance between the two books.',
    tip: 'Always measure without shoes. Newborns can be stretched gently — never force.',
    unit: 'cm',
  },
  {
    number: '2',
    title: 'Chest Circumference',
    color: 'bg-powder-blue',
    icon: '🔵',
    how: 'Wrap a soft measuring tape around the fullest part of the chest — just under the armpits. Keep the tape snug but not tight, parallel to the floor.',
    tip: 'Measure while baby is calm and breathing normally. Add 1–2 cm ease for comfortable fit.',
    unit: 'cm',
  },
  {
    number: '3',
    title: 'Waist',
    color: 'bg-lavender',
    icon: '🟣',
    how: 'Measure around the natural waistline — the narrowest part of the torso between the ribs and the hips. Keep the tape horizontal and loose enough to slide a finger underneath.',
    tip: 'Important for trousers, leggings, and shorts.',
    unit: 'cm',
  },
  {
    number: '4',
    title: 'Weight',
    color: 'bg-mint',
    icon: '⚖️',
    how: 'Use a baby scale or weigh yourself holding the baby on a regular scale, then subtract your own weight. Most health clinics will weigh your baby for free.',
    tip: 'Weight helps confirm size when height is borderline between two sizes.',
    unit: 'kg',
  },
]

const SIZE_CHART = [
  { size: 'NB',     height: '< 56 cm',  chest: '33–35 cm', weight: '< 4 kg',    age: '0–1 months' },
  { size: '0-3m',   height: '56–62 cm', chest: '35–40 cm', weight: '4–6 kg',    age: '0–3 months' },
  { size: '3-6m',   height: '62–68 cm', chest: '40–44 cm', weight: '6–7.5 kg',  age: '3–6 months' },
  { size: '6-9m',   height: '68–74 cm', chest: '44–47 cm', weight: '7.5–9 kg',  age: '6–9 months' },
  { size: '9-12m',  height: '74–80 cm', chest: '47–48 cm', weight: '9–10.5 kg', age: '9–12 months' },
  { size: '12-18m', height: '80–86 cm', chest: '48–50 cm', weight: '10.5–12 kg','age': '12–18 months' },
  { size: '18-24m', height: '86–92 cm', chest: '50–52 cm', weight: '12–13.5 kg','age': '18–24 months' },
  { size: '2T',     height: '92–98 cm', chest: '52–54 cm', weight: '13.5–15 kg','age': '2 years' },
  { size: '3T',     height: '98–104 cm',chest: '54–56 cm', weight: '15–17 kg',  age: '3 years' },
]

export default function SizeGuidePage() {
  // Build ethnicity size reference table (snapshot at key ages)
  const keyAges = [0, 3, 6, 12, 18, 24, 36]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <div className="mb-10 rounded-3xl bg-gradient-to-br from-baby-pink/30 via-lavender/20 to-powder-blue/30 px-8 py-10 text-center">
        <h1 className="mb-2 font-display text-3xl font-semibold text-pink-500 sm:text-4xl">
          Baby Size Guide
        </h1>
        <p className="mx-auto max-w-lg text-gray-500">
          How to measure your baby accurately, our clothing size chart, and
          typical size recommendations by ethnicity and age.
        </p>
      </div>

      {/* How to measure */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-semibold text-gray-700">
          How to Measure Your Baby
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {STEPS.map((step) => (
            <div key={step.number} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="mb-3 flex items-center gap-3">
                <span className={`${step.color} flex h-9 w-9 items-center justify-center rounded-full text-lg`}>
                  {step.icon}
                </span>
                <h3 className="font-semibold text-gray-700">
                  {step.number}. {step.title}
                </h3>
              </div>
              <p className="mb-3 text-sm text-gray-600 leading-relaxed">{step.how}</p>
              <div className="rounded-xl bg-blush px-3 py-2 text-xs text-pink-600">
                💡 {step.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Visual diagram */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
          <h3 className="mb-4 font-semibold text-gray-700">Measurement Points</h3>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            {/* Front view */}
            <div className="text-center">
              <div className="relative mx-auto mb-3 flex h-52 w-28 flex-col items-center">
                {/* Body SVG diagram */}
                <svg viewBox="0 0 80 160" className="h-full w-full">
                  {/* Head */}
                  <ellipse cx="40" cy="18" rx="16" ry="17" fill="#FFD5C2" stroke="#e9a98e" strokeWidth="1.5"/>
                  {/* Neck */}
                  <rect x="35" y="34" width="10" height="8" rx="3" fill="#FFD5C2" stroke="#e9a98e" strokeWidth="1.5"/>
                  {/* Body */}
                  <rect x="22" y="42" width="36" height="44" rx="8" fill="#FFB6C1" stroke="#e9889a" strokeWidth="1.5"/>
                  {/* Arms */}
                  <rect x="8" y="44" width="14" height="32" rx="7" fill="#FFD5C2" stroke="#e9a98e" strokeWidth="1.5"/>
                  <rect x="58" y="44" width="14" height="32" rx="7" fill="#FFD5C2" stroke="#e9a98e" strokeWidth="1.5"/>
                  {/* Legs */}
                  <rect x="22" y="86" width="15" height="56" rx="7" fill="#FFD5C2" stroke="#e9a98e" strokeWidth="1.5"/>
                  <rect x="43" y="86" width="15" height="56" rx="7" fill="#FFD5C2" stroke="#e9a98e" strokeWidth="1.5"/>

                  {/* Height arrow */}
                  <line x1="5" y1="1" x2="5" y2="142" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2"/>
                  <polygon points="5,1 3,7 7,7" fill="#94a3b8"/>
                  <polygon points="5,142 3,136 7,136" fill="#94a3b8"/>

                  {/* Chest line */}
                  <line x1="16" y1="54" x2="64" y2="54" stroke="#B0D4E8" strokeWidth="1.5" strokeDasharray="3,2"/>
                  <circle cx="16" cy="54" r="2" fill="#B0D4E8"/>
                  <circle cx="64" cy="54" r="2" fill="#B0D4E8"/>

                  {/* Waist line */}
                  <line x1="20" y1="76" x2="60" y2="76" stroke="#D8B4E2" strokeWidth="1.5" strokeDasharray="3,2"/>
                  <circle cx="20" cy="76" r="2" fill="#D8B4E2"/>
                  <circle cx="60" cy="76" r="2" fill="#D8B4E2"/>
                </svg>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gray-300 inline-block"/> Height</div>
                <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-powder-blue inline-block"/> Chest</div>
                <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-lavender inline-block"/> Waist</div>
              </div>
            </div>

            {/* Tape tips */}
            <div className="max-w-xs space-y-3 text-sm text-gray-600">
              <div className="flex gap-3 rounded-xl bg-blush p-3">
                <span className="text-lg">🛏️</span>
                <p>Lay baby flat on a changing mat for the most accurate height measurement.</p>
              </div>
              <div className="flex gap-3 rounded-xl bg-sky/10 p-3">
                <span className="text-lg">📐</span>
                <p>Use a soft cloth tape measure — never a rigid metal tape.</p>
              </div>
              <div className="flex gap-3 rounded-xl bg-lavender/20 p-3">
                <span className="text-lg">😊</span>
                <p>Measure when baby is calm and relaxed — after a feed works well.</p>
              </div>
              <div className="flex gap-3 rounded-xl bg-mint/30 p-3">
                <span className="text-lg">↔️</span>
                <p>When between sizes, size up — babies grow fast and a little extra room is comfortable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard size chart */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-2xl font-semibold text-gray-700">
          Clothing Size Chart
        </h2>
        <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blush text-left text-xs font-semibold uppercase tracking-wide text-pink-500">
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Height</th>
                <th className="px-4 py-3">Chest</th>
                <th className="px-4 py-3">Weight</th>
                <th className="px-4 py-3">Age (approx.)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row, i) => (
                <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-blush/30'}>
                  <td className="px-4 py-3 font-bold text-pink-500">{row.size}</td>
                  <td className="px-4 py-3 text-gray-600">{row.height}</td>
                  <td className="px-4 py-3 text-gray-600">{row.chest}</td>
                  <td className="px-4 py-3 text-gray-600">{row.weight}</td>
                  <td className="px-4 py-3 text-gray-500">{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ethnicity reference */}
      <section className="mb-12">
        <h2 className="mb-2 font-display text-2xl font-semibold text-gray-700">
          Typical Size by Ethnicity &amp; Age
        </h2>
        <p className="mb-5 text-sm text-gray-500">
          Based on WHO Child Growth Standards and published regional paediatric studies. These are 50th-percentile
          estimates — every baby is unique. Always measure your baby and size up if in doubt.
        </p>
        <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-blush text-left text-xs font-semibold uppercase tracking-wide text-pink-500">
                <th className="px-3 py-3 sm:px-4">Background</th>
                {keyAges.map((a) => (
                  <th key={a} className="px-2 py-3 text-center sm:px-4">
                    {a === 0 ? 'NB' : a < 12 ? `${a}m` : a === 12 ? '1yr' : a === 36 ? '3yr' : `${a}m`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ETHNICITIES.map((eth, i) => (
                <tr key={eth.value} className={i % 2 === 0 ? 'bg-white' : 'bg-blush/20'}>
                  <td className="px-3 py-3 font-medium text-gray-700 sm:px-4 max-w-[140px]">
                    {eth.label}
                  </td>
                  {keyAges.map((age) => {
                    const rec = getSuggestedSize(eth.value, age)
                    return (
                      <td key={age} className="px-2 py-3 text-center sm:px-4">
                        <span className="rounded-full bg-baby-pink/20 px-2 py-0.5 font-semibold text-pink-600">
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
          * Heights adjusted from WHO median: African +2 cm, European +0.5 cm, East Asian −1 cm,
          Southeast Asian −2 cm, South Asian −1.5 cm. Sources: WHO Multicentre Growth Reference Study,
          regional anthropometric surveys.
        </p>
      </section>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-baby-pink/40 to-powder-blue/40 p-8 text-center">
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
