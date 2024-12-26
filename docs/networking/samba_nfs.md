---
title: Samba and NFS File Sharing Setup Guide
description: Complete guide to configure Samba and NFS file sharing with cross-platform support and security best practices
tags: [linux, samba, nfs, file-sharing, networking]
---

# Comprehensive Guide to Samba and NFS File Sharing

Samba enables seamless file sharing between Linux, Windows, and macOS systems, while NFS provides efficient native file sharing for Unix-based systems. This guide covers both services with security best practices and optimal configurations.

## Samba Configuration

**Base Configuration File**
```bash
sudo nano /etc/samba/smb.conf

[global]
# Basic server settings
workgroup = WORKGROUP
server role = standalone server
log file = /var/log/samba/log.%m
max log size = 1000
logging = file

# Security settings
map to guest = never
unix password sync = yes
passwd program = /usr/bin/passwd %u
pam password change = yes
obey pam restrictions = yes

# Network configuration
interfaces = 127.0.0.1 eth0
bind interfaces only = yes
client min protocol = SMB2
server max protocol = SMB3

# Performance optimizations
aio read size = 16384
aio write size = 16384

# macOS compatibility
vfs objects = catia fruit streams_xattr
fruit:metadata = stream
fruit:encoding = native
fruit:locking = none
fruit:resource = file
fruit:posix_rename = yes
fruit:zero_file_id = yes
hide files = /.DS_Store/

# Example share configuration
[share_name]
path = /path/to/share
writable = yes
browseable = yes
force create mode = 0660
force directory mode = 0770
valid users = @group
inherit permissions = yes
```

## Share Mount Configuration

**Secure Credentials Setup**
```bash
# Create credentials file
sudo nano /root/.smbcredentials

username=your_username
password=your_password

# Secure the file
sudo chmod 600 /root/.smbcredentials
```

**Mount Entry (`/etc/fstab`)**
```bash
# Format: //server/share /mount/point cifs options
//server/share /mnt/share cifs credentials=/root/.smbcredentials,uid=1000,gid=1000,iocharset=utf8,vers=3.0 0 0
```

## NFS Configuration

**Server Setup**
```bash
# Edit exports file
sudo nano /etc/exports

# Secure share configuration with specific subnet
/shared/directory 192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)
```

**Client Mount Configuration**
```bash
# Create mount point
sudo mkdir -p /mnt/nfs_share

# Add to /etc/fstab
server:/shared/directory /mnt/nfs_share nfs defaults,_netdev,noatime,rsize=8192,wsize=8192 0 0
```

## Service Management

**Samba Commands**
```bash
# Verify configuration
testparm

# Manage services
sudo systemctl restart smbd nmbd
sudo systemctl status smbd

# Test mount points
sudo mount -a
```

**NFS Commands**
```bash
# Export shares
sudo exportfs -a

# Verify exports
sudo exportfs -v

# Restart NFS server
sudo systemctl restart nfs-kernel-server
```

## Security Best Practices

- Use SMB3 protocol for enhanced security
- Implement user-based access control
- Restrict share access to specific networks
- Regular security audits
- Keep services updated
- Use strong passwords
- Implement proper file permissions

## Prerequisites

- Root or sudo access
- Required packages:
  ```bash
  # For Samba
  sudo apt install samba samba-common-bin
  
  # For NFS
  sudo apt install nfs-kernel-server nfs-common
  ```
- Proper network configuration
- Firewall rules for ports:
  - Samba: 445/tcp
  - NFS: 2049/tcp

## Troubleshooting Tips

- Check service status with `systemctl status`
- View logs: `/var/log/samba/` for Samba, `/var/log/syslog` for NFS
- Test network connectivity with `ping` and `telnet`
- Verify permissions on shared directories
- Use `smbclient -L //server` to list Samba shares