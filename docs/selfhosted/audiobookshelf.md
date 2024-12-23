---
title: Audiobookshelf - Self-Hosted Audiobook Server
description: Host and stream your audiobooks and podcasts with a sleek, feature-rich media server using Docker.
tags: [docker, media-server, audiobooks, self-hosted]
---

# Audiobookshelf: Your Personal Audiobook and Podcast Server

Audiobookshelf is a self-hosted audiobook and podcast server that provides a powerful way to organize and stream your audio content. With its modern interface and robust features, it's the perfect solution for managing your personal audio library.

## Key Features

**Library Management**: Organize audiobooks and podcasts with automatic metadata fetching and smart organization.

**Progress Tracking**: Keep track of listening progress across multiple devices.

**Multi-User Support**: Create accounts for family members with personalized progress tracking.

**Mobile-Friendly**: Access your library from any device with a responsive web interface.

## Docker Compose Installation

Deploy Audiobookshelf using this Docker Compose configuration:

```yaml
services:
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    ports:
      - 13378:80
    volumes:
      - ./config:/config
      - ./metadata:/metadata
      - ./audiobooks:/audiobooks
      - ./podcasts:/podcasts
    environment:
      - TZ=America/New_York
    restart: unless-stopped
```

Save this as `docker-compose.yml` and run:

```bash
docker compose up -d
```

## Directory Structure

Before starting the container, create these directories:
- `config`: Stores server configuration
- `metadata`: Stores metadata for your media
- `audiobooks`: Mount your audiobook collection here
- `podcasts`: Mount your podcast collection here

## Getting Started

After deployment, access the interface at `http://<your-server-ip>:13378`. Create your admin account on first launch and start adding your audio content to the appropriate directories.

Audiobookshelf will automatically scan your media folders and fetch metadata for your content, creating a beautiful and organized library for your listening pleasure.