# VERIFY — fluent-to-figma

Score the send against these dimensions. All must pass for a successful send.

## 1. Native, editable layers (blocking)
- [ ] The design is real Figma layers — frames, text, vectors — **not** an
      imported screenshot or a single flattened/rasterized image.
- [ ] Text is live editable text nodes with the real copy from the prototype.

## 2. Auto-layout fidelity (blocking)
- [ ] Regions that use `display:flex` in source are **auto-layout frames** with
      matching direction, gap, and padding.
- [ ] Absolute positioning is used only where the source is genuinely absolute.

## 3. Variables, not literals (blocking)
- [ ] Fills, strokes, corner radius, and spacing are bound to Figma **variables**
      mapped from Fluent tokens via `FLUENT_TO_FIGMA`.
- [ ] Any literal hex/px used is only because the variable was missing from the
      target file, and every such fallback is listed in the summary.

## 4. Placement (blocking)
- [ ] Output is a **new Page** named `DesignLoop — <prototypeId>` in the
      user-provided target file.
- [ ] No existing pages, frames, or components in the file were modified.

## 5. Fidelity to the running prototype
- [ ] Layout, hierarchy, typography ramp, and colors visually match the running
      prototype at `liveUrl` (compare against a screenshot of the live route).
- [ ] Repeated primitives (buttons, cards, badges) are consistent.

## 6. Report completeness
- [ ] Returns the Figma page deep link (file URL + new page `node-id`).
- [ ] Reports counts (frames / text nodes) and the unmapped-token fallback list.

If any blocking item fails, the send is not complete — fix and re-run before
reporting success.
