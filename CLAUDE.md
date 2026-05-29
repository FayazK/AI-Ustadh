# AI Ustadh — Quranic Exploration Project

## Project Overview

This project provides deep, multi-layered Quranic verse exploration through AI-assisted scholarly dialogue.

## Commands

- `/noor [topic] age [N]` — Quranic exploration for children through storytelling and imaginative analogies, compiled into a PDF.
- `/divine [verse-reference or theme]` — Deep conceptual exploration of a Quranic verse or theme, focused on Allah's message through 7 layers of understanding, compiled into a PDF.
- `/discover [topic]` — Encyclopedic exploration of any Quranic verse, hadith, Islamic concept, or theme. Packed with verified hadith, companion narrations, scholarly opinions, scientific connections, and contemporary relevance — compiled into a PDF.
- `/research [topic]` — Gather exhaustive research on any Quranic verse, hadith, or Islamic concept. Fetches YouTube scholar transcripts, world news, hadith verification, and scientific research into a shared `research/` directory. Called directly for deep research, or internally by other skills.
- `/tadabbur [verse, surah, event, concept, or topic]` — Deep investigative exploration through relentless "why, how, when, what" questioning, delivered as a unified scholarly lecture — compiled into a PDF.
- `/recite [ayah, range, or passage]` — Structured ayah-by-ayah study guide entirely in Urdu. For each ayah: Arabic from quran.com, word-by-word Urdu translation, smooth Urdu translation (Mufti Taqi Usmani — Asaan Tarjuma), root word analysis, unified tafseer synthesis, and asbab al-nuzul. Closes with a passage-wide Urdu summary — compiled into a PDF.
- `/quran-deep-research [ayah, range, short surah, event, or topic]` — Ultra-detailed Urdu knowledge dossier covering all seven layers in one document (translation/intro → roots → context/rhetoric → classical+modern scholars → morals/fiqh → historical impact → multi-lens). The "kitchen-sink" skill — for when the user wants every dimension at once instead of choosing a lens. Compiled into a PDF.
- `/podcast [topic]` — Long-form Urdu podcast transcript: a host (طالبِ علم) interviews two virtual Aalims — عالمِ اصول (classical Quran/hadith/history) and عالمِ عصر (contemporary application + myth-busting) — across authentic foundation, dual-level deep knowledge, historical journey, modern relevance, false-but-popular beliefs, and emergent Q&A. Simple Urdu, scaled to a 1–3 hour episode, compiled into a PDF.

## Skills

- `quran-explorer` — Framework for deeply analyzing Quranic verses across 9 stages (linguistics, context, tafseer, hadith, rhetoric, science, application, reflection)
- `divine` — Layered conceptual exploration of Quranic verses/themes focused on the divine message (no linguistics or tafseer methodology), with contemporary application
- `discover` — Encyclopedic Islamic knowledge explorer: verified hadith, companion stories, scholarly opinions (classical + contemporary), scientific connections, and modern relevance
- `research` — Centralized research gathering: YouTube transcripts from 11+ scholars, world news snapshot, hadith verification, scientific research. Stores in shared `research/` directory keyed by topic. Called by divine/discover/tadabbur to avoid duplicate fetching.
- `tadabbur` — Deep investigative exploration: single unified lecturer voice, relentless questioning (why this word not that, why here, why now), root analysis only where it serves the argument, disagreements as fuel for deeper questions
- `recite` — Structured ayah-by-ayah Urdu study guide: fixed parallel template per ayah (Arabic, word-by-word Urdu, Mufti Taqi Usmani Urdu translation, 3-5 roots, unified tafseer paragraph in Urdu, asbab al-nuzul in Urdu), then a one-page Urdu passage summary
- `quran-deep-research` — Seven-layer ultra-detailed Urdu knowledge document: (1) translation + word-by-word + asbab al-nuzul, (2) root-word lexicon analysis, (3) context + word order + rhetoric, (4) classical + modern scholar opinions with consensus/disagreement, (5) morals + character + spiritual + fiqh, (6) Prophetic era → later Islamic history → modern relevance, (7) scientific / psychological / sociological / philosophical / economic / environmental lenses. Reuses the shared `research/` library.
- `podcast` — Conversational scholarly podcast: recurring cast (host طالبِ علم + two complementary Aalims) over a 10-segment episode (intro → Quran/hadith foundation → dual-level deep dive → historical journey → modern application → myth-busting → emergent Q&A → closing → references). Strictly simple Urdu, 1–3 hour length bands, segment-per-agent pipeline reusing the shared `research/` library, compiled to PDF.
- `md-to-pdf` — Converts markdown files to clean RTL PDFs with Nastaleeq font support

## Directory Structure

- `.claude/skills/` — Skill definitions
- `research/` — Shared research library, organized by topic key:
  ```
  research/
    topic-aliases.md        ← maps aliases to canonical topic keys
    <topic-key>/
      transcripts/          ← YouTube scholar transcripts
      web/                  ← current-events, hadith-verification, scientific-research
      index.md              ← master index with metadata
  ```
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
- **Furqan Qureshi** — Encyclopedic Urdu Islamic content; scientific connections, wonder-building narrations, hadith stories
- **Mufti Tariq Masood** — Urdu; hadith-heavy lectures, detailed narrator chain discussions, practical Islamic guidance

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
