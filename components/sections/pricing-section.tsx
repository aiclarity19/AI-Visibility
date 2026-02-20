"use client"

import type { LangContent } from "@/lib/content"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

export function PricingSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()
  const isPT = content.lang === 'pt'

  const features = isPT
    ? [
        'Análise detalhada de lacunas competitivas',
        'Roadmap de melhorias de dados estruturados',
        'Estratégia de aprimoramento de interpretação pela IA',
        'Orientação de implementação',
        'Suporte por email durante 30 dias',
      ]
    : [
        'Detailed competitive gap analysis',
        'Structured data improvement roadmap',
        'AI interpretation enhancement strategy',
        'Implementation guidance',
        'Email support for 30 days',
      ]

  return (
    <section id="pricing" className="relative bg-section-alt py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
              ? 'Plano Completo de Otimização de Visibilidade IA'
              : 'Complete AI Visibility Optimization Plan'}
          </h2>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
            {isPT
              ? 'Tudo que você precisa para maximizar sua visibilidade para ferramentas de IA'
              : 'Everything you need to maximize your visibility to AI tools'}
          </p>
        </div>

        <div
          className={`mt-10 sm:mt-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="relative rounded-2xl border-2 border-primary bg-card p-8 sm:p-10 md:p-12 shadow-2xl">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-xl" aria-hidden="true" />

            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">$197</span>
                  <span className="text-xl text-muted-foreground">{isPT ? 'único pagamento' : 'one-time'}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isPT ? 'Sem taxas recorrentes' : 'No recurring fees'}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    }`}
                    style={{ transitionDelay: isVisible ? `${400 + i * 80}ms` : "0ms" }}
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
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
                  className="group relative flex-1 overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isPT ? 'Comprar Agora' : 'Purchase Now'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-accent/80 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
                <a
                  href="#test"
                  className="group relative flex-1 overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isPT ? 'Teste Gratuito Primeiro' : 'Try Free Test First'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
                </a>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                {isPT
                  ? 'Garantia de 30 dias ou seu dinheiro de volta'
                  : '30-day money-back guarantee'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

