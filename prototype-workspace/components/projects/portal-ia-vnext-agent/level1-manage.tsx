"use client";
import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
  Button as FluentButton,
  Text,
  webLightTheme,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Search24Regular,
  Document24Regular,
  Cube24Regular,
  FolderOpen24Regular,
  Clock24Regular,
  Database24Regular,
  Layer24Regular,
  QuestionCircle24Regular,
  ChevronDown24Regular,
  Settings24Regular,
  Warning24Regular,
  Calendar24Regular,
  BookOpen24Regular,
  Shield24Regular,
  Money24Regular,
  Organization24Regular,
  ShieldError24Regular,
  CalendarClock24Regular,
  Globe24Regular,
  Apps24Filled,
  Add24Regular,
  Bot24Regular,
  DataUsage24Regular,
  ChatSparkle20Regular,
  Send16Regular,
} from "@fluentui/react-icons";
import { TopNav } from "../../shared/top-nav";
import { useNavigation } from "../../../lib/navigation-context";
import { useState } from "react";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";
import CanvasFooter from "../vnext-agent/shared/canvas-footer";

const COLORS = {
  green: tokens.colorPaletteGreenForeground1,
  orange: tokens.colorPaletteYellowForeground1,
} as const;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
    padding: "48px 32px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
    },
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: "0",
    marginTop: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    zIndex: 1000,
    minWidth: "220px",
    maxHeight: "320px",
    overflow: "auto",
  },
  dropdownItemParent: {
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.15s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  dropdownItemChild: {
    padding: "8px 12px 8px 28px",
    cursor: "pointer",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    transition: "background-color 0.15s ease",
    borderLeft: `2px solid ${tokens.colorNeutralStroke2}`,
    marginLeft: "12px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
      color: tokens.colorNeutralForeground1,
    },
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "8px 8px 8px 16px",
    maxWidth: "768px",
    marginLeft: "0",
    marginRight: "auto",
    marginBottom: "32px",
    transition: "all 0.2s ease",
    height: "48px",
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    margin: "0 8px",
  },
  searchInput: {
    flex: 1,
    padding: "8px 16px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
  },
  copilotButton: {
    borderRadius: "24px",
    marginLeft: "-4px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
    border: "1px solid transparent",
    position: "relative",
  },
  topActionsSection: {
    marginBottom: "32px",
  },
  topActionsTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  topActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  topActionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  projectOverview: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    marginTop: "24px",
  },
  projectTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  azureSolutionsTabs: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  azureSolutionsTab: {
    padding: "8px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  azureSolutionsTabActive: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
  },
  topologyView: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "40px",
    minHeight: "400px",
    position: "relative",
    overflow: "hidden",
    marginBottom: "24px",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  projectCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  addServiceGroupCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
  },
  addServiceGroupIcon: {
    fontSize: "32px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
  },
  addServiceGroupText: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  topActionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "140px",
  },
  topActionCardContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
  },
  topActionCardIcon: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
    marginTop: "2px",
  },
  topActionCardText: {
    flex: 1,
  },
  topActionCardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.3",
    marginBottom: "0",
  },
  topActionButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: tokens.fontWeightMedium,
    transition: "all 0.2s ease",
  },
  topActionButtonPrimary: {
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    marginTop: "auto",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
  },
  topActionButtonSecondary: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  outlineButton: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    width: "fit-content",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
  },
  actionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "48px",
    marginTop: "24px",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  actionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  cardIcon: {
    width: "32px",
    height: "32px",
    color: tokens.colorBrandForeground1,
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  cardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  resourcesTabs: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTab: {
    padding: "8px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  resourcesTabActive: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
  },
  resourcesTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  resourcesTableHeader: {
    textAlign: "left",
    padding: "12px 0",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTableCell: {
    padding: "12px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  healthSummaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  healthSummaryItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
  },
  healthSummaryValue: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
  },
  healthSummaryLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  // Insight card styles
  insightCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  },
  insightCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  insightCardIconContainer: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insightCardIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
  },
  insightCardTitle: {
    fontSize: "20px",
    fontWeight: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralForeground1,
  },
  insightCardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  insightAdoSection: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  insightAdoHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  insightAdoItem: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  insightAdoTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  insightAdoLink: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    ":hover": {
      color: tokens.colorNeutralForeground1,
      textDecoration: "underline",
    },
  },
  insightAdoDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  insightAdoDetailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  insightAdoDetailLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  insightAdoDetailValue: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  insightAvatar: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "white",
    fontWeight: tokens.fontWeightSemibold,
  },
  insightCardActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  insightActionButton: {
    borderRadius: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "translateY(-1px)",
    },
  },
  // --- Layout helpers ---
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "32px",
  },
  twoColumnGridNoMargin: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  sectionMarginBottom: {
    marginBottom: "32px",
  },
  marginTopAuto: {
    marginTop: "auto",
  },
  marginTop24: {
    marginTop: "24px",
  },
  textAlignLeft: {
    textAlign: "left",
  },
  flexOne: {
    flex: 1,
  },

  // --- Section headers ---
  sectionHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  sectionTitle16: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  sectionTitleLarge: {
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  sectionTitleLargeMb20: {
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "20px",
  },

  // --- Icon sizing ---
  iconSmall14: {
    fontSize: "14px",
  },
  iconHelp16: {
    color: tokens.colorNeutralForeground3,
    fontSize: "16px",
  },
  iconHelp12: {
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
  },

  // --- Infrastructure agent button ---
  infrastructureAgentButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    border: "1px solid transparent",
    borderRadius: "4px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #0078D4, #8B5CF6) border-box",
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "normal",
    marginTop: "auto",
    width: "fit-content",
    transition: "all 0.3s ease",
  },

  // --- Donut chart ---
  chartRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  donutChartContainer: {
    position: "relative",
    width: "120px",
    height: "120px",
  },
  donutChartOuter: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    position: "relative",
  },
  donutGradientUpdate: {
    background:
      "conic-gradient(#10b981 0deg 270deg, #f59e0b 270deg 285deg, #dc2626 285deg 300deg, #6b7280 300deg 360deg)",
  },
  donutGradientPatch: {
    background:
      "conic-gradient(#0078d4 0deg 270deg, #10b981 270deg 285deg, #6b7280 285deg 300deg, #f59e0b 300deg 360deg)",
  },
  donutChartCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60px",
    height: "60px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  donutChartValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: tokens.colorNeutralForeground1,
  },
  donutChartLabel: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground2,
  },

  // --- Legend ---
  legendList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendIndicator: {
    width: "3px",
    height: "16px",
  },
  legendIndicatorRed: { backgroundColor: tokens.colorPaletteRedForeground1 },
  legendIndicatorGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  legendIndicatorAmber: {
    backgroundColor: tokens.colorPaletteYellowForeground1,
  },
  legendIndicatorGray: { backgroundColor: tokens.colorNeutralForeground3 },
  legendIndicatorBrand: { backgroundColor: tokens.colorBrandForeground1 },
  legendText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  legendValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginLeft: "auto",
  },
  legendTextBrand: { fontSize: "14px", color: tokens.colorBrandForeground1 },
  legendTextGreen: {
    fontSize: "14px",
    color: tokens.colorPaletteGreenForeground1,
  },
  legendTextRed: { fontSize: "14px", color: tokens.colorPaletteRedForeground1 },
  legendTextAmber: {
    fontSize: "14px",
    color: tokens.colorPaletteYellowForeground1,
  },
  legendValueBrand: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorBrandForeground1,
    marginLeft: "auto",
  },
  legendValueGreen: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorPaletteGreenForeground1,
    marginLeft: "auto",
  },
  legendValueRed: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorPaletteRedForeground1,
    marginLeft: "auto",
  },
  legendValueAmber: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorPaletteYellowForeground2,
    marginLeft: "auto",
  },

  // --- Recommendations ---
  recommendationRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  recommendationBadge: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  recommendationBadgeIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
  },
  recommendationTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  recommendationDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginTop: "4px",
  },

  // --- Cost overview ---
  costGrid: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "20px",
  },
  costColumn: {
    textAlign: "left" as "left",
    flex: 1,
  },
  costLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: "12px",
    marginBottom: "4px",
  },
  costValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  costValueGreen: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorPaletteGreenForeground1,
  },
  costLink: {
    color: tokens.colorBrandForeground1,
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer",
  },

  // --- Resource table ---
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  resourceIcon: {
    color: tokens.colorBrandForeground1,
  },
  resourceNameLink: {
    color: tokens.colorBrandForeground1,
  },
  resourceCostCell: {
    color: tokens.colorBrandForeground1,
  },

  // --- Service group cards ---
  serviceGroupHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  serviceGroupIcon: {
    fontSize: "20px",
    color: tokens.colorBrandForeground1,
  },
  serviceGroupName: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  serviceGroupMembers: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
  },
  serviceGroupStatusRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "12px",
  },
  serviceGroupStatusItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  healthDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  healthDotGreen: { backgroundColor: tokens.colorPaletteGreenForeground1 },
  healthDotOrange: { backgroundColor: tokens.colorPaletteYellowForeground2 },
  statusText: {
    color: tokens.colorNeutralForeground3,
  },
  statusIconGreen: {
    fontSize: "16px",
    color: tokens.colorPaletteGreenForeground1,
  },
  statusIconRed: {
    fontSize: "16px",
    color: tokens.colorPaletteRedForeground1,
  },

  // --- Empty state ---
  emptyStateNewWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "300px",
  },
  emptyStateContent: {
    padding: "40px",
    textAlign: "center" as "center",
    color: tokens.colorNeutralForeground2,
    maxWidth: "500px",
  },
  emptyStateTitle: {
    fontSize: "16px",
    marginBottom: "12px",
    fontWeight: tokens.fontWeightSemibold,
  },
  emptyStateDescription: {
    fontSize: "14px",
  },

  // --- Architecture shared ---
  architectureContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  svgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
  },

  // --- Architecture new tier ---
  architectureLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: "0 60px",
    position: "relative",
    zIndex: 2,
  },
  architectureNodeColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  architectureNodeBox: {
    width: "80px",
    height: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  architectureNodeBoxBrand: {
    border: `2px solid ${tokens.colorBrandBackground}`,
  },
  architectureNodeBoxNeutral: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  architectureNodeLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  architectureNodeSublabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },

  // --- Architecture SMB ---
  smbArchContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  serviceColumnLeft: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 2,
  },
  serviceColumnRight: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 2,
  },
  serviceItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
  },
  serviceItemRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
    justifyContent: "flex-end",
  },
  serviceDot8: {
    width: "8px",
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "50%",
  },
  hubNode: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    height: "100px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `2px solid ${tokens.colorBrandForeground1}`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    zIndex: 2,
  },

  // --- Architecture Enterprise ---
  enterpriseServiceColumnLeft: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    zIndex: 2,
  },
  enterpriseServiceColumnRight: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    zIndex: 2,
  },
  enterpriseServiceItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: tokens.colorNeutralForeground1,
  },
  enterpriseServiceItemRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: tokens.colorNeutralForeground1,
    justifyContent: "flex-end",
  },
  serviceDot6: {
    width: "6px",
    height: "6px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "50%",
  },
  enterpriseGrid: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    zIndex: 2,
  },
  gridNode: {
    width: "20px",
    height: "20px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "50%",
    opacity: 0.7,
  },
  gridNodeCenter: {
    width: "20px",
    height: "20px",
    backgroundColor: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "50%",
    opacity: 1,
  },
});

interface Level1ManageProps {
  experienceLevel?: "new" | "smb" | "enterprise";
  onBack?: () => void;
}

const Level1ManageContent = ({ experienceLevel }: Level1ManageProps) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();

  const getSelectedOption = () => {
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

  const getDropdownOptions = () => {
    switch (experienceLevel) {
      case "new":
        return [
          { type: "parent", label: "Azure subscription 1" },
          { type: "parent", label: "Pay-As-You-Go" },
        ];
      case "smb":
        return [
          { type: "parent", label: "All subscriptions" },
          { type: "parent", label: "Auth Service Non-Prod" },
          { type: "parent", label: "Auth Service Prod" },
          { type: "parent", label: "Payment Service Non-Prod" },
          { type: "parent", label: "Payment Service Prod" },
          { type: "parent", label: "Contoso Infra" },
        ];
      case "enterprise":
        return [
          { type: "parent", label: "All service groups" },
          { type: "child", label: "Business Apps" },
          { type: "child", label: "Authentication Service" },
          { type: "child", label: "Payment Service" },
          { type: "child", label: "Infrastructure Services" },
        ];
      default:
        return [];
    }
  };

  const getHealthMetrics = () => {
    switch (experienceLevel) {
      case "new":
        return {
          healthy: 3,
          warning: 1,
          critical: 0,
          totalResources: 4,
          uptime: "99.2%",
          alerts: 1,
        };
      case "smb":
        return {
          healthy: 24,
          warning: 3,
          critical: 1,
          totalResources: 28,
          uptime: "99.8%",
          alerts: 4,
        };
      case "enterprise":
        return {
          healthy: 847,
          warning: 23,
          critical: 5,
          totalResources: 875,
          uptime: "99.95%",
          alerts: 28,
        };
      default:
        return {
          healthy: 3,
          warning: 1,
          critical: 0,
          totalResources: 4,
          uptime: "99.2%",
          alerts: 1,
        };
    }
  };

  const getActionCards = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            icon: <BookOpen24Regular />,
            title:
              "Complete your first deployment tutorial and learn Azure basics",
            buttonText: "Learn",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
          },
          {
            icon: <Shield24Regular />,
            title: "Enable basic security features for your test resources",
            buttonText: "Secure",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #10b981)",
          },
          {
            icon: <Money24Regular />,
            title:
              "Set up spending alerts to stay within your free tier limits",
            buttonText: "Setup",
            buttonStyle: "secondary",
            gradient: "linear-gradient(to bottom, #0078d4, #06b6d4)",
          },
        ];
      case "smb":
        return [
          {
            icon: <Settings24Regular />,
            title:
              "12 resources have configuration drift from baseline policies",
            buttonText: "Fix configurations",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
            isInfrastructureAgent: true,
          },
          {
            icon: <Warning24Regular />,
            title:
              "4 security recommendations need attention across your resources",
            buttonText: "Open troubleshooting agent",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #10b981)",
            isInfrastructureAgent: true,
          },
          {
            icon: <Money24Regular />,
            title:
              "Optimize spending: $600/mo savings identified across 3 resources",
            buttonText: "Review savings",
            buttonStyle: "secondary",
            gradient: "linear-gradient(to bottom, #0078d4, #06b6d4)",
          },
        ];
      case "enterprise":
        return [
          {
            icon: <Bot24Regular />,
            title:
              "Payment Service group has 12 non-compliant resources affecting SLA",
            buttonText: "Open service group agent",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
            isInfrastructureAgent: true,
          },
          {
            icon: <ShieldError24Regular />,
            title:
              "28 critical security alerts across Business Apps and Infrastructure service groups",
            buttonText: "Open security agent",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #10b981)",
            isInfrastructureAgent: true,
          },
          {
            icon: <DataUsage24Regular />,
            title:
              "Global-web-platform service group consuming 40% over budget this month",
            buttonText: "Analyze costs",
            buttonStyle: "secondary",
            gradient: "linear-gradient(to bottom, #0078d4, #06b6d4)",
          },
        ];
      default:
        return [];
    }
  };

  const getResourcesData = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            name: "My First Web App",
            type: "App Service",
            alerts: 0,
            cost: "$2.45",
            lastViewed: "November 15, 2024",
            icon: <Document24Regular />,
          },
          {
            name: "test-storage",
            type: "Storage Account",
            alerts: 0,
            cost: "$0.12",
            lastViewed: "November 14, 2024",
            icon: <Layer24Regular />,
          },
          {
            name: "learning-db",
            type: "SQL Database",
            alerts: 1,
            cost: "$8.90",
            lastViewed: "November 13, 2024",
            icon: <Database24Regular />,
          },
          {
            name: "test-rg",
            type: "Resource Group",
            alerts: 0,
            cost: "$0.98",
            lastViewed: "November 12, 2024",
            icon: <FolderOpen24Regular />,
          },
        ];
      case "smb":
        return [
          {
            name: "Production Web Portal",
            type: "App Service",
            alerts: 1,
            cost: "$245.60",
            lastViewed: "November 15, 2024",
            icon: <Document24Regular />,
          },
          {
            name: "CustomerDB-Prod",
            type: "SQL Database",
            alerts: 0,
            cost: "$420.30",
            lastViewed: "November 15, 2024",
            icon: <Database24Regular />,
          },
          {
            name: "backup-storage-prod",
            type: "Storage Account",
            alerts: 0,
            cost: "$89.45",
            lastViewed: "November 14, 2024",
            icon: <Layer24Regular />,
          },
          {
            name: "production-vm-cluster",
            type: "Virtual Machine",
            alerts: 2,
            cost: "$340.20",
            lastViewed: "November 13, 2024",
            icon: <Cube24Regular />,
          },
          {
            name: "production-rg",
            type: "Resource Group",
            alerts: 1,
            cost: "$144.45",
            lastViewed: "November 12, 2024",
            icon: <FolderOpen24Regular />,
          },
        ];
      case "enterprise":
        return [
          {
            name: "Global-Customer-Portal",
            type: "App Service",
            alerts: 3,
            cost: "$8,450.00",
            lastViewed: "November 15, 2024",
            icon: <Document24Regular />,
          },
          {
            name: "Enterprise-DataWarehouse",
            type: "Synapse Analytics",
            alerts: 1,
            cost: "$12,340.50",
            lastViewed: "November 15, 2024",
            icon: <Database24Regular />,
          },
          {
            name: "Global-CDN-Premium",
            type: "CDN Profile",
            alerts: 0,
            cost: "$3,240.80",
            lastViewed: "November 14, 2024",
            icon: <Globe24Regular />,
          },
          {
            name: "AKS-Production-Cluster",
            type: "Kubernetes Service",
            alerts: 5,
            cost: "$6,890.20",
            lastViewed: "November 14, 2024",
            icon: <Cube24Regular />,
          },
          {
            name: "Enterprise-Backup-Vault",
            type: "Recovery Services",
            alerts: 0,
            cost: "$2,140.30",
            lastViewed: "November 13, 2024",
            icon: <Layer24Regular />,
          },
        ];
      default:
        return [];
    }
  };

  const getMachineCount = () => {
    switch (experienceLevel) {
      case "new":
        return 3;
      case "smb":
        return 12;
      case "enterprise":
        return 80;
      default:
        return 3;
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] =
    useState("Business Apps");
  const [selectedScope, setSelectedScope] = useState("All subscriptions");
  const [selectedTenant, setSelectedTenant] = useState(getSelectedOption());
  const [solutionGrouping, setSolutionGrouping] = useState<
    "resources" | "service-groups" | "architecture"
  >(experienceLevel === "new" ? "resources" : "service-groups");
  const dropdownOptions = getDropdownOptions();
  const healthMetrics = getHealthMetrics();
  const actionCards = getActionCards();
  const resourcesData = getResourcesData();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav activeLink="Manage" experienceLevel={experienceLevel} />

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              Manage
            </Text>
            {experienceLevel !== "new" && (
              <div className={styles.headerRight}>
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownButton}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>{getSelectedOption()}</span>
                    <ChevronDown24Regular className={styles.iconSmall14} />
                  </div>
                  {showDropdown && (
                    <div className={styles.dropdownContent}>
                      {dropdownOptions.map((option, index) => (
                        <div
                          key={index}
                          className={
                            option.type === "parent"
                              ? styles.dropdownItemParent
                              : styles.dropdownItemChild
                          }
                          onClick={() => {
                            if (
                              experienceLevel === "enterprise" &&
                              option.type === "child"
                            ) {
                              setSelectedServiceGroup(option.label);
                            }
                            setShowDropdown(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Second dropdown for Enterprise - Scope */}
                {experienceLevel === "enterprise" && (
                  <div className={styles.dropdown}>
                    <div
                      className={styles.dropdownButton}
                      onClick={() => setShowScopeDropdown(!showScopeDropdown)}
                    >
                      <span>{selectedScope}</span>
                      <ChevronDown24Regular className={styles.iconSmall14} />
                    </div>
                    {showScopeDropdown && (
                      <div className={styles.dropdownContent}>
                        {[
                          { label: "All subscriptions" },
                          { label: "Production only" },
                          { label: "Non-Production only" },
                          { label: "Auth Service Prod" },
                          { label: "Payment Service Prod" },
                        ].map((option, index) => (
                          <div
                            key={index}
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedScope(option.label);
                              setShowScopeDropdown(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Removed search bar - using CanvasFooter instead */}

          <div className={styles.topActionsSection}>
            <div className={styles.topActionsTitle}>Top actions</div>
            <div className={styles.topActionCards}>
              {actionCards.map((card, index) => (
                <div key={index} className={styles.topActionCard}>
                  <div className={styles.topActionCardContent}>
                    <div className={styles.topActionCardText}>
                      <div className={styles.topActionCardTitle}>
                        {card.title}
                      </div>
                    </div>
                  </div>
                  {(card as any).isInfrastructureAgent ? (
                    <button
                      className={styles.infrastructureAgentButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(white, white) padding-box, linear-gradient(90deg, #8B5CF6, #0078D4, #3FC150) border-box";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(white, white) padding-box, linear-gradient(90deg, #0078D4, #8B5CF6) border-box";
                      }}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        width={16}
                        height={16}
                      />
                      {card.buttonText}
                    </button>
                  ) : (
                    <FluentButton
                      appearance="outline"
                      className={mergeClasses(
                        styles.outlineButton,
                        styles.marginTopAuto,
                      )}
                    >
                      {card.buttonText}
                    </FluentButton>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.twoColumnGrid}>
            {/* Insight Card - NSG Rule Issue */}
            <div className={styles.insightCard}>
              <div className={styles.insightCardHeader}>
                <div className={styles.insightCardIconContainer}>
                  <ChatSparkle20Regular className={styles.insightCardIcon} />
                </div>
                <div className={styles.insightCardTitle}>
                  Change an NSG rule causing Sev1 alerts using a CLI command
                </div>
              </div>
              <div className={styles.insightCardDescription}>
                After a Sev1 alert occurred on BackendVM4, I found that 90% of
                failure anomalies in contoso-ai-app were due to a blocked port
                caused by a newly implemented SecurityTeamHTTPBlock rule.
              </div>

              <div className={styles.insightAdoSection}>
                <div className={styles.insightAdoHeader}>
                  <div className={styles.insightAdoItem}>ADO item 31245</div>
                  <a className={styles.insightAdoLink}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V5C2.5 4.44772 2.94772 4 3.5 4H7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 2.5H13.5V6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 2.5L8 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>View in Azure DevOps</span>
                  </a>
                </div>
                <div className={styles.insightAdoTitle}>
                  Block port 80 on all non-prod environments
                </div>
                <div className={styles.insightAdoDetails}>
                  <div className={styles.insightAdoDetailItem}>
                    <div className={styles.insightAdoDetailLabel}>
                      Implemented by
                    </div>
                    <div className={styles.insightAdoDetailValue}>
                      <div className={styles.insightAvatar}>CW</div>
                      <span>Charlotte Walston</span>
                    </div>
                  </div>
                  <div className={styles.insightAdoDetailItem}>
                    <div className={styles.insightAdoDetailLabel}>
                      Date added
                    </div>
                    <div className={styles.insightAdoDetailValue}>
                      <span>Today at 11:10 AM</span>
                    </div>
                  </div>
                  <div className={styles.insightAdoDetailItem}>
                    <div className={styles.insightAdoDetailLabel}>
                      Proposed action
                    </div>
                    <div className={styles.insightAdoDetailValue}>
                      <span>Agent fix using CLI command</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.insightCardActions}>
                <button
                  className={styles.insightActionButton}
                  onClick={() => console.log("Change NSG rule")}
                >
                  <span>Change the NSG rule for me</span>
                  <Send16Regular />
                </button>
                <button
                  className={styles.insightActionButton}
                  onClick={() => console.log("Explain investigation")}
                >
                  <span>Explain details of the investigation</span>
                  <Send16Regular />
                </button>
              </div>
            </div>
          </div>

          {/* Update Management Section */}
          <div className={styles.sectionMarginBottom}>
            <div className={styles.twoColumnGridNoMargin}>
              {/* Update status of machines */}
              <div className={styles.actionCard}>
                <div className={styles.sectionHeaderRow}>
                  <span className={styles.sectionTitle16}>
                    Update status of machines
                  </span>
                  <QuestionCircle24Regular className={styles.iconHelp16} />
                </div>

                <div className={styles.chartRow}>
                  {/* Donut chart placeholder */}
                  <div className={styles.donutChartContainer}>
                    <div
                      className={mergeClasses(
                        styles.donutChartOuter,
                        styles.donutGradientUpdate,
                      )}
                    >
                      <div className={styles.donutChartCenter}>
                        <div className={styles.donutChartValue}>
                          {getMachineCount()}
                        </div>
                        <div className={styles.donutChartLabel}>Machines</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.flexOne}>
                    <div className={styles.legendList}>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorRed,
                          )}
                        ></div>
                        <span className={styles.legendText}>
                          Pending updates
                        </span>
                        <span className={styles.legendValue}>2</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorGreen,
                          )}
                        ></div>
                        <span className={styles.legendText}>
                          No Pending updates
                        </span>
                        <span className={styles.legendValue}>75</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorAmber,
                          )}
                        ></div>
                        <span className={styles.legendText}>
                          Pending reboot
                        </span>
                        <span className={styles.legendValue}>3</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorGreen,
                          )}
                        ></div>
                        <span className={styles.legendText}>
                          No update data
                        </span>
                        <span className={styles.legendValue}>0</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorGray,
                          )}
                        ></div>
                        <span className={styles.legendText}>Unsupported</span>
                        <span className={styles.legendValue}>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patch orchestration configuration */}
              <div className={styles.actionCard}>
                <div className={styles.sectionHeaderRow}>
                  <span className={styles.sectionTitle16}>
                    Patch orchestration configuration of Azure virtual machines
                  </span>
                  <QuestionCircle24Regular className={styles.iconHelp16} />
                </div>

                <div className={styles.chartRow}>
                  {/* Donut chart placeholder */}
                  <div className={styles.donutChartContainer}>
                    <div
                      className={mergeClasses(
                        styles.donutChartOuter,
                        styles.donutGradientPatch,
                      )}
                    >
                      <div className={styles.donutChartCenter}>
                        <div className={styles.donutChartValue}>
                          {getMachineCount()}
                        </div>
                        <div className={styles.donutChartLabel}>Machines</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.flexOne}>
                    <div className={styles.legendList}>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorBrand,
                          )}
                        ></div>
                        <span className={styles.legendTextBrand}>
                          Customer managed sc...
                        </span>
                        <QuestionCircle24Regular
                          className={styles.iconHelp12}
                        />
                        <span className={styles.legendValueBrand}>75</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorGreen,
                          )}
                        ></div>
                        <span className={styles.legendTextGreen}>
                          Image default
                        </span>
                        <QuestionCircle24Regular
                          className={styles.iconHelp12}
                        />
                        <span className={styles.legendValueGreen}>3</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorRed,
                          )}
                        ></div>
                        <span className={styles.legendTextRed}>
                          Azure orchestrated
                        </span>
                        <QuestionCircle24Regular
                          className={styles.iconHelp12}
                        />
                        <span className={styles.legendValueRed}>0</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorBrand,
                          )}
                        ></div>
                        <span className={styles.legendTextBrand}>
                          Manual updates
                        </span>
                        <QuestionCircle24Regular
                          className={styles.iconHelp12}
                        />
                        <span className={styles.legendValueBrand}>2</span>
                      </div>
                      <div className={styles.legendRow}>
                        <div
                          className={mergeClasses(
                            styles.legendIndicator,
                            styles.legendIndicatorAmber,
                          )}
                        ></div>
                        <span className={styles.legendTextAmber}>
                          Windows automatic update
                        </span>
                        <QuestionCircle24Regular
                          className={styles.iconHelp12}
                        />
                        <span className={styles.legendValueAmber}>2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations and maintenance */}
          <div className={styles.twoColumnGrid}>
            <div className={styles.actionCard}>
              <div className={styles.sectionTitleLarge}>
                Recommendations summary
              </div>

              <div className={styles.recommendationRow}>
                <div className={styles.recommendationBadge}>
                  <QuestionCircle24Regular
                    className={styles.recommendationBadgeIcon}
                  />
                </div>
                <div>
                  <div className={styles.recommendationTitle}>
                    Improve your observability strategy
                  </div>
                  <div className={styles.recommendationDescription}>
                    by acting on 3 high impact recommendations affecting 33
                    (33%) of your resources
                  </div>
                </div>
              </div>

              <div className={styles.marginTop24}>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                >
                  View observability recommendations
                </FluentButton>
              </div>
            </div>

            {/* Cost Overview */}
            <div className={styles.actionCard}>
              <div className={styles.sectionTitleLargeMb20}>Cost Overview</div>

              <div className={styles.costGrid}>
                <div className={styles.costColumn}>
                  <div className={styles.costLabel}>
                    {experienceLevel === "new"
                      ? "Starting free trial credits"
                      : experienceLevel === "smb"
                        ? "Monthly budget"
                        : "Quarterly budget"}
                  </div>
                  <div className={styles.costValue}>
                    {experienceLevel === "new"
                      ? "$200.00"
                      : experienceLevel === "smb"
                        ? "$2,500.00"
                        : "$75,000.00"}
                  </div>
                </div>

                <div className={styles.costColumn}>
                  <div className={styles.costLabel}>Costs incurred</div>
                  <div className={styles.costValue}>
                    {experienceLevel === "new"
                      ? "$43.00"
                      : experienceLevel === "smb"
                        ? "$1,240.00"
                        : "$45,200.00"}
                  </div>
                </div>

                <div className={styles.costColumn}>
                  <div className={styles.costLabel}>
                    {experienceLevel === "new"
                      ? "Available credits"
                      : "Remaining budget"}
                  </div>
                  <div className={styles.costValueGreen}>
                    {experienceLevel === "new"
                      ? "$157.00"
                      : experienceLevel === "smb"
                        ? "$1,260.00"
                        : "$29,800.00"}
                  </div>
                </div>
              </div>

              <div className={styles.textAlignLeft}>
                <span
                  className={styles.costLink}
                  onClick={() => {
                    console.log(
                      "[v0] Manage costs link clicked, navigating to cost-management",
                    );
                    handlePageChange("cost-management");
                  }}
                >
                  Manage costs
                </span>
              </div>
            </div>
          </div>

          <div className={styles.projectOverview}>
            <div className={styles.projectTitle}>My Azure solutions</div>

            <div className={styles.azureSolutionsTabs}>
              <div
                onClick={() => setSolutionGrouping("resources")}
                className={`${styles.azureSolutionsTab} ${
                  solutionGrouping === "resources"
                    ? styles.azureSolutionsTabActive
                    : ""
                }`}
              >
                Resources
              </div>
              <div
                onClick={() => setSolutionGrouping("service-groups")}
                className={`${styles.azureSolutionsTab} ${
                  solutionGrouping === "service-groups"
                    ? styles.azureSolutionsTabActive
                    : ""
                }`}
              >
                Service Groups
              </div>
              <div
                onClick={() => setSolutionGrouping("architecture")}
                className={`${styles.azureSolutionsTab} ${
                  solutionGrouping === "architecture"
                    ? styles.azureSolutionsTabActive
                    : ""
                }`}
              >
                Architecture Views
              </div>
            </div>

            {solutionGrouping === "resources" && (
              <table className={styles.resourcesTable}>
                <thead>
                  <tr>
                    <th className={styles.resourcesTableHeader}>
                      Resource name
                    </th>
                    <th className={styles.resourcesTableHeader}>Type</th>
                    <th className={styles.resourcesTableHeader}>Alerts</th>
                    <th className={styles.resourcesTableHeader}>Cost</th>
                    <th className={styles.resourcesTableHeader}>Last viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {resourcesData.map((resource, index) => (
                    <tr key={index}>
                      <td className={styles.resourcesTableCell}>
                        <div className={styles.resourceNameCell}>
                          <div className={styles.resourceIcon}>
                            {resource.icon}
                          </div>
                          <span className={styles.resourceNameLink}>
                            {resource.name}
                          </span>
                        </div>
                      </td>
                      <td className={styles.resourcesTableCell}>
                        {resource.type}
                      </td>
                      <td className={styles.resourcesTableCell}>
                        {resource.alerts}
                      </td>
                      <td
                        className={mergeClasses(
                          styles.resourcesTableCell,
                          styles.resourceCostCell,
                        )}
                      >
                        {resource.cost}
                      </td>
                      <td className={styles.resourcesTableCell}>
                        {resource.lastViewed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {solutionGrouping === "service-groups" && (
              <div
                className={
                  experienceLevel === "new"
                    ? mergeClasses(
                        styles.projectsGrid,
                        styles.emptyStateNewWrapper,
                      )
                    : styles.projectsGrid
                }
              >
                {experienceLevel === "new" ? (
                  <div className={styles.emptyStateContent}>
                    <div className={styles.emptyStateTitle}>
                      No service groups yet
                    </div>
                    <div className={styles.emptyStateDescription}>
                      Service groups help organize resources that share a common
                      purpose. Create your first one when you're ready!
                    </div>
                  </div>
                ) : experienceLevel === "smb" ? (
                  <>
                    {[
                      {
                        name: "Authentication Service",
                        members: "18 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        isHealthy: true,
                      },
                      {
                        name: "Payment Service",
                        members: "24 members",
                        health: "Warning",
                        resilience: "Not resilient",
                        isHealthy: false,
                      },
                    ].map((group, i) => (
                      <div key={i} className={styles.projectCard}>
                        <div className={styles.serviceGroupHeader}>
                          <Apps24Filled className={styles.serviceGroupIcon} />
                          <span className={styles.serviceGroupName}>
                            {group.name}
                          </span>
                        </div>
                        <div className={styles.serviceGroupMembers}>
                          {group.members}
                        </div>
                        <div className={styles.serviceGroupStatusRow}>
                          <div className={styles.serviceGroupStatusItem}>
                            <div
                              className={mergeClasses(
                                styles.healthDot,
                                group.isHealthy
                                  ? styles.healthDotGreen
                                  : styles.healthDotOrange,
                              )}
                            />
                            <span className={styles.statusText}>
                              {group.health}
                            </span>
                          </div>
                          <div className={styles.serviceGroupStatusItem}>
                            {group.health === "Healthy" ? (
                              <Globe24Regular
                                className={styles.statusIconGreen}
                              />
                            ) : (
                              <Warning24Regular
                                className={styles.statusIconRed}
                              />
                            )}
                            <span className={styles.statusText}>
                              {group.resilience}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className={styles.addServiceGroupCard}>
                      <Add24Regular className={styles.addServiceGroupIcon} />
                      <span className={styles.addServiceGroupText}>
                        Add service group
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      {
                        name: "Business Apps",
                        members: "1,234 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        isHealthy: true,
                      },
                      {
                        name: "Authentication Service",
                        members: "234 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        isHealthy: true,
                      },
                      {
                        name: "Payment Service",
                        members: "456 members",
                        health: "Warning",
                        resilience: "Not resilient",
                        isHealthy: false,
                      },
                      {
                        name: "Infrastructure Services",
                        members: "789 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        isHealthy: true,
                      },
                    ].map((group, i) => (
                      <div key={i} className={styles.projectCard}>
                        <div className={styles.serviceGroupHeader}>
                          <Apps24Filled className={styles.serviceGroupIcon} />
                          <span className={styles.serviceGroupName}>
                            {group.name}
                          </span>
                        </div>
                        <div className={styles.serviceGroupMembers}>
                          {group.members}
                        </div>
                        <div className={styles.serviceGroupStatusRow}>
                          <div className={styles.serviceGroupStatusItem}>
                            <div
                              className={mergeClasses(
                                styles.healthDot,
                                group.isHealthy
                                  ? styles.healthDotGreen
                                  : styles.healthDotOrange,
                              )}
                            />
                            <span className={styles.statusText}>
                              {group.health}
                            </span>
                          </div>
                          <div className={styles.serviceGroupStatusItem}>
                            {group.health === "Healthy" ? (
                              <Globe24Regular
                                className={styles.statusIconGreen}
                              />
                            ) : (
                              <Warning24Regular
                                className={styles.statusIconRed}
                              />
                            )}
                            <span className={styles.statusText}>
                              {group.resilience}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className={styles.addServiceGroupCard}>
                      <Add24Regular className={styles.addServiceGroupIcon} />
                      <span className={styles.addServiceGroupText}>
                        Add service group
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {solutionGrouping === "architecture" && (
              <div className={styles.topologyView}>
                {experienceLevel === "new" && (
                  <div className={styles.architectureContainer}>
                    <div className={styles.architectureLayout}>
                      {/* Frontend */}
                      <div className={styles.architectureNodeColumn}>
                        <div
                          className={mergeClasses(
                            styles.architectureNodeBox,
                            styles.architectureNodeBoxBrand,
                          )}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 2L2 7L12 12L22 7L12 2Z"
                              stroke={tokens.colorBrandForeground1}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 17L12 22L22 17"
                              stroke={tokens.colorBrandForeground1}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12L12 17L22 12"
                              stroke={tokens.colorBrandForeground1}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className={styles.architectureNodeLabel}>
                          Frontend
                        </div>
                        <div className={styles.architectureNodeSublabel}>
                          React App
                        </div>
                      </div>

                      {/* Backend */}
                      <div className={styles.architectureNodeColumn}>
                        <div
                          className={mergeClasses(
                            styles.architectureNodeBox,
                            styles.architectureNodeBoxNeutral,
                          )}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              x="2"
                              y="3"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                              stroke={tokens.colorNeutralForeground2}
                              strokeWidth="2"
                            />
                            <line
                              x1="8"
                              y1="21"
                              x2="16"
                              y2="21"
                              stroke={tokens.colorNeutralForeground2}
                              strokeWidth="2"
                            />
                            <line
                              x1="12"
                              y1="17"
                              x2="12"
                              y2="21"
                              stroke={tokens.colorNeutralForeground2}
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <div className={styles.architectureNodeLabel}>
                          Backend
                        </div>
                        <div className={styles.architectureNodeSublabel}>
                          API Server
                        </div>
                      </div>

                      {/* Database */}
                      <div className={styles.architectureNodeColumn}>
                        <div
                          className={mergeClasses(
                            styles.architectureNodeBox,
                            styles.architectureNodeBoxNeutral,
                          )}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <ellipse
                              cx="12"
                              cy="5"
                              rx="9"
                              ry="3"
                              stroke={tokens.colorNeutralForeground2}
                              strokeWidth="2"
                            />
                            <path
                              d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12"
                              stroke={tokens.colorNeutralForeground2}
                              strokeWidth="2"
                            />
                            <path
                              d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5"
                              stroke={tokens.colorNeutralForeground2}
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <div className={styles.architectureNodeLabel}>
                          Database
                        </div>
                        <div className={styles.architectureNodeSublabel}>
                          SQL Server
                        </div>
                      </div>
                    </div>

                    <svg className={styles.svgOverlay}>
                      <line
                        x1="25%"
                        y1="50%"
                        x2="50%"
                        y2="50%"
                        stroke={tokens.colorBrandBackground}
                        strokeWidth="1"
                        opacity="0.8"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="75%"
                        y2="50%"
                        stroke={tokens.colorNeutralStroke1}
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                )}

                {experienceLevel === "smb" && (
                  <div className={styles.smbArchContainer}>
                    {/* Left side services */}
                    <div className={styles.serviceColumnLeft}>
                      {[
                        "Web App",
                        "Mobile App",
                        "API Gateway",
                        "Load Balancer",
                      ].map((service, i) => (
                        <div key={i} className={styles.serviceItemLeft}>
                          <div className={styles.serviceDot8} />
                          {service}
                        </div>
                      ))}
                    </div>

                    {/* Center hub */}
                    <div className={styles.hubNode}>☁️</div>

                    {/* Right side services */}
                    <div className={styles.serviceColumnRight}>
                      {[
                        "SQL Database",
                        "Redis Cache",
                        "Blob Storage",
                        "Key Vault",
                      ].map((service, i) => (
                        <div key={i} className={styles.serviceItemRight}>
                          {service}
                          <div className={styles.serviceDot8} />
                        </div>
                      ))}
                    </div>

                    {/* Connection lines */}
                    <svg className={styles.svgOverlay}>
                      {/* Left to center connections */}
                      {[0, 1, 2, 3].map((i) => (
                        <line
                          key={`left-${i}`}
                          x1="140"
                          y1={120 + i * 40}
                          x2="50%"
                          y2="50%"
                          stroke={tokens.colorNeutralStroke1}
                          strokeWidth="1"
                          opacity="0.4"
                        />
                      ))}
                      {/* Center to right connections */}
                      {[0, 1, 2, 3].map((i) => (
                        <line
                          key={`right-${i}`}
                          x1="50%"
                          y1="50%"
                          x2="calc(100% - 140px)"
                          y2={120 + i * 40}
                          stroke={tokens.colorNeutralStroke1}
                          strokeWidth="1"
                          opacity="0.4"
                        />
                      ))}
                    </svg>
                  </div>
                )}

                {experienceLevel === "enterprise" && (
                  <div className={styles.smbArchContainer}>
                    {/* Left side services */}
                    <div className={styles.enterpriseServiceColumnLeft}>
                      {[
                        "Infrastructure",
                        "Security",
                        "DevOps",
                        "Web",
                        "Mobile",
                        "Network",
                      ].map((service, i) => (
                        <div
                          key={i}
                          className={styles.enterpriseServiceItemLeft}
                        >
                          <div className={styles.serviceDot6} />
                          {service}
                        </div>
                      ))}
                    </div>

                    {/* Center mesh of nodes */}
                    <div className={styles.enterpriseGrid}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                          key={i}
                          className={
                            i === 4 ? styles.gridNodeCenter : styles.gridNode
                          }
                        />
                      ))}
                    </div>

                    {/* Right side services */}
                    <div className={styles.enterpriseServiceColumnRight}>
                      {[
                        "Kubernetes",
                        "Synthetics",
                        "Serverless",
                        "APM",
                        "Monitoring",
                        "Analytics",
                      ].map((service, i) => (
                        <div
                          key={i}
                          className={styles.enterpriseServiceItemRight}
                        >
                          {service}
                          <div className={styles.serviceDot6} />
                        </div>
                      ))}
                    </div>

                    {/* Complex connection mesh */}
                    <svg className={styles.svgOverlay}>
                      {/* Left to center mesh */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <g key={`left-mesh-${i}`}>
                          <line
                            x1="120"
                            y1={100 + i * 30}
                            x2="45%"
                            y2="45%"
                            stroke={tokens.colorNeutralStroke1}
                            strokeWidth="1"
                            opacity="0.2"
                          />
                          <line
                            x1="120"
                            y1={100 + i * 30}
                            x2="50%"
                            y2="50%"
                            stroke={tokens.colorNeutralStroke1}
                            strokeWidth="1"
                            opacity="0.3"
                          />
                          <line
                            x1="120"
                            y1={100 + i * 30}
                            x2="55%"
                            y2="55%"
                            stroke={tokens.colorNeutralStroke1}
                            strokeWidth="1"
                            opacity="0.2"
                          />
                        </g>
                      ))}
                      {/* Center to right mesh */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <g key={`right-mesh-${i}`}>
                          <line
                            x1="45%"
                            y1="45%"
                            x2="calc(100% - 120px)"
                            y2={100 + i * 30}
                            stroke={tokens.colorNeutralStroke1}
                            strokeWidth="1"
                            opacity="0.2"
                          />
                          <line
                            x1="50%"
                            y1="50%"
                            x2="calc(100% - 120px)"
                            y2={100 + i * 30}
                            stroke={tokens.colorNeutralStroke1}
                            strokeWidth="1"
                            opacity="0.3"
                          />
                          <line
                            x1="55%"
                            y1="55%"
                            x2="calc(100% - 120px)"
                            y2={100 + i * 30}
                            stroke={tokens.colorNeutralStroke1}
                            strokeWidth="1"
                            opacity="0.2"
                          />
                        </g>
                      ))}
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

const Level1Manage = ({
  experienceLevel = "new",
  onBack,
}: Level1ManageProps) => {
  return (
    <>
      <Level1ManageContent experienceLevel={experienceLevel} />
      <CanvasFooter
        onSparkleClick={() => console.log("Sparkle clicked")}
        selectedCategory={null}
        onCategoryChange={(category) =>
          console.log("Category changed:", category)
        }
        onNavigateToRecommendations={() => {}}
        disablePanels={true}
      />
    </>
  );
};

export default Level1Manage;
