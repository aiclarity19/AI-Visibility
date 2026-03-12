"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, AlertCircle, Globe, MapPin, Building2, Phone, Instagram } from "lucide-react"
import { SiteHeader } from "@/components/sections/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { en } from "@/lib/content"

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
      console.log("Payment successful session:", sessionId)
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
          email: email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit onboarding form")
      }

      setSubmitted(true)

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
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

        <SiteHeader content={en} />

        <main className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-md w-full text-center">

            <div className="relative flex h-20 w-20 items-center justify-center mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              Onboarding Complete
            </h2>

            <p className="text-muted-foreground mb-6">
              Thank you for submitting your business details. We will now begin analyzing your AI visibility.
            </p>

          </div>
        </main>

        <SiteFooter content={en} />

      </div>
    )
  }

  return (
    <div className="min-h-screen">

      <SiteHeader content={en} />

      <main className="py-16 sm:py-24 px-4">

        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Complete Your Onboarding
            </h1>
            <p className="text-muted-foreground">
              Provide a few details so we can structure your AI visibility optimization.
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
<label className="mb-2 text-sm font-medium flex items-center gap-2">
<Building2 className="h-4 w-4 text-muted-foreground"/>
Business Name
</label>

<input
type="text"
required
value={formData.business_name}
onChange={(e)=>setFormData({...formData,business_name:e.target.value})}
placeholder="Your business name"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* WEBSITE */}

<div>
<label className="mb-2 text-sm font-medium flex items-center gap-2">
<Globe className="h-4 w-4 text-muted-foreground"/>
Website
</label>

<input
type="text"
required
value={formData.website}
onChange={(e)=>setFormData({...formData,website:e.target.value})}
placeholder="https://yourbusiness.com"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* PRODUCTS */}

<div>
<label className="mb-2 text-sm font-medium">
Main Products Offered
</label>

<textarea
rows={3}
value={formData.products}
onChange={(e)=>setFormData({...formData,products:e.target.value})}
placeholder="Example: kosher cakes, Shabbat desserts, custom sweets"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* BUSINESS DIFFERENTIATOR */}

<div>
<label className="mb-2 text-sm font-medium">
What makes your business unique?
</label>

<textarea
rows={3}
value={formData.differentiator}
onChange={(e)=>setFormData({...formData,differentiator:e.target.value})}
placeholder="Example: artisanal production, certified kosher desserts, delivery before Shabbat, premium ingredients"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* MAIN SERVICES / CATEGORIES */}

<div>
<label className="mb-2 text-sm font-medium">
Main services or product categories
</label>

<textarea
rows={3}
value={formData.service_categories}
onChange={(e)=>setFormData({...formData,service_categories:e.target.value})}
placeholder="• Kosher cakes
• Shabbat desserts
• Catering for Jewish events
• Custom desserts"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* SERVICE AREA */}

<div>
<label className="mb-2 text-sm font-medium flex items-center gap-2">
<MapPin className="h-4 w-4 text-muted-foreground"/>
Service area / delivery area
</label>

<input
value={formData.service_area}
onChange={(e)=>setFormData({...formData,service_area:e.target.value})}
placeholder="São Paulo (Higienópolis, Jardins, Bom Retiro), delivery available"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* FAQ */}

<div>
<label className="mb-2 text-sm font-medium">
Common questions customers ask
</label>

<textarea
rows={4}
value={formData.faqs}
onChange={(e)=>setFormData({...formData,faqs:e.target.value})}
placeholder="Example:
• Are your products certified kosher?
• Do you deliver before Shabbat?
• Do you accept event orders?"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* COMPETITORS */}

<div>
<label className="mb-2 text-sm font-medium">
Main competitors (optional)
</label>

<input
value={formData.competitors}
onChange={(e)=>setFormData({...formData,competitors:e.target.value})}
placeholder="Example: Store A, Bakery B"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* YEAR FOUNDED */}

<div>
<label className="mb-2 text-sm font-medium">
Year business was founded
</label>

<input
value={formData.year_founded}
onChange={(e)=>setFormData({...formData,year_founded:e.target.value})}
placeholder="Example: 2018"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* KEYWORDS */}

<div>
<label className="mb-2 text-sm font-medium">
Main keywords customers search
</label>

<input
value={formData.keywords}
onChange={(e)=>setFormData({...formData,keywords:e.target.value})}
placeholder="Example: kosher desserts São Paulo, kosher cakes SP"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* GOOGLE BUSINESS */}

<div>
<label className="mb-2 text-sm font-medium">
Google Business Profile
</label>

<input
type="url"
value={formData.google_business_link}
onChange={(e)=>setFormData({...formData,google_business_link:e.target.value})}
placeholder="Google Maps or Google Business listing link"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* INSTAGRAM */}

<div>
<label className="mb-2 text-sm font-medium flex items-center gap-2">
<Instagram className="h-4 w-4 text-muted-foreground"/>
Instagram
</label>

<input
value={formData.instagram}
onChange={(e)=>setFormData({...formData,instagram:e.target.value})}
placeholder="Instagram profile link"
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

{/* PHONE */}

<div>
<label className="mb-2 text-sm font-medium flex items-center gap-2">
<Phone className="h-4 w-4 text-muted-foreground"/>
Phone / WhatsApp
</label>

<input
value={formData.phone}
onChange={(e)=>setFormData({...formData,phone:e.target.value})}
placeholder="+55..."
className="w-full rounded-xl border border-input px-4 py-3"
/>
</div>

<button
type="submit"
disabled={submitting}
className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02]"
>
{submitting ? "Submitting..." : "Submit Onboarding Form"}
</button>

</form>
          </div>

        </div>

      </main>

      <SiteFooter content={en} />

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