'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

const COUNTRIES = [
  'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany',
  'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Singapore',
  'Malaysia', 'India', 'South Africa', 'New Zealand', 'Ireland',
  'Philippines', 'Indonesia', 'Thailand', 'Vietnam', 'Other',
]

interface FormData {
  name: string
  email: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const [form, setForm] = useState<FormData>({
    name: '', email: '', addressLine1: '', addressLine2: '',
    city: '', state: '', postalCode: '', country: '',
  })

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-display text-2xl text-pink-500">Your cart is empty</h1>
        <Link href="/" className="rounded-full bg-baby-pink px-8 py-3 font-semibold text-white hover:bg-rose">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const required: (keyof FormData)[] = ['name', 'email', 'addressLine1', 'city', 'postalCode', 'country']
    const missing = required.find((k) => !form[k].trim())
    if (missing) { setError('Please fill in all required fields.'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            name:      i.name,
            price:     i.price,
            imageUrl:  i.imageUrl,
            quantity:  i.quantity,
          })),
          customer: form,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const total = subtotal()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl font-semibold text-pink-500">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:flex-row">
        {/* Details form */}
        <div className="flex-1 space-y-6">
          {/* Contact */}
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-gray-700">Contact Information</h2>
            <div className="space-y-3">
              <Field label="Full Name *" value={form.name} onChange={set('name')} placeholder="Jane Smith" />
              <Field label="Email *" type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" />
            </div>
          </section>

          {/* Shipping address */}
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-gray-700">Shipping Address</h2>
            <div className="space-y-3">
              <Field label="Address Line 1 *" value={form.addressLine1} onChange={set('addressLine1')} placeholder="123 Main Street" />
              <Field label="Address Line 2" value={form.addressLine2} onChange={set('addressLine2')} placeholder="Apt, suite, unit (optional)" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="City *" value={form.city} onChange={set('city')} placeholder="London" />
                <Field label="State / Province" value={form.state} onChange={set('state')} placeholder="England" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Postal Code *" value={form.postalCode} onChange={set('postalCode')} placeholder="SW1A 1AA" />
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Country *
                  </label>
                  <select
                    value={form.country}
                    onChange={set('country')}
                    required
                    className="w-full rounded-xl border border-pink-100 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-baby-pink"
                  >
                    <option value="">Select country…</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-baby-pink py-4 font-semibold text-white hover:bg-rose transition-colors disabled:opacity-50"
          >
            {loading ? 'Redirecting to payment…' : 'Proceed to Payment →'}
          </button>
          <p className="text-center text-xs text-gray-400">
            You'll be redirected to Stripe's secure payment page.
          </p>
        </div>

        {/* Order summary */}
        <aside className="w-full lg:w-80 lg:flex-shrink-0">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-card">
            <h2 className="mb-4 font-semibold text-gray-700">Order Summary</h2>
            <div className="mb-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-400">Size {item.size} × {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-pink-100 pt-4 space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 italic">
                <span>Shipping &amp; taxes</span>
                <span>TBD</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-pink-100 pt-3 font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-pink-100 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-baby-pink"
      />
    </div>
  )
}
