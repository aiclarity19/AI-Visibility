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

1. User submits form with website/company name and email
2. API route (`/api/test`) receives the request
3. OpenAI analyzes the website/business (single API call)
4. Result is classified as CLEAR / PARTIAL / NOT CLEAR
5. Email is sent via Resend with the results
6. Optional: Result is logged to Google Sheets via webhook

