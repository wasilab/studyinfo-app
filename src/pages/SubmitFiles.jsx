import { useRef, useState } from 'react';

const MAX_MB = 10;
const ACCEPT = '.csv,.xlsx,.xls,.pdf,.zip';

const formatSize = (bytes) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

export default function SubmitFiles({ partners, submissions, setSubmissions }) {
  const [partnerId, setPartnerId] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (list) => {
    const incoming = Array.from(list);
    const tooBig = incoming.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than ${MAX_MB} MB.`);
      return;
    }
    setError('');
    setFiles((prev) => [...prev, ...incoming]);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!partnerId) return setError('Please choose a partner university.');
    if (files.length === 0) return setError('Please attach at least one file.');
    const partner = partners.find((p) => p.id === partnerId);
    const now = new Date().toISOString();
    // Only metadata is stored locally; connect a backend to send the real files.
    const entries = files.map((f) => ({
      id: crypto.randomUUID(),
      fileName: f.name,
      size: f.size,
      partnerName: partner.name,
      notes,
      submittedAt: now,
      status: 'Submitted',
    }));
    setSubmissions([...entries, ...submissions]);
    setFiles([]);
    setNotes('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      <h2>Submit student files</h2>
      <div className="two-col">
        <form className="card form" onSubmit={submit}>
          <label>
            Partner university *
            <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)}>
              <option value="">Select…</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          {partners.length === 0 && (
            <p className="muted">Add a partner university first (Partner Universities tab).</p>
          )}

          <div
            className={`drop ${dragging ? 'dragging' : ''}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          >
            <p><strong>Drop student files here</strong> or click to browse</p>
            <p className="muted">CSV, Excel, PDF or ZIP · up to {MAX_MB} MB each</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPT}
              hidden
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <ul className="list compact">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <span>{f.name} <span className="muted">({formatSize(f.size)})</span></span>
                  <button type="button" className="link" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                    remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <label>
            Notes
            <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>

          {error && <p className="error">{error}</p>}
          <button className="btn primary" type="submit">Submit</button>
        </form>

        <div className="card">
          <h3>Submission history ({submissions.length})</h3>
          {submissions.length === 0 ? (
            <p className="muted">Nothing submitted yet.</p>
          ) : (
            <ul className="list">
              {submissions.map((s) => (
                <li key={s.id}>
                  <div>
                    <strong>{s.fileName}</strong>
                    <div className="muted">
                      → {s.partnerName} · {formatSize(s.size)} · {new Date(s.submittedAt).toLocaleString()}
                    </div>
                    {s.notes && <div className="muted">“{s.notes}”</div>}
                  </div>
                  <span className="badge">{s.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
