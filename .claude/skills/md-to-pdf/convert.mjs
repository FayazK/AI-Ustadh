#!/usr/bin/env node

/**
 * Markdown to PDF converter with Nastaleeq font support for Urdu/Arabic text.
 * Uses marked (MD→HTML) + weasyprint (HTML→PDF).
 *
 * Usage: node convert.mjs <input.md> [--output <output.pdf>] [--font <font-name>]
 */

import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { resolve, dirname, basename, join } from "path";
import { execSync } from "child_process";
import { tmpdir } from "os";

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  console.log(`Usage: node convert.mjs <input.md> [--output <output.pdf>] [--font <font-name>]

Options:
  --output, -o   Output PDF path (default: same directory as input, .pdf extension)
  --font, -f     Primary Urdu/Arabic font (default: "Jameel Noori Nastaleeq")
  --help         Show this help

Fonts fallback chain: specified font → Noto Nastaliq Urdu → DecoType Nastaleeq Urdu`);
  process.exit(0);
}

// Parse arguments
let inputPath = null;
let outputPath = null;
let primaryFont = "Jameel Noori Nastaleeq";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--output" || args[i] === "-o") {
    outputPath = args[++i];
  } else if (args[i] === "--font" || args[i] === "-f") {
    primaryFont = args[++i];
  } else if (!args[i].startsWith("-")) {
    inputPath = args[i];
  }
}

if (!inputPath) {
  console.error("Error: No input file specified.");
  process.exit(1);
}

const absInput = resolve(inputPath);
const inputDir = dirname(absInput);
const inputName = basename(absInput, ".md");

if (!outputPath) {
  outputPath = join(inputDir, `${inputName}.pdf`);
} else {
  outputPath = resolve(outputPath);
}

// Read markdown
const mdContent = readFileSync(absInput, "utf-8");

// Convert MD to HTML using marked via dynamic import
const { marked } = await import("marked");

marked.setOptions({
  gfm: true,
  breaks: true,
});

const htmlBody = marked.parse(mdContent);

// CSS for clean PDF with Nastaleeq support
const css = `
@page {
  size: A4;
  margin: 1cm 0.75cm;

  @bottom-center {
    content: counter(page);
    font-family: "Noto Sans", sans-serif;
    font-size: 9pt;
    color: #888;
  }
}

:root {
  --urdu-font: "${primaryFont}", "Noto Nastaliq Urdu", "DecoType Nastaleeq Urdu", "Mehr Nastaliq Web", serif;
  --latin-font: "Georgia", "Noto Serif", "Times New Roman", serif;
  --mono-font: "SF Mono", "Menlo", "Consolas", monospace;
  --heading-color: #1a472a;
  --text-color: #2c2c2c;
  --border-color: #d4a574;
  --bg-light: #faf8f5;
  --link-color: #2563eb;
}

* {
  box-sizing: border-box;
}

body {
  font-family: var(--urdu-font);
  font-size: 15.6pt;
  line-height: 2.4;
  color: var(--text-color);
  direction: rtl;
  text-align: right;
  unicode-bidi: embed;
  word-spacing: 0.08em;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  font-kerning: normal;
  text-rendering: optimizeLegibility;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--urdu-font);
  color: var(--heading-color);
  line-height: 2.0;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  page-break-after: avoid;
}

h1 {
  font-size: 26.4pt;
  text-align: center;
  border-bottom: 3px solid var(--border-color);
  padding-bottom: 0.4em;
  margin-bottom: 1em;
}

h2 {
  font-size: 21.6pt;
  border-bottom: 1.5px solid var(--border-color);
  padding-bottom: 0.3em;
}

h3 {
  font-size: 18pt;
  color: #2d5a3d;
}

h4, h5, h6 {
  font-size: 15.6pt;
}

/* Paragraphs */
p {
  margin: 0.6em 0;
  text-align: justify;
  orphans: 3;
  widows: 3;
}

/* Links */
a {
  color: var(--link-color);
  text-decoration: none;
}

/* Lists */
ul, ol {
  padding-right: 1.5em;
  padding-left: 0;
  margin: 0.5em 0;
}

li {
  margin-bottom: 0.4em;
  line-height: 2.3;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  font-size: 11pt;
  line-height: 1.8;
  table-layout: fixed;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

th {
  background-color: var(--heading-color);
  color: white;
  font-weight: bold;
  padding: 6px 8px;
  text-align: right;
  word-wrap: break-word;
}

td {
  padding: 5px 8px;
  border-bottom: 1px solid #ddd;
  text-align: right;
  word-wrap: break-word;
  vertical-align: top;
}

tr:nth-child(even) {
  background-color: var(--bg-light);
}

/* Blockquotes */
blockquote {
  border-right: 4px solid var(--border-color);
  border-left: none;
  margin: 1em 0;
  padding: 0.5em 1.5em 0.5em 0.5em;
  background-color: var(--bg-light);
  font-style: italic;
  color: #555;
}

blockquote p {
  margin: 0.3em 0;
}

/* Code */
code {
  font-family: var(--mono-font);
  font-size: 12pt;
  background-color: #f0ede8;
  padding: 2px 5px;
  border-radius: 3px;
  direction: ltr;
  unicode-bidi: embed;
}

pre {
  background-color: #f0ede8;
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
  direction: ltr;
  text-align: left;
  font-size: 12pt;
  line-height: 1.5;
  page-break-inside: avoid;
  margin: 1em 0;
}

pre code {
  background: none;
  padding: 0;
}

/* Horizontal rules */
hr {
  border: none;
  border-top: 2px solid var(--border-color);
  margin: 1.5em 0;
}

/* Strong / Emphasis */
strong {
  color: #1a1a1a;
}

em {
  font-style: italic;
}

/* LTR content detection: Latin text, URLs, references */
.ltr, [dir="ltr"] {
  direction: ltr;
  text-align: left;
  unicode-bidi: embed;
  font-family: var(--latin-font);
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1em auto;
}

/* Avoid page breaks inside key elements */
h1, h2, h3, h4, h5, h6,
blockquote, table, pre, figure {
  page-break-inside: avoid;
}
`;

const fullHtml = `<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>${css}</style>
</head>
<body>
${htmlBody}
</body>
</html>`;

// Write temp HTML
const tmpHtml = join(tmpdir(), `md2pdf-${Date.now()}.html`);
writeFileSync(tmpHtml, fullHtml, "utf-8");

// Convert with weasyprint.
// On macOS, SIP strips DYLD_* vars when execSync spawns a shell, so we
// prepend `env DYLD_FALLBACK_LIBRARY_PATH=...` to set the path explicitly
// for weasyprint's libgobject/libpango lookup via Homebrew.
const dyldPath =
  process.platform === "darwin"
    ? "/opt/homebrew/lib:/usr/local/lib"
    : "";
const cmd =
  process.platform === "darwin"
    ? `env DYLD_FALLBACK_LIBRARY_PATH="${dyldPath}" weasyprint "${tmpHtml}" "${outputPath}"`
    : `weasyprint "${tmpHtml}" "${outputPath}"`;
try {
  execSync(cmd, {
    stdio: "inherit",
    timeout: 120000,
  });
  console.log(`\nPDF saved: ${outputPath}`);
} catch (err) {
  console.error("Error converting to PDF:", err.message);
  process.exit(1);
} finally {
  try {
    unlinkSync(tmpHtml);
  } catch {}
}
