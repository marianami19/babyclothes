'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CurrencyState {
  currency: string
  setCurrency: (c: string) => void
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency:    'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'll-currency' }
  )
)
