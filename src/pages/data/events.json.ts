import type { APIRoute } from 'astro';
import { getEvents } from '../../lib/data';
import { SITE } from '../../lib/site';
export const GET: APIRoute = async () => {
  const events = (await getEvents()).map((e) => ({ id: e.id, url: e.data.highlight ? `${SITE.url}/education/events/${e.id}/` : e.data.lumaUrl ?? null, ...e.data, highlight: undefined }));
  return new Response(JSON.stringify({ generator: 'gryd.wtf', updated: new Date().toISOString(), note: 'registrations = Luma registration count, not verified attendance', events }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
