# Change Log

Notable changes to binupradeep.com, newest first. Git history has the detail; this file records the *why* and anything a future editor (human or agent) should know.

## 2026-10-07: One warm editorial theme across the whole site

**Homepage**
- New design: Fraunces + Inter, cream/rust/teal palette with a warm dark theme. The hero is the portrait photo in a hand-cut "riso" blob; About me shows the original hand-drawn caricature (its ink follows the theme colour).
- Numbered sections (Certified, What I do, Skills & stack, Experience, Things I've built, Writing, About me, Kind words, Say hello) separated by "glasses" dividers that fill in as you scroll; thin reading-progress bar.
- All 10 certifications show with the amber underline.
- The bp logo is now an inline SVG face with glasses; the eyes follow the cursor and blink (skipped for `prefers-reduced-motion`).
- New 404 page ("Hold on, let me adjust my glasses.").

**Shared look and navigation**
- Docs and blog now use the same palette, fonts, header, footer and theme toggle as the homepage (`tokens.css`, `chrome.css`, `theme.css`; Starlight `Header`, `Footer`, `ThemeSelect`, `MobileMenuFooter` overridden).
- Top-level nav links live in one file, `src/data/nav.ts`; the current section is underlined. Added a **Prompts** link. The mobile docs menu ends with the same links so Résumé and Home are reachable.
- `starlightBlog({ navigation: 'none' })` and `disable404Route: true` avoid duplicate links / a route collision (see `AGENTS.md` §8).
- Homepage intentionally has no search (Starlight's search exists on docs pages only).

**Fixes**
- Theme: first visit follows the device (light/dark); until you press the toggle the site also follows the device if it switches while a page is open. Pressing the toggle saves your choice.
- Verified in WebKit (Safari's engine) with an iPhone profile, light and dark: photo blob clip, caricature mask, open docs menu, no horizontal overflow.
- Résumé print: sections now flow across pages (was leaving page 1 nearly blank); each job and certification stays together.
- `tour-de-west` and `tour-de-maine` shared one copied title. They are different trips (Maine is the sequel), so both were kept and retitled "Tour de West: ..." / "Tour de Maine: ... (the sequel)". URLs unchanged.

**Docs**
- `AGENTS.md`, `.agents/rules/site-standards.md` and the `binupradeep-website` skill (workflows, structure, style guide, templates) rewritten for Astro + Starlight and the new theme.

## 2026-10-04: Migrated from MkDocs Material to Astro + Starlight

- Material for MkDocs entered maintenance mode (end of life reportedly 2026-11-05), so the site moved to Astro 7 + Starlight.
- Custom portfolio homepage and a print-friendly résumé page (`/resume/`) driven by `src/data/resume.ts`; PM-focused copy, certifications, OG image.
- Content moved to `src/content/docs/` with lowercase kebab-case paths; blog moved to `starlight-blog`; Material syntax (admonitions, tabs, grid cards, icon shortcodes) converted to Starlight equivalents; Mermaid kept via `astro-mermaid`.
- Legacy MkDocs sources and the migration script removed (PRs #1 to #3). The last MkDocs version is commit `1c7049a` (2026-09-12).

## 2026-02-16: Fish shell reference (MkDocs era)

- Added `reference/shell/fish-shell.md` (installation, configuration, aliases/abbreviations/functions, differences from Bash, Starship, troubleshooting) and registered the Shell section in the nav.
