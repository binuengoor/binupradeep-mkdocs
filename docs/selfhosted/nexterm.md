---
title: Nexterm - Modern Server Management Tool
description: Deploy and manage SSH, VNC, and RDP connections through a sleek web interface using Docker.
tags: [docker, server-management, self-hosted]
---

# Nexterm: Modern Server Management Made Simple

Nexterm is an innovative open-source server management tool that streamlines SSH, VNC, and RDP connections through a sleek web interface. Currently in development and available as a preview release, it offers a modern alternative to traditional connection managers.

## Key Features

**Multi-Protocol Support**: Built-in support for SSH, RDP, and VNC connections, with guacd integrated into the Docker image.

**Enhanced Security**: Includes two-factor authentication and robust session management capabilities.

**User-Friendly Interface**: Organized with folders and tabs for intuitive navigation, featuring real-time search functionality.

## Docker Compose Installation

Deploy Nexterm using this simple Docker Compose configuration:

```yaml
services:
  nexterm:
    image: germannewsmaker/nexterm:1.0.2-OPEN-PREVIEW
    ports:
      - "6989:6989"
    restart: always
    volumes:
      - nexterm:/app/data

volumes:
  nexterm:
```

Save this as `docker-compose.yml` and run:

```bash
docker compose up -d
```

Once deployed, access the interface at `http://<your-server-ip>:6989`.

## Getting Started

After installation, you'll be prompted to create your first user account. From there, you can begin adding your SSH, RDP, or VNC connections through the intuitive web interface.

While Nexterm is currently in preview and not recommended for production environments, it represents an exciting development in server management tools, offering a fresh approach to handling remote connections.