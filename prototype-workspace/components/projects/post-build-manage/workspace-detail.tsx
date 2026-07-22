"use client";

import React, { useState, useEffect } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Text,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ChevronUp12Regular,
  ChevronDown12Regular,
  ChevronRight16Regular,
  Alert20Regular,
  Send20Regular,
  Dismiss20Regular,
  Money20Regular,
  Edit20Regular,
  DataBarVertical20Regular,
  Share20Regular,
  ArrowClockwise20Regular,
  Filter20Regular,
  MoreHorizontal20Regular,
  Sparkle20Regular,
  Sparkle20Filled,
  TextBulletListSquareSparkle20Regular,
  Copy20Regular,
  ArrowSync20Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  CheckmarkCircle16Filled,
  Circle16Filled,
  ArrowRight20Filled,
  Stop20Filled,
  Dismiss16Regular,
  Fire20Regular,
} from "@fluentui/react-icons";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { CopilotRegularIcon } from "../../shared/copilot-regular-icon";
import { MorseCode } from "@fluentui-copilot/react-morse-code";
import { CopilotProvider } from "@fluentui-copilot/react-copilot";

// ---------------------------------------------------------------------------
// Mock chart data
// ---------------------------------------------------------------------------

// Baseline (Day 100): degraded response times — spiky, high latency under load
const responseTimeBaselineData = [
  { time: "10:00", avgMs: 420 },
  { time: "10:15", avgMs: 480 },
  { time: "10:30", avgMs: 520 },
  { time: "10:45", avgMs: 610 },
  { time: "11:00", avgMs: 580 },
  { time: "11:15", avgMs: 720 },
  { time: "11:30", avgMs: 680 },
  { time: "11:45", avgMs: 750 },
  { time: "12:00", avgMs: 810 },
  { time: "12:15", avgMs: 760 },
  { time: "12:30", avgMs: 690 },
  { time: "12:45", avgMs: 730 },
  { time: "1:00", avgMs: 650 },
  { time: "1:15", avgMs: 580 },
  { time: "1:30", avgMs: 620 },
  { time: "1:45", avgMs: 540 },
  { time: "2:00", avgMs: 570 },
  { time: "2:15", avgMs: 610 },
  { time: "2:30", avgMs: 680 },
  { time: "2:45", avgMs: 720 },
  { time: "3:00", avgMs: 760 },
];

// After-VMSS: continuation of baseline, then a clear drop once VMSS scales out
const responseTimeAfterVmssData = [
  // ── baseline degraded period (same spiky data) ──
  { time: "10:00", avgMs: 420 },
  { time: "10:15", avgMs: 480 },
  { time: "10:30", avgMs: 520 },
  { time: "10:45", avgMs: 610 },
  { time: "11:00", avgMs: 580 },
  { time: "11:15", avgMs: 720 },
  { time: "11:30", avgMs: 680 },
  { time: "11:45", avgMs: 750 },
  { time: "12:00", avgMs: 810 },
  { time: "12:15", avgMs: 760 },
  { time: "12:30", avgMs: 690 },
  // ── VMSS kicks in — sharp improvement ──
  { time: "12:45", avgMs: 460 },
  { time: "1:00", avgMs: 320 },
  { time: "1:15", avgMs: 260 },
  { time: "1:30", avgMs: 230 },
  { time: "1:45", avgMs: 218 },
  { time: "2:00", avgMs: 212 },
  { time: "2:15", avgMs: 220 },
  { time: "2:30", avgMs: 215 },
  { time: "2:45", avgMs: 210 },
  { time: "3:00", avgMs: 205 },
];

// Original data kept for dashboard-chart-added scenario
const responseTimeMockData = [
  { hour: "12 AM", avgMs: 124 },
  { hour: "1 AM", avgMs: 98 },
  { hour: "2 AM", avgMs: 87 },
  { hour: "3 AM", avgMs: 82 },
  { hour: "4 AM", avgMs: 91 },
  { hour: "5 AM", avgMs: 105 },
  { hour: "6 AM", avgMs: 142 },
  { hour: "7 AM", avgMs: 178 },
  { hour: "8 AM", avgMs: 215 },
  { hour: "9 AM", avgMs: 267 },
  { hour: "10 AM", avgMs: 312 },
  { hour: "11 AM", avgMs: 345 },
  { hour: "12 PM", avgMs: 298 },
  { hour: "1 PM", avgMs: 276 },
  { hour: "2 PM", avgMs: 289 },
  { hour: "3 PM", avgMs: 321 },
  { hour: "4 PM", avgMs: 265 },
  { hour: "5 PM", avgMs: 234 },
  { hour: "6 PM", avgMs: 198 },
  { hour: "7 PM", avgMs: 176 },
  { hour: "8 PM", avgMs: 162 },
  { hour: "9 PM", avgMs: 148 },
  { hour: "10 PM", avgMs: 135 },
  { hour: "11 PM", avgMs: 118 },
];

// ---------------------------------------------------------------------------
// Mock data — daily cost area chart (actual + forecast)
// ---------------------------------------------------------------------------
const costAreaData = [
  { day: "Jun 1", actual: 0, forecast: null },
  { day: "Jun 3", actual: 4, forecast: null },
  { day: "Jun 5", actual: 8, forecast: null },
  { day: "Jun 8", actual: 14, forecast: null },
  { day: "Jun 10", actual: 18, forecast: null },
  { day: "Jun 12", actual: 22, forecast: null },
  { day: "Jun 15", actual: 28, forecast: null },
  { day: "Jun 18", actual: 33, forecast: null },
  { day: "Jun 20", actual: 36, forecast: null },
  { day: "Jun 22", actual: 39, forecast: null },
  { day: "Jun 25", actual: 43, forecast: 43 },
  { day: "Jun 26", actual: null, forecast: 53 },
  { day: "Jun 27", actual: null, forecast: 63 },
  { day: "Jun 28", actual: null, forecast: 73 },
  { day: "Jun 29", actual: null, forecast: 84 },
  { day: "Jun 30", actual: null, forecast: 96 },
];

const postDeployCostAreaData = [
  { day: "Jun 23", actual: 0, forecast: null },
  { day: "Jun 24", actual: 0, forecast: null },
  { day: "Jun 25", actual: 0, forecast: 0 },
  { day: "Jun 26", actual: null, forecast: 5 },
  { day: "Jun 27", actual: null, forecast: 14 },
  { day: "Jun 28", actual: null, forecast: 24 },
  { day: "Jun 29", actual: null, forecast: 34 },
  { day: "Jun 30", actual: null, forecast: 42 },
];

// After-VMSS cost chart — reflects VMSS addition mid-month
const afterVmssCostAreaData = [
  { day: "Jun 1", actual: 0, forecast: null },
  { day: "Jun 3", actual: 4, forecast: null },
  { day: "Jun 5", actual: 8, forecast: null },
  { day: "Jun 8", actual: 14, forecast: null },
  { day: "Jun 10", actual: 18, forecast: null },
  { day: "Jun 12", actual: 22, forecast: null },
  { day: "Jun 15", actual: 28, forecast: null },
  { day: "Jun 18", actual: 33, forecast: null },
  { day: "Jun 20", actual: 40, forecast: null },
  { day: "Jun 22", actual: 52, forecast: null },
  { day: "Jun 25", actual: 82, forecast: 82 },
  { day: "Jun 27", actual: null, forecast: 160 },
  { day: "Jun 30", actual: null, forecast: 243 },
];

// Pre-optimization cost chart — AKS cluster added to workspace, higher combined spend
const preOptCostAreaData = [
  { day: "Jun 1", actual: 0, forecast: null },
  { day: "Jun 3", actual: 12, forecast: null },
  { day: "Jun 5", actual: 28, forecast: null },
  { day: "Jun 8", actual: 52, forecast: null },
  { day: "Jun 10", actual: 72, forecast: null },
  { day: "Jun 12", actual: 95, forecast: null },
  { day: "Jun 15", actual: 120, forecast: null },
  { day: "Jun 18", actual: 148, forecast: null },
  { day: "Jun 20", actual: 162, forecast: null },
  { day: "Jun 22", actual: 175, forecast: null },
  { day: "Jun 25", actual: 187, forecast: 187 },
  { day: "Jun 27", actual: null, forecast: 380 },
  { day: "Jun 30", actual: null, forecast: 563 },
];

// After-optimization cost chart — rightsized pods flatten the curve
const afterOptCostAreaData = [
  { day: "Jun 1", actual: 0, forecast: null },
  { day: "Jun 3", actual: 12, forecast: null },
  { day: "Jun 5", actual: 28, forecast: null },
  { day: "Jun 8", actual: 52, forecast: null },
  { day: "Jun 10", actual: 72, forecast: null },
  { day: "Jun 12", actual: 95, forecast: null },
  { day: "Jun 15", actual: 120, forecast: null },
  { day: "Jun 18", actual: 148, forecast: null },
  { day: "Jun 20", actual: 162, forecast: null },
  { day: "Jun 22", actual: 175, forecast: null },
  { day: "Jun 25", actual: 192, forecast: 192 },
  { day: "Jun 27", actual: null, forecast: 270 },
  { day: "Jun 30", actual: null, forecast: 348 },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Resource {
  id: string;
  name: string;
  type: string;
  resourceGroup: string;
  location: string;
  subscription: string;
  status: "Running" | "Stopped" | "Deallocated" | "Creating" | "Failed";
  category: string;
  managedBy?: "embr" | "azure";
}

export interface WorkspaceDetailProps {
  mode: "drawer" | "fullpage";
  title: string;
  selectedIds: Set<string>;
  resources: Resource[];
  resourceMonthlyCost: Record<string, number>;
  summaryExpanded: boolean;
  setSummaryExpanded: (fn: (v: boolean) => boolean) => void;
  summaryLoading: boolean;
  showResponseTimeChart: boolean;
  setShowResponseTimeChart: (v: boolean) => void;
  chartLoading: boolean;
  setChartLoading: (v: boolean) => void;
  copilotInputValue: string;
  setCopilotInputValue: (v: string) => void;
  promptModalOpen: boolean;
  setPromptModalOpen: (v: boolean) => void;
  onClose?: () => void;
  onCreateScalableVm?: () => void;
  onOpenOptimizationAgent?: () => void;
  onOpenCopilotPanel?: () => void;
  onAddDashboardChart?: () => void;
  scenario?: WorkspaceDetailScenario;
}

export type WorkspaceDetailScenario =
  | "post-deploy"
  | "baseline"
  | "after-vmss"
  | "pre-optimization"
  | "after-optimization"
  | "dashboard-chart-added";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const useStyles = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  /* ---- Header ---- */
  headerWrapper: {
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  breadcrumbRow: {
    display: "flex",
    alignItems: "center",
    padding: "10px 24px 0 24px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    gap: "4px",
  },
  breadcrumbLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    ":hover": { textDecorationLine: "underline" },
  },
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
    margin: "0 2px",
  },
  breadcrumbCurrent: {
    color: tokens.colorNeutralForeground1,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px 16px 24px",
  },
  titleLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  titleActions: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
  },
  commandRow: {
    display: "flex",
    alignItems: "center",
    padding: "8px 24px",
    gap: "4px",
  },
  commandSpacer: {
    flex: 1,
  },
  commandDivider: {
    width: "1px",
    height: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "0 4px",
  },

  /* ---- Body ---- */
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  /* ---- Left pane ---- */
  leftPane: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  },
  leftPaneSplit: {
    flex: "0 0 70%",
  },
  leftPaneScroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: "24px",
    paddingBottom: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
  },

  /* ---- Action cards ---- */
  actionCardsRow: {
    display: "flex",
    gap: "16px",
    padding: "0 24px",
    marginBottom: "24px",
  },
  actionCard: {
    flex: 1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px 24px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  actionCardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  actionCardTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  actionCardDescription: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },

  /* ---- Copilot summary (Inline Copilot card) ---- */
  copilotSummaryCard: {
    margin: "0 24px 24px 24px",
    padding: "12px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.14), 0px 0px 2px rgba(0,0,0,0.12)",
  },
  copilotSummaryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none" as const,
  },
  copilotSummaryTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  copilotSummaryChevron: {
    transition: "transform 0.2s ease",
    flexShrink: 0,
    color: tokens.colorNeutralForeground3,
  },
  copilotSummaryContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  copilotStatusRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  copilotResponseText: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    maxWidth: "1000px",
    maxHeight: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  copilotFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  copilotFooterRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: "6px",
  },
  copilotFooterActions: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  copilotFooterFeedback: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  copilotDisclaimerText: {
    fontSize: "10px",
    lineHeight: "14px",
    color: tokens.colorNeutralForeground3,
    textAlign: "right" as const,
  },

  /* ---- Section titles ---- */
  sectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    padding: "0 24px",
    marginBottom: "16px",
  },

  /* ---- Metrics section ---- */
  metricsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
    padding: "0 24px",
  },
  metricsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },
  metricCard: {
    minWidth: 0,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  metricCardWide: {
    gridColumn: "span 3",
  },
  metricCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px 12px 16px",
  },
  metricCardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  metricCardDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  metricCardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  metricCardChevron: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "transparent",
    borderRadius: "4px",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    flexShrink: 0,
    padding: 0,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  metricCardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0 16px 24px 16px",
  },
  metricCardBodyRow: {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  },
  metricCardCostRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "0 16px 24px 16px",
  },
  metricCardCostStats: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    flexShrink: 0,
    flex: 1,
  },
  metricCardCostChart: {
    flex: 1,
    minWidth: 0,
  },
  metricStatBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metricStatLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "16px",
  },
  metricStatValue: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  metricStatValueRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  metricSparkline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
  },
  trendArrow: {
    display: "inline-block",
    fontSize: "16px",
    lineHeight: 1,
    fontWeight: tokens.fontWeightSemibold,
  },
  alertDetailBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "6px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  alertDetailTitle: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    lineHeight: "16px",
  },
  alertDetailDesc: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "16px",
  },
  metricCardFootnote: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "16px",
    whiteSpace: "pre-line" as const,
  },
  chartCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    padding: "16px 16px 12px 16px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  chartTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
    marginBottom: "12px",
  },
  chartShimmer: {
    height: "200px",
    borderRadius: "8px",
    background: `linear-gradient(90deg, ${tokens.colorNeutralStroke1} 25%, ${tokens.colorNeutralBackground3} 50%, ${tokens.colorNeutralStroke1} 75%)`,
    backgroundSize: "200% 100%",
    animationName: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
    animationDuration: "1.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },

  /* ---- Floating copilot input ---- */
  copilotInputWrapper: {
    position: "sticky",
    bottom: "0",
    padding: "12px 24px 48px 24px",
    zIndex: 10,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  copilotInputCard: {
    display: "flex",
    alignItems: "center",
    padding: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: "0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)",
    position: "relative" as const,
    overflow: "hidden",
  },
  copilotInput: {
    flex: 1,
    height: "32px",
    padding: "0 4px",
    fontSize: "14px",
    lineHeight: "20px",
    border: "none",
    borderRadius: "0",
    outline: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    "::placeholder": {
      color: tokens.colorNeutralForeground3,
    },
  },
  copilotSendButton: {
    width: "32px",
    height: "32px",
    borderRadius: "9999px",
    backgroundColor: tokens.colorBrandBackground,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: "6px",
    transition: "opacity 0.15s ease",
    ":hover": {
      opacity: 0.9,
    },
  },
  copilotSendButtonHidden: {
    width: "32px",
    height: "32px",
    borderRadius: "9999px",
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: "6px",
    visibility: "hidden" as const,
  },
  copilotFocusLine: {
    position: "absolute" as const,
    bottom: 0,
    left: "6px",
    right: "6px",
    height: "2px",
    borderRadius: "1px",
    backgroundColor: tokens.colorBrandBackground,
  },
  /* ---- Generating state ---- */
  copilotGeneratingCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 12px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: "0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)",
    overflow: "hidden",
  },
  copilotReasoningText: {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap" as const,
  },
  copilotGeneratingActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    height: "32px",
    flexShrink: 0,
  },
  copilotLoader: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    width: "100px",
    height: "5px",
  },
  copilotLoaderDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    animationName: {
      "0%, 100%": { opacity: 0.3, transform: "scale(0.8)" },
      "50%": { opacity: 1, transform: "scale(1)" },
    },
    animationDuration: "1.4s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  copilotStopButton: {
    width: "32px",
    height: "32px",
    borderRadius: "9999px",
    backgroundColor: tokens.colorBrandBackground2,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: "6px",
  },
  copilotEscBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "16px",
    minWidth: "16px",
    padding: "0 2px",
    borderRadius: "9999px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    fontSize: "10px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground2,
    lineHeight: "14px",
    flexShrink: 0,
  },

  /* ---- Right pane (resources sidebar) ---- */
  rightPane: {
    flex: "0 0 30%",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  rightHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px 12px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralBackground3}`,
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    flexShrink: 0,
  },
  addRelatedLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    ":hover": { textDecorationLine: "underline" },
  },
  resourceGridHeader: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    borderBottom: `1px solid ${tokens.colorNeutralBackground3}`,
    backgroundColor: tokens.colorNeutralBackground3,
    position: "sticky" as const,
    top: 0,
    zIndex: 1,
  },
  resourceGridHeaderCell: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "0 16px",
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    cursor: "pointer",
    flex: 1,
  },
  resourceRow: {
    display: "flex",
    alignItems: "center",
    height: "32px",
    borderBottom: `1px solid ${tokens.colorNeutralBackground3}`,
  },
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "0 16px",
    flex: 1,
    overflow: "hidden",
    minWidth: 0,
  },
  resourceTypeCell: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    flex: 1,
    overflow: "hidden",
    minWidth: 0,
  },
  resourceIcon: {
    width: "18px",
    height: "18px",
    flexShrink: 0,
    objectFit: "contain" as const,
  },
  resourceName: {
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorBrandForeground1,
    fontSize: "13px",
    lineHeight: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  resourceType: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  /* ---- Loading shimmer ---- */
  shimmerLine: {
    borderRadius: "6px",
    background: `linear-gradient(90deg, ${tokens.colorNeutralStroke1} 25%, ${tokens.colorNeutralBackground3} 50%, ${tokens.colorNeutralStroke1} 75%)`,
    backgroundSize: "200% 100%",
    animationName: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
    animationDuration: "1.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },

  /* ---- Extracted inline-style replacements ---- */

  /* Button helpers */
  btnHeight32: { height: "32px" },
  btnCompact: { minWidth: "auto", padding: "2px" },
  btnCompactDismiss: { minWidth: "auto", padding: "4px", color: tokens.colorNeutralForeground3 },
  btnFullWidth: { width: "100%", marginTop: "auto" },
  copilotAccentBorder: {
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
    border: "1px solid transparent",
  },

  /* Shimmer size variants */
  shimmerFull20: { height: "20px", width: "100%" },
  shimmerFull12: { height: "12px", width: "100%" },
  shimmerW85: { height: "12px", width: "85%" },
  shimmerW60: { height: "12px", width: "60%" },
  shimmerH16W60: { height: "16px", width: "60px", marginBottom: "16px" },
  shimmerH12W120: { height: "12px", width: "120px", borderRadius: "4px" },
  shimmerH24W80: { height: "24px", width: "80px", borderRadius: "4px" },
  shimmerH140Full: { height: "140px", width: "100%" },
  shimmerH16W50: { height: "16px", width: "50px", marginBottom: "16px" },
  shimmerH12W50: { height: "12px", width: "50px", borderRadius: "4px" },
  shimmerH24W24: { height: "24px", width: "24px", borderRadius: "4px" },
  shimmerH12W40: { height: "12px", width: "40px", borderRadius: "4px" },
  shimmerH48Full: { height: "48px", width: "100%" },
  shimmerFlexFull: { height: "100%", flex: 1, borderRadius: "8px" },
  shimmerH140Flex: { height: "140px", flex: 1, borderRadius: "8px" },

  /* Layout containers */
  shimmerLoading: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    padding: "8px 0",
  },
  statusWrap: { display: "flex", flexWrap: "wrap" as const, gap: "4px 16px" },
  actionButtonRow: { display: "flex", gap: "8px", marginTop: "4px" },
  flexColumnCard: { display: "flex", flexDirection: "column" as const },
  flexBodyFull: { flex: 1, display: "flex", flexDirection: "column" as const },
  flexGap16: { display: "flex", gap: "16px" },
  flexGap24: { display: "flex", gap: "24px" },
  flexColGap12Fixed: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    flex: "0 0 140px",
  },
  flexColGap4: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  flex1: { flex: 1 },
  flexGap16Mb12: { display: "flex", gap: "16px", marginBottom: "12px" },

  /* Text/icon styles */
  foregroundIcon2: { color: tokens.colorNeutralForeground2 },
  foregroundText1: { color: tokens.colorNeutralForeground1 },
  iconCheckGreen: { color: tokens.colorPaletteGreenForeground1, flexShrink: 0 },
  iconCircleOrange: { color: tokens.colorPaletteDarkOrangeForeground1, flexShrink: 0 },
  sparkleIcon16: { fontSize: "16px" },
  sparkleIcon14: { fontSize: "14px" },
  sortArrow: { fontSize: "10px", color: tokens.colorNeutralForeground4 },

  /* Metric card dots */
  metricDotGreen: { backgroundColor: tokens.colorPaletteGreenForeground1 },
  metricDotOrange: { backgroundColor: tokens.colorPaletteDarkOrangeForeground1 },
  trendGreen: { color: tokens.colorPaletteGreenForeground1 },
  metricCardPadded: { padding: "16px" },
  metricsRowFixed: { height: "192px" },
  metricFootnoteFlex: { flex: 1 },

  /* Metrics section header */
  metricsSectionHeader: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  sectionTitleFlex: { display: "flex", alignItems: "center", marginBottom: 0 },
  addMetricButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorBrandForeground1,
    marginLeft: "8px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "2px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 400,
  },

  /* Inline copilot input bar */
  copilotInputBarPositioner: {
    position: "absolute" as const,
    left: "120px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "495px",
    minWidth: "320px",
    zIndex: 30,
  },
  copilotInputBarCardBase: {
    display: "flex",
    alignItems: "center",
    padding: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    boxShadow: "0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)",
    position: "relative" as const,
    overflow: "hidden",
    zIndex: 20,
  },
  copilotInputBarRoundBottom: {
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  copilotInputBarFlatBottom: {
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  },
  copilotGeneratingRow: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: "32px",
    padding: "0 4px",
    gap: "8px",
  },
  copilotReasoningLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  copilotGeneratingActionsRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
    marginRight: "4px",
  },
  morseCodeWrapper: { width: "108px", flexShrink: 0 },
  copilotStopCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground2,
    cursor: "pointer",
    flexShrink: 0,
  },
  stopIconBrand: { color: tokens.colorBrandForeground1, fontSize: "16px" },
  escBadgeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
    height: "16px",
    borderRadius: "2px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    flexShrink: 0,
  },
  escBadgeText: {
    fontSize: "10px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground3,
  },
  copilotInlineInput: {
    flex: 1,
    height: "32px",
    padding: "0 4px",
    fontSize: "14px",
    lineHeight: "20px",
    border: "none",
    borderRadius: "0",
    outline: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
  },

  /* Suggestions dropdown */
  copilotSuggestionsDropdown: {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    border: "1px solid rgba(255,255,255,0)",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    boxShadow: "0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)",
    zIndex: 19,
    padding: "0 4px",
  },
  suggestionsHeading: { padding: "8px 8px 0 8px" },
  suggestionsLabel: {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16px",
    color: tokens.colorNeutralForeground2,
  },
  suggestionItem: {
    padding: "6px 10px",
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderRadius: "4px",
    ":hover": { backgroundColor: tokens.colorNeutralBackground3 },
  },
  spacer4: { height: "4px" },

  /* Chart */
  chartSubtitle: {
    display: "block",
    fontSize: "12px",
    fontWeight: 400,
    color: tokens.colorNeutralForeground3,
    marginTop: "2px",
  },
  chartCardFlex: { flex: 1, minWidth: 0 },

  /* Recharts custom tooltip */
  tooltipContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "6px",
    padding: "8px 10px",
    fontSize: "12px",
  },
  tooltipTitle: { fontWeight: 600, marginBottom: "4px" },
  tooltipRow: { display: "flex", justifyContent: "space-between", gap: "12px" },
  tooltipTotal: {
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    marginTop: "4px",
    paddingTop: "4px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 600,
  },

  /* Resource panel */
  resourceRowDisabled: { opacity: 0.5 },
  embrFireIcon: {
    color: tokens.colorPaletteDarkOrangeForeground1,
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },

  /* Tooltip dynamic color classes */
  tooltipColorAks: { color: tokens.colorBrandForeground1 },
  tooltipColorSql: { color: tokens.colorPaletteGreenForeground1 },
  tooltipColorVm: { color: tokens.colorPaletteLightBlueForeground2 },
  tooltipColorOther: { color: tokens.colorNeutralForeground3 },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const typeDisplayMap: Record<string, string> = {
  "Resource Group": "Resource group",
  "App Service Plan": "App service plan",
  "Web App": "Web app",
  "App Service": "Web app",
  "Storage Account": "Storage account",
  "Key Vault": "Key vault",
  "Application Insights": "Application insights",
  "Azure Cache for Redis": "Azure Cache for Redis",
  "Cosmos DB": "Cosmos DB",
  "SQL Database": "SQL Database",
  "Function App": "Function app",
  "Container App": "Container app",
  "Container Apps Environment": "Container Apps environment",
  "Log Analytics Workspace": "Log Analytics workspace",
  "Azure Monitor Workspace": "Azure Monitor workspace",
  "Virtual Network": "Virtual network",
  "Network Security Group": "Network security group",
  "Application Gateway": "Application gateway",
  "Kubernetes Service": "Kubernetes service",
};

const typeIconMap: Record<string, string> = {
  "Resource Group":
    "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg",
  "App Service Plan":
    "/azure-service-icons/app services/00046-icon-service-App-Service-Plans.svg",
  "Web App": "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
  "App Service":
    "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
  "Storage Account":
    "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
  "Key Vault":
    "/azure-service-icons/security/10245-icon-service-Key-Vaults.svg",
  "Application Insights":
    "/azure-service-icons/devops/00012-icon-service-Application-Insights.svg",
  "Azure Cache for Redis":
    "/azure-service-icons/databases/10137-icon-service-Cache-Redis.svg",
  "Cosmos DB":
    "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
  "Cosmos DB Account":
    "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
  "SQL Database":
    "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
  "Function App":
    "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
  "Container App": "/icons/containerapps.svg",
  "Container Apps Environment": "/icons/containerapps.svg",
  "Log Analytics Workspace":
    "/azure-service-icons/devops/00012-icon-service-Application-Insights.svg",
  "Azure Monitor Workspace":
    "/azure-service-icons/devops/00012-icon-service-Application-Insights.svg",
  "Virtual Network":
    "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg",
  "Virtual Machine":
    "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  "Virtual Machine Scale Set": "/icons/VM-Scale-Sets.svg",
  "Network Security Group":
    "/azure-service-icons/networking/10067-icon-service-Network-Security-Groups.svg",
  "Application Gateway":
    "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg",
  "Load Balancer":
    "/azure-service-icons/networking/10062-icon-service-Load-Balancers.svg",
  "Web Application Firewall":
    "/azure-service-icons/networking/10362-icon-service-Web-Application-Firewall-Policies(WAF).svg",
  "Azure OpenAI":
    "/azure-service-icons/ai + machine learning/02749-icon-service-Azure-Applied-AI-Services.svg",
  "Machine Learning Workspace":
    "/azure-service-icons/ai + machine learning/02749-icon-service-Azure-Applied-AI-Services.svg",
  "AI Search":
    "/azure-service-icons/ai + machine learning/02749-icon-service-Azure-Applied-AI-Services.svg",
  "Speech Service":
    "/azure-service-icons/ai + machine learning/02749-icon-service-Azure-Applied-AI-Services.svg",
  "PostgreSQL Server":
    "/azure-service-icons/databases/10131-icon-service-Azure-Database-PostgreSQL-Server.svg",
  "PostgreSQL Flexible Server":
    "/azure-service-icons/databases/10131-icon-service-Azure-Database-PostgreSQL-Server.svg",
  "Azure Database for PostgreSQL":
    "/azure-service-icons/databases/10131-icon-service-Azure-Database-PostgreSQL-Server.svg",
  "Kubernetes Service":
    "/azure-service-icons/compute/10023-icon-service-Kubernetes-Services.svg",
};

function getDisplayType(rawType: string): string {
  return typeDisplayMap[rawType] || rawType;
}

function getResourceTypeIcon(rawType: string): string {
  return (
    typeIconMap[rawType] ||
    "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg"
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const WorkspaceDetail: React.FC<WorkspaceDetailProps> = ({
  mode,
  title,
  selectedIds,
  resources,
  resourceMonthlyCost,
  summaryExpanded,
  setSummaryExpanded,
  summaryLoading,
  showResponseTimeChart,
  setShowResponseTimeChart,
  chartLoading,
  setChartLoading,
  copilotInputValue,
  setCopilotInputValue,
  setPromptModalOpen,
  onClose,
  onCreateScalableVm,
  onOpenOptimizationAgent,
  onOpenCopilotPanel,
  onAddDashboardChart,
  scenario = "baseline",
}) => {
  const styles = useStyles();
  const [scopeVisible, setScopeVisible] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const selectedResources = resources.filter((r) => selectedIds.has(r.id));
  const monthlyCostTotal = selectedResources
    .reduce((sum, r) => sum + (resourceMonthlyCost[r.id] || 0), 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const [copilotGenerating, setCopilotGenerating] = useState(false);
  const [copilotFocused, setCopilotFocused] = useState(false);
  const [metricsInputOpen, setMetricsInputOpen] = useState(false);
  const [sparkleHovered, setSparkleHovered] = useState(false);
  const [showDailyCostChart, setShowDailyCostChart] = useState(
    scenario === "dashboard-chart-added",
  );
  const [dailyCostChartLoading, setDailyCostChartLoading] = useState(false);
  const [morseCodeVisible, setMorseCodeVisible] = useState(false);
  const chartRowRef = React.useRef<HTMLDivElement>(null);

  const summaryStatusByScenario: Record<WorkspaceDetailScenario, string> = {
    "post-deploy": "Your app deployment completed and resources are healthy.",
    baseline: "All 8 resources healthy.",
    "after-vmss":
      "All 9 resources healthy. No active alerts. Scale set deployed successfully.",
    "pre-optimization": "All 10 resources healthy.",
    "after-optimization":
      "All 10 resources healthy. No active alerts. Costs trending down.",
    "dashboard-chart-added":
      "All 10 resources healthy. No active alerts. Dashboard updated.",
  };

  const summaryBodyByScenario: Record<WorkspaceDetailScenario, string> = {
    "post-deploy":
      "Your deployment is online. The workspace includes your PostgreSQL database and Embr platform services (compute, storage, DNS). Azure-managed resources can be configured directly; Embr platform resources are read-only.",
    baseline:
      "Zava-VM is showing sustained high CPU — consider scaling out. Costs are tracking 12% above last month, mostly from the VM and PostgreSQL. Resiliency is at 50%; two resources lack zone redundancy.",
    "after-vmss":
      "zava-1-vmss is running with 2 instances and a default autoscale policy. CPU on Zava-VM has stabilized since traffic is now distributed. Forecast cost rose to $243 with the added capacity. Your storage account has public network access enabled — consider restricting it to trusted networks.",
    "pre-optimization":
      "The AKS cluster zava-aks-cluster was recently added to the workspace, bringing the combined monthly forecast to $563. The cluster is showing low utilization — CPU averages 23% and memory 31% across nodes. Several pods are requesting far more resources than they consume. Rightsizing pod requests could reduce node count and lower costs significantly.",
    "after-optimization":
      "Forecast dropped 38% to $348 after AKS pod rightsizing. Response times stable under SLO. No active alerts across all resources. Resiliency at 50% — 3 resources still lack zone redundancy.",
    "dashboard-chart-added":
      "The daily cost chart has been added to the workspace dashboard, giving the team a persistent view of spend trends alongside alerts, deployments, and resiliency.",
  };

  const primaryActionByScenario: Record<
    WorkspaceDetailScenario,
    {
      title: string;
      description: string;
      buttonLabel: string;
      onClick?: () => void;
      copilotAccent?: boolean;
    }
  > = {
    "post-deploy": {
      title: "Set up alerts for your resources",
      description:
        "Set alert rules to be notified of important events like performance degradation or resource health issues. For example, get notified if embr-pg-server experiences increased latency.",
      buttonLabel: "Set new alert",
    },
    baseline: {
      title: "Scale out your VM for sustained traffic",
      description:
        'Sustained increases in incoming traffic and resource utilization has been detected on "Zava-VM". Scaling out the VM can help distribute load and handle demand more reliably.',
      buttonLabel: "Create a scalable VM",
      onClick: onCreateScalableVm,
    },
    "after-vmss": {
      title: "Secure your storage",
      description:
        "Protect your data by restricting access to your storage account to trusted networks only. Enable Network Security Policies (NSP) to control who can access your resources and reduce exposure to unwanted traffic.",
      buttonLabel: "Enable network security policies",
    },
    "pre-optimization": {
      title: "Rightsize pod resources",
      description:
        "Several deployments in your AKS cluster request more CPU than they use. Adjusting resource limits to match actual usage (with a 20% buffer) can reduce cost without impacting performance.",
      buttonLabel: "Optimize resources",
      onClick: () => {
        setScopeVisible(false);
        onOpenCopilotPanel?.();
      },
      copilotAccent: true,
    },
    "after-optimization": {
      title: "Secure your storage",
      description:
        "Protect your data by restricting access to your storage account to trusted networks only. Enable Network Security Policies (NSP) to control who can access your resources and reduce exposure to unwanted traffic.",
      buttonLabel: "Enable network security policies",
    },
    "dashboard-chart-added": {
      title: "Secure your storage",
      description:
        "Protect your data by restricting access to your storage account to trusted networks only. Enable Network Security Policies (NSP) to control who can access your resources and reduce exposure to unwanted traffic.",
      buttonLabel: "Enable network security policies",
    },
  };

  const secondaryActionByScenario: Record<
    WorkspaceDetailScenario,
    {
      title: string;
      description: string;
      buttonLabel: string;
    }
  > = {
    "post-deploy": {
      title: "Protect your free credits with budget alerts",
      description:
        "Budget alerts notify you as credits are being used, so you can experiment freely without accidentally running out or triggering charges. Set an alert to get notified before your credits are exhausted.",
      buttonLabel: "Create a budget",
    },
    baseline: {
      title: "Improve resiliency with zone redundancy",
      description:
        "Half of your resources are not zone-redundant. Enabling availability zones for zava-orders-postgres and zavaretailassets helps protect against datacenter-level failures with minimal cost impact.",
      buttonLabel: "Review resiliency",
    },
    "after-vmss": {
      title: 'Review "zava-1-vmss" autoscale configuration',
      description:
        "A default autoscale policy was created when you scaled out to a VMSS. Review and fine-tune your autoscale rules\u2014or add additional policies\u2014to ensure scaling behavior matches your workload\u2019s traffic patterns and performance goals.",
      buttonLabel: "Review autoscale policy",
    },
    "pre-optimization": {
      title: "Improve resiliency with zone redundancy",
      description:
        "Half of your resources are not zone-redundant. Enabling availability zones for zava-orders-postgres and zavaretailassets helps protect against datacenter-level failures with minimal cost impact.",
      buttonLabel: "Review resiliency",
    },
    "after-optimization": {
      title: "Improve resiliency with zone redundancy",
      description:
        "Half of your resources are not zone-redundant. Enabling availability zones for zava-orders-postgres and zavaretailassets helps protect against datacenter-level failures with minimal cost impact.",
      buttonLabel: "Review resiliency",
    },
    "dashboard-chart-added": {
      title: "Improve resiliency with zone redundancy",
      description:
        "Half of your resources are not zone-redundant. Enabling availability zones for zava-orders-postgres and zavaretailassets helps protect against datacenter-level failures with minimal cost impact.",
      buttonLabel: "Review resiliency",
    },
  };

  const secondaryAction = secondaryActionByScenario[scenario];

  const primaryAction = primaryActionByScenario[scenario];
  const metricsByScenario: Record<
    WorkspaceDetailScenario,
    {
      incurredCost: string;
      incurredTrend?: string;
      forecastCost: string;
      forecastTrend?: string;
      costChartData: Array<{
        day: string;
        actual: number | null;
        forecast: number | null;
      }>;
      criticalAlerts: string;
      totalAlerts: string;
      alertTitle: string;
      alertDescription: string;
      deploymentsSucceeded: string;
      deploymentsFailed: string;
      activeIssues: string;
      issuesResolved: string;
      unhealthyResources: string;
      resiliencyValue: string;
      resiliencyFootnote: string;
    }
  > = {
    "post-deploy": {
      incurredCost: "$0 USD",
      forecastCost: "$42 USD",
      costChartData: postDeployCostAreaData,
      criticalAlerts: "0",
      totalAlerts: "0",
      alertTitle: "No alert rules configured",
      alertDescription: "Set up alerts for performance, health, or security.",
      deploymentsSucceeded: "1",
      deploymentsFailed: "0",
      activeIssues: "0",
      issuesResolved: "0",
      unhealthyResources: "0",
      resiliencyValue: "0%",
      resiliencyFootnote:
        "Single-region deployment\nRedundancy not configured yet",
    },
    baseline: {
      incurredCost: "$57 USD",
      incurredTrend: "12% MoM",
      forecastCost: "$96 USD",
      forecastTrend: "8% MoM",
      costChartData: costAreaData,
      criticalAlerts: "1",
      totalAlerts: "2",
      alertTitle: "High CPU usage on Zava-VM",
      alertDescription: "CPU above 85% for 30 min. Consider scaling out.",
      deploymentsSucceeded: "12",
      deploymentsFailed: "0",
      activeIssues: "0",
      issuesResolved: "5",
      unhealthyResources: "0",
      resiliencyValue: "50%",
      resiliencyFootnote: "3 non-zonal resilient\n4 zonally resilient",
    },
    "after-vmss": {
      incurredCost: "$82 USD",
      incurredTrend: "44% MoM",
      forecastCost: "$243 USD",
      forecastTrend: "153% MoM",
      costChartData: afterVmssCostAreaData,
      criticalAlerts: "0",
      totalAlerts: "0",
      alertTitle: "No active alerts",
      alertDescription: "All resources within normal thresholds.",
      deploymentsSucceeded: "13",
      deploymentsFailed: "0",
      activeIssues: "0",
      issuesResolved: "7",
      unhealthyResources: "0",
      resiliencyValue: "50%",
      resiliencyFootnote: "3 non-zonal resilient\n6 zonally resilient",
    },
    "pre-optimization": {
      incurredCost: "$187 USD",
      incurredTrend: "228% MoM",
      forecastCost: "$563 USD",
      forecastTrend: "486% MoM",
      costChartData: preOptCostAreaData,
      criticalAlerts: "0",
      totalAlerts: "1",
      alertTitle: "AKS cluster CPU underutilization",
      alertDescription:
        "Avg 23% CPU across nodes. Pods likely over-provisioned.",
      deploymentsSucceeded: "15",
      deploymentsFailed: "0",
      activeIssues: "0",
      issuesResolved: "7",
      unhealthyResources: "0",
      resiliencyValue: "50%",
      resiliencyFootnote: "3 non-zonal resilient\n7 zonally resilient",
    },
    "after-optimization": {
      incurredCost: "$192 USD",
      incurredTrend: "3% MoM",
      forecastCost: "$348 USD",
      forecastTrend: "-38% MoM",
      costChartData: afterOptCostAreaData,
      criticalAlerts: "0",
      totalAlerts: "0",
      alertTitle: "No active alerts",
      alertDescription: "Underutilization alert resolved after rightsizing.",
      deploymentsSucceeded: "16",
      deploymentsFailed: "0",
      activeIssues: "0",
      issuesResolved: "8",
      unhealthyResources: "0",
      resiliencyValue: "50%",
      resiliencyFootnote: "3 non-zonal resilient\n7 zonally resilient",
    },
    "dashboard-chart-added": {
      incurredCost: "$192 USD",
      incurredTrend: "3% MoM",
      forecastCost: "$348 USD",
      forecastTrend: "-38% MoM",
      costChartData: afterOptCostAreaData,
      criticalAlerts: "0",
      totalAlerts: "0",
      alertTitle: "No active alerts",
      alertDescription: "Underutilization alert resolved after rightsizing.",
      deploymentsSucceeded: "16",
      deploymentsFailed: "0",
      activeIssues: "0",
      issuesResolved: "8",
      unhealthyResources: "0",
      resiliencyValue: "50%",
      resiliencyFootnote: "3 non-zonal resilient\n7 zonally resilient",
    },
  };
  const currentMetrics = metricsByScenario[scenario];

  // Daily cost by service — stacked bar data (Jun 1–30, per-day spend)
  // Pre-optimization AKS was ~$10.7/day, after rightsizing drops to ~$3.5/day around Jun 20
  const dailyCostByResourceData = [
    { day: "Jun 1", aks: 10.7, sql: 2.1, vm: 1.8, other: 1.5 },
    { day: "Jun 3", aks: 10.5, sql: 2.2, vm: 1.8, other: 1.4 },
    { day: "Jun 5", aks: 10.8, sql: 2.1, vm: 1.9, other: 1.5 },
    { day: "Jun 7", aks: 10.6, sql: 2.3, vm: 1.7, other: 1.6 },
    { day: "Jun 9", aks: 10.9, sql: 2.1, vm: 1.8, other: 1.4 },
    { day: "Jun 11", aks: 10.4, sql: 2.2, vm: 1.9, other: 1.5 },
    { day: "Jun 13", aks: 10.7, sql: 2.0, vm: 1.8, other: 1.6 },
    { day: "Jun 15", aks: 10.8, sql: 2.1, vm: 1.7, other: 1.4 },
    { day: "Jun 17", aks: 10.5, sql: 2.2, vm: 1.9, other: 1.5 },
    { day: "Jun 19", aks: 10.6, sql: 2.1, vm: 1.8, other: 1.6 },
    { day: "Jun 20", aks: 5.2, sql: 2.2, vm: 1.8, other: 1.5 },
    { day: "Jun 21", aks: 3.6, sql: 2.1, vm: 1.9, other: 1.4 },
    { day: "Jun 23", aks: 3.5, sql: 2.2, vm: 1.8, other: 1.5 },
    { day: "Jun 25", aks: 3.4, sql: 2.1, vm: 1.7, other: 1.6 },
    { day: "Jun 27", aks: 3.5, sql: 2.3, vm: 1.8, other: 1.4 },
    { day: "Jun 29", aks: 3.6, sql: 2.1, vm: 1.9, other: 1.5 },
  ];

  // Response time chart — scenario-aware title, data, and visibility
  const responseTimeChartConfig: Record<
    string,
    {
      title: string;
      subtitle: string;
      data: typeof responseTimeBaselineData;
      dataKey: string;
      visible: boolean;
      yDomain?: [number, number];
    }
  > = {
    baseline: {
      title: "Server response time",
      subtitle: "",
      data: responseTimeBaselineData,
      dataKey: "avgMs",
      visible: true,
      yDomain: [0, 900],
    },
    "after-vmss": {
      title: "Server response time",
      subtitle: "",
      data: responseTimeAfterVmssData,
      dataKey: "avgMs",
      visible: true,
      yDomain: [0, 900],
    },
    "pre-optimization": {
      title: "Server response time",
      subtitle: "",
      data: responseTimeAfterVmssData,
      dataKey: "avgMs",
      visible: true,
      yDomain: [0, 900],
    },
    "after-optimization": {
      title: "Server response time",
      subtitle: "",
      data: responseTimeAfterVmssData,
      dataKey: "avgMs",
      visible: true,
      yDomain: [0, 900],
    },
    "dashboard-chart-added": {
      title: "Workspace dashboard — Avg Response Time (24h)",
      subtitle: "",
      data: responseTimeMockData as any,
      dataKey: "avgMs",
      visible: showResponseTimeChart,
    },
  };
  const chartConfig = responseTimeChartConfig[scenario];
  const showChart = chartConfig?.visible ?? showResponseTimeChart;
  const responseTimeChartTitle =
    chartConfig?.title ?? "app-gateway-01 — Avg Response Time (24h)";

  const handleSend = () => {
    if (copilotInputValue.trim()) {
      setCopilotGenerating(true);
      setSummaryExpanded(() => false);
      const sentValue = copilotInputValue;
      setCopilotInputValue("");
      setShowResponseTimeChart(true);
      setChartLoading(true);
      setTimeout(() => {
        setCopilotGenerating(false);
        setChartLoading(false);
      }, 2500);
    }
  };

  const handleStopGenerating = () => {
    setCopilotGenerating(false);
    setChartLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* ================================================================ */}
      {/* Header: Breadcrumb → Title → Command bar                        */}
      {/* ================================================================ */}
      <div className={styles.headerWrapper}>
        {/* Command bar row */}
        <div className={styles.commandRow}>
          <Button
            appearance="subtle"
            icon={<DataBarVertical20Regular />}
            size="small"
            className={styles.btnHeight32}
          >
            Add metrics
          </Button>
          <Button
            appearance="subtle"
            icon={<Edit20Regular />}
            size="small"
            className={styles.btnHeight32}
          >
            Edit layout
          </Button>
          <Button
            appearance="subtle"
            icon={<Share20Regular />}
            size="small"
            className={styles.btnHeight32}
          >
            Share
          </Button>
          <Button
            appearance="subtle"
            icon={<ArrowClockwise20Regular />}
            size="small"
            className={styles.btnHeight32}
          >
            Refresh
          </Button>

          <div className={styles.commandSpacer} />
          <div className={styles.commandDivider} />

          <Button
            appearance={scopeVisible ? "outline" : "subtle"}
            icon={<Filter20Regular />}
            size="small"
            className={styles.btnHeight32}
            onClick={() => setScopeVisible((v) => !v)}
          >
            Scope
          </Button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Body: left content + optional right resources sidebar            */}
      {/* ================================================================ */}
      <div className={styles.body}>
        {/* Left pane — scrollable card dashboard */}
        <div
          className={mergeClasses(
            styles.leftPane,
            scopeVisible ? styles.leftPaneSplit : undefined,
          )}
        >
          <div className={styles.leftPaneScroll}>
            {/* ---- Copilot Summary (Inline Copilot card) ---- */}
            {initialLoading ? (
              <div className={styles.copilotSummaryCard}>
                <div
                  className={mergeClasses(
                    styles.shimmerLine,
                    styles.shimmerFull20,
                  )}
                />
              </div>
            ) : (
              <div className={styles.copilotSummaryCard}>
                <div
                  className={styles.copilotSummaryHeader}
                  onClick={() => setSummaryExpanded((v) => !v)}
                >
                  <div className={styles.copilotSummaryTitleGroup}>
                    <TextBulletListSquareSparkle20Regular
                      className={styles.foregroundIcon2}
                    />
                    <Text
                      size={300}
                      weight="regular"
                      className={styles.foregroundIcon2}
                    >
                      Summarize with Copilot
                    </Text>
                  </div>
                  {summaryExpanded ? (
                    <ChevronUp12Regular
                      className={styles.copilotSummaryChevron}
                    />
                  ) : (
                    <ChevronDown12Regular
                      className={styles.copilotSummaryChevron}
                    />
                  )}
                </div>
                {summaryExpanded && (
                  <>
                    {summaryLoading ? (
                      <div className={styles.shimmerLoading}>
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerFull12,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerW85,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerW60,
                          )}
                        />
                      </div>
                    ) : (
                      <>
                        {/* Content */}
                        <div className={styles.copilotSummaryContent}>
                          <div className={styles.statusWrap}>
                            <div className={styles.copilotStatusRow}>
                              {scenario !== "post-deploy" && (
                                <CheckmarkCircle16Filled
                                  className={styles.iconCheckGreen}
                                />
                              )}
                              <Text
                                size={300}
                                className={styles.foregroundText1}
                              >
                                {summaryStatusByScenario[scenario]}
                              </Text>
                            </div>
                            {scenario === "baseline" && (
                              <div className={styles.copilotStatusRow}>
                                <Circle16Filled
                                  className={styles.iconCircleOrange}
                                />
                                <Text
                                  size={300}
                                  className={styles.foregroundText1}
                                >
                                  2 active alerts.
                                </Text>
                              </div>
                            )}
                            {scenario === "pre-optimization" && (
                              <div className={styles.copilotStatusRow}>
                                <Circle16Filled
                                  className={styles.iconCircleOrange}
                                />
                                <Text
                                  size={300}
                                  className={styles.foregroundText1}
                                >
                                  1 Cost advisory alert.
                                </Text>
                              </div>
                            )}
                          </div>
                          <div className={styles.copilotResponseText}>
                            {summaryBodyByScenario[scenario]}
                          </div>
                          {scenario === "baseline" && (
                            <div className={styles.actionButtonRow}>
                              <Button
                                appearance="outline"
                                size="small"
                                onClick={onCreateScalableVm}
                              >
                                Create a scalable VM
                              </Button>
                              <Button appearance="outline" size="small">
                                Review resiliency
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Footer: actions + feedback */}
                        <div className={styles.copilotFooter}>
                          <div className={styles.copilotFooterRow}>
                            <div className={styles.copilotFooterActions}>
                              <Button
                                appearance="subtle"
                                icon={<Copy20Regular />}
                                size="small"
                                aria-label="Copy"
                                className={styles.btnCompact}
                              />
                              <Button
                                appearance="subtle"
                                icon={<ArrowSync20Regular />}
                                size="small"
                                aria-label="Regenerate"
                                className={styles.btnCompact}
                              />
                            </div>
                            <div className={styles.copilotFooterFeedback}>
                              <span className={styles.copilotDisclaimerText}>
                                AI-generated content may be incorrect
                              </span>
                              <Button
                                appearance="subtle"
                                icon={<ThumbLike20Regular />}
                                size="small"
                                aria-label="Helpful"
                                className={styles.btnCompact}
                              />
                              <Button
                                appearance="subtle"
                                icon={<ThumbDislike20Regular />}
                                size="small"
                                aria-label="Not helpful"
                                className={styles.btnCompact}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ---- Metrics section ---- */}
            <div className={styles.metricsSectionHeader}>
              <div
                className={mergeClasses(
                  styles.sectionTitle,
                  styles.sectionTitleFlex,
                )}
              >
                Metrics
                <span
                  className={styles.addMetricButton}
                  role="button"
                  tabIndex={0}
                  aria-label="Add metric"
                  onClick={() => setMetricsInputOpen((v) => !v)}
                  onMouseEnter={() => setSparkleHovered(true)}
                  onMouseLeave={() => setSparkleHovered(false)}
                >
                  {metricsInputOpen || sparkleHovered ? (
                    <Sparkle20Filled className={styles.sparkleIcon16} />
                  ) : (
                    <Sparkle20Regular className={styles.sparkleIcon16} />
                  )}
                  Add metric
                </span>
              </div>

              {/* Inline Copilot input bar (triggered by sparkle click) — floats over content */}
              {metricsInputOpen && (
                <div className={styles.copilotInputBarPositioner}>
                  <div
                    className={mergeClasses(
                      styles.copilotInputBarCardBase,
                      copilotFocused
                        ? styles.copilotInputBarFlatBottom
                        : styles.copilotInputBarRoundBottom,
                    )}
                  >
                    {morseCodeVisible ? (
                      <>
                        <div className={styles.copilotGeneratingRow}>
                          <span className={styles.copilotReasoningLabel}>
                            Reasoning...
                          </span>
                        </div>
                        <div className={styles.copilotGeneratingActionsRight}>
                          <CopilotProvider>
                            <MorseCode className={styles.morseCodeWrapper} />
                          </CopilotProvider>
                          <div
                            role="button"
                            tabIndex={0}
                            aria-label="Stop generating"
                            onClick={() => {
                              setMorseCodeVisible(false);
                              setMetricsInputOpen(false);
                              setCopilotInputValue("");
                            }}
                            className={styles.copilotStopCircle}
                          >
                            <Stop20Filled className={styles.stopIconBrand} />
                          </div>
                          <div className={styles.escBadgeContainer}>
                            <span className={styles.escBadgeText}>ESC</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <input
                        autoFocus
                        className={styles.copilotInlineInput}
                        placeholder="Tell Copilot what to [action], or type '/' for commands"
                        value={copilotInputValue}
                        onChange={(e) => setCopilotInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSend();
                            setMetricsInputOpen(false);
                          }
                          if (e.key === "Escape") {
                            setCopilotInputValue("");
                            setMetricsInputOpen(false);
                          }
                        }}
                        onFocus={() => setCopilotFocused(true)}
                        onBlur={() =>
                          setTimeout(() => setCopilotFocused(false), 150)
                        }
                      />
                    )}
                    {!morseCodeVisible && (
                      <Button
                        appearance="transparent"
                        icon={<Dismiss16Regular />}
                        size="small"
                        aria-label="Dismiss"
                        className={styles.btnCompactDismiss}
                        onClick={() => {
                          setCopilotInputValue("");
                          setMetricsInputOpen(false);
                        }}
                      />
                    )}
                    <div className={styles.copilotFocusLine} />
                  </div>

                  {/* Suggestions dropdown */}
                  {copilotFocused && (
                    <div className={styles.copilotSuggestionsDropdown}>
                      <div className={styles.suggestionsHeading}>
                        <span className={styles.suggestionsLabel}>
                          Suggested prompts
                        </span>
                      </div>
                      <div role="listbox" aria-label="Suggested prompts">
                        {[
                          "Daily cost by service",
                          "CPU utilization",
                          "Deployment frequency",
                        ].map((prompt) => (
                          <div
                            key={prompt}
                            role="option"
                            aria-selected={false}
                            className={styles.suggestionItem}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (prompt === "Daily cost by service") {
                                // Phase 1: show prompt text in input (like user typed it)
                                setCopilotInputValue(prompt);
                                setCopilotFocused(false);
                                // Phase 2: after 800ms, switch to "Reasoning..." with morse code
                                setTimeout(() => {
                                  setMorseCodeVisible(true);
                                }, 800);
                                // Phase 3: after 2.5s total, close input and show chart skeleton
                                setTimeout(() => {
                                  setMorseCodeVisible(false);
                                  setMetricsInputOpen(false);
                                  setCopilotInputValue("");
                                  setShowDailyCostChart(true);
                                  setDailyCostChartLoading(true);
                                  // Scroll to chart area
                                  setTimeout(() => {
                                    chartRowRef.current?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                  }, 100);
                                  // Reveal chart after loading
                                  setTimeout(
                                    () => setDailyCostChartLoading(false),
                                    2000,
                                  );
                                }, 2500);
                                return;
                              }
                              setCopilotInputValue(prompt);
                              setTimeout(() => {
                                handleSend();
                                setMetricsInputOpen(false);
                              }, 0);
                            }}
                          >
                            {prompt}
                          </div>
                        ))}
                      </div>
                      <div className={styles.spacer4} />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.metricsSection}>
              {/* Row 1: Costs (wide) + Alerts */}
              {initialLoading ? (
                <div className={styles.metricsRow}>
                  <div
                    className={mergeClasses(
                      styles.metricCard,
                      styles.metricCardWide,
                      styles.metricCardPadded,
                    )}
                  >
                    <div
                      className={mergeClasses(
                        styles.shimmerLine,
                        styles.shimmerH16W60,
                      )}
                    />
                    <div className={styles.flexGap24}>
                      <div className={styles.flexColGap12Fixed}>
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH12W120,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH24W80,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH12W120,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH24W80,
                          )}
                        />
                      </div>
                      <div className={styles.flex1}>
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH140Full,
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={mergeClasses(
                      styles.metricCard,
                      styles.metricCardPadded,
                    )}
                  >
                    <div
                      className={mergeClasses(
                        styles.shimmerLine,
                        styles.shimmerH16W50,
                      )}
                    />
                    <div className={styles.flexGap16Mb12}>
                      <div className={styles.flexColGap4}>
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH12W50,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH24W24,
                          )}
                        />
                      </div>
                      <div className={styles.flexColGap4}>
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH12W40,
                          )}
                        />
                        <div
                          className={mergeClasses(
                            styles.shimmerLine,
                            styles.shimmerH24W24,
                          )}
                        />
                      </div>
                    </div>
                    <div
                      className={mergeClasses(
                        styles.shimmerLine,
                        styles.shimmerH48Full,
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.metricsRow}>
                  {/* Costs */}
                  <div
                    className={mergeClasses(
                      styles.metricCard,
                      styles.metricCardWide,
                    )}
                  >
                    <div className={styles.metricCardHeader}>
                      <div className={styles.metricCardHeaderLeft}>
                        <span
                          className={mergeClasses(
                            styles.metricCardDot,
                            scenario === "pre-optimization"
                              ? styles.metricDotOrange
                              : styles.metricDotGreen,
                          )}
                        />
                        <span className={styles.metricCardTitle}>Costs</span>
                      </div>
                      <button
                        className={styles.metricCardChevron}
                        aria-label="View costs"
                      >
                        <ChevronRight16Regular />
                      </button>
                    </div>
                    <div className={styles.metricCardCostRow}>
                      <div className={styles.metricCardCostStats}>
                        <div className={styles.metricStatBlock}>
                          <span className={styles.metricStatLabel}>
                            Cost incurred this month
                          </span>
                          <div className={styles.metricStatValueRow}>
                            <span className={styles.metricStatValue}>
                              {currentMetrics.incurredCost}
                            </span>
                            {currentMetrics.incurredTrend && (
                              <span className={styles.metricSparkline}>
                                <span
                                  className={mergeClasses(
                                    styles.trendArrow,
                                    currentMetrics.incurredTrend.startsWith("-")
                                      ? styles.trendGreen
                                      : undefined,
                                  )}
                                >
                                  {currentMetrics.incurredTrend.startsWith("-")
                                    ? "↓"
                                    : "↑"}
                                </span>{" "}
                                {currentMetrics.incurredTrend}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={styles.metricStatBlock}>
                          <span className={styles.metricStatLabel}>
                            Forecasted this month
                          </span>
                          <div className={styles.metricStatValueRow}>
                            <span className={styles.metricStatValue}>
                              {currentMetrics.forecastCost}
                            </span>
                            {currentMetrics.forecastTrend && (
                              <span className={styles.metricSparkline}>
                                <span
                                  className={mergeClasses(
                                    styles.trendArrow,
                                    currentMetrics.forecastTrend.startsWith("-")
                                      ? styles.trendGreen
                                      : undefined,
                                  )}
                                >
                                  {currentMetrics.forecastTrend.startsWith("-")
                                    ? "↓"
                                    : "↑"}
                                </span>{" "}
                                {currentMetrics.forecastTrend}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.metricCardCostChart}>
                        <ResponsiveContainer width="100%" height={180}>
                          <AreaChart
                            data={currentMetrics.costChartData}
                            margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke={tokens.colorNeutralStroke2}
                            />
                            <XAxis
                              dataKey="day"
                              tick={{
                                fontSize: 12,
                                fill: tokens.colorNeutralForeground2,
                              }}
                              tickLine={false}
                              axisLine={false}
                              interval={1}
                            />
                            <YAxis
                              tick={{
                                fontSize: 12,
                                fill: tokens.colorNeutralForeground2,
                              }}
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(v: number) => `$${v}`}
                            />
                            <RechartsTooltip
                              contentStyle={{
                                fontSize: 12,
                                borderRadius: 6,
                                border: `1px solid ${tokens.colorNeutralStroke1}`,
                              }}
                              formatter={(value, name) => {
                                if (value == null || Array.isArray(value))
                                  return "";
                                return [
                                  `$${value}`,
                                  name === "actual" ? "Actual" : "Forecast",
                                ];
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="actual"
                              stroke={tokens.colorBrandForeground1}
                              strokeWidth={2}
                              fill={tokens.colorBrandForeground1}
                              fillOpacity={0.15}
                              connectNulls={false}
                              dot={false}
                            />
                            <Area
                              type="natural"
                              dataKey="forecast"
                              stroke={tokens.colorPaletteHotPinkForeground3}
                              strokeWidth={2}
                              strokeDasharray="5 3"
                              fill={tokens.colorPaletteHotPinkForeground3}
                              fillOpacity={0.12}
                              connectNulls={false}
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <div className={styles.metricCardHeaderLeft}>
                        <span
                          className={mergeClasses(
                            styles.metricCardDot,
                            Number(currentMetrics.totalAlerts) > 0
                              ? styles.metricDotOrange
                              : styles.metricDotGreen,
                          )}
                        />
                        <span className={styles.metricCardTitle}>Alerts</span>
                      </div>
                      <button
                        className={styles.metricCardChevron}
                        aria-label="View alerts"
                      >
                        <ChevronRight16Regular />
                      </button>
                    </div>
                    <div
                      className={mergeClasses(
                        styles.metricCardBody,
                        styles.flexBodyFull,
                      )}
                    >
                      <div className={styles.metricCardBodyRow}>
                        <div className={styles.metricStatBlock}>
                          <span className={styles.metricStatLabel}>
                            Critical
                          </span>
                          <span className={styles.metricStatValue}>
                            {currentMetrics.criticalAlerts}
                          </span>
                        </div>
                        <div className={styles.metricStatBlock}>
                          <span className={styles.metricStatLabel}>Total</span>
                          <span className={styles.metricStatValue}>
                            {currentMetrics.totalAlerts}
                          </span>
                        </div>
                      </div>
                      <div className={styles.alertDetailBox}>
                        <span className={styles.alertDetailTitle}>
                          {currentMetrics.alertTitle}
                        </span>
                        <span className={styles.alertDetailDesc}>
                          {currentMetrics.alertDescription}
                        </span>
                      </div>
                      {scenario === "baseline" && (
                        <Button
                          appearance="outline"
                          size="small"
                          onClick={onCreateScalableVm}
                          className={styles.btnFullWidth}
                        >
                          Create a scalable VM
                        </Button>
                      )}
                      {scenario === "pre-optimization" && (
                        <Button
                          appearance="outline"
                          size="small"
                          icon={<CopilotRegularIcon />}
                          onClick={() => {
                            setScopeVisible(false);
                            onOpenCopilotPanel?.();
                          }}
                          className={mergeClasses(
                            styles.btnFullWidth,
                            styles.copilotAccentBorder,
                          )}
                        >
                          Optimize resources
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Row 2: Deployments | Service Health | Security | Resiliency */}
              {initialLoading ? (
                <div
                  className={mergeClasses(
                    styles.metricsRow,
                    styles.metricsRowFixed,
                  )}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={mergeClasses(
                        styles.shimmerLine,
                        styles.shimmerFlexFull,
                      )}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={mergeClasses(
                    styles.metricsRow,
                    styles.metricsRowFixed,
                  )}
                >
                  {/* Deployments */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <div className={styles.metricCardHeaderLeft}>
                        <span
                          className={mergeClasses(
                            styles.metricCardDot,
                            styles.metricDotGreen,
                          )}
                        />
                        <span className={styles.metricCardTitle}>
                          Deployments
                        </span>
                      </div>
                      <button
                        className={styles.metricCardChevron}
                        aria-label="View deployments"
                      >
                        <ChevronRight16Regular />
                      </button>
                    </div>
                    <div className={styles.metricCardBody}>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>
                          Succeeded (24h)
                        </span>
                        <span className={styles.metricStatValue}>
                          {currentMetrics.deploymentsSucceeded}
                        </span>
                      </div>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>
                          Failed (24h)
                        </span>
                        <span className={styles.metricStatValue}>
                          {currentMetrics.deploymentsFailed}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Health */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <div className={styles.metricCardHeaderLeft}>
                        <span
                          className={mergeClasses(
                            styles.metricCardDot,
                            styles.metricDotGreen,
                          )}
                        />
                        <span className={styles.metricCardTitle}>
                          Service Health
                        </span>
                      </div>
                      <button
                        className={styles.metricCardChevron}
                        aria-label="View service health"
                      >
                        <ChevronRight16Regular />
                      </button>
                    </div>
                    <div className={styles.metricCardBody}>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>
                          Active issues
                        </span>
                        <span className={styles.metricStatValue}>
                          {currentMetrics.activeIssues}
                        </span>
                      </div>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>
                          Issues resolved (24h)
                        </span>
                        <span className={styles.metricStatValue}>
                          {currentMetrics.issuesResolved}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <div className={styles.metricCardHeaderLeft}>
                        <span
                          className={mergeClasses(
                            styles.metricCardDot,
                            styles.metricDotGreen,
                          )}
                        />
                        <span className={styles.metricCardTitle}>Security</span>
                      </div>
                      <button
                        className={styles.metricCardChevron}
                        aria-label="View security"
                      >
                        <ChevronRight16Regular />
                      </button>
                    </div>
                    <div className={styles.metricCardBody}>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>
                          Unhealthy resources
                        </span>
                        <span className={styles.metricStatValue}>
                          {currentMetrics.unhealthyResources}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resiliency */}
                  <div className={styles.metricCard}>
                    <div className={styles.metricCardHeader}>
                      <div className={styles.metricCardHeaderLeft}>
                        <span
                          className={mergeClasses(
                            styles.metricCardDot,
                            styles.metricDotOrange,
                          )}
                        />
                        <span className={styles.metricCardTitle}>
                          Resiliency
                        </span>
                      </div>
                      <button
                        className={styles.metricCardChevron}
                        aria-label="View resiliency"
                      >
                        <ChevronRight16Regular />
                      </button>
                    </div>
                    <div
                      className={mergeClasses(
                        styles.metricCardBody,
                        styles.flexBodyFull,
                      )}
                    >
                      <div className={styles.flexGap16}>
                        <div className={styles.metricStatBlock}>
                          <span className={styles.metricStatLabel}>
                            Zonal resiliency
                          </span>
                          <span className={styles.metricStatValue}>
                            {currentMetrics.resiliencyValue}
                          </span>
                        </div>
                        <div
                          className={mergeClasses(
                            styles.metricCardFootnote,
                            styles.metricFootnoteFlex,
                          )}
                        >
                          {currentMetrics.resiliencyFootnote}
                        </div>
                      </div>
                      {scenario === "baseline" && (
                        <Button
                          appearance="outline"
                          size="small"
                          className={styles.btnFullWidth}
                        >
                          Review resiliency
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Response time chart — single full-width (when no daily cost chart) */}
              {showChart && !showDailyCostChart && (
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>
                    {responseTimeChartTitle}
                    {chartConfig?.subtitle && (
                      <span className={styles.chartSubtitle}>
                        {chartConfig.subtitle}
                      </span>
                    )}
                  </div>
                  {chartLoading ? (
                    <div className={styles.chartShimmer} />
                  ) : chartConfig ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart
                        data={chartConfig.data}
                        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="responseTimeFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={tokens.colorBrandForeground1}
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="100%"
                              stopColor={tokens.colorBrandForeground1}
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                          <linearGradient
                            id="responseTimeBreachFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={tokens.colorPaletteRedForeground1}
                              stopOpacity={0.22}
                            />
                            <stop
                              offset="44.4%"
                              stopColor={tokens.colorPaletteRedForeground1}
                              stopOpacity={0.12}
                            />
                            <stop
                              offset="44.4%"
                              stopColor={tokens.colorBrandForeground1}
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="100%"
                              stopColor={tokens.colorBrandForeground1}
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={tokens.colorNeutralStroke1}
                        />
                        <XAxis
                          dataKey="time"
                          tick={{
                            fontSize: 11,
                            fill: tokens.colorNeutralForeground3,
                          }}
                          interval={3}
                          axisLine={{ stroke: tokens.colorNeutralStroke1 }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{
                            fontSize: 11,
                            fill: tokens.colorNeutralForeground3,
                          }}
                          axisLine={false}
                          tickLine={false}
                          unit="ms"
                          width={52}
                          domain={chartConfig.yDomain ?? ["auto", "auto"]}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            fontSize: 12,
                            borderRadius: 6,
                            border: `1px solid ${tokens.colorNeutralStroke1}`,
                          }}
                          formatter={(value: number | undefined) => [
                            `${value ?? 0} ms`,
                            "Response Time",
                          ]}
                          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                        />
                        <Area
                          type="monotone"
                          dataKey={chartConfig.dataKey}
                          stroke={tokens.colorBrandForeground1}
                          strokeWidth={2}
                          fill={
                            scenario === "baseline" || scenario === "after-vmss"
                              ? "url(#responseTimeBreachFill)"
                              : "url(#responseTimeFill)"
                          }
                          dot={false}
                          activeDot={{ r: 4, fill: tokens.colorBrandForeground1 }}
                        />
                        <ReferenceLine
                          y={500}
                          stroke={tokens.colorPaletteRedForeground1}
                          strokeDasharray="6 4"
                          strokeWidth={1.5}
                          label={{
                            value: "500ms SLO",
                            position: "insideTopRight",
                            fill: tokens.colorPaletteRedForeground1,
                            fontSize: 11,
                            fontWeight: 600,
                            dy: -18,
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart
                        data={responseTimeMockData}
                        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={tokens.colorNeutralStroke1}
                        />
                        <XAxis
                          dataKey="hour"
                          tick={{
                            fontSize: 11,
                            fill: tokens.colorNeutralForeground3,
                          }}
                          interval={3}
                          axisLine={{ stroke: tokens.colorNeutralStroke1 }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{
                            fontSize: 11,
                            fill: tokens.colorNeutralForeground3,
                          }}
                          axisLine={false}
                          tickLine={false}
                          unit="ms"
                          width={52}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            fontSize: 12,
                            borderRadius: 6,
                            border: `1px solid ${tokens.colorNeutralStroke1}`,
                          }}
                          formatter={(value: number | undefined) => [
                            `${value ?? 0} ms`,
                            "Avg Response Time",
                          ]}
                          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="avgMs"
                          stroke={tokens.colorBrandForeground1}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: tokens.colorBrandForeground1 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}

              {/* Side-by-side: response time + daily cost by service */}
              {showChart && showDailyCostChart && (
                <div ref={chartRowRef} className={styles.flexGap16}>
                  {/* Response time chart */}
                  <div
                    className={mergeClasses(
                      styles.chartCard,
                      styles.chartCardFlex,
                    )}
                  >
                    <div className={styles.chartTitle}>
                      {responseTimeChartTitle}
                    </div>
                    {chartLoading ? (
                      <div className={styles.chartShimmer} />
                    ) : (
                      <ResponsiveContainer width="100%" height={180}>
                        <AreaChart
                          data={chartConfig?.data ?? responseTimeMockData}
                          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="responseTimeFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={tokens.colorBrandForeground1}
                                stopOpacity={0.2}
                              />
                              <stop
                                offset="100%"
                                stopColor={tokens.colorBrandForeground1}
                                stopOpacity={0.02}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={tokens.colorNeutralStroke1}
                          />
                          <XAxis
                            dataKey="time"
                            tick={{
                              fontSize: 11,
                              fill: tokens.colorNeutralForeground3,
                            }}
                            interval={3}
                            axisLine={{ stroke: tokens.colorNeutralStroke1 }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{
                              fontSize: 11,
                              fill: tokens.colorNeutralForeground3,
                            }}
                            axisLine={false}
                            tickLine={false}
                            unit="ms"
                            width={52}
                            domain={chartConfig?.yDomain ?? [0, 900]}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              fontSize: 12,
                              borderRadius: 6,
                              border: `1px solid ${tokens.colorNeutralStroke1}`,
                            }}
                            formatter={(value: number | undefined) => [
                              `${value ?? 0} ms`,
                              "Response Time",
                            ]}
                            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                          />
                          <Area
                            type="monotone"
                            dataKey={chartConfig?.dataKey ?? "avgMs"}
                            stroke={tokens.colorBrandForeground1}
                            strokeWidth={2}
                            fill="url(#responseTimeFill)"
                            dot={false}
                            activeDot={{ r: 4, fill: tokens.colorBrandForeground1 }}
                          />
                          <ReferenceLine
                            y={500}
                            stroke={tokens.colorPaletteRedForeground1}
                            strokeDasharray="6 4"
                            strokeWidth={1.5}
                            label={{
                              value: "500ms SLO",
                              position: "insideTopRight",
                              fill: tokens.colorPaletteRedForeground1,
                              fontSize: 11,
                              fontWeight: 600,
                              dy: -18,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Daily cost by service — stacked bar */}
                  <div
                    className={mergeClasses(
                      styles.chartCard,
                      styles.chartCardFlex,
                    )}
                  >
                    <div className={styles.chartTitle}>
                      Daily cost by service
                    </div>
                    {dailyCostChartLoading ? (
                      <div className={styles.chartShimmer} />
                    ) : (
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart
                          data={dailyCostByResourceData}
                          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={tokens.colorNeutralStroke1}
                          />
                          <XAxis
                            dataKey="day"
                            tick={{
                              fontSize: 10,
                              fill: tokens.colorNeutralForeground3,
                            }}
                            interval={2}
                            axisLine={{ stroke: tokens.colorNeutralStroke1 }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{
                              fontSize: 11,
                              fill: tokens.colorNeutralForeground3,
                            }}
                            axisLine={false}
                            tickLine={false}
                            width={40}
                            tickFormatter={(v: number) => `$${v}`}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              fontSize: 12,
                              borderRadius: 6,
                              border: `1px solid ${tokens.colorNeutralStroke1}`,
                            }}
                            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                            content={({ active, payload, label }: any) => {
                              if (!active || !payload?.length) return null;
                              const nameMap: Record<string, string> = {
                                aks: "AKS",
                                sql: "SQL DB",
                                vm: "VM",
                                other: "Other",
                              };
                              const total = payload.reduce(
                                (s: number, p: any) => s + (p.value ?? 0),
                                0,
                              );
                              return (
                                <div className={styles.tooltipContainer}>
                                  <div className={styles.tooltipTitle}>
                                    {label}
                                  </div>
                                  {payload.map((p: any) => (
                                    <div
                                      key={p.dataKey}
                                      className={styles.tooltipRow}
                                    >
                                      <span
                                        className={
                                          p.dataKey === "aks"
                                            ? styles.tooltipColorAks
                                            : p.dataKey === "sql"
                                              ? styles.tooltipColorSql
                                              : p.dataKey === "vm"
                                                ? styles.tooltipColorVm
                                                : styles.tooltipColorOther
                                        }
                                      >
                                        {nameMap[p.dataKey] ?? p.dataKey}
                                      </span>
                                      <span>${(p.value ?? 0).toFixed(2)}</span>
                                    </div>
                                  ))}
                                  <div className={styles.tooltipTotal}>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                  </div>
                                </div>
                              );
                            }}
                          />
                          <Bar
                            dataKey="other"
                            stackId="cost"
                            fill={tokens.colorNeutralForeground3}
                            name="other"
                            radius={[0, 0, 0, 0]}
                          />
                          <Bar
                            dataKey="vm"
                            stackId="cost"
                            fill={tokens.colorPaletteLightBlueForeground2}
                            name="vm"
                          />
                          <Bar
                            dataKey="sql"
                            stackId="cost"
                            fill={tokens.colorPaletteGreenForeground1}
                            name="sql"
                          />
                          <Bar
                            dataKey="aks"
                            stackId="cost"
                            fill={tokens.colorBrandForeground1}
                            name="aks"
                            radius={[2, 2, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ---- Top actions ---- */}
            <div className={styles.sectionTitle}>Top actions</div>
            {initialLoading ? (
              <div className={styles.actionCardsRow}>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className={mergeClasses(
                      styles.shimmerLine,
                      styles.shimmerH140Flex,
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.actionCardsRow}>
                {/* Scale out VM card */}
                <div className={styles.actionCard}>
                  <div className={styles.actionCardHeader}>
                    <div className={styles.actionCardTitle}>
                      {primaryAction.title}
                    </div>
                    <Button
                      appearance="subtle"
                      icon={<MoreHorizontal20Regular />}
                      size="small"
                      aria-label="More options"
                      className={styles.btnCompact}
                    />
                  </div>
                  <div className={styles.actionCardDescription}>
                    {primaryAction.description}
                  </div>
                  <div>
                    <Button
                      appearance="outline"
                      icon={
                        primaryAction.copilotAccent ? (
                          <CopilotRegularIcon />
                        ) : undefined
                      }
                      onClick={primaryAction.onClick}
                      className={
                        primaryAction.copilotAccent
                          ? styles.copilotAccentBorder
                          : undefined
                      }
                    >
                      {primaryAction.buttonLabel}
                    </Button>
                  </div>
                </div>

                {/* Budget alerts card */}
                <div className={styles.actionCard}>
                  <div className={styles.actionCardHeader}>
                    <div className={styles.actionCardTitle}>
                      {secondaryAction.title}
                    </div>
                    <Button
                      appearance="subtle"
                      icon={<MoreHorizontal20Regular />}
                      size="small"
                      aria-label="More options"
                      className={styles.btnCompact}
                    />
                  </div>
                  <div className={styles.actionCardDescription}>
                    {secondaryAction.description}
                  </div>
                  <div>
                    <Button appearance="outline">
                      {secondaryAction.buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right pane — resources sidebar (toggled by Scope button) */}
        {scopeVisible && (
          <div className={styles.rightPane}>
            <div className={styles.rightHeader}>
              <span>Resources</span>
              <span className={styles.addRelatedLink}>
                <Sparkle20Regular className={styles.sparkleIcon14} />
                Add related resources
              </span>
            </div>
            <div className={styles.resourceGridHeader}>
              <div className={styles.resourceGridHeaderCell}>
                <span>Name</span>
                <span className={styles.sortArrow}>↕</span>
              </div>
              <div className={styles.resourceGridHeaderCell}>
                <span>Type</span>
                <span className={styles.sortArrow}>↕</span>
              </div>
            </div>
            {selectedResources.map((r) => {
              const displayType = getDisplayType(r.type);
              const iconSrc = getResourceTypeIcon(r.type);
              const isEmbrManaged = r.managedBy === "embr";
              return (
                <div
                  key={r.id}
                  className={mergeClasses(
                    styles.resourceRow,
                    isEmbrManaged ? styles.resourceRowDisabled : undefined,
                  )}
                >
                  <div className={styles.resourceNameCell}>
                    {isEmbrManaged ? (
                      <Fire20Regular className={styles.embrFireIcon} />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={iconSrc}
                        alt=""
                        className={styles.resourceIcon}
                      />
                    )}
                    <div className={styles.resourceName}>{r.name}</div>
                  </div>
                  <div className={styles.resourceTypeCell}>
                    <div className={styles.resourceType}>{displayType}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDetail;
