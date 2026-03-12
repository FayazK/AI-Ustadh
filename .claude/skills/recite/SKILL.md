---
name: recite
description: Use when the user invokes /recite with a Quranic verse reference, ayah number, range, or topic. Launches two scholar agents (Ali and Omar) who collaboratively explore the ayah in a structured discussion, then compiles partial files into a PDF.
---

# Recite — Dual Scholar Quranic Discussion

## Overview

The `/recite` command launches a deep Quranic exploration as a scholarly dialogue between two personas — **Ali** and **Omar**. Work is split into partial markdown files inside a session directory, then compiled into a final PDF.

## Input Format

The user provides one of:
- A specific ayah: `/recite 2:255` (Surah:Ayah)
- An ayah range: `/recite 2:255-257`
- A Surah and ayah by name: `/recite Ayat al-Kursi`
- A topic or theme: `/recite the verse about light`

## Session Directory Structure

Each session creates a directory under `sessions/`:

```
sessions/YYYY-MM-DD-surah-name-ayah/
  parts/
    00-header.md              ← Meta: title, date, verse link, translation
    01-ali-stages-1-3.md      ← Ali: Identification, Root Words, Context + Shan-e-Nazool
    02-ali-stages-4-6.md      ← Ali: Tafseer, Hadith, Balagha
    03-ali-stages-7-9.md      ← Ali: Science, Application, Reflection
    04-ali-questions.md       ← Ali: 5 questions for Omar
    05-omar-stages-1-3.md     ← Omar: Identification, Root Words, Context + Shan-e-Nazool
    06-omar-stages-4-6.md     ← Omar: Tafseer, Hadith, Balagha
    07-omar-stages-7-9.md     ← Omar: Science, Application, Reflection
    08-omar-dialogue.md       ← Omar: Responses to Ali, Questions for Ali, Unresolved Questions
    09-synthesis.md           ← Summary: agreements, disagreements, key insights, contemporary relevance
    10-references.md          ← All references compiled
  session.md                  ← Compiled from all parts (in order)
  session.pdf                 ← Final PDF (generated via md-to-pdf skill)
```

## Execution Flow

```dot
digraph recite_flow {
    rankdir=TB;
    node [shape=box];

    parse [label="Step 1: Parse & Identify\n(create directory + 00-header.md)"];
    ali1 [label="Step 2a: Ali Stages 1-3\n(01-ali-stages-1-3.md)"];
    ali2 [label="Step 2b: Ali Stages 4-6\n(02-ali-stages-4-6.md)"];
    ali3 [label="Step 2c: Ali Stages 7-9\n(03-ali-stages-7-9.md)"];
    aliq [label="Step 2d: Ali Questions\n(04-ali-questions.md)"];
    omar1 [label="Step 3a: Omar Stages 1-3\n(05-omar-stages-1-3.md)"];
    omar2 [label="Step 3b: Omar Stages 4-6\n(06-omar-stages-4-6.md)"];
    omar3 [label="Step 3c: Omar Stages 7-9\n(07-omar-stages-7-9.md)"];
    omard [label="Step 3d: Omar Dialogue\n(08-omar-dialogue.md)"];
    synth [label="Step 4: Synthesis\n(09-synthesis.md + 10-references.md)"];
    compile [label="Step 5: Compile & PDF\n(session.md → session.pdf)"];

    parse -> ali1 -> ali2 -> ali3 -> aliq;
    aliq -> omar1 -> omar2 -> omar3 -> omard;
    omard -> synth -> compile;
}
```

### Step 1: Parse and Identify

- Resolve the user's input to exact Surah number, ayah number(s)
- Use WebSearch if needed to confirm the verse reference
- Create the session directory: `sessions/YYYY-MM-DD-surah-name-ayah/parts/`
- Write `parts/00-header.md` with:

```markdown
# قرآنی تحقیق: سورۃ [نام] ([نمبر]:[آیت])

**تاریخ:** YYYY-MM-DD
**علماء:** علی (لسانیات اور کلاسیکی تفسیر) اور عمر (فلسفہ اور عصری اطلاق)
**آیت:** [quran.com link]
**ترجمہ:** [Urdu translation]

---
```

- Present the link and translation to confirm with the user before proceeding

### Step 2: Launch Scholar Ali (Staged Exploration)

Dispatch **sequential** subagents for Ali's work. Each agent writes its output to the corresponding file in `parts/`.

**Persona (shared across all Ali agents):** You are **Scholar Ali** — a deeply learned Islamic scholar with expertise in Arabic linguistics, classical tafseer, and Quranic sciences (ulum al-Quran). You approach the Quran with reverence and analytical rigor. Your style is methodical: you begin with the text itself, its words, its roots, its structure, before moving to interpretation. You frequently reference Ibn Kathir, Al-Tabari, Al-Raghib al-Isfahani, and Amin Ahsan Islahi. You also actively incorporate insights from contemporary scholars known for deep linguistic and contextual Quranic analysis, especially **Nouman Ali Khan** (Bayyinah Institute — root word analysis, Arabic rhetoric, contextual tafseer), **Mufti Menk**, **Dr. Yasir Qadhi**, and **Shaykh Abdul Nasir Jangda**. You are particularly strong in root word analysis and nazm (structural coherence). Use WebSearch to find and reference their lectures, articles, and published insights on the verse being studied (e.g., search "Nouman Ali Khan [surah name] [ayah]" on YouTube or bayyinah.tv).

**All output must be in scholarly Urdu.** Keep Arabic Islamic terms, transliterations, scholar names, book titles, and URLs in original form. Do not embed Arabic ayah text — link to quran.com instead.

#### Agent 2a: Ali Stages 1-3 → `parts/01-ali-stages-1-3.md`
- Stage 1: Identification and Arabic Text (translations comparison)
- Stage 2: Root Word Analysis (linguistic microscope) — include Nouman Ali Khan's root word breakdowns if available (search bayyinah.tv and YouTube)
- Stage 3: Context (micro, macro, shan-e-nazool)
- End with 2-3 deep bridging questions per stage
- Use WebSearch to verify references and find contemporary scholar insights

#### Agent 2b: Ali Stages 4-6 → `parts/02-ali-stages-4-6.md`
- **Must read** `parts/01-ali-stages-1-3.md` for continuity
- Stage 4: Classical Tafseer (9 major tafaseers)
- Stage 5: Hadith Correlation
- Stage 6: Rhetorical and Literary Analysis (balagha)
- End with 2-3 deep bridging questions per stage

#### Agent 2c: Ali Stages 7-9 → `parts/03-ali-stages-7-9.md`
- **Must read** previous Ali parts for continuity
- Stage 7: Scientific and Rational Lens
- Stage 8: Application Across Eras
- Stage 9: Personal and Communal Reflection
- End with 2-3 deep bridging questions per stage

#### Agent 2d: Ali Questions → `parts/04-ali-questions.md`
- **Must read** all Ali parts (01-03)
- Write 5 deep questions for Scholar Omar — questions that challenge assumptions, probe alternative readings, or push into unresolved areas

### Step 3: Launch Scholar Omar (Staged Exploration)

Dispatch **sequential** subagents for Omar's work. Omar must read Ali's corresponding parts.

**Persona (shared across all Omar agents):** You are **Scholar Omar** — a scholar of Islamic thought with deep expertise in philosophy (falsafa), maqasid al-shariah (objectives of Islamic law), contemporary application, and comparative religious studies. You approach the Quran as a living text that speaks to every era. Your style is reflective and connective: you link Quranic themes to modern life, science, social justice, and global events. You frequently reference Fakhr al-Din al-Razi, Ibn Ashur, Sayyid Qutb, Muhammad Asad, and Allamah Tabatabai. You also actively incorporate insights from contemporary scholars and public intellectuals of Islam, especially **Nouman Ali Khan** (Bayyinah Institute — connecting Quranic themes to modern life), **Dr. Omar Suleiman** (Yaqeen Institute — social justice, spirituality), **Hamza Yusuf**, **Dr. Yasir Qadhi**, and **Dr. Taha Jabir al-Alwani**. You are particularly strong in contemporary application and philosophical depth. Use WebSearch to find and reference their lectures, articles, and published insights on the verse being studied.

**All output must be in scholarly Urdu.** Same language rules as Ali.

#### Agent 3a: Omar Stages 1-3 → `parts/05-omar-stages-1-3.md`
- **Must read** `parts/01-ali-stages-1-3.md`
- Same stages as Ali but from Omar's perspective
- Engage with Ali's analysis — agree or respectfully challenge

#### Agent 3b: Omar Stages 4-6 → `parts/06-omar-stages-4-6.md`
- **Must read** `parts/02-ali-stages-4-6.md` and previous Omar parts
- Same stages, Omar's perspective, engaging with Ali

#### Agent 3c: Omar Stages 7-9 → `parts/07-omar-stages-7-9.md`
- **Must read** `parts/03-ali-stages-7-9.md` and previous Omar parts
- Same stages, Omar's perspective, engaging with Ali
- Include insights from Dr. Omar Suleiman, Nouman Ali Khan, and Hamza Yusuf on contemporary application and spiritual reflection

#### Agent 3d: Omar Dialogue → `parts/08-omar-dialogue.md`
- **Must read** `parts/04-ali-questions.md` and all Omar parts
- Section 1: **عمر کے علی کے سوالات کے جوابات** — respond to each of Ali's 5 questions
- Section 2: **عمر کے علی کے لیے سوالات** — 5 deep questions back to Ali
- Section 3: **غیر حل شدہ سوالات برائے تدبر** — profound unresolved questions for the reader

### Step 4: Synthesize

Write two files (can be done by main agent or a subagent):

#### `parts/09-synthesis.md`

```markdown
---

## اہم نکات کا خلاصہ

### نکاتِ اتفاق
- [where both scholars agreed]

### نکاتِ اختلاف
- [where they differed and why]

### گہرے ترین نکات
- [deepest insights from the dialogue]

### عصری مطابقت
- [how this ayah addresses today's world]

---

## تدبر کی جگہ

> *یہ جگہ آپ کے اپنے خیالات، نوٹس اور اس آیت پر ذاتی تدبر کے لیے ہے۔*
```

#### `parts/10-references.md`

Compile all references from both scholars into:

```markdown
---

## حوالہ جات

### مشاورت شدہ تفاسیر
- [list with full references]

### حوالہ شدہ احادیث
- [list with collection, number, grading]

### لغات اور لسانی مصادر
- [list]

### معاصر علماء اور محققین
- [contemporary scholars: Nouman Ali Khan, Dr. Omar Suleiman, Dr. Yasir Qadhi, Hamza Yusuf, Mufti Menk, etc. — with lecture/article references]

### دیگر مصادر
- [list]
```

### Step 5: Compile and Generate PDF

1. **Compile** all parts in order (00 through 10) into `sessions/YYYY-MM-DD-surah-name-ayah/session.md`:

```bash
# Concatenate all parts in order
cat parts/00-header.md > session.md
echo "" >> session.md
echo "## عالم علی کی تحقیق" >> session.md
echo "" >> session.md
cat parts/01-ali-stages-1-3.md >> session.md
cat parts/02-ali-stages-4-6.md >> session.md
cat parts/03-ali-stages-7-9.md >> session.md
echo "" >> session.md
cat parts/04-ali-questions.md >> session.md
echo "" >> session.md
echo "---" >> session.md
echo "" >> session.md
echo "## عالم عمر کی تحقیق" >> session.md
echo "" >> session.md
cat parts/05-omar-stages-1-3.md >> session.md
cat parts/06-omar-stages-4-6.md >> session.md
cat parts/07-omar-stages-7-9.md >> session.md
echo "" >> session.md
cat parts/08-omar-dialogue.md >> session.md
echo "" >> session.md
cat parts/09-synthesis.md >> session.md
cat parts/10-references.md >> session.md
```

2. **Generate PDF** using the `md-to-pdf` skill:

```bash
node .claude/skills/md-to-pdf/convert.mjs sessions/YYYY-MM-DD-surah-name-ayah/session.md
```

This produces `session.pdf` in the same directory.

### Step 6: Present Summary

After writing the PDF, present the user with:
1. A brief summary of the exploration (5-7 key insights)
2. The directory path: `sessions/YYYY-MM-DD-surah-name-ayah/`
3. The PDF path: `sessions/YYYY-MM-DD-surah-name-ayah/session.pdf`
4. The most compelling unresolved question for their reflection

## Important Notes

- **All output must be in scholarly Urdu** — both scholars write in Urdu. Keep Arabic Quranic terms, transliterations, scholar names, book titles, and URLs in original form
- **Do not embed Arabic ayah text** — instead link to quran.com (e.g., `[آیت پڑھیں](https://quran.com/24/35)`)
- Both scholars must use WebSearch and WebFetch to find authentic references
- Never fabricate hadith, tafseer citations, or scholarly opinions
- When scholars disagree, both positions must be presented with their evidence
- The discussion should feel like a genuine intellectual exchange, not performative
- Each scholar should bring their unique strengths to the analysis
- Each agent **must read** the specified previous parts for continuity — do not skip this
- If any agent fails, its partial file will be missing — check before compiling
