import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <AnimatedContent as="footer" stagger={0.08} animateOpacity={false} id="contact" className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__brand-link" aria-label="Venport home">
            <img className="site-footer__logo" src="/images/venport-mark-white.png" data-image-hover="off" alt="" aria-hidden="true" />
            <span className="site-footer__wordmark-text">Venport</span>
          </Link>
          <span className="site-footer__brand-divider" aria-hidden="true" />
          <p className="site-footer__tagline">Intelligence for international trade.</p>
        </div>

        <div className="site-footer__links">
          <nav className="site-footer__column" aria-label="Footer: Platform">
            <h2>Platform</h2>
            <Link href="/how-it-works">Overview</Link>
            <Link href="/#capabilities">Document Intelligence</Link>
            <Link href="/#capabilities">HSN Intelligence</Link>
            <Link href="/#capabilities">Compliance Workflows</Link>
          </nav>

          <nav className="site-footer__column" aria-label="Footer: Company">
            <h2>Company</h2>
            <Link href="/about">About Venport</Link>
            <Link href="/how-it-works">Our Approach</Link>
          </nav>

          <nav className="site-footer__column site-footer__contact" aria-label="Footer: Contact">
            <h2>Contact</h2>
            <a className="site-footer__email" href="mailto:emmanuelpb@venport.in">emmanuelpb@venport.in</a>
            <a className="site-footer__email" href="mailto:joel@venport.in">joel@venport.in</a>
            <Link href="/#contact">Request a Pilot ↗</Link>
            <span className="site-footer__location">Kerala, India</span>
          </nav>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span className="site-footer__copyright">© 2026 Venport. All rights reserved.</span>
        <div className="site-footer__bottom-group">
          <div className="site-footer__legal" role="group" aria-label="Legal information">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>

      <div className="site-footer__wordmark">
        <span className="sr-only">Venport</span>
        <span className="site-footer__wordmark-display" aria-hidden="true">Venport</span>
      </div>
    </AnimatedContent>
  )
}
