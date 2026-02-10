"use client"

import type { LangContent } from "@/lib/content"
import { ArrowRight } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

export function FinalCtaSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()

  return (
    <section className="relative bg-hero py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Animated grid */}
      <div className="pointer-events-none absolute inset-0 animated-grid opacity-50" aria-hidden="true" />

      {/* Floating orb - hidden on mobile */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden h-[500px] w-[500px] rounded-full opacity-15 blur-3xl sm:block orb-1"
        style={{ background: "hsl(200 80% 50%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2
          className={`font-display text-2xl font-bold tracking-tight text-hero-foreground sm:text-3xl md:text-4xl lg:text-5xl text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {content.finalCta.headline}
        </h2>
        <p
          className={`mx-auto mt-3 max-w-xl text-base leading-relaxed text-hero-muted sm:mt-4 sm:text-lg text-pretty transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {content.finalCta.subheadline}
        </p>
        <div
          className={`mt-8 sm:mt-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#test"
            className="group relative w-full overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/25 transition-all duration-300 sm:w-auto sm:gap-2.5 sm:px-10 sm:py-5 sm:text-lg hover:shadow-primary/40 hover:scale-[1.03]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.finalCta.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-accent/80 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </section>
  )
}
