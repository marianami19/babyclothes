import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Plain, solid-colour baby clothes images from Unsplash
const IMG = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
  'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&q=80',
  'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
]

// Return 3 images starting at offset, cycling through pool
function imgs(offset: number): string[] {
  return [0, 1, 2].map((i) => IMG[(offset + i) % IMG.length])
}

const products = [
  {
    name: 'Soft Cloud Onesie',
    description: 'Ultra-soft organic cotton onesie for newborns. Envelope neckline for easy dressing. Gentle on the most sensitive skin.',
    price: 18.99, gender: 'UNISEX' as const,
    material: 'Organic Cotton', dye: 'Undyed (Natural)',
    size: 'NB', ageRange: '0–1 months',
    color: 'Cream', hexColor: '#F5F0E8',
    imageUrl: imgs(0)[0], images: imgs(0), stock: 20, tags: ['organic', 'newborn'],
  },
  {
    name: 'Petal Pink Romper',
    description: 'Delicate romper in baby pink. GOTS-certified cotton with snap closures for easy nappy changes.',
    price: 24.99, gender: 'FEMALE' as const,
    material: 'GOTS Certified Cotton', dye: 'OEKO-TEX Certified Dye',
    size: '0-3m', ageRange: '0–3 months',
    color: 'Baby Pink', hexColor: '#FFB6C1',
    imageUrl: imgs(1)[0], images: imgs(1), stock: 15, tags: ['romper', 'pink'],
  },
  {
    name: 'Sky Blue Bodysuit Set',
    description: 'Three-pack bodysuits in powder blue. Softest organic cotton blend, long-sleeve for cooler days.',
    price: 29.99, gender: 'MALE' as const,
    material: 'Organic Cotton', dye: 'AZO-free Dye',
    size: '0-3m', ageRange: '0–3 months',
    color: 'Powder Blue', hexColor: '#B0D4E8',
    imageUrl: imgs(2)[0], images: imgs(2), stock: 12, tags: ['bodysuit', 'blue', 'set'],
  },
  {
    name: 'Bunny Bamboo Sleepsuit',
    description: 'Cosy bamboo sleepsuit. Temperature-regulating bamboo keeps baby comfortable all night with two-way zip.',
    price: 27.99, gender: 'UNISEX' as const,
    material: 'Bamboo', dye: 'Natural Plant-based Dye',
    size: '3-6m', ageRange: '3–6 months',
    color: 'Lavender', hexColor: '#D8B4E2',
    imageUrl: imgs(3)[0], images: imgs(3), stock: 14, tags: ['sleepsuit', 'bamboo'],
  },
  {
    name: 'Rose Smock Dress',
    description: 'Sweet smocked dress in rose pink. Adjustable straps and breathable GOTS cotton for warm days.',
    price: 32.99, gender: 'FEMALE' as const,
    material: 'GOTS Certified Cotton', dye: 'OEKO-TEX Certified Dye',
    size: '3-6m', ageRange: '3–6 months',
    color: 'Rose Pink', hexColor: '#F48FB1',
    imageUrl: imgs(4)[0], images: imgs(4), stock: 10, tags: ['dress', 'smocked'],
  },
  {
    name: 'Little Sailor Romper',
    description: 'Classic navy and cream romper. Durable organic cotton built for active babies.',
    price: 27.99, gender: 'MALE' as const,
    material: 'Organic Cotton', dye: 'AZO-free Dye',
    size: '3-6m', ageRange: '3–6 months',
    color: 'Navy Cream', hexColor: '#B0C8E8',
    imageUrl: imgs(0)[0], images: imgs(0), stock: 11, tags: ['romper', 'navy'],
  },
  {
    name: 'Butter Yellow Onesie',
    description: 'Sunshine yellow onesie in 100% organic cotton. Simple, clean, beautifully soft.',
    price: 21.99, gender: 'FEMALE' as const,
    material: 'Organic Cotton', dye: 'OEKO-TEX Certified Dye',
    size: '6-9m', ageRange: '6–9 months',
    color: 'Butter Yellow', hexColor: '#FFF9C4',
    imageUrl: imgs(1)[0], images: imgs(1), stock: 13, tags: ['onesie', 'yellow'],
  },
  {
    name: 'Sky Tee & Shorts Set',
    description: 'Two-piece set in sky blue. Soft GOTS cotton with reinforced stitching for active movers.',
    price: 26.99, gender: 'MALE' as const,
    material: 'GOTS Certified Cotton', dye: 'AZO-free Dye',
    size: '6-9m', ageRange: '6–9 months',
    color: 'Sky Blue', hexColor: '#90CAF9',
    imageUrl: imgs(2)[0], images: imgs(2), stock: 9, tags: ['set', 'blue'],
  },
  {
    name: 'Ivory Merino Cardigan',
    description: 'Classic cream cardigan in fine merino wool. Naturally temperature-regulating and machine washable.',
    price: 42.99, gender: 'UNISEX' as const,
    material: 'Merino Wool', dye: 'Undyed (Natural)',
    size: '6-9m', ageRange: '6–9 months',
    color: 'Ivory', hexColor: '#F5F0E8',
    imageUrl: imgs(3)[0], images: imgs(3), stock: 8, tags: ['cardigan', 'merino'],
  },
  {
    name: 'Blush Leggings & Top',
    description: 'Soft blush two-piece with wide waistband and long-sleeve top. Organic cotton spandex blend.',
    price: 34.99, gender: 'FEMALE' as const,
    material: 'Organic Cotton Blend', dye: 'OEKO-TEX Certified Dye',
    size: '9-12m', ageRange: '9–12 months',
    color: 'Blush', hexColor: '#FCE4EC',
    imageUrl: imgs(4)[0], images: imgs(4), stock: 10, tags: ['set', 'leggings'],
  },
  {
    name: 'Sage Explorer Set',
    description: 'Two-piece in sage green — jogger pants and tee in soft organic cotton for active crawlers.',
    price: 36.99, gender: 'MALE' as const,
    material: 'Organic Cotton', dye: 'Natural Plant-based Dye',
    size: '12-18m', ageRange: '12–18 months',
    color: 'Sage Green', hexColor: '#A5C8A0',
    imageUrl: imgs(0)[0], images: imgs(0), stock: 11, tags: ['set', 'sage'],
  },
  {
    name: 'Lilac Twirl Dress',
    description: 'Twirly dress in soft lilac. Fully lined, non-toxic dyes, easy zip back closure.',
    price: 38.99, gender: 'FEMALE' as const,
    material: 'GOTS Certified Cotton', dye: 'OEKO-TEX Certified Dye',
    size: '12-18m', ageRange: '12–18 months',
    color: 'Lilac', hexColor: '#D8B4E2',
    imageUrl: imgs(1)[0], images: imgs(1), stock: 9, tags: ['dress', 'lilac'],
  },
  {
    name: 'Powder Blue Pyjama Set',
    description: 'Cosy bamboo pyjama set in powder blue. Two-way zip for easy night changes.',
    price: 34.99, gender: 'UNISEX' as const,
    material: 'Bamboo', dye: 'AZO-free Dye',
    size: '18-24m', ageRange: '18–24 months',
    color: 'Powder Blue', hexColor: '#B0D4E8',
    imageUrl: imgs(2)[0], images: imgs(2), stock: 12, tags: ['pyjamas', 'bamboo'],
  },
  {
    name: 'Baby Pink Co-ord Set',
    description: 'Matching top and wide-leg shorts in baby pink. Breathable organic cotton for warm days.',
    price: 37.99, gender: 'FEMALE' as const,
    material: 'Organic Cotton', dye: 'OEKO-TEX Certified Dye',
    size: '18-24m', ageRange: '18–24 months',
    color: 'Baby Pink', hexColor: '#FFB6C1',
    imageUrl: imgs(3)[0], images: imgs(3), stock: 10, tags: ['set', 'pink'],
  },
  {
    name: 'Linen Sage Outfit',
    description: 'Relaxed linen-cotton shirt and trousers in sage. Naturally cool fabric for warm-weather adventurers.',
    price: 44.99, gender: 'MALE' as const,
    material: 'Linen Cotton Blend', dye: 'Natural Plant-based Dye',
    size: '2T', ageRange: '2 years',
    color: 'Sage Green', hexColor: '#A5C8A0',
    imageUrl: imgs(4)[0], images: imgs(4), stock: 8, tags: ['linen', 'set', 'toddler'],
  },
  {
    name: 'Lavender Tiered Dress',
    description: 'Dreamy tiered dress in lavender. Organic cotton lining, non-toxic dyes, machine washable.',
    price: 46.99, gender: 'FEMALE' as const,
    material: 'GOTS Certified Cotton', dye: 'OEKO-TEX Certified Dye',
    size: '3T', ageRange: '3 years',
    color: 'Lavender', hexColor: '#D8B4E2',
    imageUrl: imgs(0)[0], images: imgs(0), stock: 7, tags: ['dress', 'toddler'],
  },
]

async function main() {
  console.log('Seeding database…')
  await prisma.product.deleteMany()
  for (const product of products) {
    await prisma.product.create({ data: product })
  }
  console.log(`✓ Seeded ${products.length} products.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
