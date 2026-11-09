import { ApplicationForm } from '@/components/application-form'

type SearchParams = Promise<{ source?: string }>

export default async function ApplyPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const source = ['hero', 'platform', 'contact', 'footer'].includes(params.source || '')
    ? (params.source as 'hero' | 'platform' | 'contact' | 'footer')
    : 'direct'

  return <main className="application-page"><header className="application-header"><a className="brand-lockup" href="/"><span className="wordmark">Venport</span></a><a className="application-back" href="/">← Back to site</a></header><section className="application-hero"><span className="section-number">VENPORT / PILOT APPLICATION</span><h1>Let&apos;s understand what you&apos;re building.</h1><p>Tell us about your trade operations and the opportunity you see. This isn&apos;t a generic contact form. Your answers help us understand whether Venport can become a useful part of your workflow.</p></section><section className="application-body"><div className="application-aside"><span className="section-number">A CONVERSATION, NOT A CHECKLIST</span><p>We&apos;re speaking with a small number of forward-thinking trade teams as we develop the platform.</p><p>There are no obligations. We&apos;ll review your context, follow up with any questions, and suggest a focused next step if there&apos;s a fit.</p><a href="mailto:emmanuelpb@venport.in" className="arrow-link">Ask us a question <span>↗</span></a></div><ApplicationForm source={source} /></section></main>
}
