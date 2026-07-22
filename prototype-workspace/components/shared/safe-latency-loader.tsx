"use client";

/**
 * Re-exports LatencyLoader from @fluentui-copilot/react-latency with a
 * CSS.registerProperty patch that silences "already registered" errors.
 *
 * The library calls CSS.registerProperty on each mount, which throws an
 * InvalidModificationError when multiple LatencyLoader instances render
 * simultaneously. This module-level patch makes that call idempotent.
 */

if (typeof window !== "undefined" && window.CSS?.registerProperty) {
  const original = CSS.registerProperty.bind(CSS);
  CSS.registerProperty = function (definition: PropertyDefinition) {
    try {
      return original(definition);
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.name === "InvalidModificationError"
      ) {
        return; // Property already registered — safe to ignore
      }
      throw e;
    }
  };
}

export { LatencyLoader } from "@fluentui-copilot/react-latency";
