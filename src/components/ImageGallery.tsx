'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface Props {
  images: string[]
  name:   string
}

export default function ImageGallery({ images, name }: Props) {
  const [idx,      setIdx]      = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const all = images.length > 0 ? images : ['/placeholder.png']
  const prev = () => setIdx((i) => (i - 1 + all.length) % all.length)
  const next = () => setIdx((i) => (i + 1) % all.length)

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl bg-gray-50 shadow-card"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={all[idx]}
            alt={name}
            fill
            priority
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <button className="absolute bottom-3 right-3 rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white">
            <ZoomIn className="h-4 w-4 text-gray-500" />
          </button>

          {all.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {all.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {all.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {all.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {all.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  i === idx
                    ? 'border-baby-pink shadow-sm'
                    : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <Image
                  src={img}
                  alt={`${name} view ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
            onClick={() => setLightbox(false)}
          >
            <X className="h-6 w-6" />
          </button>

          {all.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
                onClick={(e) => { e.stopPropagation(); prev() }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
                onClick={(e) => { e.stopPropagation(); next() }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative max-h-[85vh] max-w-[85vw]"
            style={{ width: 'min(85vh, 85vw)', height: 'min(85vh, 85vw)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={all[idx]}
              alt={name}
              fill
              className="object-contain"
              sizes="85vw"
            />
          </div>

          {/* Thumbnail strip in lightbox */}
          {all.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {all.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                  className={`relative h-12 w-12 overflow-hidden rounded-lg border-2 transition-all ${
                    i === idx ? 'border-white' : 'border-white/30 opacity-50'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
