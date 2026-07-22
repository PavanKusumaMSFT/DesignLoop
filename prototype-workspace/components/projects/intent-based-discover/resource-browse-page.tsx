"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableBody,
  Checkbox,
  Link,
  MenuButton,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
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
import { useNavigation } from "../../../lib/navigation-context";

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

  /* ── Breadcrumb bar ──────────────────── */
  breadcrumbBar: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    position: "sticky" as const,
    top: "48px",
    zIndex: 100,
  },
  breadcrumbBarNoHeader: {
    top: "0",
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
    width: "48px",
    minWidth: "48px",
    paddingTop: 0,
    overflow: "hidden" as const,
  },
  sidebarDynamic: {
    width: "264px",
    minWidth: "264px",
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
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground2,
  },
  fallbackIconWrapper: {
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  tableRow: {
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  resourceName: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
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
  table: {
    minWidth: "800px",
  },
  checkboxCell: {
    width: "32px",
  },
  emptyStateSubtitle: {
    color: tokens.colorNeutralForeground3,
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

type ResourceStatus =
  | "Running"
  | "Stopped"
  | "Failed"
  | "Updating"
  | "Succeeded";

interface MockResource {
  id: string;
  name: string;
  subscription: string;
  resourceGroup: string;
  location: string;
  status: ResourceStatus;
}

function getStatusBadgeColor(
  status: ResourceStatus,
): "success" | "subtle" | "danger" | "warning" {
  switch (status) {
    case "Running":
    case "Succeeded":
      return "success";
    case "Stopped":
      return "subtle";
    case "Failed":
      return "danger";
    case "Updating":
      return "warning";
  }
}

function buildMockResources(slug: string): MockResource[] {
  return [
    {
      id: "1",
      name: `${slug}-prod-eastus-001`,
      subscription: "Azure subscription 1",
      resourceGroup: "prod-workloads",
      location: "East US",
      status: "Running",
    },
    {
      id: "2",
      name: `${slug}-prod-westus-001`,
      subscription: "Production",
      resourceGroup: "core-infra-rg",
      location: "West US 2",
      status: "Running",
    },
    {
      id: "3",
      name: `${slug}-dev-eastus-001`,
      subscription: "Development",
      resourceGroup: "dev-resources",
      location: "East US",
      status: "Running",
    },
    {
      id: "4",
      name: `${slug}-staging-eastus-001`,
      subscription: "Azure subscription 1",
      resourceGroup: "my-rg-east",
      location: "East US",
      status: "Stopped",
    },
    {
      id: "5",
      name: `${slug}-dev-westeurope-001`,
      subscription: "Development",
      resourceGroup: "dev-resources",
      location: "West Europe",
      status: "Running",
    },
    {
      id: "6",
      name: `${slug}-prod-eastus-002`,
      subscription: "Production",
      resourceGroup: "prod-workloads",
      location: "East US",
      status: "Updating",
    },
    {
      id: "7",
      name: `${slug}-test-seasia-001`,
      subscription: "Development",
      resourceGroup: "dev-resources",
      location: "Southeast Asia",
      status: "Running",
    },
    {
      id: "8",
      name: `${slug}-prod-uksouth-001`,
      subscription: "Production",
      resourceGroup: "shared-services",
      location: "UK South",
      status: "Running",
    },
    {
      id: "9",
      name: `${slug}-staging-westus-001`,
      subscription: "Azure subscription 1",
      resourceGroup: "my-rg-east",
      location: "West US 2",
      status: "Stopped",
    },
    {
      id: "10",
      name: `${slug}-prod-australiaeast-001`,
      subscription: "Production",
      resourceGroup: "core-infra-rg",
      location: "Australia East",
      status: "Running",
    },
    {
      id: "11",
      name: `${slug}-dev-eastus-002`,
      subscription: "Development",
      resourceGroup: "dev-resources",
      location: "East US",
      status: "Failed",
    },
    {
      id: "12",
      name: `${slug}-prod-westeurope-001`,
      subscription: "Production",
      resourceGroup: "prod-workloads",
      location: "West Europe",
      status: "Running",
    },
    {
      id: "13",
      name: `${slug}-shared-eastus-001`,
      subscription: "Azure subscription 1",
      resourceGroup: "shared-services",
      location: "East US",
      status: "Running",
    },
    {
      id: "14",
      name: `${slug}-dev-uksouth-001`,
      subscription: "Development",
      resourceGroup: "dev-resources",
      location: "UK South",
      status: "Succeeded",
    },
    {
      id: "15",
      name: `${slug}-prod-eastus-003`,
      subscription: "Production",
      resourceGroup: "core-infra-rg",
      location: "East US",
      status: "Running",
    },
  ];
}

const buildSidebarItems = (serviceName: string) => [
  { label: "Overview", icon: <Home20Regular /> },
  { label: "All resources", icon: <Grid20Regular /> },
  {
    label: "Resources",
    isGroup: true,
    expandable: true,
    active: true,
    children: [{ label: serviceName, active: true }],
  },
  {
    label: "Monitoring",
    expandable: true,
    children: [],
  },
  {
    label: "Settings",
    expandable: true,
    children: [],
  },
  {
    label: "Help",
    expandable: true,
    children: [],
  },
];

/** Browse page for existing resources of a given Azure service. Mirrors the portal blade layout with resizable sidebar, command bar, filters, table, and pagination. */
export default function ResourceBrowsePage({
  serviceName = "Resources",
  serviceIcon,
  isDarkMode = false,
  backLabel = "Discover services",
  onBack,
  onServiceClick,
  onSearchSelect,
  hideHeader = false,
}: {
  serviceName?: string;
  serviceIcon?: string;
  isDarkMode?: boolean;
  backLabel?: string;
  onBack?: () => void;
  onServiceClick?: () => void;
  onSearchSelect?: (item: string) => void;
  hideHeader?: boolean;
}) {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const sidebarItems = buildSidebarItems(serviceName);
  const serviceSlug = serviceName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .slice(0, 12);
  const mockResources = buildMockResources(serviceSlug);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Resources"]),
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(264);
  const [isResizingActive, setIsResizingActive] = useState(false);
  const isResizing = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current && !sidebarCollapsed) {
      sidebarRef.current.style.width = `${sidebarWidth}px`;
      sidebarRef.current.style.minWidth = `${sidebarWidth}px`;
    }
  }, [sidebarWidth, sidebarCollapsed]);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isResizing.current = true;
      setIsResizingActive(true);
      const startX = e.clientX;
      const startWidth = sidebarWidth;
      const onMove = (ev: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = Math.max(
          200,
          Math.min(500, startWidth + ev.clientX - startX),
        );
        setSidebarWidth(newWidth);
      };
      const onUp = () => {
        isResizing.current = false;
        setIsResizingActive(false);
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [sidebarWidth],
  );

  return (
    <div className={styles.root}>
      {!hideHeader && (
        <AzureHeaderBuildMVP
          activeLink=""
          isDarkMode={isDarkMode}
          onLogoClick={onBack}
          onSuggestionSelect={onSearchSelect}
        />
      )}

      {/* ── Breadcrumb bar ── */}
      <div
        className={mergeClasses(
          styles.breadcrumbBar,
          hideHeader && styles.breadcrumbBarNoHeader,
        )}
      >
        <Breadcrumb aria-label="Breadcrumb" size="medium">
          <BreadcrumbItem>
            <BreadcrumbButton onClick={() => handlePageChange("home-fre")}>
              Home
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton onClick={onBack}>{backLabel}</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            {onServiceClick ? (
              <BreadcrumbButton onClick={onServiceClick}>
                {serviceName}
              </BreadcrumbButton>
            ) : (
              <BreadcrumbButton current>{serviceName}</BreadcrumbButton>
            )}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* ── Blade header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIconContainer}>
            {serviceIcon ? (
              <img src={serviceIcon} alt="" width={28} height={28} />
            ) : (
              <div className={styles.fallbackIconWrapper}>
                <Grid20Regular />
              </div>
            )}
          </div>
          <div className={styles.headerTitleGroup}>
            <div className={styles.headerTitleRow}>
              <Text className={styles.pageTitle}>{serviceName}</Text>
              <div className={styles.headerActions}>
                <Button
                  appearance="transparent"
                  icon={<Pin20Regular />}
                  className={styles.headerActionBtn}
                  aria-label="Pin"
                />
                <Button
                  appearance="transparent"
                  icon={<Star20Regular />}
                  className={styles.headerActionBtn}
                  aria-label="Favorite"
                />
                <Button
                  appearance="transparent"
                  icon={<MoreHorizontal20Regular />}
                  className={styles.headerActionBtn}
                  aria-label="More actions"
                />
              </div>
            </div>
            <Text className={styles.pageSubtitle}>Microsoft</Text>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Button
            appearance="transparent"
            icon={<Dismiss20Regular />}
            className={styles.headerActionBtn}
            aria-label="Close"
            onClick={onBack}
          />
        </div>
      </div>

      <div className={styles.pageLayout}>
        {/* ── Sidebar ──────────────────────── */}
        <div
          ref={sidebarRef}
          className={mergeClasses(
            styles.sidebar,
            sidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarDynamic,
          )}
        >
          {sidebarCollapsed ? (
            <Button
              appearance="transparent"
              icon={<ChevronDoubleRight16Regular />}
              className={styles.sidebarExpandBtn}
              onClick={() => setSidebarCollapsed(false)}
              title="Expand sidebar"
              aria-label="Expand sidebar"
            />
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
                <Button
                  appearance="transparent"
                  icon={<ChevronUpDown16Regular />}
                  className={styles.sidebarSearchIcon}
                  aria-label="Sort"
                />
                <Button
                  appearance="transparent"
                  icon={<ChevronDoubleLeft16Regular />}
                  className={styles.sidebarSearchIcon}
                  onClick={() => setSidebarCollapsed(true)}
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                />
              </div>
              {/* Resize handle */}
              <div
                className={mergeClasses(
                  styles.resizeHandle,
                  isResizingActive ? styles.resizeHandleActive : undefined,
                )}
                onMouseDown={handleResizeStart}
              />
            </>
          )}
          {!sidebarCollapsed &&
            sidebarItems.map((item) => {
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
                      {item.label}
                    </button>
                    {isOpen &&
                      item.children?.map((child) => (
                        <button
                          key={child.label}
                          className={`${styles.sidebarItem} ${child.active ? styles.sidebarItemActive : ""} ${styles.sidebarIndented}`}
                        >
                          {child.label}
                        </button>
                      ))}
                  </div>
                );
              }
              return (
                <button
                  key={item.label}
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
          {/* Command bar */}
          <div className={styles.commandBar}>
            <MenuButton
              appearance="transparent"
              size="small"
              icon={<Add20Regular />}
            >
              Create
            </MenuButton>
            <MenuButton
              appearance="transparent"
              size="small"
              icon={<Settings20Regular />}
            >
              Manage view
            </MenuButton>
            <div className={styles.commandSeparator} />
            <Button
              appearance="transparent"
              size="small"
              icon={<ArrowClockwise20Regular />}
            >
              Refresh
            </Button>
            <Button
              appearance="transparent"
              size="small"
              icon={<ArrowCurveDownLeft20Regular />}
            >
              Export to CSV
            </Button>
            <Button
              appearance="transparent"
              size="small"
              icon={<Open20Regular />}
            >
              Open query
            </Button>
            <div className={styles.commandSeparator} />
            <Button
              appearance="transparent"
              size="small"
              icon={<TagMultiple20Regular />}
              disabled
            >
              Assign tags
            </Button>
            <Button
              appearance="transparent"
              size="small"
              icon={<Delete20Regular />}
              disabled
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
            />
            <div className={styles.filterPillGroup}>
              <span className={styles.filterPill}>
                Subscription :{" "}
                <span className={styles.filterPillValue}>all</span>
              </span>
            </div>
          </div>

          {/* Data table */}
          <div className={styles.tableWrapper}>
            <Table size="small" className={styles.table}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell className={styles.checkboxCell}>
                    <Checkbox />
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Name <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>Subscription</div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Resource Group
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Location{" "}
                      <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    <div className={styles.headerCellContent}>
                      Status <ArrowSort20Regular className={styles.sortIcon} />
                    </div>
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockResources.map((resource) => (
                  <TableRow key={resource.id} className={styles.tableRow}>
                    <TableCell className={styles.checkboxCell}>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Text size={200} className={styles.resourceName}>
                        {resource.name}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text size={200}>{resource.subscription}</Text>
                    </TableCell>
                    <TableCell>
                      <Text size={200}>{resource.resourceGroup}</Text>
                    </TableCell>
                    <TableCell>
                      <Text size={200}>{resource.location}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge
                        appearance="tint"
                        color={getStatusBadgeColor(resource.status)}
                        size="small"
                      >
                        {resource.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {mockResources.length === 0 && (
              <div className={styles.emptyState}>
                <Text size={400} weight="semibold">
                  No items to display
                </Text>
                <Text size={300} className={styles.emptyStateSubtitle}>
                  This area is empty. Create or import an item to see it here.
                </Text>
                <Button
                  appearance="primary"
                  size="small"
                  icon={<Add20Regular />}
                >
                  Create
                </Button>
                <Link href="#">Learn more</Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationCenter}>
              <Button
                appearance="transparent"
                icon={<ChevronLeft20Regular />}
                className={styles.pageBtn}
                aria-label="Previous page"
                disabled
              />
              <Button
                appearance="transparent"
                className={mergeClasses(styles.pageBtn, styles.pageBtnActive)}
                aria-label="Page 1"
              >
                1
              </Button>
              <Button
                appearance="transparent"
                icon={<ChevronRight20Regular />}
                className={styles.pageBtn}
                aria-label="Next page"
                disabled
              />
            </div>
            <Button
              appearance="transparent"
              icon={<PersonFeedback20Regular />}
              className={styles.feedbackLink}
            >
              Give feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
