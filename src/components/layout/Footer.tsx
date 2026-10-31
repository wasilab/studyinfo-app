import { Link } from 'react-router';
import { BRAND, CONTACT_EMAIL } from '../../config';
import { FOOTER } from '../../content/site';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-10 md:pt-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div className="flex flex-col gap-3">
            <Link to="/" aria-label={`${BRAND} home`} className="w-fit">
              <LogoMark size={22} />
            </Link>
            <p className="max-w-[15rem] text-[13px] leading-relaxed text-ink-3">The B2B admissions partner for agencies and universities.</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 text-[13px]">
              <p className="font-medium text-ink">{col.title}</p>
              {col.links.map((l) => (
                <Link key={l.to} to={l.to} className="w-fit text-ink-3 transition-colors hover:text-ink">
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[12px] text-ink-3">
          <p>
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
          <p>Student files · Agency partners · Partner universities</p>
        </div>
      </Container>
    </footer>
  );
}
