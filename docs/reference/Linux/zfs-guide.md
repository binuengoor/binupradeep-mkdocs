---
title: ZFS Administration Guide
description: A comprehensive guide to managing ZFS storage pools and filesystems with practical examples and best practices
tags: [zfs, filesystem, storage, raid]
---

# ZFS Guide

ZFS(Zettabyte File System) combines a filesystem with a volume manager, providing advanced features like data integrity verification, automatic repair, snapshots, and native RAID support. This guide covers essential commands and best practices for ZFS administration.

## Core Concepts

**Storage Pools (zpools)**
- Pools are collections of physical storage devices
- Support various RAID configurations
- Manage physical storage allocation
- Provide redundancy and performance features

**Datasets**
- Filesystems within pools
- Support properties like compression and quotas
- Can be nested hierarchically
- Include features like snapshots and clones

## Basic Pool Operations

**Creating Storage Pools**
```bash
# Simple pool with single disk
zpool create tank /dev/sda

# Mirrored pool (RAID-1)
zpool create tank mirror /dev/sda /dev/sdb

# RAID-Z1 pool (Similar to RAID-5)
zpool create tank raidz1 /dev/sda /dev/sdb /dev/sdc

# RAID-Z2 pool (Similar to RAID-6)
zpool create tank raidz2 /dev/sda /dev/sdb /dev/sdc /dev/sdd
```

**Pool Management**
```bash
# Check pool status
zpool status tank

# List all pools
zpool list

# Start pool scrub
zpool scrub tank

# Import/export pools
zpool export tank
zpool import tank

# Destroy pool
zpool destroy tank
```

## Filesystem Management

**Creating and Managing Filesystems**
```bash
# Create new filesystem
zfs create tank/data

# Create nested filesystem
zfs create tank/data/documents

# Set mount point
zfs set mountpoint=/mnt/data tank/data

# Enable compression
zfs set compression=lz4 tank/data

# Set quota
zfs set quota=100G tank/data
```

**Snapshot Management**
```bash
# Create snapshot
zfs snapshot tank/data@backup-2025-01-03

# List snapshots
zfs list -t snapshot

# Rollback to snapshot
zfs rollback tank/data@backup-2025-01-03

# Clone snapshot
zfs clone tank/data@backup-2025-01-03 tank/data_clone
```

## Advanced Features

**Data Transfer and Backup**
```bash
# Send snapshot to file
zfs send tank/data@backup-2025-01-03 > backup.zfs

# Send to remote system
zfs send tank/data@backup-2025-01-03 | ssh remote_host zfs recv backup/data

# Incremental send
zfs send -i tank/data@old tank/data@new
```

**Performance Monitoring**
```bash
# Check IO statistics
zpool iostat -v tank 5

# View compression ratio
zfs get compressratio tank/data

# Check space usage
zfs list -o name,used,available,referenced tank
```

## Best Practices

**Pool Creation**
- Use `ashift=12` for modern drives
- Consider RAID-Z2 for better redundancy
- Leave 10-20% free space for best performance
- Use whole disks instead of partitions

**Data Protection**
- Regular scrubs (weekly/monthly)
- Frequent snapshots
- Off-site backups using send/receive
- Monitor pool health regularly

**Performance Optimization**
- Enable LZ4 compression by default
- Use separate log devices for sync writes
- Consider L2ARC for read-heavy workloads
- Match RAID level to usage patterns

## Prerequisites and Requirements

**Hardware Requirements**
- Minimum 2GB RAM for basic usage
- 8GB+ RAM recommended for deduplication
- ECC RAM recommended for critical data
- Enterprise-grade drives for production

**Software Requirements**
- 64-bit operating system
- Kernel with ZFS support
- Root/administrative access
- ZFS utilities package installed

## Common Issues and Solutions

**Pool Degraded State**
```bash
# Check status
zpool status -x

# Replace failed drive
zpool replace tank /dev/sda /dev/sdc

# Clear errors after resolution
zpool clear tank
```

**Space Management**
```bash
# Find large filesystems
zfs list -o name,used,referenced -s used

# Remove snapshots
zfs destroy tank/data@snapshot

# Set compression
zfs set compression=lz4 tank
```

Remember to regularly monitor pool health, maintain adequate free space, and keep backups of critical data. ZFS is powerful but requires proper planning and maintenance for optimal performance and reliability.