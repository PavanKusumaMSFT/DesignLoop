#!/usr/bin/env node

/**
 * create-task-prototype — Scaffold a per-task Fluent prototype.
 *
 * Usage:
 *   node scripts/create-task-prototype.mjs <taskId> [--title "..."] [--description "..."] [--force]
 *
 * Creates:
 *   - app/<taskId>/page.tsx
 *   - components/projects/<taskId>/index.tsx
 *   - Appends/replaces an entry in data/projects.ts
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);

function getFlag(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return null;
  return args[idx + 1];
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

function toPascalCase(kebab) {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toTitle(kebab) {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const taskId = args.find((arg) => !arg.startsWith("--"));
const force = hasFlag("force");
const title = getFlag("title") || (taskId ? toTitle(taskId) : "");
const description = getFlag("description") || `${title} prototype workspace starter.`;

if (!taskId) {
  console.error('❌ Usage: node scripts/create-task-prototype.mjs <taskId> [--title "..."] [--description "..."] [--force]');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(taskId)) {
  console.error(`❌ Task ID "${taskId}" must be kebab-case (lowercase letters, numbers, hyphens, starting with a letter).`);
  process.exit(1);
}

const ROOT = resolve(import.meta.dirname, "..");
const appDir = join(ROOT, "app", taskId);
const projectDir = join(ROOT, "components", "projects", taskId);
const componentFile = join(projectDir, "index.tsx");
const projectsFile = join(ROOT, "data", "projects.ts");
const componentName = `${toPascalCase(taskId)}Prototype`;

const routeExists = existsSync(appDir);
const componentExists = existsSync(projectDir);
const projectsContent = readFileSync(projectsFile, "utf8");
const entryPattern = new RegExp(`\\n  \\{\\n    id: "${taskId}",[\\s\\S]*?\\n  \\},(?=\\n\\];|\\n  \\{)`, "m");
const registryExists = projectsContent.includes(`id: "${taskId}"`);

if (!force && (routeExists || componentExists || registryExists)) {
  console.error(`❌ Task prototype "${taskId}" already exists. Re-run with --force to replace generated route/component/registry entry.`);
  process.exit(1);
}

if (force) {
  if (routeExists) rmSync(appDir, { recursive: true, force: true });
  if (componentExists) rmSync(projectDir, { recursive: true, force: true });
}

mkdirSync(appDir, { recursive: true });
writeFileSync(
  join(appDir, "page.tsx"),
  `"use client";

import ProjectLayout from "../../components/shared/project-layout";
import ${componentName} from "../../components/projects/${taskId}";

export default function ${componentName}Page() {
  return (
    <ProjectLayout id="${taskId}" fullWidth>
      <${componentName}
        title="${escapeString(title)}"
        description="${escapeString(description)}"
      />
    </ProjectLayout>
  );
}
`,
);
console.log(`  ✓ Created app/${taskId}/page.tsx`);

mkdirSync(projectDir, { recursive: true });
writeFileSync(
  componentFile,
  `"use client";

import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Text,
  makeStyles,
  tokens as fluentTokens,
} from "@fluentui/react-components";
import { Sparkle24Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface ${componentName}Props {
  /** Display title for the generated task prototype. */
  title?: string;
  /** Short summary of what this prototype demonstrates. */
  description?: string;
}

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: tokens.spacingVerticalXL,
    minHeight: "100vh",
    alignContent: "center",
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalXXXL,
    paddingRight: tokens.spacingHorizontalXXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
    paddingLeft: tokens.spacingHorizontalXXXL,
  },
  hero: {
    display: "grid",
    gap: tokens.spacingVerticalM,
    maxWidth: "760px",
  },
  eyebrow: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    maxWidth: "640px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderTopColor: tokens.colorNeutralStroke2,
    borderRightColor: tokens.colorNeutralStroke2,
    borderBottomColor: tokens.colorNeutralStroke2,
    borderLeftColor: tokens.colorNeutralStroke2,
  },
});

/**
 * Starter Fluent UI v9 task prototype generated by create-task-prototype.
 * Replace the cards with the task-specific journey, states, and interactions.
 */
export default function ${componentName}({
  title = "${escapeString(title)}",
  description = "${escapeString(description)}",
}: ${componentName}Props) {
  const styles = useStyles();

  return (
    <main className={styles.root} aria-labelledby="${taskId}-title">
      <section className={styles.hero}>
        <Badge appearance="tint" color="brand" icon={<Sparkle24Regular />}>
          Task prototype
        </Badge>
        <Text as="h1" id="${taskId}-title" className={styles.title}>
          {title}
        </Text>
        <Text as="p" className={styles.description}>
          {description}
        </Text>
      </section>

      <section className={styles.cardGrid} aria-label="Prototype starter areas">
        {["Define the user moment", "Compose Fluent components", "Verify with Storybook"].map((item) => (
          <Card key={item} className={styles.card}>
            <CardHeader header={<Text weight="semibold">{item}</Text>} />
            <Text>
              Swap this starter content for task-specific screens, interaction states, and validation notes.
            </Text>
            <CardFooter>
              <Button appearance="secondary">Update section</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
`,
);
console.log(`  ✓ Created components/projects/${taskId}/index.tsx`);

const newEntry = `
  {
    id: "${taskId}",
    title: "${escapeString(title)}",
    description:
      "${escapeString(description)}",
    owner: "DesignLoop",
    team: "DesignLoop",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["discover", "build"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "projects/${taskId}/index.tsx",
    purpose: "poc",
    tags: ["task-prototype", "${taskId}"],
    source: { type: "local", route: "/${taskId}" },
    connections: [],
    icon: "Sparkle24Regular",
    featured: true,
  },`;

let updatedProjectsContent = projectsContent;
if (registryExists) {
  updatedProjectsContent = updatedProjectsContent.replace(entryPattern, newEntry);
} else {
  const insertionMarker = "\n];";
  const insertionIndex = updatedProjectsContent.lastIndexOf(insertionMarker);
  if (insertionIndex === -1) {
    console.error("❌ Could not find insertion point in data/projects.ts. Please add this entry manually:");
    console.log(newEntry);
    process.exit(1);
  }
  updatedProjectsContent =
    updatedProjectsContent.slice(0, insertionIndex) +
    newEntry +
    updatedProjectsContent.slice(insertionIndex);
}
writeFileSync(projectsFile, updatedProjectsContent);
console.log(`  ✓ ${registryExists ? "Updated" : "Added"} project entry in data/projects.ts`);

console.log(`\n✅ Task prototype "${taskId}" is ready at /${taskId}\n`);
