import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Ai } from './pages/Ai';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { Intake } from './pages/Intake';
import { NotFound } from './pages/NotFound';
import { Now } from './pages/Now';
import { Partners } from './pages/Partners';
import { Post } from './pages/Post';
import { Pricing } from './pages/Pricing';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="intake" element={<Intake />} />
        <Route path="ai" element={<Ai />} />
        <Route path="partners" element={<Partners />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="now" element={<Now />} />
        <Route path="now/:slug" element={<Post />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
