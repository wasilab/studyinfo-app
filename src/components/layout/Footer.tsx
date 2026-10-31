import { Link } from 'react-router';
import { BRAND, CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_LINK, CONTACT_WHATSAPP } from '../../config';
import { FOOTER } from '../../content/site';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/Logo';

const EXTERNAL = 'w-fit text-ink-3 transition-colors hover:text-ink';

export function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-10 md:pt-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-3">
            <Link to="/" aria-label={`${BRAND} home`} className="w-fit">
              <LogoMark size={24} />
            </Link>
            <p className="max-w-[15rem] text-[13px] leading-relaxed text-ink-3">The network for international education agencies.</p>
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
          <address className="flex flex-col gap-3 text-[13px] not-italic">
            <p className="font-medium text-ink">Contact</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`${EXTERNAL} break-all`}>
              {CONTACT_EMAIL}
            </a>
            <a href={CONTACT_PHONE_LINK} className={EXTERNAL}>
              {CONTACT_PHONE}
            </a>
            <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className={EXTERNAL}>
              WhatsApp
            </a>
            <span className="text-ink-3">{CONTACT_ADDRESS}</span>
          </address>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[12px] text-ink-3">
          <p>
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
          <p>Send student files · Add your universities · One network</p>
        </div>
      </Container>
    </footer>
  );
}
