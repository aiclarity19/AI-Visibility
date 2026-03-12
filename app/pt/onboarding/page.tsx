"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, AlertCircle, Globe, MapPin, Building2, Target, Phone, Instagram } from "lucide-react"
import { SiteHeader } from "@/components/sections/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { pt } from "@/lib/content"

function OnboardingForm() {

  const searchParams = useSearchParams()

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const email = searchParams.get('email') || ''
  const website = searchParams.get('website') || ''
  const sessionId = searchParams.get('session_id')

  const [formData, setFormData] = useState({
    business_name: '',
    website: website,
    products: '',
    target_customers: '',
    locations: '',
    service_type: '',
    primary_services: '',
    target_city: '',
    differentiation: '',
    certifications: '',
    keywords: '',
    google_business_link: '',
    instagram: '',
    phone: '',
    content_presence: '',
    ai_association_goal: '',
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

      setError(
        err instanceof Error
          ? err.message
          : 'Algo deu errado. Por favor, tente novamente.'
      )

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
              Obrigado por completar o formulário de onboarding. Vamos começar a análise da visibilidade de IA do seu negócio.
            </p>

            <p className="text-sm text-muted-foreground">
              Você receberá atualizações em 24–48 horas.
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
              Ajude-nos a entender seu negócio para estruturar sua visibilidade em IA
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

              {/* BUSINESS NAME */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Nome do Negócio
                </label>

                <input
                  type="text"
                  required
                  value={formData.business_name}
                  onChange={(e)=>setFormData({...formData,business_name:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="Nome do seu negócio"
                />
              </div>

              {/* WEBSITE */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Site
                </label>

                <input
                  type="text"
                  required
                  value={formData.website}
                  onChange={(e)=>setFormData({...formData,website:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="https://suaempresa.com.br"
                />
              </div>

              {/* PRODUCTS */}

              <div>
                <label className="text-sm font-medium">
                  Principais Produtos
                </label>

                <textarea
                  rows={3}
                  value={formData.products}
                  onChange={(e)=>setFormData({...formData,products:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="Bolos kosher, sobremesas para Shabbat..."
                />
              </div>

              {/* TARGET CUSTOMERS */}

              <div>
                <label className="text-sm font-medium">
                  Clientes Alvo
                </label>

                <textarea
                  rows={3}
                  value={formData.target_customers}
                  onChange={(e)=>setFormData({...formData,target_customers:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="Comunidade judaica, eventos, famílias..."
                />
              </div>

              {/* LOCATIONS */}

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground"/>
                  Cidade e Bairros Atendidos
                </label>

                <input
                  value={formData.locations}
                  onChange={(e)=>setFormData({...formData,locations:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="São Paulo – Higienópolis, Bom Retiro"
                />
              </div>

              {/* SERVICE TYPE */}

              <div>
                <label className="text-sm font-medium">
                  Tipo de Serviço
                </label>

                <input
                  value={formData.service_type}
                  onChange={(e)=>setFormData({...formData,service_type:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="Entrega, retirada, encomendas..."
                />
              </div>

              {/* KEYWORDS */}

              <div>
                <label className="text-sm font-medium">
                  Principais Palavras-chave
                </label>

                <input
                  value={formData.keywords}
                  onChange={(e)=>setFormData({...formData,keywords:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="sobremesas kosher São Paulo"
                />
              </div>

              {/* GOOGLE BUSINESS */}

              <div>
                <label className="text-sm font-medium">
                  Google Meu Negócio
                </label>

                <input
                  type="url"
                  value={formData.google_business_link}
                  onChange={(e)=>setFormData({...formData,google_business_link:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="Link do Google Maps"
                />
              </div>

              {/* INSTAGRAM */}

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground"/>
                  Instagram
                </label>

                <input
                  value={formData.instagram}
                  onChange={(e)=>setFormData({...formData,instagram:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="@seuinstagram"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground"/>
                  Telefone / WhatsApp
                </label>

                <input
                  value={formData.phone}
                  onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                  className="w-full rounded-xl border border-input px-4 py-3"
                  placeholder="+55..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02]"
              >
                {submitting ? "Enviando..." : "Enviar Formulário"}
              </button>

            </form>

          </div>

        </div>

      </main>

      <SiteFooter content={pt} />

    </div>

  )

}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <OnboardingForm />
    </Suspense>
  )
}