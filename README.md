# binupradeep.com

Personal site of Binu Pradeep: portfolio, homelab guides, tech references, self-built apps and a blog.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), deployed as a static site on Cloudflare Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

**Cloudflare Pages settings:** build command `npm run build`, output directory `dist`, environment variable `NODE_VERSION=22`.

Content lives in `src/content/docs/`; see [AGENTS.md](AGENTS.md) for conventions. The previous MkDocs Material source is kept in `legacy-mkdocs/` until cutover.
