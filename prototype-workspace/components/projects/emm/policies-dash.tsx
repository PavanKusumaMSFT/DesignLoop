"use client";

import { useState, useRef, useCallback } from "react";
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
  Link,
  Badge,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import {
  ArrowClockwise20Regular,
  ChevronRight12Regular,
  ChevronUpDown16Regular,
  ChevronDoubleLeft16Regular,
  ChevronDoubleRight16Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Search16Regular,
  MoreHorizontal20Regular,
  PersonFeedback20Regular,
  Home20Regular,
  Grid20Regular,
  Dismiss12Regular,
  Warning12Filled,
  Info16Regular,
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
    padding: "7px 20px",
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
    padding: "7px 20px 7px 22px",
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
  scrollableContent: {
    flex: 1,
    overflowY: "auto",
    padding: `0 20px 20px`,
  },

  /* ── Page header ── */
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
  },
  headerRight: {
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

  /* ── Copilot suggestion bar ─────────── */
  copilotBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} 0`,
    flexWrap: "wrap",
  },
  copilotPill: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusCircular,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  copilotIcon: {
    width: "16px",
    height: "16px",
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
  filterLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
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
    border: "1px solid transparent",
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

  /* ── Warning banner ─────────────────── */
  warningBanner: {
    marginTop: tokens.spacingVerticalM,
  },
  showAllErrors: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    marginTop: tokens.spacingVerticalXXS,
  },

  /* ── Summary cards ────────────────────── */
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} 0`,
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  summaryCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalM,
  },
  summaryCardTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  summaryCardValue: {
    fontSize: "40px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "48px",
  },
  summaryCardSubtext: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },

  /* ── Donut chart ──────────────────────── */
  donutContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  donutWrapper: {
    position: "relative" as const,
    width: "100px",
    height: "100px",
    flexShrink: 0,
  },
  donutCenter: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center" as const,
  },
  donutCenterValue: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
    display: "block",
  },
  donutLegend: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  legendDot: {
    width: "10px",
    height: "10px",
    borderRadius: tokens.borderRadiusCircular,
    flexShrink: 0,
  },

  /* ── Non-compliant card with icons ───── */
  nonCompliantValue: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalXS,
  },
  nonCompliantIcons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },

  /* ── Edit/export bar ──────────────────── */
  editExportBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalS,
  },

  /* ── Data table ───────────────────────── */
  tableWrapper: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
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
  tableCell: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  nameLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
  },
  nameIcon: {
    width: "16px",
    height: "16px",
    marginRight: tokens.spacingHorizontalXS,
    verticalAlign: "middle",
  },
  moreCell: {
    width: "32px",
    minWidth: "32px",
    maxWidth: "32px",
  },
  complianceDot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    display: "inline-block",
    marginRight: tokens.spacingHorizontalXS,
  },
  complianceBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  complianceBarBg: {
    width: "60px",
    height: "6px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusCircular,
    overflow: "hidden" as const,
    display: "inline-block",
    verticalAlign: "middle",
  },
  complianceBarFill: {
    height: "100%",
    borderRadius: tokens.borderRadiusCircular,
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
});

/* ── Mock policy data ─────────────────── */
const policyData = [
  { name: "c+ai - custom azure security benchmark initiat", scope: "Non Production", complianceState: "Non-compliant", resourceCompliance: 9, resourceComplianceDetail: "215 out of 2414", nonCompliantResources: 2199, nonCompliantPolicies: 29 },
  { name: "network-isolation-paas-perimeter_1_2", scope: "Non Production", complianceState: "Non-compliant", resourceCompliance: 14, resourceComplianceDetail: "251 out of 1756", nonCompliantResources: 1505, nonCompliantPolicies: 10 },
  { name: "DisableLocalAuth", scope: "OneDeploy Analytics and Intellige...", complianceState: "Non-compliant", resourceCompliance: 7, resourceComplianceDetail: "99 out of 1485", nonCompliantResources: 1386, nonCompliantPolicies: 1 },
  { name: "c+ai - custom azure security benchmark initiat", scope: "Non Production", complianceState: "Non-compliant", resourceCompliance: 52, resourceComplianceDetail: "1458 out of 2814", nonCompliantResources: 1356, nonCompliantPolicies: 36 },
  { name: "c+ai - custom azure security benchmark initiat", scope: "Non Production", complianceState: "Non-compliant", resourceCompliance: 38, resourceComplianceDetail: "737 out of 1920", nonCompliantResources: 1183, nonCompliantPolicies: 24 },
  { name: "Enable storage account blob anonymous acces", scope: "CnAI Orchestration Service Public ...", complianceState: "Non-compliant", resourceCompliance: 0, resourceComplianceDetail: "2 out of 829", nonCompliantResources: 827, nonCompliantPolicies: 1 },
  { name: "Deny Policy on Storage Account when PublicN", scope: "CnAI Orchestration Service Public ...", complianceState: "Non-compliant", resourceCompliance: 2, resourceComplianceDetail: "13 out of 829", nonCompliantResources: 816, nonCompliantPolicies: 1 },
  { name: "Deny Policy on Storage Account when PublicN", scope: "CnAI Orchestration Service Public ...", complianceState: "Non-compliant", resourceCompliance: 2, resourceComplianceDetail: "13 out of 829", nonCompliantResources: 816, nonCompliantPolicies: 1 },
  { name: "c+ai - custom azure security benchmark initiat", scope: "NonProduction-network security p...", complianceState: "Non-compliant", resourceCompliance: 31, resourceComplianceDetail: "354 out of 1129", nonCompliantResources: 775, nonCompliantPolicies: 19 },
  { name: "Deny create/update of in-scope datastore resc", scope: "72f988bf-86f1-41af-91ab-2d7cd01...", complianceState: "Non-compliant", resourceCompliance: 0, resourceComplianceDetail: "0 out of 749", nonCompliantResources: 749, nonCompliantPolicies: 1 },
  { name: "Deny Virtual Network Subnet Default Outbour", scope: "CnAI Orchestration Service Public ...", complianceState: "Non-compliant", resourceCompliance: 66, resourceComplianceDetail: "1148 out of 1737", nonCompliantResources: 589, nonCompliantPolicies: 1 },
  { name: "Deny Virtual Network Subnet Default Outbour", scope: "72f988bf-86f1-41af-91ab-2d7cd01...", complianceState: "Non-compliant", resourceCompliance: 67, resourceComplianceDetail: "1168 out of 1737", nonCompliantResources: 569, nonCompliantPolicies: 1 },
  { name: "PublicNetworkAccess on Azure KeyVault shoul", scope: "72f988bf-86f1-41af-91ab-2d7cd01...", complianceState: "Non-compliant", resourceCompliance: 15, resourceComplianceDetail: "75 out of 497", nonCompliantResources: 422, nonCompliantPolicies: 1 },
  { name: "Deny Policy on Azure KeyVault when PublicNet", scope: "CnAI Orchestration Service Public ...", complianceState: "Non-compliant", resourceCompliance: 15, resourceComplianceDetail: "75 out of 497", nonCompliantResources: 422, nonCompliantPolicies: 1 },
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
    expandable: true,
    children: [
      { label: "Virtual machines", iconSrc: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
      { label: "VM Scale Sets", iconSrc: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg" },
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
      { label: "Policy", active: true, iconSrc: "/azure-service-icons/management + governance/10316-icon-service-Policy.svg" },
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

/* ── Donut chart SVG ──────────────────── */
function DonutChart({ compliant, nonCompliant }: { compliant: number; nonCompliant: number }) {
  const total = compliant + nonCompliant;
  const compliantPct = total > 0 ? compliant / total : 0;
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const compliantArc = circumference * compliantPct;
  const nonCompliantArc = circumference - compliantArc;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      {/* Non-compliant arc (red) */}
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="#d13438"
        strokeWidth="14"
        strokeDasharray={`${nonCompliantArc} ${circumference}`}
        strokeDashoffset={0}
        transform="rotate(-90 50 50)"
      />
      {/* Compliant arc (green) */}
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="#107c10"
        strokeWidth="14"
        strokeDasharray={`${compliantArc} ${circumference}`}
        strokeDashoffset={-nonCompliantArc}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
}

/** Azure Policy compliance dashboard — shows policy compliance summary and data table. */
export default function PoliciesDash({
  isDarkMode = false,
  onHome,
  onSearchSelect,
  onNavigateToVm,
  onNavigateToEmm,
  onNavigateToPolicies,
}: {
  isDarkMode?: boolean;
  onHome?: () => void;
  onSearchSelect?: (item: string) => void;
  onNavigateToVm?: () => void;
  onNavigateToEmm?: () => void;
  onNavigateToPolicies?: () => void;
}) {
  const styles = useStyles();
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Infrastructure", "Monitoring+Operations"])
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(264);
  const isResizing = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredPolicies = policyData.filter((p) =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE);
  const pagedPolicies = filteredPolicies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <AzureHeaderBuildMVP
        isDarkMode={isDarkMode}
        onItemSelect={onSearchSelect}
        onHome={onHome}
      />
      <PageBreadcrumb
        noBorder
        items={[
          { label: "Home", onClick: onHome },
          { label: "Compute infrastructure" },
          { label: "Policies" },
        ]}
      />

      {/* ── Page layout ── */}
      <div className={styles.pageLayout}>
        {/* ── Left sidebar ── */}
        <div
          className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}
          style={sidebarCollapsed ? undefined : { width: sidebarWidth }}
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
                  placeholder="Search"
                  className={styles.sidebarSearchInput}
                  contentBefore={<Search16Regular />}
                />
                <button
                  className={styles.sidebarSearchIcon}
                  title="Pin sidebar"
                >
                  <ChevronDoubleLeft16Regular />
                </button>
              </div>
              {sidebarItems.map((item) =>
                item.expandable ? (
                  <div key={item.label}>
                    <button
                      className={styles.sidebarGroupHeader}
                      onClick={() => toggleGroup(item.label)}
                    >
                      <span
                        className={`${styles.sidebarChevron} ${expandedGroups.has(item.label) ? styles.sidebarChevronOpen : ""}`}
                      >
                        <ChevronRight12Regular />
                      </span>
                      {item.label}
                    </button>
                    {expandedGroups.has(item.label) &&
                      item.children?.map((child) => (
                        <button
                          key={child.key || child.label}
                          className={`${styles.sidebarItem} ${child.active ? styles.sidebarItemActive : ""} ${styles.sidebarIndented}`}
                          onClick={() => {
                            if (child.label === "Virtual machines" && onNavigateToVm) {
                              onNavigateToVm();
                            } else if (child.label.includes("Essential Machine Management") && onNavigateToEmm) {
                              onNavigateToEmm();
                            } else if (child.label === "Policies" && onNavigateToPolicies) {
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
                ) : (
                  <button key={item.label} className={styles.sidebarItem}>
                    {item.icon && <span className={styles.sidebarIcon}>{item.icon}</span>}
                    {item.label}
                  </button>
                )
              )}
              <div
                className={styles.resizeHandle}
                onMouseDown={handleResizeStart}
              />
            </>
          )}
        </div>

        {/* ── Main content ── */}
        <div className={styles.mainContent}>
          {/* Page header */}
          <div className={styles.pageHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIconContainer}>
                <img
                  src="/azure-service-icons/management + governance/10316-icon-service-Policy.svg"
                  alt=""
                  style={{ width: 36, height: 36 }}
                />
              </div>
              <div className={styles.headerTitleGroup}>
                <div className={styles.headerTitleRow}>
                  <Text className={styles.pageTitle}>
                    Compute infrastructure |{" "}
                    <Text className={styles.pageTitleSuffix}>Policies</Text>
                  </Text>
                </div>
                <Text className={styles.pageSubtitle}>Microsoft</Text>
              </div>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.headerActionBtn} title="Dismiss">
                <Dismiss12Regular />
              </button>
            </div>
          </div>

          <div className={styles.scrollableContent}>
            {/* Copilot suggestions */}
            <div className={styles.copilotBar}>
              <img src="/icons/copilot.svg" alt="" className={styles.copilotIcon} />
              <button className={styles.copilotPill}>List non-compliant resources</button>
              <button className={styles.copilotPill}>List all assigned policies in my environment</button>
              <button className={styles.copilotPill}>Suggest useful built-in Azure Policy definitions</button>
            </div>

            {/* Command bar */}
            <div className={styles.commandBar}>
              <Button appearance="transparent" size="small" icon={<img src="/azure-service-icons/management + governance/10316-icon-service-Policy.svg" alt="" style={{ width: 16, height: 16 }} />}>
                Assign policy
              </Button>
              <Button appearance="transparent" size="small" icon={<img src="/azure-service-icons/management + governance/10316-icon-service-Policy.svg" alt="" style={{ width: 16, height: 16 }} />}>
                Assign initiative
              </Button>
              <div className={styles.commandSeparator} />
              <Button appearance="transparent" size="small" icon={<ArrowClockwise20Regular />}>
                Refresh
              </Button>
            </div>

            {/* Filter bar */}
            <div className={styles.filterBar}>
              <Text className={styles.filterLabel}>Search</Text>
              <Input
                size="small"
                placeholder="Filter by name or ID..."
                className={styles.filterInput}
                value={searchQuery}
                onChange={(_, data) => setSearchQuery(data.value)}
              />
              <div className={styles.filterPillGroup}>
                <button className={styles.filterPill}>
                  <Text className={styles.filterPillValue}>Scope :</Text> 152 selected
                </button>
                <button className={styles.filterPill}>
                  Definition type : All definition types
                </button>
                <button className={styles.filterPill}>
                  Compliance state : All compliance states
                </button>
              </div>
            </div>

            {/* Warning banner */}
            <div className={styles.warningBanner}>
              <MessageBar intent="warning">
                <MessageBarBody>
                  Current user does not have authorization to perform action &apos;Microsoft.PolicyInsights/policyStates/summarize/read&apos; or &apos;Microsoft.PolicyInsights/policyStates/read&apos; over scope &apos;/subscriptions/dde02a76-63cf-4f5f-be84-c941b4da4409&apos; or the scope is invalid. If access is recently granted, please refresh your credentials.
                </MessageBarBody>
              </MessageBar>
              <Link className={styles.showAllErrors}>Show all errors</Link>
            </div>

            {/* Summary row */}
            <div className={styles.summaryRow}>
              {/* Overall resource compliance */}
              <div className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>
                  Overall resource compliance <Info16Regular />
                </Text>
                <Text className={styles.summaryCardValue}>74%</Text>
                <Text className={styles.summaryCardSubtext}>17,631 out of 23,866</Text>
              </div>

              {/* Resources by compliance state — donut chart */}
              <div className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>
                  Resources by compliance state <Info16Regular />
                </Text>
                <div className={styles.donutContainer}>
                  <div className={styles.donutWrapper}>
                    <DonutChart compliant={17631} nonCompliant={6235} />
                    <div className={styles.donutCenter}>
                      <Text className={styles.donutCenterValue}>23,866</Text>
                    </div>
                  </div>
                  <div className={styles.donutLegend}>
                    <div className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ backgroundColor: "#107c10" }} />
                      17,631 - Compliant
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ backgroundColor: "#d13438" }} />
                      6,235 - Non-compliant
                    </div>
                  </div>
                </div>
              </div>

              {/* Non-compliant initiatives */}
              <div className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>
                  Non-compliant initiatives <Info16Regular />
                </Text>
                <div className={styles.nonCompliantValue}>
                  <Text className={styles.summaryCardValue}>60</Text>
                  <span className={styles.nonCompliantIcons}>👤👤</span>
                </div>
                <Text className={styles.summaryCardSubtext}>out of 102</Text>
              </div>

              {/* Non-compliant policies */}
              <div className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>
                  Non-compliant policies <Info16Regular />
                </Text>
                <Text className={styles.summaryCardValue}>367</Text>
                <Text className={styles.summaryCardSubtext}>out of 1008</Text>
              </div>
            </div>

            {/* Edit columns / Export bar */}
            <div className={styles.editExportBar}>
              <Button appearance="outline" size="small">Edit columns</Button>
              <Button appearance="outline" size="small">Export to CSV</Button>
            </div>

            {/* Data table */}
            <div className={styles.tableWrapper}>
              <Table size="small">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      <div className={styles.headerCellContent}>
                        Name <ChevronUpDown16Regular className={styles.sortIcon} />
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      <div className={styles.headerCellContent}>
                        Scope <ChevronUpDown16Regular className={styles.sortIcon} />
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      <div className={styles.headerCellContent}>
                        Compliance state <ChevronUpDown16Regular className={styles.sortIcon} />
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      <div className={styles.headerCellContent}>
                        Resource compliance <ChevronUpDown16Regular className={styles.sortIcon} />
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      <div className={styles.headerCellContent}>
                        Non-compliant resources
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      <div className={styles.headerCellContent}>
                        Non-compliant policies <ChevronUpDown16Regular className={styles.sortIcon} />
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.moreCell} />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedPolicies.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className={styles.tableCell}>
                        <Link className={styles.nameLink}>
                          <img
                            src="/azure-service-icons/management + governance/10316-icon-service-Policy.svg"
                            alt=""
                            className={styles.nameIcon}
                          />
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.scope}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <span className={styles.complianceDot} style={{ backgroundColor: "#d13438" }} />
                        {row.complianceState}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <div className={styles.complianceBar}>
                          <div className={styles.complianceBarBg}>
                            <div
                              className={styles.complianceBarFill}
                              style={{
                                width: `${row.resourceCompliance}%`,
                                backgroundColor: row.resourceCompliance > 50 ? "#107c10" : "#d13438",
                              }}
                            />
                          </div>
                          <Text size={200}>{row.resourceCompliance}% ({row.resourceComplianceDetail})</Text>
                        </div>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.nonCompliantResources.toLocaleString()}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.nonCompliantPolicies}
                      </TableCell>
                      <TableCell className={styles.moreCell}>
                        <Button
                          appearance="transparent"
                          size="small"
                          icon={<MoreHorizontal20Regular />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={styles.feedbackLink}>
              <PersonFeedback20Regular />
              Give feedback
            </button>
            <div className={styles.paginationCenter}>
              <button className={styles.pageBtn} disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                <ChevronDoubleLeft16Regular />
              </button>
              <button className={styles.pageBtn} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                <ChevronLeft20Regular />
              </button>
              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${currentPage === p ? styles.pageBtnActive : ""}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <button className={styles.pageBtn} disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>
                <ChevronRight20Regular />
              </button>
              <button className={styles.pageBtn} disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(totalPages)}>
                <ChevronDoubleRight16Regular />
              </button>
            </div>
            <Text size={200}>
              Add or remove favorites by pressing Cmd+Shi ft+F
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
