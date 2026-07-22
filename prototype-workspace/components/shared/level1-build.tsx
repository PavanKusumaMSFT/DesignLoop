"use client";

import { useState, useEffect, useRef } from "react";
import { tokens as fluentTokens } from "@fluentui/react-theme";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Search24Regular,
  Bot24Regular,
  Document24Regular,
  Cube24Regular,
  FolderOpen24Regular,
  Database24Regular,
  DocumentFolder16Regular,
  Layer24Regular,
  ChevronDown24Regular,
  Folder24Regular,
  Shield24Regular,
  Gauge24Regular,
  Lightbulb24Regular,
  Server24Regular,
  Add24Regular,
  ArrowUp24Regular,
  Apps24Filled,
  CheckmarkCircle24Filled,
  Warning24Filled,
  Globe24Regular,
  ArrowRight24Filled,
  Mic24Regular,
  Attach24Regular,
  ArrowUpload24Regular,
  Dismiss16Regular,
  Star16Filled,
  Storage24Regular,
  Desktop24Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";
import {
  FluentProvider,
  Button as FluentButton,
  Text,
  webLightTheme,
  Dropdown,
  Option,
  Card,
  CardHeader,
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  CarouselSlider,
} from "@fluentui/react-components";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import type { DropdownProps } from "@fluentui/react-components";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { EnhancedInputBar } from "./enhanced-input-bar";
import { NextStepsCarousel, NextStepsCard } from "./next-steps-carousel";

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
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
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
  fluentDropdown: {
    minWidth: "240px",
    maxWidth: "320px",
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
    borderRadius: "32px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "8px 8px 8px 16px",
    maxWidth: "768px",
    marginLeft: "0",
    marginRight: "auto",
    marginBottom: "32px",
    transition: "all 0.3s ease",
    height: "56px",
    position: "relative",
  },
  searchWrapperAgentMode: {
    height: "auto",
    minHeight: "80px",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "12px",
    padding: "16px",
  },
  floatingCopilot: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 1000,
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    transform: "translateY(100px)",
    opacity: 0,
  },
  floatingCopilotVisible: {
    transform: "translateY(0)",
    opacity: 1,
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    margin: "0 8px",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
    resize: "none",
    minHeight: "24px",
    maxHeight: "120px",
    overflowY: "auto",
  },
  plusIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
    cursor: "pointer",
  },
  submitButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
    flexShrink: 0,
    padding: "4px",
  },
  submitButtonInner: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
  },
  submitButtonInnerActive: {
    backgroundColor: tokens.colorBrandForeground1,
  },
  submitButtonFadeIn: {
    animation: "fadeIn 200ms ease-in",
  },
  submitButtonHover: {
    backgroundColor: tokens.colorBrandForeground2,
    transform: "scale(1.05)",
  },
  submitButtonPressed: {
    backgroundColor: tokens.colorBrandForeground2,
    transform: "scale(0.95)",
  },
  micButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
    flexShrink: 0,
    padding: "4px",
  },
  micButtonInner: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
  },
  micButtonHover: {
    backgroundColor: tokens.colorBrandForeground1,
    color: "white",
  },
  micButtonPressed: {
    backgroundColor: tokens.colorBrandForeground1,
    color: "white",
    boxShadow: "0 0 0 8px rgba(98, 100, 167, 0.2)",
  },
  micButtonRecording: {
    backgroundColor: tokens.colorBrandForeground1,
    color: "white",
    animation: "pulseRing 1.5s ease-in-out infinite",
  },
  agentPill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
  },
  agentPillHover: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  agentActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  attachmentMenu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)",
    padding: "8px",
    width: "240px",
    zIndex: 1001,
  },
  attachmentMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 16px",
    height: "40px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    transitionDuration: "200ms",
  },
  attachmentMenuIcon: {
    width: "20px",
    height: "20px",
    fontSize: "20px",
    color: tokens.colorNeutralForeground2,
  },
  attachmentMenuText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    fontWeight: "400",
  },
  copilotButton: {
    borderRadius: "24px",
    marginLeft: "-4px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
    border: "1px solid transparent",
    position: "relative",
  },
  projectOverview: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
  },
  projectHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
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
  viewToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  viewButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  viewButtonActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  viewButtonInactive: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  topologyView: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "32px",
    height: "400px",
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
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2,
      border: `2px dashed ${tokens.colorBrandStroke1}`,
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
  nextStepsCarousel: {
    marginBottom: "32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    padding: "24px",
    width: "100%",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
  },
  nextStepsHeader: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: tokens.colorNeutralForeground1,
  },
  carouselContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  carouselContent: {
    display: "flex",
    gap: "16px",
    overflow: "hidden",
    flex: 1,
  },
  carouselSlider: {
    gap: "16px",
  },
  carouselCardWrapper: {
    maxWidth: "calc(50% - 8px)",
    minWidth: "300px",
  },
  carouselCard: {
    width: "100%",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "12px",
    padding: "16px",
    border: "none",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  carouselCardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  carouselCardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
    lineHeight: "1.5",
  },
  carouselCardProgress: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
  },
  carouselCardProgressBar: {
    height: "2px",
    backgroundColor: tokens.colorNeutralBackground6,
    borderRadius: "2px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  carouselCardProgressFill: {
    height: "100%",
    backgroundColor: tokens.colorBrandForeground1,
    transition: "width 0.3s ease",
  },
  carouselCardButtons: {
    display: "flex",
    gap: "8px",
    marginTop: "auto",
    marginBottom: "0px",
  },
  carouselButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    ":disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
  carouselDots: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    marginTop: "16px",
  },
  carouselDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralStroke2,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  carouselDotActive: {
    backgroundColor: tokens.colorNeutralForeground1,
    width: "24px",
    borderRadius: "4px",
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
  topActionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    position: "relative",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    minHeight: "140px",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  topActionCardBorder: {
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    width: "4px",
    borderRadius: "4px 0 0 4px",
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
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
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
  chevronSmall: {
    fontSize: tokens.fontSizeBase300,
  },
  projectsHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  newProjectBtn: {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  searchProjectBtn: {
    width: "100%",
    maxWidth: "400px",
    justifyContent: "flex-start",
    marginBottom: tokens.spacingVerticalL,
    color: tokens.colorNeutralForeground3,
    borderTopColor: tokens.colorNeutralStroke1,
    borderRightColor: tokens.colorNeutralStroke1,
    borderBottomColor: tokens.colorNeutralStroke1,
    borderLeftColor: tokens.colorNeutralStroke1,
  },
  topoRelative: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
  },
  topoRelativeOverflow: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  topoFlexLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: "0 60px",
    position: "relative" as const,
    zIndex: 2,
  },
  topoColumn: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: tokens.spacingVerticalS,
  },
  topoIconBoxBrand: {
    width: "80px",
    height: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `2px solid ${tokens.colorBrandBackground}`,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  topoIconBoxNeutral: {
    width: "80px",
    height: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  topoLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  topoSublabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  svgOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none" as const,
  },
  smbLeftServices: {
    position: "absolute" as const,
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalXL,
    zIndex: 2,
  },
  smbServiceItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  smbServiceDot: {
    width: "8px",
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "50%",
  },
  smbCenterHub: {
    position: "absolute" as const,
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
  smbRightServices: {
    position: "absolute" as const,
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalXL,
    zIndex: 2,
  },
  smbRightServiceItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    justifyContent: "flex-end",
  },
  entLeftServices: {
    position: "absolute" as const,
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    zIndex: 2,
  },
  entServiceItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: tokens.colorNeutralForeground1,
  },
  entServiceDot: {
    width: "6px",
    height: "6px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "50%",
  },
  entCenterMesh: {
    position: "absolute" as const,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    zIndex: 2,
  },
  entRightServices: {
    position: "absolute" as const,
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    zIndex: 2,
  },
  entRightServiceItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: tokens.colorNeutralForeground1,
    justifyContent: "flex-end",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  flexRowGap8: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  flexRowGap4: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  brandColorText: {
    color: tokens.colorBrandForeground1,
  },
  statusDotGreen: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  cellIndented: {
    paddingLeft: "48px",
  },
  iconBrand20: {
    fontSize: "20px",
    color: tokens.colorBrandForeground1,
  },
  iconBrand16: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorBrandForeground1,
  },
  secondaryLabel: {
    color: tokens.colorNeutralForeground3,
  },
  emptyStateContainer: {
    padding: "40px",
    textAlign: "center" as const,
    color: tokens.colorNeutralForeground2,
    maxWidth: "500px",
  },
  emptyStateTitle: {
    fontSize: tokens.fontSizeBase400,
    marginBottom: tokens.spacingVerticalM,
    fontWeight: tokens.fontWeightSemibold,
  },
  emptyStateDesc: {
    fontSize: tokens.fontSizeBase300,
  },
  sgHeaderFlex: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  sgName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  sgMembers: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalS,
  },
  sgMetaFlex: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    fontSize: tokens.fontSizeBase200,
  },
  healthyIcon: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorPaletteGreenForeground1,
  },
  warningIcon: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorPaletteRedForeground1,
  },
  projectsGridCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "300px",
  },
  cursorDefault: {
    cursor: "default",
  },
  statusDotOrange: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
  },
  entMeshNodeBase: {
    width: "20px",
    height: "20px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "50%",
  },
  entMeshNodeCenter: {
    backgroundColor: tokens.colorBrandForeground1,
    opacity: 1,
  },
  entMeshNodeOther: {
    backgroundColor: tokens.colorNeutralBackground3,
    opacity: "0.7" as unknown as number,
  },
  chevronIcon: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
    transition: "transform 0.2s",
  },
  chevronCollapsed: {
    transform: "rotate(-90deg)",
  },
});

interface Level1BuildProps {
  experienceLevel: "new" | "smb" | "enterprise";
}

const Level1BuildContent = ({ experienceLevel }: Level1BuildProps) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [showFloatingCopilot, setShowFloatingCopilot] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] =
    useState("All projects");
  const [selectedScope, setSelectedScope] = useState("All subscriptions");
  const [selectedSubscription, setSelectedSubscription] = useState(
    "Azure subscription 1",
  );
  const [solutionGrouping, setSolutionGrouping] = useState<
    "resources" | "service-groups" | "architecture"
  >("resources");
  const [searchValue, setSearchValue] = useState("");
  const [isProjectExpanded, setIsProjectExpanded] = useState(true);

  const getSelectedOption = () => {
    switch (experienceLevel) {
      case "new":
        return selectedSubscription;
      case "smb":
        return "All projects";
      case "enterprise":
        return selectedServiceGroup;
      default:
        return selectedSubscription;
    }
  };

  const getSelectedScope = () => {
    return selectedScope;
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

  const getScopeOptions = () => {
    return [
      { label: "All subscriptions" },
      { label: "Production only" },
      { label: "Non-Production only" },
      { label: "Auth Service Prod" },
      { label: "Payment Service Prod" },
    ];
  };

  const getSearchPlaceholder = () => {
    switch (experienceLevel) {
      case "new":
        return "Search or ask Copilot for help (Ctrl + K)";
      case "smb":
        return "Search resources or ask Copilot (Ctrl + K)";
      case "enterprise":
        return "Search enterprise resources or ask Copilot (Ctrl + K)";
      default:
        return "Search or ask Copilot (Ctrl + K)";
    }
  };

  const getActionCards = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            icon: <Lightbulb24Regular />,
            title: "Learning Resources",
            description:
              "Access tutorials and documentation to get started with Azure.",
          },
          {
            icon: <Bot24Regular />,
            title: "Get Help",
            description:
              "Ask Copilot questions about your resources and next steps.",
          },
          {
            icon: <Shield24Regular />,
            title: "Security Basics",
            description:
              "Learn fundamental security practices for your applications.",
          },
          {
            icon: <Gauge24Regular />,
            title: "Monitor Usage",
            description: "Track your free tier usage and understand billing.",
          },
        ];
      case "smb":
        return [
          {
            icon: <Bot24Regular />,
            title: "Cost Optimization",
            description:
              "Review recommendations to reduce spending by 15% across environments.",
          },
          {
            icon: <Shield24Regular />,
            title: "Business Continuity",
            description:
              "Set up backup and disaster recovery for critical workloads.",
          },
          {
            icon: <Gauge24Regular />,
            title: "Performance Insights",
            description: "Monitor application performance and user experience.",
          },
          {
            icon: <Lightbulb24Regular />,
            title: "Scaling Strategy",
            description: "Plan resource scaling for seasonal business demands.",
          },
        ];
      case "enterprise":
        return [
          {
            icon: <Bot24Regular />,
            title: "Enterprise Governance",
            description:
              "Review and optimize policies across all subscriptions and regions.",
          },
          {
            icon: <Shield24Regular />,
            title: "Security Posture",
            description:
              "Advanced threat protection and compliance monitoring across the enterprise.",
          },
          {
            icon: <Gauge24Regular />,
            title: "Global Performance",
            description:
              "Multi-region performance analytics and optimization recommendations.",
          },
          {
            icon: <Lightbulb24Regular />,
            title: "Innovation Pipeline",
            description:
              "Explore emerging Azure services for competitive advantage.",
          },
        ];
      default:
        return [];
    }
  };

  const getTopActionCards = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            icon: <Lightbulb24Regular />,
            title: "Continue where you left off deploying your VM",
            button: "Create",
            // eslint-disable-next-line no-restricted-syntax
            color: "#0078d4",
            isPrimary: true,
            link: "continue-work-2",
          },
          {
            icon: <Bot24Regular />,
            title: "Create a new workload based off my existing infrastructure",
            button: "Open infrastructure agent",
            // eslint-disable-next-line no-restricted-syntax
            color: "#8b5cf6",
            isPrimary: true,
            isInfrastructureAgent: true,
          },
          {
            icon: <Shield24Regular />,
            title: "Learn about Azure security basics",
            button: "Learn More",
            // eslint-disable-next-line no-restricted-syntax
            color: "#06b6d4",
            isPrimary: false,
          },
        ];
      case "smb":
        return [
          {
            icon: <Database24Regular />,
            title: "Deploy new database for customer analytics",
            button: "Create Database",
            // eslint-disable-next-line no-restricted-syntax
            color: "#10b981",
            isPrimary: true,
          },
          {
            icon: <Bot24Regular />,
            title: "Create new workload based off my existing infrastructure",
            button: "Open infrastructure agent",
            // eslint-disable-next-line no-restricted-syntax
            color: "#8b5cf6",
            isPrimary: true,
            isInfrastructureAgent: true,
          },
          {
            icon: <Add24Regular />,
            title: "Expand production capacity for seasonal business growth",
            button: "Add Capacity",
            // eslint-disable-next-line no-restricted-syntax
            color: "#0078d4",
            isPrimary: false,
          },
        ];
      case "enterprise":
        return [
          {
            icon: <Add24Regular />,
            title: "Launch new data lake for analytics expansion",
            button: "Create Data Lake",
            // eslint-disable-next-line no-restricted-syntax
            color: "#0078d4",
            isPrimary: true,
          },
          {
            icon: <Server24Regular />,
            title: "Provision new subscription for acquired division",
            button: "Create Subscription",
            // eslint-disable-next-line no-restricted-syntax
            color: "#10b981",
            isPrimary: true,
          },
          {
            icon: <Bot24Regular />,
            title: "Deploy containerized workloads to new AKS cluster",
            button: "Deploy Workload",
            // eslint-disable-next-line no-restricted-syntax
            color: "#8b5cf6",
            isPrimary: true,
            isInfrastructureAgent: true,
          },
        ];
      default:
        return [];
    }
  };

  const getResourceData = () => {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingCopilot(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownOptions = getDropdownOptions();
  const topActionCards = getTopActionCards();
  const resourceData = getResourceData();
  const actionCards = getActionCards();

  const getNextStepsCards = (): NextStepsCard[] => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            title: "Continue where you left off deploying your new VM",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            progress: 73,
            buttons: [
              {
                label: "Resume deployment",
                primary: true,
                onClick: () => handlePageChange("create-vm-wizard"),
              },
            ],
          },
          {
            title:
              "Expand your container app into a full-stack web application",
            badge: "Agent-supported task",
            description:
              "Add a managed database, secure secrets, and monitoring to your existing container app using this ready-to-deploy architecture.",
            buttons: [
              {
                label: "Deploy with Copilot",
                primary: true,
                icon: true,
                onClick: () =>
                  handlePageChange("agent-immersive-vnext-scenario2"),
              },
              { label: "Set up manually", primary: false },
            ],
          },
          {
            title: "Learn about Azure security basics",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [{ label: "Learn More", primary: false }],
          },
          {
            title: "Create a new workload based off my existing infrastructure",
            badge: "Agent-supported task",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [
              {
                label: "Open infrastructure agent",
                primary: true,
                icon: true,
                onClick: () =>
                  handlePageChange("agent-immersive-vnext-scenario2"),
              },
            ],
          },
        ];
      case "smb":
        return [
          {
            title: "Deploy new database for customer analytics",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [{ label: "Create Database", primary: true }],
          },
          {
            title: "Create new workload based off my existing infrastructure",
            badge: "Agent-supported task",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [
              {
                label: "Open infrastructure agent",
                primary: true,
                icon: true,
                onClick: () =>
                  handlePageChange("agent-immersive-vnext-scenario2"),
              },
            ],
          },
          {
            title: "Expand production capacity for seasonal business growth",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [{ label: "Add Capacity", primary: false }],
          },
          {
            title: "Cost Optimization",
            description:
              "Review recommendations to reduce spending by 15% across environments.",
            buttons: [{ label: "View recommendations", primary: false }],
          },
        ];
      case "enterprise":
        return [
          {
            title: "Launch new data lake for analytics expansion",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [{ label: "Create Data Lake", primary: true }],
          },
          {
            title: "Provision new subscription for acquired division",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [{ label: "Create Subscription", primary: true }],
          },
          {
            title: "Deploy containerized workloads to new AKS cluster",
            badge: "Agent-supported task",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttons: [{ label: "Deploy Workload", primary: true, icon: true }],
          },
          {
            title: "Enterprise Governance",
            description:
              "Review and optimize policies across all subscriptions and regions.",
            buttons: [{ label: "Review policies", primary: false }],
          },
        ];
      default:
        return [];
    }
  };

  const nextStepsCards = getNextStepsCards();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <div className={styles.stickyNav}>
          <TopNav activeLink="Build" experienceLevel={experienceLevel} />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              Build
            </Text>
            <div className={styles.headerRight}>
              {experienceLevel !== "new" && (
                <>
                  <div className={styles.dropdown}>
                    <div
                      className={styles.dropdownButton}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <span>{getSelectedOption()}</span>
                      <ChevronDown24Regular className={styles.chevronSmall} />
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
                        <span>{getSelectedScope()}</span>
                        <ChevronDown24Regular className={styles.chevronSmall} />
                      </div>
                      {showScopeDropdown && (
                        <div className={styles.dropdownContent}>
                          {getScopeOptions().map((option, index) => (
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
                </>
              )}
            </div>
          </div>

          <EnhancedInputBar
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={(value) => console.log("Submit:", value)}
            placeholder="Message Copilot"
          />

          <NextStepsCarousel cards={nextStepsCards} />

          <div className={styles.projectOverview}>
            <div className={styles.projectsHeaderRow}>
              <div className={styles.projectTitle}>Projects</div>
              <FluentButton
                appearance="primary"
                className={styles.newProjectBtn}
              >
                + New Project
              </FluentButton>
            </div>

            <FluentButton
              appearance="outline"
              icon={<Search24Regular />}
              className={styles.searchProjectBtn}
            >
              Search projects
            </FluentButton>

            {solutionGrouping === "architecture" && (
              <div className={styles.topologyView}>
                {experienceLevel === "new" && (
                  <div className={styles.topoRelative}>
                    <div className={styles.topoFlexLayout}>
                      {/* Frontend */}
                      <div className={styles.topoColumn}>
                        <div className={styles.topoIconBoxBrand}>
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
                        <div className={styles.topoLabel}>Frontend</div>
                        <div className={styles.topoSublabel}>React App</div>
                      </div>

                      {/* Backend */}
                      <div className={styles.topoColumn}>
                        <div className={styles.topoIconBoxNeutral}>
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
                        <div className={styles.topoLabel}>Backend</div>
                        <div className={styles.topoSublabel}>API Server</div>
                      </div>

                      {/* Database */}
                      <div className={styles.topoColumn}>
                        <div className={styles.topoIconBoxNeutral}>
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
                        <div className={styles.topoLabel}>Database</div>
                        <div className={styles.topoSublabel}>SQL Server</div>
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
                  <div className={styles.topoRelativeOverflow}>
                    {/* Left side services */}
                    <div className={styles.smbLeftServices}>
                      {[
                        "Web App",
                        "Mobile App",
                        "API Gateway",
                        "Load Balancer",
                      ].map((service, i) => (
                        <div key={i} className={styles.smbServiceItem}>
                          <div className={styles.smbServiceDot} />
                          {service}
                        </div>
                      ))}
                    </div>

                    {/* Center hub */}
                    <div className={styles.smbCenterHub}>☁️</div>

                    {/* Right side services */}
                    <div className={styles.smbRightServices}>
                      {[
                        "SQL Database",
                        "Redis Cache",
                        "Blob Storage",
                        "Key Vault",
                      ].map((service, i) => (
                        <div key={i} className={styles.smbRightServiceItem}>
                          {service}
                          <div className={styles.smbServiceDot} />
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
                  <div className={styles.topoRelativeOverflow}>
                    {/* Left side services */}
                    <div className={styles.entLeftServices}>
                      {[
                        "Infrastructure",
                        "Security",
                        "DevOps",
                        "Web",
                        "Mobile",
                        "Network",
                      ].map((service, i) => (
                        <div key={i} className={styles.entServiceItem}>
                          <div className={styles.entServiceDot} />
                          {service}
                        </div>
                      ))}
                    </div>

                    {/* Center mesh of nodes */}
                    <div className={styles.entCenterMesh}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                          key={i}
                          className={mergeClasses(
                            styles.entMeshNodeBase,
                            i === 4
                              ? styles.entMeshNodeCenter
                              : styles.entMeshNodeOther,
                          )}
                        />
                      ))}
                    </div>

                    {/* Right side services */}
                    <div className={styles.entRightServices}>
                      {[
                        "Kubernetes",
                        "Synthetics",
                        "Serverless",
                        "APM",
                        "Monitoring",
                        "Analytics",
                      ].map((service, i) => (
                        <div key={i} className={styles.entRightServiceItem}>
                          {service}
                          <div className={styles.entServiceDot} />
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

            {solutionGrouping === "resources" && (
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
                              className={mergeClasses(
                                styles.chevronIcon,
                                !isProjectExpanded && styles.chevronCollapsed,
                              )}
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
                            <div className={styles.statusDotGreen} />
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
                                <div className={styles.statusDotGreen} />
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
                                <div className={styles.statusDotGreen} />
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
                                <div className={styles.statusDotGreen} />
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
                    resourceData.map((resource, index) => (
                      <tr
                        key={index}
                        className={
                          resource.name === "Checkout"
                            ? styles.cursorPointer
                            : styles.cursorDefault
                        }
                        onClick={() => {
                          if (resource.name === "Checkout") {
                            handlePageChange("project-detail");
                          }
                        }}
                      >
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.flexRowGap8}>
                            <div className={styles.brandColorText}>
                              {resource.icon}
                            </div>
                            <span className={styles.brandColorText}>
                              {resource.name}
                            </span>
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          {resource.type}
                        </td>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.flexRowGap4}>
                            <div className={styles.statusDotGreen} />
                            {resource.status}
                          </div>
                        </td>
                        <td
                          className={mergeClasses(
                            styles.resourcesTableCell,
                            styles.brandColorText,
                          )}
                        >
                          {resource.cost}
                        </td>
                        <td className={styles.resourcesTableCell}>
                          {resource.lastViewed}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {solutionGrouping === "service-groups" && (
              <div
                className={mergeClasses(
                  styles.projectsGrid,
                  experienceLevel === "new" ? styles.projectsGridCentered : "",
                )}
              >
                {experienceLevel === "new" ? (
                  <div className={styles.emptyStateContainer}>
                    <div className={styles.emptyStateTitle}>
                      No service groups yet
                    </div>
                    <div className={styles.emptyStateDesc}>
                      Service groups help organize resources that share a common
                      purpose. Create your first one when you're ready!
                    </div>
                  </div>
                ) : experienceLevel === "smb" ? (
                  <>
                    {[
                      {
                        name: "Authentication Service",
                        members: "234 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        healthColor: tokens.colorPaletteGreenForeground1,
                      },
                      {
                        name: "Payment Service",
                        members: "456 members",
                        health: "Warning",
                        resilience: "Not resilient",
                        healthColor: tokens.colorPaletteDarkOrangeForeground1,
                      },
                    ].map((group, i) => (
                      <div key={i} className={styles.projectCard}>
                        <div className={styles.sgHeaderFlex}>
                          <Apps24Filled className={styles.iconBrand20} />
                          <span className={styles.sgName}>{group.name}</span>
                        </div>
                        <div className={styles.sgMembers}>{group.members}</div>
                        <div className={styles.sgMetaFlex}>
                          <div className={styles.flexRowGap4}>
                            <div
                              className={
                                group.health === "Healthy"
                                  ? styles.statusDotGreen
                                  : styles.statusDotOrange
                              }
                            />
                            <span className={styles.secondaryLabel}>
                              {group.health}
                            </span>
                          </div>
                          <div className={styles.flexRowGap4}>
                            {group.health === "Healthy" ? (
                              <Globe24Regular className={styles.healthyIcon} />
                            ) : (
                              <Warning24Filled className={styles.warningIcon} />
                            )}
                            <span className={styles.secondaryLabel}>
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
                        healthColor: tokens.colorPaletteGreenForeground1,
                      },
                      {
                        name: "Authentication Service",
                        members: "234 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        healthColor: tokens.colorPaletteGreenForeground1,
                      },
                      {
                        name: "Payment Service",
                        members: "456 members",
                        health: "Warning",
                        resilience: "Not resilient",
                        healthColor: tokens.colorPaletteDarkOrangeForeground1,
                      },
                      {
                        name: "Infrastructure Services",
                        members: "789 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        healthColor: tokens.colorPaletteGreenForeground1,
                      },
                    ].map((group, i) => (
                      <div key={i} className={styles.projectCard}>
                        <div className={styles.sgHeaderFlex}>
                          <Apps24Filled className={styles.iconBrand20} />
                          <span className={styles.sgName}>{group.name}</span>
                        </div>
                        <div className={styles.sgMembers}>{group.members}</div>
                        <div className={styles.sgMetaFlex}>
                          <div className={styles.flexRowGap4}>
                            <div
                              className={
                                group.health === "Healthy"
                                  ? styles.statusDotGreen
                                  : styles.statusDotOrange
                              }
                            />
                            <span className={styles.secondaryLabel}>
                              {group.health}
                            </span>
                          </div>
                          <div className={styles.flexRowGap4}>
                            {group.health === "Healthy" ? (
                              <Globe24Regular className={styles.healthyIcon} />
                            ) : (
                              <Warning24Filled className={styles.warningIcon} />
                            )}
                            <span className={styles.secondaryLabel}>
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
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

/** Level 1 "Build" section page with service group selection, template carousel,
 * and health/resilience status indicators. Content adapts to experience level (new/smb/enterprise).
 * Composed from: TopNav, EnhancedInputBar, NextStepsCarousel, and service group cards.
 * Instead of: building a monolithic create/build page with inline dropdowns and carousels. */
const Level1Build = ({ experienceLevel }: Level1BuildProps) => {
  return <Level1BuildContent experienceLevel={experienceLevel} />;
};

export default Level1Build;
