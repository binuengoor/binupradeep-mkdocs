---
title: Fish Shell & Modern CLI Reference Guide
description: A comprehensive reference guide for Fish Shell, modern Rust/Go command-line utilities, interactive FZF keybindings, Zoxide directory jumping, and custom productivity aliases.
tags: [fish, terminal, shell, cli, fzf, zoxide, starship, neovim, productivity, macos, linux]
---

# Fish Shell & Modern CLI Reference Guide

The **Fish Shell (Friendly Interactive Shell)** paired with modern CLI utilities (written in Rust and Go) transforms the terminal from an arcane prompt into a responsive, color-coded, and highly interactive productivity engine.

This reference guide covers the modern command-line tools, shell keybindings, fuzzy search shortcuts, navigation helpers, and custom automation functions configured in this setup.

---

## 1. Modern CLI Tools Cheat Sheet

Traditional Unix tools (`ls`, `cat`, `grep`, `find`, `top`, `ps`, `df`, `du`) have modern replacements with syntax highlighting, Git integration, and intuitive visual formatting.

| Tool | Replaces | Primary Aliases | What It Does & When to Use It |
| :--- | :--- | :--- | :--- |
| **[eza](https://github.com/eza-community/eza)** | `ls`, `tree` | `ls`, `ll`, `la`, `lt`, `tree` | File listing with icons, color-coded permissions, Git status badges, and tree hierarchies. |
| **[bat](https://github.com/sharkdp/bat)** | `cat`, `less` | `cat`, `catp`, `batl` | File viewer with automatic syntax highlighting, line numbers, Git modifications, and paging. |
| **[ripgrep](https://github.com/BurntSushi/ripgrep)** | `grep` | `rg`, `rgi` | Ultra-fast recursive code search. Respects `.gitignore` by default. |
| **[fd](https://github.com/sharkdp/fd)** | `find` | `fd` | Intuitive, colorized file search with regex and fuzzy pattern matching. |
| **[duf](https://github.com/muesli/duf)** | `df` | `df` | Clean, visual disk space and filesystem usage table. |
| **[dust](https://github.com/bootandy/dust)** | `du` | `du` | Instant graphical tree showing which folders consume the most disk space. |
| **[btop](https://github.com/aristocratos/btop)** | `top`, `htop` | `top` | Interactive visual dashboard monitoring CPU, memory, disks, network, and processes. |
| **[procs](https://github.com/dalance/procs)** | `ps` | `ps` | Human-readable process viewer with colored PID, memory, user, and TCP port columns. |
| **[delta](https://github.com/dandavison/delta)** | `diff` | `diff` | Side-by-side syntax-highlighted git diffs with intra-line word-level change highlights. |
| **[zoxide](https://github.com/ajeetdsouza/zoxide)** | `cd` | `z`, `zi` | Smarter `cd` that learns your most frequent directories for instant fuzzy jumping. |
| **[fzf](https://github.com/junegunn/fzf)** | — | `Ctrl+P`, `Ctrl+F` | General-purpose interactive fuzzy finder for files, history, git commits, and processes. |

---

## 2. Directory Navigation & Smart Jumping

### Smart CD with Zoxide
Instead of typing lengthy relative paths (`cd ../../../Documents/Git/project`), **zoxide** tracks your history and lets you jump directly by typing partial folder names:

```bash
# Jump to the highest-scoring directory matching "studio"
z studio

# Open an interactive fzf picker of recent matching directories
zi audio

# Quick jump to home
~h

# Go back to the previous directory (cd -)
cdd
```

### Quick Traverse Shortcuts
```bash
..      # cd ..      (up 1 level)
...     # cd ../..   (up 2 levels)
....    # cd ../../.. (up 3 levels)
```

### Make & Enter Directory (`mkcd`)
Creates the entire directory path (including nested parent folders) and immediately enters it:
```bash
mkcd my-new-project/src/components
```

---

## 3. Interactive FZF Keybindings & Search

FZF is preconfigured with TokyoNight theme styling, rounded borders, and real-time `bat` preview windows.

| Keybinding | Action | Description |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | **Fuzzy History** | Search through full command history; press `Enter` to run or `Tab` to edit. |
| <kbd>Ctrl</kbd> + <kbd>F</kbd> | **Fuzzy File Search** | Interactive file/folder picker with live `bat` syntax preview. |
| <kbd>Ctrl</kbd> + <kbd>G</kbd> | **Git Log Search** | Interactive Git commit history browser with commit diff previews. |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | **Git Status Search** | Fuzzy-pick modified files from `git status` with staged/unstaged diffs. |
| <kbd>Ctrl</kbd> + <kbd>X</kbd> | **Fuzzy Process Killer** | Select running processes and terminate them interactively (`fkill`). |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> | **Interactive Zoxide** | Trigger `zi` directory jumper modal. |
| <kbd>Ctrl</kbd> + <kbd>I</kbd> | **Accept Autosuggestion** | Complete Fish's gray inline autocomplete suggestion. |
| <kbd>Ctrl</kbd> + <kbd>E</kbd> | **Edit in Neovim** | Open current command buffer in Neovim (`$EDITOR`) for complex editing. |
| <kbd>Ctrl</kbd> + <kbd>L</kbd> | **Clear Screen** | Clears screen while preserving terminal scrollback history. |
| <kbd>Ctrl</kbd> + <kbd>/</kbd> | **Toggle Preview** | Toggle FZF preview pane on or off. |
| <kbd>Ctrl</kbd> + <kbd>Y</kbd> | **Copy to Clipboard** | Copy selected FZF line to macOS clipboard (`pbcopy`). |

---

## 4. Git Productivity Shortcuts

Common multi-word Git commands are aliased into fast two- and three-letter shortcuts:

```bash
# Status & Staging
gs        # git status -sb (compact, branch-aware status)
ga <file> # git add <file>
ga .      # git add all

# Committing
gc        # git commit -v (opens Neovim with full diff context)
gcm "msg" # git commit -m "msg"

# Branching & Switching
gb        # git branch (list local)
gba       # git branch -a (list local + remote)
gco <br>  # git checkout <branch>
gcb <br>  # git checkout -b <new-branch>
gcof      # Fuzzy checkout: interactive fzf branch picker

# Syncing & History
gp        # git push
gpl       # git pull
gl        # git log --oneline -20 (compact last 20 commits)
gla       # git log --oneline --all -30 (all branches graph)
gd        # git diff (unstaged changes via delta)
gds       # git diff --staged (staged changes via delta)
gr        # git remote -v
gf        # git fetch
gm <br>   # git merge <branch>
grb <br>  # git rebase <branch>

# Stashing
gst       # git stash
gstp      # git stash pop

# GitHub PR Automation
ghpr      # Opens GitHub PR comparison in your browser for current branch
```

---

## 5. System, Network & Helper Functions

### System & Diagnostic Shortcuts
```bash
h              # View shell history
hgrep <term>   # Search command history using ripgrep (e.g. hgrep docker)
c              # Clear terminal screen
reload         # Reload Fish configuration instantly (exec fish)
path           # Prints system $PATH line-by-line for readable debugging
ports          # List all active listening TCP/UDP ports (lsof -i -P -n)
myip           # Display your current external/public IP address
weather        # Quick ASCII 3-day weather forecast via wttr.in
```

### Universal Archive Extractor (`extract`)
Extracts any supported compressed archive format without remembering flags:
```bash
extract backup.tar.gz
extract dataset.zip
extract archive.7z
extract package.tar.bz2
```

### Tmux Session Management
```bash
tm <name>      # Create a new tmux session or attach if it already exists
tms            # Interactive fzf switcher between active tmux sessions
```

### Fuzzy Process Killer (`fkill`)
```bash
fkill          # Interactive fzf list to kill a rogue process (sends SIGKILL)
fkill 15       # Send graceful SIGTERM (15) instead of SIGKILL (9)
```

---

## 6. OpenCode AI Agent Shortcuts

Direct CLI triggers for specialized OpenCode task agents:

```bash
ocf <query>      # opencode --agent finance
och <query>      # opencode --agent health
ochome <query>   # opencode --agent home
ocl <query>      # opencode --agent learning
oclog <query>    # opencode --agent logistics
ochob <query>    # opencode --agent hobbies
oco <query>      # opencode --agent cooking
oclib <query>    # opencode --agent librarian
occrit <query>   # opencode --agent brutal-critic
ocdist <query>   # opencode --agent distiller
ocsetup <query>  # opencode --agent project-setup

# Scaffold new project workspace in Obsidian vault
ocl-new "Market Analysis"
# Creates: ~/Documents/Obsidian/beep-notes/5. Opencode/Inbox/YYYY-MM-DD_Market-Analysis
```

---

## 7. Configuration & Plugins Architecture

- **Primary Config File**: `~/.config/fish/config.fish`
- **Plugin Manager ([Fisher](https://github.com/jorgebucaran/fisher))**:
  ```bash
  fisher install jorgebucaran/fisher    # Package manager
  fisher install patrickf1/fzf.fish     # Interactive FZF integration
  fisher install jethrokuan/z           # Zoxide / directory tracking
  fisher list                           # List installed plugins
  fisher update                         # Update all plugins
  ```
- **Prompt**: [Starship Prompt](https://starship.rs/) (`~/.config/starship.toml`).
- **Vi Mode**: Enabled by default (`fish_vi_key_bindings`). Press <kbd>Esc</kbd> for Normal mode and <kbd>i</kbd> for Insert mode.
- **Environment & Toolchains**:
  - `uv` (fast Python toolchain) sourced via `~/.local/bin/env.fish`.
  - `OrbStack` Docker engine integration.
  - `LM Studio CLI` & `Antigravity` bin paths pre-configured in `$PATH`.
