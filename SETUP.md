# AI Visibility Test - Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI API Key
# Get your key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key

# Resend API Key
# Get your key from: https://resend.com/api-keys
# Make sure to verify your domain in Resend dashboard
RESEND_API_KEY=re_your-resend-api-key

# Resend From Email
# Must be a verified domain in Resend
# Format: "Display Name <email@yourdomain.com>"
RESEND_FROM_EMAIL=AI Visibility <noreply@yourdomain.com>

# Site URL (for email links)
# Used in the email template for the "Request Free Audit" button
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Google Sheets Webhook URL
# Set up a Zapier/Make.com webhook that receives POST requests
# and appends rows to a Google Sheet
# Format: https://hooks.zapier.com/hooks/catch/...
GOOGLE_SHEETS_WEBHOOK_URL=

# Stripe API Keys
# Get your keys from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-signing-secret

# Supabase Configuration
# Get your keys from: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Setup Steps

1. **Get OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Add it to `.env.local` as `OPENAI_API_KEY`

2. **Get Resend API Key**
   - Sign up at https://resend.com
   - Go to API Keys section
   - Create a new API key
   - Add it to `.env.local` as `RESEND_API_KEY`

3. **Verify Domain in Resend**
   - In Resend dashboard, go to Domains
   - Add and verify your domain
   - Update `RESEND_FROM_EMAIL` with your verified domain email

4. **Set Site URL**
   - Update `NEXT_PUBLIC_SITE_URL` with your production domain
   - This is used in email links

5. **Optional: Google Sheets Integration**
   - Set up a Zapier/Make.com webhook
   - Configure it to append rows to a Google Sheet
   - Add the webhook URL to `GOOGLE_SHEETS_WEBHOOK_URL`

6. **Set up Stripe**
   - Create a Stripe account at https://stripe.com
   - Get your API keys from https://dashboard.stripe.com/apikeys
   - Add `STRIPE_SECRET_KEY` (use test key for development: `sk_test_...`)
   - Create a webhook endpoint in Stripe Dashboard:
     - URL: `https://yourdomain.com/api/webhooks/stripe`
     - Events to listen: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the webhook signing secret and add as `STRIPE_WEBHOOK_SECRET`

7. **Set up Supabase**
   - Create a Supabase project at https://app.supabase.com
   - Get your project URL and add as `NEXT_PUBLIC_SUPABASE_URL`
   - Get your service role key from Settings → API → Service Role Key
   - Add as `SUPABASE_SERVICE_ROLE_KEY`
   - Run the SQL schema (see `supabase-schema.sql`) to create the payments table

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/en`

3. Submit the form with a test website and email

4. Check your email inbox for the AI Visibility result

## Deployment

When deploying to Vercel:

1. Add all environment variables in the Vercel dashboard
2. Go to Settings → Environment Variables
3. Add each variable from `.env.local`
4. Redeploy your application

## How It Works

### Free Test Flow
1. User submits form with website/company name and email
2. API route (`/api/test`) receives the request
3. OpenAI analyzes the website/business (single API call)
4. Result is classified with score (0-100) and 4 pillars
5. Email is sent via Resend with the results
6. Results are displayed on the website
7. Optional: Result is logged to Google Sheets via webhook

### Payment & Onboarding Flow
1. User clicks "Purchase Full Plan" on results page
2. Stripe Checkout session is created via `/api/create-checkout`
3. User completes payment ($197 one-time)
4. Stripe webhook (`/api/webhooks/stripe`) receives `checkout.session.completed` event
5. Webhook verifies signature and checks idempotency
6. Payment record is created in Supabase with status `paid`
7. Onboarding email is automatically sent via Resend
8. Status updated to `onboarding_sent`
9. User completes onboarding form at `/onboarding`
10. Onboarding data submitted to `/api/onboarding`
11. Status updated to `onboarding_completed` then `ready_for_optimization`

## Database Schema

Run the SQL in `supabase-schema.sql` in your Supabase SQL editor to create the payments table.

## Testing Payment Flow

1. Use Stripe test mode keys (`sk_test_...`)
2. Use Stripe test card: `4242 4242 4242 4242`
3. Complete the full flow:
   - Submit test form
   - View results
   - Click purchase button
   - Complete test payment
   - Verify webhook triggers
   - Check Supabase for payment record
   - Verify onboarding email sent
   - Complete onboarding form
   - Verify status updates in Supabase

