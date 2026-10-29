import { useState } from 'react';
import { BRAND, CONTACT_EMAIL } from './config.js';
import { NAV, SERVICES, STEPS, AUDIENCES, CHECKLIST, FAQ } from './content.js';
import Icon from './components/Icon.jsx';
import FileCard from './components/FileCard.jsx';

const mailto = `mailto:${CONTACT_EMAIL}?subject=Partnership%20enquiry`;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000); },
      () => {},
    );
  };

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label={`${BRAND} home`}>
            <span className="brand-mark" aria-hidden="true">S</span>
            {BRAND}
          </a>
          <nav className={menuOpen ? 'open' : ''} id="site-nav">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="btn primary small" href="#contact">Become a partner</a>
            <button className="menu-btn" aria-expanded={menuOpen} aria-controls="site-nav"
              aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">B2B solutions for international education</p>
              <h1>Student files in.<br /><em>University offers</em> out.</h1>
              <p className="lead">
                {BRAND} connects recruitment agencies with partner universities. We take in student
                files, check them, match them to the right programmes and track every application
                to a decision.
              </p>
              <div className="row">
                <a className="btn primary" href="#contact">Become a partner <Icon name="arrow" size={18} /></a>
                <a className="btn ghost" href="#process">See how it works</a>
              </div>
            </div>
            <FileCard />
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">What we do</p>
              <h2>One partner for the whole application journey</h2>
              <p className="sub">Four services that take a student from first file to final decision.</p>
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
              <h2>From partnership to offer in four steps</h2>
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

        <section id="partners" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Who it is for</p>
              <h2>Built for both sides of admissions</h2>
            </div>
            <div className="audiences">
              {AUDIENCES.map((a) => (
                <article className="audience" key={a.label}>
                  <p className="audience-label">{a.label}</p>
                  <h3>{a.title}</h3>
                  <ul className="ticks">
                    {a.points.map((p) => (
                      <li key={p}><Icon name="check" size={18} />{p}</li>
                    ))}
                  </ul>
                  <a className="text-link" href="#contact">Talk to us <Icon name="arrow" size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section tinted">
          <div className="container split">
            <div className="section-head">
              <p className="eyebrow">Our standard</p>
              <h2>What a complete student file includes</h2>
              <p className="sub">
                Every file is checked against this list before it reaches a university. Requirements
                vary by programme, and we confirm the exact list with each partner.
              </p>
            </div>
            <ul className="checklist">
              {CHECKLIST.map(([name, note]) => (
                <li key={name}>
                  <span className="check"><Icon name="check" size={16} /></span>
                  <div><strong>{name}</strong><span>{note}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container faq-wrap">
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2>Common questions</h2>
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
          <div className="container cta-inner">
            <div>
              <h2>Let's work together</h2>
              <p>
                Tell us whether you want to submit student files or add your university to our
                network.
              </p>
            </div>
            <div className="cta-actions">
              <a className="btn light" href={mailto}><Icon name="mail" size={18} /> Email us</a>
              <button className="email-chip" onClick={copyEmail}>
                {copied ? 'Copied' : CONTACT_EMAIL}
              </button>
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
            <p>B2B solutions connecting student recruiters with partner universities.</p>
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
