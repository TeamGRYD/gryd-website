import type { APIRoute } from 'astro';
import { getPosts } from '../lib/data';
import { SITE } from '../lib/site';
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'GRYD Blog',
    home_page_url: SITE.url,
    feed_url: `${SITE.url}/feed.json`,
    language: 'en-IN',
    items: posts.map((p) => ({ id: `${SITE.url}/blog/${p.id}/`, url: `${SITE.url}/blog/${p.id}/`, title: p.data.title, summary: p.data.description, date_published: p.data.pubDate.toISOString(), tags: p.data.tags, authors: [{ name: p.data.author }] })),
  };
  return new Response(JSON.stringify(feed, null, 2), { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } });
};
