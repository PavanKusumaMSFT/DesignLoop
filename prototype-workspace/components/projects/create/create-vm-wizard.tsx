/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Input,
  Dropdown,
  Option,
  Label,
  Skeleton,
  SkeletonItem,
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
  Spinner,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
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
  CheckmarkCircle20Filled,
  Stop20Filled,
  Dismiss24Regular,
  Info12Regular,
} from "@fluentui/react-icons";
import { CopilotProvider } from "@fluentui-copilot/react-copilot";
import { MorseCode } from "@fluentui-copilot/react-morse-code";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { useNavigation } from "../../../lib/navigation-context";
import DeploymentSuccessCard from "../../shared/deployment-success-card";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import PageHeader from "../../shared/page-header";
import WizardStepNav from "../../shared/wizard-step-nav";
import type { WizardStep } from "../../shared/wizard-step-nav";
import WizardCostPanel from "../../shared/wizard-cost-panel";
import WizardLayout from "../../shared/wizard-layout";

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
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "32px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formField: {
    marginBottom: "24px",
  },
  assistantSection: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  assistantIcon: {
    width: "32px",
    height: "32px",
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
  copilotBannerMorseCode: {
    width: "108px",
    flexShrink: 0,
    display: "block",
  },
  skeletonTitle: {
    width: "120px",
    height: "36px",
    borderRadius: "6px",
    marginBottom: "24px",
  },
  skeletonSectionTitle: {
    width: "160px",
    height: "24px",
    borderRadius: "6px",
    marginBottom: "12px",
  },
  skeletonBodyLine: {
    width: "100%",
    height: "14px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  skeletonBodyLineShort: {
    width: "62%",
    height: "14px",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  skeletonField: {
    marginBottom: "24px",
  },
  skeletonLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  skeletonLabel: {
    width: "128px",
    height: "16px",
    borderRadius: "4px",
  },
  skeletonInfoDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
  },
  skeletonInput: {
    width: "100%",
    height: "40px",
    borderRadius: "6px",
  },
  skeletonHint: {
    width: "180px",
    height: "14px",
    borderRadius: "4px",
    marginTop: "8px",
  },
  skeletonInlineRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },
  skeletonValueLine: {
    width: "260px",
    height: "16px",
    borderRadius: "4px",
  },
  skeletonActionLine: {
    width: "64px",
    height: "16px",
    borderRadius: "4px",
  },

  // Text display helpers
  textBlock: {
    display: "block",
  },
  textBlockMb4: {
    display: "block",
    marginBottom: "4px",
  },
  textBlockMb8: {
    display: "block",
    marginBottom: "8px",
  },
  textBlockMb12: {
    display: "block",
    marginBottom: "12px",
  },
  textBlockMb16: {
    display: "block",
    marginBottom: "16px",
  },
  textBlockMb20: {
    display: "block",
    marginBottom: "20px",
  },
  textBlockMb24: {
    display: "block",
    marginBottom: "24px",
  },

  // Text colors
  textFg1: {
    color: tokens.colorNeutralForeground1,
  },
  textFg2: {
    color: tokens.colorNeutralForeground2,
  },
  textFg3: {
    color: tokens.colorNeutralForeground3,
  },
  textBrand: {
    color: "#0078D4",
  },
  textBrandLink: {
    color: "#0078D4",
    cursor: "pointer",
  },
  textGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  textGreenFlexShrink0: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  textSuccess: {
    color: tokens.colorPaletteGreenForeground1,
  },
  textPurple: {
    color: "#4F52F6",
  },
  textPaletteGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },

  // Flex layouts
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenterGap6: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  flexCenterGap8: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  flexCenterGap12: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  flexCenterGap16: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  flexCenterGap20: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  flexBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexBetweenGap8: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  flexBetweenGap16: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexColGap8: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  flexColGap12: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  flexColGap16: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  flexColGap20: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  flexColGap24: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  flexStartGap8: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  flexStartGap12: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },

  // Width utilities
  fullWidth: {
    width: "100%",
  },
  width20: {
    width: "20px",
  },
  width28: {
    width: "28px",
  },
  flex1: {
    flex: 1,
  },
  flexShrink0: {
    flexShrink: 0,
  },
  flexShrink0Mt2: {
    flexShrink: 0,
    marginTop: "2px",
  },

  // Margins
  mb4: {
    marginBottom: "4px",
  },
  mb8: {
    marginBottom: "8px",
  },
  mb12: {
    marginBottom: "12px",
  },
  mb16: {
    marginBottom: "16px",
  },
  mb20: {
    marginBottom: "20px",
  },
  mb24: {
    marginBottom: "24px",
  },
  mb32: {
    marginBottom: "32px",
  },
  mt8: {
    marginTop: "8px",
  },
  mt12: {
    marginTop: "12px",
  },
  mt16: {
    marginTop: "16px",
  },
  mt20: {
    marginTop: "20px",
  },
  mt24: {
    marginTop: "24px",
  },
  mt32: {
    marginTop: "32px",
  },
  ml8: {
    marginLeft: "8px",
  },
  ml28: {
    marginLeft: "28px",
  },
  mlAuto: {
    marginLeft: "auto",
  },
  mr8: {
    marginRight: "8px",
  },
  mr12: {
    marginRight: "12px",
  },
  mr16: {
    marginRight: "16px",
  },

  // Padding
  p8: {
    padding: "8px",
  },
  p12: {
    padding: "12px",
  },
  p16: {
    padding: "16px",
  },
  p20: {
    padding: "20px",
  },
  p24: {
    padding: "24px",
  },
  p0_16_16: {
    padding: "0 16px 16px",
  },
  pb8: {
    paddingBottom: "8px",
  },
  pb12: {
    paddingBottom: "12px",
  },
  pb16: {
    paddingBottom: "16px",
  },
  pb20: {
    paddingBottom: "20px",
  },
  pb24: {
    paddingBottom: "24px",
  },
  pt8: {
    paddingTop: "8px",
  },
  pt12: {
    paddingTop: "12px",
  },
  pt16: {
    paddingTop: "16px",
  },
  pt20: {
    paddingTop: "20px",
  },
  pt24: {
    paddingTop: "24px",
  },
  pl8: {
    paddingLeft: "8px",
  },
  pl12: {
    paddingLeft: "12px",
  },
  pl16: {
    paddingLeft: "16px",
  },
  pr8: {
    paddingRight: "8px",
  },
  pr12: {
    paddingRight: "12px",
  },
  pr16: {
    paddingRight: "16px",
  },

  // Form patterns
  formLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  formHint: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: "4px",
  },
  formHintIndented: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginLeft: "24px",
    marginTop: "4px",
  },
  formRadioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formCheckboxRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },

  // Section titles
  sectionTitle: {
    display: "block",
    marginBottom: "16px",
    marginTop: "32px",
  },
  pageTitleBlock: {
    display: "block",
    marginBottom: "24px",
  },
  subSectionTitle: {
    display: "block",
    marginBottom: "12px",
    marginTop: "20px",
  },

  // Info boxes
  infoBox: {
    backgroundColor: "#EBF3FC",
    border: "1px solid #B3D6FC",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "16px",
  },
  infoBrandBox: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "16px",
  },
  warningBox: {
    backgroundColor: `${tokens.colorNeutralBackground1}4CE`,
    border: "1px solid #F7E018",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "16px",
  },
  successBox: {
    backgroundColor: "#DFF6DD",
    border: "1px solid #92C353",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "16px",
  },

  // Cost estimation
  costContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  costHeader: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "20px",
    marginBottom: "16px",
  },
  costHeaderFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  costDisclaimerText: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: "16px",
  },
  costLineItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  costTotal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: tokens.fontWeightSemibold,
    paddingTop: "8px",
    borderTop: `2px solid ${tokens.colorNeutralStroke2}`,
  },
  costDisclaimer: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
    marginTop: "8px",
  },
  costValue: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "28px",
    color: "#0078D4",
  },
  costLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  costEdit: {
    color: "#0078D4",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    textDecoration: "none",
  },

  // Review section
  reviewCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
  },
  reviewGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  reviewLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: "4px",
  },
  reviewValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },

  // Deployment complete
  deployPage: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  deployCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "32px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  deploySuccessIcon: {
    width: "64px",
    height: "64px",
    color: tokens.colorPaletteGreenForeground1,
    marginBottom: "24px",
  },
  deployTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
  },
  deploySubtitle: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    marginBottom: "32px",
  },
  deployActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginTop: "24px",
  },
  deployDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  deployAccordionItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e1e5e9",
    marginBottom: "8px",
  },
  deployAccordionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    cursor: "pointer",
    fontWeight: tokens.fontWeightSemibold,
  },
  deployAccordionContent: {
    padding: "0 20px 20px 52px",
    borderTop: "1px solid #e1e5e9",
  },
  deployResourceCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  deployResourceIcon: {
    width: "24px",
    height: "24px",
    color: tokens.colorBrandForeground1,
  },

  // EMM drawer
  emmOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 2000,
    display: "flex",
    justifyContent: "flex-end",
  },
  emmDrawer: {
    width: "600px",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "0",
    display: "flex",
    flexDirection: "column",
    boxShadow: tokens.shadow64,
  },
  emmDrawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  emmDrawerContent: {
    flex: 1,
    padding: "24px",
    overflow: "auto",
  },
  emmDrawerFooter: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    padding: "20px 24px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  // Topology
  topologyContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    padding: "24px",
    border: "2px solid #e1e5e9",
  },
  topologyVnet: {
    backgroundColor: "#e8f4fd",
    border: "2px dashed #0078d4",
    borderRadius: "8px",
    padding: "16px",
    position: "relative",
    minHeight: "200px",
  },
  topologyResource: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "absolute",
  },

  // Copilot elements
  copilotBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    padding: "1px 6px",
    borderRadius: "4px",
    backgroundColor: "#EBF3FC",
    fontSize: "11px",
    fontWeight: 600,
    color: "#0078D4",
    lineHeight: "16px",
    flexShrink: 0,
  },
  copilotBannerDone: {
    backgroundColor: "#DFF6DD",
    border: "1px solid #92C353",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  copilotBannerLoading: {
    backgroundColor: "#EBF3FC",
    border: "1px solid #B3D6FC",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },

  // Icon colors
  iconBrand: {
    color: "#0078D4",
  },
  iconGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  iconFg3: {
    color: tokens.colorNeutralForeground3,
  },
  iconSize16: {
    fontSize: "16px",
  },
  iconSize20: {
    fontSize: "20px",
  },

  // Specific width overrides for skeletons
  skeletonWidth72: {
    width: "72px",
  },
  skeletonWidth92: {
    width: "92px",
  },

  // Border styles
  borderBottom: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  borderTop: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  // Background colors
  bgNeutral1: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bgNeutral2: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  bgBrand: {
    backgroundColor: "#0078D4",
  },
  bgBrandSecondary: {
    backgroundColor: tokens.colorBrandBackground2,
  },

  // Cursor styles
  cursorPointer: {
    cursor: "pointer",
  },

  // Text alignment
  textCenter: {
    textAlign: "center",
  },
  textLeft: {
    textAlign: "left",
  },

  // Font weights
  fontWeightSemibold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  fontWeightRegular: {
    fontWeight: tokens.fontWeightRegular,
  },

  // Font sizes
  fontSize10: {
    fontSize: "10px",
    lineHeight: "14px",
  },
  fontSize12: {
    fontSize: "12px",
  },
  fontSize14: {
    fontSize: "14px",
  },
  fontSize16: {
    fontSize: "16px",
  },
  fontSize20: {
    fontSize: "20px",
  },
  fontSize24: {
    fontSize: "24px",
  },
  fontSize28: {
    fontSize: "28px",
  },

  // Additional font weight
  fontWeight700: {
    fontWeight: 700,
  },

  // Position utilities
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },
  fixed: {
    position: "fixed",
  },
  sticky: {
    position: "sticky",
  },

  // Z-index utilities
  zIndex1000: {
    zIndex: 1000,
  },
  zIndex2000: {
    zIndex: 2000,
  },

  // Overflow utilities
  overflowAuto: {
    overflow: "auto",
  },
  overflowHidden: {
    overflow: "hidden",
  },

  // Min height utilities
  minHeight200: {
    minHeight: "200px",
  },
  minHeight100vh: {
    minHeight: "100vh",
  },

  // Height utilities
  height20: {
    height: "20px",
  },
  height24: {
    height: "24px",
  },
  height28: {
    height: "28px",
  },
  height32: {
    height: "32px",
  },
  height64: {
    height: "64px",
  },
  height100: {
    height: "100%",
  },

  // Size combinations
  size20x20: {
    width: "20px",
    height: "20px",
  },
  size24x24: {
    width: "24px",
    height: "24px",
  },
  size28x28: {
    width: "28px",
    height: "28px",
  },

  // Width utilities
  width24: {
    width: "24px",
  },
  width32: {
    width: "32px",
  },
  width64: {
    width: "64px",
  },
  width108: {
    width: "108px",
  },
  width600: {
    width: "600px",
  },
  width800: {
    width: "800px",
  },

  // Max width utilities
  maxWidth800: {
    maxWidth: "800px",
  },

  // Box shadow utilities
  shadow4: {
    boxShadow: tokens.shadow4,
  },
  shadow8: {
    boxShadow: tokens.shadow8,
  },
  shadow64: {
    boxShadow: tokens.shadow64,
  },

  // More common combinations
  textFg3BlockMb4: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: "4px",
  },
  textFg3BlockMt24Mb16: {
    display: "block",
    marginBottom: "16px",
    marginTop: "24px",
  },
  textFg3BlockMt4: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: "4px",
  },
  textFg3BlockMb8: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: "8px",
  },
  cardStyle: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "6px",
  },
  flexCenterGap8Mb4: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  flexBetweenCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listStyle: {
    margin: "0",
    paddingLeft: "20px",
    color: tokens.colorNeutralForeground2,
  },
  iconContainer32: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFg2BlockMb24: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: "24px",
  },
  textFg3BlockMt4Ml28: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: "4px",
    marginLeft: "28px",
  },
  textBlockMb16Mt32: {
    display: "block",
    marginBottom: "16px",
    marginTop: "32px",
  },
  iconFg3Size16: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
  },
  flexCenterGap6Padding12_16: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
  },
  brandDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandForeground1,
  },
  textFg3Block: {
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  textFg2Block: {
    color: tokens.colorNeutralForeground2,
    display: "block",
  },
  flexColStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  flexColCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flexRowStart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  flexRowCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  absolute100: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  fullSize: {
    width: "100%",
    height: "100%",
  },

  // Cost line items (batch removal)
  costLineItemBordered: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  spotDiscountBox: {
    padding: "12px",
    backgroundColor: tokens.colorPaletteGreenBackground2,
    borderRadius: "6px",
    marginTop: "12px",
  },
  spotDiscountRow: {
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  costTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    paddingTop: "16px",
  },
  disclaimerBox: {
    marginTop: "16px",
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  textFg2FlexStartGap8: {
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },

  // Deploy complete page
  deployPageWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  deployContentCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "48px 32px 120px",
  },
  deployCardFull: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: tokens.shadow4,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  flexColGap12Full: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  deployTitleText: {
    flex: 1,
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "28px",
  },
  flexColGap8Full: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  borderedCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
  },
  borderedCardPadded: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
  },
  textFg2BlockMb16: {
    display: "block",
    marginBottom: "16px",
    color: tokens.colorNeutralForeground2,
  },
  grid3Col: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  nextStepCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    cursor: "pointer",
  },
  iconBadge: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  },
  flexColGap4Mt12: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "12px",
  },
  flexBetweenFull: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  // EMM drawer
  emmOverlayFixed: {
    position: "fixed",
    top: "48px",
    left: 0,
    right: 0,
    bottom: "68px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
  },
  emmDrawerFixed: {
    position: "fixed",
    top: "48px",
    right: 0,
    bottom: "68px",
    width: "340px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow:
      "0px 0px 8px 0px rgba(0,0,0,0.2), 0px 32px 64px 0px rgba(0,0,0,0.24)",
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
  },
  emmDrawerHeaderAlt: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
    padding: "24px 16px 12px 24px",
    flexShrink: 0,
  },
  emmCenterContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  emmCenterContentSmall: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  emmSuccessIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "48px",
    width: "48px",
    height: "48px",
  },
  emmBodyContent: {
    flex: 1,
    overflowY: "auto",
    padding: "0 24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  emmGradientCard: {
    background:
      "linear-gradient(54.4deg, rgb(222, 232, 249) 4.7%, rgb(241, 236, 237) 100%)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  emmBulletList: {
    margin: 0,
    paddingLeft: "21px",
    listStyleType: "disc",
  },
  emmFlexColGap4Full: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  emmFlexCenterGap4: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  emmTooltipIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "help",
  },
  emmFooterSection: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  },
  emmCostHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "16px 24px",
  },
  emmCostBody: {
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
  emmCostValue: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "24px",
    lineHeight: "32px",
  },
  emmCostPeriod: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "13px",
    lineHeight: "18px",
  },
  emmCostDetail: {
    fontSize: "10px",
    lineHeight: "14px",
  },
  emmActionBar: {
    padding: "16px 24px 24px",
    display: "flex",
    gap: "8px",
  },

  copilotSuccessBanner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "8px 16px",
    borderRadius: "8px",
    background: "#DFF6DD",
  },
  copilotSearchBar: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "46px",
    padding: "6px 12px",
    borderRadius: "12px",
    background: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
  },
  flexCenterGap4Flex1: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flex: 1,
  },
  flexCenterGap6Shrink0: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
  },
  copilotIconCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: tokens.colorBrandBackground2,
  },
  copilotShortcutBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
    height: "16px",
    borderRadius: "2px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    background: tokens.colorNeutralBackground1,
  },
  textFg2BlockMb16Alt: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: "16px",
  },
  textFg3FlexGap4Mt4: {
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "4px",
  },
  textBrandBlockMt8: {
    color: "#0078D4",
    display: "block",
    marginTop: "8px",
    cursor: "pointer",
  },
  textBrandUnderline: {
    color: "#0078D4",
    cursor: "pointer",
    textDecoration: "underline",
  },

  // Review section boxes
  reviewInfoBoxBrand: {
    padding: "16px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorBrandStroke1}`,
    marginTop: "12px",
  },
  reviewInfoBoxNeutral: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
  },
  reviewInfoBoxNeutralMl28: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
    marginLeft: "28px",
  },
  reviewInfoBoxYellow: {
    padding: "16px",
    backgroundColor: tokens.colorPaletteYellowBackground2,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorPaletteYellowBorder2}`,
    marginTop: "12px",
  },
  textFg2Mb8FlexCenterGap8: {
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  textPaletteGreenInline: {
    color: tokens.colorPaletteGreenForeground1,
  },
  textFg2BlockMb12: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: "12px",
  },
  reviewListStyled: {
    margin: "8px 0 0 0",
    paddingLeft: "20px",
    color: tokens.colorNeutralForeground2,
  },
  grid2ColGap8: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  textFg3BlockMb12: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: "12px",
  },
  textFg3BlockMt12: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: "12px",
  },
  flexGap12Mb12End: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    alignItems: "flex-end",
  },
  borderedBoxMt16: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    padding: "16px",
    marginTop: "16px",
  },
  textFg3Italic: {
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
  reviewSectionCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  flexBetweenMb20: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  compactButton: {
    minWidth: "auto",
    padding: "4px 8px",
    cursor: "pointer",
  },
  grid2ColGap16x32: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px 32px",
  },

  // Topology section
  topologyCenterCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "32px 24px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
  },
  topologyVnetBox: {
    width: "100%",
    maxWidth: "600px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
  },
  topologyInfoBoxBrand: {
    padding: "16px",
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    marginBottom: "12px",
  },
  topologyInfoRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  topologyIconBrand: {
    width: "24px",
    height: "24px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  colorBrandFg1: {
    color: tokens.colorBrandForeground1,
  },
  topologyResourceCard: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  topologyHighlightCard: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorBrandStroke1}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  topologyIconBox: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topologyNoteBox: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  topologyNoteBoxAlt: {
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  topologyFooterRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  // Misc
  textFg2CenterPadded: {
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
    padding: "0 24px",
  },

  // Animation and transition utilities
  transition: {
    transition: "all 0.2s",
  },
});

interface Step {
  id: number;
  title: string;
  completed: boolean;
  copilotEnhanced?: boolean;
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
  const sidebarStickyTop = customHeader !== null ? "72px" : "24px";
  const [currentStep, setCurrentStep] = useState(1);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  const [isCreatingStorageAccount, setIsCreatingStorageAccount] =
    useState(false);
  const [storageAccountCreated, setStorageAccountCreated] = useState(false);
  const [isManualConfigExpanded, setIsManualConfigExpanded] = useState(false);
  const [emmDrawerOpen, setEmmDrawerOpen] = useState(false);
  const [emmCostExpanded, setEmmCostExpanded] = useState(true);
  const [emmEnrollState, setEmmEnrollState] = useState<
    "idle" | "enrolling" | "success"
  >("idle");
  const [copilotFilled, setCopilotFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopilotFilled(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    optimizationType: "cost",
    subscription: "",
    resourceGroup: "",
    vmName: "",
    minInstanceCount: "2",
    maxInstanceCount: "10",
    scaleOutCpuThreshold: "70",
    scaleInCpuThreshold: "30",
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

  const effectiveSubscription = formData.subscription || "zava-sub";
  const effectiveResourceGroup = formData.resourceGroup || "rg-zavaretailstore";
  const effectiveVmssName = copilotFilled
    ? "Zava-1-vmss"
    : formData.vmName || "Not specified";
  const effectiveRegionValue = formData.region || "east-us";
  const effectiveRegionLabel =
    effectiveRegionValue === "east-us"
      ? "East US"
      : effectiveRegionValue === "west-us-2"
        ? "West US 2"
        : effectiveRegionValue === "west-europe"
          ? "West Europe"
          : effectiveRegionValue === "southeast-asia"
            ? "Southeast Asia"
            : "East US";
  const effectiveAvailabilityZone = copilotFilled
    ? "Zone 1, zone 2, zone 3"
    : "Zone 1";
  const effectiveImageValue = formData.image || "windows-2025";
  const effectiveImageLabel =
    effectiveImageValue === "windows-2025"
      ? "Windows Server 2025 Datacenter: Azure Edition - x64 Gen2"
      : effectiveImageValue === "ubuntu"
        ? "Ubuntu Server 22.04 LTS"
        : effectiveImageValue === "windows-2022"
          ? "Windows Server 2022 Datacenter"
          : effectiveImageValue === "redhat"
            ? "Red Hat Enterprise Linux 9"
            : "Windows Server 2025 Datacenter: Azure Edition - x64 Gen2";
  const effectiveSizeValue = copilotFilled
    ? "standard-d4s-v3"
    : formData.size || "standard-d2s-v3";
  const effectiveSizeLabel =
    effectiveSizeValue === "standard-b2s"
      ? "Standard_B2s (2 vCPU, 4 GB RAM)"
      : effectiveSizeValue === "standard-d2s-v3"
        ? "Standard_D2s_v3 (2 vCPU, 8 GB RAM)"
        : effectiveSizeValue === "standard-d4s-v3"
          ? "Standard_D4s_v3 (4 vCPU, 16 GB RAM)"
          : effectiveSizeValue === "standard-e4s-v3"
            ? "Standard_E4s_v3 (4 vCPU, 32 GB RAM)"
            : "Standard_D4s_v3 (4 vCPU, 16 GB RAM)";
  const effectiveSizeShort = effectiveSizeLabel.split(" ")[0];
  const effectiveVirtualNetwork = copilotFilled
    ? "zava-vm-1-vmss-vnet"
    : formData.virtualNetwork || "Not configured";
  const effectiveSubnet = copilotFilled
    ? "snet-eastus-vmss"
    : formData.subnet || "Not configured";
  const effectiveLoadBalancer = copilotFilled
    ? "zava-vm-1-vmss-lb"
    : formData.loadBalancingOptions === "azure-load-balancer"
      ? "Azure Load Balancer"
      : formData.loadBalancingOptions === "application-gateway"
        ? "Application Gateway"
        : formData.loadBalancingOptions === "none"
          ? "None"
          : formData.loadBalancingOptions || "None";
  const effectiveOsDiskSize =
    formData.osDiskSize === "default"
      ? "Default (Image default size)"
      : `${formData.osDiskSize} GiB`;
  const effectiveOsDiskType =
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
              : "Premium SSD";
  const effectiveAdminAccess =
    formData.authenticationType === "password"
      ? "Password authentication"
      : "SSH public key";
  const effectiveAdminUser = formData.username || "Not specified";
  const effectiveScaleProfile = `${formData.minInstanceCount}-${formData.maxInstanceCount} instances`;
  const effectiveScaleRules = `Scale out above ${formData.scaleOutCpuThreshold}% CPU, scale in below ${formData.scaleInCpuThreshold}% CPU`;

  const steps: Step[] = [
    { id: 1, title: "Basics", completed: false, copilotEnhanced: true },
    { id: 2, title: "Autoscaling", completed: false, copilotEnhanced: true },
    { id: 3, title: "Management", completed: false, copilotEnhanced: true },
    { id: 4, title: "Health", completed: false, copilotEnhanced: true },
    { id: 5, title: "Advanced", completed: false, copilotEnhanced: true },
    { id: 6, title: "Tags", completed: false, copilotEnhanced: true },
    { id: 7, title: "Review", completed: false },
  ];

  const CopilotBadge = () => (
    <span className={styles.copilotBadge}>Copilot</span>
  );

  const renderBasicsSkeleton = () => (
    <Skeleton animation="wave">
      <SkeletonItem className={styles.skeletonTitle} />

      <SkeletonItem className={styles.skeletonSectionTitle} />
      <SkeletonItem className={styles.skeletonBodyLine} />
      <SkeletonItem className={styles.skeletonBodyLineShort} />

      {[0, 1].map((fieldIndex) => (
        <div key={`project-${fieldIndex}`} className={styles.skeletonField}>
          <div className={styles.skeletonLabelRow}>
            <SkeletonItem className={styles.skeletonLabel} />
            <SkeletonItem shape="circle" className={styles.skeletonInfoDot} />
          </div>
          <SkeletonItem className={styles.skeletonInput} />
        </div>
      ))}

      <SkeletonItem
        className={mergeClasses(styles.skeletonSectionTitle, styles.mt32)}
      />

      {[0, 1, 2, 3].map((fieldIndex) => (
        <div key={`instance-${fieldIndex}`} className={styles.skeletonField}>
          <div className={styles.skeletonLabelRow}>
            <SkeletonItem className={styles.skeletonLabel} />
            <SkeletonItem shape="circle" className={styles.skeletonInfoDot} />
          </div>
          <SkeletonItem className={styles.skeletonInput} />
          {fieldIndex === 1 && <SkeletonItem className={styles.skeletonHint} />}
        </div>
      ))}

      <SkeletonItem
        className={mergeClasses(styles.skeletonSectionTitle, styles.mt32)}
      />
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabelRow}>
          <SkeletonItem className={styles.skeletonLabel} />
          <SkeletonItem shape="circle" className={styles.skeletonInfoDot} />
        </div>
        <div className={styles.skeletonInlineRow}>
          <SkeletonItem className={styles.skeletonValueLine} />
          <SkeletonItem className={styles.skeletonActionLine} />
        </div>
      </div>
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabelRow}>
          <SkeletonItem className={styles.skeletonLabel} />
        </div>
        <div className={styles.skeletonInlineRow}>
          <SkeletonItem
            className={mergeClasses(
              styles.skeletonValueLine,
              styles.skeletonWidth72,
            )}
          />
          <SkeletonItem
            className={mergeClasses(
              styles.skeletonActionLine,
              styles.skeletonWidth92,
            )}
          />
        </div>
      </div>

      <SkeletonItem
        className={mergeClasses(styles.skeletonSectionTitle, styles.mt32)}
      />
      {[0, 1, 2].map((fieldIndex) => (
        <div key={`network-${fieldIndex}`} className={styles.skeletonField}>
          <div className={styles.skeletonLabelRow}>
            <SkeletonItem className={styles.skeletonLabel} />
            <SkeletonItem shape="circle" className={styles.skeletonInfoDot} />
          </div>
          <SkeletonItem className={styles.skeletonInput} />
        </div>
      ))}
    </Skeleton>
  );

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

  const getCostEstimation = () => {
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
      // Base storage account cost (LRS Standard)
      storageAccountCost = 0.18; // per GB per month for first 50 TB
      // Add transaction costs estimate
      storageAccountCost += 2.5; // Estimated monthly transaction costs
    }

    const totalCost =
      vmCost +
      osDiskCost +
      dataDisksTotal +
      networkingCost +
      monitoringCost +
      availabilityCost +
      storageAccountCost;

    // Condensed view when creating storage account
    if (isCreatingStorageAccount) {
      return (
        <div>
          <div className={mergeClasses(styles.flexCenterGap8, styles.mb16)}>
            <Text size={500} weight="semibold">
              Cost estimation
            </Text>
          </div>

          <div className={styles.mb16}>
            {/* VM Compute Cost */}
            <div className={styles.costLineItem}>
              <Text size={300}>Virtual Machine</Text>
              <Text size={300} weight="semibold">
                ${vmCost.toFixed(2)}
              </Text>
            </div>

            {/* OS Disk Cost */}
            <div className={styles.costLineItem}>
              <Text size={300}>OS Disk</Text>
              <Text size={300} weight="semibold">
                ${osDiskCost.toFixed(2)}
              </Text>
            </div>

            {/* Data Disks Cost (if applicable) */}
            {dataDisksTotal > 0 && (
              <div className={styles.costLineItem}>
                <Text size={300}>Data Disks</Text>
                <Text size={300} weight="semibold">
                  ${dataDisksTotal.toFixed(2)}
                </Text>
              </div>
            )}

            {/* Networking Cost */}
            <div className={styles.costLineItem}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Networking
                </Text>
                {networkingCost === 0 && (
                  <Text size={200} className={styles.textFg3}>
                    Not configured
                  </Text>
                )}
              </div>
              <Text size={300} weight="semibold">
                ${networkingCost.toFixed(2)}
              </Text>
            </div>

            {/* Monitoring Cost */}
            <div className={styles.costLineItem}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Monitoring
                </Text>
                {monitoringCost === 0 && (
                  <Text size={200} className={styles.textFg3}>
                    Not configured
                  </Text>
                )}
              </div>
              <Text size={300} weight="semibold">
                ${monitoringCost.toFixed(2)}
              </Text>
            </div>

            {/* Availability Cost (if applicable) */}
            {availabilityCost > 0 && (
              <div className={styles.costLineItem}>
                <Text size={300}>Availability</Text>
                <Text size={300} weight="semibold">
                  ${availabilityCost.toFixed(2)}
                </Text>
              </div>
            )}

            {/* Storage Account Cost (if applicable) */}
            {storageAccountCreated && storageAccountCost > 0 && (
              <div className={styles.costLineItem}>
                <Text size={300}>Storage Account</Text>
                <Text size={300} weight="semibold">
                  ${storageAccountCost.toFixed(2)}
                </Text>
              </div>
            )}
          </div>

          {/* Total */}
          <div className={styles.costTotal}>
            <Text size={400} weight="semibold">
              Estimated monthly total
            </Text>
            <Text size={500} weight="semibold" className={styles.textBrand}>
              ${totalCost.toFixed(2)}
            </Text>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={styles.costHeaderFlex}>
          <Text size={500} weight="semibold">
            Cost estimation
          </Text>
        </div>

        <Text size={200} className={styles.costDisclaimerText}>
          Estimated monthly cost based on your selections. Actual costs may
          vary.
        </Text>

        <div className={styles.mb16}>
          {/* VM Compute Cost */}
          <div className={styles.costLineItem}>
            <div>
              <Text size={300} className={styles.textBlock}>
                Virtual Machine
              </Text>
              <Text
                size={200}
                className={mergeClasses(styles.textFg3, styles.textBlock)}
              >
                {formData.size === "standard-b2s"
                  ? "Standard_B2s (2 vCPU, 4 GB)"
                  : formData.size === "standard-d2s-v3"
                    ? "Standard_D2s_v3 (2 vCPU, 8 GB)"
                    : formData.size === "standard-d4s-v3"
                      ? "Standard_D4s_v3 (4 vCPU, 16 GB)"
                      : formData.size === "standard-e4s-v3"
                        ? "Standard_E4s_v3 (4 vCPU, 32 GB)"
                        : "Not selected"}
              </Text>
            </div>
            <Text size={300} weight="semibold">
              ${vmCost.toFixed(2)}
            </Text>
          </div>

          {/* OS Disk Cost */}
          <div className={styles.costLineItemBordered}>
            <div>
              <Text size={300} className={styles.textBlock}>
                OS Disk
              </Text>
              <Text size={200} className={styles.textFg3Block}>
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
                          : "Not selected"}
                {formData.osDiskSize !== "default"
                  ? ` - ${formData.osDiskSize} GiB`
                  : " - Default"}
              </Text>
            </div>
            <Text size={300} weight="semibold">
              ${osDiskCost.toFixed(2)}
            </Text>
          </div>

          {/* Data Disks Cost (if applicable) */}
          {dataDisksTotal > 0 && (
            <div className={styles.costLineItemBordered}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Data Disks
                </Text>
                <Text size={200} className={styles.textFg3Block}>
                  {formData.dataDisks.length} disk
                  {formData.dataDisks.length !== 1 ? "s" : ""}
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${dataDisksTotal.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Additional services - only show on Review step */}
          {currentStep === 7 && (
            <>
              {/* Virtual Network Cost */}
              <div className={styles.costLineItemBordered}>
                <div>
                  <Text size={300} className={styles.textBlock}>
                    Virtual Network
                  </Text>
                  <Text size={200} className={styles.textFg3Block}>
                    Standard tier
                  </Text>
                </div>
                <Text size={300} weight="semibold">
                  $0.00
                </Text>
              </div>

              {/* Azure Bastion Cost */}
              <div className={styles.costLineItemBordered}>
                <div>
                  <Text size={300} className={styles.textBlock}>
                    Azure Bastion
                  </Text>
                  <Text size={200} className={styles.textFg3Block}>
                    Standard SKU
                  </Text>
                </div>
                <Text size={300} weight="semibold">
                  $140.00
                </Text>
              </div>

              {/* NSG Cost */}
              <div className={styles.costLineItemBordered}>
                <div>
                  <Text size={300} className={styles.textBlock}>
                    NSG (2)
                  </Text>
                  <Text size={200} className={styles.textFg3Block}>
                    Network security groups
                  </Text>
                </div>
                <Text size={300} weight="semibold">
                  $0.00
                </Text>
              </div>
            </>
          )}

          {/* Networking Cost - show on non-review steps */}
          {currentStep !== 7 && (
            <div className={styles.costLineItemBordered}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Networking
                </Text>
                <Text size={200} className={styles.textFg3Block}>
                  Not configured
                </Text>
              </div>
              <Text size={300} weight="semibold">
                $0.00
              </Text>
            </div>
          )}

          {/* Monitoring Cost - show on non-review steps */}
          {currentStep !== 7 && (
            <div className={styles.costLineItemBordered}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Monitoring
                </Text>
                <Text size={200} className={styles.textFg3Block}>
                  Not configured
                </Text>
              </div>
              <Text size={300} weight="semibold">
                $0.00
              </Text>
            </div>
          )}

          {/* Availability Cost (if applicable) */}
          {availabilityCost > 0 && (
            <div className={styles.costLineItemBordered}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Availability
                </Text>
                <Text size={200} className={styles.textFg3Block}>
                  {formData.availabilityOptions === "availability-zone"
                    ? "Availability Zone"
                    : formData.availabilityOptions === "availability-set"
                      ? "Availability Set"
                      : formData.availabilityOptions === "vmss"
                        ? "VM Scale Set"
                        : "None"}
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${availabilityCost.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Storage Account Cost (if applicable) */}
          {storageAccountCreated && storageAccountCost > 0 && (
            <div className={styles.costLineItemBordered}>
              <div>
                <Text size={300} className={styles.textBlock}>
                  Storage Account
                </Text>
                <Text size={200} className={styles.textFg3Block}>
                  Standard LRS - vmstorageacct001
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${storageAccountCost.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Spot Discount Notice */}
          {formData.runWithSpotDiscount && (
            <div className={styles.spotDiscountBox}>
              <Text size={200} className={styles.spotDiscountRow}>
                <Money20Regular className={styles.textPaletteGreen} />
                Azure Spot discount applied: ~80% savings on compute cost
              </Text>
            </div>
          )}
        </div>

        {/* Total */}
        <div className={styles.costTotalRow}>
          <Text size={400} weight="semibold">
            Estimated monthly
          </Text>
          <Text size={500} weight="semibold" className={styles.textBrand}>
            $
            {(
              vmCost +
              osDiskCost +
              storageAccountCost +
              (currentStep === 7 ? 140.0 : 0)
            ).toFixed(2)}
          </Text>
        </div>

        {/* Disclaimer */}
        <div className={styles.disclaimerBox}>
          <Text size={200} className={styles.textFg2FlexStartGap8}>
            <Lightbulb20Regular className={styles.flexShrink0Mt2} />
            <span>
              This is an estimate based on 730 hours/month. Actual costs depend
              on usage, region, and applicable discounts. Additional charges may
              apply for bandwidth, storage transactions, and other services.
            </span>
          </Text>
        </div>
      </div>
    );
  };

  if (deploymentComplete) {
    const vmssName = "zava-1-vmss";

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
          "Set up Azure Backup to protect your scale set data against accidental loss.",
      },
      {
        icon: "/icons/VM-Scale-Sets.svg",
        title: "Set up auto-scaling rules",
        description:
          "Define scale-out and scale-in rules based on CPU, memory, or custom metrics.",
      },
    ];

    const vmMoreLinks = [
      "Configure load balancer health probes",
      "Set up alerts and diagnostics",
      "Review zone redundancy options",
    ];

    return (
      <FluentProvider theme={webLightTheme}>
        <div className={styles.deployPageWrapper}>
          {customHeader !== null && (
            <div className={styles.stickyNav}>
              {customHeader || (
                <AzureHeaderBuildMVP activeLink="Build" hideManage />
              )}
            </div>
          )}

          {/* Content area */}
          <div className={styles.deployContentCenter}>
            <DeploymentSuccessCard
              className={styles.maxWidth800}
              title="Your virtual machine scale set was deployed successfully"
              description={`${vmssName} is running in East US with 2 instances. Click on a deployment to view individual resources created as part of the deployment.`}
              sections={[
                { id: "provision", label: "1. Provision scale set infrastructure" },
                { id: "networking", label: "2. Configure networking and load balancer" },
                { id: "deploy-vms", label: "3. Deploy VM instances" },
              ]}
              nextSteps={{
                description:
                  "Once you've deployed, optimize performance with real-time metrics, scaling rules, cost and error alerts, and more.",
                cards: vmNextStepsCards,
                moreLinks: vmMoreLinks.map((label) => ({ label })),
              }}
              nextStepsLabel="4. Next steps"
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
              <div
                className={styles.emmOverlayFixed}
                onClick={() => setEmmDrawerOpen(false)}
              />
              <div className={styles.emmDrawerFixed}>
                <div className={styles.emmDrawerHeaderAlt}>
                  <Subtitle1 className={styles.flex1}>
                    Keep your app fast, secure, and reliable
                  </Subtitle1>
                  <Button
                    appearance="subtle"
                    aria-label="Close"
                    icon={<Dismiss24Regular />}
                    onClick={() => {
                      setEmmDrawerOpen(false);
                      setEmmEnrollState("idle");
                    }}
                  />
                </div>
                {emmEnrollState === "enrolling" && (
                  <div className={styles.emmCenterContent}>
                    <Spinner size="large" />
                    <Body1 className={styles.textFg2}>
                      Enrolling your resources...
                    </Body1>
                  </div>
                )}
                {emmEnrollState === "success" && (
                  <div className={styles.emmCenterContentSmall}>
                    <CheckmarkCircle20Filled
                      className={styles.emmSuccessIcon}
                    />
                    <Subtitle2
                      className={mergeClasses(
                        styles.textGreen,
                        styles.textFg2CenterPadded,
                      )}
                    >
                      Enrolled successfully
                    </Subtitle2>
                    <Body1>
                      Machine management is now active for your resources.
                    </Body1>
                  </div>
                )}
                {emmEnrollState === "idle" && (
                  <>
                    <div className={styles.emmBodyContent}>
                      <div className={styles.emmGradientCard}>
                        <Subtitle2
                          className={mergeClasses(
                            styles.fontWeight700,
                            styles.emmBulletList,
                          )}
                        >
                          Enroll in machine management:
                        </Subtitle2>
                        <ul>
                          <li>
                            <Body1>Manage updates automatically</Body1>
                          </li>
                          <li>
                            <Body1>Monitor performance</Body1>
                          </li>
                          <li>
                            <Body1>
                              Protect checkout and APIs for your Next.js + API
                              app
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
                        <div
                          key={field.label}
                          className={styles.emmFlexColGap4Full}
                        >
                          <div className={styles.emmFlexCenterGap4}>
                            <Body1>{field.label}</Body1>
                            <Tooltip
                              content={field.label}
                              relationship="description"
                            >
                              <Info12Regular
                                className={styles.emmTooltipIcon}
                              />
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
                    </div>
                    {/* Docked footer: cost block + buttons */}
                    <div className={styles.emmFooterSection}>
                      <div
                        className={styles.emmCostHeader}
                        onClick={() => setEmmCostExpanded(!emmCostExpanded)}
                      >
                        <div className={styles.emmCostBody}>
                          <Body1 className={styles.emmCostTitle}>
                            Estimated monthly cost
                          </Body1>
                          {emmCostExpanded && (
                            <>
                              <span>
                                <span className={styles.emmCostValue}>
                                  $15.00
                                </span>
                                <span className={styles.emmCostPeriod}>
                                  / server / month
                                </span>
                              </span>
                              <span className={styles.fontSize10}>
                                Cost is an estimate only.{" "}
                                <Link
                                  href="#"
                                  inline
                                  className={styles.emmCostDetail}
                                >
                                  Read full disclaimer
                                </Link>
                              </span>
                            </>
                          )}
                        </div>
                        {emmCostExpanded ? (
                          <ChevronUp20Regular className={styles.textBrand} />
                        ) : (
                          <ChevronDown20Regular />
                        )}
                      </div>
                      <div className={styles.emmActionBar}>
                        <Button
                          appearance="primary"
                          onClick={() => {
                            setEmmEnrollState("enrolling");
                            setTimeout(() => {
                              setEmmEnrollState("success");
                              setTimeout(() => {
                                setEmmDrawerOpen(false);
                                setEmmEnrollState("idle");
                              }, 1200);
                            }, 1500);
                          }}
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
            </>
          )}
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <CopilotProvider>
        <div className={styles.container}>
          {customHeader !== null && (
            <div className={styles.stickyNav}>
              {customHeader || (
                <AzureHeaderBuildMVP activeLink="Build" hideManage />
              )}
            </div>
          )}

          <PageBreadcrumb
            noBorder
            items={[
              { label: "Home", onClick: () => handlePageChange("home-fre") },
              { label: "New" },
              { label: "Create a resource" },
            ]}
          />

          <PageHeader
            title="Create a VM resource"
            onClose={handleBackClick}
            actions={
              <Button
                appearance="subtle"
                icon={<span className={styles.fontSize16}>⋯</span>}
                size="small"
              />
            }
          />

          <WizardLayout
            hasCustomHeader={customHeader !== null}
            stepNav={
              <WizardStepNav
                steps={steps}
                activeStep={currentStep}
                onStepChange={(stepId) => {
                  setCurrentStep(stepId);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                showCopilotIcons={copilotFilled}
              />
            }
            rightPanel={
              <WizardCostPanel
                total={copilotFilled ? "$146.88" : undefined}
                loading={!copilotFilled}
                expandable
                attribution={
                  copilotFilled ? (
                    <>
                      Cost estimated by Copilot.{" "}
                      <span>Find full pricing</span>
                    </>
                  ) : undefined
                }
              />
            }
          >
                {/* Copilot banner */}
                {copilotFilled ? (
                  <div className={styles.copilotSuccessBanner}>
                    <CheckmarkCircle20Filled
                      className={styles.textGreenFlexShrink0}
                    />
                    <Text size={300} className={styles.textFg1}>
                      19 fields across 6 tabs filled by Copilot. Hover on
                      Copilot badge on any field to see why.
                    </Text>
                  </div>
                ) : (
                  <div className={styles.copilotSearchBar}>
                    <div className={styles.flexCenterGap4Flex1}>
                      <Text
                        weight="semibold"
                        size={300}
                        className={styles.textFg1}
                      >
                        Filling form for a scalable virtual machine resource
                        based on the virtual machine &quot;vm-1&quot;
                      </Text>
                    </div>
                    <div className={styles.flexCenterGap6Shrink0}>
                      <MorseCode
                        className={styles.copilotBannerMorseCode}
                      />
                      <div className={styles.copilotIconCircle}>
                        <Stop20Filled
                          className={styles.textBrand}
                        />
                      </div>
                      <div className={styles.copilotShortcutBadge}>
                        <Text
                          size={100}
                          weight="semibold"
                          className={styles.textFg3}
                        >
                          ESC
                        </Text>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.centerSection}>
                  {currentStep === 1 &&
                    !copilotFilled &&
                    renderBasicsSkeleton()}

                  {currentStep === 1 && copilotFilled && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb24}
                      >
                        Basics
                      </Text>

                      {/* Project Details Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb8}
                      >
                        Project details
                      </Text>
                      <Text size={300} className={styles.textFg2BlockMb16Alt}>
                        Select the subscription to manage deployed resources and
                        costs. Use resource groups like folders to organize and
                        manage all your resources.{" "}
                        <span className={styles.textBrandLink}>
                          Get more info
                        </span>
                      </Text>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Subscription</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                        </div>
                        <Dropdown
                          placeholder="Select subscription"
                          value="zava-sub"
                          selectedOptions={["zava-sub"]}
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              subscription: data.optionValue as string,
                            })
                          }
                          onFocus={() => setActiveField("subscription")}
                          className={styles.fullWidth}
                        >
                          <Option value="zava-sub">zava sub</Option>
                          <Option value="contoso-prod">
                            Contoso Production
                          </Option>
                          <Option value="contoso-dev">
                            Contoso Development
                          </Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Resource group</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                        </div>
                        <Dropdown
                          placeholder="Select or create resource group"
                          value="rg-zavaretailstore"
                          selectedOptions={["rg-zavaretailstore"]}
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              resourceGroup: data.optionValue as string,
                            })
                          }
                          onFocus={() => setActiveField("resourceGroup")}
                          className={styles.fullWidth}
                        >
                          <Option value="rg-zavaretailstore">
                            rg-zavaretailstore
                          </Option>
                          <Option value="rg-production-vms">
                            rg-production-vms
                          </Option>
                          <Option value="create-new">Create new</Option>
                        </Dropdown>
                      </div>

                      {/* Instance Details Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
                      >
                        Instance details
                      </Text>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Virtual machine scale set name</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Input
                          placeholder="Unique name"
                          value={
                            copilotFilled ? "Zava-1-vmss" : formData.vmName
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, vmName: e.target.value })
                          }
                          onFocus={() => setActiveField("vmName")}
                          className={mergeClasses(
                            styles.fullWidth,
                            styles.textFg3FlexGap4Mt4,
                          )}
                        />
                        {copilotFilled && (
                          <Text size={200}>
                            <span className={styles.fontSize12}>&#9679;</span>
                            Your VM resource will be deployed as a virtual
                            machine scale set
                          </Text>
                        )}
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Region</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select region"
                          value={formData.region || "east-us"}
                          selectedOptions={
                            formData.region ? [formData.region] : ["east-us"]
                          }
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              region: data.optionValue as string,
                            })
                          }
                          onFocus={() => setActiveField("region")}
                          className={styles.fullWidth}
                        >
                          <Option value="east-us">(US) East US</Option>
                          <Option value="west-us-2">(US) West US 2</Option>
                          <Option value="west-europe">West Europe</Option>
                          <Option value="southeast-asia">Southeast Asia</Option>
                        </Dropdown>
                        <Text size={200} className={styles.textBrandBlockMt8}>
                          Deploy to an Azure extended zone
                        </Text>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label>Availability zone</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select zone"
                          value={copilotFilled ? "zone-123" : "zone-1"}
                          selectedOptions={
                            copilotFilled ? ["zone-123"] : ["zone-1"]
                          }
                          onOptionSelect={() => {}}
                          className={styles.fullWidth}
                        >
                          <Option value="zone-123">
                            Zone 1, zone 2, zone 3
                          </Option>
                          <Option value="zone-1">Zone 1</Option>
                          <Option value="zone-2">Zone 2</Option>
                          <Option value="zone-3">Zone 3</Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Image</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select image"
                          value={formData.image || "windows-2025"}
                          selectedOptions={
                            formData.image ? [formData.image] : ["windows-2025"]
                          }
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              image: data.optionValue as string,
                            })
                          }
                          onFocus={() => setActiveField("image")}
                          className={styles.fullWidth}
                        >
                          <Option value="windows-2025">
                            🪟 Windows Server 2025 Datacenter: Azure Edition -
                            x64 Gen2
                          </Option>
                          <Option value="ubuntu">
                            Ubuntu Server 22.04 LTS
                          </Option>
                          <Option value="windows-2022">
                            Windows Server 2022 Datacenter
                          </Option>
                          <Option value="redhat">
                            Red Hat Enterprise Linux 9
                          </Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Size</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select VM size"
                          value={
                            copilotFilled
                              ? "standard-d4s-v3"
                              : "standard-d2s-v3"
                          }
                          selectedOptions={
                            copilotFilled
                              ? ["standard-d4s-v3"]
                              : ["standard-d2s-v3"]
                          }
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
                            Standard_B2s - 2 vcpus, 4 GiB memory ($30.37)
                          </Option>
                          <Option value="standard-d2s-v3">
                            Standard D2s_v3 - 2 vcpus, 8 GiB memory ($70.08)
                          </Option>
                          <Option value="standard-d4s-v3">
                            Standard D4s_v3 - 4 vcpus, 16 GiB memory ($140.16)
                          </Option>
                          <Option value="standard-e4s-v3">
                            Standard_E4s_v3 - 4 vcpus, 32 GiB memory ($200.25)
                          </Option>
                        </Dropdown>
                      </div>

                      {/* Disks Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
                      >
                        Disks
                      </Text>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>OS disk</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <div className={styles.flexBetweenCenter}>
                          <Text size={300}>
                            Premium SSD (LRS) • 127 GiB • Delete with VM
                          </Text>
                          <Text size={300} className={styles.textBrandLink}>
                            Edit
                          </Text>
                        </div>
                      </div>

                      <div className={styles.formField}>
                        <Label>Data disks</Label>
                        <div className={styles.flexBetweenCenter}>
                          <Text size={300} className={styles.textFg3}>
                            None
                          </Text>
                          <Text
                            size={300}
                            className={styles.textBrandUnderline}
                          >
                            Attach a disk
                          </Text>
                        </div>
                      </div>

                      {/* Networking Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
                      >
                        Networking
                      </Text>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Virtual network</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select a virtual network"
                          value={
                            copilotFilled
                              ? "zava-vm-1-vmss-vnet"
                              : formData.virtualNetwork
                          }
                          selectedOptions={
                            copilotFilled
                              ? ["zava-vm-1-vmss-vnet"]
                              : formData.virtualNetwork
                                ? [formData.virtualNetwork]
                                : []
                          }
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              virtualNetwork: data.optionValue as string,
                            })
                          }
                          className={styles.fullWidth}
                        >
                          <Option value="zava-vm-1-vmss-vnet">
                            (New) zava-vm-1-vmss-vnet
                          </Option>
                          <Option value="vnet-default">vnet-default</Option>
                          <Option value="create-new">Create new</Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Subnet</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select a subnet"
                          value={
                            copilotFilled ? "snet-eastus-vmss" : formData.subnet
                          }
                          selectedOptions={
                            copilotFilled
                              ? ["snet-eastus-vmss"]
                              : formData.subnet
                                ? [formData.subnet]
                                : []
                          }
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              subnet: data.optionValue as string,
                            })
                          }
                          className={styles.fullWidth}
                        >
                          <Option value="snet-eastus-vmss">
                            (New) snet-eastus-vmss
                          </Option>
                          <Option value="default">default (10.0.0.0/24)</Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Public IP address</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                        </div>
                        <Dropdown
                          placeholder="Select public IP"
                          value={formData.publicIP || "none"}
                          selectedOptions={
                            formData.publicIP ? [formData.publicIP] : ["none"]
                          }
                          onOptionSelect={(_, data) =>
                            setFormData({
                              ...formData,
                              publicIP: data.optionValue as string,
                            })
                          }
                          className={styles.fullWidth}
                        >
                          <Option value="none">None</Option>
                          <Option value="create-new">Create new</Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Select inbound port</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                        </div>
                        <Dropdown
                          placeholder="Select port"
                          value="rdp-3389"
                          selectedOptions={["rdp-3389"]}
                          onOptionSelect={() => {}}
                          className={styles.fullWidth}
                        >
                          <Option value="rdp-3389">RDP (3389)</Option>
                          <Option value="ssh-22">SSH (22)</Option>
                          <Option value="http-80">HTTP (80)</Option>
                          <Option value="https-443">HTTPS (443)</Option>
                        </Dropdown>
                      </div>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label>Load balancer</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                          {copilotFilled && <CopilotBadge />}
                        </div>
                        <Dropdown
                          placeholder="Select a load balancer"
                          value={
                            copilotFilled
                              ? "zava-vm-1-vmss-lb"
                              : formData.loadBalancingOptions
                          }
                          selectedOptions={
                            copilotFilled
                              ? ["zava-vm-1-vmss-lb"]
                              : formData.loadBalancingOptions
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
                          <Option value="zava-vm-1-vmss-lb">
                            (New) zava-vm-1-vmss-lb
                          </Option>
                          <Option value="none">None</Option>
                          <Option value="azure-load-balancer">
                            Azure Load Balancer
                          </Option>
                        </Dropdown>
                      </div>

                      {/* Administrator Account Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
                      >
                        Administrator account
                      </Text>

                      <div className={styles.formField}>
                        <div className={styles.flexCenterGap6}>
                          <Label required>Username</Label>
                          <Info20Regular className={styles.iconFg3Size16} />
                        </div>
                        <Input
                          placeholder=""
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                          className={styles.fullWidth}
                        />
                      </div>

                      <div className={styles.formField}>
                        <Label required>Password</Label>
                        <Input
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className={styles.fullWidth}
                        />
                      </div>

                      <div className={styles.formField}>
                        <Label required>Confirm password</Label>
                        <Input type="password" className={styles.fullWidth} />
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb8}
                      >
                        Autoscaling
                      </Text>
                      <Text size={300} className={styles.textFg2BlockMb24}>
                        Configure how your virtual machine scale set expands for
                        higher demand and scales back in when usage drops.
                      </Text>

                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textFg3BlockMt24Mb16}
                      >
                        Capacity settings
                      </Text>

                      <div className={styles.formField}>
                        <Label required>Scaling preference</Label>
                        <RadioGroup
                          value={formData.optimizationType}
                          onChange={(_, data) =>
                            setFormData({
                              ...formData,
                              optimizationType: data.value as string,
                            })
                          }
                          layout="horizontal"
                        >
                          <Radio value="cost" label="Balanced" />
                          <Radio
                            value="performance"
                            label="Performance-first"
                          />
                        </RadioGroup>
                      </div>

                      <div className={styles.formField}>
                        <Label required>Minimum instance count</Label>
                        <Input
                          value={formData.minInstanceCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              minInstanceCount: e.target.value,
                            })
                          }
                          className={styles.fullWidth}
                        />
                      </div>

                      <div className={styles.formField}>
                        <Label required>Maximum instance count</Label>
                        <Input
                          value={formData.maxInstanceCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxInstanceCount: e.target.value,
                            })
                          }
                          className={styles.fullWidth}
                        />
                      </div>

                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
                      >
                        CPU rules
                      </Text>

                      <div className={styles.formField}>
                        <Label required>Scale out above average CPU (%)</Label>
                        <Input
                          value={formData.scaleOutCpuThreshold}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scaleOutCpuThreshold: e.target.value,
                            })
                          }
                          className={styles.fullWidth}
                        />
                      </div>

                      <div className={styles.formField}>
                        <Label required>Scale in below average CPU (%)</Label>
                        <Input
                          value={formData.scaleInCpuThreshold}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scaleInCpuThreshold: e.target.value,
                            })
                          }
                          className={mergeClasses(
                            styles.fullWidth,
                            styles.reviewInfoBoxBrand,
                          )}
                        />
                      </div>

                      <div>
                        <Text
                          size={300}
                          weight="semibold"
                          className={styles.textBlockMb8}
                        >
                          Copilot recommendation
                        </Text>
                        <Text size={200} className={styles.textFg2Block}>
                          Start with 2 instances, scale out to 10 when CPU
                          exceeds 70%, and scale in below 30% to support
                          sustained traffic without overspending.
                        </Text>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb8}
                      >
                        Management
                      </Text>
                      <Text size={300} className={styles.textFg2BlockMb24}>
                        Configure identity, backup, and update management
                        settings.
                      </Text>

                      {/* Microsoft Defender for Cloud Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textFg3BlockMt24Mb16}
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
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Get advanced threat protection and security
                          recommendations for your VM
                        </Text>
                      </div>

                      {formData.enableDefenderForCloud && (
                        <div className={styles.reviewInfoBoxNeutral}>
                          <Text
                            size={300}
                            className={styles.textFg2FlexStartGap8}
                          >
                            <Shield20Regular
                              className={styles.flexShrink0Mt2}
                            />
                            <span>
                              Microsoft Defender for Cloud will provide
                              vulnerability assessments, security alerts, and
                              recommendations to help protect your virtual
                              machine.
                            </span>
                          </Text>
                        </div>
                      )}

                      {/* Identity Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
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
                              enableSystemAssignedIdentity:
                                data.checked === true,
                            })
                          }
                        />
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Allows your VM to authenticate to Azure services
                          without storing credentials
                        </Text>
                      </div>

                      {formData.enableSystemAssignedIdentity && (
                        <div className={styles.reviewInfoBoxBrand}>
                          <Text
                            size={300}
                            className={styles.textFg2Mb8FlexCenterGap8}
                          >
                            <Checkmark20Regular
                              className={styles.textPaletteGreenInline}
                            />
                            System assigned managed identity enabled
                          </Text>
                          <Text size={200} className={styles.textFg3Block}>
                            This VM can now access Azure resources using its
                            managed identity. Remember to assign appropriate
                            RBAC roles after deployment.
                          </Text>
                        </div>
                      )}

                      {/* Microsoft Entra ID Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
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
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Integrate with Microsoft Entra ID (formerly Azure AD)
                          for identity management
                        </Text>
                      </div>

                      {formData.enableEntraID && (
                        <div
                          className={mergeClasses(
                            styles.formField,
                            styles.ml28,
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
                            className={styles.textFg3BlockMt4Ml28}
                          >
                            Allow users to sign in using their Entra ID
                            credentials
                          </Text>
                        </div>
                      )}

                      {formData.enableEntraID && (
                        <div className={styles.reviewInfoBoxNeutral}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb8}
                          >
                            Entra ID Integration Benefits
                          </Text>
                          <ul className={styles.listStyle}>
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
                              <Text size={200}>
                                Conditional access policies
                              </Text>
                            </li>
                            <li>
                              <Text size={200}>
                                Audit logging and compliance
                              </Text>
                            </li>
                          </ul>
                        </div>
                      )}

                      {/* Guest OS Updates Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
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
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Automatically check for available OS and software
                          updates every 24 hours
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
                              patchOrchestrationOptions:
                                data.optionValue as string,
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
                        <Text size={200} className={styles.textFg3BlockMt4}>
                          Control how OS patches are applied to your VM
                        </Text>
                      </div>

                      {formData.patchOrchestrationOptions ===
                        "azure-orchestrated" && (
                        <div className={styles.reviewInfoBoxNeutral}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb8}
                          >
                            Azure-orchestrated Patching
                          </Text>
                          <Text size={200} className={styles.textFg3BlockMb8}>
                            Azure will automatically download and install
                            patches during off-peak hours based on your VM's
                            availability requirements.
                          </Text>
                          <Text
                            size={200}
                            className={mergeClasses(
                              styles.textFg3,
                              styles.reviewListStyled,
                            )}
                          >
                            Features include:
                          </Text>
                          <ul>
                            <li>
                              <Text size={200}>
                                Automatic patch classification
                              </Text>
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
                        <div className={styles.reviewInfoBoxYellow}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb8}
                          >
                            ⚠️ Manual Updates Selected
                          </Text>
                          <Text size={200} className={styles.textFg2Block}>
                            You will be responsible for applying OS patches and
                            updates. Ensure you have a patching strategy in
                            place to maintain security compliance.
                          </Text>
                        </div>
                      )}
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb8}
                      >
                        Health
                      </Text>
                      <Text size={300} className={styles.textFg2BlockMb24}>
                        Set up alerts, diagnostics, health monitoring, and
                        insights for your VM.
                      </Text>

                      {/* Alerts Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textFg3BlockMt24Mb16}
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
                              enableRecommendedAlertRules:
                                data.checked === true,
                            })
                          }
                        />
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Get notified about important VM health and performance
                          issues
                        </Text>
                      </div>

                      {formData.enableRecommendedAlertRules && (
                        <div className={styles.reviewInfoBoxNeutral}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb12}
                          >
                            Recommended Alert Rules
                          </Text>
                          <div className={styles.flexColGap8}>
                            <div className={styles.flexCenterGap8}>
                              <div className={styles.brandDot} />
                              <Text size={200}>
                                CPU usage exceeds 80% for more than 5 minutes
                              </Text>
                            </div>
                            <div className={styles.flexCenterGap8}>
                              <div className={styles.brandDot} />
                              <Text size={200}>
                                Memory usage exceeds 90% for more than 5 minutes
                              </Text>
                            </div>
                            <div className={styles.flexCenterGap8}>
                              <div className={styles.brandDot} />
                              <Text size={200}>
                                Available disk space is less than 10%
                              </Text>
                            </div>
                            <div className={styles.flexCenterGap8}>
                              <div className={styles.brandDot} />
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
                        className={styles.textBlockMb16Mt32}
                      >
                        Diagnostics
                      </Text>

                      <div className={styles.formField}>
                        <Label required>Boot diagnostics</Label>
                        <Dropdown
                          placeholder="Select boot diagnostics option"
                          value={formData.bootDiagnostics}
                          selectedOptions={
                            formData.bootDiagnostics
                              ? [formData.bootDiagnostics]
                              : []
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
                        <Text size={200} className={styles.textFg3BlockMt4}>
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
                            <Option value="diagstorage001">
                              diagstorage001
                            </Option>
                            <Option value="diagstorage002">
                              diagstorage002
                            </Option>
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
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Collect guest OS metrics like CPU, memory, disk, and
                          network
                        </Text>
                      </div>

                      {formData.enableOSGuestDiagnostics && (
                        <div className={styles.reviewInfoBoxNeutralMl28}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb8}
                          >
                            Guest Diagnostics Metrics
                          </Text>
                          <Text
                            size={200}
                            className={mergeClasses(
                              styles.textFg3BlockMb8,
                              styles.grid2ColGap8,
                            )}
                          >
                            The following metrics will be collected:
                          </Text>
                          <div>
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
                        className={styles.textBlockMb16Mt32}
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
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Monitor application health status and availability
                        </Text>
                      </div>

                      {formData.enableApplicationHealthMonitoring && (
                        <div className={styles.reviewInfoBoxBrand}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb8}
                          >
                            Application Health Extension
                          </Text>
                          <Text size={200} className={styles.textFg2BlockMb12}>
                            The Application Health extension will monitor your
                            application by:
                          </Text>
                          <ul className={styles.listStyle}>
                            <li>
                              <Text size={200}>
                                Probing HTTP/HTTPS endpoints to verify
                                application availability
                              </Text>
                            </li>
                            <li>
                              <Text size={200}>
                                Reporting health status to Azure platform
                              </Text>
                            </li>
                            <li>
                              <Text size={200}>
                                Enabling automatic recovery actions when
                                unhealthy
                              </Text>
                            </li>
                          </ul>
                        </div>
                      )}

                      {/* Insights Section */}
                      <Text
                        size={400}
                        weight="semibold"
                        className={styles.textBlockMb16Mt32}
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
                        <Text size={200} className={styles.textFg3BlockMt4Ml28}>
                          Get detailed performance monitoring and visualization
                          with Azure Monitor
                        </Text>
                      </div>

                      {formData.enableVMInsights && (
                        <div className={styles.reviewInfoBoxNeutral}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb8}
                          >
                            VM Insights Features
                          </Text>
                          <Text size={200} className={styles.textFg3BlockMb12}>
                            VM Insights provides comprehensive monitoring
                            including:
                          </Text>
                          <div className={styles.flexColGap8}>
                            <div className={styles.cardStyle}>
                              <Text
                                size={200}
                                weight="semibold"
                                className={styles.flexCenterGap8Mb4}
                              >
                                <ChartMultiple20Regular />
                                Performance Charts
                              </Text>
                              <Text size={200} className={styles.textFg3}>
                                Visualize CPU, memory, disk, and network trends
                                over time
                              </Text>
                            </div>
                            <div className={styles.cardStyle}>
                              <Text
                                size={200}
                                weight="semibold"
                                className={styles.flexCenterGap8Mb4}
                              >
                                <Map20Regular />
                                Dependency Mapping
                              </Text>
                              <Text size={200} className={styles.textFg3}>
                                Discover application dependencies and network
                                connections
                              </Text>
                            </div>
                            <div className={styles.cardStyle}>
                              <Text
                                size={200}
                                weight="semibold"
                                className={styles.flexCenterGap8Mb4}
                              >
                                <ChartMultiple20Regular />
                                Workbooks
                              </Text>
                              <Text size={200} className={styles.textFg3}>
                                Pre-built and custom workbooks for detailed
                                analysis
                              </Text>
                            </div>
                          </div>
                          <Text size={200} className={styles.textFg3BlockMt12}>
                            Note: VM Insights requires Log Analytics workspace
                            and installs monitoring agents on your VM.
                          </Text>
                        </div>
                      )}
                    </>
                  )}

                  {currentStep === 5 && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb8}
                      >
                        Advanced
                      </Text>
                      <Text size={300} className={styles.textFg2BlockMb24}>
                        Configure advanced settings for your virtual machine
                        including extensions, custom data, and proximity
                        placement groups.
                      </Text>

                      <div className={styles.formField}>
                        <Checkbox
                          label="Enable custom script extension"
                          checked={false}
                          onChange={() => {}}
                        />
                      </div>

                      <div className={styles.formField}>
                        <Checkbox
                          label="Enable proximity placement group"
                          checked={false}
                          onChange={() => {}}
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 6 && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb8}
                      >
                        Tags
                      </Text>
                      <Text size={300} className={styles.textFg2BlockMb24}>
                        Tags are name/value pairs that enable you to categorize
                        resources and view consolidated billing.
                      </Text>

                      <div
                        className={mergeClasses(
                          styles.formField,
                          styles.textFg3BlockMb12,
                        )}
                      >
                        <Label>Resource tags</Label>
                        <Text size={200}>
                          Apply tags to organize your resources and track costs.
                          You can add up to 50 tags.
                        </Text>

                        <div className={styles.flexGap12Mb12End}>
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
                          <Button
                            appearance="secondary"
                            icon={<Add20Regular />}
                          >
                            Add
                          </Button>
                        </div>

                        <div className={styles.borderedBoxMt16}>
                          <Text
                            size={300}
                            weight="semibold"
                            className={styles.textBlockMb12}
                          >
                            Current tags (0)
                          </Text>
                          <Text size={200} className={styles.textFg3Italic}>
                            No tags have been added yet
                          </Text>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 7 && (
                    <>
                      <Text
                        size={500}
                        weight="semibold"
                        className={styles.textBlockMb24}
                      >
                        Review
                      </Text>

                      {/* Configuration Summary */}
                      <div className={styles.reviewSectionCard}>
                        <div className={styles.flexBetweenMb20}>
                          <Text size={400} weight="semibold">
                            Configuration
                          </Text>
                          <Button
                            appearance="transparent"
                            icon={
                              <Edit20Regular className={styles.textBrand} />
                            }
                            onClick={() => {
                              setCurrentStep(1);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            title="Edit configuration"
                            className={styles.compactButton}
                          />
                        </div>

                        <div className={styles.grid2ColGap16x32}>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Subscription
                            </Text>
                            <Text size={300}>{effectiveSubscription}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Resource group
                            </Text>
                            <Text size={300}>{effectiveResourceGroup}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              VM scale set name
                            </Text>
                            <Text size={300}>{effectiveVmssName}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Region
                            </Text>
                            <Text size={300}>{effectiveRegionLabel}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Availability zone
                            </Text>
                            <Text size={300}>{effectiveAvailabilityZone}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Image
                            </Text>
                            <Text size={300}>{effectiveImageLabel}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Size
                            </Text>
                            <Text size={300}>{effectiveSizeLabel}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Virtual network
                            </Text>
                            <Text size={300}>{effectiveVirtualNetwork}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Subnet
                            </Text>
                            <Text size={300}>{effectiveSubnet}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Load balancer
                            </Text>
                            <Text size={300}>{effectiveLoadBalancer}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Autoscaling
                            </Text>
                            <Text size={300}>{effectiveScaleProfile}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Scaling rule
                            </Text>
                            <Text size={300}>{effectiveScaleRules}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Admin access
                            </Text>
                            <Text size={300}>{effectiveAdminAccess}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              Admin username
                            </Text>
                            <Text size={300}>{effectiveAdminUser}</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              VM architecture
                            </Text>
                            <Text size={300}>
                              {formData.vmArchitecture === "arm64"
                                ? "Arm64"
                                : "x64 (Intel/AMD)"}
                            </Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.textFg3BlockMb4}>
                              OS disk
                            </Text>
                            <Text
                              size={300}
                            >{`${effectiveOsDiskType} • ${effectiveOsDiskSize}`}</Text>
                          </div>
                        </div>
                      </div>

                      {/* Topology View */}
                      <div className={styles.reviewSectionCard}>
                        <Text
                          size={400}
                          weight="semibold"
                          className={styles.textBlockMb20}
                        >
                          Topology
                        </Text>

                        {/* Topology Diagram */}
                        <div className={styles.topologyCenterCol}>
                          {/* Region/Subscription Level */}
                          <div className={styles.topologyVnetBox}>
                            <Text size={200} className={styles.textFg3BlockMb8}>
                              {`${effectiveRegionLabel} Region • ${effectiveSubscription} • ${effectiveResourceGroup}`}
                            </Text>

                            {/* Virtual Network */}
                            <div className={styles.topologyInfoBoxBrand}>
                              <div className={styles.topologyInfoRow}>
                                <div className={styles.topologyIconBrand}>
                                  <Globe20Regular
                                    className={styles.colorBrandFg1}
                                  />
                                </div>
                                <Text size={300} weight="semibold">
                                  {effectiveVirtualNetwork}
                                </Text>
                              </div>

                              {/* Subnet */}
                              <div className={styles.topologyResourceCard}>
                                <Text
                                  size={200}
                                  className={styles.textFg3BlockMb8}
                                >
                                  {effectiveSubnet}
                                </Text>

                                {/* VMSS */}
                                <div className={styles.topologyHighlightCard}>
                                  <div className={styles.topologyIconBox}>
                                    <img
                                      src="/icons/VM-Scale-Sets.svg"
                                      alt="VM scale set"
                                      className={styles.size24x24}
                                    />
                                  </div>
                                  <div
                                    className={mergeClasses(
                                      styles.flex1,
                                      styles.textBlockMb4,
                                    )}
                                  >
                                    <Text size={300} weight="semibold">
                                      {effectiveVmssName}
                                    </Text>
                                    <Text
                                      size={200}
                                      className={styles.textFg3Block}
                                    >
                                      {`${effectiveSizeShort} • ${effectiveScaleProfile}`}
                                    </Text>
                                  </div>
                                </div>

                                {/* Disk attached to VM */}
                                <div className={styles.topologyNoteBox}>
                                  <div
                                    className={mergeClasses(
                                      styles.iconContainer32,
                                      styles.colorBrandFg1,
                                    )}
                                  >
                                    <Save20Filled />
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
                                      className={styles.textFg3Block}
                                    >
                                      {effectiveOsDiskType}
                                      {" - "}
                                      {effectiveOsDiskSize}
                                    </Text>
                                  </div>
                                </div>

                                {/* NIC attached to VM */}
                                <div className={styles.topologyNoteBox}>
                                  <div
                                    className={mergeClasses(
                                      styles.iconContainer32,
                                      styles.colorBrandFg1,
                                    )}
                                  >
                                    <Connector20Regular />
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
                                      className={styles.textFg3Block}
                                    >
                                      {effectiveLoadBalancer !== "None"
                                        ? `Connected to ${effectiveLoadBalancer}`
                                        : "Private IP: 10.0.0.4"}
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* NSG */}
                            <div className={styles.topologyNoteBoxAlt}>
                              <div
                                className={mergeClasses(
                                  styles.iconContainer32,
                                  styles.colorBrandFg1,
                                )}
                              >
                                <Shield20Regular />
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
                                  className={styles.textFg3Block}
                                >
                                  Firewall rules
                                </Text>
                                <Text
                                  size={200}
                                  className={styles.textFg3Block}
                                >
                                  RDP (3389) inbound enabled
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className={styles.topologyFooterRow}>
                    {currentStep === 1 && (
                      <Button
                        appearance="secondary"
                        onClick={() => {
                          setCurrentStep(2);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Next: Autoscaling
                      </Button>
                    )}
                    {currentStep > 1 && currentStep < 7 && (
                      <>
                        <Button
                          appearance="secondary"
                          onClick={() => {
                            setCurrentStep(currentStep - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          appearance="secondary"
                          onClick={() => {
                            setCurrentStep(currentStep + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Next
                        </Button>
                      </>
                    )}
                    {currentStep !== 7 && (
                      <Button
                        appearance="secondary"
                        onClick={() => {
                          setCurrentStep(7);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Skip to review
                      </Button>
                    )}
                    {currentStep === 7 && (
                      <>
                        <Button
                          appearance="secondary"
                          onClick={() => {
                            setCurrentStep(currentStep - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          appearance="primary"
                          onClick={handleCreate}
                          disabled={isDeploying}
                        >
                          {isDeploying ? "Deploying..." : "Deploy"}
                        </Button>
                      </>
                    )}
                    <div className={styles.mlAuto}>
                      <Button
                        appearance="transparent"
                        icon={<Save20Regular />}
                        className={styles.textFg2}
                      >
                        Save draft
                      </Button>
                    </div>
                  </div>
                </div>
          </WizardLayout>
        </div>
      </CopilotProvider>
    </FluentProvider>
  );
};

export default CreateVMWizard;
