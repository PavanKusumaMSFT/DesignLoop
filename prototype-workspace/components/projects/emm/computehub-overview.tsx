"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Link,
  Card,
  Divider,
} from "@fluentui/react-components";
import {
  Search20Regular,
  ChevronRight12Regular,
  ChevronDown12Regular,
  Sparkle20Regular,
  MoreHorizontal20Regular,
  Dismiss20Regular,
  Search24Regular,
  Grid24Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  pageLayout: {
    display: "flex",
    flex: 1,
  },

  /* ── Left sidebar ─────────────────────── */
  sidebar: {
    width: "220px",
    minWidth: "220px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalM,
    overflowY: "auto",
  },
  sidebarSearch: {
    padding: `0 ${tokens.spacingHorizontalM}`,
    marginBottom: tokens.spacingVerticalS,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  sidebarItemActive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  sidebarExpandable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },

  /* ── Main content ─────────────────────── */
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  /* ── Page header ──────────────────────── */
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  headerTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  pageSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },

  /* ── Copilot pills ────────────────────── */
  copilotPills: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `0 ${tokens.spacingHorizontalL}`,
    marginBottom: tokens.spacingVerticalM,
  },
  copilotIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
  },
  copilotPill: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },

  /* ── Tab bar ──────────────────────────── */
  tabBar: {
    display: "flex",
    alignItems: "flex-end",
    padding: `0 ${tokens.spacingHorizontalL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tabItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
    backgroundColor: "transparent",
    border: "none",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorBrandForeground1,
    cursor: "pointer",
    marginBottom: "-1px",
  },

  /* ── Content area ─────────────────────── */
  contentArea: {
    flex: 1,
    overflowY: "auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  contentInner: {
    maxWidth: "860px",
  },

  /* ── Intro section ────────────────────── */
  introTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
    marginBottom: tokens.spacingVerticalM,
  },
  introDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXXL,
  },
  introLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
  },

  /* ── Two-column cards ─────────────────── */
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  cardIcon: {
    width: "32px",
    height: "32px",
    color: tokens.colorBrandForeground1,
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  cardDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalS,
  },

  /* ── Banner card ──────────────────────── */
  bannerCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  bannerHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  bannerIcon: {
    width: "24px",
    height: "24px",
  },
  bannerTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  bannerDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    paddingLeft: "40px",
  },
  bannerLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    paddingLeft: "40px",
  },

  /* ── Feedback section ─────────────────── */
  feedbackSection: {
    marginTop: tokens.spacingVerticalL,
  },
  feedbackTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  feedbackLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
  },

  /* ── Footer ───────────────────────────── */
  footer: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalL}`,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const sidebarNav = [
  { label: "Overview", active: true },
  { label: "All resources" },
  { label: "Infrastructure", expandable: true },
  { label: "Disks + images", expandable: true },
  { label: "Capacity + placement", expandable: true },
  { label: "Related services", expandable: true },
  { label: "Monitoring+Operations", expandable: true },
  { label: "Help", expandable: true },
];

/** Compute Infrastructure "Get Started" overview page — intro content, product cards, and deployment banner. */
export default function ComputeHubOverview({
  isDarkMode = false,
  onHome,
  onSearchSelect,
}: {
  isDarkMode?: boolean;
  onHome?: () => void;
  onSearchSelect?: (item: string) => void;
}) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP
        isDarkMode={isDarkMode}
        onLogoClick={onHome}
        onSuggestionSelect={onSearchSelect}
      />

      <PageBreadcrumb
        noBorder
        items={[
          { label: "Home", onClick: onHome },
          { label: "Compute infrastructure" },
        ]}
      />

      <div className={styles.pageLayout}>
        {/* ── Sidebar ──────────────────────── */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarSearch}>
            <Input
              size="small"
              contentBefore={<Search20Regular />}
              placeholder="Search"
            />
          </div>
          {sidebarNav.map((item) => (
            <button
              key={item.label}
              className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ""}`}
            >
              {item.expandable && (
                <ChevronRight12Regular />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* ── Main content ─────────────────── */}
        <div className={styles.mainContent}>
          {/* Page header */}
          <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerTitleBlock}>
                <Text className={styles.pageTitle}>
                  Compute infrastructure
                </Text>
                <Text className={styles.pageSubtitle}>Microsoft</Text>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<MoreHorizontal20Regular />}
              />
            </div>
            <div className={styles.headerRight}>
              <Button
                appearance="subtle"
                size="small"
                icon={<Dismiss20Regular />}
              />
            </div>
          </div>

          {/* Copilot pills */}
          <div className={styles.copilotPills}>
            <div className={styles.copilotIcon}>
              <Sparkle20Regular />
            </div>
            <button className={styles.copilotPill}>
              Help me find the best compute solution
            </button>
            <button className={styles.copilotPill}>
              Help me deploy a new VM
            </button>
            <button className={styles.copilotPill}>
              Summarize compute SKUs and pricing
            </button>
          </div>

          {/* Tab bar */}
          <div className={styles.tabBar}>
            <button className={styles.tabItem}>Get started</button>
          </div>

          {/* Content area */}
          <div className={styles.contentArea}>
            <div className={styles.contentInner}>
              {/* Intro */}
              <Text as="h2" className={styles.introTitle}>
                Smart, scalable products to optimize performance, capacity, and
                cost
              </Text>
              <Text as="p" className={styles.introDescription}>
                Explore easy-to-manage VM solutions with built-in scaling, batch
                VM management, and load balancing. Keep total control as you
                scale with a{" "}
                <Link className={styles.introLink}>
                  VM Scale Set (VMSS)
                </Link>{" "}
                or balance workloads across multiple sizes and regions with{" "}
                <Link className={styles.introLink}>
                  Compute Fleet
                </Link>
                . Cutting costs? Score discounted capacity with{" "}
                <Link className={styles.introLink}>
                  Azure Spot
                </Link>
                .
              </Text>

              {/* Two-column cards */}
              <div className={styles.cardsRow}>
                {/* Left card */}
                <div className={styles.card}>
                  <Search24Regular className={styles.cardIcon} />
                  <Text className={styles.cardTitle}>
                    Find the best product for your workload
                  </Text>
                  <Text className={styles.cardDescription}>
                    Answer three quick questions about your workload,
                    environment, and preferred capabilities, and we&apos;ll tell
                    you which product can help you the most.
                  </Text>
                  <div className={styles.cardActions}>
                    <Button appearance="primary" size="small">
                      Find the right VM solution
                    </Button>
                  </div>
                  <Button
                    appearance="outline"
                    size="small"
                    icon={<Sparkle20Regular />}
                  >
                    Product guidance
                  </Button>
                </div>

                {/* Right card */}
                <div className={styles.card}>
                  <Grid24Regular className={styles.cardIcon} />
                  <Text className={styles.cardTitle}>
                    Compare VM products side by side, or just start building
                  </Text>
                  <Text className={styles.cardDescription}>
                    From scalability and capacity to batch management and cost
                    savings, compare features, specs, and key
                    differences—or just start creating.
                  </Text>
                  <div className={styles.cardActions}>
                    <Button appearance="primary" size="small">
                      Compare and create VM solutions
                    </Button>
                  </div>
                </div>
              </div>

              {/* Banner card */}
              <div className={styles.bannerCard}>
                <div className={styles.bannerHeader}>
                  <img
                    src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
                    alt=""
                    className={styles.bannerIcon}
                  />
                  <Text className={styles.bannerTitle}>
                    Create a Linux or Windows VM fast with ready-made
                    deployments
                  </Text>
                </div>
                <Text className={styles.bannerDescription}>
                  Deploy a VM in one click with our Linux, Windows, WordPress,
                  and LAMP stack starter kits — or try our interactive
                  deployments for other workload scenarios.
                </Text>
                <Link className={styles.bannerLink}>
                  Explore starter kits and interactive deployments
                </Link>
              </div>

              {/* Feedback */}
              <div className={styles.feedbackSection}>
                <Text className={styles.feedbackTitle}>Give feedback</Text>
                <Link className={styles.feedbackLink}>
                  Was this page helpful or not? Let us know!
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <Text>Add or remove favorites by pressing Ctrl+Shift+F</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
