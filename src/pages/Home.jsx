const FEATURES = [
  {
    title: 'Submit student files',
    text: 'Upload student lists and application documents in bulk and route them to the right university.',
    page: 'files',
    cta: 'Upload files',
  },
  {
    title: 'Manage partner universities',
    text: 'Add, edit and organise the universities you work with in one place.',
    page: 'partners',
    cta: 'Add a partner',
  },
  {
    title: 'Track every submission',
    text: 'See what was sent, when, and to which partner — with a clear status history.',
    page: 'files',
    cta: 'View submissions',
  },
];

export default function Home({ onNavigate, stats }) {
  return (
    <>
      <section className="hero">
        <h1>The B2B platform for student recruitment</h1>
        <p>
          Send student files to universities and manage your partner network — all from one
          dashboard.
        </p>
        <div className="row">
          <button className="btn primary" onClick={() => onNavigate('files')}>
            Submit student file
          </button>
          <button className="btn" onClick={() => onNavigate('partners')}>
            Add partner university
          </button>
        </div>
      </section>

      <section className="stats">
        <div className="card stat">
          <strong>{stats.partners}</strong>
          <span>Partner universities</span>
        </div>
        <div className="card stat">
          <strong>{stats.submissions}</strong>
          <span>Files submitted</span>
        </div>
      </section>

      <section className="grid">
        {FEATURES.map((f) => (
          <article className="card" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <button className="link" onClick={() => onNavigate(f.page)}>
              {f.cta} →
            </button>
          </article>
        ))}
      </section>
    </>
  );
}
