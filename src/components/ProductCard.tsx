'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useCurrencyStore } from '@/store/currencyStore'
import { formatPrice } from '@/lib/currency'
import { useState } from 'react'

interface Product {
  id: string; name: string; description: string; price: number
  gender: string; material: string; dye: string; size: string
  color: string; hexColor: string; imageUrl: string; stock: number
}

const GENDER_LABEL: Record<string, string> = { MALE: 'Boy', FEMALE: 'Girl', UNISEX: 'Unisex' }

export default function ProductCard({ product }: { product: Product }) {
  const addItem      = useCartStore((s) => s.addItem)
  const { currency } = useCurrencyStore()
  const [added,      setAdded]   = useState(false)
  const [confirmed,  setConfirmed] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!confirmed) {
      // First click = confirm size prompt
      setConfirmed(true)
      return
    }
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      imageUrl: product.imageUrl,
      size:     product.size,
      color:    product.color,
    })
    setAdded(true)
    setConfirmed(false)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-card backdrop-blur-sm transition hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Colour dot */}
        <span
          className="absolute right-2.5 top-2.5 h-5 w-5 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: product.hexColor }}
          title={product.color}
        />
        {/* Quick view hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
          <span className="flex items-center gap-1.5 rounded-full bg-white/0 px-4 py-1.5 text-xs font-semibold text-white opacity-0 transition group-hover:bg-white/80 group-hover:text-gray-700 group-hover:opacity-100">
            View details <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Badges */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-blush px-2.5 py-0.5 text-xs font-semibold text-pink-500">
            {product.size}
          </span>
          <span className="rounded-full bg-sky/20 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
            {GENDER_LABEL[product.gender] ?? product.gender}
          </span>
        </div>

        <h3 className="mb-1 font-display text-base font-semibold leading-snug text-gray-800">
          {product.name}
        </h3>

        <p className="mb-3 flex-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
          {product.description}
        </p>

        <p className="mb-3 text-xs text-gray-300">
          {product.material}
        </p>

        {/* Price + add to cart */}
        <div className="mt-auto">
          {/* Size confirm prompt */}
          {confirmed && (
            <div className="mb-2 rounded-xl bg-blush px-3 py-2 text-xs text-pink-600">
              Size <strong>{product.size}</strong> — confirm to add to cart
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price, currency)}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
                added
                  ? 'bg-mint text-green-700'
                  : confirmed
                  ? 'bg-rose text-white animate-pulse'
                  : 'bg-baby-pink text-white hover:bg-rose'
              } disabled:opacity-40`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {added ? '✓ Added' : confirmed ? 'Confirm' : product.stock === 0 ? 'Sold out' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
