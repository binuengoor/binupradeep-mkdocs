---
title: Caddy
description: A modern web server with automatic HTTPS and reverse proxy capabilities using wildcard certificates
tags: [caddy, reverse-proxy]
---

# Caddy as a Reverse Proxy with Wildcard Certificates

Caddy serves as an elegant reverse proxy solution that can secure multiple internal services using a single wildcard certificate. This setup simplifies SSL management while providing secure access to your local network services.

## Key Features

- Single wildcard certificate for all subdomains
- Automatic HTTPS certificate management via Cloudflare DNS
- Real-time configuration updates
- Built-in error handling
- Admin API for monitoring integration

## Installation/Setup

```yaml
services:
  caddy:
    image: iarekylew00t/caddy-cloudflare:latest
    restart: unless-stopped
    environment:
      - CF_API_TOKEN=<YOUR_CLOUDFLARE_TOKEN>
      - CADDY_ADMIN=0.0.0.0:2019
    cap_drop:
      - ALL
    cap_add:
      - NET_ADMIN
      - NET_BIND_SERVICE
    ports:
      - 80:80
      - 443:443
      - 443:443/udp
      - 2019:2019
    command: caddy run --config /etc/caddy/Caddyfile --watch
    volumes:
      - ./caddy/Caddyfile:/etc/caddy/Caddyfile
      - ./caddy/site:/srv
      - ./caddy/data:/data
      - ./caddy/config:/config
```

## Common Usage/Examples

**Complete Caddyfile Configuration:**

```caddyfile
{
    email your-email@domain.com
}

*.local.domain.com, local.domain.com {
    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }

    @service1 host service1.local.domain.com
    handle @service1 {
        reverse_proxy http://10.0.0.10:8080
    }

    @service2 host service2.local.domain.com
    handle @service2 {
        reverse_proxy https://10.0.0.11:8443 {
            transport http {
                tls_insecure_skip_verify
            }
        }
    }

    handle_path /* { # this is so that caddy knows to return a 404 for undefined subdomains
        error "Not found" 404
        respond "404 - Page not found" 404
    }

    handle_errors {
        respond "Error {http.error.status_code}: {http.error.message}" {http.error.status_code}
    }
}
```

## Additional Options/Tips

- **Wildcard Certificate Setup**: The configuration `*.local.domain.com` requests a single wildcard certificate that covers all subdomains. This means services like `service1.local.domain.com` and `service2.local.domain.com` use the same certificate, reducing management overhead.

- **Error Handling**: The configuration includes two important error handling blocks:
  - `handle` block with a 404 response catches undefined subdomains
  - `handle_errors` block provides custom error responses for all error conditions

- **Admin API**: Port 2019 exposes Caddy's admin API, enabling integration with monitoring tools and dashboards

- **Service Integration**:
  - HTTP services can be proxied directly
  - HTTPS services with self-signed certificates use `tls_insecure_skip_verify`
  - Each service gets its own subdomain while sharing the main wildcard certificate

**Prerequisites:**
- Cloudflare account managing your domain
- Docker and Docker Compose installed
- Cloudflare API token with DNS permissions
- Domain configured in Cloudflare