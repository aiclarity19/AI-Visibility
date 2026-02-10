import type { Metadata } from "next"
import { en } from "@/lib/content"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
  title: "AI Visibility Test - Is Your Business Visible to AI?",
  description:
    "Run a free AI Visibility Test to see if ChatGPT and AI-powered search tools understand and can recommend your website.",
}

export default function EnPage() {
  return <LandingPage content={en} />
}
