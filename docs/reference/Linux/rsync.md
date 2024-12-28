---
title: rsync Command Reference
description: A powerful utility for efficient file synchronization and transfer between local and remote systems
tags: [rsync, linux, file-transfer, synchronization]
---

# rsync: The Smart File Transfer Tool

rsync is your go-to solution for efficiently copying files and directories. Unlike regular copy commands, rsync only transfers the parts of files that have changed, making it incredibly fast for subsequent transfers.

## Our Recommended Command

```bash
rsync -ahrvP source/ destination/
```

## Understanding Each Flag

**The Perfect Combination: -ahrvP**

- `-a` (Archive): Preserves everything important
  - File permissions
  - Ownership
  - Timestamps
  - Symbolic links
  - Special and device files
- `-h` (Human-readable): Shows sizes in KB, MB, GB
- `-r` (Recursive): Copies directories and their contents
- `-v` (Verbose): Shows what's happening
- `-P` (Progress): Shows transfer progress and enables resume

## Real-World Examples

**Local Backups:**
```bash
# Backup Documents folder
rsync -ahrvP ~/Documents/ /media/backup/Documents/

# Backup multiple directories
rsync -ahrvP ~/Documents/ ~/Pictures/ ~/Videos/ /media/backup/
```

**Remote Transfers:**
```bash
# Copy to remote server
rsync -ahrvP ~/local/files/ user@server:/remote/path/

# Copy from remote server
rsync -ahrvP user@server:/remote/files/ ~/local/path/

# Using custom SSH port
rsync -ahrvP -e "ssh -p 2222" ~/files/ user@server:/remote/path/
```

**Smart Backups:**
```bash
# Sync and delete extra files in destination
rsync -ahrvP --delete ~/source/ /backup/

# Exclude certain files
rsync -ahrvP --exclude '*.tmp' --exclude 'cache/' ~/source/ /backup/
```

## Pro Tips

**Trailing Slashes Matter:**
```bash
# With trailing slash - copies contents of 'source'
rsync -ahrvP ~/source/ /destination/

# Without trailing slash - copies 'source' directory itself
rsync -ahrvP ~/source /destination/
```

**Dry Run First:**
```bash
# Test what will happen without making changes
rsync -ahrvP --dry-run source/ destination/
```

**Resume Interrupted Transfer:**
```bash
# -P flag allows resuming if connection drops
rsync -ahrvP user@server:/large/file ~/local/
# If interrupted, run the same command to resume
```

## Common Use Cases

**Maintaining a Mirror:**
```bash
rsync -ahrvP --delete source/ destination/
```

**Daily Backup Script:**
```bash
#!/bin/bash
rsync -ahrvP \
  --exclude '*.tmp' \
  --exclude 'node_modules/' \
  ~/important-files/ \
  /backup/$(date +%Y-%m-%d)/
```

**Remote Backup with Compression:**
```bash
rsync -ahrvPz ~/large-files/ user@server:/backup/
# -z adds compression for slow connections
```

## Troubleshooting Tips

- Use `--dry-run` before important transfers
- Add extra `v` flags (`-vv` or `-vvv`) for more verbose output
- Check permissions if transfers fail
- Use `--stats` for detailed transfer statistics
- Add `--progress` for individual file progress

**Prerequisites:**
- rsync installed on both source and destination systems
- SSH access for remote transfers
- Sufficient disk space
- Appropriate read/write permissions