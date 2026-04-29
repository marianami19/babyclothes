'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems)()

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-display text-xl font-semibold text-pink-500">
            Little &amp; Loved
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-pink-400 sm:flex">
          <Link href="/" className="hover:text-pink-600 transition-colors">
            Shop
          </Link>
          <Link href="/size-guide" className="hover:text-pink-600 transition-colors">
            Size Guide
          </Link>
        </nav>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex items-center gap-2 rounded-full bg-baby-pink px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7.5M17 13l1.5 7.5M9 20.5a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          Cart
          {totalItems > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
