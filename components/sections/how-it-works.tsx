"use client"

import type { LangContent } from "@/lib/content"
import { useAnimateIn } from "@/hooks/use-animate-in"

export function HowItWorksSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()

  const signalColors: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200/80", dot: "bg-emerald-500" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200/80", dot: "bg-amber-500" },
    red: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200/80", dot: "bg-red-500" },
  }

  return (
    <section id="how-it-works" className="relative bg-section-alt py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Decorative circles - hidden on mobile */}
      <div className="pointer-events-none absolute -right-24 -top-24 hidden h-48 w-48 rounded-full border border-primary/5 sm:block" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-12 bottom-12 hidden h-32 w-32 rounded-full border border-primary/5 sm:block" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {content.howItWorks.sectionLabel}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            {content.howItWorks.headline}
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-10 flex flex-col gap-6 sm:mt-16 sm:gap-8 md:flex-row">
          {content.howItWorks.steps.map((step, i) => (
            <div
              key={i}
              className={`group relative flex gap-4 md:flex-1 md:flex-col md:text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${300 + i * 150}ms` : "0ms" }}
            >
              {/* Step number with animated ring */}
              <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:mx-auto md:h-20 md:w-20">
                <div className="absolute inset-0 rounded-2xl bg-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10 group-hover:rotate-6" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-hero text-hero-foreground font-display text-lg font-bold sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl transition-all duration-300 group-hover:scale-105">
                  {step.step}
                </div>
              </div>

              {/* Connector line (desktop only) */}
              {i < content.howItWorks.steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+48px)] hidden h-px md:block" style={{ width: "calc(100% - 96px)" }} aria-hidden="true">
                  <div
                    className={`h-full bg-primary/20 transition-all duration-1000 ${
                      isVisible ? "w-full" : "w-0"
                    }`}
                    style={{ transitionDelay: isVisible ? `${600 + i * 200}ms` : "0ms" }}
                  />
                </div>
              )}

              <div className="md:mt-0">
                <h3 className="font-display text-base font-semibold text-foreground sm:text-lg md:mt-6 md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-2">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Signals */}
        <div
          className={`mt-12 text-center sm:mt-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:mb-6 sm:text-sm">
            {content.howItWorks.signals.title}
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
            {content.howItWorks.signals.items.map((signal, i) => {
              const colors = signalColors[signal.color] || signalColors.emerald
              return (
                <div
                  key={signal.label}
                  className={`group flex items-center gap-2.5 rounded-xl px-4 py-3 ring-1 transition-all duration-300 sm:gap-3 sm:px-6 sm:py-3.5 hover:scale-105 hover:shadow-md ${colors.bg} ${colors.ring}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className={`flex h-2.5 w-2.5 shrink-0 rounded-full ${colors.dot}`}>
                    <span className={`inline-flex h-full w-full animate-ping rounded-full opacity-50 ${colors.dot}`} />
                  </span>
                  <span className={`text-xs font-bold tracking-wide sm:text-sm ${colors.text}`}>
                    {signal.label}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {signal.description}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
