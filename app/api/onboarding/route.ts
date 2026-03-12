import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {

    const body = await request.json()

    const {
      email,
      business_name,
      website,
      products,
      target_customers,
      locations,
      service_type,
      primary_services,
      target_city,
      differentiation,
      certifications,
      keywords,
      google_business_link,
      instagram,
      phone,
      content_presence,
      ai_association_goal
    } = body

    if (!email || !website) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    /*
    ----------------------------------------
    VERIFY USER EXISTS IN PAYMENTS TABLE
    ----------------------------------------
    */

    const { data: paymentRecord, error: findError } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (findError || !paymentRecord) {
      return NextResponse.json(
        { error: 'Unauthorized request. Payment record not found.' },
        { status: 403 }
      )
    }

    /*
    ----------------------------------------
    VERIFY PAYMENT STATUS
    ----------------------------------------
    */

    const allowedStatuses = [
      'paid',
      'onboarding_sent',
      'onboarding_completed',
      'ready_for_optimization'
    ]

    if (!allowedStatuses.includes(paymentRecord.status)) {
      return NextResponse.json(
        { error: 'Access denied. Payment required before onboarding.' },
        { status: 403 }
      )
    }

    /*
    ----------------------------------------
    STORE ONBOARDING DATA
    ----------------------------------------
    */

    const { error: onboardingError } = await supabaseAdmin
      .from('onboarding_data')
      .insert([
        {
          email,
          business_name,
          website,
          products,
          target_customers,
          locations,
          service_type,
          primary_services,
          target_city,
          differentiation,
          certifications,
          keywords,
          google_business_link,
          instagram,
          phone,
          content_presence,
          ai_association_goal
        }
      ])

    if (onboardingError) {
      console.error('Onboarding insert error:', onboardingError)

      return NextResponse.json(
        { error: 'Failed to store onboarding data' },
        { status: 500 }
      )
    }

    /*
    ----------------------------------------
    UPDATE PAYMENT STATUS
    ----------------------------------------
    */

    const { error: updateError } = await supabaseAdmin
      .from('payments')
      .update({
        website: website,
        status: 'ready_for_optimization',
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentRecord.id)

    if (updateError) {
      console.error('Payment update error:', updateError)
    }

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully'
    })

  } catch (error) {

    console.error('Onboarding API error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}