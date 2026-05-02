'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import FilterPanel, { type Filters } from '@/components/FilterPanel'
import OnboardingModal, { useShowOnboarding, type OnboardingResult } from '@/components/OnboardingModal'

interface Product {
  id: string; name: string; description: string; price: number
  gender: string; material: string; dye: string; size: string
  ageRange: string; color: string; hexColor: string; imageUrl: string; stock: number
}

const DEFAULT_FILTERS: Filters = { gender: 'ALL', size: 'ALL', material: 'ALL' }

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [filters,  setFilters]  = useState<Filters>(DEFAULT_FILTERS)

  const { show, dismiss } = useShowOnboarding()

  const handleOnboardingComplete = (result: OnboardingResult) => {
    setFilters({
      gender:   result.gender,
      size:     result.size,
      material: result.material,
    })
    dismiss()
  }

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.gender   !== 'ALL') params.set('gender',   filters.gender)
    if (filters.size     !== 'ALL') params.set('size',     filters.size)
    if (filters.material !== 'ALL') params.set('material', filters.material)

    setLoading(true)
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [filters])

  const activeCount = [
    filters.gender !== 'ALL', filters.size !== 'ALL', filters.material !== 'ALL',
  ].filter(Boolean).length

  return (
    <>
      {show && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onSkip={dismiss}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-10 rounded-3xl border border-white/60 bg-white/40 px-8 py-12 text-center backdrop-blur-sm shadow-card">
          <h1 className="mb-2 font-display text-4xl font-semibold text-gray-800 sm:text-5xl">
            Dressed with Love
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500">
            Certified organic · Baby-safe dyes · Made in India with care
          </p>
        </section>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Filter sidebar */}
          <FilterPanel filters={filters} onChange={setFilters} />

          {/* Products */}
          <div className="flex-1">
            {/* Active filter chips */}
            {activeCount > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.gender !== 'ALL' && (
                  <Chip label={`Gender: ${filters.gender}`} onRemove={() => setFilters((f) => ({ ...f, gender: 'ALL' }))} />
                )}
                {filters.size !== 'ALL' && (
                  <Chip label={`Size: ${filters.size}`} onRemove={() => setFilters((f) => ({ ...f, size: 'ALL' }))} />
                )}
                {filters.material !== 'ALL' && (
                  <Chip label={`Material: ${filters.material}`} onRemove={() => setFilters((f) => ({ ...f, material: 'ALL' }))} />
                )}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/40" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/40 py-20 text-center backdrop-blur-sm shadow-card">
                <span className="mb-4 text-5xl">🌸</span>
                <p className="font-display text-lg text-pink-400">No items match your filters</p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-4 rounded-full bg-baby-pink px-6 py-2 text-sm font-semibold text-white hover:bg-rose"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-400">
                  {products.length} item{products.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-white/60 bg-white/50 px-3 py-1 text-xs font-medium text-pink-500 backdrop-blur-sm">
      {label}
      <button onClick={onRemove} className="ml-1 text-pink-300 hover:text-rose">×</button>
    </span>
  )
}
