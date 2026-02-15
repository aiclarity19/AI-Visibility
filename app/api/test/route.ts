import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Resend } from 'resend'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const resend = new Resend(process.env.RESEND_API_KEY)

type VisibilityResult = 'CLEAR' | 'PARTIAL' | 'NOT CLEAR'

interface PillarScore {
  name: string
  score: number // 0-25
  description: string
}

interface AnalysisResult {
  status: VisibilityResult
  overallScore: number // 0-100
  pillars: PillarScore[]
  visibilityGaps: string[]
  optimizationOpportunities: string[]
  businessDescription: string
  targetAudience: string
  location: string
}

async function analyzeWebsite(website: string): Promise<AnalysisResult> {
  const prompt = `You are an AI visibility analyst using a structured methodology to evaluate how well AI tools can understand and recommend a business.

Analyze "${website}" based on publicly available information and evaluate it across 4 pillars (each worth 25 points, total 100):

**Pillar 1: Business Clarity (25 points)**
- How clearly is the business purpose, services, or products defined?
- Is the value proposition obvious?
- Score: 0-25 based on clarity

**Pillar 2: Target Audience (25 points)**
- How well-defined is the target customer or audience?
- Is it clear who the business serves?
- Score: 0-25 based on clarity

**Pillar 3: Location/Service Area (25 points)**
- Is the geographic location or service area clear?
- Can AI determine where the business operates?
- Score: 0-25 based on clarity

**Pillar 4: Structured Data & AI Readability (25 points)**
- How well-structured is the information for AI consumption?
- Is key information easily accessible and parseable?
- Score: 0-25 based on structure

Calculate the overall score (sum of all 4 pillars, 0-100) and classify:
- CLEAR: 75-100 points
- PARTIAL: 40-74 points
- NOT CLEAR: 0-39 points

Identify specific visibility gaps (what's missing or unclear) and optimization opportunities (actionable steps to improve).

Respond in JSON format:
{
  "status": "CLEAR" | "PARTIAL" | "NOT CLEAR",
  "overallScore": 0-100,
  "pillars": [
    {
      "name": "Business Clarity",
      "score": 0-25,
      "description": "brief explanation of score"
    },
    {
      "name": "Target Audience",
      "score": 0-25,
      "description": "brief explanation of score"
    },
    {
      "name": "Location/Service Area",
      "score": 0-25,
      "description": "brief explanation of score"
    },
    {
      "name": "Structured Data & AI Readability",
      "score": 0-25,
      "description": "brief explanation of score"
    }
  ],
  "visibilityGaps": ["gap 1", "gap 2", "gap 3"],
  "optimizationOpportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
  "businessDescription": "what the business does",
  "targetAudience": "who it's for",
  "location": "location or 'Not clear'"
}

Be specific and actionable. Focus on what's missing and what can be improved.`

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
    
    // Validate and normalize result
    if (!['CLEAR', 'PARTIAL', 'NOT CLEAR'].includes(result.status)) {
      result.status = 'NOT CLEAR'
    }

    // Ensure overallScore is valid (0-100)
    if (typeof result.overallScore !== 'number' || result.overallScore < 0 || result.overallScore > 100) {
      // Recalculate from pillars if available
      if (result.pillars && Array.isArray(result.pillars)) {
        result.overallScore = result.pillars.reduce((sum, pillar) => sum + (pillar.score || 0), 0)
      } else {
        result.overallScore = 0
      }
    }

    // Ensure pillars array exists and has 4 items
    if (!result.pillars || !Array.isArray(result.pillars) || result.pillars.length !== 4) {
      result.pillars = [
        { name: 'Business Clarity', score: 0, description: 'Unable to assess' },
        { name: 'Target Audience', score: 0, description: 'Unable to assess' },
        { name: 'Location/Service Area', score: 0, description: 'Unable to assess' },
        { name: 'Structured Data & AI Readability', score: 0, description: 'Unable to assess' },
      ]
    }

    // Ensure arrays exist
    if (!result.visibilityGaps || !Array.isArray(result.visibilityGaps)) {
      result.visibilityGaps = ['Unable to identify specific gaps']
    }
    if (!result.optimizationOpportunities || !Array.isArray(result.optimizationOpportunities)) {
      result.optimizationOpportunities = ['Consider improving your online presence']
    }

    return result
  } catch (error) {
    console.error('OpenAI error:', error)
    // Fallback result
    return {
      status: 'NOT CLEAR',
      overallScore: 0,
      pillars: [
        { name: 'Business Clarity', score: 0, description: 'Unable to analyze automatically' },
        { name: 'Target Audience', score: 0, description: 'Unable to analyze automatically' },
        { name: 'Location/Service Area', score: 0, description: 'Unable to analyze automatically' },
        { name: 'Structured Data & AI Readability', score: 0, description: 'Unable to analyze automatically' },
      ],
      visibilityGaps: [
        'Unable to analyze the website automatically',
        'Business information may not be easily accessible to AI tools',
      ],
      optimizationOpportunities: [
        'Improve online presence and structured data',
        'Ensure key business information is clearly stated',
        'Add structured data markup (Schema.org)',
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

function getScoreColor(score: number): string {
  if (score >= 75) return '#10b981' // emerald
  if (score >= 40) return '#f59e0b' // amber
  return '#ef4444' // red
}

function getPillarColor(score: number): string {
  if (score >= 20) return '#10b981' // emerald
  if (score >= 10) return '#f59e0b' // amber
  return '#ef4444' // red
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
  const scoreColor = getScoreColor(result.overallScore)

  const isPT = lang === 'pt'

  const subject = isPT
    ? `Seu Resultado de Visibilidade IA: ${result.overallScore}/100`
    : `Your AI Visibility Result: ${result.overallScore}/100`

  // Get score positioning message
  const getScorePositioning = (score: number, isPT: boolean): string => {
    if (score >= 75) {
      return isPT
        ? 'Sua base é sólida, mas oportunidades de visibilidade estão sendo deixadas de lado.'
        : 'Your foundation is strong, but visibility opportunities are being left on the table.'
    } else if (score >= 40) {
      return isPT
        ? 'Há potencial significativo para melhorar sua visibilidade para ferramentas de IA.'
        : 'There is significant potential to improve your visibility to AI tools.'
    } else {
      return isPT
        ? 'Sua visibilidade para IA precisa de melhorias estruturais urgentes.'
        : 'Your AI visibility requires urgent structural improvements.'
    }
  }

  // Build pillar HTML with opportunity-driven language
  const pillarsHtml = result.pillars.map((pillar) => {
    const pillarColor = getPillarColor(pillar.score)
    // Transform description to be more strategic
    let strategicDescription = pillar.description
    if (pillar.score < 20) {
      if (pillar.name === 'Target Audience') {
        strategicDescription = isPT
          ? 'Refinar a segmentação de audiência pode aumentar a precisão da interpretação pela IA.'
          : 'Refining audience segmentation could increase AI interpretation precision.'
      } else if (pillar.name === 'Structured Data & AI Readability') {
        strategicDescription = isPT
          ? 'Melhorar dados estruturados pode aumentar a legibilidade por máquinas e a probabilidade de citação pela IA.'
          : 'Enhancing structured data could improve machine-readability and AI citation likelihood.'
      } else if (pillar.name === 'Business Clarity') {
        strategicDescription = isPT
          ? 'Clarificar a proposta de valor pode melhorar significativamente a compreensão pela IA.'
          : 'Clarifying value proposition could significantly improve AI comprehension.'
      } else if (pillar.name === 'Location/Service Area') {
        strategicDescription = isPT
          ? 'Definir claramente a área de serviço pode aumentar a relevância geográfica para ferramentas de IA.'
          : 'Clearly defining service area could increase geographic relevance for AI tools.'
      }
    }
    
    return `
      <div style="margin-bottom: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid ${pillarColor};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 style="margin: 0; color: #1f2937; font-size: 15px; font-weight: 600;">${pillar.name}</h4>
          <span style="background: ${pillarColor}; color: white; padding: 4px 12px; border-radius: 12px; font-weight: 600; font-size: 14px;">
            ${pillar.score}/25
          </span>
        </div>
        <p style="margin: 0; color: #6b7280; font-size: 13px;">${strategicDescription}</p>
      </div>
    `
  }).join('')

  // Build visibility gaps HTML
  const gapsHtml = result.visibilityGaps.map((gap) => `
    <li style="margin-bottom: 8px; color: #4b5563;">${gap}</li>
  `).join('')

  // Build optimization opportunities HTML
  const opportunitiesHtml = result.optimizationOpportunities.map((opp) => `
    <li style="margin-bottom: 8px; color: #4b5563;">${opp}</li>
  `).join('')

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f3f4f6;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">${isPT ? 'AI Visibility' : 'AI Visibility'}</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0; font-size: 22px;">${isPT ? 'Seu Resultado de Visibilidade IA' : 'Your AI Visibility Result'}</h2>
    
    <p style="color: #6b7280; margin-bottom: 24px;">
      ${isPT 
        ? `Analisamos "${website}" usando nossa metodologia estruturada de 4 pilares para avaliar como ferramentas de IA interpretam sua empresa.`
        : `We analyzed "${website}" using our structured 4-pillar methodology to evaluate how AI tools interpret your business.`
      }
    </p>
    
    <!-- Overall Score -->
    <div style="background: linear-gradient(135deg, ${scoreColor}15 0%, ${scoreColor}05 100%); border: 2px solid ${scoreColor}; padding: 24px; margin: 24px 0; border-radius: 12px; text-align: center;">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 48px; font-weight: 700; color: ${scoreColor}; line-height: 1;">
          ${result.overallScore}
        </span>
        <span style="font-size: 24px; color: #6b7280; font-weight: 500;">/100</span>
      </div>
      <div style="display: inline-block; background: ${statusColor}; color: white; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 13px; letter-spacing: 0.5px; margin-top: 8px;">
        ${statusLabel}
      </div>
      <p style="margin: 12px 0 0 0; color: #6b7280; font-size: 14px;">
        ${isPT ? 'Pontuação Geral de Visibilidade IA' : 'Overall AI Visibility Score'}
      </p>
      <p style="margin: 16px 0 0 0; color: #4b5563; font-size: 14px; font-style: italic; font-weight: 500;">
        ${getScorePositioning(result.overallScore, isPT)}
      </p>
    </div>

    <!-- Competitive Framing -->
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 8px;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
        <strong>${isPT ? '💡 Contexto Competitivo:' : '💡 Competitive Context:'}</strong><br>
        ${isPT
          ? 'Empresas com pontuação acima de 92 geralmente implementam frameworks estruturados prontos para IA.'
          : 'Businesses scoring above 92 typically implement structured AI-ready frameworks.'
        }
      </p>
    </div>

    <!-- Pillar Breakdown -->
    <div style="margin: 32px 0;">
      <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">
        ${isPT ? 'Análise por Pilares (4 x 25 pontos)' : 'Pillar Breakdown (4 x 25 points)'}
      </h3>
      ${pillarsHtml}
    </div>

    <!-- Visibility Gaps -->
    <div style="margin: 32px 0; padding: 20px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px;">
      <h3 style="color: #991b1b; font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">
        ${isPT ? '🔍 Lacunas de Visibilidade Identificadas' : '🔍 Visibility Gaps Identified'}
      </h3>
      <ul style="margin: 0; padding-left: 20px; color: #7f1d1d;">
        ${gapsHtml}
      </ul>
    </div>

    <!-- Optimization Opportunities -->
    <div style="margin: 32px 0; padding: 20px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px;">
      <h3 style="color: #065f46; font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">
        ${isPT ? '🚀 Oportunidades de Otimização' : '🚀 Optimization Opportunities'}
      </h3>
      <ul style="margin: 0; padding-left: 20px; color: #047857;">
        ${opportunitiesHtml}
      </ul>
    </div>

    <!-- What AI Understood -->
    <div style="background: #f3f4f6; padding: 16px; border-radius: 6px; margin: 24px 0;">
      <h4 style="color: #1f2937; font-size: 14px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">
        ${isPT ? 'O que a IA entendeu:' : 'What AI understood:'}
      </h4>
      <p style="margin: 4px 0; font-size: 13px; color: #6b7280;">
        <strong>${isPT ? 'Negócio:' : 'Business:'}</strong> ${result.businessDescription}
      </p>
      <p style="margin: 4px 0; font-size: 13px; color: #6b7280;">
        <strong>${isPT ? 'Público-alvo:' : 'Target audience:'}</strong> ${result.targetAudience}
      </p>
      <p style="margin: 4px 0; font-size: 13px; color: #6b7280;">
        <strong>${isPT ? 'Localização:' : 'Location:'}</strong> ${result.location}
      </p>
    </div>
    
    <!-- Strong CTA -->
    <div style="margin-top: 40px; padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center;">
      <h3 style="color: white; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">
        ${isPT 
          ? 'Desbloqueie o Plano Completo de Otimização de Visibilidade IA'
          : 'Unlock Full AI Visibility Optimization Plan'
        }
      </h3>
      <div style="text-align: left; background: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; margin: 16px 0;">
        <ul style="margin: 0; padding-left: 20px; color: rgba(255, 255, 255, 0.95); font-size: 14px; line-height: 1.8;">
          <li style="margin-bottom: 8px;">${isPT ? 'Análise detalhada de lacunas competitivas' : 'Detailed competitive gap analysis'}</li>
          <li style="margin-bottom: 8px;">${isPT ? 'Roadmap de melhorias de dados estruturados' : 'Structured data improvement roadmap'}</li>
          <li style="margin-bottom: 8px;">${isPT ? 'Estratégia de aprimoramento de interpretação pela IA' : 'AI interpretation enhancement strategy'}</li>
          <li style="margin-bottom: 0;">${isPT ? 'Orientação de implementação' : 'Implementation guidance'}</li>
        </ul>
      </div>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}" 
         style="display: inline-block; background: white; color: #667eea; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        ${isPT ? 'Solicitar Plano Completo' : 'Request Full Plan'}
      </a>
      <p style="color: rgba(255, 255, 255, 0.85); font-size: 13px; margin-top: 20px; margin-bottom: 8px; line-height: 1.6; font-style: italic;">
        ${isPT
          ? 'Os frameworks de interpretação pela IA estão evoluindo rapidamente. Empresas que otimizam cedo ganham vantagem estrutural.'
          : 'AI interpretation frameworks are evolving rapidly. Businesses optimizing early gain structural advantage.'
        }
      </p>
      <p style="color: rgba(255, 255, 255, 0.8); font-size: 12px; margin-top: 12px; margin-bottom: 0;">
        ${isPT ? 'Gratuita • Sem compromisso • Resultados em 48h' : 'Free • No commitment • Results in 48h'}
      </p>
    </div>
    
    <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
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
        overallScore: result.overallScore,
        pillarScores: result.pillars.map(p => `${p.name}: ${p.score}/25`).join(', '),
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
  // 2. Referer matches allowed domains (same-origin requests from:
  //    - https://www.aiclarity.online/en or /en#test
  //    - https://www.aiclarity.online/pt or /pt#test
  //    - Any other path on aiclarity.online)
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
      result: {
        ...result,
        website,
      },
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

