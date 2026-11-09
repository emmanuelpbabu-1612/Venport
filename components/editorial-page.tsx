'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { SharedNavbar } from '@/components/shared-navbar'

export type Section = {
  id: string
  number: string
  label: string
  title: string
  lead: string
  glance: [string, string][]
  bodyTitle: string
  bodyRows: [string, string][]
  noteLabel: string
  note: string
  status?: 'Prototype' | 'In development'
  input?: string
  output?: string
}

type EditorialPageProps = {
  kind: 'about' | 'workflow'
  title: string
  eyebrow: string
  intro: string
  status: string
  sections: Section[]
  closingTitle: string
  closingText: string
  extraContent?: ReactNode
}

export function EditorialPage({ kind, title, eyebrow, intro, status, sections, closingTitle, closingText, extraContent }: EditorialPageProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const elements = sections.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[]
    const initialHash = window.location.hash.slice(1)
    let navigatingToHash = Boolean(initialHash && sections.some((section) => section.id === initialHash))
    if (navigatingToHash) setActive(initialHash)
    const releaseHashLock = window.setTimeout(() => { navigatingToHash = false }, 700)
    const observer = new IntersectionObserver((entries) => {
      if (navigatingToHash) return
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) {
        const id = visible.target.id
        setActive(id)
        window.history.replaceState(null, '', `#${id}`)
      }
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.1, 0.4, 0.8] })
    elements.forEach((element) => observer.observe(element))
    return () => { window.clearTimeout(releaseHashLock); observer.disconnect() }
  }, [sections])

  return <main className="editorial-page">
    <SharedNavbar />
    <section className="editorial-hero"><div><span className="section-number">{eyebrow}</span><h1>{title}</h1></div><div className="editorial-hero-copy"><p>{intro}</p><span className="editorial-status">{status}</span></div></section>
    <nav className="editorial-index" aria-label={`${kind === 'about' ? 'About' : 'Workflow'} sections`}><div className="editorial-index-inner">{sections.map((section) => <a key={section.id} className={active === section.id ? 'is-active' : ''} href={`#${section.id}`} onClick={() => setActive(section.id)}><span>{section.number}</span>{section.label}</a>)}</div></nav>
    <div className="editorial-sections">{sections.map((section) => <article className="editorial-section" id={section.id} key={section.id}><div className="editorial-section-top"><span>{section.number} / {section.label}</span>{section.status && <span className="editorial-tag">{section.status}</span>}</div><div className="editorial-section-heading"><h2>{section.title}</h2><p>{section.lead}</p></div><div className="editorial-glance"><span>At a glance</span><div>{section.glance.map(([label, value]) => <div className="editorial-table-row" key={label}><b>{label}</b><span>{value}</span></div>)}</div></div><div className="editorial-body"><h3>{section.bodyTitle}</h3><div>{section.bodyRows.map(([label, text]) => <div className="editorial-body-row" key={label}><b>{label}</b><span>{text}</span></div>)}</div></div>{section.input && section.output && <div className="editorial-io"><span className="editorial-io-title">Input → Output</span><div className="editorial-io-strip"><div><small>Input</small><strong>{section.input}</strong></div><span className="editorial-io-arrow">→</span><div><small>Output</small><strong>{section.output}</strong></div></div></div>}<p className="editorial-note"><b>{section.noteLabel}</b>{section.note}</p></article>)}</div>{extraContent}
    <section className="editorial-closing"><h2>{closingTitle}</h2><p>{closingText}</p><div className="editorial-actions"><Link href="/apply?source=contact" className="editorial-primary">Request early access <span>↗</span></Link><Link href={kind === 'about' ? '/how-it-works' : '/#products'} className="arrow-link">{kind === 'about' ? 'How it works' : 'Back to the platform'} <span>↗</span></Link><Link href="/" className="arrow-link">Back to home <span>↗</span></Link></div></section>
    <footer className="editorial-footer"><span>© 2026 Venport. All rights reserved.</span><Link href="/">Back to home ↑</Link></footer>
  </main>
}
