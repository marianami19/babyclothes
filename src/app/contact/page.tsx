import type { Metadata } from 'next'
import { MapPin, Mail, Instagram, Heart } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact Us | Little & Loved' }

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="mb-3 font-display text-4xl font-semibold text-gray-800">
          Say Hello 👋
        </h1>
        <p className="text-gray-500">
          We're a small team with a big heart. We'd love to hear from you.
        </p>
      </section>

      {/* Story card */}
      <div className="mb-8 rounded-3xl border border-white/60 bg-white/60 p-8 shadow-card backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3">
          <Heart className="h-5 w-5 text-pink-400" />
          <h2 className="font-display text-xl font-semibold text-gray-800">Our Story</h2>
        </div>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Little &amp; Loved was born right here in <strong>Thrissur, Kerala</strong> — the
            cultural heart of India. Like so many new parents, we found ourselves overwhelmed:
            not by the sleepless nights or the nappy changes, but by something we hadn't expected —
            finding clothes that actually <em>fit</em> our baby.
          </p>
          <p>
            Indian babies are often sized out of "standard" international clothing, and the
            locally available options weren't made with the care we felt our newborn deserved.
            Rough seams, synthetic dyes, mystery fabrics — we kept buying and returning, buying
            and returning.
          </p>
          <p>
            So we decided to stop searching and start making.
          </p>
          <p>
            We spent months researching fabrics, studying infant skin sensitivity, and working
            with small-batch manufacturers who shared our values. The result is Little &amp; Loved —
            a brand built entirely around one idea: <strong>never compromising on what touches
            your baby's skin.</strong>
          </p>
          <p>
            We're at the very beginning of our journey. Our catalogue is small and growing.
            Every piece is made in small batches, with careful attention to quality. Prices are
            kept honest — we believe that safe, ethical baby clothing shouldn't be a luxury.
          </p>
          <p className="font-medium text-pink-500">
            From our family to yours — thank you for being here. 🌸
          </p>
        </div>
      </div>

      {/* Contact details */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-card backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-pink-400">
            <MapPin className="h-5 w-5" />
            <h3 className="font-semibold text-gray-700">Where We Are</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Thrissur, Kerala<br />
            India — 680 001
          </p>
          <p className="mt-2 text-xs text-gray-400">
            The cultural capital of Kerala, right in the heart of southern India.
          </p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-card backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-pink-400">
            <Mail className="h-5 w-5" />
            <h3 className="font-semibold text-gray-700">Email Us</h3>
          </div>
          <a
            href="mailto:hello@littleandloved.in"
            className="text-sm font-medium text-pink-500 underline hover:text-rose"
          >
            hello@littleandloved.in
          </a>
          <p className="mt-2 text-xs text-gray-400">
            We try to reply within 24 hours. For order queries, please include your order number.
          </p>
        </div>
      </div>

      {/* Response time note */}
      <div className="mb-8 rounded-2xl border border-white/60 bg-blush/40 p-5 text-sm text-pink-600 backdrop-blur-sm">
        <p className="font-semibold mb-1">📦 A note on orders</p>
        <p className="text-pink-500 leading-relaxed">
          We're a small team handling everything personally — from packing your order to
          replying to your emails. We promise to always respond with care, even if it takes us
          a little longer than a big brand might.
        </p>
      </div>

      {/* Social */}
      <div className="rounded-3xl bg-gradient-to-br from-baby-pink/20 to-lavender/20 p-8 text-center">
        <Instagram className="mx-auto mb-3 h-7 w-7 text-pink-400" />
        <h3 className="mb-1 font-display text-lg font-semibold text-gray-700">Follow Our Journey</h3>
        <p className="mb-3 text-sm text-gray-500">
          We share behind-the-scenes stories, fabric updates, and tiny moments of joy.
        </p>
        <a
          href="https://instagram.com/littleandloved.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-baby-pink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose"
        >
          @littleandloved.in
        </a>
      </div>
    </div>
  )
}
