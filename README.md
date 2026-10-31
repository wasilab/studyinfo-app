# studyinfo-app

Marketing website for StudyInfo, the B2B admissions partner for agencies and universities. Built with React, TypeScript, Tailwind CSS v4 and React Router.

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`; `npm run preview` serves the build locally.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/intake` | How student files are taken in and checked |
| `/ai` | AI document checks and programme matching |
| `/partners` | Agency partners and partner universities |
| `/pricing` | Free for agencies, custom terms for universities |
| `/now`, `/now/:slug` | Guides and notes |
| `/contact` | Contact form (opens the visitor's email app) |

## Where to edit

- Brand name and contact email: `src/config.ts`
- Page copy: `src/content/*.ts`
- Partner logos and stories: `src/content/partners.ts` (each section appears once its list has entries)
- Example data shown in the product illustrations: `src/content/files.ts`
- Colours and fonts: the `@theme` block in `src/index.css`

## Hosting

The site uses client-side routing, so the host must serve `index.html` for every path. `public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this. The site is not deployed anywhere yet.

The contact form has no backend: it opens the visitor's email app with the message addressed to the contact email. Connect it to a form service when you have one.
