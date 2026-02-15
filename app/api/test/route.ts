import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Resend } from 'resend'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const resend = new Resend(process.env.RESEND_API_KEY)

type VisibilityResult = 'CLEAR' | 'PARTIAL' | 'NOT CLEAR'

interface AnalysisResult {
  status: VisibilityResult
  explanation: string[]
  businessDescription: string
  targetAudience: string
  location: string
}

async function analyzeWebsite(website: string): Promise<AnalysisResult> {
  const prompt = `You are analyzing a website or business for AI visibility. Based on publicly available information about "${website}", answer these questions:

1. What does this business do? (Be specific)
2. Who is this business for? (Target audience)
3. Where is this business located? (City/region if clear, or "Not clear")

Then, classify the overall AI visibility as:
- CLEAR: If you can clearly understand what the business does, who it's for, and where it operates
- PARTIAL: If you understand some aspects but information is incomplete or unclear
- NOT CLEAR: If you cannot determine what the business does, who it serves, or where it operates

Respond in JSON format:
{
  "status": "CLEAR" | "PARTIAL" | "NOT CLEAR",
  "businessDescription": "brief description",
  "targetAudience": "brief description",
  "location": "location or 'Not clear'",
  "explanation": ["bullet point 1", "bullet point 2", "bullet point 3"]
}

Keep explanations concise (2-3 bullet points max).`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Lightweight and cost-effective
      messages: [
        {
          role: 'system',
          content: 'You are an AI visibility analyst. Respond only with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const result = JSON.parse(content) as AnalysisResult
    
    // Validate status
    if (!['CLEAR', 'PARTIAL', 'NOT CLEAR'].includes(result.status)) {
      result.status = 'NOT CLEAR'
    }

    return result
  } catch (error) {
    console.error('OpenAI error:', error)
    // Fallback result
    return {
      status: 'NOT CLEAR',
      explanation: [
        'Unable to analyze the website automatically',
        'This may indicate the business information is not easily accessible to AI tools',
        'Consider improving your online presence and structured data',
      ],
      businessDescription: 'Could not determine',
      targetAudience: 'Could not determine',
      location: 'Not clear',
    }
  }
}

function getStatusColor(status: VisibilityResult): string {
  switch (status) {
    case 'CLEAR':
      return '#10b981' // emerald
    case 'PARTIAL':
      return '#f59e0b' // amber
    case 'NOT CLEAR':
      return '#ef4444' // red
    default:
      return '#6b7280'
  }
}

function getStatusLabel(status: VisibilityResult, lang: 'en' | 'pt'): string {
  if (lang === 'pt') {
    switch (status) {
      case 'CLEAR':
        return 'CLARO'
      case 'PARTIAL':
        return 'PARCIAL'
      case 'NOT CLEAR':
        return 'NÃO CLARO'
    }
  }
  return status
}

async function sendEmail(
  email: string,
  website: string,
  result: AnalysisResult,
  lang: 'en' | 'pt' = 'en'
) {
  const statusColor = getStatusColor(result.status)
  const statusLabel = getStatusLabel(result.status, lang)

  const isPT = lang === 'pt'

  const subject = isPT
    ? 'Seu Resultado de Visibilidade IA'
    : 'Your AI Visibility Result'

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">${isPT ? 'AI Visibility' : 'AI Visibility'}</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0;">${isPT ? 'Seu Resultado de Visibilidade IA' : 'Your AI Visibility Result'}</h2>
    
    <p style="color: #6b7280;">
      ${isPT 
        ? `Analisamos "${website}" para entender como ferramentas de IA interpretam sua empresa.`
        : `We analyzed "${website}" to understand how AI tools interpret your business.`
      }
    </p>
    
    <div style="background: #f9fafb; border-left: 4px solid ${statusColor}; padding: 20px; margin: 20px 0; border-radius: 4px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="background: ${statusColor}; color: white; padding: 6px 12px; border-radius: 4px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
          ${statusLabel}
        </span>
      </div>
      <p style="margin: 0; color: #374151; font-size: 14px;">
        ${isPT
          ? 'Status de visibilidade para ferramentas de IA'
          : 'AI visibility status'
        }
      </p>
    </div>
    
    <div style="margin: 24px 0;">
      <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 12px;">${isPT ? 'Análise' : 'Analysis'}</h3>
      <ul style="color: #4b5563; padding-left: 20px; margin: 0;">
        ${result.explanation.map((point) => `<li style="margin-bottom: 8px;">${point}</li>`).join('')}
      </ul>
    </div>
    
    <div style="background: #f3f4f6; padding: 16px; border-radius: 6px; margin: 24px 0;">
      <p style="margin: 0; font-size: 13px; color: #6b7280;">
        <strong>${isPT ? 'O que a IA entendeu:' : 'What AI understood:'}</strong><br>
        ${isPT ? 'Negócio:' : 'Business:'} ${result.businessDescription}<br>
        ${isPT ? 'Público-alvo:' : 'Target audience:'} ${result.targetAudience}<br>
        ${isPT ? 'Localização:' : 'Location:'} ${result.location}
      </p>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">
        ${isPT
          ? 'Quer uma análise mais detalhada? Podemos ajudar você a melhorar sua visibilidade para ferramentas de IA.'
          : 'Want a deeper analysis? We can help you improve your visibility to AI tools.'
        }
      </p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}" 
         style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
        ${isPT ? 'Solicitar Auditoria Gratuita' : 'Request Free Audit'}
      </a>
    </div>
    
    <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px;">
      ${isPT
        ? 'Este resultado é um sinal indicativo baseado na interpretação da IA. Não garante posicionamento em respostas geradas por IA.'
        : 'This result is an indicative signal based on AI interpretation. It does not guarantee placement in AI-generated responses.'
      }
    </p>
  </div>
</body>
</html>
  `

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'AI Visibility <noreply@yourdomain.com>',
      to: email,
      subject,
      html: htmlContent,
    })
  } catch (error) {
    console.error('Resend error:', error)
    throw error
  }
}

// Optional: Log to Google Sheets
async function logToSheets(
  website: string,
  email: string,
  result: AnalysisResult
) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    return // Skip if not configured
  }

  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        website,
        email,
        status: result.status,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Google Sheets logging error:', error)
    // Don't throw - logging is optional
  }
}

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://www.aiclarity.online',
  'https://aiclarity.online',
]

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  if (isOriginAllowed(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    })
  }
  
  return new NextResponse(null, { status: 403 })
}

export async function POST(request: NextRequest) {
  // Check origin/referer
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  
  // Allow if:
  // 1. Origin header matches allowed origins (cross-origin requests)
  // 2. Referer matches allowed domains (same-origin requests from https://www.aiclarity.online/en or /en#test)
  const isAllowed = 
    isOriginAllowed(origin) || 
    (referer && ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed)))
  
  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { website, email, lang = 'en' } = body

    if (!website || !email) {
      return NextResponse.json(
        { error: 'Website and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Analyze website
    const result = await analyzeWebsite(website)

    // Send email (don't await to return faster)
    sendEmail(email, website, result, lang as 'en' | 'pt').catch((error) => {
      console.error('Failed to send email:', error)
    })

    // Log to sheets (optional, non-blocking)
    logToSheets(website, email, result).catch(() => {
      // Already logged, continue
    })

    const response = NextResponse.json({
      success: true,
      message: 'Test submitted successfully',
    })
    
    // Add CORS headers
    if (origin && isOriginAllowed(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    }
    
    return response
  } catch (error) {
    console.error('API error:', error)
    const errorResponse = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
    
    // Add CORS headers to error response too
    if (origin && isOriginAllowed(origin)) {
      errorResponse.headers.set('Access-Control-Allow-Origin', origin)
      errorResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
      errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    }
    
    return errorResponse
  }
}

