"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, AlertCircle, Globe, MapPin, Building2, Phone, Instagram } from "lucide-react"
import { SiteHeader } from "@/components/sections/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { pt } from "@/lib/content"

function OnboardingForm() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  const email = searchParams.get("email") || ""
  const website = searchParams.get("website") || ""
  const sessionId = searchParams.get("session_id")

  const [formData, setFormData] = useState({
    business_name: "",
    website: website,
    products: "",
    service_categories: "",
    service_area: "",
    differentiator: "",
    faqs: "",
    competitors: "",
    year_founded: "",
    keywords: "",
    google_business_link: "",
    instagram: "",
    phone: ""
  })

  useEffect(() => {
    if (sessionId) {
      console.log("Pagamento bem-sucedido:", sessionId)
    }
  }, [sessionId])

  useEffect(() => {

    async function verifyAccess() {

      if (!email) {
        setAuthorized(false)
        router.push("/")
        return
      }

      try {

        const res = await fetch(`/api/verify-onboarding?email=${email}`)
        const data = await res.json()

        if (data.allowed) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
          router.push("/")
        }

      } catch (error) {
        console.error(error)
        setAuthorized(false)
        router.push("/")
      }
    }

    verifyAccess()

  }, [email, router])


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar formulário")
      }

      setSubmitted(true)

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Algo deu errado. Tente novamente."
      )

      setSubmitting(false)

    }
  }

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen">

        <SiteHeader content={pt} />

        <main className="flex items-center justify-center min-h-[60vh] px-4">

          <div className="max-w-md text-center">

            <div className="relative flex h-20 w-20 items-center justify-center mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20"/>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8"/>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Onboarding Completo!
            </h2>

            <p className="text-muted-foreground">
              Obrigado por enviar as informações do seu negócio.
              Agora iniciaremos a análise de visibilidade em IA.
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
            <h1 className="text-3xl font-bold mb-2">
              Complete seu Onboarding
            </h1>
            <p className="text-muted-foreground">
              Ajude-nos a estruturar a visibilidade do seu negócio para IA
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-lg">

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800 mb-6">
                <AlertCircle className="h-4 w-4"/>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* BUSINESS NAME */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Building2 className="h-4 w-4 text-muted-foreground"/>
                  Nome do Negócio
                </label>

                <input
                  value={formData.business_name}
                  onChange={(e)=>setFormData({...formData,business_name:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* WEBSITE */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Globe className="h-4 w-4 text-muted-foreground"/>
                  Website
                </label>

                <input
                  value={formData.website}
                  onChange={(e)=>setFormData({...formData,website:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* PRODUCTS */}

              <div>
                <label className="text-sm font-medium">
                  Produtos Principais
                </label>

                <textarea
                  rows={3}
                  value={formData.products}
                  onChange={(e)=>setFormData({...formData,products:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* DIFFERENTIATOR */}

              <div>
                <label className="text-sm font-medium">
                  Diferencial do negócio
                </label>

                <textarea
                  rows={3}
                  value={formData.differentiator}
                  onChange={(e)=>setFormData({...formData,differentiator:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* SERVICE AREA */}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-muted-foreground"/>
                  Área de entrega
                </label>

                <input
                  value={formData.service_area}
                  onChange={(e)=>setFormData({...formData,service_area:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* INSTAGRAM */}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Instagram className="h-4 w-4 text-muted-foreground"/>
                  Instagram
                </label>

                <input
                  value={formData.instagram}
                  onChange={(e)=>setFormData({...formData,instagram:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4 text-muted-foreground"/>
                  Telefone / WhatsApp
                </label>

                <input
                  value={formData.phone}
                  onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
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