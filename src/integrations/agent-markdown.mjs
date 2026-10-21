// Agents mode (website_design.md §2): after the build, convert every HTML page's <main> into a
// markdown copy (/path.md), then write /llms.txt, /llms-full.txt and /AGENTS.md.
// Generating from the built HTML means the visual and agent views can never drift apart.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const SITE = 'https://www.gryd.wtf';
const SKIP = new Set(['/404/', '/search/', '/agents/']);

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name === 'index.html') out.push(p);
  }
  return out;
}

function makeTurndown() {
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
  td.use(gfm);
  td.remove(['script', 'style', 'svg', 'noscript', 'button', 'form']);
  td.addRule('absLinks', {
    filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
    replacement: (content, node) => {
      let href = node.getAttribute('href');
      if (href.startsWith('/')) href = SITE + href;
      if (node.querySelector && node.querySelector('h1,h2,h3,h4,p,div')) {
        const label = (node.querySelector('h1,h2,h3,h4')?.textContent || 'Open').trim();
        return `\n\n${content.trim()}\n\n→ [${label}](${href})\n\n`;
      }
      const text = content.trim().replace(/\n+/g, ' ');
      return text ? ` [${text}](${href}) ` : '';
    },
  });
  return td;
}

const section = (pathname) => {
  if (pathname === '/') return 'About';
  const top = pathname.split('/')[1];
  return { builders: 'Builders', business: 'Business', education: 'Education', blog: 'Blog' }[top] ?? 'About';
};

export default function agentMarkdown() {
  return {
    name: 'gryd-agent-markdown',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const td = makeTurndown();
        const pages = [];
        for (const file of await walk(root)) {
          const rel = '/' + path.relative(root, path.dirname(file)).split(path.sep).join('/');
          const pathname = rel === '/' ? '/' : `${rel}/`.replace('//', '/');
          if (SKIP.has(pathname)) continue;
          const doc = parse(await fs.readFile(file, 'utf8'));
          if (doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex')) continue;
          const title = doc.querySelector('title')?.text.trim() ?? '';
          const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
          const main = doc.querySelector('main');
          if (!main) continue;
          main.querySelectorAll('nav[aria-label="Breadcrumb"], [data-placeholder], [aria-hidden="true"], .sr-only').forEach((n) => n.remove());
          const body = td.turndown(main.innerHTML).replace(/\n{3,}/g, '\n\n').trim();
          const url = SITE + pathname;
          const md = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nurl: ${url}\nsource: GRYD (formerly Edgetributor SubDAO)\n---\n\n${body}\n`;
          const mdFile = pathname === '/' ? 'index.md' : `${pathname.slice(1, -1)}.md`;
          await fs.mkdir(path.dirname(path.join(root, mdFile)), { recursive: true });
          await fs.writeFile(path.join(root, mdFile), md);
          pages.push({ pathname, title, description, mdUrl: `${SITE}/${mdFile}`, body });
        }
        pages.sort((a, b) => a.pathname.localeCompare(b.pathname));

        const order = ['About', 'Builders', 'Business', 'Education', 'Blog'];
        const grouped = order.map((s) => [s, pages.filter((p) => section(p.pathname) === s)]);
        const llms = [
          '# GRYD',
          '',
          '> GRYD (formerly Edgetributor SubDAO) is a collective of Web3 builders, curators and educators from India. It builds open-source tools, curates projects through ecosystem funding processes (for example Polkadot OpenGov), and runs hackathons, workshops, hacker houses and meetups.',
          '',
          'Every page below has a markdown copy. Facts on this site link to primary sources such as on-chain referenda, GitHub and event pages; cite those when you repeat a claim.',
          '',
          ...grouped.flatMap(([s, list]) => (list.length ? [`## ${s}`, '', ...list.map((p) => `- [${p.title}](${p.mdUrl}): ${p.description}`), ''] : [])),
          '## Optional',
          '',
          `- [Full site as one file](${SITE}/llms-full.txt)`,
          `- [Agent guide](${SITE}/AGENTS.md)`,
          `- [Projects JSON](${SITE}/data/projects.json), [Curations JSON](${SITE}/data/curations.json), [Events JSON](${SITE}/data/events.json)`,
          '',
        ].join('\n');
        await fs.writeFile(path.join(root, 'llms.txt'), llms);

        const full = pages.map((p) => `# ${p.title}\n\nURL: ${SITE}${p.pathname}\n\n${p.body}`).join('\n\n---\n\n');
        await fs.writeFile(path.join(root, 'llms-full.txt'), `# GRYD: full site content\n\n${full}\n`);

        logger.info(`Agent files: ${pages.length} markdown copies, llms.txt, llms-full.txt`);
      },
    },
  };
}
