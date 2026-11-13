import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'

const applicationSchema = z.object({
  source: z.enum(['hero', 'platform', 'contact', 'footer', 'direct']).catch('direct'),
  companyName: z.string().trim().min(2).max(160),
  website: z.string().trim().max(240).optional().or(z.literal('')),
  applicantName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(240),
  role: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(100),
  monthlyShipments: z.string().trim().min(1).max(80),
  products: z.string().trim().min(2).max(500),
  currentProcess: z.string().trim().min(10).max(3000),
  biggestChallenge: z.string().trim().min(10).max(3000),
  requestedOutcome: z.string().trim().min(10).max(3000),
  anythingElse: z.string().trim().max(3000).optional().or(z.literal('')),
  consent: z.literal(true),
})

function createReferenceId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase()
  return `VEN-${date}-${suffix}`
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'\"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;' })[character] ?? character)
}

export async function POST(request: Request) {
  try {
    const requestContentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
    if (requestContentType !== 'application/json') {
      return NextResponse.json({ error: 'Please submit the application as JSON.' }, { status: 415 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Please submit a valid application.' }, { status: 400 })
    }

    const parsed = applicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    const referenceId = createReferenceId()
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    )

    const { error: databaseError } = await supabase.from('venport_applications').insert({
      reference_id: referenceId,
      source: parsed.data.source,
      company_name: parsed.data.companyName,
      website: parsed.data.website || null,
      applicant_name: parsed.data.applicantName,
      email: parsed.data.email,
      role: parsed.data.role,
      country: parsed.data.country,
      monthly_shipments: parsed.data.monthlyShipments,
      products: parsed.data.products,
      current_process: parsed.data.currentProcess,
      biggest_challenge: parsed.data.biggestChallenge,
      requested_outcome: parsed.data.requestedOutcome,
      anything_else: parsed.data.anythingElse || null,
      consent: parsed.data.consent,
    })

    if (databaseError) {
      console.error('[v0] Application database insert failed:', databaseError.message)
      return NextResponse.json({ error: 'We could not save your application. Please try again.' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const from = process.env.RESEND_EMAIL_DOMAIN
      ? `Venport Applications <applications@${process.env.RESEND_EMAIL_DOMAIN}>`
      : 'Venport Applications <onboarding@resend.dev>'

    const internalEmail = resend.emails.send({
      from,
      to: ['emmanuelpb@venport.in'],
      subject: `New Venport application — ${referenceId}`,
      html: `<h2>New Venport application</h2><p><strong>Reference:</strong> ${escapeHtml(referenceId)}</p><p><strong>Company:</strong> ${escapeHtml(parsed.data.companyName)}</p><p><strong>Applicant:</strong> ${escapeHtml(parsed.data.applicantName)} (${escapeHtml(parsed.data.email)})</p><p><strong>Role:</strong> ${escapeHtml(parsed.data.role)}</p><p><strong>Country:</strong> ${escapeHtml(parsed.data.country)}</p><p><strong>Monthly shipments:</strong> ${escapeHtml(parsed.data.monthlyShipments)}</p><p><strong>Products:</strong> ${escapeHtml(parsed.data.products)}</p><p><strong>Current process:</strong> ${escapeHtml(parsed.data.currentProcess)}</p><p><strong>Biggest challenge:</strong> ${escapeHtml(parsed.data.biggestChallenge)}</p><p><strong>Requested outcome:</strong> ${escapeHtml(parsed.data.requestedOutcome)}</p><p><strong>Anything else:</strong> ${escapeHtml(parsed.data.anythingElse || '—')}</p>`, 
    })

    const applicantEmail = resend.emails.send({
      from,
      to: [parsed.data.email],
      subject: `We received your Venport application — ${referenceId}`,
      html: `<p>Hi ${escapeHtml(parsed.data.applicantName)},</p><p>Thank you for your interest in a Venport pilot. We have received your application for ${escapeHtml(parsed.data.companyName)}.</p><p>Your reference ID is <strong>${escapeHtml(referenceId)}</strong>.</p><p>We will review your information and get back to you at ${escapeHtml(parsed.data.email)}.</p><p>— The Venport team</p>`, 
    })

    const emailResults = await Promise.allSettled([internalEmail, applicantEmail])
    if (emailResults.some((result) => result.status === 'rejected')) {
      console.error('[v0] Application email notification failed:', emailResults)
    }

    return NextResponse.json({ referenceId })
  } catch (error) {
    console.error('[v0] Application submission failed:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
