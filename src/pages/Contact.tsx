import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Icon, type IconName } from '../components/ui/Icon';
import { Label } from '../components/ui/Section';
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_LINK, CONTACT_WHATSAPP } from '../config';
import { ENQUIRY_TYPES, type EnquiryType } from '../content/site';
import { mailto } from '../lib/mailto';
import { usePageMeta } from '../lib/usePageMeta';
import { WordReveal } from '../components/ui/WordReveal';

const TYPES = Object.keys(ENQUIRY_TYPES) as EnquiryType[];
const isType = (v: string | null): v is EnquiryType => v !== null && v in ENQUIRY_TYPES;

const NEXT_STEPS = [
  'We read your message and get back to you.',
  'We talk through how your agency will use the network.',
  'You start sending student files, receiving them, or both.',
];

const CHANNELS: { icon: IconName; label: string; value: string; href?: string; external?: boolean }[] = [
  { icon: 'phone', label: 'Phone', value: CONTACT_PHONE, href: CONTACT_PHONE_LINK },
  { icon: 'message', label: 'WhatsApp', value: 'Message us on WhatsApp', href: CONTACT_WHATSAPP, external: true },
  { icon: 'pin', label: 'Office', value: CONTACT_ADDRESS },
];

const FIELD =
  'h-10 w-full rounded-lg bg-canvas px-3 text-[14px] text-ink ring-1 ring-line-2 outline-none ring-inset placeholder:text-ink-3 focus:ring-2 focus:ring-accent';

export function Contact() {
  usePageMeta();
  const [params] = useSearchParams();
  const requested = params.get('type');

  // Starts at the default so it matches the pre-rendered page; the effect below applies ?type= right after.
  const [type, setType] = useState<EnquiryType>('join');
  const [form, setForm] = useState({ name: '', email: '', organisation: '', country: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isType(requested)) setType(requested);
  }, [requested]);

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `${ENQUIRY_TYPES[type].subject}: ${form.organisation}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Organisation: ${form.organisation}`,
      `Country: ${form.country || 'Not given'}`,
      `Enquiry: ${ENQUIRY_TYPES[type].label}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = mailto(subject, body);
    setSent(true);
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {},
    );
  };

  return (
    <section className="relative overflow-clip pt-14 pb-20 md:pt-24 md:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(110_139_255/0.14),transparent_70%)]" />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Label>Contact</Label>
            <h1 className="text-[2.6rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[3.4rem]">
              <WordReveal text="Talk to the StudyInfo team" />
            </h1>
            <p className="max-w-md text-[17px] leading-relaxed text-ink-2">
              Tell us about your agency: the students you hold, the universities you work with, or both. We’ll get back to you with the next steps.
            </p>

            <div className="mt-2 divide-y divide-line rounded-xl bg-subtle ring-1 ring-line">
              <div className="flex items-center gap-3.5 p-4 sm:px-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-ink-2 ring-1 ring-line">
                  <Icon name="mail" size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] text-ink-3">Email</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="block font-medium break-all transition-colors hover:text-accent">
                    {CONTACT_EMAIL}
                  </a>
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? 'Email address copied' : 'Copy email address'}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-surface-2 px-2.5 text-[12.5px] ring-1 ring-line-2 hover:bg-muted"
                >
                  <Icon name={copied ? 'check' : 'copy'} size={13} /> {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              {CHANNELS.map((c) => (
                <div key={c.label} className="flex items-center gap-3.5 p-4 sm:px-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-ink-2 ring-1 ring-line">
                    <Icon name={c.icon} size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] text-ink-3">{c.label}</span>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group inline-flex items-center gap-1 font-medium transition-colors hover:text-accent"
                      >
                        {c.value}
                        {c.external && <Icon name="arrowUpRight" size={13} className="text-ink-3 transition-colors group-hover:text-accent" />}
                      </a>
                    ) : (
                      <span className="block font-medium">{c.value}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <p className="font-mono text-[12px] text-ink-3">What happens next</p>
              <ol className="mt-3 flex flex-col">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4 border-t border-line py-3.5 text-[15px] text-ink-2">
                    <span className="font-mono text-[12px] leading-6 text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-2xl bg-surface p-6 shadow-window md:p-8">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center gap-4">
                <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name="mail" size={18} />
                </span>
                <h2 className="text-2xl font-medium tracking-[-0.025em]">Your email app should open now</h2>
                <p className="max-w-sm text-[15px] leading-relaxed text-ink-2">
                  Your message is ready to send to {CONTACT_EMAIL}. If your email app didn’t open, email us at that address directly.
                </p>
                <Button variant="secondary" onClick={() => setSent(false)}>
                  Edit message
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <fieldset className="flex flex-col gap-2.5">
                  <legend className="mb-2.5 text-[13px] font-medium">What can we help with?</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TYPES.map((t) => (
                      <label
                        key={t}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] ring-1 transition-colors ring-inset ${
                          type === t ? 'bg-accent-soft text-ink ring-accent/60' : 'text-ink-2 ring-line-2 hover:bg-subtle'
                        }`}
                      >
                        <input
                          type="radio"
                          name="enquiry-type"
                          id={`enquiry-${t}`}
                          value={t}
                          checked={type === t}
                          onChange={() => setType(t)}
                          className="size-3.5 accent-accent"
                        />
                        {ENQUIRY_TYPES[t].label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium">
                    Full name
                    <input id="contact-name" required autoComplete="name" value={form.name} onChange={update('name')} className={FIELD} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium">
                    Work email
                    <input id="contact-email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} className={FIELD} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium">
                    Organisation
                    <input id="contact-organisation" required autoComplete="organization" value={form.organisation} onChange={update('organisation')} className={FIELD} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium">
                    <span>
                      Country <span className="font-normal text-ink-3">(optional)</span>
                    </span>
                    <input id="contact-country" autoComplete="country-name" value={form.country} onChange={update('country')} className={FIELD} />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-[13px] font-medium">
                  How can we help?
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="For example: the countries your students come from, or the universities you work with."
                    className={`${FIELD} h-auto resize-y py-2.5 leading-relaxed`}
                  />
                </label>

                <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12.5px] text-ink-3">Opens your email app with this message addressed to {CONTACT_EMAIL}.</p>
                  <Button type="submit" className="shrink-0">
                    Send message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
