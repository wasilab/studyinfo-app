import type { EnquiryType } from './site';

export interface PartnerType {
  label: string;
  title: string;
  text: string;
  gets: string[];
  cta: { label: string; type: EnquiryType };
}

export interface PartnerLogo {
  name: string;
  /** Path to a logo file in /public, e.g. "/logos/partner.svg". */
  src: string;
}

export interface PartnerStory {
  partner: string;
  kind: 'Agency' | 'University';
  quote: string;
  person: string;
  role: string;
}

export const PARTNERS = {
  hero: {
    label: 'Partners',
    title: 'The network behind every application',
    lead: 'StudyInfo works with recruitment agencies, education consultants and universities. Agencies bring students, universities bring programmes, and we make sure every application between them is complete.',
  },
  types: [
    {
      label: 'For recruiters',
      title: 'Agency partners',
      text: 'Recruitment agencies and education consultants join StudyInfo to reach more universities through one reliable partner.',
      gets: [
        'Submit student files through one process',
        'AI document checks, reviewed by our team',
        'Programme shortlists for every student',
        'One status view for all your applications',
      ],
      cta: { label: 'Become an agency partner', type: 'agency' },
    },
    {
      label: 'For institutions',
      title: 'Partner universities',
      text: 'Universities and colleges partner with StudyInfo to receive complete, well-matched applications from verified agencies.',
      gets: [
        'Applications that are ready to assess',
        'Recruitment in the markets you target',
        'Your programmes and requirements kept current',
        'One point of contact for every agency',
      ],
      cta: { label: 'Become a partner university', type: 'university' },
    },
  ] satisfies PartnerType[],
  steps: [
    { title: 'Apply to partner', text: 'Agencies and universities contact us. We agree terms and add you to our network.' },
    { title: 'Send student files', text: 'Agency partners send student files to us through one structured process.' },
    { title: 'We verify and match', text: 'AI and our team check each document and match the student to suitable programmes.' },
    { title: 'Submit and track', text: 'We submit to partner universities and every party follows the file to a decision.' },
  ],
  // Add real partner logos and stories here. Each section stays hidden while its list is empty.
  logos: [] as PartnerLogo[],
  stories: [] as PartnerStory[],
};
