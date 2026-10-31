import type { IconName } from '../components/ui/Icon';

/** Copy for /about: the problem StudyInfo solves, our mission and vision, and the partnership behind it. */

export interface Company {
  initials: string;
  name: string;
  role: string;
  /** One line for the handshake diagram. */
  line: string;
  points: string[];
}

export const ABOUT = {
  hero: {
    label: 'About',
    title: 'Every student deserves a place',
    lead: 'StudyInfo connects international education agencies, so a student who fits a university is never turned away. It is a partnership between Tablab Research and Global Desire Education.',
  },
  problem: {
    title: 'The problem we solve',
    text: 'Most agencies can’t apply to every university. Until now, that meant good students were turned away.',
    points: [
      { icon: 'building', title: 'Agencies can’t apply everywhere', text: 'A university works directly with only some agencies, so a student who fits it can be turned away.' },
      { icon: 'file', title: 'Files arrive incomplete', text: 'Missing or unclear documents cost weeks of back and forth.' },
      { icon: 'lock', title: 'Sharing a student feels risky', text: 'Agencies worry about losing the student to the agency they share with.' },
    ] satisfies { icon: IconName; title: string; text: string }[],
    answer: {
      statement: 'StudyInfo turns that limit into a network.',
      rest: 'Every file is checked by our team, both agencies stay anonymous, and the commission is shared.',
    },
  },
  mission: 'Give every student a path to the right university, and every agency a way to grow, through one trusted network.',
  vision: 'A world where an agency’s reach is no longer limited by the universities it works with.',
  partnership: {
    label: 'A partnership project',
    title: 'Two companies, one network',
    text: 'StudyInfo is a partnership project. Tablab Research builds and runs the technology. Global Desire Education runs the network, under an exclusive license from Tablab Research.',
    companies: [
      {
        initials: 'TR',
        name: 'Tablab Research',
        role: 'Research and technology',
        line: 'Builds the platform and runs it in the cloud',
        points: ['Researches and builds the StudyInfo platform', 'Runs StudyInfo in the cloud', 'Grants Global Desire Education an exclusive license to run StudyInfo'],
      },
      {
        initials: 'GD',
        name: 'Global Desire Education',
        role: 'Operations',
        line: 'Onboards agencies and runs the network',
        points: ['Holds the exclusive license to run StudyInfo', 'Onboards agencies to the network', 'Runs and maintains day-to-day operations'],
      },
    ] satisfies Company[],
    steps: [
      { title: 'Build and run', text: 'Tablab Research builds the platform and runs it in the cloud.' },
      { title: 'License', text: 'Tablab Research grants Global Desire Education an exclusive license.' },
      { title: 'Operate', text: 'Global Desire Education onboards agencies and runs the network.' },
    ],
  },
};
