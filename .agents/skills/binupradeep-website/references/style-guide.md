# Writing & Style Guide

This guide establishes the stylistic, linguistic, and visual standards for all content across `binupradeep-mkdocs`.

---

## 1. Writing Principles & Voice

1. **Clarity & Brevity**: Get straight to the point. Start with what the tool, guide, or essay is about.
2. **Minimalism**: Simple, unpretentious explanations. Avoid excessive jargon or long-winded introductions.
3. **Action-Oriented**: Every technical guide must provide copy-pasteable, verified commands and configurations that work out of the box.
4. **First-Person & Inclusive**: Binu's authentic perspective ("I use...", "In my setup...", "Let's configure...").

---

## 2. Markdown Formatting Patterns

### Headings
- Use a single `# Level 1` heading per document.
- Follow logical nesting: `## Level 2` for major sections, `### Level 3` for subsections.
- Keep headings descriptive and title-cased.

### Code Blocks
- Always specify syntax language identifier:
  - Docker Compose: `yaml`
  - Shell commands: `bash`
  - Configuration files: `ini`, `nginx`, `json`, `yaml`
  - Scripts: `python`, `javascript`
- Add explanatory comments above non-obvious commands.
- Provide environment variable examples and mount point explanations.

### Callout Boxes (Admonitions)
Use standard MkDocs Material admonitions sparingly to highlight crucial notes:
```markdown
!!! note "Important Note"
    Detailed explanatory note.

!!! warning "Failsafe Precaution"
    Always configure an untagged fallback port before applying bridge changes.
```

### Grid Cards
For listing tools or services in a visual grid, use:
```html
<div class="grid cards" markdown>
- :simple-docker: __Docker__ for container management
- :simple-python: __Python__ for scripting
</div>
```

---

## 3. Visuals & Image Embedding

- **Standard guide screenshots**:
  `![Description](../assets/images/<folder>/<name>.webp){ width="700px" }`
- **Blog header images**:
  `![Header](images/YYYY/<slug>/<name>.webp){ loading=lazy width="800" }`
- **Side-aligned images** (e.g. portraits):
  `![Portrait](assets/landing/binu.png){ align=right width="150px" }`
- **Format**: Prefer `.webp` or `.svg` for crisp rendering and low bandwidth.

---

## 4. Tags & Taxonomies

- Tags must be lowercase, alphanumeric, with hyphens where needed (e.g., `self-hosted`, `docker`, `openwrt`, `vlan`, `prompt-engineering`).
- Tag each technical article with 3 to 6 relevant tags.
- Tag list page is automatically populated via `tags.md` with `<!-- material/tags -->`.

---

## 5. Blog Excerpt Divider

Every blog post must have the `<!-- more -->` comment placed immediately after the lead paragraph. This ensures MkDocs Material renders a clean snippet on the main blog index page before truncating.
