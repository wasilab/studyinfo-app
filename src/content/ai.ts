export const AI = {
  hero: {
    label: 'AI',
    title: 'AI reads every file. Our team signs off.',
    lead: 'StudyInfo uses AI to check student documents and match students to programmes. Our admissions team reviews every finding and every shortlist before anything reaches a university.',
  },
  capabilities: [
    {
      num: '1.0',
      title: 'Document checks',
      text: 'AI reads each document in a student file and flags anything that needs attention, so problems are found on arrival instead of weeks later.',
      points: [
        'Documents missing from the file',
        'Names and dates that differ between documents',
        'Passports or test results that have expired',
        'Scores below a programme’s requirement',
      ],
    },
    {
      num: '2.0',
      title: 'Programme matching',
      text: 'AI compares grades, English test scores and intake dates with the entry requirements of our partner universities, and explains every suggestion.',
      points: [
        'Entry requirements for each programme',
        'Intake dates and deadlines',
        'A reason for every suggestion',
      ],
    },
    {
      num: '3.0',
      title: 'Human review',
      text: 'Every AI finding and every shortlist is reviewed by a member of our admissions team. Nothing is submitted on AI alone.',
      points: [
        'People confirm each finding',
        'People approve every shortlist',
        'People decide what is submitted',
      ],
    },
  ],
  principles: [
    { title: 'People make the decisions', text: 'AI suggests. Our admissions team decides what is submitted to a university.' },
    { title: 'Explained, not scored', text: 'Every flag and every suggestion comes with a reason a person can check.' },
    { title: 'Student data stays on purpose', text: 'Student information is used only to process their applications and shared only with the universities they apply to.' },
  ],
};
