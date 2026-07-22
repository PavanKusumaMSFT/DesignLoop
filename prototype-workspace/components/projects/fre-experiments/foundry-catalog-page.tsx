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
import { Open12Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const popularModels = [
  {
    name: "gpt-5.1",
    icon: "/icons/openai.svg",
    description:
      "gpt-5.1 is designed for logic-heavy and multi-step tasks.",
  },
  {
    name: "claude-opus-4-7",
    icon: "anthropic",
    description:
      "Anthropic\u2019s most capable public model across coding, enterprise workflows, and long-running agentic tasks.",
  },
  {
    name: "claude-sonnet-4-6",
    icon: "anthropic",
    description:
      "Claude Sonnet 4.6 delivering frontier intelligence at scale for most use cases, including coding and agents.",
  },
  {
    name: "gpt-5.1-codex",
    icon: "/icons/openai.svg",
    description:
      "gpt-5.1-codex is designed for steerability, front end development, and interactivity.",
  },
  {
    name: "claude-haiku-4-5",
    icon: "anthropic",
    description:
      "Anthropic\u2019s fastest and most intelligent Haiku model. Near-frontier intelligence at blazing speeds with extended thinking and exceptional cost-\u2026",
  },
  {
    name: "DeepSeek-V3.1",
    icon: "deepseek",
    description:
      "DeepSeek-V3.1 is a hybrid model that enhances tool usage, thinking efficiency, and supports both thinking and non-thinking modes via chat templat\u2026",
  },
];

const providers = [
  {
    name: "Azure OpenAI",
    icon: "/icons/openai.svg",
    description:
      "Microsoft-hosted OpenAI models, including gpt-5.1 and Codex, offering enterprise-grade security and compliance.",
  },
  {
    name: "Anthropic",
    icon: "anthropic",
    description:
      "Anthropic is an AI research company that creates safe, reliable, interpretable, and steerable AI systems.",
  },
  {
    name: "Microsoft",
    icon: "microsoft",
    description:
      "Proprietary AI models developed by Microsoft, tailored for various enterprise applications and integrated within Azure services.",
  },
  {
    name: "xAI",
    icon: "xai",
    description:
      "Develops the Grok language models focused on reasoning, learning, and advancing reliable, high-performance AI systems.",
  },
  {
    name: "DeepSeek",
    icon: "deepseek",
    description:
      "Develops cost-effective large language models like R1, optimized for performance and efficiency.",
  },
  {
    name: "Black Forest Labs",
    icon: "bfl",
    description:
      "Research-driven company behind Flux, a family of open-weight diffusion models optimized for speed, fidelity, and controllability.",
  },
];

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: tokens.colorNeutralForeground1,
  },

  /* Top nav */
  topNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "48px",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
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
    color: tokens.colorNeutralForeground1,
  },
  navSep: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },
  navSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXL,
  },
  navDropdown: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    ":hover": {
      color: tokens.colorNeutralForeground2,
    },
  },

  /* Main content */
  main: {
    maxWidth: "960px",
    width: "100%",
    margin: "0 auto",
    padding: "48px 32px 64px",
  },

  /* Hero */
  hero: {
    marginBottom: "48px",
  },
  heroTitle: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "block" as const,
    marginBottom: tokens.spacingVerticalM,
    lineHeight: "40px",
  },
  heroDesc: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    display: "block" as const,
    maxWidth: "480px",
    lineHeight: tokens.lineHeightBase400,
    marginBottom: tokens.spacingVerticalL,
  },
  heroActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },

  /* Section */
  section: {
    marginBottom: "48px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  viewAll: {
    fontSize: tokens.fontSizeBase300,
    color: "#0078D4",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    ":hover": {
      textDecoration: "underline" as const,
    },
  },

  /* Card grid */
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
  },
  card: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    cursor: "pointer",
    ":hover": {
      borderColor: tokens.colorNeutralStroke1,
      boxShadow: tokens.shadow4,
    },
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  cardIcon: {
    width: "24px",
    height: "24px",
    borderRadius: tokens.borderRadiusMedium,
    flexShrink: 0,
  },
  cardName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  cardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
    display: "-webkit-box" as const,
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },

  /* Divider */
  divider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginTop: "16px",
    marginBottom: "48px",
  },

  /* Footer */
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  footerLinks: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
  },
  footerLink: {
    fontSize: tokens.fontSizeBase200,
    color: "#0078D4",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    ":hover": {
      textDecoration: "underline" as const,
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface FoundryCatalogPageProps {
  onBack?: () => void;
}

/** Microsoft Foundry model catalog landing page — light themed. */
export default function FoundryCatalogPage({ onBack }: FoundryCatalogPageProps) {
  const styles = useStyles();
  const router = useRouter();

  const renderProviderIcon = (icon: string) => {
    if (icon.startsWith("/")) {
      return <img src={icon} alt="" className={styles.cardIcon} />;
    }
    // Named icons that have dedicated SVGs
    const svgMap: Record<string, string> = {
      anthropic: "/icons/anthropic.svg",
      microsoft: "/icons/microsoft.svg",
    };
    if (svgMap[icon]) {
      return <img src={svgMap[icon]} alt="" className={styles.cardIcon} />;
    }
    const colorMap: Record<string, string> = {
      deepseek: "#4f8cf7",
      xai: "#000000",
      bfl: "#10b981",
    };
    const labelMap: Record<string, string> = {
      deepseek: "D",
      xai: "X",
      bfl: "B",
    };
    return (
      <div
        className={styles.cardIcon}
        style={{
          backgroundColor: `${colorMap[icon] || "#888"}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: colorMap[icon] || "#888",
        }}
      >
        {labelMap[icon] || "?"}
      </div>
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
            />
            <Text className={styles.navTitle}>Microsoft Foundry</Text>
          </div>
          <span className={styles.navSep}>/</span>
          <Text className={styles.navSubtitle}>Catalog</Text>
        </div>
        <div className={styles.navRight}>
          <button className={styles.navDropdown}>
            Models <span style={{ fontSize: "10px" }}>▾</span>
          </button>
          <button className={styles.navDropdown}>
            Providers <span style={{ fontSize: "10px" }}>▾</span>
          </button>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <div className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <Text className={styles.heroTitle}>
            Design with the best models
          </Text>
          <Text className={styles.heroDesc}>
            Explore the comprehensive catalog of AI models from Microsoft
            Foundry. Find the perfect model for your needs and start building
            innovative solutions.
          </Text>
          <div className={styles.heroActions}>
            <Button
              appearance="secondary"
              size="medium"
            >
              Browse models
            </Button>
            <Button
              appearance="primary"
              size="medium"
              style={{
                backgroundColor: "#0078D4",
                borderColor: "#0078D4",
              }}
            >
              Sign in to get started
            </Button>
          </div>
        </div>

        {/* Most popular models */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>Most popular models</Text>
            <button className={styles.viewAll}>
              View all →
            </button>
          </div>
          <div className={styles.cardGrid}>
            {popularModels.map((model) => (
              <div key={model.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  {renderProviderIcon(model.icon)}
                  <Text className={styles.cardName}>{model.name}</Text>
                </div>
                <Text className={styles.cardDesc}>{model.description}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Featured providers */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>Featured providers</Text>
            <button className={styles.viewAll}>
              View all →
            </button>
          </div>
          <div className={styles.cardGrid}>
            {providers.map((provider) => (
              <div key={provider.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  {renderProviderIcon(provider.icon)}
                  <Text className={styles.cardName}>{provider.name}</Text>
                </div>
                <Text className={styles.cardDesc}>{provider.description}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <Text>© 2026 Microsoft Corporation. All rights reserved.</Text>
        <div className={styles.footerLinks}>
          <button className={styles.footerLink}>
            Documentation <Open12Regular />
          </button>
          <button className={styles.footerLink}>
            Blog <Open12Regular />
          </button>
          <button className={styles.footerLink}>
            Privacy <Open12Regular />
          </button>
          <button className={styles.footerLink}>
            Trademarks <Open12Regular />
          </button>
          <button className={styles.footerLink}>
            Contact Support <Open12Regular />
          </button>
        </div>
      </footer>
    </div>
  );
}
