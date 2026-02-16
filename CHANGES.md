# Change Log - binupradeep-mkdocs (Luna's Working Directory)

## 2026-02-16

### Initial Setup
- Cloned repo to: `/home/ubuntu/.openclaw/workspace/binupradeep-mkdocs`
- Configured git remote with Fine-Grained PAT for GitHub push access
- Token stored in OpenClaw auth-profiles.json under `github:binupradeep-mkdocs`
- Token expires: May 17, 2026

### Auth Profiles Fix
- Backup created: `auth-profiles.json.bak.1`
- Added github profile while preserving openrouter and minimax profiles
- Previous attempt had corrupted the JSON structure

### Notes
- Always create .bak.N backup before editing config files
- Always log changes here before making them

### New Reference Page: Fish Shell Guide
- Created: `docs/reference/Shell/fish-shell.md`
- Added comprehensive guide covering:
  - Installation (macOS, Ubuntu, Fedora)
  - Configuration (config.fish, web UI)
  - Common commands (aliases, abbreviations, functions)
  - Key differences from Bash
  - Tips & tricks (Starship, auto-cd, wildcards)
  - Troubleshooting
- Updated `.pages` to include Shell section under Tech-Reference
- Committed and pushed to GitHub
