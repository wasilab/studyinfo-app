import { Link } from 'react-router';
import { BRAND, CONTACT_EMAIL } from '../../config';
import { FOOTER } from '../../content/site';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="border-t border-line py-14 md:py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.02em]">
              <LogoMark size={20} /> {BRAND}
            </Link>
            <p className="max-w-[16rem] text-[13px] leading-relaxed text-ink-3">
              The B2B admissions partner for agencies and universities.
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 text-[13px]">
              <p className="font-medium text-ink">{col.title}</p>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to} className="text-ink-3 transition-colors hover:text-ink">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3 text-[13px]">
            <p className="font-medium text-ink">Contact</p>
            <span className="break-all text-ink-3 select-all">{CONTACT_EMAIL}</span>
          </div>
        </div>
        <p className="mt-14 text-[12px] text-ink-3">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
