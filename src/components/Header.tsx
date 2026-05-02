'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CurrencySelector from './CurrencySelector'

const NAV = [
  { href: '/',         label: 'Shop'    },
  { href: '/about',    label: 'About'   },
  { href: '/contact',  label: 'Contact' },
  { href: '/size-guide', label: 'Size Guide' },
]

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems)()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none" onClick={() => setMenuOpen(false)}>
          <span className="text-xl">🌸</span>
          <span className="font-display text-xl font-semibold text-pink-500 tracking-tight">
            Little &amp; Loved
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-500 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="transition hover:text-pink-500"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <CurrencySelector />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 rounded-full bg-baby-pink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose text-[10px] font-bold text-white shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="rounded-full p-2 text-gray-400 transition hover:bg-pink-50 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="border-t border-white/40 bg-white/80 px-4 py-3 backdrop-blur-xl md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-blush hover:text-pink-500"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
