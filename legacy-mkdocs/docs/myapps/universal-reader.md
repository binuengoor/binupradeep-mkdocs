---
title: Universal Reader
description: A self-hosted, local-first semantic document reader and continuous audio synthesizer that transforms digital documents, web articles, and scratchpad notes into distraction-free reading views paired with seamless Text-to-Speech narration.
tags: [document-reader, text-to-speech, tts, kindle-style, epub, pdf, markdown, pwa, fastapi, react]
---

# Universal Reader: Distraction-Free Reading & Continuous Audio Narration

**Universal Reader** is a self-hosted, local-first semantic document reader and continuous audio synthesizer. It transforms digital documents, web articles, and scratchpad notes into cleanly formatted, typography-optimized reading views paired with seamless, gapless Text-to-Speech (TTS) narration. Designed for long-form listening, deep reading, and personal knowledge management (PKM), Universal Reader connects to local TTS backends (such as [Universal TTS Gateway](universal-tts.md)) or cloud providers, pairing audio playback with an interactive Kindle-grade reader.

- **GitHub Repository**: [Universal-Reader](https://github.com/binuengoor/universal-reader)
- **Docker Image**: [`ghcr.io/binuengoor/universal-reader:latest`](https://github.com/binuengoor/universal-reader/pkgs/container/universal-reader)

---

## Overview

Reading long-form documentation, technical whitepapers, e-books, and saved web articles often requires switching between disparate read-it-later apps, PDF viewers, and rudimentary screen readers that recite syntax errors, URLs, and table borders.

**Universal Reader** bridges the gap between text reading and podcast-like audio narration. It ingests multi-format documents, breaks them into sentence-aligned semantic blocks, cleans syntax noise through an intelligent conversational pre-processor, and pre-caches audio using a lookahead sliding buffer for zero-latency gapless playback. Readers can comfortably follow along visually with auto-scrolling text, listen in the background via hardware media keys and lock-screen controls, or export complete multi-chapter audiobooks as single MP3 files.

---

## Key Features

### 1. Multiformat Document Intake & Ingestion
- **Native Document Parsing**: Direct file upload and parsing for **PDF** (`pymupdf`), **ePub** (`ebooklib`), **Word** (`.docx`), **Markdown** (`.md`), and plain text (`.txt`).
- **Web Article Ingestion**: Paste any URL to scrape readable article content, extract titles, and convert formatting to markdown powered by `trafilatura`.
- **Quick Scratchpad**: Instant manual entry for pasted meeting notes, ideas, or transcripts with automatic title generation.
- **PWA Web Share Target**: Share articles and links directly from mobile browsers (iOS and Android) into your library with one tap.

### 2. Semantic Chunking & Lookahead Audio Narration
- **Sentence-Boundary Chunking**: Intelligent text segmentation into 250–500 character blocks without splitting phrases or mid-sentence clauses.
- **Lookahead Sliding Buffer**: While block $N$ plays, blocks $N+1$ and $N+2$ are pre-fetched and synthesized in the background, ensuring immediate zero-latency gapless audio transitions.
- **Continuous Playback & Natural Pacing**: Automatically advances across paragraphs with a configurable inter-block pause (0ms–1500ms) to emulate natural human breathing and pauses.
- **Full-Document MP3 Export**: Concatenate all synthesized audio chunks into a single downloadable MP3 file for offline listening in any podcast or media player.

### 3. Conversational Speech Pre-Processor
- **Markdown Syntax Stripping**: Strips raw URLs, citation brackets (`[1]`), image markup, and heading hashes (`#`) so the TTS voice never reads literal formatting syntax.
- **Table-to-Speech Normalization**: Converts markdown grid tables (`| col | col |`) into flowing conversational sentences instead of reciting pipe delimiters.
- **Code Block Formatting**: Converts shell commands and code blocks (` ```bash ... ``` `) into spoken descriptions (e.g., *"Command in bash: docker compose up -d"*) rather than reciting brackets, semicolons, and curly braces.
- **Phonetic Glossary**: Define pronunciation overrides for technical jargon, acronyms, and names.
- **LLM Assistance (Optional)**: Connect an OpenAI-compatible LLM (e.g., Groq `qwen/qwen3.8-27b`) for automated note titling, categorization (up to 50 global tags), and deep conversational rewriting.

### 4. Kindle-Style Reader & Typography
- **Universal Display Control (`Aa`)**: Easily switch reading themes and typography settings:
  - **Warm Sepia**: `#fbf0d9` parchment paper with rich espresso `#433422` typography.
  - **Clean Light**: Crisp modern white paper aesthetic.
  - **OLED Dark**: True deep black background with softened high-contrast text.
- **Typography Controls**: Choose between Bookerly (Serif), Modern Sans, or Technical Mono fonts, with granular font scaling (14px–32px), line height adjustments (1.4x, 1.7x, 2.1x), and column width limits.
- **Interactive Table of Contents**: Automatically detects Markdown headings to build a dynamic navigation drawer with section block counts and active-chapter indicators.
- **Auto-Scroll Follow-Along**: Keeps the actively playing block centered in view. Includes a manual scroll override that pauses auto-scrolling when reading ahead, with a 1-click *"Resume"* floating pill.
- **Saved Reading Progress**: Remembers `last_block_index` per document and restores your scroll position automatically upon opening.
- **In-Document Search**: Instant full-text search (`Cmd+F` / `Ctrl+F`) with match highlights and step-through cycling.

### 5. Persistent Audio Suite
- **Sticky Bottom Player**: Full playback bar with scrub slider, $\pm 10$s jump buttons, speed selector ($0.75\times$ to $2.0\times$), block counters, and sleep timer (15m, 30m, 45m, 60m, or end of document).
- **Floating Mini-Player**: Persists playback across the Document Library and Editor views, allowing uninterrupted listening while managing documents.
- **MediaSession API Integration**: Supports hardware media keys, Bluetooth headset controls, and lock-screen playback controls with real-time scrub state.
- **Voice & Engine Picker**: Filter and select voices across Universal TTS, Edge TTS, Kokoro, Piper, and Google Cloud, with favorite voice pinning.

### 6. Local-First Zero-Database Storage
- Documents and audio chunks are stored directly on the local filesystem under `/data/documents/<doc_id>/` (`meta.json`, `document.md`, `chunks.json`, `audio_cache/`).
- No external relational database (PostgreSQL/MySQL) or Redis instances required.

---

## Architecture Overview

```
                     ┌─────────────────────────────────────────┐
                     │          Universal Reader (:3003)       │
                     │                                         │
                     │   ┌─────────────────────────────────┐   │
                     │   │   Vite React SPA (Tailwind CSS) │   │
                     │   └───────────────▲─────────────────┘   │
                     │                   │ /api/*              │
                     │   ┌───────────────▼─────────────────┐   │
                     │   │      FastAPI Backend Engine     │   │
                     │   └──────┬───────────────┬──────────┘   │
                     └──────────┼───────────────┼──────────────┘
                                │               │
                OpenAI Speech   │               │ Chat Completions
                API Proxy       │               │ (Auto-title, cleanup)
                                ▼               ▼
                      ┌──────────────────┐ ┌──────────────────┐
                      │  Universal TTS   │ │     Groq LLM     │
                      │  (Port 8000)     │ │  (API Endpoint)  │
                      └──────────────────┘ └──────────────────┘
```

- **Backend**: Python 3.11+ / FastAPI, Uvicorn, Pydantic, HTTPX.
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Marked, DOMPurify.
- **Port**: Serves both API endpoints (`/api/*`) and compiled static assets on port `9025` internally (mapped to `3003` on the host).

---

## Installation & Setup

### Option 1: Docker Compose (Recommended)

Universal Reader can run standalone or alongside [Universal TTS Gateway](universal-tts.md):

```yaml
services:
  universal-reader:
    image: ghcr.io/binuengoor/universal-reader:latest
    container_name: universal-reader
    restart: unless-stopped
    ports:
      - "3003:9025"
    volumes:
      - ./data:/data
    environment:
      - TTS_BASE_URL=http://universal-tts:8000/v1
      - TTS_API_KEY=not-needed
      - DEFAULT_MODEL=edge-tts
      - DEFAULT_VOICE=en-US-ChristopherNeural
      # Optional LLM integration for auto-titling and text cleanup
      - LLM_BASE_URL=https://api.groq.com/openai/v1
      - LLM_API_KEY=gsk_your_groq_api_key
      - LLM_MODEL=qwen/qwen3.8-27b
```

Start the container:

```bash
docker compose up -d
```

Access the interface in your browser at `http://<server-ip>:3003`.

### Option 2: Full Stack Compose (Universal Reader + Universal TTS)

```yaml
services:
  universal-tts:
    image: ghcr.io/binuengoor/universal-tts:latest
    container_name: universal-tts
    restart: unless-stopped
    ports:
      - "8000:8000"
    volumes:
      - ./tts-config.yaml:/app/config.yaml:ro
      - ./tts-models:/app/models

  universal-reader:
    image: ghcr.io/binuengoor/universal-reader:latest
    container_name: universal-reader
    restart: unless-stopped
    ports:
      - "3003:9025"
    volumes:
      - ./reader-data:/data
    environment:
      - TTS_BASE_URL=http://universal-tts:8000/v1
      - DEFAULT_MODEL=edge-tts
      - DEFAULT_VOICE=en-US-AriaNeural
    depends_on:
      - universal-tts
```

### Option 3: Local Development

```bash
# 1. Clone repository
git clone https://github.com/binuengoor/universal-reader.git
cd universal-reader

# 2. Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --host 0.0.0.0 --port 9025 --reload

# 3. Frontend setup (in a separate terminal)
cd ../frontend
npm install
npm run dev
```

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Toggle Play / Pause audio |
| <kbd>J</kbd> / <kbd>K</kbd> | Skip to Next / Previous sentence block |
| <kbd>[</kbd> / <kbd>]</kbd> | Decrease / Increase playback speed ($\pm 0.1\times$) |
| <kbd>0</kbd> | Reset playback speed to $1.0\times$ |
| <kbd>Cmd</kbd> + <kbd>F</kbd> / <kbd>Ctrl</kbd> + <kbd>F</kbd> | Open in-document search bar |
| <kbd>Esc</kbd> | Close side drawers / return to Document Library |
| <kbd>?</kbd> | Toggle Keyboard Shortcuts HUD |

---

## API Reference Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/documents` | List all documents with tags, metadata, and reading progress |
| `POST` | `/api/documents/upload` | Ingest and chunk file (`.pdf`, `.epub`, `.docx`, `.md`, `.txt`) |
| `POST` | `/api/documents/url` | Ingest article from URL via Trafilatura |
| `POST` | `/api/documents/create` | Create document from scratchpad note |
| `GET` | `/api/documents/{id}` | Retrieve document content and chunked blocks |
| `PUT` | `/api/documents/{id}` | Edit markdown document and recalculate chunks |
| `DELETE` | `/api/documents/{id}` | Delete document and clear cached audio blocks |
| `GET` | `/api/documents/{id}/blocks/{b}/audio` | Stream or synthesize specific audio chunk |
| `GET` | `/api/documents/{id}/export-audio` | Concatenate and export document narration as a single MP3 |
| `GET` | `/api/settings` | Retrieve active TTS, LLM, and reading preferences |
| `POST` | `/api/settings` | Save preferences to `/data/config.json` |
| `GET` | `/api/voices` | Proxy voices available in upstream TTS gateway |
| `GET` | `/api/tags` | List all category tags across library |

---

## License

Distributed under the MIT License. See [LICENSE](https://github.com/binuengoor/universal-reader/blob/main/LICENSE) for details.
