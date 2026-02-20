import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { website, email, lang = 'en' } = body

    // Email is optional - Stripe will collect it during checkout if not provided
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI Visibility Optimization Plan',
              description: 'Complete AI visibility optimization with detailed analysis, competitive gap analysis, structured data roadmap, and implementation guidance.',
            },
            unit_amount: 19700, // $197.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/${lang}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/${lang}/results`,
      // Only set customer_email if email is provided
      ...(email && { customer_email: email }),
      metadata: {
        website: website || '',
        email: email || '',
        lang: lang,
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

