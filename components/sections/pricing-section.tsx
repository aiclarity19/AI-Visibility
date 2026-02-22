"use client"

import type { LangContent } from "@/lib/content"
import { Check, ArrowRight, X } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

export function PricingSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()
  const isPT = content.lang === 'pt'

  const diagnosticFeatures = isPT
    ? [
        'Full AI Visibility Audit',
        'Baseline AI Visibility Score',
        'Authority Signal Breakdown',
        'Gap Identification',
        'Initial Essential Optimizations (defined scope)',
        'Structured Action Roadmap',
      ]
    : [
        'Full AI Visibility Audit',
        'Baseline AI Visibility Score',
        'Authority Signal Breakdown',
        'Gap Identification',
        'Initial Essential Optimizations (defined scope)',
        'Structured Action Roadmap',
      ]

  const protectionFeatures = isPT
    ? [
        'Monthly AI re-scan',
        'Updated visibility score',
        'Score history tracking',
        '1 structured micro-optimization per month (strict scope)',
        'Short monthly report',
      ]
    : [
        'Monthly AI re-scan',
        'Updated visibility score',
        'Score history tracking',
        '1 structured micro-optimization per month (strict scope)',
        'Short monthly report',
      ]

  const notIncluded = isPT
    ? [
        'Content creation or writing',
        'Website redesign or major development',
        'Unlimited optimizations',
        'Phone support or consulting calls',
      ]
    : [
        'Content creation or writing',
        'Website redesign or major development',
        'Unlimited optimizations',
        'Phone support or consulting calls',
      ]

  return (
    <section id="pricing" className="relative bg-section-alt py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {isPT ? 'Preços' : 'Pricing'}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
            {isPT
              ? 'Estrutura de Preços Clara e Definida'
              : 'Clear Structured Pricing'}
          </h2>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
            {isPT
              ? 'Um sistema estruturado de visibilidade IA com escopo definido e entregas claras'
              : 'A structured AI visibility system with defined scope and clear deliverables'}
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* $197 Diagnostic */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">$197</span>
                  <span className="text-lg text-muted-foreground">{isPT ? 'único pagamento' : 'one-time'}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {isPT ? 'AI Visibility Diagnostic' : 'AI Visibility Diagnostic'}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isPT ? 'Entrega em 5-7 dias úteis' : 'Delivery: 5-7 business days'}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-foreground mb-2">
                  {isPT ? 'Inclui:' : 'Includes:'}
                </p>
                {diagnosticFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-4">
                  <strong>{isPT ? 'Resultado:' : 'Outcome:'}</strong> {isPT
                    ? 'Cliente entende o posicionamento atual na IA e tem melhorias fundamentais implementadas.'
                    : 'Client understands current AI positioning and has foundational improvements implemented.'}
                </p>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/create-checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          website: '',
                          email: '',
                          lang: content.lang,
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
                  className="w-full group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isPT ? 'Comprar Diagnostic' : 'Purchase Diagnostic'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-accent/80 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </div>

          {/* $49/Month Protection */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="relative rounded-2xl border-2 border-accent bg-card p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">$49</span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {isPT ? 'AI Visibility Protection' : 'AI Visibility Protection'}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isPT ? 'Proteção estratégica contínua' : 'Ongoing strategic protection'}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-foreground mb-2">
                  {isPT ? 'Inclui:' : 'Includes:'}
                </p>
                {protectionFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border mb-6">
                <p className="text-xs font-semibold text-foreground mb-2">
                  {isPT ? 'NÃO inclui:' : 'NOT included:'}
                </p>
                {notIncluded.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 mb-2"
                  >
                    <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={async () => {
                  // TODO: Implement subscription checkout
                  alert(isPT ? 'Em breve disponível' : 'Coming soon')
                }}
                className="w-full group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent bg-transparent px-6 py-3.5 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isPT ? 'Assinar Proteção' : 'Subscribe to Protection'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#test"
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            {isPT ? 'Ou comece com o teste gratuito' : 'Or start with the free test'}
          </a>
        </div>
      </div>
    </section>
  )
}
