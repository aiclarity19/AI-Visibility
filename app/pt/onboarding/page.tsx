"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, AlertCircle, Globe, MapPin, Building2, Target } from "lucide-react"
import { SiteHeader } from "@/components/sections/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { pt } from "@/lib/content"

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const email = searchParams.get('email') || ''
  const website = searchParams.get('website') || ''
  const sessionId = searchParams.get('session_id')

  const [formData, setFormData] = useState({
    website: website,
    primary_services: '',
    target_city: '',
    competitors: '',
  })

  useEffect(() => {
    if (sessionId) {
      console.log('Pagamento bem-sucedido, sessão:', sessionId)
    }
  }, [sessionId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao enviar formulário de onboarding')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Por favor, tente novamente.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <SiteHeader content={pt} />
        <main className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-md w-full text-center">
            <div className="relative flex h-20 w-20 items-center justify-center mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Onboarding Completo!
            </h2>
            <p className="text-muted-foreground mb-6">
              Obrigado por completar o formulário de onboarding. Vamos revisar suas informações e começar seu plano de otimização de visibilidade IA.
            </p>
            <p className="text-sm text-muted-foreground">
              Você receberá um email com os próximos passos em 24-48 horas.
            </p>
          </div>
        </main>
        <SiteFooter content={pt} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <SiteHeader content={pt} />
      <main className="py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Complete Seu Onboarding
            </h1>
            <p className="text-muted-foreground">
              Ajude-nos a entender seu negócio para criar um plano de otimização personalizado
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800 mb-6">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="website" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Site
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  required
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://suaempresa.com.br"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div>
                <label htmlFor="primary_services" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Serviços Principais
                </label>
                <textarea
                  id="primary_services"
                  name="primary_services"
                  required
                  value={formData.primary_services}
                  onChange={(e) => setFormData({ ...formData, primary_services: e.target.value })}
                  placeholder="Descreva seus principais produtos ou serviços..."
                  rows={4}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none"
                />
              </div>

              <div>
                <label htmlFor="target_city" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Cidade Alvo
                </label>
                <input
                  id="target_city"
                  name="target_city"
                  type="text"
                  required
                  value={formData.target_city}
                  onChange={(e) => setFormData({ ...formData, target_city: e.target.value })}
                  placeholder="ex: São Paulo, SP"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div>
                <label htmlFor="competitors" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  Concorrentes (Opcional)
                </label>
                <input
                  id="competitors"
                  name="competitors"
                  type="text"
                  value={formData.competitors}
                  onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                  placeholder="Liste os principais concorrentes, se houver"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Enviando...
                  </span>
                ) : (
                  'Enviar Formulário de Onboarding'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter content={pt} />
    </div>
  )
}

