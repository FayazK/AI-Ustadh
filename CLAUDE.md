# AI Ustadh — Quranic Exploration Project

## Project Overview

This project provides deep, multi-layered Quranic verse exploration through AI-assisted scholarly dialogue.

## Commands

- `/recite [verse-reference]` — Launch a dual-scholar exploration of a Quranic verse. Accepts ayah numbers (e.g., `2:255`), ranges (`2:255-257`), names (`Ayat al-Kursi`), or topics.

## Skills

- `quran-explorer` — Framework for deeply analyzing Quranic verses across 9 stages (linguistics, context, tafseer, hadith, rhetoric, science, application, reflection)
- `recite` — Orchestrates two scholar personas (Ali and Omar) exploring a verse together, writing partial files per stage group, then compiling into a final PDF
- `md-to-pdf` — Converts markdown files to clean RTL PDFs with Nastaleeq font support

## Directory Structure

- `.claude/skills/` — Skill definitions
- `sessions/` — Exploration sessions, each in its own directory:
  ```
  sessions/YYYY-MM-DD-surah-name-ayah/
    parts/          ← Partial MD files (00-header through 10-references)
    session.md      ← Compiled from all parts
    session.pdf     ← Final PDF output
  ```

## Guidelines

- Always cite authentic sources with proper references
- Never fabricate hadith, tafseer quotes, or scholarly opinions
- When uncertain about a reference, state the limitation clearly
- Use WebSearch to verify references from sunnah.com, quran.com, altafsir.com, islamweb.net
