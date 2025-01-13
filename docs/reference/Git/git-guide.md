---
title: Git Quick Reference
description: A comprehensive guide to Git version control system including common commands and submodule management
tags: [git, submodules, development]
---

# Git Version Control System Guide

Git is a distributed version control system that helps track changes in source code during software development. It enables multiple developers to work together on projects efficiently while maintaining a complete history of changes.

## Key Features

- Distributed version control
- Branching and merging capabilities
- Complete history tracking
- Support for collaborative development
- Submodule support for project dependencies

## Basic Commands

### Repository Setup
```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/username/repository.git

# Add remote repository
git remote add origin https://github.com/username/repository.git
```

### Daily Operations
```bash
# Check repository status
git status

# Stage changes
git add filename
git add .  # Stage all changes

# Commit changes
git commit -m "Descriptive commit message"

# Push changes to remote
git push origin branch-name

# Pull latest changes
git pull origin branch-name
```

## Branch Management

```bash
# Create new branch
git checkout -b feature-branch

# List all branches
git branch -a

# Switch branches
git checkout branch-name

# Merge branches
git merge feature-branch

# Delete branch
git branch -d branch-name
```

## Working with Submodules

Submodules allow you to keep a Git repository as a subdirectory of another Git repository, useful for managing project dependencies or shared components.

### Adding a Submodule
```bash
# Add a submodule to your project
git submodule add https://github.com/username/library.git path/to/submodule

# Initialize submodule
git submodule init

# Update submodule to latest commit
git submodule update
```

### Updating Submodules
```bash
# Update all submodules to their latest commits
git submodule update --remote

# Pull changes with submodules when cloning
git clone --recurse-submodules repository-url
```

## Additional Tips

- **Commit Messages**: Write clear, descriptive commit messages that explain what changes were made and why
- **Branching Strategy**: Use feature branches for new development to keep main/master branch stable
- **Submodule Management**: 
  - Always commit submodule changes separately from main project changes
  - Use specific commits or tags for submodules to ensure stability
  - Update submodules carefully to avoid breaking changes

## Common Use Cases

### Reverting Changes
```bash
# Discard changes in working directory
git checkout -- filename

# Reset staged changes
git reset HEAD filename

# Revert a commit
git revert commit-hash
```

### Stashing Changes
```bash
# Save changes temporarily
git stash

# List stashed changes
git stash list

# Apply stashed changes
git stash pop
```

### Viewing History
```bash
# View commit history
git log

# View changes in commit
git show commit-hash

# View file changes
git diff filename
```

This guide covers the most common Git operations for daily development work. For more detailed information about specific commands or advanced usage, consult the official Git documentation.