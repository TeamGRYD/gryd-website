import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';
// AI crawlers are allowed on purpose: being citable in AI answers is part of the reach goal (website_design.md §2.4).
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /thanks/',
      'Disallow: /search/',
      '',
      'User-agent: GPTBot', 'Allow: /', '',
      'User-agent: ClaudeBot', 'Allow: /', '',
      'User-agent: PerplexityBot', 'Allow: /', '',
      'User-agent: Google-Extended', 'Allow: /', '',
      `Sitemap: ${SITE.url}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
