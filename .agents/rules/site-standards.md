# Site Standards & Content Rules (Astro + Starlight)

When adding, editing, or maintaining content in this repository, follow these rules.

## 1. Frontmatter
Every page under `src/content/docs/` needs frontmatter.

```yaml
---
title: Page Title            # rendered as the page H1 — do NOT repeat it as "# Heading" in the body
description: 1-2 sentences for search and social cards.
tags: [tag1, tag2]
sidebar:
  label: Short Name          # optional: shorter label for the sidebar
---
```

Blog posts live in `src/content/docs/blog/<slug>.md` (URL: `/blog/<slug>/`):

```yaml
---
title: Post Title
date: YYYY-MM-DD
description: Concise summary.
tags: [travel, roadtrip]     # categories (northstar | shortstory | travel) are tags now
---
```

- Put `<!-- excerpt -->` after the opening paragraph (the blog index teaser).
- Post images go in `src/content/docs/blog/images/YYYY/<slug>/` and are referenced relatively: `![Header](images/YYYY/<slug>/header.webp)`.

## 2. Navigation
- Top-level sections are "topics" configured in `astro.config.mjs` (`starlightSidebarTopics`). A new top-level folder needs a new topic entry.
- Inside a section the sidebar is auto-generated; order with `sidebar: { order: N }` in frontmatter.
- Folder and file names are lowercase kebab-case (`docker-compose/`, `openwrt-vlan.md`).

## 3. Syntax (replaces the Material-isms)
- Callouts: `:::note`, `:::tip`, `:::caution`, `:::danger` (optionally `:::note[Custom title]`).
- Tabs / cards / steps need `.mdx` and `import { Tabs, TabItem, Card, CardGrid } from '@astrojs/starlight/components';`.
- Diagrams: fenced ```` ```mermaid ```` blocks. Quote edge labels containing `()<>`: `A -->|"Hit (<1ms)"| B`.
- Icons: use `astro-icon` (`<Icon name="lucide:..." />` / `simple-icons:...`) in `.astro`/`.mdx`; no `:material-*:` shortcodes.
- Images: standard Markdown. In `.mdx`, `<br>` must be `<br />` and bare `<` / `{` in prose must be escaped.
- Images stored in `src/assets/` are referenced relatively and get optimized at build time.

## 4. Code blocks
- Always give a language (`yaml`, `bash`, `python`, `json`, `text`, `ini`).
- Docker Compose guides include service name, image, ports, volumes, environment and `restart: unless-stopped`.

## 5. Verification
```bash
npm run build     # must pass; the links validator fails the build on broken internal links
npm run dev       # local preview at http://localhost:4321
```
