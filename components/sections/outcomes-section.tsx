"use client"

import type { LangContent } from "@/lib/content"
import { useAnimateIn } from "@/hooks/use-animate-in"
import { ArrowRight, TrendingUp, Eye, Target } from "lucide-react"

export function OutcomesSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()
  const isPT = content.lang === 'pt'

  const beforeAfter = isPT
    ? {
        before: {
          title: "Antes",
          points: [
            "Invisível para ferramentas de IA",
            "Clientes não encontram você via ChatGPT",
            "Concorrentes aparecem primeiro",
            "Oportunidades perdidas diariamente",
          ]
        },
        after: {
          title: "Depois",
          points: [
            "Visível e compreensível para IA",
            "Recomendado quando clientes perguntam",
            "Posicionamento competitivo melhorado",
            "Novos clientes através de buscas por IA",
          ]
        }
      }
    : {
        before: {
          title: "Before",
          points: [
            "Invisible to AI tools",
            "Customers can't find you via ChatGPT",
            "Competitors appear first",
            "Missing opportunities daily",
          ]
        },
        after: {
          title: "After",
          points: [
            "Visible and understandable to AI",
            "Recommended when customers ask",
            "Improved competitive positioning",
            "New customers through AI searches",
          ]
        }
      }

  const whyMatters = isPT
    ? [
        {
          icon: TrendingUp,
          title: "Crescimento de Buscas por IA",
          description: "Milhões de pessoas agora usam IA para encontrar serviços. Agir cedo garante vantagem estrutural."
        },
        {
          icon: Eye,
          title: "Visibilidade Estratégica",
          description: "Não é apenas sobre SEO tradicional. É sobre ser compreendido e recomendado por sistemas de IA."
        },
        {
          icon: Target,
          title: "Vantagem Competitiva",
          description: "Empresas que otimizam cedo ganham posicionamento que é difícil de replicar depois."
        }
      ]
    : [
        {
          icon: TrendingUp,
          title: "AI Search Growth",
          description: "Millions of people now use AI to find services. Acting early ensures structural advantage."
        },
        {
          icon: Eye,
          title: "Strategic Visibility",
          description: "It's not just about traditional SEO. It's about being understood and recommended by AI systems."
        },
        {
          icon: Target,
          title: "Competitive Advantage",
          description: "Businesses that optimize early gain positioning that's difficult to replicate later."
        }
      ]

  return (
    <section id="outcomes" className="relative bg-section-alt py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {isPT ? 'Transformação' : 'Transformation'}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
            {isPT
              ? 'O que muda depois que você compra?'
              : 'What changes after you buy this?'}
          </h2>
        </div>

        {/* Before/After */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Before */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-6">
              <h3 className="text-xl font-semibold text-red-900 mb-4">
                {beforeAfter.before.title}
              </h3>
              <ul className="space-y-3">
                {beforeAfter.before.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="text-sm text-red-900">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* After */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-6">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">
                {beforeAfter.after.title}
              </h3>
              <ul className="space-y-3">
                {beforeAfter.after.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-emerald-900">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why Acting Early Matters */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            {isPT ? 'Por que agir cedo importa' : 'Why acting early matters'}
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {whyMatters.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : "0ms" }}
                >
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

