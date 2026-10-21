import type { CollectionEntry } from 'astro:content';

type Tone = 'success' | 'warn' | 'danger' | 'accent' | 'plain';

export const statusLabel: Record<CollectionEntry<'projects'>['data']['status'], [string, Tone]> = {
  live: ['Live', 'success'],
  'in-development': ['In development', 'accent'],
  completed: ['Completed', 'success'],
  archived: ['Archived', 'plain'],
  unknown: ['Status being verified', 'warn'],
};

export const roleLabel: Record<CollectionEntry<'projects'>['data']['role'], string> = {
  built: 'Built',
  'co-built': 'Co-built',
  maintained: 'Maintained',
  curated: 'Curated',
  launched: 'Launched',
};

export const outcomeLabel: Record<CollectionEntry<'curations'>['data']['outcome'], [string, Tone]> = {
  passed: ['Passed', 'success'],
  completed: ['Completed', 'success'],
  rejected: ["Didn't pass", 'danger'],
  'not-submitted': ['Not submitted', 'plain'],
  pending: ['Outcome pending', 'warn'],
};

export const eventTypeLabel: Record<CollectionEntry<'events'>['data']['type'], string> = {
  meetup: 'Meetup',
  workshop: 'Workshop',
  hackathon: 'Hackathon',
  'hacker-house': 'Hacker house',
};

export const eventRoleLabel: Record<CollectionEntry<'events'>['data']['role'], string> = {
  host: 'Host',
  'co-host': 'Co-host',
  partner: 'Partner',
  'mentor-judge': 'Mentors & judges',
  'sponsor-rep': 'Sponsor rep',
};

export const categoryMeta = {
  'ecosystem-collaboration': {
    slug: 'ecosystem-collaborations',
    title: 'Built with ecosystems',
    lede: 'Grant-funded tools we built in collaboration with Web3 ecosystems.',
  },
  maintained: {
    slug: 'maintained',
    title: 'Tools we maintain',
    lede: 'Software we maintain, curate and steward across ecosystems, including work we did not originally write.',
  },
  product: {
    slug: 'products',
    title: 'Products we launched',
    lede: 'Independent products launched by the GRYD collective.',
  },
} as const;

export const eventTypeMeta = {
  meetup: { slug: 'meetups', title: 'Meetups', lede: 'Builder parties, city meetups and community nights across India.' },
  workshop: { slug: 'workshops', title: 'Workshops', lede: 'Hands-on, multi-session Web3 workshops at universities and codecamps.' },
  hackathon: { slug: 'hackathons', title: 'Hackathons', lede: 'Hackathons we host, co-host, mentor and judge.' },
  'hacker-house': { slug: 'hacker-houses', title: 'Hacker houses', lede: 'Multi-day, fully supported build sprints with mentors.' },
} as const;

const dtf = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
const mtf = new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
export const fmtDate = (d: Date) => dtf.format(d);
export const fmtMonth = (d: Date) => mtf.format(d);
export function fmtRange(start: Date, end?: Date) {
  if (!end) return fmtDate(start);
  const s = fmtDate(start), e = fmtDate(end);
  if (s === e) return s;
  return `${s} – ${e}`;
}
