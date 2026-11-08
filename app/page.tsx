const updates = [
  { image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=600&q=80', label: 'TRADE INTELLIGENCE', title: 'Beyond Documentation' },
  { image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', label: 'CUSTOMS', title: 'The Classification Challenge' },
  { image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80', label: 'OPERATIONS', title: 'Connected Trade Operations' },
  { image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', label: 'REGULATORY INTELLIGENCE', title: 'The Future of Customs Intelligence' },
]

const products = ['Document Intelligence', 'HSN Intelligence', 'Compliance Workflows', 'Trade Monitoring', 'Operational Intelligence', 'Human-in-the-loop Operations']

export default function Page() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#top" className="wordmark">Venport</a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#products">Platform</a><a href="#capabilities">Capabilities</a><a href="#intelligence">Intelligence</a><a href="#company">Company</a><a href="#updates">Journal</a>
        </nav>
        <div className="header-actions"><a href="#contact">Contact</a><a href="#contact">Request a Pilot</a><span className="menu-mark">↗</span></div>
      </header>

      <section id="top" className="hero">
        <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1800&q=85" alt="People collaborating in a sunlit modern workspace" />
        <div className="hero-shade" />
        <div className="hero-content"><p className="eyebrow">VENPORT / TRADE INTELLIGENCE</p><h1>Intelligence for the world&apos;s trade operations.</h1><p className="hero-subtitle">Making customs compliance, trade documentation and regulatory operations more intelligent, precise and connected.</p><div className="hero-meta"><span>Explore the platform</span><span>Request a Pilot ↗</span></div></div>
      </section>

      <section id="capabilities" className="intro section-rule"><div className="intro-lead"><span className="section-number">01</span><h2>Trade intelligence, built for operational precision.</h2></div><div className="intro-copy"><p>International trade moves through an interconnected system of documentation, classifications, regulations and decisions. Venport is building an intelligent platform that brings these operations together.</p><p>From document understanding and HSN classification to validation and regulatory intelligence, Venport is designed to help trade professionals navigate complexity with greater clarity.</p><a className="arrow-link" href="#intelligence">Explore capabilities <span>↗</span></a></div></section>

      <section id="intelligence" className="model-section"><div className="model-visual" aria-label="Trade intelligence visualization showing document processing, classification confidence and validation signals">{Array.from({ length: 10 }).map((_, index) => <div className="model-line" key={index}><i style={{ width: `${35 + ((index * 17) % 52)}%` }} /><b style={{ width: `${20 + ((index * 11) % 50)}%` }} /></div>)}</div><div className="model-copy"><span className="section-number">02 / INTELLIGENCE</span><h2>HSN Intelligence</h2><p>Our current working capability assists trade professionals with structured product information and HSN classification.</p><a className="arrow-link" href="#products">Explore the platform <span>↗</span></a></div></section>

      <section id="updates" className="updates section-rule"><div className="section-heading"><span className="section-number">03</span><h2>Trade intelligence</h2><a className="arrow-link" href="#contact">View all <span>↗</span></a></div><div className="update-grid">{updates.map((item) => <article className="update-card" key={item.title}><div className="update-image"><img src={item.image} alt="" /></div><p className="card-label">{item.label}</p><h3>{item.title}</h3><p className="card-date">May 13, 2024</p></article>)}</div></section>

      <section id="safety" className="safety section-rule"><div className="split-heading"><span className="section-number">04</span><h2>Compliance is not an afterthought.</h2></div><div className="split-copy"><p>International trade operates within complex regulatory frameworks. Every classification, document and declaration carries operational significance.</p><p>Venport is being developed with a compliance-first approach, combining structured workflows, document intelligence and regulatory awareness to support trade professionals.</p><a className="arrow-link" href="#company">Our approach <span>↗</span></a></div><img className="wide-photo" src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=85" alt="Trade professionals reviewing documentation together" /></section>

      <section id="research" className="research section-rule"><div className="research-title"><span className="section-number">05</span><h2>Built around the complexity of trade.</h2></div><div className="research-content"><p>International trade is not a single transaction. It is a continuous chain of documents, classifications, declarations, regulatory requirements and operational decisions.</p><p>Venport is developing an intelligent layer that helps bring these moving parts into a more connected workflow.</p><div className="research-list"><a href="#">01 — Understand <span>↗</span></a><a href="#">02 — Classify <span>↗</span></a><a href="#">03 — Validate <span>↗</span></a><a href="#">04 — Monitor <span>↗</span></a></div></div></section>

      <section id="products" className="products section-rule"><div className="section-heading"><span className="section-number">06</span><h2>The Venport platform.</h2></div><div className="product-list">{products.map((product, index) => <a href="#contact" className="product-row" key={product}><span>0{index + 1}</span><strong>{product}</strong><small>Explore capability <span>↗</span></small></a>)}</div></section>

      <section id="company" className="company section-rule"><div className="company-title"><span className="section-number">07</span><h2>About Venport.</h2></div><div className="company-copy"><p>Venport is building an intelligent infrastructure layer for international trade.</p><p>We are focused on the operational complexity behind global commerce: customs documentation, product classification, regulatory requirements and the systems that connect them.</p><div className="company-links"><a href="#">Industry: Trade Technology <span>↗</span></a><a href="#">Focus: Customs Compliance <span>↗</span></a><a href="#">Initial Market: India <span>↗</span></a></div></div></section>

      <section className="quote"><blockquote>&quot;International trade should not be held back by the complexity of the systems that support it. We believe intelligence can make those systems more connected, transparent and accessible.&quot;</blockquote><cite>— The Venport founding team</cite></section>

      <section id="careers" className="cta section-rule"><h2>Let&apos;s make international trade more intelligent.</h2><p className="cta-support">Building the next layer of intelligence for customs, compliance and global trade operations.</p><a href="#contact" className="cta-link">Talk to Venport <span>↗</span></a></section>

      <footer id="contact" className="site-footer"><div className="footer-top"><div><span className="wordmark">Venport</span><p className="footer-description">Intelligence for international trade.</p></div><div className="footer-links"><div><span>PLATFORM</span><a href="#products">Overview</a><a href="#products">Document Intelligence</a><a href="#products">HSN Intelligence</a><a href="#products">Compliance Workflows</a></div><div><span>COMPANY</span><a href="#company">About Venport</a><a href="#safety">Our Approach</a><a href="#updates">Journal</a><a href="#contact">Contact</a></div><div><span>CONNECT</span><a href="#contact">LinkedIn</a><a href="#contact">Email</a><a href="#contact">Request a Pilot</a></div></div></div><div className="footer-bottom"><span>© 2026 Venport. All rights reserved.</span><span>Privacy Policy · Terms of Use</span><a href="#top">Back to top ↑</a></div><div className="stripes" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} />)}</div></footer>
    </main>
  )
}

