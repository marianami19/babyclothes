'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-mint text-5xl shadow-lg">
        ✓
      </div>
      <h1 className="mb-2 font-display text-3xl font-semibold text-green-600">
        Order Confirmed!
      </h1>
      <p className="mb-6 max-w-sm text-gray-500">
        Thank you for your order. You'll receive a confirmation email shortly. We're packing your little one's clothes with care.
      </p>
      <div className="mb-8 rounded-2xl bg-mint/30 px-8 py-4 text-sm text-green-700">
        💚 Packed with certified organic materials &amp; baby-safe dyes
      </div>
      <Link
        href="/"
        className="rounded-full bg-baby-pink px-8 py-3 font-semibold text-white hover:bg-rose transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
