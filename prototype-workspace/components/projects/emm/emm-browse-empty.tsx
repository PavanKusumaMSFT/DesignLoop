"use client";

import { useState, useRef, useCallback } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Card,
  Link,
} from "@fluentui/react-components";
import {
  Dismiss20Regular,
  ChevronRight12Regular,
  ChevronUpDown16Regular,
  ChevronDoubleLeft16Regular,
  ChevronDoubleRight16Regular,
  Search16Regular,
  MoreHorizontal20Regular,
  Pin20Regular,
  Star20Regular,
  PersonFeedback20Regular,
  Home20Regular,
  Grid20Regular,
  Checkmark12Regular,
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

  /* ── Hero section (empty state) ───────── */
  heroSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    gap: tokens.spacingVerticalL,
  },
  heroIllustration: {
    width: "100%",
    maxWidth: "327px",
    height: "auto",
    margin: "0 auto",
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  heroTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase500,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  heroBody: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalL,
    display: "block",
    textAlign: "center" as const,
  },
  infoCardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: tokens.spacingHorizontalXXL,
    maxWidth: "660px",
    width: "100%",
    marginTop: tokens.spacingVerticalM,
  },
  infoCard: {
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
  },
  infoCardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  infoCardBody: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  infoCardLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    marginBottom: tokens.spacingVerticalXS,
    display: "block",
  },
  infoCardPrice: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase600,
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  infoCardLinkSpacer: {
    marginTop: "auto",
  },
  costsCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  costsIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#c6e7c6",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  costsHeaderTextWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  costsTimestamp: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  costsBody: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    flex: 1,
  },
  costsStatsRow: {
    display: "flex",
    alignItems: "center",
    gap: "64px",
  },
  costsStat: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  costsStatLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  costsStatValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  costsFooter: {
    display: "flex",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalM,
    marginTop: "auto",
  },
  checkList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  checkListItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  checkIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },

  /* ── Pagination ───────────────────────── */
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    flexShrink: 0,
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

/** Azure portal EMM browse page — empty state with no resources enabled yet. */
export default function EmmBrowseEmpty({
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
          {/* Hero section — matches Figma node 6308:11368 */}
          <div className={styles.heroSection}>
            <img
              src="/icons/emm-hero-illustration.svg"
              alt="Essential Machine Management illustration"
              className={styles.heroIllustration}
            />
            <Text className={styles.heroTitle}>
              Essential Machine Management
            </Text>
            <Text className={styles.heroBody}>
              Enable centralized machine management to simplify setup, maintain consistency,
              <br />
              and improve operational visibility, performance, and cost efficiency across resources.
            </Text>
            <Button appearance="primary" onClick={onEnable}>
              Enable
            </Button>

            {/* Info cards row */}
            <div className={styles.infoCardsRow}>
              <Card className={styles.infoCard} appearance="filled">
                <Text className={styles.infoCardTitle}>What gets enabled</Text>
                <Text className={styles.infoCardBody}>Enabling Essential Machine Management includes:</Text>
                <div className={styles.checkList}>
                  <div className={styles.checkListItem}><Checkmark12Regular className={styles.checkIcon} /><Text className={styles.infoCardBody}>Azure Monitor VM insights (Preview)</Text></div>
                  <div className={styles.checkListItem}><Checkmark12Regular className={styles.checkIcon} /><Text className={styles.infoCardBody}>Azure Policy and Machine Configurations</Text></div>
                  <div className={styles.checkListItem}><Checkmark12Regular className={styles.checkIcon} /><Text className={styles.infoCardBody}>Change Tracking and Inventory</Text></div>
                  <div className={styles.checkListItem}><Checkmark12Regular className={styles.checkIcon} /><Text className={styles.infoCardBody}>Azure Update Manager</Text></div>
                </div>
                <div className={styles.infoCardLinkSpacer}>
                  <Button appearance="secondary" size="small" onClick={() => window.open("https://ms.portal.azure.com/verifyLink?href=https%3A%2F%2Fgo.microsoft.com%2Ffwlink%2F%3Flinkid%3D2338375&id=Microsoft_Azure_ComputeHub&viewUsed=columnView", "_blank")}>
                    Documentation
                  </Button>
                </div>
              </Card>

              <Card className={styles.infoCard} appearance="filled">
                <Text className={styles.infoCardTitle}>Costs</Text>
                <div className={styles.costsStat}>
                  <Text className={styles.costsStatLabel}>Price</Text>
                  <Text className={styles.costsStatValue}>Free</Text>
                </div>
                <Text className={styles.infoCardBody}>For virtual machines</Text>
                <Text className={styles.infoCardBody}>Optional add-ons available</Text>
                <div className={styles.infoCardLinkSpacer}>
                  <Button appearance="outline" size="small" onClick={() => window.open("#", "_blank")}>
                    View pricing page
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.pagination}>
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
