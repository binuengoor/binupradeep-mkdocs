# Site Structure & Taxonomies

This document outlines the complete architectural layout, navigation hierarchy, plugin ecosystem, and media taxonomy for `binupradeep-mkdocs`.

---

## 1. Top-Level Navigation (`docs/.pages`)

The navigation bar order is governed by `docs/.pages`:

| Tab Name | Path in `docs/` | Purpose |
| :--- | :--- | :--- |
| **Home** | `index.md` | Personal bio, design philosophy, skills grid, testimonials, social links |
| **Home-Networking** | `networking/` | Network isolation, OpenWrt, VLANs, Samba/NFS file shares |
| **Self-Hosting** | `selfhosted/Docker Compose/` | Docker Compose stack guides (Caddy, Audiobookshelf, Homepage, etc.) |
| **Tech-Reference** | `reference/` | Linux, Git, macOS Homebrew, Python, and Media cheat sheets |
| **My-Apps** | `myapps/` | Documentation for Binu's open-source utilities and web applications |
| **Prompt-Engineering** | `promptengineering/` | AI system prompts, few-shot templates, and best practices |
| **Blog** | `blog/` | Personal essays, mindset reflections (`northstar`), stories, and travelogues |

---

## 2. Directory Mapping & Content Locations

```
docs/
├── .pages                      # Awesome-pages top nav definition
├── index.md                    # Root landing page (no toc, no nav)
├── tags.md                     # Central tags list (<!-- material/tags -->)
├── stylesheets/extra.css       # Custom CSS overrides
├── assets/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── landing/                # Icons (figma, docker, python, tableau, etc.) & portrait
│   └── images/                 # Guide-specific screenshots (e.g. 20241226_openwrt_vlan/)
├── networking/
│   ├── openwrt_vlan.md
│   ├── openwrt_x86_image_builder.md
│   └── samba_nfs.md
├── selfhosted/
│   └── Docker Compose/
│       ├── audiobookshelf.md
│       ├── caddy.md
│       ├── dozzle.md
│       ├── homepage.md
│       ├── nexterm.md
│       └── tubearchivist.md
├── reference/
│   ├── AI/
│   │   ├── .pages
│   │   └── openclaw-tips.md
│   ├── Git/
│   │   └── git-guide.md
│   ├── Linux/
│   │   ├── linux-directory.md
│   │   ├── linux-storage.md
│   │   ├── rclone.md
│   │   ├── rsync.md
│   │   └── zfs-guide.md
│   ├── Mac/
│   │   └── homebrew.md
│   ├── Media/
│   │   └── ytdlp.md
│   ├── Python/
│   │   ├── install_python.md
│   │   └── python_basics.md
│   └── Shell/
│       ├── .pages
│       ├── bash-shell.md
│       ├── fish-shell.md
│       └── zsh-shell.md
├── myapps/
│   ├── audio-analysis-studio.md
│   ├── image-optimizer-for-web.md
│   ├── interval-timer-app.md
│   ├── iptv-m3u-sorter.md
│   ├── iptv-m3u-validator.md
│   └── openspeech.md
├── promptengineering/
│   └── essential-templates.md
└── blog/
    ├── index.md
    └── posts/
        ├── images/             # Post cover and body images organized by year
        │   ├── 2010/
        │   ├── 2011/
        │   ├── 2017/
        │   └── 2025/
        ├── 2010-12-13-idiots-in-town.md
        ├── 2011-12-05-a-thousand-suns.md
        ├── 2017-03-12-the-ripple-effect.md
        ├── 2017-05-23-tour-de-west.md
        ├── 2017-06-21-tour-de-maine.md
        ├── 2025-01-10-favorite-quotes.md
        └── 2025-01-10-lessons-hard-hitting-reddit.md
```

---

## 3. MkDocs Material Plugins Configuration

- **`awesome-pages`**: Automates navigation based on `.pages` files.
- **`blog`**: Powers blog functionality (`blog_dir: blog`, `authors: false`).
- **`git-revision-date-localized`**: Renders relative "time ago" timestamps on pages; excludes `index.md`.
- **`resize-images`**: Resizes images from `assets-large` to `assets` target dimensions (`[800, 600]`).
- **`search`**: Full client-side indexing with search highlighting, share, and suggestion.
- **`social`**: Generates Open Graph social preview cards.
- **`tags`**: Generates tag pills linking to `tags.md`.

---

## 4. Theme & Extensions

- **Theme Palette**: Slate scheme (`primary: black`, `accent: deep orange`).
- **Typography**: `Roboto` for text, `Roboto Mono` for code.
- **Enabled Markdown Extensions**:
  - `admonition` & `pymdownx.details` (collapsible callout boxes)
  - `pymdownx.superfences` (syntax highlighting, code fences, Mermaid diagram rendering)
  - `pymdownx.tabbed` (content tabs)
  - `pymdownx.tasklist` (checkboxes)
  - `pymdownx.emoji` (Twemoji SVG generator)
  - `mdx_truly_sane_lists` (accurate nested list parsing)
  - `attr_list` & `md_in_html` (custom styling attributes on markdown elements)
