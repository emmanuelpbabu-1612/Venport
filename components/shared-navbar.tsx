'use client'

import CardNav from '@/components/CardNav'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

const logo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/venportai_LOGO%281%29-ITKmMO8b0ovmQOt6pCF3tzTv8XRcW8.png'

// Journal: re-add when the page exists
const navGroups = [
  {
    label: 'Platform',
    description: 'How Venport understands, classifies, validates and monitors trade information.',
    links: [
      { label: 'How it works', href: '/how-it-works#understand' },
      { label: 'Understand', href: '/how-it-works#understand' },
      { label: 'Classify', href: '/how-it-works#classify' },
      { label: 'Validate', href: '/how-it-works#validate' },
      { label: 'Monitor', href: '/how-it-works#monitor' },
    ],
  },
  {
    label: 'Capabilities',
    description: 'Explore the capabilities that make up the Venport platform.',
    links: [
      { label: 'Platform overview', href: '/#capabilities' },
      { label: 'Trade intelligence', href: '/#intelligence' },
    ],
  },
  {
    label: 'Company',
    description: 'Learn about Venport, the problem we are solving and the market we are building for.',
    links: [
      { label: 'About Venport', href: '/about' },
      { label: 'Industry', href: '/about#industry' },
      { label: 'Focus', href: '/about#focus' },
      { label: 'Initial market', href: '/about#market' },
      { label: 'The team', href: '/about#team' },
    ],
  },
  {
    label: 'Contact',
    description: 'Discuss a pilot, partnership or potential collaboration with Venport.',
    links: [
      { label: 'Request a pilot', href: '/#contact' },
      { label: 'Email Emmanuel', href: 'mailto:emmanuelpb@venport.in' },
      { label: 'Email Joel', href: 'mailto:joel@venport.in' },
    ],
  },
]

export function SharedNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [homeActive, setHomeActive] = useState('')

  useEffect(() => {
    if (pathname !== '/') {
      setHomeActive('')
      return
    }

    const sections = ['capabilities', 'intelligence'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      setHomeActive(visible?.target.id ?? '')
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0.1, 0.45, 0.8] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!menuOpen || !window.matchMedia('(max-width: 899px)').matches) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const activeGroup = useMemo(() => {
    if (pathname === '/how-it-works') return 'Platform'
    if (pathname === '/about') return 'Company'
    if (pathname === '/' && homeActive === 'capabilities') return 'Capabilities'
    if (pathname === '/' && homeActive === 'intelligence') return 'Capabilities'
    return ''
  }, [homeActive, pathname])

  const items = navGroups.map((group) => ({
    ...group,
    active: group.label === activeGroup,
  }))

  return <CardNav
    className="venport-card-nav"
    logo={logo}
    logoAlt="Venport"
    logoHref="/"
    items={items}
    cta={{ label: 'Request a Pilot ↗', href: '/#contact' }}
    cardEffect="rise"
    openOn="click"
    theme="dark"
    surface="solid"
    menuLabel
    maxWidth={1500}
    cardHeight={190}
    speed={1.35}
    open={menuOpen}
    onOpenChange={setMenuOpen}
    linkComponent={Link as unknown as 'a'}
    onLinkClick={() => setMenuOpen(false)}
    ariaLabel="Main navigation"
    accentColor={undefined}
    style={undefined}
  />
}
