"use client"

import type { LangContent } from "@/lib/content"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

export function AuditSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()

  return (
    <section className="bg-background py-16 sm:py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div
          className={`relative transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Glow behind card */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 blur-2xl" aria-hidden="true" />

          <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-10 md:p-16 overflow-hidden">
            {/* Corner decoration */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-accent/5" aria-hidden="true" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                {content.audit.sectionLabel}
              </div>
              <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
                {content.audit.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
                {content.audit.subheadline}
              </p>
            </div>

            <ul className="mx-auto mt-10 flex max-w-md flex-col gap-4">
              {content.audit.features.map((feature, i) => (
                <li
                  key={feature}
                  className={`group flex items-start gap-3 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                  }`}
                  style={{ transitionDelay: isVisible ? `${400 + i * 80}ms` : "0ms" }}
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all duration-300 group-hover:scale-125">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#test"
                className="group relative w-full overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-sm font-semibold text-primary transition-all duration-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {content.audit.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
              </a>
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
                      alert(content.lang === 'pt' ? 'Erro ao criar checkout' : 'Error creating checkout')
                    }
                  } catch (error) {
                    console.error('Checkout error:', error)
                    alert(content.lang === 'pt' ? 'Erro ao processar pagamento' : 'Error processing payment')
                  }
                }}
                className="group relative w-full overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {content.lang === 'pt' ? 'Comprar Agora - $197' : 'Purchase Now - $197'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-accent/80 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
