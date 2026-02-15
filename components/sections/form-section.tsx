"use client"

import React from "react"
import type { LangContent } from "@/lib/content"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle2, Globe, Mail, Shield, AlertCircle } from "lucide-react"
import { useAnimateIn } from "@/hooks/use-animate-in"

export function FormSection({ content }: { content: LangContent }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { ref, isVisible } = useAnimateIn()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const website = formData.get("website") as string
    const email = formData.get("email") as string
    const lang = content.lang

    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ website, email, lang }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit test")
      }

      // Store result in sessionStorage and redirect to results page
      if (data.result) {
        sessionStorage.setItem('aiVisibilityResult', JSON.stringify(data.result))
        router.push(`/${lang}/results`)
      } else {
        setSubmitted(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <section id="test" className="relative bg-background py-16 sm:py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary sm:px-4 sm:py-1.5">
            {content.form.sectionLabel}
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-4xl text-balance">
            {content.form.headline}
          </h2>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {content.form.subheadline}
          </p>
        </div>

        <div
          className={`mt-8 relative sm:mt-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Glow behind card */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-accent/10 blur-xl" aria-hidden="true" />

          <div className="relative rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/5 sm:p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center animate-scale-in">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {content.form.successTitle}
                </h3>
                <p className="max-w-sm leading-relaxed text-muted-foreground">
                  {content.form.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="group">
                  <label
                    htmlFor="website"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Globe className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    {content.form.websiteLabel}
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    required
                    placeholder={content.form.websitePlaceholder}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 sm:py-3.5 sm:text-base focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:shadow-lg focus:shadow-primary/5"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    {content.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={content.form.emailPlaceholder}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 sm:py-3.5 sm:text-base focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:shadow-lg focus:shadow-primary/5"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 sm:px-8 sm:py-4 sm:text-base hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                        {content.form.submitting}
                      </>
                    ) : (
                      <>
                        {content.form.cta}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-accent/80 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
                <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground/60">
                  <Shield className="h-3.5 w-3.5" />
                  {content.form.disclaimer}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
