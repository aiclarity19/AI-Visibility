"use client"

import type { LangContent } from "@/lib/content"
import { BarChart3, Lightbulb, Compass } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

const icons = [BarChart3, Lightbulb, Compass]

export function ReceiveSection({ content }: { content: LangContent }) {
  const { ref, isVisible } = useAnimateIn()

  return (
    <section className="relative bg-section-alt py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {content.receive.sectionLabel}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            {content.receive.headline}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-8 md:grid-cols-3">
          {content.receive.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className={`group relative rounded-2xl border border-border bg-card p-5 sm:p-8 sm:text-center transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible ? `${200 + i * 150}ms` : "0ms" }}
              >
                {/* Number indicator */}
                <div className="absolute top-3 right-3 font-display text-4xl font-bold text-foreground/[0.04] transition-colors sm:top-4 sm:right-4 sm:text-5xl group-hover:text-primary/[0.08]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="flex items-start gap-4 sm:flex-col sm:items-center">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 sm:mb-5 sm:h-14 sm:w-14 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:text-base">
                      {item.description}
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
