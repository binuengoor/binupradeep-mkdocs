---
title: Dozzle Logs
description: A lightweight, real-time web interface for viewing Docker container logs with optional distributed agent support
tags: [docker, logs, monitoring, containers]
---

# Dozzle: Real-time Docker Log Viewer with Remote Agents

Dozzle is a lightweight, web-based application for monitoring Docker container logs in real-time. The core Dozzle server provides local container log monitoring, while optional agents enable monitoring of remote Docker hosts from a single interface.

## Architecture Options

**Standalone Server**
- Single Dozzle instance monitoring local containers
- Perfect for single-host deployments
- Minimal setup required
- Direct access to Docker socket

**Distributed Setup with Agents**
- Optional agents for monitoring remote Docker hosts
- Useful for multi-host environments
- Centralized log viewing across multiple servers
- Reduced network overhead through local log processing

## Installation

### Basic Standalone Setup
```yaml
services:
  dozzle:
    image: amir20/dozzle:latest
    container_name: dozzle
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

### Optional Agent Setup
Deploy on remote hosts you want to monitor:
```yaml
services:
  dozzle-agent:
    image: amir20/dozzle:latest
    command: agent
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 7007:7007
```

## Common Usage Examples

### Connecting Optional Agents

Configure the main Dozzle server to connect to remote agents:

```yaml
services:
  dozzle:
    environment:
      DOZZLE_REMOTE: "http://agent1:7007,http://agent2:7007"
```

### Secure Agent Configuration

For production environments:

```yaml
services:
  dozzle-agent:
    environment:
      DOZZLE_AUTH_TOKEN: "your-secure-token"
  
  dozzle:
    environment:
      DOZZLE_REMOTE: "http://agent1:7007?token=your-secure-token"
```

## Additional Options

- **Deployment Flexibility**: 
  - Start with standalone server for simple setups
  - Add agents only when remote monitoring is needed
  - Mix local and remote monitoring as needed
- **Agent Security**:
  - Use read-only Docker socket mount
  - Enable authentication tokens
  - Implement TLS for secure communication
- **Performance**:
  - Agents process logs locally to reduce network load
  - Minimal resource usage on remote hosts
  - Efficient websocket-based communication

The web interface at `http://localhost:8080` will show local containers by default, with remote containers appearing when agents are connected.