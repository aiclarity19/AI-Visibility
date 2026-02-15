"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { pt } from "@/lib/content"
import { ResultsSection } from "@/components/sections/results-section"
import { SiteHeader } from "@/components/sections/site-header"
import { SiteFooter } from "@/components/sections/site-footer"

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem('aiVisibilityResult')
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
      } catch (e) {
        console.error('Failed to parse result:', e)
        router.push('/pt')
      }
    } else {
      // No result found, redirect to home
      router.push('/pt')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  return (
    <div className="min-h-screen">
      <SiteHeader content={pt} />
      <main>
        <ResultsSection result={result} content={pt} />
      </main>
      <SiteFooter content={pt} />
    </div>
  )
}

