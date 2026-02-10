import type { Metadata } from "next"
import { pt } from "@/lib/content"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
  title: "Teste de Visibilidade IA - Sua empresa e visivel para a IA?",
  description:
    "Faca um teste rapido e gratuito para descobrir se o ChatGPT e ferramentas de busca com IA entendem e recomendam o seu site.",
}

export default function PtPage() {
  return <LandingPage content={pt} />
}
