---
name: binupradeep-website
description: >-
  Manage, create, edit, and audit content and configuration for Binu Pradeep's MkDocs personal website.
  Use when the user asks to add or modify blog posts, self-hosted Docker guides, home networking tutorials,
  app documentation (MyApps), tech reference cheat sheets, or when configuring MkDocs plugins and theme settings.
---

# Binu Pradeep Website Content Manager

This skill provides procedures, templates, and guidelines for authoring and maintaining content on Binu Pradeep's personal website.

---

## Content Workflows

### 1. Adding a Self-Hosted Docker Compose Guide
Target Directory: `docs/selfhosted/Docker Compose/<app-name>.md`

1. Create a markdown file with YAML frontmatter: `title`, `description`, and `tags: [docker, self-hosted, ...]`.
2. Follow standard structure:
   - H1 Title + 1-2 sentence overview.
   - `## Key Features`: Bulleted list.
   - `## Docker Compose Installation`: Fenced `yaml` block with complete service definition followed by `docker compose up -d`.
   - `## Directory Structure`: List required bind mounts and volume directories.
   - `## Getting Started`: Access URL (`http://<server-ip>:<port>`) and initial configuration steps.
3. Reference: [Content Templates](./references/content-templates.md#1-self-hosted-docker-compose-template)

### 2. Adding a MyApps Application Documentation Page
Target Directory: `docs/myapps/<app-slug>.md`

1. Create file with YAML frontmatter.
2. Structure:
   - H1 Title + Tagline.
   - Links: GitHub Repository and Docker Image badges/links.
   - `## Overview`, `## Key Features`.
   - `## Installation Options`: Docker run, Docker Compose, Local setup.
   - `## Usage Guide`, `## Configuration Options` (Environment variables table/code block).
   - `## Technical Details` (Architecture, dependencies).
   - `## Troubleshooting` & `## Future Enhancements`.
3. Reference: [Content Templates](./references/content-templates.md#2-myapps-documentation-template)

### 3. Adding a Tech Reference Guide
Target Directory: `docs/reference/<Category>/<topic>.md` (e.g., `Linux`, `Git`, `Python`, `Mac`, `Media`)

1. Create file with YAML frontmatter.
2. Structure:
   - H1 Title + Core Concepts.
   - Categorized command sections with clean bash code snippets.
   - Common use cases, configuration examples, and best practices.
3. Reference: [Content Templates](./references/content-templates.md#3-tech-reference-guide-template)

### 4. Adding a Home Networking Guide
Target Directory: `docs/networking/<topic>.md`

1. Define real-world scenario (subnets, VLAN tags, firewall zones).
2. Step-by-step walkthrough with annotated screenshots stored in `docs/assets/images/<folder>/`.
3. Include failsafe and recovery notes (e.g., maintaining untagged management port).
4. Reference: [Content Templates](./references/content-templates.md#4-home-networking-template)

### 5. Writing a Blog Post
Target Directory: `docs/blog/posts/YYYY-MM-DD-<slug>.md`

1. Set blog frontmatter (`draft: false`, `date: YYYY-MM-DD`, `categories: [category]`, `tags: [...]`, `slug: ...`, `title: ...`, `description: ...`).
2. Insert header image: `![Header](images/YYYY/<slug>/header.webp){ loading=lazy width="800" }`.
3. Write introductory hook followed immediately by `<!-- more -->`.
4. Write content adhering to category tone:
   - `northstar`: Action-oriented personal reflections, quotes, mindset shifts.
   - `shortstory`: Creative storytelling with emotional depth and dialogue.
   - `travel`: Narrative travelogues with itineraries, photos, and day-by-day logs.
5. Reference: [Content Templates](./references/content-templates.md#5-blog-post-template)

---

## Detailed References

- [Site Structure & Taxonomies](./references/site-structure.md)
- [Writing & Style Guide](./references/style-guide.md)
- [Content Templates](./references/content-templates.md)

---

## Verification & Build

Always test the build locally before concluding work:
```bash
./venv/bin/mkdocs build --strict
```
To run the live development server:
```bash
./venv/bin/mkdocs serve
```
