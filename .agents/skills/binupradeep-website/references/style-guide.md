# Writing & Style Guide

Stylistic, linguistic and visual standards for all content across `binupradeep-com` (Astro + Starlight).

---

## 1. Writing Principles & Voice

1. **Clarity & brevity**: get straight to the point. Start with what the tool, guide or essay is about.
2. **Minimalism**: simple, unpretentious explanations. No excessive jargon or long introductions.
3. **Action-oriented**: every technical guide gives copy-pasteable, verified commands and configs that work out of the box.
4. **First person & inclusive**: Binu's authentic perspective ("I use...", "In my setup...", "Let's configure...").

---

## 2. Markdown Formatting Patterns

### Headings
- The frontmatter `title` is the page H1. **Do not** add a `# Heading` in the body.
- Body headings start at `##`, then `###`. Keep them descriptive and title-cased.

### Code blocks
- Always specify a language: `yaml` (Compose), `bash`, `ini`, `nginx`, `json`, `python`, `javascript`, `text`.
- Add a comment above non-obvious commands; show example env vars and mount points.

### Callouts (Starlight asides)
Use sparingly for crucial notes:
```markdown
:::note[Important note]
Detailed explanatory note.
:::

:::caution[Failsafe precaution]
Always configure an untagged fallback port before applying bridge changes.
:::
```
Variants: `:::note`, `:::tip`, `:::caution`, `:::danger`.

### Tabs, cards, steps
Need an `.mdx` file and an import:
```mdx
import { Tabs, TabItem, Card, CardGrid } from '@astrojs/starlight/components';
```
In `.mdx`, write `<br />` (not `<br>`) and escape bare `<` and `{` in prose.

### Diagrams
Fenced ```` ```mermaid ```` blocks. Quote edge labels that contain `()<>`: `A -->|"Hit (<1ms)"| B`.

### Icons
Use `astro-icon` in `.astro`/`.mdx`: `<Icon name="lucide:..." />` (only the `lucide` set is installed; add another `@iconify-json/*` package for more). There are no `:material-*:` shortcodes.

---

## 3. Visuals & Image Embedding

- **Guide screenshots**: saved in `src/assets/images/<topic>/`, e.g. `![Description](../../../assets/images/<topic>/<name>.webp)` (they are optimized at build).
- **Blog images**: in `src/content/docs/blog/images/YYYY/<slug>/`, e.g. `![Header](images/YYYY/<slug>/header.webp)`.
- **Format**: prefer `.webp` or `.svg`.
- Do not use attribute lists like `{ width="700px" }`; size with CSS if needed.

---

## 4. Tags & Taxonomies

- Lowercase kebab-case (`self-hosted`, `docker`, `openwrt`, `vlan`, `prompt-engineering`).
- 3-6 tags per technical article. Blog posts put the category tag first (`northstar` | `shortstory` | `travel`).

---

## 5. Blog Excerpt Divider

Every blog post puts `<!-- excerpt -->` right after the lead paragraph. That is what the blog index shows as the teaser.

---

## 6. Visual Language (when touching styles or components)

- Use theme tokens (`var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--teal)`, `var(--orange)`), never raw colours, so light and dark both work.
- Headings: Fraunces. Body: Inter. Code: JetBrains Mono.
- Personality lives in the homepage, blog and small details (the logo's eyes, the glasses dividers, the 404). Docs pages stay plain and fast to read.
- Respect `prefers-reduced-motion`; keep decorative graphics `aria-hidden`.
