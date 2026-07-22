/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  Input,
  Label,
  Spinner,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  Send24Regular,
  Send16Regular,
  Sparkle20Regular,
  PanelLeft24Regular,
  Add24Regular,
  Document24Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  ArrowLeft24Regular,
  Settings20Regular,
  ChevronDown20Regular,
  ChevronUp20Regular,
  ChevronRight20Regular,
  Checkmark20Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { AzureHeaderP1 } from "./azure-header-p1";
import DeploymentPlan from "../projects/vnext-agent/deployment-plan";
import { DeploymentPlanCard } from "./deployment-plan-card";
import { DeploymentProgressCard } from "./deployment-progress-card";
import { WorkloadRecommendationCard } from "./workload-recommendation-card";
import { DeploymentCompleteResourceCard } from "./deployment-complete-resource-card";
import { DeploymentCompleteCard } from "./deployment-complete-card";
import { IncidentInvestigationCard } from "./incident-investigation-card";
import { ResolutionPlanCard } from "./resolution-plan-card";
import ResolutionReportCard from "./resolution-report-card";
import AgentWelcome from "./agent-welcome";

const useStyles = makeStyles({
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes fadeInCards": {
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  cardFadeIn: {
    animationName: "fadeInCards",
    animationDuration: "0.5s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  container: {
    position: "fixed",
    top: "48px",
    left: 0,
    right: 0,
    bottom: "80px", // Leave space for footer dock (matches pb-20 = 5rem = 80px)
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 50, // Lower than footer's z-[100] (100)
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    height: "100%",
  },
  sidebar: {
    width: "260px",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexShrink: 0,
    padding: "12px 8px",
    transition: "width 0.3s ease, padding 0.3s ease",
    overflow: "hidden",
    height: "100%",
    position: "sticky",
    top: 0,
  },
  sidebarCollapsed: {
    width: "56px",
    padding: "12px 4px",
    backgroundColor: "transparent",
    borderRight: "none",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    width: "100%",
  },
  sidebarHeaderCollapsed: {
    justifyContent: "center",
    padding: "8px 0",
  },
  sidebarHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  copilotLogo: {
    width: "24px",
    height: "24px",
  },
  sidebarTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "4px",
  },
  navItem: {
    display: "flex",
    padding: "12px 16px",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "12px",
    border: `1px solid transparent`,
    background: "transparent",
    cursor: "pointer",
    position: "relative",
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    width: "100%",
    textAlign: "left",
    minHeight: "44px",
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground4Selected,
    border: `1px solid ${tokens.colorNeutralStrokeAlpha}`,
  },
  navItemIndicator: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "3px",
    height: "20px",
    backgroundColor: tokens.colorBrandForeground1,
    borderRadius: "999px",
  },
  navIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },
  collapseIcon: {
    width: "20px",
    height: "20px",
  },
  divider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "12px 0",
    marginBottom: "-38px",
  },
  agentsSubheader: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    padding: "8px 16px",
  },
  conversationsSection: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
  },
  conversationsSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    borderRadius: "4px",
  },
  conversationsSectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  conversationsContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: "4px",
  },
  navLink: {
    display: "flex",
    padding: "12px 16px",
    alignItems: "center",
    gap: "8px",
    borderRadius: "4px",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    width: "100%",
    textAlign: "left",
    border: "none",
    minHeight: "44px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  conversationItem: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground4,
    transition: "background-color 0.2s",
    marginBottom: "8px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground4Hover,
    },
  },
  allConversationsLink: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    borderRadius: "4px",
  },
  conversationPanel: {
    padding: "24px",
    paddingTop: "0px",
    maxWidth: "888px",
    margin: "0 auto",
    width: "100%",
  },
  userMessage: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "24px",
    padding: "12px 16px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "80%",
    marginLeft: "auto",
    alignSelf: "flex-end",
    width: "fit-content",
  },
  copilotResponse: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    maxWidth: "100%",
  },
  copilotAvatar: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
  },
  responseContent: {
    flex: 1,
  },
  responseHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  copilotLabel: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  aiDisclaimer: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  responseTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "block",
  },
  responseDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginBottom: "12px",
    display: "block",
  },
  bulletList: {
    paddingLeft: "20px",
    marginBottom: "12px",
  },
  bulletItem: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
    marginBottom: "4px",
  },
  costWarning: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
    display: "block",
  },
  sectionSubheader: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: "16px",
    marginBottom: "8px",
    display: "block",
  },
  readmeLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "16px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap",
    "& button": {
      whiteSpace: "nowrap",
    },
  },
  blinkingCursor: {
    display: "inline-block",
    width: "8px",
    height: "16px",
    backgroundColor: tokens.colorNeutralStroke2,
    animationName: {
      "0%, 49%": {
        opacity: 1,
      },
      "50%, 100%": {
        opacity: 0,
      },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  feedbackSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
    marginBottom: "24px",
  },
  feedbackButtons: {
    display: "flex",
    gap: "4px",
  },
  criteriaButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
  },
  lastReadDivider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "40px 0",
    width: "100%",
  },
  lastReadLine: {
    flex: 1,
    height: "1px",
    backgroundColor: tokens.colorBrandForeground1,
  },
  lastReadText: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  codePanel: {
    width: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "width 0.3s ease-in-out",
    flexShrink: 0,
    height: "100%",
  },
  codePanelOpen: {
    width: "40%",
    minWidth: "40%",
  },
  codePanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  codePanelTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  codePanelContent: {
    flex: 1,
    overflow: "auto",
    padding: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: "13px",
    lineHeight: "1.6",
    color: tokens.colorNeutralForeground1,
  },
  codeBlock: {
    whiteSpace: "pre",
    margin: 0,
    padding: "16px",
    counterReset: "line",
  },
  codeLine: {
    display: "block",
    paddingLeft: "60px",
    position: "relative",
  },
  lineNumber: {
    position: "absolute",
    left: "0",
    width: "50px",
    textAlign: "right",
    paddingRight: "10px",
    color: tokens.colorNeutralForeground3,
    userSelect: "none",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden",
    height: "100%",
    position: "relative",
    boxShadow: tokens.shadow4,
    borderRadius: "12px",
    margin: "12px",
  },
  header: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "64px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  headerButton: {
    minWidth: "32px",
    height: "32px",
  },
  newChatButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
  },
  chatArea: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    flex: 1,
    overflow: "auto",
    padding: "24px",
    paddingTop: "24px",
    paddingBottom: "0",
    minHeight: 0,
    position: "relative",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    paddingBottom: "100px", // Add white space below deploy buttons
  },
  welcomeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px 20px 40px",
    gap: "24px",
    flex: 1,
  },
  welcomeTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    maxWidth: "700px",
    lineHeight: "1.4",
  },
  inputSection: {
    position: "sticky",
    bottom: "80px", // Moved up 80px from bottom
    left: "0",
    right: "0",
    padding: "0 24px 20px 24px",
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 100,
    pointerEvents: "none",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "32px",
    maxWidth: "784px",
    width: "100%",
    margin: "0 auto",
    pointerEvents: "auto",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  inputActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  addButton: {
    minWidth: "32px",
    height: "32px",
  },
  agentButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  agentButtonIcon: {
    width: "20px",
    height: "20px",
  },
  sendButton: {
    minWidth: "32px",
    height: "32px",
  },
  suggestionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    marginTop: "32px",
    maxWidth: "1000px",
    width: "100%",
  },
  suggestionCard: {
    padding: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    textAlign: "left",
    lineHeight: "1.5",
    transition: "all 0.2s",
  },
  seeMore: {
    textAlign: "center",
    marginTop: "24px",
  },
  seeMoreLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
  },
  containerHeight: {
    height: "calc(100vh - 48px)",
  },
  fixedHeaderOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  fadeInAnim: {
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
  },
  cardMt: {
    marginTop: tokens.spacingVerticalXXL,
  },
  serviceCard: {
    padding: "20px",
    marginBottom: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    cursor: "pointer",
  },
  serviceCardRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  serviceIcon: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
  },
  serviceFlex1: {
    flex: 1,
  },
  serviceNameRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  serviceTitle: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightRegular,
    display: "block",
  },
  serviceBadge: {
    fontSize: "11px",
    padding: "2px 8px",
    backgroundColor: tokens.colorBrandBackground2,
    // eslint-disable-next-line no-restricted-syntax
    color: "#0078D4",
    borderRadius: "12px",
    fontWeight: 500,
  },
  serviceDesc: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  serviceExpandedContent: {
    marginTop: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  serviceExpandedDesc: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  featuresList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM,
  },
  featureRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  featureCheckIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
    marginTop: "2px",
  },
  featureXIcon: {
    color: tokens.colorPaletteRedForeground1,
    flexShrink: 0,
    marginTop: "2px",
  },
  featureText: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  actionBtnRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
  pillButton: {
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap" as const,
    width: "fit-content",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    fontFamily: tokens.fontFamilyBase,
  },
  costWarningMt: {
    marginTop: tokens.spacingVerticalL,
  },
  actionIconStyle: {
    width: "20px",
    height: "20px",
    marginRight: "6px",
  },
  textMb16: {
    marginBottom: tokens.spacingVerticalL,
  },
  textMb16PreWrap: {
    marginBottom: tokens.spacingVerticalL,
    whiteSpace: "pre-line" as const,
  },
  projectCardContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: "0",
    marginTop: tokens.spacingVerticalL,
    overflow: "hidden",
  },
  projectCardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    padding: tokens.spacingHorizontalXXL,
    paddingBottom: "0",
    margin: "0",
  },
  projectCardDivider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    width: "100%",
    margin: `${tokens.spacingVerticalL} 0 0 0`,
  },
  projectCardBody: {
    padding: tokens.spacingHorizontalXXL,
  },
  projectCardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
    marginBottom: tokens.spacingVerticalXXL,
  },
  projectCardLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  requiredAsterisk: {
    color: tokens.colorPaletteRedForeground1,
  },
  projectCardInput: {
    width: "100%",
    marginBottom: tokens.spacingVerticalXXL,
  },
  advancedOptionsBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    marginBottom: tokens.spacingVerticalXXL,
  },
  advancedOptionsHeader: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  advancedOptionsText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  projectCardActions: {
    display: "flex",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: "0",
  },
  spinnerRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  cloudShellPanel: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#1e1e1e",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column" as const,
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
    flexShrink: 0,
    height: "100%",
  },
  cloudShellHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: tokens.colorNeutralForeground1,
    borderBottom: "1px solid #3e3e3e",
    minHeight: "48px",
    flexShrink: 0,
  },
  cloudShellTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralBackground1,
  },
  cloudShellCloseIcon: {
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralBackground1,
  },
  cloudShellContent: {
    flex: 1,
    overflow: "auto",
    padding: tokens.spacingHorizontalL,
  },
  terminalFont: {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: tokens.fontSizeBase300,
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralStroke1,
  },
  termLine: { marginBottom: tokens.spacingVerticalS },
  termLineSpaced: { marginBottom: tokens.spacingVerticalL },
  termLineIndented: {
    marginBottom: tokens.spacingVerticalS,
    paddingLeft: "20px",
  },
  termLineIndentedSpaced: {
    marginBottom: tokens.spacingVerticalL,
    paddingLeft: "20px",
  },
  termCursorLine: { marginBottom: "4px" },
  // eslint-disable-next-line no-restricted-syntax
  termPromptUser: { color: "#4EC9B0" },
  // eslint-disable-next-line no-restricted-syntax
  termSeparator: { color: tokens.colorNeutralStroke1 },
  // eslint-disable-next-line no-restricted-syntax
  termPath: { color: "#569CD6" },
  // eslint-disable-next-line no-restricted-syntax
  termCommand: { color: "#CE9178" },
  // eslint-disable-next-line no-restricted-syntax
  termComment: { marginBottom: tokens.spacingVerticalS, color: "#6A9955" },
  // eslint-disable-next-line no-restricted-syntax
  termCommentSpaced: {
    marginBottom: tokens.spacingVerticalL,
    color: "#6A9955",
  },
  // Dark mode icon filter
  iconDark: { filter: "invert(1) brightness(1.2)" },
  // Fixed-size icon helpers
  iconSm: { width: "20px", height: "20px" },
  iconXs: { width: "16px", height: "16px" },
  // Chevron rotation
  chevronCollapsed: {
    transform: "rotate(-90deg)",
    transition: "transform 0.2s ease",
  },
  chevronExpanded: {
    transform: "rotate(0deg)",
    transition: "transform 0.2s ease",
  },
  // Animation wrapper: fade-in card (opacity 0 → 1)
  fadeInCard: {
    marginTop: "24px",
    opacity: 0,
    animationName: "cardFadeIn",
    animationDuration: "0.5s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  fadeInCardImmediate: {
    opacity: 1,
    animationName: "fadeInCards",
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
  },
  // Service card animation delays
  serviceCardDelay0: { animationDelay: "0s", opacity: 0 },
  serviceCardDelay1: { animationDelay: "0.15s", opacity: 0 },
  serviceCardDelay2: { animationDelay: "0.3s", opacity: 0 },
  // Misc
  mb8: { marginBottom: "8px" },
  cursorPointer: { cursor: "pointer" },
  // Cloud shell panel open width
  cloudShellPanelOpen: { width: "500px" },
  cloudShellPanelClosed: { width: "0" },
  feedbackFadeIn: {
    opacity: 0,
    animationName: "cardFadeIn",
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
});

interface AgentImmersiveProps {
  onClose?: () => void;
  initialPrompt?: string;
  initialMessage?: string;
  viewMode?: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2";
  onViewModeChange?: (
    mode: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2",
  ) => void;
  vmScenario?: 1 | 2;
  onVmScenarioChange?: (scenario: 1 | 2) => void;
  buildScenario?: 1 | 2 | 3; // 1 = Deploy first service, 2 = Infrastructure agent, 3 = Incident review
  isDarkMode?: boolean;
  useTopNav?: boolean;
  customHeader?: React.ReactNode | null;
  onNavigate?: (page: string) => void;
}

/** VNext full-screen immersive agent with sidebar nav, multi-scenario chat (deploy, incident, infrastructure), and deployment flow cards.
 * Composed from: makeStyles shell, sidebar with conversations, deployment/incident/resolution cards.
 * Instead of: rebuilding the full agent experience for each new scenario or build iteration. */
const AgentImmersive: React.FC<AgentImmersiveProps> = ({
  onClose,
  initialPrompt,
  initialMessage,
  viewMode = "list",
  onViewModeChange,
  vmScenario = 1,
  onVmScenarioChange,
  buildScenario = 1,
  isDarkMode = false,
  useTopNav = true,
  customHeader,
  onNavigate,
}) => {
  const styles = useStyles();
  const [activeSection, setActiveSection] = useState<
    "chat" | "researcher" | "analyst" | "infrastructure"
  >("infrastructure");
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isConversationsCollapsed, setIsConversationsCollapsed] =
    useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [showCloudShell, setShowCloudShell] = useState(false);
  const [showCopilotResponse, setShowCopilotResponse] = useState(false);
  const [showProjectCard, setShowProjectCard] = useState(false);
  const [projectName, setProjectName] = useState("MyDemo-Project");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null); // All cards closed initially
  const [showDeploymentPlan, setShowDeploymentPlan] = useState(false);
  const [deploymentTypedText, setDeploymentTypedText] = useState("");
  const [isDeploymentTypingComplete, setIsDeploymentTypingComplete] =
    useState(false);
  const [showDeploymentPlanCard, setShowDeploymentPlanCard] = useState(false);
  const [showDeploymentPlanFeedback, setShowDeploymentPlanFeedback] =
    useState(false);
  const [showDeploymentProgress, setShowDeploymentProgress] = useState(false);
  const [deploymentProgressTypedText, setDeploymentProgressTypedText] =
    useState("");
  const [
    isDeploymentProgressTypingComplete,
    setIsDeploymentProgressTypingComplete,
  ] = useState(false);
  const [showDeploymentProgressCard, setShowDeploymentProgressCard] =
    useState(false);
  const [showDeploymentProgressFeedback, setShowDeploymentProgressFeedback] =
    useState(false);

  // Agent Welcome (Scenario 4)
  const [showAgentWelcome, setShowAgentWelcome] = useState(false);

  // Resolution Plan states (Scenario 3)
  const [showResolutionPlan, setShowResolutionPlan] = useState(false);
  const [resolutionPlanTypedText, setResolutionPlanTypedText] = useState("");
  const [isResolutionPlanTypingComplete, setIsResolutionPlanTypingComplete] =
    useState(false);
  const [showResolutionPlanCard, setShowResolutionPlanCard] = useState(false);
  const [showResolutionPlanFeedback, setShowResolutionPlanFeedback] =
    useState(false);

  // Resolution Progress states (Scenario 3)
  const [showResolutionProgress, setShowResolutionProgress] = useState(false);
  const [resolutionProgressTypedText, setResolutionProgressTypedText] =
    useState("");
  const [
    isResolutionProgressTypingComplete,
    setIsResolutionProgressTypingComplete,
  ] = useState(false);
  const [showResolutionProgressCard, setShowResolutionProgressCard] =
    useState(false);
  const [showResolutionProgressFeedback, setShowResolutionProgressFeedback] =
    useState(false);

  // Resolution Complete states (Scenario 3)
  const [showResolutionComplete, setShowResolutionComplete] = useState(false);
  const [showResolutionLastReadDivider, setShowResolutionLastReadDivider] =
    useState(false);
  const [resolutionCompleteTypedText, setResolutionCompleteTypedText] =
    useState("");
  const [
    isResolutionCompleteTypingComplete,
    setIsResolutionCompleteTypingComplete,
  ] = useState(false);
  const [showResolutionCompleteCard, setShowResolutionCompleteCard] =
    useState(false);
  const [showResolutionCompleteFeedback, setShowResolutionCompleteFeedback] =
    useState(false);

  // Deployment Complete states
  const [showDeploymentComplete, setShowDeploymentComplete] = useState(false);
  const [showLastReadDivider, setShowLastReadDivider] = useState(false);
  const [deploymentCompleteTypedText, setDeploymentCompleteTypedText] =
    useState("");
  const [
    isDeploymentCompleteTypingComplete,
    setIsDeploymentCompleteTypingComplete,
  ] = useState(false);
  const [showDeploymentCompleteCard, setShowDeploymentCompleteCard] =
    useState(false);
  const [showDeploymentCompleteFeedback, setShowDeploymentCompleteFeedback] =
    useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Get the conversation title based on scenario
  const conversationTitle =
    buildScenario === 3
      ? "Resolve Sev1 alert on BackendVM4"
      : buildScenario === 2
        ? "Deploy an industry-standard containerized web app"
        : initialPrompt || "Building an AI chat app for a startup";

  // Truncate conversation title for sidebar (22 chars + ...)
  const truncatedTitle =
    conversationTitle.length > 22
      ? conversationTitle.substring(0, 22) + "..."
      : conversationTitle;

  const fullText =
    buildScenario === 3
      ? "A Sev1 alert was triggered for BackendVM4 in the West US (Seattle) region at 2025-10-20T09:42:15Z due to a critical service disruption. The VM Operator agent has completed its investigation and identified the root cause. Here's a summary of the findings:"
      : buildScenario === 2
        ? "Awesome—let's get your containerized web app into production with a setup that's secure, observable, and easy to operate. Here's a starter bundle of services I recommend based on Microsoft Learn documentation as well as features, popularity, and other criteria.\n\nWould you like me to create a deployment plan for this workload? I'll also create a downloadable zip with everything wired for AKS + ACR."
        : "Here are a few services that I'd recommend for your startup, keeping costs low, setup easy, and ensuring scalability for future growth.";
  const deploymentText =
    buildScenario === 2
      ? "Here's the deployment plan for your containerized app. If the plan looks good, I'll begin implementation—including setup, config, and rollout—and provide updates as I work."
      : "I can definitely help you with deploying your first Container App service. Here's the deployment plan. Feel free to request any modifications, or I'll get started on your new deployment right away.";
  const deploymentProgressText =
    buildScenario === 2
      ? "I'm setting up your deployment now. I'll keep you updated on key progress or if I need your input. This process may take a few minutes, so feel free to step away and return later."
      : "Great, I'll work on deploying your first service with Container Apps! This may take a few minutes, I'll notify you when it's complete or if I need your input. You can always find information related to anything I'm working on in the Activity page.";

  const deploymentCompleteText =
    buildScenario === 1
      ? "Your first resource is deployed, active, and healthy! You can dive into the details by opening it in the Azure Portal, or I can continue to help you with any other tasks you may have."
      : "The deployment of your containerized web app is complete. You can view more details about all the created resources below. Some optional next steps include setting up monitoring and alerts, reviewing scaling rules, and scheduling an architecture walkthrough. Would you like me to create a health check report or an architecture diagram?";

  const resolutionPlanText =
    "Here's a plan to resolve the Sev1 alert on BackendVM4.";

  const resolutionProgressText =
    "Great, we'll work on resolving the Sev1 alert on BackendVM4! This may take a while, I'll notify you when it's complete or if I need your input. You can always find information related to anything I'm working on in the Activity page.";

  const resolutionCompleteText =
    "Connectivity to BackendVM4 has been successfully restored! We'll continue monitoring it to ensure the fix remains effective.";

  // Scroll to bottom when component loads and show copilot response after delay
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }

    // Show copilot response after 800ms delay
    setTimeout(() => {
      setShowCopilotResponse(true);
      // Scroll to bottom again after response appears
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 800);
  }, []);

  // Typewriter effect for the recommendation text
  useEffect(() => {
    if (!showCopilotResponse || !useTopNav) return;

    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
        // Auto-scroll as text appears
        if (chatAreaRef.current && currentIndex % 10 === 0) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
        // Show cards after a brief delay
        setTimeout(() => {
          setShowCards(true);
          // Scroll when cards appear
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showCopilotResponse, fullText, useTopNav]);

  // Show feedback buttons after cards finish animating
  useEffect(() => {
    if (!showCards) return;

    // Wait for all cards to finish animating (0.3s delay + 0.5s animation = 0.8s)
    const timer = setTimeout(() => {
      setShowFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 900);

    return () => clearTimeout(timer);
  }, [showCards]);

  // Typewriter effect for deployment plan response
  useEffect(() => {
    if (!showDeploymentPlan) return;

    let currentIndex = 0;
    const typingSpeed = 20;

    const typeInterval = setInterval(() => {
      if (currentIndex <= deploymentText.length) {
        setDeploymentTypedText(deploymentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsDeploymentTypingComplete(true);
        // Show card after brief delay
        setTimeout(() => {
          setShowDeploymentPlanCard(true);
          // Scroll when card appears
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showDeploymentPlan, deploymentText]);

  // Show feedback buttons after deployment plan card appears
  useEffect(() => {
    if (!showDeploymentPlanCard) return;

    const timer = setTimeout(() => {
      setShowDeploymentPlanFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [showDeploymentPlanCard]);

  const handleDeployContainerApp = () => {
    setShowDeploymentPlan(true);
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (chatAreaRef.current) {
          // Find the deployment plan user message and scroll to it
          const deploymentUserMessage = document.querySelector(
            '[data-message="deploy-container-app"]',
          );
          if (deploymentUserMessage) {
            const chatArea = chatAreaRef.current;
            const messageTop = (deploymentUserMessage as HTMLElement).offsetTop;
            chatArea.scrollTo({
              top: messageTop - 20, // 20px padding from top
              behavior: "smooth",
            });
          }
        }
      }, 50);
    });
  };

  const handleIncidentAction = (action: string) => {
    // Handle incident investigation actions
    console.log("Incident action:", action);

    if (action === "Show me the resolution plan") {
      setShowResolutionPlan(true);
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (chatAreaRef.current) {
            // Find the resolution plan user message and scroll to it
            const resolutionUserMessage = document.querySelector(
              '[data-message="resolution-plan"]',
            );
            if (resolutionUserMessage) {
              const chatArea = chatAreaRef.current;
              const messageTop = (resolutionUserMessage as HTMLElement)
                .offsetTop;
              chatArea.scrollTo({
                top: messageTop - 20, // 20px padding from top
                behavior: "smooth",
              });
            }
          }
        }, 50);
      });
    }
  };

  const handleApproveResolution = () => {
    setShowResolutionProgress(true);
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 50);
    });
  };

  // Typewriter effect for deployment progress response
  useEffect(() => {
    if (!showDeploymentProgress) return;

    let currentIndex = 0;
    const typingSpeed = 20;

    const typeInterval = setInterval(() => {
      if (currentIndex <= deploymentProgressText.length) {
        setDeploymentProgressTypedText(
          deploymentProgressText.slice(0, currentIndex),
        );
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsDeploymentProgressTypingComplete(true);
        // Show card after brief delay
        setTimeout(() => {
          setShowDeploymentProgressCard(true);
          // Scroll when card appears
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showDeploymentProgress, deploymentProgressText]);

  // Show feedback buttons after deployment progress card appears
  useEffect(() => {
    if (!showDeploymentProgressCard) return;

    const timer = setTimeout(() => {
      setShowDeploymentProgressFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [showDeploymentProgressCard]);

  // Typewriter effect for resolution plan response (Scenario 3)
  useEffect(() => {
    if (!showResolutionPlan) return;

    let currentIndex = 0;
    const typingSpeed = 20;

    const typeInterval = setInterval(() => {
      if (currentIndex <= resolutionPlanText.length) {
        setResolutionPlanTypedText(resolutionPlanText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsResolutionPlanTypingComplete(true);
        // Show card after brief delay
        setTimeout(() => {
          setShowResolutionPlanCard(true);
          // Scroll when card appears
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showResolutionPlan, resolutionPlanText]);

  // Show feedback buttons after resolution plan card appears
  useEffect(() => {
    if (!showResolutionPlanCard) return;

    const timer = setTimeout(() => {
      setShowResolutionPlanFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [showResolutionPlanCard]);

  // Typewriter effect for resolution progress response (Scenario 3)
  useEffect(() => {
    if (!showResolutionProgress) return;

    let currentIndex = 0;
    const typingSpeed = 20;

    const typeInterval = setInterval(() => {
      if (currentIndex <= resolutionProgressText.length) {
        setResolutionProgressTypedText(
          resolutionProgressText.slice(0, currentIndex),
        );
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsResolutionProgressTypingComplete(true);
        // Show card after brief delay
        setTimeout(() => {
          setShowResolutionProgressCard(true);
          // Scroll when card appears
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showResolutionProgress, resolutionProgressText]);

  // Show feedback buttons after resolution progress card appears
  useEffect(() => {
    if (!showResolutionProgressCard) return;

    const timer = setTimeout(() => {
      setShowResolutionProgressFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [showResolutionProgressCard]);

  // Typewriter effect for resolution complete response (Scenario 3)
  useEffect(() => {
    if (!showResolutionComplete) return;

    let currentIndex = 0;
    const typingSpeed = 20;

    const typeInterval = setInterval(() => {
      if (currentIndex <= resolutionCompleteText.length) {
        setResolutionCompleteTypedText(
          resolutionCompleteText.slice(0, currentIndex),
        );
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsResolutionCompleteTypingComplete(true);
        // Show card after brief delay
        setTimeout(() => {
          setShowResolutionCompleteCard(true);
          // Scroll when card appears
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showResolutionComplete, resolutionCompleteText]);

  // Show feedback buttons after resolution complete card appears
  useEffect(() => {
    if (!showResolutionCompleteCard) return;

    const timer = setTimeout(() => {
      setShowResolutionCompleteFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [showResolutionCompleteCard]);

  // Typewriter effect for deployment complete response
  useEffect(() => {
    if (!showDeploymentComplete) return;

    let currentIndex = 0;
    const typingSpeed = 20;

    const typeInterval = setInterval(() => {
      if (currentIndex <= deploymentCompleteText.length) {
        setDeploymentCompleteTypedText(
          deploymentCompleteText.slice(0, currentIndex),
        );
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsDeploymentCompleteTypingComplete(true);
        // Show card after brief delay
        setTimeout(() => {
          setShowDeploymentCompleteCard(true);
          // Scroll when card appears
          setTimeout(() => {
            if (chatAreaRef.current) {
              chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }, 100);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [showDeploymentComplete, deploymentCompleteText]);

  // Show feedback buttons after deployment complete card appears
  useEffect(() => {
    if (!showDeploymentCompleteCard) return;

    const timer = setTimeout(() => {
      setShowDeploymentCompleteFeedback(true);
      // Scroll to show feedback buttons
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [showDeploymentCompleteCard]);

  // Scroll up to make space, then show "Last read" divider
  useEffect(() => {
    if (!showDeploymentComplete) return;

    // Show the "Last read" divider immediately
    setShowLastReadDivider(true);

    // First, scroll to the bottom of deployment progress section
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (chatAreaRef.current) {
          // Scroll to current position (deployment progress feedback buttons)
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });

          // After scroll completes, scroll to position the divider at the top
          setTimeout(() => {
            const completeMessage = document.querySelector(
              '[data-message="deployment-complete"]',
            );
            if (completeMessage && chatAreaRef.current) {
              const messageTop = (completeMessage as HTMLElement).offsetTop;
              chatAreaRef.current.scrollTo({
                top: messageTop - 20, // 20px padding from top
                behavior: "smooth",
              });
            }
          }, 900); // Wait for scroll to complete
        }
      }, 100);
    });
  }, [showDeploymentComplete]);

  const handleApproveAndDeploy = () => {
    setShowDeploymentProgress(true);
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (chatAreaRef.current) {
          // Find the approve deployment user message and scroll to it
          const approveUserMessage = document.querySelector(
            '[data-message="approve-deploy"]',
          );
          if (approveUserMessage) {
            const chatArea = chatAreaRef.current;
            const messageTop = (approveUserMessage as HTMLElement).offsetTop;
            chatArea.scrollTo({
              top: messageTop - 20, // 20px padding from top
              behavior: "smooth",
            });
          }
        }
      }, 50);
    });
  };

  const handleDeploymentComplete = () => {
    setShowDeploymentComplete(true);
  };

  const suggestions = [
    "Create a AKS cluster to deploy and manage a scalable and secure web application for hosting a blog",
    "Restart my virtual machines in West US",
    "How can I optimize my monthly bill?",
  ];

  return (
    <div className={mergeClasses(styles.container, styles.containerHeight)}>
      {/* Header - Fixed at top, outside scrolling content */}
      {customHeader === undefined ? (
        <div className={styles.fixedHeaderOverlay}>
          {useTopNav ? (
            <TopNav
              activeLink=""
              onCopilotOpen={() => {
                console.log("Opening AgentWelcome");
                setShowAgentWelcome(true);
              }}
            />
          ) : (
            <AzureHeaderP1
              activeLink="Home"
              viewMode={viewMode}
              onCopilotOpen={() => {
                console.log("Opening AgentWelcome from AzureHeaderP1");
                setShowAgentWelcome(true);
              }}
            />
          )}
        </div>
      ) : customHeader !== null ? (
        <div className={styles.fixedHeaderOverlay}>{customHeader}</div>
      ) : null}

      <div className={styles.contentWrapper}>
        {/* Left Sidebar */}
        <div
          className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""}`}
        >
          {/* Sidebar Header */}
          <div
            className={`${styles.sidebarHeader} ${isSidebarCollapsed ? styles.sidebarHeaderCollapsed : ""}`}
          >
            {!isSidebarCollapsed && (
              <div className={styles.sidebarHeaderLeft}>
                <img
                  src="/icons/copilot-icon.svg"
                  alt="Copilot"
                  className={mergeClasses(
                    styles.copilotLogo,
                    isDarkMode && styles.iconDark,
                  )}
                />
                <Text className={styles.sidebarTitle}>Azure Copilot</Text>
              </div>
            )}
            <Button
              appearance="subtle"
              icon={
                <img
                  src="/icons/pane-sidebar.svg"
                  alt="Collapse"
                  className={mergeClasses(
                    styles.collapseIcon,
                    isDarkMode && styles.iconDark,
                  )}
                />
              }
              className={styles.headerButton}
              title={
                isSidebarCollapsed ? "Expand navigation" : "Collapse navigation"
              }
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>

          {!isSidebarCollapsed && (
            <>
              {/* Navigation Items */}
              <div className={styles.sidebarNav}>
                <button
                  className={`${styles.navItem} ${activeSection === "chat" ? styles.navItemActive : ""}`}
                  onClick={() => setActiveSection("chat")}
                >
                  {activeSection === "chat" && (
                    <div className={styles.navItemIndicator} />
                  )}
                  <span>New conversation</span>
                </button>
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              <div className={styles.sidebarNav}>
                <button className={styles.navLink}>
                  <span>Activity</span>
                </button>

                <button className={styles.navLink}>
                  <span>Your agents</span>
                </button>

                <button className={styles.navLink}>
                  <span>Agent store</span>
                </button>
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Conversations Section */}
              <div className={styles.conversationsSection}>
                <div
                  className={styles.conversationsSectionHeader}
                  onClick={() =>
                    setIsConversationsCollapsed(!isConversationsCollapsed)
                  }
                >
                  <Text className={styles.conversationsSectionTitle}>
                    Conversations
                  </Text>
                  <ChevronDown20Regular
                    className={
                      isConversationsCollapsed
                        ? styles.chevronCollapsed
                        : styles.chevronExpanded
                    }
                  />
                </div>

                {!isConversationsCollapsed && (
                  <div className={styles.conversationsContent}>
                    <div className={styles.conversationItem}>
                      {truncatedTitle}
                    </div>

                    <a className={styles.allConversationsLink}>
                      All conversations
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Text className={styles.headerTitle}>{conversationTitle}</Text>
            </div>
            <div className={styles.headerRight}>
              <Button
                appearance="subtle"
                icon={
                  <img
                    src="/icons/MoreHorizontal.svg"
                    alt="More"
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode && styles.iconDark,
                    )}
                  />
                }
                className={styles.headerButton}
                title="More options"
              />
              <Button
                appearance="outline"
                icon={
                  <img
                    src="/icons/ChatAdd.svg"
                    alt="New chat"
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode && styles.iconDark,
                    )}
                  />
                }
                className={styles.newChatButton}
                title="New chat"
              >
                New chat
              </Button>
              <Button
                appearance="subtle"
                icon={
                  <img
                    src="/icons/Panel.svg"
                    alt="Panel"
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode && styles.iconDark,
                    )}
                  />
                }
                className={styles.headerButton}
                title="Toggle panel"
              />
              <Button
                appearance="subtle"
                icon={<Dismiss24Regular />}
                className={styles.headerButton}
                onClick={onClose}
                title="Close"
              />
            </div>
          </div>

          {/* Chat Area */}
          <div className={styles.chatArea} ref={chatAreaRef}>
            <div className={styles.messagesContainer}>
              {/* Conversation Panel */}
              <div className={styles.conversationPanel}>
                {/* User Message */}
                <div className={styles.userMessage}>
                  {buildScenario === 3
                    ? "Review the incident summary for BackendVM4"
                    : buildScenario === 2
                      ? "I want to expand my container app into a full-stack web application. Add a managed database, secure secrets, and monitoring using a ready-to-deploy architecture."
                      : initialMessage ||
                        (useTopNav
                          ? "I need to deploy a full-stack web application with a React frontend, Python API backend, and MongoDB database. I want to use Terraform for infrastructure as code and need a complete CI/CD pipeline configuration for automated deployments."
                          : "Make a clone of VM01")}
                </div>

                {/* Copilot Response */}
                {showCopilotResponse && (
                  <div
                    className={mergeClasses(
                      styles.copilotResponse,
                      styles.fadeInAnim,
                    )}
                  >
                    <img
                      src="/icons/Copilot-line.svg"
                      alt="Copilot"
                      className={styles.copilotAvatar}
                    />
                    <div className={styles.responseContent}>
                      <div className={styles.responseHeader}>
                        <Text className={styles.copilotLabel}>Copilot</Text>
                        <Text className={styles.aiDisclaimer}>
                          AI-generated content may be incorrect
                        </Text>
                      </div>

                      {useTopNav ? (
                        // Infrastructure Agent view (Sitemap POC)
                        <>
                          <Text className={styles.responseDescription}>
                            {typedText}
                          </Text>

                          {showCards && buildScenario === 3 ? (
                            // Scenario 3: Incident Investigation
                            <>
                              <style>{`
                              @keyframes cardFadeIn {
                                from {
                                  opacity: 0;
                                  transform: translateY(20px);
                                }
                                to {
                                  opacity: 1;
                                  transform: translateY(0);
                                }
                              }
                            `}</style>
                              <div className={styles.fadeInCard}>
                                <IncidentInvestigationCard
                                  onActionClick={handleIncidentAction}
                                />
                              </div>
                            </>
                          ) : showCards && buildScenario === 2 ? (
                            // Scenario 2: Workload Recommendation
                            <>
                              <style>{`
                              @keyframes cardFadeIn {
                                from {
                                  opacity: 0;
                                  transform: translateY(20px);
                                }
                                to {
                                  opacity: 1;
                                  transform: translateY(0);
                                }
                              }
                            `}</style>
                              <div className={styles.fadeInCard}>
                                <WorkloadRecommendationCard
                                  onCreateDeployment={handleDeployContainerApp}
                                />
                              </div>
                            </>
                          ) : showCards ? (
                            // Scenario 1: Service Recommendations
                            <>
                              <style>{`
                              @keyframes cardFadeIn {
                                from {
                                  opacity: 0;
                                  transform: translateY(20px);
                                }
                                to {
                                  opacity: 1;
                                  transform: translateY(0);
                                }
                              }
                              .service-card {
                                animation: cardFadeIn 0.5s ease-out forwards;
                              }
                            `}</style>
                              <div className={styles.cardMt}>
                                {/* Container Apps Card */}
                                <div
                                  className={mergeClasses(
                                    "service-card",
                                    styles.serviceCard,
                                    styles.serviceCardDelay0,
                                  )}
                                  onClick={() =>
                                    setExpandedCard(
                                      expandedCard === "container-apps"
                                        ? null
                                        : "container-apps",
                                    )
                                  }
                                >
                                  <div className={styles.serviceCardRow}>
                                    <img
                                      src="/icons/containerapps.svg"
                                      alt="Container Apps"
                                      className={styles.serviceIcon}
                                    />
                                    <div className={styles.serviceFlex1}>
                                      <div className={styles.serviceNameRow}>
                                        <Text className={styles.serviceTitle}>
                                          Container Apps
                                        </Text>
                                        <span className={styles.serviceBadge}>
                                          Best overall
                                        </span>
                                      </div>
                                      <Text className={styles.serviceDesc}>
                                        Best for startups needing flexibility,
                                        modern architecture, and efficient
                                        scaling.
                                      </Text>
                                    </div>
                                    {expandedCard === "container-apps" ? (
                                      <ChevronUp20Regular />
                                    ) : (
                                      <ChevronDown20Regular />
                                    )}
                                  </div>

                                  {expandedCard === "container-apps" && (
                                    <div
                                      className={styles.serviceExpandedContent}
                                    >
                                      <Text
                                        className={styles.serviceExpandedDesc}
                                      >
                                        Container Apps offer a serverless
                                        platform for running containerized
                                        apps—no infrastructure management
                                        needed. It supports microservices, APIs,
                                        and background jobs for scalable
                                        cloud-native development.
                                      </Text>

                                      <div className={styles.featuresList}>
                                        <div className={styles.featureRow}>
                                          <Checkmark20Regular
                                            className={styles.featureCheckIcon}
                                          />
                                          <Text className={styles.featureText}>
                                            Flexible & scalable: designed for
                                            microservices and containerized
                                            workloads; scales to zero for cost
                                            savings.
                                          </Text>
                                        </div>
                                        <div className={styles.featureRow}>
                                          <Checkmark20Regular
                                            className={styles.featureCheckIcon}
                                          />
                                          <Text className={styles.featureText}>
                                            Modern deployment: supports Dapr,
                                            event-driven patterns, and easy
                                            integration with AI workloads in
                                            containers.
                                          </Text>
                                        </div>
                                        <div className={styles.featureRow}>
                                          <Dismiss20Regular
                                            className={styles.featureXIcon}
                                          />
                                          <Text className={styles.featureText}>
                                            Manual setup isn't as easy as Static
                                            Web Apps, but AI agents specialized
                                            in Container Apps can assist.
                                          </Text>
                                        </div>
                                      </div>

                                      <div className={styles.actionBtnRow}>
                                        <button
                                          onClick={handleDeployContainerApp}
                                          className={styles.pillButton}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              tokens.colorNeutralBackground1Hover;
                                            e.currentTarget.style.transform =
                                              "translateY(-1px)";
                                            e.currentTarget.style.boxShadow =
                                              "0 4px 12px rgba(0, 0, 0, 0.12)";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              tokens.colorNeutralBackground1;
                                            e.currentTarget.style.transform =
                                              "translateY(0)";
                                            e.currentTarget.style.boxShadow =
                                              "0 2px 6px rgba(0, 0, 0, 0.08)";
                                          }}
                                        >
                                          <span>
                                            Deploy a Container App service for
                                            me
                                          </span>
                                          <Send16Regular />
                                        </button>
                                        <button
                                          className={styles.pillButton}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              tokens.colorNeutralBackground1Hover;
                                            e.currentTarget.style.transform =
                                              "translateY(-1px)";
                                            e.currentTarget.style.boxShadow =
                                              "0 4px 12px rgba(0, 0, 0, 0.12)";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              tokens.colorNeutralBackground1;
                                            e.currentTarget.style.transform =
                                              "translateY(0)";
                                            e.currentTarget.style.boxShadow =
                                              "0 2px 6px rgba(0, 0, 0, 0.08)";
                                          }}
                                        >
                                          <span>
                                            More information about the AI agents
                                          </span>
                                          <Send16Regular />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* Static Web Apps Card */}
                                <div
                                  className={mergeClasses(
                                    styles.serviceCard,
                                    styles.serviceCardDelay1,
                                  )}
                                  onClick={() =>
                                    setExpandedCard(
                                      expandedCard === "static-web-apps"
                                        ? null
                                        : "static-web-apps",
                                    )
                                  }
                                >
                                  <div className={styles.serviceCardRow}>
                                    <img
                                      src="/icons/Static-Web-Apps.svg"
                                      alt="Static Web Apps"
                                      className={styles.serviceIcon}
                                    />
                                    <div className={styles.serviceFlex1}>
                                      <Text
                                        className={mergeClasses(
                                          styles.serviceTitle,
                                          styles.textMb16,
                                          styles.mb8,
                                        )}
                                      >
                                        Static Web Apps
                                      </Text>
                                      <Text className={styles.serviceDesc}>
                                        Best for projects with static frontends
                                        and lightweight serverless backends.
                                      </Text>
                                    </div>
                                    {expandedCard === "static-web-apps" ? (
                                      <ChevronUp20Regular />
                                    ) : (
                                      <ChevronDown20Regular />
                                    )}
                                  </div>
                                </div>{" "}
                                {/* App Service Card */}
                                <div
                                  className={mergeClasses(
                                    styles.serviceCard,
                                    styles.serviceCardDelay2,
                                    styles.cursorPointer,
                                  )}
                                  onClick={() =>
                                    setExpandedCard(
                                      expandedCard === "app-service"
                                        ? null
                                        : "app-service",
                                    )
                                  }
                                >
                                  <div className={styles.serviceCardRow}>
                                    <img
                                      src="/icons/App-Services.svg"
                                      alt="App Service"
                                      className={styles.serviceIcon}
                                    />
                                    <div className={styles.serviceFlex1}>
                                      <Text
                                        className={mergeClasses(
                                          styles.serviceTitle,
                                          styles.textMb16,
                                          styles.mb8,
                                        )}
                                      >
                                        App Service
                                      </Text>
                                      <Text className={styles.serviceDesc}>
                                        Best for classic web apps but may not be
                                        as cost-effective or modern for an AI
                                        startup.
                                      </Text>
                                    </div>
                                    {expandedCard === "app-service" ? (
                                      <ChevronUp20Regular />
                                    ) : (
                                      <ChevronDown20Regular />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : (
                        // VM1 Clone view (Search/Usertest)
                        <>
                          <Text className={styles.responseTitle}>
                            VM01 Clone Configuration
                          </Text>

                          <Text className={styles.responseDescription}>
                            I can help you create an identical copy of VM01,
                            including its configuration, disks, and network
                            settings. The cloned VM will be created in the same
                            resource group with a new name.
                          </Text>

                          <Text className={styles.sectionSubheader}>
                            What will be cloned:
                          </Text>

                          <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>
                              VM size and configuration (Standard_D2s_v3)
                            </li>
                            <li className={styles.bulletItem}>
                              Operating system disk and data disks
                            </li>
                            <li className={styles.bulletItem}>
                              Network interface and security group settings
                            </li>
                            <li className={styles.bulletItem}>
                              Tags and metadata
                            </li>
                          </ul>

                          <div
                            className={mergeClasses(
                              styles.costWarning,
                              styles.costWarningMt,
                            )}
                          >
                            <strong>Note:</strong> Cloning will create new
                            resources and incur additional costs
                          </div>

                          <Text className={styles.sectionSubheader}>
                            Recommended next steps:
                          </Text>

                          <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>
                              Choose a name for the cloned VM
                            </li>
                            <li className={styles.bulletItem}>
                              Select target resource group (default: same as
                              VM01)
                            </li>
                            <li className={styles.bulletItem}>
                              Review and confirm configuration
                            </li>
                          </ul>

                          <div className={styles.actionButtons}>
                            <Button appearance="primary">Clone VM</Button>
                            <Button
                              appearance="outline"
                              onClick={() => setShowCodePanel(!showCodePanel)}
                            >
                              <Document24Regular
                                className={styles.actionIconStyle}
                              />
                              View Bicep template
                            </Button>
                            <Button
                              appearance="outline"
                              onClick={() => setShowCloudShell(!showCloudShell)}
                            >
                              Open CloudShell
                            </Button>
                          </div>
                        </>
                      )}

                      {showFeedback && (
                        <div
                          className={mergeClasses(
                            styles.feedbackSection,
                            styles.feedbackFadeIn,
                          )}
                        >
                          <Button
                            appearance="subtle"
                            size="small"
                            icon={<ThumbLike20Regular />}
                            title="Like"
                          />
                          <Button
                            appearance="subtle"
                            size="small"
                            icon={<ThumbDislike20Regular />}
                            title="Dislike"
                          />
                          <div className={styles.criteriaButton}>
                            <img
                              src="/icons/Agents.svg"
                              alt="Criteria"
                              className={mergeClasses(
                                styles.iconXs,
                                isDarkMode && styles.iconDark,
                              )}
                            />
                            <span>Criteria</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Deployment Plan */}
                {showDeploymentPlan && (
                  <>
                    {/* User Message */}
                    <div
                      className={styles.userMessage}
                      data-message="deploy-container-app"
                    >
                      {buildScenario === 2
                        ? "Create deployment plan"
                        : "Deploy a container app for me"}
                    </div>

                    {/* Copilot Response with Deployment Plan */}
                    <div
                      className={mergeClasses(
                        styles.copilotResponse,
                        styles.fadeInAnim,
                      )}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        className={styles.copilotAvatar}
                      />
                      <div className={styles.responseContent}>
                        <div className={styles.responseHeader}>
                          <Text className={styles.copilotLabel}>Copilot</Text>
                          <Text className={styles.aiDisclaimer}>
                            AI-generated content may be incorrect
                          </Text>
                        </div>

                        <Text className={styles.textMb16}>
                          {deploymentTypedText}
                        </Text>

                        {/* Show deployment plan card after typing completes */}
                        {showDeploymentPlanCard && (
                          <div className={styles.fadeInCardImmediate}>
                            {buildScenario === 2 ? (
                              <DeploymentPlanCard
                                serviceName="containerized web app"
                                region=""
                                pricingTier=""
                                estimatedCost=""
                                usersSupported=""
                                onApprove={handleApproveAndDeploy}
                                onInviteColleagues={() => {}}
                                onAddSupport={() => {}}
                                isDeployDisabled={showDeploymentProgressCard}
                              />
                            ) : (
                              <DeploymentPlanCard
                                serviceName="Container App service"
                                region="West-US"
                                pricingTier="Basic"
                                estimatedCost="$1.30"
                                usersSupported="1,000–5,000"
                                onApprove={handleApproveAndDeploy}
                                onInviteColleagues={() => {}}
                                onAddSupport={() => {}}
                                isDeployDisabled={showDeploymentProgressCard}
                              />
                            )}
                          </div>
                        )}

                        {/* Feedback buttons for deployment plan */}
                        {showDeploymentPlanFeedback && (
                          <div
                            className={mergeClasses(
                              styles.feedbackSection,
                              styles.feedbackFadeIn,
                            )}
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbLike20Regular />}
                              title="Like"
                            />
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbDislike20Regular />}
                              title="Dislike"
                            />
                            <div className={styles.criteriaButton}>
                              <img
                                src="/icons/Agents.svg"
                                alt="Criteria"
                                className={mergeClasses(
                                  styles.iconXs,
                                  isDarkMode && styles.iconDark,
                                )}
                              />
                              <span>Criteria</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Deployment Progress Section */}
                {showDeploymentProgress && (
                  <>
                    {/* User message for approve and deploy */}
                    <div
                      className={styles.userMessage}
                      data-message="approve-deploy"
                    >
                      Approve and deploy
                    </div>

                    {/* Copilot response with deployment progress */}
                    <div
                      className={mergeClasses(
                        styles.copilotResponse,
                        styles.fadeInAnim,
                      )}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        className={styles.copilotAvatar}
                      />
                      <div className={styles.responseContent}>
                        <div className={styles.responseHeader}>
                          <Text className={styles.copilotLabel}>Copilot</Text>
                          <Text className={styles.aiDisclaimer}>
                            AI-generated content may be incorrect
                          </Text>
                        </div>

                        <Text className={styles.textMb16}>
                          {deploymentProgressTypedText}
                        </Text>

                        {/* Show deployment progress card after typing completes */}
                        {showDeploymentProgressCard && (
                          <div className={styles.fadeInCardImmediate}>
                            {buildScenario === 2 ? (
                              <DeploymentProgressCard
                                serviceName="containerized web app"
                                title="Deploying containerized web app"
                                steps={[
                                  "Provisioning Azure App Services for your React frontend and Node.js backend",
                                  "Configuring container deployment and CI/CD pipelines",
                                  "Creating Azure Cosmos DB with MongoDB API",
                                  "Enabling Application Insights monitoring",
                                  "Applying security best practices and RBAC",
                                  "Validating deployment and running health checks",
                                ]}
                                initialTimeElapsed={12}
                                artifactsCreated={0}
                                estTimeRemaining="24-30 minutes"
                                costToUse="$0.24/minute"
                                onComplete={handleDeploymentComplete}
                              />
                            ) : (
                              <DeploymentProgressCard
                                serviceName="Container App service"
                                onComplete={handleDeploymentComplete}
                              />
                            )}
                          </div>
                        )}

                        {/* Feedback buttons for deployment progress */}
                        {showDeploymentProgressFeedback && (
                          <div
                            className={mergeClasses(
                              styles.feedbackSection,
                              styles.feedbackFadeIn,
                            )}
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbLike20Regular />}
                              title="Like"
                            />
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbDislike20Regular />}
                              title="Dislike"
                            />
                            <div className={styles.criteriaButton}>
                              <img
                                src="/icons/Agents.svg"
                                alt="Criteria"
                                className={mergeClasses(
                                  styles.iconXs,
                                  isDarkMode && styles.iconDark,
                                )}
                              />
                              <span>Criteria</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Deployment Complete Section */}
                {showDeploymentComplete && (
                  <>
                    {/* "Last read" divider */}
                    {showLastReadDivider && (
                      <div
                        className={styles.lastReadDivider}
                        data-message="deployment-complete"
                      >
                        <div className={styles.lastReadLine}></div>
                        <span className={styles.lastReadText}>Last read</span>
                        <div className={styles.lastReadLine}></div>
                      </div>
                    )}

                    {/* Copilot response with deployment complete */}
                    <div
                      className={mergeClasses(
                        styles.copilotResponse,
                        styles.fadeInAnim,
                      )}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        className={styles.copilotAvatar}
                      />
                      <div className={styles.responseContent}>
                        <div className={styles.responseHeader}>
                          <Text className={styles.copilotLabel}>Copilot</Text>
                          <Text className={styles.aiDisclaimer}>
                            AI-generated content may be incorrect
                          </Text>
                        </div>

                        <Text className={styles.textMb16PreWrap}>
                          {deploymentCompleteTypedText}
                        </Text>

                        {/* Show deployment complete card after typing completes */}
                        {showDeploymentCompleteCard && (
                          <div className={styles.fadeInCardImmediate}>
                            {buildScenario === 1 ? (
                              <DeploymentCompleteCard
                                title="MyDemo-Project"
                                resources={[
                                  {
                                    name: "contoso-AI-app",
                                    type: "Container App",
                                    status: "Running",
                                    monthlyCost: "$2.30",
                                    lastActivity: "2 minutes ago",
                                  },
                                ]}
                                viewLinkText="View in Build"
                                onViewManage={() =>
                                  onNavigate?.("build-content-2")
                                }
                              />
                            ) : (
                              <DeploymentCompleteCard
                                resources={[
                                  {
                                    name: "my-first-app-01",
                                    type: "App Service",
                                    status: "Running",
                                    monthlyCost: "$2.15",
                                    lastActivity: "5 minutes ago",
                                  },
                                  {
                                    name: "my-first-app-02",
                                    type: "App Service",
                                    status: "Running",
                                    monthlyCost: "$1.30",
                                    lastActivity: "1 hour ago",
                                  },
                                  {
                                    name: "my-first-app-database",
                                    type: "Cosmos DB",
                                    status: "Running",
                                    monthlyCost: "$0.90",
                                    lastActivity: "2 hours ago",
                                  },
                                  {
                                    name: "my-first-app-monitor",
                                    type: "Azure Monitor",
                                    status: "Running",
                                    monthlyCost: "$2.15",
                                    lastActivity: "5 minutes ago",
                                  },
                                  {
                                    name: "my-first-app-vault",
                                    type: "Key Vault",
                                    status: "Running",
                                    monthlyCost: "$1.30",
                                    lastActivity: "1 hour ago",
                                  },
                                  {
                                    name: "my-first-app-secrets",
                                    type: "Secrets",
                                    status: "Running",
                                    monthlyCost: "$0.90",
                                    lastActivity: "2 hours ago",
                                  },
                                ]}
                                onViewManage={() =>
                                  onNavigate?.("manage-content-2")
                                }
                              />
                            )}
                          </div>
                        )}

                        {/* Feedback buttons for deployment complete */}
                        {showDeploymentCompleteFeedback && (
                          <div
                            className={mergeClasses(
                              styles.feedbackSection,
                              styles.feedbackFadeIn,
                            )}
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbLike20Regular />}
                              title="Like"
                            />
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbDislike20Regular />}
                              title="Dislike"
                            />
                            <div className={styles.criteriaButton}>
                              <img
                                src="/icons/Agents.svg"
                                alt="Criteria"
                                className={mergeClasses(
                                  styles.iconXs,
                                  isDarkMode && styles.iconDark,
                                )}
                              />
                              <span>Criteria</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Resolution Plan (Scenario 3) */}
                {showResolutionPlan && (
                  <>
                    {/* User Message */}
                    <div
                      className={styles.userMessage}
                      data-message="resolution-plan"
                    >
                      Show me the resolution plan
                    </div>

                    {/* Copilot Response with Resolution Plan */}
                    <div
                      className={mergeClasses(
                        styles.copilotResponse,
                        styles.fadeInAnim,
                      )}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        className={styles.copilotAvatar}
                      />
                      <div className={styles.responseContent}>
                        <div className={styles.responseHeader}>
                          <Text className={styles.copilotLabel}>Copilot</Text>
                          <Text className={styles.aiDisclaimer}>
                            AI-generated content may be incorrect
                          </Text>
                        </div>

                        <Text className={styles.textMb16}>
                          {resolutionPlanTypedText}
                        </Text>

                        {/* Show resolution plan card after typing completes */}
                        {showResolutionPlanCard && (
                          <div className={styles.fadeInCardImmediate}>
                            <ResolutionPlanCard
                              onApprove={handleApproveResolution}
                              onCancel={() => {}}
                              onAddNotes={() => {}}
                            />
                          </div>
                        )}

                        {/* Feedback buttons for resolution plan */}
                        {showResolutionPlanFeedback && (
                          <div
                            className={mergeClasses(
                              styles.feedbackSection,
                              styles.feedbackFadeIn,
                            )}
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbLike20Regular />}
                              title="Like"
                            />
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbDislike20Regular />}
                              title="Dislike"
                            />
                            <div className={styles.criteriaButton}>
                              <img
                                src="/icons/Agents.svg"
                                alt="Criteria"
                                className={mergeClasses(
                                  styles.iconXs,
                                  isDarkMode && styles.iconDark,
                                )}
                              />
                              <span>Criteria</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Resolution Progress (Scenario 3) */}
                {showResolutionProgress && (
                  <>
                    {/* User Message */}
                    <div
                      className={styles.userMessage}
                      data-message="approve-resolution"
                    >
                      Approve and start
                    </div>

                    {/* Copilot Response with Resolution Progress */}
                    <div
                      className={mergeClasses(
                        styles.copilotResponse,
                        styles.fadeInAnim,
                      )}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        className={styles.copilotAvatar}
                      />
                      <div className={styles.responseContent}>
                        <div className={styles.responseHeader}>
                          <Text className={styles.copilotLabel}>Copilot</Text>
                          <Text className={styles.aiDisclaimer}>
                            AI-generated content may be incorrect
                          </Text>
                        </div>

                        <Text className={styles.textMb16}>
                          {resolutionProgressTypedText}
                        </Text>

                        {/* Show resolution progress card after typing completes */}
                        {showResolutionProgressCard && (
                          <div className={styles.fadeInCardImmediate}>
                            <DeploymentProgressCard
                              serviceName="BackendVM4"
                              title="Changing NSG rule on blocked port"
                              steps={[
                                "Updating NSG rule with a new Wildcard destination prefix",
                                "Validating security configuration",
                                "Applying changes to network security group",
                              ]}
                              initialTimeElapsed={8}
                              estTimeRemaining="2–3 hours"
                              costToUse="$5.40 total"
                              showLiveMetrics={true}
                              targetResource="stock-vm-westus"
                              agentName="VM Operator"
                              agentIcon="/icons/Copilot-line.svg"
                              onComplete={() => {
                                setShowResolutionLastReadDivider(true);
                                setShowResolutionComplete(true);
                              }}
                            />
                          </div>
                        )}

                        {/* Feedback buttons for resolution progress */}
                        {showResolutionProgressFeedback && (
                          <div
                            className={mergeClasses(
                              styles.feedbackSection,
                              styles.feedbackFadeIn,
                            )}
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbLike20Regular />}
                              title="Like"
                            />
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbDislike20Regular />}
                              title="Dislike"
                            />
                            <div className={styles.criteriaButton}>
                              <img
                                src="/icons/Agents.svg"
                                alt="Criteria"
                                className={mergeClasses(
                                  styles.iconXs,
                                  isDarkMode && styles.iconDark,
                                )}
                              />
                              <span>Criteria</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Resolution Complete Section (Scenario 3) */}
                {showResolutionComplete && (
                  <>
                    {/* "Last read" divider */}
                    {showResolutionLastReadDivider && (
                      <div
                        className={styles.lastReadDivider}
                        data-message="resolution-complete"
                      >
                        <div className={styles.lastReadLine}></div>
                        <span className={styles.lastReadText}>Last read</span>
                        <div className={styles.lastReadLine}></div>
                      </div>
                    )}

                    {/* Copilot response with resolution complete */}
                    <div
                      className={mergeClasses(
                        styles.copilotResponse,
                        styles.fadeInAnim,
                      )}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        className={styles.copilotAvatar}
                      />
                      <div className={styles.responseContent}>
                        <div className={styles.responseHeader}>
                          <Text className={styles.copilotLabel}>Copilot</Text>
                          <Text className={styles.aiDisclaimer}>
                            AI-generated content may be incorrect
                          </Text>
                        </div>

                        <Text className={styles.textMb16}>
                          {resolutionCompleteTypedText}
                        </Text>

                        {/* Show resolution report card after typing completes */}
                        {showResolutionCompleteCard && (
                          <div className={styles.fadeInCardImmediate}>
                            <ResolutionReportCard />
                          </div>
                        )}

                        {/* Feedback buttons for resolution complete */}
                        {showResolutionCompleteFeedback && (
                          <div
                            className={mergeClasses(
                              styles.feedbackSection,
                              styles.feedbackFadeIn,
                            )}
                          >
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbLike20Regular />}
                              title="Like"
                            />
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<ThumbDislike20Regular />}
                              title="Dislike"
                            />
                            <div className={styles.criteriaButton}>
                              <img
                                src="/icons/Agents.svg"
                                alt="Criteria"
                                className={mergeClasses(
                                  styles.iconXs,
                                  isDarkMode && styles.iconDark,
                                )}
                              />
                              <span>Criteria</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Project Creation Card */}
                {showProjectCard && (
                  <div
                    className={mergeClasses(
                      styles.copilotResponse,
                      styles.fadeInAnim,
                    )}
                  >
                    <img
                      src="/icons/Copilot-line.svg"
                      alt="Copilot"
                      className={styles.copilotAvatar}
                    />
                    <div className={styles.responseContent}>
                      <div className={styles.responseHeader}>
                        <Text className={styles.copilotLabel}>Copilot</Text>
                        <Text className={styles.aiDisclaimer}>
                          AI-generated content may be incorrect
                        </Text>
                      </div>

                      {/* White Card Container */}
                      <div className={styles.projectCardContainer}>
                        {/* Card Header */}
                        <div className={styles.projectCardTitle}>
                          Create a project
                        </div>

                        {/* Divider */}
                        <div className={styles.projectCardDivider} />

                        {/* Card Body */}
                        <div className={styles.projectCardBody}>
                          <div className={styles.projectCardDesc}>
                            Projects help you organize and manage resources that
                            share a common purpose or workload. Group related
                            resources, subscriptions, and services together for
                            easier monitoring and collaboration.
                          </div>

                          <Label className={styles.projectCardLabel}>
                            Project{" "}
                            <span className={styles.requiredAsterisk}>*</span>
                          </Label>
                          <Input
                            className={styles.projectCardInput}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter project name"
                            disabled={isCreatingProject}
                            required
                          />

                          <div className={styles.advancedOptionsBox}>
                            <div className={styles.advancedOptionsHeader}>
                              <span>Advanced options</span>
                              <Settings20Regular />
                            </div>
                            <div className={styles.advancedOptionsText}>
                              We'll set up a new project for you with defaults
                              selected for optimal functionality.
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className={styles.projectCardActions}>
                          <Button
                            appearance="primary"
                            onClick={async () => {
                              if (!projectName.trim()) return;
                              setIsCreatingProject(true);
                              await new Promise((resolve) =>
                                setTimeout(resolve, 2000),
                              );
                              setProjectCreated(true);
                              setShowCloudShell(true);
                            }}
                            disabled={
                              !projectName.trim() ||
                              isCreatingProject ||
                              projectCreated
                            }
                          >
                            {isCreatingProject ? (
                              <div className={styles.spinnerRow}>
                                <Spinner size="tiny" />
                                <span>Creating...</span>
                              </div>
                            ) : (
                              "Create project and deploy workload"
                            )}
                          </Button>
                          <Button
                            appearance="secondary"
                            onClick={() => {
                              setShowProjectCard(false);
                              setProjectName("MyDemo-Project");
                              setIsCreatingProject(false);
                            }}
                            disabled={isCreatingProject}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>

                      <div className={styles.feedbackSection}>
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ThumbLike20Regular />}
                          title="Like"
                        />
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ThumbDislike20Regular />}
                          title="Dislike"
                        />
                        <div className={styles.criteriaButton}>
                          <img
                            src="/icons/Agents.svg"
                            alt="Criteria"
                            className={mergeClasses(
                              styles.iconXs,
                              isDarkMode && styles.iconDark,
                            )}
                          />
                          <span>Criteria</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Section - Fixed at bottom of chat area */}
            <div className={styles.inputSection}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    placeholder="I want to..."
                    className={styles.inputField}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div className={styles.inputActions}>
                  <Button
                    appearance="subtle"
                    icon={<Add24Regular />}
                    className={styles.addButton}
                    title="Add attachment"
                  />
                  <button className={styles.agentButton}>
                    <img
                      src="/icons/Agents.svg"
                      alt="Agent"
                      className={mergeClasses(
                        styles.agentButtonIcon,
                        isDarkMode && styles.iconDark,
                      )}
                    />
                    <span>Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Panel */}
        <div
          className={`${styles.codePanel} ${showCodePanel ? styles.codePanelOpen : ""}`}
        >
          <div className={styles.codePanelHeader}>
            <Text className={styles.codePanelTitle}>
              {useTopNav
                ? "Terraform script: main.tf"
                : "Bicep template: vm-clone.bicep"}
            </Text>
            <Button
              appearance="subtle"
              icon={<Dismiss24Regular />}
              onClick={() => setShowCodePanel(false)}
              title="Close"
            />
          </div>
          <div className={styles.codePanelContent}>
            {useTopNav ? (
              // Infrastructure Agent - Terraform code
              <pre className={styles.codeBlock}>{`1   locals {
2     tags                          = { azd-env-name : var.environment_name }
3     sha                           = base64encode(sha256("\${var.environment_name}\${var.location}\${data.azurerm_client_config.current.subscription_id}"))
4     resource_token                = substr(replace(lower(local.sha), "[^A-Za-z0-9_]", ""), 0, 13)
5     api_command_line              = "gunicorn --workers 4 --threads 2 --timeout 60 --access-logfile"
6     cosmos_connection_string_key  = "AZURE-COSMOS-CONNECTION-STRING"
7   }
8   
9   #
10  # Deploy resource Group
11  #
12  
13  resource "azurerm_resource_group" "rg" {
14    name     = "\${var.environment_name}-\${var.location}"
15    location = var.location
16    tags     = local.tags
17  }
18  
19  #
20  # Deploy application insights
21  #
22  
23  module "applicationinsights" {
24    source              = "./modules/applicationinsights"
25    location            = var.location
26    rg_name             = azurerm_resource_group.rg_name.result
27    environment_name    = var.environment_name
28    workspace_id        = module.loganalytics.LOGANALYTICS_WORKSPACE_ID
29    tags                = local.tags
30    resource_token      = local.resource_token
31  }
32  
33  #
34  # Deploy log analytics
35  #
36  
37  module "loganalytics" {
38    source              = "./modules/loganalytics"
39    location            = var.location
40    rg_name             = azurerm_resource_group.rg_name.result
41    tags                = local.tags
42  }`}</pre>
            ) : (
              // VM1 Clone - Bicep code
              <pre className={styles.codeBlock}>{`1   // Parameters
2   param vmName string = 'VM01-clone'
3   param location string = resourceGroup().location
4   param vmSize string = 'Standard_D2s_v3'
5   
6   // Variables
7   var nicName = '\${vmName}-nic'
8   var osDiskName = '\${vmName}-osdisk'
9   var sourceVmId = resourceId('Microsoft.Compute/virtualMachines', 'VM01')
10  
11  // Network Interface
12  resource networkInterface 'Microsoft.Network/networkInterfaces@2023-04-01' = {
13    name: nicName
14    location: location
15    properties: {
16      ipConfigurations: [
17        {
18          name: 'ipconfig1'
19          properties: {
20            subnet: {
21              id: reference(sourceVmId, '2023-03-01').networkProfile.networkInterfaces[0].id
22            }
23            privateIPAllocationMethod: 'Dynamic'
24          }
25        }
26      ]
27    }
28  }
29  
30  // Virtual Machine
31  resource virtualMachine 'Microsoft.Compute/virtualMachines@2023-03-01' = {
32    name: vmName
33    location: location
34    properties: {
35      hardwareProfile: {
36        vmSize: vmSize
37      }
38      storageProfile: {
39        imageReference: {
40          id: reference(sourceVmId, '2023-03-01').storageProfile.imageReference.id
41        }
42        osDisk: {
43          name: osDiskName
44          createOption: 'FromImage'
45          managedDisk: {
46            storageAccountType: 'Premium_LRS'
47          }
48        }
49      }
50      networkProfile: {
51        networkInterfaces: [
52          {
53            id: networkInterface.id
54          }
55        ]
56      }
57    }
58  }
59  
60  // Output
61  output vmId string = virtualMachine.id
62  output vmName string = virtualMachine.name
63  output vmLocation string = virtualMachine.location`}</pre>
            )}
          </div>
        </div>

        {/* CloudShell Panel */}
        <div
          className={mergeClasses(
            styles.cloudShellPanel,
            showCloudShell
              ? styles.cloudShellPanelOpen
              : styles.cloudShellPanelClosed,
          )}
        >
          <div className={styles.cloudShellHeader}>
            <Text className={styles.cloudShellTitle}>CloudShell - Bash</Text>
            <Button
              appearance="subtle"
              icon={<Dismiss24Regular className={styles.cloudShellCloseIcon} />}
              onClick={() => setShowCloudShell(false)}
              title="Close"
            />
          </div>
          <div className={styles.cloudShellContent}>
            <div className={styles.terminalFont}>
              {useTopNav ? (
                // Infrastructure Agent - Terraform deployment
                <>
                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>terraform init</span>
                  </div>
                  <div className={styles.termComment}>
                    # Initializing Terraform...
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # Terraform has been successfully initialized!
                  </div>

                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>terraform plan</span>
                  </div>
                  <div className={styles.termComment}>
                    # Planning infrastructure deployment...
                  </div>
                  <div className={styles.termComment}>
                    # Plan: 15 to add, 0 to change, 0 to destroy
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # Resources: App Service, Cosmos DB, Application Insights,
                    Log Analytics
                  </div>

                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>
                      terraform apply -auto-approve
                    </span>
                  </div>
                  <div className={styles.termComment}>
                    # Deploying React web app with Python API and MongoDB...
                  </div>
                  <div className={styles.termComment}>
                    # Creating resource group...
                  </div>
                  <div className={styles.termComment}>
                    # Provisioning Cosmos DB...
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # Deployment in progress...
                  </div>
                </>
              ) : (
                // VM1 Clone - Azure CLI
                <>
                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>az vm create \</span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --resource-group RG1 \
                    </span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --name VM01-clone \
                    </span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --image UbuntuLTS \
                    </span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --size Standard_D2s_v3 \
                    </span>
                  </div>
                  <div className={styles.termLineIndentedSpaced}>
                    <span className={styles.termCommand}>
                      {" "}
                      --admin-username azureuser
                    </span>
                  </div>

                  <div className={styles.termComment}>
                    # Creating VM01-clone...
                  </div>
                  <div className={styles.termComment}>
                    # Allocating resources...
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # VM created successfully
                  </div>
                </>
              )}

              <div className={styles.termCursorLine}>
                <span className={styles.termPromptUser}>user@cloudshell</span>
                <span className={styles.termSeparator}>:</span>
                <span className={styles.termPath}>~</span>
                <span className={styles.termSeparator}>$ </span>
                <span className={styles.blinkingCursor}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Welcome Modal (Scenario 4) */}
      {showAgentWelcome && (
        <AgentWelcome
          onClose={() => setShowAgentWelcome(false)}
          userName="Connie"
        />
      )}
    </div>
  );
};

export default React.memo(AgentImmersive);
