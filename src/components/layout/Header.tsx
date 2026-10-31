import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { NAV, contactLink } from '../../content/site';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, search } = useLocation();

  useEffect(() => setOpen(false), [pathname, search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-[env(safe-area-inset-top,0px)] z-50 border-b bg-white/85 backdrop-blur-xl backdrop-saturate-150 transition-colors ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center gap-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden lg:block">
            <Button to={contactLink('files')} variant="ghost" size="sm">
              Submit files
            </Button>
          </span>
          <span className="hidden sm:block">
            <Button to={contactLink('agency')} size="sm">
              Become a partner
            </Button>
          </span>
          <button
            type="button"
            className="-mr-1.5 grid size-9 place-items-center rounded-md text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `border-b border-line py-3 text-[15px] ${isActive ? 'text-ink' : 'text-ink-2'}`}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 pt-4 pb-2">
              <Button to={contactLink('agency')}>Become a partner</Button>
              <Button to={contactLink('files')} variant="secondary">
                Submit student files
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
