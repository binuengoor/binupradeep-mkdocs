---
title: Bash Shell Guide
description: The Bourne Again Shell — a versatile and widely-used command line shell for Linux, macOS, and Unix systems
tags: [bash, shell, terminal, command-line, linux, mac, scripting]
---

# Bash Shell Guide

Bash (Bourne Again Shell) is the default shell on most Linux distributions and macOS. It's a powerful, feature-rich shell that's perfect for both interactive use and scripting.

## Key Features

**Interactive Use**
- Command history with arrow keys
- Tab completion for commands, files, and arguments
- Job control (foreground/background processes)
- Aliases and functions

**Scripting**
- Full programming language features
- String manipulation
- Arrays
- Conditionals and loops

## Installation

**macOS (default, but outdated)**
```bash
# Install latest via Homebrew
brew install bash
# Add to list of shells
sudo bash -c 'echo /opt/homebrew/bin/bash >> /etc/shells'
# Set as default
chsh -s /opt/homebrew/bin/bash
```

**Ubuntu/Debian**
```bash
# Already installed! Just set as default
chsh -s /usr/bin/bash
```

## Configuration Files

| File | Purpose |
|------|---------|
| `~/.bashrc` | Run for interactive non-login shells |
| `~/.bash_profile` | Run for login shells (macOS) |
| `~/.bash_login` | Run if .bash_profile not found |
| `~/.profile` | Run for login shells (Ubuntu) |
| `/etc/bash.bashrc` | System-wide config |

**Tip:** Put interactive configs in `~/.bashrc` and login configs in `~/.profile`

## Common Aliases

```bash
# Shortcuts
alias ll='ls -lah'
alias la='ls -A'
alias l='ls -CF'

# Safety
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline -10'

# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
```

## Functions

```bash
# Function with arguments
function mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Usage: mkcd newproject

# Git functions
function gco() {
    git checkout "$1"
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
            *.Z) uncompress "$1" ;;
            *.7z) 7z x "$1" ;;
            *) echo "'$1' cannot be extracted" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}
```

## Prompt Customization

### Basic PS1 Example
```bash
# Add to .bashrc
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

# Color codes:
# \033[0;30m - Black
# \033[0;31m - Red
# \033[0;32m - Green
# \033[0;33m - Yellow
# \033[0;34m - Blue
# \033[0;35m - Purple
# \033[0;36m - Cyan
# \033[0;37m - White
```

### Git Branch in Prompt
```bash
parse_git_branch() {
    git branch 2>/dev/null | grep '*' | sed 's/* //'
}

PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;31m\]$(parse_git_branch)\[\033[00m\]\$ '
```

## Environment Variables

```bash
# Add to PATH
export PATH="$HOME/bin:$PATH"

# Editor
export EDITOR=vim
export VISUAL=vim

# History
export HISTSIZE=10000
export HISTFILESIZE=20000
export HISTCONTROL=ignoredups:erasedups
```

## Useful Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Move to beginning of line |
| `Ctrl+E` | Move to end of line |
| `Ctrl+U` | Clear line before cursor |
| `Ctrl+K` | Clear line after cursor |
| `Ctrl+R` | Search history |
| `Ctrl+L` | Clear screen |
| `Ctrl+C` | Cancel current command |
| `Ctrl+Z` | Suspend/background process |
| `!!` | Repeat last command |
| `!$` | Last argument of previous command |

## Shell Options

```bash
# Useful shopt options
shopt -s histappend        # Append to history
shopt -s checkwinsize      # Update window size
shopt -s globstar          # ** for recursive paths
shopt -s nocaseglob        # Case-insensitive globbing

# Add to .bashrc to make permanent
```

## Conditionals

```bash
# Basic if
if [ -f "$file" ]; then
    echo "File exists"
fi

# If-else
if [ $# -eq 0 ]; then
    echo "No arguments"
else
    echo "Arguments: $@"
fi

# String comparisons
if [ "$var" = "hello" ]; then
    echo "Hello!"
fi

# Numeric comparisons
if [ $num -gt 10 ]; then
    echo "Greater than 10"
fi
```

## Loops

```bash
# For loop over files
for file in *.txt; do
    echo "Processing $file"
done

# For loop over command output
for i in $(seq 1 5); do
    echo "Number $i"
done

# While loop
while read line; do
    echo "$line"
done < file.txt
```

## Tips & Tricks

### Colorized output
```bash
# Red
echo -e "\033[0;31mThis is red\033[0m"

# Green
echo -e "\033[0;32mThis is green\033[0m"
```

### Check command success
```bash
cd /some/directory && echo "Success" || echo "Failed"
```

### Default value
```bash
# Use default if variable is empty
echo "${VAR:-default}"
```

## Additional Resources

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [Bash Pitfalls](https://mywiki.wooledge.org/BashPitfalls)
