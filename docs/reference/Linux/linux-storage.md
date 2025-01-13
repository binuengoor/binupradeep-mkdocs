---
title: Linux Storage Commands - Check Disk and Directory Space
description: Quick reference for checking storage space in Linux using df and du commands.
tags: [linux, command-line, system-admin]
---

# Essential Linux Storage Commands

Quick reference for checking storage space in Linux systems.

## df Command (Disk Free)

Check mounted filesystem space:
```bash
df -h                  # All filesystems, human readable
df -h /home           # Specific filesystem
df -hT               # Include filesystem types
```

## du Command (Disk Usage)

Check directory sizes:
```bash
du -sh /path          # Single directory size
du -h --max-depth=1   # First-level subdirectory sizes
du -sh *              # All items in current directory
```

Find largest directories:
```bash
du -h | sort -rh | head -5    # Top 5 largest
```

Common flags:

- `-h`: Human readable
- `-s`: Summary only
- `-c`: Show total
- `--apparent-size`: Actual file size

Remember to use `sudo` for system directories.