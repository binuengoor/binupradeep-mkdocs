---
title: Rclone Quick Reference
description: The cloud storage Swiss Army knife for transferring files between local and cloud storage providers without downloading
tags: [rclone, cloud-storage, file-transfer, google-drive, backup]
---

# rclone: Cloud Storage Made Simple

rclone is your go-to solution for efficiently copying files between any cloud storage services or local storage. Unlike downloading and re-uploading, rclone transfers happen directly between cloud providers at maximum speed, making it perfect for migrations and backups.

## Getting Started

### Installation

**macOS:**
```bash
brew install rclone
```

**Linux:**
```bash
sudo -v ; curl https://rclone.org/install.sh | sudo bash
```

**Windows:**
Download from [rclone.org/downloads](https://rclone.org/downloads/)

**Verify Installation:**
```bash
rclone version
```

### Understanding Remotes

In rclone, a "remote" is a configured connection to a storage provider (like Google Drive, Dropbox, S3, etc.). Before you can transfer files, you need to set up at least one remote.

Think of it like this:
- `gdrive:` = Your configured Google Drive connection
- `dropbox:` = Your configured Dropbox connection
- Local paths = Just regular file paths like `~/Documents/`

### Configure Your First Remote

**Start the configuration wizard:**
```bash
rclone config
```

**Interactive Setup:**
```
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config

Choose: n
```

**Example: Setting up Google Drive:**
```bash
# Step 1: Give it a name (e.g., "gdrive" or "personal")
name> gdrive

# Step 2: Choose storage type
Storage> drive  # or type number for Google Drive

# Step 3: Leave client_id and client_secret blank (press Enter)
client_id>
client_secret>

# Step 4: Choose full access
scope> 1

# Step 5: Skip advanced config
Edit advanced config? n

# Step 6: Auto config (opens browser for authentication)
Use auto config? y
# Browser opens, log in to Google, grant permissions

# Step 7: Not a Shared Drive
Configure this as a team drive? n

# Step 8: Confirm
Yes this is OK> y
```

**Quick Setup for Common Services:**

Google Drive:
```bash
rclone config create gdrive drive
# Opens browser for authentication
```

Dropbox:
```bash
rclone config create dropbox dropbox
# Opens browser for authentication
```

Amazon S3:
```bash
rclone config create s3 s3 \
  provider AWS \
  access_key_id YOUR_ACCESS_KEY \
  secret_access_key YOUR_SECRET_KEY
```

### Verify Your Remote

**List all configured remotes:**
```bash
rclone listremotes
```

**Test the connection:**
```bash
# List files in root of remote
rclone ls gdrive:/

# Check remote details
rclone about gdrive:
```

**List directories:**
```bash
rclone lsd gdrive:/
```

## Our Recommended Command

```bash
rclone copy source:path destination:path -P --stats=5s
```

## Understanding Each Flag

**The Essential Combination: -P --stats=5s**

- `-P` (Progress): Shows transfer progress and file count
  - Displays current file being transferred
  - Shows percentage of files completed
  - Allows resuming if interrupted (for compatible remotes)
- `--stats=5s` (Statistics): Updates transfer statistics every 5 seconds
  - Shows bytes transferred / total bytes with percentage
  - Displays current speed
  - Estimates time remaining (ETA)
- `-v` (Verbose): Optional - shows file-by-file transfer details
- `--log-file` (Logging): Write progress to a file for monitoring

## Essential Commands

**List Files and Directories:**
```bash
# List all files with sizes
rclone ls gdrive:/

# List only directories
rclone lsd gdrive:/

# List with details (like ls -l)
rclone lsl gdrive:/

# Tree view
rclone tree gdrive:/folder
```

**Check Space and Usage:**
```bash
# Show storage quota and usage
rclone about gdrive:

# Get size of a folder
rclone size gdrive:/folder
```

**Basic File Operations:**
```bash
# Copy files (source stays intact)
rclone copy source:path dest:path -P

# Move files (removes from source)
rclone move source:path dest:path -P

# Sync (make dest identical to source)
rclone sync source:path dest:path -P

# Delete files
rclone delete gdrive:/folder/file.txt

# Remove empty directories
rclone rmdirs gdrive:/folder
```

## Real-World Examples

**Google Drive to Enterprise Account:**
```bash
# Simple copy with progress
rclone copy personal:/ enterprise:/migrated-files -P --stats=5s

# With logging for background monitoring
rclone copy personal:/ enterprise:/migrated-files \
  --log-file=/tmp/migration.log \
  --stats=5s \
  --stats-log-level NOTICE \
  -v
```

**Monitor Log File in Real-Time:**
```bash
# In another terminal
tail -f /tmp/migration.log

# Or with auto-refresh every 2 seconds
watch -n 2 'tail -50 /tmp/migration.log'
```

**Background Transfer:**
```bash
# Start transfer and disconnect from terminal
nohup rclone copy personal:/ enterprise:/migrated-files \
  --log-file=/tmp/migration.log \
  --stats=5s \
  --stats-log-level NOTICE \
  -v > /dev/null 2>&1 &

# Check progress later
tail -f /tmp/migration.log
```

**Cloud to Cloud (S3, Dropbox, OneDrive, etc.):**
```bash
# Copy from Google Drive to AWS S3
rclone copy gdrive:/folder s3:/bucket-name -P --stats=5s

# Copy from Dropbox to AWS S3 (server-side, no local download)
rclone copy dropbox:/backup s3:/archive -P --stats=5s
```

**Smart Backups with Filters:**
```bash
# Copy excluding certain file types
rclone copy ~/source gdrive:/backup \
  --exclude '*.tmp' \
  --exclude 'node_modules/' \
  --exclude '.git/' \
  -P --stats=5s

# Copy only certain file types
rclone copy ~/source gdrive:/backup \
  --include '*.pdf' \
  --include '*.docx' \
  -P --stats=5s
```

**Sync (Mirror) vs Copy:**
```bash
# Copy - adds new/updated files (doesn't delete)
rclone copy source:/ dest:/ -P

# Sync - makes destination identical to source (deletes extra files!)
rclone sync source:/ dest:/ -P --delete

# IMPORTANT: Always use --dry-run before sync!
rclone sync source:/ dest:/ -P --delete --dry-run
```

## Pro Tips

**Always Use Dry-Run First:**
```bash
# Test what will happen without making changes
rclone copy source:/ dest:/ --dry-run -vv

# Same for sync operations
rclone sync source:/ dest:/ --dry-run --delete -vv
```

**Running on a Remote Server or VM:**
```bash
# Start in background with nohup (stays running after disconnection)
nohup rclone copy source:/ dest:/ --stats=5s --log-file=/tmp/rclone.log -v &

# Check status from another SSH session
tail -f /tmp/rclone.log

# Stop the process
pkill -f "rclone copy"
```

**Understanding Output:**
```
Transferred: 1.2G / 5.6G (21%), 245 / 1200 files, ETA 15m 32s
```
- `1.2G / 5.6G (21%)` = Data transferred vs total (percentage)
- `245 / 1200 files` = Files transferred vs total
- `ETA 15m 32s` = Estimated time remaining

**Checking Progress Without Verbose Output:**
```bash
# Clean, simple progress display
rclone copy source:/ dest:/ -P --stats=10s

# Very verbose - see every file
rclone copy source:/ dest:/ -P -vv --stats=5s
```

**Exclude Patterns:**
```bash
# Exclude multiple patterns
rclone copy source:/ dest:/ \
  --exclude '*.tmp' \
  --exclude '.cache/**' \
  --exclude '__pycache__/**' \
  -P --stats=5s
```

## Creative Use Cases

**Automated Photo Organization:**
```bash
# Sort photos by date into year/month folders
rclone copy ~/Photos gdrive:/organized-photos \
  --drive-upload-cutoff 128M \
  --transfers 8 \
  -P --stats=5s
```

**Multi-Cloud Redundancy:**
```bash
#!/bin/bash
# Backup to multiple cloud providers simultaneously
rclone copy ~/important-docs gdrive:/backup -P --stats=5s &
rclone copy ~/important-docs dropbox:/backup -P --stats=5s &
rclone copy ~/important-docs onedrive:/backup -P --stats=5s &
wait
echo "All backups completed!"
```

**Encrypt Before Upload:**
```bash
# Use rclone's built-in encryption
rclone copy ~/sensitive-files encrypted-remote:/secure-backup \
  -P --stats=5s
# Configure encrypted remote with: rclone config
```

**Media Server Cloud Storage:**
```bash
# Mount cloud storage as local directory
rclone mount gdrive:/media ~/cloud-media \
  --vfs-cache-mode writes \
  --daemon

# Access files at ~/cloud-media without downloading everything
```

**Scheduled Incremental Backups:**
```bash
#!/bin/bash
# Daily backup script (add to cron)
DATE=$(date +%Y-%m-%d)
rclone copy ~/Documents gdrive:/backups/$DATE/ \
  --max-age 24h \
  --log-file=/var/log/rclone-backup.log \
  -P --stats=5s
```

**Archive Old Files to Cheap Storage:**
```bash
# Move files older than 1 year to Glacier
rclone move gdrive:/active-files s3-glacier:/archive \
  --min-age 365d \
  -P --stats=5s --dry-run  # Remove --dry-run when ready
```

## Stopping Background Transfers

**Kill by process name:**
```bash
# Gracefully stop the transfer
pkill -TERM -f "rclone copy"

# Immediate stop
pkill -f "rclone copy"
```

**Kill by process ID:**
```bash
# Find the process
ps aux | grep "rclone copy"

# Kill it (replace 12345 with actual PID)
kill 12345
```

**If using jobs command:**
```bash
# List background jobs
jobs

# Kill job 1
kill %1
```

## Managing Remotes

**List existing remotes:**
```bash
rclone listremotes
```

**Edit a remote:**
```bash
rclone config update gdrive  # Update specific settings
# Or use interactive mode
rclone config
# Then choose: e) Edit existing remote
```

**Delete a remote:**
```bash
rclone config delete old-remote
```

**Show config file location:**
```bash
rclone config file
# Usually at: ~/.config/rclone/rclone.conf
```

**Password protect your config:**
```bash
rclone config
# Choose: s) Set configuration password
```

**Copy remote configuration to another machine:**
```bash
# On first machine
cat ~/.config/rclone/rclone.conf

# On second machine, create same file with contents
# Or copy the file directly
```

## Troubleshooting Tips

- **Test First:** Always use `--dry-run` before important transfers
- **Check Permissions:** Ensure you have access to both source and destination
- **Monitor Progress:** Use `--stats=5s` to track transfer in real-time
- **Handle Large Files:** Rclone automatically chunks large uploads
- **Network Issues:** Rclone handles transient failures gracefully
- **Rate Limits:** Google Drive has 750GB/day per account limit
- **Config Issues:** Run `rclone config reconnect gdrive:` to refresh authentication

**If Transfer Fails:**
```bash
# For compatible cloud services, re-run the same command
# It will skip already-transferred files and continue
rclone copy source:/ dest:/ -P --stats=5s

# Note: Resume depends on the remote type (works best with Google Drive)
```

**Verbose Debugging:**
```bash
# Maximum detail - use multiple -v flags
rclone copy source:/ dest:/ --dry-run -vvv --log-file=/tmp/debug.log
```

## Key Differences from rsync

| Feature | rsync | rclone |
|---------|-------|--------|
| Local Files | ✓ | ✓ |
| Cloud Storage | ✗ | ✓ (70+ providers) |
| Bandwidth Efficient | ✓ (delta sync) | Limited (copies whole files) |
| Resume Capability | ✓ | Depends on remote type |
| Server-Side Transfer | ✗ | ✓ (cloud to cloud) |
| Compression | ✓ | Limited |
| Encryption | ✗ | ✓ (built-in) |

## Common Issues and Solutions

**"Failed to create file system" Error:**
```bash
# Check if remote exists
rclone listremotes

# Test connection
rclone lsd remote-name:

# Reconfigure if needed
rclone config reconnect remote-name:
```

**Token Expired:**
```bash
# Refresh the authentication
rclone config reconnect gdrive:
# Browser opens for re-authentication
```

**Slow Transfers:**
```bash
# Increase parallel transfers
rclone copy source:/ dest:/ \
  --transfers=16 \
  --checkers=32 \
  -P --stats=5s

# Use compression for slow connections
rclone copy source:/ dest:/ --compress -P
```

**Can't Find Config File:**
```bash
# Show config location
rclone config file

# Create new config if missing
rclone config
```

## Supported Cloud Providers

rclone supports 70+ storage providers including:

- **Cloud Storage:** Google Drive, Dropbox, OneDrive, Box, pCloud
- **Object Storage:** Amazon S3, Google Cloud Storage, Azure Blob, Backblaze B2
- **File Hosting:** Mega, Yandex Disk, Mail.ru Cloud
- **Servers:** SFTP, FTP, WebDAV, HTTP
- **Local:** Local filesystem, SMB/CIFS

Full list: [rclone.org/overview](https://rclone.org/overview/)

## Quick Reference Card

| Command | Purpose |
|---------|---------|
| `rclone config` | Set up remotes |
| `rclone listremotes` | Show configured remotes |
| `rclone ls remote:` | List files |
| `rclone lsd remote:` | List directories |
| `rclone copy src: dst:` | Copy files |
| `rclone sync src: dst:` | Mirror (deletes extras) |
| `rclone move src: dst:` | Move files |
| `rclone delete remote:path` | Delete files |
| `rclone about remote:` | Show storage info |
| `rclone mount remote: /path` | Mount as filesystem |

## Prerequisites

- rclone installed: `brew install rclone` or visit [rclone.org/install](https://rclone.org/install/)
- At least one remote configured: `rclone config`
- Cloud storage account(s) with valid credentials
- Network access to cloud provider
- Sufficient quota/storage space
- Appropriate permissions on both source and destination
