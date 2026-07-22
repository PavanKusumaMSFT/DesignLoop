#!/usr/bin/env node

/**
 * figma-extract.mjs — Reusable Figma Plugin API extraction script
 *
 * Generates a compact `use_figma` JS snippet that extracts design tokens,
 * layout properties, and component instances from a Figma node. The output
 * maps Figma variable names to Fluent v9 tokens — no LLM guessing needed.
 *
 * Usage:
 *   # Print the extraction script for a given node ID (paste into use_figma)
 *   node scripts/figma-extract.mjs <nodeId>
 *
 *   # Print with max depth override (default: 3)
 *   node scripts/figma-extract.mjs <nodeId> --depth 4
 *
 * The script is designed to be copy-pasted into the Figma MCP `use_figma`
 * tool. It returns a compact summary like:
 *
 *   Frame "Cost" | fill:colorNeutralBackground1 | stroke:colorNeutralStroke2 | radius:borderRadiusLarge
 *     Layout: VERTICAL, pad:16/16/16/12, gap:0, size:546×391
 *     Children: [Hero media, Header container, ...]
 *
 * This replaces get_design_context for token extraction — use get_screenshot
 * for the visual reference.
 */

// ---------------------------------------------------------------------------
// Figma variable name → Fluent v9 token mapping
// ---------------------------------------------------------------------------

const FIGMA_TO_FLUENT = {
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
// Generate the use_figma extraction script
// ---------------------------------------------------------------------------

const nodeId = process.argv[2];
const depthIdx = process.argv.indexOf("--depth");
const maxDepth = depthIdx !== -1 ? parseInt(process.argv[depthIdx + 1], 10) : 3;

if (!nodeId) {
  console.error("Usage: node scripts/figma-extract.mjs <nodeId> [--depth N]");
  console.error("Example: node scripts/figma-extract.mjs 1:3225");
  process.exit(1);
}

// The mapping table as a JSON string for embedding in the Figma script
const mappingJson = JSON.stringify(FIGMA_TO_FLUENT);

const script = `
// Figma token extraction script — paste into use_figma tool
const FIGMA_TO_FLUENT = ${mappingJson};

function resolveVarName(varId) {
  try {
    const v = figma.variables.getVariableById(varId);
    if (!v) return null;
    const fluentToken = FIGMA_TO_FLUENT[v.name];
    return fluentToken || v.name;
  } catch { return null; }
}

function extractTokens(node) {
  const tokens = {};
  if (!node.boundVariables) return tokens;
  const bv = node.boundVariables;

  // Fill color
  if (bv.fills && bv.fills[0]) {
    const name = resolveVarName(bv.fills[0].id);
    if (name) tokens.fill = name;
  }
  // Stroke color
  if (bv.strokes && bv.strokes[0]) {
    const name = resolveVarName(bv.strokes[0].id);
    if (name) tokens.stroke = name;
  }
  // Corner radius
  if (bv.topLeftRadius) {
    const name = resolveVarName(bv.topLeftRadius.id);
    if (name) tokens.radius = name;
  }
  // Stroke weight
  if (bv.strokeTopWeight) {
    const name = resolveVarName(bv.strokeTopWeight.id);
    if (name) tokens.strokeWidth = name;
  }
  // Spacing (padding)
  for (const side of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) {
    if (bv[side]) {
      const name = resolveVarName(bv[side].id);
      if (name) tokens['pad_' + side.replace('padding', '').toLowerCase()] = name;
    }
  }
  // Item spacing
  if (bv.itemSpacing) {
    const name = resolveVarName(bv.itemSpacing.id);
    if (name) tokens.gap = name;
  }
  return tokens;
}

function summarize(node, depth) {
  if (depth > ${maxDepth}) return node.name + ' (...)';

  const t = extractTokens(node);
  const tokenStr = Object.entries(t).map(([k,v]) => k + ':' + v).join(' | ');

  let line = node.type + ' "' + node.name + '"';
  if (tokenStr) line += ' | ' + tokenStr;

  // Layout info
  if ('layoutMode' in node && node.layoutMode !== 'NONE') {
    const pad = [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft].join('/');
    line += '\\n  Layout: ' + node.layoutMode + ', pad:' + pad + ', gap:' + (node.itemSpacing || 0);
    line += ', size:' + Math.round(node.width) + '×' + Math.round(node.height);
  }

  // Text content
  if (node.type === 'TEXT') {
    line += '\\n  Text: "' + (node.characters || '').substring(0, 50) + '"';
    if (node.fontSize) line += ', fontSize:' + node.fontSize;
    if (node.fontName) line += ', font:' + node.fontName.family + '/' + node.fontName.style;
  }

  // Component instance
  if (node.type === 'INSTANCE' && node.mainComponent) {
    line += '\\n  Instance of: ' + node.mainComponent.name;
  }

  // Children
  if ('children' in node && node.children.length > 0) {
    const childSummaries = node.children.map(c => summarize(c, depth + 1));
    line += '\\n' + childSummaries.map(s => s.split('\\n').map(l => '  ' + l).join('\\n')).join('\\n');
  }

  return line;
}

const node = figma.getNodeById("${nodeId}");
if (!node) return "Node ${nodeId} not found";
return summarize(node, 0);
`;

console.log("// ─── use_figma extraction script for node " + nodeId + " ───");
console.log(
  "// Paste the code below into the use_figma tool's 'code' parameter.",
);
console.log("// Returns a compact token + structure summary.\n");
console.log(script);
