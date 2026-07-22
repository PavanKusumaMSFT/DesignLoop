/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  FluentProvider,
  webLightTheme,
  Button as FluentButton,
  Text,
  Subtitle2, // Added Subtitle2 import for section headers
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  MessageBar,
  MessageBarBody,
  MessageBarActions,
  Card,
  CardPreview,
  CompoundButton, // Added CompoundButton import
} from "@fluentui/react-components";
import {
  Search24Regular,
  Alert24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Document24Regular,
  Globe24Regular,
  Bot24Regular,
  Cube24Regular as CopilotIcon, // Added Cube24Regular icon for Ask Copilot button
  GridDots24Regular, // Added GridDots24Regular import
  FolderOpen24Regular, // Added FolderOpen24Regular import for Github import card
  MoreHorizontal24Regular, // Added MoreHorizontal24Regular for ellipsis icon
  ThumbLike24Regular, // Added ThumbLike24Regular for like icon
  ThumbDislike24Regular, // Added ThumbDislike24Regular for dislike icon
  Add24Regular, // Added Add24Regular for plus icon
  ArrowRight24Filled, // Added ArrowRight24Filled for submit button
  Mic24Regular, // Added Mic24Regular for microphone
  Attach24Regular, // Added Attach24Regular for add work content
  ArrowUpload24Regular, // Added ArrowUpload24Regular for upload
  Sparkle24Regular, // Added Sparkle24Regular for agent mode
  MusicNote224Regular, // Added MusicNote224Regular for voice waveform
  Dismiss16Regular, // Added Dismiss16Regular for close button
} from "@fluentui/react-icons";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "../../../lib/navigation-context"; // Added navigation context import
import { TopNav } from "../../shared/top-nav";
import HpCopilotSuggestionPanel from "../../shared/hp-copilot-suggestion-panel";
import CanvasFooter from "../vnext-agent/shared/canvas-footer";
import CanvasHeader from "../vnext-agent/shared/canvas-header";
import ServiceRecommendations from "../vnext-agent/service-recommendations";

// Create a type-safe version of tokens that won't cause TypeScript errors
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type AzurePortalProps = {
  experienceLevel?: "new" | "smb" | "enterprise";
  version?: "v1" | "v2";
  source?: string;
  onNavigateToSearch?: (query: string) => void;
};

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  containerExpanded: {
    minHeight: "calc(100vh + 100px)",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    transition: "all 0.3s ease-out",
  },
  contentWrapperWithPanel: {
    display: "flex",
    flex: 1,
    transition: "all 0.3s ease-out",
  },
  mainContent: {
    flex: 1,
    padding: "48px 32px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    transition: "all 0.3s ease-out",
  },
  mainContentWithPanel: {
    flex: 1,
    padding: "48px 32px",
    maxWidth: "800px", // Reduced max width when panel is open
    margin: "0 auto",
    width: "100%",
    transition: "all 0.3s ease-out",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  creditsInfo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: "8px 16px",
    borderRadius: "16px",
    fontSize: "14px",
    justifyContent: "center",
  },
  searchContainer: {
    width: "100%",
    maxWidth: "768px",
    margin: "0 auto",
    padding: "0 16px",
    minHeight: "56px",
    display: "block",
    marginBottom: "32px", // Added margin bottom for spacing
    position: "relative", // Added position relative to establish positioning context for dropdown
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "32px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.14)",
    padding: "8px 8px 8px 16px",
    maxWidth: "768px",
    margin: "0 auto",
    height: "56px",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
  },
  searchWrapperAgentMode: {
    height: "auto",
    minHeight: "80px",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "12px",
    padding: "16px",
  },
  searchWrapperHover: {
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    fontFamily: "inherit",
    resize: "none",
    minHeight: "24px",
    maxHeight: "120px",
    overflowY: "auto",
  },
  searchInputAutoExpand: {
    flex: 1,
    padding: "8px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    fontFamily: "inherit",
    resize: "none",
    minHeight: "24px",
    maxHeight: "120px",
    overflowY: "auto",
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
    backgroundColor: tokens.colorNeutralBackground3,
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
  plusIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
    cursor: "pointer",
  },
  attachmentMenu: {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    left: "16px",
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
    fontWeight: "500",
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
  },
  agentPillHover: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  agentActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  copilotButton: {
    borderRadius: "24px",
    marginLeft: "-4px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
    border: "1px solid transparent",
    position: "relative",
  },
  copilotIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #0078d4, #8b5cf6, #ec4899)",
  },
  dropdown: {
    position: "absolute",
    bottom: "100%", // Changed from top: "100%" to bottom: "100%" to position dropdown above search bar
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 28px)" /* Account for the 28px difference */,
    maxWidth: "calc(768px - 28px)" /* Account for the 28px difference */,
    marginBottom: "8px", // Changed from marginTop to marginBottom since dropdown is now above
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow16,
    zIndex: 10,
    overflowY: "auto",
    maxHeight: "400px", // Limit maximum height to prevent covering too much of the screen
  },
  categoryHeader: {
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  suggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  crossPlatformAlert: {
    padding: "12px 16px",
    backgroundColor: tokens.colorBrandBackground2,
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
    marginBottom: "8px",
  },
  seeMoreButton: {
    color: `${tokens.colorBrandForeground1} !important`,
    "&:hover": {
      color: `${tokens.colorBrandForeground2Hover} !important`,
    },
  },
  actionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "48px",
    marginTop: "64px", // Added margin-top to increase spacing between search bar and action cards
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  actionCardsWithPanel: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Use 2 columns when panel is open instead of 4
    gap: "24px",
    marginBottom: "48px",
    marginTop: "64px",
    "@media (max-width: 900px)": {
      // Adjusted breakpoint for panel context
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
  },
  workloadAgentItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow8,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "4px",
      background: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
    },
  },

  // --- Converted from inline styles ---
  searchSuggestionIcon: {
    width: "16px",
    height: "16px",
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  creditsWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  skeletonLine: {
    height: "12px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "6px",
    marginBottom: "4px",
  },
  skeletonLineNoMargin: {
    height: "12px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "6px",
  },
  discoverMoreWrapper: {
    textAlign: "center",
    marginTop: "-16px",
  },
  discoverMoreButton: {
    background: "none",
    border: "none",
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
    textDecoration: "underline",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  },
  searchContainerMarginTop: {
    marginTop: "40px",
  },
  textareaWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    width: "100%",
  },
  textareaAutoHeight: {
    height: "auto",
    minHeight: "24px",
  },
  agentDivider: {
    width: "1px",
    height: "24px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "0 8px",
  },
  agentPillIconImg: {
    width: "16px",
    height: "16px",
  },
  dismissIconSmall: {
    width: "12px",
    height: "12px",
    marginLeft: "4px",
  },
  flexSpacer: {
    flex: 1,
  },
  plusIconMarginTop: {
    marginTop: "8px",
  },
  copilotPanel: {
    width: "400px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column" as const,
    animationName: "slideInRight",
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    flexShrink: 0,
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  panelTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  panelHeaderActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  smallIconButton: {
    minWidth: "32px",
    height: "32px",
  },
  panelCloseButton: {
    minWidth: "32px",
    height: "32px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  chatContent: {
    flex: 1,
    padding: "20px",
    overflowY: "auto" as const,
  },
  userMessageRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "16px",
  },
  userMessageBubble: {
    backgroundColor: "#E3F2FD",
    padding: "12px 16px",
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "80%",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  chatSkeletonLine: {
    height: "16px",
    backgroundColor: "#c0c0c0",
    borderRadius: "8px",
    width: "140px",
  },
  copilotResponseSection: {
    marginBottom: "20px",
  },
  copilotLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  copilotNameText: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
  },
  disclaimerText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  responseBody: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  responseSkeletonLine: {
    height: "14px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "7px",
    marginBottom: "8px",
  },
  responseSkeletonLineNoMargin: {
    height: "14px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "7px",
  },
  feedbackRow: {
    display: "flex",
    gap: "8px",
  },
  feedbackButton: {
    minWidth: "32px",
    height: "32px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
  },
  panelInputArea: {
    padding: "16px 20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  panelInputWrapper: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  panelTextInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    resize: "none" as const,
    minHeight: "20px",
    maxHeight: "100px",
  },
  inputActionsRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  charCountText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap" as const,
  },
  sendButtonBase: {
    minWidth: "32px",
    height: "32px",
  },
  sendButtonActive: {
    color: tokens.colorBrandForeground1,
  },
  sendButtonInactive: {
    color: tokens.colorNeutralForeground3,
  },
  w50: { width: "50%" },
  w60: { width: "60%" },
  w70: { width: "70%" },
  w75: { width: "75%" },
  w80: { width: "80%" },
  w85: { width: "85%" },
  w88: { width: "88%" },
  w90: { width: "90%" },
  w92: { width: "92%" },
  w95: { width: "95%" },
  w100: { width: "100%" },
});

const CopilotSVGIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6691 1.98972C11.4685 1.39807 10.9132 1 10.2884 1L9.38791 1C8.68681 1 8.085 1.49905 7.95523 2.18803L7.02393 7.13282L7.48695 5.54883C7.66865 4.92722 8.23863 4.5 8.88625 4.5L11.765 4.5L13.0095 6.12858L14.1175 4.5L13.5653 4.5C12.9406 4.5 12.3853 4.10193 12.1847 3.51027L11.6691 1.98972Z"
      fill="url(#paint0_radial_4407_38935)"
    />
    <path
      d="M4.50309 14.0036C4.70167 14.5987 5.25866 15 5.88598 15H7.35221C8.14798 15 8.79674 14.3619 8.80987 13.5662L8.88301 9.13477L8.49768 10.4516C8.31584 11.073 7.74595 11.5 7.09849 11.5L4.20857 11.5L2.97822 10.4147L2.07031 11.5H2.61719C3.24451 11.5 3.80149 11.9013 4.00008 12.4964L4.50309 14.0036Z"
      fill="url(#paint1_radial_4407_38935)"
    />
    <path
      d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
      fill="url(#paint2_linear_4407_38935)"
    />
    <path
      d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
      fill="url(#paint3_linear_4407_38935)"
    />
    <path
      d="M5.99951 15H11.8324C13.4989 15 14.4988 12.7979 15.1655 10.5958C15.9552 7.98689 16.9887 4.49768 13.9989 4.49768H11.3097C10.658 4.49768 10.0859 4.92848 9.90686 5.55508C9.47862 7.05377 8.67685 9.84782 8.05199 11.9563C7.74566 12.99 7.49051 13.8777 7.09891 14.4305C6.87936 14.7405 6.51346 15 5.99951 15Z"
      fill="url(#paint4_radial_4407_38935)"
    />
    <path
      d="M5.99951 15H11.8324C13.4989 15 14.4988 12.7979 15.1655 10.5958C15.9552 7.98689 16.9887 4.49768 13.9989 4.49768H11.3097C10.658 4.49768 10.0859 4.92848 9.90686 5.55508C9.47862 7.05377 8.67685 9.84782 8.05199 11.9563C7.74566 12.99 7.49051 13.8777 7.09891 14.4305C6.87936 14.7405 6.51346 15 5.99951 15Z"
      fill="url(#paint5_radial_4407_38935)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(-4.01994 -5.00476 -4.34022 4.19783 13.0846 7.1729)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0955758" stopColor="#00AEFF" />
        <stop offset="0.773185" stopColor="#2253CE" />
        <stop offset="1" stopColor="#0736C4" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(3.56222 4.42321 4.20512 -3.61031 3.30628 11.0661)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFB657" />
        <stop offset="0.633728" stopColor="#FF5F3D" />
        <stop offset="0.923392" stopColor="#C02B3C" />
      </radialGradient>
      <linearGradient
        id="paint2_linear_4407_38935"
        x1="3.81844"
        y1="2.2727"
        x2="4.65052"
        y2="11.8998"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.156162" stopColor="#0D91E1" />
        <stop offset="0.487484" stopColor="#52B471" />
        <stop offset="0.652394" stopColor="#98BD42" />
        <stop offset="0.937361" stopColor="#FFC800" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_4407_38935"
        x1="4.54577"
        y1="1"
        x2="5.00014"
        y2="11.5035"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3DCBFF" />
        <stop offset="0.246674" stopColor="#0588F7" stopOpacity="0" />
      </linearGradient>
      <radialGradient
        id="paint4_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(-4.60802 13.1726 -15.6828 -5.81373 14.2985 3.46943)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0661714" stopColor="#8C48FF" />
        <stop offset="0.5" stopColor="#F2598A" />
        <stop offset="0.895833" stopColor="#FFB152" />
      </radialGradient>
      <linearGradient
        id="paint5_linear_4407_38935"
        x1="14.7593"
        y1="3.85649"
        x2="14.7534"
        y2="6.71696"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0581535" stopColor="#F8ADFA" />
        <stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default function HpFre({
  experienceLevel = "new",
  version = "v1",
  source,
  onNavigateToSearch,
}: AzurePortalProps) {
  const styles = useStyles();
  const widthClassMap: Record<string, string> = {
    "50%": styles.w50,
    "60%": styles.w60,
    "70%": styles.w70,
    "75%": styles.w75,
    "80%": styles.w80,
    "85%": styles.w85,
  };
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResultsCache, setSearchResultsCache] = useState<
    Record<string, any>
  >({});
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isCopilotPanelOpen, setIsCopilotPanelOpen] = useState(false);
  const [copilotMessage, setCopilotMessage] = useState("");
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [isMicHovered, setIsMicHovered] = useState(false);
  const [isMicPressed, setIsMicPressed] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAgentPillHovered, setIsAgentPillHovered] = useState(false);
  const [showServiceRecommendations, setShowServiceRecommendations] =
    useState(false);
  const [historyItems, setHistoryItems] = useState<string[]>([
    "Let's start building, Connie",
  ]);
  const [selectedHistory, setSelectedHistory] = useState(
    "Let's start building, Connie",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);
  const { handlePageChange, setSearchQuery } = useNavigation(); // Added navigation hook

  const handleCopilotClick = () => {
    setIsCopilotPanelOpen(true);
    setShowSuggestions(false);
  };

  const handleCloseCopilotPanel = () => {
    setIsCopilotPanelOpen(false);
  };

  const handleMicClick = () => {
    if (isRecording) return; // Prevent clicking while recording

    // Only simulate recording in agent mode
    if (!isAgentMode) {
      console.log("Mic clicked in normal mode - no simulation");
      return;
    }

    setIsRecording(true);
    setSearchValue("");

    const fullText =
      "I'm totally new to Azure and don't know where to start. I know I want to build a chat-based AI app, what's the most cost-effective way to get started?";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        const newText = fullText.substring(0, currentIndex + 1);
        setSearchValue(newText);
        currentIndex++;

        // Auto-resize textarea
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height =
              inputRef.current.scrollHeight + "px";
          }
        }, 0);
      } else {
        clearInterval(typingInterval);
        // Small delay before stopping recording to ensure state updates
        setTimeout(() => {
          setIsRecording(false);
          setIsMicHovered(false);
          setIsMicPressed(false);
        }, 100);
      }
    }, 30); // Type at ~33 characters per second
  };

  const handleSendCopilotMessage = () => {
    if (copilotMessage.trim()) {
      // Handle sending message logic here
      setCopilotMessage("");
    }
  };

  const crossPlatformTerms = {
    ec2: { azure: "Virtual Machine", platform: "AWS" },
    rds: { azure: "SQL Database", platform: "AWS" },
    s3: { azure: "Blob Storage", platform: "AWS" },
    lambda: { azure: "Functions", platform: "AWS" },
    cloudformation: { azure: "ARM Templates", platform: "AWS" },
    iam: { azure: "Active Directory", platform: "AWS" },
    cloudwatch: { azure: "Monitor", platform: "AWS" },
    elb: { azure: "Load Balancer", platform: "AWS" },
    vpc: { azure: "Virtual Network", platform: "AWS" },
    route53: { azure: "DNS Zone", platform: "AWS" },

    "compute engine": { azure: "Virtual Machine", platform: "Google Cloud" },
    "cloud sql": { azure: "SQL Database", platform: "Google Cloud" },
    "cloud storage": { azure: "Blob Storage", platform: "Google Cloud" },
    "cloud functions": { azure: "Functions", platform: "Google Cloud" },
    "deployment manager": { azure: "ARM Templates", platform: "Google Cloud" },
    "cloud iam": { azure: "Active Directory", platform: "Google Cloud" },
    stackdriver: { azure: "Monitor", platform: "Google Cloud" },
    "cloud load balancing": {
      azure: "Load Balancer",
      platform: "Google Cloud",
    },
    gcp_vpc: { azure: "Virtual Network", platform: "Google Cloud" },
    clouddns: { azure: "DNS Zone", platform: "Google Cloud" },

    vm: { azure: "Virtual Machine", platform: "Generic" },
    lb: { azure: "Load Balancer", platform: "Generic" },
    db: { azure: "Database", platform: "Generic" },
  };

  const detectCrossPlatformTerm = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();

    for (const [term, mapping] of Object.entries(crossPlatformTerms)) {
      if (lowerQuery.includes(term) || isSimilar(lowerQuery, term)) {
        return {
          originalTerm: term,
          azureTerm: mapping.azure,
          platform: mapping.platform,
        };
      }
    }
    return null;
  };

  const calculateLevenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator,
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  const isSimilar = (word1: string, word2: string, threshold = 2): boolean => {
    const distance = calculateLevenshteinDistance(
      word1.toLowerCase(),
      word2.toLowerCase(),
    );
    const maxLength = Math.max(word1.length, word2.length);
    return distance <= threshold && distance <= maxLength * 0.4;
  };

  const suggestions = [
    "Create a virtual machine in Azure",
    "Deploy a web app to Azure App Service",
    "Set up Azure SQL Database",
    "Configure Azure Storage Account",
    "Create Azure Functions serverless app",
    "Set up Azure Container Instances",
    "Deploy to Azure Kubernetes Service",
    "Configure Azure Active Directory authentication",
  ];

  const gettingStartedSuggestions = [
    "How do I get started with Azure?",
    "Create my first Azure resource",
    "Set up Azure free account",
    "What Azure services should I use?",
    "Deploy my first application to Azure",
    "Azure pricing and cost management",
    "Azure security best practices",
    "Connect to Azure from my local machine",
  ];

  const conversationalPhrases = [
    "Can I create a virtual machine?",
    "Can I deploy my app to Azure?",
    "Can I set up a database?",
    "Can I configure auto-scaling?",
    "Can I migrate my data to Azure?",
    "Can I set up monitoring for my resources?",
    "Can I create a backup strategy?",
    "Can I integrate with Active Directory?",
    "Can I use Azure DevOps for CI/CD?",
    "How to create a storage account",
    "How to set up authentication",
    "How to deploy using ARM templates",
    "How to monitor my resources",
    "How to backup my data",
    "What is Azure App Service?",
    "What are the pricing options for Azure?",
    "What is the difference between Azure SQL and Cosmos DB?",
    "What security features does Azure provide?",
    "What regions are available in Azure?",
    "What is Azure Functions used for?",
    "What compliance certifications does Azure have?",
    "What backup options are available?",
    "View my virtual machines",
    "View my resource groups",
    "View my billing information",
    "View my subscription details",
    "Where can I find my billing information?",
    "Where are my resources deployed?",
    "Where can I view my subscription details?",
    "Where is the Azure portal documentation?",
    "Where can I find Azure service limits?",
    "Where are my backups stored?",
    "Where can I configure security settings?",
    "Where do I manage user permissions?",
    "Show me my recent deployments",
    "Show me my cost analysis",
    "Show me my security recommendations",
    "Show me my resource usage",
    "Show me available regions",
  ];

  const mockCategorizedResults = {
    "VM102-13": {
      topTasks: [
        "Start VM102-13",
        "Stop VM102-13",
        "Restart VM102-13",
        "Connect to VM102-13",
        "Resize VM102-13",
        "Create snapshot of VM102-13",
      ],
      yourResources: [
        "VM102-13 (Virtual Machine)",
        "VM102-13-disk (Disk)",
        "VM102-13-nsg (Network Security Group)",
        "VM102-13-nic (Network Interface)",
        "VM102-13-pip (Public IP)",
      ],
      resourceGroups: [
        "rg-vm102-production",
        "rg-vm102-dev",
        "rg-vm102-staging",
      ],
      services: [
        "Virtual Machines",
        "Compute",
        "Networking",
        "Storage",
        "Security Center",
      ],
      documentation: [
        "VM troubleshooting guide",
        "VM sizing options",
        "VM backup configuration",
        "VM monitoring setup",
        "VM security best practices",
      ],
      autoSuggested: [
        "How to connect to VM102-13 via RDP",
        "VM102-13 performance optimization",
        "Backup VM102-13 automatically",
        "Monitor VM102-13 health",
      ],
    },
    MyResourceGroup5: {
      topTasks: [
        "View MyResourceGroup5 resources",
        "Deploy to MyResourceGroup5",
        "Delete MyResourceGroup5",
        "Export MyResourceGroup5 template",
        "Move resources from MyResourceGroup5",
        "Set up monitoring for MyResourceGroup5",
      ],
      yourResources: [
        "webapp-prod (App Service)",
        "sql-db-main (SQL Database)",
        "storage-account-01 (Storage Account)",
        "keyvault-secrets (Key Vault)",
        "appinsights-monitoring (Application Insights)",
      ],
      resourceGroups: [
        "MyResourceGroup5",
        "MyResourceGroup5-backup",
        "MyResourceGroup5-test",
      ],
      services: [
        "Resource Groups",
        "App Service",
        "SQL Database",
        "Storage",
        "Key Vault",
        "Application Insights",
      ],
      documentation: [
        "Resource group best practices",
        "Resource group management",
        "Resource group policies",
        "Cost optimization for resource groups",
      ],
      autoSuggested: [
        "How to organize resources in MyResourceGroup5",
        "Best practices for MyResourceGroup5 naming",
        "Cost analysis for MyResourceGroup5",
        "Security recommendations for MyResourceGroup5",
      ],
    },
  };

  const isSpecificResourceSearch = (query: string) => {
    return (
      query.length > 3 &&
      (/^[A-Za-z]+\d+(-\d+)?$/.test(query) || // Matches VM102-13, MyApp5, etc.
        /^[A-Za-z]+[A-Za-z0-9]*Group\d*$/i.test(query) || // Matches ResourceGroup, MyResourceGroup5, etc.
        query.toLowerCase().includes("resource") ||
        query.toLowerCase().includes("vm") ||
        query.toLowerCase().includes("app"))
    );
  };

  const getSearchResults = () => {
    if (searchValue.length === 0) {
      return {
        type: "getting-started",
        suggestions: gettingStartedSuggestions,
      };
    }

    const crossPlatformMatch = detectCrossPlatformTerm(searchValue);
    if (crossPlatformMatch) {
      return {
        type: "cross-platform",
        match: crossPlatformMatch,
        suggestions: suggestions.filter((s) =>
          s.toLowerCase().includes(crossPlatformMatch.azureTerm.toLowerCase()),
        ),
      };
    }

    if (isSpecificResourceSearch(searchValue)) {
      const cacheKey = searchValue.toLowerCase().trim();
      if (!searchResultsCache[cacheKey]) {
        const mockKey = Object.keys(mockCategorizedResults).find(
          (key) =>
            key.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchValue.toLowerCase().includes(key.toLowerCase()) ||
            isSimilar(key, searchValue),
        );

        let data;
        if (mockKey) {
          data =
            mockCategorizedResults[
              mockKey as keyof typeof mockCategorizedResults
            ];
        } else {
          data = {
            topTasks: [
              `View ${searchValue} details`,
              `Configure ${searchValue}`,
              `Monitor ${searchValue}`,
              `Backup ${searchValue}`,
            ],
            yourResources: [
              `${searchValue} (Resource)`,
              `${searchValue}-backup`,
              `${searchValue}-config`,
              `${searchValue}-logs`,
            ],
            resourceGroups: [
              `rg-${searchValue.toLowerCase()}`,
              `${searchValue}-group`,
              `${searchValue}-prod-rg`,
            ],
            services: [
              "Virtual Machines",
              "App Service",
              "Storage",
              "Networking",
              "Security Center",
            ],
            documentation: [
              `${searchValue} documentation`,
              `${searchValue} troubleshooting`,
              `${searchValue} best practices`,
              `${searchValue} configuration guide`,
            ],
            autoSuggested: [
              `How to optimize ${searchValue} performance`,
              `${searchValue} security recommendations`,
              `Best practices for ${searchValue}`,
              `Troubleshooting ${searchValue} issues`,
            ],
          };
        }

        const randomizedData = {
          ...data,
          counts: {
            resources: Math.floor(Math.random() * 50) + 5, // 5-54
            azureServices: Math.floor(Math.random() * 50) + 5,
            resourceGroups: Math.floor(Math.random() * 20) + 3, // 3-22
            entraId: Math.floor(Math.random() * 80) + 20, // 20-99
            marketplace: Math.floor(Math.random() * 15) + 5, // 5-19
            documentation: Math.floor(Math.random() * 200) + 50, // 50-249
          },
        };

        setSearchResultsCache((prev) => ({
          ...prev,
          [cacheKey]: randomizedData,
        }));

        return { type: "categorized", data: randomizedData };
      }

      return { type: "categorized", data: searchResultsCache[cacheKey] };
    }

    const allSuggestions = [...suggestions, ...conversationalPhrases];
    const filtered = allSuggestions.filter((suggestion) => {
      const words = suggestion.toLowerCase().split(" ");
      const searchWords = searchValue.toLowerCase().split(" ");

      return searchWords.some((searchWord) =>
        words.some(
          (word) => word.includes(searchWord) || isSimilar(word, searchWord),
        ),
      );
    });

    return { type: "filtered", suggestions: filtered };
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }

      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target as Node)
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    setShowServiceRecommendations(true);
    const newHistoryItem = "Service recommendations";
    if (!historyItems.includes(newHistoryItem)) {
      setHistoryItems([...historyItems, newHistoryItem]);
      setSelectedHistory(newHistoryItem);
    }
    if (onNavigateToSearch) {
      // Use custom navigation handler (for copilot-search)
      onNavigateToSearch(suggestion);
    } else {
      // Use the same navigation pattern as TopNav - set search query and navigate to search results
      setSearchQuery(suggestion);
      handlePageChange("azure-search-results");
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (searchValue.trim()) {
        setShowSuggestions(false);

        if (onNavigateToSearch) {
          // Use custom navigation handler (for copilot-search)
          onNavigateToSearch(searchValue);
        } else {
          // Use the same navigation pattern as TopNav - set search query and navigate to search results
          setSearchQuery(searchValue);
          handlePageChange("azure-search-results");
        }
      }
    }
  };

  const getResourceName = (searchTerm: string, index: number) => {
    const lowerSearch = searchTerm.toLowerCase();

    if (
      lowerSearch.includes("virtual") ||
      lowerSearch.includes("vm") ||
      lowerSearch.includes("machine")
    ) {
      return `VM-${String(index + 1).padStart(2, "0")}`;
    } else if (
      lowerSearch.includes("sql") ||
      lowerSearch.includes("database") ||
      lowerSearch.includes("db")
    ) {
      return `SQL-${String(index + 1).padStart(2, "0")}`;
    } else if (
      lowerSearch.includes("storage") ||
      lowerSearch.includes("blob")
    ) {
      return `Storage-${String(index + 1).padStart(2, "0")}`;
    } else if (lowerSearch.includes("app") || lowerSearch.includes("web")) {
      return `App-${String(index + 1).padStart(2, "0")}`;
    } else if (
      lowerSearch.includes("function") ||
      lowerSearch.includes("serverless")
    ) {
      return `Function-${String(index + 1).padStart(2, "0")}`;
    } else if (
      lowerSearch.includes("network") ||
      lowerSearch.includes("vnet")
    ) {
      return `Network-${String(index + 1).padStart(2, "0")}`;
    } else {
      return `Resource-${String(index + 1).padStart(2, "0")}`;
    }
  };

  const getResourceMetadata = (resourceName: string) => {
    if (resourceName.startsWith("VM-")) {
      return "Type: Virtual machine, Operating system: Linux, Location: West US 2, Size: Standard_D16ds_v4, Status: Running";
    } else if (resourceName.startsWith("SQL-")) {
      return "Type: SQL Database, Tier: Standard, Location: East US, Size: S2, Status: Online";
    } else if (resourceName.startsWith("Storage-")) {
      return "Type: Storage Account, Performance: Standard, Replication: LRS, Location: Central US, Status: Available";
    } else if (resourceName.startsWith("App-")) {
      return "Type: App Service, Plan: Standard S1, Location: West Europe, Runtime: .NET 6, Status: Running";
    } else if (resourceName.startsWith("Function-")) {
      return "Type: Function App, Plan: Consumption, Runtime: Node.js 18, Location: East US 2, Status: Running";
    } else if (resourceName.startsWith("Network-")) {
      return "Type: Virtual Network, Address space: 10.0.0.0/16, Location: West US, Subnets: 3, Status: Available";
    } else {
      return "Type: Resource, Location: East US, Status: Available";
    }
  };

  const renderCategorizedResults = (data: any) => {
    const getCategoryCount = (category: string, defaultCount: number) => {
      return data.counts?.[category] || defaultCount;
    };

    return (
      <div className="py-4 max-h-96 overflow-y-auto">
        {/* Suggested Tasks Section */}
        <div className="mb-6">
          <Subtitle2 className="mb-4 px-4">Suggested tasks</Subtitle2>
          <div className="grid grid-cols-2 gap-4 px-4">
            <Card className="hover:border-blue-500 transition-colors">
              <CardPreview>
                <div className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <Document24Regular className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text className="text-sm text-gray-900 leading-tight">
                      Create and deploy a VM in one click with our ready-made
                      starter kits.
                    </Text>
                  </div>
                  <FluentButton
                    appearance="primary"
                    size="small"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto flex-shrink-0"
                  >
                    Create
                  </FluentButton>
                </div>
              </CardPreview>
            </Card>
            <Card className="hover:border-blue-500 transition-colors">
              <CardPreview>
                <div className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <Globe24Regular className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text className="text-sm text-gray-900 leading-tight">
                      Secure your data by enabling backups for your virtual
                      machines.
                    </Text>
                  </div>
                  <FluentButton
                    appearance="primary"
                    size="small"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto flex-shrink-0"
                  >
                    Enable
                  </FluentButton>
                </div>
              </CardPreview>
            </Card>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <Subtitle2>
              Resources ({getCategoryCount("resources", 10)})
            </Subtitle2>
            <FluentButton appearance="subtle" className="text-sm font-medium">
              See all
            </FluentButton>
          </div>
          <div className="space-y-2 px-4">
            {[1, 2, 3, 4].map((i) => {
              const resourceName = getResourceName(searchValue, i - 1);
              const metadata = getResourceMetadata(resourceName);
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <CopilotIcon className="w-3 h-3 text-blue-600" />{" "}
                    {/* Replaced Document24Regular with CopilotIcon */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div>
                      <Text className="text-sm font-medium text-gray-900">
                        {resourceName}
                      </Text>
                      <div className="text-xs text-gray-500 mt-1">
                        {metadata}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Get help with Copilot Section */}
        <div className="mb-6">
          <Subtitle2 className="mb-4 px-4">Get help with Copilot</Subtitle2>
          <div className="px-4">
            <Card className="mb-4">
              <CardPreview>
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <CopilotIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Text className="text-sm text-gray-900">
                        It looks like you're trying to work with your virtual
                        machines? Do you want to:
                      </Text>
                    </div>
                    <FluentButton
                      appearance="primary"
                      size="small"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 h-auto"
                    >
                      Open Copilot
                    </FluentButton>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <CompoundButton
                      appearance="outline"
                      size="small"
                      className="text-xs px-3 py-2 h-auto border-gray-300 hover:border-blue-500"
                      icon={<Settings24Regular className="w-3 h-3" />}
                    >
                      Breakdown my monthly costs
                    </CompoundButton>
                    <CompoundButton
                      appearance="outline"
                      size="small"
                      className="text-xs px-3 py-2 h-auto border-gray-300 hover:border-blue-500"
                      icon={<Alert24Regular className="w-3 h-3" />}
                    >
                      View CPU performance
                    </CompoundButton>
                    <CompoundButton
                      appearance="outline"
                      size="small"
                      className="text-xs px-3 py-2 h-auto border-gray-300 hover:border-blue-500"
                      icon={<Globe24Regular className="w-3 h-3" />}
                    >
                      Scale the size of a virtual machine
                    </CompoundButton>
                  </div>
                </div>
              </CardPreview>
            </Card>
          </div>
        </div>

        {/* Additional Sections */}
        {[
          { name: "Azure Services", key: "azureServices", defaultCount: 22 },
          { name: "Resource Groups", key: "resourceGroups", defaultCount: 8 },
          { name: "Microsoft Entra ID", key: "entraId", defaultCount: 50 },
          { name: "Marketplace", key: "marketplace", defaultCount: 9 },
          {
            name: "Documentation",
            key: "documentation",
            defaultCount: 99,
            suffix: "+",
          },
        ].map((section) => (
          <div key={section.name} className="mb-2">
            <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50">
              <Subtitle2>
                {section.name} (
                {getCategoryCount(section.key, section.defaultCount)}
                {section.suffix || ""})
              </Subtitle2>
              <FluentButton appearance="subtle" className="text-sm font-medium">
                See all
              </FluentButton>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCrossPlatformResults = (
    match: any,
    suggestions: string[] = [],
  ) => {
    return (
      <div className="py-2">
        <MessageBar>
          <MessageBarBody>
            <Text as="p" className="text-sm">
              <span className="font-medium">Did you mean:</span>{" "}
              {match.azureTerm}?
            </Text>
            <Text as="p" className="text-xs mt-1">
              It looks like you're using {match.platform} terminology. In Azure,
              "{match.originalTerm}" is called "{match.azureTerm}".
            </Text>
          </MessageBarBody>
          <MessageBarActions>
            <FluentButton
              appearance="primary"
              size="small"
              onClick={() => handleSuggestionClick(`Create ${match.azureTerm}`)}
            >
              Use Azure term
            </FluentButton>
          </MessageBarActions>
        </MessageBar>

        {suggestions.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50">
              <Subtitle2>Related Azure Services</Subtitle2>
              <FluentButton appearance="subtle" className="text-sm font-medium">
                See all
              </FluentButton>
            </div>
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <FluentButton
                key={index}
                appearance="subtle"
                className={`${styles.suggestionItem} text-left`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search24Regular className={styles.searchSuggestionIcon} />
                <span className="text-left flex-1">{suggestion}</span>
              </FluentButton>
            ))}
          </div>
        )}
      </div>
    );
  };

  const searchResults = getSearchResults();
  const shouldExpandViewport = searchResults.type === "categorized";

  const getActionCards = () => {
    const baseCards = [
      {
        icon: "/icons/templates.svg",
        title: "Start with a template",
        description: { width1: "80%", width2: "60%" },
      },
      {
        icon: "/icons/Service.svg",
        title: "Explore services",
        description: { width1: "75%", width2: "50%" },
      },
      {
        icon: "/icons/aifoundry.svg",
        title: "Build an AI agent",
        description: { width1: "85%", width2: "70%" },
      },
    ];

    if (experienceLevel === "new") {
      return [
        ...baseCards,

        {
          icon: "/icons/github.svg",
          title: "Import code from GitHub",
          description: { width1: "80%", width2: "70%" },
        },
      ];
    }

    return baseCards;
  };

  // Show service recommendations if triggered
  if (showServiceRecommendations) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className={styles.container}>
          <TopNav activeLink="Build" experienceLevel={experienceLevel} />
          <CanvasHeader
            historyItems={historyItems}
            selectedHistory={selectedHistory}
            onHistoryChange={(value) => {
              setSelectedHistory(value);
              if (value === "Let's start building, Connie") {
                setShowServiceRecommendations(false);
              } else if (value === "Service recommendations") {
                setShowServiceRecommendations(true);
              }
            }}
            onRefresh={() => {
              setShowServiceRecommendations(false);
              setHistoryItems(["Let's start building, Connie"]);
              setSelectedHistory("Let's start building, Connie");
            }}
          />
          <ServiceRecommendations
            onServiceSelect={(service, action) => {
              console.log("Service selected:", service, action);
            }}
          />
          <CanvasFooter />
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div
        className={
          shouldExpandViewport ? styles.containerExpanded : styles.container
        }
      >
        <TopNav
          activeLink="Home"
          experienceLevel={experienceLevel}
          disabledItems={["Build", "Manage"]}
          stayOnCurrentPage={true}
        />

        <div
          className={
            isCopilotPanelOpen
              ? styles.contentWrapperWithPanel
              : styles.contentWrapper
          }
        >
          <div
            className={
              isCopilotPanelOpen
                ? styles.mainContentWithPanel
                : styles.mainContent
            }
          >
            <div className={styles.header}>
              <Text as="h1" className={styles.title}>
                {"Let's start building, Connie"}
              </Text>
              <div className={styles.creditsWrapper}>
                <div className={styles.creditsInfo}>
                  <span>$200 in credits - Expires Aug 25, 2025</span>
                  <QuestionCircle24Regular />
                </div>
              </div>
            </div>

            <div
              className={
                isCopilotPanelOpen
                  ? styles.actionCardsWithPanel
                  : styles.actionCards
              }
            >
              {getActionCards().map((card, index) => (
                <div key={index} className={styles.actionCard}>
                  <img
                    src={card.icon}
                    alt={card.title}
                    className={styles.cardIcon}
                  />
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardDescription}>
                    <div
                      className={mergeClasses(
                        styles.skeletonLine,
                        widthClassMap[card.description.width1],
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.skeletonLineNoMargin,
                        widthClassMap[card.description.width2],
                      )}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discover more link below action cards */}
            <div className={styles.discoverMoreWrapper}>
              <button
                className={styles.discoverMoreButton}
                onClick={() => handlePageChange("discover", "home-fre")} // Navigate to discover from hp-fre (page ID: home-fre)
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    tokens.colorNeutralBackground1Hover;
                  e.currentTarget.style.textDecoration = "none";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.textDecoration = "underline";
                }}
              >
                Discover more →
              </button>
            </div>

            <div
              className={mergeClasses(
                styles.searchContainer,
                styles.searchContainerMarginTop,
              )}
            >
              {showAttachmentMenu && (
                <div ref={attachmentMenuRef} className={styles.attachmentMenu}>
                  <button
                    className={styles.attachmentMenuItem}
                    onClick={() => {
                      console.log("Add work content");
                      setShowAttachmentMenu(false);
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        tokens.colorNeutralBackground2)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <Attach24Regular className={styles.attachmentMenuIcon} />
                    <span className={styles.attachmentMenuText}>
                      Add work content
                    </span>
                  </button>
                  <button
                    className={styles.attachmentMenuItem}
                    onClick={() => {
                      console.log("Upload images and files");
                      setShowAttachmentMenu(false);
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        tokens.colorNeutralBackground2)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <ArrowUpload24Regular
                      className={styles.attachmentMenuIcon}
                    />
                    <span className={styles.attachmentMenuText}>
                      Upload images and files
                    </span>
                  </button>
                  <button
                    className={styles.attachmentMenuItem}
                    onClick={() => {
                      setIsAgentMode(true);
                      setShowAttachmentMenu(false);
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        tokens.colorNeutralBackground2)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <img
                      src="/icons/Agents.svg"
                      alt="Agent"
                      className={styles.attachmentMenuIcon}
                    />
                    <span className={styles.attachmentMenuText}>
                      Agent mode
                    </span>
                  </button>
                </div>
              )}
              <div
                className={`${styles.searchWrapper} ${isSearchHovered ? styles.searchWrapperHover : ""} ${isAgentMode || searchValue.length > 50 ? styles.searchWrapperAgentMode : ""}`}
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
              >
                {isAgentMode || searchValue.length > 50 ? (
                  <>
                    <div className={styles.textareaWrapper}>
                      <textarea
                        ref={inputRef as any}
                        placeholder="I want to..."
                        className={mergeClasses(
                          styles.searchInput,
                          styles.textareaAutoHeight,
                        )}
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          setShowSuggestions(true);
                          // Auto-resize
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleSearchKeyDown}
                        rows={1}
                      />
                    </div>
                    <div className={styles.agentActions}>
                      <Add24Regular
                        className={styles.plusIcon}
                        onClick={() =>
                          setShowAttachmentMenu(!showAttachmentMenu)
                        }
                      />
                      {isAgentMode && (
                        <>
                          <div className={styles.agentDivider} />
                          <button
                            className={`${styles.agentPill} ${isAgentPillHovered ? styles.agentPillHover : ""}`}
                            onClick={() => {
                              setIsAgentMode(false);
                              setSearchValue("");
                            }}
                            onMouseEnter={() => setIsAgentPillHovered(true)}
                            onMouseLeave={() => setIsAgentPillHovered(false)}
                          >
                            <img
                              src="/icons/Agents.svg"
                              alt="Agent"
                              className={styles.agentPillIconImg}
                            />
                            <span>Agent</span>
                            <Dismiss16Regular
                              className={styles.dismissIconSmall}
                            />
                          </button>
                        </>
                      )}
                      <div className={styles.flexSpacer} />
                      {!isRecording && (
                        <button
                          className={styles.micButton}
                          onClick={handleMicClick}
                          aria-label="Voice input"
                        >
                          <div
                            className={`${styles.micButtonInner} ${isMicHovered ? styles.micButtonHover : ""} ${isMicPressed ? styles.micButtonPressed : ""}`}
                            onMouseEnter={() => setIsMicHovered(true)}
                            onMouseLeave={() => {
                              setIsMicHovered(false);
                              setIsMicPressed(false);
                            }}
                            onMouseDown={() => setIsMicPressed(true)}
                            onMouseUp={() => setIsMicPressed(false)}
                          >
                            <Mic24Regular />
                          </div>
                        </button>
                      )}
                      {isRecording && (
                        <button
                          className={styles.micButton}
                          disabled
                          aria-label="Recording"
                        >
                          <div
                            className={`${styles.micButtonInner} ${styles.micButtonRecording}`}
                          >
                            <Mic24Regular />
                          </div>
                        </button>
                      )}
                      {searchValue.trim() && !isRecording && (
                        <button
                          className={`${styles.submitButton} ${styles.submitButtonFadeIn}`}
                          onClick={() => {
                            if (searchValue.trim()) {
                              handleSuggestionClick(searchValue);
                            }
                          }}
                          aria-label="Submit"
                        >
                          <div
                            className={`${styles.submitButtonInner} ${styles.submitButtonInnerActive} ${isSubmitHovered ? styles.submitButtonHover : ""} ${isSubmitPressed ? styles.submitButtonPressed : ""}`}
                            onMouseEnter={() => setIsSubmitHovered(true)}
                            onMouseLeave={() => setIsSubmitHovered(false)}
                            onMouseDown={() => setIsSubmitPressed(true)}
                            onMouseUp={() => setIsSubmitPressed(false)}
                          >
                            <ArrowRight24Filled />
                          </div>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={styles.textareaWrapper}>
                    <Add24Regular
                      className={mergeClasses(
                        styles.plusIcon,
                        styles.plusIconMarginTop,
                      )}
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    />
                    <textarea
                      ref={inputRef as any}
                      placeholder="Describe what you want to build..."
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        setShowSuggestions(true);
                        // Auto-resize
                        e.target.style.height = "auto";
                        const newHeight = e.target.scrollHeight;
                        e.target.style.height = newHeight + "px";

                        // Auto-expand to agent mode if text overflows (more than 2 lines ~48px)
                        if (newHeight > 48 && !isAgentMode) {
                          setIsAgentMode(true);
                        }
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={handleSearchKeyDown}
                      rows={1}
                      className={mergeClasses(
                        styles.searchInput,
                        styles.textareaAutoHeight,
                      )}
                    />
                    {!isRecording && (
                      <button
                        className={styles.micButton}
                        onClick={handleMicClick}
                        aria-label="Voice input"
                      >
                        <div
                          className={`${styles.micButtonInner} ${isMicHovered ? styles.micButtonHover : ""} ${isMicPressed ? styles.micButtonPressed : ""}`}
                          onMouseEnter={() => setIsMicHovered(true)}
                          onMouseLeave={() => {
                            setIsMicHovered(false);
                            setIsMicPressed(false);
                          }}
                          onMouseDown={() => setIsMicPressed(true)}
                          onMouseUp={() => setIsMicPressed(false)}
                        >
                          <Mic24Regular />
                        </div>
                      </button>
                    )}
                    {isRecording && (
                      <button
                        className={styles.micButton}
                        disabled
                        aria-label="Recording"
                      >
                        <div
                          className={`${styles.micButtonInner} ${styles.micButtonRecording}`}
                        >
                          <Mic24Regular />
                        </div>
                      </button>
                    )}
                    {searchValue.trim() && !isRecording && (
                      <button
                        className={`${styles.submitButton} ${styles.submitButtonFadeIn}`}
                        onClick={() => {
                          if (searchValue.trim()) {
                            handleSuggestionClick(searchValue);
                          }
                        }}
                        aria-label="Submit"
                      >
                        <div
                          className={`${styles.submitButtonInner} ${styles.submitButtonInnerActive} ${isSubmitHovered ? styles.submitButtonHover : ""} ${isSubmitPressed ? styles.submitButtonPressed : ""}`}
                          onMouseEnter={() => setIsSubmitHovered(true)}
                          onMouseLeave={() => setIsSubmitHovered(false)}
                          onMouseDown={() => setIsSubmitPressed(true)}
                          onMouseUp={() => setIsSubmitPressed(false)}
                        >
                          <ArrowRight24Filled />
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {!searchValue && (
                <HpCopilotSuggestionPanel
                  searchValue={searchValue}
                  showSuggestions={showSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  setShowSuggestions={setShowSuggestions}
                  inputRef={inputRef}
                  experienceLevel={experienceLevel}
                  searchResultsCache={searchResultsCache}
                  setSearchResultsCache={setSearchResultsCache}
                  version="v2"
                  onCopilotClick={() => setIsCopilotPanelOpen(true)}
                  onClearSearchField={() => setSearchValue("")}
                  onNavigateToDiscover={() => handlePageChange("discover")}
                />
              )}
            </div>
          </div>

          {isCopilotPanelOpen && (
            <div className={styles.copilotPanel}>
              {/* Panel Header */}
              <div className={styles.panelHeader}>
                <Text className={styles.panelTitle}>Copilot</Text>
                <div className={styles.panelHeaderActions}>
                  <FluentButton
                    appearance="subtle"
                    icon={<MoreHorizontal24Regular />} // Replaced GridDots24Regular with MoreHorizontal24Regular for ellipsis icon
                    className={styles.smallIconButton}
                  />
                  <FluentButton
                    appearance="subtle"
                    onClick={handleCloseCopilotPanel}
                    className={styles.panelCloseButton}
                  >
                    ×
                  </FluentButton>
                </div>
              </div>

              {/* Chat Content */}
              <div className={styles.chatContent}>
                {/* User Message */}
                <div className={styles.userMessageRow}>
                  <div className={styles.userMessageBubble}>
                    <div className={styles.chatSkeletonLine}></div>
                  </div>
                </div>

                {/* Copilot Response */}
                <div className={styles.copilotResponseSection}>
                  <div className={styles.copilotLabelRow}>
                    <CopilotSVGIcon />
                    <Text className={styles.copilotNameText}>Copilot</Text>
                    <Text className={styles.disclaimerText}>
                      AI-generated content may be incorrect
                    </Text>
                  </div>

                  <div className={styles.responseBody}>
                    <div
                      className={mergeClasses(
                        styles.responseSkeletonLine,
                        styles.w100,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.responseSkeletonLine,
                        styles.w95,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.responseSkeletonLine,
                        styles.w90,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.responseSkeletonLine,
                        styles.w85,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.responseSkeletonLine,
                        styles.w92,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.responseSkeletonLineNoMargin,
                        styles.w88,
                      )}
                    ></div>
                  </div>

                  {/* Feedback Buttons */}
                  <div className={styles.feedbackRow}>
                    <FluentButton
                      appearance="subtle"
                      icon={<ThumbLike24Regular />} // Replaced emoji with ThumbLike24Regular icon
                      className={styles.feedbackButton}
                    />
                    <FluentButton
                      appearance="subtle"
                      icon={<ThumbDislike24Regular />} // Replaced emoji with ThumbDislike24Regular icon
                      className={styles.feedbackButton}
                    />
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className={styles.panelInputArea}>
                <div className={styles.panelInputWrapper}>
                  <input
                    type="text"
                    placeholder="I want to..."
                    value={copilotMessage}
                    onChange={(e) => setCopilotMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendCopilotMessage();
                      }
                    }}
                    className={styles.panelTextInput}
                  />
                  <div className={styles.inputActionsRow}>
                    <Text className={styles.charCountText}>
                      {copilotMessage.length}/500
                    </Text>
                    <FluentButton
                      appearance="subtle"
                      onClick={handleSendCopilotMessage}
                      disabled={!copilotMessage.trim()}
                      className={mergeClasses(
                        styles.sendButtonBase,
                        copilotMessage.trim()
                          ? styles.sendButtonActive
                          : styles.sendButtonInactive,
                      )}
                    >
                      ▶
                    </FluentButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes pulseRing {
            0% {
              box-shadow: 0 0 0 0 rgba(98, 100, 167, 0.3);
            }
            50% {
              box-shadow: 0 0 0 4px rgba(98, 100, 167, 0.15);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(98, 100, 167, 0.3);
            }
          }

          input::placeholder {
            color: #616161;
            opacity: 1;
          }
        `}</style>
      </div>
    </FluentProvider>
  );
}
