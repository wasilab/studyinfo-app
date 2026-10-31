import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { Label } from '../components/ui/Section';
import { CONTACT_EMAIL } from '../config';
import { ENQUIRY_TYPES, type EnquiryType } from '../content/site';
import { mailto } from '../lib/mailto';
import { usePageMeta } from '../lib/usePageMeta';

const TYPES = Object.keys(ENQUIRY_TYPES) as EnquiryType[];
const isType = (v: string | null): v is EnquiryType => v !== null && v in ENQUIRY_TYPES;

const NEXT_STEPS = ['We read your message and reply by email.', 'We agree partnership terms with you.', 'You start sending or receiving student files.'];

const FIELD =
  'h-10 w-full rounded-lg bg-white px-3 text-[14px] text-ink ring-1 ring-line-2 outline-none ring-inset placeholder:text-ink-3 focus:ring-2 focus:ring-ink';

export function Contact() {
  usePageMeta('Contact', 'Talk to the StudyInfo partnerships team about submitting student files or becoming an agency or university partner.');
  const [params] = useSearchParams();
  const requested = params.get('type');

  const [type, setType] = useState<EnquiryType>(isType(requested) ? requested : 'agency');
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
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(14_15_17/0.045),transparent_70%)]" />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Label>Contact</Label>
            <h1 className="text-[2.6rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[3.4rem]">Talk to our partnerships team</h1>
            <p className="max-w-md text-[17px] leading-relaxed text-ink-2">
              Tell us who you are and what you need. We’ll reply by email with the next steps.
            </p>

            <div className="mt-2 rounded-xl bg-subtle p-5 ring-1 ring-line">
              <p className="text-[13px] text-ink-3">Prefer email?</p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <span className="min-w-0 font-medium break-all select-all">{CONTACT_EMAIL}</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-white px-2.5 text-[12.5px] ring-1 ring-line-2 hover:bg-muted"
                >
                  <Icon name={copied ? 'check' : 'copy'} size={13} /> {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
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

          <div className="rounded-2xl bg-white p-6 shadow-window md:p-8">
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
                          type === t ? 'bg-subtle text-ink ring-ink' : 'text-ink-2 ring-line-2 hover:bg-subtle'
                        }`}
                      >
                        <input
                          type="radio"
                          name="enquiry-type"
                          id={`enquiry-${t}`}
                          value={t}
                          checked={type === t}
                          onChange={() => setType(t)}
                          className="size-3.5 accent-ink"
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
                    placeholder="For example: the countries you recruit from, or the programmes you want to fill."
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
