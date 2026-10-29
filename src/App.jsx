import { useEffect, useState } from 'react';
import { BRAND, CONTACT_EMAIL } from './config.js';
import { NAV, TRACKS, SERVICES, STEPS, STANDARDS, CHECKLIST, FAQ } from './content.js';
import Icon from './components/Icon.jsx';
import FileCard from './components/FileCard.jsx';

const mailto = (subject) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000); },
      () => {},
    );
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label={`${BRAND} home`}>
            <span className="brand-mark" aria-hidden="true">S</span>
            {BRAND}
          </a>
          <nav className={menuOpen ? 'open' : ''} id="site-nav" aria-label="Main">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="btn primary small" href="#contact">Partner with us</a>
            <button className="menu-btn" aria-expanded={menuOpen} aria-controls="site-nav"
              aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">B2B admissions partner for international education</p>
              <h1>One network for <em>student files</em>, agencies and universities.</h1>
              <p className="lead">
                {BRAND} accepts student files from agency partners, verifies every document, and
                submits complete applications to our partner universities. Agencies and
                universities can join the network directly.
              </p>
              <div className="row">
                <a className="btn primary" href="#accept">Work with us <Icon name="arrow" size={18} /></a>
                <a className="btn ghost" href="#process">How it works</a>
              </div>
              <ul className="accept-strip" aria-label="We accept">
                {TRACKS.map((t) => (
                  <li key={t.id}><Icon name="check" size={16} /> {t.title}</li>
                ))}
              </ul>
            </div>
            <FileCard />
          </div>
        </section>

        <section id="accept" className="section">
          <div className="container">
            <div className="section-head center">
              <p className="eyebrow">What we accept</p>
              <h2>Three ways to work with {BRAND}</h2>
              <p className="sub">Choose the route that fits your organisation. Each one starts with a short conversation with our partnerships team.</p>
            </div>
            <div className="tracks">
              {TRACKS.map((t) => (
                <article className="track" key={t.id}>
                  <div className="track-top">
                    <span className="service-icon"><Icon name={t.icon} /></span>
                    <span className="audience-label">{t.label}</span>
                  </div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  <ul className="ticks">
                    {t.points.map((p) => <li key={p}><Icon name="check" size={18} />{p}</li>)}
                  </ul>
                  <a className="btn track-btn" href={mailto(t.subject)}>
                    {t.cta} <Icon name="arrow" size={18} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section tinted">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2>Everything between a student file and a university decision</h2>
            </div>
            <div className="services">
              {SERVICES.map((s) => (
                <article className="service" key={s.title}>
                  <span className="service-icon"><Icon name={s.icon} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section dark">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">How it works</p>
              <h2>From partnership to decision in four steps</h2>
            </div>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="standards" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Our standards</p>
              <h2>Quality that admissions teams can rely on</h2>
            </div>
            <div className="standards">
              {STANDARDS.map((s) => (
                <div className="standard" key={s.title}>
                  <span className="check"><Icon name="check" size={16} /></span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="split checklist-block">
              <div className="section-head">
                <h3 className="h3-lg">What a complete student file includes</h3>
                <p className="sub">
                  Every file is checked against this list before submission. Requirements vary by
                  programme, and we confirm the exact list with each partner university.
                </p>
              </div>
              <ul className="checklist">
                {CHECKLIST.map(([name, note]) => (
                  <li key={name}>
                    <Icon name="file" size={20} />
                    <div><strong>{name}</strong><span>{note}</span></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="section tinted">
          <div className="container faq-wrap">
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2>Common questions</h2>
              <p className="sub">Can’t find your answer? <a href={mailto('Question')}>Email our team</a>.</p>
            </div>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="cta">
          <div className="container">
            <div className="cta-inner">
              <div className="cta-copy">
                <h2>Ready to partner with {BRAND}?</h2>
                <p>Tell us who you are and what you need. Our partnerships team will guide you through the next steps.</p>
                <button className="email-chip" onClick={copyEmail} aria-label="Copy email address">
                  <Icon name="mail" size={16} /> {copied ? 'Copied to clipboard' : CONTACT_EMAIL}
                </button>
              </div>
              <div className="cta-actions">
                {TRACKS.map((t) => (
                  <a key={t.id} className="cta-link" href={mailto(t.subject)}>
                    <span>{t.cta}</span>
                    <Icon name="arrow" size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">S</span>{BRAND}
            </a>
            <p>The B2B admissions partner connecting recruitment agencies with universities worldwide.</p>
          </div>
          <div>
            <p className="footer-title">Work with us</p>
            {TRACKS.map((t) => <a key={t.id} href={mailto(t.subject)}>{t.title}</a>)}
          </div>
          <div>
            <p className="footer-title">Company</p>
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <span className="selectable">{CONTACT_EMAIL}</span>
          </div>
        </div>
        <div className="container footer-base">© {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
      </footer>
    </>
  );
}
