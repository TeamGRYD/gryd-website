# gryd.wtf

The GRYD website, built with Astro 7 as a static site. The spec is `../website_design.md`, the keywords are in `../keyword.md`, and the facts and sources come from `../research.md`.

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Dev server. Unfilled placeholders show as dashed yellow boxes |
| `npm run build` | Production build to `dist/`, plus the Pagefind search index |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | Type-check |
| `npm run placeholders` | List unfilled placeholders (`PLACEHOLDERS=fail` exits 1 if any are left) |
| `npm run import:events` | Import new GRYD-hosted events from the Luma calendar (never overwrites existing files) |
| `node scripts/icons.mjs` | Regenerate favicon / touch icons from `public/favicon.svg` |

## Filling placeholders
Edit `src/data/placeholders.ts` and set `value` for each ID (PH-01 … PH-23). `value` can contain simple HTML, such as links.
- **Unfilled:** dev shows a dashed box; production shows the fallback, or nothing.
- **PH-14 (Rarible):** filling it un-hides the Rarible curation. Also edit `src/content/curations/rarible.md` with the details.
- **PH-23:** the form endpoint (e.g. a Formspree URL). Until it is set, the forms show a disabled button and an X link.

## Content
| Folder | What it holds |
|---|---|
| `src/content/projects/` | Builders (category: ecosystem-collaboration / maintained / product) |
| `src/content/curations/` | Business curations, with an outcome (passed / completed / rejected / pending) |
| `src/content/events/` | Events. Only `highlight: true` events get their own page; the rest link to Luma |
| `src/content/posts/` | Blog posts (`.md` / `.mdx`) |
| `src/content/acknowledgments.json` | Social proof (independent sources only) |

Every project, curation and event needs at least one `sources` entry. The build fails without one.

## Agents mode
`src/integrations/agent-markdown.mjs` runs after the build. It turns each page's `<main>` into `/<path>.md` and writes `llms.txt` and `llms-full.txt`. `AGENTS.md`, `/data/*.json`, `feed.xml`, `feed.json` and `robots.txt` are Astro endpoints in `src/pages/`.

## Deploy (Cloudflare Pages recommended)
- **Build command:** `npm run build`
- **Output folder:** `dist`
- **Node:** 22.12 or later

`public/_headers` (caching, security, markdown content type) and `public/_redirects` (old gryd.wtf nav paths) are in Cloudflare Pages / Netlify format. After deploying, submit `https://www.gryd.wtf/sitemap-index.xml` to Google Search Console and Bing.

## Design system: "drawing set"
The site is laid out as a set of engineering drawings. Base reference: Heron AI. Other Awwwards references are noted in brackets.

**Layout**
- `.board` is the framed sheet. Each `.sheet` is a section, with "+" corner marks.
- `.cells` builds hairline cell grids; `.guides` draws the 12-column construction lines.
- Section headers (`SheetHead`) are numbered §01 … §10 [Turion].
- The footer is laid out like a drawing's title block (`TitleBlock`).
- A CAD-style status bar (`StatusBar`) holds the Visual/Agents tabs, a cursor readout and the Film/Paper theme switch.

**Signature pieces**
| Component | What it does |
|---|---|
| `Wordmark` | GRYD drawn on its own 23×7 cell grid, assembles on load [Neutomni / Noomo] |
| `Iso` | Isometric line drawings generated from boxes; strokes draw in on scroll |
| `OrbitMap` | Ecosystem orbit diagram [Turion] |
| `Stamp` | Curation outcome stamps |
| `FieldLog` | Events as a departures-board table |
| `Dim` | Dimension-line annotations |
| Fading statement | Words fade from grey to white as you scroll [Aevion] |
| Sheet index | Tiles that double as section navigation [Varsity] |

**Type and colour**
- Archivo variable (width 100–125, weight 400–800) for text and headings.
- Instrument Serif italic for emphasis words.
- JetBrains Mono for labels.
- All fonts are subset and self-hosted in `public/fonts/`.
- Signal lime is the accent; red is the "redline" colour for annotations and failed outcomes.
- Two themes: dark "film" (default) and light "paper".

**Motion**
- Built from CSS scroll-driven animations, so it is progressive: without support, the page is static.
- `prefers-reduced-motion` turns all motion off.
- `animation-timeline` lives in separate rules on purpose: the CSS minifier would otherwise fold it into the `animation` shorthand, and Chrome then drops the animation.

## Lighthouse (mobile, local gzip server, 2026-10-15, redesign)
Measured on 14 templates (home, builders, business, education, hackathons, a project, a curation, an event, the blog, a post, contribute, delegate, about, agents):

| Category | Score |
|---|---|
| Performance | 99–100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

LCP is 1.5–1.8 s under simulated slow 4G, and CLS is 0.
