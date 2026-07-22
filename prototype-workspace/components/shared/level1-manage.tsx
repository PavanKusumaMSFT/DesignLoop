/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  FluentProvider,
  Button as FluentButton,
  Text,
  webLightTheme,
  TabList,
  Tab,
} from "@fluentui/react-components";
import { GaugeChart } from "@fluentui/react-charting";
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
  Flash24Regular,
  ErrorCircle24Regular,
  ArrowTrending24Regular,
  Lightbulb24Regular,
  Sparkle24Regular,
  Folder24Regular,
  Star16Filled,
  Storage24Regular,
  CloudArrowUp24Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";
import { useState } from "react";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { EnhancedInputBar } from "./enhanced-input-bar";
import { NextStepsCarousel, NextStepsCard } from "./next-steps-carousel";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
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
    borderRadius: "12px",
    padding: "24px",
    marginTop: "24px",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
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
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "40px",
    minHeight: "400px",
    position: "relative",
    overflow: "hidden",
    marginBottom: "24px",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
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
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    "&:hover": {
      boxShadow:
        "0 20px 16px 0 rgba(0, 30, 68, 0.05), 0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    },
  },
  addServiceGroupCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
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
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minHeight: "140px",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
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
    borderRadius: "12px",
    padding: "24px",
    cursor: "pointer",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
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
  navTabs: {
    display: "flex",
    gap: "8px",
  },
  navTab: {
    padding: "8px 0",
    marginRight: "16px",
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    position: "relative",
    transition: "all 0.2s ease",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  navTabActive: {
    borderBottomColor: tokens.colorBrandForeground1,
    color: tokens.colorBrandForeground1,
  },
  // --- Missing classes added below ---
  chevronSmall: {
    width: "12px",
    height: "12px",
  },
  tabsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    marginBottom: tokens.spacingVerticalM,
  },
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXL,
  },
  twoColGridNoMb: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  cardFlex: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  cardTitleLarge: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  badgePill: {
    borderRadius: "999px",
    padding: "2px 8px",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: "auto",
    paddingTop: tokens.spacingVerticalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sectionDescShort: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalS,
  },
  metricBox: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
  },
  metricValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  metricLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  metricChange: {
    fontSize: tokens.fontSizeBase200,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  metricGrid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  metricGrid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  gaugeRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-start",
  },
  gaugeRowFlex: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
  },
  gaugeCol: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    flex: 1,
  },
  gaugeContainer: {
    flexShrink: 0,
  },
  donutValue: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  donutLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  legendFlex1: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  legendCol: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  legendBar: {
    width: "12px",
    height: "12px",
    borderRadius: "2px",
    flexShrink: 0,
  },
  legendText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  legendValue: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  headerFlex: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  infoIcon: {
    width: "16px",
    height: "16px",
    color: tokens.colorNeutralForeground3,
  },
  infoIconSmall: {
    width: "14px",
    height: "14px",
    color: tokens.colorNeutralForeground3,
  },
  brandColorText: {
    color: tokens.colorBrandForeground1,
  },
  flexRowGap4: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  flexRowGap8: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statusDotGreen: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenBackground3,
    flexShrink: 0,
  },
  statusDotGreenSmall: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenBackground3,
    flexShrink: 0,
  },
  iconBrand20: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
  },
  cellIndented: {
    paddingLeft: tokens.spacingHorizontalL,
  },
  lightbulbIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  resourcesHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalM,
  },
  cursorPointer: {
    cursor: "pointer",
  },
  dropdownButtonNoPointer: {
    cursor: "default",
  },
  tabTransparentIndicator: {
    "--fui-Tab--indicator--color": "transparent",
  } as any,
  badgePillOrange: {
    backgroundColor: tokens.colorPaletteDarkOrangeBackground1,
    border: `1px solid ${tokens.colorPaletteDarkOrangeBorder1}`,
    color: tokens.colorPaletteDarkOrangeForeground1,
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
  },
  badgePillLive: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    border: `1px solid ${tokens.colorStatusSuccessForeground1}`,
    color: tokens.colorStatusSuccessForeground1,
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
  },
  badgePillSuccessUptime: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    border: `1px solid ${tokens.colorStatusSuccessBorder1}`,
    color: tokens.colorStatusSuccessForeground1,
    display: "inline-flex",
    alignItems: "center",
    height: "24px",
    width: "fit-content",
  },
  badgePillCostInsights: {
    padding: "4px 8px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "12px",
    border: `1px solid ${tokens.colorBrandStroke1}`,
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "16px",
    color: tokens.colorBrandForeground1,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    height: "24px",
    width: "fit-content",
  },
  statusDotOrangeSmall: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
    flexShrink: 0,
  },
  metricBoxGauge: {
    padding: "20px 24px 16px 24px",
    marginBottom: "20px",
  },
  metricBoxFlex: {
    flex: 1,
  },
  metricBoxPadded: {
    padding: "24px",
    flex: 1,
  },
  gaugeColCentered: {
    alignItems: "center",
    margin: "-16px 0",
  },
  metricChangeRed: {
    color: tokens.colorPaletteRedForeground1,
  },
  metricChangeGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  metricChangeSuccess: {
    color: tokens.colorStatusSuccessForeground1,
  },
  metricLabelMb4: {
    marginBottom: "4px",
  },
  rpoTarget: {
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  rpoTargetRed: {
    color: tokens.colorPaletteRedForeground1,
  },
  rpoTargetGreen: {
    color: tokens.colorStatusSuccessForeground1,
  },
  remainingBudgetValue: {
    fontSize: "28px",
    fontWeight: "600",
    color: tokens.colorPaletteGreenForeground1,
  },
  sectionMb32: {
    marginBottom: "32px",
  },
  donutChart1: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    // eslint-disable-next-line no-restricted-syntax
    background:
      "conic-gradient(#10b981 0deg 270deg, #f59e0b 270deg 285deg, #dc2626 285deg 300deg, #6b7280 300deg 360deg)",
    position: "relative",
  },
  donutChart2: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    // eslint-disable-next-line no-restricted-syntax
    background:
      "conic-gradient(#0078d4 0deg 270deg, #10b981 270deg 285deg, #6b7280 285deg 300deg, #f59e0b 300deg 360deg)",
    position: "relative",
  },
  donutCenter: {
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
  legendBarRed: {
    backgroundColor: tokens.colorPaletteRedForeground1,
  },
  legendBarGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  legendBarOrange: {
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
  },
  legendBarNeutral: {
    backgroundColor: tokens.colorNeutralForeground3,
  },
  legendBarBrand: {
    backgroundColor: "#0078D4",
  },
  legendTextGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  legendTextRed: {
    color: tokens.colorPaletteRedForeground1,
  },
  legendTextOrange: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  legendTextBrand: {
    color: "#0078D4",
  },
  legendValueGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  legendValueRed: {
    color: tokens.colorPaletteRedForeground1,
  },
  legendValueOrange: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  legendValueBrand: {
    color: "#0078D4",
  },
  newProjectButton: {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
    borderRadius: "4px",
  },
  searchProjectsButton: {
    width: "100%",
    maxWidth: "400px",
    justifyContent: "flex-start",
    marginBottom: "16px",
  },
  chevronIconExpanded: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
    transform: "rotate(0deg)",
    transition: "transform 0.2s",
  },
  chevronIconCollapsed: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
    transform: "rotate(-90deg)",
    transition: "transform 0.2s",
  },
  statusDotDynamic: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "var(--status-color)" as any,
  },
  statusDotProjectGreen: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  statusDotProjectOrange: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
    flexShrink: 0,
  },
  statusDotProjectRed: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteRedForeground1,
    flexShrink: 0,
  },
});

interface Level1ManageProps {
  experienceLevel: "new" | "smb" | "enterprise";
  customHeader?: React.ReactNode | null;
  hideNextSteps?: boolean;
  hideProjects?: boolean;
}

const Level1ManageContent = ({
  experienceLevel,
  customHeader,
  hideNextSteps = false,
  hideProjects = false,
}: Level1ManageProps) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();

  // Debug logging
  console.log(
    "Level1Manage customHeader:",
    customHeader,
    "Type:",
    typeof customHeader,
  );

  const getSelectedOption = () => {
    switch (experienceLevel) {
      case "new":
        return "MyDemo-Project";
      case "smb":
        return "All projects";
      case "enterprise":
        return "All projects";
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
          { type: "parent", label: "All projects" },
          { type: "parent", label: "Authentication Service" },
          { type: "parent", label: "Checkout" },
          { type: "parent", label: "Fraud Detection" },
        ];
      case "enterprise":
        return [
          { type: "parent", label: "All projects" },
          { type: "parent", label: "Global Platform" },
          { type: "parent", label: "Data Analytics" },
          { type: "parent", label: "Infrastructure" },
          { type: "parent", label: "ML Platform" },
          { type: "parent", label: "Security & Compliance" },
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
            icon: <Shield24Regular />,
            title: "Enable security features",
            description:
              "Turn on Microsoft Defender for Cloud and configure basic security policies to protect your test resources.",
            buttonText: "Secure",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #10b981)",
          },
          {
            icon: <Money24Regular />,
            title: "Set up spending alerts",
            description:
              "Configure budget alerts and spending limits to stay within your free tier credits and avoid unexpected charges.",
            buttonText: "Setup",
            buttonStyle: "secondary",
            gradient: "linear-gradient(to bottom, #0078d4, #06b6d4)",
          },
          {
            icon: <Settings24Regular />,
            title: "Configure backup policies",
            description:
              "Set up automated backup schedules and retention policies to protect your data and ensure business continuity.",
            buttonText: "Configure",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
          },
          {
            icon: <Organization24Regular />,
            title: "Review resource health",
            description:
              "Check the health status and performance metrics of your deployed resources to ensure everything is running smoothly.",
            buttonText: "View health",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #f59e0b)",
          },
        ];
      case "smb":
        return [
          {
            icon: <ErrorCircle24Regular />,
            title: "Sev1 alert on BackendVM4",
            description:
              "Critical performance degradation detected on BackendVM4 affecting authentication service availability and user login times.",
            buttonText: "Review incident summary",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #ef4444)",
            isInfrastructureAgent: true,
            isCritical: true,
            secondaryButton: "View affected resources",
          },
          {
            icon: <Settings24Regular />,
            title: "Configuration drift detected",
            description:
              "12 resources have deviated from baseline policies including network security groups and storage account configurations.",
            buttonText: "Fix configurations",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
            isInfrastructureAgent: true,
          },
          {
            icon: <Warning24Regular />,
            title: "Security recommendations",
            description:
              "4 high-priority security recommendations including enabling disk encryption and updating firewall rules across your resources.",
            buttonText: "Open troubleshooting agent",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #10b981)",
            isInfrastructureAgent: true,
          },
          {
            icon: <Money24Regular />,
            title: "Cost optimization opportunities",
            description:
              "Potential savings of $600/mo identified by rightsizing VMs and switching to reserved instances for production workloads.",
            buttonText: "Review savings",
            buttonStyle: "secondary",
            gradient: "linear-gradient(to bottom, #0078d4, #06b6d4)",
          },
        ];
      case "enterprise":
        return [
          {
            icon: <ErrorCircle24Regular />,
            title: "Sev1 alert on BackendVM4",
            description:
              "Critical performance degradation detected on BackendVM4 affecting authentication service availability and user login times.",
            buttonText: "Review incident summary",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #ef4444)",
            isInfrastructureAgent: true,
            isCritical: true,
            secondaryButton: "View affected resources",
          },
          {
            icon: <Bot24Regular />,
            title: "Payment Service compliance issues",
            description:
              "12 non-compliant resources in Payment Service group violating PCI-DSS requirements and organizational security policies.",
            buttonText: "Open service group agent",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
            isInfrastructureAgent: true,
          },
          {
            icon: <ShieldError24Regular />,
            title: "Critical security alerts",
            description:
              "28 high-severity security alerts across Business Apps and Infrastructure service groups requiring immediate attention.",
            buttonText: "Open security agent",
            buttonStyle: "outline",
            gradient: "linear-gradient(to bottom, #0078d4, #10b981)",
            isInfrastructureAgent: true,
          },
          {
            icon: <DataUsage24Regular />,
            title: "Budget overrun detected",
            description:
              "Global Platform service group is consuming 40% over monthly budget due to increased compute and storage usage.",
            buttonText: "Analyze costs",
            buttonStyle: "secondary",
            gradient: "linear-gradient(to bottom, #0078d4, #06b6d4)",
          },
        ];
      default:
        return [];
    }
  };

  const getProjectsData = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            name: "MyDemo-Project",
            type: "Project",
            status: "Running",
            cost: "$11.47",
            lastViewed: "2 hours ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
        ];
      case "smb":
        return [
          {
            name: "Authentication Service",
            type: "Project",
            status: "Running",
            cost: "$125.80",
            lastViewed: "5 minutes ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "Checkout",
            type: "Project",
            status: "Online",
            cost: "$89.40",
            lastViewed: "1 hour ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "Fraud Detection",
            type: "Project",
            status: "Available",
            cost: "$45.20",
            lastViewed: "2 hours ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
        ];
      case "enterprise":
        return [
          {
            name: "Global Platform",
            type: "Project",
            status: "Running",
            cost: "$1,245.80",
            lastViewed: "1 minute ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "Data Analytics",
            type: "Project",
            status: "Online",
            cost: "$2,890.50",
            lastViewed: "3 minutes ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "Infrastructure",
            type: "Project",
            status: "Active",
            cost: "$4,567.30",
            lastViewed: "15 minutes ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "ML Platform",
            type: "Project",
            status: "Running",
            cost: "$3,245.60",
            lastViewed: "30 minutes ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "Security & Compliance",
            type: "Project",
            status: "Protected",
            cost: "$567.80",
            lastViewed: "1 hour ago",
            icon: <Folder24Regular />,
            statusColor: tokens.colorPaletteGreenForeground1,
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
            status: "Running",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "test-storage",
            type: "Storage Account",
            alerts: 0,
            cost: "$0.12",
            lastViewed: "November 14, 2024",
            icon: <Layer24Regular />,
            status: "Available",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "learning-db",
            type: "SQL Database",
            alerts: 1,
            cost: "$8.90",
            lastViewed: "November 13, 2024",
            icon: <Database24Regular />,
            status: "Online",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "test-rg",
            type: "Resource Group",
            alerts: 0,
            cost: "$0.98",
            lastViewed: "November 12, 2024",
            icon: <FolderOpen24Regular />,
            status: "Active",
            statusColor: tokens.colorPaletteGreenForeground1,
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
            status: "Running",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "CustomerDB-Prod",
            type: "SQL Database",
            alerts: 0,
            cost: "$420.30",
            lastViewed: "November 15, 2024",
            icon: <Database24Regular />,
            status: "Online",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "backup-storage-prod",
            type: "Storage Account",
            alerts: 0,
            cost: "$89.45",
            lastViewed: "November 14, 2024",
            icon: <Layer24Regular />,
            status: "Available",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "production-vm-cluster",
            type: "Virtual Machine",
            alerts: 2,
            cost: "$340.20",
            lastViewed: "November 13, 2024",
            icon: <Cube24Regular />,
            status: "Running",
            statusColor: tokens.colorPaletteDarkOrangeForeground1,
          },
          {
            name: "production-rg",
            type: "Resource Group",
            alerts: 1,
            cost: "$144.45",
            lastViewed: "November 12, 2024",
            icon: <FolderOpen24Regular />,
            status: "Active",
            statusColor: tokens.colorPaletteGreenForeground1,
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
            status: "Running",
            statusColor: tokens.colorPaletteDarkOrangeForeground1,
          },
          {
            name: "Enterprise-DataWarehouse",
            type: "Synapse Analytics",
            alerts: 1,
            cost: "$12,340.50",
            lastViewed: "November 15, 2024",
            icon: <Database24Regular />,
            status: "Online",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "Global-CDN-Premium",
            type: "CDN Profile",
            alerts: 0,
            cost: "$3,240.80",
            lastViewed: "November 14, 2024",
            icon: <Globe24Regular />,
            status: "Running",
            statusColor: tokens.colorPaletteGreenForeground1,
          },
          {
            name: "AKS-Production-Cluster",
            type: "Kubernetes Service",
            alerts: 5,
            cost: "$6,890.20",
            lastViewed: "November 14, 2024",
            icon: <Cube24Regular />,
            status: "Degraded",
            statusColor: tokens.colorPaletteRedForeground1,
          },
          {
            name: "Enterprise-Backup-Vault",
            type: "Recovery Services",
            alerts: 0,
            cost: "$2,140.30",
            lastViewed: "November 13, 2024",
            icon: <Layer24Regular />,
            status: "Active",
            statusColor: tokens.colorPaletteGreenForeground1,
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
    useState("All projects");
  const [selectedScope, setSelectedScope] = useState("All subscriptions");
  const [selectedTenant, setSelectedTenant] = useState(getSelectedOption());
  const [solutionGrouping, setSolutionGrouping] = useState<
    "resources" | "service-groups" | "architecture"
  >(experienceLevel === "new" ? "resources" : "service-groups");
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isProjectExpanded, setIsProjectExpanded] = useState(true);
  const dropdownOptions = getDropdownOptions();
  const healthMetrics = getHealthMetrics();
  const actionCards = getActionCards();

  // Get carousel cards from top actions
  const getCarouselCards = (): NextStepsCard[] => {
    const cards = getActionCards();
    return cards.map((card) => {
      // Add onClick handler for "Review incident summary" button
      const primaryOnClick =
        card.buttonText === "Review incident summary"
          ? () => handlePageChange("agent-immersive-vnext-scenario3")
          : undefined;

      const buttons = (card as any).isInfrastructureAgent
        ? [
            {
              label: card.buttonText,
              primary: true,
              icon: true,
              onClick: primaryOnClick,
            },
          ]
        : [{ label: card.buttonText, primary: true, onClick: primaryOnClick }];

      // Add secondary button if it exists
      if ((card as any).secondaryButton) {
        buttons.push({
          label: (card as any).secondaryButton,
          primary: false,
          icon: false,
          onClick: undefined,
        });
      }

      // Handle multiple badges for critical + agent-supported cards
      const badges: string[] = [];
      if ((card as any).isCritical) {
        badges.push("Critical");
      }
      if ((card as any).isInfrastructureAgent) {
        badges.push("Agent-supported task");
      }

      return {
        title: card.title,
        description:
          (card as any).description ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        badges: badges.length > 0 ? badges : undefined,
        buttons,
      };
    });
  };

  const nextStepsCards: NextStepsCard[] = getCarouselCards();
  const projectsData = getProjectsData();
  const resourcesData = getResourcesData();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {/* Portal-ia (undefined): Show TopNav, App-modeling (null): No header */}
        {customHeader === undefined ? (
          <div className={styles.stickyNav}>
            <TopNav activeLink="Manage" experienceLevel={experienceLevel} />
          </div>
        ) : (
          customHeader && <div className={styles.stickyNav}>{customHeader}</div>
        )}

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              Manage
            </Text>
            <div className={styles.headerRight}>
              <div className={styles.dropdown}>
                <div
                  className={mergeClasses(
                    styles.dropdownButton,
                    experienceLevel === "new" && styles.dropdownButtonNoPointer,
                  )}
                  onClick={() =>
                    experienceLevel !== "new" && setShowDropdown(!showDropdown)
                  }
                >
                  <span>{getSelectedOption()}</span>
                  <ChevronDown24Regular className={styles.chevronSmall} />
                </div>
                {showDropdown && experienceLevel !== "new" && (
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
                    <ChevronDown24Regular className={styles.chevronSmall} />
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
          </div>

          <EnhancedInputBar
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={(value) => console.log("Submit:", value)}
            placeholder="Message Copilot"
          />

          {!hideNextSteps && <NextStepsCarousel cards={nextStepsCards} />}

          {/* Tabs Section */}
          <div className={styles.tabsRow}>
            <TabList
              selectedValue={selectedTab}
              onTabSelect={(_, data) => setSelectedTab(data.value as string)}
              appearance="transparent"
              size="large"
            >
              <Tab value="overview" className={styles.tabTransparentIndicator}>
                Overview
              </Tab>
              <Tab value="security" className={styles.tabTransparentIndicator}>
                Security
              </Tab>
              <Tab
                value="observability"
                className={styles.tabTransparentIndicator}
              >
                Observability
              </Tab>
              <Tab
                value="resiliency"
                className={styles.tabTransparentIndicator}
              >
                Resiliency
              </Tab>
              <Tab
                value="optimization"
                className={styles.tabTransparentIndicator}
              >
                Optimization
              </Tab>
            </TabList>
          </div>

          <div className={styles.twoColGrid}>
            {/* Security posture */}
            <div className={mergeClasses(styles.actionCard, styles.cardFlex)}>
              <div className={styles.cardHeaderRow}>
                <div className={styles.cardTitleLarge}>Security Posture</div>
                <div
                  className={mergeClasses(
                    styles.badgePill,
                    styles.badgePillOrange,
                  )}
                >
                  <div className={styles.statusDotOrangeSmall} />
                  Mitigating
                </div>
              </div>

              {/* Subtitle */}
              <div className={styles.sectionDescShort}>
                AI-powered threat detection and compliance monitoring
              </div>

              {/* Gray container with gauge */}
              <div
                className={mergeClasses(
                  styles.metricBox,
                  styles.metricBoxGauge,
                )}
              >
                {/* Gauge chart */}
                <div
                  className={mergeClasses(
                    styles.gaugeCol,
                    styles.gaugeColCentered,
                  )}
                >
                  <GaugeChart
                    width={252}
                    height={128}
                    segments={[
                      // eslint-disable-next-line no-restricted-syntax
                      { size: 33, color: "#dc2626", legend: "High risk" },
                      // eslint-disable-next-line no-restricted-syntax
                      { size: 34, color: "#f97316", legend: "Medium risk" },
                      // eslint-disable-next-line no-restricted-syntax
                      { size: 33, color: "#16a34a", legend: "Low risk" },
                    ]}
                    chartValue={
                      experienceLevel === "new"
                        ? 45
                        : experienceLevel === "smb"
                          ? 85
                          : 91
                    }
                    chartValueFormat={(value) =>
                      `${Array.isArray(value) ? value[0] : value}`
                    }
                    sublabel={
                      experienceLevel === "new" ? "Medium risk" : "Low risk"
                    }
                    minValue={0}
                    maxValue={100}
                    hideMinMax={false}
                    hideLegend={true}
                  />
                </div>
              </div>

              {/* Button */}
              <div className={styles.cardFooter}>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                >
                  Improve score
                </FluentButton>
              </div>
            </div>

            {/* Observability & Monitoring */}
            <div className={mergeClasses(styles.actionCard, styles.cardFlex)}>
              {/* Header with title and Live badge */}
              <div className={styles.cardHeaderRow}>
                <div className={styles.cardTitleLarge}>
                  Observability & Monitoring
                </div>
                <div
                  className={mergeClasses(
                    styles.badgePill,
                    styles.badgePillLive,
                  )}
                >
                  <div className={styles.statusDotGreen}></div>
                  Live
                </div>
              </div>

              {/* Subtitle */}
              <div className={styles.sectionDescShort}>
                Real-time performance metrics and anomaly detection
              </div>

              {/* Three metric boxes */}
              <div className={styles.metricGrid3}>
                {/* Avg Response Time */}
                <div
                  className={mergeClasses(
                    styles.metricBox,
                    styles.metricBoxFlex,
                  )}
                >
                  <div
                    className={mergeClasses(
                      styles.metricChange,
                      styles.metricChangeRed,
                    )}
                  >
                    ↗{" "}
                    {experienceLevel === "new"
                      ? "45%"
                      : experienceLevel === "smb"
                        ? "62%"
                        : "73%"}
                  </div>
                  <div className={styles.metricValue}>
                    {experienceLevel === "new"
                      ? "180ms"
                      : experienceLevel === "smb"
                        ? "245ms"
                        : "324ms"}
                  </div>
                  <div className={styles.metricLabel}>Avg Response Time</div>
                </div>

                {/* Error Rate */}
                <div
                  className={mergeClasses(
                    styles.metricBox,
                    styles.metricBoxFlex,
                  )}
                >
                  <div
                    className={mergeClasses(
                      styles.metricChange,
                      styles.metricChangeRed,
                    )}
                  >
                    ↗{" "}
                    {experienceLevel === "new"
                      ? "0.8%"
                      : experienceLevel === "smb"
                        ? "1.5%"
                        : "1.98%"}
                  </div>
                  <div className={styles.metricValue}>
                    {experienceLevel === "new"
                      ? "0.9%"
                      : experienceLevel === "smb"
                        ? "1.8%"
                        : "2.1%"}
                  </div>
                  <div className={styles.metricLabel}>Error Rate</div>
                </div>

                {/* Throughput */}
                <div
                  className={mergeClasses(
                    styles.metricBox,
                    styles.metricBoxFlex,
                  )}
                >
                  <div
                    className={mergeClasses(
                      styles.metricChange,
                      styles.metricChangeGreen,
                    )}
                  >
                    ↗{" "}
                    {experienceLevel === "new"
                      ? "120%"
                      : experienceLevel === "smb"
                        ? "180%"
                        : "240%"}
                  </div>
                  <div className={styles.metricValue}>
                    {experienceLevel === "new"
                      ? "8.5K/s"
                      : experienceLevel === "smb"
                        ? "18.2K/s"
                        : "42.1K/s"}
                  </div>
                  <div className={styles.metricLabel}>Throughput</div>
                </div>
              </div>

              {/* Button */}
              <div className={styles.cardFooter}>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                >
                  View metrics
                </FluentButton>
              </div>
            </div>
          </div>

          <div className={styles.twoColGrid}>
            {/* Resiliency & Disaster Recovery */}
            <div className={mergeClasses(styles.actionCard, styles.cardFlex)}>
              {/* Header with title and uptime badge */}
              <div className={styles.cardHeaderRow}>
                <div className={styles.cardTitleLarge}>
                  Resiliency & Disaster Recovery
                </div>
                <div
                  className={mergeClasses(
                    styles.badgePill,
                    styles.badgePillSuccessUptime,
                  )}
                >
                  {experienceLevel === "new"
                    ? "97.2%"
                    : experienceLevel === "smb"
                      ? "99.8%"
                      : "99.97%"}{" "}
                  Uptime
                </div>
              </div>

              {/* Subtitle */}
              <div className={styles.sectionDescShort}>
                High availability and business continuity monitoring
              </div>

              {/* Two metric boxes */}
              <div className={styles.metricGrid2}>
                {/* Availability SLA */}
                <div
                  className={mergeClasses(
                    styles.metricBox,
                    styles.metricBoxFlex,
                  )}
                >
                  <div
                    className={mergeClasses(
                      styles.metricChange,
                      styles.metricChangeSuccess,
                    )}
                  >
                    Last 30 days
                  </div>
                  <div className={styles.metricValue}>
                    {experienceLevel === "new"
                      ? "97.2%"
                      : experienceLevel === "smb"
                        ? "99.8%"
                        : "99.97%"}
                  </div>
                  <div className={styles.metricLabel}>Availability SLA</div>
                </div>

                {/* Recovery Point Objective */}
                <div
                  className={mergeClasses(
                    styles.metricBox,
                    styles.metricBoxFlex,
                  )}
                >
                  <div
                    className={mergeClasses(
                      styles.rpoTarget,
                      experienceLevel === "new"
                        ? styles.rpoTargetRed
                        : styles.rpoTargetGreen,
                    )}
                  >
                    Target:{" "}
                    {experienceLevel === "new"
                      ? "4hr"
                      : experienceLevel === "smb"
                        ? "30min"
                        : "15min"}
                  </div>
                  <div className={styles.metricValue}>
                    {experienceLevel === "new"
                      ? "<2hr"
                      : experienceLevel === "smb"
                        ? "<15min"
                        : "<5min"}
                  </div>
                  <div className={styles.metricLabel}>
                    Recovery Point Objective
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className={styles.cardFooter}>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                >
                  Review status
                </FluentButton>
              </div>
            </div>

            {/* Cost Optimization */}
            <div className={mergeClasses(styles.actionCard, styles.cardFlex)}>
              <div className={styles.cardHeaderRow}>
                <div className={styles.cardTitleLarge}>Cost Optimization</div>
                <div className={styles.badgePillCostInsights}>
                  <Lightbulb24Regular className={styles.lightbulbIcon} />3
                  Insights
                </div>
              </div>

              {/* Subtitle */}
              <div className={styles.sectionDescShort}>
                Your spending is 40% higher than last month.
              </div>

              {/* Colored container with numbers */}
              <div
                className={mergeClasses(
                  styles.metricBox,
                  styles.metricBoxPadded,
                )}
              >
                <div className={styles.gaugeRow}>
                  <div className={styles.gaugeCol}>
                    <div
                      className={mergeClasses(
                        styles.metricLabel,
                        styles.metricLabelMb4,
                      )}
                    >
                      {experienceLevel === "new"
                        ? "Starting free trial credits"
                        : experienceLevel === "smb"
                          ? "Monthly budget"
                          : "Quarterly budget"}
                    </div>
                    <div className={styles.metricValue}>
                      {experienceLevel === "new"
                        ? "$200.00"
                        : experienceLevel === "smb"
                          ? "$2,500"
                          : "$75,000"}
                    </div>
                  </div>

                  <div className={styles.gaugeCol}>
                    <div
                      className={mergeClasses(
                        styles.metricLabel,
                        styles.metricLabelMb4,
                      )}
                    >
                      Costs incurred
                    </div>
                    <div className={styles.metricValue}>
                      {experienceLevel === "new"
                        ? "$43.00"
                        : experienceLevel === "smb"
                          ? "$1,240"
                          : "$45,200"}
                    </div>
                  </div>

                  <div className={styles.gaugeCol}>
                    <div
                      className={mergeClasses(
                        styles.metricLabel,
                        styles.metricLabelMb4,
                      )}
                    >
                      {experienceLevel === "new"
                        ? "Available credits"
                        : "Remaining budget"}
                    </div>
                    <div className={styles.remainingBudgetValue}>
                      {experienceLevel === "new"
                        ? "$157.00"
                        : experienceLevel === "smb"
                          ? "$1,260"
                          : "$29,800"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className={styles.cardFooter}>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                  onClick={() => {
                    console.log("[v0] Go to cost management clicked");
                    handlePageChange("cost-management");
                  }}
                >
                  Manage costs
                </FluentButton>
              </div>
            </div>
          </div>

          {/* Update Management Section - Hidden */}
          {false && (
            <div className={styles.sectionMb32}>
              <div className={styles.twoColGridNoMb}>
                {/* Update status of machines */}
                <div className={styles.actionCard}>
                  <div className={styles.headerFlex}>
                    <span className={styles.headerTitle}>
                      Update status of machines
                    </span>
                    <QuestionCircle24Regular className={styles.infoIcon} />
                  </div>

                  <div className={styles.gaugeRowFlex}>
                    {/* Donut chart placeholder */}
                    <div className={styles.gaugeContainer}>
                      <div className={styles.donutChart1}>
                        <div className={styles.donutCenter}>
                          <div className={styles.donutValue}>
                            {getMachineCount()}
                          </div>
                          <div className={styles.donutLabel}>Machines</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.legendFlex1}>
                      <div className={styles.legendCol}>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarRed,
                            )}
                          ></div>
                          <span className={styles.legendValue}>2</span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarGreen,
                            )}
                          ></div>
                          <span className={styles.legendText}>
                            No Pending updates
                          </span>
                          <span className={styles.legendValue}>75</span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarOrange,
                            )}
                          ></div>
                          <span className={styles.legendText}>
                            Pending reboot
                          </span>
                          <span className={styles.legendValue}>3</span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarGreen,
                            )}
                          ></div>
                          <span className={styles.legendText}>
                            No update data
                          </span>
                          <span className={styles.legendValue}>0</span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarNeutral,
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
                  <div className={styles.headerFlex}>
                    <span className={styles.headerTitle}>
                      Patch orchestration configuration of Azure virtual
                      machines
                    </span>
                    <QuestionCircle24Regular className={styles.infoIcon} />
                  </div>

                  <div className={styles.gaugeRowFlex}>
                    {/* Donut chart placeholder */}
                    <div className={styles.gaugeContainer}>
                      <div className={styles.donutChart2}>
                        <div className={styles.donutCenter}>
                          <div className={styles.donutValue}>
                            {getMachineCount()}
                          </div>
                          <div className={styles.donutLabel}>Machines</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.legendFlex1}>
                      <div className={styles.legendCol}>
                        <div className={styles.flexRowGap8}>
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarBrand,
                            )}
                          ></div>
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          <span
                            className={mergeClasses(
                              styles.legendText,
                              styles.legendTextBrand,
                            )}
                          >
                            Customer managed sc...
                          </span>
                          <QuestionCircle24Regular
                            className={styles.infoIconSmall}
                          />
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          <span
                            className={mergeClasses(
                              styles.legendValue,
                              styles.legendValueBrand,
                            )}
                          >
                            75
                          </span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarGreen,
                            )}
                          ></div>
                          <span
                            className={mergeClasses(
                              styles.legendText,
                              styles.legendTextGreen,
                            )}
                          >
                            Image default
                          </span>
                          <QuestionCircle24Regular
                            className={styles.infoIconSmall}
                          />
                          <span
                            className={mergeClasses(
                              styles.legendValue,
                              styles.legendValueGreen,
                            )}
                          >
                            3
                          </span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarRed,
                            )}
                          ></div>
                          <span
                            className={mergeClasses(
                              styles.legendText,
                              styles.legendTextRed,
                            )}
                          >
                            Azure orchestrated
                          </span>
                          <QuestionCircle24Regular
                            className={styles.infoIconSmall}
                          />
                          <span
                            className={mergeClasses(
                              styles.legendValue,
                              styles.legendValueRed,
                            )}
                          >
                            0
                          </span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarBrand,
                            )}
                          ></div>
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          <span
                            className={mergeClasses(
                              styles.legendText,
                              styles.legendTextBrand,
                            )}
                          >
                            Manual updates
                          </span>
                          <QuestionCircle24Regular
                            className={styles.infoIconSmall}
                          />
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          <span
                            className={mergeClasses(
                              styles.legendValue,
                              styles.legendValueBrand,
                            )}
                          >
                            2
                          </span>
                        </div>
                        <div className={styles.flexRowGap8}>
                          <div
                            className={mergeClasses(
                              styles.legendBar,
                              styles.legendBarOrange,
                            )}
                          ></div>
                          <span
                            className={mergeClasses(
                              styles.legendText,
                              styles.legendTextOrange,
                            )}
                          >
                            Windows automatic update
                          </span>
                          <QuestionCircle24Regular
                            className={styles.infoIconSmall}
                          />
                          <span
                            className={mergeClasses(
                              styles.legendValue,
                              styles.legendValueOrange,
                            )}
                          >
                            2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {!hideProjects && (
            <div className={styles.projectOverview}>
              <div className={styles.resourcesHeaderRow}>
                <div className={styles.projectTitle}>Projects</div>
                <FluentButton
                  appearance="primary"
                  className={styles.newProjectButton}
                >
                  + New Project
                </FluentButton>
              </div>

              <FluentButton
                appearance="outline"
                icon={<Search24Regular />}
                className={mergeClasses(
                  styles.outlineButton,
                  styles.searchProjectsButton,
                )}
              >
                Search projects
              </FluentButton>

              <table className={styles.resourcesTable}>
                {experienceLevel !== "new" && (
                  <thead>
                    <tr>
                      <th className={styles.resourcesTableHeader}>Name</th>
                      <th className={styles.resourcesTableHeader}>Type</th>
                      <th className={styles.resourcesTableHeader}>Status</th>
                      <th className={styles.resourcesTableHeader}>Cost</th>
                      <th className={styles.resourcesTableHeader}>
                        Last viewed
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {experienceLevel === "new" ? (
                    <>
                      <tr
                        className={styles.cursorPointer}
                        onClick={() => setIsProjectExpanded(!isProjectExpanded)}
                      >
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.flexRowGap8}>
                            <ChevronDown24Regular
                              className={
                                isProjectExpanded
                                  ? styles.chevronIconExpanded
                                  : styles.chevronIconCollapsed
                              }
                            />
                            <div className={styles.brandColorText}>
                              <Folder24Regular />
                            </div>
                            <span className={styles.brandColorText}>
                              MyDemo-Project
                            </span>
                            <Star16Filled className={styles.brandColorText} />
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>Project</td>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.flexRowGap4}>
                            <div className={styles.statusDotGreenSmall} />
                            Running
                          </div>
                        </td>
                        <td
                          className={mergeClasses(
                            styles.resourcesTableCell,
                            styles.brandColorText,
                          )}
                        >
                          $11.47
                        </td>
                        <td className={styles.resourcesTableCell}>
                          2 hours ago
                        </td>
                      </tr>
                      {isProjectExpanded && (
                        <>
                          <tr>
                            <td
                              className={mergeClasses(
                                styles.resourcesTableCell,
                                styles.cellIndented,
                              )}
                            >
                              <div className={styles.flexRowGap8}>
                                <Globe24Regular
                                  className={styles.iconBrand20}
                                />
                                <span className={styles.brandColorText}>
                                  my-first-web-app
                                </span>
                              </div>
                            </td>
                            <td className={styles.resourcesTableCell}>
                              App Service
                            </td>
                            <td className={styles.resourcesTableCell}>
                              <div className={styles.flexRowGap4}>
                                <div className={styles.statusDotGreenSmall} />
                                Running
                              </div>
                            </td>
                            <td
                              className={mergeClasses(
                                styles.resourcesTableCell,
                                styles.brandColorText,
                              )}
                            >
                              $2.45
                            </td>
                            <td className={styles.resourcesTableCell}>
                              December 15, 2024
                            </td>
                          </tr>
                          <tr>
                            <td
                              className={mergeClasses(
                                styles.resourcesTableCell,
                                styles.cellIndented,
                              )}
                            >
                              <div className={styles.flexRowGap8}>
                                <Storage24Regular
                                  className={styles.iconBrand20}
                                />
                                <span className={styles.brandColorText}>
                                  test-storage
                                </span>
                              </div>
                            </td>
                            <td className={styles.resourcesTableCell}>
                              Storage account
                            </td>
                            <td className={styles.resourcesTableCell}>
                              <div className={styles.flexRowGap4}>
                                <div className={styles.statusDotGreenSmall} />
                                Available
                              </div>
                            </td>
                            <td
                              className={mergeClasses(
                                styles.resourcesTableCell,
                                styles.brandColorText,
                              )}
                            >
                              $0.12
                            </td>
                            <td className={styles.resourcesTableCell}>
                              December 14, 2024
                            </td>
                          </tr>
                          <tr>
                            <td
                              className={mergeClasses(
                                styles.resourcesTableCell,
                                styles.cellIndented,
                              )}
                            >
                              <div className={styles.flexRowGap8}>
                                <Database24Regular
                                  className={styles.iconBrand20}
                                />
                                <span className={styles.brandColorText}>
                                  learning-db
                                </span>
                              </div>
                            </td>
                            <td className={styles.resourcesTableCell}>
                              SQL Database
                            </td>
                            <td className={styles.resourcesTableCell}>
                              <div className={styles.flexRowGap4}>
                                <div className={styles.statusDotGreenSmall} />
                                Online
                              </div>
                            </td>
                            <td
                              className={mergeClasses(
                                styles.resourcesTableCell,
                                styles.brandColorText,
                              )}
                            >
                              $8.90
                            </td>
                            <td className={styles.resourcesTableCell}>
                              December 13, 2024
                            </td>
                          </tr>
                        </>
                      )}
                    </>
                  ) : (
                    projectsData.map((project, index) => (
                      <tr key={index}>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.flexRowGap8}>
                            <div className={styles.brandColorText}>
                              {project.icon}
                            </div>
                            <span className={styles.brandColorText}>
                              {project.name}
                            </span>
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          {project.type}
                        </td>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.flexRowGap4}>
                            <div
                              className={
                                project.statusColor ===
                                tokens.colorPaletteRedForeground1
                                  ? styles.statusDotProjectRed
                                  : project.statusColor ===
                                      tokens.colorPaletteDarkOrangeForeground1
                                    ? styles.statusDotProjectOrange
                                    : styles.statusDotProjectGreen
                              }
                            />
                            {project.status}
                          </div>
                        </td>
                        <td
                          className={mergeClasses(
                            styles.resourcesTableCell,
                            styles.brandColorText,
                          )}
                        >
                          {project.cost}
                        </td>
                        <td className={styles.resourcesTableCell}>
                          {project.lastViewed}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </FluentProvider>
  );
};

/** Level 1 "Manage" page for viewing and managing projects/resources with tabbed views,
 * filtering dropdowns, resource tables with status/cost columns, and a goals configuration drawer.
 * Composed from: TopNav, TabList, NextStepsCarousel, and resource/project table rows.
 * Instead of: building inline resource management dashboards with custom table layouts. */
const Level1Manage = ({
  experienceLevel,
  customHeader,
  hideNextSteps,
  hideProjects,
}: Level1ManageProps) => {
  return (
    <Level1ManageContent
      experienceLevel={experienceLevel}
      customHeader={customHeader}
      hideNextSteps={hideNextSteps}
      hideProjects={hideProjects}
    />
  );
};

export default Level1Manage;
