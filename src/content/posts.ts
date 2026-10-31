export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Guide' | 'How we work';
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: 'what-a-complete-student-file-includes',
    title: 'What a complete student file includes',
    excerpt: 'The six documents most admissions teams ask for, and the details that most often hold an application back.',
    category: 'Guide',
    body: [
      { type: 'p', text: 'Most delays in international admissions come from files that arrive incomplete. A missing reference or an unclear transcript can hold an application for weeks while emails go back and forth. These are the documents we check for in every student file.' },
      { type: 'h2', text: 'Passport' },
      { type: 'p', text: 'A clear copy of the photo page. It should be valid for the full length of study, because an expiring passport causes problems later in the visa process and is easy to miss early on.' },
      { type: 'h2', text: 'Academic transcripts' },
      { type: 'p', text: 'Certified copies of transcripts and certificates for each completed level of study, including the grading scale. Admissions teams compare grades across countries, so the scale matters as much as the grades.' },
      { type: 'h2', text: 'English test score' },
      { type: 'p', text: 'An IELTS, TOEFL, PTE or equivalent result, or evidence of an exemption. Check the section scores as well as the overall score: many programmes set a minimum for each section.' },
      { type: 'h2', text: 'Statement of purpose' },
      { type: 'p', text: 'A personal statement written for the chosen programme. A generic statement sent to every university is one of the most common reasons an application reads as weak.' },
      { type: 'h2', text: 'Reference letters' },
      { type: 'p', text: 'Usually two, academic or professional, with the referee’s name, role and contact details.' },
      { type: 'h2', text: 'CV' },
      { type: 'p', text: 'Required for most postgraduate courses, especially where work experience is part of the entry requirements.' },
      { type: 'h2', text: 'Before you send' },
      { type: 'ul', items: [
        'The student’s name is spelled the same way on every document',
        'Dates, grades and stamps are legible',
        'Documents not in English come with certified translations',
        'Test results will still be valid when the application is assessed',
      ] },
      { type: 'p', text: 'Requirements vary by programme and university. We confirm the exact list with each partner university and check every file against it.' },
    ],
  },
  {
    slug: 'how-ai-and-our-team-check-every-file',
    title: 'How AI and our team check every file',
    excerpt: 'What our AI looks for in a student file, and why a person still reviews every one.',
    category: 'How we work',
    body: [
      { type: 'p', text: 'Every student file that reaches StudyInfo is checked twice: first by AI, then by a member of our admissions team.' },
      { type: 'h2', text: 'What the AI checks' },
      { type: 'p', text: 'The AI reads each document in the file and compares it with the others and with the requirements of the programmes the student is interested in. It looks for:' },
      { type: 'ul', items: [
        'Documents missing from the file',
        'Names and dates that differ between documents',
        'Passports or test results that have expired',
        'Grades and test scores below a programme’s requirement',
      ] },
      { type: 'h2', text: 'What our team does' },
      { type: 'p', text: 'The AI produces findings, not decisions. Our admissions team reviews each finding, confirms the file is complete and approves the programme shortlist. If something is missing, the agency gets an exact list of what to send.' },
      { type: 'h2', text: 'Why we use both' },
      { type: 'p', text: 'AI is fast and consistent at reading documents. People are better at judging context: an unusual grading system, a gap in study, a reference from a small employer. Using both means files move quickly without decisions being left to software.' },
      { type: 'h2', text: 'Student data' },
      { type: 'p', text: 'Student information is used only to process their applications and is shared only with the universities they apply to.' },
    ],
  },
  {
    slug: 'planning-for-the-september-and-january-intakes',
    title: 'Planning for the September and January intakes',
    excerpt: 'How to plan student files around the main intakes, and why the timeline starts earlier than most people expect.',
    category: 'Guide',
    body: [
      { type: 'p', text: 'Many universities that recruit internationally run a main intake in September and a second intake in January or February. Some programmes also start in spring or summer. The intake sets every deadline that follows, so planning starts with choosing it.' },
      { type: 'h2', text: 'Work backwards from the start date' },
      { type: 'p', text: 'Between application and the first day of classes sit the university’s decision, any conditions on the offer, deposits, the visa application and travel. Each step takes time, and visa processing alone can take several weeks.' },
      { type: 'h2', text: 'A typical timeline' },
      { type: 'ul', items: [
        '9 to 12 months before: shortlist programmes and check entry requirements',
        '6 to 9 months before: book English tests and collect documents',
        '4 to 6 months before: submit complete applications',
        'After an offer: meet any conditions, pay deposits and apply for the visa',
      ] },
      { type: 'p', text: 'Popular programmes can fill early, so applying earlier keeps more options open.' },
      { type: 'h2', text: 'September or January?' },
      { type: 'p', text: 'September usually offers the widest choice of programmes. January suits students who need more time for English tests or documents, though fewer programmes may start then.' },
      { type: 'p', text: 'We confirm intake dates and deadlines with each partner university and match students to programmes whose deadlines they can realistically meet.' },
    ],
  },
  {
    slug: 'english-test-scores-what-admissions-teams-look-for',
    title: 'English test scores: what admissions teams look for',
    excerpt: 'Overall scores, section minimums and validity: three things to check before a file is submitted.',
    category: 'Guide',
    body: [
      { type: 'p', text: 'English language requirements are one of the most common reasons an application is delayed or made conditional. Three checks catch most problems.' },
      { type: 'h2', text: 'Overall and section scores' },
      { type: 'p', text: 'Most programmes set an overall minimum and a minimum for each section: reading, writing, listening and speaking. A student can meet the overall score and still fall short in one section.' },
      { type: 'h2', text: 'Accepted tests' },
      { type: 'p', text: 'Commonly accepted tests include IELTS Academic, TOEFL iBT and PTE Academic. Each university decides which tests it accepts, so check before the student books one.' },
      { type: 'h2', text: 'Validity' },
      { type: 'p', text: 'Results from these tests are usually valid for two years. A result that expires before the application is assessed may not be accepted.' },
      { type: 'h2', text: 'Exemptions' },
      { type: 'p', text: 'Some universities waive the test for students who completed previous study in English. Exemption rules vary by university, so they need to be confirmed for each programme.' },
      { type: 'p', text: 'Our AI checks test scores against each programme’s requirements, and our team confirms the result before a file is submitted.' },
    ],
  },
  {
    slug: 'writing-a-statement-of-purpose-that-gets-read',
    title: 'Writing a statement of purpose that gets read',
    excerpt: 'What admissions teams want to learn from a statement of purpose, and the mistakes that make it harder to assess.',
    category: 'Guide',
    body: [
      { type: 'p', text: 'The statement of purpose is the one document where the student explains, in their own words, why they want the programme. Admissions teams read a lot of them, so a clear, specific statement stands out.' },
      { type: 'h2', text: 'What admissions teams look for' },
      { type: 'ul', items: [
        'Why this subject, and why now',
        'Why this programme at this university',
        'Relevant study, work or projects',
        'What the student plans to do afterwards',
      ] },
      { type: 'h2', text: 'Common problems' },
      { type: 'ul', items: [
        'One statement sent to every university',
        'A long life story with little about the programme',
        'Claims without examples to support them',
        'Going over the word limit',
      ] },
      { type: 'h2', text: 'Practical tips' },
      { type: 'p', text: 'Keep to the university’s word limit, use specific examples and check that the programme name is correct. A statement written for one university should never mention another.' },
      { type: 'p', text: 'We check that every statement is tailored to the programme it is submitted for.' },
    ],
  },
];

/** Minutes to read, from the article's word count. */
export function readingTime(post: Post) {
  const words = [post.title, post.excerpt, ...post.body.flatMap((b) => (b.type === 'ul' ? b.items : [b.text]))]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
