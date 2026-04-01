# Research Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a centralized `/research` skill and update all existing skills to delegate research to it, eliminating duplicate YouTube transcript fetching and WebSearches.

**Architecture:** A new skill at `.claude/skills/research/SKILL.md` owns all research gathering (YouTube transcripts, news, hadith verification, scientific research) and stores results in a shared `research/` directory at project root. Existing skills (`recite`, `divine`, `discover`) have their research sections replaced with a single subagent dispatch to the research skill. A `research/topic-aliases.md` file maps diverse inputs to canonical topic keys.

**Tech Stack:** Claude Code skills (markdown), yt-dlp, youtube-transcript-api, WebSearch

**Spec:** `docs/superpowers/specs/2026-03-18-research-skill-design.md`

---

### Task 1: Create the research skill

**Files:**
- Create: `.claude/skills/research/SKILL.md`

- [ ] **Step 1: Create the skill directory**

```bash
mkdir -p .claude/skills/research
```

- [ ] **Step 2: Write the SKILL.md**

Extract the draft SKILL.md from the spec (the "Draft SKILL.md" section) into `.claude/skills/research/SKILL.md`. This is the full skill definition with:
- Frontmatter: `name: research`, description for trigger
- Two modes: direct (exhaustive) and skill-called (sufficient)
- Topic normalization algorithm (5 steps)
- YouTube search + transcript fetching process
- News snapshot (10 categories, today + yesterday)
- Hadith verification and scientific research
- Sufficiency check logic with 24-hour freshness for current-events
- Index file format

- [ ] **Step 3: Verify the skill loads**

```bash
# Check the skill appears in Claude Code's skill list
cat .claude/skills/research/SKILL.md | head -5
```

Expected: frontmatter with `name: research` and `description:` line.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/research/SKILL.md
git commit -m "feat: add centralized research skill"
```

---

### Task 2: Create the topic aliases file

**Files:**
- Create: `research/topic-aliases.md`

- [ ] **Step 1: Create the research directory and aliases file**

```bash
mkdir -p research
```

Write `research/topic-aliases.md` with initial aliases from existing sessions:

```markdown
# Topic Aliases

Maps known aliases to canonical topic keys. Updated automatically by the research skill.

| Alias | Canonical Key |
|---|---|
| an-noor-35 | an-noor-35 |
| ayat al-noor | an-noor-35 |
| 24:35 | an-noor-35 |
| al-ikhlas-1-4 | al-ikhlas-1-4 |
| surah ikhlas | al-ikhlas-1-4 |
| 112:1-4 | al-ikhlas-1-4 |
| al-kahf-1-10 | al-kahf-1-10 |
| surah al-kahf opening | al-kahf-1-10 |
| 18:1-10 | al-kahf-1-10 |
| story of the cave | al-kahf-1-10 |
| sleepers of the cave | al-kahf-1-10 |
| laylatul-qadr | laylatul-qadr |
| night of power | laylatul-qadr |
| surah al-qadr | laylatul-qadr |
| 97:1-5 | laylatul-qadr |
```

- [ ] **Step 2: Commit**

```bash
git add research/topic-aliases.md
git commit -m "feat: add topic aliases file for research deduplication"
```

---

### Task 3: Update the `recite` skill

**Files:**
- Modify: `.claude/skills/recite/SKILL.md`

This task removes the entire research section and replaces it with a research skill dispatch, then updates all agent prompt references.

- [ ] **Step 1: Update the execution flow diagram**

Replace the flow diagram (lines 44-65). Change:
```
research [label="Step 1.5: YouTube Research\n(fetch transcripts → research/)"];
```
To:
```
research [label="Step 1.5: Gather Research\n(dispatch research skill)"];
```

- [ ] **Step 2: Replace Step 1.5 entirely**

Remove lines 88-166 (the entire "Step 1.5: YouTube Research" section including directory structure, process, search commands, transcript fetching, verification, research index, important notes, and "How Scholars Use the Research").

Replace with:

```markdown
### Step 1.5: Gather Research

Dispatch a research subagent to gather scholar transcripts:

- **Topic:** [surah-name ayah-range from Step 1]
- **Needs:** transcripts
- **Mode:** skill-called
- **Minimum transcripts:** 3

The research skill stores results in `research/<topic-key>/transcripts/`. All subsequent scholar agents read from this shared location.

If research already exists for this topic (from a previous session), it is reused — no duplicate fetching.
```

- [ ] **Step 3: Update Ali agent prompts**

Update line 188 (Agent 2a):
- Change: `**Must read** all transcript files in the \`research/\` directory`
- To: `**Must read** all .txt files in \`research/<topic-key>/transcripts/\` (path provided by research skill)`

Update line 196 (Agent 2b):
- Change: `**Must read** \`parts/01-ali-stages-1-3.md\` and \`research/\` transcripts`
- To: `**Must read** \`parts/01-ali-stages-1-3.md\` and all .txt files in \`research/<topic-key>/transcripts/\``

Lines 200+ (Agent 2c): change "previous Ali parts" references — these don't reference research directly, no change needed.

- [ ] **Step 4: Update Omar agent prompts**

Update line 235 (Agent 3a):
- Change: `**Must read** \`parts/01-ali-stages-1-3.md\` and \`research/\` transcripts`
- To: `**Must read** \`parts/01-ali-stages-1-3.md\` and all .txt files in \`research/<topic-key>/transcripts/\``

- [ ] **Step 5: Update the "How Scholars Use the Research" instruction template**

This was removed in Step 3. The agent dispatch prompts (Steps 2-3 in the skill) should now include:

```
**IMPORTANT: Read all .txt files in research/<topic-key>/transcripts/ before writing.
Integrate insights from these primary sources into your analysis, citing the scholar and lecture title.**
```

- [ ] **Step 6: Add research reference to session header**

In the 00-header.md template (lines 73-84), add after the translation line:
```markdown
**Research:** research/<topic-key>/
```

- [ ] **Step 7: Verify the skill is coherent**

Read through the full modified SKILL.md. Verify:
- No remaining references to `research/` as a session-local directory
- All agent prompts point to `research/<topic-key>/transcripts/`
- The flow diagram matches the steps
- No broken markdown

- [ ] **Step 8: Commit**

```bash
git add .claude/skills/recite/SKILL.md
git commit -m "refactor: recite skill delegates research to centralized research skill"
```

---

### Task 4: Update the `divine` skill

**Files:**
- Modify: `.claude/skills/divine/SKILL.md`

- [ ] **Step 1: Remove `research/` from session directory structure**

Remove lines 95-102 (the `research/` entries in the directory structure). The structure should show only `parts/` and compiled files.

- [ ] **Step 2: Update the execution flow diagram**

In the flow diagram (lines 116-131), change:
```
research [label="Step 2: YouTube Research + WebSearch\n(transcripts → research/)"];
```
To:
```
research [label="Step 2: Gather Research\n(dispatch research skill)"];
```

- [ ] **Step 3: Update Step 1 directory creation**

Line 138: Remove `and \`sessions/YYYY-MM-DD-divine-[name]/research/\`` — only create `parts/`.

- [ ] **Step 4: Replace Step 2 entirely**

Remove lines 156-226 (the entire "Step 2: YouTube Research + WebSearch" section including transcript fetching, current events research, research index, priority scholars, and important notes).

Replace with:

```markdown
### Step 2: Gather Research

Dispatch a research subagent to gather scholar transcripts and current events:

- **Topic:** [verse/theme from Step 1]
- **Needs:** transcripts, current-events
- **Mode:** skill-called
- **Minimum transcripts:** 3

The research skill stores results in `research/<topic-key>/`. Transcripts in `research/<topic-key>/transcripts/`, current events in `research/<topic-key>/web/current-events.md`.

If research already exists and current-events is fresh (< 24 hours old), it is reused.

#### Priority Scholars for Divine

When reading transcripts, mine them for **message-level insights** — skip past root word analysis and extract the moments where scholars say "the point Allah is making is..." or "this is really about..."

Natural affinities:
- **Layers 1-2**: Dr. Mustafa Khattab, Mufti Menk, Abdel Haleem (clear, accessible meaning)
- **Layer 3**: Dr. Israr Ahmed, Nouman Ali Khan (extracting universal principles)
- **Layer 4**: Hamza Yusuf, Dr. Omar Suleiman (psychology, human experience)
- **Layer 5**: Dr. Israr Ahmed, Mustansir Mir (Quranic interconnection, nazm)
- **Layer 6**: Dr. Omar Suleiman, Khaled Abou El Fadl, Dr. Yasir Qadhi (current events, social justice)
- **Layer 7**: Hamza Yusuf, Dr. Israr Ahmed (spiritual depth, philosophical contemplation)
```

Note: The "Priority Scholars" section is kept because it's divine-specific guidance for how to USE transcripts, not how to FETCH them.

- [ ] **Step 5: Update agent prompts for Layers 1-5**

Line 232 (Step 3 agent — Layers 1-3):
- Change: `Read all research transcripts in \`research/\` directory before writing`
- To: `Read all .txt files in \`research/<topic-key>/transcripts/\` before writing`

Line 252 (Step 4 agent — Layers 4-5):
- Change: `**Agent must read:** \`parts/01-overview-layers-1-3.md\` and \`research/\` transcripts`
- To: `**Agent must read:** \`parts/01-overview-layers-1-3.md\` and all .txt files in \`research/<topic-key>/transcripts/\``

- [ ] **Step 6: Update Layer 6 agent prompt**

Line 264 (Step 5 agent — Layer 6):
- Change: `**Agent must read:** All previous parts AND \`research/current-events.md\``
- To: `**Agent must read:** All previous parts AND \`research/<topic-key>/web/current-events.md\` AND \`research/<topic-key>/transcripts/\``

- [ ] **Step 7: Add research reference to header template**

In the 00-header.md template (lines 141-152), add:
```markdown
**Research:** research/<topic-key>/
```

- [ ] **Step 8: Verify coherence**

Read through full modified SKILL.md. No remaining session-local `research/` references. All paths point to shared `research/<topic-key>/`.

- [ ] **Step 9: Commit**

```bash
git add .claude/skills/divine/SKILL.md
git commit -m "refactor: divine skill delegates research to centralized research skill"
```

---

### Task 5: Update the `discover` skill

**Files:**
- Modify: `.claude/skills/discover/SKILL.md`

- [ ] **Step 1: Remove `research/` from session directory structure**

Remove lines 155-168 (the `research/` entries in the directory structure).

- [ ] **Step 2: Update the execution flow diagram**

In the flow diagram (lines 184-201), change:
```
research [label="Step 2: Research Phase\n(YouTube + WebSearch + Hadith verification)"];
```
To:
```
research [label="Step 2: Gather Research\n(dispatch research skill)"];
```

- [ ] **Step 3: Update Step 1 directory creation**

Line 208: Remove `and \`sessions/YYYY-MM-DD-discover-[name]/research/\`` — only create `parts/`.

- [ ] **Step 4: Replace Step 2 entirely**

Remove lines 226-304 (the entire "Step 2: Research Phase" section including YouTube transcript fetching, hadith verification, scientific research, current events, and research index).

Replace with:

```markdown
### Step 2: Gather Research

Dispatch a research subagent to gather all research types:

- **Topic:** [topic from Step 1]
- **Needs:** transcripts, current-events, hadith-verification, scientific-research
- **Mode:** skill-called
- **Minimum transcripts:** 3

The research skill stores results in `research/<topic-key>/`:
- Transcripts: `research/<topic-key>/transcripts/`
- Current events: `research/<topic-key>/web/current-events.md`
- Hadith verification: `research/<topic-key>/web/hadith-verification.md`
- Scientific research: `research/<topic-key>/web/scientific-research.md`

If research already exists and all types are present (current-events < 24 hours old), it is reused.
```

Note: The "Priority Scholars Per Section" list (lines 306-314) should be kept after the new Step 2, as it's discover-specific guidance for how agents USE the research.

- [ ] **Step 5: Update agent prompts — Introduction and Quranic Foundation**

Line 320 (Step 3 agent — Introduction):
- Change: `**Agent must read:** All research transcripts in \`research/\` directory`
- To: `**Agent must read:** All .txt files in \`research/<topic-key>/transcripts/\``

Line 335 (Step 4 agent — Quranic Foundation):
- Change: `**Agent must read:** \`parts/01-introduction.md\` and \`research/\` transcripts`
- To: `**Agent must read:** \`parts/01-introduction.md\` and all .txt files in \`research/<topic-key>/transcripts/\``

- [ ] **Step 6: Update agent prompt — Scholarly Opinions**

Line 383 (Step 6 agent — Scholarly Opinions):
- Change: `**Agent must read:** Previous parts and research transcripts`
- To: `**Agent must read:** Previous parts and all .txt files in \`research/<topic-key>/transcripts/\``

- [ ] **Step 7: Update agent prompts — Hadith, Science, Contemporary**

Line 358 (Step 5 agent — Hadith & Narrations):
- Change: `**Agent must read:** Previous parts AND \`research/hadith-verification.md\``
- To: `**Agent must read:** Previous parts AND \`research/<topic-key>/web/hadith-verification.md\` AND \`research/<topic-key>/transcripts/\``

Line 404 (Step 7 agent — Science & Research):
- Change: `**Agent must read:** Previous parts AND \`research/scientific-research.md\``
- To: `**Agent must read:** Previous parts AND \`research/<topic-key>/web/scientific-research.md\``

Line 426 (Step 8 agent — Contemporary Relevance):
- Change: `**Agent must read:** Previous parts AND \`research/current-events.md\``
- To: `**Agent must read:** Previous parts AND \`research/<topic-key>/web/current-events.md\``

- [ ] **Step 8: Add research reference to header template**

In the 00-header.md template (lines 211-222), add:
```markdown
**Research:** research/<topic-key>/
```

- [ ] **Step 9: Verify coherence**

Read through full modified SKILL.md. No remaining session-local `research/` references. All paths point to shared `research/<topic-key>/` with correct subdirectories.

- [ ] **Step 10: Commit**

```bash
git add .claude/skills/discover/SKILL.md
git commit -m "refactor: discover skill delegates research to centralized research skill"
```

---

### Task 6: Update the `quran-explorer` skill

**Files:**
- Modify: `.claude/skills/quran-explorer/SKILL.md`

- [ ] **Step 1: Add optional research check**

After the "## Exploration Framework" heading (line 18) and before "### Stage 1" (line 22), add:

```markdown
### Step 0 (Optional): Check for Existing Research

Before beginning the exploration, check if shared research exists for this verse:

- If `research/<topic-key>/transcripts/` exists, read the transcripts for richer analysis across all stages
- If not, proceed without — quran-explorer is designed to work standalone with WebSearch

This step is optional. Quran-explorer does not dispatch the research skill — it only benefits from research that already exists from previous `/research`, `/recite`, `/divine`, or `/discover` sessions.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/quran-explorer/SKILL.md
git commit -m "feat: quran-explorer optionally reads shared research if available"
```

---

### Task 7: Update CLAUDE.md with research skill

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add research command to Commands section**

In the `## Commands` section, add:
```markdown
- `/research [topic]` — Gather exhaustive research on any Quranic verse, hadith, or Islamic concept. Fetches YouTube scholar transcripts, world news, hadith verification, and scientific research into a shared `research/` directory. Called directly for deep research, or internally by other skills.
```

- [ ] **Step 2: Add research skill to Skills section**

In the `## Skills` section, add:
```markdown
- `research` — Centralized research gathering: YouTube transcripts from 11+ scholars, world news snapshot, hadith verification, scientific research. Stores in shared `research/` directory keyed by topic. Called by recite/divine/discover to avoid duplicate fetching.
```

- [ ] **Step 3: Add research directory to Directory Structure**

In the `## Directory Structure` section, add `research/` to the listing:
```markdown
- `research/` — Shared research library, organized by topic key:
  ```
  research/
    topic-aliases.md        ← maps aliases to canonical topic keys
    <topic-key>/
      transcripts/          ← YouTube scholar transcripts
      web/                  ← current-events, hadith-verification, scientific-research
      index.md              ← master index with metadata
  ```
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add research skill to CLAUDE.md commands, skills, and directory structure"
```

---

### Task 8: Smoke test — verify skills are internally consistent

**Files:** (no modifications, verification only)

- [ ] **Step 1: Verify no remaining session-local research/ references**

```bash
# Check 1: No session-local research/ paths
grep -n "sessions/.*research/" .claude/skills/recite/SKILL.md .claude/skills/divine/SKILL.md .claude/skills/discover/SKILL.md

# Check 2: No bare "research/" references that aren't the shared research/<topic-key>/ pattern
# This catches lines like "research transcripts" or "research/ directory" that should have been updated
grep -n 'research/' .claude/skills/recite/SKILL.md .claude/skills/divine/SKILL.md .claude/skills/discover/SKILL.md | grep -v 'research/<topic-key>'
```

Expected: No output from either check (exit code 1 — no matches). Every `research/` reference in these skills should be `research/<topic-key>/...`.

- [ ] **Step 2: Verify all skills reference shared research path**

```bash
grep -n "research/<topic-key>" .claude/skills/recite/SKILL.md .claude/skills/divine/SKILL.md .claude/skills/discover/SKILL.md
```

Expected: Multiple matches in each file, all pointing to `research/<topic-key>/transcripts/` or `research/<topic-key>/web/`.

- [ ] **Step 3: Verify research skill exists and has correct frontmatter**

```bash
head -5 .claude/skills/research/SKILL.md
```

Expected:
```
---
name: research
description: Use when the user invokes /research...
---
```

- [ ] **Step 4: Verify topic-aliases.md exists**

```bash
cat research/topic-aliases.md | head -5
```

Expected: The header and table with initial aliases.

- [ ] **Step 5: Verify CLAUDE.md has research entries**

```bash
grep -n "research" CLAUDE.md
```

Expected: Matches in Commands, Skills, and Directory Structure sections.
