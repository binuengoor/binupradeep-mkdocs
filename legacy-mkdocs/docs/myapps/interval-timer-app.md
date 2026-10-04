---
title: Interval Timer App
description: A modern, self-hosted interval timer and workout dashboard designed for physical therapy routines, mobility drills, and interval training with TTS prompts, voice commands, and PiP mode.
tags: [interval-timer, physical-therapy, workout, fitness, tts, voice-control, docker, nodejs, pwa]
---

# Interval Timer App: Smart Interval Timer for Physical Therapy & Workouts

**Interval Timer App** is a modern, responsive web application designed specifically for physical therapy routines, mobility protocols, and interval training. It offers precise multi-set and multi-rep timing, unilateral (left/right side) exercise alternation, multimedia posture lightboxes, Edge-TTS audio cues, hands-free voice commands, and a floating Picture-in-Picture countdown.

- **GitHub Repository**: [Interval-Timer-App](https://github.com/binuengoor/interval-timer-app)
- **Docker Image**: [`ghcr.io/binuengoor/interval-timer-app:latest`](https://ghcr.io/binuengoor/interval-timer-app)

---

## Overview

Unlike generic gym timers that only cycle through basic work/rest countdowns, the **Interval Timer App** is built from the ground up to accommodate structured physical therapy and rehabilitation programs. It supports detailed exercise configurations (sets, reps, intra-rep rest, inter-set rest), unilateral left/right tracking, media guidance (posture images and YouTube video embeds), hands-free voice control when on an exercise mat, and post-session pain tracking to monitor physical recovery over time.

---

## Key Features

### 1. Workout & Exercise Engine
- **Configurable Interval Hierarchy**: Set custom work durations, rest between reps, rest between sets, preparation buffers, and exercise notes.
- **Unilateral / Two-Sided Exercise Support**: Automatically alternates between **Left Side** and **Right Side** with dedicated voice transitions (*"Left side first"*, *"Switch sides"*).
- **Exercise Management**: Drag-free reordering (move up/down) and 1-click exercise cloning.
- **Skip & Scrub Controls**: Jump between exercises or step backward/forward through workout phases on the fly.

### 2. Visual & Timer Interface
- **Animated SVG Countdown Ring**: Smooth, color-coded circular timer (Amber for Prepare, Green for Work, Red for Rest).
- **Overall Workout Progress**: Real-time progress bar tracking total elapsed workout percentage alongside active exercise numbers.
- **1-Tap Fullscreen Mode**: Distraction-free, high-contrast timer view for desktop screens, wall-mounted tablets, or phones.
- **Picture-in-Picture (PiP) Floating Window**: Float an active countdown window over other applications, allowing you to follow along while reading articles or watching videos.

### 3. Audio, Voice & Hands-Free Interaction
- **Edge-TTS Voice Prompts**: Natural-sounding speech announcements (*"3-2-1 Go"*, *"Rest"*, *"Prepare for next exercise"*) powered by Microsoft Edge TTS.
- **Audio & Haptic Customization**: Configurable prompt verbosity (Full, Minimal, Muted), speech rate scaling ($0.8\times - 1.4\times$), audio beeps, and mobile vibration feedback.
- **Hands-Free Voice Recognition**: Speak commands (*"Pause"*, *"Resume"*, *"Next"*, *"Back"*, *"Skip"*) with a live HUD indicator—ideal when holding planks or floor stretches.

### 4. Multimedia Posture & Form Lightbox
- **Clickable Media Lightbox**: Click any exercise thumbnail in the plan builder or workout screen to launch full-resolution posture diagrams or image carousels.
- **YouTube Embed Support**: Embed video tutorials directly into exercise cards with auto-fetched thumbnail previews.
- **Aspect Ratio Containment**: Uncropped image rendering (`object-fit: contain`) ensures posture diagrams and anatomical callouts are never cut off.

### 5. Health Tracking, Analytics & Motivation
- **Pain Level Tracker (0–10 Scale)**: Log post-session pain scores with emoji mood indicators and clinical notes.
- **Pain Trend Sparkline**: Interactive recovery trend line in the Stats modal to track discomfort reduction across days and weeks.
- **30-Day Activity Heatmap**: Visual contribution grid tracking workout frequency and consistency.
- **Streak Counters**: Displays current active streaks and total completion metrics.

### 6. Data Portability & PWA
- **Curated Routine Presets**: Built-in starter routines (*Shoulder & Neck PT*, *Core & Planks*, *Desk Ergonomics*, *7-Min HIIT*).
- **Import / Export**: Seamless backup and cross-device sharing via `.yml` or `.json` files, plus an in-app raw YAML editor.
- **Progressive Web App (PWA)**: Installable on iOS, Android, macOS, and Windows with offline media caching.
- **Screen Wake Lock API**: Prevents your device screen from dimming or locking during workout sessions.

---

## Installation & Setup

### Option 1: Docker Compose (Recommended)

Deploy the service with the following `docker-compose.yml`:

```yaml
version: '3.8'

services:
  interval-timer-app:
    image: ghcr.io/binuengoor/interval-timer-app:latest
    container_name: interval-timer-app
    ports:
      - "8080:80"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

Start the container:
```bash
docker compose up -d
```

Access the application in your browser at `http://<your-server-ip>:8080`.

### Option 2: Docker Run

```bash
docker run -d \
  --name interval-timer-app \
  -p 8080:80 \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  ghcr.io/binuengoor/interval-timer-app:latest
```

### Option 3: Local Development (Node.js)

```bash
# Clone the repository
git clone https://github.com/binuengoor/interval-timer-app.git
cd interval-timer-app

# Install dependencies
npm install

# Start the Node.js server
npm start
```

Open `http://localhost:8080` in your web browser.

---

## Data Persistence & Directory Structure

When running via Docker, bind-mount the `./data` directory to persist routines and analytics:

```
data/
├── plans.yml       # Stores all custom and imported workout routines
└── stats.yml       # Stores completed session logs, streaks, and pain ratings
```

- **`plans.yml`**: Contains structured YAML definitions for all your workout plans. You can edit this file directly or through the app's YAML editor.
- **`stats.yml`**: Tracks completion dates, durations, pain levels, and notes for historical analytics.

---

## Keyboard Shortcuts (Workout View)

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>&rarr;</kbd> | Advance to Next Phase / Step |
| <kbd>&larr;</kbd> | Return to Previous Phase / Step |
| <kbd>Esc</kbd> | Close active modal, stats, or media lightbox |

---

## Technical Details

- **Backend**: Node.js, Express.js, `node-edge-tts` (Microsoft Edge TTS synthesis), `js-yaml` (YAML parsing/serialization), and `axios`.
- **Frontend**: Modern Vanilla JavaScript, responsive CSS with Dark Mode styling, SVG circular progress rendering, and Web Audio API synthesis.
- **APIs Used**:
  - **Screen Wake Lock API**: Keeps display active throughout workouts.
  - **Web Speech API**: Powers hands-free voice command recognition and fallback speech synthesis.
  - **Picture-in-Picture API**: Renders canvas countdown to a floating OS window.
  - **Service Worker & Workbox**: Enables offline PWA caching.

---

## Troubleshooting

- **Voice Prompts Not Playing**: Ensure your browser permissions allow audio playback. Some mobile browsers require an initial user interaction (e.g., pressing "Start") before playing Web Audio or TTS streams.
- **Voice Commands Not Listening**: Check browser microphone permissions. Voice recognition requires an active microphone connection and is supported on Chromium-based browsers (Chrome, Edge, Brave) and Safari.
- **Screen Dimming During Workout**: Verify that your browser supports the Screen Wake Lock API (enabled by default on modern Chrome, Edge, and Safari).
- **Data Not Persisting**: Ensure the `./data` host directory has proper read/write permissions for the container process.
