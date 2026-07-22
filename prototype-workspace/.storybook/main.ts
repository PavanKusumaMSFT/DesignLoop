import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(Array.isArray(config.resolve.alias) ? {} : config.resolve.alias),
      "@": resolve(__dirname, ".."),
    };
    return config;
  },
};

export default config;
