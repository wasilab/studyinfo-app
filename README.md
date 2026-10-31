# studyinfo-app

Marketing website for StudyInfo, the network for international education agencies. Agencies with students send their files through StudyInfo to agencies that hold the university relationship; agencies with universities add them to receive verified files; our team checks every file in between, and the two agencies share the commission. Built with React, TypeScript, Tailwind CSS v4 and React Router.

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`, `npm run lint` runs ESLint, and `npm run preview` serves the build locally.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/send-files` | Sending student files and our document check |
| `/universities` | Adding your universities and receiving verified files |
| `/tracking` | Case steps, the three-party thread and commission status |
| `/toolkit` | CRM, recommendations, AI tools, marketing and the branded portal |
| `/network` | How the network works, anonymity and FAQ |
| `/grow-with-us` | Sales page for our team: send files, add universities, the toolkit, and Try Demo |
| `/now`, `/now/:slug` | Guides and notes |
| `/contact` | Contact form (opens the visitor's email app), phone, WhatsApp and address |

The old routes `/intake`, `/ai`, `/partners` and `/pricing` redirect to `/send-files`, `/toolkit`, `/network` and `/` (`src/App.tsx`).

## Where to edit

- Brand name, email, phone, WhatsApp link and address: `src/config.ts`
- Demo app link for every "Try Demo" button: `DEMO_URL` in `src/config.ts`. While it is empty, the buttons open the contact form with "Book a demo" selected.
- Page copy: `src/content/*.ts`
- Example data shown in the product illustrations: `src/content/files.ts`
- Colours, fonts and animations: the `@theme` block in `src/index.css`. The site uses a deep navy palette: page and panel colours are `--color-canvas`, `--color-surface` and `--color-surface-2`; text is `--color-ink` to `--color-ink-3`; the accent is `--color-accent`.
- Statements shown in the coloured cards and the product links near the end of each page: `src/content/site.ts`

## Motion

Animations switch off for visitors who ask for reduced motion, and nothing is hidden waiting for an animation.

- **Headlines** sharpen in word by word (`WordReveal`), and pages fade in on navigation (`Layout.tsx`).
- **Home hero:** the workspace runs a short looping demo of an agency's Sent Applications. Our team checks a file's documents, the file is forwarded and moves to its new group, then a toast appears (`src/components/mock/Workspace.tsx`). The loop pauses while the hero is off screen.
- **How it works** (home) is a scroll story: the steps scroll while a pinned product window crossfades between them (`src/components/sections/HowItWorks.tsx`).
- **Product-page heroes** have animated backdrops with a scroll parallax, paused off screen (`src/components/ui/HeroBackdrop.tsx`).
- **Scroll reveals:** sections fade in through the `reveal` class, which uses scroll-driven animations. Browsers without support show the content straight away.
  - A `reveal` element measures scrolling from its nearest scrollable ancestor, and `overflow-hidden` makes an element scrollable. Wrap revealed content in `overflow-clip` instead, or the reveal never finishes.
- **Small charts** in the feature grids animate once when scrolled into view (`useInView` in `src/lib/motion.ts`). Elements that start on screen are left in their final state.
- **Details:**
  - A moving light around the hero pill (`border-beam`).
  - An animated FAQ on How it works.
  - Button press feedback, and hover lifts on feature illustrations.

## Hosting

The site uses client-side routing, so the host must serve `index.html` for every path. `public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this. The site is not deployed anywhere yet.

The contact form has no backend: it opens the visitor's email app with the message addressed to the contact email. Connect it to a form service when you have one.
