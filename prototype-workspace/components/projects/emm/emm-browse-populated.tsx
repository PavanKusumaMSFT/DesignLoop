"use client";

import { useState, useRef, useCallback, useMemo } from "react";
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
} from "@fluentui/react-components";
import {
  Add20Regular,
  ArrowClockwise20Regular,
  ArrowCurveDownLeft20Regular,
  Settings20Regular,
  Open20Regular,
  Delete20Regular,
  TagMultiple20Regular,
  Filter20Regular,
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
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import { useEmmState } from "./emm-state-context";

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

  /* ── Banner card ──────────────────────── */
  bannerCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} 0`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  bannerIllustration: {
    width: "120px",
    height: "120px",
    flexShrink: 0,
  },
  bannerTextGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  bannerTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  bannerBody: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  bannerActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalXS,
  },
  bannerCost: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXXS,
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
  tableCell: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  lastRow: {
    borderBottomColor: "transparent",
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

  /* ── Empty state ──────────────────────── */
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXXL,
    gap: tokens.spacingVerticalM,
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

const ITEMS_PER_PAGE = 20;

const fallbackEmmData = [
  { name: "VM-01", subscription: "Sub-01", resourceGroup: "RG-01", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-02", subscription: "Sub-01", resourceGroup: "RG-01", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-03", subscription: "Sub-01", resourceGroup: "RG-01", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-04", subscription: "Sub-01", resourceGroup: "RG-01", location: "West US", status: "Not enabled", type: "Virtual machine" },
  { name: "VM-05", subscription: "Sub-01", resourceGroup: "RG-01", location: "Central US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-06", subscription: "Sub-01", resourceGroup: "RG-02", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-07", subscription: "Sub-01", resourceGroup: "RG-02", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-08", subscription: "Sub-01", resourceGroup: "RG-02", location: "West US", status: "Not enabled", type: "Virtual machine" },
  { name: "VM-09", subscription: "Sub-01", resourceGroup: "RG-02", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-10", subscription: "Sub-01", resourceGroup: "RG-02", location: "Central US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-11", subscription: "Sub-01", resourceGroup: "RG-03", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-12", subscription: "Sub-01", resourceGroup: "RG-03", location: "East US", status: "Not enabled", type: "Virtual machine" },
  { name: "VM-13", subscription: "Sub-01", resourceGroup: "RG-03", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-14", subscription: "Sub-01", resourceGroup: "RG-03", location: "Central US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-15", subscription: "Sub-01", resourceGroup: "RG-03", location: "Central US", status: "Enabled", type: "Virtual machine" },
  { name: "ArcMachine-01", subscription: "Sub-01", resourceGroup: "RG-04", location: "East US", status: "Enabled", type: "Arc machine" },
  { name: "ArcMachine-02", subscription: "Sub-01", resourceGroup: "RG-04", location: "West US", status: "Not enabled", type: "Arc machine" },
  { name: "ArcMachine-03", subscription: "Sub-01", resourceGroup: "RG-04", location: "East US", status: "Enabled", type: "Arc machine" },
  { name: "VM-16", subscription: "Sub-01", resourceGroup: "RG-04", location: "Central US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-17", subscription: "Sub-01", resourceGroup: "RG-04", location: "West US", status: "Not enabled", type: "Virtual machine" },
  { name: "VM-18", subscription: "Sub-01", resourceGroup: "RG-05", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-19", subscription: "Sub-01", resourceGroup: "RG-05", location: "Central US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-20", subscription: "Sub-01", resourceGroup: "RG-05", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "ArcMachine-04", subscription: "Sub-01", resourceGroup: "RG-05", location: "Central US", status: "Enabled", type: "Arc machine" },
  { name: "VM-21", subscription: "Sub-01", resourceGroup: "RG-06", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-22", subscription: "Sub-01", resourceGroup: "RG-06", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "ArcMachine-05", subscription: "Sub-01", resourceGroup: "RG-06", location: "West US", status: "Not enabled", type: "Arc machine" },
  { name: "VM-23", subscription: "Sub-01", resourceGroup: "RG-07", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-24", subscription: "Sub-01", resourceGroup: "RG-07", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-25", subscription: "Sub-01", resourceGroup: "RG-07", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "ArcMachine-06", subscription: "Sub-01", resourceGroup: "RG-08", location: "Central US", status: "Enabled", type: "Arc machine" },
  { name: "VM-26", subscription: "Sub-01", resourceGroup: "RG-08", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-27", subscription: "Sub-01", resourceGroup: "RG-08", location: "Central US", status: "Not enabled", type: "Virtual machine" },
  { name: "VM-28", subscription: "Sub-01", resourceGroup: "RG-09", location: "East US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-29", subscription: "Sub-01", resourceGroup: "RG-09", location: "West US", status: "Enabled", type: "Virtual machine" },
  { name: "VM-30", subscription: "Sub-01", resourceGroup: "RG-10", location: "East US", status: "Enabled", type: "Virtual machine" },
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
      { label: "Virtual machines", iconSrc: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
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
      { label: "Essential Machine Management (Preview)", active: true, iconSrc: "/azure-service-icons/other/02846-icon-service-Update-Management-Center.svg" },
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

/** Azure portal EMM browse page — populated state with resource data in the table. */
export default function EmmBrowsePopulated({
  isDarkMode = false,
  onHome,
  onSearchSelect,
  onClose,
  onNavigateToVm,
  onNavigateToEmm,
  onEnable,
  onNavigateToPolicies,
}: {
  isDarkMode?: boolean;
  onHome?: () => void;
  onSearchSelect?: (item: string) => void;
  onClose?: () => void;
  onNavigateToVm?: () => void;
  onNavigateToEmm?: () => void;
  onEnable?: () => void;
  onNavigateToPolicies?: () => void;
}) {
  const styles = useStyles();
  const emmState = useEmmState();
  const emmData = emmState.resources.length > 0 ? emmState.resources : fallbackEmmData;
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Infrastructure", "Monitoring+Operations"])
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(264);
  const isResizing = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState("");

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

  const filteredData = useMemo(() => {
    if (!filterText.trim()) return emmData;
    const lower = filterText.toLowerCase();
    return emmData.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.subscription.toLowerCase().includes(lower) ||
        r.resourceGroup.toLowerCase().includes(lower) ||
        r.location.toLowerCase().includes(lower) ||
        r.status.toLowerCase().includes(lower) ||
        r.type.toLowerCase().includes(lower)
    );
  }, [filterText]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleItem = (name: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const getIconForType = (type: string) => {
    if (type === "Arc machine") return "/azure-service-icons/management + governance/01710-icon-service-Arc-Machines.svg";
    return "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg";
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
          { label: "Essential Machine Management" },
        ]}
      />

      {/* ── Blade header (spans full width) ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIconContainer}>
            <img
              src="/azure-service-icons/other/02846-icon-service-Update-Management-Center.svg"
              alt=""
              width={28}
              height={28}
            />
          </div>
          <div className={styles.headerTitleGroup}>
            <div className={styles.headerTitleRow}>
              <Text className={styles.pageTitle}>
                Compute infrastructure <Text as="span" className={styles.pageTitleSuffix}>| Essential Machine Management</Text>
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
          <button className={styles.headerActionBtn} onClick={onClose}>
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
                          if (child.label === "Virtual machines" && onNavigateToVm) {
                            onNavigateToVm();
                          } else if (child.label.includes("Essential Machine Management") && onNavigateToEmm) {
                            onNavigateToEmm();
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
          {/* Banner card */}
          <div className={styles.bannerCard}>
            <img
              src="/icons/emm-hero-illustration.svg"
              alt="Essential Machine Management"
              className={styles.bannerIllustration}
            />
            <div className={styles.bannerTextGroup}>
              <Text className={styles.bannerTitle}>Essential Machine Management</Text>
              <Text className={styles.bannerBody}>
                Enable centralized machine management to simplify setup, maintain consistency, and improve operational visibility, performance, and cost efficiency across resources.
              </Text>
              <Text className={styles.bannerCost}>Price: Free</Text>
              <div className={styles.bannerActions}>
                <Button appearance="secondary" size="small">
                  Documentation
                </Button>
                <Button appearance="primary" size="small" onClick={onEnable}>
                  Enable EMM
                </Button>
              </div>
            </div>
          </div>

          {/* Command bar */}
          <div className={styles.commandBar}>
            <Button appearance="transparent" size="small" icon={<Add20Regular />} onClick={onEnable}>
              Enable
            </Button>
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
            <Button appearance="transparent" size="small" icon={<TagMultiple20Regular />} disabled={selectedItems.size === 0}>
              Assign tags
            </Button>
            <Button appearance="transparent" size="small" icon={<Delete20Regular />} disabled={selectedItems.size === 0}
              onClick={() => {
                emmState.removeResources(Array.from(selectedItems));
                setSelectedItems(new Set());
              }}
            >
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
              value={filterText}
              onChange={(_, data) => {
                setFilterText(data.value);
                setCurrentPage(1);
              }}
            />
            <div className={styles.filterPillGroup}>
              <span className={styles.filterPill}>
                Subscription : <span className={styles.filterPillValue}>all</span>
              </span>
            </div>
          </div>

          {/* Data table */}
          <div className={styles.tableWrapper}>
            <Table size="small" style={{ minWidth: "800px" }}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell style={{ width: "32px" }}>
                    <Checkbox />
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Name <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell} style={{ width: "32px" }} />
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Status <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Azure policy assignment
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Deployment
                    </div>
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, idx) => (
                  <TableRow key={item.name} className={idx === paginatedData.length - 1 ? styles.lastRow : undefined}>
                    <TableCell style={{ width: "32px" }}>
                      <Checkbox
                        checked={selectedItems.has(item.name)}
                        onChange={() => toggleItem(item.name)}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src="/icons/Subscriptions.svg"
                        alt=""
                        className={styles.nameIcon}
                      />
                      <Link className={styles.nameLink}>{item.subscription}</Link>
                    </TableCell>
                    <TableCell className={styles.moreCell}>
                      <Button appearance="subtle" size="small" icon={<MoreHorizontal20Regular />} />
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>Enabled</Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>EMM default</Text>
                    </TableCell>
                    <TableCell>
                      <Link className={styles.nameLink}>Deployment link</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredData.length === 0 && (
              <div className={styles.emptyState}>
                <Text size={400} weight="semibold">No resources match your filters.</Text>
                <Text size={300}>Try adjusting your search or filter criteria.</Text>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationCenter}>
              <button
                className={styles.pageBtn}
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft20Regular />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${page === currentPage ? styles.pageBtnActive : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                disabled={currentPage >= totalPages}
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
        </div>
      </div>
    </div>
  );
}
