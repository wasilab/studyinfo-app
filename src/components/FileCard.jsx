const STAGES = ['Received', 'Verified', 'Sent to university', 'Offer issued'];

// Illustrative example of an application file moving through our process.
export default function FileCard() {
  const current = 2;
  return (
    <div className="filecard" aria-label="Example application file">
      <div className="filecard-head">
        <span className="tag">Example file</span>
        <span className="mono">APP-2027-0418</span>
      </div>
      <div className="filecard-body">
        <div>
          <p className="fc-label">Programme</p>
          <p className="fc-value">MSc Data Science</p>
        </div>
        <div>
          <p className="fc-label">Intake</p>
          <p className="fc-value">September 2027</p>
        </div>
        <div>
          <p className="fc-label">Documents</p>
          <p className="fc-value">6 of 6 complete</p>
        </div>
        <div>
          <p className="fc-label">English test</p>
          <p className="fc-value">IELTS 7.0</p>
        </div>
      </div>
      <ol className="stages">
        {STAGES.map((s, i) => (
          <li key={s} className={i < current ? 'done' : i === current ? 'now' : ''}>
            <span className="dot" />
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
