# ADO → CIX Roadmap Sync

Automatically pulls Azure DevOps Features/Epics into `data/cix-roadmaps-seed.json`
via a scheduled GitHub Actions workflow.

---

## Files

| File | Purpose |
|------|---------|
| `scripts/sync-ado-roadmap.mjs` | Node.js sync script — fetches ADO, merges, writes seed |
| `scripts/ado-roadmap-config.json` | All connection settings, field mappings, area path rules |
| `.github/workflows/sync-ado-roadmap.yml` | Scheduled workflow (Tue + Fri, 9 AM PT) + manual trigger |

---

## One-time setup

### 1. Create an ADO Personal Access Token

1. Go to [https://dev.azure.com/msazure](https://dev.azure.com/msazure) → **User Settings** → **Personal Access Tokens**
2. Click **New Token**
3. Set expiry to 1 year, scope: **Work Items → Read**
4. Copy the token — you won't see it again

### 2. Add the PAT as a GitHub Secret

1. Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
2. Name: `ADO_PAT`
3. Value: paste the PAT

### 3. Update area path config

Open `scripts/ado-roadmap-config.json` and update the `areaRoot` and `areaPathMap`
to match your actual ADO area paths:

```json
"ado": {
  "areaRoot": "One\\CIX"     ← the UNDER clause for the WIQL query
},
"areaPathMap": {
  "Storage": ["CIX\\Storage"],      ← substrings to match against System.AreaPath
  "Compute": ["CIX\\Compute"],
  "AKS":     ["CIX\\AKS"],
  "Horizontal": ["CIX\\Horizontal"]
}
```

To find the correct paths: in ADO, go to **Project Settings** → **Team configuration** → **Areas**.

### 4. Configure hybrid sources (query + follow)

The sync now supports both:

1. **Query-driven pulls** (area path, tag filters, state filters)
2. **Explicitly followed items** (specific Feature/Epic IDs or URLs)

Example:

```json
"sources": {
  "queries": [
    {
      "name": "Storage tagged priorities",
      "enabled": true,
      "areaPathUnder": "One\\CIX\\Storage",
      "workItemTypes": ["Feature", "Epic"],
      "excludeStates": ["Closed", "Removed", "Cut"],
      "includeTagsAny": ["Roadmap", "CIX"],
      "includeTagsAll": ["FY27"],
      "maxResults": 200
    }
  ],
  "follow": [
    { "id": 36363432, "forceArea": "Storage" },
    { "url": "https://msazure.visualstudio.com/One/_workitems/edit/41234567", "forceArea": "Horizontal" }
  ]
}
```

Notes:
- `includeTagsAny`: item must contain at least one tag in this list
- `includeTagsAll`: item must contain all tags in this list
- `follow`: items are always fetched even if no query matches them
- `forceArea`: optional override to place a followed item in a specific roadmap area

---

## Running locally

```bash
# Install nothing — uses Node 18+ built-in fetch
export ADO_PAT=<your-pat>

# Full sync (all areas, writes data/cix-roadmaps-seed.json)
node scripts/sync-ado-roadmap.mjs

# Dry run — prints merged JSON, does NOT write the file
node scripts/sync-ado-roadmap.mjs --dry-run

# Sync one area only
node scripts/sync-ado-roadmap.mjs --area Storage

# Combine
node scripts/sync-ado-roadmap.mjs --area AKS --dry-run

# Validate your hybrid source config first
node scripts/sync-ado-roadmap.mjs --dry-run
```

---

## How the merge works

The sync key is the **ADO work item URL** stored in the `link` field:

```
https://msazure.visualstudio.com/One/_workitems/edit/36363432
```

| Seed item condition | Action |
|---------------------|--------|
| Has no `link` (manual entry) | **Never touched** — always preserved as-is |
| Has `link` matching an ADO item | ADO fields updated; `notes` and `stakeholders` preserved from seed |
| Has `link` but ADO item no longer returned (closed/cut) | Kept as-is by default (`removeClosedItems: false`) |
| ADO item with no matching seed entry | **Appended** to the area array |

To change the preserved-manual fields, edit `mergeCfg.preserveManualFields` in the config.

---

## Field mapping

| Roadmap field | ADO field | Notes |
|---------------|-----------|-------|
| `name` | `System.Title` | |
| `assignee` | `System.AssignedTo` | First name by default (`assigneeFormat: "firstName"`) |
| `start` | `Microsoft.VSTS.Scheduling.StartDate` | ISO → "Mon D" |
| `end` | `Microsoft.VSTS.Scheduling.TargetDate` | ISO → "Mon D" |
| `status` | `System.State` | Raw ADO state string |
| `priority` | `Microsoft.VSTS.Common.Priority` | 1→P0, 2→P1, 3→P2, 4→P3 |
| `size` | `Microsoft.VSTS.Scheduling.StoryPoints` | Points → S/M/L/XL |
| `stakeholders` | `System.Tags` | Raw tag string |
| `notes` | — | Always manual — never overwritten |
| `link` | Constructed from `System.Id` | Used as sync key |

To change any mapping, edit `fieldMap` in `ado-roadmap-config.json` — no script changes needed.

---

## Phased rollout (recommended)

**Phase 1 — Storage pilot**
1. Complete setup steps above
2. Run: `node scripts/sync-ado-roadmap.mjs --area Storage --dry-run`
3. Review output — verify area path matching and date formatting
4. If good: `node scripts/sync-ado-roadmap.mjs --area Storage`
5. Commit and verify the roadmap renders correctly at `/cix-roadmaps`

**Phase 2 — All areas**
1. Run: `node scripts/sync-ado-roadmap.mjs --dry-run`
2. Review merged output for each area
3. Enable the scheduled workflow in `.github/workflows/sync-ado-roadmap.yml`

**Phase 3 — Steady state**
- Workflow runs automatically Tuesday + Friday
- Each run creates a PR if data changed
- Reviewer merges; the static site rebuilds

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `ADO_PAT environment variable is not set` | `export ADO_PAT=<pat>` before running |
| `401 Unauthorized` | PAT expired or missing Work Items scope — regenerate |
| `404 Not Found` | Check `ado.organization`, `ado.project`, and `ado.areaRoot` in config |
| Items appear in `null` area / skipped | `areaPathMap` patterns don't match — run `--dry-run` and check the `[skip]` warnings |
| Followed item not found | Verify the item exists in the same ADO org/project and the PAT can read it |
| Dates show as empty string | Work items have no `StartDate`/`TargetDate` set in ADO — populate them or leave as `""` |
| Manual notes got overwritten | Add `"notes"` to `merge.preserveManualFields` in config (it's there by default) |
