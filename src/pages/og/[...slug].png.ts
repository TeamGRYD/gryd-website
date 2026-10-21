// Build-time Open Graph images (1200×630) for every page, rendered with Satori + resvg.
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { PAGE_META } from '../../lib/pages';
import { getProjects, getCurations, getEvents, getPosts } from '../../lib/data';
import { categoryMeta, eventTypeMeta, outcomeLabel, eventTypeLabel, fmtRange } from '../../lib/labels';

type Card = { title: string; kicker: string; meta?: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const cards: Record<string, Card> = {};
  for (const [path, m] of Object.entries(PAGE_META)) {
    const top = path.split('/')[1] || 'home';
    cards[path === '/' ? 'index' : path.slice(1, -1)] = { title: m.title.replace(/\s*\|\s*GRYD.*$/, ''), kicker: top === 'home' ? 'gryd.wtf' : top };
  }
  for (const c of Object.values(categoryMeta)) cards[`builders/${c.slug}`] ??= { title: c.title, kicker: 'builders' };
  for (const t of Object.values(eventTypeMeta)) cards[`education/${t.slug}`] ??= { title: t.title, kicker: 'education' };
  for (const p of await getProjects()) cards[`builders/${p.id}`] = { title: p.data.name, kicker: 'builders', meta: `${p.data.roleLabel ?? p.data.role} · ${p.data.ecosystems.join(' · ')}` };
  for (const c of await getCurations()) cards[`business/curations/${c.id}`] = { title: c.data.title, kicker: 'business · curation', meta: `${outcomeLabel[c.data.outcome][0]} · ${c.data.dateLabel}` };
  for (const e of (await getEvents()).filter((e) => e.data.highlight)) cards[`education/events/${e.id}`] = { title: e.data.title, kicker: `education · ${eventTypeLabel[e.data.type].toLowerCase()}`, meta: `${fmtRange(e.data.start, e.data.end)} · ${e.data.city}` };
  const posts = await getPosts();
  for (const p of posts) cards[`blog/${p.id}`] = { title: p.data.title, kicker: 'blog', meta: p.data.tags.map((t) => `#${t}`).join(' ') };
  for (const t of new Set(posts.flatMap((p) => p.data.tags))) cards[`blog/tags/${t}`] = { title: `#${t}`, kicker: 'blog' };
  cards['thanks'] = { title: 'Thanks for getting in touch', kicker: 'gryd.wtf' };
  cards['404'] = { title: 'Off the grid.', kicker: '404' };
  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: { card } }));
};

let fonts: { name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[] | null = null;
async function loadFonts() {
  if (fonts) return fonts;
  const dir = 'node_modules/@fontsource/inter-tight/files';
  fonts = [
    { name: 'Inter Tight', data: await fs.readFile(`${dir}/inter-tight-latin-400-normal.woff`), weight: 400, style: 'normal' },
    { name: 'Inter Tight', data: await fs.readFile(`${dir}/inter-tight-latin-700-normal.woff`), weight: 700, style: 'normal' },
  ];
  return fonts;
}

let logo: string | null = null;
async function loadLogo() {
  logo ??= `data:image/png;base64,${(await fs.readFile('public/gryd_logo.png')).toString('base64')}`;
  return logo;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { card } = props as { card: Card };
  const size = card.title.length > 60 ? 58 : card.title.length > 36 ? 70 : 84;
  const lines: unknown[] = [];
  for (let x = 0; x <= 1200; x += 60) lines.push(h('div', { position: 'absolute', left: x, top: 0, width: 1, height: 630, background: '#221d28' }));
  for (let y = 0; y <= 630; y += 60) lines.push(h('div', { position: 'absolute', top: y, left: 0, height: 1, width: 1200, background: '#221d28' }));
  const tree = h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0d0b10', color: '#f2edf4', fontFamily: 'Inter Tight', position: 'relative' }, [
    ...lines,
    h('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 700 }, [
      { type: 'img', props: { src: await loadLogo(), width: 129, height: 38 } },
      h('div', { marginLeft: 18, fontSize: 22, fontWeight: 400, color: '#a59cab', textTransform: 'uppercase', letterSpacing: 3 }, card.kicker),
    ]),
    h('div', { display: 'flex', fontSize: size, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }, card.title),
    h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#a59cab' }, [
      h('div', { display: 'flex' }, card.meta ?? 'Builders · Curators · Educators'),
      h('div', { display: 'flex', color: '#eeadfe' }, 'gryd.wtf'),
    ]),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
