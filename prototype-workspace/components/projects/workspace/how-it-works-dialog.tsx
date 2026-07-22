/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Body1,
  Caption1,
  Subtitle2,
  Text,
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
  Info24Regular,
  Dismiss24Regular,
  Lightbulb20Regular,
  Wand20Regular,
  PuzzlePiece20Regular,
  ArrowSync20Regular,
  Code20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TabValue = "overview" | "skills" | "workflow";

interface InfoSection {
  icon: React.ReactNode;
  title: string;
  description: string;
  items?: string[];
}

// ---------------------------------------------------------------------------
// Content data
// ---------------------------------------------------------------------------

const OVERVIEW_SECTIONS: InfoSection[] = [
  {
    icon: <Lightbulb20Regular />,
    title: "What is this workspace?",
    description:
      "A shared prototyping platform for Azure portal UX explorations. Instead of isolated Figma files per team, we build interactive, clickable prototypes — all in one place, using the real Azure design system (Fluent UI v9).",
  },
  {
    icon: <PuzzlePiece20Regular />,
    title: "Compose, don't rebuild",
    description:
      "Shared components are ready to use. Search for existing ones before building new — cross-project imports are encouraged.",
  },
  {
    icon: <Sparkle20Regular />,
    title: "AI-assisted development",
    description:
      "Copilot skills help you build from Figma designs without deep coding knowledge. Paste a screenshot, invoke a skill, and get production-quality Fluent UI code.",
  },
  {
    icon: <ArrowSync20Regular />,
    title: "The flywheel effect",
    description:
      "Every project contributes back: new shared components, better Copilot skills, and richer design patterns. The more teams build, the faster everyone moves.",
  },
];

const SKILLS_DATA: {
  name: string;
  command: string;
  description: string;
  when: string;
}[] = [
  {
    name: "Start Setup",
    command: "/start-setup",
    description:
      "First-run project setup — checks prerequisites, clones the repo, installs dependencies, and starts the dev server.",
    when: "You're setting up the project for the first time",
  },
  {
    name: "Create Project",
    command: "/create-project",
    description:
      "Scaffold a new project with the correct file structure, registry entry, and a standardized summary table.",
    when: "You're starting a new prototype from scratch",
  },
  {
    name: "Figma to Fluent",
    command: "/figma-to-fluent",
    description:
      "Convert a Figma design (screenshot or link) into Fluent UI v9 React code. Automatically searches for existing shared components to reuse.",
    when: "You have a design and need to turn it into code",
  },
  {
    name: "Generate Preview Link",
    command: "/generate-preview-link",
    description:
      "Create a PR that triggers a preview deployment URL for sharing with stakeholders. No install required — anyone can click through your prototype.",
    when: "You're ready to share a clickable prototype for feedback",
  },
  {
    name: "Publish to Production",
    command: "/publish-to-production",
    description:
      "Run component audit + refactor, verify the build, squash-merge to main, and clean up the branch. Your project goes live on the production site.",
    when: "Your prototype is final and ready to go live",
  },
  {
    name: "Delete Preview",
    command: "/delete-preview",
    description:
      "Close the PR, delete the remote branch, and free up the staging slot. Your local code stays intact.",
    when: "You're done experimenting and want to clean up",
  },
];

const AUTOMATED_SKILLS: { name: string; description: string }[] = [
  {
    name: "Component Audit",
    description:
      "Checks for design system violations — hardcoded colors, missed shared components, inline styles.",
  },
  {
    name: "Refactor to System",
    description:
      "Auto-fixes violations: inline styles → makeStyles + tokens, hardcoded colors → Fluent tokens.",
  },
];

const WORKFLOW_STEPS: {
  number: number;
  title: string;
  description: string;
}[] = [
  {
    number: 1,
    title: "Start with a design",
    description:
      "Grab a Figma screenshot, sketch, or even describe what you want to build in plain language.",
  },
  {
    number: 2,
    title: "Use a Copilot skill",
    description:
      "Open Copilot Chat in VS Code and use /create-project to scaffold your project, or /figma-to-fluent to convert a design into code.",
  },
  {
    number: 3,
    title: "Compose from shared components",
    description:
      "Copilot automatically searches for existing components to reuse. You get production-quality code that matches the design system.",
  },
  {
    number: 4,
    title: "Preview and iterate",
    description:
      "Your changes hot-reload in the browser. Refine the layout, adjust content, and use /component-audit to check quality.",
  },
  {
    number: 5,
    title: "Share with stakeholders",
    description:
      "Use /generate-preview-link to create a PR and shareable URL. Anyone can click through your prototype without installing anything.",
  },
  {
    number: 6,
    title: "Publish or clean up",
    description:
      "When you're ready to go live, use /publish-to-production. If you're done experimenting, use /delete-preview to clean up.",
  },
];

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  drawer: {
    width: "500px",
    maxWidth: "90vw",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabList: {
    marginBottom: tokens.spacingVerticalL,
  },
  section: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  sectionIcon: {
    flexShrink: 0,
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorBrandForeground1,
  },
  sectionContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  sectionTitle: {
    display: "block",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  sectionDesc: {
    display: "block",
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  skillCard: {
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    marginBottom: tokens.spacingVerticalS,
  },
  skillHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXS,
  },
  skillCommand: {
    fontFamily: "monospace",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralBackground3,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  skillWhen: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXXS,
  },
  categoryTitle: {
    display: "block",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  },
  stepRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  stepNumber: {
    flexShrink: 0,
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#0078D4",
    color: tokens.colorNeutralForegroundOnBrand,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  dividerSpacingM: {
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
  dividerSpacingLM: {
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalM,
  },
  stepContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  stepTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  stepDesc: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Drawer explaining how the workspace, Copilot skills, shared components, and design-to-code workflow operate. */
export default function HowItWorksDialog({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const styles = useStyles();
  const [tab, setTab] = useState<TabValue>("overview");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        appearance="secondary"
        icon={<Info24Regular />}
        size={size}
        onClick={() => setOpen(true)}
      >
        How It Works
      </Button>

      <OverlayDrawer
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        position="end"
        className={styles.drawer}
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
            How It Works
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
            <TabList
              selectedValue={tab}
              onTabSelect={(_, d) => setTab(d.value as TabValue)}
              className={styles.tabList}
              size="small"
            >
              <Tab value="overview" icon={<Lightbulb20Regular />}>
                Overview
              </Tab>
              <Tab value="skills" icon={<Wand20Regular />}>
                Skills
              </Tab>
              <Tab value="workflow" icon={<Code20Regular />}>
                Workflow
              </Tab>
            </TabList>

              {/* ── Overview tab ── */}
              {tab === "overview" &&
                OVERVIEW_SECTIONS.map((section, i) => (
                  <div key={i} className={styles.section}>
                    <div className={styles.sectionIcon}>{section.icon}</div>
                    <div className={styles.sectionContent}>
                      <Text className={styles.sectionTitle}>
                        {section.title}
                      </Text>
                      <Body1 className={styles.sectionDesc}>
                        {section.description}
                      </Body1>
                    </div>
                  </div>
                ))}

              {/* ── Skills tab ── */}
              {tab === "skills" && (
                <>
                  <Body1 className={styles.sectionDesc}>
                    Open Copilot Chat in VS Code (⌘+Shift+I) and type a skill
                    command to invoke it.
                  </Body1>
                  <Divider className={styles.dividerSpacingM} />
                  {SKILLS_DATA.map((skill) => (
                    <div key={skill.command} className={styles.skillCard}>
                      <div className={styles.skillHeader}>
                        <Wand20Regular />
                        <Subtitle2>{skill.name}</Subtitle2>
                        <span className={styles.skillCommand}>
                          {skill.command}
                        </span>
                      </div>
                      <Body1 className={styles.sectionDesc}>
                        {skill.description}
                      </Body1>
                      <Caption1 className={styles.skillWhen}>
                        When to use: {skill.when}
                      </Caption1>
                    </div>
                  ))}

                  <Divider className={styles.dividerSpacingLM} />
                  <Text className={styles.categoryTitle}>
                    Automated quality checks
                  </Text>
                  <Caption1 className={styles.sectionDesc}>
                    These run automatically when your code is reviewed or
                    promoted to the main branch — no need to invoke them
                    manually.
                  </Caption1>
                  {AUTOMATED_SKILLS.map((skill) => (
                    <div key={skill.name} className={styles.skillCard}>
                      <div className={styles.skillHeader}>
                        <ArrowSync20Regular />
                        <Subtitle2>{skill.name}</Subtitle2>
                      </div>
                      <Caption1 className={styles.sectionDesc}>
                        {skill.description}
                      </Caption1>
                    </div>
                  ))}
                </>
              )}

              {/* ── Workflow tab ── */}
              {tab === "workflow" && (
                <>
                  <Body1 className={styles.sectionDesc}>
                    The design-to-prototype pipeline in 5 steps:
                  </Body1>
                  <Divider className={styles.dividerSpacingM} />
                  {WORKFLOW_STEPS.map((step) => (
                    <div key={step.number} className={styles.stepRow}>
                      <div className={styles.stepNumber}>{step.number}</div>
                      <div className={styles.stepContent}>
                        <Text className={styles.stepTitle}>{step.title}</Text>
                        <Caption1 className={styles.stepDesc}>
                          {step.description}
                        </Caption1>
                      </div>
                    </div>
                  ))}
                </>
              )}
        </DrawerBody>
      </OverlayDrawer>
    </>
  );
}
