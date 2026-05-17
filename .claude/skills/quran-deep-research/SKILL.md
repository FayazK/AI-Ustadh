---
name: quran-deep-research
description: >
  Use this skill whenever the user wants a deep, layered, research-backed Urdu knowledge document
  about one or more Quranic Ayahs, a short Surah, a Quranic event, or a Quranic topic. Triggers
  include phrases like "Ayah ka tafseel", "deep research on Ayah", "Quran knowledge document",
  "explain this Ayah in depth", "surah analysis", "Quranic event research", or any request that
  asks for multi-layered Islamic scholarly analysis of Quran content — and the slash command
  `/quran-deep-research`. Always use this skill — do not attempt to answer Quran deep-research
  requests without it, even if the request seems simple. The output document is always in Urdu.
---

# Quran Deep Research — مکمل گہری تحقیق

## Overview

Produces a **multi-layer, ultra-detailed, research-backed Urdu document** on any Quranic Ayah,
range of Ayahs, short Surah, Quranic event, or topic. The document moves from accessible
simplicity to scholarly depth across **seven defined layers**, then closes with sources and a dua.

## How this differs from other skills

| Skill | Lens | Output style |
|---|---|---|
| `recite` | Parallel ayah-by-ayah template (6 fixed fields) | Study guide |
| `fahm` | Multi-round learner↔scholar dialogue → NAK-style narrative | Documentary |
| `divine` | 7 layers of "what does Allah want to tell us?" | Contemplative |
| `discover` | Encyclopedic facts/hadith/science | Encyclopedia |
| `tadabbur` | Single lecturer, relentless "why" questioning | Lecture |
| `quran-explorer` | 9-stage rigorous framework (1 ayah) | Academic |
| **`quran-deep-research`** | **All seven dimensions in one bundle** (translation → roots → context → scholar opinions → morals → historical impact → multi-lens) | **Knowledge document / reference dossier** |

`quran-deep-research` is the **kitchen-sink dossier** — when the user wants *everything* in one
Urdu document instead of choosing a lens. It is the longest skill in the project.

## What this skill IS NOT

- Not a quick summary — depth is the goal, not brevity (expect 3,000–10,000+ Urdu words).
- Not a single-voice lecture (that's `/tadabbur`).
- Not children's storytelling (that's `/noor`).
- Not a parallel template per ayah (that's `/recite`).
- Do not fabricate tafsir positions, hadith, scholar quotes, or scientific claims.
  If a position cannot be verified, write **"مزید تحقیق درکار ہے"** (further research needed).

## Input Format

The user provides one of:
- A single Ayah: `/quran-deep-research 2:255`
- A range: `/quran-deep-research 1:1-7`
- A short Surah: `/quran-deep-research Surah al-Ikhlas`
- A topic or event: `/quran-deep-research Battle of Badr`, `/quran-deep-research tawakkul`

For ambiguous inputs, present 2–3 candidate resolutions and confirm with the user.

---

## Phase 0 — Input Identification

Classify the input as one of:

- **Single Ayah** — e.g., `Al-Baqarah 2:255`
- **Range of Ayahs** — e.g., `Al-Baqarah 2:1–5`
- **Short Surah** — e.g., `Surah Al-Fatiha`, `Surah Al-Ikhlas`
- **Topic or Event** — e.g., `Battle of Badr in Quran`, `Concept of Tawakkul`

For **Topic or Event** inputs, first compile a list of every Quranic Ayah directly tied to it.
Present that list (Surah name + number + ayah number) to the user for verification before
proceeding to research.

Resolve the input to a canonical `<topic-key>` using the same normalization rules as the
`/research` skill (see `research/topic-aliases.md`). Update that aliases file if a new mapping
is created.

---

## Phase 1 — Research Gathering

### 1A — Check Existing Research

Look in `research/<topic-key>/`. If it exists, load:
- `research/<topic-key>/index.md`
- All files under `research/<topic-key>/transcripts/`
- All files under `research/<topic-key>/web/`

If `research/topic-aliases.md` maps the user's input to an existing key, use it. If a Surah-level
key exists for an ayah-range query, prefer that.

### 1B — Dispatch the `research` skill if needed

If research is missing or stale (>30 days for current-events files), invoke `/research <topic>`
to fetch:
- YouTube transcripts (Nouman Ali Khan, Mufti Menk, Dr. Israr Ahmed, Dr. Yasir Qadhi,
  Hamza Yusuf, Omar Suleiman, Mufti Tariq Masood, Taimiyyah Zubair, Furqan Qureshi, etc.)
- Hadith verification (sunnah.com)
- Scientific research (where applicable)
- Current-events relevance

### 1C — Targeted top-up searches

After base research is loaded, do targeted WebSearch/WebFetch for any gap relevant to the
seven layers below. Priority sources are listed in
[references/authentic-sources.md](references/authentic-sources.md).

**Tafsir to consult (Urdu and Arabic):**
- Tafsir Ibn Kathir (تفسیر ابن کثیر)
- Tafsir al-Tabari (جامع البیان)
- Tafsir al-Qurtubi (الجامع لأحکام القرآن)
- Tafsir al-Jalalayn (تفسیر الجلالین)
- Tafsir Maariful Quran — Mufti Shafi Usmani (معارف القرآن)
- Tafhim al-Quran — Maududi (تفہیم القرآن)
- Tafsir Ibn Ashur — al-Tahrir wa al-Tanwir
- Tafsir al-Sa'di (تيسير الكريم الرحمن)
- Ruh al-Ma'ani — al-Alusi
- Fi Zilal al-Quran — Syed Qutb (في ظلال القرآن)
- Asaan Tarjuma-e-Quran — Mufti Taqi Usmani (translation reference)

**Linguistic / root analysis:**
- Lane's Lexicon
- Lisan al-Arab
- Hans Wehr
- corpus.quran.com (morphology + dependency)
- qurananalysis.com

**Hadith & Asbab al-Nuzul:**
- Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami` al-Tirmidhi, Sunan al-Nasa'i,
  Sunan Ibn Majah, Muwatta Malik, Musnad Ahmad — all via sunnah.com
- Asbab al-Nuzul — al-Wahidi
- Lubab al-Nuqul — al-Suyuti
- Tafsir Ibn Abi Hatim

**Contemporary / scientific:**
- Yaqeen Institute, Bayyinah, Qalam Institute
- Zaghloul El-Naggar (scientific tafsir, used cautiously)
- Peer-reviewed sources for any scientific claim — never assert i'jaz beyond what science supports

### 1D — Save a research summary

Save aggregated notes to:
`research/<topic-key>/web/quran-deep-research-notes-YYYY-MM-DD.md`

so future sessions inherit the work.

---

## Phase 2 — Document Generation

Write the final document in **Urdu** (right-to-left when rendered). All headings, body text,
summaries, and analysis are in Urdu. Arabic Ayah text appears in full Arabic script, followed
immediately by Urdu translation. Heading hierarchy: H1 for document title, H2 for each Layer,
H3 for subsections.

Write each layer as a separate file under `sessions/<YYYY-MM-DD>-quran-deep-research-<slug>/parts/`,
then compile.

### File layout

```
sessions/YYYY-MM-DD-quran-deep-research-<slug>/
  parts/
    00-header.md            ← Title, metadata, table of contents
    01-layer-1-translation.md
    02-layer-2-roots.md
    03-layer-3-context.md
    04-layer-4-scholars.md
    05-layer-5-morals.md
    06-layer-6-history.md
    07-layer-7-multilens.md
    08-sources-dua.md
  session.md                ← Compiled (concatenated parts/)
  session.pdf               ← Generated by md-to-pdf skill
```

---

### Layer 1 — ترجمہ اور ابتدائی تعارف (Translation & Basic Introduction)

**1.1 مکمل آیت (Complete Ayah — Arabic)**
Display the exact Arabic text of every Ayah being studied. Source from quran.com or
corpus.quran.com. Do not paraphrase the Arabic.

**1.2 سادہ اردو ترجمہ (Smooth Urdu Translation)**
Natural, flowing Urdu — not word-for-word here. Reference: Mufti Taqi Usmani (آسان ترجمۂ قرآن)
or Maulana Fateh Muhammad Jalandhari. Cite which translator.

**1.3 سادہ انگریزی ترجمہ (Simple English Translation)**
One clean English rendering for cross-reference. Use Dr. Mustafa Khattab (The Clear Quran),
Sahih International, or Abdel Haleem. Cite the translator.

**1.4 لفظ بلفظ ترجمہ — اردو (Word-by-Word Urdu)**
Markdown table:

| عربی لفظ | اردو معنی | English meaning |
|---|---|---|

Cover **every word** of every Ayah being studied.

**1.5 مختصر خلاصہ (Simple Summary)**
3–5 Urdu sentences: what the Ayah/passage says at the most accessible level.

**1.6 نزول کا وقت اور مقام (Time & Place of Revelation)**
- Makki or Madani?
- Approximate year of Prophethood
- State of the Ummah at that time

**1.7 شانِ نزول (Asbab al-Nuzul)**
Every narrated occasion of revelation with chain reference (Sahabi name + hadith source).
If multiple narrations exist, list all and indicate which scholars considered strongest
and which weakest.

---

### Layer 2 — جڑ الفاظ اور لغوی تحقیق (Root Words & Linguistic Deep Dive)

For **every significant Arabic word** in the Ayah(s):

**2.1 جڑ (Root)** — three-letter Arabic root (fi'l thalathi).
**2.2 لغوی معنی (Lexical Meaning)** — full semantic range from Lane's Lexicon and Lisan al-Arab.
Do not collapse to the translation used here; list every shade.
**2.3 قرآن میں استعمال (Usage Across the Quran)** — total occurrence count of the root, the
forms in which it appears, and 2–3 comparison Ayahs.
**2.4 کیوں یہی لفظ؟ (Why This Word?)** — what choosing this word over its synonyms reveals.
Cite any scholarly discussion of the choice.

---

### Layer 3 — سیاق، ترتیب اور گہرا تجزیہ (Context, Word Order & Deep Analysis)

**3.1 سورہ کے اندر سیاق (Context within the Surah)**
What precedes and follows? How does this Ayah connect to the surrounding ones? Which
thematic thread does it continue or open?

**3.2 الفاظ کی ترتیب (Word Order / Syntax)**
Arabic is verb-first by default — where this Ayah fronts or delays a word (taqdim wa
ta'khir), explain the emphasis. Reference grammarians (Sibawayhi, Ibn Hisham) when relevant.

**3.3 بلاغت (Rhetoric & Eloquence)**
Identify and explain rhetorical devices present:
- Iltifat (person shift)
- Tashbih (simile), Isti'ara (metaphor), Kinaya (metonymy)
- Repetition, hazf (omission), tawkid (emphasis)
- Sound patterns, fawasil (verse-end rhythm)

**3.4 کیوں، کیسے، کب — تفصیلی جواب (Why, How, When — Detailed)**
Why this structure? How does form reinforce meaning? When in the chronology of revelation
does this land, and why does that timing matter?

---

### Layer 4 — مفسرین کی آراء (Classical & Contemporary Scholar Opinions)

**4.1 کلاسیکی مفسرین (Classical Tafsir)**
In Urdu, summarise the positions of:
- Ibn Kathir, al-Tabari, al-Qurtubi, al-Zamakhshari (note Mu'tazilite slant), al-Razi, al-Alusi
- Note agreements and disagreements between them.

**4.2 جدید مفسرین (Modern Tafsir)**
- Mufti Shafi Usmani (Maariful Quran)
- Maududi (Tafhim al-Quran)
- Syed Qutb (Fi Zilal al-Quran)
- Nouman Ali Khan, Dr. Israr Ahmed, Hamza Yusuf, Dr. Yasir Qadhi, Omar Suleiman, Abdul Nasir
  Jangda, Taimiyyah Zubair, Mufti Tariq Masood — wherever a relevant lecture exists in
  `research/<topic-key>/transcripts/`.

**4.3 اجماع اور اختلاف (Consensus & Disagreement)**
Where do scholars agree? Where do they differ, and why?

---

### Layer 5 — اخلاق، اسباق اور عملی پہلو (Morals, Lessons & Practical Dimensions)

**5.1 بنیادی اسباق (Core Lessons)** — bullet list of every moral, spiritual insight, or
behavioural guidance the Ayah delivers.
**5.2 کردار سازی (Character Building)** — which virtues this Ayah cultivates and which vices
it warns against.
**5.3 روحانی پہلو (Spiritual Dimension)** — impact on qalb, ahwal, and the relationship
with Allah.
**5.4 فقہی پہلو (Jurisprudential Implications — if applicable)** — rulings derived,
and which madhabs derived what.

---

### Layer 6 — تاریخی اور زمانی اثرات (Historical & Cross-Era Impact)

**6.1 عہدِ نبوی میں اثر (Prophetic Era Impact)** — incidents, Companion reactions,
behavioural changes, or events directly caused/shaped by this Ayah. Name Sahabah and cite
hadith.
**6.2 بعد کے ادوار میں (Later Islamic History)** — influence on Umayyad/Abbasid governance,
Islamic intellectual movements, Sufi orders (if applicable), battles, treaties, political
decisions.
**6.3 آج کے دور میں (Modern World Relevance)** — application to contemporary Muslim
communities, global ethical challenges, governance/economics/justice, and personal 21st-
century life.

---

### Layer 7 — مختلف زاویوں سے نظر (Multi-Lens Analysis)

For each lens, include **only if** the Ayah has genuine relevance. Do not force connections.
If a lens does not apply, state so briefly and move on.

- **7.1 سائنسی زاویہ (Scientific Lens)** — natural phenomena, cosmology, biology, geology.
  Distinguish established science from speculative i'jaz claims.
- **7.2 نفسیاتی زاویہ (Psychological Lens)** — what cognitive/behavioural science says about
  the human tendency the Ayah addresses.
- **7.3 سماجی زاویہ (Sociological Lens)** — collective behaviour, social systems, justice,
  community structure.
- **7.4 فلسفیانہ زاویہ (Philosophical Lens)** — epistemology, metaphysics, ethics, theodicy
  the Ayah engages.
- **7.5 اقتصادی زاویہ (Economic Lens — if applicable)** — wealth, trade, fairness,
  distribution.
- **7.6 ماحولیاتی زاویہ (Environmental / Ecological Lens — if applicable)** — creation,
  stewardship, ecological balance.

---

## Phase 3 — Document Closing

End every document with:

**ماخذ و حوالہ جات (Sources & References)**
Full list of every tafsir, hadith collection, lexicon, lecture, or web source consulted.
Format: `Source/Author — Title — Section/Timestamp/URL`.

**دعا (Closing Dua)**
One short dua in Arabic + Urdu asking Allah for understanding and the tawfeeq to act on
what has been learned.

---

## Phase 4 — Compile and PDF

1. Concatenate `parts/00-header.md` … `parts/08-sources-dua.md` into `session.md`.
2. Invoke the `md-to-pdf` skill on `session.md` to produce `session.pdf`.
3. Report:
   - Number of layers completed (and any skipped, with reasons)
   - Research sources accessed (count of transcripts, web files, top-up searches)
   - Any gaps where verified material was unavailable
   - Final paths of `session.md` and `session.pdf`

---

## Notes for the Executing Agent

- **No hallucination.** If a tafsir position cannot be verified, write
  `مزید تحقیق درکار ہے` rather than inventing.
- **Exact Arabic.** Ayah text must match quran.com / corpus.quran.com exactly.
- **Use existing research first.** Always check `research/<topic-key>/` before fetching.
  This skill should *reuse* the research economy that `/recite`, `/fahm`, `/divine`,
  `/discover`, `/tadabbur` already populate.
- **Voice.** Scholarly but readable Urdu — a knowledgeable teacher speaking to an educated
  reader, not a dry academic.
- **Length.** 3,000–10,000+ words depending on scope. Depth is the goal.
- **Hadith grading.** Mark every hadith صحیح / حسن / ضعیف / موضوع. Never present a weak or
  fabricated narration without flagging it.
- **Scientific claims.** Link to peer-reviewed sources. Never assert i'jaz beyond what
  established science supports.
- **No fabricated scholar opinions.** If you cannot attribute a view to a verifiable
  source, do not invent one.

## Red Flags — STOP and Refocus

- About to write a hadith without checking sunnah.com → stop and verify first.
- About to say "scientists have proven…" without a source → stop and either cite or remove.
- About to attribute an opinion to a scholar without a verifiable source → stop, mark
  `مزید تحقیق درکار ہے`.
- About to skip Layer 2 root analysis because "it's obvious" → no. Every significant word.
- About to write Layer 7 lenses by force-fitting connections → no. State "غیر متعلق" and
  move on.

## Quick Reference — Layer Map

| Layer | Urdu Heading | Focus |
|---|---|---|
| 1 | ترجمہ اور ابتدائی تعارف | Arabic + Urdu/English translations, word-by-word, summary, time/place, asbab al-nuzul |
| 2 | جڑ الفاظ اور لغوی تحقیق | Root, lexical range, Quranic usage, "why this word" |
| 3 | سیاق، ترتیب اور گہرا تجزیہ | Surah context, word order, rhetoric, why/how/when |
| 4 | مفسرین کی آراء | Classical + modern tafsir, consensus & disagreement |
| 5 | اخلاق، اسباق اور عملی پہلو | Lessons, character, spiritual, fiqh implications |
| 6 | تاریخی اور زمانی اثرات | Prophetic era → later Islamic history → modern world |
| 7 | مختلف زاویوں سے نظر | Scientific, psychological, sociological, philosophical, economic, environmental |
