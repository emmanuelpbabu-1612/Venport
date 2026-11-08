const updates = [
  { image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80', label: 'RESEARCH', title: 'Learning from the natural world' },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', label: 'PRODUCT', title: 'A new generation of intelligence' },
  { image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80', label: 'SAFETY', title: 'Building systems we can trust' },
  { image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80', label: 'NEWS', title: 'Exploring what comes next' },
]

const products = ['ChatGPT', 'Sora', 'API Platform', 'Research', 'OpenAI for business']

export default function Page() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a href="#top" className="wordmark">openai</a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#research">Research</a><a href="#products">Products</a><a href="#safety">Safety</a><a href="#company">Company</a>
        </nav>
        <div className="header-actions"><a href="#careers">Careers</a><a href="#contact">Contact</a><span className="menu-mark">↗</span></div>
      </header>

      <section id="top" className="hero">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85" alt="People collaborating in a sunlit modern workspace" />
        <div className="hero-shade" />
        <div className="hero-content"><p className="eyebrow">OPENAI / 2024</p><h1>Introducing GPT-4o, OpenAI&apos;s newest and most advanced model.</h1><div className="hero-meta"><span>Read the announcement</span><span>↗</span></div></div>
      </section>

      <section className="intro section-rule"><div className="intro-lead"><span className="section-number">01</span><h2>Creating safe AGI that benefits all of humanity.</h2></div><div className="intro-copy"><p>OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.</p><a className="arrow-link" href="#research">Learn more <span>↗</span></a></div></section>

      <section className="model-section"><div className="model-visual" aria-label="Abstract magenta and green model visualization">{Array.from({ length: 10 }).map((_, index) => <div className="model-line" key={index}><i style={{ width: `${35 + ((index * 17) % 52)}%` }} /><b style={{ width: `${20 + ((index * 11) % 50)}%` }} /></div>)}</div><div className="model-copy"><span className="section-number">02 / MODELS</span><h2>ChatGPT</h2><p>Our most capable model understands text, audio, image and video in real time.</p><a className="arrow-link" href="#products">Explore ChatGPT <span>↗</span></a></div></section>

      <section className="updates section-rule"><div className="section-heading"><span className="section-number">03</span><h2>Latest updates</h2><a className="arrow-link" href="#news">View all <span>↗</span></a></div><div className="update-grid">{updates.map((item) => <article className="update-card" key={item.title}><div className="update-image"><img src={item.image} alt="" /></div><p className="card-label">{item.label}</p><h3>{item.title}</h3><p className="card-date">May 13, 2024</p></article>)}</div></section>

      <section id="safety" className="safety section-rule"><div className="split-heading"><span className="section-number">04</span><h2>Safety is a responsibility</h2></div><div className="split-copy"><p>We are committed to developing AI that is safe, beneficial, and aligned with the values of the people it serves.</p><a className="arrow-link" href="#company">Our approach <span>↗</span></a></div><img className="wide-photo" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85" alt="Two people working together at a table surrounded by plants" /></section>

      <section id="research" className="research section-rule"><div className="research-title"><span className="section-number">05</span><h2>Research</h2></div><div className="research-content"><p>We believe the best way to predict the future is to create it. Our research spans language, vision, robotics and beyond.</p><div className="research-list"><a href="#">Learning <span>↗</span></a><a href="#">Science <span>↗</span></a><a href="#">Engineering <span>↗</span></a></div></div></section>

      <section id="products" className="products section-rule"><div className="section-heading"><span className="section-number">06</span><h2>Products</h2></div><div className="product-list">{products.map((product, index) => <a href="#" className="product-row" key={product}><span>0{index + 1}</span><strong>{product}</strong><small>Explore product <span>↗</span></small></a>)}</div></section>

      <section id="company" className="company section-rule"><div className="company-title"><span className="section-number">07</span><h2>Company</h2></div><div className="company-copy"><p>OpenAI is an AI research and deployment company. We work to create a future in which advanced intelligence is broadly available and beneficial.</p><div className="company-links"><a href="#">About us <span>↗</span></a><a href="#">Leadership <span>↗</span></a><a href="#">News <span>↗</span></a></div></div></section>

      <section className="quote"><blockquote>&quot;I encourage my team to keep learning. Minds in different topics or fields can often inspire new ideas and broaden the potential solution space.&quot;</blockquote><cite>— OpenAI</cite></section>

      <section id="careers" className="cta section-rule"><h2>Join us in shaping the future of technology.</h2><a href="#contact" className="cta-link">See open roles <span>↗</span></a></section>

      <footer id="contact" className="site-footer"><div className="footer-top"><span className="wordmark">openai</span><div className="footer-links"><div><span>Explore</span><a href="#research">Research</a><a href="#products">Products</a><a href="#safety">Safety</a></div><div><span>Connect</span><a href="#">X / Twitter</a><a href="#">LinkedIn</a><a href="#">YouTube</a></div><div><span>Legal</span><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div></div></div><div className="footer-bottom"><span>© 2015—2024 OpenAI</span><span>All systems operational</span><span>Back to top ↑</span></div><div className="stripes" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} />)}</div></footer>
    </main>
  )
}

