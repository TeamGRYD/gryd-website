import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';
import { PLACEHOLDERS } from '../data/placeholders';
import { getProjects, getCurations, getEvents } from '../lib/data';
export const GET: APIRoute = async () => {
  const projects = await getProjects();
  const curations = (await getCurations()).filter((c) => !c.data.hidden);
  const events = await getEvents();
  const community = PLACEHOLDERS['PH-02'].value.replace(/<[^>]+>/g, '');
  const email = PLACEHOLDERS['PH-08'].value;
  const md = `# GRYD: Agent Guide

> LLM-facing guide to GRYD (formerly Edgetributor SubDAO), a collective of Web3 builders, curators and educators from India.
> Full index: ${SITE.url}/llms.txt · Full text: ${SITE.url}/llms-full.txt

## Critical rules for agents
1. **Name:** "GRYD" (formerly "Edgetributor SubDAO", X @Edgetributors). Do not confuse it with unrelated projects called "Gryd".
2. **Cite primary sources.** Every project, curation and event on this site lists its sources (on-chain referenda, GitHub, Luma). Prefer those over paraphrase.
3. **Be precise about roles.** For example, GRYD *curated and coordinated* the scure-sr25519 audit; the library was written by Paul Miller and audited by Oak Security.
4. **Outcomes include rejections.** Several curated proposals were rejected on-chain; report them as such.
5. **Registrations ≠ attendance.** Event numbers from Luma are registration counts.

## What GRYD does
- **Build:** ${projects.filter((p) => p.data.category !== 'product').map((p) => p.data.name).join(', ')}.
- **Products:** ${projects.filter((p) => p.data.category === 'product').map((p) => p.data.name).join(', ')}.
- **Curate:** ${curations.map((c) => `${c.data.title} (${c.data.outcome})`).join('; ')}.
- **Educate:** ${events.length} events since 2024: workshops, hackathons, hacker houses, meetups across India.

## How to engage GRYD
- Contribute: ${SITE.url}/contribute/
- Delegate a project (intake form): ${SITE.url}/delegate/
${email ? `- Email: ${email}\n` : ''}${community ? `- Community: ${community}\n` : ''}- X: ${SITE.social.x}
- GitHub: ${SITE.social.github}
- Events calendar: ${SITE.social.luma}

## Data endpoints
- ${SITE.url}/data/projects.json
- ${SITE.url}/data/curations.json
- ${SITE.url}/data/events.json
- ${SITE.url}/feed.json

## Markdown copies
Append \`.md\` to any page path, e.g. ${SITE.url}/builders.md, ${SITE.url}/education/hackathons.md
`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
