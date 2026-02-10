"use client"

import type { LangContent } from "@/lib/content"
import { Search, Bot, AlertTriangle, EyeOff } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

const icons = [Search, Bot, AlertTriangle, EyeOff]

export function ProblemSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()

  return (
    <section className="bg-background py-16 sm:py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {content.problem.sectionLabel}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            {content.problem.headline}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {content.problem.points.map((point, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className={`group relative rounded-2xl border border-border bg-card p-5 sm:p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${200 + i * 100}ms` : "0ms",
                }}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex gap-4 sm:block">
                  <div className="mb-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 sm:mb-5 sm:h-12 sm:w-12 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:text-base">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
