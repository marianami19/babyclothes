'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { CURRENCIES } from '@/lib/currency'
import { useCurrencyStore } from '@/store/currencyStore'

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrencyStore()
  const [open, setOpen] = useState(false)
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-white/50 bg-white/40 px-3 py-1.5 text-sm font-medium text-gray-600 backdrop-blur-sm transition hover:bg-white/60"
      >
        <span className="font-semibold">{cur.symbol}</span>
        <span>{cur.code}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl">
            <p className="border-b border-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Select Currency
            </p>
            <div className="max-h-72 overflow-y-auto">
              {Object.values(CURRENCIES).map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false) }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-pink-50"
                >
                  <span className="w-7 font-mono text-center text-gray-500">{c.symbol}</span>
                  <span className="flex-1 text-left text-gray-700">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.code}</span>
                  {currency === c.code && <Check className="h-3.5 w-3.5 text-pink-400" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
