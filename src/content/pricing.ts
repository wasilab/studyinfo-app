import type { EnquiryType } from './site';

export interface Plan {
  name: string;
  price: string;
  priceNote: string;
  audience: string;
  cta: { label: string; type: EnquiryType };
  features: string[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Agency partner',
    price: 'Free',
    priceNote: 'Free to join',
    audience: 'For recruitment agencies and education consultants.',
    cta: { label: 'Become an agency partner', type: 'agency' },
    features: [
      'Submit student files',
      'AI document checks, reviewed by our team',
      'Programme matching for every student',
      'Shared status for every application',
      'Support from our partnerships team',
    ],
    featured: true,
  },
  {
    name: 'University partner',
    price: 'Custom',
    priceNote: 'Terms agreed per partnership',
    audience: 'For universities and colleges.',
    cta: { label: 'Talk to us', type: 'university' },
    features: [
      'Verified, complete applications',
      'Students from our agency network',
      'Your programmes and requirements kept current',
      'Shared status for every application',
      'One point of contact for every agency',
    ],
  },
];

export const COMPARE: { group: string; rows: [string, boolean, boolean][] }[] = [
  {
    group: 'Student files',
    rows: [
      ['Submit student files', true, false],
      ['Receive verified applications', false, true],
    ],
  },
  {
    group: 'Checks',
    rows: [
      ['AI document checks', true, true],
      ['Review by our admissions team', true, true],
    ],
  },
  {
    group: 'Matching',
    rows: [
      ['Programme shortlists for your students', true, false],
      ['Matched applicants for your programmes', false, true],
    ],
  },
  {
    group: 'Tracking and support',
    rows: [
      ['Shared application status', true, true],
      ['Partnerships team contact', true, true],
    ],
  },
];

export const PRICING_FAQ: { q: string; a: string }[] = [
  { q: 'Is it free for agencies to join?', a: 'Yes. Agency partners join StudyInfo for free.' },
  { q: 'How are terms for universities set?', a: 'We agree terms with each university as part of the partnership. Contact us with the programmes, intakes and markets you recruit for.' },
  { q: 'Who can become an agency partner?', a: 'Recruitment agencies and education consultants that agree partnership terms with us.' },
  { q: 'What happens if a student file is incomplete?', a: 'We return it to the agency with a list of exactly what is missing, before it reaches any university.' },
  { q: 'Which study levels and intakes do you support?', a: 'Undergraduate and postgraduate programmes across all intakes our partner universities offer, most commonly September and January.' },
  { q: 'How is student data protected?', a: 'Student information is used only to process their applications and is shared only with the universities they apply to.' },
];
