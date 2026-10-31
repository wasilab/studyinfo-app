# studyinfo-app

Marketing website for StudyInfo, the B2B admissions partner for agencies and universities. Built with React, TypeScript, Tailwind CSS v4 and React Router.

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`, `npm run lint` runs ESLint, and `npm run preview` serves the build locally.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/intake` | How student files are taken in and checked |
| `/ai` | AI document checks and programme matching |
| `/tracking` | Submission and one shared application status |
| `/partners` | Agency partners and partner universities |
| `/pricing` | Free for agencies, custom terms for universities |
| `/now`, `/now/:slug` | Guides and notes |
| `/contact` | Contact form (opens the visitor's email app) |

## Where to edit

- Brand name and contact email: `src/config.ts`
- Page copy: `src/content/*.ts`
- Partner logos and stories: `src/content/partners.ts` (each section appears once its list has entries)
- Example data shown in the product illustrations: `src/content/files.ts`
- Colours, fonts and animations: the `@theme` block in `src/index.css` (the accent colour is `--color-accent`)
- Statements shown in the coloured cards and the product links near the end of each page: `src/content/site.ts`

## Motion

Animations switch off for visitors who ask for reduced motion, and nothing is hidden waiting for an animation.

- **Headlines** sharpen in word by word (`WordReveal`), and pages fade in on navigation (`Layout.tsx`).
- **Home hero:** the workspace runs a short looping demo. A file is checked, verified and moves to its new group, then a toast appears (`src/components/mock/Workspace.tsx`). The loop pauses while the hero is off screen.
- **How it works** (home) is a scroll story: the steps scroll while a pinned product window crossfades between them (`src/components/sections/HowItWorks.tsx`).
- **Product-page heroes** have animated backdrops with a scroll parallax, paused off screen (`src/components/ui/HeroBackdrop.tsx`).
- **Scroll reveals:** sections fade in through the `reveal` class, which uses scroll-driven animations. Browsers without support show the content straight away.
  - A `reveal` element measures scrolling from its nearest scrollable ancestor, and `overflow-hidden` makes an element scrollable. Wrap revealed content in `overflow-clip` instead, or the reveal never finishes.
- **Small charts** in the feature grids animate once when scrolled into view (`useInView` in `src/lib/motion.ts`). Elements that start on screen are left in their final state.
- **Details:**
  - A moving light around the AI pill and the featured pricing card (`border-beam`).
  - An animated FAQ.
  - Button press feedback, and hover lifts on feature illustrations.

## Hosting

The site uses client-side routing, so the host must serve `index.html` for every path. `public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this. The site is not deployed anywhere yet.

The contact form has no backend: it opens the visitor's email app with the message addressed to the contact email. Connect it to a form service when you have one.
