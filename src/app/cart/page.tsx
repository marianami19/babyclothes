'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useCurrencyStore } from '@/store/currencyStore'
import { formatPrice } from '@/lib/currency'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const { currency } = useCurrencyStore()

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="font-display text-2xl font-semibold text-pink-500">Your cart is empty</h1>
        <p className="text-gray-400">Add some lovely pieces for your little one.</p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-baby-pink px-8 py-3 font-semibold text-white hover:bg-rose transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const total = subtotal()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl font-semibold text-gray-800">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/60 p-4 shadow-card backdrop-blur-sm"
          >
            <Link href={`/products/${item.id}`} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.id}`} className="truncate font-semibold text-gray-800 hover:text-pink-500">
                {item.name}
              </Link>
              <p className="text-xs text-gray-400">Size: {item.size} · {item.color}</p>
              <p className="mt-1 font-bold text-gray-700">{formatPrice(item.price, currency)}</p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-2 py-1 backdrop-blur-sm">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-pink-400 hover:bg-blush"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-pink-400 hover:bg-blush"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity, currency)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-1 text-gray-300 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-3xl border border-white/60 bg-white/60 p-6 shadow-card backdrop-blur-sm">
        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>{formatPrice(total, currency)}</span>
        </div>
        <div className="mb-5 flex justify-between text-sm text-gray-400">
          <span>Shipping &amp; taxes</span>
          <span className="italic">Calculated at checkout</span>
        </div>
        <div className="mb-6 flex justify-between border-t border-pink-50 pt-4 text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>{formatPrice(total, currency)}</span>
        </div>
        {currency !== 'USD' && (
          <p className="mb-4 text-center text-xs text-gray-400">
            Payment processed in USD ({formatPrice(total, 'USD')})
          </p>
        )}
        <Link
          href="/checkout"
          className="block w-full rounded-2xl bg-baby-pink py-4 text-center font-semibold text-white hover:bg-rose transition-colors shadow-sm"
        >
          Proceed to Checkout
        </Link>
        <Link href="/" className="mt-3 block w-full text-center text-sm text-gray-400 underline hover:text-gray-600">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
