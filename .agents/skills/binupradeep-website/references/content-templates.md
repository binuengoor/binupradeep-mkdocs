# Content Templates

Use these standardized templates when creating new pages across the website.

---

## 1. Self-Hosted Docker Compose Template

**File Path**: `docs/selfhosted/Docker Compose/<service-name>.md`

```markdown
---
title: <Service Name>
description: <1-sentence description of the service and its purpose>
tags: [docker, self-hosted, <topic-tags>]
---

# <Service Name>: <Short Catchy Subtitle>

<1-2 paragraph introduction explaining what the tool is, why it's useful, and who it is for.>

## Key Features

**Feature 1**: Description of feature 1.

**Feature 2**: Description of feature 2.

**Feature 3**: Description of feature 3.

## Docker Compose Installation

Deploy <Service Name> using this Docker Compose configuration:

```yaml
services:
  <service-name>:
    image: <image>:<tag>
    container_name: <service-name>
    ports:
      - <host-port>:<container-port>
    volumes:
      - ./config:/config
      - ./data:/data
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
- `config`: Stores configuration and application state
- `data`: Stores data files

## Getting Started

After deployment, access the interface at `http://<your-server-ip>:<host-port>`. Follow the setup wizard to create an admin account and configure initial settings.
```

---

## 2. MyApps Documentation Template

**File Path**: `docs/myapps/<app-slug>.md`

```markdown
---
title: <App Name>
description: <Short description of the application>
tags: [<tag1>, <tag2>, <tag3>]
---

# <App Name>: <Subtitle>

**<App Name>** is <summary of what the application does>.

**GitHub Repository**: [<App Name>](https://github.com/binuengoor/<repo-name>)  
**Docker Image**: [ghcr.io/binuengoor/<image-name>](https://ghcr.io/binuengoor/<image-name>)

## Key Features

- **Feature A**: Description
- **Feature B**: Description
- **Feature C**: Description

## Installation Options

### Option 1: Docker (Recommended)
```bash
docker run -d \
  -p <port>:<port> \
  -v ./data:/app/data \
  --name <app-name> \
  ghcr.io/binuengoor/<image-name>:latest
```

### Option 2: Docker Compose
```yaml
services:
  <app-name>:
    image: ghcr.io/binuengoor/<image-name>:latest
    container_name: <app-name>
    ports:
      - "<port>:<port>"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

### Option 3: Local Development
```bash
git clone https://github.com/binuengoor/<repo-name>.git
cd <repo-name>
pip install -r requirements.txt # or npm install
python3 script.py # or npm start
```

## Using the Application

1. Open `http://localhost:<port>` in your browser.
2. ...

## Technical Details

- **Backend**: Python / Node.js / etc.
- **Frontend**: Vanilla JS / HTML5 / CSS3
- **Container**: Multi-arch support (`linux/amd64`, `linux/arm64`)

## Troubleshooting

- **Issue 1**: Solution description
- **Issue 2**: Solution description
```

---

## 3. Tech Reference Guide Template

**File Path**: `docs/reference/<Category>/<topic>.md`

```markdown
---
title: <Topic Name> Reference Guide
description: <Comprehensive guide/cheat sheet to topic>
tags: [<category>, <topic>, reference]
---

# <Topic Name> Guide

<Brief overview of technology/tool and its core purpose.>

## Core Concepts

**Concept A**
Explanation of Concept A.

**Concept B**
Explanation of Concept B.

## Basic Commands

```bash
# Command 1 description
command --flag argument

# Command 2 description
command sub-action target
```

## Advanced Operations

```bash
# Complex workflow example
command --advanced-option | pipe_target
```

## Best Practices

- Practice 1: Explanation
- Practice 2: Explanation

## Troubleshooting & Tips

- Tip 1: Details
- Tip 2: Details
```

---

## 4. Home Networking Template

**File Path**: `docs/networking/<topic>.md`

```markdown
---
title: <Network Setup Title>
description: <Step-by-step guide for network topic>
tags: [networking, <specific-tech>, security]
---

# <Network Setup Title>

<Scenario setup, architecture context, IP schema, and prerequisites.>

## Configuration Steps

### Step 1: <Action Name>
<Instructions>
![Screenshot 1](../assets/images/<folder>/<img1>.webp)

### Step 2: <Action Name>
<Instructions>
![Screenshot 2](../assets/images/<folder>/<img2>.webp)

## Verification

<How to test connectivity, access rules, and DNS resolution.>

## Failsafe & Recovery

<Important safety tips to avoid lockouts during configuration changes.>
```

---

## 5. Blog Post Template

**File Path**: `docs/blog/posts/YYYY-MM-DD-<slug>.md`

```markdown
---
draft: false
date: YYYY-MM-DD
categories: [northstar] # or shortstory, travel
tags: [tag1, tag2, tag3]
slug: <url-slug>
title: <Post Title>
description: <1-sentence post summary>
---

![Header](images/YYYY/<slug>/header.webp){ loading=lazy width="800" }

<Engaging opening paragraph or quote that hooks the reader.>
<!-- more -->

## <Section 1 Heading>

<Content written in crisp, thoughtful prose.>

## <Section 2 Heading>

<Content.>

> "<Impactful closing quote>" — Author

<Concluding takeaway.>
```
