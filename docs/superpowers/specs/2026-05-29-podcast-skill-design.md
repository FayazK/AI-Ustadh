# /podcast — Conversational Scholarly Podcast Skill (Design Spec)

**Date:** 2026-05-29
**Status:** Approved (design), pending implementation
**Command:** `/podcast [topic]`
**Skill dir:** `.claude/skills/podcast/`

---

## 1. Purpose

`/podcast [topic]` produces a long-form **Urdu podcast transcript** (compiled to PDF) of a
recurring scholarly show. A host — **میزبان: طالبِ علم (the Knowledge Seeker)** — interviews
**two virtual Aalims** about any topic the host suggests: an event, an act/practice, a hadith,
an ayah or range of ayat, an Islamic concept, or any related theme.

The episode takes a listener from zero to **near-complete understanding** of the topic:
its authentic basis in Quran and authentic hadith, deep knowledge at both beginner and advanced
levels, its historical journey, how it applies in this era, the false-but-popular beliefs that
people wrongly attribute to Islam, and the natural follow-up questions that arise from the
discussion.

The output reads like a transcript of a real 1–3 hour audio/video podcast — but the **language is
strictly simple, conversational Urdu** throughout, even when the content is advanced.

### What this skill is NOT
- Not a single-voice lecture (that is `/tadabbur`).
- Not an academic ayah-by-ayah study guide (that is `/recite`).
- Not an encyclopedic fact dump (that is `/discover`).
- It is a **two-guest interview**, driven by a relentless, curious, plain-spoken host.

---

## 2. The Cast (recurring across all episodes)

| Role | Label (Urdu) | Lens |
|------|--------------|------|
| Host | **میزبان: طالبِ علم** | The Knowledge Seeker. Drives the conversation with what / why / how / when questions across every field. Asks the simple questions a beginner would, and the sharp ones an advanced listener would. Never lectures; always asks. |
| Aalim 1 | **عالمِ اصول** | Classical lens: Quran, tafseer, hadith sciences + narrator chains, authentic Islamic history. Grounds everything in primary texts. |
| Aalim 2 | **عالمِ عصر** | Contemporary lens: applying the topic today, real modern situations, and debunking false-but-popular beliefs. |

**Decisions locked in design review:**
- Aalims use **descriptive title-personas** (عالمِ اصول / عالمِ عصر), not invented personal names,
  to avoid implying any real named scholar.
- The cast is **recurring** across episodes, so the show feels like a real series.
- Both Aalims have full knowledge; the lenses divide *emphasis*, not capability.
- Where real scholars genuinely differ, the Aalims present that **ikhtilaf** respectfully and
  clearly labelled — never manufacturing disagreement, never contradicting established consensus.

---

## 3. The Hard Authenticity Rule (the spine of the skill)

The personas are a **teaching frame**. Every fact stated by any character must be **real and
sourced**. This rule overrides the conversational style whenever they conflict.

- Hadith are cited with **source AND grade** (صحیح / حسن / ضعیف / موضوع).
- Ayat link to quran.com; hadith link to sunnah.com.
- Real scholarly opinions are **attributed to the real scholar** who holds them, verified via
  WebSearch. (Unlike `/tadabbur`, attribution is *required* here.)
- Never fabricate a hadith, tafseer quote, scholarly opinion, or historical claim.
- When a reference is uncertain or disputed, an Aalim says so openly in-character
  (e.g. "اس بارے میں روایات مختلف ہیں…").
- The myth-busting segment (06) leans on this rule hardest: every "false concept" must be shown
  to be absent from / contradicted by authentic sources, with the authentic position cited.

---

## 4. Episode Structure (the "parts")

Each part is a separate `parts/NN-*.md` file, written by its own agent, then compiled in order.

| # | File | Segment (Urdu) | Purpose |
|---|------|----------------|---------|
| 00 | `00-header.md` | header | Meta: episode title, date, topic, anchor reference, research key, cast intro |
| 01 | `01-intro.md` | تعارف | Host opens the episode, frames the topic and why it matters, introduces the two Aalims |
| 02 | `02-foundation.md` | قرآن و حدیث میں اصل بنیاد | The verified textual foundation — what the Quran and authentic hadith actually say |
| 03 | `03-depth.md` | گہرائی (آسان + عمیق دونوں سطح) | **Longest segment.** Deep dive at *both* levels: beginner-simple AND advanced (language, fiqh, asbab al-nuzul, scholarly opinions / ikhtilaf) |
| 04 | `04-history.md` | تاریخی سفر | Prophetic era → Companions → later Islamic history, authentically traced |
| 05 | `05-today.md` | آج کے دور میں | How it fits and applies today; real modern situations; current-events tie-in |
| 06 | `06-myths.md` | غلط فہمیاں اور بدعات | Myth-busting: beliefs/practices wrongly attributed to Islam, separated from authentic teaching with evidence |
| 07 | `07-emergent-qa.md` | ابھرتے ہوئے سوالات | The follow-up questions that *arise from* the discussion — rapid deeper Q&A so the listener leaves near-complete |
| 08 | `08-closing.md` | اختتامیہ و خلاصہ | Host wraps up; each Aalim gives key takeaways; closing dua |
| 09 | `09-references.md` | حوالہ جات | All ayat / hadith (with grades) + scholars cited + web sources |

---

## 5. Length (simulating a real 1–3 hour podcast)

Auto-scaled to topic breadth, expressed as **word-count floors + approximate spoken minutes**
(~130 words/min for spoken Urdu):

| Topic breadth | Target | ≈ Words |
|---------------|--------|---------|
| Narrow (single ayah / single hadith / one act) | ~1 hr | ≈ 8,000–10,000 |
| Medium (ayah range / focused concept) | ~1.5–2 hr | ≈ 13,000–18,000 |
| Broad (event / large theme / surah) | up to 3 hr | ≈ 22,000–27,000 |

Segment **03 (گہرائی)** always carries the largest share. Each segment agent is given an explicit
word-count floor so the compiled transcript reaches the target. The orchestrator picks the band
from the parsed topic and may confirm with the user.

---

## 6. Voice & Language

- **Strictly simple, conversational Urdu** — even "high-level" content is made beginner-accessible;
  technical terms (Arabic, fiqh, hadith-science terms) are explained on first use, in-dialogue.
- Markdown speaker labels: `**میزبان:**`, `**عالمِ اصول:**`, `**عالمِ عصر:**`.
- Natural turn-taking: questions, follow-ups, "rukiye, ye samajhaiye…", building on each other —
  not monologue blocks.
- The host covers **all levels and all fields**: linguistic, historical, fiqh, spiritual,
  scientific, social, contemporary.
- Arabic ayah text is **not** embedded — link to quran.com (consistent with the other skills).
  Arabic terms, transliterations, scholar names, book titles, and URLs stay in original form.

---

## 7. Mechanics (reused from existing skills)

### Build approach: segment-per-agent pipeline + question "rundown"
1. **Parse & identify** — resolve the topic to a clear subject + anchor reference(s); for ambiguous
   or broad input, present 2–3 angles and confirm with the user. Pick the length band. Create
   `sessions/YYYY-MM-DD-podcast-[name]/parts/` and write `00-header.md`. Confirm with user.
2. **Gather research** — dispatch the `/research` skill (transcripts, current-events,
   hadith-verification, scientific-research). Reuse `research/<topic-key>/` if it already exists.
3. **Draft the episode rundown** — orchestrator drafts the host's full **question spine** per
   segment (this directly serves the "host has all the questions" requirement). Passed to the
   segment agents as their interview outline; not a separate output file.
4. **Dispatch one agent per segment** (01 → 08), each:
   - reads the prior parts for continuity + the relevant `research/<topic-key>/` files,
   - is given the cast definitions, the hard authenticity rule, its segment brief, the relevant
     slice of the rundown, and its word-count floor,
   - writes its `parts/NN-*.md`.
5. **References** — agent compiles `09-references.md` from all parts.
6. **Compile & PDF** — `cat` parts in order into `session.md`; run
   `node .claude/skills/md-to-pdf/convert.mjs sessions/.../session.md`.
7. **Present summary** — episode title, the spine question, the most striking myth debunked,
   reference counts, and the directory + PDF paths.

### Outputs
```
sessions/YYYY-MM-DD-podcast-[name]/
  parts/
    00-header.md
    01-intro.md
    02-foundation.md
    03-depth.md
    04-history.md
    05-today.md
    06-myths.md
    07-emergent-qa.md
    08-closing.md
    09-references.md
  session.md
  session.pdf
```

### Registration
Add `/podcast` to `CLAUDE.md` under **Commands** and **Skills**.

---

## 8. Success Criteria

- `/podcast [topic]` runs end-to-end and produces `session.md` + `session.pdf`.
- The transcript is a genuine two-guest interview driven by the host, in simple Urdu.
- All ten parts are present, in order, with consistent recurring cast labels.
- Length hits the band selected for the topic (word-count floor met).
- Every hadith carries a source + grade; every ayah links to quran.com; scholarly opinions are
  attributed to real scholars; nothing is fabricated.
- The myths segment cleanly separates authentic teaching from popular misconception, with evidence.
- PDF renders correctly with the Nastaleeq/RTL pipeline.

---

## 9. Out of Scope (YAGNI)

- No audio / TTS generation (PDF transcript only — decided in review).
- No invented personal names for the Aalims.
- No new research infrastructure — reuse the existing `/research` skill and `research/` library.
- No changes to `md-to-pdf`.
