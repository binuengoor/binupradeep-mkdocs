---
title: Event & Track Manager
description: A high-reliability, cloud-native event production and stage playback system featuring Google Sheets synchronization, Google Shared Drive archival, YouTube audio extraction, and a dedicated stage sound console.
tags: [event-management, audio-playback, stage-console, google-sheets, google-drive, yt-dlp, docker, fastapi]
---

# Event & Track Manager: High-Reliability Live Stage Production System

**Event & Track Manager** is a cloud-native event production, track intake, and live stage playback system built originally for **EMA Paattukoottam** (Exton Malayali Association) and adaptable to any stage musical night, concert, or talent show. It synchronizes with **Google Sheets** for performer registration and stage sequencing, uses **Google Shared Drive** for versioned backing track storage, runs an isolated **YouTube extraction worker**, and delivers a low-latency stage sound console, performer intake portal, and live public audience schedule.

- **GitHub Repository**: [Event-Track-Manager](https://github.com/binuengoor/event-track-manager)
- **Docker Registry**:
  - Main App: [`ghcr.io/binuengoor/event-track-manager-app:latest`](https://github.com/binuengoor/event-track-manager/pkgs/container/event-track-manager-app)
  - Downloader Worker: [`ghcr.io/binuengoor/event-track-manager-downloader:latest`](https://github.com/binuengoor/event-track-manager/pkgs/container/event-track-manager-downloader)

---

## Overview

Live stage events and community musical productions often suffer from fragmented workflows: performers email backing tracks at the last minute, file formats vary widely, audio technicians struggle with sudden order changes, and venue Wi-Fi drops can disrupt streaming tracks mid-performance.

**Event & Track Manager** unifies the entire live sound lifecycle into a cohesive, fault-tolerant platform. Performers search for their registered slot and upload audio or YouTube links directly from mobile devices. Tracks are transcoded to stage-fidelity 320kbps MP3s, cached locally on solid-state disk, and archived to Google Shared Drive. During showtime, the sound engineer operates a keyboard-driven stage console protected against accidental disruption, while audience members and backstage performers track act readiness on an auto-updating live schedule.

---

## Key Features

### 1. Performer Intake & Track Upload Portal (`/tracks`)
- **Mobile-First Performer Matching**: Searchable autocomplete dropdown matching both primary lead singers and duet partners.
- **Multiple Performances Support**: Seamlessly accommodates singers performing multiple acts across the program.
- **Missing Information Warnings**: Alerts performers if song titles or details are missing on the registration sheet, with one-tap shortcuts to the Google Sign-Up sheet.
- **Dual Submission Methods**:
  - **Direct Audio Upload**: Accepts MP3, WAV, M4A, and AAC files up to 200MB, automatically transcoded to uniform 320kbps stage-ready audio.
  - **YouTube Extraction**: Input a YouTube URL; the backend worker extracts the audio stream with JavaScript challenge solving and normalizes it.
- **Waveform Audio Preview**: Built-in interactive waveform player allowing singers to preview their uploaded audio immediately with play/pause and scrub controls.
- **Venue & Event Details**: Integrates event posters, venue maps, schedule notes, and optional ticket/registration payment links.

### 2. Public Live Stage Program (`/live`)
- **Adaptive 70/30 Split Display**:
  - Expands automatically into a widescreen 70/30 layout when gallery media is present.
  - **Sponsor & Highlight Carousel**: Smooth crossfading banner carousel rotating every 6 seconds through sponsor logos, flyers, and event highlights from `./data/gallery`.
  - Automatically collapses to 100% full width if no images exist.
- **Pre-Show Countdown**: Prominent live countdown timer (`DAYS : HOURS : MINS : SECS`) synchronizing to the configured `EVENT_START_TIME`.
- **Live State Transitions**: Automatically shifts into `🔴 LIVE PROGRAM` and `🎤 NOW ON STAGE` when performances kick off or a track is cued.
- **Sound Engineer Stage Notes**: Displays live stage directives (e.g., *"Mic 2 +3dB"*, *"Saxophone solo after chorus"*) directly under the song title.
- **Backstage "Up Next" Queue**: Automatically highlights upcoming acts with confirmed audio tracks so performers know exactly when to report backstage.
- **Zero-Lag Polling**: Auto-refreshes display state in the background every 5 seconds.

### 3. Stage Sound & Playback Console (`/console`)
- **PIN-Protected Access**: Secure console protected by a 4-digit sound operator PIN (`ADMIN_PIN`).
- **Disruption Safeguards**: Confirmation modals guard against accidental mute, track cancellation, or premature skip while stage audio is actively playing.
- **Persistent Cue State & Uncue**: Preserves the cued track across page refreshes. An **Uncue** button returns the act to the queue and restores the live countdown.
- **Staged Reordering with Glowing Sync**:
  - Drag-and-drop re-sequencing updates local SQLite with `<1ms` latency.
  - An amber glowing **"Sync to Sheet"** button indicates local reordering, allowing batch synchronization back to Google Sheets and automated renaming of Google Drive files with a single click.
- **Keyboard-Driven Workflow**: Full shortcut mapping:
  - <kbd>Space</kbd>: Play / Pause live audio
  - <kbd>←</kbd> / <kbd>→</kbd>: Seek $\pm 5$ seconds
  - <kbd>M</kbd>: Mute / Unmute
  - <kbd>↓</kbd>: Cue next upcoming track
  - <kbd>Enter</kbd>: Mark performance complete
- **Local Disk Cache & Offline Resilience**: All audio is cached locally in `/data/cache`. Playback never depends on live internet connectivity during showtime.
- **Offline ZIP Export**: Bundles all sequenced audio tracks into a cleanly numbered ZIP file for emergency USB backup.

---

## Architecture Overview

```
                           [ Google Workspace ]
                        ┌────────────────────────┐
                        │ Google Sheet (Signups) │
                        │ Google Shared Drive    │
                        └───────────▲────────────┘
                                    │ HTTPS (Service Account)
                       ┌────────────▼────────────┐
                       │   Docker Compose Net    │
                       │                         │
[ Singers / Intake ] ──►  app (FastAPI :8000)    │
[ Audience / Live  ] ──►  ├── / (Intake)         │
[ Stage Sound Op   ] ──►  ├── /live (Audience)   │
                       │  ├── /console (Stage)   │
                       │  └── Audio Stream Proxy │
                       │           ▲             │
                       │           │ Internal API│
                       │  downloader (:8001)     │
                       │  ├── yt-dlp + ffmpeg    │
                       │  └── Deno EJS Engine    │
                       │                         │
                       │  Volume: /data/cache    │
                       └─────────────────────────┘
```

- **`app` container**: FastAPI service handling Google Sheets API synchronization, Shared Drive upload/archival, SQLite database management, and HTTP 206 Partial Content byte-range audio streaming.
- **`downloader` container**: Isolated microservice running `yt-dlp`, `ffmpeg`, and `deno` with `yt-dlp-ejs` JavaScript challenge solving.
- **Shared Audio Volume (`/data/cache`)**: Persists audio on local storage, eliminating buffering and stage dropouts.

---

## Installation & Setup

### Option 1: Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
services:
  app:
    image: ghcr.io/binuengoor/event-track-manager-app:latest
    container_name: event_track_manager_app
    restart: unless-stopped
    ports:
      - "8088:8000"
    environment:
      - CONFIG_PATH=/app/config.yaml
      - ADMIN_PIN=2026
      - DOWNLOADER_SERVICE_URL=http://downloader:8001
      - CACHE_DIR=/data/cache
      - GOOGLE_CREDENTIALS_PATH=/secrets/credentials.json
    volumes:
      - ./config.yaml:/app/config.yaml:ro
      - ./secrets:/secrets:ro
      - ./data:/data
      - audio_cache:/data/cache
    depends_on:
      - downloader

  downloader:
    image: ghcr.io/binuengoor/event-track-manager-downloader:latest
    container_name: event_track_manager_downloader
    restart: unless-stopped
    environment:
      - CACHE_DIR=/data/cache
      - COOKIES_PATH=/secrets/yt_cookies.txt
    volumes:
      - ./secrets:/secrets:ro
      - audio_cache:/data/cache

volumes:
  audio_cache:
    driver: local
```

Create environment file `.env` for your event specifics:

```env
APP_TITLE="EMA Paattukoottam 2026"
EVENT_START_TIME="09-28-2026 06:30PM"
GOOGLE_SHEET_URL="https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit"
GOOGLE_DRIVE_ACTIVE_FOLDER="https://drive.google.com/drive/folders/<ACTIVE_FOLDER_ID>"
GOOGLE_DRIVE_ARCHIVE_FOLDER="https://drive.google.com/drive/folders/<ARCHIVE_FOLDER_ID>"
ADMIN_PIN="2026"
```

Start the application:

```bash
docker compose up -d
```

### Option 2: Hetzner Cloud Virtual Server Deployment

For live venue streaming and distributed intake, deploy on a Hetzner Cloud CX22 or CAX11 instance:

1. **Provision Virtual Server**: Launch an Ubuntu 24.04 LTS instance on Hetzner Cloud.
2. **Install Docker**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
3. **Clone & Configure**:
   ```bash
   git clone https://github.com/binuengoor/event-track-manager.git /opt/event-track-manager
   cd /opt/event-track-manager
   cp .env.example .env
   mkdir -p secrets data/gallery
   ```
4. **Transfer Google Credentials**:
   ```bash
   scp secrets/credentials.json root@<HETZNER_IP>:/opt/event-track-manager/secrets/
   ```
5. **Launch Application**:
   ```bash
   docker compose pull
   docker compose up -d
   ```

---

## Google Workspace Integration

To connect the application to your event spreadsheet:

1. **Create Service Account**:
   - In Google Cloud Console, enable **Google Sheets API** and **Google Drive API**.
   - Create a Service Account and download the JSON key as `secrets/credentials.json`.
2. **Share Google Sheet**:
   - Share your event spreadsheet with the Service Account email as **Editor**.
3. **Share Google Shared Drive**:
   - Create `Active` and `Archive` folders on Google Drive.
   - Grant the Service Account **Content Manager** access to the Shared Drive.
4. **Configure Environment Variables**:
   - Paste the browser URLs for the Sheet and Drive folders directly into your `.env` file.

---

## Access Endpoints

| Portal | URL | Purpose |
| :--- | :--- | :--- |
| **Performer Intake** | `http://<server-ip>:8088/` | Mobile-friendly registration & audio upload |
| **Public Live Schedule** | `http://<server-ip>:8088/live` | Stage countdown, live performer status & sponsor carousel |
| **Sound Playback Console** | `http://<server-ip>:8088/console` | PIN-protected sound engineer control board |
| **Health Check** | `http://<server-ip>:8088/api/health` | Automated uptime & container healthcheck |

---

## License

Distributed under the MIT License. See [LICENSE](https://github.com/binuengoor/event-track-manager/blob/main/LICENSE) for details.
