import { useState } from 'react';
import Home from './pages/Home.jsx';
import SubmitFiles from './pages/SubmitFiles.jsx';
import Partners from './pages/Partners.jsx';
import { useLocalStorage } from './useLocalStorage.js';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'files', label: 'Submit Student Files' },
  { id: 'partners', label: 'Partner Universities' },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [partners, setPartners] = useLocalStorage('studyinfo.partners', []);
  const [submissions, setSubmissions] = useLocalStorage('studyinfo.submissions', []);

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <button className="brand" onClick={() => setPage('home')}>
            Study<span>Info</span> B2B
          </button>
          <nav>
            {TABS.map((t) => (
              <button
                key={t.id}
                className={page === t.id ? 'active' : ''}
                onClick={() => setPage(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        {page === 'home' && (
          <Home
            onNavigate={setPage}
            stats={{ partners: partners.length, submissions: submissions.length }}
          />
        )}
        {page === 'files' && (
          <SubmitFiles
            partners={partners}
            submissions={submissions}
            setSubmissions={setSubmissions}
          />
        )}
        {page === 'partners' && <Partners partners={partners} setPartners={setPartners} />}
      </main>

      <footer className="footer">© {new Date().getFullYear()} StudyInfo B2B Solutions</footer>
    </>
  );
}
