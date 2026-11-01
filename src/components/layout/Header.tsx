import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { GROW_LINK, NAV, PRODUCT_MENU, contactLink } from '../../content/site';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

// Tighter padding between md and lg keeps the whole top bar on one line at tablet widths.
const LINK = 'rounded-full px-2 py-1.5 text-[13.5px] whitespace-nowrap transition-colors lg:px-3';

export function Header() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, search } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setOpen(false);
    setProduct(false);
  }, [pathname, search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProduct(false);
    };
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setProduct(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [product]);

  const productActive = PRODUCT_MENU.some((p) => pathname.startsWith(p.to));

  return (
    <header
      className={`sticky top-[env(safe-area-inset-top,0px)] z-50 border-b bg-canvas/75 backdrop-blur-xl backdrop-saturate-150 transition-colors ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center gap-4">
        <Logo />
        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 md:flex">
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => {
              window.clearTimeout(closeTimer.current);
              setProduct(true);
            }}
            onMouseLeave={() => {
              closeTimer.current = window.setTimeout(() => setProduct(false), 140);
            }}
          >
            <button
              type="button"
              aria-expanded={product}
              aria-controls="product-menu"
              onClick={() => setProduct((p) => !p)}
              className={`${LINK} flex items-center gap-1 ${productActive || product ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
            >
              Services
              <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-3 transition-transform duration-200 ${product ? 'rotate-180' : ''}`}>
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              id="product-menu"
              className={`absolute top-full left-1/2 w-[340px] -translate-x-1/2 pt-3 transition-[opacity,translate,visibility] duration-200 ${
                product ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              <div className="rounded-2xl bg-surface-2 p-2 shadow-window">
                {PRODUCT_MENU.map((item) => (
                  <Link key={item.to} to={item.to} className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-ink ring-1 ring-line transition-colors group-hover:text-accent">
                      <Icon name={item.icon} size={16} />
                    </span>
                    <span className="pt-0.5">
                      <span className="block text-[14px] font-medium text-ink">{item.label}</span>
                      <span className="block text-[13px] text-ink-3">{item.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `${LINK} ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-line-2 md:block lg:mx-2" />
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <NavLink
            to={GROW_LINK.to}
            className={({ isActive }) => `${LINK} hidden md:block ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
          >
            {GROW_LINK.label}
          </NavLink>
          <span className="hidden sm:block">
            <Button to={contactLink('join')} size="sm">
              Join the network
            </Button>
          </span>
          <button
            type="button"
            className="-mr-1.5 grid size-9 place-items-center rounded-full text-ink md:hidden"
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
        <div id="mobile-nav" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas md:hidden">
          <Container className="flex flex-col py-3">
            <p className="pt-2 pb-1 text-[12px] font-medium text-ink-3">Services</p>
            {PRODUCT_MENU.map((item) => (
              <Link key={item.to} to={item.to} className="flex items-center gap-3 border-b border-line py-3">
                <Icon name={item.icon} size={16} className="text-ink-3" />
                <span>
                  <span className="block text-[15px] text-ink">{item.label}</span>
                  <span className="block text-[13px] text-ink-3">{item.text}</span>
                </span>
              </Link>
            ))}
            {[...NAV, GROW_LINK].map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `border-b border-line py-3 text-[15px] ${isActive ? 'text-ink' : 'text-ink-2'}`}>
                {item.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 pt-4 pb-2">
              <Button to={contactLink('join')}>Join the network</Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
