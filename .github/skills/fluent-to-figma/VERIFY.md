# VERIFY — fluent-to-figma

Score the authored build spec against these dimensions. All blocking items must
pass before printing `SPEC_WRITTEN`.

## 1. Real component instances (blocking)
- [ ] Every recognizable UI element (header, breadcrumb, blade header, menu,
      toolbar, grid, essentials, card, search box, tabs, form, …) is an
      `instance` op referencing a real Azure Fluent 2 component **key** — not a
      hand-drawn frame/rectangle/text mimicking it.
- [ ] Keys come from `figma-plugin/azure-fluent2-kit.json` or the guidelines. A
      variant-specific `key` is preferred; when a set is used, `setKey` + a
      `variant` object is provided.

## 2. Correct configuration (blocking)
- [ ] Component text/boolean properties are set via the exact `Name#ID:N`
      property IDs from the guidelines (e.g. Blade header `Page title#32630:2`).
- [ ] Terminal/edge cases handled per the guidelines (last breadcrumb
      `Divider=false`, toolbar buttons not deprecated dropdowns, etc.).

## 3. Text styles, not hardcoded fonts (blocking)
- [ ] Text nodes use a `styleKey` from the kit's `textStyles` (Web/Title 3,
      Web/Body 1, Web/Caption 1, …). Hardcoded size/weight only when no style
      fits, and noted.

## 4. Auto-layout fidelity (blocking)
- [ ] Flex regions are auto-layout frames with matching direction, `gap`, and
      `padding` (defaults: gap 12, horizontal padding 20, `primaryAlign` MIN).
- [ ] Children that fill use `layoutSizing`/`stretch`/`grow`; absolute x/y only
      where the source is genuinely absolute.

## 5. Valid, self-contained output (blocking)
- [ ] The file at the given path is **valid JSON** matching the schema:
      `{ "page": "...", "root": <node> }`.
- [ ] No markdown fences, no prose, nothing else in the file.
- [ ] No other repository file was modified; no Figma tool/MCP was called.

## 6. Fidelity to the running prototype
- [ ] Region order, hierarchy, typography ramp, and colors reflect the running
      prototype at `liveUrl`.
- [ ] Repeated elements are consistent instances.

If any blocking item fails, fix the spec before printing `SPEC_WRITTEN`.
