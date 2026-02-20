"use client"

import React from "react"
import type { LangContent } from "@/lib/content"
import { CheckCircle2, AlertCircle, TrendingUp, Target, MapPin, Database } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

interface PillarScore {
  name: string
  score: number
  description: string
}

interface AnalysisResult {
  status: 'CLEAR' | 'PARTIAL' | 'NOT CLEAR'
  overallScore: number
  pillars: PillarScore[]
  visibilityGaps: string[]
  optimizationOpportunities: string[]
  businessDescription: string
  targetAudience: string
  location: string
  website: string
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'CLEAR':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    case 'PARTIAL':
      return 'text-amber-600 bg-amber-50 border-amber-200'
    case 'NOT CLEAR':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

function getScoreColor(score: number): string {
  if (score >= 75) return 'text-emerald-600'
  if (score >= 40) return 'text-amber-600'
  return 'text-red-600'
}

function getPillarColor(score: number): string {
  if (score >= 20) return 'border-emerald-500 bg-emerald-50/50'
  if (score >= 10) return 'border-amber-500 bg-amber-50/50'
  return 'border-red-500 bg-red-50/50'
}

function getPillarIcon(name: string) {
  switch (name) {
    case 'Business Clarity':
      return Target
    case 'Target Audience':
      return TrendingUp
    case 'Location/Service Area':
      return MapPin
    case 'Structured Data & AI Readability':
      return Database
    default:
      return AlertCircle
  }
}

function getScorePositioning(score: number, isPT: boolean): string {
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

export function ResultsSection({ 
  result, 
  content 
}: { 
  result: AnalysisResult
  content: LangContent 
}) {
  const { ref, isVisible } = useAnimateIn()
  const isPT = content.lang === 'pt'
  const statusColor = getStatusColor(result.status)
  const scoreColor = getScoreColor(result.overallScore)

  return (
    <section className="relative bg-background py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {isPT ? 'Resultado da Análise' : 'Analysis Result'}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
            {isPT ? 'Seu Resultado de Visibilidade IA' : 'Your AI Visibility Result'}
          </h2>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {isPT
              ? `Análise de "${result.website}" usando nossa metodologia estruturada de 4 pilares.`
              : `Analysis of "${result.website}" using our structured 4-pillar methodology.`
            }
          </p>
        </div>

        {/* Overall Score */}
        <div
          className={`mt-8 sm:mt-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className={`relative rounded-2xl border-2 p-8 text-center ${
            scoreColor.includes('emerald') ? 'bg-gradient-to-br from-emerald-50/50 to-transparent' :
            scoreColor.includes('amber') ? 'bg-gradient-to-br from-amber-50/50 to-transparent' :
            'bg-gradient-to-br from-red-50/50 to-transparent'
          }`}>
            <div className="mb-4">
              <span className={`text-6xl font-bold ${scoreColor} leading-none`}>
                {result.overallScore}
              </span>
              <span className="text-3xl text-muted-foreground font-medium">/100</span>
            </div>
            <div className={`inline-block rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wider ${statusColor}`}>
              {isPT 
                ? (result.status === 'CLEAR' ? 'CLARO' : result.status === 'PARTIAL' ? 'PARCIAL' : 'NÃO CLARO')
                : result.status
              }
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {isPT ? 'Pontuação Geral de Visibilidade IA' : 'Overall AI Visibility Score'}
            </p>
            <p className={`mt-3 text-sm font-medium italic ${scoreColor}`}>
              {getScorePositioning(result.overallScore, isPT)}
            </p>
          </div>

          {/* Competitive Framing */}
          <div className="mt-6 rounded-lg border-l-4 border-amber-500 bg-amber-50/50 p-4">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>💡 {isPT ? 'Contexto Competitivo:' : 'Competitive Context:'}</strong><br />
              {isPT
                ? 'Empresas com pontuação acima de 92 geralmente implementam frameworks estruturados prontos para IA.'
                : 'Businesses scoring above 92 typically implement structured AI-ready frameworks.'
              }
            </p>
          </div>
        </div>

        {/* Pillar Breakdown */}
        <div className={`mt-12 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h3 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b">
            {isPT ? 'Análise por Pilares (4 x 25 pontos)' : 'Pillar Breakdown (4 x 25 points)'}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {result.pillars.map((pillar, index) => {
              const Icon = getPillarIcon(pillar.name)
              const pillarColor = getPillarColor(pillar.score)
              return (
                <div
                  key={index}
                  className={`rounded-lg border-l-4 p-4 ${pillarColor}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-semibold text-foreground text-sm">{pillar.name}</h4>
                    </div>
                    <span className={`text-sm font-bold ${getScoreColor(pillar.score)}`}>
                      {pillar.score}/25
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Visibility Gaps */}
        <div className={`mt-8 transition-all duration-700 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50/50 p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {isPT ? '🔍 Lacunas de Visibilidade Identificadas' : '🔍 Visibility Gaps Identified'}
            </h3>
            <ul className="space-y-2 text-sm text-red-900">
              {result.visibilityGaps.map((gap, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Optimization Opportunities */}
        <div className={`mt-6 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50/50 p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {isPT ? '🚀 Oportunidades de Otimização' : '🚀 Optimization Opportunities'}
            </h3>
            <ul className="space-y-2 text-sm text-emerald-900">
              {result.optimizationOpportunities.map((opp, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What AI Understood */}
        <div className={`mt-8 transition-all duration-700 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="rounded-lg bg-muted/50 p-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              {isPT ? 'O que a IA entendeu:' : 'What AI understood:'}
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>{isPT ? 'Negócio:' : 'Business:'}</strong> {result.businessDescription}
              </p>
              <p>
                <strong>{isPT ? 'Público-alvo:' : 'Target audience:'}</strong> {result.targetAudience}
              </p>
              <p>
                <strong>{isPT ? 'Localização:' : 'Location:'}</strong> {result.location}
              </p>
            </div>
          </div>
        </div>

        {/* Strong CTA */}
        <div className={`mt-10 transition-all duration-700 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              {isPT
                ? 'Desbloqueie o Plano Completo de Otimização de Visibilidade IA'
                : 'Unlock Full AI Visibility Optimization Plan'
              }
            </h3>
            <div className="mt-4 mb-6 text-left bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{isPT ? 'Análise detalhada de lacunas competitivas' : 'Detailed competitive gap analysis'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{isPT ? 'Roadmap de melhorias de dados estruturados' : 'Structured data improvement roadmap'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{isPT ? 'Estratégia de aprimoramento de interpretação pela IA' : 'AI interpretation enhancement strategy'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{isPT ? 'Orientação de implementação' : 'Implementation guidance'}</span>
                </li>
              </ul>
            </div>
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault()
                try {
                  const response = await fetch('/api/create-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      website: result.website,
                      email: '', // Will be captured in checkout
                      lang: isPT ? 'pt' : 'en',
                    }),
                  })
                  const data = await response.json()
                  if (data.url) {
                    window.location.href = data.url
                  } else {
                    alert(isPT ? 'Erro ao criar checkout' : 'Error creating checkout')
                  }
                } catch (error) {
                  console.error('Checkout error:', error)
                  alert(isPT ? 'Erro ao processar pagamento' : 'Error processing payment')
                }
              }}
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              {isPT ? 'Comprar Plano Completo - $197' : 'Purchase Full Plan - $197'}
            </a>
            <p className="mt-4 text-sm text-white/85 italic leading-relaxed">
              {isPT
                ? 'Os frameworks de interpretação pela IA estão evoluindo rapidamente. Empresas que otimizam cedo ganham vantagem estrutural.'
                : 'AI interpretation frameworks are evolving rapidly. Businesses optimizing early gain structural advantage.'
              }
            </p>
            <p className="mt-3 text-xs text-white/70">
              {isPT ? 'Gratuita • Sem compromisso • Resultados em 48h' : 'Free • No commitment • Results in 48h'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

