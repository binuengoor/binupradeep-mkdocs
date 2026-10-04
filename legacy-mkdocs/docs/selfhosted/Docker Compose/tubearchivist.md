---
title: TubeArchivist
description: Archive and manage your YouTube content with a powerful self-hosted solution using Docker.
tags: [docker, media-server, youtube, self-hosted]
---

# TubeArchivist: Your Personal YouTube Archive Manager

TubeArchivist is a powerful self-hosted solution for archiving and managing YouTube content. It provides a sleek interface to download, organize, and search through your YouTube video collection with advanced metadata management.

## Key Features

**Smart Organization**: Automatically organizes videos by channel, playlist, and custom collections.

**Metadata Management**: Stores and indexes video metadata for advanced searching.

**Download Automation**: Schedule downloads and manage your video archive efficiently.

**Full-Text Search**: Powerful search capabilities through video titles, descriptions, and comments.

## Docker Compose Installation

Deploy TubeArchivist using this Docker Compose configuration:

```yaml
services:
  tubearchivist:
    container_name: tubearchivist
    restart: unless-stopped
    image: bbilly1/tubearchivist
    ports:
      - 8000:8000
    volumes:
      - ./youtube:/youtube
      - ./cache:/cache
    environment:
      - ES_URL=http://archivist-es:9200
      - REDIS_HOST=archivist-redis
      - HOST_UID=1000
      - HOST_GID=1000
      - TA_HOST=your-domain-or-ip:8000
      - TA_USERNAME=tubearchivist
      - TA_PASSWORD=your-password
      - ELASTIC_PASSWORD=your-elastic-password
      - TZ=America/New_York
    depends_on:
      - archivist-es
      - archivist-redis

  archivist-redis:
    image: redis/redis-stack-server
    container_name: archivist-redis
    restart: unless-stopped
    volumes:
      - ./redis:/data
    depends_on:
      - archivist-es

  archivist-es:
    image: bbilly1/tubearchivist-es
    container_name: archivist-es
    restart: unless-stopped
    environment:
      - ELASTIC_PASSWORD=your-elastic-password
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
      - xpack.security.enabled=true
      - discovery.type=single-node
    volumes:
      - ./es:/usr/share/elasticsearch/data
```

## Directory Structure

Before starting, create these directories:

- `youtube`: Stores downloaded videos and media
- `cache`: For application cache data
- `redis`: Redis database storage
- `es`: Elasticsearch data storage

## Getting Started

1. Save the configuration as `docker-compose.yml`
2. Update the environment variables with your desired passwords and domain
3. Create required directories
4. Run `docker compose up -d`
5. Access the interface at `http://<your-server-ip>:8000`

After installation, log in with your configured credentials and start adding YouTube channels or videos to archive.