---
title: OpenClaw Tips
description: Tips, best practices, and optimization strategies for OpenClaw AI assistant
tags: [openclaw, ai, automation, tips, optimization]
---

# OpenClaw Tips

Best practices and optimization strategies for your OpenClaw setup.

## 🎯 Core Principles

### Audit System Files Regularly
- Review AGENTS.md, SOUL.md, USER.md, TOOLS.md, HEARTBEAT.md periodically
- Remove outdated info
- Convert task-specific workflows into skills
- Can reduce token usage by up to **69%**

### Skills vs Subagents

| Use Case | Best Choice |
|---------|-------------|
| Repeatable workflow (MkDocs, group chat) | **Skill** |
| Isolated task needing own context | **Subagent** |
| Frequently assigned task | Consider **Subagent** |

### Feedback Loops
- Provide detailed feedback after tasks
- Helps agent learn preferences
- Updates skills based on what works
- Continuous improvement over time

## 🔐 Security: Sandboxing Subagents

**Why it matters:**
- Subagents should only access what they need for their job
- Limits attack vectors for prompt injection
- Don't give subagents access to top-level config
- Only CEO agent should access sensitive config

**Best Practice:**
- Subagents: Information isolation
- Subagents: No heartbeat (waste tokens)
- Subagents: Own dedicated SOUL.md and AGENTS.md

## ⚙️ Essential Integrations

### Recommended Tools
- **Groq Whisper**: Free voice transcription
- **SearXNG**: Enhanced search (bypasses Brave API)
- **Google Workspace**: Email, calendar (start read-only)
- **GitHub**: Deploy apps and websites
- **Notion**: CRM, document management

### Memory Plugins
- **Supermemory**: Index memory files
- **QMD**: Token-efficient retrieval

### Security
- **Prompt Guard**: Protect against prompt injection

## 🔐 Gateway Security: Traefik Reverse Proxy

### The Problem
OpenClaw gateway bound to LAN IP (`ws://192.168.x.x:18789`) triggers security block:
> SECURITY ERROR: Gateway URL "ws://192.168.x.x:18789" uses plaintext ws:// to a non-loopback address.

### The Solution
Route through Traefik reverse proxy for `wss://` connections.

### Traefik Configuration
Add to your Traefik dynamic config:

```yaml
http:
  routers:
    openclaw:
      rule: "Host(`openclaw.yourdomain.com`)"
      service: openclaw
      entryPoints:
        - websecure
      middlewares:
        - openclaw-headers
  services:
    openclaw:
      loadBalancer:
        servers:
          - url: "http://GATEWAY_IP:18789"
  middlewares:
    openclaw-headers:
      headers:
        customRequestHeaders:
          X-Forwarded-Proto: "https"
          X-Forwarded-Host: "openclaw.yourdomain.com"
```

### OpenClaw Configuration
```bash
openclaw config set gateway.trustedProxies '["TRAEFIK_IP"]'
openclaw config set gateway.auth.mode token
openclaw gateway stop && openclaw gateway start
```

### The 1008 "Pairing Required" Error
Browser WebSocket limitation — browsers can't pass auth tokens during WS handshake.

**Fix:**
```bash
openclaw config set gateway.controlUi.allowInsecureAuth true
```

### Final Settings
| Setting | Value |
|---------|-------|
| Gateway URL | wss://openclaw.yourdomain.com |
| gateway.bind | lan |
| gateway.trustedProxies | ["TRAEFIK_IP"] |
| gateway.controlUi.allowInsecureAuth | true |

### Key Lessons
1. Never add duplicate `services:` block in Traefik YAML
2. `serversTransport: insecure-transport` is only for HTTPS backends
3. Setting customRequestHeader to `""` preserves the client's header

## ⏰ Proactivity

### Heartbeat
- Monitor ongoing information
- Check emails, calendar, mentions
- Batch multiple checks together

### Cron Jobs
- Scheduled tasks at specific intervals
- Morning briefings
- Daily blog posts
- Content scraping
- Automated reports

## 📁 System Files Explained

| File | Purpose |
|------|---------|
| SOUL.md | Personality and tone |
| USER.md | Information about you |
| AGENTS.md | Rules and guardrails |
| TOOLS.md | Apps and API integrations |
| HEARTBEAT.md | Proactive checks |
| MEMORY.md | Long-term memory |

## 🔄 Optimization Workflow

1. **Weekly Audit**: Review context files for bloat
2. **Convert to Skills**: Task-specific workflows
3. **Feedback Loop**: Tell agent what worked/didn't
4. **Test New Skills**: Verify they work as expected

## Subagents Best Practices

### When to Create a Subagent
- Task needs isolated context
- Frequently assigned (weekly+)
- Needs different model/thinking
- Benefits from parallel work

### Subagent Structure
- Own dedicated SOUL.md
- Own AGENTS.md
- No heartbeat (activated on-demand)
- Limited information access

### Example Use Cases
- YouTube scriptwriter subagent
- Coder subagent
- Social media manager subagent

## Resources

- [OpenClaw Docs](https://docs.openclaw.ai)
- [ClawHub](https://clawhub.com) - Community skills

---

*Last updated: 2026-02-20*
