/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button,
  Link as FluentLink,
  Divider,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavCategory,
  NavCategoryItem,
  NavSubItemGroup,
  NavSubItem,
  Tag,
  TagGroup,
} from "@fluentui/react-components"
import EngopsHeroCard from "./engops-hero-card"
import EngopsAdvisorAgent, { type EngopsIntent } from "./engops-advisor-agent"
import { MOCK_SUBSCRIPTIONS, MOCK_RESOURCE_GROUPS } from "./engops-scope-data"
import DockedChatPanel from "../../shared/docked-chat-panel"
import {
  CheckmarkCircle24Filled,
  ArrowDownload20Regular,
  DocumentPdf20Regular,
  Comment20Regular,
  Add16Regular,
  Info16Regular,
  ArrowRight16Regular,
  Sparkle20Regular,
  Home20Filled,
  TextBulletListSquareSparkle20Filled,
  Play20Filled,
  BookOpen20Filled,
  ClipboardTaskListLtr20Filled,
  ChartMultiple20Regular,
  Settings20Regular,
  ChatHelp20Regular,
  ErrorCircle24Filled,
  Box16Regular,
  Money20Filled,
  Shield20Filled,
  Globe20Filled,
  Trophy20Filled,
  DataBarVertical20Filled,
  Lightbulb20Filled,
  Flag20Filled,
} from "@fluentui/react-icons"
import type { ReactNode } from "react"
import { useState } from "react"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import PageBreadcrumb from "../../shared/page-breadcrumb"
import PageHeader from "../../shared/page-header"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  shell: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    alignItems: "stretch",
    overflow: "hidden",
  },
  nav: {
    height: "auto",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralStroke2,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "none",
    flexShrink: 0,
    // Force white background on all NavDrawer inner surfaces
    // (NavDrawer default is colorNeutralBackground4, which renders gray)
    "& > div": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    "& [class*='fui-NavDrawerBody']": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    "& [class*='fui-NavItem']": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    "& [class*='fui-NavCategoryItem']": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    "& [class*='fui-NavSubItem']": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },
  body: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },

  // Copilot prompt row
  promptRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  copilotIcon: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  promptChip: {
    borderRadius: tokens.borderRadiusCircular,
  },

  // Toolbar
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
  },

  // Filters row
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },

  // Unified card grid
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
  cardGridCompact: {
    gridTemplateColumns: "repeat(2, 1fr)",
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
  spanTwo: {
    gridColumn: "span 2",
    "@media (max-width: 640px)": {
      gridColumn: "span 1",
    },
  },

  // Card
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    transitionDuration: tokens.durationNormal,
    transitionProperty: "box-shadow, border-color",
    ":hover": {
      boxShadow: tokens.shadow4,
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
    },
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  cardIcon: {
    color: tokens.colorBrandForeground1,
    display: "inline-flex",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  // Critical risks card
  criticalCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  criticalHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorPaletteRedBackground1,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  criticalIcon: {
    color: tokens.colorPaletteRedForeground1,
    display: "inline-flex",
    flexShrink: 0,
  },
  criticalTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    flex: 1,
  },
  criticalBadge: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: tokens.colorPaletteRedBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusMedium,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
  },
  criticalBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    flex: 1,
  },
  criticalCopy: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  criticalLinks: {
    display: "flex",
    flexDirection: "column",
  },
  criticalLinkRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  criticalLinkIconRed: {
    color: tokens.colorPaletteRedForeground1,
    display: "inline-flex",
    flexShrink: 0,
  },
  criticalActions: {
    display: "flex",
    marginTop: "auto",
    paddingTop: tokens.spacingVerticalS,
  },

  // Score area
  scoreRow: {
    display: "flex",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  scoreBar: {
    width: "4px",
    borderRadius: tokens.borderRadiusSmall,
    flexShrink: 0,
  },
  scoreValueWrap: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  scoreLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  scoreValue: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightHero800,
  },

  cardLinksList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  linkIcon: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
    display: "inline-flex",
  },

  // Performance empty state
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalS,
    flex: 1,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    textAlign: "center",
  },
  emptyCheck: {
    color: tokens.colorPaletteGreenForeground1,
  },
  emptyText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    maxWidth: "240px",
  },

  // Get started
  getStartedBody: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  getStartedActions: {
    marginTop: "auto",
    display: "flex",
  },

  // Tips & tricks
  tipsList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  tipRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  tipIcon: {
    color: tokens.colorBrandForeground1,
    marginTop: tokens.spacingVerticalXXS,
    flexShrink: 0,
  },

  // Static icon colors (moved out of inline style)
  performanceIcon: {
    color: tokens.colorPaletteMagentaForeground2 ?? tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  getStartedIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  tipsHeaderIcon: {
    color: tokens.colorPaletteYellowForeground1,
    flexShrink: 0,
  },
})

// ── Data ─────────────────────────────────────────────────────────────────────

type ScoreColor = "red" | "orange" | "yellow" | "blue" | "green"

interface ScoreCardData {
  id: string
  title: string
  icon: ReactNode
  score: number
  barColor: ScoreColor
  active: { count: number; label: string; icon: ReactNode }
  impacted: { count: string; label: string; icon: ReactNode }
}

const costColor = tokens.colorPaletteTealForeground2
const securityColor = tokens.colorBrandForeground1
const reliabilityColor = tokens.colorPaletteLightTealForeground2 ?? tokens.colorBrandForeground1
const opexColor = tokens.colorPaletteMarigoldForeground1 ?? tokens.colorPaletteYellowForeground1

const scoreCards: ScoreCardData[] = [
  {
    id: "cost",
    title: "Cost",
    icon: <Money20Filled style={{ color: costColor }} />,
    score: 4,
    barColor: "red",
    active: {
      count: 10,
      label: "active cost recommendations",
      icon: <Money20Filled style={{ color: costColor }} />,
    },
    impacted: { count: "26", label: "impacted resources", icon: <Box16Regular /> },
  },
  {
    id: "security",
    title: "Security",
    icon: <Shield20Filled style={{ color: securityColor }} />,
    score: 47,
    barColor: "orange",
    active: {
      count: 19,
      label: "active security recommendations",
      icon: <Shield20Filled style={{ color: securityColor }} />,
    },
    impacted: { count: "140", label: "impacted resources", icon: <Box16Regular /> },
  },
  {
    id: "reliability",
    title: "Reliability",
    icon: <Globe20Filled style={{ color: reliabilityColor }} />,
    score: 72,
    barColor: "orange",
    active: {
      count: 45,
      label: "active reliability recommendations",
      icon: <Globe20Filled style={{ color: reliabilityColor }} />,
    },
    impacted: { count: "1,054", label: "impacted resources", icon: <Box16Regular /> },
  },
  {
    id: "opex",
    title: "Operational excellence",
    icon: <Trophy20Filled style={{ color: opexColor }} />,
    score: 70,
    barColor: "orange",
    active: {
      count: 7,
      label: "active operational excellence recommendations",
      icon: <Trophy20Filled style={{ color: opexColor }} />,
    },
    impacted: { count: "29", label: "impacted resources", icon: <Box16Regular /> },
  },
]

const barColorMap: Record<ScoreColor, string> = {
  red: tokens.colorPaletteRedBackground3,
  orange: tokens.colorPaletteDarkOrangeBackground3,
  yellow: tokens.colorPaletteYellowBackground3,
  blue: tokens.colorBrandBackground,
  green: tokens.colorPaletteGreenBackground3,
}

// ── Component ────────────────────────────────────────────────────────────────

const navItems: Array<
  | { kind: "item"; value: string; label: string; icon: ReactNode }
  | {
      kind: "category"
      value: string
      label: string
      icon: ReactNode
      children: Array<{ value: string; label: string }>
    }
> = [
  {
    kind: "item",
    value: "overview",
    label: "Overview",
    icon: <Home20Filled style={{ color: tokens.colorPaletteTealForeground2 }} />,
  },
  {
    kind: "item",
    value: "advisor-score",
    label: "Advisor score",
    icon: <TextBulletListSquareSparkle20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />,
  },
  {
    kind: "item",
    value: "getting-started",
    label: "Getting started",
    icon: <Play20Filled style={{ color: tokens.colorPaletteTealForeground2 }} />,
  },
  {
    kind: "item",
    value: "workbooks",
    label: "Workbooks",
    icon: <BookOpen20Filled style={{ color: tokens.colorBrandForeground1 }} />,
  },
  {
    kind: "item",
    value: "assessments",
    label: "Assessments (Preview)",
    icon: <ClipboardTaskListLtr20Filled style={{ color: tokens.colorPaletteTealForeground2 }} />,
  },
  {
    kind: "category",
    value: "recommendations",
    label: "Recommendations",
    icon: <ChartMultiple20Regular />,
    children: [
      { value: "rec-retirements", label: "Service retirements" },
      { value: "rec-resiliency", label: "Resiliency" },
      { value: "rec-security", label: "Security" },
      { value: "rec-opex", label: "Operational excellence" },
    ],
  },
  {
    kind: "category",
    value: "monitoring",
    label: "Monitoring",
    icon: <ChartMultiple20Regular />,
    children: [
      { value: "mon-alerts", label: "Alerts" },
      { value: "mon-metrics", label: "Metrics" },
    ],
  },
  {
    kind: "category",
    value: "settings",
    label: "Settings",
    icon: <Settings20Regular />,
    children: [
      { value: "set-config", label: "Configuration" },
      { value: "set-rules", label: "Rules" },
    ],
  },
  {
    kind: "category",
    value: "support",
    label: "Support + troubleshooting",
    icon: <ChatHelp20Regular />,
    children: [
      { value: "sup-new", label: "New support request" },
      { value: "sup-diag", label: "Diagnose and solve" },
    ],
  },
]

/** EngOps Advisor overview — scoped Advisor experience prioritizing service retirements and resiliency posture for critical workloads. */
export default function EngopsAgent({
  isDarkMode = false,
  onExpandAgent,
  scope: controlledScope,
  onScopeChange,
}: {
  isDarkMode?: boolean
  /** Called when the user clicks expand in the docked agent header to navigate to a full-screen immersive agent. */
  onExpandAgent?: (
    intent: EngopsIntent,
    scope: { subscriptions: string[]; resourceGroups: string[] } | null,
  ) => void
  /** Optionally control scope from outside (so it survives unmount when switching to an immersive view). */
  scope?: { subscriptions: string[]; resourceGroups: string[] } | null
  onScopeChange?: (
    scope: { subscriptions: string[]; resourceGroups: string[] } | null,
  ) => void
}) {
  const styles = useStyles()
  const [activeNav, setActiveNav] = useState("overview")
  const [agentIntent, setAgentIntent] = useState<EngopsIntent | null>(null)

  // Persisted scope + agent-run state (survives closing the docked panel).
  // If a controlled scope is provided by the parent, use that so state
  // survives the overview being unmounted (e.g. while in immersive mode).
  const [uncontrolledScope, setUncontrolledScope] = useState<{
    subscriptions: string[]
    resourceGroups: string[]
  } | null>(null)
  const persistedScope =
    controlledScope !== undefined ? controlledScope : uncontrolledScope
  const setPersistedScope = (
    next: { subscriptions: string[]; resourceGroups: string[] } | null,
  ) => {
    if (controlledScope !== undefined) {
      onScopeChange?.(next)
    } else {
      setUncontrolledScope(next)
      onScopeChange?.(next)
    }
  }

  const openAgent = (intent: EngopsIntent) => {
    setAgentIntent(intent)
  }
  const closeAgent = () => setAgentIntent(null)

  const handleScopeSubmitted = (sel: {
    subscriptions: string[]
    resourceGroups: string[]
  }) => {
    setPersistedScope(sel)
  }

  const resetAgent = () => {
    setPersistedScope(null)
    setAgentIntent("agent")
  }

  // Map selected ids → display names for the hero chip row
  const scopeChips = persistedScope
    ? [
        ...MOCK_SUBSCRIPTIONS.filter((s) =>
          persistedScope.subscriptions.includes(s.id),
        ).map((s) => s.name),
        ...MOCK_RESOURCE_GROUPS.filter((r) =>
          persistedScope.resourceGroups.includes(r.id),
        ).map((r) => r.name),
      ]
    : []

  const filters = [
    { label: "Subscription equals 14 of 151 selected", removable: false },
    { label: "Recommendation Status equals Active", removable: false },
    { label: "Resource Group equals All", removable: true },
    { label: "Type equals All", removable: true },
    { label: "Workload tier equals Critical", removable: true },
  ]

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP activeLink="" isDarkMode={isDarkMode} />

      <div className={styles.shell}>
        <NavDrawer
          open
          type="inline"
          selectedValue={activeNav}
          onNavItemSelect={(_, data) => setActiveNav(String(data.value))}
          defaultOpenCategories={["recommendations"]}
          className={styles.nav}
        >
          <NavDrawerBody>
            {navItems.map((item) =>
              item.kind === "item" ? (
                <NavItem key={item.value} value={item.value} icon={item.icon}>
                  {item.label}
                </NavItem>
              ) : (
                <NavCategory key={item.value} value={item.value}>
                  <NavCategoryItem icon={item.icon}>{item.label}</NavCategoryItem>
                  <NavSubItemGroup>
                    {item.children.map((child) => (
                      <NavSubItem key={child.value} value={child.value}>
                        {child.label}
                      </NavSubItem>
                    ))}
                  </NavSubItemGroup>
                </NavCategory>
              )
            )}
          </NavDrawerBody>
        </NavDrawer>

        <div className={styles.main}>
          <PageBreadcrumb
            noBorder
            items={[{ label: "Home", onClick: () => {} }, { label: "Advisor" }]}
          />

          <PageHeader
            compact
            noBorder
            title="Advisor | Overview"
            icon={<Sparkle20Regular />}
            onClose={() => {}}
          />

          <div className={styles.body}>
        {/* Copilot prompt suggestions */}
        <div className={styles.promptRow}>
          <Sparkle20Regular className={styles.copilotIcon} />
          <Button appearance="outline" shape="circular" size="small" className={styles.promptChip}>
            Show me retirement risks for my critical workloads
          </Button>
          <Button appearance="outline" shape="circular" size="small" className={styles.promptChip}>
            Explain how the resiliency score is calculated
          </Button>
          <Button appearance="outline" shape="circular" size="small" className={styles.promptChip}>
            Draft a migration plan for soon-to-retire services
          </Button>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <Button appearance="subtle" icon={<Comment20Regular />}>Feedback</Button>
          <Button appearance="subtle" icon={<ArrowDownload20Regular />}>Download as CSV</Button>
          <Button appearance="subtle" icon={<DocumentPdf20Regular />}>Download as PDF</Button>
          <Button appearance="subtle" icon={<BookOpen20Filled />}>Workbooks</Button>
        </div>

        {/* Filter chips */}
        <div className={styles.filterRow}>
          <TagGroup
            onDismiss={(_: unknown, data: { value: string }) => {
              // prototype: removal wired per-tag below
              void data
            }}
          >
            {filters.map((f) => (
              <Tag
                key={f.label}
                value={f.label}
                shape="circular"
                appearance="brand"
                dismissible={f.removable}
                dismissIcon={{ "aria-label": `Remove ${f.label}` }}
              >
                {f.label}
              </Tag>
            ))}
          </TagGroup>
          <Button appearance="subtle" shape="circular" size="small" icon={<Add16Regular />}>
            Add filter
          </Button>
        </div>

        {/* EngOps hero */}
        <EngopsHeroCard
          compact={false}
          title="EngOps Agent"
          tagline="From knowing to doing — in one place"
          description="Discover what's affected across your critical workloads, get a prioritized plan, execute with ready-to-run commands, and track progress to completion."
          ctaLabel={persistedScope ? "Resume EngOps Agent" : "Launch EngOps Agent"}
          onCtaClick={() => openAgent("agent")}
          quickStarts={
            persistedScope
              ? []
              : [
                  {
                    eyebrow: "Service retirements",
                    title: "What's retiring in my subscriptions?",
                    description:
                      "Surface resources affected by upcoming Azure retirements, ranked by deadline and business impact.",
                    linkLabel: "Start with retirements",
                    onClick: () => openAgent("retirements"),
                  },
                  {
                    eyebrow: "Resiliency posture",
                    title: "Where are my critical workloads exposed?",
                    description:
                      "Identify the highest-impact resiliency improvements for your critical workloads, with plain-language outcomes.",
                    linkLabel: "Start with resiliency",
                    onClick: () => openAgent("resiliency"),
                  },
                ]
          }
          activatedState={
            persistedScope
              ? {
                  scopeChips,
                  onChangeScope: resetAgent,
                  stats: [
                    {
                      label: "Service retirements",
                      value: 3,
                      caption: "recommendations remaining · 1 overdue · 1 within 90 days",
                      accent: "red",
                    },
                    {
                      label: "Resiliency posture",
                      value: 4,
                      caption: "recommendations remaining · 2 high severity",
                      accent: "yellow",
                    },
                  ],
                }
              : undefined
          }
        />

        {/* Unified card grid */}
        <div className={styles.cardGrid}>
          {/* Critical risks — spans 2 columns */}
          <div className={mergeClasses(styles.criticalCard, styles.spanTwo)}>
            <div className={styles.criticalHeader}>
              <ErrorCircle24Filled className={styles.criticalIcon} />
              <Text className={styles.criticalTitle}>Critical risks (2)</Text>
              <span className={styles.criticalBadge}>Immediate attention</span>
            </div>
            <div className={styles.criticalBody}>
              <Text className={styles.criticalCopy}>
                Microsoft has identified 2 risks to the availability and resilience of your
                workloads.{" "}
                <Text weight="semibold" size={300}>
                  Immediate attention
                </Text>{" "}
                is required from your organization to mitigate those risks.
              </Text>
              <div className={styles.criticalLinks}>
                <div className={styles.criticalLinkRow}>
                  <ErrorCircle24Filled className={styles.criticalLinkIconRed} />
                  <FluentLink>4 active recommendations to mitigate risks</FluentLink>
                </div>
                <div className={styles.criticalLinkRow}>
                  <Box16Regular className={styles.cardIcon} />
                  <FluentLink>11 impacted resources</FluentLink>
                </div>
              </div>
              <div className={styles.criticalActions}>
                <Button appearance="primary">Manage risks</Button>
              </div>
            </div>
          </div>

          {/* Score cards: Cost, Security, Reliability, Op Ex */}
          {scoreCards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{card.icon}</span>
                <Text className={styles.cardTitle}>{card.title}</Text>
              </div>

              <div className={styles.scoreRow}>
                <div
                  className={styles.scoreBar}
                  style={{ backgroundColor: barColorMap[card.barColor] }}
                />
                <div className={styles.scoreValueWrap}>
                  <Text className={styles.scoreLabel}>Score</Text>
                  <Text className={styles.scoreValue}>{card.score}%</Text>
                </div>
              </div>

              <Divider />

              <div className={styles.cardLinksList}>
                <div className={styles.linkRow}>
                  <span className={styles.linkIcon}>{card.active.icon}</span>
                  <FluentLink>
                    {card.active.count} {card.active.label}
                  </FluentLink>
                </div>
                <div className={styles.linkRow}>
                  <span className={styles.linkIcon}>{card.impacted.icon}</span>
                  <FluentLink>
                    {card.impacted.count} {card.impacted.label}
                  </FluentLink>
                </div>
              </div>
            </div>
          ))}

          {/* Performance empty state */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <DataBarVertical20Filled className={styles.performanceIcon} />
              <Text className={styles.cardTitle}>Performance</Text>
            </div>
            <div className={styles.emptyState}>
              <CheckmarkCircle24Filled className={styles.emptyCheck} />
              <Text className={styles.emptyText}>
                You are following all of our performance recommendations
              </Text>
              <FluentLink>See list of performance recommendations</FluentLink>
            </div>
          </div>

          {/* Get started */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Flag20Filled className={styles.getStartedIcon} />
              <Text className={styles.cardTitle}>Get started in EngOps</Text>
            </div>
            <Text className={styles.getStartedBody}>
              EngOps extends Azure Advisor with a scoped agent that prioritizes retirement risks
              and resiliency gaps across your business-critical workloads.
            </Text>
            <div className={styles.getStartedActions}>
              <Button appearance="primary">Get started</Button>
            </div>
          </div>

          {/* Tips & tricks — spans 2 columns */}
          <div className={mergeClasses(styles.card, styles.spanTwo)}>
            <div className={styles.cardHeader}>
              <Lightbulb20Filled className={styles.tipsHeaderIcon} />
              <Text className={styles.cardTitle}>Tips &amp; tricks</Text>
            </div>
            <div className={styles.tipsList}>
              <div className={styles.tipRow}>
                <Info16Regular className={styles.tipIcon} />
                <FluentLink>
                  Tag workloads with criticality=high to focus EngOps on what matters most.
                </FluentLink>
              </div>
              <div className={styles.tipRow}>
                <Info16Regular className={styles.tipIcon} />
                <FluentLink>
                  Review upcoming Azure service retirements in the next 90 days.
                </FluentLink>
              </div>
              <div className={styles.tipRow}>
                <Info16Regular className={styles.tipIcon} />
                <FluentLink>
                  Enable auto-remediation for low-risk resiliency recommendations.
                </FluentLink>
              </div>
              <div className={styles.tipRow}>
                <ArrowRight16Regular className={styles.tipIcon} />
                <FluentLink>
                  Ask the EngOps agent to draft a migration plan for retiring services.
                </FluentLink>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        {agentIntent && (
          <DockedChatPanel
            onClose={closeAgent}
            showHeader={false}
            width="440px"
          >
            <EngopsAdvisorAgent
              intent={agentIntent}
              onClose={closeAgent}
              isDarkMode={isDarkMode}
              initialScope={persistedScope}
              onScopeSubmitted={handleScopeSubmitted}
              onExpandToImmersive={
                onExpandAgent
                  ? () => onExpandAgent(agentIntent, persistedScope)
                  : undefined
              }
            />
          </DockedChatPanel>
        )}
      </div>
    </div>
  )
}
