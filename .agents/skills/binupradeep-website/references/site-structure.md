# Site Structure & Taxonomies

The complete layout, navigation, plugin and asset map for `binupradeep-com` (Astro 7 + Starlight, static output, Cloudflare Pages).

---

## 1. Navigation

Two things drive navigation; keep them in step:

1. **`src/data/nav.ts`**: the links in the header on every page (and at the end of the mobile docs menu). The current section is underlined.
2. **`astro.config.mjs` → `starlightSidebarTopics`**: the sidebar "topics" (the icon list at the top of the docs sidebar). Inside a topic, the sidebar is auto-generated from the folder.

| Header link | Content folder (`src/content/docs/`) | Purpose |
| :--- | :--- | :--- |
| **Résumé** | *(page: `src/pages/resume.astro`)* | Print-friendly résumé, from `src/data/resume.ts` |
| **Projects** | `myapps/` | Documentation for Binu's open-source utilities and web apps |
| **Writing** | `blog/` | Essays (`northstar`), stories (`shortstory`), travelogues (`travel`) |
| **Networking** | `networking/` | OpenWrt, VLANs, Samba/NFS |
| **Self-Hosting** | `selfhosted/docker-compose/` | Docker Compose stack guides (Caddy, Audiobookshelf, Homepage, ...) |
| **Reference** | `reference/` | Linux, Git, macOS, Python, Media, Shell, AI cheat sheets |
| **Prompts** | `promptengineering/` | AI prompting frameworks and templates |
| *(logo)* | *(page: `src/pages/index.astro`)* | Homepage |

Header links point at a *real page* inside each section (a section has no index page), which is why `nav.ts` carries both an `href` and a `match` prefix.

---

## 2. Directory Map

```
src/
├── pages/            index.astro  resume.astro  404.astro
├── layouts/          Site.astro
├── components/       SiteHeader  SiteFooter  ThemeToggle  LogoFace  BlobPhoto  CaricatureHero
│                     StarlightHeader  StarlightFooter  StarlightThemeSelect  StarlightMobileMenuFooter
├── data/             resume.ts  nav.ts
├── styles/           tokens.css  chrome.css  home.css  theme.css
├── assets/
│   ├── logo.svg, logo-dark.svg
│   ├── landing/      binu-hero.webp (hero photo), binu.png, bp-hero-ink.svg (original caricature linework)
│   └── images/       <topic>/ guide screenshots (e.g. openwrt-vlan/)
└── content/docs/
    ├── networking/       openwrt-vlan, openwrt-x86-image-builder, samba-nfs
    ├── selfhosted/docker-compose/   audiobookshelf, caddy, dozzle, homepage, nexterm, tubearchivist
    ├── reference/
    │   ├── ai/ (openclaw-tips, pi-agent)   git/ (git-guide)   mac/ (homebrew)   media/ (ytdlp)
    │   ├── linux/ (linux-directory, linux-storage, rclone, rsync, zfs-guide)
    │   ├── python/ (install-python, python-basics)   shell/ (bash-shell, fish-shell, zsh-shell)
    ├── myapps/           audio-analysis-studio, event-track-manager, image-optimizer-for-web, interval-timer-app,
    │                     iptv-m3u-sorter, iptv-m3u-validator, universal-reader, universal-tts (.mdx)
    ├── promptengineering/  essential-templates
    └── blog/             10-hard-hitting-life-lessons-reddit, a-thousand-suns, favorite-life-quotes, idiots-in-town,
                          the-ripple-effect, tour-de-maine, tour-de-west, and images/YYYY/<slug>/
public/               favicon.ico, favicon.svg, og.png, robots.txt, _headers
scripts/og-image.html source for og.png
```

---

## 3. Plugins & Integrations (`astro.config.mjs`)

- **`@astrojs/starlight`**: docs framework (search via Pagefind, last-updated from git, edit links, expressive-code blocks).
- **`starlight-sidebar-topics`**: the top-of-sidebar section switcher.
- **`starlight-blog`**: blog at `/blog/` (`navigation: 'none'`, since the shared header carries the Writing link).
- **`starlight-links-validator`**: fails the build on broken internal links.
- **`astro-mermaid`**: renders ```` ```mermaid ```` fences (must come before Starlight).
- **`astro-icon`** with `lucide` and `simple-icons` sets: icons in `.astro`/`.mdx`.
- **`@astrojs/mdx`**: `.mdx` pages (needed for tabs/cards components).
- **Starlight options of note**: `disable404Route: true` (custom `404.astro`), component overrides for `Header`, `Footer`, `ThemeSelect`, `MobileMenuFooter`.

---

## 4. Theme & Typography

- **Palette**: warm editorial. Light = cream `#f6efe3` with rust accent; dark = warm near-black `#16120e`. Teal `#00ADB5` and orange `#FF7F11` come from the bp logo. All in `src/styles/tokens.css`.
- **Type**: Fraunces (display, headings), Inter (body), JetBrains Mono (code).
- **Logo**: a face with glasses; the lenses hold eyes that follow the cursor (`LogoFace.astro`).
- **Theme switch**: `data-theme` on `<html>`, stored in `localStorage` under `starlight-theme`.

---

## 5. Taxonomy

- Tags are lowercase kebab-case. Blog categories are the first tag: `northstar`, `shortstory`, `travel`.
- Technical pages carry 3-6 relevant tags (`docker`, `self-hosted`, `openwrt`, `vlan`, ...).
