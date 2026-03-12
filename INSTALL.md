# Installation

## Prerequisites

- macOS (tested) or Linux
- [Homebrew](https://brew.sh/) (macOS)
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)

## Step 1: System Dependencies

```bash
brew install node python@3.13 weasyprint yt-dlp pipx
```

| Tool | Purpose |
|------|---------|
| `node` | Runs the md-to-pdf converter (convert.mjs) |
| `python@3.13` | Required by pipx and weasyprint |
| `weasyprint` | HTML to PDF conversion engine |
| `yt-dlp` | YouTube video search for scholar research |
| `pipx` | Runs `youtube-transcript-api` in isolation |

## Step 2: Python Tool

```bash
pipx install youtube-transcript-api
```

This fetches YouTube video transcripts for contemporary scholar research (Nouman Ali Khan, Yasir Qadhi, etc.).

## Step 3: Node Dependencies

```bash
cd .claude/skills/md-to-pdf && npm install && cd -
```

Installs `marked` (Markdown to HTML parser).

## Step 4: Fonts

The PDF converter uses Nastaleeq fonts for Urdu/Arabic text. Install at least one:

**Option A — Jameel Noori Nastaleeq (recommended):**
Download from [UrduJahan](https://urdujahan.com/fonts/jameel-noori-nastaleeq/) and install the `.ttf` file.

**Option B — Noto Nastaliq Urdu (fallback):**
```bash
brew install --cask font-noto-nastaliq-urdu
```

> The converter falls back through: Jameel Noori Nastaleeq → Noto Nastaliq Urdu → DecoType Nastaleeq Urdu

## Verify Installation

```bash
node --version          # v18+ required
weasyprint --version    # any recent version
yt-dlp --version        # any recent version
pipx run youtube-transcript-api --help  # should show usage
```

## Usage

Once installed, use Claude Code in this directory:

```
/recite 2:255        # Explore Ayat al-Kursi
/recite 24:35        # Explore Ayat an-Noor
/recite light verse  # Search by topic
```

This launches a dual-scholar exploration, fetches YouTube research, and produces a compiled PDF in `sessions/`.
