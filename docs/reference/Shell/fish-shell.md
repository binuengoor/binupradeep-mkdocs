---
title: Fish Shell Guide
description: A user-friendly command line shell with smart features like syntax highlighting, autosuggestions, and web-based configuration
tags: [fish, shell, terminal, command-line, linux, mac]
---

# Fish Shell Guide

Fish (Friendly Interactive Shell) is a smart and user-friendly command line shell for Linux, macOS, and other systems. Unlike bash or zsh, Fish is designed to be interactive out of the box with no configuration required.

## Key Features

**Out of the Box**
- Syntax highlighting
- Autosuggestions based on history
- Tab completions
- Web-based configuration tool

**Modern Design**
- No need to learn shell scripting for basic configuration
- Sane defaults
- Colorful prompt

## Installation

**macOS**
```bash
brew install fish
```

**Ubuntu/Debian**
```bash
sudo apt update
sudo apt install fish
```

**Fedora**
```bash
sudo dnf install fish
```

**Set as default shell**
```bash
chsh -s /usr/bin/fish
```

## Configuration

### Config File Location
- User config: `~/.config/fish/config.fish`

### Using the Web UI
```bash
fish_config
```
This opens a browser-based configuration tool.

### Set Theme
```bash
fish_config theme choose "Dracula"
```

## Common Commands

### Aliases (similar to bash)
```bash
# Create an alias
alias ll 'ls -lah'

# Make it persist (add to config.fish)
alias ll 'ls -lah'
# Then save:
funcsave ll
```

### Abbreviations (recommended over aliases)
```bash
# Abbreviations expand after pressing space
abbr --add g git
abbr --add gs git status
abbr --add ga git add
abbr --add gc 'git commit -m'
abbr --add gp git push

# Make persistent
funcsave g
```

### Functions
```bash
# Create a function
function ll
    ls -lah $argv
end

# Save for future sessions
funcsave ll
```

## Useful Functions

### Git branch in prompt
```bash
function fish_git_prompt
    if git rev-parse --git-dir >/dev/null 2>&1
        set -l branch (git symbolic-ref --short HEAD 2>/dev/null; or git rev-parse --short HEAD 2>/dev/null)
        if test "$branch"
            echo " ($branch)"
        end
    end
end

# Add to prompt in config.fish
set -g fish_prompt_dirty " ✗"
set -g fish_prompt_clean " ✓"
```

### Quick directory navigation
```bash
# cd to directory and list contents
function cl
    cd $argv; and ls
end
```

## Key Differences from Bash

| Feature | Bash | Fish |
|---------|------|------|
| Variables | `VAR=value` | `set VAR value` |
| Export | `export VAR` | `set -x VAR` |
| Arrays | `arr=(one two)` | `set arr one two` |
| Conditionals | `if [ $x = "y" ]` | `if test $x = "y"` |
| Loops | `for i in *.txt` | `for i in *.txt` |
| Functions | `function name() {}` | `function name\nend` |

## Environment Variables

```bash
# Set (temporary)
set PATH $PATH /usr/local/bin

# Set persistently (add to config.fish)
set -gx EDITOR vim

# Unset
set -e VARIABLE_NAME
```

## Tips & Tricks

### Disable greeting
```bash
set fish_greeting ""
```

### Use Starship prompt
```bash
# Install starship
brew install starship

# Add to config.fish
starship init fish | source
```

### Search history
```bash
# Up/Down arrows search history
# Or use Ctrl+R for reverse search
```

### Auto-cd (no need to type cd)
```bash
# Fish auto-cds to directories just by typing the path
/home/user/projects
# Automatically cd into it
```

### Wildcards
```bash
# List all files
ls **/*.txt
# Recursive search
```

## Troubleshooting

**Fish not starting**
```bash
# Check for syntax errors in config.fish
fish -n
```

**List all functions**
```bash```

**Disable
functions
 bracketed paste mode**
```bash
set fish_bracketed_paste disabled
```

## Additional Resources

- [Official Documentation](https://fishshell.com/docs/current/)
- [Fish Tutorial](https://fishshell.com/docs/current/tutorial.html)
- [Awesome Fish](https://github.com/jorgebucaran/awesome-fish)
- [Fish Gallery](https://github.com/fish-shell/fish-shell/wiki/Gallery)
