"use client"

import type { LangContent } from "@/lib/content"
import { useAnimateIn } from "@/hooks/use-animate-in"
import { Search, Building2, Rocket, Shield } from "lucide-react"

const steps = [
  { icon: Search, number: "01", title: "AI Visibility Audit", description: "Comprehensive analysis of current AI interpretation and visibility gaps" },
  { icon: Building2, number: "02", title: "Authority Signal Structuring", description: "Strategic structuring of business signals for optimal AI understanding" },
  { icon: Rocket, number: "03", title: "AI Optimization Deployment", description: "Implementation of essential optimizations based on audit findings" },
  { icon: Shield, number: "04", title: "Ongoing AI Visibility Protection", description: "Monthly monitoring and micro-optimizations to maintain visibility" },
]

export function FrameworkSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()
  const isPT = content.lang === 'pt'

  return (
    <section id="framework" className="relative bg-background py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {isPT ? 'Metodologia' : 'Methodology'}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
            {isPT ? 'AI Clarity Framework™' : 'AI Clarity Framework™'}
          </h2>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
            {isPT
              ? 'Um sistema estruturado desenvolvido por especialistas, não apenas software'
              : 'A structured system built by specialists, not just software'}
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms" }}
              >
                <div className="relative rounded-xl border border-border bg-card p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {isPT
              ? 'Este framework garante que sua empresa seja compreendida e recomendada por ferramentas de IA através de uma abordagem sistemática e mensurável.'
              : 'This framework ensures your business is understood and recommended by AI tools through a systematic, measurable approach.'}
          </p>
        </div>
      </div>
    </section>
  )
}

