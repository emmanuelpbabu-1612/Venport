'use client'

import { useMemo, useState } from 'react'

const steps = [
  { number: '01', title: 'About you' },
  { number: '02', title: 'Your operations' },
  { number: '03', title: 'Your needs' },
]

const initialForm = {
  companyName: '', website: '', applicantName: '', email: '', role: '', country: '', monthlyShipments: '', products: '', currentProcess: '', biggestChallenge: '', requestedOutcome: '', anythingElse: '', consent: false,
}

type FormState = typeof initialForm

type Props = { source: 'hero' | 'platform' | 'contact' | 'footer' | 'direct' }

export function ApplicationForm({ source }: Props) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [referenceId, setReferenceId] = useState('')

  const progress = useMemo(() => `${((step + 1) / steps.length) * 100}%`, [step])
  const update = (key: keyof FormState, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }))
  const fieldClass = 'application-field'

  function validateCurrentStep() {
    const required = step === 0
      ? ['companyName', 'applicantName', 'email', 'role', 'country']
      : step === 1
        ? ['monthlyShipments', 'products', 'currentProcess']
        : ['biggestChallenge', 'requestedOutcome']
    const missing = required.some((key) => !String(form[key as keyof FormState]).trim())
    if (missing) {
      setError('Please complete the required fields before continuing.')
      return false
    }
    if (step === 0 && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return false
    }
    setError('')
    return true
  }

  function nextStep() {
    if (validateCurrentStep()) setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validateCurrentStep()) return
    if (!form.consent) {
      setError('Please confirm that you consent to Venport using these details to evaluate your pilot application.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, source }),
      })
      const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
      const isJsonResponse = contentType.includes('application/json') || /\+json(?:\s*;|$)/i.test(contentType)
      const responseText = await response.text()
      let result: { error?: unknown; referenceId?: unknown } | null = null

      if (isJsonResponse) {
        try {
          result = JSON.parse(responseText) as { error?: unknown; referenceId?: unknown }
        } catch {
          throw new Error('The application service returned invalid JSON. Please try again.')
        }
      }

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('This deployment requires authorization before an application can be submitted. Sign in to the authorized preview and try again.')
        }

        if (typeof result?.error === 'string') throw new Error(result.error)
        if (!isJsonResponse) {
          throw new Error(`Application submission failed (HTTP ${response.status}); the server returned ${contentType || 'an unknown content type'} instead of JSON.`)
        }
        throw new Error(`Application submission failed (HTTP ${response.status}). Please try again.`)
      }

      if (!isJsonResponse || typeof result?.referenceId !== 'string') {
        throw new Error('The application service returned an unexpected response. Please try again.')
      }

      setReferenceId(result.referenceId)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (referenceId) {
    return <div className="application-success"><span className="section-number">APPLICATION RECEIVED</span><h2>Thank you, {form.applicantName.split(' ')[0]}.</h2><p>We have received your Venport pilot application for {form.companyName}. We&apos;ll review the details and follow up at {form.email}.</p><div className="reference-card"><span>REFERENCE ID</span><strong>{referenceId}</strong></div><a className="arrow-link" href="/">Return to Venport <span>↗</span></a></div>
  }

  return <form className="application-form" onSubmit={submit} noValidate>
    <div className="application-progress"><div className="application-progress-bar" style={{ width: progress }} /></div>
    <div className="application-stepper">{steps.map((item, index) => <button type="button" key={item.number} className={index === step ? 'is-current' : index < step ? 'is-complete' : ''} onClick={() => index < step && setStep(index)}><span>{item.number}</span>{item.title}</button>)}</div>
    {step === 0 && <fieldset><legend>Tell us about you</legend><p className="form-intro">Start with the basics. We&apos;ll use this to understand who we&apos;re speaking with.</p><div className="form-grid"><label className={fieldClass}>Company name *<input value={form.companyName} onChange={(event) => update('companyName', event.target.value)} autoComplete="organization" /></label><label className={fieldClass}>Website <input value={form.website} onChange={(event) => update('website', event.target.value)} inputMode="url" placeholder="https://" /></label><label className={fieldClass}>Your name *<input value={form.applicantName} onChange={(event) => update('applicantName', event.target.value)} autoComplete="name" /></label><label className={fieldClass}>Work email *<input value={form.email} onChange={(event) => update('email', event.target.value)} type="email" autoComplete="email" /></label><label className={fieldClass}>Your role *<input value={form.role} onChange={(event) => update('role', event.target.value)} /></label><label className={fieldClass}>Country / region *<input value={form.country} onChange={(event) => update('country', event.target.value)} autoComplete="country-name" /></label></div></fieldset>}
    {step === 1 && <fieldset><legend>Understand your operations</legend><p className="form-intro">A little context helps us shape a useful pilot for your team.</p><div className="form-grid"><label className={fieldClass}>Monthly shipments *<select value={form.monthlyShipments} onChange={(event) => update('monthlyShipments', event.target.value)}><option value="">Select volume</option><option>Under 100</option><option>100–500</option><option>500–2,000</option><option>2,000–10,000</option><option>10,000+</option></select></label><label className={fieldClass}>Primary products / categories *<input value={form.products} onChange={(event) => update('products', event.target.value)} placeholder="e.g. electronics, textiles" /></label><label className={`${fieldClass} field-wide`}>How does your current process work? *<textarea value={form.currentProcess} onChange={(event) => update('currentProcess', event.target.value)} rows={5} placeholder="Tell us about the tools, teams or workflows involved." /></label></div></fieldset>}
    {step === 2 && <fieldset><legend>Define the opportunity</legend><p className="form-intro">Help us focus the conversation on the outcome that matters most.</p><label className={fieldClass}>What is your biggest challenge today? *<textarea value={form.biggestChallenge} onChange={(event) => update('biggestChallenge', event.target.value)} rows={5} /></label><label className={fieldClass}>What would a successful pilot help you achieve? *<textarea value={form.requestedOutcome} onChange={(event) => update('requestedOutcome', event.target.value)} rows={5} /></label><label className={fieldClass}>Anything else you&apos;d like us to know <textarea value={form.anythingElse} onChange={(event) => update('anythingElse', event.target.value)} rows={4} /></label><label className="consent-field"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} /> <span>I consent to Venport using the information I provide to evaluate and contact me about this pilot application. *</span></label></fieldset>}
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions">{step > 0 && <button type="button" className="text-button" onClick={() => { setError(''); setStep((current) => current - 1) }}>Back</button>}{step < steps.length - 1 ? <button type="button" className="form-submit" onClick={nextStep}>Continue <span>→</span></button> : <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit application'} <span>↗</span></button>}</div>
  </form>
}
