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

/** Azure portal EMM browse page — mirrors the vm-browse layout with resizable sidebar, command bar, filters, empty-state table, and pagination. */
export default function EmmBrowse({
  isDarkMode = false,
  onHome,
  onSearchSelect,
  onClose,
  onNavigateToVm,
  onNavigateToEmm,
}: {
  isDarkMode?: boolean;
  onHome?: () => void;
  onSearchSelect?: (item: string) => void;
  onClose?: () => void;
  onNavigateToVm?: () => void;
  onNavigateToEmm?: () => void;
}) {
  const styles = useStyles();
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
          {/* Command bar */}
          <div className={styles.commandBar}>
            <MenuButton appearance="transparent" size="small" icon={<Add20Regular />}>
              Create
            </MenuButton>
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
            <Button appearance="transparent" size="small" icon={<TagMultiple20Regular />} disabled>
              Assign tags
            </Button>
            <Button appearance="transparent" size="small" icon={<Delete20Regular />} disabled>
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
                </TableRow>
              </TableHeader>
              <TableBody />
            </Table>

            {/* Empty state */}
            <div className={styles.emptyState}>
              <Text size={400} weight="semibold">No items to display</Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
                This area is empty. Create or import an item to see it here.
              </Text>
              <Button appearance="primary" size="small" icon={<Add20Regular />}>Create</Button>
              <Link href="#">Learn more</Link>
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationCenter}>
              <button className={styles.pageBtn} disabled>
                <ChevronLeft20Regular />
              </button>
              <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
              <button className={styles.pageBtn} disabled>
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
