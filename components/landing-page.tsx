"use client"

import type { LangContent } from "@/lib/content"
import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { FormSection } from "@/components/sections/form-section"
import { ReceiveSection } from "@/components/sections/receive"
import { PricingSection } from "@/components/sections/pricing-section"
import { AuditSection } from "@/components/sections/audit"
import { FinalCtaSection } from "@/components/sections/final-cta"
import { SiteHeader } from "@/components/sections/site-header"
import { SiteFooter } from "@/components/sections/site-footer"

export function LandingPage({ content }: { content: LangContent }) {
  return (
    <div className="min-h-screen">
      <SiteHeader content={content} />
      <main>
        <HeroSection content={content} />
        <ProblemSection content={content} />
        <HowItWorksSection content={content} />
        <FormSection content={content} />
        <ReceiveSection content={content} />
        <PricingSection content={content} />
        <AuditSection content={content} />
        <FinalCtaSection content={content} />
      </main>
      <SiteFooter content={content} />
    </div>
  )
}
