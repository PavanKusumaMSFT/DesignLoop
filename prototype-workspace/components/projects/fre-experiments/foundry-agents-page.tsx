/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
} from "@fluentui/react-components";
import {
  Search20Regular,
  Dismiss16Regular,
  Bot24Regular,
  Home20Regular,
  PeopleTeam20Regular,
  PlugConnected20Regular,
  BrainCircuit20Regular,
  Bookmark20Regular,
  Organization20Regular,
  Code20Regular,
  DocumentText20Regular,
  AppGeneric20Regular,
  Shield20Regular,
  TableSimple20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navItems = ["Home", "Discover", "Build", "Operate", "Docs"];

const askAiSuggestions = [
  "What are common use cases for an agent?",
  "What RBAC roles do I need to build an agent?",
  "Is there support for multi-agent flows?",
];

const sidebarIcons = [
  { icon: Home20Regular, label: "Home" },
  { icon: PeopleTeam20Regular, label: "Agents", active: true },
  { icon: PlugConnected20Regular, label: "Connections" },
  { icon: BrainCircuit20Regular, label: "Models" },
  { icon: Bookmark20Regular, label: "Bookmarks" },
  { icon: Organization20Regular, label: "Organization" },
  { icon: Code20Regular, label: "Playground" },
  { icon: DocumentText20Regular, label: "Documents" },
  { icon: AppGeneric20Regular, label: "Apps" },
  { icon: Shield20Regular, label: "Safety" },
  { icon: TableSimple20Regular, label: "Data" },
];

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    overflow: "hidden",
  },

  /* Top nav */
  topNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "48px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: "transparent",
    flexShrink: 0,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  navLogoImg: {
    width: "20px",
    height: "20px",
  },
  navTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  navBreadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.6)",
  },
  navCenter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.6)",
    backgroundColor: "transparent",
    borderRadius: "9999px",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "4px 16px",
    cursor: "pointer",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLink: {
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    ":hover": { color: "#ffffff" },
  },
  navLinkActive: {
    color: "#ffffff",
    fontWeight: tokens.fontWeightSemibold,
  },
  navIcons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  navAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#643fb2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
  },

  /* Body layout */
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  /* Sidebar */
  sidebar: {
    width: "48px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    gap: tokens.spacingVerticalXXS,
    borderRight: "1px solid rgba(255,255,255,0.08)",
    overflowY: "auto",
  },
  sidebarItem: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    color: "rgba(255,255,255,0.5)",
    background: "none",
    border: "none",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
      color: "#ffffff",
    },
  },
  sidebarItemActive: {
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#ffffff",
  },

  /* Main content */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  /* Page header */
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    flexShrink: 0,
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  pageActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },

  /* Ask AI bar */
  askAiBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXXL}`,
    flexShrink: 0,
  },
  askAiLabel: {
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.5)",
    flexShrink: 0,
  },
  askAiChips: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap" as const,
  },
  askAiChip: {
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.8)",
    background: "none",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "9999px",
    padding: "4px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap" as const,
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.06)",
      borderColor: "rgba(255,255,255,0.3)",
    },
  },
  askAiDismiss: {
    color: "rgba(255,255,255,0.4)",
    cursor: "pointer",
    background: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    ":hover": { color: "rgba(255,255,255,0.7)" },
  },

  /* Empty state */
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalL,
  },
  emptyIcon: {
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.15)",
    marginBottom: tokens.spacingVerticalS,
  },
  emptyTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  emptyDesc: {
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.5)",
    marginTop: `-${tokens.spacingVerticalS}`,
  },
  emptyActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface FoundryAgentsPageProps {
  onBack?: () => void;
}

/** Azure AI Foundry "Agents" page — dark themed empty state with sidebar. */
export default function FoundryAgentsPage({ onBack }: FoundryAgentsPageProps) {
  const styles = useStyles();
  const router = useRouter();
  const [showAskAi, setShowAskAi] = useState(true);

  return (
    <div className={styles.page}>
      {/* ─── Top Nav ─── */}
      <nav className={styles.topNav}>
        <div className={styles.navLeft}>
          <div className={styles.navLogo}>
            <img
              src="/icons/aifoundry-glyph.svg"
              alt=""
              className={styles.navLogoImg}
            />
            <Text className={styles.navTitle}>Azure AI Foundry</Text>
          </div>
          <div className={styles.navBreadcrumb}>
            <span>/</span>
            <span style={{ color: "#ffffff" }}>my-first-project ⌃</span>
          </div>
        </div>

        <div className={styles.navCenter}>
          <Search20Regular style={{ fontSize: "14px" }} />
          <span>Search with AI (Ctrl + K)</span>
          <span style={{ marginLeft: "4px", fontSize: "12px" }}>🎤</span>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <button
                key={item}
                className={styles.navLink}
                style={item === "Build" ? { color: "#ffffff", fontWeight: 600 } : undefined}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.navIcons}>
            <span style={{ color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>⇄</span>
            <div className={styles.navAvatar}>M</div>
          </div>
        </div>
      </nav>

      {/* ─── Body ─── */}
      <div className={styles.body}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {sidebarIcons.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={styles.sidebarItem}
                style={item.active ? { backgroundColor: "rgba(255,255,255,0.12)", color: "#ffffff" } : undefined}
                title={item.label}
              >
                <Icon style={{ fontSize: "20px" }} />
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div className={styles.main}>
          {/* Page header */}
          <div className={styles.pageHeader}>
            <Text className={styles.pageTitle}>Agents</Text>
            <div className={styles.pageActions}>
              <Button
                appearance="primary"
                size="medium"
                style={{ backgroundColor: "#643fb2", borderColor: "#643fb2", borderRadius: "9999px" }}
              >
                Create agent
              </Button>
              <Button
                appearance="secondary"
                size="medium"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  borderRadius: "9999px",
                }}
              >
                Browse catalog
              </Button>
            </div>
          </div>

          {/* Ask AI bar */}
          {showAskAi && (
            <div className={styles.askAiBar}>
              <Text className={styles.askAiLabel}>Ask AI</Text>
              <div className={styles.askAiChips}>
                {askAiSuggestions.map((q) => (
                  <button key={q} className={styles.askAiChip}>
                    {q}
                  </button>
                ))}
              </div>
              <button
                className={styles.askAiDismiss}
                onClick={() => setShowAskAi(false)}
              >
                <Dismiss16Regular />
              </button>
            </div>
          )}

          {/* Empty state */}
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bot24Regular style={{ width: "80px", height: "80px" }} />
            </div>
            <Text className={styles.emptyTitle}>Create your first agent.</Text>
            <Text className={styles.emptyDesc}>
              Agents you create will appear here.
            </Text>
            <div className={styles.emptyActions}>
              <Button
                appearance="secondary"
                size="medium"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  borderRadius: "9999px",
                }}
              >
                Create agent
              </Button>
              <Button
                appearance="secondary"
                size="medium"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  borderRadius: "9999px",
                }}
              >
                Browse catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
