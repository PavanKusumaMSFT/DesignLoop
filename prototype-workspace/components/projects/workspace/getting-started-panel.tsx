/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Body1,
  Caption1,
  Subtitle2,
  Button,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  TabList,
  Tab,
  Divider,
} from "@fluentui/react-components";
import {
  Rocket24Regular,
  Dismiss24Regular,
  WindowDevTools20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";
import CopyButton from "../../shared/copy-button";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Platform = "mac" | "windows";
type OutputMode = "cli" | "copilot";

interface Step {
  number: number;
  title: string;
  description: string;
  command?: { mac: string; windows: string };
  note?: string;
}

// ---------------------------------------------------------------------------
// Step data
// ---------------------------------------------------------------------------

const SETUP_STEPS: Step[] = [
  {
    number: 1,
    title: "Set up your GitHub account",
    description:
      "Create your GitHub Enterprise for Microsoft account (username: your-alias_microsoft). Then join the required organizations.",
    note: "Join ms-copilot (for GHCP enterprise models) and azure-core (for repo access). Install the GitHub Copilot + Copilot Chat extensions in VS Code.",
  },
  {
    number: 2,
    title: "Install dev tools",
    description:
      "Make sure you have Node.js 20+ and pnpm installed. If you don't have pnpm, install it globally.",
    command: {
      mac: "# Install Node.js via Homebrew (if needed)\nbrew install node\n\n# Install pnpm\nnpm install -g pnpm",
      windows:
        "# Install Node.js from https://nodejs.org (LTS 20+)\n# Then install pnpm:\nnpm install -g pnpm",
    },
    note: "Already have Node.js 20+? Skip to step 3.",
  },
  {
    number: 3,
    title: "Clone & set up the repo",
    description: "Clone the repo and install dependencies.",
    command: {
      mac: "git clone https://github.com/azure-core/azure-portal-poc.git\ncd azure-portal-poc\npnpm install",
      windows:
        "git clone https://github.com/azure-core/azure-portal-poc.git\ncd azure-portal-poc\npnpm install",
    },
  },
  {
    number: 4,
    title: "Start the dev server",
    description:
      "Run the local development server. The app will be available at http://localhost:3000.",
    command: {
      mac: "pnpm dev",
      windows: "pnpm dev",
    },
    note: "Open http://localhost:3000/workspace to see this page.",
  },
  {
    number: 5,
    title: "Create your project",
    description:
      'Use the "Create Project" button on this page, fill in the details, then paste the generated command or Copilot prompt.',
    note: "After running the command, restart the dev server to see your new project in the sidebar.",
  },
];

const COPILOT_PROMPT = `I need to set up the Azure Portal POC project. Please do the following:

1. Check if I have Node.js 20+ and pnpm installed — if not, install them
2. Clone the repo: git clone https://github.com/azure-core/azure-portal-poc.git
3. cd into azure-portal-poc and run pnpm install to install dependencies
4. Start the dev server with pnpm dev`;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  topControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalS,
    flexShrink: 0,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalM,
  },
  // -- Copilot mode: single prompt hero --
  copilotHero: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
  },
  copilotLabel: {
    color: tokens.colorNeutralForeground2,
  },
  copilotBlock: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    paddingRight: "44px",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    position: "relative" as const,
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
  copilotStepList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
  },
  copilotStepItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  copilotStepDot: {
    width: "6px",
    height: "6px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#0078D4",
    flexShrink: 0,
    marginTop: "7px",
  },
  copilotStepText: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  // -- Terminal mode: step-by-step --
  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
    marginTop: tokens.spacingVerticalM,
  },
  step: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  stepNumber: {
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#0078D4",
    color: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
    marginTop: tokens.spacingVerticalXXS,
  },
  stepContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  stepDescription: {
    color: tokens.colorNeutralForeground2,
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    paddingRight: "40px",
    fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    position: "relative" as const,
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
  blockCopyBtn: {
    position: "absolute" as const,
    top: tokens.spacingVerticalXS,
    right: tokens.spacingHorizontalXS,
  },
  noteText: {
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
});

// ---------------------------------------------------------------------------
// GettingStartedDialog
// ---------------------------------------------------------------------------

/** Side drawer for first-time repo setup.
 * Terminal mode: step-by-step commands with platform toggle.
 * Copilot mode: single combined prompt — paste into Copilot Chat or GHCP CLI. */
export default function GettingStartedDrawer() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("mac");
  const [outputMode, setOutputMode] = useState<OutputMode>("cli");

  return (
    <>
      <Button
        appearance="secondary"
        icon={<Rocket24Regular />}
        onClick={() => setOpen(true)}
      >
        Get Started
      </Button>

      <OverlayDrawer
        open={open}
        onOpenChange={(_e, data) => setOpen(data.open)}
        position="end"
        size="medium"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            First-Time Setup
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <div className={styles.topControls}>
            <TabList
              size="small"
              selectedValue={platform}
              onTabSelect={(_e, data) => setPlatform(data.value as Platform)}
              style={{
                visibility: outputMode === "copilot" ? "hidden" : "visible",
              }}
            >
              <Tab value="mac">macOS</Tab>
              <Tab value="windows">Windows</Tab>
            </TabList>

            <TabList
              size="small"
              selectedValue={outputMode}
              onTabSelect={(_e, data) =>
                setOutputMode(data.value as OutputMode)
              }
            >
              <Tab value="cli" icon={<WindowDevTools20Regular />}>
                Terminal
              </Tab>
              <Tab value="copilot" icon={<Sparkle20Regular />}>
                Copilot
              </Tab>
            </TabList>
          </div>

          {outputMode === "copilot" ? (
            /* ── Copilot mode: single prompt + step summary ── */
            <div className={styles.copilotHero}>
              <Body1 className={styles.copilotLabel}>
                Paste this into Copilot Chat or GitHub Copilot CLI in VS Code:
              </Body1>
              <div className={styles.copilotBlock}>
                {COPILOT_PROMPT}
                <CopyButton
                  text={COPILOT_PROMPT}
                  className={styles.blockCopyBtn}
                />
              </div>

              <Divider />

              <Subtitle2>Before you start</Subtitle2>
              <div className={styles.copilotStepList}>
                <div className={styles.copilotStepItem}>
                  <div className={styles.copilotStepDot} />
                  <Caption1 className={styles.copilotStepText}>
                    Create your GitHub Enterprise for Microsoft account
                    (your-alias_microsoft)
                  </Caption1>
                </div>
                <div className={styles.copilotStepItem}>
                  <div className={styles.copilotStepDot} />
                  <Caption1 className={styles.copilotStepText}>
                    Join ms-copilot org (GHCP enterprise models) and azure-core
                    org (repo access)
                  </Caption1>
                </div>
                <div className={styles.copilotStepItem}>
                  <div className={styles.copilotStepDot} />
                  <Caption1 className={styles.copilotStepText}>
                    Install GitHub Copilot + Copilot Chat extensions in VS Code
                  </Caption1>
                </div>
              </div>
            </div>
          ) : (
            /* ── Terminal mode: step-by-step ── */
            <div className={styles.stepsContainer}>
              {SETUP_STEPS.map((step) => (
                <div key={step.number} className={styles.step}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepContent}>
                    <Subtitle2>{step.title}</Subtitle2>
                    <Body1 className={styles.stepDescription}>
                      {step.description}
                    </Body1>

                    {step.command && (
                      <div className={styles.codeBlock}>
                        {step.command[platform]}
                        <CopyButton
                          text={step.command[platform]}
                          className={styles.blockCopyBtn}
                        />
                      </div>
                    )}

                    {step.note && (
                      <Caption1 className={styles.noteText}>
                        {step.note}
                      </Caption1>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
      </OverlayDrawer>
    </>
  );
}
