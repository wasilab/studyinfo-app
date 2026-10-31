import type { IconName } from '../components/ui/Icon';

export const NETWORK = {
  hero: {
    label: 'How it works',
    title: 'Agencies with students meet agencies with universities',
    lead: 'Most agencies can’t apply to every university. StudyInfo turns that limit into a network: a file travels from the agency that holds the student, through our team, to the agency that holds the university relationship.',
  },
  parties: [
    {
      icon: 'users',
      role: 'Student agency',
      title: 'Holds the student',
      text: 'Collects the documents, confirms the application and submits the file. Keeps its own steps, from offer acceptance to visa, and follows the case to the end.',
    },
    {
      icon: 'shield',
      role: 'StudyInfo team',
      title: 'Checks and routes',
      text: 'Checks every document, returns a file with a reason or forwards it, can reassign it to another applying agency, and keeps an eye on every case.',
    },
    {
      icon: 'building',
      role: 'Applying agency',
      title: 'Holds the university relationship',
      text: 'Receives the verified file, applies to the university, uploads the offer letter and moves the university-side steps.',
    },
  ] satisfies { icon: IconName; role: string; title: string; text: string }[],
  journey: [
    { title: 'Submit', text: 'The student agency confirms the application and submits. A Student Application PDF is built from the required documents.' },
    { title: 'Document check', text: 'Our team reviews the documents. A file with a problem is returned with a reason and a note, and can be resubmitted.' },
    { title: 'Forward', text: 'The verified file goes to an applying agency, by default the university’s owner agency. Our team can reassign it later.' },
    { title: 'Apply', text: 'The applying agency applies to the university, uploads the offer letter and moves its own steps.' },
    { title: 'Talk', text: 'All three parties message each other in one thread on the case, with attachments and read receipts.' },
    { title: 'Commission', text: 'When the case reaches its final step, the commission step tracks the agency commission: pending, claimed, received.' },
  ],
  anonymity: {
    title: 'Anonymous by design',
    text: 'The two agencies work on the same case without ever learning who the other is.',
    points: [
      'Agencies see role labels only: never a name, logo, staff member, email or phone number',
      'Only our team sees both agencies',
      'Anyone who isn’t a party to a file gets “not found”',
      'Notes, messages and attachments are encrypted',
      'The Student Application PDF carries no agency branding',
      'Every move is written to the case history',
    ],
  },
  catalog: {
    title: 'One global catalog',
    text: 'Every active university is visible to every agency, so you can recommend any university to your students, including ones you can’t apply to yourself. That is exactly what the network is for.',
  },
  faq: [
    {
      q: 'Who can see my student’s file?',
      a: 'Only the parties to it: your agency, the applying agency our team forwards it to, and our team. Anyone else gets “not found”. The applying agency works from the Student Application PDF and never sees your agency’s name, logo, staff or contact details.',
    },
    {
      q: 'What happens if a document isn’t right?',
      a: 'Our team returns the file to you with a reason and a note. Fix it and resubmit, and the file is checked again.',
    },
    {
      q: 'Which agency applies to the university?',
      a: 'By default, the agency that owns the university in the catalog. Our team can forward a file to another applying agency, or reassign it later.',
    },
    {
      q: 'Can I recommend universities I can’t apply to?',
      a: 'Yes. Every active university in the catalog is visible to every agency. When your student chooses one you can’t apply to, send the file through StudyInfo.',
    },
    {
      q: 'How do I add our universities?',
      a: 'Your agency’s owner or admin sends a university request with the website, campus country and the platform share you offer. Our team approves it, rejects it with a reason, or links it to a university already in the catalog. Once approved, your agency owns the university.',
    },
    {
      q: 'How does commission work?',
      a: 'Each university carries an agency commission, and the two agencies share it. When a case reaches its final step, the commission step tracks its status: pending, claimed, received. Students never see it.',
    },
    {
      q: 'Does my student see any of this?',
      a: 'No. Your student follows their own journey and sees the document check as “Under review by our team”. They never see the thread, the commission or the other agency.',
    },
    {
      q: 'How do we join?',
      a: 'Send us a message, call or WhatsApp us, and our team will get back to you.',
    },
  ],
};
