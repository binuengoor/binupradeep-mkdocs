---
title: Validate and Manage IPTV M3U Playlists with IPTV Validator
description: A Python-based tool to validate IPTV playlists, extract stream resolutions, and generate clean M3U files.
tags: [IPTV, M3U, Python, LiveTV]
---

# IPTV M3U Validator: A Reliable Tool for Playlist Validation

The **IPTV M3U Validator** is a Python-based utility that helps validate IPTV playlist URLs, check for active streams, and extract useful metadata like resolution and icons. It generates clean, validated `.m3u` files for use with IPTV players, ensuring a seamless streaming experience.

Whether you're managing large playlists or troubleshooting broken links, this tool simplifies the process with live terminal output, detailed logging, and automatic file generation.

**GitHub Repository**: [IPTV-M3U-Validator](https://github.com/binuengoor/IPTV-M3U-Validator)

---

## Key Features

- **Stream Validation**: Check if streams are accessible and playable.
- **Resolution Detection**: Extract video resolutions for valid streams.
- **Icon Support**: Include channel icons in the output `.m3u` file.
- **Detailed Logging**: Generate comprehensive logs for debugging.
- **Terminal Updates**: Live progress updates during validation.
- **Summarized Results**: Quickly see active vs inactive streams.

---

## Installation/Setup

Follow these steps to set up the IPTV M3U Validator:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/binuengoor/IPTV-M3U-Validator.git
   cd IPTV-M3U-Validator
   ```

2. **Create and Activate a Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Install FFmpeg** (if not already installed):
   ```bash
   sudo apt install ffmpeg  # Ubuntu
   brew install ffmpeg      # macOS
   ```

5. **Add IPTV Playlist URLs**:
   Edit the `playlist_urls.txt` file and include your playlist URLs, one per line:
   ```
   https://example.com/playlist1.m3u8
   https://example.com/playlist2.m3u8
   ```

---

## Common Usage/Examples

### Validate a Playlist and Generate Output Files

Run the main script to process your IPTV playlists:
```bash
python iptv_validator.py
```

Example output in the terminal:
```
✅ - Mazhavil Manorama - 1920x1080
❌ - Asianet
✅ - Flowers TV - 1280x720
❌ - Zee Keralam HD
```

### Outputs
- **`valid_streams.m3u`**: Contains validated streams with resolutions and icons.
- **`iptv_validator.log`**: Logs detailed results for troubleshooting.

Example `valid_streams.m3u` content:
```m3u
#EXTM3U
#EXTINF:-1 tvg-logo="https://example.com/icon1.png",Mazhavil Manorama (1920x1080)
https://example.com/mazhavil.m3u8
#EXTINF:-1 tvg-logo="https://example.com/icon2.png",Flowers TV (1280x720)
https://example.com/flowers.m3u8
```

---

## Additional Options/Tips

- **Use Live Icons**: If your playlists include `tvg-logo` attributes, they will be added automatically to the output `.m3u`.
- **Check Logs**: For failed streams or debugging, review `iptv_validator.log`.
- **Customize Timeouts**: Update the `TIMEOUT` variable in the script to adjust request timeouts for slow servers.

### Requirements:
- **Python 3.8+**
- **FFmpeg** for stream analysis.

The IPTV M3U Validator simplifies playlist management, ensures valid streams, and improves the quality of your IPTV experience. Give it a try and see the difference! 🚀