import {
  createLightTheme,
  webLightTheme,
  type BrandVariants,
  type Theme,
} from "@fluentui/react-components";

// Azure brand ramp anchored on the three PRD blues.
// 80 = #0078D4 (primary), 70 = #106EBE (hover/pressed), 60 = #005A9E (active/deep).
// The three anchors are the source of truth; remaining stops are perceptually-spaced
// fills so Fluent's token recipes resolve correctly.
const azureBrandRamp: BrandVariants = {
  10: "#020A13",
  20: "#0E2A47",
  30: "#00375F",
  40: "#00456E",
  50: "#00568A",
  60: "#005A9E", // active / deep    (PRD)
  70: "#106EBE", // hover / pressed  (PRD)
  80: "#0078D4", // primary          (PRD)
  90: "#2B88D8",
  100: "#4A9BE0",
  110: "#69ADE7",
  120: "#89C0EE",
  130: "#A9D2F4",
  140: "#C7E0F9",
  150: "#E1EEFB",
  160: "#F3F9FE",
};

const azureLight: Theme = {
  ...createLightTheme(azureBrandRamp),
};

/**
 * Azure sign-in / login theme. `webLightTheme` base merged with an Azure brand ramp
 * built via `createLightTheme` from the three PRD brand blues. Wrap the login surface
 * in a `FluentProvider theme={azureLoginTheme}`.
 */
export const azureLoginTheme: Theme = {
  ...webLightTheme,
  ...azureLight,
};
