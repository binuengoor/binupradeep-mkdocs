---
title: Audio Analysis – Key & BPM
description: A self-hosted FastAPI + React stack that finds BPM, Camelot keys, confidence, and waveform previews while managing a local audio library with Docker-friendly workflows.
tags: [audio-analysis, bpm-detection, key-detection, fastapi, react, docker, essentia]
---

# Audio Analysis – Key & BPM

**Audio Analysis – Key & BPM** is a sleek, dark-themed React application powered by a FastAPI + Essentia backend. Drop in any track to extract BPM, Camelot key, standard key, and confidence scores, then rename files with smart tokens, preview waveforms, and manage a JSON-backed library without leaving the browser.

- **GitHub Repository**: [Audio-Analysis-Key-BPM](https://github.com/binuengoor/Audio-Analysis-Key-BPM)
- **Docker Images**:
  - Backend – [`ghcr.io/binuengoor/audio-analysis-key-bpm-backend`](https://ghcr.io/binuengoor/audio-analysis-key-bpm-backend)
  - Frontend – [`ghcr.io/binuengoor/audio-analysis-key-bpm-frontend`](https://ghcr.io/binuengoor/audio-analysis-key-bpm-frontend)

## Overview

**Title**: Analyze BPM & Keys Locally with Essentia  
**Description**: A self-hosted FastAPI + React stack that analyzes single tracks, previews waveforms, renames with smart tokens, and manages a library of original vs processed files.  
**Tags**: Audio Analysis, BPM Detection, Key Detection, Essentia, FastAPI, React, Docker, Self-Hosted

## Key Features

- **Essentia-Powered Insights**: Accurate BPM, Camelot key, standard key, and confidence metrics with optional silence trimming.
- **Waveform Verification**: Built-in WaveSurfer player on both the analyzer view and the library preview.
- **Smart Library**: Persists metadata in `library.json`, tracks input/output pairs, and exposes delete/clear controls.
- **Token-Based Renaming**: Use `{Camelot}`, `{Key}`, `{BPM}`, `{OriginalName}` (and combinations) before saving to the output folder.
- **Batch-Friendly Queue**: Upload multiple files, auto-analyze the active one, and monitor processing status and progress.
- **Docker-First**: Separate Dockerfiles plus Compose stacks for pulling GHCR images or building locally.
- **CI/CD Automation**: GitHub Actions (`docker-publish.yml`) builds and pushes both images to GHCR on every commit to `main`.
- **Dark UI & Zustand Store**: Modern Vite + Tailwind front end with responsive layouts and minimal state-management boilerplate.

## Architecture & Data Flow

```
frontend/  – React + Vite + Tailwind + Zustand
backend/   – FastAPI + Essentia analyzers + Pydantic models
data/      – input/, output/, library.json (bind-mounted volume)
docker-compose*.yml – two-service stack
```

1. The frontend NGINX container serves the static SPA and proxies `/api/*` + `/files/*` to the backend service.
2. The backend mounts `./data` to persist uploads, processed files, and `library.json`.
3. Essentia performs key/BPM extraction; results are cached in the library and surfaced via the React UI.
4. GitHub Actions builds multi-arch `linux/amd64` images and publishes them to GHCR with `latest` + commit SHA tags.

## Installation & Setup

### Option 1: Pull the Published Images (Recommended)

```bash
docker login ghcr.io -u <github-username> -p <ghcr-token>
git clone https://github.com/binuengoor/Audio-Analysis-Key-BPM.git
cd Audio-Analysis-Key-BPM
docker compose pull
docker compose up -d
```

- Frontend: <http://localhost:3000>
- Backend: proxied behind the same origin; `/api/*` and `/files/*` are forwarded automatically.

### Option 2: Build Locally

```bash
docker compose -f docker-compose.build.yml up --build
```

This variant mounts the backend code and `data` folder, perfect for iterating on analyzer logic or UI polish.

### Option 3: Run Services Manually

**Backend**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend**

```bash
cd frontend
npm install
VITE_API_URL=http://localhost:8000 npm run dev
```

## Usage Guide

### Upload & Analyze

1. Drag-and-drop or use the file picker in the **Analyze** tab.
2. Files enter the queue with an "uploading" badge; the backend auto-analyzes the active file.
3. BPM, Camelot key, standard key, and confidence populate the dashboard once Essentia finishes.

### Waveform Preview

- Inspect the waveform for the active file or any library entry with the embedded WaveSurfer player.
- Scrub through the audio to double-check downbeats or harmonic changes before exporting.

### Rename & Save

1. Compose a pattern such as `{Camelot}-{BPM}-{OriginalName}`.
2. Click **Save to Library** to copy the input file into `data/output` with the generated name.
3. Review the entry inside the **Library** tab alongside metadata and waveform previews.

### Manage the Library

- Switch to the **Library** tab to preview files, inspect metadata, delete inputs/outputs individually, or clear everything.
- Track progress with storage stats and quick filters for processed vs original files.

## Rename Token Reference

| Token          | Inserts            |
|----------------|--------------------|
| `{Camelot}`    | e.g., `8B`         |
| `{Key}`        | e.g., `C Major`    |
| `{BPM}`        | Rounded BPM value  |
| `{OriginalName}` | Filename without extension |

## Data & File Management

- `data/input/`: staging area for uploaded originals (ignored by git).
- `data/output/`: destination for processed/renamed files.
- `data/library.json`: single source of truth for the UI and API; keeps IDs, analysis payload, and file paths.
- Library entries can be purged selectively (input-only, output-only) or entirely via **Clear All**.

## Configuration

### Environment Variables

```bash
# API Configuration
OPENAI_API_KEY=your-api-key-here
CUSTOM_ENDPOINT=https://your-custom-endpoint.com
SERVICE_TYPE=openai

# Storage Settings
MAX_STORAGE_MB=500
AUTO_CLEANUP=true
CLEANUP_THRESHOLD=90

# Server Configuration
PORT=3000
NODE_ENV=production
```

### Advanced Settings

- **Custom Endpoints**: Point to any OpenAI-compatible TTS/TTS-like service.
- **Storage Limits**: Prevent disk pressure with configurable caps and automatic cleanup.
- **Auto-Cleanup**: Remove old files when the threshold is reached.
- **Administrator Locks**: Pin settings that casual users should not change.

## Technical Details

- **Backend**: FastAPI, Pydantic models, Essentia analyzers, `pytest` test suite.
- **Frontend**: Vite, React, Tailwind CSS, Zustand, WaveSurfer.js.
- **Static Hosting**: NGINX proxies API/file requests to the backend service.
- **CI/CD**: GitHub Actions builds/pushes both images to GHCR; each push gets `latest` and commit SHA tags.
- **Compose Targets**:
  - `docker-compose.yml`: references GHCR images with `pull_policy: always`.
  - `docker-compose.build.yml`: uses local build contexts and bind mounts for dev.

## Troubleshooting

- **Uploads fail on remote hosts**: Ensure the frontend is running the latest image that includes the built-in proxy (post-`55e6a43`). Only expose the frontend port; backend traffic stays on the Docker network.
- **Missing waveforms**: Verify the `/files/*` proxy is reachable. When running outside Compose, set `VITE_API_URL`.
- **Essentia dependencies**: The backend image derives from `ghcr.io/mtg/essentia:bullseye-v2.1_beta5`, so all DSP tooling ships with the container.
- **Data persistence**: Bind-mount the `data/` directory on the host to keep analysis history and processed files between container restarts.

## Roadmap & Future Ideas

- Multi-file batch processing UI plus historical queue management.
- Additional analysis metrics (energy, loudness, alternative keys).
- User-defined rename tokens and saved presets.
- Cloud object storage adapters for the `data` directory.
- Public API endpoints for automation or DAW integrations.

---

Spin up **Audio Analysis – Key & BPM** to keep your DJ crate tidy: analyze, rename, preview, and archive every track with Essentia-grade accuracy—no SaaS in sight.
