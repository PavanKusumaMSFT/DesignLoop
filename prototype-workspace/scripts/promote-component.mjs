#!/usr/bin/env node

/**
 * promote-component — Register a shared component in AGENTS.md
 *
 * Reads a component file, extracts its name, props, and JSDoc summary,
 * then appends a row to the "Composed Building Blocks" table in AGENTS.md.
 *
 * Usage:
 *   pnpm promote-component components/shared/my-component.tsx
 *   pnpm promote-component components/shared/my-component.tsx --use-for "Description of usage"
 *   pnpm promote-component components/shared/my-component.tsx --section "Agent / Copilot UI"
 *   pnpm promote-component components/shared/my-component.tsx --composed-from "Card, Text, Badge"
 *   pnpm promote-component components/shared/my-component.tsx --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// ── CLI Args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return null;
  return args[idx + 1];
}

const dryRun = args.includes("--dry-run");
const componentPath = args.find((a) => !a.startsWith("--"));
const useForOverride = getFlag("use-for");
const sectionOverride = getFlag("section");
const composedFromOverride = getFlag("composed-from");

if (!componentPath) {
  console.error(`
Usage: pnpm promote-component <path-to-component> [options]

Options:
  --use-for <text>          Override the "Use For" column text
  --composed-from <text>    Override the "Composed From" column text
  --section <name>          Target section (default: "Composed Building Blocks")
                            Other options: "Page Shell Components", "Agent / Copilot UI",
                            "Deployment Flow", "Utility / Layout", etc.
  --dry-run                 Print what would be added without modifying files

Example:
  pnpm promote-component components/shared/incident-timeline.tsx \\
    --use-for "Chronological timeline of incident events with severity badges" \\
    --composed-from "Card, Text, Badge, Timeline"
`);
  process.exit(1);
}

// ── Read Component File ──────────────────────────────────────────────────────

const fullPath = path.resolve(ROOT, componentPath);

if (!fs.existsSync(fullPath)) {
  console.error(`✗ File not found: ${componentPath}`);
  process.exit(1);
}

const source = fs.readFileSync(fullPath, "utf-8");
const relPath = path.relative(ROOT, fullPath);

// Validate it's in components/shared/
if (!relPath.startsWith("components/shared/")) {
  console.error(
    `✗ Only components in components/shared/ can be promoted to AGENTS.md`,
  );
  console.error(`  Got: ${relPath}`);
  console.error(
    `  Hint: Move the component to components/shared/ first, then promote.`,
  );
  process.exit(1);
}

// ── Extract Component Metadata ───────────────────────────────────────────────

// Extract default export name
const defaultExportMatch = source.match(/export\s+default\s+function\s+(\w+)/);
const namedExportMatch = source.match(/export\s+(?:const|function)\s+(\w+)/);
const componentName = defaultExportMatch?.[1] || namedExportMatch?.[1] || null;

if (!componentName) {
  console.error(`✗ Could not find exported component name in ${relPath}`);
  console.error(`  Ensure the file has: export default function ComponentName`);
  process.exit(1);
}

// Extract JSDoc summary — must be a single /** ... */ block with ONLY
// whitespace between the closing */ and `export default`
const jsDocMatch = source.match(
  /(\/\*\*[^]*?\*\/)\n\s*export\s+default/,
);
let jsDocSummary = null;
if (jsDocMatch) {
  const block = jsDocMatch[1];
  // Reject if the block contains prop-like patterns (multiple /** inside)
  const starCount = (block.match(/\/\*\*/g) || []).length;
  if (starCount === 1) {
    const raw = block
      .replace(/^\/\*\*\s*/, "")
      .replace(/\s*\*\/$/, "")
      .replace(/^\s*\*\s?/gm, "")
      .replace(/@\w+.*$/gm, "")
      .replace(/\n/g, " ")
      .trim();
    const firstSentence = raw.match(/^[^.]+\.?/)?.[0]?.trim();
    if (firstSentence && firstSentence.length > 5) {
      jsDocSummary = firstSentence;
    }
  }
}

// Extract additional named exports (e.g. ActionCardGrid alongside ActionCard)
const allExports = [];
const exportRegex = /export\s+(?:default\s+)?(?:function|const)\s+(\w+)/g;
let match;
while ((match = exportRegex.exec(source)) !== null) {
  if (match[1] !== componentName) {
    allExports.push(match[1]);
  }
}

// Extract props interface
const propsMatch = source.match(
  /export\s+interface\s+(\w+Props)\s*\{([\s\S]*?)\n\}/,
);
let propsNames = [];
if (propsMatch) {
  const propsBody = propsMatch[2];
  const propRegex = /^\s+(\w+)[\?:].*$/gm;
  let propMatch;
  while ((propMatch = propRegex.exec(propsBody)) !== null) {
    propsNames.push(propMatch[1]);
  }
}

// Extract Fluent imports to infer "Composed From"
const fluentImportMatch = source.match(
  /import\s*\{([^}]+)\}\s*from\s*["']@fluentui\/react-components["']/,
);
let composedFrom = [];
if (fluentImportMatch) {
  composedFrom = fluentImportMatch[1]
    .split(",")
    .map((s) => s.trim())
    .filter(
      (s) =>
        /^[A-Z]/.test(s) &&
        !["SafeTokens"].includes(s) &&
        !s.startsWith("tokens") &&
        !s.startsWith("makeStyles") &&
        !s.startsWith("mergeClasses"),
    );
}

// Build import path (strip .tsx extension)
const importPath = relPath.replace(/\.tsx$/, "");

// ── Build Table Row ──────────────────────────────────────────────────────────

const useFor = useForOverride || jsDocSummary || `[TODO: add description]`;
const composed =
  composedFromOverride ||
  composedFrom.join(", ") ||
  "[TODO: add composed-from]";

// Determine target section
const section = sectionOverride || "Composed Building Blocks";

// ── Section Table Formats ────────────────────────────────────────────────────
// "Composed Building Blocks" has 4 columns: Component | Import Path | Composed From | Use For
// All other sections have 3 columns: Component | Import Path | Use For

const isComposedSection =
  section === "Composed Building Blocks" ||
  section === "Composed Building Blocks (NEW — use these for new pages)";

let newRow;
if (isComposedSection) {
  newRow = `| \`${componentName}\` | \`${importPath}\` | ${composed} | ${useFor} |`;
} else {
  newRow = `| \`${componentName}\` | \`${importPath}\` | ${useFor} |`;
}

// Build rows for additional exports too
const additionalRows = allExports.map((name) => {
  if (isComposedSection) {
    return `| \`${name}\` | \`${importPath}\` | Wrapper component | Companion to \`${componentName}\` |`;
  }
  return `| \`${name}\` | \`${importPath}\` | Companion to \`${componentName}\` |`;
});

// ── Update AGENTS.md ─────────────────────────────────────────────────────────

const agentsPath = path.join(ROOT, "AGENTS.md");
let agentsContent = fs.readFileSync(agentsPath, "utf-8");

// Find the target section's table
// We look for the section header, then find the last row of its table
const sectionHeaderRegex = new RegExp(
  `### ${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\n]*\n`,
);
const sectionMatch = sectionHeaderRegex.exec(agentsContent);

if (!sectionMatch) {
  console.error(`✗ Could not find section "### ${section}" in AGENTS.md`);
  console.error(`  Available sections with tables:`);
  const sectionMatches = agentsContent.match(/### [^\n]+/g) || [];
  sectionMatches
    .filter((s) => {
      const idx = agentsContent.indexOf(s);
      const after = agentsContent.substring(idx, idx + 500);
      return after.includes("| ");
    })
    .forEach((s) => console.error(`    ${s.replace("### ", "")}`));
  process.exit(1);
}

// Check if component already exists in AGENTS.md
if (agentsContent.includes(`\`${componentName}\``)) {
  console.error(`✗ \`${componentName}\` already exists in AGENTS.md`);
  console.error(`  Use a text editor to update the existing entry.`);
  process.exit(1);
}

// Find the last table row in this section (before the next section or ---)
const sectionStart = sectionMatch.index + sectionMatch[0].length;
const afterSection = agentsContent.substring(sectionStart);

// Find end of table: first blank line or --- after the table rows
const tableEndMatch = afterSection.match(/\n(\n(?!\|)|---)/);
if (!tableEndMatch) {
  console.error(`✗ Could not find end of table in section "${section}"`);
  process.exit(1);
}

const insertPos = sectionStart + tableEndMatch.index;
const rowsToInsert = [newRow, ...additionalRows].join("\n");
const insertion = `\n${rowsToInsert}`;

// ── Output ───────────────────────────────────────────────────────────────────

console.log("");
console.log(`  Component:     ${componentName}`);
console.log(`  Import:        ${importPath}`);
if (propsNames.length > 0) {
  console.log(`  Props:         ${propsNames.join(", ")}`);
}
if (allExports.length > 0) {
  console.log(`  Also exports:  ${allExports.join(", ")}`);
}
console.log(`  Section:       ${section}`);
console.log(`  Use for:       ${useFor}`);
if (isComposedSection) {
  console.log(`  Composed from: ${composed}`);
}
console.log("");

if (dryRun) {
  console.log("  [DRY RUN] Would add to AGENTS.md:");
  console.log("");
  console.log(`  ${newRow}`);
  additionalRows.forEach((r) => console.log(`  ${r}`));
  console.log("");
  process.exit(0);
}

// Write
const updatedContent =
  agentsContent.substring(0, insertPos) +
  insertion +
  agentsContent.substring(insertPos);

fs.writeFileSync(agentsPath, updatedContent, "utf-8");

console.log(`  ✓ Added to AGENTS.md → "${section}" table`);
if (additionalRows.length > 0) {
  console.log(`  ✓ Also added ${additionalRows.length} companion export(s)`);
}
console.log("");
console.log(`  Next steps:`);
console.log(`    1. Review the entry in AGENTS.md`);
console.log(`    2. Refine the "Use For" text if needed`);
console.log(
  `    3. Commit: git add AGENTS.md && git commit -m "docs: promote ${componentName} to AGENTS.md"`,
);
console.log("");
