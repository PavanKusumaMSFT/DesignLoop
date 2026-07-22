"use client";

import React, { useState, useMemo } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Text,
  SearchBox,
  Checkbox,
  Badge,
  Divider,
  Tooltip,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemRadio,
  MenuItem,
  MenuProps,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ChevronLeft20Regular,
  ChevronRight12Regular,
  ChevronDown12Regular,
  Add20Regular,
  Delete20Regular,
  ArrowMove20Regular,
  Tag20Regular,
  DataBarVertical20Regular,
  Shield20Regular,
  Eye20Regular,
  ArrowSort16Regular,
  Filter16Regular,
  Search12Regular,
  Search20Regular,
  FolderOpen20Regular,
  Globe20Regular,
  Server20Regular,
  Database20Regular,
  ShieldLock20Regular,
  BrainCircuit20Regular,
  Wrench20Regular,
  QuestionCircle20Regular,
  Dismiss20Regular,
  AppGeneric20Regular,
  ArrowClockwise16Regular,
  ChevronDoubleLeft16Regular,
  CheckmarkCircle20Filled,
  Alert20Regular,
  Send20Regular,
  PeopleAdd20Regular,
  Save20Regular,
  Money20Regular,
  Info20Regular,
  Fire16Filled,
} from "@fluentui/react-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { useNavigation } from "../../../lib/navigation-context";
import { CopilotRegularIcon } from "../../shared/copilot-regular-icon";
import { WorkspaceDetail, WorkspaceDetailScenario } from "./workspace-detail";

const OptimizationAgent = dynamic(
  () => import("../optimize/optimization-agent"),
  { ssr: false },
);

// ---------------------------------------------------------------------------
// Mock data — app-gateway-01 average response time over the last 24 hours
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
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  container: {
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  breadcrumbSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "8px 24px 0 24px",
  },
  breadcrumbContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  breadcrumbItem: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      color: tokens.colorBrandForeground1,
      textDecoration: "underline",
    },
  },
  breadcrumbCurrent: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "8px 24px 16px 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerIcon: {
    width: "36px",
    height: "36px",
    flexShrink: 0,
  },
  bodyWrapper: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    minHeight: 0,
  },
  bodyMain: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
    overflow: "auto",
    minWidth: 0,
    minHeight: 0,
  },
  mainContent: {
    display: "flex",
    flex: 1,
    width: "100%",
    gap: "0",
  },
  copilotPanel: {
    width: "420px",
    minWidth: "420px",
    height: "calc(100vh - 48px - 68px)",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    flexShrink: 0,
    position: "sticky" as const,
    top: 0,
  },

  /* ---- Left TOC ---- */
  leftNav: {
    flex: "0 0 264px",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "110px",
    alignSelf: "flex-start",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  tocSearch: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "9px 12px 9px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tocSearchInput: {
    flex: 1,
    minWidth: 0,
  },
  tocSearchAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    padding: "0",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    borderRadius: "2px",
    flexShrink: 0,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground2,
    },
  },
  tocItems: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  tocSection: {
    display: "flex",
    flexDirection: "column",
  },
  tocGroupHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 20px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    borderRadius: "0",
    border: "none",
    borderLeft: "2px solid transparent",
    backgroundColor: tokens.colorNeutralBackground1,
    width: "100%",
    textAlign: "left",
    maxHeight: "50px",
    overflow: "hidden",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  tocGroupHeaderCollapsible: {},
  tocItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 20px 7px 46px",
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    borderRadius: "0",
    border: "none",
    borderLeft: "2px solid transparent",
    backgroundColor: tokens.colorNeutralBackground1,
    width: "100%",
    textAlign: "left",
    maxHeight: "50px",
    overflow: "hidden",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  tocItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `2px solid ${tokens.colorBrandForeground1}`,
    color: tokens.colorNeutralForeground1,
  },

  /* ---- Blade content ---- */
  bladeContent: {
    flex: 1,
    paddingLeft: "0",
    display: "flex",
    flexDirection: "column",
    gap: "0",
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  /* ---- Command bar ---- */
  commandBar: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "9px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: "0",
    flexWrap: "wrap",
    "& button": {
      height: "32px",
    },
  },
  commandDivider: {
    width: "1px",
    height: "24px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "0 8px",
  },

  /* ---- Data grid ---- */
  gridWrapper: {
    flex: 1,
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  thead: {
    position: "sticky",
    top: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 2,
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    fontSize: "12px",
    borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
    whiteSpace: "nowrap",
    userSelect: "none",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  td: {
    padding: "10px 12px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "220px",
  },
  nameCell: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      textDecoration: "underline",
    },
  },
  row: {
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  rowSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 0",
    flexWrap: "wrap",
  },
  filterPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },
  filterPillActive: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandForeground1}`,
    color: tokens.colorBrandForeground1,
  },
  resultCount: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    padding: "4px 0",
  },
  emptyState: {
    textAlign: "center",
    padding: "64px 24px",
    color: tokens.colorNeutralForeground3,
  },

  /* ---- Full-width workspace detail ---- */
  workspaceDetailContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  workspaceDetailBody: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  workspaceDetailLeft: {
    flex: "0 0 70%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  workspaceDetailLeftScroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: "24px",
  },
  workspaceDetailRight: {
    flex: "0 0 30%",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  workspaceDetailHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },

  /* ---- Analyze Drawer ---- */
  drawerOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1100,
    display: "flex",
    justifyContent: "flex-end",
  },
  drawerPanel: {
    width: "66%",
    maxWidth: "1100px",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "-4px 0 16px rgba(0,0,0,0.14)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    paddingBottom: "60px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  drawerHeaderText: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  drawerBody: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  drawerLeftPane: {
    flex: "0 0 70%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    paddingTop: "24px",
  },
  drawerRightPane: {
    flex: "0 0 30%",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  drawerRightHeader: {
    padding: "16px 16px 12px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    flexShrink: 0,
  },
  drawerResourceList: {
    flex: 1,
    overflowY: "auto",
    padding: "4px 0",
  },
  drawerResourceItem: {
    padding: "8px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  drawerResourceName: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    lineHeight: "18px",
  },
  drawerResourceType: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "16px",
  },

  /* ---- Drawer header buttons ---- */
  drawerHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  statusIndicator: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  /* ---- Drawer cards row ---- */
  drawerCardsRow: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
    padding: "0 24px",
  },
  drawerCard: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  drawerCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  drawerCardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  drawerCardIconContainer: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerCardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  drawerCardTimestamp: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
  },
  drawerCardSubtitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
    lineHeight: "1.4",
  },
  drawerCardDescription: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    lineHeight: "1.5",
  },
  drawerCardStatsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  drawerCardStatBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center" as const,
  },
  drawerCardStatLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "6px",
    fontWeight: tokens.fontWeightRegular,
  },
  drawerCardStatValue: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
  },
  drawerCardButtonContainer: {
    marginTop: "auto",
    display: "flex",
    gap: "8px",
  },
  drawerOutlineButton: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
  },

  /* ---- Bottom sticky cards ---- */
  drawerBottomSection: {
    marginTop: "auto",
    flexShrink: 0,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
  },
  copilotSummaryCard: {
    padding: "20px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  copilotSummaryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    userSelect: "none" as const,
  },
  copilotSummaryChevron: {
    transition: "transform 0.2s ease",
    flexShrink: 0,
    color: tokens.colorNeutralForeground3,
  },
  copilotSummaryChevronCollapsed: {
    transform: "rotate(-90deg)",
  },
  promptModalContent: {
    whiteSpace: "pre-wrap" as const,
    fontSize: "13px",
    lineHeight: "1.6",
    color: tokens.colorNeutralForeground1,
    fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    maxHeight: "60vh",
    overflowY: "auto",
  },
  copilotSummaryPlaceholder: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground4,
    fontSize: "13px",
    fontStyle: "italic",
  },
  copilotScopeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "2px 10px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "12px",
    width: "fit-content",
  },
  copilotResponseText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: tokens.colorNeutralForeground1,
  },
  copilotSuggestions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "16px",
  },
  copilotSuggestionItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "background-color 0.15s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  /* ---- Scrollable content wrapper inside left pane ---- */
  drawerLeftPaneContent: {
    flex: 1,
    overflowY: "auto",
  },
  /* ---- Response time chart card ---- */
  responseTimeCard: {
    margin: "0 24px 24px 24px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  responseTimeTitle: {
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
  copilotSuggestionBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
    marginTop: "1px",
    width: "72px",
    boxSizing: "border-box" as const,
  },
  copilotSuggestionText: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: tokens.colorNeutralForeground2,
  },
  copilotInputCard: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px 60px 24px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  copilotInput: {
    flex: 1,
    padding: "8px 12px",
    fontSize: "13px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "6px",
    outline: "none",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },

  /* ---- Extracted inline-style replacements ---- */
  stickyHeaderWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  displayBlock: {
    display: "block",
  },
  subtitleText: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginTop: "4px",
  },
  chevronAutoMargin: {
    marginLeft: "auto",
    flexShrink: 0,
  },
  analyzeButtonActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  tdCenterEmpty: {
    textAlign: "center" as const,
    padding: "48px 0",
  },
  emptyIcon: {
    fontSize: "40px",
    display: "block",
    margin: "0 auto 12px",
  },
  filterSearchBox: {
    maxWidth: "280px",
    flex: 1,
    height: "30px",
  },
  thCheckbox: {
    width: "40px",
    cursor: "default",
  },
  embrDisabledRow: {
    opacity: 0.5,
    pointerEvents: "none" as const,
  },
  nameInlineWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  embrFireIcon: {
    color: tokens.colorPaletteDarkOrangeForeground1,
    flexShrink: 0,
  },
  embrDisabledName: {
    color: tokens.colorNeutralForeground3,
  },
  brandLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
  embrBadge: {
    marginLeft: "8px",
    fontSize: "11px",
    color: tokens.colorPaletteDarkOrangeForeground1,
    backgroundColor: "rgba(249,115,22,0.1)",
    padding: "1px 6px",
    borderRadius: "4px",
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
  },
  embrBadgeIcon: {
    fontSize: "12px",
  },
  statusDotRunning: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  statusDotStopped: {
    backgroundColor: tokens.colorPaletteRedForeground1,
  },
  statusDotDeallocated: {
    backgroundColor: tokens.colorNeutralForeground3,
  },
  statusDotCreating: {
    backgroundColor: tokens.colorBrandForeground1,
  },
  statusDotFailed: {
    backgroundColor: tokens.colorPaletteRedForeground1,
  },
  saveModalSurface: {
    maxWidth: "480px",
  },
  saveModalContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    marginTop: "8px",
  },
  saveModalLabel: {
    color: tokens.colorNeutralForeground2,
  },
  copilotPanelRelative: {
    position: "relative" as const,
  },
  promptModalSurface: {
    maxWidth: "720px",
  },
});

// ---------------------------------------------------------------------------
// Data types & mock data
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

const mockResources: Resource[] = [
  {
    id: "1",
    name: "prod-web-vm-01",
    type: "Virtual Machine",
    resourceGroup: "rg-production",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "compute",
  },
  {
    id: "2",
    name: "prod-web-vm-02",
    type: "Virtual Machine",
    resourceGroup: "rg-production",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "compute",
  },
  {
    id: "3",
    name: "staging-api-vm",
    type: "Virtual Machine",
    resourceGroup: "rg-staging",
    location: "West US 2",
    subscription: "Development",
    status: "Stopped",
    category: "compute",
  },
  {
    id: "4",
    name: "dev-test-vm",
    type: "Virtual Machine",
    resourceGroup: "rg-development",
    location: "Central US",
    subscription: "Development",
    status: "Deallocated",
    category: "compute",
  },
  {
    id: "5",
    name: "ml-training-cluster",
    type: "Virtual Machine Scale Set",
    resourceGroup: "rg-ml-workloads",
    location: "East US 2",
    subscription: "Production",
    status: "Running",
    category: "compute",
  },
  {
    id: "6",
    name: "prod-vnet-eastus",
    type: "Virtual Network",
    resourceGroup: "rg-networking",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "networking",
  },
  {
    id: "7",
    name: "staging-vnet-westus",
    type: "Virtual Network",
    resourceGroup: "rg-networking",
    location: "West US 2",
    subscription: "Development",
    status: "Running",
    category: "networking",
  },
  {
    id: "8",
    name: "prod-lb-frontend",
    type: "Load Balancer",
    resourceGroup: "rg-networking",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "networking",
  },
  {
    id: "9",
    name: "app-gateway-01",
    type: "Application Gateway",
    resourceGroup: "rg-networking",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "networking",
  },
  {
    id: "10",
    name: "prod-nsg-web",
    type: "Network Security Group",
    resourceGroup: "rg-networking",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "networking",
  },
  {
    id: "11",
    name: "prodstorage01",
    type: "Storage Account",
    resourceGroup: "rg-production",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "storage",
  },
  {
    id: "12",
    name: "devstorageblobs",
    type: "Storage Account",
    resourceGroup: "rg-development",
    location: "Central US",
    subscription: "Development",
    status: "Running",
    category: "storage",
  },
  {
    id: "13",
    name: "backupstoragevault",
    type: "Storage Account",
    resourceGroup: "rg-backups",
    location: "East US 2",
    subscription: "Production",
    status: "Running",
    category: "storage",
  },
  {
    id: "14",
    name: "prod-sql-server",
    type: "SQL Database",
    resourceGroup: "rg-databases",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "databases",
  },
  {
    id: "15",
    name: "analytics-cosmos-db",
    type: "Cosmos DB Account",
    resourceGroup: "rg-databases",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "databases",
  },
  {
    id: "16",
    name: "cache-redis-prod",
    type: "Azure Cache for Redis",
    resourceGroup: "rg-databases",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "databases",
  },
  {
    id: "17",
    name: "staging-postgres",
    type: "PostgreSQL Server",
    resourceGroup: "rg-staging",
    location: "West US 2",
    subscription: "Development",
    status: "Running",
    category: "databases",
  },
  {
    id: "18",
    name: "prod-keyvault-01",
    type: "Key Vault",
    resourceGroup: "rg-security",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "security",
  },
  {
    id: "19",
    name: "dev-keyvault",
    type: "Key Vault",
    resourceGroup: "rg-development",
    location: "Central US",
    subscription: "Development",
    status: "Running",
    category: "security",
  },
  {
    id: "20",
    name: "waf-policy-prod",
    type: "Web Application Firewall",
    resourceGroup: "rg-security",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "security",
  },
  {
    id: "21",
    name: "openai-service-prod",
    type: "Azure OpenAI",
    resourceGroup: "rg-ml-workloads",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "ai-ml",
  },
  {
    id: "22",
    name: "ml-workspace-01",
    type: "Machine Learning Workspace",
    resourceGroup: "rg-ml-workloads",
    location: "East US 2",
    subscription: "Production",
    status: "Running",
    category: "ai-ml",
  },
  {
    id: "23",
    name: "cognitive-search-prod",
    type: "AI Search",
    resourceGroup: "rg-ml-workloads",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "ai-ml",
  },
  {
    id: "24",
    name: "speech-service-dev",
    type: "Speech Service",
    resourceGroup: "rg-development",
    location: "Central US",
    subscription: "Development",
    status: "Creating",
    category: "ai-ml",
  },
  {
    id: "25",
    name: "zava-1-vmss",
    type: "Virtual Machine Scale Set",
    resourceGroup: "rg-production",
    location: "East US",
    subscription: "Production",
    status: "Running",
    category: "compute",
  },
  {
    id: "26",
    name: "zava-retail-storefront",
    type: "Container App",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "compute",
  },
  {
    id: "27",
    name: "managedenvironment-zavaretailstore",
    type: "Container Apps Environment",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "networking",
  },
  {
    id: "28",
    name: "workspacezavaretailstore",
    type: "Log Analytics Workspace",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "security",
  },
  {
    id: "29",
    name: "zava-amw",
    type: "Azure Monitor Workspace",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "security",
  },
  {
    id: "30",
    name: "rg-zavaretailstore",
    type: "Resource Group",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "security",
  },
  {
    id: "31",
    name: "zava-orders-postgres",
    type: "PostgreSQL Server",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "databases",
  },
  {
    id: "32",
    name: "zavaretailassets",
    type: "Storage Account",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "storage",
  },
  {
    id: "33",
    name: "zava-kv",
    type: "Key Vault",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "security",
  },
  {
    id: "34",
    name: "zava-redis-cache",
    type: "Azure Cache for Redis",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "databases",
  },
  {
    id: "35",
    name: "Zava-VM",
    type: "Virtual Machine",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "compute",
  },
  {
    id: "36",
    name: "zava-aks-cluster",
    type: "Kubernetes Service",
    resourceGroup: "rg-zavaretailstore",
    location: "East US",
    subscription: "zava-sub",
    status: "Running",
    category: "compute",
  },
  // embr-test-app-drizzle resources — user-added Azure resource first, then Embr platform services
  {
    id: "41",
    name: "embr-pg-server",
    type: "Azure Database for PostgreSQL",
    resourceGroup: "rg-embr-drizzle",
    location: "East US",
    subscription: "new-embr-sub",
    status: "Running",
    category: "databases",
    managedBy: "azure",
  },
  {
    id: "40",
    name: "embr-test-app-drizzle",
    type: "Embr Compute",
    resourceGroup: "rg-embr-drizzle",
    location: "East US",
    subscription: "new-embr-sub",
    status: "Running",
    category: "compute",
    managedBy: "embr",
  },
  {
    id: "44",
    name: "embr-drizzle-storage",
    type: "Embr Blob Storage",
    resourceGroup: "rg-embr-drizzle",
    location: "East US",
    subscription: "new-embr-sub",
    status: "Running",
    category: "storage",
    managedBy: "embr",
  },
  {
    id: "46",
    name: "embr-drizzle.embrdev.io",
    type: "Embr DNS",
    resourceGroup: "rg-embr-drizzle",
    location: "Global",
    subscription: "new-embr-sub",
    status: "Running",
    category: "networking",
    managedBy: "embr",
  },
];

const resourceMonthlyCost: Record<string, number> = {
  "1": 284.5,
  "2": 284.5,
  "3": 142.3,
  "4": 18.0,
  "5": 1120.0,
  "6": 45.0,
  "7": 45.0,
  "8": 180.5,
  "9": 320.0,
  "10": 0,
  "11": 62.4,
  "12": 14.2,
  "13": 38.5,
  "14": 450.0,
  "15": 320.8,
  "16": 210.0,
  "17": 95.6,
  "18": 2.5,
  "19": 1.2,
  "20": 165.0,
  "21": 890.0,
  "22": 520.0,
  "23": 310.0,
  "24": 45.0,
  "25": 480.72,
  "26": 12.4,
  "27": 8.2,
  "28": 0,
  "29": 0,
  "30": 0,
  "31": 15.8,
  "32": 3.1,
  "33": 1.5,
  "34": 10.25,
  "35": 5.75,
  "36": 320.0,
  "40": 0,
  "41": 15.49,
  "44": 0,
  "46": 0,
};

const postDeployResources = mockResources.filter((resource) =>
  ["26", "27", "30", "31", "32", "33", "34"].includes(resource.id),
);

// embr-test-app-drizzle scoped resources (only what Embr manages + user-added postgres)
const embrDrizzleResources = mockResources.filter((resource) =>
  ["40", "41", "44", "46"].includes(resource.id),
);

// ---------------------------------------------------------------------------
// TOC structure
// ---------------------------------------------------------------------------

interface TocGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: { id: string; label: string }[];
}

const tocGroups: TocGroup[] = [
  {
    id: "workspaces",
    label: "Workspaces",
    icon: <FolderOpen20Regular />,
    children: [
      { id: "ws-default", label: "zava-retail-storefront" },
      { id: "ws-embr-drizzle", label: "embr-test-app-drizzle" },
    ],
  },
  {
    id: "all-resources",
    label: "All Resources",
    icon: <Globe20Regular />,
    children: [
      { id: "compute", label: "Compute" },
      { id: "networking", label: "Networking" },
      { id: "storage", label: "Storage" },
      { id: "databases", label: "Databases" },
      { id: "security", label: "Security" },
      { id: "ai-ml", label: "AI + Machine Learning" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Wrench20Regular />,
    children: [
      { id: "resource-graph-explorer", label: "Resource Graph Explorer" },
      { id: "arm-api-playground", label: "ARM API Playground" },
    ],
  },
  { id: "help", label: "Help", icon: <QuestionCircle20Regular /> },
];

// ---------------------------------------------------------------------------
// Saved workspace type
// ---------------------------------------------------------------------------

interface SavedWorkspace {
  id: string;
  name: string;
  resourceIds: Set<string>;
  createdAt: string;
  showChart: boolean;
  summaryExpanded: boolean;
}

export type ResourceManagerScenario =
  | "post-deploy"
  | "baseline"
  | "after-vmss"
  | "after-postgres"
  | "pre-optimization"
  | "after-optimization"
  | "dashboard-chart-added";

interface ResourceManagerScenarioConfig {
  workspaceName: string;
  resourceIds: string[];
  showChart: boolean;
  summaryExpanded: boolean;
  copilotPanelOpen: boolean;
  detailScenario: WorkspaceDetailScenario;
}

const resourceManagerScenarioConfigs: Record<
  ResourceManagerScenario,
  ResourceManagerScenarioConfig
> = {
  "post-deploy": {
    workspaceName: "zava-retail-storefront",
    resourceIds: ["26", "27", "31", "32", "33", "34"],
    showChart: false,
    summaryExpanded: true,
    copilotPanelOpen: false,
    detailScenario: "post-deploy",
  },
  baseline: {
    workspaceName: "zava-retail-storefront",
    resourceIds: ["26", "27", "30", "31", "32", "33", "34", "35"],
    showChart: false,
    summaryExpanded: false,
    copilotPanelOpen: false,
    detailScenario: "baseline",
  },
  "after-vmss": {
    workspaceName: "zava-retail-storefront",
    resourceIds: ["25", "26", "27", "30", "31", "32", "33", "34", "35"],
    showChart: false,
    summaryExpanded: false,
    copilotPanelOpen: false,
    detailScenario: "after-vmss",
  },
  "after-postgres": {
    workspaceName: "embr-test-app-drizzle",
    resourceIds: ["41", "40", "44", "46"],
    showChart: false,
    summaryExpanded: false,
    copilotPanelOpen: false,
    detailScenario: "post-deploy",
  },
  "pre-optimization": {
    workspaceName: "zava-retail-storefront",
    resourceIds: ["25", "26", "27", "30", "31", "32", "33", "34", "35", "36"],
    showChart: false,
    summaryExpanded: false,
    copilotPanelOpen: false,
    detailScenario: "pre-optimization",
  },
  "after-optimization": {
    workspaceName: "zava-retail-storefront",
    resourceIds: ["25", "26", "27", "30", "31", "32", "33", "34", "35", "36"],
    showChart: false,
    summaryExpanded: false,
    copilotPanelOpen: false,
    detailScenario: "after-optimization",
  },
  "dashboard-chart-added": {
    workspaceName: "zava-retail-storefront",
    resourceIds: ["25", "26", "27", "30", "31", "32", "33", "34", "35"],
    showChart: true,
    summaryExpanded: false,
    copilotPanelOpen: false,
    detailScenario: "dashboard-chart-added",
  },
};

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const statusColor: Record<Resource["status"], string> = {
  Running: tokens.colorPaletteGreenForeground1,
  Stopped: tokens.colorPaletteRedForeground1,
  Deallocated: tokens.colorNeutralForeground3,
  Creating: tokens.colorBrandForeground1,
  Failed: tokens.colorPaletteRedForeground1,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ResourceManagerProps {
  defaultWorkspaceName?: string;
  defaultCopilotOpen?: boolean;
  scenario?: ResourceManagerScenario;
  isDarkMode?: boolean;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({
  defaultWorkspaceName,
  defaultCopilotOpen = false,
  scenario,
  isDarkMode = false,
}) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const scenarioConfig = scenario
    ? resourceManagerScenarioConfigs[scenario]
    : null;
  const availableResources =
    scenario === "post-deploy"
      ? postDeployResources
      : scenario === "after-postgres"
        ? embrDrizzleResources
        : mockResources;
  const initialWorkspaceName =
    scenarioConfig?.workspaceName ?? defaultWorkspaceName;
  const initialSelectedIds =
    scenarioConfig?.resourceIds ??
    (initialWorkspaceName ? ["9", "13", "15", "16"] : []);
  const initialShowChart = scenarioConfig?.showChart ?? false;
  const initialSummaryExpanded = scenarioConfig?.summaryExpanded ?? true;
  const detailScenario = scenarioConfig?.detailScenario ?? "baseline";

  // Filter TOC for scoped scenarios
  const filteredTocGroups = useMemo(() => {
    if (scenario === "after-postgres") {
      return tocGroups.map((group) => {
        if (group.id === "workspaces" && group.children) {
          return {
            ...group,
            children: group.children.filter((c) => c.id === "ws-embr-drizzle"),
          };
        }
        return group;
      });
    }
    return tocGroups;
  }, [scenario]);

  // TOC state
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(initialWorkspaceName ? ["workspaces"] : []),
  );
  const [activeTocItem, setActiveTocItem] = useState(
    scenario === "after-postgres"
      ? "ws-embr-drizzle"
      : initialWorkspaceName
        ? "ws-default"
        : "all-resources",
  );

  // Grid state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(initialSelectedIds),
  );

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [copilotInputValue, setCopilotInputValue] = useState("");
  const [copilotPanelOpen, setCopilotPanelOpen] = useState(
    defaultCopilotOpen || scenarioConfig?.copilotPanelOpen || false,
  );
  const [summaryExpanded, setSummaryExpanded] = useState(
    initialSummaryExpanded,
  );
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [showResponseTimeChart, setShowResponseTimeChart] =
    useState(initialShowChart);
  const [chartLoading, setChartLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCol, setSortCol] = useState<keyof Resource>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Workspace state
  const [saveWorkspaceModalOpen, setSaveWorkspaceModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  // Pre-populated workspace when defaultWorkspaceName is provided
  const defaultWs: SavedWorkspace | null = initialWorkspaceName
    ? {
        id: "ws-default",
        name: initialWorkspaceName,
        resourceIds: new Set(initialSelectedIds),
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        showChart: initialShowChart,
        summaryExpanded: initialSummaryExpanded,
      }
    : null;

  const [savedWorkspaces, setSavedWorkspaces] = useState<SavedWorkspace[]>(
    defaultWs ? [defaultWs] : [],
  );
  const [activeWorkspace, setActiveWorkspace] = useState<SavedWorkspace | null>(
    defaultWs,
  );

  const handleAddDashboardChart = () => {
    setShowResponseTimeChart(true);
    setChartLoading(true);
    setTimeout(() => setChartLoading(false), 1500);

    setActiveWorkspace((prev) => {
      if (!prev) return prev;
      return { ...prev, showChart: true };
    });

    setSavedWorkspaces((prev) =>
      prev.map((workspace) =>
        workspace.id === (activeWorkspace?.id ?? "ws-default")
          ? { ...workspace, showChart: true }
          : workspace,
      ),
    );
  };

  // Filter pill state
  const [filterManagementGroup, setFilterManagementGroup] = useState<
    Record<string, string[]>
  >({ managementGroup: [] });
  const [filterServiceGroup, setFilterServiceGroup] = useState<
    Record<string, string[]>
  >({ serviceGroup: [] });
  const [filterResourceGroup, setFilterResourceGroup] = useState<
    Record<string, string[]>
  >({ resourceGroup: [] });
  const [filterType, setFilterType] = useState<Record<string, string[]>>({
    type: [],
  });
  const [filterLocation, setFilterLocation] = useState<
    Record<string, string[]>
  >({ location: [] });
  const [filterTag, setFilterTag] = useState<Record<string, string[]>>({
    tag: [],
  });
  const [filterSubscription, setFilterSubscription] = useState<
    Record<string, string[]>
  >({ subscription: [] });

  // ---- Derived page label ----
  const activePageLabel = useMemo(() => {
    for (const group of filteredTocGroups) {
      if (group.id === activeTocItem) return group.label;
      if (group.children) {
        for (const child of group.children) {
          if (child.id === activeTocItem) return child.label;
        }
      }
    }
    return "All resources";
  }, [activeTocItem, filteredTocGroups]);

  // ---- TOC helpers ----
  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleTocClick = (id: string) => {
    // If clicking a workspace child, activate that workspace
    const ws = savedWorkspaces.find((w) => w.id === id);
    if (ws) {
      setActiveTocItem(id);
      setSelectedIds(new Set(ws.resourceIds));
      setShowResponseTimeChart(ws.showChart);
      setChartLoading(false);
      setSummaryExpanded(ws.summaryExpanded);
      setSummaryLoading(false);
      setActiveWorkspace(ws);
      return;
    }
    // Otherwise clear workspace and show normal view
    setActiveWorkspace(null);
    setActiveTocItem(id);
    setSelectedIds(new Set());
  };

  // ---- Derived data ----
  const filteredResources = useMemo(() => {
    let list = availableResources;

    // filter by TOC category
    const categoryItems = filteredTocGroups
      .find((g) => g.id === "all-resources")
      ?.children?.map((c) => c.id);
    if (categoryItems?.includes(activeTocItem)) {
      list = list.filter((r) => r.category === activeTocItem);
    }

    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.resourceGroup.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.subscription.toLowerCase().includes(q),
      );
    }

    // filter pills
    const activeMgmtGroup = filterManagementGroup.managementGroup?.[0];
    if (activeMgmtGroup && activeMgmtGroup !== "all") {
      // Management group filtering is a no-op on mock data (no mgmt group field)
    }
    const activeSvcGroup = filterServiceGroup.serviceGroup?.[0];
    if (activeSvcGroup && activeSvcGroup !== "all") {
      // Service group filtering is a no-op on mock data (no service group field)
    }
    const activeRg = filterResourceGroup.resourceGroup?.[0];
    if (activeRg && activeRg !== "all") {
      list = list.filter((r) => r.resourceGroup === activeRg);
    }
    const activeType = filterType.type?.[0];
    if (activeType && activeType !== "all") {
      list = list.filter((r) => r.type === activeType);
    }
    const activeLocation = filterLocation.location?.[0];
    if (activeLocation && activeLocation !== "all") {
      list = list.filter((r) => r.location === activeLocation);
    }
    const activeSubscription = filterSubscription.subscription?.[0];
    if (activeSubscription && activeSubscription !== "all") {
      list = list.filter((r) => r.subscription === activeSubscription);
    }

    // sort
    list = [...list].sort((a, b) => {
      const aVal = a[sortCol];
      const bVal = b[sortCol];
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [
    activeTocItem,
    searchQuery,
    sortCol,
    sortDir,
    filterManagementGroup,
    filterServiceGroup,
    filterResourceGroup,
    filterType,
    filterLocation,
    filterSubscription,
    availableResources,
  ]);

  // ---- Selection helpers ----
  const allSelected =
    filteredResources.length > 0 &&
    filteredResources.every((r) => selectedIds.has(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredResources.map((r) => r.id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ---- Sort handler ----
  const handleSort = (col: keyof Resource) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const sortIndicator = (col: keyof Resource) =>
    sortCol === col ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const statusDotClass: Record<Resource["status"], string> = {
    Running: styles.statusDotRunning,
    Stopped: styles.statusDotStopped,
    Deallocated: styles.statusDotDeallocated,
    Creating: styles.statusDotCreating,
    Failed: styles.statusDotFailed,
  };

  // ---- Render ----
  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <div className={styles.container}>
        {/* Top nav */}
        <AzureHeaderBuildMVP
          activeLink="Manage"
          hideManage
          isDarkMode={isDarkMode}
        />

        {/* Body wrapper: page content + optional copilot panel */}
        <div className={styles.bodyWrapper}>
          <div className={styles.bodyMain}>
            {/* Breadcrumb + Page title - sticky */}
            <div className={styles.stickyHeaderWrapper}>
              {/* Breadcrumb */}
              <div className={styles.breadcrumbSection}>
                <div className={styles.breadcrumbContainer}>
                  <span
                    className={styles.breadcrumbItem}
                    onClick={() => {
                      setActiveWorkspace(null);
                      handlePageChange("home-fre");
                    }}
                  >
                    Home
                  </span>
                  <span className={styles.breadcrumbSeparator}>›</span>
                  {activeWorkspace ? (
                    <>
                      <span
                        className={styles.breadcrumbItem}
                        onClick={() => setActiveWorkspace(null)}
                      >
                        Resource Manager
                      </span>
                      <span className={styles.breadcrumbSeparator}>›</span>
                      <span
                        className={styles.breadcrumbItem}
                        onClick={() => {
                          setActiveWorkspace(null);
                          setActiveTocItem("workspaces");
                        }}
                      >
                        Workspaces
                      </span>
                      <span className={styles.breadcrumbSeparator}>›</span>
                      <span className={styles.breadcrumbCurrent}>
                        {activeWorkspace.name}
                      </span>
                    </>
                  ) : (
                    <span className={styles.breadcrumbCurrent}>
                      Resource Manager
                    </span>
                  )}
                </div>
              </div>

              {/* Page title */}
              <div className={styles.header}>
                <svg
                  className={styles.headerIcon}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0"
                    y="0"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="6.5"
                    y="0"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="13"
                    y="0"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="0"
                    y="6.5"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="6.5"
                    y="6.5"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="13"
                    y="6.5"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="0"
                    y="13"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="6.5"
                    y="13"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                  <rect
                    x="13"
                    y="13"
                    width="5"
                    height="5"
                    rx="0.5"
                    fill={tokens.colorPaletteGreenForeground1}
                  />
                </svg>
                <div>
                  <>
                    <Text
                      size={600}
                      weight="semibold"
                      className={styles.displayBlock}
                    >
                      Resource Manager | {activePageLabel}
                    </Text>
                    <Text size={300} className={styles.subtitleText}>
                      Workspace
                    </Text>
                  </>
                </div>
              </div>
            </div>

            {/* Body: TOC + blade */}
            <div className={styles.mainContent}>
              {/* ======== Left TOC ======== */}
              <nav className={styles.leftNav}>
                {/* Menu items */}
                <div className={styles.tocItems}>
                  {filteredTocGroups.map((group) => (
                    <div key={group.id} className={styles.tocSection}>
                      <button
                        className={`${styles.tocGroupHeader} ${
                          group.children ? styles.tocGroupHeaderCollapsible : ""
                        } ${
                          activeTocItem === group.id && !group.children
                            ? styles.tocItemActive
                            : ""
                        }`}
                        onClick={() => {
                          if (group.children) {
                            toggleGroup(group.id);
                          }
                          handleTocClick(group.id);
                        }}
                      >
                        {group.icon}
                        {group.label}
                        {group.children ? (
                          expandedGroups.has(group.id) ? (
                            <ChevronDown12Regular
                              className={styles.chevronAutoMargin}
                            />
                          ) : (
                            <ChevronRight12Regular
                              className={styles.chevronAutoMargin}
                            />
                          )
                        ) : null}
                      </button>

                      {group.children && expandedGroups.has(group.id) && (
                        <div>
                          {group.children.map((child) => (
                            <button
                              key={child.id}
                              className={`${styles.tocItem} ${
                                activeTocItem === child.id
                                  ? styles.tocItemActive
                                  : ""
                              }`}
                              onClick={() => handleTocClick(child.id)}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>

              {/* ======== Blade content ======== */}
              <div className={styles.bladeContent}>
                {activeWorkspace ? (
                  /* ======== Workspace detail inside blade ======== */
                  <WorkspaceDetail
                    mode="fullpage"
                    title={activeWorkspace.name}
                    scenario={detailScenario}
                    selectedIds={selectedIds}
                    resources={availableResources}
                    resourceMonthlyCost={resourceMonthlyCost}
                    summaryExpanded={summaryExpanded}
                    setSummaryExpanded={setSummaryExpanded}
                    summaryLoading={summaryLoading}
                    showResponseTimeChart={showResponseTimeChart}
                    setShowResponseTimeChart={setShowResponseTimeChart}
                    chartLoading={chartLoading}
                    setChartLoading={setChartLoading}
                    copilotInputValue={copilotInputValue}
                    setCopilotInputValue={setCopilotInputValue}
                    promptModalOpen={promptModalOpen}
                    setPromptModalOpen={setPromptModalOpen}
                    onOpenOptimizationAgent={() =>
                      handlePageChange("optimization-agent")
                    }
                    onOpenCopilotPanel={() => setCopilotPanelOpen(true)}
                    onAddDashboardChart={handleAddDashboardChart}
                    onCreateScalableVm={() =>
                      handlePageChange("create-scalable-vm")
                    }
                  />
                ) : activeTocItem === "workspaces" ? (
                  <>
                    {/* Command bar */}
                    <div className={styles.commandBar}>
                      <Button
                        appearance="primary"
                        icon={<Add20Regular />}
                        size="small"
                      >
                        Create
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Delete20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                      >
                        Delete
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<ArrowMove20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                      >
                        Move to
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Tag20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                      >
                        Add tag
                      </Button>

                      <div className={styles.commandDivider} />

                      <Button
                        appearance="subtle"
                        icon={<DataBarVertical20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                        onClick={() => {
                          setDrawerOpen(true);
                          setSummaryLoading(true);
                          setTimeout(() => setSummaryLoading(false), 2000);
                        }}
                        className={
                          selectedIds.size > 0
                            ? styles.analyzeButtonActive
                            : undefined
                        }
                      >
                        Analyze
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Shield20Regular />}
                        size="small"
                      >
                        Policies
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Eye20Regular />}
                        size="small"
                      >
                        Visualize
                      </Button>
                    </div>
                    <div className={styles.gridWrapper}>
                      <table className={styles.table}>
                        <thead className={styles.thead}>
                          <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Resources</th>
                            <th className={styles.th}>Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedWorkspaces.map((ws2) => (
                            <tr key={ws2.id} className={styles.row}>
                              <td
                                className={`${styles.td} ${styles.nameCell}`}
                                onClick={() => {
                                  const ws = savedWorkspaces.find(
                                    (w) => w.id === ws2.id,
                                  )!;
                                  setSelectedIds(new Set(ws.resourceIds));
                                  setShowResponseTimeChart(ws.showChart);
                                  setChartLoading(false);
                                  setSummaryExpanded(ws.summaryExpanded);
                                  setSummaryLoading(false);
                                  setActiveWorkspace(ws);
                                }}
                              >
                                {ws2.name}
                              </td>
                              <td className={styles.td}>
                                {ws2.resourceIds.size}
                              </td>
                              <td className={styles.td}>{ws2.createdAt}</td>
                            </tr>
                          ))}
                          {savedWorkspaces.length === 0 && (
                            <tr>
                              <td
                                colSpan={3}
                                className={mergeClasses(
                                  styles.td,
                                  styles.tdCenterEmpty,
                                )}
                              >
                                <div className={styles.emptyState}>
                                  <FolderOpen20Regular
                                    className={styles.emptyIcon}
                                  />
                                  <Text
                                    size={400}
                                    className={styles.displayBlock}
                                  >
                                    No saved workspaces
                                  </Text>
                                  <Text
                                    size={200}
                                    className={styles.subtitleText}
                                  >
                                    Select resources and use &quot;Save as
                                    workspace&quot; from the Analyze drawer
                                  </Text>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Command bar */}
                    <div className={styles.commandBar}>
                      <Button
                        appearance="primary"
                        icon={<Add20Regular />}
                        size="small"
                      >
                        Create
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Delete20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                      >
                        Delete
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<ArrowMove20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                      >
                        Move to
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Tag20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                      >
                        Add tag
                      </Button>

                      <div className={styles.commandDivider} />

                      <Button
                        appearance="subtle"
                        icon={<DataBarVertical20Regular />}
                        size="small"
                        disabled={selectedIds.size === 0}
                        onClick={() => {
                          setDrawerOpen(true);
                          setSummaryLoading(true);
                          setTimeout(() => setSummaryLoading(false), 2000);
                        }}
                        className={
                          selectedIds.size > 0
                            ? styles.analyzeButtonActive
                            : undefined
                        }
                      >
                        Analyze
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Shield20Regular />}
                        size="small"
                      >
                        Policies
                      </Button>
                      <Button
                        appearance="subtle"
                        icon={<Eye20Regular />}
                        size="small"
                      >
                        Visualize
                      </Button>
                    </div>

                    {/* Filter / search bar */}
                    <div className={styles.filterBar}>
                      <SearchBox
                        placeholder="Filter by name, type, resource group…"
                        value={searchQuery}
                        onChange={(_, data) => setSearchQuery(data.value)}
                        className={styles.filterSearchBox}
                        size="small"
                      />

                      <Menu
                        checkedValues={filterManagementGroup}
                        onCheckedValueChange={(_, data) =>
                          setFilterManagementGroup({
                            managementGroup: data.checkedItems,
                          })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterManagementGroup.managementGroup.length > 0 && filterManagementGroup.managementGroup[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Management group:{" "}
                            {filterManagementGroup.managementGroup.length > 0 &&
                            filterManagementGroup.managementGroup[0] !== "all"
                              ? filterManagementGroup.managementGroup[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="managementGroup" value="all">
                              All
                            </MenuItemRadio>
                            <MenuItemRadio
                              name="managementGroup"
                              value="Tenant Root Group"
                            >
                              Tenant Root Group
                            </MenuItemRadio>
                            <MenuItemRadio
                              name="managementGroup"
                              value="Production"
                            >
                              Production
                            </MenuItemRadio>
                            <MenuItemRadio
                              name="managementGroup"
                              value="Development"
                            >
                              Development
                            </MenuItemRadio>
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <Menu
                        checkedValues={filterServiceGroup}
                        onCheckedValueChange={(_, data) =>
                          setFilterServiceGroup({
                            serviceGroup: data.checkedItems,
                          })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterServiceGroup.serviceGroup.length > 0 && filterServiceGroup.serviceGroup[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Service group:{" "}
                            {filterServiceGroup.serviceGroup.length > 0 &&
                            filterServiceGroup.serviceGroup[0] !== "all"
                              ? filterServiceGroup.serviceGroup[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="serviceGroup" value="all">
                              All
                            </MenuItemRadio>
                            <MenuItemRadio
                              name="serviceGroup"
                              value="Web Services"
                            >
                              Web Services
                            </MenuItemRadio>
                            <MenuItemRadio
                              name="serviceGroup"
                              value="Data Platform"
                            >
                              Data Platform
                            </MenuItemRadio>
                            <MenuItemRadio name="serviceGroup" value="AI & ML">
                              AI & ML
                            </MenuItemRadio>
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <Menu
                        checkedValues={filterResourceGroup}
                        onCheckedValueChange={(_, data) =>
                          setFilterResourceGroup({
                            resourceGroup: data.checkedItems,
                          })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterResourceGroup.resourceGroup.length > 0 && filterResourceGroup.resourceGroup[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Resource group:{" "}
                            {filterResourceGroup.resourceGroup.length > 0 &&
                            filterResourceGroup.resourceGroup[0] !== "all"
                              ? filterResourceGroup.resourceGroup[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="resourceGroup" value="all">
                              All
                            </MenuItemRadio>
                            {Array.from(
                              new Set(
                                availableResources.map((r) => r.resourceGroup),
                              ),
                            )
                              .sort()
                              .map((g) => (
                                <MenuItemRadio
                                  key={g}
                                  name="resourceGroup"
                                  value={g}
                                >
                                  {g}
                                </MenuItemRadio>
                              ))}
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <Menu
                        checkedValues={filterType}
                        onCheckedValueChange={(_, data) =>
                          setFilterType({ type: data.checkedItems })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterType.type.length > 0 && filterType.type[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Type:{" "}
                            {filterType.type.length > 0 &&
                            filterType.type[0] !== "all"
                              ? filterType.type[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="type" value="all">
                              All
                            </MenuItemRadio>
                            {Array.from(
                              new Set(availableResources.map((r) => r.type)),
                            )
                              .sort()
                              .map((t) => (
                                <MenuItemRadio key={t} name="type" value={t}>
                                  {t}
                                </MenuItemRadio>
                              ))}
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <Menu
                        checkedValues={filterLocation}
                        onCheckedValueChange={(_, data) =>
                          setFilterLocation({ location: data.checkedItems })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterLocation.location.length > 0 && filterLocation.location[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Location:{" "}
                            {filterLocation.location.length > 0 &&
                            filterLocation.location[0] !== "all"
                              ? filterLocation.location[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="location" value="all">
                              All
                            </MenuItemRadio>
                            {Array.from(
                              new Set(
                                availableResources.map((r) => r.location),
                              ),
                            )
                              .sort()
                              .map((l) => (
                                <MenuItemRadio
                                  key={l}
                                  name="location"
                                  value={l}
                                >
                                  {l}
                                </MenuItemRadio>
                              ))}
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <Menu
                        checkedValues={filterTag}
                        onCheckedValueChange={(_, data) =>
                          setFilterTag({ tag: data.checkedItems })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterTag.tag.length > 0 && filterTag.tag[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Tag:{" "}
                            {filterTag.tag.length > 0 &&
                            filterTag.tag[0] !== "all"
                              ? filterTag.tag[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="tag" value="all">
                              All
                            </MenuItemRadio>
                            <MenuItemRadio name="tag" value="production">
                              production
                            </MenuItemRadio>
                            <MenuItemRadio name="tag" value="staging">
                              staging
                            </MenuItemRadio>
                            <MenuItemRadio name="tag" value="development">
                              development
                            </MenuItemRadio>
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <Menu
                        checkedValues={filterSubscription}
                        onCheckedValueChange={(_, data) =>
                          setFilterSubscription({
                            subscription: data.checkedItems,
                          })
                        }
                      >
                        <MenuTrigger disableButtonEnhancement>
                          <button
                            className={`${styles.filterPill} ${filterSubscription.subscription.length > 0 && filterSubscription.subscription[0] !== "all" ? styles.filterPillActive : ""}`}
                          >
                            Subscription:{" "}
                            {filterSubscription.subscription.length > 0 &&
                            filterSubscription.subscription[0] !== "all"
                              ? filterSubscription.subscription[0]
                              : "All"}
                            <ChevronDown12Regular />
                          </button>
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItemRadio name="subscription" value="all">
                              All
                            </MenuItemRadio>
                            {Array.from(
                              new Set(
                                availableResources.map((r) => r.subscription),
                              ),
                            )
                              .sort()
                              .map((s) => (
                                <MenuItemRadio
                                  key={s}
                                  name="subscription"
                                  value={s}
                                >
                                  {s}
                                </MenuItemRadio>
                              ))}
                          </MenuList>
                        </MenuPopover>
                      </Menu>

                      <span className={styles.resultCount}>
                        {filteredResources.length} resource
                        {filteredResources.length !== 1 ? "s" : ""}
                        {selectedIds.size > 0 &&
                          ` · ${selectedIds.size} selected`}
                      </span>
                    </div>

                    {/* Data grid */}
                    <div className={styles.gridWrapper}>
                      <table className={styles.table}>
                        <thead className={styles.thead}>
                          <tr>
                            <th
                              className={mergeClasses(
                                styles.th,
                                styles.thCheckbox,
                              )}
                            >
                              <Checkbox
                                checked={
                                  allSelected
                                    ? true
                                    : selectedIds.size > 0
                                      ? "mixed"
                                      : false
                                }
                                onChange={toggleAll}
                              />
                            </th>
                            <th
                              className={styles.th}
                              onClick={() => handleSort("name")}
                            >
                              Name{sortIndicator("name")}
                            </th>
                            <th
                              className={styles.th}
                              onClick={() => handleSort("type")}
                            >
                              Type{sortIndicator("type")}
                            </th>
                            <th
                              className={styles.th}
                              onClick={() => handleSort("resourceGroup")}
                            >
                              Resource group{sortIndicator("resourceGroup")}
                            </th>
                            <th
                              className={styles.th}
                              onClick={() => handleSort("location")}
                            >
                              Location{sortIndicator("location")}
                            </th>
                            <th
                              className={styles.th}
                              onClick={() => handleSort("subscription")}
                            >
                              Subscription{sortIndicator("subscription")}
                            </th>
                            <th
                              className={styles.th}
                              onClick={() => handleSort("status")}
                            >
                              Status{sortIndicator("status")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredResources.map((resource) => (
                            <tr
                              key={resource.id}
                              className={`${styles.row} ${
                                selectedIds.has(resource.id)
                                  ? styles.rowSelected
                                  : ""
                              } ${resource.managedBy === "embr" ? styles.embrDisabledRow : ""}`}
                            >
                              <td className={styles.td}>
                                <Checkbox
                                  checked={selectedIds.has(resource.id)}
                                  onChange={() => toggleRow(resource.id)}
                                />
                              </td>
                              <td className={`${styles.td} ${styles.nameCell}`}>
                                <span className={styles.nameInlineWrap}>
                                  {resource.managedBy === "embr" ? (
                                    <>
                                      <Fire16Filled
                                        className={styles.embrFireIcon}
                                      />
                                      <span className={styles.embrDisabledName}>
                                        {resource.name}
                                      </span>
                                    </>
                                  ) : resource.type ===
                                    "Azure Database for PostgreSQL" ? (
                                    <>
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                      >
                                        <path
                                          d="M8 1C5.1 1 2.7 1.8 2.7 3v10c0 1.2 2.4 2 5.3 2s5.3-.8 5.3-2V3c0-1.2-2.4-2-5.3-2z"
                                          fill={tokens.colorBrandForeground1}
                                        />
                                        <ellipse
                                          cx="8"
                                          cy="3"
                                          rx="5.3"
                                          ry="2"
                                          fill={tokens.colorBrandForeground2}
                                        />
                                        <path
                                          d="M13.3 6c0 1.1-2.4 2-5.3 2S2.7 7.1 2.7 6"
                                          stroke={
                                            tokens.colorNeutralBackground1
                                          }
                                          strokeWidth=".5"
                                          fill="none"
                                        />
                                        <path
                                          d="M13.3 9.5c0 1.1-2.4 2-5.3 2s-5.3-.9-5.3-2"
                                          stroke={
                                            tokens.colorNeutralBackground1
                                          }
                                          strokeWidth=".5"
                                          fill="none"
                                        />
                                      </svg>
                                      <span className={styles.brandLink}>
                                        {resource.name}
                                      </span>
                                    </>
                                  ) : (
                                    <span className={styles.brandLink}>
                                      {resource.name}
                                    </span>
                                  )}
                                </span>
                              </td>
                              <td className={styles.td}>
                                {resource.type}
                                {resource.managedBy === "embr" && (
                                  <span className={styles.embrBadge}>
                                    <Fire16Filled
                                      className={styles.embrBadgeIcon}
                                    />{" "}
                                    Embr
                                  </span>
                                )}
                              </td>
                              <td className={styles.td}>
                                {resource.resourceGroup}
                              </td>
                              <td className={styles.td}>{resource.location}</td>
                              <td className={styles.td}>
                                {resource.subscription}
                              </td>
                              <td className={styles.td}>
                                <span className={styles.statusBadge}>
                                  <span
                                    className={mergeClasses(
                                      styles.statusDot,
                                      statusDotClass[resource.status],
                                    )}
                                  />
                                  {resource.status}
                                </span>
                              </td>
                            </tr>
                          ))}

                          {filteredResources.length === 0 && (
                            <tr>
                              <td
                                colSpan={7}
                                className={mergeClasses(
                                  styles.td,
                                  styles.tdCenterEmpty,
                                )}
                              >
                                <div className={styles.emptyState}>
                                  <Search20Regular
                                    className={styles.emptyIcon}
                                  />
                                  <Text
                                    size={400}
                                    className={styles.displayBlock}
                                  >
                                    No resources found
                                  </Text>
                                  <Text
                                    size={200}
                                    className={styles.subtitleText}
                                  >
                                    Try adjusting your filters or search query
                                  </Text>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>

              {/* ======== Save Workspace Modal ======== */}
              <Dialog
                open={saveWorkspaceModalOpen}
                onOpenChange={(_, data) => setSaveWorkspaceModalOpen(data.open)}
              >
                <DialogSurface className={styles.saveModalSurface}>
                  <DialogBody>
                    <DialogTitle>Save as workspace</DialogTitle>
                    <DialogContent>
                      <div className={styles.saveModalContent}>
                        <Text size={300} className={styles.saveModalLabel}>
                          Give your workspace a name. It will include the{" "}
                          {selectedIds.size} selected resource
                          {selectedIds.size !== 1 ? "s" : ""} and the generated
                          dashboard.
                        </Text>
                        <Input
                          placeholder="e.g. Production Web Stack"
                          value={workspaceName}
                          onChange={(_, data) => setWorkspaceName(data.value)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && workspaceName.trim()) {
                              const newWorkspace: SavedWorkspace = {
                                id: `ws-${Date.now()}`,
                                name: workspaceName.trim(),
                                resourceIds: new Set(selectedIds),
                                createdAt: new Date().toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  },
                                ),
                                showChart: showResponseTimeChart,
                                summaryExpanded,
                              };
                              setSavedWorkspaces((prev) => [
                                ...prev,
                                newWorkspace,
                              ]);
                              setSaveWorkspaceModalOpen(false);
                              setDrawerOpen(false);
                              setActiveTocItem("workspaces");
                              setExpandedGroups((prev) => {
                                const n = new Set(prev);
                                n.delete("all-resources");
                                return n;
                              });
                            }
                          }}
                        />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        appearance="secondary"
                        onClick={() => setSaveWorkspaceModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        appearance="primary"
                        disabled={!workspaceName.trim()}
                        onClick={() => {
                          const newWorkspace: SavedWorkspace = {
                            id: `ws-${Date.now()}`,
                            name: workspaceName.trim(),
                            resourceIds: new Set(selectedIds),
                            createdAt: new Date().toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }),
                            showChart: showResponseTimeChart,
                            summaryExpanded,
                          };
                          setSavedWorkspaces((prev) => [...prev, newWorkspace]);
                          setSaveWorkspaceModalOpen(false);
                          setDrawerOpen(false);
                          setActiveTocItem("workspaces");
                          setExpandedGroups((prev) => {
                            const n = new Set(prev);
                            n.delete("all-resources");
                            return n;
                          });
                        }}
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </DialogBody>
                </DialogSurface>
              </Dialog>

              {/* ======== Analyze Drawer ======== */}
              {drawerOpen && (
                <div
                  className={styles.drawerOverlay}
                  onClick={() => setDrawerOpen(false)}
                >
                  <div
                    className={styles.drawerPanel}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WorkspaceDetail
                      mode="drawer"
                      title="Selected Scope"
                      scenario={detailScenario}
                      selectedIds={selectedIds}
                      resources={availableResources}
                      resourceMonthlyCost={resourceMonthlyCost}
                      summaryExpanded={summaryExpanded}
                      setSummaryExpanded={setSummaryExpanded}
                      summaryLoading={summaryLoading}
                      showResponseTimeChart={showResponseTimeChart}
                      setShowResponseTimeChart={setShowResponseTimeChart}
                      chartLoading={chartLoading}
                      setChartLoading={setChartLoading}
                      copilotInputValue={copilotInputValue}
                      setCopilotInputValue={setCopilotInputValue}
                      promptModalOpen={promptModalOpen}
                      setPromptModalOpen={setPromptModalOpen}
                      onOpenOptimizationAgent={() =>
                        handlePageChange("optimization-agent")
                      }
                      onOpenCopilotPanel={() => setCopilotPanelOpen(true)}
                      onAddDashboardChart={handleAddDashboardChart}
                      onClose={() => setDrawerOpen(false)}
                      onCreateScalableVm={() =>
                        handlePageChange("create-scalable-vm")
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Docked Copilot Panel */}
          {copilotPanelOpen && (
            <div
              className={mergeClasses(
                styles.copilotPanel,
                styles.copilotPanelRelative,
              )}
              id="docked-copilot-root"
            >
              <style>{`
              #docked-copilot-root > * {
                height: 100% !important;
                overflow: hidden !important;
              }
              #docked-copilot-root > * > * {
                height: 100% !important;
                overflow: hidden !important;
              }
            `}</style>
              <OptimizationAgent
                docked
                onClose={() => setCopilotPanelOpen(false)}
                onNavigate={(page) => {
                  setCopilotPanelOpen(false);
                  handlePageChange(page);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* AI Prompt Modal */}
      <Dialog
        open={promptModalOpen}
        onOpenChange={(_, data) => setPromptModalOpen(data.open)}
      >
        <DialogSurface className={styles.promptModalSurface}>
          <DialogBody>
            <DialogTitle>Copilot Summary — AI Prompt</DialogTitle>
            <DialogContent>
              <div className={styles.promptModalContent}>
                {AI_SUMMARY_PROMPT}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="primary"
                onClick={() => setPromptModalOpen(false)}
              >
                Close
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};

// ---------------------------------------------------------------------------
// AI Prompt text (for demo modal)
// ---------------------------------------------------------------------------
const AI_SUMMARY_PROMPT = `You are an assistant embedded in the Azure portal. Your job is to generate a short, plain-language summary of a set of Azure resources that a user has selected or is currently viewing.

## Your inputs
You will receive structured data about one or more Azure resources, including:
- Resource type (e.g., App Service, SQL Database, Storage Account, Key Vault)
- Current health/status (e.g., Running, Stopped, Degraded, error codes)
- Resource group and region
- Tags and configuration metadata
- Dependency relationships (e.g., which resources reference each other via connection strings, managed identity bindings, VNet links, etc.)
- Recent activity log entries (last 7 days): deployments, config changes, restarts, scaling events, alerts fired

## Your task
Write a single short paragraph (4\u20136 sentences) that covers:
1. What each resource is and what it does in practical terms
2. Whether each resource is currently healthy or has issues, and what those issues mean concretely
3. Whether any of the selected resources depend on each other, and how
4. Any notable recent changes (deployments, config edits, incidents)

## Audience
The user is new to Azure and may not know what an \u201cApp Service Plan\u201d or \u201cNSG\u201d is. Use plain language. Refer to resources by their name and type (e.g., \u201cyour web app called \u2018storefront-prod\u2019\u201d), not by internal identifiers or ARM resource IDs. Do not use metaphors or analogies. Be direct and factual.

## Tone and style rules
- Do not say things like \u201cthink of it as a container\u201d or \u201cimagine a highway\u201d
- Do not use bullet points or headers \u2014 output is a single paragraph only
- Do not speculate beyond the data provided
- If a dependency exists, state it plainly: \u201cYour web app connects to your SQL database to store and retrieve data.\u201d
- If health status is unknown or data is missing, say so briefly rather than omitting it
- If no recent changes exist, skip that sentence \u2014 do not say \u201cno recent changes were detected\u201d
- Keep it under 120 words

## Output format
Plain paragraph. No markdown. No lists. No headers.

## Example output
\u201cYour web app \u2018storefront-prod\u2019 is a hosted application that serves your website and is currently running without issues. It connects to a SQL database called \u2018orders-db\u2019, which stores your application\u2019s data and is also healthy. A storage account named \u2018staticassets-001\u2019 holds uploaded files your app reads at runtime. Two days ago, a new version of the web app was deployed, and the database connection string was updated at the same time. No alerts have fired across these resources in the past week.\u201d`;

export default ResourceManager;
