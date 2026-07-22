#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd());
const outputDir = path.join(root, "extracted", "design-system-kit");

const exactFiles = new Set([
  "AGENTS.md",
  "package.json",
  "next.config.mjs",
  "tsconfig.json",
  "postcss.config.mjs",
  "svg.d.ts",
  path.join("styles", "globals.css"),
  path.join("styles", "v8-tokens.css"),
  path.join("components", "auth", "auth-providers.tsx"),
  path.join("components", "auth", "auth-wrapper.tsx"),
  path.join("components", "auth", "login-page.tsx"),
  path.join("components", "shared", "page-header.tsx"),
  path.join("components", "shared", "page-breadcrumb.tsx"),
  path.join("components", "shared", "project-layout.tsx"),
  path.join("components", "shared", "navigation-panel.tsx"),
  path.join("components", "shared", "wizard-action-bar.tsx"),
  path.join("components", "shared", "wizard-cost-panel.tsx"),
  path.join("components", "shared", "wizard-layout.tsx"),
  path.join("components", "shared", "wizard-section.tsx"),
  path.join("components", "shared", "wizard-step-nav.tsx"),
  path.join("components", "shared", "theme-provider.tsx"),
  path.join("lib", "asset-utils.ts"),
  path.join("lib", "favorites-context.tsx"),
  path.join("lib", "msal-config.ts"),
  path.join("lib", "navigation-context.tsx"),
  path.join("lib", "agents", "security-audit-contract.ts"),
  path.join("data", "agents.ts"),
  path.join("data", "projects.ts"),
  path.join("data", "manage-dashboard-data.ts"),
  path.join("data", "search-mock-data.ts"),
  path.join("data", "security-audit.ts"),
  path.join("scripts", "create-project.mjs"),
  path.join("scripts", "promote-component.mjs"),
  path.join("scripts", "figma-extract.mjs"),
  path.join("docs", "insights-responsive-behavior.md"),
]);

const prefixMatches = [
  path.join("components", "shared", "v8-"),
  path.join("components", "shared", "v8-chart-utils"),
];

const requiredDependencies = {
  dependencies: [
    "@azure/msal-browser",
    "@azure/msal-react",
    "@fluentui-copilot/react-copilot",
    "@fluentui-copilot/react-latency",
    "@fluentui-copilot/react-morse-code",
    "@fluentui/react-charting",
    "@fluentui/react-components",
    "@fluentui/react-icons",
    "next",
    "next-themes",
    "react",
    "react-dom",
    "recharts",
  ],
  devDependencies: ["@svgr/webpack", "@types/node", "@types/react", "@types/react-dom", "typescript"],
};

function normalize(relPath) {
  return relPath.split(path.sep).join(path.posix.sep);
}

function shouldInclude(relPath) {
  if (exactFiles.has(relPath)) return true;
  return prefixMatches.some((prefix) => relPath.startsWith(prefix));
}

async function walk(dir, maxDepth = 10, currentDepth = 0) {
  if (currentDepth >= maxDepth) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    const relToRoot = normalize(path.relative(root, abs));
    if (relToRoot.startsWith(".git/") || relToRoot.startsWith("node_modules/") || relToRoot.startsWith(".next/") || relToRoot.startsWith("extracted/")) {
      continue;
    }
    if (entry.isDirectory()) {
      files.push(...(await walk(abs, maxDepth, currentDepth + 1)));
    } else if (entry.isFile()) {
      files.push(abs);
    }
  }
  return files;
}

async function ensureCleanDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function copyRelativeFile(relPath) {
  const src = path.join(root, relPath);
  const dest = path.join(outputDir, relPath);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

async function main() {
  const allFilesAbs = await walk(root);
  const allRelFiles = allFilesAbs
    .map((abs) => normalize(path.relative(root, abs)))
    .filter((relPath) =>
      !relPath.startsWith(".git/") &&
      !relPath.startsWith("node_modules/") &&
      !relPath.startsWith(".next/") &&
      !relPath.startsWith("extracted/")
    );

  const selected = allRelFiles.filter((relPath) => shouldInclude(relPath));

  if (selected.length === 0) {
    throw new Error("No files selected. Verify filters in export-design-system-kit.mjs");
  }

  await ensureCleanDir(outputDir);

  for (const relPath of selected) {
    await copyRelativeFile(relPath);
  }

  const packageJson = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
  const deps = packageJson.dependencies ?? {};
  const devDeps = packageJson.devDependencies ?? {};

  const depManifest = {
    generatedAt: new Date().toISOString(),
    sourceRoot: root,
    selectedFiles: selected.length,
    required: {
      dependencies: requiredDependencies.dependencies
        .filter((name) => deps[name])
        .map((name) => ({ name, version: deps[name] })),
      devDependencies: requiredDependencies.devDependencies
        .filter((name) => devDeps[name])
        .map((name) => ({ name, version: devDeps[name] })),
    },
  };

  await fs.writeFile(
    path.join(outputDir, "design-system-dependencies.json"),
    JSON.stringify(depManifest, null, 2),
    "utf8",
  );

  await fs.writeFile(
    path.join(outputDir, "export-manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), files: selected.sort() }, null, 2),
    "utf8",
  );

  console.log(`Exported ${selected.length} files to ${outputDir}`);
  console.log("Generated design-system-dependencies.json and export-manifest.json");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
