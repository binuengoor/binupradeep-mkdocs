# Binu Pradeep Personal Website (Astro + Starlight) - Agent Guide & Workspace Knowledge

This repository powers **Binu Pradeep's** personal portfolio, homelab documentation, tech reference guides, self-built applications showcase, and personal blog.

---

## 1. Persona & Tone Guidelines

- **Author**: Binu Pradeep — Project Manager (with a Business Analysis background) based in Philadelphia, PA, with a passion for minimalism, homelab/self-hosting, networking, Docker, AI, and digital product design.
- **Tone**: Pragmatic, clean, structured, minimalist, authoritative yet approachable.
- **Philosophy**: *"Minimalism and simplicity are the best tools to communicate ideas."*
- **Formatting Standards**:
  - Direct and actionable — avoid unnecessary filler or wordiness.
  - Well-structured with clear hierarchy (`#`, `##`, `###`), bold feature callouts (`**Feature**: Explanation`), and annotated code snippets.
  - Consistent frontmatter on every single markdown file.
  - Fully formatted code blocks with correct syntax highlighting (`yaml`, `bash`, `python`, etc.).

---

## 2. Site Architecture & Directory Layout

Built with **Astro 7 + Starlight**, deployed as a static site on Cloudflare Pages.

```
binupradeep-com/
├── astro.config.mjs        # Starlight config: sidebar topics, blog, mermaid, icons
├── package.json
├── public/                 # favicon, robots.txt, _headers
├── scripts/migrate-content.py   # one-off MkDocs -> Starlight migration (provenance)
├── legacy-mkdocs/          # the previous MkDocs Material site (docs/, mkdocs.yml); delete after cutover
├── .agents/                # agent rules & skills
└── src/
    ├── pages/index.astro   # custom portfolio homepage (not Starlight)
    ├── pages/resume.astro  # print-friendly résumé page (/resume/)
    ├── layouts/Site.astro  # shared header/footer/meta for the custom pages
    ├── data/resume.ts      # résumé content shared by the homepage and /resume/ (no address/phone)
    ├── styles/             # theme.css (Starlight), home.css (homepage)
    ├── assets/             # logo, landing images, guide screenshots (optimized at build)
    ├── content.config.ts
    └── content/docs/
        ├── networking/  selfhosted/docker-compose/  reference/{ai,git,linux,mac,media,python,shell}/
        ├── myapps/  promptengineering/
        └── blog/           # starlight-blog posts: <slug>.md + images/
```

## 3. Section Overview & Writing Conventions

### A. Landing Page (`src/pages/index.astro`)
- Minimalist hero introduction highlighting core philosophy.
- About Me section with portrait image aligned right (`{ align=right width="150px" }`).
- Grid card layout for tools/technologies (`<div class="grid cards" markdown>`).
- Testimonials and social links with Material/FontAwesome icon shortcodes (`:simple-python:`, `:fontawesome-brands-github:`, etc.).

### B. Self-Hosted Guides (`src/content/docs/selfhosted/docker-compose/*.md`)
- **Focus**: Practical, ready-to-run Docker Compose setups for media servers, reverse proxies, and dashboards (e.g., Audiobookshelf, Caddy, Homepage, Nexterm, Dozzle, TubeArchivist).
- **Structure**:
  1. H1 title + 1-sentence value proposition.
  2. `## Key Features` bullet points.
  3. `## Docker Compose Installation` with standard `yaml` service definition and `docker compose up -d` command.
  4. `## Directory Structure` listing volume mappings.
  5. `## Getting Started` explaining default ports, first-run setup, and usage.

### C. My Apps (`src/content/docs/myapps/*.md`)
- **Focus**: Applications created and maintained by Binu (Universal TTS, Universal Reader, Event Track Manager, Audio Analysis Studio, Interval Timer App, Image Optimizer for Web, IPTV M3U Sorter, IPTV M3U Validator).
- **Structure**:
  1. H1 title + tagline.
  2. GitHub Repository link + Docker image link (`ghcr.io/binuengoor/...`).
  3. `## Key Features` breakdown.
  4. `## Installation/Setup` (Docker Run, Docker Compose, Build from source).
  5. `## Usage Guide` / `## Configuration Options` / `## Technical Details`.
  6. `## Troubleshooting` and `## Future Enhancements`.

### D. Tech Reference (`src/content/docs/reference/*/*.md`)
- **Focus**: Concise, high-density reference guides for Linux (ZFS, rclone, rsync, storage), Git (submodules, branching), Mac (Homebrew), Python, and Media (yt-dlp).
- **Structure**:
  1. Overview & Core Concepts.
  2. Categorized CLI commands with brief descriptions and copy-pasteable syntax.
  3. Best practices, configuration samples, and common troubleshooting steps.

### E. Home Networking (`src/content/docs/networking/*.md`)
- **Focus**: Network configuration guides (OpenWrt VLANs, x86 Image Builder, Samba/NFS).
- **Structure**:
  1. Real-world scenario setup (e.g. 192.168.1.0/24 subnet, VLAN IDs).
  2. Step-by-step instructions with step screenshots stored in `src/assets/images/<topic>/`.
  3. Security considerations and fail-safe recovery tips.

### F. Prompt Engineering (`src/content/docs/promptengineering/*.md`)
- **Focus**: Structured AI prompting frameworks, zero/one/few-shot methods, chain-of-thought, role prompting, and reusable templates.

### G. Blog Posts (`src/content/docs/blog/<slug>.md`)
- **Categories**:
  - `northstar`: Personal growth, mindset, curated life quotes, hard-hitting reflections.
  - `shortstory`: Creative writing, short stories with dialogue and emotional narrative.
  - `travel`: Travelogues (e.g. Tour de Maine, Tour de West) with day-by-day logs, itineraries, and photo galleries.
- **Format Requirements**:
  - Always include `<!-- excerpt -->` after the initial introductory sentence/paragraph to define the blog index teaser.
  - Header image at top: `![Header](images/YYYY/<slug>/...)`.

---

## 4. Content Rules

See `.agents/rules/site-standards.md` for frontmatter, navigation, syntax and blog conventions. Key points: lowercase kebab-case paths, `title` is the page H1 (no duplicate `# Heading`), blog categories are tags, `<!-- excerpt -->` marks the blog teaser.

## 5. Build & Local Preview

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/ (also validates internal links)
npm run preview
```

Cloudflare Pages: build command `npm run build`, output directory `dist`, Node 22+ (`NODE_VERSION` env var or `.nvmrc`). Page "last updated" dates come from git history, so the build needs a full (non-shallow) clone.
