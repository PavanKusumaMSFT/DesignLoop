/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
} from "@fluentui/react-components";
import {
  Search20Regular,
  Heart16Regular,
  Play16Regular,
  ChevronDown12Regular,
  ChevronRight12Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navItems = ["Home", "Discover", "Build", "Operate", "Docs"];

const sidebarItems = [
  { label: "Overview", icon: "overview" },
  { label: "Agents", icon: "agents" },
  { label: "Models", icon: "models", active: true },
  { label: "Tools", icon: "tools" },
  { label: "Solution templates", icon: "templates" },
];

const filterSections = [
  { label: "Collections", open: true },
  { label: "Sources", open: false },
  { label: "Industry", open: false },
  { label: "Capabilities", open: false },
  { label: "Deployment options", open: false },
  { label: "Inference tasks", open: false },
  { label: "Fine-tuning tasks", open: false },
  { label: "Licenses", open: false },
];

const models = [
  { name: "o3-pro", type: "Responses", provider: "openai" },
  { name: "codex-mini", type: "Responses", provider: "openai" },
  { name: "sora", type: "Video generation", provider: "openai" },
  { name: "o3", type: "Chat completion", provider: "openai" },
  { name: "o4-mini", type: "Chat completion", provider: "openai" },
  { name: "gpt-image-1", type: "Text to image", provider: "openai" },
  { name: "gpt-4.1", type: "Chat completion", provider: "openai" },
  { name: "gpt-4.1-mini", type: "Chat completion", provider: "openai" },
  { name: "gpt-4.1-nano", type: "Chat completion", provider: "openai" },
  { name: "gpt-4.5-preview", type: "Chat completion", provider: "openai" },
  { name: "o3-mini", type: "Chat completion", provider: "openai" },
  { name: "model-router", type: "Chat completion", provider: "openai" },
  { name: "MAI-DS-R1", type: "Chat completion", provider: "microsoft" },
  { name: "EvoDiff", type: "Protein sequence generation", provider: "microsoft" },
  { name: "Phi-4-reasoning", type: "Chat completion", provider: "microsoft" },
  { name: "Phi-4-mini-reasoning", type: "Chat completion", provider: "microsoft" },
  { name: "mistral-medium-2505", type: "Chat completion, image classification", provider: "mistral" },
  { name: "cohere-command-a", type: "Chat completion", provider: "cohere" },
  { name: "embed-v-4-0", type: "Embeddings, summarization", provider: "cohere" },
  { name: "DeepSeek-V3-0324", type: "Chat completion", provider: "deepseek" },
  { name: "DeepSeek-R1-0528", type: "Chat completion", provider: "deepseek" },
  { name: "Llama-4-Scout-17B-16E-Instruct", type: "Chat completion", provider: "meta" },
  { name: "Llama-4-Maverick-17B-128E-I...", type: "Chat completion", provider: "meta" },
  { name: "Llama-4-Scout-17B-16E", type: "Chat completion", provider: "meta" },
  { name: "mistral-small-2503", type: "Chat completion, image classification", provider: "mistral" },
  { name: "mistral-ocr-2503", type: "Image to text", provider: "mistral" },
  { name: "Virchow", type: "Image feature extraction", provider: "microsoft" },
  { name: "Virchow2", type: "Image feature extraction", provider: "microsoft" },
  { name: "Prism", type: "Zero-shot image classification", provider: "microsoft" },
  { name: "snowflake-artic-base", type: "Text generation", provider: "snowflake" },
  { name: "Bria-2.3-Fast", type: "Text to image", provider: "bria" },
  { name: "Muse", type: "Image to image", provider: "microsoft" },
  { name: "Muse", type: "Image to image", provider: "microsoft" },
];

const providerColors: Record<string, string> = {
  openai: "#10a37f",
  microsoft: "#00a4ef",
  mistral: "#f97316",
  meta: "#0668e1",
  deepseek: "#4f8cf7",
  cohere: "#d946ef",
  snowflake: "#29b5e8",
  bria: "#a855f7",
};

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
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
    ":hover": {
      color: "#ffffff",
    },
  },
  navLinkActive: {
    color: "#ffffff",
    fontWeight: tokens.fontWeightSemibold,
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
  },

  /* Body layout */
  body: {
    display: "flex",
    flex: 1,
  },

  /* Left sidebar */
  sidebar: {
    width: "200px",
    flexShrink: 0,
    borderRight: "1px solid rgba(255,255,255,0.08)",
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: "8px 12px",
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    textAlign: "left" as const,
    width: "100%",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.06)",
    },
  },
  sidebarItemActive: {
    backgroundColor: "#643fb2",
    color: "#ffffff",
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      backgroundColor: "#7551c7",
    },
  },

  /* Main content area */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  /* Header row */
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 32px 16px",
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  headerActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },

  /* Search */
  searchBar: {
    padding: "0 32px 16px",
  },

  /* Content row: filters + grid */
  contentRow: {
    display: "flex",
    flex: 1,
    overflowY: "auto" as const,
    padding: "0 32px 32px",
    gap: "24px",
  },

  /* Filter sidebar */
  filterPanel: {
    width: "180px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  filterItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 0",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: tokens.fontSizeBase300,
    fontFamily: "inherit",
    ":hover": {
      color: "rgba(255,255,255,0.8)",
    },
  },
  filterChevron: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
  },
  filterToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0",
    marginTop: "8px",
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.6)",
  },

  /* Model grid */
  modelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    flex: 1,
  },
  modelCard: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: "12px 14px",
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.04)",
    },
  },
  modelIcon: {
    width: "32px",
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
  },
  modelInfo: {
    flex: 1,
    minWidth: 0,
  },
  modelName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    color: "#ffffff",
    display: "block" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  modelType: {
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.5)",
    display: "block" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  modelStats: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: "4px",
  },
  modelStat: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    fontSize: tokens.fontSizeBase100,
    color: "rgba(255,255,255,0.4)",
  },

  /* Sort + load more */
  sortRow: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 32px 12px",
  },
  sortSelect: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.6)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  loadMore: {
    textAlign: "center" as const,
    padding: "16px 0",
    color: "#7B68EE",
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    ":hover": {
      textDecoration: "underline" as const,
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface ModelCatalogPageProps {
  onBack?: () => void;
}

/** Azure AI Foundry model catalog page — dark themed with left sidebar and model grid. */
export default function ModelCatalogPage({ onBack }: ModelCatalogPageProps) {
  const styles = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const getProviderIcon = (provider: string) => {
    if (provider === "microsoft") {
      return (
        <img
          src="/icons/microsoft-logo.svg"
          alt=""
          style={{ width: "16px", height: "16px" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      );
    }
    return (
      <span style={{ fontSize: "12px", color: providerColors[provider] || "#888" }}>
        ✦
      </span>
    );
  };

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
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <Text className={styles.navTitle}>Azure AI Foundry</Text>
          </div>
          <div className={styles.navBreadcrumb}>
            <span>›</span>
            <span style={{ color: "#ffffff" }}>project-name123</span>
            <span style={{ fontSize: "10px", opacity: 0.5 }}>☁</span>
          </div>
        </div>

        <div className={styles.navCenter} role="search" aria-label="Search with AI">
          <Search20Regular style={{ fontSize: "14px" }} />
          <span>Search with AI</span>
          <span style={{ marginLeft: "8px", fontSize: "11px", opacity: 0.6, display: "flex", gap: "2px" }}>
            <kbd style={{ padding: "1px 4px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "3px", fontSize: "11px" }}>⌘</kbd>
            <kbd style={{ padding: "1px 4px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "3px", fontSize: "11px" }}>K</kbd>
          </span>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <button
                key={item}
                className={`${styles.navLink} ${item === "Discover" ? styles.navLinkActive : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.navAvatar}>M</div>
        </div>
      </nav>

      {/* ─── Body ─── */}
      <div className={styles.body}>
        {/* Left sidebar */}
        <div className={styles.sidebar}>
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className={styles.main}>
          {/* Header */}
          <div className={styles.headerRow}>
            <Text className={styles.pageTitle}>Models (1,200)</Text>
            <div className={styles.headerActions}>
              <Button
                appearance="secondary"
                size="small"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  borderRadius: "6px",
                }}
              >
                View leaderboard
              </Button>
              <Button
                appearance="primary"
                size="small"
                style={{
                  backgroundColor: "#643fb2",
                  borderColor: "#643fb2",
                  borderRadius: "6px",
                }}
              >
                Compare models
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className={styles.searchBar}>
            <Input
              contentBefore={<Search20Regular style={{ color: "rgba(255,255,255,0.4)" }} />}
              placeholder="Search"
              value={search}
              onChange={(_, data) => setSearch(data.value)}
              input={{ style: { color: "#ffffff" } }}
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.1)",
                color: "#ffffff",
                width: "100%",
              }}
            />
          </div>

          {/* Sort row */}
          <div className={styles.sortRow}>
            <button className={styles.sortSelect}>
              Sort by: Most popular <ChevronDown12Regular />
            </button>
          </div>

          {/* Filters + Grid */}
          <div className={styles.contentRow}>
            {/* Filter panel */}
            <div className={styles.filterPanel}>
              {filterSections.map((section) => (
                <button key={section.label} className={styles.filterItem}>
                  {section.open ? (
                    <ChevronDown12Regular className={styles.filterChevron} />
                  ) : (
                    <ChevronRight12Regular className={styles.filterChevron} />
                  )}
                  {section.label}
                </button>
              ))}
              <div className={styles.filterToggle}>
                <div
                  style={{
                    width: "32px",
                    height: "18px",
                    borderRadius: "9px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: "#888",
                      position: "absolute",
                      top: "2px",
                      left: "2px",
                    }}
                  />
                </div>
                FDP supported ⓘ
              </div>
            </div>

            {/* Model grid */}
            <div style={{ flex: 1 }}>
              <div className={styles.modelGrid}>
                {models.map((model, i) => (
                  <div key={`${model.name}-${i}`} className={styles.modelCard}>
                    <div
                      className={styles.modelIcon}
                      style={{
                        backgroundColor: i < 9 ? "transparent" : `${providerColors[model.provider] || "#888"}20`,
                      }}
                    >
                      {i < 9 ? (
                        <img
                          src="/icons/model-sparkle.svg"
                          alt=""
                          style={{ width: "32px", height: "32px", borderRadius: "6px" }}
                        />
                      ) : (
                        getProviderIcon(model.provider)
                      )}
                    </div>
                    <div className={styles.modelInfo}>
                      <Text className={styles.modelName}>{model.name}</Text>
                      <Text className={styles.modelType}>{model.type}</Text>
                      <div className={styles.modelStats}>
                        <span className={styles.modelStat}>
                          <Heart16Regular style={{ fontSize: "12px" }} /> 1,425
                        </span>
                        <span className={styles.modelStat}>
                          <Play16Regular style={{ fontSize: "12px" }} /> 2,345
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <button className={styles.loadMore}>Load more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
