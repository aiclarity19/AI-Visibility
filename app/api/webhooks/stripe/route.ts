import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin, type PaymentRecord } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, eventId: string) {
  const customerEmail = session.customer_email || session.customer_details?.email
  if (!customerEmail) {
    throw new Error('No customer email found in session')
  }

  const website = session.metadata?.website || null
  const stripePaymentId = session.payment_intent as string || session.id

  // Check if payment already exists (idempotency using unique constraint on stripe_payment_id)
  const { data: existingPayment } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('stripe_payment_id', stripePaymentId)
    .single()

  if (existingPayment) {
    console.log(`Payment record already exists for ${stripePaymentId}, skipping`)
    return existingPayment
  }

  // Insert payment record into Supabase
  const { data, error } = await supabaseAdmin
    .from('payments')
    .insert({
      customer_email: customerEmail,
      website: website,
      payment_timestamp: new Date().toISOString(),
      stripe_payment_id: stripePaymentId,
      status: 'paid',
    })
    .select()
    .single()

  if (error) {
    // Check if it's a duplicate key error (idempotency - race condition)
    if (error.code === '23505') {
      console.log(`Payment record already exists for ${stripePaymentId} (race condition)`)
      // Fetch the existing record
      const { data: existing } = await supabaseAdmin
        .from('payments')
        .select('*')
        .eq('stripe_payment_id', stripePaymentId)
        .single()
      return existing
    }
    throw error
  }

  // Send onboarding email (non-blocking)
  sendOnboardingEmail(customerEmail, website).catch((error) => {
    console.error('Failed to send onboarding email:', error)
  })

  // Update status to onboarding_sent after email is sent
  if (data) {
    await supabaseAdmin
      .from('payments')
      .update({ status: 'onboarding_sent' })
      .eq('id', data.id)
  }

  return data
}

async function sendOnboardingEmail(email: string, website: string | null) {
  const { Resend } = await import('resend')
  const resendClient = new Resend(process.env.RESEND_API_KEY)

  const onboardingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/onboarding?email=${encodeURIComponent(email)}${website ? `&website=${encodeURIComponent(website)}` : ''}`

  await resendClient.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'AI Visibility <noreply@yourdomain.com>',
    to: email,
    subject: 'Welcome! Complete Your AI Visibility Setup',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">AI Visibility</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0; font-size: 22px;">Welcome! Let's Get Started</h2>
    
    <p style="color: #6b7280; margin-bottom: 20px;">
      Thank you for your purchase. We're excited to help you optimize your AI visibility.
    </p>
    
    <p style="color: #4b5563; margin-bottom: 24px;">
      To get started, please complete a quick onboarding form. This will help us understand your business and create a personalized optimization plan.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${onboardingUrl}" 
         style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        Complete Onboarding Form
      </a>
    </div>
    
    <p style="color: #9ca3af; font-size: 13px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
      This link will expire in 7 days. If you have any questions, please reply to this email.
    </p>
  </div>
</body>
</html>
    `,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const error = err as Error
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Only process if payment was successful
        if (session.payment_status === 'paid') {
          await handleCheckoutCompleted(session, event.id)
        }
        break
      }
      
      case 'payment_intent.succeeded': {
        // Additional payment confirmation if needed
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent succeeded:', paymentIntent.id)
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

