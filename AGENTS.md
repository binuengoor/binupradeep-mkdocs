# Binu Pradeep Personal Website (Astro + Starlight) - Agent Guide & Workspace Knowledge

This repository powers **Binu Pradeep's** personal portfolio, homelab documentation, tech reference guides, self-built applications showcase, and personal blog.

---

## 1. Persona & Tone Guidelines

- **Author**: Binu Pradeep — Project Manager (with a Business Analysis background) based in Philadelphia, PA, with a passion for minimalism, homelab/self-hosting, networking, Docker, AI, audio, and digital product design.
- **Tone**: Pragmatic, clean, structured, minimalist, authoritative yet approachable. The *site* has more personality (see §4); the *content* stays direct.
- **Philosophy**: *"Minimalism and simplicity are the best tools to communicate ideas."*
- **Formatting Standards**:
  - Direct and actionable. Avoid filler.
  - Clear hierarchy (`##`, `###`), bold feature callouts (`**Feature**: Explanation`), annotated code snippets.
  - Frontmatter on every content file.
  - Fenced code blocks always carry a language (`yaml`, `bash`, `python`, ...).

---

## 2. Site Architecture & Directory Layout

Built with **Astro 7 + Starlight**, deployed as a static site on Cloudflare Pages. Plugins: `starlight-blog`, `starlight-sidebar-topics`, `starlight-links-validator`; Mermaid via `astro-mermaid`; icons via `astro-icon`.

```
binupradeep-com/
├── astro.config.mjs        # Starlight config: sidebar topics, blog, mermaid, component overrides, custom CSS
├── package.json
├── public/                 # favicon, robots.txt, _headers, og.png
├── scripts/og-image.html   # source for public/og.png (render at 1200x630)
├── .agents/                # agent rules & skills (see §6)
└── src/
    ├── pages/
    │   ├── index.astro     # custom homepage (NOT Starlight)
    │   ├── resume.astro    # print-friendly résumé (/resume/)
    │   └── 404.astro       # custom 404 ("let me adjust my glasses")
    ├── layouts/Site.astro  # layout for the custom pages: <head>, shared header/footer, progress bar
    ├── components/
    │   ├── SiteHeader.astro / SiteFooter.astro / ThemeToggle.astro / LogoFace.astro   # shared chrome
    │   ├── Starlight{Header,Footer,ThemeSelect,MobileMenuFooter}.astro               # Starlight overrides
    │   ├── BlobPhoto.astro / CaricatureHero.astro                                     # homepage portrait pieces
    ├── data/
    │   ├── resume.ts       # résumé content shared by the homepage and /resume/ (no address/phone)
    │   └── nav.ts          # THE list of top-level nav links (header on every page + mobile docs menu)
    ├── styles/
    │   ├── tokens.css      # palette (light + dark) shared by everything
    │   ├── chrome.css      # header, logo, theme toggle, footer (shared by every page)
    │   ├── home.css        # homepage / résumé / 404 layout
    │   └── theme.css       # maps the tokens onto Starlight's variables (docs + blog)
    ├── assets/             # logo, landing images (photo, caricature ink), guide screenshots (optimized at build)
    ├── content.config.ts
    └── content/docs/
        ├── networking/  selfhosted/docker-compose/  reference/{ai,git,linux,mac,media,python,shell}/
        ├── myapps/  promptengineering/
        └── blog/           # starlight-blog posts: <slug>.md + images/YYYY/<slug>/
```

---

## 3. Section Overview & Writing Conventions

### A. Homepage (`src/pages/index.astro`)
Hand-built Astro page, not markdown. Order: hero (photo in the riso blob) → pull-quote band → numbered sections (Certified, What I do, Skills & stack, Experience, Things I've built, Writing, About me, Kind words, Say hello), separated by "glasses" dividers.
- Certifications, experience, skills, education and links come from **`src/data/resume.ts`**: edit that file, not the page. The résumé page reads the same file.
- The four featured-project cards and the stack chips are lists at the top of `index.astro`.
- The Writing section lists the 4 newest blog posts automatically.
- About me shows the original hand-drawn caricature (`CaricatureHero.astro`; ink follows the theme colour via a CSS mask).

### B. Self-Hosted Guides (`src/content/docs/selfhosted/docker-compose/*.md`)
Practical, ready-to-run Docker Compose setups. Structure: intro sentence → `## Key Features` → `## Docker Compose Installation` (yaml + `docker compose up -d`) → `## Directory Structure` → `## Getting Started`.

### C. My Apps (`src/content/docs/myapps/*.md`)
Apps Binu built (Universal TTS, Universal Reader, Event Track Manager, Audio Analysis Studio, Interval Timer App, Image Optimizer for Web, IPTV M3U Sorter/Validator). Structure: tagline → GitHub + `ghcr.io/binuengoor/...` links → Key Features → Installation → Usage/Config → Technical Details → Troubleshooting.

### D. Tech Reference (`src/content/docs/reference/<category>/*.md`)
Concise, high-density cheat sheets (Linux, Git, Mac, Python, Media, Shell, AI). Overview → categorized commands → best practices/troubleshooting.

### E. Home Networking (`src/content/docs/networking/*.md`)
Real scenario → numbered steps with screenshots in `src/assets/images/<topic>/` → verification → failsafe/recovery.

### F. Prompt Engineering (`src/content/docs/promptengineering/*.md`)
Prompting frameworks and reusable templates.

### G. Blog (`src/content/docs/blog/<slug>.md`)
Categories are **tags**: `northstar` (reflections, quotes), `shortstory` (fiction), `travel` (travelogues). Put `<!-- excerpt -->` after the opening paragraph. Header image: `![Header](images/YYYY/<slug>/header.webp)`. The two travelogues `tour-de-west` and `tour-de-maine` are different trips (Maine is the sequel), not duplicates.

---

## 4. Design System (one theme for the whole site)

The homepage, résumé, 404, docs and blog share one **warm editorial** look. Do not restyle a page in isolation; change the shared pieces.

| Piece | Where | Notes |
|---|---|---|
| Palette (light = cream, dark = warm near-black) | `src/styles/tokens.css` | Accent rust, teal `#00ADB5`, orange `#FF7F11` come from the bp logo. Both themes live here. |
| Header / footer / logo / theme toggle | `src/components/Site*.astro`, `src/styles/chrome.css` | One header used by the homepage layout **and** Starlight (via `StarlightHeader.astro`). |
| Nav links | `src/data/nav.ts` | Single source. The current section is underlined (`aria-current`). |
| Starlight colours, fonts, blog cards | `src/styles/theme.css` | Maps tokens onto `--sl-color-*`. Headings use Fraunces; body Inter; code JetBrains Mono. |
| Theme switch | `ThemeToggle.astro` | Sets `data-theme` on `<html>`; saved under the `starlight-theme` key (shared with Starlight). |

Details worth knowing:
- **The logo is a face with glasses.** `LogoFace.astro` draws it inline; the eyes follow the cursor and blink (script in `SiteHeader.astro`, skipped for `prefers-reduced-motion`). Keep it decorative (`aria-hidden`).
- **Photo blob:** `#blobClip` (an SVG `clipPath`) is defined once at the top of `<main>` in `index.astro`; `BlobPhoto.astro` depends on it.
- **Caricature:** `src/assets/landing/bp-hero-ink.svg` is the original drawing, untouched. It is painted through a CSS mask so the ink is dark on cream and light on dark. Don't recolour or "improve" the drawing.
- **Docs have no search on the homepage** (Starlight's Pagefind search only exists on docs pages). This is intentional.
- **Print:** `home.css` / `chrome.css` hide the header, footer and progress bar and force black-on-white. Sections may break across pages; each job/certification stays together.

---

## 5. Adding things: what to edit

| You add… | Edit | Needs config? |
|---|---|---|
| A page in an existing section | Create the `.md` in the right folder | No. Sidebar is auto-generated. |
| A blog post | `src/content/docs/blog/<slug>.md` | No. Appears in the blog and on the homepage. |
| A certification / job / skill / education entry | `src/data/resume.ts` | No. Homepage and `/resume/` both update. |
| A featured project card on the homepage | `featured` array in `index.astro` | No. |
| A brand-new **top-level section** | Add a topic in `astro.config.mjs` (`starlightSidebarTopics`) **and** a link in `src/data/nav.ts` | Yes, both. |
| A colour or font change | `src/styles/tokens.css` / `theme.css` | No. |

## 6. Agent rules & skills

- `.agents/rules/site-standards.md`: frontmatter, navigation, syntax, code-block rules (read this before writing content).
- `.agents/skills/binupradeep-website/`: step-by-step workflows, structure reference, style guide and content templates.

## 7. Build & Local Preview

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/ (also validates internal links; a broken link fails the build)
npm run preview
```

Cloudflare Pages: build command `npm run build`, output directory `dist`, Node 22+ (`NODE_VERSION` env var or `.nvmrc`). Page "last updated" dates come from git history, so the build needs a full (non-shallow) clone.

## 8. Gotchas

- **404:** the site has its own `src/pages/404.astro`, so `disable404Route: true` is set in the Starlight config. Remove one without the other and you get a route-collision warning (a hard error in future Astro).
- **Blog nav:** `starlightBlog({ navigation: 'none' })`. The plugin's own "Writing" link would duplicate the shared header's.
- **Overridden Starlight components:** `Header`, `Footer`, `ThemeSelect`, `MobileMenuFooter` (see `astro.config.mjs`). If you add a plugin that overrides one of these, Starlight will warn; merge the two on purpose.
- **Frontmatter titles are the page H1.** Never repeat the title as `# Heading` in the body.
- **Don't delete posts that "look" duplicated.** Check content and tags first (the two Tour posts share a copied title but are different trips).
