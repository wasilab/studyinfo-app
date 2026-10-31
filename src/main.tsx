import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { App } from './App';
import './index.css';

const Router = import.meta.env.VITE_MEMORY_ROUTER === 'true' ? MemoryRouter : BrowserRouter;
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

// Built pages arrive pre-rendered (scripts/prerender.mjs), so React takes over the existing HTML.
// The dev server and the single-file preview start empty and render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
