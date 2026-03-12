import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(req: NextRequest) {

  const email = req.nextUrl.searchParams.get("email")

  if (!email) {
    return NextResponse.json({ allowed:false })
  }

  const { data } = await supabaseAdmin
    .from("payments")
    .select("status")
    .eq("customer_email", email)
    .single()

  if (!data) {
    return NextResponse.json({ allowed:false })
  }

  const allowedStatuses = [
    "paid",
    "onboarding_sent",
    "onboarding_completed",
    "ready_for_optimization"
  ]

  return NextResponse.json({
    allowed: allowedStatuses.includes(data.status)
  })
}