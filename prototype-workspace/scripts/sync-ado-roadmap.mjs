#!/usr/bin/env node
/**
 * sync-ado-roadmap.mjs
 *
 * Pulls Azure DevOps Features/Epics from the msazure/One project and merges them
 * into data/cix-roadmaps-seed.json.
 *
 * Usage:
 *   ADO_PAT=<your-pat> node scripts/sync-ado-roadmap.mjs [--dry-run]
 *
 * Required env vars:
 *   ADO_PAT  — Personal Access Token with "Work Items (Read)" scope
 *
 * Options:
 *   --dry-run   Print the merged JSON to stdout instead of writing the file
 *   --area <X>  Only sync a single area (Storage | Compute | AKS | Horizontal)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Paths ──────────────────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, "..");
const SEED_PATH = resolve(ROOT, "data/cix-roadmaps-seed.json");
const CONFIG_PATH = resolve(__dir, "ado-roadmap-config.json");

// ── CLI args ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const AREA_FILTER = (() => {
  const idx = args.indexOf("--area");
  return idx !== -1 ? args[idx + 1] : null;
})();

// ── Config + PAT ──────────────────────────────────────────────────────────────
const cfg = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
const PAT = process.env.ADO_PAT;

if (!PAT) {
  console.error("[sync-ado-roadmap] ERROR: ADO_PAT environment variable is not set.");
  console.error("  Set it with: export ADO_PAT=<your-personal-access-token>");
  process.exit(1);
}

const { ado, areaPathMap, fallbackArea, fieldMap, assigneeFormat,
  priorityMap, storyPointsSizeMap, merge: mergeCfg } = cfg;

const sourcesCfg = cfg.sources ?? {};
const querySources = Array.isArray(sourcesCfg.queries) ? sourcesCfg.queries : [];
const followSources = Array.isArray(sourcesCfg.follow) ? sourcesCfg.follow : [];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Base64-encode `:PAT` for Basic auth */
const authHeader = `Basic ${Buffer.from(`:${PAT}`).toString("base64")}`;

const HEADERS = {
  Authorization: authHeader,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const ADO_BASE = `https://dev.azure.com/${ado.organization}/${ado.project}/_apis`;
const ITEM_URL_BASE = `https://msazure.visualstudio.com/${ado.project}/_workitems/edit`;

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** Convert ISO date string → "Mon D" (e.g. "Apr 1"). Returns "" for null/undefined. */
function isoToMonthDay(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${MONTH_ABBR[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** Render AssignedTo object according to assigneeFormat config */
function renderAssignee(assignedTo) {
  if (!assignedTo) return "";
  const displayName = assignedTo.displayName ?? "";
  const uniqueName = assignedTo.uniqueName ?? "";

  switch (assigneeFormat) {
    case "fullName":
      return displayName;
    case "email":
      return uniqueName.split("@")[0] ?? displayName;
    case "firstName":
    default:
      return displayName.split(" ")[0] ?? displayName;
  }
}

/** Map ADO priority integer → roadmap priority string */
function mapPriority(value) {
  if (value == null) return "";
  return priorityMap[String(value)] ?? String(value);
}

/** Map ADO story points number → roadmap size S/M/L/XL */
function mapSize(value) {
  if (value == null) return "";
  return storyPointsSizeMap[String(value)] ?? "";
}

/** Determine which roadmap area this ADO area path belongs to. Returns null if unmatched. */
function classifyAreaPath(areaPath) {
  for (const [area, patterns] of Object.entries(areaPathMap)) {
    for (const pattern of patterns) {
      if (areaPath.includes(pattern)) return area;
    }
  }
  return fallbackArea ?? null;
}

/** Sleep helper for rate-limit retries */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Fetch with basic retry on 429/503 */
async function fetchWithRetry(url, options, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, options);
    if (res.ok) return res;

    if ((res.status === 429 || res.status === 503) && attempt < retries) {
      const wait = attempt * 2000;
      console.warn(`  [retry] ${res.status} — waiting ${wait}ms (attempt ${attempt}/${retries})`);
      await sleep(wait);
      continue;
    }

    const body = await res.text().catch(() => "");
    throw new Error(`ADO request failed: ${res.status} ${res.statusText}\n  URL: ${url}\n  Body: ${body}`);
  }
}

// ── Step 1: WIQL query — get all matching work item IDs ───────────────────────

function parseFollowId(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10);
  }

  const match = trimmed.match(/\/edit\/(\d+)/i);
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

function buildTagClause(tagsAny, tagsAll) {
  const any = (tagsAny ?? []).filter(Boolean);
  const all = (tagsAll ?? []).filter(Boolean);

  const clauses = [];

  if (any.length > 0) {
    clauses.push(`(${any.map((tag) => `[System.Tags] CONTAINS '${tag}'`).join(" OR ")})`);
  }

  if (all.length > 0) {
    clauses.push(...all.map((tag) => `[System.Tags] CONTAINS '${tag}'`));
  }

  return clauses;
}

async function fetchQueryWorkItemIds(querySource) {
  const areaPathUnder = querySource.areaPathUnder ?? ado.areaRoot;
  const workItemTypes = querySource.workItemTypes ?? ado.workItemTypes;
  const excludeStates = querySource.excludeStates ?? ado.excludeStates;
  const maxResults = querySource.maxResults ?? ado.maxResults;
  const tagClauses = buildTagClause(querySource.includeTagsAny, querySource.includeTagsAll);

  if (!areaPathUnder) {
    throw new Error(`Query source \"${querySource.name ?? "unnamed"}\" is missing areaPathUnder`);
  }

  const wiql = {
    query: `
      SELECT [System.Id]
      FROM WorkItems
      WHERE [System.TeamProject] = '${ado.project}'
        AND [System.WorkItemType] IN (${workItemTypes.map((t) => `'${t}'`).join(", ")})
        AND [System.AreaPath] UNDER '${areaPathUnder}'
        AND [System.State] NOT IN (${excludeStates.map((s) => `'${s}'`).join(", ")})
        ${tagClauses.map((clause) => `AND ${clause}`).join("\n        ")}
      ORDER BY [System.CreatedDate] DESC
    `,
  };

  const url = `${ADO_BASE}/wit/wiql?api-version=${ado.apiVersion}&$top=${maxResults}`;
  console.log(`  [query] ${querySource.name ?? "unnamed"} (max ${maxResults})`);

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(wiql),
  });

  const data = await res.json();
  const ids = (data.workItems ?? []).map((wi) => wi.id);
  console.log(`          → ${ids.length} ID(s)`);
  return ids;
}

async function fetchCombinedWorkItemIds() {
  const idSet = new Set();
  const followAreaOverrides = new Map();

  console.log("[1/3] Collecting work item IDs from query sources and follow list...");

  const activeQueries = querySources.filter((querySource) => querySource.enabled !== false);
  for (const querySource of activeQueries) {
    const ids = await fetchQueryWorkItemIds(querySource);
    for (const id of ids) {
      idSet.add(id);
    }
  }

  let followCount = 0;
  for (const followEntry of followSources) {
    const parsedId = parseFollowId(followEntry.id ?? followEntry.url);
    if (!parsedId) {
      console.warn("  [follow skip] Invalid follow entry. Provide id or url.");
      continue;
    }

    idSet.add(parsedId);
    followCount += 1;

    if (followEntry.forceArea) {
      followAreaOverrides.set(parsedId, followEntry.forceArea);
    }
  }

  console.log(`      → ${idSet.size} unique ID(s) total (${activeQueries.length} query source(s), ${followCount} follow item(s))`);
  return { ids: Array.from(idSet), followAreaOverrides };
}

// ── Step 2: Batch-fetch full work item details ────────────────────────────────

/** ADO batch endpoint supports max 200 IDs per request */
const BATCH_SIZE = 200;

// All fields we need to retrieve
const FIELDS_TO_FETCH = [
  "System.Id",
  "System.Title",
  "System.AssignedTo",
  "System.AreaPath",
  "System.State",
  "System.Tags",
  "Microsoft.VSTS.Common.Priority",
  "Microsoft.VSTS.Scheduling.StartDate",
  "Microsoft.VSTS.Scheduling.TargetDate",
  "Microsoft.VSTS.Scheduling.StoryPoints",
].join(",");

async function fetchWorkItemDetails(ids) {
  const allItems = [];
  const batches = [];

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    batches.push(ids.slice(i, i + BATCH_SIZE));
  }

  console.log(`[2/3] Fetching work item details (${batches.length} batch(es))…`);

  for (let b = 0; b < batches.length; b++) {
    const batchIds = batches[b].join(",");
    const url = `${ADO_BASE}/wit/workitems?ids=${batchIds}&fields=${FIELDS_TO_FETCH}&api-version=${ado.apiVersion}`;

    const res = await fetchWithRetry(url, { headers: HEADERS });
    const data = await res.json();
    allItems.push(...(data.value ?? []));

    if (b < batches.length - 1) await sleep(300); // gentle rate limiting
  }

  console.log(`      → ${allItems.length} work items fetched`);
  return allItems;
}

// ── Step 3: Map ADO work item → roadmap TimelineItem shape ───────────────────

function mapToRoadmapItem(adoItem) {
  const f = adoItem.fields;

  const id = adoItem.id;
  const link = `${ITEM_URL_BASE}/${id}`;

  return {
    name:         f["System.Title"] ?? "",
    assignee:     renderAssignee(f["System.AssignedTo"]),
    start:        isoToMonthDay(f[fieldMap.start]),
    end:          isoToMonthDay(f[fieldMap.end]),
    notes:        "",                       // notes are always manual — never overwrite
    size:         mapSize(f[fieldMap.size]),
    status:       f["System.State"] ?? "",
    priority:     mapPriority(f[fieldMap.priority]),
    stakeholders: f["System.Tags"] ?? "",   // tags as stakeholders (configurable to keep manual)
    link,
  };
}

// ── Step 4: Merge ADO items into existing seed ────────────────────────────────

/**
 * Merges adoItems (for one area) into the existing seedItems array.
 *
 * Rules:
 *  - Existing items WITHOUT a `link` → untouched (manual entries)
 *  - Existing items WITH a `link` that matches an ADO item → ADO fields updated,
 *    fields in mergeCfg.preserveManualFields preserved from seed
 *  - ADO items not in seed → appended (if mergeCfg.appendNewItems)
 *  - Seed items whose ADO link is no longer in the ADO result set:
 *      if mergeCfg.removeClosedItems → removed
 *      else → kept as-is (safe default)
 */
function mergeArea(seedItems, adoItems) {
  const adoByLink = new Map(adoItems.map((item) => [item.link, item]));
  const seenLinks = new Set();

  const merged = seedItems.map((seedItem) => {
    if (!seedItem.link) return seedItem; // manual item — leave untouched

    const adoItem = adoByLink.get(seedItem.link);
    seenLinks.add(seedItem.link);

    if (!adoItem) {
      // Item no longer in ADO (closed/cut)
      if (mergeCfg.removeClosedItems) {
        return null; // will be filtered out
      }
      return seedItem; // keep as-is
    }

    // Merge: ADO wins on all fields EXCEPT preserveManualFields
    const updated = { ...adoItem };
    for (const field of (mergeCfg.preserveManualFields ?? [])) {
      if (seedItem[field] !== undefined) {
        updated[field] = seedItem[field];
      }
    }
    return updated;
  }).filter(Boolean);

  // Append new ADO items not yet in seed
  if (mergeCfg.appendNewItems) {
    for (const adoItem of adoItems) {
      if (!seenLinks.has(adoItem.link)) {
        merged.push(adoItem);
      }
    }
  }

  return merged;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║         CIX Roadmap ← ADO Sync Script           ║");
  console.log("╚══════════════════════════════════════════════════╝");
  if (DRY_RUN) console.log("  [DRY RUN — no files will be written]\n");
  if (AREA_FILTER) console.log(`  [Filtering to area: ${AREA_FILTER}]\n`);

  // Load existing seed
  const existingSeed = JSON.parse(readFileSync(SEED_PATH, "utf8"));

  // Fetch from ADO
  const { ids, followAreaOverrides } = await fetchCombinedWorkItemIds();

  if (ids.length === 0) {
    console.log("\nNo work items returned — nothing to sync. Exiting.");
    process.exit(0);
  }

  const adoItems = await fetchWorkItemDetails(ids);

  // Classify items by area
  const byArea = { Storage: [], Compute: [], AKS: [], Horizontal: [] };

  for (const adoItem of adoItems) {
    const forcedArea = followAreaOverrides.get(adoItem.id);
    const areaPath = adoItem.fields["System.AreaPath"] ?? "";
    const area = forcedArea ?? classifyAreaPath(areaPath);

    if (!area) {
      console.warn(`  [skip] "${adoItem.fields["System.Title"]}" — area path "${areaPath}" not mapped`);
      continue;
    }

    if (AREA_FILTER && area !== AREA_FILTER) continue;

    byArea[area].push(mapToRoadmapItem(adoItem));
  }

  const counts = Object.entries(byArea).map(([a, items]) => `${a}: ${items.length}`).join(", ");
  console.log(`[3/3] Classifying ADO items → ${counts}`);

  // Merge
  const output = { ...existingSeed };
  const areas = AREA_FILTER ? [AREA_FILTER] : Object.keys(byArea);

  let totalChanges = 0;
  for (const area of areas) {
    const before = JSON.stringify(existingSeed[area] ?? []);
    const merged = mergeArea(existingSeed[area] ?? [], byArea[area]);
    const after = JSON.stringify(merged);

    if (before !== after) {
      totalChanges++;
      console.log(`  ✓ ${area}: merged (${(existingSeed[area] ?? []).length} → ${merged.length} items)`);
    } else {
      console.log(`  · ${area}: no changes`);
    }

    output[area] = merged;
  }

  if (totalChanges === 0) {
    console.log("\nSeed is already up to date. Nothing to write.");
    process.exit(0);
  }

  const json = JSON.stringify(output, null, 2) + "\n";

  if (DRY_RUN) {
    console.log("\n── Merged output (dry run) ──────────────────────────\n");
    console.log(json);
  } else {
    writeFileSync(SEED_PATH, json, "utf8");
    console.log(`\n✅  Written to ${SEED_PATH}`);
  }
}

main().catch((err) => {
  console.error("\n[sync-ado-roadmap] FATAL:", err.message ?? err);
  process.exit(1);
});
