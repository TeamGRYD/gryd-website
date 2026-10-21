import type { APIRoute } from 'astro';
import { getCurations } from '../../lib/data';
import { SITE } from '../../lib/site';
export const GET: APIRoute = async () => {
  const curations = (await getCurations()).filter((c) => !c.data.hidden).map((c) => ({ id: c.id, url: `${SITE.url}/business/curations/${c.id}/`, ...c.data, seo: undefined, outcomePlaceholder: undefined, placeholders: undefined, hidden: undefined }));
  return new Response(JSON.stringify({ generator: 'gryd.wtf', updated: new Date().toISOString(), curations }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
