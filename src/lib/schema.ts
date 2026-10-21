import { SITE, absUrl } from './site';
import { PLACEHOLDERS } from '../data/placeholders';

export const ORG_ID = `${SITE.url}/#org`;
export const SITE_ID = `${SITE.url}/#website`;

export function organization() {
  const founding = PLACEHOLDERS['PH-16'].value;
  const email = PLACEHOLDERS['PH-08'].value;
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: ['Gryd', 'Edgetributor SubDAO', 'Edgetributors', 'Gryd Collective'],
    url: SITE.url,
    logo: absUrl('/gryd_logo.png'),
    description: SITE.description,
    slogan: 'No hype. Just the work.',
    areaServed: { '@type': 'Country', name: 'India' },
    foundingLocation: { '@type': 'Country', name: 'India' },
    ...(founding ? { foundingDate: founding } : {}),
    ...(email ? { email } : {}),
    knowsAbout: ['Web3', 'Blockchain', 'Polkadot', 'Substrate', 'Ethereum', 'Stellar', 'Hackathons', 'Developer education', 'OpenGov', 'Open source'],
    sameAs: [SITE.social.x, SITE.social.github, SITE.social.luma, SITE.social.instagram, SITE.social.xLegacy],
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.lang,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.href) })),
  };
}

export function faq(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
