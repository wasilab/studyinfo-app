import type { IconName } from '../components/ui/Icon';

export type MockName = 'intake' | 'match' | 'submission' | 'board';

export interface Chapter {
  num: string;
  label: string;
  to?: string;
  title: string;
  text: string;
  mock: MockName;
  points: { num: string; title: string; text: string }[];
}

export const HERO = {
  pill: { label: 'AI document checks, reviewed by our team', to: '/ai' },
  title: 'The admissions partner for agencies and universities',
  lead: 'StudyInfo accepts student files from agency partners, checks every document with AI and our admissions team, and submits complete applications to partner universities.',
};

export const ACCEPT: { title: string; text: string; to: string }[] = [
  { title: 'Student files', text: 'From agency partners, in one consistent format.', to: '/intake' },
  { title: 'Agency partners', text: 'Recruitment agencies and education consultants.', to: '/partners' },
  { title: 'Partner universities', text: 'Universities and colleges recruiting internationally.', to: '/partners' },
];

export const INTRO = {
  statement: 'One partner from first file to final decision.',
  rest: 'We check every document, match each student to programmes they can be admitted to, and keep agencies and universities looking at the same status.',
  pillars: [
    { icon: 'shield', title: 'Verified before submission', text: 'No file reaches a university until every required document is present and checked.' },
    { icon: 'sparkle', title: 'AI-assisted, human-reviewed', text: 'AI reads each document and suggests programmes. Our team signs off on every file.' },
    { icon: 'track', title: 'One shared status', text: 'Agencies and universities follow each application from receipt to decision.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const CHAPTERS: Chapter[] = [
  {
    num: '1.0',
    label: 'Intake',
    to: '/intake',
    title: 'Every file, checked on arrival',
    text: 'Agency partners send student files through one structured process. Each file is checked for completeness before anything else happens.',
    mock: 'intake',
    points: [
      { num: '1.1', title: 'Completeness check', text: 'Passport, transcripts, English test, statement of purpose, references and CV.' },
      { num: '1.2', title: 'Clear requests', text: 'Incomplete files go back to the agency with an exact list of what is missing.' },
      { num: '1.3', title: 'One format', text: 'The same submission process for every partner university.' },
    ],
  },
  {
    num: '2.0',
    label: 'AI matching',
    to: '/ai',
    title: 'Programmes the student can get into',
    text: 'AI compares each student profile with partner entry requirements and explains every suggestion. Our admissions team confirms the shortlist.',
    mock: 'match',
    points: [
      { num: '2.1', title: 'Requirement checks', text: 'Grades, English scores and intake dates against each programme.' },
      { num: '2.2', title: 'Reasons, not scores', text: 'Every suggestion says why it fits or what is missing.' },
      { num: '2.3', title: 'Human sign-off', text: 'A member of our team reviews every shortlist.' },
    ],
  },
  {
    num: '3.0',
    label: 'Submission',
    title: 'Applications ready to assess',
    text: 'We submit each application to partner universities in the format their admissions team expects, so nothing is delayed by paperwork.',
    mock: 'submission',
    points: [
      { num: '3.1', title: 'University-ready packages', text: 'Documents ordered and named the way each admissions team asks.' },
      { num: '3.2', title: 'Checked twice', text: 'An AI check and a human review before anything is sent.' },
      { num: '3.3', title: 'One point of contact', text: 'Universities deal with StudyInfo, not dozens of agency inboxes.' },
    ],
  },
  {
    num: '4.0',
    label: 'Tracking',
    title: 'One status for every application',
    text: 'Agencies and universities see the same status for every file, from receipt to decision, without chasing email threads.',
    mock: 'board',
    points: [
      { num: '4.1', title: 'Shared view', text: 'The same status for the agency, the university and our team.' },
      { num: '4.2', title: 'Every stage', text: 'Received, in review, verified, submitted and decision.' },
      { num: '4.3', title: 'Fewer follow-ups', text: 'Nobody has to chase an email thread to find out where a file is.' },
    ],
  },
];

export const AUDIENCES = [
  {
    label: 'For agencies',
    title: 'Place more students with less paperwork',
    points: [
      'One submission process for every partner university',
      'Programme shortlists based on real entry requirements',
      'A single status view for all your applications',
    ],
    cta: { label: 'Become an agency partner', type: 'agency' as const },
    note: 'Free to join',
  },
  {
    label: 'For universities',
    title: 'Receive applications that are ready to assess',
    points: [
      'Files checked for completeness before they arrive',
      'Access to agency partners in the markets you target',
      'One point of contact instead of dozens of inboxes',
    ],
    cta: { label: 'Become a partner university', type: 'university' as const },
    note: 'Custom terms',
  },
];

export const STANDARDS: { title: string; text: string }[] = [
  { title: 'Complete before submission', text: 'No file reaches a university until every required document is present and checked.' },
  { title: 'Student data handled with care', text: 'Student information is used only for their applications and shared only with the universities they apply to.' },
  { title: 'Verified partners only', text: 'We work with agencies and universities that have agreed partnership terms with us.' },
  { title: 'One transparent status', text: 'Agencies and universities see the same application status at every stage.' },
];
