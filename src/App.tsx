import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Network } from './pages/Network';
import { NotFound } from './pages/NotFound';
import { Now } from './pages/Now';
import { Post } from './pages/Post';
import { SendFiles } from './pages/SendFiles';
import { Toolkit } from './pages/Toolkit';
import { Tracking } from './pages/Tracking';
import { Universities } from './pages/Universities';

/** Pages that were renamed or removed, and where their old links now go. */
const REDIRECTS: Record<string, string> = {
  intake: '/send-files',
  ai: '/toolkit',
  partners: '/network',
  pricing: '/',
};

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="send-files" element={<SendFiles />} />
        <Route path="universities" element={<Universities />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="toolkit" element={<Toolkit />} />
        <Route path="network" element={<Network />} />
        <Route path="now" element={<Now />} />
        <Route path="now/:slug" element={<Post />} />
        <Route path="contact" element={<Contact />} />
        {Object.entries(REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
