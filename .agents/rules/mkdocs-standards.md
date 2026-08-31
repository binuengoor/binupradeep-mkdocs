# MkDocs Website Standards & Content Rules

When adding, editing, or maintaining content in this repository, always adhere to the following rules:

## 1. Frontmatter Requirement
Every markdown file in `docs/` MUST have a valid YAML frontmatter header.

- **Standard Documentation (`docs/networking/`, `docs/selfhosted/`, `docs/reference/`, `docs/myapps/`, `docs/promptengineering/`)**:
  ```yaml
  ---
  title: Exact Page Title
  description: 1-2 sentence description summarizing the topic for SEO and previews
  tags: [tag1, tag2, tag3]
  ---
  ```
- **Blog Posts (`docs/blog/posts/`)**:
  ```yaml
  ---
  draft: false
  date: YYYY-MM-DD
  categories: [category_name] # e.g. northstar, shortstory, travel
  tags: [tag1, tag2, tag3]
  slug: url-slug-name
  title: Exact Blog Post Title
  description: Concise summary of the post
  ---
  ```

## 2. Navigation Integrity (`docs/.pages`)
- This repository uses `mkdocs-awesome-pages-plugin`.
- If a new section or root page is added, update `docs/.pages` to maintain proper tab placement.
- Do not manually construct large `nav:` trees in `mkdocs.yml` unless specifically intended.

## 3. Blog Post Standards
- Post filename format: `docs/blog/posts/YYYY-MM-DD-<slug>.md`.
- Always place the `<!-- more -->` comment right after the opening hook/paragraph.
- Header image convention:
  `![Header](images/YYYY/<slug>/<image-name>.webp){ loading=lazy width="800" }`
- Supported categories: `northstar` (mindset/quotes/growth), `shortstory` (narratives), `travel` (travelogues).

## 4. Media & Image Conventions
- Store guide-specific images in `docs/assets/images/<topic_folder>/`.
- Use WebP format where possible for optimized loading.
- For inline images with caption/dimensions, use Material markdown attribute syntax:
  - Header images: `{ loading=lazy width="800" }`
  - Inline portraits: `{ align=right width="150px" }`
  - Screenshots: `{ width="700px" }`

## 5. Code Blocks & Highlighting
- Always specify code block syntax identifier (`yaml`, `bash`, `python`, `json`, `text`, `ini`).
- Include helpful inline comments explaining configuration variables or commands.
- For Docker Compose guides, always include service name, container image, ports, volumes, environment, and `restart: unless-stopped`.

## 6. Build Verification
Before finishing any significant changes, verify that the site builds cleanly:
```bash
./venv/bin/mkdocs build --strict
```
