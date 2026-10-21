// Imports GRYD-hosted events from the public Luma calendar into src/content/events/.
// Existing files are never overwritten, so hand-edited events stay as they are.
// Usage: npm run import:events   (falls back to scripts/data/luma-past.json when offline)
import fs from 'node:fs';
import path from 'node:path';

const CAL = 'cal-IdhPAhKhWdMwDgs';
const OUT = path.resolve('src/content/events');
const SKIP = [
  /AssetHub Hackathon: (Opening|AMA|Eliminator|AfterParty|Finalè)/i, // folded into assethub-hackathon-2025
  /^Mini-workshop/i, // folded into assethub-hackathon-2025
];

async function load() {
  try {
    const res = await fetch(`https://api.lu.ma/calendar/get-items?calendar_api_id=${CAL}&period=past&pagination_limit=100`, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(String(res.status));
    const json = await res.json();
    fs.writeFileSync('scripts/data/luma-past.json', JSON.stringify(json));
    return json;
  } catch (e) {
    console.warn('Luma fetch failed, using cached scripts/data/luma-past.json:', e.message);
    return JSON.parse(fs.readFileSync('scripts/data/luma-past.json', 'utf8'));
  }
}

const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
function type(name) {
  if (/hacker ?house/i.test(name)) return 'hacker-house';
  if (/workshop|masterclass|codecamp/i.test(name)) return 'workshop';
  if (/hackathon/i.test(name) && !/road to assethub/i.test(name)) return 'hackathon';
  return 'meetup';
}
function series(name) {
  if (/road to sub0/i.test(name)) return 'Road to Sub0 India';
  if (/road to assethub/i.test(name)) return 'Road to AssetHub Hackathon';
  if (/road to devcon/i.test(name)) return 'Road to DevCon 8';
  if (/codecamp/i.test(name)) return 'Polkadot Codecamp India 2026';
  if (/workshops series/i.test(name)) return 'Polkadot India Workshops Series';
  return undefined;
}
const q = (s) => JSON.stringify(s);
// Organisations (not individuals) that appear as Luma co-hosts
const ORGS = new Set(['Polkadot', 'Web3 Mumbai', 'OpenGuild', 'Zo World', 'BLRxZo', 'Stellar India', 'Campustocrypto Community', 'GrowSphere Community', 'ACM DBIT', 'Hyderabad DAO', 'Web3kerala', 'Edu Layer', '99th Floor ‎', 'H.E.R. DAO', 'AGENTS CLAN', 'Lucknow DAO', 'Polkadot Delhi', 'Delhi NCR DAO', 'Coding Catalyst', 'Pala Labs']);

const data = await load();
const existing = new Set(fs.readdirSync(OUT).map((f) => f.replace(/\.md$/, '')));
const existingTitles = new Set(fs.readdirSync(OUT).map((f) => (fs.readFileSync(path.join(OUT, f), 'utf8').match(/^title: (.*)$/m) || [])[1]));
let written = 0;
for (const e of data.entries) {
  const ev = e.event;
  const hosts = (e.hosts || []).map((h) => h.name);
  if (!hosts.includes('GRYD')) continue;
  if (SKIP.some((r) => r.test(ev.name))) continue;
  if (existingTitles.has(q(ev.name))) continue;
  const year = ev.start_at.slice(0, 4);
  const base = slugify(ev.name);
  const slug = base.includes(year) ? base : `${base}-${year}`;
  if (existing.has(slug)) continue;
  const g = ev.geo_address_info || {};
  const online = ev.location_type !== 'offline' && !g.city;
  const orgPartners = hosts.filter((h) => ORGS.has(h));
  const t = type(ev.name);
  const s = series(ev.name);
  const city = g.city || (online ? 'Online' : 'India');
  const fm = [
    '---',
    `title: ${q(ev.name)}`,
    `type: ${t}`,
    `start: ${ev.start_at}`,
    ev.end_at ? `end: ${ev.end_at}` : null,
    `city: ${q(city)}`,
    g.region ? `region: ${q(g.region)}` : null,
    g.address && g.geo_address_visibility !== 'guests-only' ? `venue: ${q(g.address)}` : null,
    `online: ${online}`,
    `role: ${orgPartners.some((h) => h !== 'Polkadot') ? 'co-host' : 'host'}`,
    `partners: ${q(orgPartners)}`,
    e.guest_count ? `registrations: ${e.guest_count}` : null,
    `lumaUrl: ${q('https://luma.com/' + ev.url)}`,
    s ? `series: ${q(s)}` : null,
    'highlight: false',
    `summary: ${q(`${ev.name.replace(/\s+/g, ' ')}${g.city ? `, ${g.city}` : ''}. Listed on the GRYD Events calendar with GRYD as a host.`.slice(0, 200))}`,
    'sources:',
    `  - label: "Luma event page"`,
    `    url: ${q('https://luma.com/' + ev.url)}`,
    '---',
    '',
  ].filter((x) => x !== null).join('\n');
  fs.writeFileSync(path.join(OUT, slug + '.md'), fm);
  written++;
}
console.log(`Imported ${written} new event(s) into ${OUT}`);
