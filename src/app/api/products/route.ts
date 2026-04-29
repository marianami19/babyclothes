export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const gender   = searchParams.get('gender')   // MALE | FEMALE | UNISEX | ALL
  const size     = searchParams.get('size')      // e.g. "3-6m"
  const material = searchParams.get('material')  // e.g. "Organic Cotton"

  const where: Prisma.ProductWhereInput = {}

  if (gender && gender !== 'ALL') {
    where.gender = gender as 'MALE' | 'FEMALE' | 'UNISEX'
  }

  if (size && size !== 'ALL') {
    where.size = size
  }

  if (material && material !== 'ALL') {
    where.material = material
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('[/api/products]', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
