// Lists unfilled placeholders (website_design.md §14.2).
// Usage: npm run placeholders          -> report only
//        PLACEHOLDERS=fail npm run placeholders  -> exit 1 if any are unfilled (use in CI before release)
import fs from 'node:fs';
import path from 'node:path';

const reg = fs.readFileSync('src/data/placeholders.ts', 'utf8');
const entries = [...reg.matchAll(/'(PH-\d{2})': \{ label: '((?:[^'\\]|\\.)*)', where: '([^']*)', fallback: '(?:[^'\\]|\\.)*', value: '((?:[^'\\]|\\.)*)' \}/g)].map((m) => ({ id: m[1], label: m[2].replace(/\\'/g, "'"), where: m[3], filled: m[4].length > 0 }));

const uses = new Map();
function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (/\.(astro|md|mdx|ts|mjs)$/.test(e.name) && !p.endsWith(path.join('data', 'placeholders.ts'))) {
      fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        for (const m of line.matchAll(/PH-\d{2}/g)) {
          if (!uses.has(m[0])) uses.set(m[0], []);
          uses.get(m[0]).push(`${p}:${i + 1}`);
        }
      });
    }
  }
}
scan('src');

const open = entries.filter((e) => !e.filled);
console.log(`\nPlaceholders: ${entries.length - open.length}/${entries.length} filled\n`);
for (const e of open) {
  console.log(`  ${e.id}  ${e.label}`);
  console.log(`         where: ${e.where}`);
  for (const u of (uses.get(e.id) ?? []).slice(0, 4)) console.log(`         used:  ${u}`);
}
console.log(open.length ? `\nFill them in src/data/placeholders.ts (set "value").\n` : '\nAll placeholders filled.\n');
if (process.env.PLACEHOLDERS === 'fail' && open.length) process.exit(1);
