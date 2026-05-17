# AI Ustadh

AI-powered deep Quranic exploration through Claude Code skills. Distinct modes — `/noor`, `/divine`, `/discover`, `/tadabbur`, `/recite`, `/fahm`, and `/research` — each approach the Quran from a different angle, backed by YouTube scholar transcripts, hadith verification, and scientific research.

- **`/noor`**: Quranic storytelling for kids (uses analogies like baking cakes or Lego blocks to explain deep truths).

All output is in Urdu, compiled into beautifully formatted RTL PDFs with Nastaleeq typography.

## Skills

### `/divine [verse or theme]` — Layered Meaning Exploration

Deep conceptual exploration focused purely on Allah's message — no linguistics, no tafseer methodology — just 7 layers of meaning extraction with contemporary application.

```
/divine 97:1-5
/divine Surah Al-Kahf
/divine the concept of light in the Quran
```

**What it produces:**

1. Fetches research via the `/research` skill
2. Explores 7 conceptual layers: surface meaning, historical context, spiritual depth, universal principles, contemporary mirrors, living application, and personal reflection
3. Compiles into markdown and PDF

**Output structure:**
```
sessions/2026-03-15-divine-al-kahf/
  parts/
    00-header.md                # Title, date, verse text
    01-overview-layers-1-3.md   # Surface, historical, spiritual layers
    02-layers-4-5.md            # Universal principles, contemporary mirrors
    03-layer-6-living-ayah.md   # Living application today
    04-layer-7-reflection.md    # Personal reflection and contemplation
    05-references.md            # All references compiled
  session.md
  session.pdf
```

---

### `/discover [topic]` — Encyclopedic Islamic Knowledge

Broad, encyclopedic exploration of any Quranic verse, hadith, Islamic concept, historical event, or theme. Packed with verified hadith, companion narrations, scholarly opinions (classical and contemporary), scientific connections, and modern relevance.

```
/discover olive oil in Islam
/discover sabr and shukr
/discover Laylatul Qadr
```

**What it produces:**

1. Fetches research via the `/research` skill
2. Builds 7 sections: introduction, Quranic foundation, hadith narrations (with full chain verification), scholarly opinions, scientific research, contemporary relevance, and summary
3. Compiles into markdown and PDF

**Output structure:**
```
sessions/2026-03-18-discover-olive-oil/
  parts/
    00-header.md                  # Title, date
    01-introduction.md            # Topic overview and scope
    02-quranic-foundation.md      # Relevant verses with analysis
    03-hadith-narrations.md       # Verified hadith with chains
    04-scholarly-opinions.md      # Classical and contemporary scholars
    05-science-research.md        # Scientific connections
    06-contemporary-relevance.md  # Modern applications
    07-summary-references.md      # Summary and all references
  session.md
  session.pdf
```

---

### `/tadabbur [verse, surah, event, concept]` — Deep Investigative Exploration

Relentless "why, how, when, what" questioning delivered as a unified scholarly lecture. One brilliant voice that has absorbed every tafseer and scholarly opinion — investigating word choices, structure, placement, and meaning through spiraling questions where every answer raises a new question.

```
/tadabbur 103:1-3
/tadabbur Surah Al-Asr
/tadabbur wahi to the honey bee
/tadabbur Solomon and the ant
```

**What it produces:**

1. Fetches research via the `/research` skill (all four types)
2. Builds 6 parts through a question-driven spiral: context, investigation (the heart — 40-50% of output), connections across the Quran, hidden depths, living message, and references
3. Investigation spirals freely — every answer raises a new question, root analysis only where it serves the argument
4. Compiles into markdown and PDF

**Output structure:**
```
sessions/2026-04-01-tadabbur-surah-al-asr/
  parts/
    00-header.md                  # Title, date, anchor reference
    01-context.md                 # What is this about and why does it matter?
    02-investigation.md           # Why these words, this structure, this order? (LONGEST)
    03-connections.md             # How does this connect across the Quran?
    04-depths.md                  # What's hidden beneath the surface?
    05-living-message.md          # What does this demand from us today?
    06-references.md              # Quranic refs, hadith refs, web sources
  session.md
  session.pdf
```

---

### `/recite [ayah, range, or passage]` — Structured Ayah-by-Ayah Study Guide

Textbook-style Urdu study companion. Every ayah in the passage gets the **same fixed template**: Arabic from quran.com, word-by-word Urdu translation, smooth Urdu translation (Mufti Taqi Usmani — *آسان ترجمۂ قرآن*), root word analysis, a unified tafseer paragraph synthesizing classical and contemporary scholarship, and asbab al-nuzul. The passage closes with a one-page Urdu summary. All output is in scholarly Urdu.

```
/recite 2:255-257
/recite Surah al-Ikhlas
/recite Ayat al-Kursi
/recite the last 10 verses of al-Kahf
```

**What it produces:**

1. Resolves the input to an explicit ayah list (warns at 20+ ayahs).
2. Fetches research via the `/research` skill (reuses if already cached).
3. Pulls Arabic + word-by-word + Khattab translation from quran.com per ayah.
4. Dispatches one parallel agent per ayah to fill the fixed six-section template.
5. Writes a final passage-wide summary covering meaning, lessons, purpose, and revelation context.
6. Compiles into markdown and PDF.

**Output structure:**
```
sessions/2026-04-28-recite-al-baqarah-255-257/
  parts/
    00-header.md                   # Title, date, ayah list, anchor link
    01-ayah-2-255.md               # Fixed 6-section template
    02-ayah-2-256.md               # Same template, applied uniformly
    03-ayah-2-257.md               # Same template, applied uniformly
    99-summary.md                  # One-page passage summary
  session.md
  session.pdf
```

The point of `recite` is **parallel structure** — predictable depth on every ayah, scannable for study and recitation. For varying-depth investigation use `/tadabbur`; for a single-ayah deep dive use `quran-explorer`.

---

### `/research [topic]` — Centralized Research Gathering

Gathers exhaustive source material into a shared `research/` directory. Fetches YouTube transcripts from 11+ scholars, current world news, hadith verification, and scientific research. Called directly or automatically by the other skills.

```
/research olive oil in Islam
/research patience in the Quran
```

**What it produces:**

```
research/
  topic-aliases.md              # Maps aliases to canonical topic keys
  olive-oil/
    index.md                    # Master index with metadata
    transcripts/                # YouTube scholar transcripts
      nouman-ali-khan-1.txt
      yasir-qadhi-1.txt
      ...
    web/
      current-events.md         # World news snapshot
      hadith-verification.md    # Hadith authentication
      scientific-research.md    # Scientific studies
```

Research is deduplicated — if a topic already has research, other skills reuse it instead of re-fetching.

---

### `quran-explorer` (internal)

Framework for deeply analyzing Quranic verses across 9 stages (linguistics, context, tafseer, hadith, rhetoric, science, application, reflection). Reference framework — not invoked directly.

### `md-to-pdf` (internal)

Converts markdown files to clean RTL PDFs with Nastaleeq font support. Used by all skills to produce final output — not typically invoked directly.

## Scholarly Sources

All skills draw on a broad, multi-disciplinary range of scholars:

- **Nouman Ali Khan** — Root word analysis, Arabic rhetoric, nazm (Bayyinah Institute)
- **Dr. Yasir Qadhi** — Long-form surah tafseer, Western academic + traditional blend
- **Dr. Omar Suleiman** — Social justice, spirituality, contemporary relevance (Yaqeen Institute)
- **Hamza Yusuf** — Classical Islamic thought, philosophy, Western intellectual tradition
- **Mufti Menk** — Accessible tafseer and general Islamic guidance
- **Shaykh Abdul Nasir Jangda** — Seerah-informed tafseer (Qalam Institute)
- **Ustadha Taimiyyah Zubair** — Word-for-word linguistic breakdowns, root word analysis
- **Furqan Qureshi** — Encyclopedic Urdu content, scientific connections, hadith stories
- **Mufti Tariq Masood** — Hadith-heavy lectures, narrator chain discussions
- **Dr. Israr Ahmed** — Philosophical, structured nazm methodology (Farahi-Islahi school)
- **Dr. Mustafa Khattab** — *The Clear Quran*, modern English translation
- And several more academic and classical scholars

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

Open Claude Code in the project directory and run any skill:

```
/divine 97:1-5             # layered meaning exploration
/discover Laylatul Qadr    # encyclopedic topic exploration
/tadabbur Surah Al-Asr     # deep investigative exploration
/research olive oil        # gather research material
```

All input formats work across skills:

```
/divine 2:255              # by surah:ayah number
/divine 2:255-257          # ayah range
/divine Ayat al-Kursi      # by name
/discover sabr and shukr   # by topic/concept
/tadabbur wahi to the bee  # by topic/concept
```

Sessions are created in `sessions/YYYY-MM-DD-<skill>-<topic>/` with the final PDF ready for reading or printing.

## Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) with an active Anthropic API key
- macOS (tested) or Linux
- Node.js 18+, Python 3.11+, weasyprint, yt-dlp, pipx
- A Nastaleeq font installed (see [INSTALL.md](INSTALL.md))

## License

This project is for personal Quranic study and research.
