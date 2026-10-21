import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const source = z.object({ label: z.string(), url: z.url() });
const phId = z.string().regex(/^PH-\d{2}$/);
const seo = z.object({
  title: z.string().max(70),
  description: z.string().max(170),
  keyword: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['ecosystem-collaboration', 'maintained', 'product']),
    maintained: z.boolean().default(false),
    role: z.enum(['built', 'co-built', 'maintained', 'curated', 'launched']),
    roleLabel: z.string().optional(),
    ecosystems: z.array(z.string()),
    summary: z.string().max(200),
    status: z.enum(['live', 'in-development', 'completed', 'archived', 'unknown']),
    statusPlaceholder: phId.optional(),
    statusVerifiedOn: z.coerce.date(),
    years: z.string(),
    funding: z.array(z.object({ program: z.string(), amount: z.string().optional(), url: z.url() })).default([]),
    links: z.object({ live: z.url(), github: z.url(), docs: z.url(), proposal: z.url() }).partial().default({}),
    stack: z.array(z.string()).default([]),
    placeholders: z.array(phId).default([]),
    sources: z.array(source).min(1),
    featured: z.boolean().default(false),
    order: z.number().default(50),
    seo,
  }),
});

const curations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/curations' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['technical', 'non-technical']),
    client: z.string(),
    ecosystem: z.string(),
    outcome: z.enum(['passed', 'completed', 'rejected', 'not-submitted', 'pending']),
    outcomePlaceholder: phId.optional(),
    outcomeNote: z.string(),
    ourRole: z.string(),
    date: z.coerce.date(),
    dateLabel: z.string(),
    proposalUrl: z.url().optional(),
    hidden: z.boolean().default(false),
    placeholders: z.array(phId).default([]),
    sources: z.array(source).min(1),
    order: z.number().default(50),
    seo,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['meetup', 'workshop', 'hackathon', 'hacker-house']),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    city: z.string(),
    region: z.string().optional(),
    venue: z.string().optional(),
    online: z.boolean().default(false),
    role: z.enum(['host', 'co-host', 'partner', 'mentor-judge', 'sponsor-rep']),
    partners: z.array(z.string()).default([]),
    registrations: z.number().optional(),
    attendanceReported: z.string().optional(),
    lumaUrl: z.url().optional(),
    series: z.string().optional(),
    highlight: z.boolean().default(false),
    sources: z.array(source).min(1),
    summary: z.string().max(200),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('GRYD'),
    tags: z.array(z.string()).default([]),
    keyword: z.string(),
    draft: z.boolean().default(false),
  }),
});

const acknowledgments = defineCollection({
  loader: file('./src/content/acknowledgments.json'),
  schema: z.object({
    quote: z.string(),
    by: z.string(),
    context: z.string(),
    date: z.string(),
    url: z.url(),
    kind: z.enum(['independent', 'listing', 'record']),
  }),
});

export const collections = { projects, curations, events, posts, acknowledgments };
