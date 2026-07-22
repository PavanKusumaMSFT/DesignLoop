#!/usr/bin/env node

/**
 * create-project — Scaffold a new project in the Azure Portal POC repo.
 *
 * Usage:
 *   node scripts/create-project.mjs <project-id> [flags]
 *
 * Flags:
 *   --team <name>           Team name (e.g., "Search", "Manage", "FRE")
 *   --owner <name>          Feature owner name
 *   --area <area>           Team area: growth | foundations
 *   --sub-area <subArea>    Sub-area: onboarding | activation | wayfinding
 *   --experience <exp>      Experience area: fre | returning | manage | search | create | deploy | optimize | signup | navigation | all-services | cost | cross-cutting
 *   --horizon <horizon>     Timeframe: build-2026 | v1-ideal | vision
 *   --pillar <pillar>       Portal pillar(s): discover | build | manage | search (comma-separated)
 *   --category <category>   Category: signup | manage-monitor | search | discover | navigation | cost
 *   --description <desc>    Brief description
 *   --tags <tags>           Comma-separated tags
 *   --branch                Also create a git branch (<team>/<project-id>)
 *
 * Example:
 *   node scripts/create-project.mjs cost-v2 --team "Cost" --owner "Steph" --experience cost --horizon v1-ideal --branch
 *
 * Creates:
 *   - app/<project-id>/page.tsx                          (ProjectLayout wrapper)
 *   - components/projects/<project-id>/index.tsx (starter component with shell)
 *   - Appends entry to data/projects.ts
 *   - Optionally creates git branch
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

function getFlag(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return null;
  return args[idx + 1];
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

const projectId = args.find((a) => !a.startsWith("--"));
const team = getFlag("team") || "Team";
const owner = getFlag("owner") || "Team";
const area = getFlag("area") || "foundations";
const subArea = getFlag("sub-area") || "wayfinding";
const category = getFlag("category") || "";
const experience = getFlag("experience") || "other";
const template = getFlag("template") || "new";
const pillar = getFlag("pillar") || "";
const horizon = getFlag("horizon") || "build-2026";
const description = getFlag("description") || "";
const tagsFlag = getFlag("tags") || "";
const createBranch = hasFlag("branch");

const VALID_AREAS = ["growth", "foundations"];
const VALID_SUB_AREAS = ["onboarding", "activation", "wayfinding"];
const VALID_CATEGORIES = [
  "signup",
  "manage-monitor",
  "search",
  "discover",
  "navigation",
  "cost",
];
const VALID_PILLARS = [
  "growth",
  "discover",
  "build",
  "manage",
  "shell-intelligence",
];
const VALID_HORIZONS = ["build-2026", "v1-ideal", "vision"];
const VALID_EXPERIENCES = [
  "signup",
  "upgrade",
  "catalog-all-services",
  "onboarding-fre",
  "manage",
  "search-discover",
  "startups",
  "create",
  "cost",
  "agent",
  "other",
];
const VALID_TEMPLATES = ["new", "stitch"];

const HORIZON_TO_TIMEFRAME = {
  "build-2026": "short-term",
  "v1-ideal": "mid-term",
  vision: "vision",
};

const HORIZON_TO_SHELL = {
  "build-2026": "build-mvp",
  "v1-ideal": "build-mvp",
  vision: "vision-topnav",
};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

if (!projectId) {
  console.error(
    `❌ Usage: node scripts/create-project.mjs <project-id> --team <team> --owner <name> --experience <area> --horizon <horizon>`,
  );
  console.error(
    `   Example: node scripts/create-project.mjs cost-v2 --team "Cost" --owner "Steph" --experience cost --horizon v1-ideal --branch`,
  );
  console.error(
    `\n  Teams: ${["Search", "Manage", "FRE", "Growth", "Navigation", "Templates", "Deploy", "Cost", "Vision", "Cross-Team"].join(", ")}`,
  );
  console.error(`  Experiences: ${VALID_EXPERIENCES.join(", ")}`);
  console.error(`  Horizons: ${VALID_HORIZONS.join(", ")}`);
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(projectId)) {
  console.error(
    `❌ Project ID "${projectId}" must be kebab-case (lowercase letters, numbers, hyphens, starting with a letter).`,
  );
  process.exit(1);
}

if (!VALID_AREAS.includes(area)) {
  console.error(
    `❌ Invalid area "${area}". Must be one of: ${VALID_AREAS.join(", ")}`,
  );
  process.exit(1);
}

if (!VALID_SUB_AREAS.includes(subArea)) {
  console.error(
    `❌ Invalid sub-area "${subArea}". Must be one of: ${VALID_SUB_AREAS.join(", ")}`,
  );
  process.exit(1);
}

if (category && !VALID_CATEGORIES.includes(category)) {
  console.error(
    `❌ Invalid category "${category}". Must be one of: ${VALID_CATEGORIES.join(", ")}`,
  );
  process.exit(1);
}

if (!VALID_EXPERIENCES.includes(experience)) {
  console.error(
    `❌ Invalid experience "${experience}". Must be one of: ${VALID_EXPERIENCES.join(", ")}`,
  );
  process.exit(1);
}

if (!VALID_TEMPLATES.includes(template)) {
  console.error(
    `❌ Invalid template "${template}". Must be one of: ${VALID_TEMPLATES.join(", ")}`,
  );
  process.exit(1);
}

if (
  pillar &&
  !pillar.split(",").every((p) => VALID_PILLARS.includes(p.trim()))
) {
  console.error(
    `❌ Invalid pillar "${pillar}". Must be comma-separated values from: ${VALID_PILLARS.join(", ")}`,
  );
  process.exit(1);
}

if (!VALID_HORIZONS.includes(horizon)) {
  console.error(
    `❌ Invalid horizon "${horizon}". Must be one of: ${VALID_HORIZONS.join(", ")}`,
  );
  process.exit(1);
}

const ROOT = resolve(import.meta.dirname, "..");
const appDir = join(ROOT, "app", projectId);
const timeframe = HORIZON_TO_TIMEFRAME[horizon];
const shell = HORIZON_TO_SHELL[horizon];
const projectDir = join(ROOT, "components", "projects", projectId);
const componentFile = join(projectDir, "index.tsx");
const projectsFile = join(ROOT, "data", "projects.ts");

if (existsSync(appDir)) {
  console.error(`❌ Route already exists: app/${projectId}/`);
  process.exit(1);
}

const projectsContent = readFileSync(projectsFile, "utf-8");
if (projectsContent.includes(`id: "${projectId}"`)) {
  console.error(`❌ Project "${projectId}" already exists in data/projects.ts`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Generate component name from project ID
// ---------------------------------------------------------------------------

function toPascalCase(kebab) {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const componentName = toPascalCase(projectId);
const projectTitle = projectId
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

// ---------------------------------------------------------------------------
// Optionally create branch
// ---------------------------------------------------------------------------

if (createBranch) {
  const branchName = `${team.toLowerCase().replace(/\s+/g, "-")}/${projectId}`;
  try {
    execSync(`git checkout -b ${branchName}`, { cwd: ROOT, stdio: "pipe" });
    console.log(`  ✓ Created branch: ${branchName}`);
    try {
      execSync(`git push -u origin ${branchName}`, {
        cwd: ROOT,
        stdio: "pipe",
      });
      console.log(`  ✓ Pushed to remote: origin/${branchName}`);
    } catch (pushErr) {
      console.error(`⚠️  Branch created locally but could not push to remote.`);
      console.error(`   Run manually: git push -u origin ${branchName}`);
    }
  } catch (e) {
    console.error(
      `⚠️  Could not create branch "${branchName}" — ${e.message.trim()}`,
    );
    console.error(
      `   You may need to create it manually: git checkout -b ${branchName}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Shell import based on horizon
// ---------------------------------------------------------------------------

const shellImport =
  shell === "vision-topnav"
    ? `import { TopNav } from "../../shared/top-nav"`
    : shell === "build-mvp"
      ? `import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"`
      : "";

const shellComponent =
  shell === "vision-topnav"
    ? `<TopNav />`
    : shell === "build-mvp"
      ? `<AzureHeaderBuildMVP activeLink="" />`
      : `{/* Add your header here */}`;

// ---------------------------------------------------------------------------
// Create files
// ---------------------------------------------------------------------------

if (template === "stitch") {
  // =========================================================================
  // STITCH template — page-only, composes existing components
  // =========================================================================

  // 1. app/<project-id>/page.tsx — scenario card landing + clickthrough
  mkdirSync(appDir, { recursive: true });

  writeFileSync(
    join(appDir, "page.tsx"),
    `"use client"

import { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Card,
  CardHeader,
  Button,
  Text,
  Badge,
} from "@fluentui/react-components"
import { ArrowLeft24Regular } from "@fluentui/react-icons"
import ProjectLayout from "../../components/shared/project-layout"

// ---- Import the components you're stitching together ----
// import HpFre from "../../components/projects/fre-experiments/hp-fre"
// import ResourceManager from "../../components/projects/post-build-manage/resource-manager"
// import OptimizationAgent from "../../components/projects/optimize/optimization-agent"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  scenarioGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  scenarioCard: {
    cursor: "pointer",
    ":hover": { boxShadow: tokens.shadow8 },
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
    margin: "0",
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase300,
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM,
  },
})

// ---------------------------------------------------------------------------
// Define your scenarios here
// ---------------------------------------------------------------------------

const scenarios = [
  {
    id: "scenario-1",
    tag: "Discover",
    title: "Scenario 1",
    description: "Describe what this scenario demonstrates.",
    view: "scenario-1",
  },
  {
    id: "scenario-2",
    tag: "Build",
    title: "Scenario 2",
    description: "Describe what this scenario demonstrates.",
    view: "scenario-2",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ${componentName}Page() {
  const styles = useStyles()
  const [currentView, setCurrentView] = useState<string>("landing")

  // Map views to components
  const renderView = () => {
    switch (currentView) {
      // case "scenario-1":
      //   return <YourComponent onNavigate={setCurrentView} />
      default:
        return null
    }
  }

  return (
    <ProjectLayout id="${projectId}" fullWidth>
      {currentView === "landing" ? (
        <>
          <div>
            <Text as="h1" className={styles.title}>${projectTitle}</Text>
            <Text className={styles.subtitle}>
              ${description || "Select a scenario to explore the end-to-end experience."}
            </Text>
          </div>

          <div className={styles.scenarioGrid}>
            {scenarios.map((s) => (
              <Card
                key={s.id}
                className={styles.scenarioCard}
                onClick={() => setCurrentView(s.view)}
              >
                <CardHeader
                  header={<Text weight="semibold">{s.title}</Text>}
                  description={<Badge appearance="outline">{s.tag}</Badge>}
                />
                <Text>{s.description}</Text>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <Button
            className={styles.backButton}
            appearance="subtle"
            icon={<ArrowLeft24Regular />}
            onClick={() => setCurrentView("landing")}
          >
            Back to scenarios
          </Button>
          {renderView()}
        </>
      )}
    </ProjectLayout>
  )
}
`,
  );
  console.log(
    `  ✓ Created app/${projectId}/page.tsx (stitch template — scenario cards + clickthrough)`,
  );
} else {
  // =========================================================================
  // NEW template — landing page + starter sub-page
  // =========================================================================

  // 1. app/<project-id>/page.tsx — landing page with links
  mkdirSync(appDir, { recursive: true });
  writeFileSync(
    join(appDir, "page.tsx"),
    `"use client"

import Link from "next/link"
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"
import { ChevronRight16Regular } from "@fluentui/react-icons"
import ProjectLayout from "../../components/shared/project-layout"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  linksList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    maxWidth: "480px",
  },
  linkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: \`1px solid \${tokens.colorNeutralStroke2}\`,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    textDecoration: "none",
    transitionDuration: tokens.durationNormal,
    transitionProperty: "background-color, border-color, box-shadow",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
      boxShadow: tokens.shadow4,
    },
  },
  linkChevron: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
})

const experiences = [
  {
    id: "prototype",
    title: "Prototype",
    route: "/${projectId}/prototype",
  },
  // Add more sub-experiences here
]

export default function ${componentName}Page() {
  const styles = useStyles()

  return (
    <ProjectLayout id="${projectId}">
      <div className={styles.linksList}>
        {experiences.map((exp) => (
          <Link
            key={exp.id}
            href={exp.route}
            className={styles.linkButton}
          >
            <span>{exp.title}</span>
            <ChevronRight16Regular className={styles.linkChevron} />
          </Link>
        ))}
      </div>
    </ProjectLayout>
  )
}
`,
  );
  console.log(`  ✓ Created app/${projectId}/page.tsx (landing page)`);

  // 2. app/<project-id>/prototype/page.tsx — starter sub-page with header
  const protoDir = join(appDir, "prototype");
  mkdirSync(protoDir, { recursive: true });
  writeFileSync(
    join(protoDir, "page.tsx"),
    `"use client"

import { useState } from "react"
import Link from "next/link"
import { FluentProvider, webLightTheme, webDarkTheme, makeStyles, tokens as fluentTokens } from "@fluentui/react-components"
import { ArrowLeft24Regular } from "@fluentui/react-icons"
import { WeatherSunny20Regular, WeatherMoon20Regular } from "@fluentui/react-icons"
import { NavigationProvider } from "../../../lib/navigation-context"
import ${componentName} from "../../../components/projects/${projectId}"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  footer: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    padding: \`\${tokens.spacingVerticalS} \${tokens.spacingHorizontalL}\`,
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: \`\${tokens.spacingVerticalXS} \${tokens.spacingHorizontalM}\`,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: "transparent",
    border: \`1px solid \${tokens.colorNeutralStrokeInvertedDisabled}\`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    textDecoration: "none",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackgroundInvertedDisabled,
    },
  },
  themeToggle: {
    padding: tokens.spacingHorizontalXS,
    backgroundColor: "transparent",
    border: \`1px solid \${tokens.colorNeutralStrokeInvertedDisabled}\`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    color: tokens.colorNeutralForegroundInverted,
    display: "flex",
    alignItems: "center",
  },
})

export default function ${componentName}PrototypePage() {
  const styles = useStyles()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <FluentProvider theme={theme === "light" ? webLightTheme : webDarkTheme}>
      <NavigationProvider>
        <${componentName} isDarkMode={theme === "dark"} />
        <div className={styles.footer}>
          <Link href="/${projectId}" className={styles.backButton}>
            <ArrowLeft24Regular />
            Back to Scenarios
          </Link>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={styles.themeToggle}
          >
            {theme === "light" ? <WeatherMoon20Regular /> : <WeatherSunny20Regular />}
          </button>
        </div>
      </NavigationProvider>
    </FluentProvider>
  )
}
`,
  );
  console.log(
    `  ✓ Created app/${projectId}/prototype/page.tsx (sub-page with header)`,
  );

  // 3. components/projects/<project-id>/index.tsx — the actual prototype component
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(
    componentFile,
    `"use client"

import { makeStyles, tokens as fluentTokens, Text } from "@fluentui/react-components"
${shellImport}

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
  },
  title: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase700,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXXL,
  },
})

export default function ${componentName}({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      ${shellComponent.replace("/>", ` isDarkMode={isDarkMode} />`)}
      <div className={styles.content}>
        <Text as="h1" className={styles.title}>Hello, World!</Text>
        <Text as="p" className={styles.subtitle}>
          ${description || `Start building the ${projectTitle} experience here.`}
        </Text>
      </div>
    </div>
  )
}
`,
  );
  console.log(`  ✓ Created components/projects/${projectId}/index.tsx`);
}

// 3. Append entry to data/projects.ts
const pillarsArray = pillar
  ? pillar.split(",").map((p) => `"${p.trim()}"`)
  : ['"discover"'];

const categoryLine = category ? `\n    category: "${category}",` : "";
const userTags = tagsFlag
  ? tagsFlag.split(",").map((t) => `"${t.trim()}"`)
  : projectId.split("-").map((t) => `"${t}"`);

const newEntry = `
  {
    id: "${projectId}",
    title: "${projectTitle}",
    description:
      "${description || `${projectTitle} — exploration and prototype.`}",
    owner: "${owner}",
    team: "${team}",
    status: "in-progress",
    area: "${area}",
    subArea: "${subArea}",${categoryLine}
    experienceArea: "${experience}",
    pillars: [${pillarsArray.join(", ")}],
    horizon: "${horizon}",
    timeframe: "${timeframe}",
    shell: "${shell}",${template === "new" ? `\n    componentPath: "projects/${projectId}/index.tsx",` : ""}
    tags: [${userTags.join(", ")}],
    source: { type: "local", route: "/${projectId}" },
    connections: [],
    icon: "Sparkle24Regular",
  },`;

const insertionMarker = "\n];";
const insertionIndex = projectsContent.lastIndexOf(insertionMarker);

if (insertionIndex === -1) {
  console.error(
    "❌ Could not find insertion point in data/projects.ts. Please add the entry manually.",
  );
  console.log("\nEntry to add:\n" + newEntry);
} else {
  const updatedContent =
    projectsContent.slice(0, insertionIndex) +
    newEntry +
    projectsContent.slice(insertionIndex);

  writeFileSync(projectsFile, updatedContent);
  console.log(`  ✓ Added project entry to data/projects.ts`);
}

// ---------------------------------------------------------------------------
// Restart dev server if running (new routes need a restart)
// ---------------------------------------------------------------------------

try {
  const lsofResult = execSync("lsof -ti:3000", { cwd: ROOT, stdio: "pipe" })
    .toString()
    .trim();
  if (lsofResult) {
    console.log(
      "\n  ♻️  Restarting dev server (new routes require restart)...",
    );
    execSync("lsof -ti:3000 | xargs kill", { cwd: ROOT, stdio: "pipe" });
    // Small delay to let port free up
    execSync("sleep 1", { cwd: ROOT, stdio: "pipe" });
    // Start server in background
    execSync("npx next dev --turbo &", {
      cwd: ROOT,
      stdio: "ignore",
      detached: true,
    });
    console.log("  ✓ Dev server restarting on http://localhost:3000");
  }
} catch (_e) {
  // No server running — that's fine
}

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------

const componentInfo =
  template === "stitch"
    ? `  Template:    stitch (scenario cards + clickthrough)\n  Page:        app/${projectId}/page.tsx (edit scenarios array and import components)`
    : `  Component:    components/projects/${projectId}/index.tsx`;

console.log(`
✅ Project "${projectId}" scaffolded successfully!

  Route:        /${projectId}
${componentInfo}
  Shell:        ${shell} (${timeframe})
  Team:         ${team}
  Experience:   ${experience}
  Registry:     data/projects.ts

Next steps:
  1. ${template === "stitch" ? `Edit app/${projectId}/page.tsx — add scenarios and import existing components` : `Build your prototype in components/projects/${projectId}/index.tsx`}
  2. Navigate to http://localhost:3000/${projectId}
  3. Open a PR when ready
`);
