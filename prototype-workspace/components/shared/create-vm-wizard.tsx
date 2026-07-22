"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Button,
  Input,
  Dropdown,
  Option,
  Label,
  Text,
  RadioGroup,
  Radio,
  Checkbox,
  Textarea,
  Subtitle1,
  Subtitle2,
  Body1,
  Caption1,
  Link,
  Tooltip,
  mergeClasses,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import PageBreadcrumb from "./page-breadcrumb";
import PageHeader from "./page-header";
import WizardLayout from "./wizard-layout";
import WizardStepNav from "./wizard-step-nav";
import type { WizardStepGroup } from "./wizard-step-nav";
import WizardCostPanel from "./wizard-cost-panel";
import type { CostLineItem } from "./wizard-cost-panel";
import {
  Info20Regular,
  Checkmark20Regular,
  QuestionCircle20Regular,
  Lightbulb20Regular,
  ChevronLeft20Regular,
  ChevronDown20Regular,
  ChevronUp20Regular,
  ChevronRight20Regular,
  CheckmarkCircle48Regular,
  ArrowExport20Regular,
  Document20Regular,
  Star20Regular,
  Save20Regular,
  Edit20Regular,
  ArrowClockwise20Regular,
  Add20Regular,
  Dismiss20Regular,
  Money20Regular,
  Shield20Regular,
  Flash20Regular,
  ChartMultiple20Regular,
  Map20Regular,
  Globe20Regular,
  Save20Filled,
  Connector20Regular,
  Home20Regular,
  Home20Filled,
  Database20Regular,
  ShieldTask20Regular,
  Dismiss24Regular,
  Info12Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";
import DeploymentSuccessCard from "./deployment-success-card";

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
  teachingBubbleFadeIn: {
    animationName: {
      "0%": {
        opacity: 0,
        transform: "translateY(10px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    animationDuration: "0.4s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  centerSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formField: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  assistantSection: {
    marginBottom: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  assistantIcon: {
    width: tokens.spacingVerticalXXXL,
    height: tokens.spacingVerticalXXXL,
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground2,
  },
  storageCardEnter: {
    animationName: {
      from: {
        opacity: 0,
        transform: "translateY(-20px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    animationDuration: "300ms",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    animationFillMode: "both",
  },
  // Deployment completion styles
  deploymentContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  deploymentContent: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "48px 32px 120px",
  },
  deploymentWrapper: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  deploymentHeader: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
  },
  deploymentHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  deploymentSection: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  deploymentSectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM + " " + tokens.spacingHorizontalL,
    cursor: "pointer",
  },
  deploymentSectionContent: {
    padding: "0 " + tokens.spacingHorizontalL + " " + tokens.spacingVerticalL,
  },
  deploymentTable: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalL,
  },
  deploymentFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalM + " " + tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    zIndex: 100,
  },
  // EMM Drawer styles (updating existing definitions)
  emmBackdrop: {
    position: "fixed",
    top: "48px",
    left: 0,
    right: 0,
    bottom: "56px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
  },
  emmDrawer: {
    position: "fixed",
    top: "48px",
    right: 0,
    bottom: "56px",
    width: "320px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
  },
  emmHeader: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-start",
    padding: "24px 16px 12px 24px",
    flexShrink: 0,
  },
  emmBody: {
    flex: 1,
    overflowY: "auto",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  emmFooter: {
    padding: "16px 24px 32px",
    flexShrink: 0,
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
  emmGradientContainer: {
    background:
      "linear-gradient(54.4deg, rgb(222, 232, 249) 4.7%, rgb(241, 236, 237) 100%)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  emmBulletList: {
    margin: 0,
    paddingLeft: "21px",
    listStyleType: "disc",
  },
  // Header styles
  headerContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
  },
  headerBackButton: {
    minWidth: "auto",
    padding: tokens.spacingVerticalS,
    color: tokens.colorBrandForeground1,
  },
  headerIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    display: "block",
  },
  headerDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  // Form group styles
  formGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalM,
    flexWrap: "wrap",
  },
  formButtonGroup: {
    flex: 1,
    minWidth: "150px",
  },
  formLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  formAdvancedButton: {
    color: tokens.colorBrandForeground1,
    minWidth: "auto",
    padding: "0px " + tokens.spacingVerticalXS,
    fontSize: tokens.fontSizeBase200,
  },
  formDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalS,
  },
  formHelperText: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  formHelperTextLeft: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
    marginLeft: "28px",
  },
  // Section headers
  sectionTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  sectionHeader: {
    display: "block",
    marginBottom: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalXXL,
  },
  stepTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  stepDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalXXL,
  },
  // Optimization preset styles
  optimizationCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    marginBottom: tokens.spacingVerticalL,
  },
  optimizationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  optimizationTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  optimizationBudgetButton: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  optimizationDescription: {
    color: tokens.colorNeutralForeground2,
  },
  // Radio and checkbox groups
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  checkboxGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  checkboxGroupVertical: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  // Data disk styles
  dataDiskEmpty: {
    padding: tokens.spacingVerticalXXL,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    textAlign: "center",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  dataDiskEmptyText: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  dataDiskCard: {
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    marginBottom: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  dataDiskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalM,
  },
  dataDiskGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalM,
  },
  // Info cards and notifications
  infoCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalM,
  },
  warningCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorPaletteYellowBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorPaletteYellowBorder2}`,
    marginTop: tokens.spacingVerticalM,
  },
  successCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    marginTop: tokens.spacingVerticalM,
  },
  spotDiscountCard: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorPaletteGreenBackground2,
    borderRadius: "6px",
    marginTop: tokens.spacingVerticalM,
  },
  // Button navigation
  wizardNavigation: {
    display: "flex",
    justifyContent: "flex-start",
    gap: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  // Summary review styles
  reviewCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  reviewGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalL + " " + tokens.spacingVerticalXXL,
  },
  reviewItem: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  reviewEditButton: {
    minWidth: "auto",
    padding: tokens.spacingVerticalXS + " " + tokens.spacingVerticalS,
    cursor: "pointer",
  },
  // Topology styles
  topologyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalXXL + " " + tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
  },
  topologyRegion: {
    width: "100%",
    maxWidth: "600px",
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  topologyVnet: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    marginBottom: tokens.spacingVerticalM,
  },
  topologyVnetHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  topologyIcon: {
    width: tokens.spacingVerticalXXL,
    height: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topologySubnet: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  topologySubnetLabel: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  topologyVm: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
  },
  topologyVmIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topologyVmDetails: {
    flex: 1,
  },
  topologyVmName: {
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  topologyVmSize: {
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  topologyAttached: {
    marginTop: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
  },
  topologyAttachedIcon: {
    width: tokens.spacingVerticalXXL,
    height: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // Alert and monitoring styles
  alertRulesList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  alertRuleItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  alertRuleBullet: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandForeground1,
  },
  insightFeature: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "6px",
  },
  insightIcon: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXS,
  },
  insightDescription: {
    color: tokens.colorNeutralForeground3,
  },
  // Tag management
  tagInputRow: {
    display: "flex",
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
    alignItems: "flex-end",
  },
  tagInputField: {
    flex: 1,
  },
  tagCurrentList: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
  },
  tagEmptyState: {
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
  // Generic utility classes
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexGap8: {
    gap: tokens.spacingHorizontalS,
  },
  flexGap12: {
    gap: tokens.spacingHorizontalM,
  },
  flexGap16: {
    gap: tokens.spacingHorizontalL,
  },
  gridTwoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalM,
  },
  textBlock: {
    display: "block",
  },
  textMuted: {
    color: tokens.colorNeutralForeground3,
  },
  textDescription: {
    color: tokens.colorNeutralForeground2,
  },
  marginBottom8: {
    marginBottom: tokens.spacingVerticalS,
  },
  marginBottom12: {
    marginBottom: tokens.spacingVerticalM,
  },
  marginBottom16: {
    marginBottom: tokens.spacingVerticalL,
  },
  marginTop12: {
    marginTop: tokens.spacingVerticalM,
  },
  marginTop16: {
    marginTop: tokens.spacingVerticalL,
  },
  // Width utility classes
  fullWidth: {
    width: "100%",
  },
  flex1: {
    flex: 1,
  },
  // Form input styling
  minWidthAutoButton: {
    minWidth: "auto",
    padding: tokens.spacingVerticalS,
  },
  headerBackButtonStyle: {
    minWidth: "auto",
    padding: tokens.spacingVerticalS,
    color: tokens.colorBrandForeground1,
  },
  iconContainer48: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSize28: {
    width: "28px",
    height: "28px",
  },
  iconSize20: {
    width: "20px",
    height: "20px",
  },
  iconContainer32: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer40: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // Spacing utilities
  marginTopXS: {
    marginTop: tokens.spacingVerticalXS,
  },
  marginBottomXS: {
    marginBottom: tokens.spacingVerticalXS,
  },
  marginTopS: {
    marginTop: tokens.spacingVerticalS,
  },
  marginBottomS: {
    marginBottom: tokens.spacingVerticalS,
  },
  marginTopM: {
    marginTop: tokens.spacingVerticalM,
  },
  marginBottomM: {
    marginBottom: tokens.spacingVerticalM,
  },
  marginTopL: {
    marginTop: tokens.spacingVerticalL,
  },
  marginBottomL: {
    marginBottom: tokens.spacingVerticalL,
  },
  marginTopXL: {
    marginTop: tokens.spacingVerticalXL,
  },
  marginBottomXL: {
    marginBottom: tokens.spacingVerticalXL,
  },
  marginBottomXXL: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  paddingVerticalS: {
    padding: tokens.spacingVerticalS,
  },
  paddingVerticalM: {
    padding: tokens.spacingVerticalM,
  },
  paddingVerticalL: {
    padding: tokens.spacingVerticalL,
  },
  paddingVerticalXL: {
    padding: tokens.spacingVerticalXL,
  },
  paddingVerticalXXL: {
    padding: tokens.spacingVerticalXXL,
  },
  // Text utilities
  textWeight600: {
    fontWeight: tokens.fontWeightSemibold,
  },
  textWeight700: {
    fontWeight: tokens.fontWeightBold,
  },
  fontSizeBase200: {
    fontSize: tokens.fontSizeBase200,
  },
  fontSizeBase300: {
    fontSize: tokens.fontSizeBase300,
  },
  fontSizeBase400: {
    fontSize: tokens.fontSizeBase400,
  },
  fontSizeBase500: {
    fontSize: tokens.fontSizeBase500,
  },
  lineHeight14: {
    fontSize: "10px",
    lineHeight: "14px",
  },
  lineHeight18: {
    fontSize: "13px",
    lineHeight: "18px",
  },
  lineHeight20: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  lineHeight32: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  // Layout utilities
  cursorPointer: {
    cursor: "pointer",
  },
  borderRadius6: {
    borderRadius: "6px",
  },
  flexShrink0: {
    flexShrink: 0,
  },
  // Deployment layout
  deploymentMainContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "48px 32px 120px",
  },
  deploymentMaxWidth800: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  // Card and container backgrounds
  cardBackground: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  neutralBackground2: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  neutralBackground3: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  brandBackground2: {
    backgroundColor: tokens.colorBrandBackground2,
  },
  // Border styles
  borderStroke1: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  borderStroke2: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  borderBrand: {
    border: `1px solid ${tokens.colorBrandStroke1}`,
  },
  borderRadius8: {
    borderRadius: tokens.borderRadiusXLarge,
  },
  // Table styling
  tableHeader: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground3,
  },
  tableCell: {
    padding: "8px 12px",
    fontSize: "13px",
  },
  tableCellResource: {
    color: tokens.colorBrandForeground1,
  },
  statusOK: {
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: 600,
  },
  // Form group helpers
  formGroupRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalM,
    flexWrap: "wrap",
  },
  // Grid layouts
  gridThreeCol: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingVerticalL,
  },
  // Next steps card styling
  nextStepCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    cursor: "pointer",
  },
  nextStepCardIcon: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingVerticalS,
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  },
  fullWidthTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRowBorder: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  iconSize24: {
    width: "24px",
    height: "24px",
  },
  emmFeaturesList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  formFieldColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    width: "100%",
  },
  // Common inline style patterns - ADD ALL THE COMMON PATTERNS
  fieldCaption: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: "4px",
    fontSize: tokens.fontSizeBase200,
  },
  sectionSpacer24: {
    display: "block",
    marginBottom: "16px",
    marginTop: "24px",
  },
  sectionSpacer32: {
    display: "block",
    marginBottom: "16px",
    marginTop: "32px",
  },
  fieldDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: "12px",
  },
  flexRowGap8: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  flexRowGap12: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  linkButton: {
    color: tokens.colorBrandForeground1,
    minWidth: "auto",
    padding: "0",
  },
  blockElement: {
    display: "block",
  },
  blockMarginBottom8: {
    display: "block",
    marginBottom: "8px",
  },
  blockMarginBottom12: {
    display: "block",
    marginBottom: "12px",
  },
  blockMarginBottom20: {
    display: "block",
    marginBottom: "20px",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "48px 32px 120px",
  },
  flexColumnGap8: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  gridTwoColGap16: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px 32px",
  },
  blockMarginTop2: {
    marginTop: "2px",
  },
  flexAlignStart: {
    display: "flex",
    alignItems: "flex-start",
  },
  paddingVertical12: {
    padding: "12px",
  },
  paddingVertical16: {
    padding: "16px",
  },
  marginLeft28: {
    marginLeft: "28px",
  },
  marginTop8: {
    marginTop: "8px",
  },
  // Additional common patterns found in the file
  configurationCardMarginTop12: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
  },
  successCardMarginTop12: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    marginTop: "12px",
  },
  cardStyleComplex: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  blockMarginLeft28: {
    display: "block",
    marginLeft: "28px",
  },
  blockMarginTop4Left28: {
    display: "block",
    marginTop: "4px",
    marginLeft: "28px",
  },
  listStyleNone: {
    margin: 0,
    paddingLeft: "20px",
    color: tokens.colorNeutralForeground2,
  },
  gridColumnSpacing: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  paddingSpacing: {
    padding: "8px 0",
    color: tokens.colorNeutralForeground2,
  },
  // Additional patterns found during cleanup
  dataDiskCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  formLabelWithTooltip: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  tooltipIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "help",
  },
  configurationCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalL,
  },
  flexButton: {
    flex: "1",
    minWidth: "150px",
  },
  optimizationContainer: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    marginBottom: tokens.spacingVerticalL,
  },
  optimizationInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  optimizationTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  checkboxDescription: {
    marginLeft: "28px",
  },
  emmFormField: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  emmInnerGroup: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  emmTooltipIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "help",
  },
  emmCostContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    cursor: "pointer",
  },
  emmCostColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    flex: 1,
  },
  emmCostTitle: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "14px",
    lineHeight: "20px",
  },
  emmCostPricing: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "24px",
    lineHeight: "32px",
  },
  emmFooterButtons: {
    padding: "16px 24px 32px",
    flexShrink: 0,
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
  fixedFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    zIndex: 100,
  },
  centerLayout: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
  },
  wizardFooter: {
    display: "flex",
    justifyContent: "flex-start",
    gap: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewSummaryCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  reviewSummaryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  reviewSummaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px 32px",
  },
  topologyCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  topologyDiagram: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
    padding: "32px 24px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
  },
  regionContainer: {
    width: "100%",
    maxWidth: "600px",
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  vnetContainer: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    marginBottom: tokens.spacingVerticalM,
  },
  vnetHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  subnetContainer: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  subnetLabel: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  vmContainer: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
  },
  vmDetails: {
    flex: 1,
  },
  emptyDataDiskState: {
    padding: tokens.spacingVerticalXXL,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    textAlign: "center",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  advancedButtonStyle: {
    color: tokens.colorBrandForeground1,
    minWidth: "auto",
    padding: "0px 4px",
    fontSize: "12px",
  },
  infoCardWithIcon: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalM,
  },
  infoCardWithIconText: {
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  infoCardFlexShrink: {
    flexShrink: 0,
    marginTop: "2px",
  },
  yellowCardWithIcon: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorPaletteYellowBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorPaletteYellowBorder2}`,
    marginTop: tokens.spacingVerticalM,
  },
  greenIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  brandText: {
    color: tokens.colorBrandForeground1,
  },
  iconMarginTop2: {
    marginTop: "2px",
  },
  moreLinksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
  },
  marginTopXXL: {
    marginTop: tokens.spacingVerticalXXL,
  },
  attachedContainer: {
    marginTop: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
  },
});

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateVMWizardProps {
  customHeader?: React.ReactNode | null;
  onBack?: () => void;
  onComplete?: () => void;
  onGoToResource?: () => void;
}

const CreateVMWizard: React.FC<CreateVMWizardProps> = ({
  customHeader,
  onBack,
  onComplete,
  onGoToResource,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { sourcePage, handlePageChange } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  const [isCreatingStorageAccount, setIsCreatingStorageAccount] =
    useState(false);
  const [storageAccountCreated, setStorageAccountCreated] = useState(false);
  const [emmDrawerOpen, setEmmDrawerOpen] = useState(false);
  const [emmCostExpanded, setEmmCostExpanded] = useState(true);

  const [formData, setFormData] = useState({
    optimizationType: "cost",
    subscription: "",
    resourceGroup: "",
    vmName: "",
    region: "",
    availabilityOptions: "none",
    zoneOptions: "none",
    availabilityZones: [] as string[],
    securityType: "standard",
    image: "ubuntu",
    size: "standard-b2s",
    vmArchitecture: "x64",
    runWithSpotDiscount: false,
    vmDiskEncryption: "platform-managed",
    encryptionAtHost: false,
    osDiskSize: "default",
    osDiskType: "premium-ssd",
    deleteOSDiskWithVM: true,
    enableUltraDiskCompatibility: false,
    keyManagement: "platform-managed",
    dataDisks: [] as Array<{
      name: string;
      size: string;
      type: string;
      hostCaching: string;
    }>,
    virtualNetwork: "",
    subnet: "",
    publicIP: "none",
    nicNetworkSecurityGroup: "basic",
    publicInboundPortsNetwork: "allow-selected",
    selectedInboundPortsNetwork: [] as string[],
    deleteNICWithVM: true,
    enableAcceleratedNetworking: false,
    loadBalancingOptions: "none",
    enableDefenderForCloud: false,
    enableSystemAssignedIdentity: false,
    enableEntraID: false,
    loginWithEntraID: false,
    enablePeriodicAssessment: true,
    patchOrchestrationOptions: "azure-orchestrated",
    enableRecommendedAlertRules: false,
    bootDiagnostics: "disable",
    enableOSGuestDiagnostics: false,
    enableApplicationHealthMonitoring: false,
    enableVMInsights: false,
    authenticationType: "ssh",
    username: "",
    password: "",
    sshPublicKeySource: "generate-new",
    sshKeyType: "rsa",
    publicInboundPorts: "allow-selected",
    selectedInboundPorts: [] as string[],
  });

  const steps: Step[] = [
    { id: 1, title: "Quick create", completed: false },
    { id: 2, title: "Basics", completed: false },
    { id: 3, title: "Disks", completed: false },
    { id: 4, title: "Networking", completed: false },
    { id: 5, title: "Management", completed: false },
    { id: 6, title: "Monitoring", completed: false },
    { id: 7, title: "Tags", completed: false },
    { id: 8, title: "Review", completed: false },
  ];

  const handleBackClick = () => {
    // If onBack callback is provided, use it
    if (onBack) {
      onBack();
    } else if (customHeader !== undefined) {
      // If customHeader is provided, use browser back
      router.back();
    } else {
      // Otherwise use navigation context (portal-ia context)
      if (sourcePage) {
        handlePageChange(sourcePage);
      } else {
        handlePageChange("returning-home-2");
      }
    }
  };

  const handleCreate = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  };

  const assistantContent: Record<
    string,
    {
      title: string;
      whatItIs: string;
      whyItMatters: string;
      rulesExamples: string;
      proTip?: string;
    }
  > = {
    subscription: {
      title: "Subscription",
      whatItIs: "Where billing and policy apply for this VM.",
      whyItMatters:
        "Determines billing, access policies, and resource quotas. Different subscriptions may have different service limits and VM availability.",
      rulesExamples:
        "Select from available subscriptions in your tenant. Each has its own spending limits and policies.",
      proTip:
        "Use separate subscriptions for different environments (dev/test/prod) or departments for better cost tracking.",
    },
    resourceGroup: {
      title: "Resource Group",
      whatItIs:
        "Logical container for resources that share the same lifecycle.",
      whyItMatters:
        "Resources in the same group can be managed together. Deleting a resource group deletes all resources within it.",
      rulesExamples:
        'Choose an existing group or create new. Example: "rg-myapp-vms-prod" for production VM resources.',
      proTip:
        "Group VMs with their related resources (disks, NICs, NSGs) for easier management.",
    },
    vmName: {
      title: "Virtual Machine Name",
      whatItIs: "Unique identifier for your virtual machine.",
      whyItMatters:
        "This name is used to identify the VM in the portal and becomes the hostname. Must be unique within the resource group.",
      rulesExamples:
        'Use 1-64 characters: letters, numbers, hyphens, and underscores. Example: "vm-web-prod-001"',
      proTip:
        "Use a naming convention that includes environment and purpose (e.g., vm-webapp-prod-01).",
    },
    region: {
      title: "Region",
      whatItIs: "Physical datacenter location where your VM will run.",
      whyItMatters:
        "Affects latency, data residency compliance, pricing, and VM SKU availability. Choose closest to your users.",
      rulesExamples:
        "Select from available Azure regions. Popular: East US, West Europe, Southeast Asia.",
      proTip:
        "Choose a region close to your users for best performance and check VM availability.",
    },
    image: {
      title: "Image",
      whatItIs: "Operating system and pre-configured software for your VM.",
      whyItMatters:
        "Determines the OS, included software, and compatibility with your applications.",
      rulesExamples:
        "Windows Server, Ubuntu, Red Hat Enterprise Linux, or custom marketplace images.",
      proTip:
        "Use latest LTS versions for production workloads for better security and support.",
    },
    size: {
      title: "Size",
      whatItIs: "VM compute resources including CPU, memory, and storage.",
      whyItMatters:
        "Directly impacts performance and cost. Larger sizes cost more but provide better performance.",
      rulesExamples:
        "B-series for burstable workloads, D-series for general purpose, E-series for memory-intensive apps.",
      proTip:
        "Start with a smaller size and scale up as needed. B-series is cost-effective for dev/test.",
    },
    authenticationType: {
      title: "Authentication",
      whatItIs: "How you'll securely access the VM.",
      whyItMatters:
        "SSH keys are more secure than passwords. Proper authentication prevents unauthorized access.",
      rulesExamples:
        "SSH public key (recommended for Linux) or password. Windows VMs use password/RDP.",
      proTip:
        "Always use SSH keys for Linux VMs in production for better security.",
    },
  };

  const applyOptimizationPreset = (type: string) => {
    let updates: Partial<typeof formData> = { optimizationType: type };

    switch (type) {
      case "cost":
        // Optimized for cost: smallest VM only, no networking or other services ($30.37)
        updates = {
          ...updates,
          size: "standard-b2s",
          osDiskType: "premium-ssd",
          osDiskSize: "default",
          runWithSpotDiscount: false,
          availabilityOptions: "none",
          publicIP: "none",
          loadBalancingOptions: "none",
          enableAcceleratedNetworking: false,
          enableVMInsights: false,
          enableOSGuestDiagnostics: false,
          enableDefenderForCloud: false,
          bootDiagnostics: "disable",
        };
        break;

      case "resilience":
        // Optimized for resilience: balanced VM, premium disks, redundancy
        updates = {
          ...updates,
          size: "standard-d2s-v3",
          osDiskType: "premium-ssd",
          osDiskSize: "128",
          runWithSpotDiscount: false,
          availabilityOptions: "availability-zone",
          zoneOptions: "multiple",
          availabilityZones: ["1", "2", "3"],
          publicIP: "create-new",
          loadBalancingOptions: "azure-load-balancer",
          enableAcceleratedNetworking: true,
          enableVMInsights: true,
          enableOSGuestDiagnostics: true,
          enableDefenderForCloud: true,
          bootDiagnostics: "managed-storage",
          enablePeriodicAssessment: true,
          patchOrchestrationOptions: "azure-orchestrated",
        };
        break;

      case "availability":
        // Optimized for availability: high-performance VM, premium storage, full monitoring
        updates = {
          ...updates,
          size: "standard-d4s-v3",
          osDiskType: "premium-ssd-v2",
          osDiskSize: "256",
          runWithSpotDiscount: false,
          availabilityOptions: "availability-zone",
          zoneOptions: "multiple",
          availabilityZones: ["1", "2", "3"],
          publicIP: "create-new",
          loadBalancingOptions: "azure-load-balancer",
          enableAcceleratedNetworking: true,
          enableVMInsights: true,
          enableOSGuestDiagnostics: true,
          enableDefenderForCloud: true,
          enableApplicationHealthMonitoring: true,
          bootDiagnostics: "managed-storage",
          enablePeriodicAssessment: true,
          patchOrchestrationOptions: "azure-orchestrated",
          enableRecommendedAlertRules: true,
        };
        break;

      case "manual":
        // Manual: clear configuration so user starts fresh with no cost
        updates = {
          ...updates,
          size: "",
          osDiskType: "premium-ssd",
          osDiskSize: "default",
          runWithSpotDiscount: false,
          availabilityOptions: "none",
          publicIP: "none",
          loadBalancingOptions: "none",
          enableAcceleratedNetworking: false,
          enableVMInsights: false,
          enableOSGuestDiagnostics: false,
          enableDefenderForCloud: false,
          bootDiagnostics: "disable",
        };
        break;
    }

    setFormData({ ...formData, ...updates });
  };

  const getCostData = () => {
    // Calculate VM cost based on size
    const vmCosts: Record<string, number> = {
      "standard-b2s": 30.37,
      "standard-d2s-v3": 70.08,
      "standard-d4s-v3": 140.16,
      "standard-e4s-v3": 200.25,
    };

    // Calculate disk cost based on type and size
    const diskTypeCosts: Record<string, number> = {
      "premium-ssd": 4.81,
      "premium-ssd-v2": 6.5,
      "standard-ssd": 1.92,
      "standard-hdd": 0.96,
      "ultra-ssd": 12.29,
    };

    const diskSizeCosts: Record<string, number> = {
      default: 0,
      "64": 4.81,
      "128": 9.62,
      "256": 19.24,
      "512": 38.48,
      "1024": 76.96,
      "2048": 153.92,
    };

    // VM compute cost with spot discount
    let vmCost = vmCosts[formData.size] || 0;
    if (formData.runWithSpotDiscount) {
      vmCost = vmCost * 0.2; // 80% discount for spot instances
    }

    // OS Disk cost (only charge if non-default size is selected)
    const diskTypeCost = diskTypeCosts[formData.osDiskType] || 0;
    const diskSizeCost =
      formData.osDiskSize === "default"
        ? 0
        : diskSizeCosts[formData.osDiskSize] || 0;
    // Only add disk cost if a non-default size is selected (default disk is included in VM price)
    const osDiskCost =
      formData.osDiskSize === "default" ? 0 : diskTypeCost + diskSizeCost;

    // Data disks cost
    let dataDisksTotal = 0;
    formData.dataDisks.forEach((disk) => {
      const diskType = diskTypeCosts[disk.type] || 0;
      const diskSize = diskSizeCosts[disk.size] || 0;
      dataDisksTotal += diskType + diskSize;
    });

    // Networking costs
    let networkingCost = 0;
    if (formData.publicIP === "create-new") {
      networkingCost += 3.65; // Standard public IP cost
    }
    if (formData.loadBalancingOptions === "azure-load-balancer") {
      networkingCost += 18.25; // Basic load balancer cost
    } else if (formData.loadBalancingOptions === "application-gateway") {
      networkingCost += 125.0; // Application gateway cost
    }

    // Monitoring and management costs
    let monitoringCost = 0;
    if (formData.enableVMInsights) {
      monitoringCost += 2.3; // Log Analytics ingestion cost estimate
    }
    if (formData.enableOSGuestDiagnostics) {
      monitoringCost += 0.5; // Storage cost for diagnostics
    }

    const availabilityCosts: Record<string, number> = {
      none: 0,
      "availability-zone": 0,
      "availability-set": 0,
      vmss: 0,
    };
    const availabilityCost =
      availabilityCosts[formData.availabilityOptions] || 0;

    // Storage Account costs (if created)
    let storageAccountCost = 0;
    if (storageAccountCreated) {
      storageAccountCost = 0.18 + 2.5;
    }

    // VM size detail text
    const vmSizeDetail =
      formData.size === "standard-b2s"
        ? "Standard_B2s (2 vCPU, 4 GB)"
        : formData.size === "standard-d2s-v3"
          ? "Standard_D2s_v3 (2 vCPU, 8 GB)"
          : formData.size === "standard-d4s-v3"
            ? "Standard_D4s_v3 (4 vCPU, 16 GB)"
            : formData.size === "standard-e4s-v3"
              ? "Standard_E4s_v3 (4 vCPU, 32 GB)"
              : "Not selected";

    // OS disk detail text
    const diskTypeLabel =
      formData.osDiskType === "premium-ssd"
        ? "Premium SSD"
        : formData.osDiskType === "premium-ssd-v2"
          ? "Premium SSD v2"
          : formData.osDiskType === "standard-ssd"
            ? "Standard SSD"
            : formData.osDiskType === "standard-hdd"
              ? "Standard HDD"
              : formData.osDiskType === "ultra-ssd"
                ? "Ultra SSD"
                : "Not selected";
    const osDiskDetail = `${diskTypeLabel}${formData.osDiskSize !== "default" ? ` - ${formData.osDiskSize} GiB` : " - Default"}`;

    // Build items array
    const items: CostLineItem[] = [];

    if (isCreatingStorageAccount) {
      // Condensed view
      items.push({ label: "Virtual Machine", value: `$${vmCost.toFixed(2)}` });
      items.push({ label: "OS Disk", value: `$${osDiskCost.toFixed(2)}` });
      if (dataDisksTotal > 0) {
        items.push({ label: "Data Disks", value: `$${dataDisksTotal.toFixed(2)}` });
      }
      items.push({
        label: "Networking",
        detail: networkingCost === 0 ? "Not configured" : undefined,
        value: `$${networkingCost.toFixed(2)}`,
      });
      items.push({
        label: "Monitoring",
        detail: monitoringCost === 0 ? "Not configured" : undefined,
        value: `$${monitoringCost.toFixed(2)}`,
      });
      if (availabilityCost > 0) {
        items.push({ label: "Availability", value: `$${availabilityCost.toFixed(2)}` });
      }
      if (storageAccountCreated && storageAccountCost > 0) {
        items.push({ label: "Storage Account", value: `$${storageAccountCost.toFixed(2)}` });
      }

      const totalCost = vmCost + osDiskCost + dataDisksTotal + networkingCost + monitoringCost + availabilityCost + storageAccountCost;
      return { items, total: `$${totalCost.toFixed(2)}` };
    }

    // Full view
    items.push({ label: "Virtual Machine", detail: vmSizeDetail, value: `$${vmCost.toFixed(2)}` });
    items.push({ label: "OS Disk", detail: osDiskDetail, value: `$${osDiskCost.toFixed(2)}` });
    if (dataDisksTotal > 0) {
      items.push({
        label: "Data Disks",
        detail: `${formData.dataDisks.length} disk${formData.dataDisks.length !== 1 ? "s" : ""}`,
        value: `$${dataDisksTotal.toFixed(2)}`,
      });
    }

    // Additional services on Review step
    if (currentStep === 8) {
      items.push({ label: "Virtual Network", detail: "Standard tier", value: "$0.00" });
      items.push({ label: "Azure Bastion", detail: "Standard SKU", value: "$140.00" });
      items.push({ label: "NSG (2)", detail: "Network security groups", value: "$0.00" });
    } else {
      items.push({ label: "Networking", detail: "Not configured", value: "$0.00" });
      items.push({ label: "Monitoring", detail: "Not configured", value: "$0.00" });
    }

    if (availabilityCost > 0) {
      const availDetail =
        formData.availabilityOptions === "availability-zone"
          ? "Availability Zone"
          : formData.availabilityOptions === "availability-set"
            ? "Availability Set"
            : formData.availabilityOptions === "vmss"
              ? "VM Scale Set"
              : "None";
      items.push({ label: "Availability", detail: availDetail, value: `$${availabilityCost.toFixed(2)}` });
    }

    if (storageAccountCreated && storageAccountCost > 0) {
      items.push({ label: "Storage Account", detail: "Standard LRS - vmstorageacct001", value: `$${storageAccountCost.toFixed(2)}` });
    }

    const displayTotal = vmCost + osDiskCost + storageAccountCost + (currentStep === 8 ? 140.0 : 0);

    return { items, total: `$${displayTotal.toFixed(2)}` };
  };

  const costData = getCostData();

  if (deploymentComplete) {
    const vmName = formData.vmName || "vm-linux-prod-001";
    const regionLabel =
      formData.region === "east-us"
        ? "East US"
        : formData.region === "west-us-2"
          ? "West US 2"
          : formData.region === "west-europe"
            ? "West Europe"
            : formData.region === "southeast-asia"
              ? "Southeast Asia"
              : "East US";
    const sizeLabel =
      formData.size === "standard-b2s"
        ? "Standard_B2s (2 vCPU, 4 GB RAM)"
        : formData.size === "standard-d2s-v3"
          ? "Standard_D2s_v3 (2 vCPU, 8 GB RAM)"
          : formData.size === "standard-d4s-v3"
            ? "Standard_D4s_v3 (4 vCPU, 16 GB RAM)"
            : "Standard_B2s";
    const osLabel =
      formData.image === "ubuntu"
        ? "Ubuntu Server 22.04 LTS"
        : formData.image === "windows"
          ? "Windows Server 2022"
          : formData.image === "redhat"
            ? "Red Hat Enterprise Linux 9"
            : "Ubuntu Server";

    const vmDeployRows = [
      { name: vmName, detail: "Virtual Machine", status: "OK" as const },
      {
        name: `${vmName}-nsg`,
        detail: "Network Security Group",
        status: "OK" as const,
      },
      {
        name: `${vmName}-vnet`,
        detail: "Virtual Network",
        status: "OK" as const,
      },
      {
        name: `${vmName}-ip`,
        detail: "Public IP Address",
        status: "OK" as const,
      },
      {
        name: `${vmName}-nic`,
        detail: "Network Interface",
        status: "OK" as const,
      },
      {
        name: `${vmName}-osdisk`,
        detail: "Managed Disk",
        status: "OK" as const,
      },
    ];

    const vmNextStepsCards = [
      {
        icon: "/icons/Defender-for-Cloud.svg",
        title: "Keep your app fast, secure, reliable",
        description:
          "Get built-in updates, monitoring, and protection in one step.",
        onClick: () => setEmmDrawerOpen(true),
      },
      {
        icon: "/icons/backup.svg",
        title: "Configure backup and recovery",
        description:
          "Set up Azure Backup to protect your VM data against accidental loss.",
      },
      {
        icon: "/icons/VM-Scale-Sets.svg",
        title: "Set up auto-scaling",
        description:
          "Add a scale set to handle traffic spikes automatically without manual intervention.",
      },
    ];

    const vmMoreLinks = [
      "Connect via SSH or RDP",
      "Configure DNS and custom domains",
      "Set up alerts and diagnostics",
    ];

    return (
      <FluentProvider theme={webLightTheme}>
        <div className={styles.deploymentContainer}>
          {customHeader !== null && (
            <div className={styles.stickyNav}>
              {customHeader || <TopNav activeLink="Build" />}
            </div>
          )}

          {/* Content area — uses shared DeploymentSuccessCard */}
          <div className={styles.deploymentMainContainer}>
            <DeploymentSuccessCard
              className={styles.deploymentMaxWidth800}
              title="Your virtual machine was deployed successfully"
              description={`${vmName} is running in ${regionLabel}. Click on a resource below to view details.`}
              sections={[
                { id: "deploy", label: "1. Deploy VM resources" },
                {
                  id: "configure",
                  label: "2. Configure resources",
                  defaultExpanded: true,
                  children: (
                    <>
                      <Body1 className={styles.marginBottomM}>
                        VM provisioned with networking, storage, and security
                        resources.
                      </Body1>
                      <table className={styles.fullWidthTable}>
                        <thead>
                          <tr className={styles.tableRowBorder}>
                            <th className={styles.tableHeader}>Resource</th>
                            <th className={styles.tableHeader}>Type</th>
                            <th className={styles.tableHeader}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vmDeployRows.map((row) => (
                            <tr key={row.name} className={styles.tableRowBorder}>
                              <td
                                className={mergeClasses(styles.tableCell, styles.tableCellResource)}
                              >
                                {row.name}
                              </td>
                              <td className={styles.tableCell}>{row.detail}</td>
                              <td className={styles.tableCell}>
                                <span className={styles.statusOK}>OK</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ),
                },
              ]}
              nextSteps={{
                description:
                  "Once you\u2019ve deployed, optimize performance with real-time metrics, scaling rules, cost and error alerts, and more.",
                cards: vmNextStepsCards,
                moreLinks: vmMoreLinks.map((label) => ({ label })),
              }}
              nextStepsLabel="3. Next steps"
              onHome={() => {
                if (onComplete) {
                  onComplete();
                } else if (customHeader !== undefined) {
                  router.back();
                } else {
                  handlePageChange("returning-home-2");
                }
              }}
              onManage={() => {
                if (onGoToResource) {
                  onGoToResource();
                }
              }}
            />
          </div>

          {/* EMM Overlay Drawer */}
          {emmDrawerOpen && (
            <>
              {/* Backdrop */}
              <div
                className={styles.emmBackdrop}
                onClick={() => setEmmDrawerOpen(false)}
              />
              {/* Drawer panel */}
              <div className={styles.emmDrawer}>
                {/* Header */}
                <div className={styles.emmHeader}>
                  <Subtitle1 className={styles.flex1}>
                    Keep your app fast, secure, and reliable
                  </Subtitle1>
                  <Button
                    appearance="subtle"
                    aria-label="Close"
                    icon={<Dismiss24Regular />}
                    onClick={() => setEmmDrawerOpen(false)}
                  />
                </div>

                {/* Body */}
                <div className={styles.emmBody}>
                  <div className={styles.emmGradientContainer}>
                    <Subtitle2 className={styles.textWeight700}>
                      Enroll in machine management:
                    </Subtitle2>
                    <ul className={styles.emmBulletList}>
                      <li>
                        <Body1>Manage updates automatically</Body1>
                      </li>
                      <li>
                        <Body1>Monitor performance</Body1>
                      </li>
                      <li>
                        <Body1>
                          Protect checkout and APIs for your Next.js + API app
                        </Body1>
                      </li>
                    </ul>
                  </div>

                  {[
                    {
                      label: "Subscription",
                      value: "zava-sub",
                      options: ["zava-sub", "zava-dev", "zava-prod"],
                    },
                    {
                      label: "Managed identity",
                      value: "zava-mi",
                      options: ["zava-mi", "zava-mi-2"],
                    },
                    {
                      label: "Log analytics workspace",
                      value: "zava-law",
                      options: ["zava-law", "zava-law-2"],
                    },
                    {
                      label: "Azure Monitor workspace",
                      value: "zava-amw",
                      options: ["zava-amw", "zava-amw-2"],
                    },
                  ].map((field) => (
                    <div key={field.label} className={styles.emmFormField}>
                      <div className={styles.emmInnerGroup}>
                        <Body1>{field.label}</Body1>
                        <Tooltip
                          content={field.label}
                          relationship="description"
                        >
                          <Info12Regular className={styles.emmTooltipIcon} />
                        </Tooltip>
                      </div>
                      <Dropdown
                        defaultValue={field.value}
                        defaultSelectedOptions={[field.value]}
                        className={styles.fullWidth}
                      >
                        {field.options.map((opt) => (
                          <Option key={opt} value={opt}>
                            {opt}
                          </Option>
                        ))}
                      </Dropdown>
                    </div>
                  ))}
                  {/* Cost estimate — inside scrollable body per Figma */}
                  <div
                    className={styles.emmCostContainer}
                    onClick={() => setEmmCostExpanded(!emmCostExpanded)}
                  >
                    <div className={styles.emmCostColumn}>
                      <Body1 className={styles.emmCostTitle}>
                        Estimated monthly cost
                      </Body1>
                      {emmCostExpanded && (
                        <>
                          <span>
                            <span className={styles.emmCostPricing}>
                              $15.00
                            </span>
                            <span
                              className={
                                mergeClasses(styles.textWeight600, styles.lineHeight18)
                              }
                            >
                              / server / month
                            </span>
                          </span>
                          <span className={styles.lineHeight14}>
                            Cost is an estimate only.{" "}
                            <Link
                              href="#"
                              inline
                              className={styles.lineHeight14}
                            >
                              Read full disclaimer
                            </Link>
                          </span>
                        </>
                      )}
                    </div>
                    {emmCostExpanded ? (
                      <ChevronUp20Regular />
                    ) : (
                      <ChevronDown20Regular />
                    )}
                  </div>
                </div>

                {/* Footer — buttons only, extra bottom padding for footer dock */}
                <div className={styles.emmFooterButtons}>
                  <Button
                    appearance="primary"
                    onClick={() => setEmmDrawerOpen(false)}
                  >
                    Enroll
                  </Button>
                  <Button
                    appearance="secondary"
                    onClick={() => setEmmDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}

        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {customHeader !== null && (
          <div className={styles.stickyNav}>
            {customHeader || <TopNav activeLink="Build" />}
          </div>
        )}

        <PageBreadcrumb
          items={[
            { label: "Home", onClick: () => handlePageChange("home-fre") },
            { label: "New" },
            { label: "Create a resource" },
          ]}
        />

        <PageHeader
          title="Create a VM resource"
          onClose={handleBackClick}
        />

        <WizardLayout
          hasCustomHeader={customHeader !== null}
          stepNav={
            <WizardStepNav
              groups={[
                { steps: [{ id: 1, title: "Quick create" }] },
                {
                  label: "Manual configuration",
                  collapsible: true,
                  indented: true,
                  steps: [
                    { id: 2, title: "Basics" },
                    { id: 3, title: "Disks" },
                    { id: 4, title: "Networking" },
                    { id: 5, title: "Management" },
                    { id: 6, title: "Monitoring" },
                    { id: 7, title: "Tags" },
                  ],
                },
                { steps: [{ id: 8, title: "Review" }] },
              ]}
              activeStep={currentStep}
              onStepChange={setCurrentStep}
            />
          }
          rightPanel={
            <WizardCostPanel
              title="Cost estimation"
              items={costData.items}
              total={costData.total}
              disclaimer={
                !isCreatingStorageAccount ? (
                  <Text size={200} className={styles.flexCenter}>
                    <Lightbulb20Regular
                      className={mergeClasses(styles.flexShrink0, styles.iconMarginTop2)}
                    />
                    <span>
                      This is an estimate based on 730 hours/month. Actual costs depend
                      on usage, region, and applicable discounts. Additional charges may
                      apply for bandwidth, storage transactions, and other services.
                    </span>
                  </Text>
                ) : undefined
              }
            />
          }
        >
          <div className={styles.centerSection}>
            {currentStep === 1 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Quick create with intent
                </Text>

                <div className={styles.formField}>
                  <Label required>
                    You are creating this virtual machine for:
                  </Label>
                  <div className={styles.formGroup}>
                    <Button
                      appearance={
                        formData.optimizationType === "cost"
                          ? "primary"
                          : "outline"
                      }
                      onClick={() => applyOptimizationPreset("cost")}
                      className={styles.flexButton}
                    >
                      Optimized cost
                    </Button>
                    <Button
                      appearance={
                        formData.optimizationType === "resilience"
                          ? "primary"
                          : "outline"
                      }
                      onClick={() => applyOptimizationPreset("resilience")}
                      className={styles.flexButton}
                    >
                      Optimized resilience
                    </Button>
                    <Button
                      appearance={
                        formData.optimizationType === "availability"
                          ? "primary"
                          : "outline"
                      }
                      onClick={() => applyOptimizationPreset("availability")}
                      className={styles.flexButton}
                    >
                      Optimized availability
                    </Button>
                  </div>
                </div>

                {/* Show optimization description */}
                {formData.optimizationType !== "manual" && (
                  <div className={styles.optimizationContainer}>
                    <div className={styles.optimizationInner}>
                      <Text
                        size={300}
                        weight="semibold"
                        className={styles.optimizationTitleGroup}
                      >
                        {formData.optimizationType === "cost" && (
                          <>
                            <Money20Regular /> Cost Optimized Configuration
                          </>
                        )}
                        {formData.optimizationType === "resilience" && (
                          <>
                            <Shield20Regular /> Resilience Optimized
                            Configuration
                          </>
                        )}
                        {formData.optimizationType === "availability" && (
                          <>
                            <Flash20Regular /> Availability Optimized
                            Configuration
                          </>
                        )}
                      </Text>
                      {formData.optimizationType === "cost" && (
                        <Button
                          appearance="secondary"
                          size="small"
                          className={styles.cardBackground}
                        >
                          Set a budget
                        </Button>
                      )}
                    </div>
                    <Text size={200} className={styles.textDescription}>
                      {formData.optimizationType === "cost" &&
                        "Configured for minimal cost with standard storage, spot discount, and essential features only."}
                      {formData.optimizationType === "resilience" &&
                        "Configured with premium storage, multi-zone redundancy, load balancing, and comprehensive monitoring."}
                      {formData.optimizationType === "availability" &&
                        "Configured with high-performance storage, full redundancy, load balancing, health monitoring, and all recommended features."}
                    </Text>
                  </div>
                )}

                <div className={styles.formField}>
                  <Label required>Name</Label>
                  <Input
                    placeholder="vm-linux-prod-001"
                    value={formData.vmName}
                    onChange={(e) =>
                      setFormData({ ...formData, vmName: e.target.value })
                    }
                    onFocus={() => setActiveField("vmName")}
                    className={styles.fullWidth}
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Use 1-64 characters: letters, numbers, hyphens, and
                    underscores
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Region</Label>
                  <Dropdown
                    placeholder="Select region"
                    value={formData.region}
                    selectedOptions={formData.region ? [formData.region] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        region: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("region")}
                    className={styles.fullWidth}
                  >
                    <Option value="east-us">East US</Option>
                    <Option value="west-us-2">West US 2</Option>
                    <Option value="west-europe">West Europe</Option>
                    <Option value="southeast-asia">Southeast Asia</Option>
                  </Dropdown>
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Choose a region close to your users for best performance
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Availability options</Label>
                  <Dropdown
                    placeholder="Select availability option"
                    value={formData.availabilityOptions}
                    selectedOptions={
                      formData.availabilityOptions
                        ? [formData.availabilityOptions]
                        : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        availabilityOptions: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("availabilityOptions")}
                    className={styles.fullWidth}
                  >
                    <Option value="none">
                      No infrastructure redundancy required
                    </Option>
                    <Option value="availability-zone">Availability zone</Option>
                    <Option value="availability-set">Availability set</Option>
                    <Option value="vmss">Virtual machine scale set</Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Configure redundancy and high availability for your VM
                  </Text>
                </div>

                <div className={styles.formField}>
                  <div className={styles.formLabelWithTooltip}>
                    <Label>OS and Machine Configurations</Label>
                    <Button
                      appearance="subtle"
                      size="small"
                      className={styles.advancedButtonStyle}
                    >
                      advanced
                    </Button>
                  </div>
                  <Text
                    size={300}
                    className={mergeClasses(styles.textDescription, styles.textBlock, styles.marginBottomM, styles.marginTopS)}
                  >
                    Configure the operating system and machine specifications
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Image</Label>
                  <Dropdown
                    placeholder="Select image"
                    value={formData.image}
                    selectedOptions={formData.image ? [formData.image] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        image: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("image")}
                    className={styles.fullWidth}
                  >
                    <Option value="ubuntu">Ubuntu Server 22.04 LTS</Option>
                    <Option value="windows">
                      Windows Server 2022 Datacenter
                    </Option>
                    <Option value="redhat">Red Hat Enterprise Linux 9</Option>
                    <Option value="debian">Debian 11</Option>
                    <Option value="suse">SUSE Linux Enterprise Server</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Size</Label>
                  <Dropdown
                    placeholder="Select VM size"
                    value={formData.size}
                    selectedOptions={formData.size ? [formData.size] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        size: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("size")}
                    className={styles.fullWidth}
                  >
                    <Option value="standard-b2s">
                      Standard_B2s (2 vCPU, 4 GB RAM) - ~$30/mo
                    </Option>
                    <Option value="standard-d2s-v3">
                      Standard_D2s_v3 (2 vCPU, 8 GB RAM) - ~$70/mo
                    </Option>
                    <Option value="standard-d4s-v3">
                      Standard_D4s_v3 (4 vCPU, 16 GB RAM) - ~$140/mo
                    </Option>
                    <Option value="standard-e4s-v3">
                      Standard_E4s_v3 (4 vCPU, 32 GB RAM) - ~$200/mo
                    </Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Select based on performance requirements and budget
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>VM Architecture</Label>
                  <Dropdown
                    placeholder="Select architecture"
                    value={formData.vmArchitecture}
                    selectedOptions={
                      formData.vmArchitecture ? [formData.vmArchitecture] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        vmArchitecture: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("vmArchitecture")}
                    className={styles.fullWidth}
                  >
                    <Option value="x64">x64 (Intel/AMD)</Option>
                    <Option value="arm64">Arm64</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <div className={styles.flexRowGap8}>
                    <Label>Disks</Label>
                    <Button
                      appearance="subtle"
                      size="small"
                      className={styles.advancedButtonStyle}
                    >
                      advanced
                    </Button>
                  </div>
                </div>

                <div className={styles.formField}>
                  <Label required>OS disk size</Label>
                  <Dropdown
                    placeholder="Select OS disk size"
                    value={formData.osDiskSize}
                    selectedOptions={
                      formData.osDiskSize ? [formData.osDiskSize] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        osDiskSize: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("osDiskSize")}
                    className={styles.fullWidth}
                  >
                    <Option value="default">
                      Default (Image default size)
                    </Option>
                    <Option value="64">64 GiB</Option>
                    <Option value="128">128 GiB</Option>
                    <Option value="256">256 GiB</Option>
                    <Option value="512">512 GiB</Option>
                    <Option value="1024">1024 GiB (1 TiB)</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>OS disk type</Label>
                  <Dropdown
                    placeholder="Select OS disk type"
                    value={formData.osDiskType}
                    selectedOptions={
                      formData.osDiskType ? [formData.osDiskType] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        osDiskType: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("osDiskType")}
                    className={styles.fullWidth}
                  >
                    <Option value="premium-ssd">
                      Premium SSD (Recommended for production)
                    </Option>
                    <Option value="standard-ssd">Standard SSD</Option>
                    <Option value="standard-hdd">Standard HDD</Option>
                    <Option value="ultra-ssd">
                      Ultra SSD (High performance)
                    </Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Choose disk type based on performance requirements
                  </Text>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Basics
                </Text>
                <Text size={300} className={styles.fieldDescription}>
                  Configure the fundamental settings for your new virtual
                  machine.
                </Text>

                {/* Project Details Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer24}
                >
                  Project details
                </Text>

                <div className={styles.formField}>
                  <Label required>Subscription</Label>
                  <Dropdown
                    placeholder="Select subscription"
                    value={formData.subscription}
                    selectedOptions={
                      formData.subscription ? [formData.subscription] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        subscription: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("subscription")}
                    className={styles.fullWidth}
                  >
                    <Option value="contoso-prod">Contoso Production</Option>
                    <Option value="contoso-dev">Contoso Development</Option>
                    <Option value="contoso-test">
                      Contoso Test Environment
                    </Option>
                    <Option value="contoso-shared">
                      Contoso Shared Services
                    </Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Resource group</Label>
                  <Dropdown
                    placeholder="Select or create resource group"
                    value={formData.resourceGroup}
                    selectedOptions={
                      formData.resourceGroup ? [formData.resourceGroup] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        resourceGroup: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("resourceGroup")}
                    className={styles.fullWidth}
                  >
                    <Option value="rg-production-vms">rg-production-vms</Option>
                    <Option value="rg-development-vms">
                      rg-development-vms
                    </Option>
                    <Option value="rg-test-vms">rg-test-vms</Option>
                    <Option value="create-new">Create new</Option>
                  </Dropdown>
                </div>

                {/* Instance Details Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Instance details
                </Text>

                <div className={styles.formField}>
                  <Label required>Virtual machine name</Label>
                  <Input
                    placeholder="vm-linux-prod-001"
                    value={formData.vmName}
                    onChange={(e) =>
                      setFormData({ ...formData, vmName: e.target.value })
                    }
                    onFocus={() => setActiveField("vmName")}
                    className={styles.fullWidth}
                  />
                  <Text size={200} className={styles.fieldCaption}>
                    Use 1-64 characters: letters, numbers, hyphens, and
                    underscores
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Region</Label>
                  <Dropdown
                    placeholder="Select region"
                    value={formData.region}
                    selectedOptions={formData.region ? [formData.region] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        region: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("region")}
                    className={styles.fullWidth}
                  >
                    <Option value="east-us">East US</Option>
                    <Option value="west-us-2">West US 2</Option>
                    <Option value="west-europe">West Europe</Option>
                    <Option value="southeast-asia">Southeast Asia</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Availability options</Label>
                  <Dropdown
                    placeholder="Select availability option"
                    value={formData.availabilityOptions}
                    selectedOptions={
                      formData.availabilityOptions
                        ? [formData.availabilityOptions]
                        : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        availabilityOptions: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("availabilityOptions")}
                    className={styles.fullWidth}
                  >
                    <Option value="none">
                      No infrastructure redundancy required
                    </Option>
                    <Option value="availability-zone">Availability zone</Option>
                    <Option value="availability-set">Availability set</Option>
                    <Option value="vmss">Virtual machine scale set</Option>
                  </Dropdown>
                </div>

                {formData.availabilityOptions === "availability-zone" && (
                  <>
                    <div className={styles.formField}>
                      <Label required>Zone options</Label>
                      <RadioGroup
                        value={formData.zoneOptions}
                        onChange={(_, data) =>
                          setFormData({
                            ...formData,
                            zoneOptions: data.value,
                          })
                        }
                      >
                        <Radio value="none" label="Single zone" />
                        <Radio value="multiple" label="Multiple zones" />
                      </RadioGroup>
                    </div>

                    <div className={styles.formField}>
                      <Label required>Availability zones</Label>
                      <div className={styles.flexRowGap12}>
                        {["1", "2", "3"].map((zone) => (
                          <Checkbox
                            key={zone}
                            label={`Zone ${zone}`}
                            checked={formData.availabilityZones.includes(zone)}
                            onChange={(_, data) => {
                              const newZones = data.checked
                                ? [...formData.availabilityZones, zone]
                                : formData.availabilityZones.filter(
                                    (z) => z !== zone,
                                  );
                              setFormData({
                                ...formData,
                                availabilityZones: newZones,
                              });
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className={styles.formField}>
                  <Label required>Security type</Label>
                  <Dropdown
                    placeholder="Select security type"
                    value={formData.securityType}
                    selectedOptions={
                      formData.securityType ? [formData.securityType] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        securityType: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="standard">Standard</Option>
                    <Option value="trusted-launch">Trusted launch</Option>
                    <Option value="confidential">Confidential computing</Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Trusted launch provides enhanced security features
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Image</Label>
                  <Dropdown
                    placeholder="Select image"
                    value={formData.image}
                    selectedOptions={formData.image ? [formData.image] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        image: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("image")}
                    className={styles.fullWidth}
                  >
                    <Option value="ubuntu">Ubuntu Server 22.04 LTS</Option>
                    <Option value="windows">
                      Windows Server 2022 Datacenter
                    </Option>
                    <Option value="redhat">Red Hat Enterprise Linux 9</Option>
                    <Option value="debian">Debian 11</Option>
                    <Option value="suse">SUSE Linux Enterprise Server</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>VM architecture</Label>
                  <Dropdown
                    placeholder="Select architecture"
                    value={formData.vmArchitecture}
                    selectedOptions={
                      formData.vmArchitecture ? [formData.vmArchitecture] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        vmArchitecture: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("vmArchitecture")}
                    className={styles.fullWidth}
                  >
                    <Option value="x64">x64 (Intel/AMD)</Option>
                    <Option value="arm64">Arm64</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Size</Label>
                  <Dropdown
                    placeholder="Select VM size"
                    value={formData.size}
                    selectedOptions={formData.size ? [formData.size] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        size: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("size")}
                    className={styles.fullWidth}
                  >
                    <Option value="standard-b2s">
                      Standard_B2s (2 vCPU, 4 GB RAM) - ~$30/mo
                    </Option>
                    <Option value="standard-d2s-v3">
                      Standard_D2s_v3 (2 vCPU, 8 GB RAM) - ~$70/mo
                    </Option>
                    <Option value="standard-d4s-v3">
                      Standard_D4s_v3 (4 vCPU, 16 GB RAM) - ~$140/mo
                    </Option>
                    <Option value="standard-e4s-v3">
                      Standard_E4s_v3 (4 vCPU, 32 GB RAM) - ~$200/mo
                    </Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Select based on performance requirements and budget
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Run with Azure Spot discount"
                    checked={formData.runWithSpotDiscount}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        runWithSpotDiscount: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS, styles.checkboxDescription)}
                  >
                    Save costs by using unused Azure capacity. Workload may be
                    evicted.
                  </Text>
                </div>

                {/* Administrator Account Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Administrator account
                </Text>

                <div className={styles.formField}>
                  <Label required>Authentication type</Label>
                  <RadioGroup
                    value={formData.authenticationType}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        authenticationType: data.value,
                      })
                    }
                    onFocus={() => setActiveField("authenticationType")}
                  >
                    <Radio value="ssh" label="SSH public key" />
                    <Radio value="password" label="Password" />
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Label required>Username</Label>
                  <Input
                    placeholder="azureuser"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className={styles.fullWidth}
                  />
                </div>

                {formData.authenticationType === "ssh" && (
                  <>
                    <div className={styles.formField}>
                      <Label required>SSH public key source</Label>
                      <RadioGroup
                        value={formData.sshPublicKeySource}
                        onChange={(_, data) =>
                          setFormData({
                            ...formData,
                            sshPublicKeySource: data.value,
                          })
                        }
                      >
                        <Radio
                          value="generate-new"
                          label="Generate new key pair"
                        />
                        <Radio
                          value="existing-azure"
                          label="Use existing key stored in Azure"
                        />
                        <Radio
                          value="existing-public"
                          label="Use existing public key"
                        />
                      </RadioGroup>
                    </div>

                    {formData.sshPublicKeySource === "generate-new" && (
                      <div className={styles.formField}>
                        <Label required>SSH key type</Label>
                        <RadioGroup
                          value={formData.sshKeyType}
                          onChange={(_, data) =>
                            setFormData({
                              ...formData,
                              sshKeyType: data.value,
                            })
                          }
                        >
                          <Radio value="rsa" label="RSA SSH Format" />
                          <Radio value="ed25519" label="Ed25519" />
                        </RadioGroup>
                      </div>
                    )}

                    {formData.sshPublicKeySource === "existing-public" && (
                      <div className={styles.formField}>
                        <Label required>SSH public key</Label>
                        <Textarea
                          placeholder="ssh-rsa AAAAB3NzaC1yc2E..."
                          rows={4}
                          className={styles.fullWidth}
                        />
                      </div>
                    )}
                  </>
                )}

                {formData.authenticationType === "password" && (
                  <div className={styles.formField}>
                    <Label required>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={styles.fullWidth}
                    />
                    <Text size={200} className={styles.fieldCaption}>
                      Must be 12-72 characters with uppercase, lowercase,
                      number, and special character
                    </Text>
                  </div>
                )}

                {/* Inbound Port Rules Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Inbound port rules
                </Text>

                <div className={styles.formField}>
                  <Label required>Public inbound ports</Label>
                  <RadioGroup
                    value={formData.publicInboundPorts}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        publicInboundPorts: data.value,
                      })
                    }
                  >
                    <Radio value="none" label="None" />
                    <Radio
                      value="allow-selected"
                      label="Allow selected ports"
                    />
                  </RadioGroup>
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Configure network security group rules to allow or deny
                    traffic
                  </Text>
                </div>

                {formData.publicInboundPorts === "allow-selected" && (
                  <div className={styles.formField}>
                    <Label required>Select inbound ports</Label>
                    <div className={styles.formFieldColumn}>
                      {[
                        { value: "22", label: "SSH (22)" },
                        { value: "80", label: "HTTP (80)" },
                        { value: "443", label: "HTTPS (443)" },
                        { value: "3389", label: "RDP (3389)" },
                      ].map((port) => (
                        <Checkbox
                          key={port.value}
                          label={port.label}
                          checked={formData.selectedInboundPorts.includes(
                            port.value,
                          )}
                          onChange={(_, data) => {
                            const newPorts = data.checked
                              ? [...formData.selectedInboundPorts, port.value]
                              : formData.selectedInboundPorts.filter(
                                  (p) => p !== port.value,
                                );
                            setFormData({
                              ...formData,
                              selectedInboundPorts: newPorts,
                            });
                          }}
                        />
                      ))}
                    </div>
                    <Text
                      size={200}
                      className={mergeClasses(styles.fieldCaption, styles.marginTop8)}
                    >
                      It is recommended to restrict access to specific IP
                      addresses
                    </Text>
                  </div>
                )}
              </>
            )}

            {currentStep === 3 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Disks
                </Text>
                <Text size={300} className={styles.fieldDescription}>
                  Configure disk options for your virtual machine.
                </Text>

                {/* Disk Encryption Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer24}
                >
                  Encryption
                </Text>

                <div className={styles.formField}>
                  <Label required>VM disk encryption</Label>
                  <Dropdown
                    placeholder="Select encryption type"
                    value={formData.vmDiskEncryption}
                    selectedOptions={
                      formData.vmDiskEncryption
                        ? [formData.vmDiskEncryption]
                        : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        vmDiskEncryption: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="platform-managed">
                      Platform-managed key (PMK)
                    </Option>
                    <Option value="customer-managed">
                      Customer-managed key (CMK)
                    </Option>
                    <Option value="double-encryption">
                      Double encryption with PMK and CMK
                    </Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Encrypt data at rest using Azure-managed or your own keys
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Encryption at host"
                    checked={formData.encryptionAtHost}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        encryptionAtHost: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Enable encryption for temp disk and cache. Requires specific
                    VM sizes.
                  </Text>
                </div>

                {formData.vmDiskEncryption === "customer-managed" && (
                  <div className={styles.formField}>
                    <Label required>Key management</Label>
                    <Dropdown
                      placeholder="Select key vault"
                      value={formData.keyManagement}
                      selectedOptions={
                        formData.keyManagement ? [formData.keyManagement] : []
                      }
                      onOptionSelect={(_, data) =>
                        setFormData({
                          ...formData,
                          keyManagement: data.optionValue as string,
                        })
                      }
                      className={styles.fullWidth}
                    >
                      <Option value="platform-managed">
                        Platform-managed key
                      </Option>
                      <Option value="keyvault-eastus">
                        keyvault-eastus (East US)
                      </Option>
                      <Option value="keyvault-westus">
                        keyvault-westus (West US 2)
                      </Option>
                      <Option value="create-new">Create new Key Vault</Option>
                    </Dropdown>
                    <Text
                      size={200}
                      className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                    >
                      Select Azure Key Vault containing your encryption key
                    </Text>
                  </div>
                )}

                {/* OS Disk Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={mergeClasses(styles.textBlock, styles.marginBottomL, styles.marginTopXXL)}
                >
                  OS disk
                </Text>

                <div className={styles.formField}>
                  <Label required>OS disk size</Label>
                  <Dropdown
                    placeholder="Select OS disk size"
                    value={formData.osDiskSize}
                    selectedOptions={
                      formData.osDiskSize ? [formData.osDiskSize] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        osDiskSize: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="default">
                      Default (Image default size)
                    </Option>
                    <Option value="64">64 GiB</Option>
                    <Option value="128">128 GiB</Option>
                    <Option value="256">256 GiB</Option>
                    <Option value="512">512 GiB</Option>
                    <Option value="1024">1024 GiB (1 TiB)</Option>
                    <Option value="2048">2048 GiB (2 TiB)</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>OS disk type</Label>
                  <Dropdown
                    placeholder="Select OS disk type"
                    value={formData.osDiskType}
                    selectedOptions={
                      formData.osDiskType ? [formData.osDiskType] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        osDiskType: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="premium-ssd">
                      Premium SSD (Recommended for production)
                    </Option>
                    <Option value="standard-ssd">
                      Standard SSD (Cost-effective)
                    </Option>
                    <Option value="standard-hdd">
                      Standard HDD (Low cost)
                    </Option>
                    <Option value="premium-ssd-v2">
                      Premium SSD v2 (High performance)
                    </Option>
                    <Option value="ultra-ssd">
                      Ultra SSD (Ultra-high performance)
                    </Option>
                  </Dropdown>
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Choose disk type based on IOPS and throughput requirements
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Delete with VM"
                    checked={formData.deleteOSDiskWithVM}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        deleteOSDiskWithVM: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Automatically delete OS disk when VM is deleted
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable Ultra Disk compatibility"
                    checked={formData.enableUltraDiskCompatibility}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableUltraDiskCompatibility: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Allow attaching Ultra Disks to this VM. May limit
                    availability options.
                  </Text>
                </div>

                {/* Data Disks Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={mergeClasses(styles.textBlock, styles.marginBottomL, styles.marginTopXXL)}
                >
                  Data disks
                </Text>

                <Text
                  size={300}
                  className={mergeClasses(styles.textDescription, styles.textBlock, styles.marginBottomL)}
                >
                  Attach additional data disks for application data storage
                </Text>

                {formData.dataDisks.length === 0 ? (
                  <div className={styles.emptyDataDiskState}>
                    <Text
                      size={300}
                      className={mergeClasses(
                        styles.textMuted,
                        styles.blockElement,
                        styles.marginBottomM,
                      )}
                    >
                      No data disks configured
                    </Text>
                    <Button
                      appearance="secondary"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          dataDisks: [
                            ...formData.dataDisks,
                            {
                              name: `datadisk-${formData.dataDisks.length + 1}`,
                              size: "128",
                              type: "premium-ssd",
                              hostCaching: "read-write",
                            },
                          ],
                        });
                      }}
                    >
                      Create and attach a new disk
                    </Button>
                  </div>
                ) : (
                  <>
                    {formData.dataDisks.map((disk, index) => (
                      <div key={index} className={styles.dataDiskCard}>
                        <div className={styles.dataDiskCardHeader}>
                          <Text size={300} weight="semibold">
                            Data disk {index + 1}
                          </Text>
                          <Button
                            appearance="subtle"
                            size="small"
                            onClick={() => {
                              const newDisks = formData.dataDisks.filter(
                                (_, i) => i !== index,
                              );
                              setFormData({
                                ...formData,
                                dataDisks: newDisks,
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className={styles.gridTwoCol}>
                          <div>
                            <Label>Disk name</Label>
                            <Input
                              value={disk.name}
                              onChange={(e) => {
                                const newDisks = [...formData.dataDisks];
                                newDisks[index].name = e.target.value;
                                setFormData({
                                  ...formData,
                                  dataDisks: newDisks,
                                });
                              }}
                              className={styles.fullWidth}
                            />
                          </div>
                          <div>
                            <Label>Size (GiB)</Label>
                            <Dropdown
                              value={disk.size}
                              selectedOptions={[disk.size]}
                              onOptionSelect={(_, data) => {
                                const newDisks = [...formData.dataDisks];
                                newDisks[index].size =
                                  data.optionValue as string;
                                setFormData({
                                  ...formData,
                                  dataDisks: newDisks,
                                });
                              }}
                              className={styles.fullWidth}
                            >
                              <Option value="64">64 GiB</Option>
                              <Option value="128">128 GiB</Option>
                              <Option value="256">256 GiB</Option>
                              <Option value="512">512 GiB</Option>
                              <Option value="1024">1024 GiB (1 TiB)</Option>
                              <Option value="2048">2048 GiB (2 TiB)</Option>
                            </Dropdown>
                          </div>
                          <div>
                            <Label>Disk type</Label>
                            <Dropdown
                              value={disk.type}
                              selectedOptions={[disk.type]}
                              onOptionSelect={(_, data) => {
                                const newDisks = [...formData.dataDisks];
                                newDisks[index].type =
                                  data.optionValue as string;
                                setFormData({
                                  ...formData,
                                  dataDisks: newDisks,
                                });
                              }}
                              className={styles.fullWidth}
                            >
                              <Option value="premium-ssd">Premium SSD</Option>
                              <Option value="standard-ssd">Standard SSD</Option>
                              <Option value="standard-hdd">Standard HDD</Option>
                              <Option value="ultra-ssd">Ultra SSD</Option>
                            </Dropdown>
                          </div>
                          <div>
                            <Label>Host caching</Label>
                            <Dropdown
                              value={disk.hostCaching}
                              selectedOptions={[disk.hostCaching]}
                              onOptionSelect={(_, data) => {
                                const newDisks = [...formData.dataDisks];
                                newDisks[index].hostCaching =
                                  data.optionValue as string;
                                setFormData({
                                  ...formData,
                                  dataDisks: newDisks,
                                });
                              }}
                              className={styles.fullWidth}
                            >
                              <Option value="none">None</Option>
                              <Option value="read-only">Read-only</Option>
                              <Option value="read-write">Read/write</Option>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      appearance="secondary"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          dataDisks: [
                            ...formData.dataDisks,
                            {
                              name: `datadisk-${formData.dataDisks.length + 1}`,
                              size: "128",
                              type: "premium-ssd",
                              hostCaching: "read-write",
                            },
                          ],
                        });
                      }}
                      className={styles.marginTopM}
                    >
                      Add another data disk
                    </Button>
                  </>
                )}
              </>
            )}

            {currentStep === 4 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Networking
                </Text>
                <Text size={300} className={styles.fieldDescription}>
                  Configure network settings and security for your VM.
                </Text>

                {/* Network Interface Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer24}
                >
                  Network interface
                </Text>

                <div className={styles.formField}>
                  <Label required>Virtual network</Label>
                  <Dropdown
                    placeholder="Select or create virtual network"
                    value={formData.virtualNetwork}
                    selectedOptions={
                      formData.virtualNetwork ? [formData.virtualNetwork] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        virtualNetwork: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="vnet-prod-eastus">
                      vnet-prod-eastus (10.0.0.0/16)
                    </Option>
                    <Option value="vnet-dev-eastus">
                      vnet-dev-eastus (10.1.0.0/16)
                    </Option>
                    <Option value="vnet-test-eastus">
                      vnet-test-eastus (10.2.0.0/16)
                    </Option>
                    <Option value="create-new">Create new</Option>
                  </Dropdown>
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Virtual network provides isolated network for your resources
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Subnet</Label>
                  <Dropdown
                    placeholder="Select or create subnet"
                    value={formData.subnet}
                    selectedOptions={formData.subnet ? [formData.subnet] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        subnet: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="default">default (10.0.0.0/24)</Option>
                    <Option value="web-subnet">web-subnet (10.0.1.0/24)</Option>
                    <Option value="app-subnet">app-subnet (10.0.2.0/24)</Option>
                    <Option value="data-subnet">
                      data-subnet (10.0.3.0/24)
                    </Option>
                    <Option value="create-new">Create new subnet</Option>
                  </Dropdown>
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Subnet segments your virtual network address space
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Public IP</Label>
                  <Dropdown
                    placeholder="Select public IP"
                    value={formData.publicIP}
                    selectedOptions={
                      formData.publicIP ? [formData.publicIP] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        publicIP: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="create-new">Create new</Option>
                    <Option value="none">None</Option>
                    <Option value="pip-vm-prod-001">pip-vm-prod-001</Option>
                    <Option value="pip-vm-dev-001">pip-vm-dev-001</Option>
                  </Dropdown>
                  <Text
                    size={200}
                    className={mergeClasses(styles.textMuted, styles.textBlock, styles.marginTopXS)}
                  >
                    Public IP allows internet access to your VM
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>NIC network security group</Label>
                  <Dropdown
                    placeholder="Select security group"
                    value={formData.nicNetworkSecurityGroup}
                    selectedOptions={
                      formData.nicNetworkSecurityGroup
                        ? [formData.nicNetworkSecurityGroup]
                        : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        nicNetworkSecurityGroup: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="basic">Basic</Option>
                    <Option value="advanced">Advanced</Option>
                    <Option value="none">None</Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Basic creates new NSG, Advanced uses existing NSG
                  </Text>
                </div>

                {formData.nicNetworkSecurityGroup === "basic" && (
                  <>
                    <div className={styles.formField}>
                      <Label required>Public inbound ports</Label>
                      <RadioGroup
                        value={formData.publicInboundPortsNetwork}
                        onChange={(_, data) =>
                          setFormData({
                            ...formData,
                            publicInboundPortsNetwork: data.value,
                          })
                        }
                      >
                        <Radio value="none" label="None" />
                        <Radio
                          value="allow-selected"
                          label="Allow selected ports"
                        />
                      </RadioGroup>
                      <Text size={200} className={styles.fieldCaption}>
                        Configure which ports are accessible from the internet
                      </Text>
                    </div>

                    {formData.publicInboundPortsNetwork ===
                      "allow-selected" && (
                      <div className={styles.formField}>
                        <Label required>Select inbound ports</Label>
                        <div className={styles.flexColumnGap8}>
                          {[
                            { value: "22", label: "SSH (22)" },
                            { value: "80", label: "HTTP (80)" },
                            { value: "443", label: "HTTPS (443)" },
                            { value: "3389", label: "RDP (3389)" },
                            { value: "3306", label: "MySQL (3306)" },
                            { value: "5432", label: "PostgreSQL (5432)" },
                          ].map((port) => (
                            <Checkbox
                              key={port.value}
                              label={port.label}
                              checked={formData.selectedInboundPortsNetwork.includes(
                                port.value,
                              )}
                              onChange={(_, data) => {
                                const newPorts = data.checked
                                  ? [
                                      ...formData.selectedInboundPortsNetwork,
                                      port.value,
                                    ]
                                  : formData.selectedInboundPortsNetwork.filter(
                                      (p) => p !== port.value,
                                    );
                                setFormData({
                                  ...formData,
                                  selectedInboundPortsNetwork: newPorts,
                                });
                              }}
                            />
                          ))}
                        </div>
                        <Text
                          size={200}
                          className={mergeClasses(styles.fieldCaption, styles.marginTop8)}
                        >
                          ⚠️ It is recommended to restrict access to specific IP
                          addresses in production
                        </Text>
                      </div>
                    )}
                  </>
                )}

                {formData.nicNetworkSecurityGroup === "advanced" && (
                  <div className={styles.formField}>
                    <Label required>Network security group</Label>
                    <Dropdown
                      placeholder="Select existing NSG"
                      className={styles.fullWidth}
                    >
                      <Option value="nsg-prod-vms">nsg-prod-vms</Option>
                      <Option value="nsg-dev-vms">nsg-dev-vms</Option>
                      <Option value="nsg-web-tier">nsg-web-tier</Option>
                      <Option value="create-new">Create new</Option>
                    </Dropdown>
                  </div>
                )}

                <div className={styles.formField}>
                  <Checkbox
                    label="Delete NIC when VM is deleted"
                    checked={formData.deleteNICWithVM}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        deleteNICWithVM: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Automatically delete network interface when VM is deleted
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable accelerated networking"
                    checked={formData.enableAcceleratedNetworking}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableAcceleratedNetworking: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Provides low latency and high throughput. Requires specific
                    VM sizes.
                  </Text>
                </div>

                {/* Load Balancing Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Load balancing
                </Text>

                <div className={styles.formField}>
                  <Label required>Load balancing options</Label>
                  <Dropdown
                    placeholder="Select load balancing option"
                    value={formData.loadBalancingOptions}
                    selectedOptions={
                      formData.loadBalancingOptions
                        ? [formData.loadBalancingOptions]
                        : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        loadBalancingOptions: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="none">None</Option>
                    <Option value="azure-load-balancer">
                      Azure load balancer
                    </Option>
                    <Option value="application-gateway">
                      Application gateway
                    </Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Distribute traffic across multiple VMs for high availability
                  </Text>
                </div>

                {formData.loadBalancingOptions === "azure-load-balancer" && (
                  <div className={styles.configurationCard}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={mergeClasses(styles.textBlock, styles.marginBottomS)}
                    >
                      Azure Load Balancer Configuration
                    </Text>
                    <div className={styles.formField}>
                      <Label>Select a load balancer</Label>
                      <Dropdown
                        placeholder="Select existing or create new"
                        className={styles.fullWidth}
                      >
                        <Option value="create-new">
                          Create new load balancer
                        </Option>
                        <Option value="lb-prod-vms">lb-prod-vms</Option>
                        <Option value="lb-web-tier">lb-web-tier</Option>
                      </Dropdown>
                    </div>
                  </div>
                )}

                {formData.loadBalancingOptions === "application-gateway" && (
                  <div
                    className={mergeClasses(styles.configurationCard, styles.marginTopL)}
                  >
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      Application Gateway Configuration
                    </Text>
                    <div className={styles.formField}>
                      <Label>Select an application gateway</Label>
                      <Dropdown
                        placeholder="Select existing or create new"
                        className={styles.fullWidth}
                      >
                        <Option value="create-new">
                          Create new application gateway
                        </Option>
                        <Option value="appgw-prod">appgw-prod</Option>
                        <Option value="appgw-web">appgw-web</Option>
                      </Dropdown>
                    </div>
                  </div>
                )}
              </>
            )}

            {currentStep === 5 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Management
                </Text>
                <Text size={300} className={styles.fieldDescription}>
                  Configure identity, backup, and update management settings.
                </Text>

                {/* Microsoft Defender for Cloud Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer24}
                >
                  Microsoft Defender for Cloud
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable Microsoft Defender for Cloud"
                    checked={formData.enableDefenderForCloud}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableDefenderForCloud: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Get advanced threat protection and security recommendations
                    for your VM
                  </Text>
                </div>

                {formData.enableDefenderForCloud && (
                  <div className={styles.configurationCardMarginTop12}>
                    <Text
                      size={300}
                      className={mergeClasses(styles.textDescription, styles.flexAlignStart, styles.flexRowGap8)}
                    >
                      <Shield20Regular
                        className={mergeClasses(styles.flexShrink0, styles.blockMarginTop2)}
                      />
                      <span>
                        Microsoft Defender for Cloud will provide vulnerability
                        assessments, security alerts, and recommendations to
                        help protect your virtual machine.
                      </span>
                    </Text>
                  </div>
                )}

                {/* Identity Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Identity
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable system assigned managed identity"
                    checked={formData.enableSystemAssignedIdentity}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableSystemAssignedIdentity: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Allows your VM to authenticate to Azure services without
                    storing credentials
                  </Text>
                </div>

                {formData.enableSystemAssignedIdentity && (
                  <div className={styles.successCardMarginTop12}>
                    <Text
                      size={300}
                      className={mergeClasses(
                        styles.textDescription,
                        styles.flexRowGap8,
                        styles.marginBottomS,
                      )}
                    >
                      <Checkmark20Regular className={styles.greenIcon} />
                      System assigned managed identity enabled
                    </Text>
                    <Text
                      size={200}
                      className={mergeClasses(
                        styles.textMuted,
                        styles.blockElement,
                      )}
                    >
                      This VM can now access Azure resources using its managed
                      identity. Remember to assign appropriate RBAC roles after
                      deployment.
                    </Text>
                  </div>
                )}

                {/* Microsoft Entra ID Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Microsoft Entra ID
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable Microsoft Entra ID"
                    checked={formData.enableEntraID}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableEntraID: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Integrate with Microsoft Entra ID (formerly Azure AD) for
                    identity management
                  </Text>
                </div>

                {formData.enableEntraID && (
                  <div
                    className={mergeClasses(
                      styles.formField,
                      styles.marginLeft28,
                    )}
                  >
                    <Checkbox
                      label="Login with Microsoft Entra ID"
                      checked={formData.loginWithEntraID}
                      onChange={(_, data) =>
                        setFormData({
                          ...formData,
                          loginWithEntraID: data.checked === true,
                        })
                      }
                    />
                    <Text
                      size={200}
                      className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                    >
                      Allow users to sign in using their Entra ID credentials
                    </Text>
                  </div>
                )}

                {formData.enableEntraID && (
                  <div className={styles.configurationCardMarginTop12}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      Entra ID Integration Benefits
                    </Text>
                    <ul className={styles.listStyleNone}>
                      <li>
                        <Text size={200}>
                          Centralized identity and access management
                        </Text>
                      </li>
                      <li>
                        <Text size={200}>
                          Multi-factor authentication support
                        </Text>
                      </li>
                      <li>
                        <Text size={200}>Conditional access policies</Text>
                      </li>
                      <li>
                        <Text size={200}>Audit logging and compliance</Text>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Guest OS Updates Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Guest OS updates
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable periodic assessment"
                    checked={formData.enablePeriodicAssessment}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enablePeriodicAssessment: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Automatically check for available OS and software updates
                    every 24 hours
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Patch orchestration options</Label>
                  <Dropdown
                    placeholder="Select patch orchestration"
                    value={formData.patchOrchestrationOptions}
                    selectedOptions={
                      formData.patchOrchestrationOptions
                        ? [formData.patchOrchestrationOptions]
                        : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        patchOrchestrationOptions: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="azure-orchestrated">
                      Azure-orchestrated (Recommended)
                    </Option>
                    <Option value="automatic-by-os">
                      Automatic by OS (Platform default)
                    </Option>
                    <Option value="manual">Manual updates</Option>
                    <Option value="image-default">Image default</Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Control how OS patches are applied to your VM
                  </Text>
                </div>

                {formData.patchOrchestrationOptions ===
                  "azure-orchestrated" && (
                  <div className={styles.configurationCardMarginTop12}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      Azure-orchestrated Patching
                    </Text>
                    <Text
                      size={200}
                      className={mergeClasses(styles.fieldCaption, styles.marginBottomS)}
                    >
                      Azure will automatically download and install patches
                      during off-peak hours based on your VM's availability
                      requirements.
                    </Text>
                    <Text size={200} className={styles.textMuted}>
                      Features include:
                    </Text>
                    <ul
                      className={mergeClasses(styles.listStyleNone, styles.marginTop8)}
                    >
                      <li>
                        <Text size={200}>Automatic patch classification</Text>
                      </li>
                      <li>
                        <Text size={200}>Maintenance windows</Text>
                      </li>
                      <li>
                        <Text size={200}>Reboot control</Text>
                      </li>
                      <li>
                        <Text size={200}>Patch compliance reporting</Text>
                      </li>
                    </ul>
                  </div>
                )}

                {formData.patchOrchestrationOptions === "manual" && (
                  <div className={styles.warningCard}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      ⚠️ Manual Updates Selected
                    </Text>
                    <Text
                      size={200}
                      className={mergeClasses(
                        styles.textDescription,
                        styles.blockElement,
                      )}
                    >
                      You will be responsible for applying OS patches and
                      updates. Ensure you have a patching strategy in place to
                      maintain security compliance.
                    </Text>
                  </div>
                )}
              </>
            )}

            {currentStep === 6 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Monitoring
                </Text>
                <Text size={300} className={styles.fieldDescription}>
                  Set up monitoring, diagnostics, and alerting for your VM.
                </Text>

                {/* Alerts Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer24}
                >
                  Alerts
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable recommended alert rules"
                    checked={formData.enableRecommendedAlertRules}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableRecommendedAlertRules: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Get notified about important VM health and performance
                    issues
                  </Text>
                </div>

                {formData.enableRecommendedAlertRules && (
                  <div className={styles.configurationCardMarginTop12}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom12}
                    >
                      Recommended Alert Rules
                    </Text>
                    <div className={styles.flexColumnGap8}>
                      <div className={styles.flexRowGap8}>
                        <div className={styles.alertRuleBullet} />
                        <Text size={200}>
                          CPU usage exceeds 80% for more than 5 minutes
                        </Text>
                      </div>
                      <div className={styles.flexRowGap8}>
                        <div className={styles.alertRuleBullet} />
                        <Text size={200}>
                          Memory usage exceeds 90% for more than 5 minutes
                        </Text>
                      </div>
                      <div className={styles.flexRowGap8}>
                        <div className={styles.alertRuleBullet} />
                        <Text size={200}>
                          Available disk space is less than 10%
                        </Text>
                      </div>
                      <div className={styles.flexRowGap8}>
                        <div className={styles.alertRuleBullet} />
                        <Text size={200}>
                          VM is unavailable or unresponsive
                        </Text>
                      </div>
                    </div>
                  </div>
                )}

                {/* Diagnostics Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Diagnostics
                </Text>

                <div className={styles.formField}>
                  <Label required>Boot diagnostics</Label>
                  <Dropdown
                    placeholder="Select boot diagnostics option"
                    value={formData.bootDiagnostics}
                    selectedOptions={
                      formData.bootDiagnostics ? [formData.bootDiagnostics] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        bootDiagnostics: data.optionValue as string,
                      })
                    }
                    className={styles.fullWidth}
                  >
                    <Option value="managed-storage">
                      Enable with managed storage account (Recommended)
                    </Option>
                    <Option value="custom-storage">
                      Enable with custom storage account
                    </Option>
                    <Option value="disable">Disable</Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldCaption}>
                    Capture serial console output and screenshots for
                    troubleshooting
                  </Text>
                </div>

                {formData.bootDiagnostics === "custom-storage" && (
                  <div className={styles.formField}>
                    <Label required>Diagnostics storage account</Label>
                    <Dropdown
                      placeholder="Select storage account"
                      className={styles.fullWidth}
                    >
                      <Option value="diagstorage001">diagstorage001</Option>
                      <Option value="diagstorage002">diagstorage002</Option>
                      <Option value="create-new">
                        Create new storage account
                      </Option>
                    </Dropdown>
                  </div>
                )}

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable OS guest diagnostics"
                    checked={formData.enableOSGuestDiagnostics}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableOSGuestDiagnostics: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Collect guest OS metrics like CPU, memory, disk, and network
                  </Text>
                </div>

                {formData.enableOSGuestDiagnostics && (
                  <div
                    className={mergeClasses(
                      styles.cardStyleComplex,
                      styles.marginTopM,
                      styles.marginLeft28,
                    )}
                  >
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      Guest Diagnostics Metrics
                    </Text>
                    <Text
                      size={200}
                      className={mergeClasses(styles.fieldCaption, styles.marginBottomS)}
                    >
                      The following metrics will be collected:
                    </Text>
                    <div className={styles.gridColumnSpacing}>
                      <Text size={200}>• Performance counters</Text>
                      <Text size={200}>• Event logs</Text>
                      <Text size={200}>• Crash dumps</Text>
                      <Text size={200}>• Custom logs</Text>
                      <Text size={200}>• Application logs</Text>
                      <Text size={200}>• ETW logs</Text>
                    </div>
                  </div>
                )}

                {/* Health Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Health
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable application health monitoring"
                    checked={formData.enableApplicationHealthMonitoring}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableApplicationHealthMonitoring:
                          data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Monitor application health status and availability
                  </Text>
                </div>

                {formData.enableApplicationHealthMonitoring && (
                  <div className={styles.successCardMarginTop12}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      Application Health Extension
                    </Text>
                    <Text size={200} className={styles.fieldDescription}>
                      The Application Health extension will monitor your
                      application by:
                    </Text>
                    <ul className={styles.listStyleNone}>
                      <li>
                        <Text size={200}>
                          Probing HTTP/HTTPS endpoints to verify application
                          availability
                        </Text>
                      </li>
                      <li>
                        <Text size={200}>
                          Reporting health status to Azure platform
                        </Text>
                      </li>
                      <li>
                        <Text size={200}>
                          Enabling automatic recovery actions when unhealthy
                        </Text>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Insights Section */}
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.sectionSpacer32}
                >
                  Insights
                </Text>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable virtual machine insights"
                    checked={formData.enableVMInsights}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableVMInsights: data.checked === true,
                      })
                    }
                  />
                  <Text
                    size={200}
                    className={mergeClasses(styles.fieldCaption, styles.marginLeft28)}
                  >
                    Get detailed performance monitoring and visualization with
                    Azure Monitor
                  </Text>
                </div>

                {formData.enableVMInsights && (
                  <div className={styles.configurationCardMarginTop12}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom8}
                    >
                      VM Insights Features
                    </Text>
                    <Text
                      size={200}
                      className={mergeClasses(
                        styles.textMuted,
                        styles.blockElement,
                        styles.marginBottomM,
                      )}
                    >
                      VM Insights provides comprehensive monitoring including:
                    </Text>
                    <div className={styles.flexColumnGap8}>
                      <div className={styles.insightFeature}>
                        <Text
                          size={200}
                          weight="semibold"
                          className={mergeClasses(styles.flexRowGap8, styles.marginBottomXS)}
                        >
                          <ChartMultiple20Regular />
                          Performance Charts
                        </Text>
                        <Text size={200} className={styles.textMuted}>
                          Visualize CPU, memory, disk, and network trends over
                          time
                        </Text>
                      </div>
                      <div className={styles.insightFeature}>
                        <Text
                          size={200}
                          weight="semibold"
                          className={mergeClasses(styles.flexRowGap8, styles.marginBottomXS)}
                        >
                          <Map20Regular />
                          Dependency Mapping
                        </Text>
                        <Text size={200} className={styles.textMuted}>
                          Discover application dependencies and network
                          connections
                        </Text>
                      </div>
                      <div className={styles.insightFeature}>
                        <Text
                          size={200}
                          weight="semibold"
                          className={mergeClasses(styles.flexRowGap8, styles.marginBottomXS)}
                        >
                          <ChartMultiple20Regular />
                          Workbooks
                        </Text>
                        <Text size={200} className={styles.textMuted}>
                          Pre-built and custom workbooks for detailed analysis
                        </Text>
                      </div>
                    </div>
                    <Text
                      size={200}
                      className={mergeClasses(
                        styles.textMuted,
                        styles.blockElement,
                        styles.marginTopM,
                      )}
                    >
                      Note: VM Insights requires Log Analytics workspace and
                      installs monitoring agents on your VM.
                    </Text>
                  </div>
                )}
              </>
            )}

            {currentStep === 7 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={styles.sectionHeader}
                >
                  Tags
                </Text>
                <Text size={300} className={styles.fieldDescription}>
                  Tags are name/value pairs that enable you to categorize
                  resources and view consolidated billing.
                </Text>

                <div className={styles.formField}>
                  <Label>Resource tags</Label>
                  <Text
                    size={200}
                    className={mergeClasses(
                      styles.textMuted,
                      styles.blockElement,
                      styles.marginBottomM,
                    )}
                  >
                    Apply tags to organize your resources and track costs. You
                    can add up to 50 tags.
                  </Text>

                  <div className={styles.tagInputRow}>
                    <div className={styles.flex1}>
                      <Label size="small">Name</Label>
                      <Input
                        placeholder="Environment"
                        className={styles.fullWidth}
                      />
                    </div>
                    <div className={styles.flex1}>
                      <Label size="small">Value</Label>
                      <Input
                        placeholder="Production"
                        className={styles.fullWidth}
                      />
                    </div>
                    <Button appearance="secondary" icon={<Add20Regular />}>
                      Add
                    </Button>
                  </div>

                  <div
                    className={mergeClasses(styles.borderStroke2, styles.borderRadius6, styles.paddingVertical16, styles.marginTopL)}
                  >
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.blockMarginBottom12}
                    >
                      Current tags (0)
                    </Text>
                    <Text size={200} className={styles.tagEmptyState}>
                      No tags have been added yet
                    </Text>
                  </div>
                </div>
              </>
            )}

            {currentStep === 8 && (
              <>
                <Text
                  size={500}
                  weight="semibold"
                  className={mergeClasses(styles.blockElement, styles.marginBottomXXL)}
                >
                  Summary
                </Text>

                {/* Configuration Summary */}
                <div className={styles.reviewSummaryCard}>
                  <div className={styles.reviewSummaryHeader}>
                    <Text size={400} weight="semibold">
                      Configuration
                    </Text>
                    <Button
                      appearance="transparent"
                      icon={<Edit20Regular className={styles.brandText} />}
                      onClick={() => {
                        setCurrentStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      title="Edit configuration"
                      className={styles.reviewEditButton}
                    />
                  </div>

                  <div className={styles.reviewSummaryGrid}>
                    <div>
                      <Text size={200} className={styles.fieldCaption}>
                        Image
                      </Text>
                      <Text size={300}>
                        {formData.image === "ubuntu"
                          ? "Ubuntu Server 22.04 LTS"
                          : formData.image === "windows"
                            ? "Windows Server 2022 Datacenter"
                            : formData.image === "redhat"
                              ? "Red Hat Enterprise Linux 9"
                              : formData.image === "debian"
                                ? "Debian 11"
                                : formData.image === "suse"
                                  ? "SUSE Linux Enterprise Server"
                                  : "Ubuntu Server 22.04 LTS"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.fieldCaption}>
                        Size
                      </Text>
                      <Text size={300}>
                        {formData.size === "standard-b2s"
                          ? "Standard_B2s (2 vCPU, 4 GB RAM)"
                          : formData.size === "standard-d2s-v3"
                            ? "Standard_D2s_v3 (2 vCPU, 8 GB RAM)"
                            : formData.size === "standard-d4s-v3"
                              ? "Standard_D4s_v3 (4 vCPU, 16 GB RAM)"
                              : formData.size === "standard-e4s-v3"
                                ? "Standard_E4s_v3 (4 vCPU, 32 GB RAM)"
                                : "Standard_B2s (2 vCPU, 4 GB RAM)"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.fieldCaption}>
                        VM Architecture
                      </Text>
                      <Text size={300}>
                        {formData.vmArchitecture === "x64"
                          ? "x64 (Intel/AMD)"
                          : formData.vmArchitecture === "arm64"
                            ? "Arm64"
                            : "x64 (Intel/AMD)"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.fieldCaption}>
                        OS disk size
                      </Text>
                      <Text size={300}>
                        {formData.osDiskSize === "default"
                          ? "Default (Image default size)"
                          : `${formData.osDiskSize} GiB`}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.fieldCaption}>
                        OS disk type
                      </Text>
                      <Text size={300}>
                        {formData.osDiskType === "premium-ssd"
                          ? "Premium SSD"
                          : formData.osDiskType === "premium-ssd-v2"
                            ? "Premium SSD v2"
                            : formData.osDiskType === "standard-ssd"
                              ? "Standard SSD"
                              : formData.osDiskType === "standard-hdd"
                                ? "Standard HDD"
                                : formData.osDiskType === "ultra-ssd"
                                  ? "Ultra SSD"
                                  : "Premium SSD"}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Topology View */}
                <div className={styles.topologyCard}>
                  <Text
                    size={400}
                    weight="semibold"
                    className={styles.blockMarginBottom20}
                  >
                    Topology
                  </Text>

                  {/* Topology Diagram */}
                  <div className={styles.topologyDiagram}>
                    {/* Region/Subscription Level */}
                    <div className={styles.regionContainer}>
                      <Text size={200} className={styles.subnetLabel}>
                        {formData.region === "east-us"
                          ? "East US Region"
                          : formData.region === "west-us-2"
                            ? "West US 2 Region"
                            : formData.region === "west-europe"
                              ? "West Europe Region"
                              : formData.region === "southeast-asia"
                                ? "Southeast Asia Region"
                                : "East US Region"}
                      </Text>

                      {/* Virtual Network */}
                      <div className={styles.vnetContainer}>
                        <div className={styles.vnetHeader}>
                          <div className={styles.topologyIcon}>
                            <Globe20Regular className={styles.brandText} />
                          </div>
                          <Text size={300} weight="semibold">
                            Virtual Network
                          </Text>
                        </div>

                        {/* Subnet */}
                        <div className={styles.subnetContainer}>
                          <Text size={200} className={styles.subnetLabel}>
                            Subnet
                          </Text>

                          {/* VM */}
                          <div className={styles.vmContainer}>
                            <div className={styles.iconContainer40}>
                              <img
                                src="/icons/virtual-machine.svg"
                                alt="VM"
                                className={styles.iconSize24}
                              />
                            </div>
                            <div className={styles.flex1}>
                              <Text
                                size={300}
                                weight="semibold"
                                className={styles.reviewItem}
                              >
                                {formData.vmName || "vm-linux-prod-001"}
                              </Text>
                              <Text
                                size={200}
                                className={mergeClasses(
                                  styles.textMuted,
                                  styles.blockElement,
                                )}
                              >
                                {formData.size === "standard-b2s"
                                  ? "Standard_B2s"
                                  : formData.size === "standard-d2s-v3"
                                    ? "Standard_D2s_v3"
                                    : formData.size === "standard-d4s-v3"
                                      ? "Standard_D4s_v3"
                                      : formData.size === "standard-e4s-v3"
                                        ? "Standard_E4s_v3"
                                        : "Standard_B2s"}
                              </Text>
                            </div>
                          </div>

                          {/* Disk attached to VM */}
                          <div className={styles.attachedContainer}>
                            <div className={styles.iconContainer32}>
                              <Save20Filled className={styles.brandText} />
                            </div>
                            <div>
                              <Text
                                size={300}
                                weight="semibold"
                                className={styles.textBlock}
                              >
                                OS Disk
                              </Text>
                              <Text
                                size={200}
                                className={mergeClasses(
                                  styles.textMuted,
                                  styles.blockElement,
                                )}
                              >
                                {formData.osDiskType === "premium-ssd"
                                  ? "Premium SSD"
                                  : formData.osDiskType === "standard-ssd"
                                    ? "Standard SSD"
                                    : formData.osDiskType === "standard-hdd"
                                      ? "Standard HDD"
                                      : formData.osDiskType === "ultra-ssd"
                                        ? "Ultra SSD"
                                        : "Premium SSD"}
                                {" - "}
                                {formData.osDiskSize === "default"
                                  ? "Default size"
                                  : `${formData.osDiskSize} GiB`}
                              </Text>
                            </div>
                          </div>

                          {/* NIC attached to VM */}
                          <div className={styles.attachedContainer}>
                            <div className={styles.iconContainer32}>
                              <Connector20Regular
                                className={styles.brandText}
                              />
                            </div>
                            <div>
                              <Text
                                size={300}
                                weight="semibold"
                                className={styles.textBlock}
                              >
                                Network Interface
                              </Text>
                              <Text
                                size={200}
                                className={mergeClasses(
                                  styles.textMuted,
                                  styles.blockElement,
                                )}
                              >
                                Private IP: 10.0.0.4
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* NSG */}
                      <div className={styles.attachedContainer}>
                        <div className={styles.iconContainer32}>
                          <Shield20Regular className={styles.brandText} />
                        </div>
                        <div>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlock}
                          >
                            Network Security Group
                          </Text>
                          <Text
                            size={200}
                            className={mergeClasses(
                              styles.textMuted,
                              styles.blockElement,
                            )}
                          >
                            Firewall rules
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={styles.wizardFooter}>
              {currentStep !== 2 && (
                <Button
                  appearance="secondary"
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      handleBackClick();
                    }
                  }}
                >
                  {currentStep > 1 ? "Previous" : "Cancel"}
                </Button>
              )}
              {currentStep !== 8 && currentStep !== 1 && (
                <Button
                  appearance="secondary"
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={isDeploying}
                >
                  Next
                </Button>
              )}
              {currentStep !== 8 && (
                <Button
                  appearance="primary"
                  onClick={() => {
                    setCurrentStep(8);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Review
                </Button>
              )}
              {currentStep === 8 && (
                <Button
                  appearance="primary"
                  onClick={handleCreate}
                  disabled={isDeploying}
                >
                  {isDeploying ? "Deploying..." : "Deploy"}
                </Button>
              )}
            </div>
          </div>
        </WizardLayout>
      </div>
    </FluentProvider>
  );
};

export default CreateVMWizard;
