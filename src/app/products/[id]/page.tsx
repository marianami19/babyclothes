'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Leaf, Shield, Ruler, ChevronRight } from 'lucide-react'
import ImageGallery from '@/components/ImageGallery'
import { useCartStore } from '@/store/cartStore'
import { useCurrencyStore } from '@/store/currencyStore'
import { formatPrice } from '@/lib/currency'
import { ALL_SIZES } from '@/lib/sizeGuide'

interface Product {
  id: string; name: string; description: string; price: number
  gender: string; material: string; dye: string; size: string
  ageRange: string; color: string; hexColor: string
  imageUrl: string; images: string[]; stock: number; tags: string[]
}

const GENDER_LABEL: Record<string, string> = { MALE: 'Boy', FEMALE: 'Girl', UNISEX: 'Unisex' }

export default function ProductDetailPage() {
  const { id }           = useParams<{ id: string }>()
  const router           = useRouter()
  const addItem          = useCartStore((s) => s.addItem)
  const { currency }     = useCurrencyStore()

  const [product,      setProduct]      = useState<Product | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [added,        setAdded]        = useState(false)
  const [sizeError,    setSizeError]    = useState(false)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data)
        setSelectedSize(data.size) // pre-select the product's own size
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return }
    if (!product) return
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      imageUrl: product.imageUrl,
      size:     selectedSize,
      color:    product.color,
    })
    setAdded(true)
    setSizeError(false)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-pink-50" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 animate-pulse rounded-xl bg-pink-50" style={{ width: `${80 - i * 10}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-400">Product not found.</p>
        <Link href="/" className="text-sm text-pink-400 underline">Back to shop</Link>
      </div>
    )
  }

  const allImages = product.images?.length > 0
    ? product.images
    : [product.imageUrl]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <ImageGallery images={allImages} name={product.name} />

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold text-pink-500">
              {product.size}
            </span>
            <span className="rounded-full bg-sky/20 px-3 py-1 text-xs font-semibold text-blue-500">
              {GENDER_LABEL[product.gender] ?? product.gender}
            </span>
            <span className="rounded-full bg-mint/40 px-3 py-1 text-xs font-semibold text-green-600">
              {product.ageRange}
            </span>
          </div>

          <h1 className="mb-2 font-display text-3xl font-semibold text-gray-800 leading-snug">
            {product.name}
          </h1>

          <p className="mb-4 text-gray-500 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-800">
              {formatPrice(product.price, currency)}
            </span>
            {currency !== 'USD' && (
              <span className="text-sm text-gray-400">
                ({formatPrice(product.price, 'USD')} USD)
              </span>
            )}
          </div>

          {/* Colour swatch */}
          <div className="mb-5 flex items-center gap-3">
            <span className="text-sm text-gray-500">Colour:</span>
            <span
              className="h-6 w-6 rounded-full border-2 border-white shadow"
              style={{ backgroundColor: product.hexColor }}
            />
            <span className="text-sm font-medium text-gray-700">{product.color}</span>
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Size <span className="text-pink-400">*</span>
              </label>
              <Link
                href="/size-guide"
                className="flex items-center gap-0.5 text-xs text-pink-400 underline hover:text-rose"
              >
                <Ruler className="h-3 w-3" /> Size guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSelectedSize(s); setSizeError(false) }}
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                    s === product.size
                      ? selectedSize === s
                        ? 'border-baby-pink bg-baby-pink text-white shadow-sm'
                        : 'border-pink-200 bg-blush text-pink-500'
                      : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                  }`}
                  disabled={s !== product.size}
                  title={s !== product.size ? 'Not available in this style' : ''}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-1.5 text-xs text-red-400">Please confirm your size to add to cart.</p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              This style is available in <strong>{product.size}</strong>.{' '}
              <Link href="/size-guide" className="text-pink-400 underline">Not sure? Check the size guide.</Link>
            </p>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mb-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold transition-all active:scale-98 ${
              added
                ? 'bg-mint text-green-700'
                : 'bg-baby-pink text-white shadow-sm hover:bg-rose'
            } disabled:opacity-40`}
          >
            <ShoppingBag className="h-5 w-5" />
            {added
              ? '✓ Added to cart!'
              : product.stock === 0
              ? 'Out of stock'
              : `Add to Cart — ${formatPrice(product.price, currency)}`}
          </button>

          <Link
            href="/cart"
            className="mb-6 flex items-center justify-center gap-1 text-sm text-gray-400 underline hover:text-gray-600"
          >
            View cart <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {/* Details */}
          <div className="space-y-3 rounded-2xl border border-white/60 bg-white/50 p-5 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-700">Product Details</h3>
            {[
              { icon: Leaf,   label: 'Material', value: product.material },
              { icon: Shield, label: 'Dye',      value: product.dye },
              { icon: Ruler,  label: 'Age Range',value: product.ageRange },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 text-sm">
                <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink-300" />
                <span className="w-20 text-gray-400">{label}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>

          {/* Stock */}
          {product.stock < 5 && product.stock > 0 && (
            <p className="mt-3 text-center text-xs font-medium text-orange-400">
              Only {product.stock} left in stock
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
