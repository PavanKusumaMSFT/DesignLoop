"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Checkbox,
  Link,
  MenuButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  TabList,
  Tab,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import {
  Add20Regular,
  ArrowClockwise20Regular,
  ArrowCurveDownLeft20Regular,
  Settings20Regular,
  ArrowClockwiseDashesSettings20Regular,
  Open20Regular,
  Delete20Regular,
  TagMultiple20Regular,
  Filter20Regular,
  Dismiss12Regular,
  Dismiss20Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  ChevronRight12Regular,
  ChevronUpDown16Regular,
  ChevronDoubleLeft16Regular,
  ChevronDoubleRight16Regular,
  Search16Regular,
  MoreHorizontal20Regular,
  Pin20Regular,
  Star20Regular,
  PersonFeedback20Regular,
  ArrowSort20Regular,
  Home20Regular,
  Grid20Regular,
  Rocket20Filled,
  Search20Regular,
  TableSimple20Regular,
  Sparkle20Regular,
  Sparkle20Filled,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    paddingBottom: "48px",
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden" as const,
  },
  pageLayout: {
    display: "flex",
    flex: 1,
    minHeight: 0,
  },

  /* ── Left sidebar ─────────────────────── */
  sidebar: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    paddingTop: "40px",
    overflowY: "auto",
    position: "relative" as const,
    flexShrink: 0,
  },
  sidebarCollapsed: {
    width: "48px !important" as any,
    minWidth: "48px !important" as any,
    paddingTop: 0,
    overflow: "hidden" as const,
  },
  sidebarExpandBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40px",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    backgroundColor: "transparent",
    border: "none",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  resizeHandle: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    width: "4px",
    height: "100%",
    cursor: "col-resize",
    zIndex: 2,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground,
    },
  },
  resizeHandleActive: {
    backgroundColor: tokens.colorBrandBackground,
  },
  sidebarSearchBar: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1,
  },
  sidebarSearchInput: {
    flex: 1,
    minWidth: 0,
  },
  sidebarSearchIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: `7px 20px`,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left" as const,
    whiteSpace: "normal" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  sidebarItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  sidebarIndented: {
    paddingLeft: "36px",
  },
  sidebarGroupHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: `7px 20px 7px 22px`,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left" as const,
    whiteSpace: "normal" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  sidebarChevron: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 150ms ease",
    flexShrink: 0,
  },
  sidebarChevronOpen: {
    transform: "rotate(90deg)",
  },
  sidebarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "20px",
    color: tokens.colorNeutralForeground2,
  },
  sidebarChildIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },

  /* ── Main content ─────────────────────── */
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    overflow: "hidden" as const,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* ── Page header (blade header — spans full width) ── */
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalS} 20px`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  headerTitleGroup: {
    display: "flex",
    flexDirection: "column",
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  pageTitleSuffix: {
    fontSize: "inherit",
    fontWeight: tokens.fontWeightRegular,
  },
  pageSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    whiteSpace: "nowrap" as const,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
  },
  headerActionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },

  /* ── Tabs above command bar ───────────── */
  tabBar: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  /* ── Command bar ──────────────────────── */
  commandBar: {
    display: "flex",
    alignItems: "center",
    gap: "0px",
    paddingBottom: "1px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    flexWrap: "wrap" as const,
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "41px",
    borderRadius: tokens.borderRadiusMedium,
  },
  commandSeparator: {
    width: "1px",
    height: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginLeft: tokens.spacingHorizontalXS,
    marginRight: tokens.spacingHorizontalXS,
  },

  /* ── Filter bar ───────────────────────── */
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalM} 0 0 0`,
    flexWrap: "wrap",
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "32px",
  },
  filterInput: {
    width: "274px",
  },
  filterPillGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  filterPill: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid transparent`,
    borderRadius: tokens.borderRadiusCircular,
    padding: "0",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    lineHeight: tokens.lineHeightBase200,
    height: "24px",
    maxHeight: "24px",
    whiteSpace: "nowrap" as const,
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  filterPillValue: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  filterPillDismiss: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: tokens.colorBrandForeground1,
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    marginLeft: tokens.spacingHorizontalXXS,
  },
  filterPopoverList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    maxHeight: "280px",
    overflowY: "auto",
    minWidth: "200px",
  },
  filterPopoverItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left" as const,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  clearFiltersBtn: {
    marginLeft: tokens.spacingHorizontalS,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXXL,
    gap: tokens.spacingVerticalM,
  },

  /* ── Data table ───────────────────────── */
  tableWrapper: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    marginTop: tokens.spacingVerticalM,
    overflowX: "auto",
  },
  tableHeaderCell: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  headerCellContent: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  sortIcon: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  moreCell: {
    width: "32px",
    minWidth: "32px",
    maxWidth: "32px",
  },
  tableCell: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  lastRow: {
    borderBottomColor: "transparent",
  },
  vmNameLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
  },
  vmIcon: {
    width: "16px",
    height: "16px",
    marginRight: tokens.spacingHorizontalXS,
    verticalAlign: "middle",
  },
  viewStatusLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
  },

  /* ── Pagination ───────────────────────── */
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    flexShrink: 0,
  },
  paginationCenter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  pageBtn: {
    minWidth: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.borderRadiusMedium,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  pageBtnActive: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  feedbackLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },

  /* ── EMM upsell banner ───────────────── */
  createMenuItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    minHeight: "auto",
  },
  createMenuIcon: {
    width: "36px",
    height: "36px",
    flexShrink: 0,
    marginTop: tokens.spacingVerticalXXS,
  },
  createMenuTextGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flex: 1,
    minWidth: 0,
  },
  createMenuTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  createMenuDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: "normal" as const,
  },
  createMenuPopover: {
    padding: `${tokens.spacingVerticalXS} 0`,
    width: "fit-content",
  },
  emmBanner: {
    display: "flex",
    width: "800px",
    marginTop: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalM}`,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalMNudge,
    borderRadius: "4px",
    border: `1px solid ${tokens.colorPalettePurpleBackground2}`,
    backgroundColor: "#f9f3fc",
  },
  emmBannerContentRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    width: "100%",
  },
  emmBannerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    borderRadius: "30px",
    backgroundColor: "#881798",
    color: "#ffffff",
    flexShrink: 0,
  },
  emmBannerText: {
    flex: 1,
    minWidth: 0,
    paddingTop: tokens.spacingVerticalXS,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
  },
  emmBannerTitle: {
    fontWeight: tokens.fontWeightSemibold,
  },
  emmBannerDismiss: {
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  emmBannerActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
    width: "100%",
  },

  /* ── Get Started tab ──────────────────── */
  getStartedRoot: {
    display: "flex",
    flexDirection: "column" as const,
    padding: `${tokens.spacingVerticalXXL} 32px`,
    flex: 1,
    overflow: "hidden" as const,
  },
  getStartedLayout: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: "48px",
    maxWidth: "1100px",
  },
  getStartedLeft: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalM,
  },
  getStartedRight: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalM,
  },
  getStartedHeading: {
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  getStartedSubheading: {
    color: tokens.colorNeutralForeground1,
    marginTop: tokens.spacingVerticalS,
  },
  getStartedBody: {
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  getStartedLinks: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXS,
  },
  getStartedLinkSep: {
    color: tokens.colorNeutralForeground3,
  },
  getStartedFeedback: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalXXL,
  },
  getStartedFeedbackRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground3,
  },
  getStartedRightTitle: {
    color: tokens.colorNeutralForeground1,
  },
  getStartedActionRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  getStartedActionIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase400,
  },
  getStartedRightCard: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
  },
  getStartedCardTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  getStartedSparkle: {
    color: "#0078D4",
    fontSize: tokens.fontSizeBase400,
  },
});

const vmData = [
  { name: "VM-01", subscription: "Sub-01", resourceGroup: "RG-01", location: "East US", status: "Running", os: "Linux", size: "Standard_DS1_v2", ip: "10.0.1.4", disks: 1, updateStatus: "Compliant" },
  { name: "VM-02", subscription: "Sub-01", resourceGroup: "RG-01", location: "East US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.5", disks: 1, updateStatus: "Compliant" },
  { name: "VM-03", subscription: "Sub-01", resourceGroup: "RG-01", location: "West US", status: "Running", os: "Windows", size: "Standard_DS1_v2", ip: "10.0.1.6", disks: 1, updateStatus: "Compliant" },
  { name: "VM-04", subscription: "Sub-01", resourceGroup: "RG-01", location: "West US", status: "Running", os: "Windows", size: "Standard_DS1_v2", ip: "10.0.1.7", disks: 1, updateStatus: "Compliant" },
  { name: "VM-05", subscription: "Sub-01", resourceGroup: "RG-01", location: "Central US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.8", disks: 1, updateStatus: "Compliant" },
  { name: "VM-06", subscription: "Sub-01", resourceGroup: "RG-02", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.9", disks: 1, updateStatus: "Compliant" },
  { name: "VM-07", subscription: "Sub-01", resourceGroup: "RG-02", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.10", disks: 1, updateStatus: "Compliant" },
  { name: "VM-08", subscription: "Sub-01", resourceGroup: "RG-02", location: "West US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.11", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-09", subscription: "Sub-01", resourceGroup: "RG-02", location: "West US", status: "Unknown", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.12", disks: 1, updateStatus: "Compliant" },
  { name: "VM-10", subscription: "Sub-01", resourceGroup: "RG-02", location: "Central US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.13", disks: 1, updateStatus: "Compliant" },
  { name: "VM-11", subscription: "Sub-01", resourceGroup: "RG-03", location: "East US", status: "Running", os: "Windows", size: "Standard_E2s_v3", ip: "10.0.1.14", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-12", subscription: "Sub-01", resourceGroup: "RG-03", location: "East US", status: "Unknown", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.15", disks: 1, updateStatus: "Compliant" },
  { name: "VM-13", subscription: "Sub-01", resourceGroup: "RG-03", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.16", disks: 1, updateStatus: "Compliant" },
  { name: "VM-14", subscription: "Sub-01", resourceGroup: "RG-03", location: "Central US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.17", disks: 1, updateStatus: "Compliant" },
  { name: "VM-15", subscription: "Sub-01", resourceGroup: "RG-03", location: "Central US", status: "Unknown", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.18", disks: 1, updateStatus: "Compliant" },
  { name: "VM-16", subscription: "Sub-01", resourceGroup: "RG-04", location: "East US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.19", disks: 1, updateStatus: "Compliant" },
  { name: "VM-17", subscription: "Sub-01", resourceGroup: "RG-04", location: "West US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.20", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-18", subscription: "Sub-01", resourceGroup: "RG-04", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.21", disks: 2, updateStatus: "Compliant" },
  { name: "VM-19", subscription: "Sub-01", resourceGroup: "RG-04", location: "Central US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.22", disks: 3, updateStatus: "Compliant" },
  { name: "VM-20", subscription: "Sub-01", resourceGroup: "RG-05", location: "West US", status: "Running", os: "Linux", size: "Standard_D8s_v3", ip: "10.0.1.23", disks: 2, updateStatus: "Non-compliant" },
  { name: "VM-21", subscription: "Sub-01", resourceGroup: "RG-05", location: "Central US", status: "Running", os: "Linux", size: "Standard_F4s_v2", ip: "10.0.1.24", disks: 1, updateStatus: "Compliant" },
  { name: "VM-22", subscription: "Sub-01", resourceGroup: "RG-05", location: "Central US", status: "Stopped", os: "Linux", size: "Standard_F4s_v2", ip: "10.0.1.25", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-23", subscription: "Sub-01", resourceGroup: "RG-05", location: "Central US", status: "Deallocated", os: "Linux", size: "Standard_F4s_v2", ip: "10.0.1.26", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-24", subscription: "Sub-01", resourceGroup: "RG-06", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.27", disks: 2, updateStatus: "Compliant" },
  { name: "VM-25", subscription: "Sub-01", resourceGroup: "RG-06", location: "East US", status: "Running", os: "Windows", size: "Standard_D4s_v3", ip: "10.0.1.28", disks: 2, updateStatus: "Not assessed" },
  { name: "VM-26", subscription: "Sub-01", resourceGroup: "RG-07", location: "West US", status: "Running", os: "Linux", size: "Standard_E2s_v3", ip: "10.0.1.29", disks: 1, updateStatus: "Compliant" },
  { name: "VM-27", subscription: "Sub-01", resourceGroup: "RG-07", location: "East US", status: "Running", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.1.30", disks: 4, updateStatus: "Compliant" },
  { name: "VM-28", subscription: "Sub-01", resourceGroup: "RG-07", location: "East US", status: "Running", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.1.31", disks: 4, updateStatus: "Compliant" },
  { name: "VM-29", subscription: "Sub-01", resourceGroup: "RG-07", location: "East US", status: "Unknown", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.1.32", disks: 4, updateStatus: "Compliant" },
  { name: "VM-30", subscription: "Sub-01", resourceGroup: "RG-08", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.33", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-31", subscription: "Sub-01", resourceGroup: "RG-08", location: "Central US", status: "Running", os: "Linux", size: "Standard_D8s_v3", ip: "10.0.1.34", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-32", subscription: "Sub-01", resourceGroup: "RG-09", location: "East US", status: "Running", os: "Windows", size: "Standard_B2ms", ip: "10.0.1.35", disks: 1, updateStatus: "Compliant" },
  { name: "VM-33", subscription: "Sub-01", resourceGroup: "RG-09", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.36", disks: 2, updateStatus: "Compliant" },
  { name: "VM-34", subscription: "Sub-01", resourceGroup: "RG-09", location: "West US", status: "Stopped", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.37", disks: 2, updateStatus: "Compliant" },
  { name: "VM-35", subscription: "Sub-01", resourceGroup: "RG-10", location: "East US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.38", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-36", subscription: "Sub-01", resourceGroup: "RG-10", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.39", disks: 1, updateStatus: "Compliant" },
  { name: "VM-37", subscription: "Sub-01", resourceGroup: "RG-10", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.40", disks: 1, updateStatus: "Compliant" },
  { name: "VM-38", subscription: "Sub-01", resourceGroup: "RG-11", location: "East US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.1.41", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-39", subscription: "Sub-01", resourceGroup: "RG-11", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.42", disks: 1, updateStatus: "Compliant" },
  { name: "VM-40", subscription: "Sub-01", resourceGroup: "RG-12", location: "Central US", status: "Running", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.1.43", disks: 4, updateStatus: "Pending reboot" },
  { name: "VM-41", subscription: "Sub-01", resourceGroup: "RG-12", location: "Central US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.44", disks: 2, updateStatus: "Pending reboot" },
  { name: "VM-42", subscription: "Sub-01", resourceGroup: "RG-12", location: "Central US", status: "Deallocated", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.45", disks: 2, updateStatus: "Compliant" },
  { name: "VM-43", subscription: "Sub-01", resourceGroup: "RG-13", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.46", disks: 2, updateStatus: "Compliant" },
  { name: "VM-44", subscription: "Sub-01", resourceGroup: "RG-13", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.47", disks: 2, updateStatus: "Compliant" },
  { name: "VM-45", subscription: "Sub-01", resourceGroup: "RG-13", location: "West US", status: "Running", os: "Linux", size: "Standard_D8s_v3", ip: "10.0.1.48", disks: 3, updateStatus: "Non-compliant" },
  { name: "VM-46", subscription: "Sub-01", resourceGroup: "RG-13", location: "West US", status: "Running", os: "Linux", size: "Standard_D8s_v3", ip: "10.0.1.49", disks: 3, updateStatus: "Compliant" },
  { name: "VM-47", subscription: "Sub-01", resourceGroup: "RG-13", location: "West US", status: "Unknown", os: "Linux", size: "Standard_D8s_v3", ip: "10.0.1.50", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-48", subscription: "Sub-01", resourceGroup: "RG-14", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.51", disks: 1, updateStatus: "Compliant" },
  { name: "VM-49", subscription: "Sub-01", resourceGroup: "RG-14", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.52", disks: 2, updateStatus: "Non-compliant" },
  { name: "VM-50", subscription: "Sub-01", resourceGroup: "RG-15", location: "East US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.53", disks: 3, updateStatus: "Compliant" },
  { name: "VM-51", subscription: "Sub-01", resourceGroup: "RG-15", location: "East US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.54", disks: 3, updateStatus: "Compliant" },
  { name: "VM-52", subscription: "Sub-01", resourceGroup: "RG-16", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.55", disks: 4, updateStatus: "Pending reboot" },
  { name: "VM-53", subscription: "Sub-01", resourceGroup: "RG-16", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.56", disks: 1, updateStatus: "Compliant" },
  { name: "VM-54", subscription: "Sub-01", resourceGroup: "RG-16", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.57", disks: 1, updateStatus: "Compliant" },
  { name: "VM-55", subscription: "Sub-01", resourceGroup: "RG-17", location: "Central US", status: "Stopped", os: "Linux", size: "Standard_F8s_v2", ip: "10.0.1.58", disks: 2, updateStatus: "Compliant" },
  { name: "VM-56", subscription: "Sub-01", resourceGroup: "RG-17", location: "East US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.59", disks: 2, updateStatus: "Compliant" },
  { name: "VM-57", subscription: "Sub-01", resourceGroup: "RG-17", location: "West US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.1.60", disks: 2, updateStatus: "Compliant" },
  { name: "VM-58", subscription: "Sub-01", resourceGroup: "RG-18", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.61", disks: 2, updateStatus: "Compliant" },
  { name: "VM-59", subscription: "Sub-01", resourceGroup: "RG-18", location: "Central US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.1.62", disks: 1, updateStatus: "Compliant" },
  { name: "VM-60", subscription: "Sub-01", resourceGroup: "RG-19", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.63", disks: 1, updateStatus: "Compliant" },
  { name: "VM-61", subscription: "Sub-01", resourceGroup: "RG-19", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.64", disks: 1, updateStatus: "Compliant" },
  { name: "VM-62", subscription: "Sub-01", resourceGroup: "RG-20", location: "East US", status: "Running", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.1.65", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-63", subscription: "Sub-01", resourceGroup: "RG-20", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.66", disks: 1, updateStatus: "Compliant" },
  { name: "VM-64", subscription: "Sub-01", resourceGroup: "RG-20", location: "East US", status: "Running", os: "Windows", size: "Standard_E8s_v3", ip: "10.0.1.67", disks: 4, updateStatus: "Not assessed" },
  { name: "VM-65", subscription: "Sub-01", resourceGroup: "RG-21", location: "East US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.1.68", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-66", subscription: "Sub-01", resourceGroup: "RG-21", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.69", disks: 1, updateStatus: "Compliant" },
  { name: "VM-67", subscription: "Sub-01", resourceGroup: "RG-22", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.70", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-68", subscription: "Sub-01", resourceGroup: "RG-22", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.71", disks: 2, updateStatus: "Pending reboot" },
  { name: "VM-69", subscription: "Sub-01", resourceGroup: "RG-22", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.1.72", disks: 2, updateStatus: "Compliant" },
  { name: "VM-70", subscription: "Sub-01", resourceGroup: "RG-23", location: "East US", status: "Running", os: "Windows", size: "Standard_D4s_v3", ip: "10.0.1.73", disks: 2, updateStatus: "Compliant" },
  { name: "VM-71", subscription: "Sub-01", resourceGroup: "RG-23", location: "East US", status: "Stopped", os: "Windows", size: "Standard_B2ms", ip: "10.0.1.74", disks: 1, updateStatus: "Compliant" },
  { name: "VM-72", subscription: "Sub-01", resourceGroup: "RG-24", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.75", disks: 1, updateStatus: "Compliant" },
  { name: "VM-73", subscription: "Sub-01", resourceGroup: "RG-24", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.1.76", disks: 1, updateStatus: "Compliant" },
  // ── Additional VMs for realistic pagination ──
  { name: "VM-74", subscription: "Sub-02", resourceGroup: "RG-25", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.2.4", disks: 2, updateStatus: "Non-compliant" },
  { name: "VM-75", subscription: "Sub-02", resourceGroup: "RG-25", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.5", disks: 1, updateStatus: "Compliant" },
  { name: "VM-76", subscription: "Sub-02", resourceGroup: "RG-25", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.6", disks: 1, updateStatus: "Compliant" },
  { name: "VM-77", subscription: "Sub-02", resourceGroup: "RG-26", location: "East US", status: "Running", os: "Windows", size: "Standard_E4s_v3", ip: "10.0.2.7", disks: 4, updateStatus: "Not assessed" },
  { name: "VM-78", subscription: "Sub-02", resourceGroup: "RG-26", location: "East US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.2.8", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-79", subscription: "Sub-03", resourceGroup: "RG-27", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.3.4", disks: 1, updateStatus: "Compliant" },
  { name: "VM-80", subscription: "Sub-03", resourceGroup: "RG-27", location: "Central US", status: "Deallocated", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.3.5", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-81", subscription: "Sub-03", resourceGroup: "RG-28", location: "West US", status: "Running", os: "Linux", size: "Standard_D4pds_v5", ip: "10.0.3.6", disks: 2, updateStatus: "Compliant" },
  { name: "VM-82", subscription: "Sub-02", resourceGroup: "RG-29", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.9", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-83", subscription: "Sub-03", resourceGroup: "RG-30", location: "East US", status: "Stopped", os: "Windows", size: "Standard_E4s_v3", ip: "10.0.3.7", disks: 2, updateStatus: "Compliant" },
  { name: "VM-84", subscription: "Sub-02", resourceGroup: "RG-31", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.2.10", disks: 2, updateStatus: "Compliant" },
  { name: "VM-85", subscription: "Sub-02", resourceGroup: "RG-31", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.2.11", disks: 2, updateStatus: "Compliant" },
  { name: "VM-86", subscription: "Sub-02", resourceGroup: "RG-31", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.12", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-87", subscription: "Sub-02", resourceGroup: "RG-32", location: "Central US", status: "Running", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.2.13", disks: 4, updateStatus: "Pending reboot" },
  { name: "VM-88", subscription: "Sub-03", resourceGroup: "RG-33", location: "West US", status: "Deallocated", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.3.8", disks: 1, updateStatus: "Compliant" },
  { name: "VM-89", subscription: "Sub-03", resourceGroup: "RG-34", location: "West US", status: "Running", os: "Windows", size: "Standard_D8s_v3", ip: "10.0.3.9", disks: 2, updateStatus: "Compliant" },
  { name: "VM-90", subscription: "Sub-03", resourceGroup: "RG-34", location: "Central US", status: "Stopped", os: "Windows", size: "Standard_D8s_v3", ip: "10.0.3.10", disks: 2, updateStatus: "Compliant" },
  { name: "VM-91", subscription: "Sub-03", resourceGroup: "RG-34", location: "Central US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.11", disks: 2, updateStatus: "Compliant" },
  { name: "VM-92", subscription: "Sub-02", resourceGroup: "RG-35", location: "East US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.2.14", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-93", subscription: "Sub-02", resourceGroup: "RG-35", location: "East US", status: "Running", os: "Linux", size: "Standard_E8s_v3", ip: "10.0.2.15", disks: 4, updateStatus: "Compliant" },
  { name: "VM-94", subscription: "Sub-02", resourceGroup: "RG-35", location: "Central US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.2.16", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-95", subscription: "Sub-02", resourceGroup: "RG-36", location: "East US", status: "Running", os: "Windows", size: "Standard_E4s_v3", ip: "10.0.2.17", disks: 2, updateStatus: "Not assessed" },
  { name: "VM-96", subscription: "Sub-02", resourceGroup: "RG-36", location: "East US", status: "Running", os: "Windows", size: "Standard_E16s_v3", ip: "10.0.2.18", disks: 4, updateStatus: "Compliant" },
  { name: "VM-97", subscription: "Sub-02", resourceGroup: "RG-37", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.19", disks: 1, updateStatus: "Compliant" },
  { name: "VM-98", subscription: "Sub-03", resourceGroup: "RG-38", location: "West US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.3.12", disks: 1, updateStatus: "Compliant" },
  { name: "VM-99", subscription: "Sub-03", resourceGroup: "RG-38", location: "Central US", status: "Stopped", os: "Linux", size: "Standard_B2ms", ip: "10.0.3.13", disks: 1, updateStatus: "Compliant" },
  { name: "VM-100", subscription: "Sub-02", resourceGroup: "RG-39", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.2.20", disks: 2, updateStatus: "Non-compliant" },
  { name: "VM-101", subscription: "Sub-03", resourceGroup: "RG-40", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.14", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-102", subscription: "Sub-02", resourceGroup: "RG-41", location: "West US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.2.21", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-103", subscription: "Sub-02", resourceGroup: "RG-41", location: "Central US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.2.22", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-104", subscription: "Sub-02", resourceGroup: "RG-41", location: "West US", status: "Unknown", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.2.23", disks: 3, updateStatus: "Compliant" },
  { name: "VM-105", subscription: "Sub-02", resourceGroup: "RG-42", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.24", disks: 1, updateStatus: "Compliant" },
  { name: "VM-106", subscription: "Sub-02", resourceGroup: "RG-42", location: "Central US", status: "Running", os: "Linux", size: "Standard_B1ms", ip: "10.0.2.25", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-107", subscription: "Sub-02", resourceGroup: "RG-43", location: "Central US", status: "Running", os: "Windows", size: "Standard_D4s_v3", ip: "10.0.2.26", disks: 2, updateStatus: "Not assessed" },
  { name: "VM-108", subscription: "Sub-02", resourceGroup: "RG-43", location: "East US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.2.27", disks: 1, updateStatus: "Compliant" },
  { name: "VM-109", subscription: "Sub-02", resourceGroup: "RG-44", location: "East US", status: "Running", os: "Windows", size: "Standard_E8s_v3", ip: "10.0.2.28", disks: 3, updateStatus: "Compliant" },
  { name: "VM-110", subscription: "Sub-03", resourceGroup: "RG-45", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.15", disks: 3, updateStatus: "Compliant" },
  { name: "VM-111", subscription: "Sub-02", resourceGroup: "RG-46", location: "East US", status: "Running", os: "Linux", size: "Standard_NC6s_v3", ip: "10.0.2.29", disks: 2, updateStatus: "Compliant" },
  { name: "VM-112", subscription: "Sub-02", resourceGroup: "RG-46", location: "East US", status: "Deallocated", os: "Linux", size: "Standard_NC6s_v3", ip: "10.0.2.30", disks: 2, updateStatus: "Compliant" },
  { name: "VM-113", subscription: "Sub-03", resourceGroup: "RG-47", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.16", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-114", subscription: "Sub-03", resourceGroup: "RG-48", location: "Central US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.3.17", disks: 1, updateStatus: "Compliant" },
  { name: "VM-115", subscription: "Sub-02", resourceGroup: "RG-49", location: "West US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.2.31", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-116", subscription: "Sub-02", resourceGroup: "RG-49", location: "West US", status: "Running", os: "Linux", size: "Standard_E4s_v3", ip: "10.0.2.32", disks: 3, updateStatus: "Pending reboot" },
  { name: "VM-117", subscription: "Sub-02", resourceGroup: "RG-50", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.33", disks: 1, updateStatus: "Compliant" },
  { name: "VM-118", subscription: "Sub-02", resourceGroup: "RG-50", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.34", disks: 2, updateStatus: "Pending reboot" },
  { name: "VM-119", subscription: "Sub-02", resourceGroup: "RG-51", location: "West US", status: "Running", os: "Windows", size: "Standard_E32s_v3", ip: "10.0.2.35", disks: 4, updateStatus: "Not assessed" },
  { name: "VM-120", subscription: "Sub-02", resourceGroup: "RG-51", location: "West US", status: "Running", os: "Linux", size: "Standard_M64s", ip: "10.0.2.36", disks: 8, updateStatus: "Non-compliant" },
  { name: "VM-121", subscription: "Sub-03", resourceGroup: "RG-52", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.18", disks: 2, updateStatus: "Compliant" },
  { name: "VM-122", subscription: "Sub-02", resourceGroup: "RG-53", location: "Central US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.2.37", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-123", subscription: "Sub-03", resourceGroup: "RG-54", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.19", disks: 2, updateStatus: "Compliant" },
  { name: "VM-124", subscription: "Sub-02", resourceGroup: "RG-55", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.38", disks: 1, updateStatus: "Compliant" },
  { name: "VM-125", subscription: "Sub-03", resourceGroup: "RG-56", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.3.20", disks: 1, updateStatus: "Non-compliant" },
  { name: "VM-126", subscription: "Sub-03", resourceGroup: "RG-56", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.3.21", disks: 1, updateStatus: "Compliant" },
  { name: "VM-127", subscription: "Sub-02", resourceGroup: "RG-57", location: "East US", status: "Running", os: "Linux", size: "Standard_F16s_v2", ip: "10.0.2.39", disks: 2, updateStatus: "Not assessed" },
  { name: "VM-128", subscription: "Sub-02", resourceGroup: "RG-57", location: "West US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.2.40", disks: 2, updateStatus: "Compliant" },
  { name: "VM-129", subscription: "Sub-03", resourceGroup: "RG-58", location: "East US", status: "Stopped", os: "Linux", size: "Standard_B2ms", ip: "10.0.3.22", disks: 1, updateStatus: "Compliant" },
  { name: "VM-130", subscription: "Sub-03", resourceGroup: "RG-58", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.3.23", disks: 1, updateStatus: "Compliant" },
  { name: "VM-131", subscription: "Sub-03", resourceGroup: "RG-59", location: "West US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.3.24", disks: 1, updateStatus: "Compliant" },
  { name: "VM-132", subscription: "Sub-03", resourceGroup: "RG-59", location: "Central US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.3.25", disks: 2, updateStatus: "Pending reboot" },
  { name: "VM-133", subscription: "Sub-02", resourceGroup: "RG-60", location: "East US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.41", disks: 1, updateStatus: "Compliant" },
  { name: "VM-134", subscription: "Sub-02", resourceGroup: "RG-60", location: "West US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.42", disks: 1, updateStatus: "Compliant" },
  { name: "VM-135", subscription: "Sub-03", resourceGroup: "RG-61", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.3.26", disks: 2, updateStatus: "Compliant" },
  { name: "VM-136", subscription: "Sub-03", resourceGroup: "RG-61", location: "West US", status: "Running", os: "Linux", size: "Standard_B2ms", ip: "10.0.3.27", disks: 1, updateStatus: "Compliant" },
  { name: "VM-137", subscription: "Sub-03", resourceGroup: "RG-62", location: "East US", status: "Running", os: "Windows", size: "Standard_D2s_v3", ip: "10.0.3.28", disks: 1, updateStatus: "Compliant" },
  { name: "VM-138", subscription: "Sub-02", resourceGroup: "RG-63", location: "East US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.2.43", disks: 2, updateStatus: "Compliant" },
  { name: "VM-139", subscription: "Sub-02", resourceGroup: "RG-63", location: "West US", status: "Running", os: "Linux", size: "Standard_D4s_v3", ip: "10.0.2.44", disks: 2, updateStatus: "Pending reboot" },
  { name: "VM-140", subscription: "Sub-02", resourceGroup: "RG-64", location: "East US", status: "Running", os: "Linux", size: "Standard_E2s_v3", ip: "10.0.2.45", disks: 1, updateStatus: "Pending reboot" },
  { name: "VM-141", subscription: "Sub-02", resourceGroup: "RG-64", location: "West US", status: "Running", os: "Linux", size: "Standard_E2s_v3", ip: "10.0.2.46", disks: 1, updateStatus: "Compliant" },
  { name: "VM-142", subscription: "Sub-02", resourceGroup: "RG-65", location: "Central US", status: "Running", os: "Linux", size: "Standard_D2s_v3", ip: "10.0.2.47", disks: 1, updateStatus: "Compliant" },
];

const sidebarItems: {
  label: string;
  key?: string;
  icon?: React.ReactNode;
  isGroup?: boolean;
  expandable?: boolean;
  active?: boolean;
  indent?: boolean;
  children?: { label: string; key?: string; active?: boolean; iconSrc?: string }[];
}[] = [
  { label: "Overview", icon: <Home20Regular /> },
  { label: "All resources", icon: <Grid20Regular /> },
  {
    label: "Infrastructure",
    isGroup: true,
    expandable: true,
    children: [
      { label: "Virtual machines", active: true, iconSrc: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
      { label: "Virtual Machine Scale Set (VMSS)", iconSrc: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg" },
      { label: "Compute Fleet", iconSrc: "/azure-service-icons/compute/03487-icon-service-Compute-Fleet.svg" },
      { label: "Arc Machines", iconSrc: "/azure-service-icons/management + governance/01710-icon-service-Arc-Machines.svg" },
    ],
  },
  {
    label: "Disks + images",
    expandable: true,
    children: [],
  },
  {
    label: "Capacity + placement",
    expandable: true,
    children: [],
  },
  {
    label: "Related services",
    expandable: true,
    children: [],
  },
  {
    label: "Monitoring+Operations",
    expandable: true,
    children: [
      { label: "Essential Machine Management (Preview)", iconSrc: "/azure-service-icons/other/02846-icon-service-Update-Management-Center.svg" },
      { label: "Policy", iconSrc: "/azure-service-icons/management + governance/10316-icon-service-Policy.svg" },
      { label: "Update Management", iconSrc: "/azure-service-icons/other/02846-icon-service-Update-Management-Center.svg" },
      { label: "Machine Configuration", iconSrc: "/azure-service-icons/intune/10338-icon-service-Device-Configuration.svg" },
      { label: "Machine changes + inventory", iconSrc: "/azure-service-icons/devops/00563-icon-service-Change-Analysis.svg" },
    ],
  },
  {
    label: "Help",
    expandable: true,
    children: [],
  },
];

/** Azure portal Virtual Machines browse/list page with command bar, filters, data table, and pagination. */
export default function VmBrowse({
  isDarkMode = false,
  onHome,
  onSearchSelect,
  onEnableEmm,
  onTabChange,
  initialTab,
  onNavigateToEmm,
  onNavigateToVm,
  onCreateVm,
  onNavigateToPolicies,
}: {
  isDarkMode?: boolean;
  onHome?: () => void;
  onSearchSelect?: (item: string) => void;
  onEnableEmm?: (vm: { name: string; subscription: string; resourceGroup: string; location: string }) => void;
  onTabChange?: (tab: string) => void;
  initialTab?: string;
  onNavigateToEmm?: () => void;
  onNavigateToVm?: () => void;
  onNavigateToVm?: () => void;
  onCreateVm?: () => void;
  onNavigateToPolicies?: () => void;
}) {
  const styles = useStyles();
  const ITEMS_PER_PAGE = 30;
  const [activeTab, setActiveTab] = useState<string>(initialTab || "virtual-machines");
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Infrastructure", "Monitoring+Operations"])
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(264);
  const isResizing = useRef(false);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    const onMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = Math.max(200, Math.min(500, startWidth + ev.clientX - startX));
      setSidebarWidth(newWidth);
    };
    const onUp = () => {
      isResizing.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [sidebarWidth]);
  const [selectedVms, setSelectedVms] = useState<Set<string>>(new Set());
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // ── Filter state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<Set<string>>(new Set());
  const [selectedResourceGroups, setSelectedResourceGroups] = useState<Set<string>>(new Set());
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());

  // Derive unique values from data
  const uniqueSubscriptions = useMemo(() => [...new Set(vmData.map((vm) => vm.subscription))].sort(), []);
  const uniqueResourceGroups = useMemo(() => [...new Set(vmData.map((vm) => vm.resourceGroup))].sort(), []);
  const uniqueLocations = useMemo(() => [...new Set(vmData.map((vm) => vm.location))].sort(), []);
  const uniqueStatuses = useMemo(() => [...new Set(vmData.map((vm) => vm.status))].sort(), []);

  // Filtered data
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return vmData.filter((vm) => {
      // Text search across all fields
      if (q) {
        const matchesSearch =
          vm.name.toLowerCase().includes(q) ||
          vm.subscription.toLowerCase().includes(q) ||
          vm.resourceGroup.toLowerCase().includes(q) ||
          vm.location.toLowerCase().includes(q) ||
          vm.status.toLowerCase().includes(q) ||
          vm.os.toLowerCase().includes(q) ||
          vm.size.toLowerCase().includes(q) ||
          vm.ip.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      // Pill filters
      if (selectedSubscriptions.size > 0 && !selectedSubscriptions.has(vm.subscription)) return false;
      if (selectedResourceGroups.size > 0 && !selectedResourceGroups.has(vm.resourceGroup)) return false;
      if (selectedLocations.size > 0 && !selectedLocations.has(vm.location)) return false;
      if (selectedStatuses.size > 0 && !selectedStatuses.has(vm.status)) return false;
      return true;
    });
  }, [searchQuery, selectedSubscriptions, selectedResourceGroups, selectedLocations, selectedStatuses]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const hasActiveFilters = searchQuery || selectedSubscriptions.size > 0 || selectedResourceGroups.size > 0 || selectedLocations.size > 0 || selectedStatuses.size > 0;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedSubscriptions(new Set());
    setSelectedResourceGroups(new Set());
    setSelectedLocations(new Set());
    setSelectedStatuses(new Set());
    setCurrentPage(1);
  };

  const toggleFilterValue = (
    current: Set<string>,
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
    setCurrentPage(1);
  };

  const toggleVm = (name: string) => {
    setSelectedVms((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedVms.size === filteredData.length) {
      setSelectedVms(new Set());
    } else {
      setSelectedVms(new Set(filteredData.map((vm) => vm.name)));
    }
  };

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

      {/* ── Blade header (spans full width) ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIconContainer}>
            <img
              src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
              alt=""
              width={28}
              height={28}
            />
          </div>
          <div className={styles.headerTitleGroup}>
            <div className={styles.headerTitleRow}>
              <Text className={styles.pageTitle}>
                Compute infrastructure <Text as="span" className={styles.pageTitleSuffix}>| Virtual machines</Text>
              </Text>
              <div className={styles.headerActions}>
                <button className={styles.headerActionBtn}>
                  <Pin20Regular />
                </button>
                <button className={styles.headerActionBtn}>
                  <Star20Regular />
                </button>
                <button className={styles.headerActionBtn}>
                  <MoreHorizontal20Regular />
                </button>
              </div>
            </div>
            <Text className={styles.pageSubtitle}>Microsoft</Text>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.headerActionBtn} onClick={onHome}>
            <Dismiss20Regular />
          </button>
        </div>
      </div>

      <div className={styles.pageLayout}>
        {/* ── Sidebar ──────────────────────── */}
        <div
          className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}
          style={sidebarCollapsed ? undefined : { width: sidebarWidth, minWidth: sidebarWidth }}
        >
          {sidebarCollapsed ? (
            <button
              className={styles.sidebarExpandBtn}
              onClick={() => setSidebarCollapsed(false)}
              title="Expand sidebar"
            >
              <ChevronDoubleRight16Regular />
            </button>
          ) : (
            <>
              <div className={styles.sidebarSearchBar}>
                <Input
                  size="small"
                  appearance="outline"
                  className={styles.sidebarSearchInput}
                  contentBefore={<Search16Regular />}
                  placeholder="Search"
                />
                <button className={styles.sidebarSearchIcon}>
                  <ChevronUpDown16Regular />
                </button>
                <button
                  className={styles.sidebarSearchIcon}
                  onClick={() => setSidebarCollapsed(true)}
                  title="Collapse sidebar"
                >
                  <ChevronDoubleLeft16Regular />
                </button>
              </div>
              {/* Resize handle */}
              <div
                className={styles.resizeHandle}
                onMouseDown={handleResizeStart}
              />
            </>
          )}
          {!sidebarCollapsed && sidebarItems.map((item) => {
            if (item.expandable || item.isGroup) {
              const isOpen = expandedGroups.has(item.label);
              return (
                <div key={item.label}>
                  <button
                    className={styles.sidebarGroupHeader}
                    onClick={() =>
                      setExpandedGroups((prev) => {
                        const next = new Set(prev);
                        if (next.has(item.label)) next.delete(item.label);
                        else next.add(item.label);
                        return next;
                      })
                    }
                  >
                    <span
                      className={`${styles.sidebarChevron} ${isOpen ? styles.sidebarChevronOpen : ""}`}
                    >
                      <ChevronRight12Regular />
                    </span>
                    {item.icon && (
                      <span className={styles.sidebarIcon}>{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                  {isOpen &&
                    item.children?.map((child) => (
                      <button
                        key={child.key || child.label}
                        className={`${styles.sidebarItem} ${child.active ? styles.sidebarItemActive : ""} ${styles.sidebarIndented}`}
                        onClick={() => {
                          if (child.label.includes("Essential Machine Management") && onNavigateToEmm) {
                            onNavigateToEmm();
                          } else if (child.label === "Virtual machines" && onNavigateToVm) {
                            onNavigateToVm();
                          } else if (child.label === "Policy" && onNavigateToPolicies) {
                            onNavigateToPolicies();
                          }
                        }}
                      >
                        {child.iconSrc && (
                          <img
                            src={child.iconSrc}
                            alt=""
                            className={styles.sidebarChildIcon}
                          />
                        )}
                        {child.label}
                      </button>
                    ))}
                </div>
              );
            }
            return (
              <button
                key={item.key || item.label}
                className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ""}`}
              >
                {item.icon && (
                  <span className={styles.sidebarIcon}>{item.icon}</span>
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* ── Main content ─────────────────── */}
        <div className={styles.mainContent}>
          {/* Tabs */}
          <div className={styles.tabBar}>
            <TabList selectedValue={activeTab} size="small" onTabSelect={(_, d) => { setActiveTab(d.value as string); onTabChange?.(d.value as string); }}>
              <Tab value="virtual-machines">Virtual machines</Tab>
              <Tab value="get-started">Get started</Tab>
            </TabList>
          </div>

          {activeTab === "get-started" && (
            <div className={styles.getStartedRoot}>
              <Text as="h2" size={500} weight="semibold" className={styles.getStartedHeading}>
                Virtual machines for Windows or Linux
              </Text>
              <div className={styles.getStartedLayout}>
                {/* Left column */}
                <div className={styles.getStartedLeft}>
                  <Text size={300} className={styles.getStartedBody}>
                    Azure virtual machines (VMs) are <Link inline>on-demand, scalable computing resources</Link> offering benefits like cost savings, agility, scalability, security, improved performance and availability, and reduced downtime—all without having to buy or maintain hardware.
                  </Text>

                  <Text size={300} weight="semibold" className={styles.getStartedSubheading}>Creating more than one VM?</Text>
                  <Text size={300} className={styles.getStartedBody}>
                    While standalone VMs are great for single VMs or custom apps, customers who need multiple VMs can often save time, money, and boost performance—at no added cost—with one of our optimized VM solutions. Here{"'s"} how they compare:
                  </Text>

                  <Text size={300} className={styles.getStartedBody}>
                    <Text weight="semibold" size={300}>Virtual machines</Text> (standalone) are best for one VM, smaller workloads, or custom apps. Use a VM if you don{"'t"} need autoscaling, optimization, multiple zones / regions, and prefer manual management.
                  </Text>
                  <Text size={300} className={styles.getStartedBody}>
                    <Text weight="semibold" size={300}>Virtual Machine Scale Sets (VMSS)</Text> Built-in autoscaling, optimization, and batch management for multiple mixed-size VMs. Great for cloud migration, databases, batch processing, and more.
                  </Text>
                  <Text size={300} className={styles.getStartedBody}>
                    <Text weight="semibold" size={300}>Compute Fleet</Text> Batch manage up to 10,000 mixed-size VMs. Hyper-scale on demand. Optimize performance and availability of compute-intensive workloads across multiple zones and fault domains.
                  </Text>

                  <div className={styles.getStartedLinks}>
                    <Link>Explore VMSS</Link>
                    <Text size={200} className={styles.getStartedLinkSep}>|</Text>
                    <Link>Explore Compute Fleet</Link>
                    <Text size={200} className={styles.getStartedLinkSep}>|</Text>
                    <Link>Product comparison chart</Link>
                  </div>

                  <Button appearance="primary" size="small" style={{ alignSelf: "flex-start" }}>
                    Create a standalone VM
                  </Button>

                  <div className={styles.getStartedFeedback}>
                    <Text size={300} weight="semibold">Give feedback</Text>
                    <div className={styles.getStartedFeedbackRow}>
                      <PersonFeedback20Regular />
                      <Text size={200}>Was this page helpful or not? Let us know!</Text>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className={styles.getStartedRight}>
                  <Text size={400} weight="semibold" className={styles.getStartedRightTitle}>
                    Find the best VM solution for you
                  </Text>
                  <Text size={300} className={styles.getStartedBody}>
                    Answer a few questions to find the right solution for your workload, or compare product specs side by side.
                  </Text>
                  <div className={styles.getStartedActionRow}>
                    <Link>Find the best product for your workload</Link>
                  </div>
                  <div className={styles.getStartedActionRow}>
                    <Link>View comparison chart</Link>
                  </div>

                  <div className={styles.getStartedRightCard}>
                    <div className={styles.getStartedCardTitleRow}>
                      <Sparkle20Regular className={styles.getStartedSparkle} />
                      <Text size={400} weight="semibold">Create a Linux or Windows VM fast</Text>
                    </div>
                    <Text size={300} className={styles.getStartedBody}>
                      Create and deploy a VM in one click with our ready-made Linux, Windows, WordPress, and LAMP stack starter kits — or try our Interactive deployments for other workload scenarios.
                    </Text>
                    <Link>Explore starter kits and Interactive deployments</Link>
                  </div>

                  <div className={styles.getStartedRightCard}>
                    <div className={styles.getStartedCardTitleRow}>
                      <Sparkle20Regular className={styles.getStartedSparkle} />
                      <Text size={400} weight="semibold">Essential Machine Management (EMM)</Text>
                    </div>
                    <Text size={300} className={styles.getStartedBody}>
                      Quickly enable essential management capabilities across your environment without configuring each machine individually. EMM helps streamline setup, improve consistency, and simplify ongoing machine operations from a single place.
                    </Text>
                    <div className={styles.getStartedActionRow}>
                      <Link>Learn more about EMM</Link>
                    </div>
                    <div className={styles.getStartedActionRow}>
                      <Link>Enable EMM</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "virtual-machines" && (<>
          {/* Command bar */}
          <div className={styles.commandBar}>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton appearance="transparent" size="small" icon={<Add20Regular />}>
                  Create
                </MenuButton>
              </MenuTrigger>
              <MenuPopover className={styles.createMenuPopover}>
                <MenuList>
                  <MenuItem className={styles.createMenuItem} onClick={onCreateVm}>
                    <img src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" alt="" className={styles.createMenuIcon} />
                    <div className={styles.createMenuTextGroup}>
                      <Text className={styles.createMenuTitle}>Virtual machine</Text>
                      <Text className={styles.createMenuDesc}>Best for lower-traffic workloads, testing, or to control or highly customize apps, OS, or file system. If your workload or traffic starts to grow, a VM can later be attached to a Virtual Machine Scale Set (VMSS).</Text>
                    </div>
                  </MenuItem>
                  <MenuItem className={styles.createMenuItem}>
                    <img src="/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg" alt="" className={styles.createMenuIcon} />
                    <div className={styles.createMenuTextGroup}>
                      <Text className={styles.createMenuTitle}>Virtual machine scale set (VMSS)</Text>
                      <Text className={styles.createMenuDesc}>Built-in scaling, performance optimization, load balancing, and batch management for 1 to 1,000 VMs (no added cost). Include multiple VM sizes, zones, regions, and domains, along with discounted Spot VMs.</Text>
                    </div>
                  </MenuItem>
                  <MenuItem className={styles.createMenuItem}>
                    <img src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" alt="" className={styles.createMenuIcon} />
                    <div className={styles.createMenuTextGroup}>
                      <Text className={styles.createMenuTitle}>Presets</Text>
                      <Text className={styles.createMenuDesc}>Create a pre-configured VM designed to optimize memory, capacity, or for general use. Deploy as-is, or customize as needed.</Text>
                    </div>
                  </MenuItem>
                  <MenuItem className={styles.createMenuItem}>
                    <img src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" alt="" className={styles.createMenuIcon} />
                    <div className={styles.createMenuTextGroup}>
                      <Text className={styles.createMenuTitle}>Hybrid, preconfigured, and high volume solutions</Text>
                      <Text className={styles.createMenuDesc}>Explore pre-configured Starter kits for Linux and Windows, Azure Arc hybrid infrastructure solutions, and more.</Text>
                    </div>
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
            <MenuButton appearance="transparent" size="small" icon={<Settings20Regular />}>
              Manage view
            </MenuButton>
            <div className={styles.commandSeparator} />
            <Button appearance="transparent" size="small" icon={<ArrowClockwise20Regular />}>
              Refresh
            </Button>
            <Button appearance="transparent" size="small" icon={<ArrowCurveDownLeft20Regular />}>
              Export to CSV
            </Button>
            <Button appearance="transparent" size="small" icon={<Open20Regular />}>
              Open query
            </Button>
            <div className={styles.commandSeparator} />
            <Button
              appearance="transparent"
              size="small"
              icon={<ArrowClockwiseDashesSettings20Regular />}
              disabled={selectedVms.size !== 1}
              onClick={() => {
                if (selectedVms.size === 1) {
                  const vmName = [...selectedVms][0];
                  const vm = vmData.find((v) => v.name === vmName);
                  if (vm && onEnableEmm) {
                    onEnableEmm({
                      name: vm.name,
                      subscription: vm.subscription,
                      resourceGroup: vm.resourceGroup,
                      location: vm.location,
                    });
                  }
                }
              }}
            >
              Enable EMM
            </Button>
            <Button appearance="transparent" size="small" icon={<TagMultiple20Regular />} disabled={selectedVms.size === 0}>
              Assign tags
            </Button>
            <Button appearance="transparent" size="small" icon={<Delete20Regular />} disabled={selectedVms.size === 0}>
              Delete
            </Button>
          </div>

          {/* Filter bar */}
          <div className={styles.filterBar}>
            <Input
              size="small"
              appearance="filled-darker"
              className={styles.filterInput}
              contentBefore={<Filter20Regular />}
              placeholder="Filter for any field..."
              value={searchQuery}
              onChange={(_, data) => { setSearchQuery(data.value); setCurrentPage(1); }}
            />
            <div className={styles.filterPillGroup}>
              {/* Subscription pill */}
              <Popover withArrow>
                <PopoverTrigger disableButtonEnhancement>
                  <span className={styles.filterPill}>
                    Subscription : <span className={styles.filterPillValue}>{selectedSubscriptions.size === 0 ? "all" : selectedSubscriptions.size === 1 ? [...selectedSubscriptions][0] : `${selectedSubscriptions.size} selected`}</span>
                    {selectedSubscriptions.size > 0 && (
                      <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setSelectedSubscriptions(new Set()); setCurrentPage(1); }}>
                        <Dismiss12Regular />
                      </button>
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverSurface>
                  <div className={styles.filterPopoverList}>
                    {uniqueSubscriptions.map((s) => (
                      <button key={s} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(selectedSubscriptions, setSelectedSubscriptions, s)}>
                        <Checkbox checked={selectedSubscriptions.has(s)} />
                        {s}
                      </button>
                    ))}
                  </div>
                </PopoverSurface>
              </Popover>

              {/* Resource Group pill */}
              <Popover withArrow>
                <PopoverTrigger disableButtonEnhancement>
                  <span className={styles.filterPill}>
                    Resource Group : <span className={styles.filterPillValue}>{selectedResourceGroups.size === 0 ? "all" : selectedResourceGroups.size === 1 ? [...selectedResourceGroups][0] : `${selectedResourceGroups.size} selected`}</span>
                    {selectedResourceGroups.size > 0 && (
                      <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setSelectedResourceGroups(new Set()); setCurrentPage(1); }}>
                        <Dismiss12Regular />
                      </button>
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverSurface>
                  <div className={styles.filterPopoverList}>
                    {uniqueResourceGroups.map((rg) => (
                      <button key={rg} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(selectedResourceGroups, setSelectedResourceGroups, rg)}>
                        <Checkbox checked={selectedResourceGroups.has(rg)} />
                        {rg}
                      </button>
                    ))}
                  </div>
                </PopoverSurface>
              </Popover>

              {/* Location pill */}
              <Popover withArrow>
                <PopoverTrigger disableButtonEnhancement>
                  <span className={styles.filterPill}>
                    Location : <span className={styles.filterPillValue}>{selectedLocations.size === 0 ? "all" : selectedLocations.size === 1 ? [...selectedLocations][0] : `${selectedLocations.size} selected`}</span>
                    {selectedLocations.size > 0 && (
                      <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setSelectedLocations(new Set()); setCurrentPage(1); }}>
                        <Dismiss12Regular />
                      </button>
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverSurface>
                  <div className={styles.filterPopoverList}>
                    {uniqueLocations.map((loc) => (
                      <button key={loc} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(selectedLocations, setSelectedLocations, loc)}>
                        <Checkbox checked={selectedLocations.has(loc)} />
                        {loc}
                      </button>
                    ))}
                  </div>
                </PopoverSurface>
              </Popover>

              {/* Status pill */}
              <Popover withArrow>
                <PopoverTrigger disableButtonEnhancement>
                  <span className={styles.filterPill}>
                    Status : <span className={styles.filterPillValue}>{selectedStatuses.size === 0 ? "all" : selectedStatuses.size === 1 ? [...selectedStatuses][0] : `${selectedStatuses.size} selected`}</span>
                    {selectedStatuses.size > 0 && (
                      <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setSelectedStatuses(new Set()); setCurrentPage(1); }}>
                        <Dismiss12Regular />
                      </button>
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverSurface>
                  <div className={styles.filterPopoverList}>
                    {uniqueStatuses.map((st) => (
                      <button key={st} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(selectedStatuses, setSelectedStatuses, st)}>
                        <Checkbox checked={selectedStatuses.has(st)} />
                        {st}
                      </button>
                    ))}
                  </div>
                </PopoverSurface>
              </Popover>

              {hasActiveFilters && (
                <Button appearance="transparent" size="small" className={styles.clearFiltersBtn} onClick={clearAllFilters}>
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* EMM upsell banner */}
          {!bannerDismissed && (
            <div className={styles.emmBanner}>
              <div className={styles.emmBannerContentRow}>
                <span className={styles.emmBannerIcon}>
                  <Rocket20Filled style={{ fontSize: "12px" }} />
                </span>
                <div className={styles.emmBannerText}>
                  <span className={styles.emmBannerTitle}>Simplify machine management at scale</span>
                  {"   "}
                  Enable Essential Machine Management (EMM) to configure monitoring, updates, security baselines, and machine management capabilities across your resources from one place.{" "}
                  <Link href="https://learn.microsoft.com/en-ca/azure/operations/configuration-enrollment" target="_blank" rel="noopener noreferrer">Learn more</Link>
                </div>
                <Button className={styles.emmBannerDismiss} appearance="transparent" size="small" icon={<Dismiss20Regular />} onClick={() => setBannerDismissed(true)} />
              </div>
              <div className={styles.emmBannerActions}>
                <Button appearance="secondary" size="medium" onClick={() => {
                  if (onEnableEmm) {
                    onEnableEmm({ name: "", subscription: "", resourceGroup: "", location: "" });
                  }
                }}>
                  Enable EMM
                </Button>
              </div>
            </div>
          )}

          {/* Data table */}
          <div className={styles.tableWrapper}>
            <Table size="small" style={{ minWidth: "1400px" }}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell style={{ width: "32px" }}>
                    <Checkbox
                      checked={
                        selectedVms.size === filteredData.length && filteredData.length > 0
                          ? true
                          : selectedVms.size > 0
                            ? "mixed"
                            : false
                      }
                      onChange={toggleAll}
                    />
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Name <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.moreCell} />
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Subscription
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Resource Group
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Location <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Status <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Operating system
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Size
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Public IP address
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Disks
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Update status
                    </div>
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((vm, idx) => (
                  <TableRow key={vm.name} className={idx === paginatedData.length - 1 ? styles.lastRow : undefined}>
                    <TableCell style={{ width: "32px" }}>
                      <Checkbox
                        checked={selectedVms.has(vm.name)}
                        onChange={() => toggleVm(vm.name)}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
                        alt=""
                        className={styles.vmIcon}
                      />
                      <Link className={styles.vmNameLink}>{vm.name}</Link>
                    </TableCell>
                    <TableCell className={styles.moreCell}>
                      <Button appearance="subtle" size="small" icon={<MoreHorizontal20Regular />} />
                    </TableCell>
                    <TableCell>
                      <Link className={styles.vmNameLink}>{vm.subscription}</Link>
                    </TableCell>
                    <TableCell>
                      <Link className={styles.vmNameLink}>{vm.resourceGroup}</Link>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {vm.location}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {vm.status}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {vm.os}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {vm.size}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {vm.ip}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {vm.disks}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Link className={styles.vmNameLink}>{vm.updateStatus || "Not assessed"}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredData.length === 0 && (
              <div className={styles.emptyState}>
                <Text size={400} weight="semibold">No resources match your filters.</Text>
                <Text size={300}>Try adjusting your search or filter criteria.</Text>
                <Button appearance="primary" size="small" onClick={clearAllFilters}>Clear all filters</Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationCenter}>
              <button
                className={styles.pageBtn}
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft20Regular />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${p === safePage ? styles.pageBtnActive : ""}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight20Regular />
              </button>
            </div>
            <button className={styles.feedbackLink}>
              <PersonFeedback20Regular />
              Give feedback
            </button>
          </div>
          </>)}
        </div>
      </div>
    </div>
  );
}
