---
title: Homepage Dashboard
description: A self-hosted dashboard service for organizing and accessing your web services
tags: [docker, dashboard, homelab, services]
---

# Homepage - Modern Self-Hosted Dashboard Service

Homepage is a modern dashboard solution that allows you to create a centralized access point for all your web services and applications. It features a clean interface with customizable layouts, widgets, and service integrations.

## Key Features

**Service Organization**
- Customizable layouts with multiple columns and sections
- Service grouping with icons and descriptions
- Quick launch functionality with search capabilities
- Widget support for various services like Docker, Radarr, Sonarr

**Dashboard Customization**
- Light and dark theme options
- Configurable card blur and header styles
- Custom icons and descriptions for services
- Resource monitoring widgets

## Installation

```yaml
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - 3000:3000
    volumes:
      - /path/to/config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      PUID: 1000
      PGID: 1000
    restart: unless-stopped
```

## Configuration Structure

Homepage uses YAML files for configuration:

**settings.yaml**
```yaml
title: Homepage
theme: dark
color: gray
cardBlur: md
headerStyle: boxed
target: _blank
showStats: true
```

**services.yaml**
```yaml
- Administration:
    - Service Name:
        href: https://service.url
        description: Service Description
        icon: service-icon.png
        widget:
          type: widget-type
          url: widget-url
```

## Additional Features

- **Widgets**: Support for various service integrations including:
  - Calendar
  - Weather
  - System resources
  - Docker containers
  - Media management tools

- **Search**: Built-in search functionality with provider options
  - Quick launch capability
  - Description search
  - Custom search providers

- **Layout**: Flexible layout system with:
  - Column configurations
  - Row styling
  - Header customization
  - Group organization

For more detailed information and configuration options, visit: https://gethomepage.dev