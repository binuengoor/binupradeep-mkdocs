---
title: Universal TTS Gateway
description: A production-grade, multi-architecture, OpenAI-compatible Text-to-Speech (TTS) Gateway featuring Edge-TTS, Piper, and Kokoro engines with zero-transcode fast passthrough and an in-memory LRU cache.
tags: [text-to-speech, tts, openai-compatible, edge-tts, piper-tts, kokoro-tts, docker, fastapi, homelab]
---

# Universal TTS Gateway: Unified OpenAI-Compatible Speech Synthesis

**Universal TTS Gateway** is a production-grade, multi-architecture Text-to-Speech (TTS) Gateway that serves as a **1:1 drop-in replacement** for OpenAI's `POST /v1/audio/speech`, `GET /v1/models`, and `GET /v1/audio/voices` endpoints. Built on Python and FastAPI, it consolidates cloud neural voices (Microsoft Edge-TTS, Google Cloud) and ultra-low-latency offline ONNX engines (Piper-TTS, Kokoro-TTS) behind a single unified interface with automatic cloud-to-local fallback, in-memory LRU caching, and zero-transcode streaming.

- **GitHub Repository**: [Universal-TTS](https://github.com/binuengoor/universal-tts)
- **Docker Image**: [`ghcr.io/binuengoor/universal-tts:latest`](https://github.com/binuengoor/universal-tts/pkgs/container/universal-tts)

---

## Overview

Modern AI assistants, local LLM frontends, and smart home automation platforms (such as Home Assistant, Open WebUI, and custom voice agents) commonly target OpenAI's audio synthesis API. However, relying purely on commercial cloud APIs introduces recurring subscription costs, vendor lock-in, and service fragility when internet connectivity fails.

**Universal TTS Gateway** solves this by proxying and orchestrating multiple text-to-speech backends under standard OpenAI API semantics. Clients communicate with a single local endpoint, seamlessly selecting between ultra-fast free cloud neural synthesis (Edge-TTS), studio-quality local voices (Kokoro), or 100% offline edge generation (Piper). An integrated circuit breaker ensures continuous voice availability even during internet outages, while an in-memory LRU audio cache delivers sub-millisecond responses for repetitive assistant responses.

---

## Key Features

### 1. 1:1 OpenAI API Compatibility
- **Drop-In Endpoint Replacement**: Works natively with the official OpenAI Python and Node.js SDKs, Home Assistant `tts.speak`, Open WebUI, and any client targeting `POST /v1/audio/speech`.
- **Model Discovery**: Exposes available voice models and engine backends via `GET /v1/models`.
- **Voice Catalog**: Exposes full cross-engine voice rosters via `GET /v1/audio/voices`.
- **Standard Voice Aliases**: OpenAI voice names (`alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`) map automatically to natural neural voices without modifying client configurations.

### 2. Multi-Engine Pluggable Architecture
- ☁️ **Microsoft Edge-TTS (Default)**: Free cloud neural voice synthesis utilizing high-fidelity voices such as `en-US-AriaNeural`. Delivers ~200–300ms latency with zero local CPU/GPU load.
- 🔵 **Piper-TTS (Local Edge)**: Fast, lightweight local ONNX synthesis using `en_US-ryan-medium` (`ryan`). Generates speech 100% offline in ~240ms with low resource consumption.
- 🟣 **Kokoro-TTS (Local Studio)**: High-fidelity 82M parameter local ONNX model (`af_heart`). Produces warm, expressive human prosody and studio-grade pacing.
- ☁️ **Google Cloud TTS (Optional)**: Direct integration with Google Cloud Text-to-Speech via Service Account credentials for enterprise neural voices (`en-US-Neural2-F`).

### 3. Zero-Transcode Fast Passthrough & Dynamic Transcoding
- **Native Format Streaming**: Bypasses transcoding overhead whenever possible:
  - Native **MP3 passthrough** for Edge-TTS (sub-250ms stream delivery).
  - Native **WAV (PCM) passthrough** for Piper and Kokoro (zero CPU re-encoding overhead).
- **On-The-Fly Transcoding**: When callers explicitly request non-native formats (`mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`), an internal FFmpeg pipeline handles conversion asynchronously.

### 4. In-Memory LRU Audio Cache
- **Sub-Millisecond Cache Hits**: Repeated assistant phrases (*"The front door is unlocked"*, *"Living room lights turned on"*) return in `< 1ms`.
- **SHA-256 Keying**: Cache keys evaluate text content, requested voice, engine, speed modifier, and target audio format.
- **Resource Safeguards**: Default cap of 500 entries or 50MB RAM with configurable TTL (default 24h) to avoid memory leaks.

### 5. Cloud-to-Local Circuit Breaker
- **Automatic Fallback**: If Edge-TTS encounters network timeouts (configurable threshold, default 5s) or cloud rate limits, the gateway automatically falls back to local Piper-TTS (`en_US-ryan-medium`).
- **Resilient Smart Home Audio**: Home automations and voice notifications remain operational even during ISP downtime.

### 6. Multi-Architecture Docker Builds
- Published to GitHub Container Registry (`ghcr.io`) for both `linux/amd64` (Intel/AMD homelab servers) and `linux/arm64` (Apple Silicon M-series, Raspberry Pi 5).

---

## Architecture Overview

```mermaid
graph TD
    subgraph Client_Tier["📱 Client Ingress Layer"]
        Client["OpenAI SDK / Home Assistant / Open WebUI / Mobile Agent"]
    end

    subgraph Gateway_Core["🌐 Universal TTS Gateway"]
        Router["⚡ Dynamic Router & Circuit Breaker"]
        Cache["💾 In-Memory LRU Audio Cache<br>(500 slots • <1ms hit response)"]
        
        subgraph Engine_Drivers["🔌 Pluggable Engine Drivers"]
            EdgeEngine["☁️ Edge-TTS Engine<br>• Default: en-US-AriaNeural<br>• Native MP3 Passthrough"]
            PiperEngine["🔵 Piper-TTS Engine<br>• Default: en_US-ryan-medium<br>• Native WAV Passthrough"]
            KokoroEngine["🟣 Kokoro-TTS Engine<br>• Default: af_heart<br>• Native WAV Passthrough"]
        end
    end

    Client -->|POST /v1/audio/speech| Cache
    Cache -->|Cache Hit (<1ms)| Client
    Cache -->|Cache Miss| Router

    Router -->|Default / model='edge-tts'| EdgeEngine
    Router -->|model='piper' / piper voice| PiperEngine
    Router -->|model='kokoro' / kokoro voice| KokoroEngine

    EdgeEngine -.->|Network Timeout / Fallback| PiperEngine
    PiperEngine --> Client
    KokoroEngine --> Client
    EdgeEngine --> Client
```

---

## Voice Matrix & Engine Mappings

| Engine | Default Voice | Fallback Behavior | Native Format | Latency | Purpose |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Edge-TTS** *(Default)* | **`en-US-AriaNeural`** | If invalid voice $\to$ `en-US-AriaNeural`<br>If network fails $\to$ Piper `ryan` | Native MP3 | ⚡ **~200–300ms** | Ultra-fast, zero CPU load, studio naturalness |
| **Piper-TTS** | **`en_US-ryan-medium`** (`ryan`) | If invalid voice $\to$ `en_US-ryan-medium` | Native WAV | ⚡ **~240ms** | 100% offline, local edge generation |
| **Kokoro-TTS** | **`af_heart`** | If invalid voice $\to$ `af_heart` | Native WAV | 🟣 **~2.0s** | Expressive, deep human prosody |
| **Google Cloud** | **`en-US-Neural2-F`** | If invalid voice $\to$ default Neural2 | Native MP3 | ☁️ **~350ms** | Enterprise cloud voice synthesis |

### OpenAI Voice Alias Mapping
Standard OpenAI voice names map to natural voices:

| OpenAI Voice | Mapped Gateway Voice | Engine |
| :--- | :--- | :--- |
| `alloy` | `en-US-AriaNeural` | Edge-TTS |
| `echo` | `en-US-GuyNeural` | Edge-TTS |
| `fable` | `en-GB-SoniaNeural` | Edge-TTS |
| `onyx` | `en-US-ChristopherNeural` | Edge-TTS |
| `nova` | `en-US-JennyNeural` | Edge-TTS |
| `shimmer` | `en-US-AnaNeural` | Edge-TTS |

---

## Installation & Setup

### Option 1: Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
services:
  universal-tts:
    image: ghcr.io/binuengoor/universal-tts:latest
    container_name: universal-tts-gateway
    restart: unless-stopped
    ports:
      - "8000:8000"
      - "8880:8000"
    environment:
      - TTS_DEFAULT_ENGINE=edge-tts
      - TTS_DEFAULT_VOICE=en-US-AriaNeural
      - TTS_CACHE_ENABLED=true
      - TTS_CACHE_MAX_ENTRIES=500
      - TTS_CACHE_MAX_MEMORY_MB=50
    volumes:
      - ./config.yaml:/app/config.yaml:ro
      - ./models:/app/models
      - ./credentials:/app/credentials:ro
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

Launch the service:

```bash
docker compose up -d
```

### Option 2: Docker CLI

```bash
docker run -d \
  -p 8000:8000 \
  -e TTS_DEFAULT_ENGINE=edge-tts \
  -e TTS_DEFAULT_VOICE=en-US-AriaNeural \
  --name universal-tts-gateway \
  ghcr.io/binuengoor/universal-tts:latest
```

### Option 3: Local Development with `uv`

```bash
# Clone the repository
git clone https://github.com/binuengoor/universal-tts.git
cd universal-tts

# Setup virtual environment and install dependencies
uv venv
source .venv/bin/activate
uv pip install -e ".[all]"

# Download offline models for Piper and Kokoro
python scripts/download_models.py

# Launch the FastAPI gateway
uvicorn gateway.main:app --host 0.0.0.0 --port 8000
```

---

## Client Integration Examples

### Official OpenAI Python SDK

```python
from openai import OpenAI

# Direct client to the local Universal TTS Gateway
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-needed",  # or configure TTS_SERVER__API_KEY
)

response = client.audio.speech.create(
    model="edge-tts",  # or 'piper', 'kokoro', 'tts-1'
    voice="alloy",     # maps automatically to en-US-AriaNeural
    input="Universal TTS Gateway is ready for production!",
)

response.stream_to_file("output.mp3")
```

### cURL CLI Requests

=== "Edge-TTS (Cloud Neural)"
    ```bash
    curl http://localhost:8000/v1/audio/speech \
      -H "Content-Type: application/json" \
      -d '{
        "model": "edge-tts",
        "voice": "en-US-AriaNeural",
        "input": "Hello from Universal TTS Gateway!"
      }' \
      --output speech.mp3
    ```

=== "Piper-TTS (Offline Edge)"
    ```bash
    curl http://localhost:8000/v1/audio/speech \
      -H "Content-Type: application/json" \
      -d '{
        "model": "piper",
        "voice": "ryan",
        "input": "Offline voice synthesis running locally at the edge."
      }' \
      --output speech.wav
    ```

=== "Kokoro-TTS (Studio Prosody)"
    ```bash
    curl http://localhost:8000/v1/audio/speech \
      -H "Content-Type: application/json" \
      -d '{
        "model": "kokoro",
        "voice": "af_heart",
        "input": "High fidelity text to speech with expressive prosody."
      }' \
      --output speech.wav
    ```

### Discovery Endpoints

```bash
# List available OpenAI-compatible models
curl http://localhost:8000/v1/models

# List all voices across all configured engines
curl http://localhost:8000/v1/audio/voices

# Gateway health check
curl http://localhost:8000/health
```

### Home Assistant Integration

In Home Assistant, configure the OpenAI TTS integration using the gateway endpoint:

- **Base URL**: `http://<gateway-ip>:8000/v1`
- **API Key**: Any dummy string (e.g., `sk-universal-tts`)
- **Voice**: `alloy` or `en-US-AriaNeural`
- **Model**: `edge-tts` or `piper`

---

## Configuration Reference (`config.yaml`)

```yaml
server:
  host: "0.0.0.0"
  port: 8000
  api_key: ""                      # Optional Bearer token authentication
  cors_origins: ["*"]

defaults:
  engine: "edge-tts"
  voice: "en-US-AriaNeural"
  speed: 1.0
  response_format: "mp3"

cache:
  enabled: true
  max_entries: 500                 # Maximum cached audio snippets
  max_memory_mb: 50                # Memory budget for audio cache
  ttl_seconds: 86400               # 24h TTL

circuit_breaker:
  enabled: true
  timeout_seconds: 5.0
  fallback_engine: "piper"
  fallback_voice: "en_US-ryan-medium"

paths:
  piper_models_dir: "models/piper"
  kokoro_model_path: "models/kokoro/kokoro-v1.0.onnx"
  kokoro_voices_path: "models/kokoro/voices-v1.0.bin"

engines:
  edge_tts:
    enabled: true
    default_voice: "en-US-AriaNeural"
    native_format: "mp3"
    timeout_seconds: 5.0
  piper:
    enabled: true
    default_voice: "en_US-ryan-medium"
    native_format: "wav"
  kokoro:
    enabled: true
    default_voice: "af_heart"
    native_format: "wav"
```

All configuration parameters can also be overridden using environment variables prefixed with `TTS_` (e.g., `TTS_DEFAULT_ENGINE=piper`, `TTS_CACHE_ENABLED=true`).

---

## Latency & Performance Benchmarks

Measured on Apple Silicon / local AMD64 test suite:

| Engine | Voice | Cache State | Latency | Audio Size | Real-Time Factor (RTF) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Edge-TTS** | `en-US-AriaNeural` | **HIT** | **< 1ms** | 45.8 KB | 0.00 |
| **Edge-TTS** | `en-US-AriaNeural` | MISS | 285 ms | 45.8 KB | 0.00 |
| **Piper-TTS** | `en_US-ryan-medium` | MISS | 247 ms | 265.0 KB | 0.04 |
| **Kokoro-TTS** | `af_heart` | MISS | 2,036 ms | 353.0 KB | 0.27 |

---

## License

Distributed under the MIT License. See [LICENSE](https://github.com/binuengoor/universal-tts/blob/main/LICENSE) for details.
