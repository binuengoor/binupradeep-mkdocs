---
name: binupradeep-website
description: >-
  Manage, create, edit, and audit content and configuration for Binu Pradeep's Astro + Starlight personal website.
  Use when the user asks to add or modify blog posts, self-hosted Docker guides, home networking tutorials,
  app documentation (My Apps), tech reference cheat sheets, résumé data, the homepage, navigation, or the site theme.
---

# Binu Pradeep Website Content Manager

Procedures, templates and guidelines for authoring and maintaining binupradeep.com (Astro 7 + Starlight, static, Cloudflare Pages).
Read `AGENTS.md` first for the architecture and `.agents/rules/site-standards.md` for the content rules.

---

## Content Workflows

All content lives under `src/content/docs/`. File and folder names are lowercase kebab-case. The frontmatter `title` is the page H1: **do not repeat it as `# Heading` in the body.**

### 1. Adding a Self-Hosted Docker Compose Guide
Target: `src/content/docs/selfhosted/docker-compose/<app-name>.md`

1. Frontmatter: `title`, `description`, `tags: [docker, self-hosted, ...]`, `sidebar: { label: "<Short Name>" }`.
2. Structure: 1-2 sentence overview → `## Key Features` → `## Docker Compose Installation` (full `yaml` service + `docker compose up -d`) → `## Directory Structure` → `## Getting Started` (URL, first-run steps).
3. Template: [Content Templates](./references/content-templates.md#1-self-hosted-docker-compose-template)

### 2. Adding a My Apps Page
Target: `src/content/docs/myapps/<app-slug>.md`

1. Frontmatter as above (use `sidebar.order` to place it).
2. Structure: tagline → GitHub + Docker image links → `## Key Features` → `## Installation Options` (Docker run / Compose / local) → usage and configuration (env var table) → technical details → troubleshooting → future enhancements.
3. To feature it on the homepage, also add a card to the `featured` array in `src/pages/index.astro`.
4. Template: [Content Templates](./references/content-templates.md#2-my-apps-documentation-template)

### 3. Adding a Tech Reference Guide
Target: `src/content/docs/reference/<category>/<topic>.md` (`ai`, `git`, `linux`, `mac`, `media`, `python`, `shell`)

1. A new *category* folder also needs a group in the `Tech Reference` topic in `astro.config.mjs`.
2. Structure: core concepts → categorized commands in clean `bash` blocks → best practices → troubleshooting.
3. Template: [Content Templates](./references/content-templates.md#3-tech-reference-guide-template)

### 4. Adding a Home Networking Guide
Target: `src/content/docs/networking/<topic>.md`

1. Define the real scenario (subnets, VLAN tags, firewall zones).
2. Steps with annotated screenshots saved as `.webp` in `src/assets/images/<topic>/`, referenced relatively (`../../../assets/images/<topic>/<name>.webp`).
3. Include failsafe/recovery notes (e.g., keep an untagged management port).
4. Template: [Content Templates](./references/content-templates.md#4-home-networking-template)

### 5. Writing a Blog Post
Target: `src/content/docs/blog/<slug>.md` (URL `/blog/<slug>/`)

1. Frontmatter: `title` (unique!), `date: YYYY-MM-DD`, `description`, `tags` (category tag first: `northstar` | `shortstory` | `travel`).
2. Header image in `src/content/docs/blog/images/YYYY/<slug>/` and referenced as `![Header](images/YYYY/<slug>/header.webp)`.
3. Opening hook, then `<!-- excerpt -->`.
4. Tone by category: `northstar` action-oriented reflection; `shortstory` creative with dialogue; `travel` narrative with day-by-day log.
5. The post appears on the blog and, if among the 4 newest, on the homepage.
6. Template: [Content Templates](./references/content-templates.md#5-blog-post-template)

### 6. Updating résumé data (certifications, jobs, skills, education)
Edit `src/data/resume.ts` only. The homepage and `/resume/` both read it. Keep address, phone and personal email out of it.

### 7. Adding a top-level section or changing navigation
1. Add the topic in `astro.config.mjs` (`starlightSidebarTopics`).
2. Add the link in `src/data/nav.ts` (header on every page and the mobile docs menu).
3. Build and check both.

### 8. Changing the look
Edit the shared pieces (see `AGENTS.md` §4): `src/styles/tokens.css`, `theme.css`, `chrome.css`, `src/components/Site*.astro`. Check light **and** dark, 375px width, and print for `/resume/`.

---

## Detailed References

- [Site Structure & Taxonomies](./references/site-structure.md)
- [Writing & Style Guide](./references/style-guide.md)
- [Content Templates](./references/content-templates.md)

---

## Verification & Build

Always build before concluding work. The build also validates internal links and fails on broken ones:
```bash
npm run build
```
Live preview:
```bash
npm run dev      # http://localhost:4321
```
