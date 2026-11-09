'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const navigation = [
  { label: 'Platform', href: '/how-it-works', key: 'platform' },
  { label: 'Capabilities', href: '/#capabilities', key: 'capabilities' },
  { label: 'Intelligence', href: '/#intelligence', key: 'intelligence' },
  { label: 'Company', href: '/about', key: 'company' },
]
// Journal: re-add when the page exists

export function SharedNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [homeActive, setHomeActive] = useState<string>('')

  useEffect(() => {
    if (pathname !== '/') return
    const sections = ['capabilities', 'intelligence'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      setHomeActive(visible?.target.id ?? '')
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0.1, 0.45, 0.8] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const isActive = (key: string) => pathname === '/' ? homeActive === key : pathname === '/how-it-works' ? key === 'platform' : pathname === '/about' ? key === 'company' : false
  const closeMenu = () => setMenuOpen(false)

  return <>
    <header className="shared-navbar"><Link href="/" className="brand-lockup" onClick={closeMenu}><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/venportai_LOGO%281%29-ITKmMO8b0ovmQOt6pCF3tzTv8XRcW8.png" alt="" /><span className="wordmark">Venport</span></Link><nav className="shared-nav-links" aria-label="Main navigation">{navigation.map((item) => <Link key={item.key} href={item.href} className={isActive(item.key) ? 'is-active' : ''}>{item.label}</Link>)}</nav><div className="shared-nav-actions"><Link href="/#contact" onClick={closeMenu}>Contact</Link><Link href="/#contact" className="shared-pilot-link" onClick={closeMenu}>Request a Pilot <span>↗</span></Link><button type="button" className="shared-menu-button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}>Menu</button></div></header>
    {menuOpen && <div className="mobile-nav-overlay" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation"><div className="mobile-nav-top"><span className="wordmark">Venport</span><button type="button" className="mobile-nav-close" onClick={closeMenu} aria-label="Close navigation">Close ×</button></div><nav aria-label="Mobile navigation links">{navigation.map((item) => <Link key={item.key} href={item.href} className={isActive(item.key) ? 'is-active' : ''} onClick={closeMenu}><span>{item.label}</span><span>↗</span></Link>)}<Link href="/#contact" onClick={closeMenu}><span>Contact</span><span>↗</span></Link><Link href="/#contact" onClick={closeMenu}><span>Request a Pilot</span><span>↗</span></Link></nav></div>}
  </>
}
