export const SITE = {
  name: 'GRYD',
  legacyName: 'Edgetributor SubDAO',
  url: 'https://www.gryd.wtf',
  tagline: 'We build, curate & educate for Web3.',
  description:
    'GRYD (formerly Edgetributor SubDAO) is a collective of Web3 builders, curators and educators from India. We build open tools, curate projects and run hackathons, workshops and meetups.',
  locale: 'en_IN',
  lang: 'en-IN',
  themeColor: '#0d0b10',
  social: {
    x: 'https://x.com/TeamGRYD',
    xLegacy: 'https://x.com/Edgetributors',
    github: 'https://github.com/TeamGRYD',
    luma: 'https://luma.com/TeamGRYD',
    instagram: 'https://instagram.com/Edgetributors',
  },
  xHandle: '@TeamGRYD',
};

export const NAV = [
  { href: '/builders/', label: 'Builders' },
  { href: '/business/', label: 'Business' },
  { href: '/education/', label: 'Education' },
  { href: '/blog/', label: 'Blog' },
];

export const absUrl = (path: string) => new URL(path, SITE.url).toString();
