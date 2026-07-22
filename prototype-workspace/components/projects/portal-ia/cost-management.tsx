/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { TopNav } from "../../shared/top-nav";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ChevronDown24Regular,
  ChevronLeft20Regular,
  Pin20Regular,
  ArrowClockwise20Regular,
  MoreHorizontal20Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../../../lib/navigation-context";
import { useState } from "react";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    filter: "grayscale(100%)",
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 32px",
  },
  backButton: {
    minWidth: "auto",
    padding: "8px",
    color: tokens.colorBrandForeground1,
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  titleIcon: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorPaletteGreenBackground2,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  scopeText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginTop: "4px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconButton: {
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "transparent",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 8px",
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    boxShadow: tokens.shadow16,
    minWidth: "200px",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "8px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  mainLayout: {
    display: "flex",
    height: "100%",
  },
  sidebar: {
    width: "220px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    padding: "8px 0",
  },
  searchSection: {
    padding: "8px 16px 16px 16px",
  },
  searchInput: {
    width: "100%",
    padding: "6px 8px 6px 32px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: "13px",
    outline: "none",
    "::placeholder": {
      color: tokens.colorNeutralForeground4,
    },
  },
  navSection: {
    flex: 1,
    padding: "8px 0",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    transition: "all 0.2s",
    borderLeft: "3px solid transparent",
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    borderLeft: `3px solid ${tokens.colorBrandForeground1}`,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentArea: {
    flex: 1,
    padding: "24px",
    gap: "24px",
    display: "flex",
    flexDirection: "column",
  },
  trialCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
  },
  upgradeCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  primaryButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    fontSize: "14px",
    fontWeight: tokens.fontWeightMedium,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    padding: "8px 16px",
    borderRadius: "4px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    fontSize: "14px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  statCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px",
  },
  statLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  statValueGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  chartCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "24px",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  chartSubtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  chartArea: {
    height: "256px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "4px",
    marginBottom: "16px",
    padding: "16px",
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    textAlign: "left",
    padding: "12px 16px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  tableCell: {
    padding: "12px 16px",
  },
  resourceName: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  badge: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  dollarIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "16px",
  },
  chevronSmall: {
    fontSize: "14px",
  },
  chartHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  marginBottomL: {
    marginBottom: "24px",
  },
  chartBarsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    height: "100%",
  },
  barColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    height: "100%",
    width: "3%",
  },
  barInnerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    height: "100%",
  },
  barPink: { backgroundColor: "#FF6B9D" },
  barTeal: { backgroundColor: "#4FC3A7" },
  barBlue: { backgroundColor: "#0078D4" },
  barPurple: { backgroundColor: "#8B5CF6" },
  barGreen: { backgroundColor: "#10B981" },
  barGrey: { backgroundColor: tokens.colorNeutralBackground3 },
  h5: { height: "5%" },
  h10: { height: "10%" },
  h15: { height: "15%" },
  h20: { height: "20%" },
  h25: { height: "25%" },
  h30: { height: "30%" },
  h35: { height: "35%" },
  h40: { height: "40%" },
  h45: { height: "45%" },
  h50: { height: "50%" },
  h55: { height: "55%" },
  h60: { height: "60%" },
  h65: { height: "65%" },
  h70: { height: "70%" },
  h75: { height: "75%" },
  chartAxisLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginTop: "8px",
  },
  legendContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    fontSize: "14px",
    marginBottom: "24px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendDotBase: {
    width: "12px",
    height: "12px",
    borderRadius: "4px",
  },
  legendDotBlue: { backgroundColor: "#0078D4" },
  legendDotPink: { backgroundColor: "#FF6B9D" },
  legendDotTeal: { backgroundColor: "#4FC3A7" },
  legendDotPurple: { backgroundColor: "#8B5CF6" },
  legendDotGreen: { backgroundColor: "#10B981" },
  legendDotLightBlue: { backgroundColor: "#60A5FA" },
  legendDotOrange: { backgroundColor: "#F97316" },
  tableWrapper: {
    overflowX: "auto" as const,
  },
  tableCellFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tableCellText: {
    color: tokens.colorNeutralForeground1,
  },
  tableCellCost: {
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  chartFooter: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  viewCostButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorBrandForeground1,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  viewCostIcon: {
    width: "16px",
    height: "16px",
    backgroundColor: "#10B981",
    borderRadius: "4px",
  },
  viewCostText: {
    fontSize: "14px",
  },
});

interface CostManagementProps {
  experienceLevel?: "new" | "smb" | "enterprise";
}

// Pre-computed bar heights for deterministic chart rendering
const BAR_HEIGHTS: number[][] = [
  [20, 10, 25, 20, 30],
  [15, 10, 20, 20, 35],
  [25, 10, 30, 15, 25],
  [20, 15, 15, 25, 40],
  [20, 5, 30, 20, 30],
  [15, 10, 20, 20, 35],
  [25, 15, 20, 20, 25],
  [15, 10, 25, 20, 40],
  [20, 10, 30, 15, 30],
  [25, 10, 20, 25, 35],
  [20, 15, 15, 20, 25],
  [20, 10, 30, 20, 40],
  [15, 10, 20, 20, 30],
  [20, 5, 25, 15, 35],
];

const FUTURE_BAR_HEIGHTS: number[] = [
  40, 55, 65, 30, 70, 45, 60, 35, 50, 75, 40, 55, 25, 65, 50, 45,
];

const CostManagement = ({ experienceLevel = "new" }: CostManagementProps) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);

  const heightClass: Record<number, string> = {
    5: styles.h5,
    10: styles.h10,
    15: styles.h15,
    20: styles.h20,
    25: styles.h25,
    30: styles.h30,
    35: styles.h35,
    40: styles.h40,
    45: styles.h45,
    50: styles.h50,
    55: styles.h55,
    60: styles.h60,
    65: styles.h65,
    70: styles.h70,
    75: styles.h75,
  };

  const colorDotClass: Record<string, string> = {
    "#0078D4": styles.legendDotBlue,
    "#FF6B9D": styles.legendDotPink,
    "#4FC3A7": styles.legendDotTeal,
    "#8B5CF6": styles.legendDotPurple,
    "#10B981": styles.legendDotGreen,
    "#60A5FA": styles.legendDotLightBlue,
    "#F97316": styles.legendDotOrange,
  };

  const getSelectedScope = () => {
    switch (experienceLevel) {
      case "new":
        return "Azure subscription 1";
      case "smb":
        return "All subscriptions";
      case "enterprise":
        return "Business Apps";
      default:
        return "Azure subscription 1";
    }
  };

  const getScopeOptions = () => {
    switch (experienceLevel) {
      case "new":
        return ["Azure subscription 1", "Pay-As-You-Go"];
      case "smb":
        return [
          "All subscriptions",
          "Auth Service Non-Prod",
          "Auth Service Prod",
          "Payment Service Non-Prod",
          "Payment Service Prod",
          "Contoso Infra",
        ];
      case "enterprise":
        return [
          "All service groups",
          "Business Apps",
          "Authentication Service",
          "Payment Service",
          "Infrastructure Services",
        ];
      default:
        return [];
    }
  };

  const [selectedScope, setSelectedScope] = useState(getSelectedScope());

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav activeLink="Manage" />

        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Button
                appearance="subtle"
                icon={<ChevronLeft20Regular />}
                onClick={() => handlePageChange("manage-content-2")}
                title="Back to Manage"
                className={styles.backButton}
              />
              <div className={styles.titleIcon}>
                <span className={styles.dollarIcon}>$</span>
              </div>
              <div>
                <h1 className={styles.titleText}>Cost management | Overview</h1>
                <div className={styles.scopeText}>
                  Scope:
                  <div className={styles.dropdown}>
                    <button
                      className={styles.dropdownButton}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <span>{selectedScope}</span>
                      <ChevronDown24Regular className={styles.chevronSmall} />
                    </button>
                    {showDropdown && (
                      <div className={styles.dropdownContent}>
                        {getScopeOptions().map((option) => (
                          <div
                            key={option}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setSelectedScope(option);
                              setShowDropdown(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconButton} title="Pin">
                <Pin20Regular />
              </button>
              <button className={styles.iconButton} title="Refresh">
                <ArrowClockwise20Regular />
              </button>
              <button className={styles.iconButton} title="More">
                <MoreHorizontal20Regular />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.sidebar}>
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
              />
            </div>

            <div className={styles.navSection}>
              <div className={`${styles.navItem} ${styles.navItemActive}`}>
                Overview
              </div>
              <div className={styles.navItem}>Cost analysis</div>
              <div className={styles.navItem}>Budgets</div>
              <div className={styles.navItem}>Alerts</div>
              <div className={styles.navItem}>New support request</div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.contentArea}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h4 className={styles.statLabel}>
                    Starting free trial credits
                  </h4>
                  <div className={styles.statValue}>$200.00</div>
                </div>
                <div className={styles.statCard}>
                  <h4 className={styles.statLabel}>Costs incurred</h4>
                  <div className={styles.statValue}>$43.00</div>
                </div>
                <div className={styles.statCard}>
                  <h4 className={styles.statLabel}>Available credits</h4>
                  <div
                    className={`${styles.statValue} ${styles.statValueGreen}`}
                  >
                    $157.00
                  </div>
                </div>
              </div>

              <div className={styles.chartCard}>
                <div className={styles.chartHeaderRow}>
                  <div>
                    <h3 className={styles.chartTitle}>Cost by resource</h3>
                    <p className={styles.chartSubtitle}>
                      Last updated 8/16/25, 11:59AM
                    </p>
                  </div>
                </div>

                <div
                  className={mergeClasses(
                    styles.statsGrid,
                    styles.marginBottomL,
                  )}
                >
                  <div>
                    <h4 className={styles.statLabel}>Costs incurred</h4>
                    <div className={styles.statValue}>$80.00</div>
                  </div>
                  <div>
                    <h4 className={styles.statLabel}>Total resources</h4>
                    <div className={styles.statValue}>7</div>
                  </div>
                  <div>
                    <h4 className={styles.statLabel}>Free services</h4>
                    <div className={styles.statValue}>4</div>
                  </div>
                </div>

                {/* Stacked bar chart */}
                <div className={styles.chartArea}>
                  <div className={styles.chartBarsContainer}>
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className={styles.barColumn}>
                        {i < 14 ? (
                          <div className={styles.barInnerColumn}>
                            <div
                              className={mergeClasses(
                                styles.barPink,
                                heightClass[BAR_HEIGHTS[i][0]],
                              )}
                            ></div>
                            <div
                              className={mergeClasses(
                                styles.barTeal,
                                heightClass[BAR_HEIGHTS[i][1]],
                              )}
                            ></div>
                            <div
                              className={mergeClasses(
                                styles.barBlue,
                                heightClass[BAR_HEIGHTS[i][2]],
                              )}
                            ></div>
                            <div
                              className={mergeClasses(
                                styles.barPurple,
                                heightClass[BAR_HEIGHTS[i][3]],
                              )}
                            ></div>
                            <div
                              className={mergeClasses(
                                styles.barGreen,
                                heightClass[BAR_HEIGHTS[i][4]],
                              )}
                            ></div>
                          </div>
                        ) : (
                          <div
                            className={mergeClasses(
                              styles.barGrey,
                              heightClass[FUTURE_BAR_HEIGHTS[i - 14]],
                            )}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className={styles.chartAxisLabels}>
                    <span>Aug 1</span>
                    <span>Aug 7</span>
                    <span>Aug 14</span>
                    <span>Aug 21</span>
                    <span>Aug 30</span>
                  </div>
                </div>

                <div className={styles.legendContainer}>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotBlue,
                      )}
                    ></div>
                    <span>sqldb-core</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotPink,
                      )}
                    ></div>
                    <span>webapp-prod</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotTeal,
                      )}
                    ></div>
                    <span>monitor-agent</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotPurple,
                      )}
                    ></div>
                    <span>storage-free</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotGreen,
                      )}
                    ></div>
                    <span>insights-free</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotLightBlue,
                      )}
                    ></div>
                    <span>functions-free</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div
                      className={mergeClasses(
                        styles.legendDotBase,
                        styles.legendDotOrange,
                      )}
                    ></div>
                    <span>cdn-free</span>
                  </div>
                </div>

                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Service family</th>
                        <th className={styles.tableHeader}>Type</th>
                        <th className={styles.tableHeader}>Resource group</th>
                        <th className={styles.tableHeader}>Location</th>
                        <th className={styles.tableHeader}>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "sqldb-core",
                          family: "Databases",
                          type: "Azure SQL Database",
                          group: "rg-data",
                          location: "East US",
                          cost: "$35.00",
                          color: "#0078D4", // Azure blue
                        },
                        {
                          name: "webapp-prod",
                          family: "Compute",
                          type: "App Services",
                          group: "rg-webapp",
                          location: "East US",
                          cost: "$25.00",
                          color: "#FF6B9D", // Azure pink
                        },
                        {
                          name: "monitor-agent",
                          family: "Monitoring & Mgmt",
                          type: "Azure Monitor",
                          group: "rg-monitoring",
                          location: "East US",
                          cost: "$20.00",
                          color: "#4FC3A7", // Azure teal
                        },
                        {
                          name: "storage-free",
                          family: "Storage",
                          type: "Azure Storage (Blob)",
                          group: "rg-assets",
                          location: "East US",
                          cost: "$0.00",
                          color: "#8B5CF6", // Azure purple
                          badge: "Active free tier",
                        },
                        {
                          name: "insights-free",
                          family: "Monitoring & Mgmt",
                          type: "Application Insights",
                          group: "rg-monitoring",
                          location: "East US",
                          cost: "$0.00",
                          color: "#10B981", // Azure green
                          badge: "Active free tier",
                        },
                        {
                          name: "functions-free",
                          family: "Compute",
                          type: "Azure Functions",
                          group: "rg-webapp",
                          location: "East US",
                          cost: "$0.00",
                          color: "#60A5FA", // Azure light blue
                          badge: "Active free tier",
                        },
                        {
                          name: "cdn-free",
                          family: "Networking",
                          type: "Azure CDN",
                          group: "rg-assets",
                          location: "East US",
                          cost: "$0.00",
                          color: "#F97316", // Azure orange
                          badge: "Active free tier",
                        },
                      ].map((resource, i) => (
                        <tr key={i} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            <div className={styles.tableCellFlex}>
                              <div
                                className={mergeClasses(
                                  styles.legendDotBase,
                                  colorDotClass[resource.color],
                                )}
                              ></div>
                              <span
                                className={styles.resourceName}
                                onClick={
                                  i === 0
                                    ? () => handlePageChange("resource-page-2")
                                    : undefined
                                }
                              >
                                {resource.name}
                              </span>
                              {resource.badge && (
                                <span className={styles.badge}>
                                  {resource.badge}
                                </span>
                              )}
                            </div>
                          </td>
                          <td
                            className={mergeClasses(
                              styles.tableCell,
                              styles.tableCellText,
                            )}
                          >
                            {resource.family}
                          </td>
                          <td
                            className={mergeClasses(
                              styles.tableCell,
                              styles.tableCellText,
                            )}
                          >
                            {resource.type}
                          </td>
                          <td
                            className={mergeClasses(
                              styles.tableCell,
                              styles.tableCellText,
                            )}
                          >
                            {resource.group}
                          </td>
                          <td
                            className={mergeClasses(
                              styles.tableCell,
                              styles.tableCellText,
                            )}
                          >
                            {resource.location}
                          </td>
                          <td
                            className={mergeClasses(
                              styles.tableCell,
                              styles.tableCellCost,
                            )}
                          >
                            {resource.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={styles.chartFooter}>
                  <button className={styles.viewCostButton}>
                    <div className={styles.viewCostIcon}></div>
                    <span className={styles.viewCostText}>
                      View in Cost analysis
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default CostManagement;
