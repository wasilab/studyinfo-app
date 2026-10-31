/** The steps a student file moves through in the StudyInfo agency network. */
export type Status = 'submitted' | 'check' | 'returned' | 'forwarded' | 'offer' | 'commission';

export const STATUSES: { id: Status; label: string; owner: string; text: string }[] = [
  { id: 'submitted', label: 'Submitted', owner: 'Student agency', text: 'The student agency has sent the file with every required document.' },
  { id: 'check', label: 'Document check', owner: 'StudyInfo team', text: 'Our team checks every document. The student sees “Under review by our team”.' },
  { id: 'returned', label: 'Returned', owner: 'StudyInfo team', text: 'Something needs fixing. The file goes back with a reason and a note, ready to resubmit.' },
  { id: 'forwarded', label: 'Forwarded', owner: 'StudyInfo team', text: 'The verified file is with an applying agency that holds the university relationship.' },
  { id: 'offer', label: 'Offer received', owner: 'Applying agency', text: 'The applying agency has applied and uploaded the offer letter.' },
  { id: 'commission', label: 'Commission', owner: 'Applying agency', text: 'The case is complete, and the agency commission is tracked: pending, claimed, received.' },
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
  { id: 'SI-2041', student: 'A. Rahman', programme: 'MSc Data Science', intake: 'Sep 2027', country: 'BD', status: 'check', note: 'Checking 5 required documents' },
  { id: 'SI-2042', student: 'C. Okafor', programme: 'BEng Mechanical Engineering', intake: 'Sep 2027', country: 'NG', status: 'returned', note: 'English test result expired' },
  { id: 'SI-2043', student: 'L. Nguyen', programme: 'MSc Finance', intake: 'Jan 2028', country: 'VN', status: 'forwarded', note: 'With the applying agency' },
  { id: 'SI-2044', student: 'P. Sharma', programme: 'MSc Public Health', intake: 'Sep 2027', country: 'IN', status: 'offer', note: 'Conditional offer uploaded' },
  { id: 'SI-2045', student: 'M. Haddad', programme: 'BA International Relations', intake: 'Sep 2027', country: 'JO', status: 'submitted', note: 'Waiting for document check' },
  { id: 'SI-2046', student: 'S. Mensah', programme: 'MBA', intake: 'Jan 2028', country: 'GH', status: 'commission', note: 'Commission claimed' },
];

/** What a file needs before it can be submitted. Optional items are listed as additional documents. */
export const CHECKLIST: { name: string; note: string; optional?: boolean }[] = [
  { name: 'Student profile', note: 'Personal details, education history and the chosen programme' },
  { name: 'Passport', note: 'A clear copy of the photo page' },
  { name: 'Academic transcripts', note: 'Certificates and transcripts for completed study' },
  { name: 'English test score', note: 'IELTS, TOEFL, PTE or equivalent' },
  { name: 'University fields', note: 'Any extra questions or documents the university asks for' },
  { name: 'CV', note: 'Additional document', optional: true },
  { name: 'Statement of purpose', note: 'Additional document', optional: true },
  { name: 'Reference letters', note: 'Additional document', optional: true },
];

export const REQUIRED_DOCUMENTS = CHECKLIST.filter((d) => !d.optional);
