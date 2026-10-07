// The one place the top-level site navigation lives. Used by the homepage header AND the docs/blog header
// (src/components/SiteHeader.astro), so the two can never drift apart.
// `match` is the URL prefix that marks a link as "current" while you are anywhere inside that section.
export const navLinks = [
  { label: 'Résumé', href: '/resume/', match: '/resume/' },
  { label: 'Projects', href: '/myapps/universal-tts/', match: '/myapps/' },
  { label: 'Writing', href: '/blog/', match: '/blog/' },
  { label: 'Networking', href: '/networking/openwrt-vlan/', match: '/networking/' },
  { label: 'Self-Hosting', href: '/selfhosted/docker-compose/caddy/', match: '/selfhosted/' },
  { label: 'Reference', href: '/reference/linux/zfs-guide/', match: '/reference/' },
  { label: 'Prompts', href: '/promptengineering/essential-templates/', match: '/promptengineering/' },
];
