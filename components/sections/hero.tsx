"use client"

import type { LangContent } from "@/lib/content"
import { ArrowRight, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection({ content }: { content: LangContent }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative overflow-hidden bg-hero pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-48 md:pb-36 lg:pt-56 lg:pb-44">
      {/* Animated grid */}
      <div className="pointer-events-none absolute inset-0 animated-grid" aria-hidden="true" />

      {/* Floating orbs - hidden on very small screens */}
      <div
        className="pointer-events-none absolute top-20 right-[15%] hidden h-72 w-72 rounded-full opacity-20 blur-3xl sm:block orb-1"
        style={{ background: "hsl(200 80% 50%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 left-[10%] hidden h-96 w-96 rounded-full opacity-10 blur-3xl sm:block orb-2"
        style={{ background: "hsl(173 60% 45%)" }}
        aria-hidden="true"
      />

      {/* Radial mask */}
      <div
        className="pointer-events-none absolute inset-0 animate-pulse-glow"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(200 80% 40% / 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:px-4 sm:py-1.5 sm:text-sm transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          {content.lang === "en" ? "Free AI Visibility Check" : "Verificacao Gratuita de IA"}
        </div>

        <h1
          className={`font-display mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-hero-foreground sm:mt-8 sm:text-4xl md:text-5xl lg:text-7xl text-balance transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {content.hero.headline.split(" ").map((word, i) => (
            <span key={i} className={i === content.hero.headline.split(" ").length - 1 ? "text-primary" : ""}>
              {word}{" "}
            </span>
          ))}
        </h1>

        <p
          className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed text-hero-muted sm:mt-6 sm:text-lg md:text-xl text-pretty transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {content.hero.subheadline}
        </p>

        <div
          className={`mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#test"
            className="group relative w-full overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 sm:w-auto sm:gap-2.5 sm:px-8 sm:py-4 sm:text-base hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-accent/80 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-hero-muted transition-colors hover:text-hero-foreground underline underline-offset-4 decoration-hero-muted/30 hover:decoration-hero-foreground/50"
          >
            {content.nav.howItWorks}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-10 flex justify-center sm:mt-16 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-hero-muted/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
