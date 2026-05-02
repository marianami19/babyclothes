import type { Metadata } from 'next'
import { Leaf, Shield, Heart, Award, Sparkles, Baby } from 'lucide-react'

export const metadata: Metadata = { title: 'About Us | Little & Loved' }

const VALUES = [
  {
    icon: Leaf,
    title: 'Certified Organic Materials',
    body: 'Every fabric we use is either GOTS-certified organic cotton or independently tested for harmful substances. We trace each material back to its source.',
    color: 'text-green-500 bg-mint/30',
  },
  {
    icon: Shield,
    title: 'Baby-Safe Dyes Only',
    body: 'All colours are achieved using OEKO-TEX certified dyes or natural plant-based pigments — free from AZO compounds, heavy metals, and formaldehyde.',
    color: 'text-blue-400 bg-powder-blue/30',
  },
  {
    icon: Heart,
    title: 'Skin-First Design',
    body: 'Seams are flat-stitched or turned outward. Labels are printed — never scratchy. Every choice is made by asking: will this feel gentle on newborn skin?',
    color: 'text-pink-400 bg-baby-pink/20',
  },
  {
    icon: Award,
    title: 'No Compromises on Quality',
    body: 'We could cut costs with inferior fabrics. We chose not to. Every stitch is reinforced, every wash tested, every garment held to the same standard we'd want for our own baby.',
    color: 'text-purple-400 bg-lavender/30',
  },
]

const MATERIALS = [
  {
    name: 'Organic Cotton',
    desc: 'Grown without synthetic pesticides or fertilisers. Softer, safer, and better for the environment than conventional cotton.',
    tag: 'GOTS Certified',
  },
  {
    name: 'Bamboo',
    desc: 'Naturally antibacterial and temperature-regulating — perfect for babies who run warm. Bamboo grows fast with minimal water, making it one of the most sustainable fibres.',
    tag: 'Naturally hypoallergenic',
  },
  {
    name: 'Merino Wool',
    desc: 'Fine Merino fibres are incredibly soft against delicate skin — nothing like coarse wool. Naturally odour-resistant and temperature-balancing for year-round comfort.',
    tag: 'Fine Merino only',
  },
  {
    name: 'Linen-Cotton Blend',
    desc: 'A breathable warm-weather blend. Linen softens beautifully with every wash, and our blend keeps it gentle enough for even the most sensitive skin.',
    tag: 'Gets softer over time',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">

      {/* Hero */}
      <section className="mb-16 rounded-3xl bg-gradient-to-br from-baby-pink/30 via-lavender/20 to-powder-blue/30 px-8 py-14 text-center backdrop-blur-sm">
        <div className="mb-4 flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 text-3xl shadow-md backdrop-blur">
            🌸
          </span>
        </div>
        <h1 className="mb-3 font-display text-4xl font-semibold text-gray-800 sm:text-5xl">
          Made for the Tiniest Wonders
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
          Little &amp; Loved began with a simple frustration — and turned into a promise
          to every parent who has ever worried about what touches their baby's skin.
        </p>
      </section>

      {/* The problem */}
      <section className="mb-14">
        <div className="rounded-3xl border border-white/60 bg-white/60 p-8 shadow-card backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-xl">😔</span>
            <h2 className="font-display text-2xl font-semibold text-gray-800">The Problem We Couldn't Ignore</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Finding good-quality baby clothes is harder than it should be. Walk into any high-street
              store and you'll find racks of brightly coloured garments with labels that read
              "100% cotton" — but say nothing about the dyes, the chemical finishes, or where the
              fabric actually came from.
            </p>
            <p>
              Babies have skin that is up to <strong>five times thinner</strong> than adult skin. It absorbs
              more, reacts faster, and takes longer to recover. Rashes, eczema flare-ups, and
              irritation from clothing are far more common than parents realise — and often, the
              culprit is the very fabric meant to keep a baby comfortable.
            </p>
            <p>
              We knew there had to be a better way. So we built it.
            </p>
          </div>
        </div>
      </section>

      {/* Our values */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl font-semibold text-gray-800">Our Four Promises</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-white/60 bg-white/60 p-6 shadow-card backdrop-blur-sm"
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${v.color}`}>
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-800">{v.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="mb-14">
        <h2 className="mb-2 font-display text-2xl font-semibold text-gray-800">The Materials We Chose — and Why</h2>
        <p className="mb-6 text-gray-500 text-sm">
          We spent months researching, testing, and rejecting fabrics before settling on our final
          selection. Every material earns its place.
        </p>
        <div className="space-y-4">
          {MATERIALS.map((m) => (
            <div
              key={m.name}
              className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/60 p-5 shadow-card backdrop-blur-sm sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3">
                  <h3 className="font-semibold text-gray-800">{m.name}</h3>
                  <span className="rounded-full bg-mint/40 px-2 py-0.5 text-xs font-medium text-green-700">
                    {m.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission statement */}
      <section className="mb-10">
        <div className="rounded-3xl bg-gradient-to-br from-blush to-lavender/20 p-8 text-center">
          <Baby className="mx-auto mb-4 h-8 w-8 text-pink-400" />
          <h2 className="mb-3 font-display text-2xl font-semibold text-pink-600">
            Everything Starts with the Baby
          </h2>
          <p className="mx-auto max-w-xl text-gray-600 leading-relaxed">
            Before we make any decision — fabric sourcing, stitching technique, dye selection,
            sizing — we ask one question: is this right for a baby? Not "is this acceptable",
            not "is this good enough". Is this <em>right?</em>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-gray-600 leading-relaxed">
            Little &amp; Loved is a small brand with a very big purpose. We're just getting
            started, and we're proud of every piece we make.
          </p>
        </div>
      </section>

      <div className="text-center">
        <p className="mb-1 font-display text-lg text-pink-400">Little &amp; Loved</p>
        <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
          <Sparkles className="h-3.5 w-3.5" /> Made in India, loved worldwide
        </p>
      </div>
    </div>
  )
}
