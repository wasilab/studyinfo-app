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
    excerpt: 'The five things every file needs before it can be sent, the optional documents that strengthen it, and the details that most often send a file back.',
    category: 'Guide',
    body: [
      { type: 'p', text: 'A file that arrives incomplete comes back before it goes anywhere. On StudyInfo, a student file can only be submitted once every required item is in place, and our team checks each document before the file is forwarded. These are the items to prepare.' },
      { type: 'h2', text: 'Student profile' },
      { type: 'p', text: 'Personal details, education history and the programme the student has chosen. The profile is the first page of the Student Application PDF, so it needs to match the documents behind it.' },
      { type: 'h2', text: 'Passport' },
      { type: 'p', text: 'A clear copy of the photo page. It should be valid for the full length of study, because an expiring passport causes problems later in the visa process and is easy to miss early on.' },
      { type: 'h2', text: 'Academic transcripts' },
      { type: 'p', text: 'Copies of transcripts and certificates for each completed level of study, including the grading scale. Grades are compared across countries, so the scale matters as much as the grades.' },
      { type: 'h2', text: 'English test score' },
      { type: 'p', text: 'An IELTS, TOEFL, PTE or equivalent result. Check the section scores as well as the overall score: many programmes set a minimum for each section.' },
      { type: 'h2', text: 'University fields' },
      { type: 'p', text: 'Some universities ask every applicant for extra answers or documents. The agency that owns the university adds these fields, and the file can’t be submitted until they are complete.' },
      { type: 'h2', text: 'Optional additional documents' },
      { type: 'p', text: 'A CV, a statement of purpose and reference letters are optional on StudyInfo. Many programmes expect them, especially at postgraduate level, so add them whenever the student has them.' },
      { type: 'h2', text: 'Before you send' },
      { type: 'ul', items: [
        'The student’s name is spelled the same way on every document',
        'Dates, grades and stamps are legible',
        'Documents not in English come with certified translations',
        'Test results will still be valid when the application is assessed',
      ] },
      { type: 'p', text: 'Requirements vary by programme and university. Each university’s owner agency keeps its programmes and application fields up to date, and our team checks every file before it is forwarded.' },
    ],
  },
  {
    slug: 'how-our-team-checks-every-student-file',
    title: 'How our team checks every student file',
    excerpt: 'What happens between submitting a student file and forwarding it to an applying agency.',
    category: 'How we work',
    body: [
      { type: 'p', text: 'Every student file sent through StudyInfo is checked by a person on our team before it goes anywhere. Applying agencies only ever receive files that have passed.' },
      { type: 'h2', text: 'What we look at' },
      { type: 'p', text: 'We review each document in the Student Application PDF. The most common reasons a file comes back are:' },
      { type: 'ul', items: [
        'A document is unreadable, incomplete or not the one required',
        'Names or dates differ between documents',
        'A passport or English test result has expired',
        'A university field is unanswered',
      ] },
      { type: 'h2', text: 'If something needs fixing' },
      { type: 'p', text: 'The file comes back to your agency with a reason and a note that says what to fix. Update the file and resubmit it, and it is checked again. Your student only ever sees “Under review by our team”.' },
      { type: 'h2', text: 'When the file passes' },
      { type: 'p', text: 'We forward it to an applying agency, by default the agency that owns the university in the catalog. From then on all three parties follow the case in one thread, and the applying agency applies and moves the university-side steps.' },
      { type: 'h2', text: 'Why a person checks every file' },
      { type: 'p', text: 'Context matters: an unusual grading system, a gap in study, a document issued in another language. A person on our team can weigh these and explain exactly what needs to change.' },
      { type: 'h2', text: 'Student data' },
      { type: 'p', text: 'Only the parties to a file can open it: your agency, the applying agency it is forwarded to and our team. Agencies never see each other’s name or contact details, and notes, messages and attachments are encrypted.' },
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
      { type: 'p', text: 'Send files early, so the document check and the application both fit comfortably before the programme’s deadline.' },
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
      { type: 'p', text: 'StudyInfo’s recommendations compare a student’s overall and section scores with each programme’s minimums, and our team checks the test result in every file before it is forwarded.' },
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
      { type: 'p', text: 'A statement of purpose is optional on StudyInfo, but when a programme expects one, a statement written for that programme makes the application stronger.' },
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
