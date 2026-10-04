// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import icon from 'astro-icon';
import starlightBlog from 'starlight-blog';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';

export default defineConfig({
  site: 'https://binupradeep.com',
  integrations: [
    // Must come before Starlight so it can process ```mermaid fences.
    mermaid({ autoTheme: true }),
    icon(),
    starlight({
      title: 'Binu Pradeep',
      description:
        'Homelab guides, tech references, self-built apps and writing by Binu Pradeep — a Project Manager who likes minimalism, Docker, networking and AI.',
      logo: { light: './src/assets/logo-dark.svg', dark: './src/assets/logo.svg', alt: 'Binu Pradeep' },
      favicon: '/favicon.svg',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://binupradeep.com/og.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://binupradeep.com/og.png' } },
      ],
      lastUpdated: true,
      editLink: { baseUrl: 'https://github.com/binuengoor/binupradeep-com/edit/main/' },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/binuengoor' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/binuepradeep/' },
        { icon: 'email', label: 'Email', href: 'mailto:contact@binupradeep.com' },
      ],
      expressiveCode: { shiki: { langAlias: { env: 'ini', m3u: 'txt', caddyfile: 'nginx' } } },
      customCss: ['@fontsource-variable/inter', '@fontsource-variable/jetbrains-mono', './src/styles/theme.css'],
      plugins: [
        starlightLinksValidator({ errorOnRelativeLinks: false }),
        starlightBlog({
          title: 'Writing',
          prefix: 'blog',
          postCount: 8,
          recentPostCount: 6,
        }),
        starlightSidebarTopics([
          { label: 'Home Networking', icon: 'seti:json', link: '/networking/openwrt-vlan/', items: [{ autogenerate: { directory: 'networking' } }] },
          { label: 'Self-Hosting', icon: 'seti:docker', link: '/selfhosted/docker-compose/caddy/', items: [{ autogenerate: { directory: 'selfhosted/docker-compose' } }] },
          {
            label: 'Tech Reference',
            icon: 'open-book',
            link: '/reference/linux/zfs-guide/',
            items: [
              { label: 'AI', items: [{ autogenerate: { directory: 'reference/ai' } }] },
              { label: 'Git', items: [{ autogenerate: { directory: 'reference/git' } }] },
              { label: 'Linux', items: [{ autogenerate: { directory: 'reference/linux' } }] },
              { label: 'Mac', items: [{ autogenerate: { directory: 'reference/mac' } }] },
              { label: 'Media', items: [{ autogenerate: { directory: 'reference/media' } }] },
              { label: 'Python', items: [{ autogenerate: { directory: 'reference/python' } }] },
              { label: 'Shell', items: [{ autogenerate: { directory: 'reference/shell' } }] },
            ],
          },
          { label: 'Projects', icon: 'rocket', link: '/myapps/universal-tts/', items: [{ autogenerate: { directory: 'myapps' } }] },
          { label: 'Prompt Engineering', icon: 'pencil', link: '/promptengineering/essential-templates/', items: [{ autogenerate: { directory: 'promptengineering' } }] },
          { label: 'Writing', id: 'writing', icon: 'document', link: '/blog/', items: [] },
        ], { topics: { writing: ['/blog', '/blog/**'] } }),
      ],
    }),
  ],
});
