---
title: Zsh Shell Guide
description: Z Shell — a powerful shell with advanced features, plugins, and theming via Oh My Zsh
tags: [zsh, shell, terminal, command-line, linux, mac, oh-my-zsh, scripting]
---

# Zsh Shell Guide

Zsh (Z Shell) is a powerful shell that extends bash with many additional features. It's especially popular thanks to Oh My Zsh, a community-driven framework for managing Zsh configuration.

## Key Features

**Enhanced Completion**
- Intelligent tab completion
- Cursor-based menu selection
- Expandable abbreviations

**Plugins & Themes**
- Oh My Zsh framework
- Thousands of plugins
- Hundreds of themes

**Advanced Features**
- Shared history between sessions
- Globbing improvements
- Spelling correction

## Installation

**macOS**
```bash
# Install via Homebrew
brew install zsh

# Set as default shell
chsh -s /bin/zsh
```

**Ubuntu/Debian**
```bash
sudo apt install zsh

# Set as default
chsh -s /usr/bin/zsh
```

**Verify**
```bash
echo $SHELL
```

## Oh My Zsh

### Installation
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Configuration File
- Location: `~/.zshrc`

### Update Oh My Zsh
```bash
omz update
```

## Configuration Files

| File | Purpose |
|------|---------|
| `~/.zshrc` | Main configuration file |
| `~/.zprofile` | Login shell config |
| `~/.zshenv` | Always sourced |
| `~/.zlogin` | After .zprofile |

## Essential Plugins

### Enable Plugins
```bash
# Edit ~/.zshrc
plugins=(
    git
    docker
    python
    pip
    kubectl
    zsh-autosuggestions
    zsh-syntax-highlighting
)
```

### Recommended Plugins

**zsh-autosuggestions**
- Suggests commands as you type
- Based on history
- Install: `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`

**zsh-syntax-highlighting**
- Syntax highlighting for commands
- Red for invalid, green for valid
- Install: `git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`

**z**
- Quick directory jumping
- Based on frecency (frequent + recent)

### Useful Built-in Plugins

| Plugin | Description |
|--------|-------------|
| git | Git aliases and functions |
| docker | Docker completions |
| kubectl | Kubernetes completions |
| pip | Python pip completions |
| python | Python virtualenv support |
| npm | npm completions |
| brew | Homebrew completions |

## Aliases

```bash
# Shortcuts
alias ll='eza -lah'
alias la='eza -a'
alias l='eza -l'

# Git
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gco='git checkout'

# Navigation
alias ..='cd ..'
alias ...='cd ../..'

# Safety
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
```

## Functions

```bash
# Create and cd into directory
function mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Extract archives
extract() {
    if [ -f "$1" ] ; then
        case "$1" in
            *.tar.bz2) tar xjf "$1" ;;
            *.tar.gz) tar xzf "$1" ;;
            *.bz2) bunzip2 "$1" ;;
            *.rar) unrar x "$1" ;;
            *.gz) gunzip "$1" ;;
            *.tar) tar xf "$1" ;;
            *.tbz2) tar xjf "$1" ;;
            *.tgz) tar xzf "$1" ;;
            *.zip) unzip "$1" ;;
            *.7z) 7z x "$1" ;;
            *) echo "'$1' cannot be extracted" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}
```

## Themes

### Using a Theme
```bash
# In ~/.zshrc
ZSH_THEME="robbyrussell"
```

### Popular Themes

| Theme | Description |
|-------|-------------|
| robbyrussell | Default, simple and clean |
| agnoster | Powerline-style, requires font |
| powerlevel10k | Highly customizable, popular |
| starship | Fast, cross-shell |

### Powerlevel10k
```bash
# Install
git clone --depth=1 https://github.com/romkatv/powerlevel10k ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# Set in ~/.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# Configure
p10k configure
```

## Useful Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Move to beginning |
| `Ctrl+E` | Move to end |
| `Ctrl+U` | Clear line before |
| `Ctrl+K` | Clear line after |
| `Ctrl+R` | Search history |
| `Ctrl+O` | Accept and run |
| `Alt+.` | Insert last argument |
| `Esc+Q` | Push current line to stack |
| `Ctrl+X,G` | Insert all completions |

## Environment Variables

```bash
# In ~/.zshrc
export PATH="$HOME/bin:$PATH"
export EDITOR=vim
export VISUAL=vim

# History settings
export HISTSIZE=10000
export SAVEHIST=10000
export HISTFILE=~/.zsh_history
```

## Advanced Features

### Globbing
```bash
# Recursive search
ls **/*.txt

# Case-insensitive
ls -l (**).txt
```

### History
```bash
# Shared history (enable in ~/.zshrc)
setopt SHARE_HISTORY
setopt HIST_IGNORE_DUPS
```

### Spelling Correction
```bash
# Enable
setopt CORRECT
setopt CORRECT_ALL
```

## Useful Options

```bash
# In ~/.zshrc
setopt AUTO_CD              # cd by typing directory
setopt AUTO_PUSHD          # Push directory to stack
setopt AUTO_LIST           # Automatically list choices
setopt MENU_COMPLETE        # Auto-insert first match
setopt HIST_IGNORE_ALL_DUPS # No duplicate commands
setopt SHARE_HISTORY        # Share history between sessions
```

## Tips & Tricks

### Faster completions
```bash
# In ~/.zshrc
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
```

### Colorize completions
```bash
zstyle ':completion:*' menu select
```

### Disable automatic updates
```bash
DISABLE_AUTO_UPDATE="true"
```

## Additional Resources

- [Oh My Zsh Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki)
- [Zsh Documentation](https://zsh.sourceforge.io/Doc/)
- [Zsh Lovers](https://grml.org/zsh/zsh-lovers.html)
