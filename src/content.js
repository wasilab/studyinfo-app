export const NAV = [
  ['accept', 'What we accept'],
  ['services', 'Services'],
  ['process', 'How it works'],
  ['standards', 'Standards'],
  ['faq', 'FAQ'],
];

// The three things we accept, each with its own enquiry subject.
export const TRACKS = [
  {
    id: 'files',
    icon: 'file',
    label: 'For agencies',
    title: 'Student files',
    text: 'Send us your students’ application files. We verify every document, match the student to suitable programmes and submit to our partner universities.',
    points: ['Undergraduate and postgraduate', 'All intakes our partners offer', 'One format for every university'],
    cta: 'Submit student files',
    subject: 'Student file submission',
  },
  {
    id: 'agency',
    icon: 'users',
    label: 'For recruiters',
    title: 'Agency partners',
    text: 'Recruitment agencies and education consultants join our network to reach more universities through a single, reliable partner.',
    points: ['Access to our university network', 'Programme matching for each student', 'Clear status on every application'],
    cta: 'Become an agency partner',
    subject: 'Agency partnership',
  },
  {
    id: 'university',
    icon: 'building',
    label: 'For institutions',
    title: 'Partner universities',
    text: 'Universities and colleges partner with us to receive complete, well-matched applications from verified agencies.',
    points: ['Applications ready to assess', 'Recruitment in the markets you target', 'One point of contact for all agencies'],
    cta: 'Become a partner university',
    subject: 'University partnership',
  },
];

export const SERVICES = [
  {
    icon: 'shield',
    title: 'Document verification',
    text: 'Every student file is checked for completeness and consistency before it moves on. Incomplete files go back to the agency with a precise list of what is missing.',
  },
  {
    icon: 'match',
    title: 'Programme matching',
    text: 'We compare each student profile with partner entry requirements, including grades, English scores and intake deadlines, and shortlist realistic options.',
  },
  {
    icon: 'send',
    title: 'Application submission',
    text: 'We submit applications to partner universities in the format each admissions team expects, so nothing is delayed by paperwork.',
  },
  {
    icon: 'track',
    title: 'Status tracking',
    text: 'Agencies and universities see the same status for every file, from receipt to decision, without chasing email threads.',
  },
  {
    icon: 'handshake',
    title: 'Partner management',
    text: 'We onboard agencies and universities, keep programme and requirement details current, and act as the single contact between them.',
  },
  {
    icon: 'globe',
    title: 'International reach',
    text: 'We work with agencies and universities across countries, connecting student demand in one market with programmes in another.',
  },
];

export const STEPS = [
  { title: 'Apply to partner', text: 'Agencies and universities contact us. We agree terms and add you to our network.' },
  { title: 'Send student files', text: 'Agency partners send student files to us through one structured process.' },
  { title: 'We verify and match', text: 'Our team checks each document and matches the student to suitable programmes.' },
  { title: 'Submit and track', text: 'We submit to partner universities and every party follows the file to a decision.' },
];

export const STANDARDS = [
  {
    title: 'Complete before submission',
    text: 'No file reaches a university until every required document is present and checked.',
  },
  {
    title: 'Student data handled with care',
    text: 'Student information is used only for their applications and shared only with the universities they apply to.',
  },
  {
    title: 'Verified partners only',
    text: 'We work with agencies and universities that have agreed partnership terms with us.',
  },
  {
    title: 'One transparent status',
    text: 'Agencies and universities see the same application status at every stage.',
  },
];

export const CHECKLIST = [
  ['Passport', 'Valid for the full length of study'],
  ['Academic transcripts', 'Certified copies with grading scale'],
  ['English test score', 'IELTS, TOEFL, PTE or equivalent'],
  ['Statement of purpose', 'Tailored to the chosen programme'],
  ['Reference letters', 'Usually two, academic or professional'],
  ['CV', 'Required for most postgraduate courses'],
];

export const FAQ = [
  {
    q: 'Who can submit student files?',
    a: 'Agency partners that have agreed partnership terms with us. If you are an agency and not yet a partner, contact us and we will start the onboarding.',
  },
  {
    q: 'How does an agency become a partner?',
    a: 'Email us with your agency name, the countries you recruit from and the study levels you work with. We review your details, agree terms and give you access to our submission process.',
  },
  {
    q: 'How does a university become a partner?',
    a: 'Tell us the programmes, intakes and markets you recruit for. We agree the terms, add your university to our network and start sending matched applications.',
  },
  {
    q: 'What happens if a student file is incomplete?',
    a: 'We return it to the agency with a list of exactly what is missing, before it reaches any university.',
  },
  {
    q: 'Which study levels and intakes do you support?',
    a: 'Undergraduate and postgraduate programmes across all intakes our partner universities offer, most commonly September and January.',
  },
  {
    q: 'How is student data protected?',
    a: 'Student information is used only to process their applications and is shared only with the universities they apply to.',
  },
];
