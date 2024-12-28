---
title: yt-dlp Guide
description: A powerful command-line tool for downloading videos from YouTube and other platforms
tags: [youtube, download, terminal, video, audio, streaming]
---

# yt-dlp - Video Download Tool

yt-dlp is a feature-rich command-line program to download videos from YouTube and other video platforms. It offers extensive options for quality selection, format choice, and batch downloading.

## Installation

```bash
# On Windows (using winget)
winget install yt-dlp

# On macOS
brew install yt-dlp

# On Linux
python3 -m pip install -U yt-dlp
```

## Basic Video Downloads

```bash
# Download a single video in best quality
yt-dlp https://www.youtube.com/watch?v=VIDEO_ID

# Download with custom filename
yt-dlp -o "%(title)s.%(ext)s" https://www.youtube.com/watch?v=VIDEO_ID
```

## Quality Selection

```bash
# Download best video+audio quality
yt-dlp -f "bestvideo+bestaudio" https://www.youtube.com/watch?v=VIDEO_ID

# Limit maximum quality to 1080p
yt-dlp -f "bestvideo[height<=1080]+bestaudio" https://www.youtube.com/watch?v=VIDEO_ID

# Download specific format (e.g., 720p)
yt-dlp -f "bestvideo[height=720]+bestaudio" https://www.youtube.com/watch?v=VIDEO_ID
```

## Audio Downloads

```bash
# Extract audio in best quality (default mp3)
yt-dlp -x https://www.youtube.com/watch?v=VIDEO_ID

# Specify audio format
yt-dlp -x --audio-format mp3 https://www.youtube.com/watch?v=VIDEO_ID

# Set audio quality (0 is best, 9 is worst)
yt-dlp -x --audio-format mp3 --audio-quality 0 https://www.youtube.com/watch?v=VIDEO_ID
```

## Playlist Downloads

```bash
# Download entire playlist
yt-dlp https://www.youtube.com/playlist?list=PLAYLIST_ID

# Download specific items from playlist
yt-dlp --playlist-items 1,3,5-7 https://www.youtube.com/playlist?list=PLAYLIST_ID

# Download playlist starting from specific item
yt-dlp --playlist-start 5 https://www.youtube.com/playlist?list=PLAYLIST_ID
```

## Advanced Options

**Output Templates**
```bash
# Save videos in specific directory with custom naming
yt-dlp -o "videos/%(playlist_title)s/%(title)s.%(ext)s" URL

# Include video quality in filename
yt-dlp -o "%(title)s-%(height)sp.%(ext)s" URL
```

**Download Options**
```bash
# Download with subtitles
yt-dlp --write-sub --sub-lang en URL

# Download thumbnail
yt-dlp --write-thumbnail URL

# Extract metadata
yt-dlp --write-info-json URL
```

## Additional Features

- **Rate Limiting**: Control download speed
  ```bash
  yt-dlp --limit-rate 1M URL
  ```

- **Batch Downloads**: Download from text file
  ```bash
  yt-dlp -a urls.txt
  ```

- **Format Selection**: List available formats
  ```bash
  yt-dlp -F URL
  ```

- **Authentication**: For private videos
  ```bash
  yt-dlp --username USER --password PASS URL
  ```