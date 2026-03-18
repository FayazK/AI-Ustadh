# `/discover` Skill Design — Encyclopedic Islamic Knowledge Explorer

**Date:** 2026-03-17
**Status:** Approved

## Purpose

`/discover` is the fact-rich, wonder-building skill for the AI Ustadh project. It fills the gap between `/recite` (academic linguistic analysis) and `/divine` (contemplative message extraction) by providing encyclopedic exploration of any Quranic, Hadith, or Islamic topic — packed with verified hadith, companion narrations, classical scholarly opinions, scientific connections, and contemporary relevance.

**Core principle:** Every section should produce at least one "I didn't know that!" moment.

## Input Scope

- Quranic verse/surah: `/discover 97:1-5`, `/discover Surah Al-Qadr`
- Hadith: `/discover the Hadith of Jibreel`
- Islamic concept: `/discover Laylatul Qadr`, `/discover the concept of Qadr`
- Historical event: `/discover the story of Khidr`, `/discover the Battle of Badr`
- Thematic: `/discover angels in Islam`, `/discover signs of the Day of Judgment`

## Output Language

Scholarly Urdu. Arabic terms, scholar names, scientific terminology, book titles, and URLs in original form.

## 7 Sections

1. **مقدمہ — Introduction & Context** — Set the scene, build awe
2. **قرآنی بنیاد — Quranic Foundation** — All relevant ayat, 3+ translations, cross-references
3. **احادیث و روایات — Hadith & Narrations** — Verified hadith with grading, companion stories, historical incidents
4. **علمائے کرام کی آراء — Scholarly Opinions** — Classical + contemporary, differing views presented fairly
5. **سائنس اور جدید تحقیق — Science & Modern Research** — Scientific connections, peer-reviewed studies
6. **آج کی دنیا میں — Contemporary Relevance** — Current events, technology, social issues
7. **خلاصہ و حوالہ جات — Summary & References** — Key takeaways, all sources

## Research Phase (3-pronged)

1. YouTube transcripts — 9 scholars (Nouman Ali Khan, Omar Suleiman, Hamza Yusuf, Dr. Israr Ahmed, Yasir Qadhi, Mufti Menk, Abdul Nasir Jangda, Furqan Qureshi, Mufti Tariq Masood)
2. WebSearch — scientific studies, current events, historical context
3. Hadith verification — sunnah.com, quran.com, islamweb.net

## Directory Structure

```
sessions/YYYY-MM-DD-discover-[name]/
  research/
    <scholar-name>.txt (transcripts)
    hadith-verification.md
    scientific-research.md
    current-events.md
    index.md
  parts/
    00-header.md
    01-introduction.md
    02-quranic-foundation.md
    03-hadith-narrations.md
    04-scholarly-opinions.md
    05-science-research.md
    06-contemporary-relevance.md
    07-summary-references.md
  session.md
  session.pdf
```

## Adaptive Length

- Narrow topic: ~250-350 lines
- Medium topic: ~400-500 lines
- Broad topic: ~500-700 lines

## What `/discover` is NOT

- NOT contemplative/spiritual (that's `/divine`)
- NOT linguistic/rhetorical (that's `/recite`)
- Does NOT present single scholarly voice — shows multiple opinions including disagreements
- Does NOT fabricate hadith or scientific claims
- Marks weak/fabricated hadith clearly when mentioned
