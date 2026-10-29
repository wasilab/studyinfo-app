import { useState } from 'react';

const EMPTY = { name: '', country: '', contactName: '', email: '', website: '' };

export default function Partners({ partners, setPartners }) {
  const [form, setForm] = useState(EMPTY);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    if (partners.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError('This university is already in your partner list.');
      return;
    }
    setPartners([{ id: crypto.randomUUID(), ...form, name, addedAt: new Date().toISOString() }, ...partners]);
    setForm(EMPTY);
    setError('');
  };

  const remove = (id) => setPartners(partners.filter((p) => p.id !== id));

  const q = query.trim().toLowerCase();
  const shown = partners.filter((p) =>
    [p.name, p.country, p.contactName].some((v) => v.toLowerCase().includes(q)),
  );

  return (
    <>
      <h2>Partner universities</h2>
      <div className="two-col">
        <form className="card form" onSubmit={add}>
          <h3>Add partner university</h3>
          <label>
            University name *
            <input name="name" value={form.name} onChange={update} required />
          </label>
          <label>
            Country
            <input name="country" value={form.country} onChange={update} />
          </label>
          <label>
            Contact person
            <input name="contactName" value={form.contactName} onChange={update} />
          </label>
          <label>
            Contact email
            <input name="email" type="email" value={form.email} onChange={update} />
          </label>
          <label>
            Website
            <input name="website" type="url" placeholder="https://" value={form.website} onChange={update} />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn primary" type="submit">Add partner</button>
        </form>

        <div className="card">
          <div className="row between">
            <h3>Your partners ({partners.length})</h3>
            <input
              className="search"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {shown.length === 0 ? (
            <p className="muted">No partner universities yet.</p>
          ) : (
            <ul className="list">
              {shown.map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.name}</strong>
                    <div className="muted">
                      {[p.country, p.contactName, p.email].filter(Boolean).join(' · ')}
                    </div>
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noreferrer noopener">
                        {p.website}
                      </a>
                    )}
                  </div>
                  <button className="btn danger" onClick={() => remove(p.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
