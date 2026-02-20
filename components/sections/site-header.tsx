"use client"

import type { LangContent } from "@/lib/content"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Sparkles } from "lucide-react"

export function SiteHeader({ content }: { content: LangContent }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-lg shadow-foreground/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href={`/${content.lang}`}
          className={`group flex items-center gap-2 font-display text-lg font-bold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-hero-foreground"
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
            <Sparkles className="h-4 w-4" />
          </div>
          {content.nav.logo}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#how-it-works"
            className={`relative text-sm transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-hero-muted hover:text-hero-foreground"
            }`}
          >
            {content.nav.howItWorks}
          </a>
          <a
            href="#pricing"
            className={`relative text-sm transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
              scrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-hero-muted hover:text-hero-foreground"
            }`}
          >
            {content.lang === 'pt' ? 'Preços' : 'Pricing'}
          </a>
          <a
            href="#test"
            className="group relative overflow-hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            <span className="relative z-10">{content.nav.test}</span>
            <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </a>
          <Link
            href={content.nav.langSwitchHref}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-all ${
              scrolled
                ? "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                : "border-hero-foreground/15 text-hero-muted hover:border-hero-foreground/30 hover:text-hero-foreground"
            }`}
          >
            <span className="text-xs">
              {content.lang === "en" ? "PT" : "EN"}
            </span>
            {content.nav.langSwitch}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`relative md:hidden transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-hero-foreground"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className={`transition-all duration-300 ${mobileOpen ? "rotate-90 scale-110" : ""}`}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </div>
        </button>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 border-t border-border bg-card/95 backdrop-blur-xl px-6 py-6">
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {content.nav.howItWorks}
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {content.lang === 'pt' ? 'Preços' : 'Pricing'}
          </a>
          <a
            href="#test"
            className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            onClick={() => setMobileOpen(false)}
          >
            {content.nav.test}
          </a>
          <Link
            href={content.nav.langSwitchHref}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {content.nav.langSwitch}
          </Link>
        </nav>
      </div>
    </header>
  )
}
