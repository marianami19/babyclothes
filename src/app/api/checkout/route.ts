import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export interface CheckoutItem {
  productId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export interface CheckoutBody {
  items: CheckoutItem[]
  customer: {
    name: string
    email: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json()
    const { items, customer } = body

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customer.email,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: {
        customerName:    customer.name,
        customerEmail:   customer.email,
        addressLine1:    customer.addressLine1,
        addressLine2:    customer.addressLine2 ?? '',
        city:            customer.city,
        state:           customer.state,
        postalCode:      customer.postalCode,
        country:         customer.country,
        productIds:      items.map((i) => i.productId).join(','),
        quantities:      items.map((i) => i.quantity).join(','),
        prices:          items.map((i) => i.price).join(','),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[/api/checkout]', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
