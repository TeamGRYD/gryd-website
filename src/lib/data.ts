import { getCollection } from 'astro:content';
import { PLACEHOLDERS, phValue } from '../data/placeholders';

const dev = import.meta.env.DEV;

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

/** Curations marked `hidden` (e.g. awaiting a placeholder) only show in dev, or once their placeholder is filled. */
export async function getCurations() {
  const all = await getCollection('curations');
  return all
    .filter((c) => !c.data.hidden || dev || c.data.placeholders.some((id) => phValue(id)))
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getEvents() {
  return (await getCollection('events')).sort((a, b) => b.data.start.getTime() - a.data.start.getTime());
}

export async function getPosts() {
  return (await getCollection('posts', (p) => dev || !p.data.draft)).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getStats() {
  const events = await getEvents();
  const registrations = events.reduce((n, e) => n + (e.data.registrations ?? 0), 0);
  const cities = new Set(events.filter((e) => !e.data.online).map((e) => e.data.city.replace('Navi Mumbai', 'Mumbai').replace('Bengaluru', 'Bangalore')));
  const workshopEditions = events.filter((e) => e.data.series === 'Polkadot India Workshops Series').length;
  return { events: events.length, registrations, cities: cities.size, workshopEditions };
}

/** Round down to a "nice" number for display: 3128 -> "3,100+". */
export const niceFloor = (n: number) => {
  const step = n >= 1000 ? 100 : 10;
  return `${(Math.floor(n / step) * step).toLocaleString('en-IN')}+`;
};
