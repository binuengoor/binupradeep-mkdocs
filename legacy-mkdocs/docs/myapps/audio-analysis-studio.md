---
title: Audio Analysis Studio
description: An AI-powered, multi-engine audio intelligence dashboard with microservices for key detection, BPM tracking, chord recognition, song structure segmentation, audio quality inspection, and Rubber Band v4 pitch/tempo stretching.
tags: [audio-analysis, bpm-detection, key-detection, chords, song-structure, rubber-band, yt-dlp, docker, react, fastapi, microservices]
---

# Audio Analysis Studio: AI-Powered Multi-Engine Audio Intelligence

**Audio Analysis Studio** is a high-performance audio analysis dashboard powered by an asynchronous **multi-engine microservices architecture** and a modern React dark-themed UI. Drop in any audio track to extract BPM, Camelot Key, Standard Key, interactive chord progression timelines, macro song structure, master loudness (LUFS), frequency cutoffs, fake-lossless transcode verdicts, linear-frequency spectrograms, and automatically embed ID3 metadata tags.

- **GitHub Repository**: [Audio-Analysis-Studio](https://github.com/binuengoor/Audio-Analysis-Studio)
- **Docker Registry**: [GitHub Packages (GHCR)](https://github.com/binuengoor/Audio-Analysis-Studio/pkgs/container/)

## Overview

**Audio Analysis Studio** transitions from single-model analysis to a distributed suite of state-of-the-art DSP and deep learning engines running in parallel via Redis, Celery, and a FastAPI gateway. Whether you are a DJ preparing crates for harmonic mixing, a music producer inspecting mastering levels, or a developer running batch audio intelligence, the studio delivers comprehensive metrics through an intuitive web interface and a headless REST API (`/api/v1`).

## Key Features

### 1. Multi-Engine Microservices Suite
- **Tempo & BPM Tracking**: [BeatNet](https://github.com/mjhydri/BeatNet) state-of-the-art Dynamic Bayesian Network (DBN) beat and downbeat tracking engine (`bpm-worker:8001`).
- **Key & Camelot Detection**: [MusicalKeyCNN](https://github.com/danielfriis/musical-key-cnn) deep neural network predicting both Camelot wheel notations (`12A`, `8B`, etc.) and Standard Key (`C# minor`, `F major`, etc.) (`key-worker:8002`).
- **Chord Progression Recognition**: [Madmom](https://github.com/CPJKU/madmom) CNN + CRF (Conditional Random Field) chord segmentation and harmonic progression modeling (`chord-worker:8003`).
- **Audio Quality & Bitrate Inspection**: "WhatsMyBitrate"-style inspection via `flac-detective`, `pyloudnorm`, `soundfile`, and `mutagen` extracting container properties, integrated LUFS loudness, true peak dBFS, cutoff frequency, and authenticity verdicts (`quality-worker:8004`).
- **Song Structural Segmentation**: [Librosa](https://librosa.org/) & `scikit-learn` beat-synchronous CQT Chroma + MFCC Laplacian agglomerative segmentation detecting macro song sections (`Intro`, `Verse`, `Chorus`, `Bridge`, `Outro`) (`structure-worker:8005`).
- **Audio-Only URL Downloader Engine**: [yt-dlp](https://github.com/yt-dlp/yt-dlp) + [FFmpeg](https://ffmpeg.org/) microservice (`downloader-worker:8006`) extracting highest-quality FLAC/MP3 streams from YouTube, SoundCloud, Bandcamp, and direct audio URLs.
- **Pitch Shifting & Time Stretching**: [Rubber Band Library v4.0](https://breakfastquay.com/rubberband/) microservice (`stretch-worker:8007`) offering high-fidelity pitch transposition (±12 semitones / cents), tempo time-stretching (0.5x to 2.0x / target BPM), and vocal formant preservation.

### 2. Live Health Status & Topology Inspector
- **Dynamic Microservices Badge**: Auto-polls `GET /api/health/services` every 30 seconds, showing live operational status (`8/8 Live`, `Partial Outage`, or `Offline`).
- **Topology Inspector Popover**: Displays real-time operational state, port assignment, and round-trip HTTP response latency (in ms) for all 8 microservices and Redis.

### 3. Interactive Analysis Dashboard
- **Interactive Chord Viewer**: Synchronized chord timeline with click-to-seek playback integration.
- **Song Structure Sections**: Macro section pills with timestamp ranges, durations, and seek navigation.
- **Mastering Specs & Spectrogram**: Container codec, bit depth, sample rate, ITU-R BS.1770-4 LUFS evaluation, and linear spectrogram cutoff overlay.
- **Waveform Player**: Embedded WaveSurfer.js player with zoom controls, region markers, and playback synchronization.

### 4. Tagging & File Management
- **Automated ID3 Metadata Tagging**: Embedded `TBPM` (BPM tempo) and `TKEY` (Camelot Key / Standard Key) tags are automatically written directly into the file headers using `mutagen` on analysis and export.
- **Token-Based Renaming**: Flexible pattern generator for library downloads and transformed pitch-shifted files (`{OriginalName}`, `{Key}`, `{Camelot}`, `{BPM}`, `{Pitch}`, `{Tempo}`).
- **Asynchronous Batch Queue**: Redis broker + Celery worker daemon enabling non-blocking multi-file batch drops and live progress tracking.

### 5. Modern Client Architecture
- **Progressive Web App (PWA)**: Installable on Desktop (macOS, Windows) and Mobile (iOS, Android) with offline asset caching.
- **Multi-Arch Native Support**: Multi-platform Docker builds optimized for AMD64 and ARM64 (Apple Silicon M1/M2/M3/M4) with OpenBLAS / OpenMP hardware acceleration.

---

## Architecture Overview

```
                                      ┌──────────────────────────┐
                                      │   Frontend (React/Vite)  │
                                      │   http://localhost:3000   │
                                      └─────────────┬────────────┘
                                                    │ HTTP / Polling
                                                    ▼
                                      ┌──────────────────────────┐
                                      │   API Gateway (FastAPI)  │
                                      │   http://localhost:8000   │
                                      └──────┬────────────┬──────┘
                                             │            │ Enqueue Tasks / Download URL
                                             │            ▼
                                             │    ┌───────────────┐
                                             │    │     Redis     │
                                             │    │   Port: 6379  │
                                             │    └───────┬───────┘
                                             │            │ Task Queue
                                             │            ▼
                                             │    ┌───────────────┐
                                             │    │ Celery Worker │
                                             │    │  (Async Exec) │
                                             │    └───────┬───────┘
                                             │            │
                                             ▼            ▼  (Parallel Multi-Worker Execution)
 ┌─────────────────┬──────────────────┬───────────────────┼───────────────────┬─────────────────┬─────────────────┬─────────────────┐
 │                 │                  │                   │                   │                 │                 │                 │
 ▼                 ▼                  ▼                   ▼                   ▼                 ▼                 ▼                 ▼
┌───────────────┐ ┌────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  BPM Worker   │ │   Key Worker   │ │  Chord Worker   │ │ Quality Worker  │ │Structure Worker │ │Downloader Worker│ │ Stretch Worker  │
│   (BeatNet)   │ │(MusicalKeyCNN) │ │    (Madmom)     │ │(WhatsMyBitrate) │ │   (Laplacian)   │ │ (yt-dlp/FFmpeg) │ │ (Rubber Band 4) │
│  Port: 8001   │ │   Port: 8002   │ │   Port: 8003    │ │   Port: 8004    │ │   Port: 8005    │ │   Port: 8006    │ │   Port: 8007    │
└───────┬───────┘ └────────┬───────┘ └────────┬────────┘ └────────┬────────┘ └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
        │                  │                  │                   │                   │                   │                   │
        └──────────────────┴──────────────────┴───────────────────┴───────────────────┴───────────────────┴───────────────────┘
                                                  │
                                                  ▼
                                    ┌──────────────────────────┐
                                    │    Shared Audio Volume   │
                                    │  /app/data/shared_audio  │
                                    └──────────────────────────┘
```

---

## Docker Compose Deployment

Deploy the entire stack with the following `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:alpine
    container_name: redis
    restart: unless-stopped
    ports:
      - "127.0.0.1:6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - backend-net

  gateway:
    image: ghcr.io/binuengoor/audio-analysis-studio-gateway:latest
    container_name: gateway
    restart: unless-stopped
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - REDIS_URL=redis://redis:6379/0
    networks:
      backend-net:
        aliases:
          - audio-analysis-backend
          - gateway
    depends_on:
      - redis
      - bpm-worker
      - key-worker
      - chord-worker
      - quality-worker
      - structure-worker
      - downloader-worker
      - stretch-worker

  celery-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-gateway:latest
    container_name: celery-worker
    restart: unless-stopped
    command: celery -A celery_tasks worker --loglevel=info --concurrency=4
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - REDIS_URL=redis://redis:6379/0
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
    networks:
      - backend-net
    depends_on:
      - redis
      - bpm-worker
      - key-worker
      - chord-worker
      - quality-worker
      - structure-worker
      - downloader-worker
      - stretch-worker

  structure-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-structure-worker:latest
    container_name: structure-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8005:8005"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
    networks:
      - backend-net

  quality-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-quality-worker:latest
    container_name: quality-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8004:8004"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
    networks:
      - backend-net

  bpm-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-bpm-worker:latest
    container_name: bpm-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8001:8001"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
    networks:
      - backend-net

  key-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-key-worker:latest
    container_name: key-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8002:8002"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
      - TORCH_NUM_THREADS=4
    networks:
      - backend-net

  chord-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-chord-worker:latest
    container_name: chord-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8003:8003"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
    networks:
      - backend-net

  stretch-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-stretch-worker:latest
    container_name: stretch-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8007:8007"
    volumes:
      - ./data:/app/data/shared_audio
    environment:
      - PYTHONUNBUFFERED=1
      - OMP_NUM_THREADS=4
      - OPENBLAS_NUM_THREADS=4
    networks:
      - backend-net

  downloader-worker:
    image: ghcr.io/binuengoor/audio-analysis-studio-downloader-worker:latest
    container_name: downloader-worker
    restart: unless-stopped
    ports:
      - "127.0.0.1:8006:8006"
    volumes:
      - ./data:/app/data/shared_audio
      - ./config:/app/cookies
    environment:
      - PYTHONUNBUFFERED=1
      - AUTO_UPDATE_YTDLP=true
      - SHARED_DATA_DIR=/app/data/shared_audio
      - COOKIES_FILE=/app/cookies/cookies.txt
    networks:
      - backend-net

  audio-analysis-frontend:
    image: ghcr.io/binuengoor/audio-analysis-studio-frontend:latest
    container_name: audio-analysis-frontend
    restart: unless-stopped
    ports:
      - "3000:80"
    networks:
      - backend-net
    depends_on:
      - gateway

networks:
  backend-net:
    driver: bridge
```

Start the application:
```bash
docker compose pull
docker compose up -d
```

### Port Map & Endpoints

| Service | Port | Endpoint URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | `3000` | `http://localhost:3000` | React / Vite SPA & PWA interface |
| **API Gateway** | `8000` | `http://localhost:8000` | Gateway & Interactive Swagger UI (`/docs`) |
| **BPM Worker** | `8001` | `http://localhost:8001` | BeatNet tempo & downbeat worker |
| **Key Worker** | `8002` | `http://localhost:8002` | MusicalKeyCNN neural key detection |
| **Chord Worker** | `8003` | `http://localhost:8003` | Madmom chord recognition worker |
| **Quality Worker** | `8004` | `http://localhost:8004` | Audio quality & LUFS loudness inspector |
| **Structure Worker** | `8005` | `http://localhost:8005` | Song structural segmentation worker |
| **Downloader Worker** | `8006` | `http://localhost:8006` | yt-dlp + FFmpeg stream downloader |
| **Stretch Worker** | `8007` | `http://localhost:8007` | Rubber Band v4.0 pitch / tempo engine |
| **Redis Broker** | `6379` | `localhost:6379` | In-memory message broker & task queue |

---

## Token-Based Renaming Reference

| Token | Replacement Value | Example Output |
| :--- | :--- | :--- |
| `{OriginalName}` | Original uploaded filename (without extension) | `Track_Master` |
| `{Key}` | Standard musical key | `C# minor` / `F major` |
| `{Camelot}` | Camelot wheel key notation | `12A` / `7B` |
| `{BPM}` | Tempo in beats per minute | `128.0` |
| `{Pitch}` | Pitch transposition shift (if applied) | `+2st` |
| `{Tempo}` | Tempo multiplier (if applied) | `1.05x` |

---

## Public REST API (`/api/v1`)

Audio Analysis Studio includes a high-throughput public REST API for batch scripts, DAWs, and automated pipelines:

### 1. Audio Stream Downloading
- `POST /api/v1/download/stream`: Stream raw audio binary (FLAC/MP3/WAV) from any URL directly to client with track metadata headers.
- `POST /api/v1/download/info`: Extract video metadata (title, duration, thumbnail, uploader) without downloading audio.

### 2. Multi-Engine Audio Intelligence
- `POST /api/v1/analyze/basic`: Fast BPM & Key extraction (`multipart/form-data`).
- `POST /api/v1/analyze/key`: Musical key only (Camelot & Standard).
- `POST /api/v1/analyze/bpm`: BPM tempo only (BeatNet).
- `POST /api/v1/analyze/structure`: Macro structural section analysis.
- `POST /api/v1/analyze/chords`: Harmonic chord timeline extraction.
- `POST /api/v1/analyze/quality`: Codec, true peak, LUFS loudness, and spectrogram cutoff.
- `POST /api/v1/analyze/full`: Comprehensive 5-engine parallel analysis report.
- `POST /api/v1/analyze/url`: Single-step URL download + complete multi-engine analysis.

---

## Troubleshooting

- **Microservices Show Offline**: Verify all containers are running on the shared `backend-net` Docker bridge. The gateway auto-polls worker ports dynamically.
- **High CPU on Batch Drops**: Celery worker concurrency defaults to 4 threads. On multi-core systems or Apple Silicon, adjust `OMP_NUM_THREADS` and `--concurrency` in `docker-compose.yml`.
- **Downloader Stream Issues**: yt-dlp receives continuous updates. Use the UI **Update Downloader** button or send `POST /api/downloader/update` to upgrade the in-container engine without restarting.
- **Audio Tagging Issues**: Mutagen embeds standard ID3v2.3 tags (`TBPM`, `TKEY`). Ensure your DJ software (Rekordbox, Traktor, Serato) is set to reload metadata from tags.
