# AI Ustadh

AI-powered deep Quranic verse exploration through scholarly dialogue. Two AI scholars — **Ali** (classical linguistics and tafseer) and **Omar** (philosophy and contemporary application) — conduct a structured 9-stage analysis of any Quranic ayah, enriched with YouTube research from contemporary scholars like Nouman Ali Khan and Yasir Qadhi.

The output is a comprehensive Urdu research document compiled into a beautifully formatted RTL PDF.

## What It Does

When you run `/recite 24:35`, here's what happens:

1. **Identifies the verse** — resolves your input to Surah An-Noor, Ayah 35 (Ayat an-Noor / The Verse of Light)
2. **Fetches YouTube research** — searches for lectures by Nouman Ali Khan, Yasir Qadhi, Omar Suleiman, Hamza Yusuf, and Mufti Menk, then downloads and analyzes their transcripts
3. **Scholar Ali explores** (3 sequential stages):
   - Stages 1-3: Verse identification, root word analysis, context and shan-e-nazool
   - Stages 4-6: Classical tafseer (9+ major tafaseers), hadith correlation, rhetorical analysis (balagha)
   - Stages 7-9: Scientific lens, application across eras, personal and communal reflection
   - Poses 5 deep questions for Omar
4. **Scholar Omar responds** (3 sequential stages):
   - Same 9 stages from a philosophical/contemporary perspective, engaging with Ali's analysis
   - Answers Ali's questions, poses 5 questions back, raises unresolved questions for the reader
5. **Synthesizes** — agreements, disagreements, deepest insights, contemporary relevance
6. **Compiles** all parts into a single markdown file and generates a formatted PDF

## Example Output

The included session `sessions/2026-03-11-an-noor-35/` explores Ayat an-Noor (24:35) — "Allah is the Light of the heavens and the earth..." — producing:

- **2,300+ lines** of scholarly Urdu analysis
- **9 stages** explored by each scholar (18 total perspectives)
- **6 YouTube transcripts** analyzed (4 Nouman Ali Khan, 2 Yasir Qadhi)
- **9+ classical tafaseers** compared (Ibn Kathir, Tabari, Razi, Qurtubi, Zamakhshari, Mawdudi, Qutb, Tabatabai, Ibn Ashur)
- Root word analysis, hadith correlations, balagha (rhetorical) breakdown
- Contemporary application to AI, mental health, education, environmentalism, interfaith dialogue

## Getting Started

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/AI-Ustadh.git
cd AI-Ustadh
```

### 2. Install

See [INSTALL.md](INSTALL.md) for full details, or run:

```bash
# System tools
brew install node python@3.13 weasyprint yt-dlp pipx

# YouTube transcript fetcher
pipx install youtube-transcript-api

# Node dependencies
cd .claude/skills/md-to-pdf && npm install && cd -
```

You'll also need a Nastaleeq font — see [INSTALL.md](INSTALL.md) for options.

### 3. Use

Open Claude Code in the project directory and run:

```
/recite 24:35
```

Other input formats:

```
/recite 2:255              # by surah:ayah number
/recite 2:255-257           # ayah range
/recite Ayat al-Kursi       # by name
/recite the verse about light   # by topic
```

The session will be created in `sessions/YYYY-MM-DD-surah-name-ayah/` with the final PDF ready for reading or printing.

## Session Structure

```
sessions/2026-03-11-an-noor-35/
  parts/
    00-header.md              # Title, date, translation
    01-ali-stages-1-3.md      # Ali: Identification, Root Words, Context
    02-ali-stages-4-6.md      # Ali: Tafseer, Hadith, Balagha
    03-ali-stages-7-9.md      # Ali: Science, Application, Reflection
    04-ali-questions.md       # Ali: 5 questions for Omar
    05-omar-stages-1-3.md     # Omar: Identification, Root Words, Context
    06-omar-stages-4-6.md     # Omar: Tafseer, Hadith, Balagha
    07-omar-stages-7-9.md     # Omar: Science, Application, Reflection
    08-omar-dialogue.md       # Omar: Responses, counter-questions, unresolved questions
    09-synthesis.md           # Agreements, disagreements, key insights
    10-references.md          # All references compiled
  research/                   # YouTube transcripts (auto-fetched)
  session.md                  # All parts compiled
  session.pdf                 # Final formatted PDF (RTL, Nastaleeq)
```

## Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) with an active Anthropic API key
- macOS (tested) or Linux
- Node.js 18+, Python 3.11+, weasyprint, yt-dlp, pipx
- A Nastaleeq font installed (see [INSTALL.md](INSTALL.md))

## License

This project is for personal Quranic study and research.
