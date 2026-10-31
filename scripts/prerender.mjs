// Pre-renders every page to static HTML after `vite build`, so search engines and social apps get
// real content and each page's own title, description, canonical link and structured data.
// Also writes 404.html, sitemap.xml and robots.txt. Run by `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = path.join(root, '.ssr');
const { render, ROUTES, SITE_URL, absoluteUrl, seoFor, seoHead } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const ROOT = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT)) {
  throw new Error('dist/index.html must contain the <!--seo--> … <!--/seo--> block and an empty <div id="root"></div>.');
}

const page = (url) =>
  template.replace(SEO_BLOCK, () => seoHead(seoFor(url))).replace(ROOT, () => `<div id="root">${render(url)}</div>`);

for (const route of ROUTES) {
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, ...route.slice(1).split('/'), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route));
}

// Served by the host for unknown addresses, with a 404 status (see public/_redirects and vercel.json).
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));

const indexable = ROUTES.map((r) => seoFor(r)).filter((s) => !s.noindex);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((s) => `  <url><loc>${absoluteUrl(s.path)}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.rmSync(ssr, { recursive: true, force: true });
console.log(`Pre-rendered ${ROUTES.length} pages and 404.html; wrote sitemap.xml (${indexable.length} URLs) and robots.txt.`);
