import type { Block } from './blocks';

export const INTAKE = {
  hero: {
    label: 'Intake',
    title: 'Every student file, checked before it moves',
  },
  blocks: [
    {
      title: 'Student file intake, fully structured',
      text: 'Agency partners send student files to StudyInfo through one process. AI reads each document on arrival, and our admissions team reviews every file.',
      link: { to: '/ai', label: 'AI document checks' },
      panel: {
        title: 'Every file checked on arrival',
        text: 'Each new file is read by AI and queued for our admissions team, so problems are found as soon as the file arrives.',
      },
      features: [
        { title: 'Completeness check', text: 'Passport, transcripts, English test, statement of purpose, references and CV.' },
        { title: 'Clear requests', text: 'Incomplete files go back to the agency with an exact list of what is missing.' },
        { title: 'One format for every university', text: 'The same submission process, whichever partner university the student applies to.' },
        { title: 'Always a clear status', text: 'Every file carries one status, from received to decision.' },
      ],
    },
    {
      title: 'What a complete student file includes',
      text: 'Requirements vary by programme. We confirm the exact list with each partner university and check every file against it.',
      link: { to: '/now/what-a-complete-student-file-includes', label: 'Read the guide' },
      panel: {
        title: 'Six documents, checked every time',
        text: 'The documents most admissions teams ask for, and what we look for in each one.',
      },
      features: [],
    },
    {
      title: 'Nothing sits in a queue',
      text: 'When something is missing, the agency knows exactly what to send, and the file continues as soon as it arrives.',
      link: { to: '/tracking', label: 'Tracking' },
      panel: {
        title: 'Requests an agency can act on',
        text: 'A precise list of missing documents, instead of a vague rejection weeks later.',
      },
      features: [
        { title: 'Validity checked too', text: 'Passports and test results are checked against the dates that matter.' },
        { title: 'Picks up where it left off', text: 'When the missing documents arrive, the file goes straight back into review.' },
      ],
    },
  ] satisfies Block[],
};
