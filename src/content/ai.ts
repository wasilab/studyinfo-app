import type { Block } from './blocks';

export const AI = {
  hero: {
    label: 'AI',
    title: 'AI reads every file. Our team signs off.',
  },
  blocks: [
    {
      title: 'Document checks that read every page',
      text: 'AI reads each document in a student file and flags anything that needs attention, so problems are found on arrival instead of weeks later.',
      link: { to: '/intake', label: 'Intake' },
      panel: {
        title: 'Findings a person can check',
        text: 'Every flag comes with a reason, and every file goes to our admissions team for review.',
      },
      features: [
        { title: 'Names and dates that match', text: 'AI compares names and dates across every document in the file.' },
        { title: 'Nothing out of date', text: 'Passports and test results are checked against the dates that matter.' },
        { title: 'Scores against requirements', text: 'Test scores are compared with each programme’s minimums, section by section.' },
        { title: 'Missing documents found early', text: 'Gaps are flagged on arrival, before a file goes any further.' },
      ],
    },
    {
      title: 'Programme matching with reasons',
      text: 'AI compares grades, English test scores and intake dates with the entry requirements of our partner universities, and explains every suggestion.',
      link: { to: '/tracking', label: 'Tracking' },
      panel: {
        title: 'Suggestions you can check',
        text: 'Each programme comes with the reason it fits, or what the student is missing.',
      },
      features: [
        { title: 'Matched to the right intake', text: 'Suggestions respect intake dates and application deadlines.' },
        { title: 'Approved by a person', text: 'A member of our admissions team reviews every shortlist.' },
      ],
    },
    {
      title: 'People make the decisions',
      text: 'Every AI finding and every shortlist is reviewed by our admissions team. Nothing is submitted on AI alone.',
      panel: {
        title: 'AI suggests. People decide.',
        text: 'Only files our team has approved reach a partner university.',
      },
      features: [],
    },
  ] satisfies Block[],
  principles: [
    { title: 'People make the decisions', text: 'AI suggests. Our admissions team decides what is submitted to a university.' },
    { title: 'Explained, not scored', text: 'Every flag and every suggestion comes with a reason a person can check.' },
    { title: 'Student data stays on purpose', text: 'Student information is used only to process their applications and shared only with the universities they apply to.' },
  ],
};
