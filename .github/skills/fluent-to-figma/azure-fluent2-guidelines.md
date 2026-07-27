# Azure Fluent 2 Design Guidelines

## What This File Is

This document is a comprehensive design specification written for **AI agents** (such as Copilot, coding agents, and design-to-code tools) that need to create, modify, or reason about Azure portal UI built with Fluent 2.

It captures everything an AI needs to produce correct Azure portal designs without guessing — component structures, variant keys, property values, spacing tokens, color tokens, layout rules, and composition patterns — all extracted directly from the official Azure UI Kit Figma library and the `@fluentui-contrib/azure-theme` package.

**Who should use this:**
- AI agents generating Figma designs via MCP plugins
- Code-generation tools producing Fluent 2 React components for Azure
- Design review agents validating portal UI against Azure standards
- Any automated system that needs to understand Azure portal design conventions

**What's covered:**
- Step-by-step workflows for building Azure blade layouts
- Every component's internal structure, variant properties, and instantiation keys
- Exact color tokens, typography scales, and spacing values
- Composition patterns (how components combine in real page layouts)
- Do/Don't rules to avoid common mistakes

**How to use it:**
1. Find the component or pattern you need in the Table of Contents
2. Read the structure, variant keys, and property values
3. Use the provided component keys for Figma instantiation or the token names for code
4. Follow the golden rules and layout conventions for correct composition
5. **For Figma MCP:** See the [Figma MCP Agent Workflow](#figma-mcp-agent-workflow) section for step-by-step build instructions, tool usage, and common pitfalls

> **Source of truth**: All values in this file are derived from the [Azure UI Kit (Fluent 2)](https://www.figma.com/design/q2TdO4dVcMhNWYp0N6Bc05/Azure-UI-Kit--Fluent-2-) Figma library and the `@fluentui-contrib/azure-theme` npm package.

### Conflict Resolution Policy

If you encounter conflicting information within this document, resolve using this priority order:

1. **Component key + measured instance properties** → highest trust (these come from actual Figma components)
2. **Token tables with hex values** → trust over prose descriptions
3. **Detailed Usage Guide sections** → trust over generic summary tables
4. **Recipe layouts** → trust over anatomy diagrams (recipes reflect real builds)
5. **Generic sizing/spacing tables** → lowest trust (these are reference summaries)

In short: specific beats general, measured beats estimated.

---

## Table of Contents

1. [Workflow: How to Use This Guideline](#workflow-how-to-use-this-guideline)
2. [Golden Rules](#golden-rules)
3. [Component Instantiation Rules (CRITICAL)](#component-instantiation-rules-critical)
4. [Full UI Kit Reference](#full-ui-kit-reference)
5. [Full Pattern Template Reference](#full-pattern-template-reference)
6. [Icon Library Reference](#icon-library-reference)
7. [Basic Blade Construction Recipe](#basic-blade-construction-recipe)
8. [Post-Build Verification Checklist](#post-build-verification-checklist-must-do-after-every-frame-build)
9. [Spacing & Sizing Tokens](#spacing--sizing-tokens)
10. [Color Tokens](#color-tokens)
11. [Typography Specs](#typography-specs)
12. [Auto-Layout Rules](#auto-layout-rules)
13. [Responsive Breakpoints](#responsive-breakpoints)
14. [Layer Naming Conventions](#layer-naming-conventions)
15. [State Coverage Checklist](#state-coverage-checklist)
16. [Do / Don't Examples](#do--dont-examples)
17. [Component Population Checklists](#component-population-checklists)
18. [Full Page Recipes](#full-page-recipes)
19. [Prompt-to-Frame Mapping](#prompt-to-frame-mapping)
20. [Fluent 1 Fallback Policy](#fluent-1-fallback-policy)
21. [Figma MCP Agent Workflow](#figma-mcp-agent-workflow)
22. [Data Visualization — Charts, Graphs & Components](#data-visualization--charts-graphs--components)

> **📋 The three checklist systems — when to use each:**
> - **[Component Population Checklists](#component-population-checklists)** — use *while building* each component (per-component field-by-field steps)
> - **[Post-Build Verification Checklist](#post-build-verification-checklist-must-do-after-every-frame-build)** — use *after building*, including the mandatory **Visual Self-Verification** (export + diff against reference)
> - **[Basic Blade Construction Recipe](#basic-blade-construction-recipe)** — use *before building* to understand blade anatomy and structural frames
> These overlap intentionally. If you change a rule in one, update the others to match.

---

> **⚠️ Fluent 1 Fallback — Quick Summary**
> These components have NO Fluent 2 equivalent yet. Use Fluent 1 and annotate with `[F1]`:
> `Date Picker`, `Time Picker`, `Duration Picker`, `InfoBalloon (Tooltip/Callout)`, `Notification Toast`, `Teaching Callout`, `Command Button (legacy)`, `RangeSlider`, `SectionControl`.
> **Not on this list anymore:** *Label + read-only value rows* now use the **Fluent 2 `.Input row`** (Input `State=Read only`) — see [Pattern: Label + Read-only Value Fields](#pattern-label--read-only-value-fields-input-row--f2). Do **not** fall back to F1 "Form Fields" for this.
> Everything else should use **Fluent 2**. See [Fluent 1 Fallback Policy](#fluent-1-fallback-policy) for full details.

---

## Figma MCP Agent Workflow

> **This section is for GitHub Copilot CLI (or any AI agent) that needs to build Azure portal blade designs in Figma using the Figma Desktop MCP plugin.**

### Available MCP Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `figma_get_file_data` | Read file/node structure | Inspect existing frames, find node IDs, understand hierarchy |
| `figma_instantiate_component` | Create a library component instance | Adding any component from the UI Kit, Pattern Templates, or Icons library |
| `figma_set_instance_properties` | Set variant/text/boolean properties on an instance | Configuring components after instantiation |
| `figma_execute` | Run arbitrary Figma Plugin API code | Creating frames, resizing, reparenting, text overrides, batch operations |
| `figma_navigate` | Navigate to a specific file/node | Switching between files or scrolling to a node |
| `figma_get_library_components` | Search library components by name | Finding component keys you don't already have |

### Step-by-Step: Building a Blade Screen

```
1. NAVIGATE to the target file
   → figma_navigate({ fileKey: "<file-key>", nodeId: "<page-or-frame-id>" })

2. CREATE the page frame (if needed)
   → figma_execute: create a FRAME with auto-layout, set dimensions

3. BUILD TOP-DOWN using library components:
   a. Site Header → figma_instantiate_component (key from Master Key table)
   b. Breadcrumb → figma_instantiate_component
   c. Blade Header → figma_instantiate_component + figma_set_instance_properties
   d. Service Menu → figma_instantiate_component
   e. Content frame → figma_execute (create auto-layout frame)
   f. Toolbar → figma_instantiate_component (inside content frame)
   g. Data Grid / Form / etc → figma_instantiate_component

4. CONFIGURE each component
   → figma_set_instance_properties for variants, text, booleans
   → figma_execute for deep overrides (nested text nodes, icon swaps)

5. SET LAYOUT on wrapper frames
   → figma_execute: set layoutMode, itemSpacing, padding, sizing
```

### Critical Figma Plugin API Rules

#### Creating Frames (figma_execute)

```javascript
// Standard content wrapper
const frame = figma.createFrame();
frame.name = "Content + Footer";
frame.layoutMode = "VERTICAL";        // "HORIZONTAL" or "VERTICAL"
frame.primaryAxisSizingMode = "FIXED"; // or "AUTO" for hug
frame.counterAxisSizingMode = "FIXED"; // or "AUTO" for hug
frame.itemSpacing = 12;               // gap between children
frame.paddingTop = 0;
frame.paddingRight = 20;               // ⚠️ 20px on BOTH left and right
frame.paddingBottom = 0;
frame.paddingLeft = 20;                // ⚠️ 20px on BOTH left and right
frame.resize(1920, 1080);              // default size (always 1920×1080 unless specified otherwise)

// Append to parent
// ⚠️ Use getNodeByIdAsync (NOT getNodeById) — the current Figma API runs in
// dynamic-page mode and getNodeById throws "Cannot call with documentAccess: dynamic-page"
const parent = await figma.getNodeByIdAsync('<parent-id>');
parent.appendChild(frame);
```

#### Sizing Children to Fill Parent

```javascript
// Make a child fill the parent width (STRETCH)
child.layoutAlign = "STRETCH";

// Make a child grow to fill remaining space (like flex-grow: 1)
child.layoutGrow = 1;

// For instances that need FILL sizing (e.g., header/footer inside drawer)
child.layoutSizingHorizontal = "FILL";
child.layoutSizingVertical = "HUG";   // or "FILL" or "FIXED"
```

#### Text Overrides on Nested Instances

```javascript
// For deeply nested text nodes, use the full path ID
const textNode = await figma.getNodeByIdAsync('I<instance-id>;<inner-node-id>');
textNode.characters = "New Text Value";

// Or find by name within an instance tree
function findTextByName(node, name) {
  if (node.type === 'TEXT' && node.name === name) return node;
  if ('children' in node) {
    for (const child of node.children) {
      const found = findTextByName(child, name);
      if (found) return found;
    }
  }
  return null;
}
```

#### Icon Swap (CRITICAL — do NOT use setProperties for icons)

```javascript
// Import the icon component
const iconComp = await figma.importComponentByKeyAsync('<icon-component-key>');

// Find the existing icon instance in the component
const iconInstance = parentFrame.findOne(n => n.type === 'INSTANCE' && n.width <= 20);

// Swap it
iconInstance.swapComponent(iconComp);
```

#### Instance Properties (use exact property IDs from documentation)

```javascript
// Get an instance by ID (async — see dynamic-page note above)
const instance = await figma.getNodeByIdAsync('<instance-id>');

// Set properties (use the exact property ID format from component docs)
instance.setProperties({
  'Page title#32630:2': 'My Resource Name',      // TEXT
  'Show subtitle#32630:8': true,                  // BOOLEAN
  'Subtitle#32630:3': 'Virtual Machine',          // TEXT
  'Show Copilot Ribbon?#32630:9': false           // BOOLEAN
});
```

### Common Pitfalls & Workarounds

| Problem | Cause | Solution |
|---------|-------|----------|
| **Blade header shows wrapped text** | Full "ResourceName \| PageName" put in Page title | Use 3 separate elements: `Page title` (name only), `Show Menu item` = true, `Menu Item Text` (page name) |
| **Toolbar dropdowns look like input fields** | Using `.DEPRECATED_Dropdown` frames | Hide those frames; use Button instances with `Menu button#157663:0` = true instead |
| **Breadcrumb ends with a chevron** | Last item `Divider` property left as true | Set `Divider#4209:2` = false on the last visible breadcrumb item |
| **Content area has no spacing** | `itemSpacing` left at 0 (default from clone) | Set `itemSpacing = 12` on the Content area frame |
| **Filter bar search is a plain text frame** | Manual frame created instead of component | Use `SearchBox` component (key: `db97bfd9a9e75cad3417131b0ce5190b7400071d`), set placeholder text at nested path |
| **Can't add/remove children in an instance** | Figma disallows structural changes to instances | Detach the instance first: `instance.detachInstance()` — but avoid this when possible |
| **Plugin timeout (5s or 15s)** | `importComponentByKeyAsync` or large operations | Batch operations into groups of 3-4 items per `figma_execute` call; retry after a pause |
| **Icon swap not working via setProperties** | INSTANCE_SWAP properties need `swapComponent()` | Use `swapComponent(importedComponent)` on the nested icon instance directly |
| **Children not stretching to fill width** | Missing `layoutAlign` on children | Set `child.layoutAlign = 'STRETCH'` on every child that should fill |
| **Content is centered instead of top-aligned** | Wrong `primaryAxisAlignItems` | Set `frame.primaryAxisAlignItems = 'MIN'` (not 'CENTER') |
| **Frame not scrollable** | Figma doesn't have scroll — it's simulated via overflow | Use `frame.clipsContent = true` and let content exceed frame height |
| **Instance properties not applying** | Wrong property name format | Use exact `Name#ID:N` format from component documentation |
| **File navigation not switching** | MCP `figma_navigate` can be unreliable | Verify with `figma.root.name` after navigation; retry if wrong file |
| **Component key not found** | Key may be for a variant, not the component set | Use `figma_get_library_components` to search and verify keys |
| **`getNodeById` throws "documentAccess: dynamic-page"** | Current Figma API runs in dynamic-page mode | Use the async variants: `await figma.getNodeByIdAsync(id)` and `await figma.setCurrentPageAsync(page)` — NEVER the sync `getNodeById` / `set currentPage` |
| **`importComponentByKeyAsync` throws "Could not find a published component"** | The key is a component **SET**, not a single component | Use `const set = await figma.importComponentSetByKeyAsync(key); set.defaultVariant.createInstance()` — OR find the variant-specific key. Breadcrumb (`6a55…`) and Filter Pill (`fa45…`) are sets |

### Library File Keys (Quick Reference)

| Library | File Key | Purpose |
|---------|----------|---------|
| Azure UI Kit (Fluent 2) | `q2TdO4dVcMhNWYp0N6Bc05` | All Azure portal components |
| Azure Pattern Templates (Fluent 2) | `TXALL9CS0727dvGcZo84Bg` | Delete flows, Overview cards, Accordion patterns |
| Icons — Azure Fluent Extension | `fQO2yNBwr773QI4ANvb1Z4` | All Azure service/action/status icons (Service Menu, Data Grid resource icons) |
| Fluent Iconography | `43oQOCD2164ExeSf5ajmou` | All Fluent system icons — use for **Toolbar** button icons, general UI icons (arrows, refresh, download, upload, etc.) |
| Fluent 2 Web Library | (published library, no separate file key needed) | Base Fluent components (Button, Input, etc.) |

### Batching Strategy (Avoid Timeouts)

The Figma plugin has execution time limits. Follow these rules:

1. **One `figma_instantiate_component` per call** — each instantiation is its own MCP call
2. **Batch `figma_execute` operations in groups of 3-5 nodes** — don't try to configure 20 items in one call
3. **Import icons once, reuse the reference** — call `importComponentByKeyAsync` once per icon, then `swapComponent` multiple times
4. **Create frame structure first, then populate** — build the skeleton, then fill content in subsequent calls
5. **Read structure before modifying** — use `figma_get_file_data` to get node IDs before attempting modifications

### Example: Full Blade Build Sequence

```
Call 1: figma_execute → Create page frame (1920×1080, vertical auto-layout)
Call 2: figma_instantiate_component → Site Header (key: 1e24dff82507bad20840cab955ca59a852b788b2)
Call 3: figma_instantiate_component → Breadcrumb (key: ad1a251259e9020d988bdf6227f1a84baaf80a54, variant: Size=Large)
Call 4: figma_instantiate_component → Blade header (key: c573ab76a0e1a39fe76ddd1eece3e460e0b07c0f)
Call 5: figma_set_instance_properties → Configure Blade header (Page title, Show Menu item, Menu Item Text, Subtitle)
Call 6: figma_execute → Create "Menu + Content" frame (horizontal)
Call 7: figma_instantiate_component → Service Menu (key: f85852343c91c31207c69e8fca5fe5faffda0df7)
Call 8: figma_execute → Create "Content + Footer" frame (vertical, gap=12, paddingRight=20)
Call 9: figma_instantiate_component → Toolbar (Azure) (key: b911751a8fde73751fe8572c68b8a48da4167be9)
Call 10: figma_instantiate_component → Azure F2-Data Grid (key: 65e135bd61aa14ef9c926262fc54779c6f75646b)
Call 11: figma_execute → Set layoutAlign=STRETCH on all children, set layoutGrow on grid
Call 12: figma_set_instance_properties → Configure Service Menu selected item
Call 13: figma_execute → Override column headers and cell text in data grid
```

### ⚠️ Golden Rules for Building Frames

These rules apply to EVERY frame build. Violating any of them produces visually broken output:

1. **Always use library components** — never create manual text/rectangle frames as substitutes for components that exist in the library (SearchBox, Filter Pill Dropdown, Button, etc.)
2. **Always use library text styles** — never hardcode fontSize, fontName, fills on TEXT nodes. Import the style via `figma.importStyleByKeyAsync(key)` and apply with `node.setTextStyleIdAsync(style.id)`. See [Typography Application](#typography-application) for the full style key reference
3. **Never concatenate labels that are separate elements** — Blade Header has 3 text nodes; Breadcrumb items have Button + Divider; read the component structure first
4. **Always set spacing after creating/cloning frames** — `itemSpacing: 12` and `paddingRight: 20` on Content area frames. Cloned frames often have spacing reset to 0
5. **Hide deprecated sub-components** — Many components contain `.DEPRECATED_*` children. Always use the modern alternative (e.g., Button with Menu button=true instead of DEPRECATED_Dropdown)
6. **Verify terminal/last elements** — Last breadcrumb has no divider, last tab has no separator, etc.
7. **Read before writing** — Always inspect the internal structure of a component (children, properties, text paths) before attempting to configure it. Don't assume structure matches the name

### Pre-Flight Checklist (Before Starting a Design)

- [ ] Target file is open in Figma Desktop (MCP connects to active file)
- [ ] Azure UI Kit library is enabled in the target file (Assets > Libraries)
- [ ] Azure Pattern Templates library is enabled
- [ ] Icons — Azure Fluent Extension library is enabled
- [ ] You know the target page/frame ID (use `figma_get_file_data` to find it)
- [ ] You have the component keys for all components you'll use (from this document)

---

## Workflow: How to Use This Guideline

### Step 1: Search Before You Create

Before creating any element, **always search the UI Kit first**.

1. Open the **Azure UI Kit (Fluent 2)** library in your Figma assets panel
2. Search for the component by name (see [Full UI Kit Reference](#full-ui-kit-reference) below)
3. If found → **use the library component** (drag from Assets, do NOT copy-paste from another file)
4. If not found → check the **Pattern Templates** for a composed pattern
5. If neither has what you need → check Fluent 1 (see [Fluent 1 Fallback Policy](#fluent-1-fallback-policy))
6. Only create a custom component if NONE of the above cover your need

### Step 2: Import Components Correctly

**DO:**
- Use the **Assets panel** (Shift+I) to insert components from enabled libraries
- Drag components directly from the Assets panel into your working file
- Ensure the Azure UI Kit and Pattern Templates libraries are enabled in your file

**DO NOT:**
- Copy-paste components from the source Figma files
- Detach instances to modify them (override properties instead)
- Duplicate components that already exist in the library

### Step 3: Set Properties via the Design Panel

After inserting a component instance:

1. Select the instance
2. Open the **Design panel** (right sidebar)
3. Use the **component properties** section to configure:
   - **Variants** — select the correct variant (e.g., Size: Medium, State: Rest)
   - **Booleans** — toggle optional elements on/off (e.g., Show Subtitle: true)
   - **Text** — override text content (e.g., Page title: "My Resource")
   - **Instance Swap** — swap nested icons or sub-components via the dropdown

> ⚠️ **Never** detach an instance just to change a property. If a property you need doesn't exist, flag it to the design system team.

### Step 4: Check All Nested Instances

Many components contain **nested instances** (e.g., Azure Copilot contains Header, Nav Drawer, Chat Input, Row Swap).

**Workflow:**
1. Select the parent component instance
2. In the **Layers panel**, expand to see nested instances
3. Select each nested instance individually to access its specific properties
4. Configure each nested instance's properties in the Design panel
5. If a nested instance has further nesting, repeat recursively

**Common nested structures:**
- `Azure Copilot` → `Azure Copilot Header` + `Copilot Nav Drawer` + `Copilot Row Swap`
- `Delete Dialog` → `Delete footer` + `Delete resource name` + content components
- `Overview Card` → `Footer_Overview card` + `link List`

### Step 5: Typography & Fonts

**Rules:**
- Use ONLY the typography tokens defined in the design system
- Token collections: Typography, Global tokens
- Never manually set font properties — always use the text styles from the library
- If a text style doesn't exist for your need, request it from the design system team

**Font hierarchy (from tokens):**
- Headings, body, captions — all derived from the Global/Typography token collections
- Respect the defined line heights, letter spacing, and font weights exactly

### Step 6: Never Duplicate

| Scenario | Correct Action |
|----------|---------------|
| Need a component that exists in UI Kit | Use library instance |
| Need to modify a component slightly | Use property overrides, NOT detach |
| Same component used 5 times on a page | 5 instances of the same library component |
| Component doesn't look right | Check if you selected the wrong variant |
| Need a new variant | Request from design system team |

**Duplication red flags:**
- Local components that match library component names
- Detached instances in your layers panel
- Color/text styles that duplicate library styles
- Copy-pasted frames from another file instead of using library instances

---

## Golden Rules

1. **Library-first** — Always search the UI Kit before creating anything
2. **Never detach** — Configure via properties, never detach instances
3. **Never duplicate** — One source of truth per component
4. **Never recreate** — NEVER draw custom frames/text to mimic a component that exists in the library. Always use the actual component instance.
5. **Respect tokens** — Colors, typography, spacing, radii come from token collections only
6. **Check nesting** — Always inspect and configure nested instances
7. **Fluent 2 first** — Only use Fluent 1 when Fluent 2 doesn't have the component
8. **Pattern over invention** — Use pattern templates for common flows before inventing layouts

---

## Component Instantiation Rules (CRITICAL)

> ⚠️ **The #1 mistake is drawing custom frames and text to mimic components instead of using the actual library instances.** This section explains how to correctly use library components.

### What "Using a Component" Means

When building a blade, EVERY recognizable UI element must be an **instance** of the real library component. This means:

| Element | ✅ Correct | ❌ Wrong |
|---------|-----------|---------|
| Toolbar | Instantiate `Toolbar (Azure)` component | Draw a frame, add rectangles and text labels |
| Data Grid | Instantiate `Azure F2-Data Grid` component | Draw rows/columns with frames and text |
| Essentials | Instantiate `Essentials` component | Create key-value pairs with manual text |
| Tab List | Instantiate `Azure Horizontal TabList` | Draw tabs with rectangles and text |
| Filter Pills | Instantiate `Filter Pill Dropdown` component | Draw pill shapes with text |
| Service Menu | Instantiate `Service Menu` component | Draw a sidebar with text list |
| Blade Header | Instantiate `Blade header` component | Create a title/subtitle frame manually |
| Site Header | Instantiate `Site Header` component | Draw a header bar with icons |

### How to Instantiate a Library Component (for AI agents)

Use `figma_instantiate_component` with the correct `componentKey`:

```
figma_instantiate_component({
  componentKey: "<key from table below>",
  parentNodeId: "<target frame ID>",
  // Optional: set variant properties
})
```

Then configure via `figma_set_instance_properties` — NEVER by modifying child frames directly.

### Master Component Key Reference

> **When to use which key:**
> - Use a **variant-specific key** (from the Variant Selection list below) when you know the exact variant you need — this instantiates the component pre-configured to that variant.
> - Use the **component set key** (from the table below) only when you need to set variants dynamically after instantiation, or when no variant-specific key is listed.

| Component | Component Key | Node ID | Variants |
|-----------|--------------|---------|----------|
| **Site Header** | `d596d623205f82a6268227796dd0d61eb949211c` | `31147:439` | Width: `1048+ px`, `554-1047 px`, `< 553 px` |
| **Breadcrumb** | `6a55e6a832553b5ae6d3fa3f8e548dd0df94d867` | `133494:14994` | Size: `Large`, `Medium`, `Small` |
| **Blade header** | `ae03dca2cae044e81079c8f6bf549dbd415f57bc` | `32630:8970` | Size: `<500`, `500+`, `750+`, `1100+` |
| **Service Menu** | `0f5fe8abcfc3adac248b91fdc7e86a2bbc43baa6` | `32610:9824` | State: `Rest-Closed`, `Open`; Expand groups: `True/False` |
| **Toolbar (Azure)** | `0ffe9582eb21b97c872b422eb11358dd20143b1d` | `29553:7576` | Top of Page?: `Yes`, `No` |
| **Azure Horizontal TabList** | `9be28cf0a9a10e62c22cb31361d245b0a13a89ab` | `29553:14761` | Layout: `Text only`, `Icon only`, `Icon before`; Size: `Medium`, `Small`; Circular: `True/False` |
| **Azure F2-Data Grid** | `53035ebee3b64adb9b572075ab12ab0a2c25b991` | `28093:32728` | Type: `Data grid (default)`, `Editable grid` |
| **Essentials** | `64429d075e5bd7a220a23ea9bd800b2a6f47c434` | `25412:8797` | State: `Collapsed`, `Expanded`; Show Tags: `Yes/No`; Mobile: `Yes/No` |
| **Filter Pill Dropdown** | `fa45bd49673e96346eafe807fd157ad05a18f965` | `25378:3066` | State: `Default`, `Selected`, `Pressed`, `Focus`; Removable: `Yes/No` |
| **SearchBox** | `db97bfd9a9e75cad3417131b0ce5190b7400071d` | — | Style: `Filled darker`; Size: `Medium`; State: `Rest` (Fluent 2 Web Library) |
| **Footer** | `de3512b28d1b8da02a0ce2685c72ba9b56812430` | `35285:10476` | Style: `Create` |
| **Empty state** | `f3aec5fec89d4bf21d7bcf4f2795056838834063` | `29232:42433` | — |
| **Accordion** | `b33e672139efdb38d59cb283bf023eada4be7800` | `30028:627` | Bordered: `True/False` |
| **Card** | `ca5d1e2af199ac78f5ddbae7d62f027fb9f77745` | — | Layout: `Default/Custom`; State: `Rest/Hover/Pressed/Selected/Draggable/Disabled`; Style: `Filled/Filled alt/Outline/Subtle` (Fluent 2 Web Library) |
| **Overview Card** | `a99af5ca32ff5c6c2b82c39c5878151f90b20616` | — | Content Type: `Icon/Illustration/Hero`; Hyperlink List: `True/False` (Azure Pattern Templates) |
| **Form** | `a9c31e9b260f58f9e9785528e876fd91b7248947` | `27181:1280` | — |
| **Filterable combo box** | `61a874d2ce382397d4519e720d18c809b3875f6a` | `25248:8173` | — |
| **Azure Vertical TabList** | `f87940d9a9994975afd677907540baa0dc7cfa9f` | `29553:14688` | Layout: `Text only`, `Icon before`, `Icon only`; Size: `Medium`, `Small` |

### Variant Selection (use `Top of Page?=Yes` for toolbar at content top)

To select a variant when instantiating, use the variant's specific component key:
- `Toolbar (Azure)` → `Top of Page?=Yes`: key `b911751a8fde73751fe8572c68b8a48da4167be9`
- `Toolbar (Azure)` → `Top of Page?=No`: key `4aec7a2d3055d7b5ca1f704b1b7d39410c6461dd`
- `Site Header` → `Width=1048+ px`: key `1e24dff82507bad20840cab955ca59a852b788b2`
- `Blade header` → `Size=1100+`: key `c573ab76a0e1a39fe76ddd1eece3e460e0b07c0f`
- `Essentials` → `State=Expanded, Show Tags=No, Mobile=No`: key `25070b7c2d37872c678ea3c680ba86c30064e902`
- `Azure F2-Data Grid` → `Type=Data grid (default)`: key `65e135bd61aa14ef9c926262fc54779c6f75646b`
- `Azure Horizontal TabList` → `Layout=Text only, Size=Medium (default), Circular=False`: key `f995a69c77a27d0fe8f3f804cd03432ef7def770`
- `Service Menu` → `State=Open, Expand groups=False`: key `f85852343c91c31207c69e8fca5fe5faffda0df7`
- `Filter Pill Dropdown` → `State=Default, Removable=No`: key `e83137376566f5f65341bb926729b0566c673376`

---

## Full UI Kit Reference

**Source:** [Azure UI Kit (Fluent 2)](https://www.figma.com/design/q2TdO4dVcMhNWYp0N6Bc05/Azure-UI-Kit--Fluent-2-)
**File Key:** `q2TdO4dVcMhNWYp0N6Bc05`

### Components (40 total, 36 sets)

#### Navigation & Layout

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Site Header** | Width: `1048+ px` | — |
| **L1 - Portal Menu** | Expanded: `True/False` | Scrollbar (bool) |
| **Service Menu** | State: `Open`; Expand groups: `True/False` | Show Scrollbar, Favorites group (bools) |
| **Blade header** | Size: `1100+` | Page title (text), Subtitle (text), Show icon, Show subtitle, Show Copilot Ribbon, Show Menu item (bools), Icon (instance swap) |
| **Footer** | Style: `Create` | — |
| **Scrollbar** | % Filled: `10`; Position: `Top`; Color: `Default` | — |
| **Toolbar (Azure)** | Top of Page: `Yes/No` | Contains nested Fluent 2 `Toolbar` (Size: Medium, Type: Static). Start-content: multiple `Button` instances (Style=Subtle). End-content: Group by dropdown. See [Toolbar Usage Guide](#toolbar-azure--detailed-usage-guide) |

#### Tabs

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Azure Horizontal TabList** | Layout: `Icon before`; Size: `Medium`; Circular: `True/False` | — |
| **Azure Horizontal Tab** | Selected, Validation (`Error`), Style (`Transparent`), Size (`Medium`), State (`Rest`) | — |
| **Azure Vertical TabList** | Layout: `Icon before`; Size: `Medium`; Circular: `True/False` | — |
| **Azure Vertical Tab** | Validation (`Error`), Selected, Style (`Transparent`), Size (`Medium`), State (`Rest`) | — |

#### Data Display

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Azure F2-Data Grid** | Type: `Data grid (default)`, `Editable grid` | Full grid with header row, data rows, checkboxes, column sorting. Configure rows/columns via nested instances — never recreate manually. |
| **Essentials** | State: `Collapsed/Expanded`; Show Tags: `Yes/No`; Mobile: `Yes/No` | 6 variants. Displays resource metadata (subscription, resource group, location, etc.) in two-column key-value layout. |
| **Tags by Resource** | Size: `Large` | — |
| **Accordion** | Bordered: `True/False` | — |

#### Forms & Inputs

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Form** | — | Show description, Show message bar, Show Header, Show Label, Input Fields (bools) |
| **Filterable combo box** | Usage: `Filterable Combobox`; State: `Rest`; Size: `Small`; Multi-Select: `Yes/No`; Showing Filter: `Yes/No` | — |
| **Filter Pill Dropdown** | State: `Default`; Removable: `Yes/No` | — |
| **Slider with numbers** | Number Placement: `Both` | Leading Number (text), Trailing Number (text) |
| **Upload File** | State: `Default` | — |

#### Progress & Status

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Progress Bar with labels** | Property 1: `No Label`; Description: `Yes/No` | Static variant |
| **Animated Progress Bar with labels** | Property 1: `No Label`; Description: `Yes/No` | Animated variant |
| **Message bar upsell** | Layout: `Single line`; Actions: `Yes/No`; Additional action: `Yes/No`; Dismiss: `Yes/No` | — |
| **Empty state** | — | Link (bool), Buttons (bool) |

#### Copilot Components

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Azure Copilot** | Size: `320<->585 [SM Sidecar]`; Existing Chat: `True/False` | Nav Drawer (bool), Prompt Suggestions (bool) |
| **Azure Copilot Header (Expanded)** | Nav Drawer Open: `True/False` | More Menu, Show Subtitle (bools); Chat Name, Subtitle (text) |
| **Azure Copilot Header (Sidecar)** | — | More Menu, Subtitle (bools); Chat Name (text) |
| **Azure Copilot Nav Drawer** | Version: `Default` | Load Chats, Agentic Mode (bools) |
| **Copilot Row Swap** | Swap to: `Latency/loading` | — |
| **Chain of thought** | State: `Reasoning`; Expanded: `Yes/No`; Show all: `Yes/No` | Artifact Number (text) |
| **Prompt Ribbon (Copilot)** | Open: `Yes/No`; Prompt Pills: `Hide All` | Pill Overflow Menu (bool) |
| **Inline Copilot - open start** | State: `Compose`; Elevated: `True/False` | Show text, Show scroll, Show action, Show flair (bools) |
| **Inline Copilot - guided start** | Type: `Basic`; State: `Invocation` | Show flair, Show action, Show scroll (bools) |
| **Menu Entry Point (Copilot)** | Property 1: `Rest` | — |
| **Button Entry Point (Copilot)** | Property 1: `Default` | Tooltip (bool) |
| **Agent Toggle** | Active: `Yes/No`; State: `Rest`; Size: `Large` | — |

#### Utility

| Component | Variants | Key Properties |
|-----------|----------|----------------|
| **Code snippet** | Property 1: `JSON` | — |
| **Copy Button** | State: `Default`; With Text: `Yes/No` | — |
| **Pager** | State: `Close`; Responsiveness: `Narrow`; Page Selected: `First` | — |
| **Top action** | — | — |

### Token Collections (49)

| Collection | Purpose |
|------------|---------|
| **Azure colors** | Azure-specific brand and UI colors |
| **Global tokens** | Base-level design tokens |
| **Typography** | Font families, sizes, weights, line heights |
| **Spacing** | Margin and padding values |
| **Corner radius** | Border radius values |
| **Stroke width** | Border widths |
| **Layout** | Layout-related spacing and sizing |
| **Theme** | Light/dark theme token sets |
| **Mode** | Theme mode switching |
| **Semantic Color Styles** | Contextual color meanings (success, error, warning) |
| **Copilot Web Structure** | Copilot-specific layout tokens |
| **Site Header Breakpoints** | Responsive breakpoint values |
| **Color** | Core color palette |
| **MessageBar status** | Status-specific colors for message bars |
| **Rating color** | Rating component colors |
| **Arrow position** | Tooltip/popover arrow positioning |

---

## Full Pattern Template Reference

**Source:** [Azure Pattern Templates (Fluent 2)](https://www.figma.com/design/TXALL9CS0727dvGcZo84Bg/Azure-Pattern-Templates--Fluent-2-)
**File Key:** `TXALL9CS0727dvGcZo84Bg`

### Pattern Components (13 total, 5 sets)

#### Delete Flow Pattern

Use these components together to build delete confirmation dialogs.

| Component | Variants | Properties | Usage |
|-----------|----------|------------|-------|
| **Delete Dialog** | Property 1: `Soft Delete / Permanent` | Recoverable (bool) | Top-level delete dialog container |
| **Delete footer** | Type: `Empty / Filled` | — | Footer area of delete dialog |
| **Delete resource name** | — | Resource name (text), Icon (instance swap), Show Copy (bool) | Displays the resource being deleted |
| **Associated delete content** | State: `Selected / Empty` | Enable Force Delete (bool) | When deleting has associated resources |
| **Bulk delete content** | — | — | When deleting multiple resources |
| **Dependent delete content** | — | — | When resource has dependencies |
| **Implication delete content** | — | — | Shows implications of deletion |

**Delete Flow Assembly:**
```
Delete Dialog
├── Delete resource name (shows what's being deleted)
├── [One of the content types]:
│   ├── Associated delete content (if associated resources exist)
│   ├── Bulk delete content (if multiple resources)
│   ├── Dependent delete content (if dependencies exist)
│   └── Implication delete content (if implications to show)
└── Delete footer (action buttons)
```

#### Overview Card Pattern

| Component | Variants | Properties | Usage |
|-----------|----------|------------|-------|
| **Overview Card** | Content Type: `Icon / Illustration / Hero`; Hyperlink List: `True/False` | — | Service/feature overview card |
| **Footer_Overview card** | CTA Type: `Action / Navigation` | Quick Actions (bool), Learn More (bool) | Footer with call-to-action |
| **link List** | — | — | List of hyperlinks within a card |

**Overview Card Assembly:**
```
Overview Card
├── Content area (Icon, Illustration, or Hero image)
├── link List (optional, when Hyperlink List = True)
└── Footer_Overview card (CTA buttons)
```

#### Accordion Pattern

| Component | Properties | Usage |
|-----------|------------|-------|
| **Accordion Header Content** | — | Header section of an accordion item |
| **Accordion Content** | — | Expandable content area |

#### Location Pattern

| Component | Properties | Usage |
|-----------|------------|-------|
| **Location summary** | — | Displays resource location information |

---

## Icon Library Reference

### Which Icon Library to Use

| Context | Library | File Key | Example Icons |
|---------|---------|----------|---------------|
| **Toolbar buttons** | Fluent Iconography | `43oQOCD2164ExeSf5ajmou` | Arrow Sync (refresh), Arrow Download, Arrow Upload, Edit, Delete, Add, Filter |
| **Service Menu items** | Icons — Azure Fluent Extension | `fQO2yNBwr773QI4ANvb1Z4` | All-Resources, Settings, Help-and-Support, Recovery-Services-Vaults |
| **Data Grid resource icons** | Icons — Azure Fluent Extension | `fQO2yNBwr773QI4ANvb1Z4` | Virtual-Machine, Storage, Network-Security-Groups |
| **General UI/system icons** | Fluent Iconography | `43oQOCD2164ExeSf5ajmou` | Chevrons, arrows, status indicators, actions |

---

### Azure Fluent Extension Icons (Service/Resource Icons)

**Source:** [Icons — Azure Fluent Extension](https://www.figma.com/design/fQO2yNBwr773QI4ANvb1Z4/Icons---Azure-Fluent-extension)
**File Key:** `fQO2yNBwr773QI4ANvb1Z4`
**Total Icons:** 868 components (3 component sets)

### Fluent Iconography (System/Toolbar Icons)

**Source:** [Fluent Iconography](https://www.figma.com/design/43oQOCD2164ExeSf5ajmou/Fluent-iconography?node-id=2708-10653)
**File Key:** `43oQOCD2164ExeSf5ajmou`
**Usage:** Toolbar action icons, navigation icons, general UI glyphs (not Azure service-specific)

### How to Use Icons

1. **Enable the library** — In your file, go to Assets → Libraries → Enable "Icons — Azure Fluent Extension"
2. **Search by name** — Use the Assets panel search (see category tables below for naming)
3. **Instance Swap** — When a component has an Icon property (INSTANCE_SWAP), click the swap dropdown and search for the icon name
4. **Never detach or flatten** — Always use icon instances; never outline or flatten SVGs
5. **Size** — Use the variant size property when available (Copilot icon: 16/20/24/28/32/48; Fluent icon: 12/16/20/24/28/32/48)

### Programmatic Icon Import (for AI Agents / Plugin API)

**The most efficient process to fetch and apply Azure service icons:**

1. **Find the icon component key** — Use `figma_get_library_components` with the icons library file key:
   ```
   figma_get_library_components({
     libraryFileKey: "fQO2yNBwr773QI4ANvb1Z4",
     query: "<icon-name>"   // e.g. "Virtual-Network", "Storage", "Disk"
   })
   ```
   This returns matching components with their `key` values.

2. **Import the icon component** — In `figma_execute`:
   ```js
   const iconComp = await figma.importComponentByKeyAsync('<component-key>');
   ```

3. **Swap onto the target instance** — Find the existing icon instance and swap:
   ```js
   const targetIcon = cell.children.find(c => c.type === 'INSTANCE' && c.width === 18);
   targetIcon.swapComponent(iconComp);
   ```

**⚠️ Key rules:**
- Always use `figma_get_library_components` with `libraryFileKey: "fQO2yNBwr773QI4ANvb1Z4"` to discover icon keys — do NOT guess keys
- Import one icon per `importComponentByKeyAsync` call, then reuse the reference for multiple rows
- Batch swaps in groups of 3–4 rows per `figma_execute` call to avoid timeouts
- The icon names use hyphens and PascalCase: `Virtual-Machine`, `Network-Security-Groups`, `Storage`

### Common Resource Type Icon Keys (Quick Reference)

| Resource Type | Icon Component Name | Component Key |
|--------------|--------------------|----|
| Virtual machine | `Virtual-Machine` | `6d0bb41e11809dc8fa5b8f069278cfaea2c24bf5` |
| Virtual network | `Virtual-Networks` | `f6569ff78042c1bbde62bef10ea253e2c0017d8e` |
| Storage account | `Storage` | `89a6d680699ece16ee710a14b337b343690b6dfd` |
| SSH key | `SSH-Keys` | `97dcdb9a1b4463ac0d02abe8fe24d6ff188f705e` |
| Network Interface | `Network-Interfaces` | `13fa77b914853d1520050bbe2c6142cd1409474c` |
| Network security group | `Network-Security-Groups` | `7cdd9405867e25d4789f96cd69d5f260fd729534` |
| Disk | `Disks` | `fc72cfe4240cbff7742298203c9bd2d0bf0eb0eb` |
| Recovery Services vault | `Recovery-Services-Vaults` | `7e2b00a9271100a6d276605fbed5d0644c2c53d6` |
| Resource (generic) | `Resource` | `0a505a476c8fbb22bb20ebb5ce63f3d9bd61c331` |
| Resource Mover | `Resource-Mover` | `3acd86b8fa15c2fef3ca17834efcf1e025dc045c` |
| App Services | `App-Services` | `722d176d19c27afdaad73818ab32e75c143a6380` |
| Azure Migrate | `Azure-Migrate` | `b40e011f7a58fb4bc7e0be0e8266a5955d514ee6` |

### Component Sets (with Variants)

| Component Set | Variants | Usage |
|---------------|----------|-------|
| **Copilot** | Size: `16, 20, 24, 28, 32, 48` | Copilot branding icon, use in Copilot entry points and headers |
| **For Fluent** (Azure icon) | Size: `12, 16, 20, 24, 28, 32, 48` | Azure "A" icon optimized for Fluent UI contexts |
| **Azure** | Style: `Color, Monoline, White` | Main Azure brand icon; use Color for marketing, Monoline for UI, White for dark backgrounds |

### Icon Categories

#### 🔵 Azure Service Icons (Resource Types)

These are the primary icons representing Azure services in navigation, resource lists, and blade headers.

| Icon Name | Also Known As | Notes |
|-----------|---------------|-------|
| `API-Management-Services` | — | Multiple variants available |
| `App-Services` | — | Multiple variants available |
| `Application-Gateway` | — | — |
| `Application-Insights` | AppInsights | — |
| `Automation-Accounts` | — | — |
| `Availability-Sets` | AvailabilitySet | — |
| `Azure-Active-Directory` | — | — |
| `Azure-Arc` | — | — |
| `Azure-Cosmos-DB` | — | — |
| `Azure-Data-Explorer-Clusters` | — | — |
| `Azure-Database-MySQL-Server` | — | — |
| `Azure-Database-PostgreSQL-Server` | — | — |
| `Azure-Databricks` | — | — |
| `Azure-DevOps` | — | — |
| `Azure-Firewall-Manager` | — | — |
| `Azure-Firewall-Policy` | — | — |
| `Azure-Load-Testing` | LoadTest | — |
| `Azure-Media-Services` | — | — |
| `Azure-Migrate` | — | — |
| `Azure-NetApp-Files` | — | — |
| `Azure-Purview` | — | — |
| `Azure-Sentinel` | — | — |
| `Azure-Service-Bus` | ServiceBus | — |
| `Azure-Spring-Apps` | — | — |
| `Azure-SQL-VM` | — | — |
| `Azure-Stack-Edge` | — | Multiple variants |
| `Azure-Stack-HCI` | — | — |
| `Azure-Synapse-Analytics` | — | — |
| `Azure-VMWare-Solution` | — | — |
| `Batch-Accounts` | — | — |
| `Bot-Services` | — | — |
| `CDN-Profiles` | CDN | — |
| `Cognitive-Services` | — | — |
| `Container-Instances` | — | — |
| `Container-Registries` | — | — |
| `Data-Factories` | Data-Factory | — |
| `Data-Lake-Analytics` | — | — |
| `DDoS-Protection-Plans` | — | — |
| `Defender-for-Cloud` | Security-Center | — |
| `DevTest-Labs` | — | — |
| `Digital-Twins` | — | — |
| `DNS-Zones` | — | — |
| `Event-Grid-Domains` | EventGrid | — |
| `Event-Hubs` | — | — |
| `ExpressRoute-Circuits` | — | — |
| `Front-Doors` | AFD | — |
| `Function-Apps` | Function-App, Functions | — |
| `HD-Insight-Clusters` | — | — |
| `IoT-Central-Applications` | — | — |
| `IoT-Hub` | — | — |
| `Key-Vaults` | — | — |
| `Kubernetes-Services` | — | — |
| `Load-Balancers` | LoadBalancer | — |
| `Log-Analytics-Workspaces` | LogAnalytics | — |
| `Logic Apps` | — | — |
| `Machine-Learning-Service-Workspaces` | — | — |
| `Managed-Identities` | — | — |
| `Network-Interfaces` | NIC | — |
| `Network-Security-Groups` | NSG | — |
| `Network-Watcher` | — | — |
| `Notification-Hubs` | — | — |
| `Private-Endpoints` | Private-Link | — |
| `Public-IP-Addresses` | PIP | — |
| `Recovery-Services-Vaults` | — | — |
| `Resource-Groups` | ResourceGroupList | — |
| `Route-Tables` | — | — |
| `Search-Services` | — | — |
| `Service-Fabric-Clusters` | — | — |
| `SignalR` | — | — |
| `SQL-Database` | SQLDatabase | — |
| `SQL-Managed-Instance` | — | — |
| `SQL-Server` | SQLDatabaseServer | — |
| `Static-Web-Apps` | — | — |
| `Storage` | StorageContainer, StorageAzureFiles, StorageQueue | — |
| `Stream-Analytics-Jobs` | StreamAnalytics | — |
| `Subscriptions` | — | — |
| `Traffic-Manager-Profiles` | TrafficManager | — |
| `Virtual-Machine` | — | — |
| `Virtual-Networks` | vNet | — |
| `Virtual-Network-Gateways` | Vnet-Gateways | — |
| `Virtual-WAN` | vWAN | — |
| `VM-Scale-Sets` | — | — |
| `Web-Application-Firewall-Policies` | WAF | — |

#### 🟣 Copilot & AI Icons

| Icon Name | Usage |
|-----------|-------|
| `Copilot` | Main Copilot icon (has size variants: 16–48) |
| `For Fluent` | Azure "A" for Fluent contexts (has size variants: 12–48) |
| `Azure` | Azure brand (has style variants: Color/Monoline/White) |

#### 🟢 Status Icons

Two styles available: **Regular** (filled) and **With Outline** (outlined border).

| Status | Regular | With Outline | Usage |
|--------|---------|--------------|-------|
| Success | `Regular/Success` | `With Outline/Success` | Completed, healthy, connected |
| Error | `Regular/Error` | `With Outline/Error` | Failed, critical issues |
| Update | `Regular/Update` | `With Outline/Update` | Updates available |
| Pending | `Regular/Pending` | `With Outline/Pending` | In progress, waiting |
| Cancelled | `Regular/Cancelled` | `With Outline/Cancelled` | User-cancelled operations |
| Stopped | `Regular/Stopped` | `With Outline/Stopped` | Stopped services |
| Disabled | `Regular/Disabled` | `With Outline/Disabled` | Disabled resources |
| Upsell | `Regular/Upsell` | `With Outline/Upsell` | Upgrade prompts |
| Info | `Regular/Info` | `With Outline/Info` | Informational messages |
| Unknown | `Regular/Unknown` | `With Outline/Unknown` | Unknown/undetermined state |
| Caution | — | `With Outline/Caution` | Warning state |
| No status | — | `With Outline/No status` | No status available |
| Warning | `Regular/Warning` | — | Warning state |
| Running | `Regular/Running` | — | Active/running processes |

#### 🟡 Command & Action Icons

| Icon Name | Usage |
|-----------|-------|
| `Add` | Create new resource/item |
| `Add Boxed` | Add with container context |
| `Delete` | Delete resource |
| `Edit` | Edit/modify |
| `Copy` | Copy to clipboard |
| `Save` | Save changes |
| `SaveAll` | Save all changes |
| `Refresh` | Refresh/reload |
| `Download` | Download file/export |
| `Upload` | Upload file |
| `Export` | Export data |
| `Start` | Start a service |
| `Stop` | Stop a service |
| `Swap` | Swap/exchange |
| `Undo` | Undo action |
| `Redo` | Redo action |
| `Discard` | Discard changes |
| `Filter` | Filter results |
| `Filter remove` | Clear filter |
| `Sort` | Sort items |
| `Search` | Search |
| `Expand` | Expand panel |
| `Collapse` | Collapse panel |
| `Maximize` | Maximize window |
| `Minimize` | Minimize window |
| `Pin` | Pin item |
| `Unpin` | Unpin item |
| `Favorite` | Add to favorites |
| `Lock` | Lock resource |
| `Unlock` | Unlock resource |
| `Connect` | Connect/link |
| `Disconnect` | Disconnect |
| `Publish` | Publish |
| `Disable` | Disable |
| `Restore` | Restore |
| `Redeploy` | Redeploy |
| `Share` | Share |
| `Print` | Print |
| `Insert` | Insert |

#### 🔴 Navigation & Hub Icons

| Icon Name | Usage |
|-----------|-------|
| `Home` | Home/dashboard |
| `All Services` | All services hub |
| `All-Resources` | All resources view |
| `Dashboard` | Dashboard/portal home |
| `Favorites` | Favorites list |
| `Recent` | Recently visited |
| `Resource Graph` | Resource graph explorer |
| `Cloud Shell` | Cloud Shell terminal |
| `Hamburger` | Menu toggle |
| `L1 - Portal Menu` | (Use with Portal Menu component) |
| `Service Menu` | (Use with Service Menu component) |
| `Get started` | Getting started/quickstart |
| `Quickstart-Center` | Quickstart center |
| `Help-and-Support` | Help hub |
| `Learn` | Learning center |
| `Marketplace` | Azure Marketplace |
| `Cost Management` | Cost management hub |
| `Monitor` | Azure Monitor |
| `Advisor` | Azure Advisor |
| `Policy` | Azure Policy |

#### 🟠 Site Header & Portal Chrome Icons

| Icon Name | Usage |
|-----------|-------|
| `Site header notification` | Notification bell in site header |
| `Filter (Site header)` | Filter icon for site header context |
| `Cloud Shell` | Cloud Shell icon |
| `Gear` | Settings |
| `Question` | Help |
| `Question circle` | Help (circular) |
| `Feedback` | Feedback |
| `Signout` | Sign out |
| `Switch directory` | Switch Azure AD directory |
| `Microsoft Logo / 4 Squares` | Microsoft branding |

#### 🔵 Chevrons & Directional

| Icon Name | Directions |
|-----------|-----------|
| `ChevronUp/Down/Left/Right` | Single chevron navigation |
| `Double Chevron / Up/Down/Left/Right` | Double chevron (expand/collapse) |
| `Arrow up/down/left/right` | Directional arrows |
| `Arrow NE` | Northeast diagonal |
| `Hierarchical Grid Triangle / Right/Down` | Tree/grid expand indicators |
| `Column Sort Arrows / Sorted Ascending/Descending/Unsorted` | Data grid column sorting |

#### 📊 Chart Type Icons

| Icon Name | Usage |
|-----------|-------|
| `Chart Type / Bars` | Bar chart |
| `Chart Type / Scatter` | Scatter plot |
| `Chart Type / Line` | Line chart |
| `Chart Type / Area` | Area chart |
| `Chart Type / Table` | Table view |

#### 📄 Document & File Icons

| Icon Name | File Types |
|-----------|-----------|
| `Document Icons / vstx` | Visio template |
| `Document Icons / vssx` | Visio stencil |
| `Document Icons / mpp` | Project file |
| `Document Icons / pub` | Publisher |
| `Document Icons / dotx` | Word template |
| `Document Icons / vsdx` | Visio drawing |
| `Document Icons / xsn` | InfoPath form |
| `Document Icons / onetoc` | OneNote TOC |
| `Document Icons / accdb` | Access database |
| `Document Icons / xlsx` | Excel |
| `Document Icons / pptx` | PowerPoint |
| `Document Icons / docx` | Word |
| `Document Icons / one` | OneNote |
| `Document Icons / potx` | PPT template |
| `Document Icons / sway` | Sway |
| `Document Icons / mpt` | Project template |
| `Document Icons / xltx` | Excel template |
| `Document Icons / pub (2)` | Publisher alt |

#### 📱 App Icons

| Icon Name | Usage |
|-----------|-------|
| `App Icons / Access` | Microsoft Access |
| `App Icons / Project` | Microsoft Project |
| `App Icons / Office` | Microsoft Office |
| `App Icons / OneNote` | OneNote |
| `App Icons / Sway` | Sway |
| `App Icons / Delve` | Delve |
| `App Icons / Infopath` | InfoPath |
| `App Icons / Visio` | Visio |
| `App Icons / Excel` | Excel |
| `App Icons / SharePoint` | SharePoint |
| `App Icons / PowerPoint` | PowerPoint |
| `App Icons / Publisher` | Publisher |
| `App Icons / Outlook` | Outlook |
| `App Icons / OneDrive` | OneDrive |
| `App Icons / Word` | Word |

#### 👤 Avatar/People Icons

| Icon Name | Usage |
|-----------|-------|
| `Avatar default` | Default user avatar |
| `Avatar unknown` | Unknown user |
| `Person` | Generic person icon |
| `Users` | Multiple users |
| `Add team member` | Add user to team |
| Named avatars (e.g., `Alan Munger`, `Amanda Brady`, etc.) | Placeholder personas for mockups |

#### ⚙️ Settings & Configuration Icons

| Icon Name | Usage |
|-----------|-------|
| `Gear` | General settings |
| `Configuration` | Configuration |
| `Properties` | Resource properties |
| `Diagnostic-Settings` | Diagnostics config |
| `Tags` | Resource tags |
| `Locks` | Resource locks |
| `Extensions` | VM/resource extensions |
| `Variables` | Automation variables |
| `Metrics` | Metrics/monitoring |
| `Alerts` | Alert rules |
| `Log` | Activity/audit logs |
| `Diagnostic-Settings` | Diagnostic settings |
| `Access-Control` | IAM/RBAC |
| `Policy` | Azure Policy |
| `Compliance` | Compliance |

### Icon Naming Conventions

- **Azure services**: Hyphenated names matching Azure resource types (e.g., `Virtual-Machine`, `App-Services`)
- **Actions**: Single words or short phrases (e.g., `Delete`, `Add`, `Copy`)
- **Status**: Under `Regular/` or `With Outline/` prefix (e.g., `Regular/Success`)
- **Directional**: Under category prefix (e.g., `Double Chevron / Up`)
- **Documents**: Under `Document Icons /` prefix
- **Apps**: Under `App Icons /` prefix
- **Charts**: Under `Chart Type /` prefix

### Icon Search Tips

| If you need... | Search for... |
|----------------|---------------|
| An Azure service icon | The service name with hyphens (e.g., `App-Services`) |
| A status indicator | `Regular/` or `With Outline/` + status name |
| A command icon | The action verb (e.g., `Delete`, `Refresh`, `Copy`) |
| A navigation icon | The destination name (e.g., `Home`, `Dashboard`) |
| A directional icon | `Chevron`, `Arrow`, or `Double Chevron` |
| A chart icon | `Chart Type /` + chart name |
| A document icon | `Document Icons /` + extension |
| The Copilot icon | `Copilot` (then select size variant) |
| The Azure brand icon | `Azure` (then select Color/Monoline/White) |

---

## Basic Blade Construction Recipe

A **blade** is the fundamental container for content in the Azure portal. Here's how to construct one:

### Anatomy of a Blade

```
┌─────────────────────────────────────────────┐
│  Site Header (40px)                          │
├─────────────────────────────────────────────┤
│  Breadcrumb (28px)                           │
├─────────────────────────────────────────────┤  ← "Top Shell" (132px total)
│  Blade header (64px)                         │
│  (Title, Subtitle, Icon, Copilot Ribbon)     │
├─────────────────────────────────────────────┤
│                                              │
│  "Menu + Content" (horizontal split)         │
│  ┌──────────┬───────────────────────────┐   │
│  │ Service  │  "Content + Footer"        │   │
│  │ Menu     │  ┌─────────────────────┐   │   │
│  │ (264px)  │  │ Toolbar (Azure)     │   │   │
│  │          │  ├─────────────────────┤   │   │
│  │          │  │ [Filter cards]      │   │   │
│  │          │  │ [Filter pills]      │   │   │
│  │          │  ├─────────────────────┤   │   │
│  │          │  │ Content Body        │   │   │
│  │          │  │ - Data Grid         │   │   │
│  │          │  │ - Forms             │   │   │
│  │          │  │ - Overview Cards    │   │   │
│  │          │  ├─────────────────────┤   │   │
│  │          │  │ Footer (if needed)  │   │   │
│  │          │  └─────────────────────┘   │   │
│  └──────────┴───────────────────────────┘   │
│                                              │
└─────────────────────────────────────────────┘
```

### Structural Frame Patterns

#### Pattern: "Top Shell" (132px)

The **Top Shell** is a fixed-height wrapper (132px) that groups the three chrome elements at the top of every blade. Use this to keep header elements together as a unit.

```
Top Shell (FRAME, 132px height, fill width)
├── Site Header (INSTANCE, 40px height)
├── Breadcrumb (INSTANCE, 28px height)
└── Blade header (INSTANCE, 64px height)
```

**When to use:** All create/wizard flows and standalone blades. Resource detail blades may keep these as direct children of the page frame instead.

---

#### Pattern: "Menu + Content" (Horizontal Split)

The **Menu + Content** frame is the standard horizontal layout for any resource blade that has a left-side Service Menu navigation.

```
Menu + Content (FRAME, fill width, fill height)
├── Direction: Horizontal →
├── Gap: 0
├── Children:
│   ├── Service Menu (INSTANCE, 264px fixed width, fill height)
│   │   ├── State: Open
│   │   ├── Expand groups: True/False
│   │   └── Favorites group: True/False
│   └── Content + Footer (FRAME, fill width, fill height)
│       └── [See "Content + Footer" pattern below]
```

**Rules:**
- Service Menu is always **264px wide**, fixed
- Content area fills remaining width
- This pattern is used for ALL resource detail blades (Overview, Inventory, Settings, etc.)
- For create/wizard flows (with Horizontal TabList), do NOT use this pattern — use a full-width content area instead

---

#### Pattern: "Content + Footer" (Inner Content Wrapper)

Within the "Menu + Content" split, the **Content + Footer** frame contains the actual page content:

```
Content + Footer (FRAME, fill width, fill height)
├── Direction: Vertical ↓
├── Padding: 0px top, 20px right, 0px bottom, 20px left
├── Gap: 12px (between ALL children — this is critical!)
├── primaryAxisAlignItems: MIN (top-aligned, never CENTER)
├── counterAxisAlignItems: MIN (left-aligned)
├── primaryAxisSizingMode: FIXED
├── counterAxisSizingMode: FIXED
├── All children: layoutAlign = STRETCH (fill full width)
├── Children:
│   ├── Toolbar (Azure) (INSTANCE, 41px height, fill width)
│   │   └── Top of Page: Yes
│   ├── [Optional] Essentials (INSTANCE, ~231px)
│   ├── [Optional] Azure Horizontal TabList (INSTANCE, 44px)
│   ├── Filtering + Pills (FRAME, 32px, fill width)
│   ├── Azure F2-Data Grid (INSTANCE, fill remaining height)
│   │   └── layoutGrow: 1 (takes remaining vertical space)
│   └── [Optional] Footer bar (INSTANCE, 56px) — pagination
```

**⚠️ CRITICAL spacing rules:**
- Gap between items: **12px** (set via `itemSpacing: 12`)
- Padding: **0px top, 20px right, 0px bottom, 20px left** (left and right padding)
- primaryAxisAlignItems: **MIN** (top) — NEVER use CENTER or items will float in the middle
- counterAxisAlignItems: **MIN** (left) — ensures proper left alignment
- Every child must have `layoutAlign: 'STRETCH'` to fill the full content width

---

#### Toolbar (Azure) — Detailed Usage Guide

The **Toolbar (Azure)** is the command bar used at the top of content areas. It is a LIBRARY COMPONENT — never recreate it manually.

**Component structure:**
```
Toolbar (Azure) [INSTANCE from library]
├── Variant: Top of Page? = Yes | No
│   • "Yes" = has a 1px bottom border (use when toolbar is first element in content)
│   • "No" = no bottom border (use inside nested contexts)
└── Contains nested: Toolbar [REMOTE Fluent 2 component]
    ├── Variants: Size = Medium (default) | Large | Small
    ├── Type: Static (default) | Contextual (floating)
    ├── Properties:
    │   ├── End search (boolean) — shows/hides search in end slot
    │   └── End content (boolean) — shows/hides end content area
    └── Children:
        ├── Start-content (FRAME)
        │   ├── Button (INSTANCE) — Style=Subtle, Layout=Icon and label
        │   ├── Button (INSTANCE) — repeated for each command
        │   ├── Dropdown (FRAME, hidden by default) — for split buttons
        │   ├── Divider (FRAME) — separates groups
        │   └── ...more buttons
        └── End-content (FRAME)
            ├── Button (INSTANCE) — e.g., "Group by None"
            └── Search (FRAME, hidden by default)
```

**How to configure buttons inside the toolbar:**

Each button in the toolbar is a **Fluent 2 Button** instance with these properties:
- Style: `Subtle` (always for toolbar buttons)
- State: `Rest` (default) or `Disabled`
- Size: `Medium (Default)`
- Layout: `Icon and label (Default)`
- **`Menu button#157663:0`**: Set to `true` for dropdown/menu triggers (shows chevron ▾ after label)
- **`Label#157663:151`**: The button text label

**⚠️ CRITICAL: For dropdown/menu button triggers (e.g., "Add members ▾", "Manage view ▾"):**
- Use **Button** instances with `Menu button` = `true` — this renders as a proper toolbar button with a chevron
- **NEVER use the `Dropdown` frames** (which contain `.DEPRECATED_Dropdown` instances) — these render as input fields with underlines and look completely wrong in a toolbar
- Hide any visible `Dropdown` frames: set `visible = false`

To customize button labels and icons, use text overrides and icon instance swaps on the nested Button instances.

**Toolbar examples (from Azure patterns):**

| Use Case | Start Buttons | End Buttons |
|----------|--------------|-------------|
| Resource Group Overview | + Create ∨, Manage View, Refresh, Export to CSV, Open query \| Assign Tags, ⋯ | Group by None ∨ |
| Service Management | + Create ∨, Manage tenants, What's new \| Assign Tags | Group by None ∨ |
| Inventory/List view | + Create, Upload, Full screen \| Edit, Start, Export, Clone, Assign tags \| Delete | Group by None ∨ |
| Detail/Resource view | Upload, Delete, Move ∨, CLI/PS, Open in mobile | Group by None ∨ |

**Key rules:**
1. Use `|` dividers to separate logical button groups
2. Primary action (usually "Create") is always first with a `+` icon
3. Destructive actions (Delete) are at the end after a divider, often disabled by default
4. The ⋯ (more/overflow) button appears when there are too many commands
5. "Group by None" dropdown is the standard end-content item for list views
6. Button labels should be concise (1-3 words max)

**Instantiation for AI agents:**
```javascript
// 1. Instantiate the toolbar
figma_instantiate_component({
  componentKey: "b911751a8fde73751fe8572c68b8a48da4167be9", // Top of Page?=Yes
  parentNodeId: "<content-frame-id>"
});

// 2. Configure the nested buttons via text overrides
// Access buttons at: instance > Toolbar > Start-content > Button[n]
// Use figma_set_instance_properties or direct text override on nested instances
```

---

#### Essentials — Detailed Usage Guide

The **Essentials** component displays resource metadata (subscription, location, resource group, etc.) in a two-column key-value layout with an accordion toggle. It is a LIBRARY COMPONENT.

**Component structure:**
```
Essentials [INSTANCE from library]
├── Variants:
│   • State: Collapsed | Expanded
│   • Show Tags: Yes | No
│   • Mobile: Yes | No
├── Component key: 64429d075e5bd7a220a23ea9bd800b2a6f47c434
└── Children:
    ├── Accordion main (FRAME)
    │   ├── Accordion [INSTANCE - Fluent 2]
    │   │   ├── Text: "Essentials" (text override)
    │   │   ├── Chevron: Before
    │   │   ├── Expanded: False (collapsed) or True
    │   │   └── Size: Medium
    │   └── Right side commands (FRAME)
    │       ├── Link [INSTANCE] — "View Cost"
    │       ├── Divider [INSTANCE]
    │       └── Link [INSTANCE] — "JSON View"
    └── Dropdown Area (FRAME) — only visible when Expanded
        ├── Breakpoint Columns (FRAME, horizontal layout)
        │   ├── Col 1 (FRAME, vertical)
        │   │   ├── Row: Lframe (Label) + ":" + Rframe (Label/Link)
        │   │   ├── Row: ...
        │   │   └── (5 rows typical)
        │   └── Col 2 (FRAME, vertical)
        │       ├── Row: Lframe (Label) + ":" + Rframe (Label/Link)
        │       └── (3-5 rows typical)
        ├── Tags (FRAME) — visible when Show Tags=Yes
        │   └── Tag pills row
        └── Divider [INSTANCE] — bottom separator
```

**Key-value row structure:**
Each row inside a column follows this pattern:
```
Row (FRAME, horizontal)
├── Lframe (FRAME)
│   └── Label [INSTANCE] — Type=Regular, Size=Medium
│       └── Text property: "Resource group", "Location", "Subscription", etc.
├── ":" (TEXT, separator)
└── Rframe (FRAME)
    └── Label [INSTANCE] — Type=Regular, Size=Medium
        └── Text property: "value" (plain text or styled as link)
```

The **Label** component (key: `bd95a5b54b4f5be5ed9d773a6220833a2bcc2cf2`) has these properties:
- `Text#46328:0` (TEXT) — the display text
- `Required#18738:0` (BOOLEAN) — show asterisk
- `Type`: Regular (Default) | Link
- `Size`: Medium | Small
- `Disabled`: Off | On

**How to configure for a Resource Group Overview:**

| Col 1 (Left) | Col 2 (Right) |
|--------------|---------------|
| Resource group : resource-group-name | Deployments : 5 Failed, 96 Succeeded |
| Location : East US 2 | (empty or additional item) |
| Subscription : subscription-name | |
| Subscription ID : ############### | |

**Right side commands:**
- "View Cost" — Link instance
- Divider — vertical separator
- "JSON View" — Link instance
- These appear in the top-right of the Accordion header row

**Variant selection for common cases:**
- Resource detail expanded (default): `State=Expanded, Show Tags=No, Mobile=No` → key `25070b7c2d37872c678ea3c680ba86c30064e902`
- Resource detail with tags: `State=Expanded, Show Tags=Yes, Mobile=No` → key `2d19173d95624cdc96b693848550bc187e3dc894`
- Collapsed: `State=Collapsed, Show Tags=No, Mobile=No` → key `0962ef30a47b92a7c1f1f269efe5e1cec716d77e`

**Instantiation for AI agents:**
```javascript
// 1. Instantiate Essentials (Expanded, no tags, desktop)
figma_instantiate_component({
  componentKey: "25070b7c2d37872c678ea3c680ba86c30064e902",
  parentNodeId: "<content-frame-id>"
});

// 2. Configure key-value pairs by overriding Label text properties:
// Access at: instance > Dropdown Area > Breakpoint Columns > Col 1 > Row[n] > Lframe > Label
// Set Text#46328:0 property on each Label instance for keys and values
```

---

#### Azure Horizontal TabList — Detailed Usage Guide

The **Azure Horizontal TabList** is the navigation tab bar used to switch between content sections within a blade (e.g., Resources / Recommendations / Properties). It is a LIBRARY COMPONENT.

**Component structure:**
```
Azure Horizontal TabList [INSTANCE from library]
├── Variants:
│   • Layout: Text only | Icon only | Icon before
│   • Size: Medium (default) | Small
│   • Circular: True | False
└── Contains 11 ".Horizontal Swap" slots
    ├── Slots 0–4: Visible by default (named "First tab" through "Fifth tab")
    ├── Slots 5–9: Hidden by default (named "X tab") — show for more tabs
    └── Slot 10: Overflow "..." button (always visible)
    
    Each .Horizontal Swap contains:
    └── Horizontal Tab [INSTANCE - Fluent 2 component]
        ├── Variants:
        │   • Selected: Yes | No (underline indicator shown when Yes)
        │   • Style: Transparent (default)
        │   • Size: Medium (default)
        │   • State: Rest | Hover | Pressed | Disabled
        ├── Properties:
        │   • Icon (Unselected) — boolean, show/hide icon when not selected
        │   • Icon (Selected) — boolean, show/hide icon when selected
        └── Text override: Tab label (e.g., "Resources", "Recommendations")
```

**How to configure for your use case:**

1. **Set tab count**: Show/hide `.Horizontal Swap` slots to match number of tabs needed
   - For 2 tabs: Show slots 0–1, hide slots 2–10
   - For 3 tabs: Show slots 0–2, hide slots 3–10
   - Overflow "..." (slot 10) typically hidden if ≤5 tabs

2. **Set tab labels**: Override text on each `Horizontal Tab` instance inside each swap
   - Access at: `TabList > .Horizontal Swap[n] > Horizontal Tab > [text node]`

3. **Set selected state**: Change the `Selected` variant property of the active tab to `Yes`
   - Only ONE tab should have `Selected=Yes` at a time
   - All others should be `Selected=No`

4. **Icons**: Toggle `Icon (Unselected)` and `Icon (Selected)` booleans if using icon-before layout

**Common configurations:**

| Use Case | Tab Labels | Selected |
|----------|-----------|----------|
| Resource Group Overview | Resources, Recommendations | Tab 0 (Resources) |
| Resource Detail | Overview, Properties, Monitoring, Locks | Tab 0 (Overview) |
| Create Flow (sub-sections) | Basics, Networking, Tags, Review + Create | Tab 0 (Basics) |
| Inventory View | All resources, Applications, Shared resources | Tab 0 (All) |

**Key rules:**
1. Always use `Layout=Text only` for standard Azure navigation tabs
2. Use `Size=Medium (default)` unless space-constrained
3. The selected tab has a colored underline indicator — never add manual underlines
4. Tab labels should be concise (1-2 words preferred, 3 max)
5. Hide unused tab slots — do NOT leave them showing "X tab"
6. The underline color comes from the design token system — do not override

**Instantiation for AI agents:**
```javascript
// 1. Instantiate the TabList
figma_instantiate_component({
  componentKey: "f995a69c77a27d0fe8f3f804cd03432ef7def770", // Text only, Medium, Non-circular
  parentNodeId: "<content-frame-id>"
});

// 2. Configure tabs:
// - Hide unused .Horizontal Swap children (set visible=false for slots you don't need)
// - Override text labels on visible tabs
// - Set Selected=Yes on the active tab (via componentProperties)
// - Hide overflow "..." (slot 10) if ≤5 tabs
```

---

#### Filtering + Pills Bar — Detailed Usage Guide

The **Filtering + Pills** bar is the search and filter row that appears below tabs and above the data grid. It is a **composed pattern** (custom FRAME) containing library component instances.

**Pattern structure:**
```
Filtering + Pills (FRAME, fill width, 32px height)
├── Layout: Horizontal →
├── Gap: 8px
├── Align: left (MIN), vertically centered
├── Children:
│   ├── SearchBox [INSTANCE from Fluent 2 library]
│   │   ├── Component key: db97bfd9a9e75cad3417131b0ce5190b7400071d
│   │   ├── Style: Filled darker (Default)
│   │   ├── Size: Medium (Default)
│   │   ├── State: Rest
│   │   ├── Width: 274px (fixed)
│   │   └── Placeholder text: "Search" or "Filter for any field..."
│   └── pill filter group (FRAME, hug content)
│       ├── Layout: Horizontal →
│       ├── Gap: 12px
│       └── Children: Filter Pill Dropdown instances
│           ├── Filter Pill Dropdown [INSTANCE] — Removable=Yes (active filters with ✕)
│           ├── Filter Pill Dropdown [INSTANCE] — (repeat per filter)
│           └── Filter Pill Dropdown [INSTANCE] — Removable=No ("+ Add filter" pill)
```

**Filter Pill Dropdown component:**
- Component set key: (local component in working files)
- Variant `Removable=Yes` (active filter): key `d203d9806734779327b79b0283b7f68463bc1f33`
- Variant `Removable=No` ("+ Add filter"): key `e83137376566f5f65341bb926729b0566c673376`
- Key text path: `Tag/Content/Text slot/Primary` — set the pill label here
- Hide avatar: set `Tag/Avatar container/Avatar` to `visible = false` if not needed

**SearchBox component:**
- Component key: `db97bfd9a9e75cad3417131b0ce5190b7400071d`
- Component set: "SearchBox"
- Variants: Style=`Filled darker (Default)`, Size=`Medium (Default)`, State=`Rest`
- Key properties:
  - `Secondary action#312545:0` (BOOLEAN) — show secondary clear action
  - `Focus actions#61219:0` (BOOLEAN) — show focus state actions
- Placeholder text path: `Contents/Icon-Text-stack/.Text/Placeholder text` — default is "Search", override to context-specific text (e.g., "Filter for any field...")
- **⚠️ Do NOT create a manual text frame as a placeholder for SearchBox** — always use this component instance

**Common filter pill configurations:**

| Use Case | Pills |
|----------|-------|
| Resource Group Overview | "Type equals all" ✕, "Location equals all" ✕, "+ Add filter" |
| Inventory List | "Subscription" ✕, "Move type" ✕, "Source region" ✕, "Target region" ✕ |
| General Browse | "Status" ✕, "Type" ✕, "+ Add filter" |

**Key rules:**
1. SearchBox is always FIRST, fixed 274px width
2. Filter pills use `Filter Pill Dropdown` component (NOT Tag component or manual text frames)
3. Active filters use variant `Removable=Yes` (key: `d203d9806734779327b79b0283b7f68463bc1f33`)
4. **"+ Add filter" button uses variant `Removable=No`** (key: `e83137376566f5f65341bb926729b0566c673376`) — it is a pill, not floating text
5. Set pill label at text path: `Tag/Content/Text slot/Primary`
6. Hide avatar container if not needed (visible=false on `Tag/Avatar container/Avatar`)
7. Pill labels should be short: "FilterName equals value" or "+ Add filter"
8. The frame stretches full width but content hugs left

**Instantiation for AI agents:**
```javascript
// 1. Create the container frame
const filterFrame = figma.createFrame();
filterFrame.name = "Filtering + Pills";
filterFrame.layoutMode = "HORIZONTAL";
filterFrame.itemSpacing = 8;
filterFrame.counterAxisAlignItems = "CENTER";
filterFrame.primaryAxisAlignItems = "MIN";
filterFrame.resize(1656, 32);

// 2. Instantiate SearchBox
figma_instantiate_component({
  componentKey: "db97bfd9a9e75cad3417131b0ce5190b7400071d",
  parentNodeId: filterFrame.id
});

// 3. Create pill group frame
const pillGroup = figma.createFrame();
pillGroup.name = "pill filter group";
pillGroup.layoutMode = "HORIZONTAL";
pillGroup.itemSpacing = 12;
// Set to hug content
pillGroup.primaryAxisSizingMode = "AUTO";
pillGroup.counterAxisSizingMode = "AUTO";

// 4. Instantiate Filter Pill Dropdown pills
figma_instantiate_component({
  componentKey: "d203d9806734779327b79b0283b7f68463bc1f33", // Removable=Yes (active filter)
  parentNodeId: pillGroup.id
});
// Set pill label at text path: Tag/Content/Text slot/Primary
// Hide avatar if not needed: Tag/Avatar container/Avatar → visible=false

// 5. Instantiate "+ Add filter" pill
figma_instantiate_component({
  componentKey: "e83137376566f5f65341bb926729b0566c673376", // Removable=No
  parentNodeId: pillGroup.id
});
// Set label to "+ Add filter"
```

---

#### Pattern: Section Header + Description

Azure blades use a **consistent header + description** pattern to introduce content sections. There are two size tiers depending on the scope of the section.

##### Tier 1 — Section Header (large scope, e.g., "Resiliency goals", "Resiliency recommendations")

Use when introducing a **major section** of a blade — a visually distinct content block that groups cards, data grids, or other patterns beneath it.

```
Section Header (FRAME, vertical ↓, gap: 4px, no padding, no fill)
├── Section Header Title (TEXT)
│   └── Text Style: `az-text-/header 1` (key: d09052279e0b729307958c3e60fe5b11925676cb)
│       → Segoe UI Semibold 18px, lineHeight 24px, themed color
└── Description (TEXT)
    ├── Text Style: `az-text-/body` (key: 4e3ac391ff02a443b1bed23de6d18ca45f5b07ea)
    │   → Segoe UI Regular 13px, lineHeight 18px, themed color
    └── Inline "Learn more" link at end (brandForegroundLink blue)
```

##### Tier 2 — Form / Content Header (smaller scope, e.g., "Address spaces", "Subnets")

Use when introducing a **subsection or form area** — a narrower block of content, often above form fields, tables, or inline controls.

```
Header information (FRAME, vertical ↓, gap: 4px, no padding, no fill)
├── Form header (TEXT)
│   └── Text Style: `Web/Body 1 Strong` (key: ce8b1791e619c2b63a557029c4a68f1c9e7b5ec0)
│       → Segoe UI Semibold 14px, lineHeight 20px, themed color
├── Description (TEXT)
│   ├── Text Style: `Web/Body 1` (key: 390e4051fa2060ac5eddf749475418e08bc48740)
│   │   → Segoe UI Regular 14px, lineHeight 20px, themed color
│   └── Inline "Learn more" link at end (brandForegroundLink blue)
└── [Optional] Message Bar (INSTANCE) — for warnings or info banners below the description
```

##### How to choose the tier

| Signal | Use Tier 1 (18px title) | Use Tier 2 (14px title) |
|--------|------------------------|------------------------|
| Section contains cards, data grids, KPI rows | ✅ | — |
| Section contains form fields, tables, inline controls | — | ✅ |
| Multiple Tier 1 sections appear stacked in the blade | ✅ | — |
| Header sits inside a Card or dialog body | — | ✅ |
| Only one section on the page | Either works — use Tier 1 if content is complex | Either works — use Tier 2 if content is simple |

##### Construction rules

- **Container**: Always a FRAME with `layoutMode: 'VERTICAL'`, `itemSpacing: 4`, no padding, no fill
- **Width**: Set to `layoutSizingHorizontal: 'FILL'` so it stretches to the content area
- **"Learn more" link**: Append as inline text in the description (same TEXT node), styled with `brandForegroundLink` color. Do NOT create a separate Link component — the link is part of the description text flow
- **Message Bar**: Only add below Tier 2 headers when there is a warning or contextual info to show. Use the Message Bar component instance

##### Executable Example — Building a Section Header (Figma Plugin API)

```javascript
// Copyable agent instruction — builds a Tier 1 section header with library text styles
const section = figma.createFrame();
section.name = 'Section Header';
section.layoutMode = 'VERTICAL';
section.primaryAxisSizingMode = 'AUTO';
section.counterAxisSizingMode = 'AUTO';
section.itemSpacing = 4;
section.fills = [];

// Title — uses az-text-/header 1 style (Tier 1) or Web/Body 1 Strong (Tier 2)
const title = figma.createText();
title.name = 'Section Header Title';
const titleStyle = await figma.importStyleByKeyAsync('d09052279e0b729307958c3e60fe5b11925676cb'); // az-text-/header 1
// For Tier 2, use: 'ce8b1791e619c2b63a557029c4a68f1c9e7b5ec0' (Web/Body 1 Strong)
await title.setTextStyleIdAsync(titleStyle.id);
title.characters = 'Section title here';

// Description — uses az-text-/body style (Tier 1) or Web/Body 1 (Tier 2)
const desc = figma.createText();
desc.name = 'Description';
const descStyle = await figma.importStyleByKeyAsync('4e3ac391ff02a443b1bed23de6d18ca45f5b07ea'); // az-text-/body
// For Tier 2, use: '390e4051fa2060ac5eddf749475418e08bc48740' (Web/Body 1)
await desc.setTextStyleIdAsync(descStyle.id);
desc.characters = 'Description text here. Learn more.';

section.appendChild(title);
section.appendChild(desc);
section.layoutSizingHorizontal = 'FILL';
// Append section to your content area
```

---

#### Pattern: Label + Read-only Value Fields (`.Input row` — F2) ✅

**⚠️ USE THIS whenever you need to display a set of static labels paired with read-only text values** (e.g. Properties pages, "Project basics", resource detail summaries, review/confirmation steps). Do **NOT** hand-build these as loose TEXT nodes in two columns, and **do NOT fall back to Fluent 1 for this anymore** — the native **Fluent 2 `.Input row`** component now covers read-only fields.

> **Update (supersedes the old F1 "Form Fields" guidance):** A read-only label+value row is just a **`.Input row`** (key `f91da85ec13ea133a33b96d5eb0bf77ebf65e44b`) whose inner **Input** is set to variant **`State=Read only`**. It is the *same* `.Input row` used for editable Drawer forms (see [Drawer Form](#drawer)) — the only difference is the Input's `State`. This is native Fluent 2, so **no `[F1]` annotation** is needed. The Fluent 1 "Form Fields" approach further below is now **deprecated** — keep it only for touching existing F1 layouts.

**F2 anatomy (`.Input row`):**
```
.Input row (INSTANCE, 728×32, HORIZONTAL)   ← key f91da85ec13ea133a33b96d5eb0bf77ebf65e44b
├── props: Show Link=false, Show Message=false, Is secondary=false
├── Label + indicator (FRAME, ~230px)
│   ├── .hierarchical indicator (Label on=Left)
│   └── .Label → Label (INSTANCE)            ← set Text#46328:0 = field label ("Service Group name")
└── Input field (FRAME, fills remaining)
    ├── Input (INSTANCE)                     ← State=Read only + remove stroke (strokes=[]) + Contents padL/padR=0
    │   └── Contents → Icon-Text-stack → Text (TEXT)  ← override with the read-only VALUE ("Contoso-Prod")
    ├── Link (INSTANCE)                      ← shown only when Show Link=true (inline action link, e.g. "Update")
    └── .StatusIndicator (INSTANCE)          ← shown only when Show Message=true (info/validation message)
```

**Component key (F2):** `.Input row` = `f91da85ec13ea133a33b96d5eb0bf77ebf65e44b` (Azure Fluent 2 web library). Inner Input variant used = `Style=Outline, Size=Medium, State=Read only`.

**How to populate (per row, F2):**
1. Instantiate **`.Input row`** (key `f91da85ec13ea133a33b96d5eb0bf77ebf65e44b`). Stack rows vertically with **20px** gap inside one container so the label/value columns align.
2. **Label:** on the nested **Label** instance set `Text#46328:0` = the field caption (e.g. "Service Group name"). Set `Required#18738:0=false` unless the field is genuinely required.
3. **Read-only state:** on the nested **Input** instance set variant **`State=Read only`** (keep `Style=Outline, Size=Medium`).
4. **⚠️ Strip the input chrome (REQUIRED to match the plain-text look):** `State=Read only` alone still shows a bordered input box. After setting it, also:
   - **Remove the stroke/border** on the **Input** instance → set `strokes = []` (no border).
   - **Remove the horizontal padding** on the **Input → Contents** frame → `paddingLeft = 0`, `paddingRight = 0` (keep the vertical padding). This makes the value sit flush-left, aligned with the layout, reading as plain text instead of a boxed field.
5. **Value:** override the `Text` TEXT node inside `Input → Contents → Icon-Text-stack` with the value string (e.g. "Contoso-Prod").
6. **Value has an action link** (e.g. "Update", "Create new")? Set **`Show Link=true`** and set the `Link` instance's `Text#41437:0`. This replaces the old F1 `Read-only text + Link` variants.
7. **Need an inline info/validation note?** Set **`Show Message=true`** and configure the `.StatusIndicator` (message text + category).

**Sizing (F2):** row = 728×**32**; label column ≈ **230px**; Input field fills the rest.

**When to use vs. other patterns:**
- **Label + read-only value on a details/properties/review page → use `.Input row` with Input `State=Read only` (this pattern).**
- Editable form inputs → same `.Input row` with the Input in its default editable state (see [Drawer Form](#drawer)).
- Resource metadata header strip (subscription, RG, location) → use **Essentials**.

---

##### ⚠️ Deprecated — Fluent 1 "Form Fields" fallback (legacy only)

> **Deprecated — do not use for new work.** Prefer the Fluent 2 `.Input row` above. The Fluent 1 **Form Fields** pattern below is retained only for editing existing `[F1]` layouts. When you touch such a layout, prefer migrating it to `.Input row`.

**Anatomy:**
```
Section (FRAME, VERTICAL, gap ~12px, no fill)
├── Title (TEXT) — e.g. "Project basics"
│   └── Text Style: Web/Body 1 Strong (Segoe UI Semibold 14/20)  ← section/group title
└── Fields (FRAME, VERTICAL, gap between rows)
    ├── Form Fields (INSTANCE)  ← one per label/value row, 728×24
    │   ├── Label (FRAME, 240px wide)
    │   │   └── Label (INSTANCE) → Label (TEXT)   ← the field label, e.g. "Project name"
    │   ├── Label 2nd line (FRAME, 240px) — HIDDEN by default
    │   │   └── (Required asterisk + Info glyph variant — show only if needed)
    │   └── SimpleListView - Rest (INSTANCE, 480px wide)
    │       └── List item (TEXT)   ← the READ-ONLY value, e.g. "Contoso-XAPI-Region-Move"
    ├── Form Fields … (repeat per row)
    └── InfoBox (INSTANCE) — HIDDEN by default (show for an inline info/"Learn more" note)
```

**Component keys (Fluent 1 — file `Bwn8rmUOYtnPRwA3JoQTBn`):**

| Element | Set Key | Variant Key | Notes |
|---------|---------|-------------|-------|
| **Form Fields** (row wrapper) | `49f0c7a0b46d5694a216e0e752399dd4fbc2e0b4` | `9229b20363bb0aff6af61cbb007fe2712660c640` | Variant: `Container width=> 480px, Label type=Single line, Input field type=Read-only text` |
| **Label** (field label) | `2478967b4bac5b1a19c70d713083586daa58d3c3` | `fe8eb5e7a1358d6fc73192f7c73825ba6ed154d2` | Variant: `Required=False, Disabled=False, InfoBalloon=False` |
| **SimpleListView - Rest** (read-only value) | — | `c3ab279300cf19d8172a0f0c5bc46974ca570fd8` | Holds the read-only text in its `List item` TEXT node |

##### ⚠️ The three variant properties (set via `Input field type`, NOT extra rows)

The **Form Fields** set (`49f0c7a0b46d5694a216e0e752399dd4fbc2e0b4`) has **3 variant properties**. Pick the right variant instead of hand-building — **never fake a link by adding a separate blank-label row underneath.**

| Property | Values |
|----------|--------|
| **Container width** | `< 480px`, `> 480px` (default), `1024 px` |
| **Label type** | `Single line` (default), `Double line` (adds a description/2nd label line) |
| **Input field type** | `Read-only text`, `Read-only text + Link (One)`, `Read-only text + Link (Multiple)`, `Link (One)`, `Link (Multiple)`, `Textbox`, `Textbox + Link (One)`, `Dropdown`, `Dropdown + Link`, `Nested Dropdown`, `Toggle`, `Checkbox Enabled/Disabled`, `Checklist`, `Radio options`, `Date picker`, `File upload`, `Tags`, `Tags + link`, … |

**⚠️ When a value has a link BELOW it (e.g. "Network access" → `Enabled` with an `Update` link under it): use `Input field type=Read-only text + Link (One)` — the link renders inside that same field's value column.** Use `Read-only text + Link (Multiple)` for more than one link. Use `Link (One)`/`Link (Multiple)` when the value itself is only a link (no plain text).

**Read-only + Link variant keys (`Container width=> 480px, Label type=Single line`):**

| Input field type | Variant Key | Value-column structure |
|------------------|-------------|------------------------|
| `Read-only text` | `9229b20363bb0aff6af61cbb007fe2712660c640` | `SimpleListView - Rest` → `List item` TEXT |
| `Read-only text + Link (One)` | `dee0cc699152b65d58d02ecc85c840818b48976e` | `Value + link` frame → `Hyperlink` INSTANCE (link TEXT) **+** `SimpleListView - Rest` (read-only TEXT) |
| `Read-only text + Link (Multiple)` | `6ae711368faec53d809bc68ed277afa43b161588` | `Value + link` frame → multiple `Hyperlink` instances + `SimpleListView - Rest` |
| `Link (One)` | `4e4c4f5b58d327f1fd668455027874d3086b3d5d` | `Hyperlink` INSTANCE only |

> **Note:** In the `+ Link` variants the label nests one level deeper (`Label` frame → `Label` frame → `Label` INSTANCE) and the value lives in a **`Value + link`** frame (not a direct `SimpleListView` child). Set the link text on the `Hyperlink` instance's `Label` TEXT and the read-only text on `SimpleListView - Rest` → `List item`.

**Sizing:** row = 728×24; label column = **240px**; value column (`SimpleListView`) = **480px**; label/value text = 18px height inside the 24px row.

**How to populate (per row):**
1. Instantiate **Form Fields** with the correct `Input field type` variant for the row (plain value → `Read-only text`; value with a link under it → `Read-only text + Link (One)`).
2. Set the label: override the `Label` TEXT under the `Label` (240px) frame → e.g. `"Project name"`. On the nested **Label** instance, set `Required#213356:23=false` and `Info balloon#213356:24=false` (both default to **true**, showing a red `*` and ⓘ — turn them off unless the field is genuinely required).
3. Set the value: override the `List item` TEXT inside `SimpleListView - Rest` → e.g. `"Contoso-XAPI-Region-Move"`.
4. For a `+ Link` variant, also set the `Hyperlink` instance's `Label` TEXT to the link caption (e.g. `"Update"`).
5. Keep all rows inside one `Fields` frame so the 240/480 columns line up.

**When to use vs. other patterns (legacy F1):**
- ⚠️ **For new work use the Fluent 2 `.Input row` pattern above, not this.** This F1 note applies only when editing an existing `[F1]` Form Fields layout.
- Editable form inputs → use **Form** / Fluent 2 Input components, not this.
- Resource metadata header strip (subscription, RG, location) → use **Essentials**.

##### `Label type` variant (how the label column behaves)

| Label type | Structure | When to use |
|------------|-----------|-------------|
| **Single line** (default) | `Label` frame → single `Label` INSTANCE (label TEXT + optional `*`/ⓘ) | Normal short labels (e.g. "Subscription ID", "Geography") — the vast majority of fields |
| **Double line** | `Label` frame → `Label L1` TEXT + `Label L2` INSTANCE (TEXT + `Asterix` + `Info Bubble`) | The label caption/description wraps to **two lines** — use only when a single-line label is too long for the 240px column |

##### `Container width` variant

Controls the overall field/column widths. Pick the one matching your content area: **`< 480px`** (narrow blades/drawers), **`> 480px`** (default — the 240px label / 480px value layout used on standard blades), **`1024 px`** (extra-wide blades). Keep it consistent for every row in a section.

##### Full `Input field type` reference (all 23 variants)

The `Input field type` variant swaps what sits in the **value column**. Keys below are for the default **`Container width => 480px, Label type=Single line`** slice (Double-line and other widths exist for every type — swap the variant, keys differ). **Read-only / Link types are the ones you'll use on Properties/details pages; the input types (Textbox, Dropdown, Toggle, etc.) are for editable Forms.**

| Input field type | Value column shows | Use when | Variant Key (> 480px, Single line) |
|------------------|--------------------|----------|-------------------------------------|
| **Read-only text** | `SimpleListView` static text | Plain read-only value (default for details pages) | `9229b20363bb0aff6af61cbb007fe2712660c640` |
| **Read-only text + Link (One)** | read-only text **+ one** `Hyperlink` below | Value with a single action link under it (e.g. Network access → Enabled + Update) | `dee0cc699152b65d58d02ecc85c840818b48976e` |
| **Read-only text + Link (Multiple)** | read-only text **+ several** `Hyperlink`s | Value with 2+ links under it | `6ae711368faec53d809bc68ed277afa43b161588` |
| **Link (One)** | a single `Hyperlink` (no plain text) | Value that is purely one link (e.g. "Configure") | `4e4c4f5b58d327f1fd668455027874d3086b3d5d` |
| **Link (Multiple)** | multiple `Hyperlink`s | Value that is a list of links | `da321e9fbed0c69283fb37f13bf44cf96204d70f` |
| **Textbox** | single-line input | Editable single-line text field | `8b0f58ee4516f132a5a46ba64d96479f95b23702` |
| **Textbox + Link (One)** | input + a link below | Editable text with a helper link | `027687e564ab875beab6ddf3362de362f46528b7` |
| **Textbox Multi-line** | multi-line input (textarea) | Editable long/description text | `d48ae841ab31356509487cc9fa7c7fa9ee230b8b` |
| **Dropdown** | dropdown/select | Single-select from options | `7addc1a13213e4d0f749660c107b95e4c6bcc430` |
| **Dropdown + Link** | dropdown + a link below | Select with a helper link | `04fdd03602ecca1cc46b82e0bfff6d176eba77f8` |
| **Nested Dropdown** | hierarchical dropdown | Select from grouped/nested options | `72230e3bff382423ea124fe2056d85152c859805` |
| **Nested Dropdown + Link (One)** | nested dropdown + one link | Nested select with a helper link | `b528cf7ee2467f44c12015270afae25a75d5d709` |
| **Nested Dropdown + Link (Multiple)** | nested dropdown + links | Nested select with multiple links | `b617d554af2b3fe6558aefee30c3a3cf017c24cb` |
| **Checkbox Enabled** | interactive checkbox | Single boolean opt-in (editable) | `849beb1c6324204ca955328316be6b6e297fc800` |
| **Checkbox Disabled** | greyed checkbox | Boolean shown but not editable | `ae3826d53165421b9d97d90db981d2c6d0b67b46` |
| **Checklist** | list of checkboxes | Multi-select boolean list | `88ada29e7c007a018fccc77ade67028dececfc6a` |
| **Radio options** | radio group | Single choice from a small set | `4ded1c00e0e4c2bb2ffe60349e6d9baa68ddeeaf` |
| **Radio options (Descriptive)** | radio group w/ descriptions | Single choice where each option needs a sub-description | `d4519b396a9a9b9e4966df8d01918ce502bd22ea` |
| **Toggle** | on/off switch | Editable boolean toggle | `4e70a1bfe28e787e1faa4edb0a66facb23b8f10d` |
| **Date picker** | date field | Date selection | `d089f0c395c557b6d17ecd5d101c5a2388caa00e` |
| **File upload** | upload control | File/drag-drop upload | `1a71004f5cdc5e2122e2039a1bd0fbb0d6049eeb` |
| **Tags** | tag pills | Read/enter a set of tags | `c44750e63ec6db26bf0ebf6287798c9485970384` |
| **Tags + link** | tag pills + a link | Tags with a manage/edit link | `e3ccd6614bb875954b73ec5b43120eb0d446ab37` |

> **Choosing quickly:** read-only value → `Read-only text`; read-only value **with a link under it** → `Read-only text + Link (One/Multiple)`; value is only link(s) → `Link (One/Multiple)`; anything editable (form) → the matching input type (`Textbox`, `Dropdown`, `Toggle`, `Checkbox`, `Date picker`, `Tags`, …). All `+ Link` variants place the link(s) in a `Value + link` frame below the primary value/control.

---

#### Pattern: KPI / Clickable Filter Cards Row

**KPI cards** (also called Clickable Cards or Filter Cards) are compact metric cards placed ABOVE the filter pills row. Each card shows a category label, an icon, and a count. They are clickable — selecting a card filters the data grid below.

> **⚠️ Default card width = 180px (fixed).** Unless the reference clearly shows full-width equal-distribution cards, build each KPI card at a **fixed 180px width** (`card.resize(180, card.height)`), not FILL. The row container itself should still be FILL width, but the cards sit left-aligned at 180px each. Only switch cards to `layoutSizingHorizontal = 'FILL'` + `layoutGrow = 1` when the reference explicitly shows cards stretching edge-to-edge.
>
> **⚠️ Row container needs `layoutSizingHorizontal = 'FILL'`** — set this AFTER appending the row to the Content frame, or the row collapses to ~100px and cards render as thin slivers.

##### Row Container

```
KPI cards (FRAME, FILL width, HUG height)
├── Direction: Horizontal →
├── Gap: 16px
├── Padding: left 20, right 20
├── clipsContent: false (critical — prevents shadow clipping)
├── Children:
│   ├── Clickable Card × N (one per category) — DEFAULT 180px fixed width each
│   │   (only use FILL horizontal when reference shows edge-to-edge cards)
```

##### Clickable Card Structure (manual FRAME — not a library component)

```
Clickable Card (FRAME, FILL horizontal / HUG vertical, cornerRadius: 4, fill: white)
├── Padding: 12px all sides
├── Direction: Vertical ↓
├── Gap: 4px
├── Effects: TWO drop shadows (critical for card appearance):
│   ├── Shadow 1: offset(0,0), blur: 2, color: rgba(0,0,0,0.12)
│   └── Shadow 2: offset(0,2), blur: 4, color: rgba(0,0,0,0.14)
├── Children:
│   ├── Header (FRAME, vertical ↓, gap: 2, no fill)
│   │   ├── Subtitle-top (TEXT, 12px Regular, hidden by default) — optional subtext above title
│   │   ├── Title (FRAME, horizontal →, gap: 4, center-aligned vertically, no fill)
│   │   │   ├── Title text (TEXT, 14px Semibold, lineHeight: 20px, neutralForeground1)
│   │   │   └── Info Bubble (INSTANCE, key: 7bf5384b48ae4d34f2a6af8818251cda8b9c9512, 12×12) — use figma.importComponentByKeyAsync, NOT a manual frame
│   │   └── Subtitle-bottom (TEXT, 12px Regular, hidden by default) — optional subtext below title
│   └── Body (FRAME, vertical ↓, no fill)
│       ├── Count (FRAME, horizontal →, gap: 4, center-aligned vertically, no fill)
│       │   ├── Icon (INSTANCE, 16×16, optional) — category icon (Advisor, Status, Chart, etc.)
│       │   └── # (TEXT, 20px Semibold, lineHeight: 28px, neutralForeground1)
│       └── Count subtitle (FRAME, horizontal, hidden by default) — e.g., "18258 out of 34060"
```

> **⚠️ Shadows are mandatory.** Without the two drop shadows, KPI cards appear flat and visually broken. Always apply both shadow effects.
> **Font weights matter.** Title text MUST be **Semibold 14px** and Count MUST be **Semibold 20px**. Using Regular or wrong sizes makes cards look like plain text.
> **Info Bubble must be a component instance** (key: `7bf5384b48ae4d34f2a6af8818251cda8b9c9512`). NEVER create a manual frame with grey fill — it renders as an ugly grey circle. Use `figma.importComponentByKeyAsync()`.
> **Cards must be equal width.** Set each card's `layoutSizingHorizontal = 'FILL'` and `layoutGrow = 1`. Never use auto/hug sizing — it creates unequal card widths.
> **Container must not clip.** Set `clipsContent = false` on the row container, otherwise card shadows get cut off at the edges.

##### Common KPI Card Configurations

| Category | Title | Icon | Count example |
|----------|-------|------|---------------|
| All | "All" | Advisor (colored) | "16" |
| Cost | "Cost" | Advisor (blue, cost variant) | "16" |
| Security | "Security" | Advisor (yellow, security) | "16" |
| Availability | "Availability" | Regular/Success (green ✓) | "-" |
| Performance | "Performance" | Chart (bar chart) | "16" |
| Operational excellence | "Operational excellence" | Regular/Success (green ✓) | "-" |

##### Usage Guidelines

- **Placement**: Always between the Toolbar and the Filter pills row
- **Row width**: Container fills parent width (FILL), cards fill equally within it (each card: `layoutSizingHorizontal = 'FILL'`, `layoutGrow = 1`)
- **Equal sizing**: All cards MUST be the same width — use FILL distribution, never auto-size which creates unequal widths
- **Count value**: Use actual number or "-" when no data
- **Clickable behavior**: Selecting a card filters the data grid to that category
- **Max cards**: Keep to a single row (max 6 cards)
- **Construction**: These are manual frames (not library component instances), so build each card frame with the structure above

##### Executable Example — Building a KPI Card (Figma Plugin API)

```javascript
// Copyable agent instruction — builds one KPI clickable card
// No manual font loading needed — text styles handle it automatically

const card = figma.createFrame();
card.name = 'Clickable Card';
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';
card.counterAxisSizingMode = 'AUTO';
card.paddingLeft = card.paddingRight = card.paddingTop = card.paddingBottom = 12;
card.itemSpacing = 4;
card.cornerRadius = 4;
card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
card.effects = [
  { type: 'DROP_SHADOW', visible: true, radius: 2, color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: 0 }, spread: 0, blendMode: 'NORMAL', showShadowBehindNode: true },
  { type: 'DROP_SHADOW', visible: true, radius: 4, color: { r: 0, g: 0, b: 0, a: 0.14 }, offset: { x: 0, y: 2 }, spread: 0, blendMode: 'NORMAL', showShadowBehindNode: true },
];

// Header
const header = figma.createFrame();
header.name = 'Header'; header.layoutMode = 'VERTICAL';
header.primaryAxisSizingMode = 'AUTO'; header.counterAxisSizingMode = 'AUTO';
header.itemSpacing = 2; header.fills = [];

// Title frame
const titleFrame = figma.createFrame();
titleFrame.name = 'Title'; titleFrame.layoutMode = 'HORIZONTAL';
titleFrame.primaryAxisSizingMode = 'AUTO'; titleFrame.counterAxisSizingMode = 'AUTO';
titleFrame.itemSpacing = 4; titleFrame.fills = [];
titleFrame.counterAxisAlignItems = 'CENTER';

const titleText = figma.createText();
titleText.name = 'Title text';
const titleStyle = await figma.importStyleByKeyAsync('ce8b1791e619c2b63a557029c4a68f1c9e7b5ec0'); // Web/Body 1 Strong
await titleText.setTextStyleIdAsync(titleStyle.id);
titleText.characters = 'All recommendations'; // ← replace with actual title

// Info Bubble — MUST use component instance, NOT a manual frame
const infoBubbleComp = await figma.importComponentByKeyAsync('7bf5384b48ae4d34f2a6af8818251cda8b9c9512');
const infoBubble = infoBubbleComp.createInstance();
infoBubble.name = 'Info Bubble';

titleFrame.appendChild(titleText);
titleFrame.appendChild(infoBubble);
header.appendChild(titleFrame);

// Body
const body = figma.createFrame();
body.name = 'Body'; body.layoutMode = 'VERTICAL';
body.primaryAxisSizingMode = 'AUTO'; body.counterAxisSizingMode = 'AUTO';
body.itemSpacing = 0; body.fills = [];

const countFrame = figma.createFrame();
countFrame.name = 'Count'; countFrame.layoutMode = 'HORIZONTAL';
countFrame.primaryAxisSizingMode = 'AUTO'; countFrame.counterAxisSizingMode = 'AUTO';
countFrame.itemSpacing = 4; countFrame.fills = [];
countFrame.counterAxisAlignItems = 'CENTER';

const countText = figma.createText();
countText.name = '#';
const countStyle = await figma.importStyleByKeyAsync('0b8cb21aaf9f6f3b46a2ee64f64162a1a8eb7405'); // Web/Subtitle 2
await countText.setTextStyleIdAsync(countStyle.id);
countText.characters = '1'; // ← replace with actual count

countFrame.appendChild(countText);
body.appendChild(countFrame);

card.appendChild(header);
card.appendChild(body);
// Set card to FILL horizontal for equal sizing
card.layoutSizingHorizontal = 'FILL';
card.layoutGrow = 1;
// Append card to your KPI cards row container
```
- **Styling**: White fill, 4px corner radius, 12px padding, **two drop shadows** (blur 2 at 0,0 + blur 4 at 0,2), no stroke
- **Typography**: Title = Segoe UI **Semibold 14px** (lineHeight 20px); Count = Segoe UI **Semibold 20px** (lineHeight 28px)
- **Colors**: Title + Count use `neutralForeground1` (rgb 41,40,39); Subtitle text uses `neutralForeground2` (rgb 96,94,92)

---

#### Card — Detailed Usage Guide

The **Card** is a Fluent 2 surface component used for grouping related content and actions. In Azure portal, cards appear in Get Started pages, overview dashboards, and anywhere content needs a contained, interactive surface.

**Component Set Key:** `ca5d1e2af199ac78f5ddbae7d62f027fb9f77745`
**Source:** Fluent 2 Web Library

> **Relationship with Overview Card:** The **Overview Card** (from Azure Pattern Templates) wraps a Card instance inside it with pre-configured header/body/footer slots for portal overview pages. Use Card directly for generic surfaces; use Overview Card for resource overview and Get Started pages.

##### Variants (28 total)

| Dimension | Values |
|-----------|--------|
| **Layout** | `Default` (structured slots), `Custom` (free-form swap area) |
| **State** | `Rest`, `Hover`, `Pressed`, `Selected`, `Draggable`, `Disabled` |
| **Style** | `Filled` (default), `Filled alt`, `Outline`, `Subtle` |

**Common variant keys:**

| Variant | Key |
|---------|-----|
| Default / Rest / Filled | `fb29f149c49f8040e84d5f1587ddcc1d2ec16a6f` |
| Custom / Rest / Filled | (use component set key + set variant) |

##### Component Properties

| Property | Type | Purpose |
|----------|------|---------|
| `Footer#322781:16` | BOOLEAN | Show/hide the footer action row |
| `Body#322781:15` | BOOLEAN | Show/hide the body text area |
| `Layout` | VARIANT | Default (structured) or Custom (swap area) |
| `State` | VARIANT | Rest, Hover, Pressed, Selected, Draggable, Disabled |
| `Style` | VARIANT | Filled, Filled alt, Outline, Subtle |

##### Internal Structure (Vertical / Default)

```
Card (INSTANCE, vertical auto-layout)
├── Hero media (FRAME, hidden by default)
│   └── Media preview (image/illustration area)
├── Header container (FRAME)
│   └── Header (INSTANCE)
│       ├── Avatar (hidden by default)
│       ├── Resource icon (INSTANCE) — 16×16 icon
│       ├── Text container
│       │   ├── Title (TEXT) — card heading
│       │   └── Subtext (TEXT, hidden by default) — secondary label
│       ├── Checkbox (hidden by default)
│       └── Quick action (hidden by default) — ⋯ overflow menu
├── Body container (FRAME)
│   └── Body (INSTANCE)
│       └── Text (TEXT) — description (1–2 sentences max)
├── Link List (FRAME, hidden by default)
│   └── Link (INSTANCE × 5 slots) — show/hide as needed
└── Footer container (FRAME)
    └── Footer (INSTANCE)
        ├── Primary action (Link) — "[Verb] + [Destination]"
        ├── Secondary action (Link) — "Learn more ↗"
        └── End content (hidden by default) — quick action button
```

##### Key Text Paths

| Element | Path from Card instance | Example |
|---------|------------------------|---------|
| Title | `Header container/Header/Text container/Title` | "Set an alert" |
| Subtext | `Header container/Header/Text container/Subtext` | "Access control" |
| Body | `Body container/Body/Text` | Description text |
| Primary action | `Footer container/Footer/Primary action/Text/Text` | "Create alert rule" |
| Secondary action | `Footer container/Footer/Secondary action/Text/Text` | "Learn more" |

##### Usage Guidelines

- **Title**: Short, action-oriented or noun phrase (e.g., "Set an alert", "Monitor performance")
- **Body text**: 1–2 sentences max. First clause names the feature, second connects to user outcome
- **Footer links**: Primary is "[Verb] + [Destination]", secondary is typically "Learn more"
- **Style selection**: Use `Filled` for default cards, `Filled alt` for grouped/alternating cards, `Outline` for less emphasis, `Subtle` for minimal surface
- **Cards in a grid**: Place cards in a horizontal auto-layout frame with 12px gap. Use 2–4 cards per row
- **Hero media**: Show for cards with illustrations or preview images
- **Link List**: Show for cards with multiple sub-actions (up to 5 links)

---

#### Overview Card — Detailed Usage Guide

The **Overview Card** is an Azure-specific card pattern built on top of the Fluent 2 Card component. It is used on resource Overview pages and Get Started pages to highlight features, actions, or entry points. It comes from the **Azure Pattern Templates** library.

**Component Set Key:** `a99af5ca32ff5c6c2b82c39c5878151f90b20616`
**Source:** Azure Pattern Templates (Fluent 2)

> **Built on Card:** Each Overview Card contains a Fluent 2 **Card** instance (key `fb29f149...`, variant Default/Rest/Filled). The Overview Card adds Azure-specific configuration — resource icons, action link patterns, and content type variants. To customize the inner Card style/state, modify the nested Card instance.

##### Variants (6 total)

| Content Type | Hyperlink List | Key | Description |
|-------------|----------------|-----|-------------|
| **Icon** | False | `672ddc8b56a4cf4fb9133ed81a48d91f38b1fd3d` | Compact card: resource icon + title + body + footer actions |
| **Icon** | True | `9aad104fd0e8be6259db1f8b32e7221dd389703d` | Same + hyperlink list below body |
| **Illustration** | False | `a6c02bc803caa135ecf96b51fa32209d24381f1c` | Tall card: hero illustration + title + body + footer |
| **Illustration** | True | `899de12a0d5172fd39a5d8a97f949a86d7deb785` | Same + hyperlink list |
| **Hero** | False | `6483b6735cf500703aa4849a8d9fdab1fdd768ee` | Wide card (600px): centered hero image + title + body + single link |
| **Hero** | True | `40830a1f649410394d5a092ac3e624c81f72ea3d` | Same + hyperlink list |

##### Content Type Visual Differences

- **Icon** (300×166): Resource icon (16×16) next to title. Most compact. Used when illustration isn't needed
- **Illustration** (300×334): Hero media area at top with illustration image. Title below. Used for feature highlights
- **Hero** (600×336): Full-width centered hero illustration + centered text. Used for primary/featured entry points

##### Internal Structure

Overview Card wraps a Fluent 2 Card instance and pre-configures it:

```
Overview Card (INSTANCE)
└── Card (INSTANCE, Filled style)
    ├── Hero media (FRAME) — visible for Illustration & Hero types
    │   └── Media preview — illustration/image area
    ├── Header container
    │   └── Header → Resource icon + Title "[Verb] + [What]" + Subtext (hidden)
    ├── Body container
    │   └── Body → Text (1–2 sentences)
    ├── Link List (FRAME) — visible when Hyperlink List = True
    │   └── Link × 5 slots (show/hide as needed)
    └── Footer container
        └── Footer → Primary action "[Verb] + [Destination]" + Secondary "Learn more ↗"
```

##### Usage Guidelines

- **Icon variant**: Use for secondary/supporting actions on overview pages (e.g., "Set an alert", "Configure diagnostics")
- **Illustration variant**: Use for primary features or onboarding cards (e.g., "Monitor performance", "Get started with backups")
- **Hero variant**: Use sparingly for the single most important entry point or feature spotlight
- **Grid layout**: Place 2–3 cards per row in a horizontal auto-layout frame with 12px gap
- **Text patterns**: Title is "[Verb] + [What]", primary action is "[Verb] + [Destination]", secondary is "Learn more"
- **Hyperlink List**: Enable when the card has multiple related sub-actions (e.g., "View metrics", "Create alert rule", "Configure")

---

#### Azure F2-Data Grid — Detailed Usage Guide

The **Azure F2-Data Grid** is the table component for displaying lists of resources, inventory items, or any tabular data. It is a LIBRARY COMPONENT with a unique column-based architecture.

**Component structure:**
```
Azure F2-Data Grid [INSTANCE from library]
├── Component key: 65e135bd61aa14ef9c926262fc54779c6f75646b
├── Variant: Type = Data grid (default) | Editable grid
└── Children:
    ├── Rows (FRAME, vertical layout)
    │   ├── Header row [INSTANCE] — State=Header, Type=Empty
    │   └── .Grid row / Empty [INSTANCE × 50] — State=Rest/Hover/Selected
    │       └── Variants: State (Rest/Hover/Selected/Header), Type (Empty), Expanded group
    └── Columns (FRAME, horizontal layout)
        ├── Checkboxes [INSTANCE] — Column type=Checkbox (34px wide, always first)
        ├── Column [INSTANCE] — Column type varies (show/hide to configure)
        ├── Column [INSTANCE] — ...
        └── (23 column slots total — show/hide as needed)
```

**Column types available** (each is a variant of `.Grid column / Data grid`):

| Column Type | Description | Key |
|-------------|-------------|-----|
| `Checkbox` | Selection checkboxes | `7da8db20dd5e02ce3788fc3e849ea39b64f344f6` |
| `Text` | Plain text cell | `49c324bdba2cbe72e6ba3bf301242dafdaf4125f` |
| `Text + resource icon` | Text with Azure resource icon | `d620503157461e28dbf788adc0d1140d7d9b55b0` |
| `Text + status icon` | Text with status indicator | `a6e70d0f9bec6b8a704dba8df7b18ff7afb26704` |
| `Hyperlink` | Clickable blue link text | `87a357b8dd3f6d09e4f4ee46e0fc95d8bad85944` |
| `Hyperlink external` | Link with external icon | `0831b8d3fb8684e1922efbff84c4586ece83cdee` |
| `Hyperlink hierarchy` | Hierarchical link | `c6e17c22dafaf2965b15cf3398bd33db455aa080` |
| `Icon` | Icon-only column (32px) | `033aaac3c35233397a5e24b71be6244633330d78` |
| `Tag` | Tag/badge column | `f62b74cc8c88c38dc9582b72db4abac1b1f095e9` |
| `Group` | Group expand/collapse | `67a6163942ab6bb581ee6df87056c1935e3cbaaa` |

**Cell properties:**
- Header cell (`.Column header / Label`): `Type` = Sortable/Non-sortable, text override for column name
- Data cell (`.F2-Grid cell / Text`): 
  - `Label#217089:10` (TEXT) — cell display text
  - `Icon` (VARIANT) — Resource icon / Status icon / None
  - `Hyperlink` (VARIANT) — True/False
  - `↪️ Resource icon type#217271:5` (INSTANCE_SWAP) — select specific Azure resource icon
  - `↪️ Status icon type#216931:10` (INSTANCE_SWAP) — select status icon
  - `Text alignment` (VARIANT) — Left/Center/Right

**How to configure for a Resource Group Overview:**

1. Show columns: Checkbox, Text + resource icon (Name), Hyperlink (Type), Text (Location), Hyperlink external (link)
2. Hide all other columns (set visible=false)
3. Set column header text: "Name", "Type", "Location"
4. Set cell text on each row's column cells to actual resource data
5. Set row count by hiding unused rows (show 10-25 rows typically)

**Key rules:**
1. NEVER recreate the grid manually — always instantiate the component
2. Show/hide columns to match your data schema
3. Column order is fixed in the component — reorder by showing/hiding
4. Each column has 51 cells (1 header + 50 data) — hide rows at the bottom for fewer items
5. Set column widths via resize on the column instance
6. The "..." more actions button (Icon column at position 9) should be visible as last column

**⚠️ CRITICAL: Data Grid Population Checklist (do ALL in one pass):**

Before touching any code, analyze the reference/screenshot:
1. **Identify each column's visual TYPE** from the reference:
   - Blue clickable text → use `Hyperlink` column type (text color: rgb(17, 94, 163))
   - Plain dark text → use `Text` column type (text color: rgb(36, 36, 36))
   - Text with resource icon → use `Text + resource icon`
   - Text with status badge → use `Text + status icon`
2. **Map columns to the grid's available slots** — choose the correct column type for each data column
3. **Hide ALL unwanted elements** in each visible column:
   - If column shows chevrons (`.↪️ Hierarchy level`): set `visible = false`
   - If column shows persona avatars (`Persona`): set `visible = false`
   - If column shows external link icons (`Open`): set `visible = false`
4. **Set correct text colors** on Label nodes:
   - Hyperlink columns: `rgb(17, 94, 163)` — blue
   - Plain text columns: `rgb(36, 36, 36)` — neutral dark
5. **Fill ALL visible cells** with real data from the reference (not just headers)
6. **Hide extra columns** that don't appear in the reference (set `visible = false`)
7. **Hide the trailing Icon/chevron column** (col 22) if not in reference
8. **Update footer** with correct record counts from the reference
9. **Hide unused rows** at the bottom if reference shows fewer rows

**Instantiation for AI agents:**
```javascript
// 1. Instantiate the Data Grid
figma_instantiate_component({
  componentKey: "65e135bd61aa14ef9c926262fc54779c6f75646b", // Type=Data grid (default)
  parentNodeId: "<content-frame-id>"
});

// 2. Configure columns:
// Show/hide columns via visible property on each column instance
// Set column header text overrides
// Set cell Label text overrides for data content
// Resize columns to appropriate widths
```

---

#### Footer — Detailed Usage Guide

**Component Set Key:** `de3512b28d1b8da02a0ce2685c72ba9b56812430`
**Source:** Azure UI Kit (Fluent 2)

**Variants:**

| Variant | Key | Usage |
|---------|-----|-------|
| `Style=Browse 633 px+` | `0d63805899ce83e8f253476cbda5e33d11c7c310` | Pagination for data grids/lists (wide screens) |
| `Style=Browse <750 px` | `13c0d43cef2799c5c7eeda6ff8a7ca2bde9fe453` | Pagination for narrow viewports |
| `Style=Create` | `43a7e4cff9725dd8709628323d1b0cc7edd1e4bd` | "Create" and "Cancel" action buttons |
| `Style=Form` | `882049ff9c52aae9784f89bdec5cfaec32a5f70f` | Form submission (Save/Discard) |
| `Style=Step wizard` | `ca60c03f7458f5ee07156e7bc15f5fbe3b6e3957` | Multi-step wizard (Previous/Next/Create) |

**Browse/Pagination Footer Structure (633 px+):**
```
Footer (1121×56)
├── Left items
│   ├── Text: "1-20 of 140. Display count:" (update counts to match data)
│   └── Dropdown (Outline, Small) — page size selector (10, 20, 50)
├── Feedback
│   ├── Person Feedback icon (20px)
│   └── Link: "Give feedback"
└── .Pagination Counter (Page Selected: First / Middle / Last)
    ├── Button (← prev, Subtle, Icon only, Disabled when Page Selected=First)
    ├── Horizontal Numbers — 5 .Tab Number instances (1–5)
    │   └── Each: Text property for number, State=Selected or Rest
    └── Button (→ next, Subtle, Icon only)
```

**Key Properties:**
- `.Pagination Counter` → `Page Selected`: `First` | `Middle` | `Last` — controls disabled state of prev/next buttons
- Left text: update to show "Showing X-Y of Z. Display count:"
- Dropdown value: shows current page size

**When to use which variant:**
- **Browse** — Any list/grid view with paginated data (resource lists, activity logs)
- **Create** — Wizard completion page (Review + Create)
- **Form** — Inline editing or settings pages
- **Step wizard** — Multi-step flows (e.g., Create Project steps)

**Placement:** Always at the very bottom of the Content frame, after the Data Grid. Set `layoutAlign: 'STRETCH'` to fill width.

---

#### Step Wizard TabList (F2 Step Indicator)

**Replaces:** F1 "Numbered tab" (deprecated)  
**Components:** Azure Horizontal TabList / Azure Vertical TabList  
**Source:** Fluent 2 Web Library (file key `q2TdO4dVcMhNWYp0N6Bc05`)

The F2 step indicator for multi-step wizard flows uses the **Azure Horizontal TabList** (or Vertical for side-nav wizards) with the `Layout=Icon before` variant to show step status icons.

**Component Keys:**

| Component | Set Key | Default Variant Key (Icon before, Medium) |
|-----------|---------|------------------------------------------|
| Azure Horizontal TabList | `9be28cf0a9a10e62c22cb31361d245b0a13a89ab` | `d60a77ca0d7eb7ca1c025eebc42c2c517b7a6b8b` |
| Azure Vertical TabList | `f87940d9a9994975afd677907540baa0dc7cfa9f` | `d3f2ac61e349bccd6f7f0307cee5ece995d18502` |

**Variants (both Horizontal and Vertical):**

| Property | Options |
|----------|---------|
| Layout | `Text only`, `Icon before`, `Icon only` |
| Size | `Medium (default)`, `Small` |
| Circular | `True`, `False` |

**Three display modes for wizard steps:**

| Mode | Description | Icon Usage |
|------|-------------|-----------|
| **Text only** | Tab labels only (First tab, Second tab...). Selected tab has blue underline (horizontal) or blue left bar (vertical). | No icons |
| **Icon + text** | Circle icon before each tab label. Selected tab = filled blue circle. Unvisited = outline circle. | ○ (unvisited), ● (current/selected) |
| **Validation** | Status icons showing step completion state. Used after user has progressed through steps. | ✅ (complete), ❌ (error), 🟦 (current/in-progress) |

**Validation states per tab:**
- **Complete** — Green checkmark circle icon (step finished successfully)
- **Error** — Red X circle icon (step has validation errors that must be fixed)
- **Current/Active** — Blue filled square/circle icon with blue underline/bar (currently active step)
- **Not visited** — No icon or grey outline circle (future step not yet reached)

**Horizontal layout (default for wizards):**
- Height: 44px
- Selected indicator: blue underline below active tab
- Overflow: `•••` button appears when tabs exceed available width
- Tabs are arranged left-to-right in step order

**Vertical layout (for side-panel wizards):**
- Width: varies by content (94–120px typical)
- Selected indicator: blue vertical bar on left side of active tab
- Tabs stack top-to-bottom in step order

**Usage in Step Wizard pattern:**
1. Place the TabList below the Blade Header (inside the Top Shell or at the top of the Content area)
2. Use `Layout=Icon before` variant for wizard flows (shows progress status)
3. Pair with `Style=Step wizard` footer (Previous/Next/Create buttons)
4. Update icon per tab as user progresses: unvisited → current → complete/error

---

#### Message Bar — Detailed Usage Guide

**Source:** Fluent 2 Web Library  
**Component Key:** `473ff81b9bf3794af83a57fda54f53d9669b6ade` (Single line, default)  
**Component Set Key:** `008cab78001675764f88d356a47a750783d8172b`

**Purpose:** Inline notification banner providing contextual information, success confirmations, warnings, or error messages within a blade.

##### Variants (Layout)

| Variant | Description |
|---------|-------------|
| Single line (Default) | Compact 36px height, icon + text + actions in one row |
| Multi line | Taller, wraps text to multiple lines for longer messages |

##### 5 Intent States

| Intent | Background Color (RGB) | Icon Index Visible | Component | Use Case |
|--------|----------------------|-------------------|-----------|----------|
| **Info** | rgb(245, 245, 245) — neutral grey | Index 0 ("Info") | Message Bar | General information, tips, non-critical notices |
| **Success** | rgb(241, 250, 241) — light green | Index 1 | Message Bar | Operation completed successfully |
| **Warning** | rgb(255, 249, 245) — light orange | Index 2 | Message Bar | Potential issues, requires attention |
| **Error** | rgb(253, 243, 244) — light red | Index 3 | Message Bar | Failures, validation errors, blocking issues |
| **Upsell** | rgb(249, 243, 252) — light purple | Index 3 (purple diamond) | Message bar upsell | Promotional, feature discovery, Copilot nudges |

##### How to Set Intent

The Message Bar component uses a **single variant** (`Layout=Single line`). Intent is controlled by:
1. **Background fill** — set `instance.fills` to the intent color
2. **Icon visibility** — in "Status icon container" (first child), show only the icon at the correct index (0=Info, 1=Success, 2=Warning, 3=Error)

```javascript
// Example: Set to Warning intent
const instance = comp.createInstance();
instance.fills = [{ type: 'SOLID', color: { r: 255/255, g: 249/255, b: 245/255 } }];
const statusContainer = instance.children[0]; // "Status icon container"
statusContainer.children.forEach((icon, j) => { icon.visible = (j === 2); }); // Show Warning icon
```

##### Component Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Dismiss#314567:9` | BOOLEAN | true/false | Show/hide the dismiss (X) button |
| `Additional action#314567:6` | BOOLEAN | true/false | Show/hide secondary action link |
| `Actions#314567:3` | BOOLEAN | true/false | Show/hide primary action link |
| `Layout` | VARIANT | Single line (Default), Multi line | Layout mode |

##### Internal Structure

```
Message Bar (800×36, HORIZONTAL layout)
├── Status icon container (20×20) — contains 4 icon instances, show 1
├── Text string (TEXT) — "Title   Description text" (bold title + regular body)
├── Actions container (FRAME, HORIZONTAL)
│   ├── Action (link button)
│   └── Additional action (link button)
└── Button (24×24) — dismiss/close icon button
```

##### Text Format

The text node contains **both title and body** in a single text string:
- Title portion: Semibold weight
- Body portion: Regular weight
- Separated by spaces (3 spaces in the reference)

Example: `"Warning   Some resources may not be available during the move."`

##### Placement Rules

- Place **above** the content it relates to (e.g., above a data grid to warn about its contents)
- Set `layoutAlign: 'STRETCH'` to fill the parent width
- Standard width: matches content area width (typically 800px+)
- Multiple message bars stack vertically with 8px gap between them

##### Azure UI Kit "Message bar upsell" (5th Intent — Upsell/Promotional)

**Component Set Key:** `7bb03e402c08b7e2ec9cfc370771ff95ce36a4fe`  
**Default Variant Key:** `78e5691dcf6214db34d691faa157d183f719d60a`

This is a **separate component** from the Azure UI Kit (not the base Fluent 2 Message Bar). It uses a distinct purple/brand color scheme for promotional content, feature discovery, and Copilot-related nudges.

- **Background:** rgb(249, 243, 252) — light purple
- **Icon container fill:** rgb(136, 23, 152) — dark purple (brand)
- **11 variants** controlling: Layout (Single line / Multi-line), Actions (Yes/No), Additional action (Yes/No), Dismiss (Yes/No)

| Variant Property | Values |
|-----------------|--------|
| Layout | Single line (Default), Multi-line |
| Actions | Yes, No |
| Additional action | Yes, No |
| Dismiss | Yes, No |

```javascript
// Example: Instantiate Upsell Message Bar
const comp = await figma.importComponentByKeyAsync('78e5691dcf6214db34d691faa157d183f719d60a');
const upsell = comp.createInstance();
// Text: "Try Copilot   Accelerate your cloud operations with AI-powered assistance."
```

---

#### Empty State — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)  
**Component Key:** `f3aec5fec89d4bf21d7bcf4f2795056838834063` (standalone component, not a set)

**Purpose:** Placeholder shown when a page, section, or data grid has no content to display. Guides users to take a first action.

##### Component Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Buttons#29495:4` | BOOLEAN | true/false | Show/hide primary + secondary action buttons |
| `Link#29495:3` | BOOLEAN | true/false | Show/hide "Learn more" link |

##### Internal Structure

```
Empty state (700×456, VERTICAL layout, gap=4, center-aligned)
├── [Illustration] (96×96) — INSTANCE_SWAP (any icon/illustration)
├── Text (VERTICAL, gap=20)
│   ├── Header + Desc (VERTICAL, gap=8)
│   │   ├── Title (TEXT, Semibold 24px) — "No items to display"
│   │   └── Subtitle (TEXT, Regular 14px) — description/guidance
│   ├── primary and secondary (HORIZONTAL, gap=7)
│   │   ├── Button (Primary) — "Add resources"
│   │   └── Button (Secondary/Outline) — "Import from JSON"
│   └── Link — "Learn more" with external icon
```

##### Customization

1. **Illustration/Icon** — Top child is an INSTANCE that can be swapped to any icon:
   ```javascript
   const emptyState = comp.createInstance();
   const illustration = emptyState.children[0];
   const newIcon = await figma.importComponentByKeyAsync('<icon-key>');
   illustration.swapComponent(newIcon);
   ```

2. **Title & Subtitle** — Override text on the TEXT nodes directly:
   ```javascript
   // Title: I<instanceId>;29232:42382
   // Subtitle: I<instanceId>;29232:42383
   ```

3. **Button labels** — Override button text:
   ```javascript
   // Primary: I<instanceId>;29232:42404;160313:4501
   // Secondary: I<instanceId>;29232:42415;160313:4508
   ```

4. **Hide elements** — Set `Buttons` or `Link` properties to false via `setProperties()`

##### Placement Rules

- Place inside the Content area frame, centered
- Replaces the data grid or content section when no data exists
- Set `layoutAlign: 'STRETCH'` for horizontal stretch
- Typically shown on first-run / zero-state scenarios
- Illustration should be contextual (e.g., use Resource-Mover icon for a mover blade)

##### Common Use Cases

| Scenario | Title | Subtitle | Primary Action |
|----------|-------|----------|----------------|
| No resources | "No resources to move" | "Add resources from your subscription..." | "Add resources" |
| Empty search | "No results found" | "Try adjusting your search or filters." | "Clear filters" |
| First run | "Get started" | "Create your first resource to begin." | "Create resource" |
| No permissions | "Access denied" | "Contact your admin for access." | (hidden) |

---

#### Upload File — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)  
**Component Set Key:** `b71f95b279b790eb3cbbda3fe48927be1efb505b`  
**Description:** Supports uploading files through drag-and-drop or an input field, handling single or multiple files.

##### 5 State Variants

| State | Key | Description |
|-------|-----|-------------|
| **Default** | `0bf52e0b870700176e666d2d01d2e255bceefc7d` | Empty input field with "Select File" placeholder + "Upload File" button |
| **Drag and drop** | `76bf5c5321ac58d259a578baa82cc72fe59de3ff` | Drop zone area with "Drag and drop the files or Browse" text |
| **Selected** | `942c47eb6224a4ff7ddc3dfc7449f5391a31aadf` | File selected, showing filename in input + "Create new" link |
| **Progress Bar** | `5a734e06e70240771f675728165fa104daa1a9eb` | Upload in progress with progress bar + dismiss button |
| **Success** | `63c6b2fad21772135394da2aad33afd49d43301f` | Upload complete with success indicator |

##### Component Properties

| Property | Type | Values |
|----------|------|--------|
| `State` | VARIANT | Default, Drag and drop, Selected, Progress Bar, Success |

##### Internal Structure (Default State)

```
Upload File (VERTICAL, gap=4)
├── Top Half (HORIZONTAL)
│   ├── Label + indicator (230px)
│   │   └── .Label → "Upload File" + required asterisk (*)
│   └── Input field (250px, VERTICAL, gap=4)
│       ├── Uploader & Progress
│       │   └── Input (file picker with "Select File" placeholder)
│       └── Link — "Create new" (optional helper link)
└── Button
    └── Button (Outline) — "Upload File"
```

##### Key Internal Text Nodes

| Element | Path pattern (from instance root) | Default text |
|---------|----------------------------------|--------------|
| Label | `...;27878:1824;18731:157858` | "Upload File" |
| Required asterisk | `...;27878:1824;18731:157859` | "*" |
| Placeholder | `...;321038:18330;309150:3222` | "Select File" |
| Entered text | `...;321038:18330;309150:3223` | filename when selected |
| Link text | `...;23189:133029` | "Create new" |
| Button text | `...;160313:4501` | "Upload File" |

##### State Flow (User Journey)

```
Default → (user clicks Browse or drags file) → Drag and drop
Drag and drop → (file dropped/selected) → Selected
Selected → (user clicks Upload) → Progress Bar
Progress Bar → (upload completes) → Success
```

##### Placement Rules

- Used inside Forms or Context Panes as an input field row
- Label width: 230px (matches .Input row label width)
- Input field width: 250px (grows with parent)
- Standard overall width: 480px+ (label + input)
- Set `layoutAlign: 'STRETCH'` in parent auto-layout

##### Usage Example

```javascript
// Instantiate the default upload state
const comp = await figma.importComponentByKeyAsync('0bf52e0b870700176e666d2d01d2e255bceefc7d');
const upload = comp.createInstance();
upload.layoutAlign = 'STRETCH';

// Switch to a different state via setProperties
upload.setProperties({ 'State': 'Progress Bar' });
```

---

#### Progress Bar with Labels — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)

##### Two Component Sets (Static vs Animated)

| Component Set | Key | Description | Use Case |
|---------------|-----|-------------|----------|
| **Progress Bar with labels** (Static) | `e9410522ebc95788e6b6437a4c8e902aaab363dc` | Fixed-position track showing determinate progress | Show completed % of a known-length operation |
| **Animated Progress Bar with labels** | `d499b955353474dfea640b364a6a1a3f566025c0` | Moving/pulsing track for indeterminate progress | Loading states where duration is unknown (prototypes) |

##### Variant Properties (same for both Static & Animated)

| Property | Type | Values |
|----------|------|--------|
| `Property 1` | VARIANT | No Label, Label, Label + Info |
| `Description` | VARIANT | Yes, No |

##### 5 Variant Combinations

| Property 1 | Description | Static Key | Animated Key | Visual |
|-----------|-------------|------------|--------------|--------|
| No Label | No | `8c2ad1ae81dbcab17dbb5d6ce0713273d677439a` | `4706dfaa851cebd0b2e75a3d47ff4553958bd9a8` | Bar only (2px) |
| Label | No | `74d47395741539b222474d822e55dc831d581f04` | `4adbf35558e635cf14b3a30614ae29c30ce937a1` | Label text + bar |
| Label | Yes | `623389c225322e1c5157241dec0eebad24a3a736` | `63338d88fb555394291d12ab7ba91096d88e68f6` | Label + bar + description |
| Label + Info | No | `355bb1d808ec7b641233ca9b0bf94ec842b50005` | `ae73c933c21bc6804a3ad23ab24acf96f64925eb` | Label + info icon + bar |
| Label + Info | Yes | `4b9736f5565bcf7ac84a85c6c0e302c79d4bae66` | `b0814f4df0500c15b88b0fd8aeb30ce1a11d3939` | Label + info icon + bar + description |

##### Internal Structure (Label + Info + Description — most complex)

```
Progress Bar with labels (VERTICAL, gap=9)
├── InfoLabel (HORIZONTAL)
│   ├── Label → Text ("Label") + Required asterisk ("*", hidden by default)
│   └── .Info button (16×16 info icon)
├── Static_ProgressBar / Animated_ProgressBar (HORIZONTAL, 492×2)
│   └── Track (RECTANGLE) — width determines % complete
└── Body (TEXT) — "Description" (only when Description=Yes)
```

##### Colors

| Element | Color | RGB |
|---------|-------|-----|
| Bar background (rail) | Grey 230 | rgb(230, 230, 230) |
| Track fill (progress) | Brand blue | rgb(15, 108, 189) |
| Track fill (success, in Upload File) | Green | rgb(16, 124, 16) |
| Label text | Neutral foreground | rgb(36, 36, 36) |

##### How to Set Progress Percentage (Static)

The progress is determined by the **Track rectangle width** relative to the bar width:
```javascript
// Set to 60% progress on a 492px wide bar
const progressBar = instance.children[1]; // Static_ProgressBar
const track = progressBar.children[0]; // Track rectangle
track.resize(492 * 0.6, 2); // 295.2px = 60%
```

##### Static vs Animated Differences

| Aspect | Static | Animated |
|--------|--------|----------|
| Track | Single solid rectangle | Moving gradient mask (pulse animation) |
| Use case | Determinate (known %) | Indeterminate (unknown duration) |
| Inner component | `Static_ProgressBar` (key: `7efb37f599811a35bb56fc1f7a2d4bb31066a7f5`) | `Animated_ProgressBar` (key: `d5806fd03a400709dea1f47a55fd26d1dfb63870`) |
| Prototyping | No animation | Has Figma prototype animation on the track |

##### Placement Rules

- Width stretches to parent (set `layoutAlign: 'STRETCH'`)
- Bar height is always 2px (track + rail)
- Total component height: 2px (No Label) / 35px (Label + Info) / 64px (Label + Info + Description)
- Gap between label and bar: 9px
- Used inside Forms, Context Panes, or standalone in content areas

##### Usage Example

```javascript
// Import static progress bar with label
const comp = await figma.importComponentByKeyAsync('74d47395741539b222474d822e55dc831d581f04');
const pb = comp.createInstance();
pb.layoutAlign = 'STRETCH';

// Switch to Label + Info + Description
pb.setProperties({ 'Property 1': 'Label + Info', 'Description': 'Yes' });

// For animated (indeterminate) version:
const animComp = await figma.importComponentByKeyAsync('4706dfaa851cebd0b2e75a3d47ff4553958bd9a8');
const animPb = animComp.createInstance();
```

---

#### Scrollbar — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)  
**Component Set Key:** `866cd71e13eb98bda31b085cf7db7ffebbc9d359`  
**Total Variants:** 36

**Purpose:** Vertical scrollbar indicator used to show scroll position in scrollable containers (data grids, context panes, long lists).

##### Variant Properties

| Property | Type | Values |
|----------|------|--------|
| `% Filled` | VARIANT | 10, 20, 33, 50, 75, 90 |
| `Position` | VARIANT | Top, Middle, Bottom |
| `Color` | VARIANT | Default, Transparent |

##### Property Explanations

- **% Filled** — How much of the content is visible (thumb size relative to track). 10% = large scrollable area, 90% = almost all content visible.
- **Position** — Where the thumb sits: Top (scrolled to top), Middle (scrolled midway), Bottom (scrolled to end).
- **Color** — Default shows grey rail `rgb(235,235,235)`, Transparent hides the rail background.

##### Internal Structure

```
Scrollbar (4×600, HORIZONTAL, rounded corners=4px)
├── Fill: rgb(235,235,235) — rail background (or transparent)
└── Slider container (4×600, FRAME)
    └── Slider (RECTANGLE, 4px wide, rounded=4px)
        - Height = track_height × (% / 100) — e.g., 33% on 600px = ~58px thumb
        - Fill: rgb(0, 0, 0) — black thumb
        - Y position determined by Position variant
```

##### Key Variant Keys (commonly used)

| % Filled | Position | Color | Key |
|----------|----------|-------|-----|
| 33 | Top | Default | `323846c07df11bb5f10de06e19f306fa7a4440be` |
| 33 | Middle | Default | `fdb34870b09457e49abb62832a89d16e5a24e1ff` |
| 33 | Bottom | Default | `fd68e4dddc9faf316b52e6b9a82f7043c6356e16` |
| 50 | Middle | Default | `3d988c78984451c55fb696a04e61978f24b42d6d` |
| 10 | Middle | Default | `a3726b11f2d89026a280ac620097ba22516cdaa1` |
| 20 | Middle | Transparent | `230cc3d81ec5ffd96d85c46381acfa41be0c20e7` |

##### Colors

| Element | Color | RGB |
|---------|-------|-----|
| Rail (Default) | Light grey | rgb(235, 235, 235) |
| Rail (Transparent) | None | transparent |
| Thumb (Slider) | Black | rgb(0, 0, 0) |
| Corner radius | Both rail & thumb | 4px |

##### Sizing

- **Width:** Always 4px
- **Height:** Typically 600px (default), resize to match container
- **Thumb height:** Proportional — `total_height × (% / 100)`

##### Placement Rules

- Place on the **right edge** of scrollable containers
- Use absolute positioning (not in auto-layout) or overlay on top of content
- Match scrollbar height to the scrollable container height
- Choose `% Filled` based on content-to-viewport ratio
- Choose `Position` based on scroll state being depicted
- Use `Transparent` color when scrollbar should only appear on hover (idle state)

##### Usage Example

```javascript
// Import scrollbar showing 33% content visible, scrolled to middle
const comp = await figma.importComponentByKeyAsync('fdb34870b09457e49abb62832a89d16e5a24e1ff');
const scrollbar = comp.createInstance();
scrollbar.resize(4, 400); // Match to your container height

// Change variant via setProperties
scrollbar.setProperties({ '% Filled': '50', 'Position': 'Top', 'Color': 'Transparent' });
```

---

#### Slider with Numbers — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)  
**Component Set Key:** `7e295cb29cea27c24e9929bdb14336c7c6c3aedc`  
**Description:** A slider provides a visual indication of adjustable content, as well as the current setting in the total range of content.

##### 3 Variants (Number Placement)

| Variant | Key | Description |
|---------|-----|-------------|
| **Both** | `d7e86283317ba271d95d7953a8c29c7eee13bbf1` | Number labels on both sides of slider |
| **Trailing** | `f324483b362b7d7f1a92b9fb8d222abf4b5d6f03` | Number label only on right/end |
| **Leading** | `22503546f3e2ae976cdfba7697732eb5e606d529` | Number label only on left/start |

##### Component Properties (Slider with numbers)

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Trailing Number#28478:4` | TEXT | any number string | Right-side number label |
| `Leading Number#28478:0` | TEXT | any number string | Left-side number label |
| `Number Placement` | VARIANT | Both, Trailing, Leading | Which number labels to show |

##### Internal Structure

```
Slider with numbers (392×24, HORIZONTAL)
├── Leading number (TEXT, 15×18) — "10" (or min value)
├── Slider (INSTANCE, 362×24) — the actual Fluent 2 Slider component
│   └── Slider-container (362×24, radius=2)
│       ├── Rail (362×4)
│       │   └── Rail-fill (346×4, rgb(97,97,97)) — unfilled portion
│       └── ✏️ Thumb-position (362×18)
│           ├── Track (width = thumb position, rgb(15,108,189)) — filled portion
│           ├── Ticks (hidden by default, 8 tick marks)
│           └── Thumb (18×18, white circle, radius=15)
└── Trailing number (TEXT, 15×18) — "10" (or max value)
```

##### Inner Slider Component

**Component Set Key:** `62cdde6bab03522b73c04769137a276e591d74bd`

| Property | Type | Values |
|----------|------|--------|
| `Ticks#15571:0` | BOOLEAN | true/false — show tick marks |
| `Size` | VARIANT | Medium (Default), Small |
| `State` | VARIANT | Rest, Hover, Pressed, Focus, Disabled |

**10 Slider Variants:**

| Size | State | Key |
|------|-------|-----|
| Medium | Rest | `168432a0054ca1efc99ff4af7bb8bf789b608292` |
| Medium | Hover | `a0dbd21762a2f6e3b0da3dc721029a48f5c16ca9` |
| Medium | Pressed | `5e19ff0fe001e0111ca97f2b46f044dda6460dcd` |
| Medium | Focus | `1def56ef9706e9821aa26d4c16f8d4bbc894004d` |
| Medium | Disabled | `b90fe828cb44c3792c5e3dbacf7dc7c9db8091fb` |
| Small | Rest | `eb0904dd1b102f89d282d9970ab7265306ee15a7` |
| Small | Hover | `7b54f4ee30ad54e1a52854b0f387e44f42e0318e` |
| Small | Pressed | `9c62916fcfd57a18fdd51ac6f5b46bfb0452fe54` |
| Small | Focus | `7ba72de2869fd79e75baa0c999dd07d5a7b807f7` |
| Small | Disabled | `9d31f2e63dfeed83a474821bb3a396f2ce9fff56` |

##### Colors

| Element | Color | RGB |
|---------|-------|-----|
| Rail-fill (unfilled) | Neutral grey | rgb(97, 97, 97) |
| Track (filled) | Brand blue | rgb(15, 108, 189) |
| Thumb | White | rgb(255, 255, 255) with shadow |
| Thumb inner (Pressed) | Brand blue | rgb(15, 108, 189) |

##### How to Set Slider Value/Position

The thumb position is determined by the **Track width** and **Thumb x-position**:
```javascript
// To represent 80% on a 362px slider:
// Track width = 362 × 0.8 = 290px
// Thumb x = 290
const slider = instance.children[1]; // Inner Slider instance
const container = slider.children[0]; // Slider-container
const thumbPos = container.children[1]; // ✏️ Thumb-position
const track = thumbPos.children[0]; // Track frame
const thumb = thumbPos.children[2]; // Thumb circle
track.resize(290, 4);
thumb.x = 290;
```

##### Sizing

| Element | Dimension |
|---------|-----------|
| Overall width | 392px (grows with parent) |
| Height | 24px (Medium), smaller for Small |
| Thumb diameter | 18px (Medium) |
| Rail height | 4px |
| Number text width | ~15px |

##### Usage Example

```javascript
// Import slider with numbers on both sides
const comp = await figma.importComponentByKeyAsync('d7e86283317ba271d95d7953a8c29c7eee13bbf1');
const slider = comp.createInstance();
slider.layoutAlign = 'STRETCH';

// Set min/max labels
slider.setProperties({ 'Leading Number#28478:0': '0', 'Trailing Number#28478:4': '100' });

// Show tick marks
const innerSlider = slider.children[1];
innerSlider.setProperties({ 'Ticks#15571:0': true });
```

---

#### Breadcrumb — Detailed Usage Guide

**Source:** Fluent 2 Web Library  
**Component Set Key:** `6a55e6a832553b5ae6d3fa3f8e548dd0df94d867`

**Purpose:** Navigation trail showing the user's current location within the portal hierarchy. Always placed above the Blade Header.

##### 3 Size Variants

| Size | Key | Use Case |
|------|-----|----------|
| **Large** | `ad1a251259e9020d988bdf6227f1a84baaf80a54` | Default for portal blades |
| **Medium** | `7c70328be3910a33314dec1d25f041d1ab2b0634` | Narrower contexts |
| **Small** | `fcb27d10f98585cfaa005ff84afbfff16a838904` | Compact views |

##### Component Properties

| Property | Type | Values |
|----------|------|--------|
| `Size` | VARIANT | Large, Medium, Small |

##### Internal Structure

```
Breadcrumb (1920×28, HORIZONTAL)
├── Breadcrumb Item × 10 (slots available, hide unused)
│   ├── Button — contains text label
│   └── Divider — chevron separator (>)
└── Last Breadcrumb Item (no divider — current page)
```

##### Breadcrumb Item Sub-Component

**Component Set Key:** `d210f71f05b78b1b48ae7cedf2f156652f8b7486`  
**50 variants** (Size × Type × States × Icon)

| Property | Type | Values |
|----------|------|--------|
| `Divider icon#4436:0` | INSTANCE_SWAP | chevron icon |
| `Divider#4209:2` | BOOLEAN | true/false (hide on last item) |
| `Size` | VARIANT | Large, Medium, Small |
| `Type` | VARIANT | Button |
| `States` | VARIANT | Rest, Hover, Pressed, Focused, Disabled, Current |
| `Icon` | VARIANT | ON, OFF |

##### Usage

- Total of 10 item slots — hide unused ones
- **⚠️ Last visible item MUST have `Divider#4209:2` set to `false`** — breadcrumbs never end with a divider/chevron
- Set `States=Current` on the active/last breadcrumb item
- Override text inside each item's Button > Container > Text node
- Width: stretches to full blade width (1920px default)
- Height: 28px (Large)

---

#### Blade Header — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)  
**Component Set Key:** `ae03dca2cae044e81079c8f6bf549dbd415f57bc`

**Purpose:** The header bar at the top of every blade showing the resource name, type, navigation actions, and optional Copilot ribbon.

##### 4 Size Variants (Responsive)

| Size | Key | Breakpoint |
|------|-----|-----------|
| **1100+** | `c573ab76a0e1a39fe76ddd1eece3e460e0b07c0f` | Wide blades (≥1100px) |
| **750+** | `57d30a24f9556b81466a8d419ad282363c2aebe6` | Medium blades (750-1099px) |
| **500+** | `c21fb1384eef70872a6e7c3260b162e6a0de5122` | Narrow blades (500-749px) |
| **<500** | `8731346e78511211eadf11d05cdd79c7cddfb743` | Very narrow (<500px) |

##### Component Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Icon#32630:6` | INSTANCE_SWAP | icon key | Resource type icon (28×28) |
| `Show Copilot Ribbon?#32630:9` | BOOLEAN | true/false | Show Prompt Ribbon with Copilot suggestions |
| `Show subtitle#32630:8` | BOOLEAN | true/false | Show resource type subtitle |
| `Show icon#32630:5` | BOOLEAN | true/false | Show resource icon |
| `Menu Item Text#35294:3` | TEXT | string | Current menu item name (e.g., "Overview") |
| `Show Menu item#32630:4` | BOOLEAN | true/false | Show pipe + menu item label |
| `Subtitle#32630:3` | TEXT | string | Resource type text (e.g., "Virtual Machine") |
| `Page title#32630:2` | TEXT | string | Resource/blade name (e.g., "my-vm-01") |
| `Size` | VARIANT | 1100+, 750+, 500+, <500 | Responsive width variant |

##### Internal Structure (Size=1100+)

```
Blade header (1920×64, HORIZONTAL)
├── Icons + Text (grows)
│   ├── Icon container (38×48)
│   │   └── Icon (28×28) — resource type icon (INSTANCE_SWAP)
│   └── Title + Subtitle (VERTICAL)
│       ├── Autolayout container (HORIZONTAL)
│       │   ├── Text (FRAME)
│       │   │   ├── Blade header label (TEXT) — "Resource Name"
│       │   │   ├── Pipe (VECTOR) — vertical separator
│       │   │   └── ToC Item Label (TEXT) — "Menu item name"
│       │   └── Commands (FRAME)
│       │       ├── .Header Icons (pin, star, menu)
│       │       └── Prompt Ribbon Entry Point (Copilot)
│       │           ├── .Copilot icon
│       │           ├── .Suggested Prompt Pill × 3
│       │           └── Button (hidden)
│       └── Blade subheader label (TEXT) — "Resource type"
└── Close icon (32×32)
    └── Dismiss (16×16 X icon)
```

##### Key Text Nodes

| Element | ID Pattern | Content |
|---------|-----------|---------|
| Page title (Blade header label) | `I<id>;32615:9839` | Resource name only (e.g., "my-vm-01") |
| Pipe | `I<id>;32615:9840` | Vertical separator — auto-shown when `Show Menu item` = true |
| Menu item (ToC Item Label) | `I<id>;35294:9320` | Current nav item (e.g., "Overview", "Members") |
| Subtitle | `I<id>;32615:9850` | Resource type (e.g., "Virtual Machine") |

##### ⚠️ Title Structure — 3-Part Composition

The blade header title is composed of **3 separate elements** (NOT one concatenated string):

1. **Blade header label** (`Page title#32630:2`) — Set ONLY the resource name (e.g., `"AzRHubCloudTestDoNotDelete"`)
2. **Pipe** — Automatically shown/hidden via `Show Menu item#32630:4` boolean
3. **ToC Item Label** (`Menu Item Text#35294:3`) — Set the current page/menu item name (e.g., `"Members"`)

**Correct usage:**
```
bladeHeader.setProperties({
  'Page title#32630:2': 'MyResourceName',        // resource name ONLY
  'Show Menu item#32630:4': true,                 // shows pipe + ToC label
  'Menu Item Text#35294:3': 'Overview'            // current page name
});
```

**Common mistake:** Writing the full title "ResourceName | PageName" in `Page title`. This causes the text to wrap and the pipe/ToC elements remain hidden.

##### Composition: Blade Header + Breadcrumb

These two components are always used together in a wrapper frame:

```
Blade Header + Breadcrumb (FRAME, VERTICAL, gap=0, full width × 92px)
├── Breadcrumb (full width × 28px)
└── Blade header (full width × 64px)
```

Total height: **92px** (28 + 64)

---

#### Service Menu — Detailed Usage Guide

**Source:** Azure UI Kit (Fluent 2)  
**Component Set Key:** `0f5fe8abcfc3adac248b91fdc7e86a2bbc43baa6`

**Purpose:** The left navigation panel inside a service/resource blade. Contains menu items (top-level links) and collapsible menu groups with categorized sub-items.

##### 5 State Variants

| State | Expand groups | Key | Description |
|-------|--------------|-----|-------------|
| Open | False | `f85852343c91c31207c69e8fca5fe5faffda0df7` | Expanded sidebar, groups collapsed |
| Open | True | `ba6867c61225cb682888a7ad7e7204bfc2b6a6ae` | Expanded sidebar, groups expanded |
| Rest- Closed | False | `33f9e9b2dda0832f4bdc1299c0e06b930a60723f` | Collapsed icon-only sidebar |
| Hover - Closed | False | `ebae1a94197d94e619dffbdff481508784189d4c` | Collapsed, hover state |
| Pressed - Closed | False | `bf8406bf28964c6ad5abe29054002e2a39691142` | Collapsed, pressed state |

##### Component Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Favorites group?#229069:0` | BOOLEAN | true/false | Show/hide Favorites group at top |
| `Show Scrollbar#214612:0` | BOOLEAN | true/false | Show/hide vertical scrollbar |
| `State` | VARIANT | Open, Rest- Closed, Hover - Closed, Pressed - Closed | Open/collapsed state |
| `Expand groups` | VARIANT | True, False | Whether menu groups are expanded or collapsed |

##### Internal Structure (Open, Expand groups=True)

```
Service Menu (264px wide, VERTICAL)
├── .Menu item × 9 (top-level items: Overview, Activity log, etc.)
├── .Menu group (Favorites) — hidden by default, toggle via Favorites group? property
├── .Menu group (Settings)
│   ├── .Menu header — "Settings" (collapsible group title)
│   └── Menu item × 7 (sub-items with L2 indent)
├── .Menu group (Resource Specific Group) × 4
├── .Menu group (Monitoring)
├── .Menu group (Automation)
├── .Menu group (Help)
├── Scrollbar — hidden by default, toggle via Show Scrollbar property
└── .Menu search — search input at bottom
```

##### Sub-Components

| Sub-Component | Key | Parent Set Key | Purpose |
|---------------|-----|---------------|---------|
| `.Menu item` | `d9b1bba354b28e1fdff7ce57a0520569a9c3911d` | `147bb7ee4b31de059edcd6727e319c3500f19892` | Individual menu link |
| `.Menu group` | `a81e32b9d8213763bd3095f97cadc335fb71c8de` | `e1d9ade7807807bb0c477550bfeadf7bd6888e6d` | Collapsible group container |
| `.Menu header` | `85ff08d62ac78e5361c0b27bf61f7d55cec40afb` | `94ddee1f8be4b9098c9c1b83f1cccb70b8c1feb8` | Group header with collapse chevron |
| `.Menu search` | `547290c1ac4ebff1612dfe3d21c9c264c765ff15` | — | Search input field |

##### .Menu item Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Icon#182313:14` | INSTANCE_SWAP | icon key | Left icon (16×16) |
| `Label#182313:7` | TEXT | any string | Menu item label text |
| `Sub item#182313:0` | BOOLEAN | true/false | Show L2 indent (for items inside groups) |
| `Selected` | VARIANT | True, False | Highlight as currently active |
| `State` | VARIANT | Rest, Hover, Pressed | Interaction state |
| `Favorited?` | VARIANT | True, False | Show star/favorite indicator |

##### .Menu group Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Open` | VARIANT | True, False | Expanded (show sub-items) or collapsed |

##### .Menu header Properties

| Property | Type | Values | Purpose |
|----------|------|--------|---------|
| `Label#182313:21` | TEXT | any string | Group title text |
| `State` | VARIANT | Rest, Hover, Pressed | Interaction state |
| `Collapsibility` | VARIANT | Open, Closed | Chevron direction |

##### Sizing & Layout

| Element | Dimension |
|---------|-----------|
| Menu width (Open) | 264px |
| Menu width (Closed) | 32px (icon-only) |
| Menu item height | 34px |
| Menu header height | 34px |
| Icon size | 16×16px |
| L2 indent width | 14px (for sub-items inside groups) |
| Label width (top-level) | 200px |
| Label width (sub-item) | 178px (200 - 14 indent - padding) |

##### How to Set Selected Item

```javascript
// Set Overview as selected
const overviewItem = serviceMenu.children[0]; // First .Menu item
overviewItem.setProperties({ 'Selected': 'True' });
```

##### How to Swap Icons

Icon swap uses INSTANCE_SWAP property but must be done via `swapComponent()` on the nested icon instance:
```javascript
const menuItem = serviceMenu.children[0];
const iconFrame = menuItem.children[1]; // "Icon" frame
const iconInstance = iconFrame.children[0]; // The actual icon instance
const newIcon = await figma.importComponentByKeyAsync('<icon-key>');
iconInstance.swapComponent(newIcon);
```

##### How to Show/Hide Groups

Groups are all present as children — toggle visibility:
```javascript
// Hide a group entirely
serviceMenu.children[10].visible = false;

// Show a group EXPANDED (items visible, chevron pointing down)
const group = serviceMenu.children[11];
group.visible = true;
// Items inside are visible by default — hide unused ones
group.children[3].visible = false; // hide item slot 3, etc.
// Header chevron stays "Open" (default)

// Show a group COLLAPSED (no items, chevron pointing right)
const collapsedGroup = serviceMenu.children[10];
collapsedGroup.visible = true;
collapsedGroup.children[0].setProperties({ 'Collapsibility': 'Closed' }); // header chevron → >
// Hide ALL item slots (children[1] through children[7])
for (let i = 1; i <= 7; i++) collapsedGroup.children[i].visible = false;
```

**⚠️ Collapsed vs Expanded:**
- **Expanded group**: Header `Collapsibility: Open` (chevron ∨) + item slots visible
- **Collapsed group**: Header `Collapsibility: Closed` (chevron >) + ALL item slots hidden
- Some items (like "Relationship management") appear as collapsed groups, not top-level items — check reference carefully

##### ⚠️ CRITICAL: Service Menu Population Checklist (ALL steps in ONE pass)

Before writing code, fully analyze the reference screenshot/design:

1. **Identify visible structure** — List all groups, their expand/collapse state, and all items in each group
2. **Identify the SELECTED item** — Which page is currently active (highlighted with blue background)?
3. **Identify icons** — What icon does each menu item show? Search the Azure Fluent Extension library (`fQO2yNBwr773QI4ANvb1Z4`) for matching icons
4. **Map to component structure** — Service Menu has: top-level `.Menu item` slots (indices 0-8), then `.Menu group` slots (indices 9-17), plus Scrollbar (18) and Search (19)

**Implementation order:**
```
Step 1: HIDE all default items (indices 0-8) that aren't in the reference
Step 2: Show + rename remaining top-level items
Step 3: For each group needed:
        a. Set group.visible = true
        b. Set header label text
        c. Set header Collapsibility = "Open" or "Closed"
        d. Show/hide item slots; set each item's Label text
        e. Set Selected = "True" on the active page item
Step 4: SWAP ICONS on every visible item:
        a. Search library for icon key
        b. Import: figma.importComponentByKeyAsync(key)
        c. Swap: iconFrame.children[0].swapComponent(comp)
        d. Do in batches of 3-4 to avoid timeout
Step 5: Hide ALL unused groups (set visible = false)
Step 6: Verify by listing all visible items + their properties
```

**Common mistakes to avoid:**
- ❌ Leaving default "Label" or "Resource specific item" text
- ❌ Forgetting to set `Selected: "True"` on the active page
- ❌ Leaving `Collapsibility: "Open"` on collapsed groups (chevron should point right)
- ❌ Not swapping icons (leaving default placeholder icon)
- ❌ Not hiding unused default items at the top (Activity log, Access control, etc.)
- ❌ Running all icon imports in one batch (timeout) — do 3-4 at a time

##### Standard Menu Structure (Azure Portal Convention)

**Top-level items** (always visible, no group):
- Overview (typically Selected=True)
- Activity log
- Access control (IAM)
- Tags
- Diagnose and solve problems
- Resource-specific items (varies per service)

**Standard groups** (collapsible):
- Settings
- Cost Management
- Monitoring
- Automation
- Help

---

#### Context Pane / Overlay Drawer — Detailed Usage Guide

Also called: Context Drawer, Side Panel, Overlay Drawer.

A slide-in panel from the right that overlays the content area. Used for forms, detail views, or actions without navigating away.

**Component:** `Drawer` (from Fluent 2 web library)
**Component Set Key:** `cf3006eecc56b65b22dab534137fa4f58f76c30f`
**Variant:** `Type=Overlay` → Key: `00187eaa634fa51dac051b56983c7d93e48a20f9`

**Full Structure:**
```
Overlay Drawer wrapper (FRAME, 592×1040)
└── Drawer (Type=Overlay) — INSTANCE
    └── .Overlay drawer — INSTANCE
        ├── Header (INSTANCE, 592×68)
        │   ├── Navigation base (HORIZONTAL, padding: [24, 16, 12, 24])
        │   │   └── Title base
        │   │       ├── Title container → Title text (Segoe UI, 20px)
        │   │       └── Button (Subtle, Medium, Icon only) — Dismiss ✕
        │   └── Divider (1px line at bottom)
        │
        ├── Body (FRAME, 592×900)
        │   ├── Layout: HORIZONTAL, padding: [0, 24, 0, 24]
        │   └── Contains: Form instance (fills available space)
        │       ├── Header information (VERTICAL, gap: 8)
        │       │   ├── Form header (text, 14px)
        │       │   ├── Description (text, 14px, wraps)
        │       │   └── [Optional] Message bar (info/warning)
        │       └── Input Fields (VERTICAL, gap: 20)
        │           ├── .Input row (HORIZONTAL)
        │           │   ├── Label + indicator (230px)
        │           │   └── Input field (fills remaining)
        │           ├── .Input row ...
        │           └── (up to 10 rows visible)
        │
        └── Footer (INSTANCE, 592×72)
            ├── Layout: VERTICAL, padding: [16, 24, 24, 24]
            ├── Button container (HORIZONTAL, gap: 8)
            │   ├── Button (Primary, Medium) — "Save" / "Associate"
            │   ├── Button (Secondary, Medium) — "Cancel"
            │   └── [Optional] Button (Subtle, Icon only) — "..." more actions
            └── Divider (1px line at top)
```

**Key Component Keys:**

| Sub-component | Key | Notes |
|--------------|-----|-------|
| Drawer (Type=Overlay) | `00187eaa634fa51dac051b56983c7d93e48a20f9` | Main drawer variant |
| Header (Navigation=False) | `9c97d9766e48949282954bcaf4945314803c9097` | Title + close button |
| .Drawer footer | `4fad883f1c38331baa509f4cac635a8b89a7e44d` | Primary + Cancel buttons |
| Form | `a9c31e9b260f58f9e9785528e876fd91b7248947` | Body content wrapper |
| .Input row | `f91da85ec13ea133a33b96d5eb0bf77ebf65e44b` | Label (230px) + Input field |

**Header Properties:**
- `Title#134855:3` (TEXT) — The drawer title
- `Navigation` (VARIANT) — `True` (back arrow + title) | `False` (title + close only)

**Footer Buttons:**
- Primary button: `Style=Primary`, `Size=Medium (Default)`, `Label` = action verb ("Save", "Associate", "Create")
- Cancel button: `Style=Secondary (Default)`, `Size=Medium (Default)`, `Label` = "Cancel"
- Optional more-actions: `Style=Subtle`, `Layout=Icon only`

**Body Content:**
- Padded with 24px left/right
- Contains a `Form` component instance (key: `a9c31e9b260f58f9e9785528e876fd91b7248947`)
- Form has: Header information (description + optional MessageBar) → Input Fields (vertical stack of `.Input row` instances)
- Each `.Input row`: Label (230px fixed) + Input field (grows to fill)
- Input field gap between rows: `20px`

**Key Dimensions:**
- Total width: `592px` (default)
- Header height: `68px`
- Footer height: `72px`
- Body: fills remaining height
- Body horizontal padding: `24px`

**When to use:**
- Creating/editing a resource from a list view
- Associating resources (e.g., NSP, tags)
- Any form action that doesn't require full-page navigation
- Viewing details of a selected row

**Instantiation for AI agents:**
```javascript
// 1. Instantiate the Drawer
figma_instantiate_component({ componentKey: "00187eaa634fa51dac051b56983c7d93e48a20f9" });

// 2. Resize to 592×1040 (or match content area height)
// 3. Set header title: find Title text node → set characters
// 4. Body already contains Form with Input rows — set labels and inputs
// 5. Footer buttons: set Primary button label to action verb
```

---

#### Pattern: Get Started / Onboarding Page

A **Get Started** page is a guided landing experience for first-time or returning users of a resource/service. Unlike an Overview page (which shows resource state), this page guides the user toward their next action.

```
Get Started page
├── Top Shell (Site Header + Breadcrumb + Blade header)
├── Menu + Content
│   ├── Service Menu (264px, "Get Started" item selected)
│   └── Content area
│       ├── Navigation row (optional: inline breadcrumb or step indicator)
│       └── Onboarding content
│           ├── Hero/illustration area (centered, ~480px height)
│           │   ├── Illustration or icon (large)
│           │   ├── Title (fontSizeBase500, Semibold)
│           │   ├── Description (fontSizeBase300, Regular)
│           │   └── CTA Button(s) (Primary + Secondary)
│           └── [Optional] Feature cards / quick links
│               ├── Overview Card (Content Type: Icon)
│               ├── Overview Card (Content Type: Icon)
│               └── Overview Card (Content Type: Icon)
```

**When to use:**
- First-time experience for a new service/resource
- Service landing pages before the user has created anything
- "Getting started" menu item in the Service Menu

**Rules:**
- Keep it focused: 1 primary CTA, max 2 secondary actions
- Use illustrations or icons to make it visually inviting
- Include "Learn more" links to documentation
- After the user completes the CTA (e.g., creates a project), subsequent visits should go to the resource overview/list instead

---

#### Pattern: Review + Create Summary Layout

The **Review + Create** step is the final tab in a create wizard. It shows all previously-entered form values in a read-only summary format before the user confirms creation.

```
Review + Create
├── Top Shell (Site Header + Breadcrumb + Blade header)
├── Content
│   ├── Azure Horizontal TabList (final tab "Review + Create" selected)
│   └── Review content area
│       ├── [Optional] Message bar (validation summary: "Validation passed" or errors)
│       ├── Summary Section 1 (corresponds to Tab 1, e.g., "Basics")
│       │   ├── Section header (fontSizeBase400, Semibold, e.g., "Project basics")
│       │   ├── [Optional] Edit link (to go back to that tab)
│       │   └── Key-value pairs (vertical list)
│       │       ├── Label: Value (e.g., "Subscription: My Subscription")
│       │       ├── Label: Value
│       │       └── ...
│       ├── Summary Section 2 (corresponds to Tab 2, e.g., "Scoping parameters")
│       │   ├── Section header
│       │   └── Key-value pairs
│       └── [Additional sections for each previous tab]
└── Footer (Style: Create — "Create" primary button + "Previous" secondary)
```

**Layout options:**
- **Single column** (default): Stack all sections vertically, each with a header
- **Two column**: Place sections side-by-side when they're short (use horizontal frame, 50/50 split)

**Rules:**
- Every value the user entered in previous tabs MUST appear here
- Each section should have an "Edit" link/button to navigate back to that specific tab
- Show a validation message bar at the top (success: "Validation passed ✓" / error: list issues)
- The "Create" button should be the primary action in the footer
- Values are read-only text (not editable inputs)
- Group values by the tab/step they came from
- Use `fontSizeBase300` Regular for values, `fontSizeBase300` Semibold for labels

---

### Step-by-Step Construction

#### 1. Start with the Top Shell
- Create a frame: `Top Shell` (fill width, 132px fixed height)
- Insert: `Site Header` (40px)
- Insert: `Breadcrumb` (28px) — configure breadcrumb items for current navigation path
- Insert: `Blade header` (64px) — set `Page title`, `Subtitle`, `Show icon`, `Icon`, `Size`
- Optional: Enable `Show Copilot Ribbon` for Copilot-enabled blades

#### 2. Add the Menu + Content split (for resource blades)
- Create a frame: `Menu + Content` (fill width, fill remaining height, Direction: Horizontal)
- Insert: `Service Menu` (264px fixed width, State: Open, Expand groups as needed)
- Create a frame: `Content + Footer` (fill width, Direction: Vertical)

#### 3. Add the Toolbar (inside Content + Footer)
- Insert: `Toolbar (Azure)`
- Set: `Top of Page: No` (since it's inside the menu+content area)

#### 4. Add Filtering (if list/grid view)
- [Optional] Add `Filter cards` row for summary metrics
- Add `Filtering + Pills` frame with `Filter Pill Dropdown` instances

#### 5. Build the Content Body

Choose from these patterns based on your blade type:

| Blade Type | Content Components |
|------------|-------------------|
| **Overview** | `Essentials` + `Overview Card` + `Tags by Resource` |
| **List/Browse** | `Azure F2-Data Grid` + `Pager` + `Filter Pill Dropdown` |
| **Create/Edit Form** | `Azure Horizontal TabList` + `Form` + `Filterable combo box` |
| **Delete** | `Delete Dialog` (from Pattern Templates) |
| **Settings** | `Accordion` + `Form` sections |
| **Copilot** | `Azure Copilot` or `Inline Copilot` components |
| **Get Started** | Onboarding content with hero + CTA + feature cards |

#### 6. Add the Footer (if needed)
- Insert: `Footer`
- Set: Style variant (`Create` for wizards, `Browse 633px+` for paginated lists)
- Footer sits at bottom of `Content + Footer` frame

#### 7. Context Pane / Overlay Drawer (if applicable)
- Design a variant of the blade WITH an overlay panel on the right
- **Fluent 2 Overlay Drawer**: 592px width (default), used for forms/create flows
- **Fluent 1 ContextPane**: Variable widths — 315px (Narrow), 585px (Medium), 855px (Wide), 1125px (Extra wide)
- Use F2 Drawer when possible; use F1 ContextPane only if you need the variable-width presets

### Blade Construction Checklist

- [ ] Top Shell present (Site Header + Breadcrumb + Blade header)
- [ ] Menu + Content split for resource detail blades
- [ ] Service Menu at 264px with correct items and state
- [ ] Toolbar present if blade has actions (Top of Page: No when inside Menu+Content)
- [ ] Filter cards present if view has summary metrics
- [ ] All components are library instances (not detached)
- [ ] All nested instances configured (especially in Copilot components)
- [ ] Correct variants selected for current state being designed
- [ ] Token-based colors and typography only (no hardcoded values)
- [ ] Footer present for action blades (create, edit, delete) and paginated lists
- [ ] Context pane state designed if blade supports detail panel
- [ ] Get Started page designed for first-time experience (if applicable)
- [ ] Review + Create step designed for wizard flows

### Post-Build Verification Checklist (MUST DO after every frame build)

These are recurring mistakes. Run through this list EVERY time after building a frame:

#### Spacing & Layout
- [ ] **Content area `itemSpacing` = 12** — NEVER leave at 0. The vertical gap between toolbar, filter bar, data grid, and footer must be 12px
- [ ] **Content area `paddingLeft` = 20 AND `paddingRight` = 20** — 20px inset on BOTH left and right (top and bottom stay 0)
- [ ] **All children have `layoutAlign: 'STRETCH'`** — so they fill the content width
- [ ] **`primaryAxisAlignItems: 'MIN'`** — content should be top-aligned, never centered

#### Breadcrumb
- [ ] **Last visible breadcrumb item has `Divider#4209:2` = false** — breadcrumbs NEVER end with a chevron/divider
- [ ] **Last item has `States=Current`** — indicates the current page

#### Blade Header (3-Part Title)
- [ ] **`Page title` contains ONLY the resource name** — e.g., "my-vm-01", NOT "my-vm-01 | Overview"
- [ ] **`Show Menu item` = true** when the blade shows a specific page
- [ ] **`Menu Item Text` = current page name** — e.g., "Members", "Overview"
- [ ] **Never concatenate resource name + pipe + page name into one text field**

#### Toolbar
- [ ] **Use Button instances with `Menu button#157663:0` = true for dropdown triggers** — these show a chevron after the label
- [ ] **NEVER use the `DEPRECATED_Dropdown` frames** — they render as input fields with underlines, not toolbar buttons
- [ ] **Hide unused Dropdown frames** (`visible = false`)
- [ ] **Button labels are set correctly** in reading order (cannot reorder inside instances)

#### Filter Bar
- [ ] **Use the `SearchBox` component** (key: `db97bfd9a9e75cad3417131b0ce5190b7400071d`) — NEVER create a manual text frame as a search placeholder
- [ ] **SearchBox placeholder text** is overridden at path: `Contents/Icon-Text-stack/.Text/Placeholder text`
- [ ] **Filter pills use `Filter Pill Dropdown`** component (not Tag component)

#### Data Grid
- [ ] **Hide unnecessary cell decorators** — persona avatars, status icons, resource icons should be hidden if not needed
- [ ] **Hide unused rows** — cells at index 4+ in each visible column should be hidden to show only needed rows
- [ ] **Column count matches reference** — hide columns that aren't needed

#### Footer
- [ ] **Hide `.Pagination Counter`** if reference doesn't show page numbers
- [ ] **Set display count dropdown text** to match reference (e.g., "10", "25", "50")
- [ ] **Choose correct footer variant** — Browse vs Action (different footer types)

#### Service Menu
- [ ] **Groups expanded/collapsed correctly** — match reference for which sections are open
- [ ] **Group item labels match** — verify each visible item has correct text
- [ ] **Hidden items in collapsed groups** — hide item slots, keep header visible

#### ⭐ Visual Self-Verification (MANDATORY final step)

> **Why:** Text checklists catch structural mistakes, but the errors that recur most — wrong column TYPE (hyperlink vs text vs icon), wrong icons, wrong selected item, missed data — are **visual**. You cannot confirm these by reading properties alone. You MUST look at the rendered result.

- [ ] **Export the built frame as an image** — `figma_export_node` (or `node.exportAsync({format:'PNG'})`) on the top-level frame
- [ ] **Place it side-by-side with the reference screenshot** and compare region by region, top to bottom:
  - [ ] Breadcrumb path text matches exactly
  - [ ] Blade header title/subtitle/icon matches
  - [ ] Service menu: correct items, correct icons, correct SELECTED item highlighted, correct expand/collapse
  - [ ] Toolbar: correct button labels AND icons, in the right order
  - [ ] Every data grid column is the correct TYPE (blue hyperlink vs dark plain text vs text+icon) and every visible cell has real data
  - [ ] KPI cards / filter pills / footer counts match the reference numbers
- [ ] **If ANY region differs, fix it and re-export** — do not declare the build done until the exported image visually matches the reference
- [ ] **Only report completion after a clean visual diff** — never claim "done" based on property checks alone

The Azure Fluent 2 design system uses a **4px base grid** with a standardized spacing scale. These values come from the Spacing token collections in the Fluent 2 Web Library.

### Spacing Scale (Figma Variable Tokens)

These are the actual Figma variable names used in components. They are bound to nodes via `boundVariables` and resolve to pixel values.

| Figma Variable Name | Value | Code Token | Usage |
|---------------------|-------|------------|-------|
| `Spacing/*/None` | 0px | `spacingNone` | No spacing |
| `Spacing/*/XXS` | 2px | `spacingXXS` | Micro spacing (icon-to-text tight, inline link padding) |
| `Spacing/*/XS` | 4px | `spacingXS` | Tight spacing (between related inline elements, search padding) |
| `Spacing/*/SNudge` | 6px | `spacingSNudge` | Nudge spacing (button internal padding, slight offsets) |
| `Spacing/*/S` | 8px | `spacingS` | Small spacing (button container padding, avatar spacing) |
| `Spacing/*/MNudge` | 10px | `spacingMNudge` | Medium nudge (body content gap, persona spacing) |
| `Spacing/*/M` | 12px | `spacingM` | Medium spacing (content area itemSpacing, vertical padding) |
| `Spacing/*/L` | 16px | `spacingL` | Large spacing (section padding, KPI card gap, card grid gap) |
| `Spacing/*/XL` | 20px | `spacingXL` | Extra-large (content area right padding, form field stacking) |
| `Spacing/*/XXL` | 24px | `spacingXXL` | Section spacing (major content sections, dialog padding) |
| `Spacing/*/XXXL` | 32px | `spacingXXXL` | Major section breaks |

> **Note:** Figma variables use `Spacing/Horizontal/*` and `Spacing/Vertical/*` prefixes (or just `Horizontal/*` / `Vertical/*` in some libraries). The values are identical — the prefix only indicates axis context.

### Corner Radius Tokens (Figma Variable Tokens)

| Figma Variable Name | Value | Code Token | Usage |
|---------------------|-------|------------|-------|
| `Corner-radius/None` or `Corner radius/None` | 0px | `borderRadiusNone` | Sharp corners (dividers, full-bleed surfaces) |
| `borderRadius` | 2px | `borderRadiusSmall` | Subtle rounding (badges, tags, search bar) |
| `Corner-radius/Button/Default` or `Button/Container` | 4px | `borderRadiusMedium` | Standard rounding (buttons, inputs, cards, KPI cards) |
| `Corner-radius/Input/Small` | 4px | `borderRadiusMedium` | Small input fields |
| `Corner-radius/Input/Medium` | 4px | `borderRadiusMedium` | Medium input fields (same as button default) |
| `Corner-radius/Modal/Medium` | 4px | `borderRadiusMedium` | Modal/dialog corners |
| `Corner radius/Medium` | 4px | `borderRadiusMedium` | Generic medium rounding |
| `Corner radius/Circular` | 9999px | `borderRadiusCircular` | Fully rounded (avatars, badges, pills, activity rings) |

> **In practice:** Almost everything uses **4px** radius. Only avatars/badges use circular (9999px), and some badges use 2px.

### Stroke Width Tokens

| Figma Variable Name | Value | Code Token | Usage |
|---------------------|-------|------------|-------|
| `Stroke width/Thin` | 1px | `strokeWidthThin` | Standard borders (input outlines, dividers, table rules) |
| `Stroke width/Thick` | 2px | `strokeWidthThick` | Focus rings, active tab indicators, selected states |

### Shadow / Elevation Tokens

| Level | Figma Variable(s) | CSS-equivalent | Usage |
|-------|-------------------|----------------|-------|
| **Elevation 0** | (none) | No shadow | Flat surfaces (backgrounds, inline content) |
| **Elevation 4** (card shadow) | `Shadow/Ambient darker` + `Shadow/Key darker` | `0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)` | KPI cards, clickable cards, raised surfaces |
| **Elevation 8** | — | `0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)` | Dropdowns, popovers, floating menus |
| **Elevation 16** | — | `0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)` | Dialogs, modals, drawers |
| **Elevation 64** | — | `0 0 8px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.14)` | Full-screen overlays (rare) |

> **Pattern:** Fluent 2 shadows always use TWO layers — an ambient shadow (spread, no offset) and a key shadow (directional, y-offset). The `radius` doubles at each level while maintaining the same alpha values.

### Icon Sizing

| Size | Figma Variable | Usage |
|------|----------------|-------|
| 12px | `Size/12` | Micro icons (chevrons inside compact controls, badges) |
| 16px | `Size/16` | Standard inline icons (menu items, buttons, status indicators) |
| 20px | `Size/20` | Default icon size (toolbar icons, button icons, navigation) |
| 24px | `Size/24` | Large icons (card icons, primary actions) |
| 28px | `Size/28` | — |
| 32px | `Size/32` | Avatar/product icons in card headers |
| 40px | `Size/40` | Large avatars, hero icons |
| 48px | `Size/48` | Extra-large avatars |

### Component Min/Max Width Constraints

| Figma Variable | Value | Component |
|----------------|-------|-----------|
| `Min width` (Site Header) | 1048px | Site Header minimum width |
| `Max width` (Site Header) | 10000px | Site Header maximum width |
| `SearchBar/Min width` | 280px | SearchBox minimum width |
| `SearchBar/Max width` | 520px | SearchBox maximum width |

### Component Sizing

| Element | Width | Height | Notes |
|---------|-------|--------|-------|
| Blade (minimum) | 320px | Full viewport | Minimum blade width |
| Blade (small) | 500px | Full viewport | Small blade |
| Blade (medium) | 750px | Full viewport | Medium blade |
| Blade (large) | 1100px+ | Full viewport | Large blade / full width |
| Context Pane (narrow) | 315px | Full viewport | Narrow side panel (F1 only) |
| Context Pane (medium) | 585px | Full viewport | Default side panel (F1 only) |
| Context Pane (wide) | 855px | Full viewport | Wide side panel (F1 only) |
| Context Pane (extra wide) | 1125px | Full viewport | Extra-wide side panel (F1 only) |
| Overlay Drawer (F2) | 592px | Full viewport | Default F2 drawer (forms, create flows) |
| Sidecar Copilot (SM) | 320–585px | Full viewport | Small Copilot sidecar |
| Service Menu | 264px | Full viewport | Left navigation (open state) |
| Portal Menu (L1) | 48px (collapsed) / 280px (expanded) | Full viewport | Portal-level menu |
| Toolbar height | — | 41px | Standard toolbar (outer Azure wrapper; inner Fluent Toolbar is 40px) |
| Site Header height | — | 40px | Portal header |
| Data Grid row height | — | 44px | Default row height |
| Form field height | — | 32px (Small) | Input, dropdown |

### Standard Padding Values

| Context | Padding | Notes |
|---------|---------|-------|
| Blade content area (Content + Footer) | 0px top, 20px right, 0px bottom, 20px left | Left and right padding; content inset from edges |
| Blade header | 16px horizontal, 12px vertical | Header internal padding |
| Card/Surface | 16px all sides | Card internal padding |
| Form section | 0px horizontal, 20px between input rows | Form field stacking (measured from Drawer Form) |
| Dialog | 24px all sides | Dialog content padding |
| Toolbar | 8px horizontal, 4px vertical | Toolbar item spacing |
| Tab content | 16px top (below tablist) | Content below tabs |

### Standard Gap Values

| Context | Gap | Notes |
|---------|-----|-------|
| Between form fields | 20px | Vertical stack of input rows |
| Between buttons | 8px | Horizontal button group |
| Between icon and text | 8px | Inline icon + label |
| Between sections | 24px | Major content sections |
| Between tab items | 0px (auto-handled) | TabList manages spacing internally |
| Data grid columns | 0px (border-separated) | Grid handles internally |
| Card grid | 16px | Cards in a grid |
| Between accordion items | 0px | Accordion items stack directly |

---

## Color Tokens

### Color Token Naming Convention

Colors follow the pattern: `{category}.{element}.{state}`

The design system supports **Light** and **Dark** themes. Always design for the active theme mode — never hardcode hex values.

### Core Semantic Colors (Light Theme)

| Token Category | Usage | Light Theme | Dark Theme |
|----------------|-------|-------------|------------|
| **Background** | | | |
| `colorNeutralBackground1` | Primary surface/page bg | #FFFFFF | #292929 |
| `colorNeutralBackground2` | Secondary surface (cards) | #FAFAFA | #1F1F1F |
| `colorNeutralBackground3` | Tertiary surface | #F5F5F5 | #141414 |
| `colorNeutralBackground4` | Subtle bg (hover states) | #F0F0F0 | #0A0A0A |
| `colorBrandBackground` | Brand-filled surfaces | #006ac6 | #125ca9 |
| `colorSubtleBackground` | Transparent default | transparent | transparent |
| `colorSubtleBackgroundHover` | Hover on subtle | #F5F5F5 | #383838 |
| **Foreground / Text** | | | |
| `colorNeutralForeground1` | Primary text | #242424 | #FFFFFF |
| `colorNeutralForeground2` | Secondary text | #424242 | #D6D6D6 |
| `colorNeutralForeground3` | Tertiary text (captions) | #616161 | #ADADAD |
| `colorNeutralForegroundDisabled` | Disabled text | #BDBDBD | #5C5C5C |
| `colorBrandForeground1` | Brand text/links | #006ac6 | #388ee2 |
| **Border / Stroke** | | | |
| `colorNeutralStroke1` | Primary borders | #D1D1D1 | #525252 |
| `colorNeutralStroke2` | Subtle borders | #E0E0E0 | #404040 |
| `colorNeutralStrokeAccessible` | Accessible borders (inputs) | #616161 | #ADADAD |
| `colorBrandStroke1` | Brand/focus stroke | #006ac6 | #388ee2 |
| **Status** | | | |
| `colorStatusSuccessBackground1` | Success bg | #F1FAF1 | #052505 |
| `colorStatusSuccessForeground1` | Success text | #0E700E | #54B054 |
| `colorStatusWarningBackground1` | Warning bg | #FFF9F5 | #4A1E04 |
| `colorStatusWarningForeground1` | Warning text | #BC4B09 | #F7A74A |
| `colorStatusDangerBackground1` | Error bg | #FDF3F4 | #3B0509 |
| `colorStatusDangerForeground1` | Error text | #B10E1C | #DC626D |

### Azure-Specific Colors

**Source:** `@fluentui-contrib/azure-theme` npm package  
Install: `npm install @fluentui-contrib/azure-theme` or `yarn add @fluentui-contrib/azure-theme`

The Azure theme uses `createLightTheme(brandAzure)` / `createDarkTheme(brandAzure)` from `@fluentui/react-components` with a custom brand ramp.

#### Azure Brand Ramp (16 steps)

| Step | Hex | Usage |
|------|-----|-------|
| Brand10 | `#101b2f` | Darkest brand (text on light bg) |
| Brand20 | `#16243c` | |
| Brand30 | `#1d2d4b` | |
| Brand40 | `#24395d` | Pressed states (dark) |
| Brand50 | `#2a446f` | Pressed background |
| Brand60 | `#2a5087` | Hover states |
| Brand70 | `#125ca9` | Links, hover brand |
| **Brand80** | **`#006ac6`** | **Primary brand (buttons, icons, track fills)** |
| Brand90 | `#0d7bd7` | Pressed (dark theme) |
| Brand100 | `#388ee2` | Brand foreground (dark theme) |
| Brand110 | `#5da2ea` | Hover (dark theme) |
| Brand120 | `#79b2f0` | |
| Brand130 | `#96c3f4` | |
| Brand140 | `#afd2f8` | Brand stroke 2 |
| Brand150 | `#cce2fb` | |
| Brand160 | `#e8f2fd` | Brand background 2 (lightest) |

#### Azure Neutral Palette (Grey scale)

| Token | Hex | Usage (Light theme) |
|-------|-----|---------------------|
| Black | `#000000` | Focus ring, thumb |
| Grey14 | `#222326` | Primary foreground (colorNeutralForeground1) |
| Grey26 | `#3F4145` | Secondary foreground |
| Grey38 | `#5C5F66` | Tertiary foreground, accessible stroke |
| Grey44 | `#6A6E76` | Foreground 4 |
| Grey74 | `#B9BCC0` | Disabled foreground |
| Grey82 | `#CFD0D3` | Neutral stroke 1 |
| Grey88 | `#DEDFE2` | Neutral stroke 2 / subtle stroke |
| Grey92 | `#EAEBEC` | Selected subtle background |
| Grey94 | `#EFEFF0` | Neutral background 4 / disabled bg |
| Grey96 | `#F4F5F5` | Subtle background hover |
| Grey98 | `#FAFAFA` | Neutral background 2 / card bg |
| White | `#FFFFFF` | Neutral background 1 (primary surface) |

#### Key Token Mappings (Light Theme)

| Token | Maps to | Hex |
|-------|---------|-----|
| `colorNeutralForeground1` | Grey14 | `#222326` |
| `colorNeutralForeground2` | Grey26 | `#3F4145` |
| `colorNeutralForeground3` | Grey38 | `#5C5F66` |
| `colorNeutralForegroundDisabled` | Grey74 | `#B9BCC0` |
| `colorBrandForeground1` | Brand80 | `#006ac6` |
| `colorBrandForegroundLink` | Brand70 | `#125ca9` |
| `colorNeutralBackground1` | White | `#FFFFFF` |
| `colorNeutralBackground2` | Grey98 | `#FAFAFA` |
| `colorNeutralBackground3` | Grey96 | `#F4F5F5` |
| `colorBrandBackground` | Brand80 | `#006ac6` |
| `colorCompoundBrandBackground` | Brand80 | `#006ac6` |
| `colorNeutralStroke1` | Grey82 | `#CFD0D3` |
| `colorNeutralStroke2` | Grey88 | `#DEDFE2` |
| `colorNeutralStrokeAccessible` | Grey38 | `#5C5F66` |
| `colorBrandStroke1` | Brand80 | `#006ac6` |
| `colorSubtleBackgroundHover` | Grey96 | `#F4F5F5` |

| Token | Usage | Light | Dark |
|-------|-------|-------|------|
| Azure Brand Blue (Brand80) | Primary Azure brand | #006ac6 | #388ee2 |
| Azure Copilot Purple | Copilot brand accent | #7B2BF9 | #9B6BFF |
| Azure Success Green | Success states | #107C10 | #54B054 |
| Azure Warning Yellow | Warning states | #FFB900 | #FCE100 |
| Azure Error Red | Error states | #D13438 | #DC626D |
| Azure Info Blue | Informational | #006ac6 | #388ee2 |

### When to Apply Colors

| Element | Token to Use |
|---------|-------------|
| Page background | `colorNeutralBackground1` |
| Card background | `colorNeutralBackground2` |
| Blade header background | `colorNeutralBackground1` |
| Primary button fill | `colorBrandBackground` |
| Primary text | `colorNeutralForeground1` |
| Secondary/helper text | `colorNeutralForeground2` |
| Hyperlinks | `colorBrandForeground1` |
| Input borders | `colorNeutralStrokeAccessible` |
| Dividers | `colorNeutralStroke2` |
| Disabled elements | `colorNeutralForegroundDisabled` |
| Focus indicator | `colorBrandStroke1` (2px outline) |
| Error message text | `colorStatusDangerForeground1` |
| Success message text | `colorStatusSuccessForeground1` |

---

## Typography Specs

### Font Family

| Context | Font |
|---------|------|
| All UI text | `Segoe UI Variable` (fallback: `Segoe UI`, `sans-serif`) |
| Code/monospace | `Cascadia Code` (fallback: `Consolas`, `monospace`) |

### Type Scale

| Token Name | Size | Weight | Line Height | Usage |
|-----------|------|--------|-------------|-------|
| `fontSizeBase100` | 10px | Regular (400) | 14px | Micro labels, badges |
| `fontSizeBase200` | 12px | Regular (400) | 16px | Captions, helper text, timestamps |
| `fontSizeBase300` | 14px | Regular (400) | 20px | **Body text (default)** |
| `fontSizeBase400` | 16px | Regular (400) | 22px | Subtitle, emphasized body |
| `fontSizeBase500` | 20px | Semibold (600) | 28px | Card titles, section headers |
| `fontSizeBase600` | 24px | Semibold (600) | 32px | Page subtitle |
| `fontSizeHero700` | 28px | Semibold (600) | 36px | Blade title |
| `fontSizeHero800` | 32px | Semibold (600) | 40px | Large page title |
| `fontSizeHero900` | 40px | Bold (700) | 52px | Hero text (rarely used) |
| `fontSizeHero1000` | 68px | Bold (700) | 92px | Marketing only (never in portal) |

### Weight Scale

| Token | Value | Usage |
|-------|-------|-------|
| `fontWeightRegular` | 400 | Body text, descriptions, values |
| `fontWeightSemibold` | 600 | Headers, labels, emphasized text, nav items |
| `fontWeightBold` | 700 | Hero text only |

### Typography Application

> **⚠️ CRITICAL RULE: Always use library text styles — never hardcode font properties.**
> When creating TEXT nodes, you MUST apply a text style from the Fluent 2 / Azure libraries using `figma.importStyleByKeyAsync(key)` + `node.setTextStyleIdAsync(style.id)`. This ensures text inherits theming, responds to light/dark mode, and stays consistent with the design system. Hardcoding `fontSize`, `fontName`, and `fills` manually creates "detached" text that breaks when themes change.

#### How to apply a text style (Figma Plugin API)

```javascript
// Copyable agent instruction — apply a text style to a text node
const style = await figma.importStyleByKeyAsync('<style-key-from-table-below>');
await textNode.setTextStyleIdAsync(style.id);
// That's it — fontSize, fontName, lineHeight, letterSpacing are all set automatically.
// You still need to set textNode.characters separately.
```

> **Font loading**: When using `setTextStyleIdAsync`, you do NOT need to call `figma.loadFontAsync()` first — the style handles it. You only need `loadFontAsync` when setting `fontName` manually (which you should avoid).

#### Master Text Style Reference

These are the importable library text styles available in Azure Fluent 2 files. Use the **Style Key** with `figma.importStyleByKeyAsync()`.

**Fluent 2 Web Typography Styles** (from Fluent 2 Web Library)

| Style Name | Style Key | Size | Weight | Line Height | Common Usage |
|------------|-----------|------|--------|-------------|--------------|
| `Web/Title 3` | `8b7e6dc1f5c74244ac9027e7312fb5a698036225` | 24px | Semibold | 32px | Blade header title, page titles |
| `Web/Subtitle 1` | `579d0e6f439b670a78431f566e60b912a51001bb` | 20px | Semibold | 26px | Large subsection titles, dialog titles |
| `Web/Subtitle 2` | `0b8cb21aaf9f6f3b46a2ee64f64162a1a8eb7405` | 16px | Semibold | 22px | Card titles, subsection headings, KPI card count numbers |
| `Web/Body 2` | `3206cacd769c7316d94dea99b75163025bb4d37c` | 16px | Regular | 22px | Large body text, card body content |
| `Web/Body 1 Strong` | `ce8b1791e619c2b63a557029c4a68f1c9e7b5ec0` | 14px | Semibold | 20px | Form headers (Tier 2), labels, button text, KPI card titles, column headers |
| `Web/Body 1` | `390e4051fa2060ac5eddf749475418e08bc48740` | 14px | Regular | 20px | Body text, descriptions, menu items, form values, breadcrumb links |
| `Web/Caption 1 Strong` | `7db21c4bddf4a0f6a1de4f2a9200ede31b1eb693` | 12px | Semibold | 16px | Badge/tag text, bold captions, status labels |
| `Web/Caption 1` | `45e9fd2cd093c69e5e564683a7bd1c563a968a08` | 12px | Regular | 16px | Blade subtitle, captions, timestamps, helper text, KPI card subtitles |
| `Web/Caption 2 Strong` | `ace42c6cfee98ae174603cf5c455590f97ba8e76` | 10px | Semibold | 14px | Micro badges, compact labels |
| `Web/Caption 2` | `f0d8c3533ea06a181e642b2ee420247f92261fbe` | 10px | Regular | 14px | Fine print, compact annotations |

**Azure-Specific Typography Styles** (from Azure UI Kit / Azure Pattern Templates)

| Style Name | Style Key | Size | Weight | Line Height | Common Usage |
|------------|-----------|------|--------|-------------|--------------|
| `az-text-/header 1` | `d09052279e0b729307958c3e60fe5b11925676cb` | 18px | Semibold | 24px | Section headers (Tier 1), major content headings |
| `az-text-/header 3` | `8bf582b002694d1b3543d2cfbed033979073a2e7` | 14px | Semibold | 20px | Smaller section headers, tab labels |
| `az-text-/body` | `4e3ac391ff02a443b1bed23de6d18ca45f5b07ea` | 13px | Regular | 18px | Section descriptions (Tier 1), compact body text |
| `Azure internal styles/Grid column header` | `126515371998ffb86d85f858046a92edc11b1460` | 13px | Semibold | 18px | Data grid column headers |
| `Update pending / Body text - 13 Regular` | `f316e02f07636d73d278d97a858073f661c8d312` | 13px | Regular | 18px | Legacy body text (same as az-text-/body) |

> **Font family**: All styles above use **Segoe UI**. The style import handles font loading automatically.

#### Master Color Style & Variable Reference

Azure Fluent 2 uses two color systems: **legacy paint styles** (older Azure libraries) and **modern color variables** (Fluent 2 token system). Components from the Fluent 2 Web Library use variables; Azure-specific components may use paint styles.

**Color Variables (Fluent 2 Token System)** — bound via `boundVariables.color` on fills

These are the semantic color tokens discovered in Fluent 2 Web components. They automatically switch between light/dark themes.

| Variable Name | Variable ID | Category | Usage |
|---------------|-------------|----------|-------|
| `Brand/Background/1/Rest` | `491ba4be2761277dccdd8d67fe95bde95bcad426/385982:11` | Brand | Site Header background, primary brand surfaces |
| `Brand/Background/2/Rest` | `e3d321714a04c8a830b69e2bb0e702afcb0c3298/385982:15` | Brand | Search box on brand surfaces |
| `Brand/Foreground/Link/Rest` | `57f84ccbc8958c60e6d5c02723c4d348dfa44eb5/385982:32` | Brand | Hyperlinks, "Learn more" links |
| `Neutral/Foreground/1/Rest` | `bbc3f53202870db168da222fe2ba3b453289cc6a/355323:1513` | Foreground | Primary text color (titles, body) |
| `Neutral/Foreground/2/Rest` | `be886d4fe825cd78d05fbcc6b8bc0cb2fd66bcae/355323:1517` | Foreground | Secondary text (descriptions, subtitles) |
| `Neutral/Foreground/3/Rest` | `7f4729ea0f748f793fa6222ffec310df38788b9a/355323:1524` | Foreground | Tertiary text (placeholders, icons) |
| `Neutral/Foreground/4/Rest` | `42127eb16f599ca651760d367839f38d0c268f7f/355323:1531` | Foreground | Placeholder text, disabled-looking text |
| `Neutral/Background/1/Rest` | `d8f474c2e7aa8172c030da274339f9a1cc510c16/355323:1456` | Background | Primary surface (white in light theme) |
| `Neutral/Background/2/Rest` | `fa5f4a9ae50bc770d8837a551a26c36539329ca3/355323:1464` | Background | Secondary surface (slightly grey) |
| `Neutral/Background/3/Rest` | `396dd3a95f9e4578619249091e9a4afea05bd613/355323:1460` | Background | Tertiary surface (darker grey) |
| `Neutral/Background/5/Rest` | `03e976e6a2a3d7b845404d951b223d9e3a28d5b5/355323:1472` | Background | Scrollbar, divider surfaces |
| `Neutral/Background/Subtle/Rest` | `83c1b81f56baeda24cdd930d780d95d60100b29b/355323:1481` | Background | Subtle buttons, hover surfaces |
| `Neutral/Background/Transparent/Rest` | `64d8d3f7af6c628dbd249523f344e5cbb05cc48f/355323:1492` | Background | Transparent buttons |
| `Neutral/Background/Overlay/Scrollbar/Rest` | `316de40c428fbd55ff4ef00363079077ff432981/355323:1501` | Background | Scrollbar overlay |
| `Neutral/Stroke/Accessible/Rest` | `7f5d3e97519c640da664957e2c67d4d4bc8c8f7f/355323:1578` | Stroke | Input borders, accessible outlines |
| `Status/Available/Foreground/3/Rest` | `81bf8c331671540dba4d1cd1b1ec99d5ad3b527d/355323:1620` | Status | Green status icons, online indicators |
| `Color/Foreground/Neutral/Primary` | `0c3d90486986f00dc8b4ec845f0096341c7b3c4f/96:3757` | Foreground | Primary neutral text (Azure icons library) |
| `Color/Control/Background/Primary/Rest` | `69a9f651d5dedc08896c0f5b78ccb951ac33e237/233721:157` | Control | Card backgrounds, control surfaces |
| `Background` | `38e82438babb6419d2f528ef498a7cb565104235/233721:272` | Background | Data grid header row background |

**Legacy Paint Styles** (from Azure UI Kit / older libraries) — applied via `fillStyleId`

| Style Name | Style Key | RGB (Light) | Usage |
|------------|-----------|-------------|-------|
| `Light Theme/Text colors/Primary` | `7f1693f4ec73bb4940f3666ca0d1ef7b2f6926f1` | rgb(41,40,39) | Primary text on light backgrounds |
| `Light Theme/Text colors/Secondary` | `016df69920b1c057343a1a0b55455726b805d487` | rgb(96,94,92) | Secondary/description text |
| `Light Theme/Status Foreground/Success` | `d1be9ad9b9be30410cd7443bbef8f85225e3a278` | rgb(87,163,0) | Success status icons, green indicators |
| `typographyColors/Primary (neutralPrimary)` | `939f3b3c98344998f24e604fe42707a92c459249` | rgb(50,49,48) | Primary text (legacy Fluent 1 token) |
| `Neutral Color / Grey 130` | `e3cfe8df88f607b0c1983079c5408e2f4adb7c64` | rgb(96,94,92) | Grey text, secondary foreground |
| `Light/Foreground/Foreground 2` | `41e324dda46d791f7d46bb254b2aae1e97bb319a` | rgb(66,66,66) | Medium emphasis foreground |
| `Light/Foreground/Foreground 3` | `6fb885736a4b717f2440d478a79a9630526eba38` | rgb(97,97,97) | Low emphasis foreground |
| `Light/Foreground/Foreground Disabled` | `bf79a713b1f235d09261eb90bc0fa67edbbc80d5` | rgb(189,189,189) | Disabled text, inactive controls |
| `Light/Background/Subtle Background` | `36b339f60757313b574d225627c0141c61aceaa8` | rgb(255,255,255) @ 0% opacity | Transparent/subtle backgrounds |

> **Which system to use?** When creating manual text/frames, prefer **color variables** (bound via `boundVariables`) because they automatically theme. Legacy paint styles are fine for nodes that don't need theme switching. Inside component instances, colors are already bound — don't override them.

#### Where each style is used

| UI Element | Text Style to Use |
|------------|-------------------|
| Blade title | `Web/Title 3` |
| Blade subtitle | `Web/Caption 1` |
| Section header (Tier 1 — "Resiliency goals") | `az-text-/header 1` |
| Section description (Tier 1) | `az-text-/body` |
| Form/content header (Tier 2 — "Address spaces") | `Web/Body 1 Strong` |
| Form/content description (Tier 2) | `Web/Body 1` |
| Body text, menu items | `Web/Body 1` |
| Input labels, card header titles | `Web/Body 1 Strong` |
| Helper/description text, timestamps | `Web/Caption 1` |
| Data grid column headers | `Azure internal styles/Grid column header` |
| Data grid cell text | `Web/Body 1` |
| Breadcrumb links | `Web/Body 1` |
| KPI card title | `Web/Body 1 Strong` |
| KPI card count | `Web/Subtitle 2` |
| KPI card subtitle | `Web/Caption 1` |

---

## Auto-Layout Rules

### Fundamental Auto-Layout Patterns

Every frame in a Figma design for Azure should use auto-layout. Here are the standard configurations:

### Page-Level Layout

```
Frame: Blade (full page)
├─ Direction: Vertical ↓
├─ Padding: 0 (blade chrome handles its own)
├─ Gap: 0
├─ Width: Fill container
├─ Height: Fill container
│
├─ [Blade header] → Fixed height, fill width
├─ [Toolbar] → Fixed height, fill width
├─ [Content wrapper] → Fill width, fill height (scrollable)
│   ├─ Direction: Horizontal → (if side nav present)
│   │   ├─ [TabList vertical] → Fixed width (264px), fill height
│   │   └─ [Content area] → Fill width, fill height
│   │       ├─ Padding: 24px horizontal, 20px top
│   │       └─ Gap: 24px between sections
│   └─ Direction: Vertical ↓ (if no side nav)
│       ├─ [TabList horizontal] → Fill width, fixed height
│       └─ [Content area] → Fill, padded
└─ [Footer] → Fixed height, fill width
```

### Component-Level Auto-Layout

| Component | Direction | Alignment | Padding | Gap |
|-----------|-----------|-----------|---------|-----|
| **Blade header** | Horizontal → | Center vertically | 16h, 12v | 12 |
| **Toolbar** | Horizontal → | Center vertically | 8h, 4v | 4 |
| **Form** | Vertical ↓ | Stretch | 0 | 20 |
| **Form field** | Vertical ↓ | Start | 0 | 4 (label-to-input) |
| **Button group** | Horizontal → | Center vertically | 0 | 8 |
| **Card** | Vertical ↓ | Stretch | 16 all | 12 |
| **Data Grid row** | Horizontal → | Center vertically | 8h, 0v | 0 (cell widths) |
| **Accordion item** | Vertical ↓ | Stretch | 0 | 0 |
| **TabList (horizontal)** | Horizontal → | Bottom align | 0 | 0 |
| **TabList (vertical)** | Vertical ↓ | Start | 0 | 0 |
| **Dialog content** | Vertical ↓ | Stretch | 24 all | 16 |
| **Message bar** | Horizontal → | Center vertically | 12h, 8v | 8 |
| **Overview section** | Vertical ↓ | Start | 0 | 16 |
| **Footer** | Horizontal → | Center vertically, right-aligned | 16h, 12v | 8 |

### Sizing Behavior

| Element | Width | Height |
|---------|-------|--------|
| Blade | Fill container | Fill container |
| Content area | Fill container | Hug content (or fill if scrollable) |
| Cards in grid | Fixed or fill (equal widths) | Hug content |
| Form fields | Fill container (max 480px) | Hug content |
| Buttons | Hug content (min 96px) | Fixed 32px |
| Input fields | Fill container | Fixed 32px |
| Data Grid | Fill container | Hug content (or fixed with scroll) |
| Toolbar | Fill container | Fixed 41px |
| Side navigation | Fixed 264px | Fill container |

### Constraints & Resizing

| Element | Horizontal | Vertical |
|---------|-----------|----------|
| Blade header | Fill | Fixed |
| Content | Fill | Fill |
| Side nav | Fixed | Fill |
| Footer | Fill | Fixed |
| Form inputs | Fill (max-width: 480px) | Fixed |
| Buttons | Hug | Fixed |
| Cards (in grid) | Fill (equal) | Hug |
| Data grid columns | Mix of fixed + fill | Fixed row height |

---

## Responsive Breakpoints

### Portal Breakpoints

| Breakpoint | Width Range | Layout Changes |
|------------|-------------|----------------|
| **Narrow** | < 553px | Single column, stacked elements, collapsed nav |
| **Medium** | 554px – 1047px | Limited columns, compact spacing |
| **Wide** | ≥ 1048px | Full layout, all panels visible |

### Behavior at Breakpoints

| Component | < 553px | 554–1047px | ≥ 1048px |
|-----------|---------|-----------|----------|
| Site Header | Compact (hamburger) | Partial (truncated breadcrumb) | Full width |
| Portal Menu (L1) | Hidden / overlay | Collapsed (48px icons) | Expanded (280px) |
| Service Menu | Hidden / overlay | Collapsed | Expanded |
| Blade header | Compact (no subtitle) | Medium | Full |
| Essentials | Single column | Two columns | Multi-column (4+) |
| Data Grid | Card view / horizontal scroll | Reduced columns | All columns |
| Toolbar | Overflow menu | Some overflow | All commands visible |
| Form layout | Full-width fields | Full-width fields | Side-by-side fields possible |
| Copilot sidecar | Full overlay | Narrow panel | Full sidecar (320–585px) |

### Designing for Breakpoints

**Required states to design:**
1. **≥ 1048px** — Always design this first (primary state)
2. **< 553px** — Design if your blade will be used on mobile or in narrow contexts
3. **554–1047px** — Design if significantly different from wide layout

**Auto-layout approach for responsive:**
- Use `Fill container` width on content areas
- Use `min-width` / `max-width` constraints on form fields
- Use `Wrap` layout for card grids that need to reflow
- Blade header variant `Size` property handles responsive automatically

---

## Layer Naming Conventions

### Naming Rules

A consistent layer naming system helps agents and humans navigate frames quickly.

### Frame & Section Naming

| Level | Convention | Example |
|-------|-----------|---------|
| Top-level page | `Page / [Page Name]` | `Page / Create Virtual Machine` |
| Major section | `Section / [Name]` | `Section / Basics`, `Section / Networking` |
| Content group | `Group / [Name]` | `Group / Form Fields`, `Group / Actions` |
| Card | `Card / [Name]` | `Card / Overview`, `Card / Monitoring` |
| Repeated item | `[Name] / [Index or ID]` | `Row / 1`, `Row / 2` |

### Component Instance Naming

| Rule | Convention | Example |
|------|-----------|---------|
| Library instance | Keep default name (component name) | `Blade header`, `Azure F2-Data Grid` |
| Customized instance | Prefix context | `Header / Create VM`, `Tab / Networking` |
| Fluent 1 fallback | Prefix `[F1]` | `[F1] Date Picker` |
| Placeholder content | Prefix `[placeholder]` | `[placeholder] Chart Area` |
| Hidden/collapsed | Suffix `(hidden)` | `Section / Advanced (hidden)` |

### State Variants

When designing multiple states of the same view:

| Convention | Example |
|-----------|---------|
| `[Page Name] / [State]` | `Create VM / Step 1 - Basics` |
| `[Component] / [State]` | `Delete Dialog / Empty`, `Delete Dialog / Filled` |
| `[Flow] / [Step]` | `Onboarding / Welcome`, `Onboarding / Configure` |

### Layer Order (Top to Bottom in Layers Panel)

Layers should be ordered **visually top-to-bottom, left-to-right** as they appear on screen:
1. Site Header (top)
2. Blade header
3. Toolbar
4. Content sections (in order)
5. Footer (bottom)

---

## State Coverage Checklist

### Required States per Component Type

Always design these states for interactive components:

#### Input Fields (TextBox, Dropdown, ComboBox, DatePicker)
- [ ] **Rest** — Default idle state
- [ ] **Hover** — Mouse over
- [ ] **Focus** — Keyboard/click focus (show focus ring)
- [ ] **Filled** — With user-entered value
- [ ] **Disabled** — Non-interactive, grayed out
- [ ] **Error** — Validation failed (red border + error message)
- [ ] **Read-only** — Displays value but not editable (if applicable)

#### Buttons
- [ ] **Rest** — Default state
- [ ] **Hover** — Mouse over
- [ ] **Pressed** — Active/click
- [ ] **Focus** — Keyboard focus
- [ ] **Disabled** — Cannot be clicked

#### Page/Blade States
- [ ] **Default / Loaded** — Normal content visible
- [ ] **Loading** — Spinner or skeleton (first load)
- [ ] **Empty** — No data (use `Empty state` component with guidance)
- [ ] **Error** — Failed to load (use `Message bar` with retry action)
- [ ] **Partial** — Some content loaded, some still loading

#### Data Grid States
- [ ] **Loaded with data** — Normal table view
- [ ] **Loading** — Skeleton rows or spinner
- [ ] **Empty** — No results (empty state message)
- [ ] **Filtered - no results** — Filters active but no matches
- [ ] **Error** — Failed to fetch data
- [ ] **Row hover** — Highlighted row on mouse over
- [ ] **Row selected** — Selected row(s) with checkbox

#### Dialog / Modal States
- [ ] **Initial** — Default dialog content
- [ ] **Loading** — Action in progress (disabled buttons, spinner)
- [ ] **Error** — Action failed (inline error message)
- [ ] **Confirmation** — Pre-action confirmation state (e.g., type resource name to confirm delete)

#### Navigation (Tabs, Menu)
- [ ] **Active/Selected** — Current selection
- [ ] **Hover** — Mouse over non-selected item
- [ ] **Disabled** — Tab/item cannot be selected
- [ ] **Validation error** — Tab has error (show error indicator)

### Minimum Viable States for Handoff

For developer handoff, you MUST have at minimum:

| Scenario | Required States |
|----------|----------------|
| New blade/page | Default, Loading, Empty, Error |
| Form | Rest, Filled, Error (per field), Form-level error |
| List/Grid | Loaded, Empty, Loading |
| Delete flow | Dialog empty, Dialog confirmed, Processing |
| Create flow | Each step + validation error per step |

---

## Do / Don't Examples

### ❌ DON'T: Detach Component Instances

```
BAD:  Right-click instance → "Detach instance" → manually edit
GOOD: Select instance → use Design panel properties to configure
```
**Why:** Detached instances lose connection to the source library and won't receive updates.

### ❌ DON'T: Hardcode Colors

```
BAD:  Apply fill #0078D4 directly to a rectangle
GOOD: Apply the color style or variable "colorBrandBackground" from the library
```
**Why:** Hardcoded colors break when switching themes (Light/Dark) and are not maintainable.

### ❌ DON'T: Use Text Without a Style

```
BAD:  Set font to "Segoe UI", 14px, Regular manually
GOOD: Apply text style "Body 1" or use the typography token from variables
```
**Why:** Manual text formatting is inconsistent and won't respond to text style updates.

### ❌ DON'T: Copy-Paste from Source Files

```
BAD:  Open Azure UI Kit file → Select component → Ctrl+C → Paste in your file
GOOD: Assets panel → Search → Drag component instance into your file
```
**Why:** Copy-paste creates a local copy, not an instance. It won't receive library updates.

### ❌ DON'T: Create Local Versions of Library Components

```
BAD:  Create your own "Button" component because you need a slightly different style
GOOD: Use the library Button with property overrides; if properties are insufficient,
      request the variant from the design system team
```

### ❌ DON'T: Nest Without Purpose

```
BAD:  Frame > Frame > Frame > Frame > actual content
GOOD: Frame (with auto-layout) > content components
```
**Why:** Excessive nesting makes selection difficult and properties hard to access.

### ❌ DON'T: Use Fixed Size When Fill is Appropriate

```
BAD:  Form field width: 347px (arbitrary fixed)
GOOD: Form field width: Fill container, max-width: 480px
```
**Why:** Fixed arbitrary widths break at different blade sizes.

### ❌ DON'T: Ignore Empty & Error States

```
BAD:  Only designing the "happy path" with data
GOOD: Design default + loading + empty + error states for every data-driven view
```

### ❌ DON'T: Mix Fluent 1 and Fluent 2 Without Annotation

```
BAD:  Using [Deprecated] F1 Button next to F2 components with no indication
GOOD: Prefix layer name with [F1], add sticky note explaining why F1 is used
```

### ✅ DO: Use Instance Swap for Icons

```
GOOD: Select component → Design panel → Icon property → Search & swap icon
```

### ✅ DO: Design at 1048+ Width First

```
GOOD: Start with the wide breakpoint (≥1048px), then adapt for narrower
```

### ✅ DO: Group Related Content with Auto-Layout

```
GOOD: Wrap related form fields in an auto-layout frame with 20px gap
```

### ✅ DO: Test with Both Themes

```
GOOD: Toggle the Mode variable to Dark and verify your layout works
```

---

## Component Population Checklists

> **Purpose:** These checklists ensure every component is fully configured in ONE pass when building a Figma screen from a reference/screenshot. Follow ALL steps before moving to the next component.

---

### Page Frame Checklist

```
□ Size: 1920×1080 (always, unless user specifies otherwise)
□ Layout: VERTICAL auto-layout
□ primaryAxisSizingMode: FIXED
□ counterAxisSizingMode: FIXED
□ itemSpacing: 0
□ fills: white (#FFFFFF)
□ clipsContent: true
□ Position: set x,y to avoid overlap with existing frames
```

---

### Top Shell Checklist (Site Header + Breadcrumb + Blade Header)

```
□ Frame: VERTICAL, auto height, STRETCH width, no fill, gap 0
□ Site Header: layoutAlign STRETCH (fills width)
□ Breadcrumb: layoutAlign STRETCH
  □ Set text items to match reference path (e.g., "Home", "Service Name")
  □ Hide unused breadcrumb items
  □ Last visible item: States=Current, Divider=false
□ Blade Header: layoutAlign STRETCH
  □ Page title = resource/service name ONLY (NOT concatenated!)
  □ Show Menu item = true (shows pipe + ToC label)
  □ Menu Item Text = current page/nav item name
  □ Subtitle = provider name (e.g., "Microsoft")
  □ Show subtitle = true/false per reference
  □ Show icon = true + swap icon to correct service icon
  □ Show Copilot Ribbon = false (unless reference shows it)
  □ Show Menu item = false if reference doesn't show pipe+page name
```

**⚠️ NEVER concatenate "ServiceName | PageName" into Page title field.**

---

### Toolbar (Azure) Checklist

```
□ Variant: Top of Page?=Yes (if at top of content) or No
□ layoutAlign: STRETCH (fill parent width)
□ Update button labels to match reference:
  □ Find all TEXT nodes with "Text" placeholder
  □ Set first N to match commands in reference (left to right)
  □ Hide remaining unused button slots (or leave as-is if component handles overflow)
□ If reference shows "+" prefix on first button (e.g., "+ Create"), include it in text
□ If reference shows dropdown chevron on a button, verify Menu button property is true
```

---

### Filter Pills Row Checklist

```
□ Create "Filtering + Pills" frame: HORIZONTAL, gap 8px, auto size, no fill
□ Identify exact number of pills from reference
□ Instantiate correct count of Filter Pill Dropdown components
□ For EACH pill:
  □ Set label text to match reference (e.g., "Subscription == All")
  □ Set Removable=Yes if pill shows ✕ in reference
  □ Set Removable=No for "+ Add filter" style pills
  □ Set State=Selected if pill appears active/highlighted
□ If reference shows SearchBox IN the filter row (left of pills):
  □ Place SearchBox as first child (before pills)
  □ Set width to 274px (standard)
  □ Set placeholder text to match reference
```

---

### SearchBox Checklist

```
□ Component key: db97bfd9a9e75cad3417131b0ce5190b7400071d
□ Set placeholder text at path: Contents/Icon-Text-stack/.Text/Placeholder text
□ Width: 280px (standard) or match reference
□ layoutAlign: MIN (don't stretch to full width)
□ NEVER create a manual text frame as a search placeholder
```

---

### Message Bar Checklist

```
□ Determine INTENT from reference:
  - Grey background → Info (icon index 0)
  - Green background → Success (icon index 1)
  - Orange background → Warning (icon index 2)
  - Red background → Error (icon index 3)
  - Purple background → Upsell (use "Message bar upsell" component instead)
□ Set text content (load ALL font ranges before replacing)
□ Set Actions=true/false per reference
□ Set Additional action=true/false per reference
□ Set Dismiss=true/false per reference (✕ button)
□ If Info intent: verify icon index 0 is visible in Status icon container
□ layoutAlign: STRETCH (fills parent width)
```

---

### Data Grid Population Checklist

```
□ BEFORE CODING — analyze reference for each column:
  □ Column type (hyperlink=blue text / plain text=dark / with icon / with status)
  □ Column header text
  □ Number of visible rows
  □ Data content for all cells

□ IMPLEMENTATION:
  1. Identify which grid column slots match needed types
  2. Hide ALL columns not in reference (set visible=false)
  3. Hide trailing Icon/chevron column (col 22) if not in reference
  4. For each visible column:
     □ Set header text
     □ Hide unwanted sub-elements:
       - Hierarchy chevrons (.↪️ Hierarchy level → visible=false)
       - Persona avatars (Persona → visible=false)
       - External link icons (Open → visible=false)
     □ Set text color:
       - Hyperlink: rgb(17, 94, 163) — blue
       - Plain text: rgb(36, 36, 36) — neutral dark
     □ Fill ALL cells with real data from reference
  5. Hide unused rows (set visible=false on rows beyond data count)
  6. Update column widths if needed
```

---

### Footer / Pagination Checklist

```
□ Choose correct variant:
  - Browse 633 px+: for paginated data grids (key: 0d63805899ce83e8f253476cbda5e33d11c7c310)
  - Create: for wizard completion (key: 43a7e4cff9725dd8709628323d1b0cc7edd1e4bd)
  - Form: for settings pages (key: 882049ff9c52aae9784f89bdec5cfaec32a5f70f)
  - Step wizard: for multi-step flows (key: ca60c03f7458f5ee07156e7bc15f5fbe3b6e3957)
□ layoutAlign: STRETCH
□ For Browse variant:
  □ Update count text: "Showing X to Y of Z records. Display count:"
  □ Match EXACT numbers from reference (total records, page size)
  □ Set Page Selected: First/Middle/Last (controls disabled prev/next buttons)
  □ Update page number text nodes if reference shows specific page numbers
□ For Create/Form variants:
  □ Update button labels if different from defaults
```

---

### Service Menu Population Checklist

```
□ BEFORE CODING — fully analyze reference:
  □ List ALL visible items with their labels
  □ Identify group headers and which are expanded vs collapsed
  □ Identify the SELECTED (active) item → blue highlight background
  □ Identify icons for each item

□ IMPLEMENTATION:
  Step 1: HIDE all default top-level items (indices 0-8) not in reference
  Step 2: Show + rename any top-level items that ARE in reference
  Step 3: For each group:
    □ Set group.visible = true
    □ Set header Label text
    □ Set header Collapsibility = "Open" (expanded) or "Closed" (collapsed)
    □ Show/hide item slots; set each item's Label text
    □ Set Selected = "True" on the active page item
  Step 4: SWAP ICONS (batches of 3-4 to avoid timeout):
    □ Search icon library for each item
    □ Import: figma.importComponentByKeyAsync(key)
    □ Swap: menuItem.children.find(c => c.name === "Icon").children[0].swapComponent(comp)
  Step 5: Hide ALL unused groups (set visible=false)
  Step 6: Verify by listing all visible items
```

**Common mistakes:**
- ❌ Leaving Collapsibility="Open" on collapsed groups
- ❌ Forgetting Selected="True" on active item
- ❌ Not swapping icons (leaving placeholders)
- ❌ Leaving default "Label" text in unused but visible items

---

### Breadcrumb Checklist

```
□ Determine path from reference (e.g., Home > ResourceGroup > Resource)
□ Set text on visible breadcrumb items (left to right)
□ Hide unused items (set parent frame visible=false)
□ Last visible item:
  □ States = Current
  □ Divider#4209:2 = false (no trailing chevron)
□ All other visible items:
  □ States = Rest
  □ Divider#4209:2 = true (shows chevron separator)
```

---

### Content + Footer Frame Checklist

```
□ VERTICAL auto-layout
□ primaryAxisSizingMode: FIXED
□ counterAxisSizingMode: FIXED  
□ layoutGrow: 1 (fills remaining space in Menu + Content)
□ layoutAlign: STRETCH
□ Padding: 0px top, 20px right, 0px bottom, 20px left
□ itemSpacing: 12px (gap between all children)
□ fills: none (transparent)
□ All children: layoutAlign = STRETCH (except SearchBox → MIN)
□ Data Grid: layoutGrow = 1 (fills remaining vertical space)
□ Child order: Toolbar → [MessageBar] → [Filter Pills] → [SearchBox] → Data Grid → Footer
```

---

### Overall Build Process (Full Page)

```
1. Create page frame (1920×1080)
2. Build Top Shell (Site Header + Breadcrumb + Blade Header)
3. Build Menu + Content frame (HORIZONTAL)
4. Configure Service Menu (full checklist above)
5. Build Content + Footer frame (VERTICAL, 20px L+R padding)
6. Add Toolbar with correct button labels
7. Add Message Bars (if any) with correct intent and text
8. Add Filter Pills with correct labels and states
9. Add SearchBox with correct placeholder
10. Add Data Grid (full checklist above)
11. Add Footer with correct variant and counts
12. Final verification: scroll through all components and compare to reference
```

---

## Full Page Recipes

### Recipe 1: Create Resource Blade (Multi-Step Form / Step Wizard)

**Use case:** Any "Create [Resource]" experience (e.g., Create Project, Create Storage Account)

**Components needed:**
```
Page: Create [Resource]
├── Top Shell (132px)
│   ├── Site Header (40px)
│   ├── Breadcrumb (28px)
│   │   └── Path: Home > [Service] > [Category]
│   └── Blade Header (64px)
│       ├── Size: 1100+
│       ├── Page title: "Create [Resource]" (e.g., "Create region movement project")
│       ├── Show subtitle: true
│       ├── Subtitle: "[Service name]" (e.g., "Azure resource mover")
│       ├── Show icon: true
│       ├── Icon: [service icon swap]
│       └── Actions: Pin, Favorite, ⋯, Copilot actions, Close (×)
├── Content (full width, fill height)
│   ├── Azure Horizontal TabList (Layout=Icon before, for step progress)
│   │   └── Tabs: ① Project basics, ② Scoping parameters, ③ Review + create
│   │       └── Icons per tab: category-specific icons (e.g., ⚙️ gear, 📋 clipboard)
│   │       └── See "Step Wizard TabList" section for component keys
│   ├── Body description (Body 1, max ~600px wide)
│   │   └── Explanatory text for the current step + context
│   └── Form content area (vertical, padded)
│       ├── [Form fields — use Filterable combo box for dropdowns]
│       │   ├── Subscription *: Filterable combo box (Usage: SubscriptionDropdown)
│       │   ├── Resource group *: Filterable combo box (Usage: ResourceGroupDropdown)
│       │   ├── Name *: Input field
│       │   ├── Description: Input field (optional — no asterisk)
│       │   ├── Region *: Filterable combo box (Usage: LocationDropdown)
│       │   └── [Resource-specific fields]
│       └── [Optional: Message bar for validation feedback]
└── Footer (56px)
    └── Style: Step wizard (has: Previous, Next: [step name], Review + create)
        └── Previous is disabled on first step
        └── "Next" label includes next step name (e.g., "Next: Scoping")
        └── Right side: "Give feedback" link with Person Feedback icon
```

**Key notes:**
- **Blade Header IS present** in wizard flows (132px Top Shell, same as other blades)
- **TabList sits inside Content**, below the Blade Header — not replacing it
- **Footer = Step wizard** style — Previous (disabled on step 1) / Next: [step name] / Review + create
- **Required fields** are marked with `*` and info icon (ⓘ)
- **Optional fields** have no asterisk (e.g., "Project description ⓘ")

**Properties to configure:**
- Top Shell: breadcrumb path, blade title, subtitle, icon, size
- TabList: active tab has Selected appearance, icons per tab
- Form fields: set State per field (Rest, Error, Disabled)
- Footer: Style=Step wizard

**Design the Review + Create tab as the final step (see Review + Create Summary pattern above).**

---

### Recipe 2: Browse/List Blade

**Use case:** Resource list page (e.g., All Projects, Virtual Machines list)

**Components needed:**
```
Page: Browse [Resources]
├── Top Shell (132px)
│   ├── Site Header (40px)
│   ├── Breadcrumb (28px)
│   └── Blade header (64px)
│       ├── Size: 1100+
│       ├── Page title: "[Resource Type]"
│       ├── Show icon: true
│       └── Icon: [resource type icon]
├── Menu + Content (horizontal split)
│   ├── Service Menu (264px, State: Open, Expand groups: True)
│   └── Content + Footer (fill width)
│       ├── Toolbar (Azure) (Top of Page: No)
│       │   └── [Commands: Create, Delete, Refresh, Export, etc.]
│       ├── [Optional] Filter cards row (summary metrics)
│       ├── [Optional] Message bar (info/upsell)
│       ├── Filtering + Pills
│       │   └── Multiple Filter Pill Dropdown instances
│       ├── Azure F2-Data Grid
│       │   ├── Type: Data grid (default)
│       │   └── [Columns: Name, Status, Resource Group, Location, etc.]
│       └── Footer (Style: Browse 633 px+) — pagination
```

**States to design:**
1. Default (with data rows)
2. Empty state (no resources — show `Empty state` component with Create CTA)
3. Loading (skeleton grid or spinner)
4. Filtered - no results
5. With context pane open (detail for selected row)

---

### Recipe 3: Resource Overview Blade

**Use case:** Resource detail page (e.g., when you click into a specific VM, Storage Account)

**Components needed:**
```
Page: [Resource Name] - Overview
├── Top Shell (132px)
│   ├── Site Header (40px)
│   ├── Breadcrumb (28px, shows full nav path)
│   └── Blade header (64px)
│       ├── Size: 1100+
│       ├── Page title: "[resource-instance-name]"
│       ├── Show subtitle: true
│       ├── Subtitle: "[Resource type]"
│       ├── Show icon: true
│       ├── Icon: [service icon]
│       ├── Show Menu item: true
│       └── Menu Item Text: "Delete" / "Start" / "Stop" etc.
├── Menu + Content (horizontal split)
│   ├── Service Menu (264px, State: Open, Expand groups: True, Favorites: True)
│   └── Content + Footer (fill width)
│       ├── Toolbar (Azure) (Top of Page: No)
│       └── Content Body
│           ├── Essentials (component)
│           │   ├── State: Collapsed or Expanded
│           │   ├── Show Tags: Yes
│           │   └── [Key-value pairs for resource properties]
│           ├── [Section: Monitoring / Getting Started / etc.]
│           │   └── Overview Card(s) (from Pattern Templates)
│           │       ├── Content Type: Icon / Illustration
│           │       ├── Hyperlink List: True/False
│           │       └── Footer_Overview card (CTA Type: Action)
│           └── [Additional sections as needed]
└── [No Footer for overview blades]
```

---

### Recipe 4: Delete Flow

**Use case:** Delete confirmation for any resource

**Components needed:**
```
Dialog: Delete [Resource]
├── Delete Dialog (from Pattern Templates)
│   ├── Property 1: Soft Delete OR Permanent
│   ├── Recoverable: true/false
│   └── Content:
│       ├── Delete resource name
│       │   ├── Resource name: "[instance-name]"
│       │   ├── Icon: [resource icon]
│       │   └── Show Copy: true
│       ├── [Choose one content type:]
│       │   ├── Associated delete content (if has associated resources)
│       │   │   ├── Enable Force Delete: false (initially)
│       │   │   └── State: Empty → Selected (after user checks)
│       │   ├── Bulk delete content (if multiple resources)
│       │   ├── Dependent delete content (if has dependencies)
│       │   └── Implication delete content (if showing impact)
│       └── Delete footer
│           └── Type: Empty (no text entered) → Filled (user typed name)
```

**States to design:**
1. Initial (empty confirmation input)
2. User has typed resource name (footer: Filled, delete button enabled)
3. Processing (buttons disabled, spinner)
4. Error (inline error if delete fails)

---

### Recipe 5: Settings/Configuration Blade

**Use case:** Resource settings pages, configuration panels

**Components needed:**
```
Page: [Resource] - Settings
├── Site Header
├── Blade header (Page title: "Configuration" or specific setting)
├── Toolbar (Top of Page: Yes)
│   └── [Commands: Save, Discard, Refresh]
├── Content
│   ├── [Optional: Message bar upsell — for upgrade prompts]
│   ├── Accordion (Bordered: True)
│   │   └── [Multiple sections as accordion items]
│   │       ├── Accordion Header Content
│   │       └── Accordion Content
│   │           └── Form
│   │               ├── [Input fields for settings]
│   │               ├── [Toggles for feature flags]
│   │               └── [Dropdowns for configuration options]
│   └── [Or: Simple Form without accordion for single-section settings]
└── Footer (Style: Form — Save, Cancel)
```

---

### Recipe 6: Copilot-Integrated Blade

**Use case:** Any blade with Azure Copilot sidecar

**Components needed:**
```
Page: [Blade] + Copilot
├── Site Header
├── [Main blade content - any of the above recipes]
│   └── In Blade header: Show Copilot Ribbon: true
├── Azure Copilot (sidecar)
│   ├── Size: 320 <-> 585 [SM Sidecar]
│   ├── Nav Drawer: false (default)
│   ├── Existing Chat: false / true
│   ├── Prompt Suggestions: true (for new chat)
│   └── Contains:
│       ├── Azure Copilot Header (Sidecar)
│       │   ├── Chat Name: "New Chat" / "[Topic]"
│       │   └── More Menu: true
│       ├── [Chat content area]
│       │   └── Copilot Row Swap (for messages)
│       │       └── Swap to: [appropriate type]
│       └── [Chat input area]
│           └── Prompt Ribbon (Copilot)
│               ├── Open: No / Yes
│               └── Prompt Pills: Hide All / Show
```

**Alternative: Inline Copilot (embedded in blade)**
```
[Within content area:]
├── Inline Copilot - guided start (for first interaction)
│   ├── Type: Basic
│   ├── State: Invocation
│   └── Show flair: true
└── Inline Copilot - open start (for active conversation)
    ├── State: Compose
    ├── Show action: true
    └── Show flair: true
```

---

### Recipe 7: Get Started / Onboarding Blade

**Use case:** First-time landing page for a service before the user has created any resources

**Components needed:**
```
Page: Get Started
├── Top Shell (132px)
│   ├── Site Header (40px)
│   ├── Breadcrumb (28px)
│   └── Blade header (64px)
│       ├── Page title: "[Service Name]"
│       └── Show icon: true
├── Menu + Content (horizontal split)
│   ├── Service Menu (264px, "Get started" item selected)
│   └── Content area (fill width)
│       ├── [Optional] Inline navigation / step indicator
│       └── Onboarding content (centered, max-width ~960px)
│           ├── Illustration or hero graphic
│           ├── Heading: "Get started with [Service]"
│           ├── Description paragraph (1–2 sentences)
│           ├── Primary CTA button (e.g., "Create project")
│           ├── [Optional] Secondary link ("Learn more")
│           └── [Optional] Feature cards row
│               ├── Overview Card (Content Type: Icon)
│               ├── Overview Card (Content Type: Icon)
│               └── Overview Card (Content Type: Icon)
└── [No Footer]
```

**Rules:**
- This page replaces the Overview when there are 0 resources
- After the user creates their first resource, redirect to list/overview
- Keep it simple: one primary action, minimal clutter

---

### Recipe 8: List Blade with Context Pane

**Use case:** A list/grid blade where selecting a row opens a detail panel without navigating away

**Components needed:**
```
State 1: List view (no pane)
├── [Same as Recipe 2 Browse/List Blade]

State 2: List view + Context Pane open
├── Top Shell (132px)
├── Menu + Content
│   ├── Service Menu (264px)
│   └── Content + Footer (fill width)
│       ├── Toolbar (Azure)
│       ├── Filter cards + Filter pills
│       ├── Azure F2-Data Grid (selected row highlighted)
│       └── Footer
│   └── Context Pane (585px, overlaid on right)
│       ├── Pane header (Title: selected item name, Close X button)
│       ├── Pane body (scrollable)
│       │   ├── Key-value details
│       │   ├── Status indicators
│       │   └── Related resource links
│       └── [Optional] Pane footer (Edit / Delete buttons)
```

**Design both states as separate frames:**
- `[Page Name] / List`
- `[Page Name] / List + Detail Pane`

---

## Prompt-to-Frame Mapping

### How an Agent Should Interpret Prompts

When given a design prompt, follow this decision process:

```
1. IDENTIFY the page type → Pick a Recipe
2. IDENTIFY specific components needed → Search UI Kit
3. DETERMINE states required → Use State Checklist
4. ASSEMBLE using auto-layout rules → Follow Layout Rules
5. CONFIGURE each component → Set Properties
6. NAME layers → Follow Naming Conventions
7. VERIFY → Check against Do/Don'ts
```

### Example Prompt → Frame Mappings

#### Prompt: "Design a create storage account blade with Basics and Networking tabs"

**Agent should produce:**
- Recipe: Create Resource Blade (Recipe 1)
- Blade header: title="Create storage account", icon=`Storage`, subtitle="Microsoft.Storage"
- Vertical TabList with 2 tabs: "Basics" (Selected=Yes), "Networking" (Selected=No)
- Basics tab content: Form with Subscription dropdown, Resource group dropdown, Name input, Region dropdown, Performance radio group, Redundancy dropdown
- Footer: Style=Create
- Layer name: `Page / Create Storage Account / Basics`

#### Prompt: "Show me a virtual machines list page with filtering"

**Agent should produce:**
- Recipe: Browse/List Blade (Recipe 2)
- Blade header: title="Virtual machines", icon=`Virtual-Machine`
- Toolbar with: Create, Delete, Start, Stop, Refresh
- Filter pills: Subscription, Resource group, Location, Status
- Data Grid with columns: Name, Status, Resource group, Location, OS, Size
- Pager below grid
- Layer name: `Page / Virtual Machines / List`

#### Prompt: "Design a delete confirmation for a VM named 'prod-web-01'"

**Agent should produce:**
- Recipe: Delete Flow (Recipe 4)
- Delete Dialog: Property 1=Permanent, Recoverable=false
- Delete resource name: "prod-web-01", Icon=`Virtual-Machine`, Show Copy=true
- Implication delete content (VMs have implications)
- Delete footer: Type=Empty (initial state)
- Second frame: same but Footer Type=Filled (confirmation typed)
- Layer names: `Delete Dialog / Initial`, `Delete Dialog / Confirmed`

#### Prompt: "Design an overview page for an App Service resource"

**Agent should produce:**
- Recipe: Resource Overview Blade (Recipe 3)
- Blade header: title="my-web-app", subtitle="App Service", icon=`App-Services`
- Toolbar: Browse, Swap, Stop, Restart, Delete, Diagnose and solve
- Service Menu: expanded, with groups (Overview, Activity log, Deployment, Settings, Monitoring)
- Essentials: State=Expanded, Show Tags=Yes (URL, Status, Resource group, Location, Subscription, Plan)
- Overview cards: Getting Started, Monitoring charts
- Layer name: `Page / my-web-app / Overview`

#### Prompt: "Add Copilot to a blade"

**Agent should produce:**
- Main blade content (whatever blade type)
- Blade header: Show Copilot Ribbon=true
- Azure Copilot sidecar component alongside
- Copilot: Size=320<->585, Existing Chat=false (new chat state)
- Button Entry Point (Copilot): placed in toolbar or appropriate location
- Layer name: `Page / [Blade] + Copilot`

### Prompt Keyword → Component Mapping

| Keyword in prompt | Component(s) to use |
|-------------------|---------------------|
| "create", "new", "wizard" | Create Resource recipe (Recipe 1) |
| "list", "browse", "table", "grid" | Browse/List recipe (Recipe 2) |
| "overview", "detail", "resource page" | Overview recipe (Recipe 3) |
| "delete", "remove", "confirm delete" | Delete Flow recipe (Recipe 4) |
| "settings", "configure", "configuration" | Settings recipe (Recipe 5) |
| "copilot", "AI", "chat" | Copilot recipe (Recipe 6) |
| "form", "input", "fill in" | `Form` component with appropriate fields |
| "dropdown", "select" | `Filterable combo box` |
| "tabs", "sections" | `TabList` + `Tab` components |
| "dialog", "modal", "popup" | `Dialog` (F1) or `Delete Dialog` (Pattern) |
| "notification", "alert" | `Message bar upsell` |
| "loading", "progress" | `Progress Bar with labels` or `Animated Progress Bar` |
| "empty", "no data" | `Empty state` component |
| "accordion", "collapsible" | `Accordion` component |
| "search", "filter" | `Filter Pill Dropdown` or toolbar `SearchBox` |
| "upload", "file" | `Upload File` component |
| "menu", "navigation" | `Service Menu` or `L1 - Portal Menu` |
| "date", "time", "duration" | F1 Date/Time pickers (annotate as [F1]) |
| "tooltip", "callout" | F1 InfoBalloon (annotate as [F1]) |
| "toast", "notification popup" | F1 Notification Toast (annotate as [F1]) |
| "get started", "onboarding", "landing" | Get Started recipe (Recipe 7) |
| "context pane", "detail panel", "side panel" | Context Pane overlay pattern (Recipe 8) |
| "review", "summary", "confirm creation" | Review + Create Summary pattern |
| "filter cards", "summary cards", "metrics row" | Filter Cards row pattern |
| "inventory", "scoped list" | Browse/List + Filter cards + Context pane |

---

## Fluent 1 Fallback Policy

### When to Use Fluent 1

**Fluent 1 should ONLY be used when Fluent 2 does not have the required component.**

Decision tree:
```
Need a component?
│
├─ Available in Fluent 2 UI Kit? → USE FLUENT 2 ✓
│
├─ Available in Fluent 2 Pattern Templates? → USE PATTERN ✓
│
├─ Can be composed from Fluent 2 components? → COMPOSE FROM FLUENT 2 ✓
│
└─ None of the above? → CHECK FLUENT 1 KITS
   │
   ├─ Available in Fluent 1? → USE FLUENT 1 (with documentation note)
   │
   └─ Not in Fluent 1 either? → CREATE CUSTOM (request design system addition)
```

### Rules for Fluent 1 Usage

1. **Document it** — Add a comment/annotation noting "Using Fluent 1 — no Fluent 2 equivalent available"
2. **Isolate it** — Keep Fluent 1 components in clearly labeled frames/sections
3. **Track it** — Maintain a list of Fluent 1 dependencies for future migration
4. **Don't mix styles** — When using a Fluent 1 component, use Fluent 1 tokens for that component only; don't bleed Fluent 1 styling into Fluent 2 areas
5. **Plan for migration** — When a Fluent 2 equivalent becomes available, prioritize swapping it in

### Fluent 1 Kit

**Source:** [Web UI Kit — Azure Fluent 1 Extension](https://www.figma.com/design/Bwn8rmUOYtnPRwA3JoQTBn/Web-UI-kit---Azure-Fluent-1-extension)
**File Key:** `Bwn8rmUOYtnPRwA3JoQTBn`
**Status:** ⚠️ DEPRECATED — Use only when no Fluent 2 equivalent exists
**Total Components:** 81 (62 component sets)

### Fluent 1 → Fluent 2 Migration Map

Use this table to check if a Fluent 2 replacement exists before using Fluent 1:

| Fluent 1 Component | Fluent 2 Equivalent | Action |
|---------------------|---------------------|--------|
| `Blade header [Deprecated]` | ✅ `Blade header` (UI Kit) | **Use Fluent 2** |
| `Data Grid [Deprecated]` | ✅ `Azure F2-Data Grid` (UI Kit) | **Use Fluent 2** |
| `Essentials [Deprecated]` | ✅ `Essentials` (UI Kit) | **Use Fluent 2** |
| `Footer bar [Deprecated]` | ✅ `Footer` (UI Kit) | **Use Fluent 2** |
| `Service Menu [Deprecated]` | ✅ `Service Menu` (UI Kit) | **Use Fluent 2** |
| `Toolbar [Deprecated]` | ✅ `Toolbar (Azure)` (UI Kit) | **Use Fluent 2** |
| `Tab [Deprecated]` | ✅ `Azure Horizontal Tab` / `Azure Vertical Tab` (UI Kit) | **Use Fluent 2** |
| `Tab bar [Deprecated]` | ✅ `Azure Horizontal TabList` / `Azure Vertical TabList` (UI Kit) | **Use Fluent 2** |
| `Scrollbar [Deprecated]` | ✅ `Scrollbar` (UI Kit) | **Use Fluent 2** |
| `Accordion [Deprecated]` | ✅ `Accordion` (UI Kit) | **Use Fluent 2** |
| `Pill filter [Deprecated]` | ✅ `Filter Pill Dropdown` (UI Kit) | **Use Fluent 2** |
| `Pagination/Pager [Deprecated]` | ✅ `Pager` (UI Kit) | **Use Fluent 2** |
| `Slider [Deprecated]` | ✅ `Slider with numbers` (UI Kit) | **Use Fluent 2** |
| `Progress bar [Deprecated]` | ✅ `Progress Bar with labels` / `Animated Progress Bar` (UI Kit) | **Use Fluent 2** |
| `InfoBox [Deprecated]` | ✅ `Message bar upsell` (UI Kit) | **Use Fluent 2** |
| `SearchBox [Deprecated]` | ✅ Use Fluent 2 SearchBox (native Fluent) | **Use Fluent 2** |
| `Button [Deprecated]` | ✅ Use Fluent 2 Button (native Fluent) | **Use Fluent 2** |
| `CheckBox [Deprecated]` | ✅ Use Fluent 2 Checkbox (native Fluent) | **Use Fluent 2** |
| `RadioButton [Deprecated]` | ✅ Use Fluent 2 RadioButton (native Fluent) | **Use Fluent 2** |
| `Toggle [Deprecated]` | ✅ Use Fluent 2 Toggle/Switch (native Fluent) | **Use Fluent 2** |
| `TextBox [Deprecated]` | ✅ Use Fluent 2 Input (native Fluent) | **Use Fluent 2** |
| `DropDown [Deprecated]` | ✅ `Filterable combo box` (UI Kit) or Fluent 2 Dropdown | **Use Fluent 2** |
| `Hyperlink [Deprecated]` | ✅ Use Fluent 2 Link (native Fluent) | **Use Fluent 2** |
| `L1 - Default [Deprecated]` | ✅ `L1 - Portal Menu` (UI Kit) | **Use Fluent 2** |
| `Form Fields (Label + read-only value) [Deprecated]` | ✅ `.Input row` with inner Input `State=Read only` (key `f91da85ec13ea133a33b96d5eb0bf77ebf65e44b`) | **Use Fluent 2** — see [Pattern: Label + Read-only Value Fields](#pattern-label--read-only-value-fields-input-row--f2) |

### Fluent 1 Components — OK to Use (No Fluent 2 Equivalent)

These components exist ONLY in Fluent 1 and may be used with proper annotation:

| Component | Variants | Properties | Notes |
|-----------|----------|------------|-------|
| **Time Picker** | State: Rest/Disabled/Error/Focus/Hover/Placeholder | Time (text) | No F2 equivalent yet |
| **Date Picker** | State: Rest/Disabled/Error/Focus/Hover/Placeholder | Date (text: YYYY-MM-DD) | No F2 equivalent yet |
| **Date Time Picker** | Layout: Horizontal/Vertical | — | No F2 equivalent yet |
| **Date Time Range Picker** | Layout: Horizontal/Vertical | — | No F2 equivalent yet |
| **Duration Picker** | Layout: Horizontal/Vertical | — | No F2 equivalent yet |
| **Day Picker** | Framework: Knockout/React | — | No F2 equivalent yet |
| **ARM error list** | Copyable: TRUE/FALSE | — | Knockout only |
| **ContextPane** | Width: 315px Narrow / 585px Medium / 855px Wide / 1125px Extra wide | Title, Subtitle, Footer, Content (instance swaps) | No F2 equivalent yet |
| **Context Menu** | Custom menu: True/False; Icons: On/Off | Custom menu (instance swap) | No F2 equivalent yet |
| **Context Menu Item** | Menu has icons: True/False; Show icon: True/False; State: Rest/Hover/Selected/Disabled | Icon (swap), Label (text), Has submenu (bool) | No F2 equivalent yet |
| **Dialog [Deprecated]** | Framework: Knockout/React | Title, Description, Content (swap), Show Discard (bool) | No F2 Dialog yet |
| **TeachingBubble [Deprecated]** | Direction hint: 12 positions | Title, Label, Actions, Dismissable, Multi-step, Steps | No F2 equivalent yet |
| **InfoBalloon - Tooltip [Deprecated]** | Pointer Position: 8 positions | Description (text) | No F2 equivalent yet |
| **InfoBalloon - Callout [Deprecated]** | Pointer Position: 8 positions | Content (instance swap) | No F2 equivalent yet |
| **Notification Toast [Deprecated]** | Type: Info/Success/Caution/Error/Progress | Title, Description, Show hyperlink, Show buttons (bools) | No F2 equivalent yet |
| **Tree view [Deprecated]** | Level: L1/L2/L3/L4; Menu: True/False | — | No F2 equivalent yet |
| **Numbered tab [Deprecated]** | States, Status: Incomplete/Complete/Error; Selected | Tab label (text) | Use F2 **Azure Horizontal TabList** (Layout=Icon before) with validation icons for wizard steps |
| **Inline message [Deprecated]** | Type: Info/Success/Warning/Error/Upsell | Message text | No F2 equivalent yet |
| **StatusBar [Deprecated]** | Type: Info/Success/Warning/Error/Upsell; State: Rest/Hover | Link (bool), Description (text) | No F2 equivalent yet |
| **CopyableLabel [Deprecated]** | Type: Read-only/Input | Field Value (text) | No F2 equivalent yet |
| **View port < 640px L1 + ToC** | Type: L1/ToC | Scroll bar (bool) | Mobile viewport nav |
| **PricingControl** | — | Label, Parameters, CTA (text) | Pricing display |
| **Drag and drop upload** | Framework: Knockout/React | — | Use F2 `Upload File` if possible |
| **Browser Header** | — | URL, Tabs, Favorites Bar | For mockup/presentation use |
| **Cursors** | 22 cursor types | — | For interaction documentation |
| **Accessibility tools** | Type: Arrowing/Key/Number/Speech Label/Ctl/Shift/Return | — | For accessibility annotations |
| **Tag [Deprecated]** | — | Label, Value (text) | No F2 Tag yet |
| **Breadcrumb** | ✅ Use Fluent 2 Breadcrumb (set key: `6a55e6a832553b5ae6d3fa3f8e548dd0df94d867`, Large variant: `ad1a251259e9020d988bdf6227f1a84baaf80a54`) | See [Breadcrumb — Detailed Usage Guide](#breadcrumb--detailed-usage-guide) | **Use Fluent 2** |
| **SectionControl [Deprecated]** | — | Header, Body, InfoBox (bools) | Form section builder |
| **RangeSlider [Deprecated]** | Value: 0-50%/50-100%/0-100%; State: Rest/Disabled | Leading/Trailing text, Step markers | No F2 equivalent yet |
| **Collapsed button [Deprecated]** | Open: True/False | — | No F2 equivalent yet |
| **Filter button [Deprecated]** | Menu open: True/False; State | — | No F2 equivalent yet |
| **Filter button callout [Deprecated]** | — | — | No F2 equivalent yet |
| **Form Fields (Label + Read-only value) [Deprecated]** | `Container width`, `control type=Read-only text` | Label (text), value via `SimpleListView` (text) | ⚠️ **Superseded by Fluent 2 `.Input row`** (Input `State=Read only`, key `f91da85ec13ea133a33b96d5eb0bf77ebf65e44b`). Use F2 for new work — see [Pattern: Label + Read-only Value Fields](#pattern-label--read-only-value-fields-input-row--f2). F1 key `49f0c7a0b46d5694a216e0e752399dd4fbc2e0b4` retained for legacy layouts only |

### Annotation Requirements When Using Fluent 1

When you must use a Fluent 1 component, **always annotate it clearly**:

1. **In-file annotation**: Add a sticky note or comment on the frame:
   ```
   ⚠️ FLUENT 1 — No Fluent 2 equivalent available
   Component: [Name]
   Reason: [Why F2 doesn't cover this]
   Track: [Link to migration ticket if applicable]
   ```

2. **Layer naming**: Prefix the instance layer name with `[F1]`:
   ```
   [F1] Date Picker
   [F1] ContextPane - 585px
   ```

3. **Handoff notes**: In dev handoff, explicitly note:
   - Which framework version to use (Knockout vs React where applicable)
   - That this component will be migrated when F2 equivalent ships

4. **Design review**: During design reviews, call out all F1 components as migration debt

---

## Data Visualization — Charts, Graphs & Components

**Source:** [Fluent Data Viz UI Kit](https://www.figma.com/design/2BIB5g5S4UCXIiKf314PZ7/Fluent-Data-Viz-UI-Kit)  
**File Key:** `2BIB5g5S4UCXIiKf314PZ7`

When an Azure portal blade needs to display charts, graphs, or data visualizations, use the Fluent Data Viz component library. This section covers the chart selection decision tree, individual component specs, typography tokens, color palette, and supporting UI elements (hover cards, CAB, KPI).

### Data Viz Typography (Type Ramp)

All chart text uses Fluent 2 typography tokens. These are **mandatory** for consistency.

| Usage | Token Name | Size / Line-height / Weight | Token Color |
|-------|-----------|----------------------------|-------------|
| X and Y axis titles | Caption 2 Strong | 10px / 14px / Semibold | NeutralGray 160 `#323130` |
| Axis values | Caption 1 | 12px / 16px / Regular | NeutralGray 130 `#605E5C` |
| Legend | Caption 1 | 12px / 16px / Regular | NeutralGray 160 `#323130` |
| Timestamp | Caption 1 | 12px / 16px / Regular | NeutralGray 130 `#605E5C` |
| In-graph values | Caption 1 Strong | 12px / 16px / Semibold | NeutralGray 160 `#323130` |
| Hyperlink ("Show more") | Body 1 | 14px / 20px / Regular | CommBlue Primary `#0078D4` (or Brand shade 10 `#106EBE`) |
| Chart title | Body 1 Strong | 14px / 20px / Semibold | NeutralGray 160 `#323130` |

### Data Viz Color Palette

Color is integral to data comprehension. The Fluent Data Viz library provides a **10-slot base color palette** that works identically in light and dark mode.

| Slot | Color Name | Usage |
|------|-----------|-------|
| FluentDataViz – Slot 1 | Blue (periwinkle) | Primary / first data series |
| FluentDataViz – Slot 2 | Pink (magenta) | Second data series |
| FluentDataViz – Slot 3 | Teal | Third data series |
| FluentDataViz – Slot 4 | Purple (lavender) | Fourth data series |
| FluentDataViz – Slot 5 | Green | Fifth data series |
| FluentDataViz – Slot 6 | Light blue (cornflower) | Sixth data series |
| FluentDataViz – Slot 7 | Orange | Seventh data series |
| FluentDataViz – Slot 8 | Olive green | Eighth data series |
| FluentDataViz – Slot 9 | Magenta (pink) | Ninth data series |
| FluentDataViz – Slot 10 | Gold | Tenth data series |

**Rules:**
- Colors are the same in light and dark mode
- Subscribe to the "Fluent data viz color" library in Figma for the style swatches
- Each data series in a chart gets the next sequential slot color
- For accessibility, data viz also provides pattern fills (chevrons, dots, waves, stripes, etc.) for distinguishing series without relying on color alone

### Chart Selection Decision Tree

Pick the chart type based on **what kind of data** you're mapping:

| Data Type | Description | Subcategories |
|-----------|-------------|---------------|
| **Numerical** | Quantitative data — exact numerical values and/or their relationships. Data can be nominal, ordinal, discrete, or continuous. | 1 variable, 2 variables (ordered/not ordered), 3+ variables (ordered/not ordered) |
| **Categorical** | Qualitative data — groups of data sets. Used to compare patterns of words rather than numbers. | 1 category, 2+ categories (nested/subgroup or adjacent) |
| **Numerical + Categorical** | Data that intersects both categorical groups and numbers. Numerical data is ordinal (e.g., amounts and years). | 1 num + 1 cat, 2+ num + 1 cat (ordered/not), 1 num + 2+ cat (adjacent) |
| **Maps** | Locational data that can be represented by a specific location. | — |
| **Network** | Interconnections between data sets. Categorical groups that can contain numerical values. | — |
| **Time** | Data represented across time. One axis or more contains time data. | 1 series, several series |

### Numerical Data Charts

#### 1 Variable

| Chart | Description | Rules |
|-------|-------------|-------|
| **Single (simple) bar** (histogram) | Compare numerical data by bar height (vertical) or length (horizontal). Bars are distributed on the same axis. | • Both axes are numbers • Use a singular color |
| **Sparklines** | Mini line charts showing one variable's evolution over time. Found in lists to show trends at a glance. Axis-less, for small data sets only. | • Avoid using any axis • Avoid hover states (used in small content areas) • Use a singular color |

#### 2 Variables

| Chart | Ordered | Not Ordered |
|-------|---------|-------------|
| **Scatter plot** | ✓ | — |
| **Line charts** | ✓ | ✓ |
| **Area charts** | ✓ | ✓ |
| **Stacked area charts** | — | ✓ |

#### 3+ Variables

| Chart | Ordered | Not Ordered |
|-------|---------|-------------|
| **Line charts** | ✓ | ✓ |
| **Area charts** | ✓ | ✓ |
| **Bubble chart** | — | ✓ |
| **Heatmap** | — | ✓ |
| **Radar charts** | — | ✓ |

### Categorical Data Charts

#### 1 Category

| Chart | Description | Rules |
|-------|-------------|-------|
| **Bar chart** (single, multi, stacked, vertical or horizontal) | Show the relationship between numeric and categorical values. Categories can be grouped (multi-bar) or stacked to show larger subsets. | • Order your data • For long titles, try horizontal |
| **Pie and donut charts** | Circle divided into sectors representing proportions. Sum of sectors equals 100%. | • Best for smaller data sets; if many values, use bar graph • Avoid placing multiple pie charts next to each other • Directly label values instead of using legend |

#### 2+ Categories

| Relationship | Charts Available |
|-------------|----------------|
| **Nested or subgroup** | Bar chart, Scatter plot, Bubble chart, Meter/gauge |
| **Adjacent** | Sankey diagram, Heatmap |

### Numerical + Categorical Charts

#### 1 Numeric + 1 Categorical

| Chart | Description |
|-------|-------------|
| **Single (simple) bar** | Compare numerical data by bar height/length on the same axis |
| **Pie and donut charts** | Proportions of a whole (sum = 100%) |

#### 2+ Numeric + 1 Categorical

| Chart | No Order | Num Ordered |
|-------|----------|-------------|
| **Scatter plot** | ✓ | — |
| **Line charts** | — | ✓ |
| **Bubble chart** | ✓ | — |
| **Area charts** | — | ✓ |
| **Stacked area charts** | — | ✓ |

#### 1 Numeric + 2+ Categorical (Adjacent)

| Chart | Description |
|-------|-------------|
| **Bar chart** (multi/stacked) | Grouped or stacked bars showing the relationship between numeric and multiple categorical values |
| **Bar + line chart** | Bars show categorical values, line overlay shows trend or commonality between groups |
| **Sankey diagram** | Flow visualization between categories |
| **Heatmap** | Color-coded matrix of values |
| **Radar charts** | Multi-axis spider/web chart for comparing multiple variables |

### Map-Based Visualizations

| Chart | Description | Rules |
|-------|-------------|-------|
| **Choropleth map** | Geographical areas colored by a numeric variable. Study how a variable evolves along a territory. | • Normalize your variable (can't compare raw numbers between regions of different size) • Take care choosing the continuous color palette • Don't forget the legend • For broad range of region sizes, consider hexbin maps |
| **Bubble map** | Circles of different size on geographic coordinates representing a numeric value. | • Map bubble size to area, not radius (radius exaggerates differences) • Use transparency to avoid overplotting • Include legend linking bubble size to numeric value |
| **Connection map** | Lines/arcs between positions on a map showing connections. Use "great circle" arcs for a natural look on spherical projection. | • For many connections, think about draw order (latest = most visible) • Use great circle instead of straight lines |

### Network Visualizations

| Chart | Description | Rules |
|-------|-------------|-------|
| **Sankey diagram** | Flow visualization where entities are rectangles/text and links are arcs with width proportional to flow importance. Shows evolution or sources to an end. | • Node position is very important — don't cross paths • Don't over-clutter; dismiss weak connections |
| **Heatmap** | Color-coded matrix for general view of numerical data patterns. Also useful for hierarchical clustering. | • Data needs to be normalized • Use one color with grades: darkest = highest, lightest = lowest |

### Time-Based Visualizations

| Series Count | Charts Available |
|-------------|----------------|
| **1 series** | Line charts, Area charts, Single bar, Sparklines |
| **Several series** | Line charts (multi-line), Area charts, Stacked area charts, Heatmap |

### Data Viz Component Key Reference

**Library file:** `2BIB5g5S4UCXIiKf314PZ7` — 40 component sets, 8 standalone components, 295 total variants.

> **Usage:** Use `figma.importComponentByKeyAsync(variantKey)` with a **variant key** (not the set key).  
> Component set keys will fail — always pick a specific variant from the table below.

#### Chart Components (Primary — use these to build charts)

| Component | Set Key | Default Variant Key | Default Variant | Other Variants |
|-----------|---------|-------------------|-----------------|----------------|
| **📊 Vertical Bar** | `9508d6139e5ee48146b2bc2a9e35a67432e09afa` | `c412d3f89a1fc55ab42bf2b478eb4f7f75efc08f` | Bar width=24px | 16px: `cd9604fc…`, 8px: `d4ad045d…`, 1px: `e13148ea…` |
| **📊 Vertical Stacked Bar** | `08537253101b440c17221678f571c61b878a9938` | `92eba3757a3fcf13307e5dc72768abadb866ae5a` | Bar width=24px | 16px: `b961dbc5…`, 8px: `446adb47…`, 1px: `a71f5fdf…` |
| **📊 Vertical Grouped Bar** | `4af817977952d341abeeaa2a82a8665411910549` | `2739cbf17bb753f7ab83b14b36f276ab98750851` | # of bars=24px | 16px (3 bars): `be1e220c…`, 8px: `8eb0c561…` |
| **📊 Custom height Vertical Stacked Bar** | `a3c3e992437a37151921a39f75e97d9cbb4e06ca` | `d5b48bfc47486e6a25b4c306f51906651e270472` | Bar width=24px | 16px: `6abd6bd4…`, 8px: `fe7d205d…`, 1px: `0298c5cc…` |
| **Horizontal Bar** | `36db63413d4170d51c67abc6fd724aaec738499c` | `1142304af6cf6b8ab86f7d7c564a72bdc00ec1cf` | Single value, 12px | Part-to-whole 12px: `31c79311…`, Single 8px: `c55738fa…`, Part-to-whole 8px: `f3bfecb3…` |
| **Horizontal Bar chart** | `6b6ff829cf22e265311faa0cd3dfc6f75fd1456f` | `becb945099ac390a5dd9ed5c20eb63e7d89c5754` | Single bar | % bar: `5fc6821e…`, Inline title: `84787df8…`, Benchmark: `e49a81d4…` |
| **Horizontal Stacked Bar chart** | `107765f616dc03a14365c6ca395f929a17aafb81` | `564a397767ebb307887d935aa0de45b780ec6b0e` | Single bar | % bar: `a6e9bd8f…`, Inline Title: `e2c78166…` |
| **Area chart** | `3f03054d293e40ec6127a32fac60d661df878d23` | `1c22c14fa4ff751ebc9bcb68cc770328275569ee` | Simple area | Overlapping: `0672dc50…`, Stacked: `960ef69b…` |
| **Line chart** | *(standalone)* | `0c0c08fb810e578ac59e81dda2d1164511aee430` | — | Single standalone component |
| **Gauge** | `1cdd6faf08c07e40747de8570917a3827697d3e7` | `4d40e98f7bec8776afb99e9bbdd5e64caa7abe24` | 140px M | 176px L: `8171fd2c…`, 104px S: `be3480b3…` |
| **Sparkline** | `f3536d16b5c2dd9d6ed2e35b9c6234c57b4c251b` | `3b5756b2c20f2a186f48318e76fb940d5c940a66` | Ascending High, Solid, Rounded | 36 variants: Trend × Style × Rounded corner |
| **Heatmap Grid** | *(standalone)* | `e9645bd18c55561c2a0a96fcaf72aded0885772d` | — | Single standalone component |

#### Chart Supporting Components

| Component | Set Key | Default Variant Key | Default Variant | Other Variants |
|-----------|---------|-------------------|-----------------|----------------|
| **Chart axes** | `63f5f18c80a2436aeec15d80ba2ced71d6445105` | `a289e1f347b1988d979ffd03c6c66ff4c0c6e1ab` | Vertical + short label, Light | Horizontal Cartesian Light: `c239b1de…`, No lines Light: `03aee269…`, + Dark variants |
| **Axis Label** | `0734746717b84e7e900627bf7acdd6103cec97df` | `002bffb2c24e0328c3c6784f191e3c425af8c482` | Vertical (Y) | Horizontal (X): `233a209b…`, Vertical no X-label: `b0670f69…` |
| **Legend** | `c447a907725d7c87ac41861700c47c15987908c5` | `c5764a854504ea1bb2432c8a9437ccf4f87d5c0d` | Accessible shapes, No Y-axis | Squares: `a6ee952d…`, with Y-axis: `4b20f823…` / `9619d4c1…` |
| **Hover state** | `11ae8b57e1e931ae697f84141b6cf795fce09c7d` | `2400dc6288c0f03a5fceae34be16b9846df2c052` | Default | Groups: `a78f0543…`, Simple: `fc03676a…` |
| **% Labels** | `8a5db677cdb5efa73c7be1496b33d20b1a66a299` | `c309723eb943ed9e53fc6119234ba47523a43d56` | M | S: `05897cca…`, L: `fe183fa1…` |
| **Error state** | `74f87cae1a46ac4e633c56a4ba62e15cab2638cb` | `3c1757626e3ac35a99b364ed4a4dcd6e6981a234` | 50px illo + content | 100px illo: `a7fc1586…`, No illustration: `f28f1687…` |
| **CAB** | *(standalone)* | `dd5d863a5351e2af02fa5c0880323f39f2ff6348` | — | Single standalone component |
| **Break** (axis break) | *(standalone)* | `ad425a6e57ea59380a4eb2c6353a576e9b17ccf2` | — | Single standalone component |

#### Line/Area Building Blocks

| Component | Set Key | Default Variant Key | Variants |
|-----------|---------|-------------------|----------|
| **Trend lines (chart atoms)** | `2233d035e9a828ef0cfec2cb440f0211237880b9` | `447eaca9bb627f8dfc921e024e2549e4ff5e5cb3` | 11 trend patterns: Up (gentle/gradual/intense), Down (gentle/gradual/intense), Steady (1/2), Random (1/2/3) |
| **Lines/Area Chart Lines** | `23216fa1977a522d234eb47edb642ad6a3b3197d` | `37c51610179e42efbd8960bad321b9d2600def7d` | 11 variants matching trend patterns |
| **Lines/Stacked Area Chart lines** | `1e391bc3593cdb328461c52c2e14e23c28d3b834` | `894399afabb03d5edf8d22422e9e4f7a4c35e935` | 7 levels: Lowest→Higher + Filled to 100% |

#### Tree/Sankey Building Blocks

| Component | Set Key | Default Variant Key | Variants |
|-----------|---------|-------------------|----------|
| **Node** | `4d791705a20996c126680cbf2410d1f9e2d42a85` | `9b45a14f2671c11782b0f0a69613b8db74ee0952` | Parent Outlined, Parent Text Only, Child Outlined |
| **Children** | `961674c83658234b1baa9632d58d88361811aabe` | `d61fe204a34b4101a3d8445de751b05ebc0fc9bd` | 1/2/3/4 nodes |
| **Branches** | `43f8f2468b67445efffa3860795ef194bc1d26fd` | `1cf9c0d1fa5d4f11534fd79a27789e1aca71a0ac` | 1/2/3/4 branches |
| **Box** (treemap cell) | `a8be41eb7865545aa53ff2e87b73bba5eb44ffe7` | `89b8967dc8954c65932342e05a2c32691e88abc7` | Column 1/2/3/4/Rest |

#### Bar Internal Building Blocks (🧪 — usually not instantiated directly)

| Component | Set Key | Purpose |
|-----------|---------|---------|
| **Lv 1: Base/Total height (%)** | `5fbc5b21490416d36a1a6b67f2db208f737f48d3` | 14 height percentages (4–100%) |
| **Lv 2: Bar type** | `5e52a06749f5d2d22af2d2f805f482c7c4a1c632` | Single, Stack, Stack-Autolayout, Part-to-whole |
| **Lv 3: Bar heights/Vertical bar** | `d3d420a662b9158b7016b43f7ba01980b9e2139f` | 14 height percentages for single bars |
| **Lv 3: Bar heights/Vertical Stacked Bar** | `9f262481258eccf61d1f88de4fb0e1a1b8a09811` | 26 variants (height × customization) |
| **Lv 4: Grouped bars** | `0566d6190e8fa9b43c5ff42075e9e25b1cfac720` | 3 bar widths: 8/16/24px |

#### Standalone Vertical Bar Variants (direct instantiation)

| Component | Key |
|-----------|-----|
| 📊 Chart/Vertical Bar/16px | `d4466e285450d672ab990b6175b99c497e139635` |
| 📊 Chart/Vertical Bar/8px | `5407033f579d5e93bbfd11d4100276e44bd16e8c` |
| 📊 Chart/Vertical Bar/1px | `2388d1c2bd132596d2200d28633dba2fa6fe88c7` |

> **Note on Donut/Pie charts:** These components exist in the Data Viz UI Kit but are **not yet published** to the team library. They cannot be instantiated via `importComponentByKeyAsync`. Until published, **manually copy** them from the source file:
> - **Donut:** [Fluent Data Viz UI Kit — node 358:20920](https://www.figma.com/design/2BIB5g5S4UCXIiKf314PZ7/Fluent-Data-Viz-UI-Kit?node-id=358-20920)
> - **Pie:** [Fluent Data Viz UI Kit — node 358:20462](https://www.figma.com/design/2BIB5g5S4UCXIiKf314PZ7/Fluent-Data-Viz-UI-Kit?node-id=358-20462)
>
> Known keys (for when they become published): Donut set `f9ff5b6322093a8711f018f454c58a1fa15c9880`, Pie set `27c75c0304b41ede1086d5e4400460c03dc4f51b`.
>
> **Note on Scatter/Bubble/Radar/Map charts:** These chart types are documented in the decision tree above but do **not** have dedicated Figma component library entries. Build them as manual FRAME constructions using the color palette and typography tokens, or use embedded images.

### Chart Component Details

#### Axis Component
Used for charts displaying data along two axes. Chart types that use this element include vertical bar, stacked bar, waterfall, line, and scatter plots. Available in standard (line + value labels) and alternative formats (categorical Y-axis labels). Supports dark mode.

#### Vertical Bar Chart
A vertical bar chart shows comparisons between categories of one or more data sets, usually over time. Categories and time are shown along the horizontal axis; data values along the vertical axis. Data is arranged in ranking stack.

**When to use:** For comparing values across two or more categories. Versatile — scales to show more categories, two categorical variables (clustered), or composition within each category (stacked). For single-dimension counts, a legend is not necessary.
**When NOT to use:** If the user is more interested in seeing a trend rather than individual values and min bar widths can't be maintained — switch to an area or line chart.

#### Vertical Stacked Bar Chart
Stacked bar charts show category totals while also revealing the item-level breakdown within each category.

**When to use:** Ideal for comparing values across two or more categories. Scales easily for more categories, clustered columns, or within-category composition. Unlike donut/pie charts, data is encoded by length — easy to distinguish values visually.

#### Vertical Grouped Bar Chart
Extends the standard bar chart by plotting two levels of data — height indicates value, color+position indicates a secondary category.

**When to use:** For within-group or between-group comparisons across different categories of data.

#### Horizontal Bar Chart
The beauty of bar charts is their simplicity and accessibility. Bars encode a single value tied to a category on one axis, with value markers next to the bar or on the other axis. Data is arranged in ranking stack.

**When to use:** Works well for data points that require long labels. Used for one dimension (count) across multiple categories. Variants: simple, with total value (e.g. `$188K/990K`), compact (label inline), and with indicator arrow.

#### Horizontal Multi Stacked Bar Chart
Horizontal bar charts that show category totals while providing understanding of item-level composition.

**When to use:** When time is not the primary metric, or where there are more parts within each bar. Data is arranged in ranking stack. Variants: simple stacked, with total value, and compact (label inline).

#### Horizontal Mini Bar Chart
A very small bar chart, typically drawn without axes or coordinates. Presents the general value in comparison to other mini bars. Similar to sparkline — small enough to be embedded in text or grouped as small multiples in a table row.

#### Line Chart
A visual representation showing the relationship between two variables, often used for trends over time. Plots data at regular intervals connected by lines. Multi-line charts enable comparison between multiple series over the same timeframe.

- Limit charts to **10 or fewer lines** for readability
- Time intervals traditionally on horizontal axis, data values on vertical
- Provides both standard (with axis/legend) and "custom chart" (minimal line only) variants

#### Area Chart (Single Series)
Traditional area charts plot a single data series over time to illustrate trends. Slight variation on single line charts — generally interchangeable. **Stay consistent** with one chart style per page rather than mixing area and line interchangeably.

#### Overlapping Area Chart
Used to plot **two** data series to compare trends over time. Uses partially-transparent fills.

**Critical rule:** Overlapping charts should **never exceed two series** (two legend items) — more than two becomes hard to read. For 3+ variables, use a multi-line chart instead.

#### Stacked Area Chart
Great at communicating how multiple data series relate to the total value. Illustrates how each series compares to the others in their contributions to the total. Unlike overlapping area, the baseline moves.

**Figma note:** Coded stacked area components use transparency fills. The Figma component uses solid swatches in place of transparency to keep the component flexible.

#### Donut Chart (preferred over Pie)
The **recommended** variation of pie charts. Shows proportion — a partial value in comparison to a total. Circular statistical graphic divided into slices illustrating numerical proportion.

**Source file (copy manually until published):** [Fluent Data Viz UI Kit — Donut](https://www.figma.com/design/2BIB5g5S4UCXIiKf314PZ7/Fluent-Data-Viz-UI-Kit?node-id=358-20920)
**Component keys (pending publish):** set `f9ff5b6322093a8711f018f454c58a1fa15c9880`, variant (Size=140px radius M) `440d154b74adb5ee75543bcd4ee1aa2532e0f609`

**When to use:** Ideal for showing relative composition of a small number of categories. Data is encoded into the angles of sections — becomes less effective with many categories or when the range varies on a large scale (e.g. 99% vs 1%).
**Advantages over pie charts:** Can display a summary value in the center hole, better visual balance.
**Limitation:** Less effective for exact comparisons (41% vs 39% look nearly identical) — use bar chart instead.
Variants: simple (no labels), with percentage labels around perimeter, dark mode supported.

#### Pie Chart (rarely chosen)
Shows numerical proportion via arc length. Pie chart does not have the benefits of donut chart (no center value display), and is therefore **rarely chosen**.

**Source file (copy manually until published):** [Fluent Data Viz UI Kit — Pie](https://www.figma.com/design/2BIB5g5S4UCXIiKf314PZ7/Fluent-Data-Viz-UI-Kit?node-id=358-20462)
**Component keys (pending publish):** set `27c75c0304b41ede1086d5e4400460c03dc4f51b`, variant (Size=104px radius S) `b1a740ccdf347eadfb0f54aa8dd25027329f3459`

**When to use:** Only has an advantage in certain reading scenarios where users want to compare ratio of angles of slices or slice areas. Variants: simple, with percentage labels, and exploded view.

#### Gauge Chart
Similar in appearance to doughnut charts but shows a value against a scale. Usually includes minimum, maximum, and present value. Often includes a needle/indicator.

**Two types:**
- **Speedometer** — starts from the left (single arc, single color gradient)
- **Rating meter** — starts from the middle (multi-color segments e.g. red/orange/green)

**When to use:** Easier to read than doughnut charts when you want to show available scale and value against it (unlike donuts that focus on parts/categories).
**Variants:** Simple arc (no min/max labels), with 0–100 scale labels, multi-segment rating meter with risk labels (e.g. "No risk").

#### Sparkline
Mini line charts showing trend with a trailing percentage indicator. Can show positive trend (green, ↑ 98%), negative trend (red, ↓ 20%), or neutral/flat trend (blue, → 50%).

**Rules:** No axes. No hover states. Used in compact content areas (table cells, list items). Color encodes trend direction.

### Supporting Data Viz Components

#### Hover Cards (Tooltips)
Hover cards display when a user hovers over certain designated parts of a visualization to give more detail about the data.

**Variants (from simplest to most detailed):**
1. **Single value** — Label + colored square + value + timestamp (e.g., "Label ■ 200 USD / Updated 11:00:04 pm EST")
2. **Single value with metadata title** — Adds a title row above (e.g., "Metadata title")
3. **Multi-value list** — Metadata title + multiple label/value rows with different colored squares
4. **Multi-value with trend indicators** — Each row shows Label + trend arrow (▼ Decreased / ▲ Increased) + value. Includes optional synopsis text.
5. **Multi-value with synopsis** — Label/value rows + brief text explanation + timestamp

#### CAB (Count Annotation Bar)
The CountAnnotationBar provides quick categorical filtering on a list to help users narrow down results. Displays an overview of important data to help users find where to focus.

**Behavior:** Can be static (read-only) or clickable (acts as filter). Each item shows a colored left border + placeholder title + large numeric value.
**Variants:**
1. **Simple** — title + value (e.g., "Placeholder title / 100")
2. **With subtitle** — title + subtitle + value (colored, e.g. blue "100")
3. **With total** — title + colored value/total (e.g., "100/1,000")

#### KPI (Key Performance Indicator)
A measurable value demonstrating how effectively a company achieves key business objectives. KPIs focus on critical/core business outcomes (not just any metric).

**Variants:**
1. **Simple** — Placeholder title + large number (e.g., "10.6K")
2. **With unit** — Placeholder title + number + unit label (e.g., "10 title")

### When to Use Which Chart (Quick Decision)

| If you need to... | Use |
|--------------------|-----|
| Compare quantities across categories | Vertical or horizontal bar chart |
| Compare quantities with long labels | Horizontal bar chart |
| Show proportions of a whole | Donut chart (preferred) or pie chart |
| Show trends over time (single series) | Line chart or area chart |
| Compare two series trends over time | Overlapping area chart (max 2 series) |
| Show trends with cumulative volume | Stacked area chart |
| Compare multiple group trends over time | Multi-line chart (≤10 lines) |
| Find correlations between 2 variables | Scatter plot |
| Show 3 variables at once | Bubble chart |
| Show data density/patterns | Heatmap |
| Compare multiple metrics for one entity | Radar chart |
| Show flows between categories | Sankey diagram |
| Show geographic distribution | Choropleth or bubble map |
| Show geographic connections | Connection map |
| Show a quick inline trend in a list/table | Sparkline |
| Show combined categorical + trend data | Bar + line chart |
| Show value against a scale (good/bad) | Gauge chart (speedometer or rating meter) |
| Show category breakdown within totals | Stacked bar chart (vertical or horizontal) |
| Show grouped comparisons | Grouped bar chart |
| Show compact inline values in table | Horizontal mini bar |
| Highlight a key business metric | KPI component |
| Provide categorical filtering on data | CAB (Count Annotation Bar) |

---

## Quick Reference Card

### File Links
| Resource | Link |
|----------|------|
| Azure UI Kit (Fluent 2) | [Open in Figma](https://www.figma.com/design/q2TdO4dVcMhNWYp0N6Bc05/Azure-UI-Kit--Fluent-2-) |
| Azure Pattern Templates (Fluent 2) | [Open in Figma](https://www.figma.com/design/TXALL9CS0727dvGcZo84Bg/Azure-Pattern-Templates--Fluent-2-) |
| Icons — Azure Fluent Extension | [Open in Figma](https://www.figma.com/design/fQO2yNBwr773QI4ANvb1Z4/Icons---Azure-Fluent-extension) |
| Fluent Iconography (System Icons) | [Open in Figma](https://www.figma.com/design/43oQOCD2164ExeSf5ajmou/Fluent-iconography?node-id=2708-10653) |
| Fluent Data Viz UI Kit | [Open in Figma](https://www.figma.com/design/2BIB5g5S4UCXIiKf314PZ7/Fluent-Data-Viz-UI-Kit) |
| Fluent 2 Web Library | [Open in Figma](https://www.figma.com/design/SSm1jBLsbAPE7xQnaGbL0V/Fluent-2-Web-Library) |
| Web UI Kit — Azure Fluent 1 Extension | [Open in Figma](https://www.figma.com/design/Bwn8rmUOYtnPRwA3JoQTBn/Web-UI-kit---Azure-Fluent-1-extension) |

### Search Shortcuts (Assets Panel)
| Looking for... | Search term (exact Figma component name) |
|----------------|-------------|
| Page header | `Blade header` |
| Table/list | `Azure F2-Data Grid` |
| Dropdown | `Filterable combo box` or `Filter Pill Dropdown` |
| Side tabs | `Azure Vertical TabList` |
| Top tabs | `Azure Horizontal TabList` |
| Delete confirmation | `Delete Dialog` |
| Feature overview | `Overview Card` |
| Copilot chat | `Azure Copilot` |
| Inline AI | `Inline Copilot` |
| Navigation menu | `Service Menu` or `Portal Menu` |
| Loading state | `Progress Bar` |
| Expandable sections | `Accordion` |
| Content surface / info card | `Card` |
| Feature highlight / overview card | `Overview Card` |
| Resource metadata | `Essentials` |
| Action bar | `Toolbar (Azure)` |
| Filter search | `SearchBox` |
| Filter pills | `Filter Pill Dropdown` |
| Step indicator | `Azure Horizontal TabList` or `Azure Vertical TabList` |
| Vertical bar chart | `📊 Chart/Vertical Bar` (Data Viz library) |
| Horizontal bar chart | `Horizontal Bar chart` (Data Viz library) |
| Line chart | `Line chart` (Data Viz library) |
| Area chart | `Area chart` (Data Viz library) |
| Gauge / meter | `Gauge` (Data Viz library) |
| Sparkline (inline trend) | `Sparkline` (Data Viz library) |
| Chart axes | `Chart axes` (Data Viz library) |
| Chart legend | `Legend` (Data Viz library) |
| Chart hover tooltip | `Hover state` (Data Viz library) |
| Count annotation bar | `CAB` (Data Viz library) |

---

*Last updated: 2026-06-24T18:15:00+05:30*
*Maintained by: Amrita Walia (Product Designer, CXS IDC)*
