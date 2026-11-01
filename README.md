# studyinfo-app

Marketing website for StudyInfo, the network for international education agencies. Agencies with students send their files through StudyInfo to agencies that hold the university relationship; agencies with universities add them to receive verified files; our team checks every file in between, and the two agencies share the commission. Built with React, TypeScript, Tailwind CSS v4 and React Router.

```bash
npm install
npm run dev
```

`npm run build` type-checks, builds to `dist/` and pre-renders every page (see SEO below). `npm run lint` runs ESLint, and `npm run preview` serves the build locally.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/send-files` | Sending student files and our document check |
| `/universities` | Browse universities by country and city, and send a student file for one |
| `/add-universities` | Adding your universities and receiving verified files |
| `/tracking` | Case steps, the three-party thread and commission status |
| `/toolkit` | CRM, recommendations, AI tools, marketing and the branded portal |
| `/network` | How the network works, anonymity and FAQ |
| `/grow-with-us` | Sales page for our team: send files, add universities, the toolkit, and Try Demo |
| `/about` | The problem we solve, mission and vision, and the Tablab Research and Global Desire Education partnership |
| `/now`, `/now/:slug` | Guides and notes |
| `/contact` | Contact form (opens the visitor's email app), phone, WhatsApp and address |

The old routes `/intake`, `/ai`, `/partners` and `/pricing` redirect to `/send-files`, `/toolkit`, `/network` and `/` (`src/App.tsx`).

## Where to edit

- Brand name, email, phone, WhatsApp link and address: `src/config.ts`
- University list on `/universities`: `src/data/universities.json`, an array of `{ "name", "country", "cities": [] }` (or `{ "sample": true, "universities": [...] }`). Replace the file with real data; remove `"sample"` to hide the "Sample list" tag. The country filter is built from the data.
- Logo: `src/components/ui/Logo.tsx`, with copies of the same shapes in `public/logo.svg` (for use outside the site) and `public/favicon.svg` (browser tab). Change all three together.
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

## SEO

Every page is pre-rendered to static HTML at build time, so search engines and social apps (WhatsApp, LinkedIn, Facebook, X) get the full content and each page's own tags without running JavaScript. React then takes over the page in the browser.

- **Titles, descriptions and structured data:** `src/content/seo.ts`. Every page has its own title and description, a canonical link on `SITE_URL`, Open Graph and X (Twitter) tags, and schema.org data (Organization and WebSite on every page, FAQPage on How it works, BlogPosting on each guide). New pages and guides need an entry there; guides are picked up automatically.
- **Live address:** `SITE_URL` in `src/config.ts` (`https://www.studyinfo.app`). Canonical links, the sitemap and social previews all use it.
- **How it is built:** `npm run build` runs `vite build`, renders each route with `src/entry-server.tsx`, and `scripts/prerender.mjs` writes `dist/<page>/index.html`, `dist/404.html`, `dist/sitemap.xml` and `dist/robots.txt`.
- **Images:** `public/og-image.png` (1200×630 social preview), `public/apple-touch-icon.png` and `public/logo-512.png` (the logo for search results).
- **After deploying:** add the site to Google Search Console and Bing Webmaster Tools, and submit `https://www.studyinfo.app/sitemap.xml`.

## Hosting

Every push to `main` builds the site and deploys it to **Cloudflare Workers** (static assets) at https://www.studyinfo.app, through `.github/workflows/deploy.yml` and `wrangler.jsonc`. You can also deploy by hand with `npm run build && npm run deploy` (needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your environment).

One-time setup:

1. **GitHub secrets:** Settings → Secrets and variables → Actions → Repository secrets, add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The token needs the "Edit Cloudflare Workers" permission, plus Zone → DNS → Edit on `studyinfo.app` so the first deploy can create the custom domain.
2. **DNS:** `studyinfo.app` must be a zone in the same Cloudflare account. The deploy attaches `www.studyinfo.app` to the Worker automatically.
3. **Apex redirect:** in Cloudflare, add a Redirect Rule from `studyinfo.app/*` to `https://www.studyinfo.app/${1}` (301), because Workers redirect files can't match a host.

How it behaves: pre-rendered pages are served from `dist/<page>/index.html`; the old addresses `/intake`, `/ai`, `/partners` and `/pricing` redirect (301) through `public/_redirects`; unknown addresses get `dist/404.html` with a real 404 status (`not_found_handling: "404-page"`). `vercel.json` is kept for hosting on Vercel instead.

The contact form has no backend: it opens the visitor's email app with the message addressed to the contact email. Connect it to a form service when you have one.
