---
title: OpenSpeech - Self-Hosted Text-to-Speech
description: A self-hosted web application for converting text to speech using OpenAI's TTS API, featuring audio stitching, multi-format export, and intuitive web interface.
tags: [text-to-speech, tts, openai, docker, speech-synthesis]
---
# OpenSpeech: Self-Hosted Text-to-Speech Made Simple

**OpenSpeech** is a powerful, self-hosted web application that transforms text into natural-sounding speech using OpenAI's TTS API. With support for long-form content, multi-format audio export, and an intuitive web interface, OpenSpeech makes text-to-speech conversion accessible and efficient for personal and professional use.

Whether you need to convert articles, documents, or notes into audio format, OpenSpeech provides a seamless experience with advanced features like automatic audio stitching, storage management, and dark mode support.

**GitHub Repository**: [OpenSpeech](https://github.com/binuengoor/OpenSpeech)  
**Docker Image**: [ghcr.io/binuengoor/openspeech](https://ghcr.io/binuengoor/openspeech)

## Overview
**Title**: Convert Text to Speech with OpenSpeech - Your Personal TTS Service  
**Description**: A self-hosted Node.js application for converting text to high-quality speech using OpenAI's API, with support for long documents, multiple voices, and flexible audio formats.  
**Tags**: Text-to-Speech, TTS, OpenAI, Docker, Audio Processing, Self-Hosted

## Key Features

- **Long-Form Text Support**: Automatically splits text longer than 4096 characters into chunks and seamlessly stitches them together
- **Multiple Voice Options**: Access all OpenAI TTS voices with language filtering and easy selection
- **Flexible Audio Formats**: Export in MP3, Opus, AAC, FLAC, WAV, or PCM formats
- **Document Upload**: Convert Word documents (.docx) and PDF files directly to speech
- **Audio Stitching**: Combine multiple audio chunks into a single file using FFmpeg
- **Storage Management**: Built-in storage monitoring with automatic cleanup options
- **Dark Mode**: Eye-friendly interface with automatic theme detection
- **Speed Control**: Adjust playback speed from 0.25x to 4.0x
- **Custom Endpoints**: Support for OpenAI-compatible TTS services
- **File Management**: Download, play, and manage generated audio files directly in the interface

## Installation/Setup

### Option 1: Using Docker (Recommended)

**Step 1: Pull the Docker Image**
```bash
docker pull ghcr.io/binuengoor/openspeech:latest
```

**Step 2: Run the Container**
```bash
docker run -d \
  -p 3000:3000 \
  -v ./data:/app/data \
  -v ./output:/app/output \
  -e NODE_ENV=production \
  --name openspeech \
  ghcr.io/binuengoor/openspeech:latest
```

**Step 3: Access the Application**
Open your browser and navigate to `http://localhost:3000`

### Option 2: Using Docker Compose

**Step 1: Create `docker-compose.yml`**
```yaml
services:
  openspeech:
    image: ghcr.io/binuengoor/openspeech:latest
    container_name: openspeech
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ./output:/app/output
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**Step 2: Start the Service**
```bash
docker-compose up -d
```

### Option 3: Build from Source

**Step 1: Clone the Repository**
```bash
git clone https://github.com/binuengoor/OpenSpeech.git
cd OpenSpeech
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Configure Settings**
Copy the example settings file:
```bash
cp data/settings.example.json data/settings.json
```

**Step 4: Start the Application**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage Guide

### Initial Configuration

1. **Open Settings**: Click the ⚙️ settings icon in the sidebar
2. **Enter API Key**: Add your OpenAI API key
3. **Select Service Type**: Choose OpenAI or a custom endpoint
4. **Test Connection**: Verify your settings work correctly
5. **Save Settings**: Your configuration is stored securely

### Converting Text to Speech

1. **Enter Text**: Type or paste your text into the main input area (supports any length)
2. **Select Voice**: Choose from available voices and filter by language if desired
3. **Adjust Speed**: Set playback speed between 0.25x and 4.0x
4. **Choose Format**: Select your preferred audio format (MP3, Opus, AAC, etc.)
5. **Enable Stitching**: Toggle "Combine audio chunks" for seamless long-form audio
6. **Generate**: Click "Generate Speech" and wait for processing
7. **Play/Download**: Use the built-in player or download the audio file

### Document Upload

1. **Click Upload Button**: Located above the text input area
2. **Select File**: Choose a .docx or .pdf document
3. **Automatic Extraction**: Text is extracted and populated in the input field
4. **Generate Speech**: Follow the standard text-to-speech workflow

### Storage Management

Monitor your storage usage in the sidebar:
- View used space and file count
- Set maximum storage limits
- Enable automatic cleanup when threshold is reached
- Manually delete individual files or clear all at once

## Configuration Options

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

- **Custom Endpoints**: Use OpenAI-compatible TTS services
- **Storage Limits**: Prevent disk space issues with configurable limits
- **Auto-Cleanup**: Automatically remove old files when storage threshold is reached
- **Administrator Locks**: Lock certain settings to prevent user modification

## Technical Details

**Architecture**
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript with modern CSS
- **Audio Processing**: FFmpeg for format conversion and concatenation
- **Document Parsing**: Mammoth (DOCX) and pdf-parse (PDF)
- **Storage**: Local file system with metadata tracking

**Multi-Platform Support**
- Docker images built for both **linux/amd64** and **linux/arm64**
- Compatible with Intel/AMD and ARM-based systems (including Apple Silicon)
- All dependencies are pure JavaScript or have pre-built binaries

**Security Features**
- Secure API key storage
- Environment variable protection
- Sensitive data excluded from version control
- Production-ready with NODE_ENV optimizations

## Example Workflow

**Scenario**: Converting a 10,000-character article to speech

1. Paste your article into the text input
2. System automatically detects it will be split into ~3 chunks
3. Select "Alloy" voice with 1.0x speed
4. Choose MP3 format
5. Enable "Combine audio chunks"
6. Click "Generate Speech"
7. OpenSpeech processes each chunk and stitches them together
8. Play the seamless audio directly in the browser or download for offline use

## Additional Information

**Requirements**
- Docker (recommended) or Node.js 18+
- OpenAI API key with TTS access
- FFmpeg (included in Docker image)
- Modern web browser

**Browser Compatibility**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Performance**
- Chunk processing: ~2-5 seconds per chunk
- Audio stitching: ~1-2 seconds for typical files
- Storage-efficient with automatic cleanup options

**Customization**
- Adjust chunk size for different use cases
- Modify audio quality settings
- Configure storage policies
- Set default voice and speed preferences

## Troubleshooting

**API Key Issues**
- Verify your OpenAI API key has TTS access
- Check for proper key format (starts with `sk-`)
- Test connection using the built-in connection test

**Storage Problems**
- Monitor storage usage in the sidebar
- Enable automatic cleanup to prevent disk full errors
- Manually delete old files from the file management panel

**Audio Quality**
- Use higher bitrate formats (FLAC, WAV) for best quality
- Adjust speed settings for better comprehension
- Test different voices to find the best match for your content

## Future Enhancements

- Support for additional TTS providers (Azure, Google Cloud)
- Batch processing for multiple documents
- Audio editing and trimming capabilities
- Playlist creation and management
- API endpoint for programmatic access

---

Transform your text into professional-quality speech with OpenSpeech. Deploy in minutes, customize to your needs, and enjoy unlimited text-to-speech conversion on your own infrastructure. Get started today! 🎙️
