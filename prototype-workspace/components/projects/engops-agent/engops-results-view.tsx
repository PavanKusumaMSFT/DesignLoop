"use client"

import React, { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Link as FluentLink,
  TabList,
  Tab,
  Tag,
  TagGroup,
  Badge,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Divider,
  mergeClasses,
} from "@fluentui/react-components"
import {
  ArrowDownload16Regular,
  Copy16Regular,
  DocumentPdf16Regular,
  DocumentTable16Regular,
  ChevronRight12Regular,
  Clock16Filled,
  ShieldCheckmark16Filled,
} from "@fluentui/react-icons"
import { Tooltip } from "@fluentui/react-components"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

// ---------- Types ----------

type DeadlineStatus = "overdue" | "soon" | "upcoming"
type ResiliencySeverity = "high" | "medium" | "low"

interface ActionStep {
  label: string
  text: React.ReactNode
}

interface ChangeSummary {
  from: string
  to: string
  context: string
}

interface ImpactRow {
  mode: "without" | "with"
  text: React.ReactNode
}

interface ResultBase {
  id: string
  title: string
  subtitle: string
  affectedResources: string[]
  affectedCount: number
  actionPlan: ActionStep[]
  migrationGuideLabel?: string
}

interface DeadlineItem extends ResultBase {
  kind: "deadline"
  status: DeadlineStatus
  statusLabel: string
  eyebrow: string // "JUST NOW" / "ACT THIS WEEK"
  change: ChangeSummary
}

interface ResiliencyItem extends ResultBase {
  kind: "resiliency"
  severity: ResiliencySeverity
  eyebrow: string
  impact: ImpactRow[]
}

type ResultItem = DeadlineItem | ResiliencyItem

// ---------- Mock data ----------

const DEADLINES: DeadlineItem[] = [
  {
    id: "aks-127",
    kind: "deadline",
    title: "AKS v1.27 support ended",
    subtitle: "2 subs · 4 clusters · production workloads on unsupported Kubernetes",
    eyebrow: "OVERDUE",
    status: "overdue",
    statusLabel: "74d overdue",
    affectedCount: 4,
    affectedResources: ["aks-payments-prod", "aks-identity-prod", "aks-batch-prod", "aks-analytics-prod"],
    change: {
      from: "AKS 1.27 (end-of-life)",
      to: "AKS 1.29 (supported)",
      context:
        "AKS 1.27 left support on Jul 4, 2025. Microsoft can force-upgrade clusters at any time. Upgrade through 1.28 → 1.29 to stay within two minor versions of latest.",
    },
    actionPlan: [
      { label: "Today", text: "Freeze cluster config. Snapshot etcd and back up all PV volumes." },
      { label: "This week", text: "Rolling upgrade aks-payments-prod to 1.28 during the weekly maintenance window." },
      { label: "Next week", text: "Roll 1.28 → 1.29 on aks-payments, then repeat the two-hop upgrade on the remaining three clusters." },
    ],
    migrationGuideLabel: "View upgrade runbook",
  },
  {
    id: "appgw-v1",
    kind: "deadline",
    title: "Application Gateway v1 retirement",
    subtitle: "3 subs · 7 gateways · fronts payments + identity traffic",
    eyebrow: "ACT NOW",
    status: "soon",
    statusLabel: "60d left",
    affectedCount: 7,
    affectedResources: [
      "gw-identity-prod",
      "gw-web-prod",
      "gw-api-prod-eus",
      "gw-api-prod-wus",
      "gw-edge-prod",
      "gw-payments-prod",
      "gw-id-edge-prod",
    ],
    change: {
      from: "App Gateway v1 (Standard/WAF)",
      to: "App Gateway v2 (Standard_v2/WAF_v2)",
      context:
        "Azure is ending support for v1 on Aug 31, 2026. Microsoft will not provision new v1 gateways; existing instances continue running but receive no security patches and cannot be modified. Plan a side-by-side migration to v2 with DNS cutover during your change window.",
    },
    actionPlan: [
      {
        label: "Now (this week)",
        text: (
          <>
            Stand up App Gateway v2 side-by-side for the 2 highest-traffic gateways (<code>gw-payments-prod</code>,{" "}
            <code>gw-identity-prod</code>). Mirror listeners, backend pools, WAF policies, and TLS certs. Zero impact to live traffic.
          </>
        ),
      },
      {
        label: "Next 1–2 weeks",
        text: (
          <>
            Run 1% synthetic traffic through the new gateways via a test FQDN. Validate response codes, latency, and WAF block rates
            match the v1 baseline for at least 24 hours.
          </>
        ),
      },
      {
        label: "In your next change window",
        text: (
          <>
            DNS cutover the production FQDN to v2 during off-peak IPs. Use a short TTL, so rollback is a one-record revert. Watch
            error rate and p95 latency for 4 hours post-cutover.
          </>
        ),
      },
      {
        label: "After 7 days of stable v2 traffic",
        text: (
          <>
            Decommission v1 gateways and free the public IPs. Repeat the side-by-side + customer sequence for the remaining 5 gateways.
          </>
        ),
      },
    ],
    migrationGuideLabel: "View migration guide",
  },
  {
    id: "dsv2-vms",
    kind: "deadline",
    title: "Dsv2 VM series retirement",
    subtitle: "4 subs · 18 VMs · older-generation compute nearing end-of-sale",
    eyebrow: "SCHEDULE",
    status: "upcoming",
    statusLabel: "180d left",
    affectedCount: 18,
    affectedResources: ["vm-platform-01", "vm-platform-02", "vm-batch-a", "vm-batch-b", "vm-legacy-ssis"],
    change: {
      from: "Dsv2 (Standard_D2s_v2 … D16s_v2)",
      to: "Dsv5 (Standard_D2s_v5 … D16s_v5)",
      context:
        "Dsv2 reaches end-of-sale Oct 2026. New allocations will be rejected; existing VMs can keep running but cannot be resized within the series.",
    },
    actionPlan: [
      { label: "This month", text: "Tag all Dsv2 VMs with retirement=dsv2 to scope automation." },
      { label: "Next sprint", text: "Resize non-prod Dsv2 → Dsv5 to validate driver + perf parity." },
      { label: "Within 90 days", text: "Schedule production resize waves grouped by workload. Dsv5 is ~20% cheaper at identical perf." },
    ],
  },
]

const RESILIENCY: ResiliencyItem[] = [
  {
    id: "sql-zr",
    kind: "resiliency",
    title: "Enable zone redundancy for Azure SQL DB",
    subtitle: "3 subs · 3 databases · analytics + payments ledger",
    eyebrow: "PLAN THIS SPRINT",
    severity: "high",
    affectedCount: 3,
    affectedResources: ["sql-analytics-prod", "sql-payments-ledger", "sql-identity-meta"],
    impact: [
      {
        mode: "without",
        text: (
          <>
            A single zone outage in East US takes your analytics pipeline and payments ledger offline until the zone recovers (Azure
            SLA up to 6 hours regional).
          </>
        ),
      },
      {
        mode: "with",
        text: (
          <>
            Automatic failover to a secondary zone within seconds. No application change required; connection string stays the same.
          </>
        ),
      },
    ],
    actionPlan: [
      {
        label: "Today",
        text: (
          <>
            Confirm the 3 databases (<code>sql-analytics-prod</code>, <code>sql-payments-ledger</code>, <code>sql-identity-meta</code>) are on a{" "}
            <strong>Business Critical</strong> tier in a region with availability-zone support.
          </>
        ),
      },
      {
        label: "Next maintenance window",
        text: (
          <>
            Enable <strong>zone redundancy</strong> per database via <code>az sql db update --zone-redundant true</code>. Brief
            failover (~30s) per database; schedule them sequentially.
          </>
        ),
      },
      {
        label: "Within 24h of cutover",
        text: (
          <>
            Validate failover with a manual <strong>planned failover drill</strong>. Confirm the analytics pipeline and payments
            ledger reconnect cleanly.
          </>
        ),
      },
    ],
  },
  {
    id: "appservice-region",
    kind: "resiliency",
    title: "Add secondary region for payments-api App Service",
    subtitle: "1 sub · 1 App Service plan · payments flow",
    eyebrow: "PLAN THIS QUARTER",
    severity: "high",
    affectedCount: 1,
    affectedResources: ["asp-payments-eus"],
    impact: [
      {
        mode: "without",
        text: "A regional outage in East US drops the payments checkout path; RTO exceeds the 15-min SLO.",
      },
      {
        mode: "with",
        text: "Active/passive in West US 3. Traffic Manager fails over within 90s; RTO drops to 2 minutes.",
      },
    ],
    actionPlan: [
      { label: "Week 1", text: "Provision mirror App Service plan in West US 3 and paired Azure SQL failover group." },
      { label: "Week 2", text: "Stand up Traffic Manager priority profile pointing primary → secondary." },
      { label: "Week 3", text: "Run quarterly game day: simulate EUS failure, validate RTO/RPO, sign off." },
    ],
  },
  {
    id: "asp-instance-count",
    kind: "resiliency",
    title: "Set App Service minimum instance count to 2",
    subtitle: "4 App Service plans · identity services + web front-end",
    eyebrow: "QUICK WIN",
    severity: "medium",
    affectedCount: 4,
    affectedResources: ["asp-identity-prod", "asp-web-prod", "asp-admin-prod", "asp-api-edge-prod"],
    impact: [
      { mode: "without", text: "Single instance means any host recycle causes a 30–60s cold start on customer traffic." },
      { mode: "with", text: "Rolling restarts are invisible to customers; instance failures are absorbed by the second worker." },
    ],
    actionPlan: [
      { label: "This week", text: "Change Always On + min instance count to 2 on all four plans. No downtime." },
      { label: "Follow-up", text: "Reassess costs — Basic tier does not support >1 instance; upgrade to Standard if required." },
    ],
  },
  {
    id: "storage-soft-delete",
    kind: "resiliency",
    title: "Enable soft-delete for storage accounts",
    subtitle: "6 storage accounts · production data + backups",
    eyebrow: "QUICK WIN",
    severity: "medium",
    affectedCount: 6,
    affectedResources: ["stpaymentsprod", "stidentityprod", "stbackupprod", "stlogsprod", "stauditprod", "stanalyticsprod"],
    impact: [
      { mode: "without", text: "Accidental blob delete is unrecoverable after tombstone. One bad script = data loss." },
      { mode: "with", text: "14-day restore window for blobs and containers. No perf impact, <1% storage overhead." },
    ],
    actionPlan: [
      { label: "Today", text: "Enable blob + container soft-delete with 14-day retention on all 6 accounts via policy." },
      { label: "Next week", text: "Document restore runbook and test recovery on stlogsprod." },
    ],
  },
]

const PORTFOLIO_PLAN: ActionStep[] = [
  {
    label: "This week (overdue)",
    text: (
      <>
        Unblock <strong>AKS v1.27 support ended</strong> — this retirement is past the cutover date. Microsoft may force-upgrade
        unsupported resources. Expand the row above for the step-by-step plan.
      </>
    ),
  },
  {
    label: "Next 1–2 weeks",
    text: (
      <>
        Start on <strong>Application Gateway v1 retirement</strong> so it lands before the deadline.
      </>
    ),
  },
  {
    label: "Next sprint (2–4 weeks)",
    text: (
      <>
        Fold the remaining high-severity resiliency work into the backlog. <strong>Enable zone redundancy for Azure SQL DB</strong> and{" "}
        <strong>Add secondary region for payments-api App Service</strong>. Kick off provisioning for{" "}
        <strong>Key Vault data-plane API 2019-09-01 retirement</strong> so the cutover window is available.
      </>
    ),
  },
  {
    label: "Next planned window / roadmap",
    text: (
      <>
        Schedule <strong>Set App Service minimum instance count to 2</strong> and{" "}
        <strong>Enable soft-delete for storage accounts</strong> for your next planned change window. Put{" "}
        <strong>Azure CDN Classic retirement</strong> and <strong>Dsv2 VM series retirement</strong> on the roadmap now so migration
        runway is protected.
      </>
    ),
  },
  {
    label: "Backlog",
    text: (
      <>
        Capture <strong>Upgrade minimum TLS to 1.2+</strong> in your auth-ops tracker. Low blast-radius but worth closing before the
        next compliance review.
      </>
    ),
  },
]

const FOLLOWUP_PROMPTS = [
  "Walk me through the App Gateway v1 plan",
  "What's the blast radius of the AKS upgrade?",
  "Draft comms for the App Gateway cutover",
]

// ---------- Styles ----------

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    minWidth: 0,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  eyebrowIcon: {
    width: "14px",
    height: "14px",
  },
  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase500,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  scopeLine: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
  },

  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  summaryCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    paddingLeft: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: "pointer",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: tokens.durationFast,
    "&:hover": {
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
      boxShadow: tokens.shadow4,
    },
  },
  summaryCardActive: {
    borderTopColor: tokens.colorBrandStroke1,
    borderRightColor: tokens.colorBrandStroke1,
    borderBottomColor: tokens.colorBrandStroke1,
    borderLeftColor: tokens.colorBrandStroke1,
    boxShadow: tokens.shadow4,
  },
  summaryLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  summaryValue: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightHero700,
  },
  summaryMeta: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  tabHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  tabCaption: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },

  listShell: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: "hidden",
  },
  accordionItem: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    ":last-child": {
      borderBottom: "none",
    },
  },
  accordionHeader: {
    // Nothing to override on the button itself — we style the inner row.
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    width: "100%",
    minWidth: 0,
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  headerSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  affectedCount: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  scopeCountMuted: {
    color: tokens.colorNeutralForeground3,
  },

  panel: {
    padding: `0 ${tokens.spacingHorizontalL} ${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },

  subsectionLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  oneCol: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacingVerticalM,
  },
  subpanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
  },
  changeFromTo: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  changeTag: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
  },
  changeCode: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  changeContext: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    marginTop: tokens.spacingVerticalXS,
  },
  resourceTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
  },
  resourceTag: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  impactRow: {
    display: "grid",
    gridTemplateColumns: "88px 1fr",
    alignItems: "start",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    ":first-child": { borderTop: "none" },
  },
  impactLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  impactWithout: {
    color: tokens.colorPaletteRedForeground1,
  },
  impactWith: {
    color: tokens.colorPaletteGreenForeground1,
  },
  impactText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },

  actionPlanBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  actionPlanHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
  },
  stepRow: {
    display: "grid",
    gridTemplateColumns: "28px 1fr",
    gap: tokens.spacingHorizontalM,
    alignItems: "start",
  },
  stepBadge: {
    width: "24px",
    height: "24px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
  },
  stepBody: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    minWidth: 0,
  },
  stepLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  takeItRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  takeItLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  itemFooter: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    flexWrap: "wrap",
  },

  followupRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  followupChip: {
    borderRadius: tokens.borderRadiusCircular,
  },
  followupHeading: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: tokens.spacingVerticalXS,
    display: "block",
  },

  portfolioBox: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  portfolioHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  portfolioSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
})

// ---------- Helpers ----------

const statusBadge = (item: ResultItem) => {
  if (item.kind === "deadline") {
    const tone =
      item.status === "overdue" ? "danger" : item.status === "soon" ? "warning" : "informative"
    return (
      <Badge appearance="tint" color={tone as any} size="medium">
        {item.statusLabel}
      </Badge>
    )
  }
  const tone =
    item.severity === "high" ? "danger" : item.severity === "medium" ? "warning" : "informative"
  return (
    <Badge appearance="tint" color={tone as any} size="medium">
      {item.severity.toUpperCase()}
    </Badge>
  )
}

// ---------- Component ----------

export interface EngopsResultsViewProps {
  selectedCounts: { subs: number; rgs: number }
  scopeLabel?: string
  onChangeScope?: () => void
  onFollowUp?: (prompt: string) => void
}

/** Summarized results after scope selection: two switchable lists (retirements vs resiliency) with an expandable plan per item. */
export default function EngopsResultsView({
  selectedCounts,
  scopeLabel = "prod-platform-core · prod-payments · prod-data-analytics · prod-edge-cdn",
  onChangeScope,
  onFollowUp,
}: EngopsResultsViewProps) {
  const styles = useStyles()
  const [activeTab, setActiveTab] = useState<"deadlines" | "resiliency">("deadlines")
  const [openItemIds, setOpenItemIds] = useState<string[]>([])

  const items: ResultItem[] = activeTab === "deadlines" ? DEADLINES : RESILIENCY
  const deadlineCount = DEADLINES.length
  const resiliencyCount = RESILIENCY.filter((r) => r.severity === "high").length
  const overdueCount = DEADLINES.filter((d) => d.status === "overdue").length
  const soonCount = DEADLINES.filter((d) => d.status === "soon").length

  const renderItem = (item: ResultItem) => {
    return (
      <AccordionItem key={item.id} value={item.id} className={styles.accordionItem}>
        <AccordionHeader size="large" className={styles.accordionHeader}>
          <div className={styles.headerRow}>
            <Badge
              appearance="tint"
              color={item.kind === "deadline" ? "warning" : "success"}
              size="small"
            >
              {item.eyebrow}
            </Badge>
            <div className={styles.headerText}>
              <Tooltip content={item.title} relationship="label" withArrow>
                <Text className={styles.headerTitle}>{item.title}</Text>
              </Tooltip>
              <Tooltip content={item.subtitle} relationship="description" withArrow>
                <Text className={styles.headerSubtitle}>{item.subtitle}</Text>
              </Tooltip>
            </div>
            <div className={styles.headerRight}>
              <Text className={styles.affectedCount}>
                {item.affectedCount} {item.affectedCount === 1 ? "resource" : "resources"}
              </Text>
              {statusBadge(item)}
            </div>
          </div>
        </AccordionHeader>
        <AccordionPanel className={styles.panel}>
          {item.kind === "deadline" ? (
            <div className={styles.twoCol}>
              <div className={styles.subpanel}>
                <Text className={styles.subsectionLabel}>Change</Text>
                <div className={styles.changeFromTo}>
                  <Text className={styles.changeTag}>FROM</Text>
                  <Text className={styles.changeCode}>{item.change.from}</Text>
                </div>
                <div className={styles.changeFromTo}>
                  <Text className={styles.changeTag}>TO</Text>
                  <Text className={styles.changeCode}>{item.change.to}</Text>
                </div>
                <Text className={styles.changeContext}>{item.change.context}</Text>
              </div>
              <div className={styles.subpanel}>
                <Text className={styles.subsectionLabel}>
                  Affected resources ({item.affectedCount})
                </Text>
                <TagGroup className={styles.resourceTags} aria-label="Affected resources">
                  {item.affectedResources.map((r) => (
                    <Tag
                      key={r}
                      size="small"
                      shape="rounded"
                      appearance="outline"
                      className={styles.resourceTag}
                    >
                      {r}
                    </Tag>
                  ))}
                </TagGroup>
              </div>
            </div>
          ) : (
            <div className={styles.twoCol}>
              <div className={styles.subpanel}>
                <Text className={styles.subsectionLabel}>What it means for you</Text>
                {item.impact.map((row) => (
                  <div key={row.mode} className={styles.impactRow}>
                    <Text
                      className={mergeClasses(
                        styles.impactLabel,
                        row.mode === "without" ? styles.impactWithout : styles.impactWith,
                      )}
                    >
                      {row.mode === "without" ? "Without" : "With"}
                    </Text>
                    <Text className={styles.impactText}>{row.text}</Text>
                  </div>
                ))}
              </div>
              <div className={styles.subpanel}>
                <Text className={styles.subsectionLabel}>
                  Affected resources ({item.affectedCount})
                </Text>
                <TagGroup className={styles.resourceTags} aria-label="Affected resources">
                  {item.affectedResources.map((r) => (
                    <Tag
                      key={r}
                      size="small"
                      shape="rounded"
                      appearance="outline"
                      className={styles.resourceTag}
                    >
                      {r}
                    </Tag>
                  ))}
                </TagGroup>
              </div>
            </div>
          )}

          <div className={styles.actionPlanBox}>
            <div className={styles.actionPlanHeader}>
              <ShieldCheckmark16Filled />
              <Text>Action plan</Text>
            </div>
            {item.actionPlan.map((step, idx) => (
              <div key={idx} className={styles.stepRow}>
                <div className={styles.stepBadge}>{idx + 1}</div>
                <div className={styles.stepBody}>
                  <Text className={styles.stepLabel}>{step.label}</Text>
                  <Text>{step.text}</Text>
                </div>
              </div>
            ))}
            <Divider />
            <div className={styles.takeItRow}>
              <Text className={styles.takeItLabel}>Take it with you:</Text>
              <Button size="small" appearance="subtle" icon={<DocumentPdf16Regular />}>
                Download PDF
              </Button>
              <Button size="small" appearance="subtle" icon={<DocumentTable16Regular />}>
                Download Excel
              </Button>
              <Button size="small" appearance="subtle" icon={<Copy16Regular />}>
                Copy LLM prompt
              </Button>
            </div>
          </div>

          <div className={styles.itemFooter}>
            {item.migrationGuideLabel && (
              <Button appearance="subtle" size="small" icon={<ChevronRight12Regular />} iconPosition="after">
                {item.migrationGuideLabel}
              </Button>
            )}
            <Button appearance="subtle" size="small">
              Postpone
            </Button>
            <Button appearance="subtle" size="small">
              Dismiss
            </Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text className={styles.eyebrow}>
          <ShieldCheckmark16Filled className={styles.eyebrowIcon} />
          Powered by EngOps agent
        </Text>
        <Text className={styles.title}>Here&apos;s what I&apos;d act on first</Text>
        <Text className={styles.description}>
          Prioritized by time pressure and blast radius across the scope you selected. Open any row to see the plan.
        </Text>
        <div className={styles.scopeLine}>
          <Text>
            Scope: {scopeLabel}
            {" · "}
          </Text>
          <FluentLink as="button" onClick={onChangeScope} appearance="default">
            Change scope
          </FluentLink>
          <Text className={styles.scopeCountMuted}>
            ({selectedCounts.subs} sub{selectedCounts.subs === 1 ? "" : "s"},{" "}
            {selectedCounts.rgs} rg{selectedCounts.rgs === 1 ? "" : "s"})
          </Text>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.tabHeaderRow}>
          <TabList
            selectedValue={activeTab}
            onTabSelect={(_, d) => setActiveTab(d.value as "deadlines" | "resiliency")}
            size="medium"
          >
            <Tab value="deadlines" icon={<Clock16Filled />}>
              Upcoming deadlines ({deadlineCount})
            </Tab>
            <Tab value="resiliency" icon={<ShieldCheckmark16Filled />}>
              Resiliency improvements ({RESILIENCY.length})
            </Tab>
          </TabList>
          <Text className={styles.tabCaption}>
            {activeTab === "deadlines"
              ? "Service retirements with hard cutover dates"
              : "Advisory recommendations by severity"}
          </Text>
        </div>

        <div className={styles.listShell}>
          <Accordion
            multiple
            collapsible
            openItems={openItemIds}
            onToggle={(_, d) => setOpenItemIds(d.openItems as string[])}
          >
            {items.map(renderItem)}
          </Accordion>
        </div>
      </div>

      <div className={styles.portfolioBox}>
        <div className={styles.portfolioHeader}>
          <ArrowDownload16Regular />
          <Text>Portfolio action plan</Text>
        </div>
        <Text className={styles.portfolioSubtitle}>
          1 overdue · 1 within 30 days · 10 recommendations rolled up into a time-phased brief.
        </Text>
        {PORTFOLIO_PLAN.map((step, idx) => (
          <div key={idx} className={styles.stepRow}>
            <div className={styles.stepBadge}>{idx + 1}</div>
            <div className={styles.stepBody}>
              <Text className={styles.stepLabel}>{step.label}</Text>
              <Text>{step.text}</Text>
            </div>
          </div>
        ))}
        <Divider />
        <div className={styles.takeItRow}>
          <Text className={styles.takeItLabel}>Take it with you:</Text>
          <Button size="small" appearance="subtle" icon={<DocumentPdf16Regular />}>
            Download PDF
          </Button>
          <Button size="small" appearance="subtle" icon={<DocumentTable16Regular />}>
            Download Excel
          </Button>
          <Button size="small" appearance="subtle" icon={<Copy16Regular />}>
            Copy LLM prompt
          </Button>
        </div>
      </div>

      <div>
        <Text className={styles.followupHeading}>Keep going with the agent</Text>
        <div className={styles.followupRow}>
          {FOLLOWUP_PROMPTS.map((p) => (
            <Button
              key={p}
              appearance="outline"
              shape="circular"
              size="small"
              className={styles.followupChip}
              onClick={() => onFollowUp?.(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
