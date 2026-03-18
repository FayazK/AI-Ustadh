---
name: research
description: Use when the user invokes /research with any Quranic verse, hadith, Islamic concept, or theme. Gathers exhaustive YouTube scholar transcripts, current world news, hadith verification, and scientific research into a shared research directory. Also called internally by other skills (recite, divine, discover) to avoid duplicate research.
---

# Research — Centralized Islamic Knowledge Gathering

## Overview

The `/research` command gathers primary source material for any Islamic topic into a shared, reusable `research/` directory at the project root. When called directly, it performs exhaustive research. When called by another skill, it performs sufficient research — only fetching what's missing.

## Input Format

The user provides one of:
- A specific ayah: `/research 2:255`
- An ayah range: `/research 18:1-10`
- A named verse: `/research Ayat al-Kursi`
- A Surah: `/research Surah Al-Qadr`
- A concept: `/research Laylatul Qadr`, `/research tawakkul`
- A theme: `/research patience in the Quran`

## Execution Flow — Direct Call

### Step 1: Parse and Normalize Topic

Resolve the user's input to a canonical topic key using the normalization algorithm:

1. **Verse reference?** (e.g., `2:255`) → `<surah-slug>-<ayah>` (e.g., `al-baqarah-255`)
2. **Named verse/surah?** → WebSearch to resolve to Surah:Ayah, then step 1
3. **Alias check** → read `research/topic-aliases.md` for existing mappings
4. **Thematic topic** → use canonical Arabic/Islamic term, slugified (e.g., `laylatul-qadr`, `sabr`)
5. **Ambiguous** → present options to user, confirm before proceeding

After resolving, update `research/topic-aliases.md` with any new alias → key mappings.

Create directory if needed: `research/<topic-key>/transcripts/` and `research/<topic-key>/web/`

Present the resolved topic and key to the user for confirmation.

### Step 2: Check Existing Research

If `research/<topic-key>/` already exists, read `index.md` to understand what's been gathered. In direct/exhaustive mode, proceed to enrichment — find what's NOT yet captured.

### Step 3: YouTube Scholar Search (Exhaustive)

Search for ALL scholars in parallel using `yt-dlp`:

```bash
# ytsearch10 for exhaustive (direct), ytsearch5 for sufficient (skill-called)
yt-dlp "ytsearch10:Nouman Ali Khan [topic] quran" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Yasir Qadhi [topic] tafseer" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Omar Suleiman [topic] quran" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Hamza Yusuf [topic] Islam" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Mufti Menk [topic] lesson" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Dr Israr Ahmed [topic] dars quran" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Abdul Nasir Jangda [topic] quran" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Taimiyyah Zubair [topic] quran" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Furqan Qureshi [topic] quran" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Mufti Tariq Masood [topic] hadith" --flat-playlist --print "%(id)s | %(title)s"
yt-dlp "ytsearch10:Mustafa Khattab [topic] clear quran" --flat-playlist --print "%(id)s | %(title)s"
```

Launch ALL searches **in parallel**. From results, select all relevant unique video IDs. Deduplicate against existing transcripts in index.md (by video ID). Skip videos that appear to be re-uploads of the same lecture.

### Step 4: Fetch Transcripts

Fetch all new transcripts **in parallel**:

```bash
pipx run youtube-transcript-api <VIDEO_ID> 2>/dev/null | python3 -c "
import ast, sys
data = ast.literal_eval(sys.stdin.read())
for entry in data[0]:
    print(entry['text'])
" > research/<topic-key>/transcripts/<scholar-name>-<N>.txt
```

Verify each transcript is non-empty and relevant (read first 20-30 lines). Discard irrelevant results. Not all scholars will have lectures on every topic — skip gracefully.

### Step 5: News Snapshot (Always Fresh in Direct Mode)

Fetch comprehensive world news — today and yesterday across all categories. Run ALL searches **in parallel**:

1. `latest world news today` + `yesterday world news headlines`
2. `latest business economy news today` + `stock market economy news yesterday`
3. `latest AI technology news today` + `tech AI news yesterday`
4. `latest war conflict news today` + `Palestine Sudan Ukraine Yemen war news`
5. `latest world politics news today` + `US China Russia politics news yesterday`
6. `latest Muslim world news today` + `Islamic countries OIC news yesterday`
7. `latest climate environment nature news today` + `natural disaster weather news`
8. `latest health science discovery news today` + `medical research news`
9. `latest social issues human rights news today` + `education mental health news`
10. `social media regulation AI ethics news today` + `surveillance privacy digital rights news`

Save to `research/<topic-key>/web/current-events.md` with `**Fetched:** YYYY-MM-DD` header.

### Step 6: Hadith Verification

Search for relevant hadith and verify against sunnah.com:

```
WebSearch: "site:sunnah.com [hadith keyword]"
WebSearch: "site:islamweb.net [hadith keyword]"
```

Save to `research/<topic-key>/web/hadith-verification.md` with collection, number, grading, and sunnah.com link for each hadith.

### Step 7: Scientific Research

Search for scientific connections:

```
WebSearch: "[topic] scientific research study"
WebSearch: "[topic] psychology study peer reviewed"
WebSearch: "[topic] modern science discovery"
```

Save to `research/<topic-key>/web/scientific-research.md`.

### Step 8: Write/Update Index

Write or update `research/<topic-key>/index.md` with all transcripts (scholar, file, video title, URL, line count, fetch date) and web research (type, file, last updated, source count).

### Step 9: Present Summary

Present to user:
1. Topic key and research path
2. Total transcripts fetched (by scholar breakdown)
3. News categories covered
4. Hadith verified count
5. Scientific sources found
6. Path: `research/<topic-key>/`

## Execution Flow — Skill-Called

When called by another skill (recite, divine, discover), the research skill receives:
- Topic and topic key
- List of needed research types
- Mode: skill-called
- Minimum transcript count

### Sufficiency Check

1. **Transcripts**: Sufficient if `transcripts/` has >= minimum non-empty files
2. **Current events**: Sufficient if `web/current-events.md` exists AND `**Fetched:**` date is within last 24 hours
3. **Hadith verification**: Sufficient if `web/hadith-verification.md` exists and is non-empty
4. **Scientific research**: Sufficient if `web/scientific-research.md` exists and is non-empty

If all requested types are sufficient → return path immediately.
If any type is insufficient → fetch only missing/stale types, then return path.

## Important Notes

- Launch YouTube searches and WebSearches **in parallel** wherever possible
- Auto-generated captions may have transliteration errors for Arabic terms — downstream skills should interpret using their knowledge
- Not all scholars will have lectures on every topic — skip gracefully
- If a transcript fetch fails (no captions available), note it and move on
- Never fabricate sources — if a search returns nothing, report it honestly
- The `research/` directory is a permanent, growing knowledge base — treat it with care
