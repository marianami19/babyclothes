'use client'

import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  gender: string
  material: string
  dye: string
  size: string
  color: string
  hexColor: string
  imageUrl: string
  stock: number
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: product.size,
      color: product.color,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const genderLabel: Record<string, string> = {
    MALE: 'Boy', FEMALE: 'Girl', UNISEX: 'Unisex',
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Colour swatch */}
        <span
          className="absolute right-2 top-2 h-5 w-5 rounded-full border-2 border-white shadow"
          style={{ backgroundColor: product.hexColor }}
          title={product.color}
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-blush px-2 py-0.5 text-xs font-medium text-pink-500">
            {product.size}
          </span>
          <span className="rounded-full bg-sky/20 px-2 py-0.5 text-xs font-medium text-blue-500">
            {genderLabel[product.gender] ?? product.gender}
          </span>
        </div>

        <h3 className="mb-1 font-display text-base font-semibold text-gray-800 leading-snug">
          {product.name}
        </h3>

        <p className="mb-3 flex-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="mb-1 text-xs text-gray-400">
          {product.material} · {product.dye}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all active:scale-95 ${
              added
                ? 'bg-mint text-green-700'
                : 'bg-baby-pink text-white hover:bg-rose'
            } disabled:opacity-40`}
          >
            {added ? '✓ Added' : product.stock === 0 ? 'Sold out' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
