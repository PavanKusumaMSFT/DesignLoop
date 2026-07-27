"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  Badge,
} from "@fluentui/react-components";
import {
  ChevronRight16Regular,
  Rocket20Regular,
  Book20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface KubernetesHighlightStat {
  label: string;
  value: string;
}

export interface KubernetesHighlightCardProps {
  /** Service icon path (Azure service logo SVG) */
  icon?: string;
  /** Eyebrow label above the title */
  eyebrow?: string;
  /** Card title */
  title?: string;
  /** Supporting description */
  description?: string;
  /** Optional badge text shown next to the title */
  badge?: string;
  /** Feature bullet list */
  features?: string[];
  /** Quick stats shown in the footer strip */
  stats?: KubernetesHighlightStat[];
  /** Primary CTA label */
  primaryLabel?: string;
  /** Secondary CTA label */
  secondaryLabel?: string;
  /** Copilot CTA label */
  copilotLabel?: string;
  /** Primary CTA handler */
  onPrimaryAction?: () => void;
  /** Secondary CTA handler */
  onSecondaryAction?: () => void;
  /** Copilot CTA handler */
  onCopilotAction?: () => void;
  /** Root className override */
  className?: string;
  /** Corner radius override (Fluent token) */
  borderRadius?: string;
  /** Rest elevation override (Fluent token) */
  shadow?: string;
}

const useStyles = makeStyles({
  card: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: tokens.spacingHorizontalXXL,
    padding: tokens.spacingHorizontalXXXL,
    borderRadius: tokens.borderRadius3XLarge,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: tokens.shadow16,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      padding: tokens.spacingHorizontalXXL,
    },
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "6px",
    backgroundColor: "#0078D4",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
  },
  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  eyebrow: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: tokens.colorBrandForeground1,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  iconTile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow4,
    flexShrink: 0,
  },
  iconImage: {
    width: "36px",
    height: "36px",
  },
  title: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero700,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  featureChevron: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalS,
  },
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sideTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: tokens.colorNeutralForeground3,
  },
  statRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  statValue: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
    color: tokens.colorBrandForeground1,
  },
  statLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
});

const DEFAULT_FEATURES = [
  "Fully managed Kubernetes control plane, upgraded and patched for you",
  "Elastic autoscaling for nodes and pods to match demand",
  "Integrated CI/CD, GitOps, and Azure Monitor observability",
];

const DEFAULT_STATS: KubernetesHighlightStat[] = [
  { label: "Free control plane", value: "$0" },
  { label: "Regions available", value: "60+" },
  { label: "Uptime SLA", value: "99.95%" },
];

/**
 * Prominent, featured hero card that highlights Azure Kubernetes Service on the Azure
 * Home page. Uses a brand-tinted surface, accent bar, icon tile, feature list, stat
 * strip, and dual CTAs to draw focus to a single spotlighted service.
 *
 * Format-agnostic: all copy, stats, and handlers are prop-driven. Visually flexible via
 * `className`, `borderRadius`, and `shadow` overrides.
 */
export default function KubernetesHighlightCard({
  icon = "/icons/Kubernetes-Services.svg",
  eyebrow = "Featured service",
  title = "Azure Kubernetes Service",
  description = "Deploy, scale, and operate containerized applications with a fully managed Kubernetes offering — without managing the control plane yourself.",
  badge = "Trending",
  features = DEFAULT_FEATURES,
  stats = DEFAULT_STATS,
  primaryLabel = "Create Kubernetes cluster",
  secondaryLabel = "Learn more",
  copilotLabel = "Ask Copilot",
  onPrimaryAction,
  onSecondaryAction,
  onCopilotAction,
  className,
  borderRadius,
  shadow,
}: KubernetesHighlightCardProps) {
  const styles = useStyles();

  return (
    <section
      className={mergeClasses(styles.card, className)}
      aria-label={`${title} — featured service`}
      style={{
        ...(borderRadius ? { borderRadius } : {}),
        ...(shadow ? { boxShadow: shadow } : {}),
      }}
    >
      <span className={styles.accentBar} aria-hidden="true" />

      <div className={styles.main}>
        <div className={styles.eyebrowRow}>
          <Text className={styles.eyebrow}>{eyebrow}</Text>
          {badge && (
            <Badge appearance="tint" color="brand" size="small">
              {badge}
            </Badge>
          )}
        </div>

        <div className={styles.titleRow}>
          <span className={styles.iconTile}>
            <img src={icon} alt="" aria-hidden="true" className={styles.iconImage} />
          </span>
          <Text as="h2" className={styles.title}>
            {title}
          </Text>
        </div>

        <Text as="p" className={styles.description}>
          {description}
        </Text>

        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.featureItem}>
              <ChevronRight16Regular className={styles.featureChevron} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<Rocket20Regular />}
            onClick={onPrimaryAction}
          >
            {primaryLabel}
          </Button>
          <Button
            appearance="secondary"
            icon={<Book20Regular />}
            onClick={onSecondaryAction}
          >
            {secondaryLabel}
          </Button>
          <Button
            appearance="subtle"
            icon={<Sparkle20Regular />}
            onClick={onCopilotAction}
          >
            {copilotLabel}
          </Button>
        </div>
      </div>

      <div className={styles.side}>
        <Text className={styles.sideTitle}>Why teams choose AKS</Text>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statRow}>
            <Text className={styles.statValue}>{stat.value}</Text>
            <Text className={styles.statLabel}>{stat.label}</Text>
          </div>
        ))}
      </div>
    </section>
  );
}
