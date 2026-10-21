/**
 * Placeholder register (website_design.md §14).
 * Fill a placeholder by setting `value` (string, or HTML-safe text). While `value` is empty:
 *  - `astro dev` shows a dashed box with the ID so the gap is visible;
 *  - production builds render the `fallback` (or nothing when fallback is '').
 * `npm run placeholders` lists every entry without a value.
 */
export type PlaceholderId = keyof typeof PLACEHOLDERS;

export interface PlaceholderEntry {
  label: string;
  where: string;
  fallback: string;
  value: string;
}

export const PLACEHOLDERS = {
  'PH-01': { label: '"What we don\'t stand for" list', where: 'Home ethos, /ethos/', fallback: '', value: '' },
  'PH-02': { label: 'Community channel links (Telegram / Discord)', where: 'Home, /contribute/, footer, AGENTS.md', fallback: '', value: '' },
  'PH-03': { label: 'Contributor benefits list', where: 'Home ethos, /contribute/', fallback: '', value: '' },
  'PH-04': { label: 'Contributor onboarding process', where: '/contribute/', fallback: '', value: '' },
  'PH-05': { label: 'Delegation process steps', where: '/delegate/', fallback: '', value: '' },
  'PH-06': { label: 'Response time for delegation requests', where: '/delegate/', fallback: '', value: '' },
  'PH-07': { label: 'Fees & engagement terms', where: '/delegate/, /business/', fallback: 'Terms are shared after scoping.', value: '' },
  'PH-08': { label: 'Business contact email', where: '/delegate/, /contact/, schema', fallback: '', value: '' },
  'PH-09': { label: 'Faucet status + live URL', where: 'Builders, faucet page', fallback: 'Status being verified', value: '' },
  'PH-10': { label: 'PlugPort: GRYD role, team, launch date, status', where: '/builders/plugport/', fallback: '', value: '' },
  'PH-11': { label: 'Tychee: GRYD role, team, launch date, status', where: '/builders/tychee/', fallback: '', value: '' },
  'PH-12': { label: 'ZUNNO curation outcome', where: 'Technical curations', fallback: 'Outcome pending', value: '' },
  'PH-13': { label: 'ZKAMA (ZK Verifier SDK) outcome', where: 'Technical curations', fallback: 'Outcome pending', value: '' },
  'PH-14': { label: 'Rarible curation: what, date, outcome, source', where: 'Non-technical curations', fallback: '', value: '' },
  'PH-15': { label: 'Team names, roles, photos, links (with consent)', where: '/about/, author cards', fallback: '', value: '' },
  'PH-16': { label: 'Founding date', where: '/about/, Organization schema', fallback: '', value: '' },
  'PH-17': { label: 'Rename date & reason (Edgetributor SubDAO → GRYD)', where: '/about/', fallback: '', value: '' },
  'PH-18': { label: 'Social posts to embed (exported + permission)', where: 'Home social proof', fallback: '', value: '' },
  'PH-19': { label: 'Testimonials (quote, name, org, permission)', where: 'Home, /business/', fallback: '', value: '' },
  'PH-20': { label: 'Partner logos & event photos', where: 'Logo row, event pages', fallback: '', value: '' },
  'PH-21': { label: 'Wording for the audit service', where: '/business/, /delegate/', fallback: 'audit coordination', value: '' },
  'PH-22': { label: 'edgetributors.xyz domain recovery', where: 'Redirects', fallback: '', value: '' },
  'PH-23': { label: 'Form endpoint URL (Formspree / Worker)', where: '/contribute/, /delegate/ forms', fallback: '', value: '' },
} satisfies Record<string, PlaceholderEntry>;

export const ph = (id: PlaceholderId): string => PLACEHOLDERS[id].value || '';
export const isFilled = (id: PlaceholderId) => Boolean(PLACEHOLDERS[id].value);

/** Value of a placeholder referenced by a plain string ID (e.g. from content frontmatter). */
export const phValue = (id?: string): string => (id ? (PLACEHOLDERS as Record<string, PlaceholderEntry>)[id]?.value ?? '' : '');
