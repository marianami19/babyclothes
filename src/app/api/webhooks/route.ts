import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[webhook] signature error', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata ?? {}

    const productIds = meta.productIds?.split(',') ?? []
    const quantities = meta.quantities?.split(',').map(Number) ?? []
    const prices     = meta.prices?.split(',').map(Number) ?? []

    const subtotal = prices.reduce((sum, p, i) => sum + p * quantities[i], 0)

    try {
      await prisma.order.create({
        data: {
          stripeSessionId: session.id,
          customerName:    meta.customerName ?? '',
          customerEmail:   meta.customerEmail ?? session.customer_email ?? '',
          addressLine1:    meta.addressLine1 ?? '',
          addressLine2:    meta.addressLine2 ?? '',
          city:            meta.city ?? '',
          state:           meta.state ?? '',
          postalCode:      meta.postalCode ?? '',
          country:         meta.country ?? '',
          status:          'PAID',
          subtotal,
          total: subtotal,
          items: {
            create: productIds.map((productId, i) => ({
              productId,
              quantity: quantities[i] ?? 1,
              price:    prices[i] ?? 0,
            })),
          },
        },
      })
    } catch (err) {
      console.error('[webhook] DB error', err)
    }
  }

  return NextResponse.json({ received: true })
}
