---
title: Image Optimizer for Web (WebP)
description: A Python tool that converts images to WebP format with optimized compression settings for web use. WebP offers superior compression while maintaining high image quality, making it ideal for websites and web applications.
tags: [python, image, optimize, compression]
---

# WebP Image Optimizer: Efficient Image Compression for the Web

The WebP Image Optimizer is a powerful Python tool designed to convert and optimize images for web use through the WebP format. This tool significantly reduces image file sizes while maintaining visual quality, making it perfect for optimizing website performance and reducing bandwidth usage.

**GitHub Repository**: [Image-Optimizer-for-Web](https://github.com/binuengoor/Image-Optimizer-for-Web)

## Key Features

**Conversion Capabilities**
- Supports multiple input formats (PNG, JPG, JPEG, TIFF, BMP, GIF, WEBP)
- Preserves PNG transparency
- Offers three optimization levels for different use cases

**Quality Presets**
| Mode | Quality | Best For |
|------|---------|----------|
| 1 | 80% | General web usage |
| 2 | 90% | Photography/Art |
| 3 | 60% | Maximum savings |

## Installation

First, ensure Python 3.6 or higher is installed on your system. Then:

```bash
# Clone the repository
git clone https://github.com/binuengoor/Image-Optimizer-for-Web

# Install dependencies
pip install -r requirements.txt
```

The script requires a specific directory structure:
```
Image-Optimizer-for-Web/
├── input/
├── output/
├── script.py
├── requirements.txt
├── Readme.md
└── LICENSE
```

## Common Usage

Basic usage is straightforward:

```python
# Place images in input directory
# Run the script
python script.py

# Select compression mode (1-3)
# Converted images appear in output directory
```

Example output:
```
Select compression mode:
1. Balanced Mode (80% quality) - Recommended
2. High Quality (90% quality)
3. Maximum Compression (60% quality)
Enter mode (1-3): 1

Converting images...
image1.jpg → image1.webp
image2.png → image2.webp
Conversion complete! Check the output folder.
```

## Additional Tips

- For genral usage, use Mode 1 (80%) for a good balance between quality and size.
- Use Mode 2 (90%) for photography portfolios where quality is crucial
- Mode 3 (60%) works well for thumbnails and preview images
- The script automatically creates output directories if they don't exist
- Original filenames are preserved with only the extension changed to .webp