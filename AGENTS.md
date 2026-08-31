# Binu Pradeep Personal Website (MkDocs) - Agent Guide & Workspace Knowledge

This repository powers **Binu Pradeep's** personal portfolio, homelab documentation, tech reference guides, self-built applications showcase, and personal blog.

---

## 1. Persona & Tone Guidelines

- **Author**: Binu Pradeep — Business Analyst & Project Management professional based in Philadelphia, PA, with a passion for minimalism, homelab/self-hosting, networking, Docker, AI, and digital product design.
- **Tone**: Pragmatic, clean, structured, minimalist, authoritative yet approachable.
- **Philosophy**: *"Minimalism and simplicity are the best tools to communicate ideas."*
- **Formatting Standards**:
  - Direct and actionable — avoid unnecessary filler or wordiness.
  - Well-structured with clear hierarchy (`#`, `##`, `###`), bold feature callouts (`**Feature**: Explanation`), and annotated code snippets.
  - Consistent frontmatter on every single markdown file.
  - Fully formatted code blocks with correct syntax highlighting (`yaml`, `bash`, `python`, etc.).

---

## 2. Site Architecture & Directory Layout

```
binupradeep-mkdocs/
├── mkdocs.yml              # Core MkDocs Material configuration
├── requirements.txt        # Python dependencies for building docs
├── AGENTS.md               # Agent instructions & workspace knowledge (this file)
├── .agents/
│   ├── rules/
│   │   └── mkdocs-standards.md
│   └── skills/
│       └── website-content-manager/
│           ├── SKILL.md
│           └── references/
│               ├── content-templates.md
│               ├── site-structure.md
│               └── style-guide.md
└── docs/
    ├── .pages              # Main navigation order (awesome-pages plugin)
    ├── index.md            # Landing / About Me / Portfolio page
    ├── tags.md             # Tag index page (<!-- material/tags -->)
    ├── stylesheets/
    │   └── extra.css       # Custom styles
    ├── assets/
    │   ├── logo.svg        # Site logo
    │   ├── favicon.ico     # Favicon
    │   ├── landing/        # Hero images, tech icons, headshots
    │   └── images/         # Guide screenshots & illustrations
    ├── networking/         # Network guides (OpenWrt, VLANs, Samba/NFS)
    ├── selfhosted/         # Docker Compose self-hosted service guides
    │   └── Docker Compose/
    ├── reference/          # Quick reference cheat sheets (Linux, Git, Mac, Python, Media, Terminal)
    │   ├── Git/
    │   ├── Linux/
    │   ├── Mac/
    │   ├── Media/
    │   ├── Python/
    │   └── Terminal/
    ├── myapps/             # Custom applications built by Binu (OpenSpeech, Image Optimizer, etc.)
    ├── promptengineering/  # AI prompt engineering guides and templates
    └── blog/               # Material Blog plugin directory
        ├── index.md        # Blog main page
        └── posts/          # Dated markdown blog posts (YYYY-MM-DD-title.md)
            └── images/     # Blog post header and body images
```

---

## 3. Section Overview & Writing Conventions

### A. Landing Page (`docs/index.md`)
- Minimalist hero introduction highlighting core philosophy.
- About Me section with portrait image aligned right (`{ align=right width="150px" }`).
- Grid card layout for tools/technologies (`<div class="grid cards" markdown>`).
- Testimonials and social links with Material/FontAwesome icon shortcodes (`:simple-python:`, `:fontawesome-brands-github:`, etc.).

### B. Self-Hosted Guides (`docs/selfhosted/Docker Compose/*.md`)
- **Focus**: Practical, ready-to-run Docker Compose setups for media servers, reverse proxies, and dashboards (e.g., Audiobookshelf, Caddy, Homepage, Nexterm, Dozzle, TubeArchivist).
- **Structure**:
  1. H1 title + 1-sentence value proposition.
  2. `## Key Features` bullet points.
  3. `## Docker Compose Installation` with standard `yaml` service definition and `docker compose up -d` command.
  4. `## Directory Structure` listing volume mappings.
  5. `## Getting Started` explaining default ports, first-run setup, and usage.

### C. My Apps (`docs/myapps/*.md`)
- **Focus**: Applications created and maintained by Binu (OpenSpeech, Image Optimizer for Web, IPTV M3U Sorter, IPTV M3U Validator, Audio Analysis Studio, Interval Timer App).
- **Structure**:
  1. H1 title + tagline.
  2. GitHub Repository link + Docker image link (`ghcr.io/binuengoor/...`).
  3. `## Key Features` breakdown.
  4. `## Installation/Setup` (Docker Run, Docker Compose, Build from source).
  5. `## Usage Guide` / `## Configuration Options` / `## Technical Details`.
  6. `## Troubleshooting` and `## Future Enhancements`.

### D. Tech Reference (`docs/reference/*/*.md`)
- **Focus**: Concise, high-density reference guides for Linux (ZFS, rclone, rsync, storage), Git (submodules, branching), Mac (Homebrew), Python, and Media (yt-dlp).
- **Structure**:
  1. Overview & Core Concepts.
  2. Categorized CLI commands with brief descriptions and copy-pasteable syntax.
  3. Best practices, configuration samples, and common troubleshooting steps.

### E. Home Networking (`docs/networking/*.md`)
- **Focus**: Network configuration guides (OpenWrt VLANs, x86 Image Builder, Samba/NFS).
- **Structure**:
  1. Real-world scenario setup (e.g. 192.168.1.0/24 subnet, VLAN IDs).
  2. Step-by-step instructions with step screenshots stored in `docs/assets/images/<date_topic>/`.
  3. Security considerations and fail-safe recovery tips.

### F. Prompt Engineering (`docs/promptengineering/*.md`)
- **Focus**: Structured AI prompting frameworks, zero/one/few-shot methods, chain-of-thought, role prompting, and reusable templates.

### G. Blog Posts (`docs/blog/posts/YYYY-MM-DD-title.md`)
- **Categories**:
  - `northstar`: Personal growth, mindset, curated life quotes, hard-hitting reflections.
  - `shortstory`: Creative writing, short stories with dialogue and emotional narrative.
  - `travel`: Travelogues (e.g. Tour de Maine, Tour de West) with day-by-day logs, itineraries, and photo galleries.
- **Format Requirements**:
  - Always include `<!-- more -->` after the initial introductory sentence/paragraph to define the blog index teaser.
  - Header image at top: `![Header](images/YYYY/...){ loading=lazy width="800" }`.

---

## 4. Frontmatter Standards

Every file must include YAML frontmatter.

### Standard Documentation Page
```yaml
---
title: Page Title
description: A 1-2 sentence description for search indexing and social cards.
tags: [tag1, tag2, tag3]
---
```

### Blog Post Page
```yaml
---
draft: false
date: YYYY-MM-DD
categories: [category_name]
tags: [tag1, tag2]
slug: custom-url-slug
title: Post Title
description: Concise post summary.
---
```

---

## 5. Navigation Management (`.pages`)

- Navigation hierarchy is controlled using the `awesome-pages` plugin via `.pages` files.
- The root `docs/.pages` defines top-level tabs:
  ```yaml
  nav:
    - Home: index.md
    - Home-Networking: networking
    - Self-Hosting: selfhosted
    - Tech-Reference: reference
    - My-Apps: myapps
    - Prompt-Engineering: promptengineering
    - Blog: blog
  ```
- When adding new top-level sections or reordering pages, update the relevant `.pages` file.

---

## 6. Build & Local Preview Commands

- **Python Virtual Environment**: `./venv/bin/activate` or use `./venv/bin/mkdocs`
- **Serve locally**:
  ```bash
  ./venv/bin/mkdocs serve
  ```
- **Build static site**:
  ```bash
  ./venv/bin/mkdocs build
  ```
- **Dependencies**: `pip install -r requirements.txt`
