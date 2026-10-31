import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  const { pathname } = useLocation();
  const [firstPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);

  // Fade pages in on navigation, but not on the first load (the hero has its own entrance).
  if (!navigated && pathname !== firstPath) setNavigated(true);

  // New pages start at the top, except links to a section (#id): the browser and the page scroll to those.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-ink px-3 py-2 text-sm text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <div key={pathname} className={navigated ? 'animate-page' : undefined}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
