export type Status = 'received' | 'review' | 'missing' | 'verified' | 'submitted' | 'decision';

export const STATUSES: { id: Status; label: string; text: string }[] = [
  { id: 'received', label: 'Received', text: 'The file has arrived and is waiting for checks.' },
  { id: 'review', label: 'In review', text: 'AI and our admissions team are checking every document.' },
  { id: 'missing', label: 'Missing documents', text: 'Something is missing. The agency has an exact list of what to send.' },
  { id: 'verified', label: 'Verified', text: 'Every required document is present and checked.' },
  { id: 'submitted', label: 'Submitted', text: 'The application has been sent to the partner university.' },
  { id: 'decision', label: 'Decision', text: 'The university has made its decision.' },
];

export const STATUS_LABEL = Object.fromEntries(STATUSES.map((s) => [s.id, s.label])) as Record<Status, string>;

export interface ExampleFile {
  id: string;
  student: string;
  programme: string;
  intake: string;
  country: string;
  status: Status;
  note: string;
}

// Illustration data for the product mock-ups. Not real students.
export const EXAMPLE_FILES: ExampleFile[] = [
  { id: 'SI-2041', student: 'A. Rahman', programme: 'MSc Data Science', intake: 'Sep 2027', country: 'BD', status: 'review', note: 'AI check: 6 of 6 documents' },
  { id: 'SI-2042', student: 'C. Okafor', programme: 'BEng Mechanical Engineering', intake: 'Sep 2027', country: 'NG', status: 'missing', note: 'English test score missing' },
  { id: 'SI-2043', student: 'L. Nguyen', programme: 'MSc Finance', intake: 'Jan 2028', country: 'VN', status: 'verified', note: 'Ready for matching' },
  { id: 'SI-2044', student: 'P. Sharma', programme: 'MSc Public Health', intake: 'Sep 2027', country: 'IN', status: 'submitted', note: 'Sent to partner university' },
  { id: 'SI-2045', student: 'M. Haddad', programme: 'BA International Relations', intake: 'Sep 2027', country: 'JO', status: 'received', note: 'Waiting for checks' },
  { id: 'SI-2046', student: 'S. Mensah', programme: 'MBA', intake: 'Jan 2028', country: 'GH', status: 'decision', note: 'Offer issued' },
];

export const CHECKLIST: { name: string; note: string }[] = [
  { name: 'Passport', note: 'Valid for the full length of study' },
  { name: 'Academic transcripts', note: 'Certified copies with grading scale' },
  { name: 'English test score', note: 'IELTS, TOEFL, PTE or equivalent' },
  { name: 'Statement of purpose', note: 'Tailored to the chosen programme' },
  { name: 'Reference letters', note: 'Usually two, academic or professional' },
  { name: 'CV', note: 'Required for most postgraduate courses' },
];
