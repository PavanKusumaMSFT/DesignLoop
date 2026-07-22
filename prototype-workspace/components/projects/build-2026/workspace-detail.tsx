/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState } from "react";
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
  Save20Regular,
  Dismiss20Regular,
  Money20Regular,
  Edit20Regular,
  Share20Regular,
  ArrowClockwise20Regular,
  Filter20Regular,
  MoreHorizontal20Regular,
  Sparkle20Regular,
  TextBulletListSquareSparkle20Regular,
  Copy20Regular,
  ArrowSync20Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  CheckmarkCircle16Filled,
  ArrowRight20Filled,
  Stop20Filled,
} from "@fluentui/react-icons";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { CopilotRegularIcon } from "../../shared/copilot-regular-icon";

// ---------------------------------------------------------------------------
// Mock chart data
// ---------------------------------------------------------------------------
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
  { day: "Jun 27", actual: null, forecast: 68 },
  { day: "Jun 30", actual: null, forecast: 96 },
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
  onSaveWorkspace?: () => void;
  onCreateScalableVm?: () => void;
}

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
    color: "#707070",
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
    display: "flex",
    gap: "12px",
  },
  metricCard: {
    flex: "1 1 0%",
    minWidth: 0,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  metricCardWide: {
    flex: "0 0 60%",
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
    width: "198px",
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
    margin: "0 24px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px 24px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  chartTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
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
      color: "#707070",
    },
  },
  copilotSendButton: {
    width: "32px",
    height: "32px",
    borderRadius: "9999px",
    backgroundColor: "#0f6cbd",
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
    background: "linear-gradient(90deg, #0f6cbd 0%, #0f6cbd 100%)",
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
    backgroundColor: "#ebf3fc",
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
    padding: "0 8px",
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
    padding: "0 8px",
    flex: 1,
    overflow: "hidden",
    minWidth: 0,
  },
  resourceTypeCell: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
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
    color: "#0078d4",
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

  /* ---- Inline-style replacements ---- */
  workspaceSubtitle: {
    color: tokens.colorNeutralForeground3,
  },
  commandBarButton: {
    height: "32px",
  },
  neutralFg2: {
    color: tokens.colorNeutralForeground2,
  },
  shimmerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "8px 0",
  },
  shimmerLineSmall: {
    height: "12px",
  },
  shimmerLineWidth100: {
    width: "100%",
  },
  shimmerLineWidth85: {
    width: "85%",
  },
  shimmerLineWidth60: {
    width: "60%",
  },
  checkmarkIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  copilotStatusBodyText: {
    color: tokens.colorNeutralForeground1,
  },
  iconButtonCompact: {
    minWidth: "auto",
    padding: "2px",
  },
  metricCardDotGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  metricCardDotOrange: {
    backgroundColor: "#F7630C",
  },
  metricsRowFixed: {
    height: "192px",
  },
  copilotLoaderDotBlue: {
    backgroundColor: "#0f6cbd",
  },
  copilotLoaderDotRed: {
    backgroundColor: "#c4314b",
  },
  copilotLoaderDotPink: {
    backgroundColor: "#e8a0bf",
  },
  copilotLoaderDotDelay0: { animationDelay: "0s" },
  copilotLoaderDotDelay1: { animationDelay: "0.15s" },
  copilotLoaderDotDelay2: { animationDelay: "0.3s" },
  copilotLoaderDotDelay3: { animationDelay: "0.45s" },
  copilotLoaderDotDelay4: { animationDelay: "0.6s" },
  copilotLoaderDotDelay5: { animationDelay: "0.75s" },
  copilotLoaderDotDelay6: { animationDelay: "0.9s" },
  stopIcon: {
    color: "#0f6cbd",
    width: "12px",
    height: "12px",
  },
  sendIconWhite: {
    color: tokens.colorNeutralBackground1,
  },
  sparkleSm: {
    fontSize: "14px",
  },
  sortArrow: {
    fontSize: "10px",
    color: "#a19f9d",
  },
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
  "Virtual Network": "Virtual network",
  "Network Security Group": "Network security group",
  "Application Gateway": "Application gateway",
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
    "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
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

// Loader dot color/delay class maps — avoids dynamic inline styles
const loaderDotColorMap = [0, 0, 0, 1, 1, 2, 2] as const; // 0=blue, 1=red, 2=pink
const loaderDotDelayKeys = [
  "copilotLoaderDotDelay0",
  "copilotLoaderDotDelay1",
  "copilotLoaderDotDelay2",
  "copilotLoaderDotDelay3",
  "copilotLoaderDotDelay4",
  "copilotLoaderDotDelay5",
  "copilotLoaderDotDelay6",
] as const;

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
  onSaveWorkspace,
  onCreateScalableVm,
}) => {
  const styles = useStyles();
  const [scopeVisible, setScopeVisible] = useState(true);

  const selectedResources = resources.filter((r) => selectedIds.has(r.id));
  const monthlyCostTotal = selectedResources
    .reduce((sum, r) => sum + (resourceMonthlyCost[r.id] || 0), 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const [copilotGenerating, setCopilotGenerating] = useState(false);
  const [copilotFocused, setCopilotFocused] = useState(false);

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
        {/* Title row */}
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <Text size={600} weight="semibold">
              {title}
            </Text>
            <Text size={200} className={styles.workspaceSubtitle}>
              Workspace
            </Text>
          </div>
          <div className={styles.titleActions}>
            <Button
              appearance="subtle"
              icon={<MoreHorizontal20Regular />}
              size="small"
              aria-label="More options"
            />
            {mode === "drawer" && onClose && (
              <Button
                appearance="subtle"
                icon={<Dismiss20Regular />}
                size="small"
                onClick={onClose}
                aria-label="Close"
              />
            )}
          </div>
        </div>

        {/* Command bar row */}
        <div className={styles.commandRow}>
          <Button
            appearance="primary"
            icon={<Save20Regular />}
            size="small"
            className={styles.commandBarButton}
            onClick={onSaveWorkspace}
          >
            Save as workspace
          </Button>
          <Button
            appearance="subtle"
            icon={<Edit20Regular />}
            size="small"
            className={styles.commandBarButton}
          >
            Edit layout
          </Button>
          <Button
            appearance="subtle"
            icon={<Share20Regular />}
            size="small"
            className={styles.commandBarButton}
          >
            Share
          </Button>
          <Button
            appearance="subtle"
            icon={<ArrowClockwise20Regular />}
            size="small"
            className={styles.commandBarButton}
          >
            Refresh
          </Button>

          <div className={styles.commandSpacer} />
          <div className={styles.commandDivider} />

          <Button
            appearance={scopeVisible ? "outline" : "subtle"}
            icon={<Filter20Regular />}
            size="small"
            className={styles.commandBarButton}
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
          className={`${styles.leftPane} ${scopeVisible ? styles.leftPaneSplit : ""}`}
        >
          <div className={styles.leftPaneScroll}>
            {/* ---- Copilot Summary (Inline Copilot card) ---- */}
            <div className={styles.copilotSummaryCard}>
              <div
                className={styles.copilotSummaryHeader}
                onClick={() => setSummaryExpanded((v) => !v)}
              >
                <div className={styles.copilotSummaryTitleGroup}>
                  <TextBulletListSquareSparkle20Regular
                    className={styles.neutralFg2}
                  />
                  <Text
                    size={300}
                    weight="regular"
                    className={styles.neutralFg2}
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
                    <div className={styles.shimmerContainer}>
                      <div
                        className={mergeClasses(
                          styles.shimmerLine,
                          styles.shimmerLineSmall,
                          styles.shimmerLineWidth100,
                        )}
                      />
                      <div
                        className={mergeClasses(
                          styles.shimmerLine,
                          styles.shimmerLineSmall,
                          styles.shimmerLineWidth85,
                        )}
                      />
                      <div
                        className={mergeClasses(
                          styles.shimmerLine,
                          styles.shimmerLineSmall,
                          styles.shimmerLineWidth60,
                        )}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Content */}
                      <div className={styles.copilotSummaryContent}>
                        <div className={styles.copilotStatusRow}>
                          <CheckmarkCircle16Filled
                            className={styles.checkmarkIcon}
                          />
                          <Text
                            size={300}
                            className={styles.copilotStatusBodyText}
                          >
                            Your web app is live and running successfully.
                          </Text>
                        </div>
                        <div className={styles.copilotResponseText}>
                          You have four Production resources selected.
                          app-gateway-01 routes incoming web traffic to your
                          applications. cache-redis-prod is an in-memory cache
                          that reduces database load. analytics-cosmos-db is a
                          globally distributed database, likely the primary data
                          source behind the cache. backupstoragevault holds
                          backup files in East US 2, while the other three run
                          in East US. No active health alerts.
                        </div>
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
                              className={styles.iconButtonCompact}
                            />
                            <Button
                              appearance="subtle"
                              icon={<ArrowSync20Regular />}
                              size="small"
                              aria-label="Regenerate"
                              className={styles.iconButtonCompact}
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
                              className={styles.iconButtonCompact}
                            />
                            <Button
                              appearance="subtle"
                              icon={<ThumbDislike20Regular />}
                              size="small"
                              aria-label="Not helpful"
                              className={styles.iconButtonCompact}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* ---- Metrics section ---- */}
            <div className={styles.sectionTitle}>Metrics</div>
            <div className={styles.metricsSection}>
              {/* Row 1: Costs (wide) + Alerts */}
              <div className={styles.metricsRow}>
                {/* Costs */}
                <div
                  className={`${styles.metricCard} ${styles.metricCardWide}`}
                >
                  <div className={styles.metricCardHeader}>
                    <div className={styles.metricCardHeaderLeft}>
                      <span
                        className={mergeClasses(
                          styles.metricCardDot,
                          styles.metricCardDotGreen,
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
                            $43 USD
                          </span>
                          <span className={styles.metricSparkline}>
                            <span className={styles.trendArrow}>↑</span> 23% MoM
                          </span>
                        </div>
                      </div>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>
                          Forecasted this month
                        </span>
                        <div className={styles.metricStatValueRow}>
                          <span className={styles.metricStatValue}>
                            $96 USD
                          </span>
                          <span className={styles.metricSparkline}>
                            <span className={styles.trendArrow}>↑</span> 23% MoM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.metricCardCostChart}>
                      <ResponsiveContainer width="100%" height={180}>
                        <AreaChart
                          data={costAreaData}
                          margin={{ top: 4, right: 4, bottom: 0, left: -10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#ebebeb"
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
                            formatter={(value: number | null, name: string) => {
                              if (value == null) return [null, null];
                              return [
                                `$${value}`,
                                name === "actual" ? "Actual" : "Forecast",
                              ];
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="actual"
                            stroke="#637CEF"
                            strokeWidth={2}
                            fill="#637CEF"
                            fillOpacity={0.15}
                            connectNulls={false}
                            dot={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="forecast"
                            stroke="#EE5FB7"
                            strokeWidth={2}
                            strokeDasharray="5 3"
                            fill="#EE5FB7"
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
                          styles.metricCardDotOrange,
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
                  <div className={styles.metricCardBody}>
                    <div className={styles.metricCardBodyRow}>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>Critical</span>
                        <span className={styles.metricStatValue}>0</span>
                      </div>
                      <div className={styles.metricStatBlock}>
                        <span className={styles.metricStatLabel}>Total</span>
                        <span className={styles.metricStatValue}>2</span>
                      </div>
                    </div>
                    <div className={styles.alertDetailBox}>
                      <span className={styles.alertDetailTitle}>
                        Alert title
                      </span>
                      <span className={styles.alertDetailDesc}>
                        Alert description
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Deployments | Service Health | Security | Resiliency */}
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
                          styles.metricCardDotGreen,
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
                      <span className={styles.metricStatValue}>4</span>
                    </div>
                    <div className={styles.metricStatBlock}>
                      <span className={styles.metricStatLabel}>
                        Failed (24h)
                      </span>
                      <span className={styles.metricStatValue}>0</span>
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
                          styles.metricCardDotGreen,
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
                      <span className={styles.metricStatValue}>0</span>
                    </div>
                    <div className={styles.metricStatBlock}>
                      <span className={styles.metricStatLabel}>
                        Issues resolved (24h)
                      </span>
                      <span className={styles.metricStatValue}>5</span>
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
                          styles.metricCardDotGreen,
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
                      <span className={styles.metricStatValue}>0</span>
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
                          styles.metricCardDotOrange,
                        )}
                      />
                      <span className={styles.metricCardTitle}>Resiliency</span>
                    </div>
                    <button
                      className={styles.metricCardChevron}
                      aria-label="View resiliency"
                    >
                      <ChevronRight16Regular />
                    </button>
                  </div>
                  <div className={styles.metricCardBody}>
                    <div className={styles.metricStatBlock}>
                      <span className={styles.metricStatLabel}>
                        Zonal resiliency
                      </span>
                      <span className={styles.metricStatValue}>50%</span>
                    </div>
                    <div className={styles.metricCardFootnote}>
                      {"2 non-zonal resilient\n2 zonally resilient"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Response time chart (triggered by Copilot prompt) */}
              {showResponseTimeChart && (
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>
                    app-gateway-01 — Avg Response Time (24h)
                  </div>
                  {chartLoading ? (
                    <div className={styles.chartShimmer} />
                  ) : (
                    <ResponsiveContainer width="100%" height={250}>
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
                          stroke="#0078D4"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: "#0078D4" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}
            </div>

            {/* ---- Top actions ---- */}
            <div className={styles.sectionTitle}>Top actions</div>
            <div className={styles.actionCardsRow}>
              {/* Set up alerts card */}
              <div className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardTitle}>
                    Set up alerts for your resources
                  </div>
                  <Button
                    appearance="subtle"
                    icon={<MoreHorizontal20Regular />}
                    size="small"
                    aria-label="More options"
                    className={styles.iconButtonCompact}
                  />
                </div>
                <div className={styles.actionCardDescription}>
                  Set alert rules so that you can be notified of important
                  events like performance degradation, security threats, or
                  resource health issues. For example, set up an alert to get
                  notified if app-gateway-01 experiences increased response
                  times or if cache-redis-prod goes offline.
                </div>
                <div>
                  <Button
                    appearance="outline"
                    icon={<CopilotRegularIcon />}
                    size="small"
                    className={styles.commandBarButton}
                  >
                    Set new alert
                  </Button>
                </div>
              </div>

              {/* Budget alerts card */}
              <div className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardTitle}>
                    Protect your free credits with budget alerts
                  </div>
                  <Button
                    appearance="subtle"
                    icon={<MoreHorizontal20Regular />}
                    size="small"
                    aria-label="More options"
                    className={styles.iconButtonCompact}
                  />
                </div>
                <div className={styles.actionCardDescription}>
                  Budget alerts notify you as credits are being used, so you can
                  experiment freely without accidentally running out or
                  triggering charges. Set an alert to get notified before your
                  credits are exhausted.
                </div>
                <div>
                  <Button
                    appearance="outline"
                    icon={<CopilotRegularIcon />}
                    size="small"
                    className={styles.commandBarButton}
                  >
                    Create a budget
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating copilot input (sticky bottom) */}
          <div className={styles.copilotInputWrapper}>
            {copilotGenerating ? (
              <div className={styles.copilotGeneratingCard}>
                <span className={styles.copilotReasoningText}>
                  Reasoning...
                </span>
                <div className={styles.copilotGeneratingActions}>
                  <div className={styles.copilotLoader}>
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                      const colorClasses = [
                        styles.copilotLoaderDotBlue,
                        styles.copilotLoaderDotBlue,
                        styles.copilotLoaderDotBlue,
                        styles.copilotLoaderDotRed,
                        styles.copilotLoaderDotRed,
                        styles.copilotLoaderDotPink,
                        styles.copilotLoaderDotPink,
                      ];
                      return (
                        <div
                          key={i}
                          className={mergeClasses(
                            styles.copilotLoaderDot,
                            colorClasses[i],
                            styles[loaderDotDelayKeys[i]],
                          )}
                        />
                      );
                    })}
                  </div>
                  <button
                    className={styles.copilotStopButton}
                    onClick={handleStopGenerating}
                    aria-label="Stop generating"
                  >
                    <Stop20Filled className={styles.stopIcon} />
                  </button>
                  <span className={styles.copilotEscBadge}>ESC</span>
                </div>
              </div>
            ) : (
              <div className={styles.copilotInputCard}>
                <input
                  className={styles.copilotInput}
                  placeholder="Tell Copilot what to you want to see"
                  value={copilotInputValue}
                  onChange={(e) => setCopilotInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                    if (e.key === "Escape") {
                      setCopilotInputValue("");
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  onFocus={() => setCopilotFocused(true)}
                  onBlur={() => setCopilotFocused(false)}
                />
                {copilotInputValue.trim() ? (
                  <button
                    className={styles.copilotSendButton}
                    onClick={handleSend}
                    aria-label="Send"
                  >
                    <ArrowRight20Filled className={styles.sendIconWhite} />
                  </button>
                ) : (
                  <div className={styles.copilotSendButtonHidden} />
                )}
                {copilotFocused && <div className={styles.copilotFocusLine} />}
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
                <Sparkle20Regular className={styles.sparkleSm} />
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
              return (
                <div key={r.id} className={styles.resourceRow}>
                  <div className={styles.resourceNameCell}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={iconSrc} alt="" className={styles.resourceIcon} />
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
