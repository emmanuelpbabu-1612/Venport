import AnimatedContent from '@/components/AnimatedContent'
import Link from 'next/link'
import { FooterBands } from '@/components/footer-bands'

export function SiteFooter() {
  return (
    <AnimatedContent as="footer" stagger={0.08} id="contact" className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="brand-lockup" aria-label="Venport home">
            <img className="brand-logo" src="/images/venport-logo-original.png" data-image-hover="off" alt="" aria-hidden="true" />
            <span className="wordmark">Venport</span>
          </Link>
          <p className="footer-description">Intelligence for international trade.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <div role="group" aria-label="Platform">
            <span>PLATFORM</span>
            <Link href="/how-it-works">Overview</Link>
            <Link href="/#capabilities">Document Intelligence</Link>
            <Link href="/#capabilities">HSN Intelligence</Link>
            <Link href="/#capabilities">Compliance Workflows</Link>
          </div>

          <div role="group" aria-label="Company">
            <span>COMPANY</span>
            <Link href="/about">About Venport</Link>
            <Link href="/how-it-works">Our Approach</Link>
          </div>

          <div role="group" aria-label="Contact">
            <span>CONTACT</span>
            <a href="mailto:emmanuelpb@venport.in">emmanuelpb@venport.in</a>
            <a href="mailto:joel@venport.in">joel@venport.in</a>
            <Link href="/#contact">Request a Pilot ↗</Link>
            <p className="footer-location">Kerala, India</p>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Venport. All rights reserved.</span>
        <span>Privacy Policy · Terms of Use</span>
        <Link href="/#top">Back to top ↑</Link>
      </div>

      <FooterBands />
    </AnimatedContent>
  )
}
