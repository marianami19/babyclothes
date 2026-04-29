'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()

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
      <h1 className="mb-8 font-display text-3xl font-semibold text-pink-500">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="truncate font-semibold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-400">
                Size: {item.size} · {item.color}
              </p>
              <p className="mt-1 font-bold text-gray-700">${item.price.toFixed(2)}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2 rounded-full border border-pink-100 px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-pink-400 hover:bg-blush font-bold"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-pink-400 hover:bg-blush font-bold"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-1 text-xs text-gray-300 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="mb-5 flex justify-between text-sm text-gray-400">
          <span>Shipping &amp; taxes</span>
          <span className="italic">Calculated at checkout</span>
        </div>
        <div className="mb-6 flex justify-between border-t border-pink-100 pt-4 text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link
          href="/checkout"
          className="block w-full rounded-xl bg-baby-pink py-4 text-center font-semibold text-white hover:bg-rose transition-colors"
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/"
          className="mt-3 block w-full text-center text-sm text-gray-400 underline hover:text-gray-600"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
