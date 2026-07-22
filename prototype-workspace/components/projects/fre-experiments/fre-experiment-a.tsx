/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Link,
  Card,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Money24Regular,
  CloudCube24Regular,
  Open16Regular,
  Copy16Regular,
  Checkmark16Regular,
} from "@fluentui/react-icons";
import TerminalDrawer from "./terminal-drawer";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    alignItems: "center",
    width: "960px",
    maxWidth: "100%",
    paddingTop: "48px",
    paddingBottom: "96px",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    lineHeight: tokens.lineHeightHero900,
  },

  /* Credit badge */
  creditBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    width: "100%",
    overflow: "hidden",
  },
  creditLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flex: 1,
    minWidth: 0,
  },
  creditIcon: {
    flexShrink: 0,
    color: tokens.colorBrandForeground2,
  },
  creditTextGroup: {
    display: "flex",
    flexDirection: "column",
  },
  creditAmount: {
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    color: tokens.colorBrandForeground2,
  },
  creditAmountBold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  creditExpiry: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },

  /* Two-column cards */
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    width: "100%",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: "64px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    overflow: "hidden",
    height: "522px",
  },
  cardHeaderSection: {
    display: "flex",
    flexDirection: "column",
  },
  cardHeaderInner: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorBrandBackground2,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },
  cardDescription: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },

  /* Service action rows */
  actionList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "100%",
  },
  actionItem: {
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusLarge,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  actionItemStatic: {
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusLarge,
  },
  actionItemFlex1: {
    flex: 1,
  },
  actionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  actionDesc: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground3,
  },

  /* Deploy model buttons */
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },

  /* Card footer link */
  cardFooter: {
    position: "absolute",
    bottom: tokens.spacingVerticalL,
    left: tokens.spacingHorizontalL,
    display: "flex",
    alignItems: "center",
    height: "32px",
  },
  cardLink: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },

  /* Bottom banner */
  banner: {
    display: "flex",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    width: "100%",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flex: 1,
    minWidth: 0,
  },
  bannerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  bannerCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    flex: 1,
    maxWidth: "800px",
    minWidth: 0,
  },
  bannerTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },
  bannerDesc: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  cliBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    justifyContent: "center",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    width: "100%",
  },
  cliText: {
    flex: 1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    fontFamily: "'Cascadia Code', 'Consolas', monospace",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  copyButton: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground3,
    padding: 0,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
});

interface FreExperimentAProps {
  isDarkMode?: boolean;
  userName?: string;
}

const CLI_COMMAND =
  "Copy npm install commands to add GitHub Copilot CLI and Azure skills";

const services = [
  {
    name: "Virtual machine",
    desc: "Run Windows or Linux machines with maximum control over your compute environment.",
  },
  {
    name: "Storage account",
    desc: "Store and access files or backups reliably without running any compute.",
  },
  {
    name: "Azure SQL database",
    desc: "Store structured data with built\u2011in reliability, queries, and transactions.",
  },
  {
    name: "Web Apps",
    desc: "Run your website or API without setting up or managing servers.",
  },
];

const aiSections = [
  {
    name: "Set up a new project",
    desc: "Start by creating a project in Microsoft Foundry, then explore playgrounds and build AI solutions with models.",
  },
  {
    name: "Deploy a model",
    desc: "Browse popular AI models from Microsoft and others.",
    buttons: ["See popular models", "See all models"],
    static: true,
  },
  {
    name: "Create an AI agent",
    desc: "Build intelligent agents with a designated role, your data, and a powerful AI model.",
  },
];

/** Experiment A: FRE with dynamic model list layout — two-column card design. */
export default function FreExperimentA({
  isDarkMode = false,
  userName = "Connie",
}: FreExperimentAProps) {
  const styles = useStyles();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "npm install @anthropic-ai/sdk @azure/identity"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Title */}
        <Text as="h1" className={styles.title}>
          Let&apos;s start building, {userName}
        </Text>

        {/* Credit badge */}
        <div className={styles.creditBadge}>
          <div className={styles.creditLeft}>
            <Money24Regular className={styles.creditIcon} />
            <div className={styles.creditTextGroup}>
              <Text className={styles.creditAmount}>
                <span className={styles.creditAmountBold}>$200 </span>
                in credits remaining
              </Text>
              <Text className={styles.creditExpiry}>
                Expires May 25, 2026
              </Text>
            </div>
          </div>
          <Button
            appearance="secondary"
            size="medium"
            onClick={() => router.push("/fre-experiments/experiment-a/upgrade")}
          >
            Upgrade to pay-as-you-go
          </Button>
        </div>

        {/* Two-column cards */}
        <div className={styles.cardsRow}>
          {/* Left card — Create a resource */}
          <div className={styles.card}>
            <div className={styles.cardHeaderSection}>
              <div className={styles.cardHeaderInner}>
                <div className={styles.iconContainer}>
                  <CloudCube24Regular
                    style={{ color: tokens.colorBrandForeground1 }}
                  />
                </div>
                <Text className={styles.cardTitle}>Create a resource</Text>
              </div>
              <Text className={styles.cardDescription}>
                Spin up core infrastructure so you can test, launch, or scale
                your app in the cloud.
              </Text>
            </div>

            <div className={styles.actionList}>
              {services.map((svc) => (
                <div
                  key={svc.name}
                  className={styles.actionItem}
                  onClick={
                    svc.name === "Virtual machine"
                      ? () => router.push("/fre-experiments/experiment-a/create-vm")
                      : svc.name === "Storage account"
                      ? () => router.push("/fre-experiments/experiment-a/create-storage")
                      : svc.name === "Azure SQL database"
                      ? () => router.push("/fre-experiments/experiment-a/create-sql")
                      : svc.name === "Web Apps"
                      ? () => router.push("/fre-experiments/experiment-a/create-webapp")
                      : undefined
                  }
                >
                  <Text className={styles.actionTitle}>{svc.name}</Text>
                  <Text className={styles.actionDesc}>{svc.desc}</Text>
                </div>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <Link className={styles.cardLink} href="#" onClick={(e) => { e.preventDefault(); router.push("/fre-experiments/experiment-a/all-services"); }}>
                See all services
              </Link>
            </div>
          </div>

          {/* Right card — Build AI solutions */}
          <div className={styles.card}>
            <div className={styles.cardHeaderSection}>
              <div className={styles.cardHeaderInner}>
                <div className={styles.iconContainer}>
                  <img
                    src="/icons/aifoundry-glyph.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <Text className={styles.cardTitle}>Build AI solutions</Text>
              </div>
              <Text className={styles.cardDescription}>
                Design agents, workflows, and models in a unified AI development
                environment.
              </Text>
            </div>

            <div
              className={styles.actionList}
            >
              {aiSections.map((section) => (
                <div key={section.name}>
                  <div
                    className={section.static ? styles.actionItemStatic : styles.actionItem}
                    onClick={
                      section.name === "Set up a new project"
                        ? () => router.push("/fre-experiments/experiment-a/ai-foundry?modal=create")
                        : section.name === "Create an AI agent"
                        ? () => router.push("/fre-experiments/experiment-a/ai-foundry?modal=create&source=agents")
                        : undefined
                    }
                    style={section.name === "Set up a new project" || section.name === "Create an AI agent" ? { cursor: "pointer" } : undefined}
                  >
                    <Text className={styles.actionTitle}>{section.name}</Text>
                    <Text className={styles.actionDesc}>{section.desc}</Text>
                  </div>
                  {section.buttons && (
                    <div className={styles.actionButtons}>
                      {section.buttons.map((label) => (
                        <Button
                          key={label}
                          appearance="outline"
                          size="small"
                          onClick={
                            label === "See all models"
                              ? () => router.push("/fre-experiments/experiment-a/ai-foundry?modal=create&source=models")
                              : label === "See popular models"
                              ? () => router.push("/fre-experiments/experiment-a/foundry-catalog")
                              : undefined
                          }
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <Link className={styles.cardLink} href="#" onClick={(e) => { e.preventDefault(); router.push("/fre-experiments/experiment-a/ai-foundry"); }}>
                Go to Microsoft Foundry{" "}
                <Open16Regular />
              </Link>
            </div>
          </div>
        </div>

        {/* Work from your terminal banner */}
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerTop}>
              <div className={styles.bannerCopy}>
                <Text className={styles.bannerTitle}>
                  Work from your terminal
                </Text>
                <Text className={styles.bannerDesc}>
                  Install{" "}
                  <Link href="#" inline>
                    GitHub Copilot CLI
                  </Link>{" "}
                  to write, test, debug, and deploy code to Azure directly from
                  your terminal.
                </Text>
              </div>
              <Button appearance="outline" size="medium" onClick={() => setDrawerOpen(true)}>
                Learn more
              </Button>
            </div>
            <div className={styles.cliBar}>
              <span className={styles.cliText}>{CLI_COMMAND}</span>
              <button
                className={styles.copyButton}
                onClick={handleCopy}
                aria-label="Copy command"
              >
                {copied ? (
                  <Checkmark16Regular />
                ) : (
                  <Copy16Regular />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <TerminalDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
