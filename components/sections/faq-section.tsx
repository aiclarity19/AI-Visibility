"use client"

import type { LangContent } from "@/lib/content"
import { useAnimateIn } from "@/hooks/use-animate-in"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function FAQSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isPT = content.lang === 'pt'

  const faqs = isPT
    ? [
        {
          q: "O que é AI Clarity?",
          a: "AI Clarity é um sistema estruturado de visibilidade IA para empresas locais. Não é uma ferramenta, mas sim um sistema completo com diagnóstico ($197) e proteção mensal ($49/mês) para garantir que sua empresa seja compreendida e recomendada por ferramentas de IA."
        },
        {
          q: "O que está incluído no Diagnostic de $197?",
          a: "O Diagnostic inclui: Full AI Visibility Audit, Baseline AI Visibility Score, Authority Signal Breakdown, Gap Identification, Initial Essential Optimizations (escopo definido), e Structured Action Roadmap. Entrega em 5-7 dias úteis."
        },
        {
          q: "O que significa '1 micro-otimização por mês' no plano de $49?",
          a: "Cada mês, realizamos uma otimização estruturada e focada (escopo limitado) para melhorar sua visibilidade IA. Isso pode incluir ajustes em dados estruturados, melhorias em sinais de autoridade, ou outras otimizações técnicas específicas. Não inclui criação de conteúdo ou redesenho de site."
        },
        {
          q: "O que NÃO está incluído no plano mensal?",
          a: "O plano mensal NÃO inclui: criação de conteúdo ou escrita, redesenho de site ou desenvolvimento maior, otimizações ilimitadas, ou suporte telefônico/consultas. É focado em proteção estratégica contínua com escopo definido."
        },
        {
          q: "Como funciona o processo após o pagamento?",
          a: "Após o pagamento do Diagnostic ($197), você receberá automaticamente um email com um formulário de intake. O diagnóstico só começa após você completar o formulário, que coleta informações estratégicas sobre seu negócio."
        },
        {
          q: "Isso é consultoria de alto valor?",
          a: "Não. AI Clarity é um produto de baixo valor com escopo definido e workflow escalável. É um sistema repetível, não consultoria personalizada de alto valor."
        }
      ]
    : [
        {
          q: "What is AI Clarity?",
          a: "AI Clarity is a structured AI visibility system for local businesses. It's not a tool, but a complete system with a diagnostic ($197) and monthly protection ($49/month) to ensure your business is understood and recommended by AI tools."
        },
        {
          q: "What's included in the $197 Diagnostic?",
          a: "The Diagnostic includes: Full AI Visibility Audit, Baseline AI Visibility Score, Authority Signal Breakdown, Gap Identification, Initial Essential Optimizations (defined scope), and Structured Action Roadmap. Delivery in 5-7 business days."
        },
        {
          q: "What does '1 micro-optimization per month' mean in the $49 plan?",
          a: "Each month, we perform one structured, focused optimization (limited scope) to improve your AI visibility. This may include structured data adjustments, authority signal improvements, or other specific technical optimizations. It does not include content creation or website redesign."
        },
        {
          q: "What is NOT included in the monthly plan?",
          a: "The monthly plan does NOT include: content creation or writing, website redesign or major development, unlimited optimizations, or phone support/consulting calls. It's focused on ongoing strategic protection with defined scope."
        },
        {
          q: "How does the process work after payment?",
          a: "After purchasing the Diagnostic ($197), you'll automatically receive an email with an intake form. The diagnostic only starts after you complete the form, which collects strategic information about your business."
        },
        {
          q: "Is this high-ticket consulting?",
          a: "No. AI Clarity is a low-ticket product with defined scope and scalable workflow. It's a repeatable system, not high-value personalized consulting."
        }
      ]

  return (
    <section id="faq" className="relative bg-background py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {isPT ? 'Perguntas Frequentes' : 'FAQ'}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
            {isPT ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left rounded-xl border border-border bg-card p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-foreground pr-8">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

