---
title: OpenWrt x86 VM Configuration
description: Guide for building and deploying custom OpenWrt images on Proxmox virtualization platform
tags: [openwrt, proxmox, networking, router]
---

# OpenWrt x86 VM Configuration Guide

Building custom OpenWrt images with specific packages and configurations makes upgrades easier by baking configurations directly into the build process. This guide covers the build process and Proxmox VM deployment steps.

This script is located at [Github: Easy-OpenWRT-Builder](https://github.com/itiligent/Easy-OpenWRT-Builder)

## Build Configuration

**Custom Package Selection**
```bash
CUSTOM_PACKAGES="curl -dnsmasq dnsmasq-full \
luci luci-app-attendedsysupgrade luci-app-bcp38 luci-app-ddns \
luci-app-sqm luci-app-wol nano qemu-ga rsync sqm-scripts"
```

To inspect installed packages within OpenWrt:
```bash
opkg list-installed
```

## Proxmox Network Setup

The system uses multiple network interfaces:
- Default virtual NIC (vmbrwan0)
- Main LAN bridge (vmbrlan0) - VLAN aware
- Additional bridge (vmbrlan1) for troubleshooting

**Host Configuration**
- IPv4: {PROXMOX_IP}
- Subnet: /24
- Gateway: {GATEWAY_IP}

## VM Creation

**Basic Settings**
- Name: OpenWRT
- OS: Linux 5.x
- Memory: 256 MiB
- CPU: Host architecture
- Network: Dual interfaces (WAN and LAN)

**Image Deployment**
```bash
mkdir -p /root/bpbuilds
rsync -avz {OPENWRT_IMAGE}.qcow2 root@{PROXMOX_IP}:/root/bpbuilds/
qm importdisk {VM_ID} /root/bpbuilds/{OPENWRT_IMAGE}.qcow2 {STORAGE_NAME}
```

## Configuration Backup

**Backup Essential Configs**
```bash
rsync -avz root@{ROUTER_IP}:/etc/crontabs/ ./etc/crontabs/
rsync -avz root@{ROUTER_IP}:/etc/config/bcp38 ./etc/config/bcp38
rsync -avz root@{ROUTER_IP}:/etc/config/dhcp ./etc/config/dhcp
rsync -avz root@{ROUTER_IP}:/etc/config/firewall ./etc/config/firewall
rsync -avz root@{ROUTER_IP}:/etc/config/network ./etc/config/network
rsync -avz root@{ROUTER_IP}:/etc/config/sqm ./etc/config/sqm
rsync -avz root@{ROUTER_IP}:/etc/config/system ./etc/config/system
```

**Cleanup**
```bash
sudo rm -R openwrt_build_output/
sudo rm -R openwrt-imagebuilder-*
sudo poweroff
```