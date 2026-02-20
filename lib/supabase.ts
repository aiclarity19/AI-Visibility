import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
export interface PaymentRecord {
  id?: string
  customer_email: string
  website?: string
  payment_timestamp: string
  stripe_payment_id: string
  status: 'paid' | 'onboarding_sent' | 'onboarding_completed' | 'ready_for_optimization'
  created_at?: string
  updated_at?: string
}

export interface OnboardingData {
  website: string
  primary_services: string
  target_city: string
  competitors?: string
}

