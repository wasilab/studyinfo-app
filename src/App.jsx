import { BRAND, CONTACT_EMAIL } from './config.js';
import { SOLUTIONS, STEPS, AUDIENCES } from './content.js';

const NAV = [
  ['solutions', 'What we do'],
  ['how', 'How it works'],
  ['partners', 'Who it is for'],
  ['contact', 'Contact'],
];

export default function App() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">{BRAND}<span> B2B</span></a>
          <nav>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <p className="eyebrow">B2B solutions for international education</p>
          <h1>We connect student recruiters with partner universities</h1>
          <p className="lead">
            {BRAND} gives agencies and education partners one place to submit student files, and
            gives universities a reliable way to receive them.
          </p>
          <div className="row">
            <a className="btn primary" href="#contact">Become a partner</a>
            <a className="btn" href="#solutions">See what we do</a>
          </div>
        </section>

        <section id="solutions" className="section container">
          <h2>What we do</h2>
          <p className="sub">Four services that cover the path from student file to university decision.</p>
          <div className="grid">
            {SOLUTIONS.map((s) => (
              <article className="card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="band">
          <div className="container section">
            <h2>How it works</h2>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="partners" className="section container">
          <h2>Who it is for</h2>
          <div className="grid two">
            {AUDIENCES.map((a) => (
              <article className="card" key={a.title}>
                <h3>{a.title}</h3>
                <ul className="ticks">
                  {a.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="band cta">
          <div className="container section">
            <h2>Ready to work with us?</h2>
            <p className="sub">
              Tell us whether you want to submit student files or add your university as a partner,
              and we will get back to you.
            </p>
            <a className="btn primary" href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20enquiry`}>
              Email us
            </a>
            <p className="muted">{CONTACT_EMAIL}</p>
          </div>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} {BRAND} B2B Solutions</footer>
    </>
  );
}
