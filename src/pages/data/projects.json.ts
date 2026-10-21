import type { APIRoute } from 'astro';
import { getProjects } from '../../lib/data';
import { SITE } from '../../lib/site';
export const GET: APIRoute = async () => {
  const projects = (await getProjects()).map((p) => ({ id: p.id, url: `${SITE.url}/builders/${p.id}/`, ...p.data, seo: undefined, statusPlaceholder: undefined, placeholders: undefined }));
  return new Response(JSON.stringify({ generator: 'gryd.wtf', updated: new Date().toISOString(), projects }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
