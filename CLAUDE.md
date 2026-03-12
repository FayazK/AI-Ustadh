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

## Scholarly Sources

The project draws on a broad, multi-disciplinary range of scholars and researchers. All skills should integrate their perspectives where relevant.

### Contemporary Tafseer & Accessible Scholarship
- **Nouman Ali Khan** — Bayyinah Institute; root word analysis, Arabic rhetoric, nazm (Farahi-Islahi school)
- **Dr. Israr Ahmed** (1932–2010) — Urdu Dars-e-Quran; philosophical, structured, nazm methodology (Farahi-Islahi school)
- **Shaykh Abdul Nasir Jangda** — Qalam Institute; Seerah-informed tafseer, accessible and deeply spiritual
- **Dr. Yasir Qadhi** — Long-form surah tafseer series; blends Western academic and traditional Islamic approaches
- **Dr. Omar Suleiman** — Yaqeen Institute; social justice, spirituality, contemporary relevance
- **Hamza Yusuf** — Classical Islamic thought, philosophy, Western intellectual tradition
- **Mufti Menk** — Accessible tafseer and general Islamic guidance
- **Ustadha Taimiyyah Zubair** — Word-for-word linguistic breakdowns, root word analysis (Al Huda, Bayyinah, Yaqeen)

### Translation & Accessibility
- **Dr. Mustafa Khattab** — *The Clear Quran*; modern English that captures nuance, emotion, and historical context
- **M.A.S. Abdel Haleem** — SOAS; critiques literalist translations, focuses on idiomatic and contextual accuracy

### Tafsir & Classical Scholarship (Modern Bridges)
- **Shaykh Sohaib Saeed** — Ibn 'Ashur Centre for Quranic Studies; translates classical works (e.g., Razi), teaches classical exegesis methodology

### Linguistic & Literary Analysis
- **Mustansir Mir** — Introduced nazm (thematic coherence/literary structure) to Western academia

### Western Academic & Historical-Critical Research
- **Angelika Neuwirth** — Corpus Coranicum project; Meccan surahs as oral/liturgical events in Late Antique context
- **Nicolai Sinai** — *The Qur'an: A Historical-Critical Introduction*; literary/structural analysis, theological development
- **Carl W. Ernst** — *How to Read the Qur'an*; ring composition and structural methods

### Contemporary Ethics & Reformist Hermeneutics
- **Khaled Abou El Fadl** — Islamic law and Quranic ethics; linguistic analysis countering puritanical interpretations
- **Amina Wadud** — *Qur'an and Woman*; Islamic feminist hermeneutics, egalitarian readings of the Arabic text
- **Asma Barlas** — *"Believing Women" in Islam*; argues patriarchal interpretations stem from human bias, not the text

## Guidelines

- Always cite authentic sources with proper references
- Never fabricate hadith, tafseer quotes, or scholarly opinions
- When uncertain about a reference, state the limitation clearly
- Use WebSearch to verify references from sunnah.com, quran.com, altafsir.com, islamweb.net
- Integrate perspectives from the scholars listed above across linguistic, classical, academic, and contemporary dimensions
