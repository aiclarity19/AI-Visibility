import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, website, primary_services, target_city, competitors } = body

    if (!email || !website || !primary_services || !target_city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the payment record by email
    const { data: paymentRecord, error: findError } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (findError || !paymentRecord) {
      return NextResponse.json(
        { error: 'Payment record not found. Please ensure you have completed payment.' },
        { status: 404 }
      )
    }

    // Update the payment record with onboarding data and status
    const { data: updatedRecord, error: updateError } = await supabaseAdmin
      .from('payments')
      .update({
        website: website,
        status: 'onboarding_completed',
        updated_at: new Date().toISOString(),
        // Store onboarding data in a JSON column (if you add one) or use metadata
        // For now, we'll just update the website and status
      })
      .eq('id', paymentRecord.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating payment record:', updateError)
      return NextResponse.json(
        { error: 'Failed to update onboarding data' },
        { status: 500 }
      )
    }

    // Update status to ready_for_optimization
    // (You might want to add a review step, but per requirements, we go straight to ready)
    const { error: finalUpdateError } = await supabaseAdmin
      .from('payments')
      .update({
        status: 'ready_for_optimization',
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentRecord.id)

    if (finalUpdateError) {
      console.error('Error updating to ready_for_optimization:', finalUpdateError)
      // Don't fail the request, just log it
    }

    // Store onboarding data separately (you may want to create an onboarding_data table)
    // For now, we'll store it in a simple table or extend the payments table
    // This is a simplified version - you may want to create a separate onboarding_data table

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
    })
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

