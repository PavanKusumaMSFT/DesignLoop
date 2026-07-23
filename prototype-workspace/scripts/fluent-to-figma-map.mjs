#!/usr/bin/env node

/**
 * fluent-to-figma-map.mjs — Reverse token mapping (Fluent v9 → Figma variable)
 *
 * The mirror of the FIGMA_TO_FLUENT table in `figma-extract.mjs`. Where that
 * script maps Figma variable names to Fluent tokens (Figma → code), this module
 * maps Fluent v9 token names back to their Figma variable names (code → Figma),
 * so the `fluent-to-figma` skill can bind native Figma variables to layers it
 * creates instead of writing raw hex/px values.
 *
 * Usage (print the map for embedding in a Figma MCP write prompt):
 *   node scripts/fluent-to-figma-map.mjs            # pretty JSON of FLUENT_TO_FIGMA
 *   node scripts/fluent-to-figma-map.mjs colorNeutralBackground1   # single lookup
 *
 * Programmatic:
 *   import { FLUENT_TO_FIGMA, figmaVarFor } from "./fluent-to-figma-map.mjs";
 */

// ---------------------------------------------------------------------------
// Figma variable name → Fluent v9 token (kept in sync with figma-extract.mjs)
// ---------------------------------------------------------------------------

export const FIGMA_TO_FLUENT = {
  // Colors
  "Neutral/Background/1/Rest": "colorNeutralBackground1",
  "Neutral/Background/2/Rest": "colorNeutralBackground2",
  "Neutral/Background/3/Rest": "colorNeutralBackground3",
  "Neutral/Background/4/Rest": "colorNeutralBackground4",
  "Neutral/Background/5/Rest": "colorNeutralBackground5",
  "Neutral/Background/6": "colorNeutralBackground6",
  "Neutral/Background/1/Hover": "colorNeutralBackground1Hover",
  "Neutral/Background/1/Pressed": "colorNeutralBackground1Pressed",
  "Neutral/Foreground/1/Rest": "colorNeutralForeground1",
  "Neutral/Foreground/2/Rest": "colorNeutralForeground2",
  "Neutral/Foreground/3/Rest": "colorNeutralForeground3",
  "Neutral/Foreground/Disabled/Rest": "colorNeutralForegroundDisabled",
  "Neutral/Foreground/On Brand/Rest": "colorNeutralForegroundOnBrand",
  "Neutral/Stroke/1/Rest": "colorNeutralStroke1",
  "Neutral/Stroke/2/Rest": "colorNeutralStroke2",
  "Neutral/Stroke/Accessible/Rest": "colorNeutralStrokeAccessible",
  "Brand/Background/1/Rest": "colorBrandBackground",
  "Brand/Background/2/Rest": "colorBrandBackground2",
  "Brand/Foreground/1/Rest": "colorBrandForeground1",
  "Brand/Foreground/Link/Rest": "colorBrandForegroundLink",
  "Brand/Stroke/1/Rest": "colorBrandStroke1",
  "Compound Brand/Background/Rest": "colorCompoundBrandBackground",
  "Status/Danger/Foreground/1": "colorStatusDangerForeground1",
  "Status/Success/Foreground/1": "colorStatusSuccessForeground1",
  "Status/Warning/Foreground/1": "colorStatusWarningForeground1",

  // Corner radius
  "Corner radius/None": "borderRadiusNone",
  "Corner radius/Small": "borderRadiusSmall",
  "Corner radius/Medium": "borderRadiusMedium",
  "Corner radius/Large": "borderRadiusLarge",
  "Corner radius/XLarge": "borderRadiusXLarge",
  "Corner radius/Circular": "borderRadiusCircular",

  // Stroke width
  "Stroke width/Thin": "strokeWidthThin",
  "Stroke width/Thick": "strokeWidthThick",
  "Stroke width/Thicker": "strokeWidthThicker",
  "Stroke width/Thickest": "strokeWidthThickest",

  // Spacing (common ones)
  spacingHorizontalNone: "spacingHorizontalNone",
  spacingHorizontalXXS: "spacingHorizontalXXS",
  spacingHorizontalXS: "spacingHorizontalXS",
  spacingHorizontalS: "spacingHorizontalS",
  spacingHorizontalM: "spacingHorizontalM",
  spacingHorizontalL: "spacingHorizontalL",
  spacingHorizontalXL: "spacingHorizontalXL",
  spacingHorizontalXXL: "spacingHorizontalXXL",
  spacingVerticalNone: "spacingVerticalNone",
  spacingVerticalXXS: "spacingVerticalXXS",
  spacingVerticalXS: "spacingVerticalXS",
  spacingVerticalS: "spacingVerticalS",
  spacingVerticalM: "spacingVerticalM",
  spacingVerticalL: "spacingVerticalL",
  spacingVerticalXL: "spacingVerticalXL",
  spacingVerticalXXL: "spacingVerticalXXL",
};

// ---------------------------------------------------------------------------
// Inverted map: Fluent v9 token → Figma variable name.
// When multiple Figma names map to the same Fluent token the first wins.
// ---------------------------------------------------------------------------

export const FLUENT_TO_FIGMA = Object.entries(FIGMA_TO_FLUENT).reduce(
  (acc, [figmaName, fluentToken]) => {
    if (!(fluentToken in acc)) acc[fluentToken] = figmaName;
    return acc;
  },
  /** @type {Record<string,string>} */ ({}),
);

// ---------------------------------------------------------------------------
// Resolved numeric/px reference values for tokens that are sizes, so the skill
// can fall back to a literal when a matching Figma variable is unavailable in
// the target file's library. Values mirror Fluent v9 defaults.
// ---------------------------------------------------------------------------

export const FLUENT_SIZE_VALUES = {
  borderRadiusNone: 0,
  borderRadiusSmall: 2,
  borderRadiusMedium: 4,
  borderRadiusLarge: 6,
  borderRadiusXLarge: 8,
  borderRadiusCircular: 9999,
  strokeWidthThin: 1,
  strokeWidthThick: 2,
  strokeWidthThicker: 3,
  strokeWidthThickest: 4,
  spacingHorizontalNone: 0,
  spacingVerticalNone: 0,
  spacingHorizontalXXS: 2,
  spacingVerticalXXS: 2,
  spacingHorizontalXS: 4,
  spacingVerticalXS: 4,
  spacingHorizontalS: 8,
  spacingVerticalS: 8,
  spacingHorizontalM: 12,
  spacingVerticalM: 12,
  spacingHorizontalL: 16,
  spacingVerticalL: 16,
  spacingHorizontalXL: 20,
  spacingVerticalXL: 20,
  spacingHorizontalXXL: 24,
  spacingVerticalXXL: 24,
};

/** Look up the Figma variable name for a Fluent token, or null if unmapped. */
export function figmaVarFor(fluentToken) {
  return FLUENT_TO_FIGMA[fluentToken] || null;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const isMain =
  import.meta.url === `file://${process.argv[1]}` ||
  (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()));

if (isMain) {
  const arg = process.argv[2];
  if (arg) {
    const figmaName = figmaVarFor(arg);
    if (figmaName) {
      console.log(figmaName);
    } else {
      console.error(`No Figma variable mapped for Fluent token "${arg}".`);
      process.exit(1);
    }
  } else {
    console.log(JSON.stringify(FLUENT_TO_FIGMA, null, 2));
  }
}
