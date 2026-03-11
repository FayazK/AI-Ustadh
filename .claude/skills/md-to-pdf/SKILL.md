---
name: md-to-pdf
description: Use when converting a markdown file to a clean, formatted PDF with Urdu Nastaleeq font support. Triggered by requests to export, convert, or generate PDF from markdown session files or any .md document.
---

# Markdown to PDF Converter

## Overview

Converts markdown documents to professionally formatted PDFs with RTL Nastaleeq font support for Urdu/Arabic text. Uses `marked` (MD→HTML) + `weasyprint` (HTML→PDF).

## When to Use

- User asks to convert a `.md` file to PDF
- After a `/recite` session, to export the saved session as PDF
- Any request to "export", "generate PDF", "save as PDF" from markdown

## Quick Reference

```bash
# Basic conversion (saves PDF next to the .md file)
node .claude/skills/md-to-pdf/convert.mjs path/to/file.md

# Custom output path
node .claude/skills/md-to-pdf/convert.mjs path/to/file.md --output /custom/path/output.pdf

# Custom primary font
node .claude/skills/md-to-pdf/convert.mjs path/to/file.md --font "Noto Nastaliq Urdu"
```

## Prerequisites

| Dependency | Install |
|-----------|---------|
| Node.js | Already available |
| weasyprint | `brew install weasyprint` |
| marked | Auto-installed via dynamic import |
| Jameel Noori Nastaleeq font | Download from UrduJahan.com or install via `brew install --cask font-jameel-noori-nastaleeq` if available. Falls back to Noto Nastaliq Urdu (pre-installed on macOS) |

## Font Fallback Chain

1. **Jameel Noori Nastaleeq** (preferred — classic Urdu typesetting)
2. **Noto Nastaliq Urdu** (pre-installed on macOS — good quality)
3. **DecoType Nastaleeq Urdu** (pre-installed on macOS — fallback)

## PDF Formatting

- **Page size:** A4 with 2cm/2.5cm margins
- **Direction:** RTL with right-aligned text
- **Headings:** Dark green (#1a472a) with gold-brown (#d4a574) borders
- **Tables:** Striped rows, green header
- **Code blocks:** LTR direction, monospace font, light background
- **Blockquotes:** Right-bordered (RTL), light background
- **Page numbers:** Centered at bottom

## Common Mistakes

- Running without `weasyprint` installed — install via `brew install weasyprint`
- Jameel Noori Nastaleeq not installed — PDF still works with Noto Nastaliq Urdu fallback, but install the font for best results
- Very large documents may take longer — weasyprint has a 2-minute timeout
