"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Combobox,
  Dropdown,
  Option,
  Link,
  Card,
  Badge,
  Checkbox,
  Input,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";
import {
  Dismiss20Regular,
  Info16Regular,
  Info12Regular,
  ArrowRight20Regular,
  ChevronLeft20Regular,
  CheckmarkCircle16Filled,
  Checkmark20Regular,
  Checkmark16Regular,
  Sparkle20Regular,
  Shield20Regular,
  Eye20Regular,
  ArrowSync20Regular,
  DocumentBulletList20Regular,
  ShieldCheckmark20Regular,
  Add20Regular,
  PersonFeedback20Regular,
  List20Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { NavigationProvider } from "../../../lib/navigation-context";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import { useEmmState } from "./emm-state-context";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainArea: {
    flex: 1,
    overflowY: "auto",
    padding: "48px 32px",
    paddingBottom: "140px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  /* Form layout */
  formSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalXXL,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  labelRequired: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  asterisk: {
    color: tokens.colorPaletteRedForeground1,
  },
  infoMessage: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: "16px",
    marginTop: tokens.spacingVerticalXXS,
  },
  infoMessageIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  aiRecommendation: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    lineHeight: "16px",
    marginTop: tokens.spacingVerticalXXS,
    cursor: "pointer",
  },
  aiRecommendationIcon: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
    fontSize: "14px",
  },

  /* Cost & Impact */
  costImpactGrid: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gap: tokens.spacingHorizontalXXL,
  },
  impactCard: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  impactTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  impactList: {
    listStyleType: "none",
    paddingLeft: "0",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  impactItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
  },
  impactCheckIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  costCard: {
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  costTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  costStatsRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalM,
  },
  costStatCol: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  costLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  costValueBlack: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  costValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "32px",
  },
  costViewDetails: {
    marginTop: tokens.spacingVerticalS,
    alignSelf: "flex-start",
  },

  /* Resource selection */
  excludeSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  excludeLabel: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  excludeDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  excludeFilterRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    alignSelf: "stretch",
  },
  excludeFilterInput: {
    flex: 1,
  },
  excludeFilterHint: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXXS,
    alignSelf: "stretch",
  },
  undoBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    alignSelf: "stretch",
  },
  emptyState: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    fontStyle: "italic",
  },
  excludeStatusText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },

  /* Anchor link */
  excludeAnchorLink: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecorationLine: "none",
    ":hover": {
      textDecorationLine: "underline",
    },
  },

  /* Resource section header row */
  resourceSectionHeaderRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  resourceCountsText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
  },

  /* Resource blade overlay */
  bladeBackdrop: {
    position: "fixed" as const,
    top: "0",
    left: "0",
    right: "0",
    bottom: "44px",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 3000,
    display: "flex",
    justifyContent: "flex-end",
  },
  bladePanel: {
    width: "600px",
    maxWidth: "100%",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: "flex",
    flexDirection: "column" as const,
    zIndex: 1,
  },
  bladeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  bladeTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
    whiteSpace: "nowrap" as const,
    overflow: "visible",
    textOverflow: "unset",
    minWidth: 0,
    flex: 1,
  },
  bladeContent: {
    flex: 1,
    overflowY: "auto" as const,
    padding: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalM,
    alignItems: "flex-start",
  },

  /* Resource grid */
  resourceGrid: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflowY: "auto" as const,
    overflowX: "auto" as const,
    maxHeight: "320px",
    alignSelf: "stretch",
  },
  resourceGridInner: {
    minWidth: "560px",
  },
  resourceGridHeader: {
    display: "grid",
    gridTemplateColumns: "32px 1.2fr 1fr 0.8fr 1.5fr",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    position: "sticky" as const,
    top: 0,
    zIndex: 1,
  },
  resourceGridHeaderText: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  resourceGridRow: {
    display: "grid",
    gridTemplateColumns: "32px 1.2fr 1fr 0.8fr 1.5fr",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    ":last-child": {
      borderBottom: "none",
    },
  },
  filterPillGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap" as const,
    alignSelf: "stretch",
  },
  filterPill: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    backgroundColor: tokens.colorBrandBackground2,
    border: "1px solid transparent",
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
  filterPillDismiss: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: tokens.colorBrandForeground1,
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    marginLeft: tokens.spacingHorizontalXXS,
  },
  filterPopoverList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalXXS,
    maxHeight: "280px",
    overflowY: "auto" as const,
    minWidth: "200px",
  },
  filterPopoverItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left" as const,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  resourceGridCell: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  resourceGridLink: {
    fontSize: tokens.fontSizeBase200,
  },

  /* Add-ons */
  addonsTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  addonsDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  addonsFormField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    maxWidth: "500px",
  },
  addonCardsStack: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  addonAccordionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: tokens.spacingHorizontalS,
  },
  addonHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flex: 1,
    minWidth: 0,
  },
  addonCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  addonHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  addonPriceInline: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
    whiteSpace: "nowrap",
  },
  addonCardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  addedButton: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  addButtonInHeader: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
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
    marginLeft: "auto",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },

  /* Footer */
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    position: "fixed" as const,
    bottom: "44px",
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: tokens.shadow4,
  },

  /* Summary / Review */
  reviewSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  reviewGroupTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  reviewGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  reviewRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    minWidth: "140px",
    flexShrink: 0,
  },
  reviewValue: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
    textAlign: "right",
  },

  /* Success */
  successTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  successBanner: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorPaletteGreenBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  successBannerIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "28px",
    flexShrink: 0,
  },
  successBannerText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  successSubInfo: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  successSubRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  successSectionLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  successCapabilitiesGrid: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalL,
  },
  successCapItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalXXS} 0`,
  },
  successCapIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "16px",
    flexShrink: 0,
  },
  successDivider: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalS} 0`,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  summaryCard: {
    padding: tokens.spacingHorizontalL,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  summaryCardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "24px",
  },
  statBoxes: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  statBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  statBoxLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  statBoxValueGreen: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "22px",
  },
  statBoxValueNeutral: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },

  /* FRE Dialog */
  freOverlay: {
    position: "fixed",
    inset: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4000,
  },
  freDialog: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    width: "480px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  freHero: {
    width: "100%",
    height: "240px",
    background:
      "linear-gradient(135deg, #e8d5f5 0%, #b4d8fa 30%, #a0c4f0 50%, #c8dff8 70%, #f0e8f8 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  freHubContainer: {
    position: "relative",
    width: "380px",
    height: "200px",
  },
  freHubCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "72px",
    height: "72px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#0078D4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: tokens.shadow8,
    zIndex: 2,
  },
  freHubCenterIcon: {
    width: "36px",
    height: "36px",
  },
  freSpoke: {
    position: "absolute",
    width: "48px",
    height: "48px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: tokens.shadow4,
    zIndex: 2,
  },
  freSpokeIcon: {
    color: "#0078D4",
    fontSize: "20px",
  },
  freBody: {
    padding: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  freTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  freDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  freCapabilityList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
  },
  freCapabilityRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  freCapabilityText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  freCapabilityBold: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  freFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
  },
});

export interface EmmEnableFullBladeProps {
  isDarkMode?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  onEnabled?: () => void;
  onViewDashboard?: () => void;
  onSearchSelect?: (item: string) => void;
  defaultSubscription?: string;
  defaultVmName?: string;
  baseCost?: string;
}

/** Full-page EMM enable experience — single-page step flow (config → summary → success) with right-side overlay panels for resource grids. */
export default function EmmEnableFullBlade({
  isDarkMode = false,
  onBack,
  onHome,
  onEnabled,
  onViewDashboard,
  onSearchSelect,
  defaultSubscription = "",
  defaultVmName = "",
  baseCost = "Free",
}: EmmEnableFullBladeProps) {
  const styles = useStyles();
  const emmState = useEmmState();
  const [showFre, setShowFre] = useState(true);
  const [step, setStep] = useState<"config" | "summary" | "success">("config");
  const [subscription, setSubscription] = useState(defaultSubscription || "");
  const [subscriptionQuery, setSubscriptionQuery] = useState(defaultSubscription || "");
  const [managedIdentity, setManagedIdentity] = useState("");
  const [logWorkspace, setLogWorkspace] = useState("");
  const [azureMonitor, setAzureMonitor] = useState("");
  const [useCases, setUseCases] = useState<Set<string>>(new Set());

  // Resource blade state
  const [showResourceBlade, setShowResourceBlade] = useState(false);
  const [bladeHasChanges, setBladeHasChanges] = useState(false);
  const [excludedAccordionOpen, setExcludedAccordionOpen] = useState(false);

  // Machine counts per subscription (matches vm-browse data)
  const subscriptionOptions = [
    { name: "Sub-01", id: "3a4b5c6d-1234-4e5f-9a8b-0c1d2e3f4a5b", vms: 73, arc: 12 },
    { name: "Sub-02", id: "7e8f9a0b-5678-4c3d-2e1f-a0b1c2d3e4f5", vms: 43, arc: 8 },
    { name: "Sub-03", id: "b2c3d4e5-9abc-4def-0123-456789abcdef", vms: 26, arc: 5 },
  ];

  const subscriptionMachineCounts: Record<string, number> = Object.fromEntries(
    subscriptionOptions.map((s) => [s.name, s.vms])
  );

  const filteredSubscriptions = subscriptionOptions.filter((s) =>
    !subscriptionQuery || s.name.toLowerCase().includes(subscriptionQuery.toLowerCase()) || s.id.toLowerCase().includes(subscriptionQuery.toLowerCase())
  );

  const machineCount = subscription ? (subscriptionMachineCounts[subscription] || allResources.length) : 0;

  const useCaseLabels: Record<string, string> = {
    secure: "Secure and govern machines",
    cost: "Optimize costs",
    simplify: "Simplify management",
    monitor: "Monitor performance",
    compliance: "Maintain updates and compliance",
  };

  const [excludedResources, setExcludedResources] = useState<Set<string>>(
    new Set(),
  );
  const [excludeFilterQuery, setExcludeFilterQuery] = useState("");
  const [filterSubmitted, setFilterSubmitted] = useState(false);
  const [excludeStatusLabel, setExcludeStatusLabel] = useState("");
  const [lastBulkExclude, setLastBulkExclude] = useState<string[] | null>(null);
  const [selectedForAddBack, setSelectedForAddBack] = useState<Set<string>>(
    new Set(),
  );
  const [selectedForExclusion, setSelectedForExclusion] = useState<Set<string>>(
    new Set(),
  );
  const [filterName, setFilterName] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<Set<string>>(new Set());
  const [filterLocation, setFilterLocation] = useState<Set<string>>(new Set());
  const [filterTag, setFilterTag] = useState<Set<string>>(new Set());
  const [bladeTextFilter, setBladeTextFilter] = useState("");
  const [addedAddons, setAddedAddons] = useState<Set<string>>(
    new Set(["foundational-cspm"]),
  );
  const [openAddonItems, setOpenAddonItems] = useState<string[]>([
    "foundational-cspm",
  ]);

  const toggleFilterValue = (set: Set<string>, setter: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const getFilteredResources = (
    resources: typeof allResources,
    query: string,
  ) => {
    if (!query.trim()) return resources;
    const q = query.toLowerCase();

    // Natural language: "machines tagged X", "tagged X", "tag X", "exclude machines tagged X"
    const tagMatch = q.match(/(?:tagged|tag)\s+(\w+)/);
    if (tagMatch) {
      const tagKeyword = tagMatch[1];
      return resources.filter((r) =>
        r.tags.some((t) => t.toLowerCase().includes(tagKeyword)),
      );
    }

    return resources.filter((r) => {
      if (r.tags.some((t) => t.toLowerCase().includes(q))) return true;
      if (q.includes("dev") && (r.rg.includes("dev") || r.name.includes("dev")))
        return true;
      if (
        q.includes("test") &&
        (r.rg.includes("test") || r.name.includes("test"))
      )
        return true;
      if (
        q.includes("staging") &&
        (r.rg.includes("staging") || r.name.includes("staging"))
      )
        return true;
      if (
        q.includes("prod") &&
        (r.rg.includes("prod") || r.name.includes("prod"))
      )
        return true;
      if (
        q.includes("network") &&
        (r.rg.includes("network") ||
          r.name.includes("gateway") ||
          r.name.includes("vpn") ||
          r.name.includes("dns"))
      )
        return true;
      if (
        q.includes("identity") &&
        (r.rg.includes("identity") || r.name.includes("ad-dc"))
      )
        return true;
      if (
        q.includes("data") &&
        (r.rg.includes("data") ||
          r.name.includes("analytics") ||
          r.name.includes("etl") ||
          r.name.includes("spark"))
      )
        return true;
      if (
        q.includes("storage") &&
        (r.rg.includes("storage") ||
          r.name.includes("file") ||
          r.name.includes("backup"))
      )
        return true;
      if (
        q.includes("sql") &&
        (r.type.toLowerCase().includes("sql") || r.name.includes("sql"))
      )
        return true;
      if (
        r.name.includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.rg.includes(q)
      )
        return true;
      return false;
    });
  };

  const handleExcludeFilterChange = (value: string) => {
    setExcludeFilterQuery(value);
    if (!value.trim()) setFilterSubmitted(false);
  };

  const handleFilterSubmit = () => {
    if (excludeFilterQuery.trim()) {
      setFilterSubmitted(true);
      // Auto-select filtered resources
      const included = allResources.filter((r) => !excludedResources.has(r.id));
      const matched = getFilteredResources(included, excludeFilterQuery);
      setSelectedForExclusion(new Set(matched.map((r) => r.id)));
    }
  };

  const handleExcludeAll = () => {
    const included = allResources.filter((r) => !excludedResources.has(r.id));
    const matched = getFilteredResources(included, excludeFilterQuery);
    const ids = matched.map((r) => r.id);
    setExcludedResources((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
    setExcludeStatusLabel(excludeFilterQuery.trim());
    setLastBulkExclude(ids);
    setExcludeFilterQuery("");
    setFilterSubmitted(false);
    setSelectedForExclusion(new Set());
    setExcludedAccordionOpen(true);
    setBladeHasChanges(true);
  };

  const handleUndoExclude = () => {
    if (lastBulkExclude) {
      setExcludedResources((prev) => {
        const next = new Set(prev);
        lastBulkExclude.forEach((id) => next.delete(id));
        return next;
      });
      setLastBulkExclude(null);
    }
  };

  const toggleSelectedForAddBack = (id: string) => {
    setSelectedForAddBack((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkAddBack = () => {
    setExcludedResources((prev) => {
      const next = new Set(prev);
      selectedForAddBack.forEach((id) => next.delete(id));
      return next;
    });
    setSelectedForAddBack(new Set());
    setBladeHasChanges(true);
  };

  const toggleResource = (id: string) => {
    setSelectedForExclusion((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkExclude = () => {
    setExcludedResources((prev) => {
      const next = new Set(prev);
      selectedForExclusion.forEach((id) => next.add(id));
      return next;
    });
    setSelectedForExclusion(new Set());
    setExcludedAccordionOpen(true);
    setBladeHasChanges(true);
  };

  const addonLabels: Record<string, string> = {
    "foundational-cspm": "Foundational CSPM",
    "defender-cspm": "Defender CSPM",
    "defender-servers": "Defender for Servers Plan 2",
  };

  const addonPrices: Record<string, number> = {
    "foundational-cspm": 0,
    "defender-cspm": 14.88,
    "defender-servers": 24.36,
  };

  const totalAddonCost = Array.from(addedAddons).reduce(
    (sum, id) => sum + (addonPrices[id] || 0),
    0,
  );
  const costDisplay =
    totalAddonCost === 0 ? baseCost : `$${totalAddonCost.toFixed(2)}/mo`;

  const addonOrder = ["foundational-cspm", "defender-cspm", "defender-servers"];

  const toggleAddon = (id: string) => {
    setAddedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setOpenAddonItems((o) => o.filter((v) => v !== id));
      } else {
        next.add(id);
        // Keep current open and auto-expand the next accordion
        const currentIndex = addonOrder.indexOf(id);
        const nextKey = addonOrder[currentIndex + 1];
        setOpenAddonItems((o) => {
          const updated = new Set(o);
          updated.add(id);
          if (nextKey) updated.add(nextKey);
          return Array.from(updated);
        });
      }
      return next;
    });
  };

  const allResources = [
    { id: "vm-1", name: "VM-01", type: "Virtual Machine", rg: "RG-01", location: "East US", tags: ["production", "web-tier"] },
    { id: "vm-2", name: "VM-02", type: "Virtual Machine", rg: "RG-01", location: "East US", tags: ["production", "web-tier"] },
    { id: "vm-3", name: "VM-03", type: "Virtual Machine", rg: "RG-02", location: "West US", tags: ["development"] },
    { id: "vm-4", name: "VM-04", type: "Virtual Machine", rg: "RG-02", location: "West US", tags: ["staging", "pre-prod"] },
    { id: "vm-5", name: "VM-05", type: "Virtual Machine", rg: "RG-03", location: "East US", tags: ["production", "web-tier"] },
    { id: "vm-6", name: "VM-06", type: "Virtual Machine", rg: "RG-03", location: "East US", tags: ["production", "api-tier"] },
    { id: "vm-7", name: "VM-07", type: "Virtual Machine", rg: "RG-04", location: "Central US", tags: ["production", "sensitive", "database"] },
    { id: "vm-8", name: "VM-08", type: "Virtual Machine", rg: "RG-04", location: "Central US", tags: ["production", "batch"] },
    { id: "vm-9", name: "VM-09", type: "Virtual Machine", rg: "RG-05", location: "East US", tags: ["production", "batch"] },
    { id: "vm-10", name: "VM-10", type: "Virtual Machine", rg: "RG-05", location: "East US", tags: ["batch", "compute"] },
    { id: "vm-11", name: "VM-11", type: "Virtual Machine", rg: "RG-06", location: "West US", tags: ["production", "cache"] },
    { id: "vm-12", name: "VM-12", type: "Virtual Machine", rg: "RG-06", location: "West US", tags: ["network", "sensitive"] },
    { id: "vm-13", name: "VM-13", type: "Virtual Machine", rg: "RG-07", location: "Central US", tags: ["operations", "monitoring"] },
    { id: "vm-14", name: "VM-14", type: "Virtual Machine", rg: "RG-07", location: "Central US", tags: ["operations", "sensitive"] },
    { id: "vm-15", name: "VM-15", type: "Virtual Machine", rg: "RG-08", location: "East US", tags: ["devops", "ci-cd"] },
    { id: "vm-16", name: "VM-16", type: "Arc machine", rg: "RG-08", location: "East US", tags: ["production", "sensitive", "database"] },
    { id: "vm-17", name: "VM-17", type: "Arc machine", rg: "RG-09", location: "West US", tags: ["production", "sensitive", "database"] },
    { id: "vm-18", name: "VM-18", type: "Arc machine", rg: "RG-09", location: "West US", tags: ["development", "database"] },
    { id: "vm-19", name: "VM-19", type: "Virtual Machine", rg: "RG-10", location: "Central US", tags: ["kubernetes", "compute"] },
    { id: "vm-20", name: "VM-20", type: "Virtual Machine", rg: "RG-10", location: "Central US", tags: ["kubernetes", "compute"] },
    { id: "vm-21", name: "VM-21", type: "Virtual Machine", rg: "RG-11", location: "East US", tags: ["kubernetes", "compute"] },
    { id: "vm-22", name: "VM-22", type: "Virtual Machine", rg: "RG-11", location: "East US", tags: ["production", "cache"] },
    { id: "vm-23", name: "VM-23", type: "Virtual Machine", rg: "RG-12", location: "West US", tags: ["production", "web-tier"] },
    { id: "vm-24", name: "VM-24", type: "Virtual Machine", rg: "RG-12", location: "West US", tags: ["network", "sensitive"] },
    { id: "vm-25", name: "VM-25", type: "Arc machine", rg: "RG-13", location: "Central US", tags: ["network", "infrastructure"] },
    { id: "vm-26", name: "VM-26", type: "Arc machine", rg: "RG-13", location: "Central US", tags: ["identity", "sensitive"] },
    { id: "vm-27", name: "VM-27", type: "Arc machine", rg: "RG-14", location: "East US", tags: ["identity", "sensitive"] },
    { id: "vm-28", name: "VM-28", type: "Arc machine", rg: "RG-14", location: "East US", tags: ["storage", "file-services"] },
    { id: "vm-29", name: "VM-29", type: "Arc machine", rg: "RG-15", location: "West US", tags: ["storage", "backup"] },
    { id: "vm-30", name: "VM-30", type: "Virtual Machine", rg: "RG-15", location: "West US", tags: ["testing"] },
    { id: "vm-31", name: "VM-31", type: "Virtual Machine", rg: "RG-16", location: "Central US", tags: ["testing"] },
    { id: "vm-32", name: "VM-32", type: "Virtual Machine", rg: "RG-16", location: "Central US", tags: ["testing", "performance"] },
    { id: "vm-33", name: "VM-33", type: "Arc machine", rg: "RG-17", location: "East US", tags: ["data", "analytics"] },
    { id: "vm-34", name: "VM-34", type: "Arc machine", rg: "RG-17", location: "East US", tags: ["data", "production"] },
    { id: "vm-35", name: "VM-35", type: "Arc machine", rg: "RG-18", location: "West US", tags: ["data", "compute"] },
  ];

  const includedCount = allResources.length - excludedResources.size;

  const uniqueNames = [...new Set(allResources.map((r) => r.name))].sort();
  const uniqueTypes = [...new Set(allResources.map((r) => r.type))].sort();
  const uniqueLocations = [...new Set(allResources.map((r) => r.location))].sort();
  const uniqueTags = [...new Set(allResources.flatMap((r) => r.tags))].sort();

  const applyPillFilters = (resources: typeof allResources) => {
    return resources.filter((r) => {
      if (filterName.size > 0 && !filterName.has(r.name)) return false;
      if (filterType.size > 0 && !filterType.has(r.type)) return false;
      if (filterLocation.size > 0 && !filterLocation.has(r.location)) return false;
      if (filterTag.size > 0 && !r.tags.some((t) => filterTag.has(t))) return false;
      if (bladeTextFilter.trim()) {
        const q = bladeTextFilter.toLowerCase();
        if (
          !r.name.toLowerCase().includes(q) &&
          !r.location.toLowerCase().includes(q) &&
          !r.tags.some((t) => t.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  };

  const handleClose = () => {
    onBack?.();
  };

  return (
    <NavigationProvider>
      <div className={styles.root}>
        <AzureHeaderBuildMVP
          activeLink="manage"
          isDarkMode={isDarkMode}
          onLogoClick={onHome}
          onSuggestionSelect={onSearchSelect}
        />

        <PageBreadcrumb
          noBorder
          items={[
            { label: "Home", onClick: onHome },
            { label: "Compute Infrastructure | Virtual machines", onClick: onBack },
            { label: "Enable Essential Machine Management" },
          ]}
        />

        <div className={styles.mainArea}>
          {/* Page title */}
          <Text className={styles.pageTitle}>
            Enable Essential Machine Management
          </Text>

          {/* ═══════════ STEP: CONFIG ═══════════ */}
          {step === "config" && (
            <>
              {/* Form fields — single column */}
              <div className={styles.formSection}>
                <div className={styles.twoColGrid}>
                  {/* Subscription */}
                  <div className={styles.formField}>
                    <div className={styles.labelRow}>
                      <Text className={styles.labelRequired}>
                        Choose a subscription <Text className={styles.asterisk}>*</Text>
                      </Text>
                      <Info16Regular />
                    </div>
                    <Combobox
                      placeholder="Select subscription"
                      freeform
                      value={subscriptionQuery}
                      selectedOptions={subscription ? [subscription] : []}
                      onChange={(e) => {
                        setSubscriptionQuery(e.target.value);
                        if (!e.target.value) setSubscription("");
                      }}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue) {
                          setSubscription(data.optionValue as string);
                          setSubscriptionQuery(data.optionValue as string);
                        }
                      }}
                    >
                      {filteredSubscriptions.map((s) => (
                        <Option key={s.name} value={s.name} text={s.name}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: tokens.spacingVerticalXXS,
                            }}
                          >
                            <Text weight="semibold" size={300}>
                              {s.name}
                            </Text>
                            <Text
                              size={200}
                              style={{ color: tokens.colorNeutralForeground3 }}
                            >
                              Virtual machines: {s.vms} · Arc machines: {s.arc}
                            </Text>
                          </div>
                        </Option>
                      ))}
                    </Combobox>
                    {defaultSubscription && (
                      <div className={styles.infoMessage}>
                        <Info12Regular className={styles.infoMessageIcon} />
                        <Text size={200}>
                          {defaultVmName
                            ? `Auto-filled. ${defaultVmName} is in this subscription.`
                            : "Auto-filled based on your current context."}
                        </Text>
                      </div>
                    )}
                    {subscription && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.spacingHorizontalM,
                        }}
                      >
                        <Text
                          size={200}
                          style={{ color: tokens.colorNeutralForeground3 }}
                        >
                          {excludedResources.size > 0
                            ? `${machineCount - excludedResources.size} included · ${excludedResources.size} excluded machines in ${subscription}`
                            : `${machineCount} machines in ${subscription}`}
                        </Text>
                        <Link
                          className={styles.excludeAnchorLink}
                          onClick={() => {
                            setShowResourceBlade(true);
                            setBladeHasChanges(false);
                          }}
                        >
                          Exclude machines
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Managed identity */}
                  <div className={styles.formField}>
                    <div className={styles.labelRow}>
                      <Text className={styles.labelRequired}>
                        Managed identity{" "}
                        <Text className={styles.asterisk}>*</Text>
                      </Text>
                      <Info16Regular />
                    </div>
                    <Dropdown
                      placeholder="Select managed identity"
                      value={managedIdentity}
                      selectedOptions={managedIdentity ? [managedIdentity] : []}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue)
                          setManagedIdentity(data.optionValue as string);
                      }}
                    >
                      <Option value="managed-identity-01">
                        managed-identity-01
                      </Option>
                      <Option value="system-identity-01">
                        system-identity-01
                      </Option>
                    </Dropdown>
                  </div>

                  {/* Log analytics workspace */}
                  <div className={styles.formField}>
                    <div className={styles.labelRow}>
                      <Text className={styles.labelRequired}>
                        Log analytics workspace{" "}
                        <Text className={styles.asterisk}>*</Text>
                      </Text>
                      <Info16Regular />
                    </div>
                    <Dropdown
                      placeholder="Select log analytics workspace"
                      value={logWorkspace}
                      selectedOptions={logWorkspace ? [logWorkspace] : []}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue)
                          setLogWorkspace(data.optionValue as string);
                      }}
                    >
                      <Option value="log-workspace-01">
                        log-workspace-01
                      </Option>
                      <Option value="default-workspace">
                        default-workspace
                      </Option>
                    </Dropdown>
                    <div
                      className={styles.aiRecommendation}
                      onClick={() => setLogWorkspace("log-workspace-01")}
                    >
                      <Sparkle20Regular
                        className={styles.aiRecommendationIcon}
                      />
                      <Text size={200} style={{ color: "inherit" }}>
                        AI recommends:{" "}
                        <Text
                          weight="semibold"
                          size={200}
                          style={{ color: "inherit" }}
                        >
                          log-workspace-01
                        </Text>
                      </Text>
                    </div>
                  </div>

                  {/* Azure Monitor agent configuration */}
                  <div className={styles.formField}>
                    <div className={styles.labelRow}>
                      <Text className={styles.labelRequired}>
                        Azure Monitor agent configuration <Text className={styles.asterisk}>*</Text>
                      </Text>
                      <Info16Regular />
                    </div>
                    <Dropdown
                      placeholder="Select Azure Monitor configuration"
                      value={azureMonitor}
                      selectedOptions={azureMonitor ? [azureMonitor] : []}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue)
                          setAzureMonitor(data.optionValue as string);
                      }}
                    >
                      <Option value="Custom configuration">
                        Custom configuration
                      </Option>
                      <Option value="Default configuration">
                        Default configuration
                      </Option>
                    </Dropdown>
                    <div
                      className={styles.aiRecommendation}
                      onClick={() => setAzureMonitor("Default configuration")}
                    >
                      <Sparkle20Regular
                        className={styles.aiRecommendationIcon}
                      />
                      <Text size={200} style={{ color: "inherit" }}>
                        AI recommends:{" "}
                        <Text
                          weight="semibold"
                          size={200}
                          style={{ color: "inherit" }}
                        >
                          Default configuration
                        </Text>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add-ons section */}
              <div className={styles.formSection}>
                <div className={styles.formField}>
                  <Text className={styles.addonsTitle}>Add-ons</Text>
                  <Text className={styles.addonsDesc}>
                    Select a use case to get recommended add-ons to optimize
                    your subscription for improved security, cost savings, and
                    additional capabilities.
                  </Text>
                </div>

                <div className={styles.addonsFormField}>
                  <div className={styles.labelRow}>
                    <Text className={styles.labelRequired}>Use case</Text>
                    <Info16Regular />
                  </div>
                  <Dropdown
                    placeholder="Select use cases"
                    multiselect
                    value={
                      Array.from(useCases)
                        .map((v) => useCaseLabels[v])
                        .join(", ") || ""
                    }
                    selectedOptions={Array.from(useCases)}
                    onOptionSelect={(_, data) => {
                      setUseCases((prev) => {
                        const next = new Set(prev);
                        const val = data.optionValue as string;
                        if (next.has(val)) next.delete(val);
                        else next.add(val);
                        return next;
                      });
                    }}
                  >
                    <Option value="compliance">
                      Maintain updates and compliance
                    </Option>
                    <Option value="monitor">Monitor performance</Option>
                    <Option value="cost">Optimize costs</Option>
                    <Option value="secure">Secure and govern machines</Option>
                    <Option value="simplify">Simplify management</Option>
                  </Dropdown>
                </div>

                {useCases.has("secure") && (
                  <div className={styles.addonCardsStack}>
                    <Accordion
                      collapsible
                      multiple
                      openItems={openAddonItems}
                      onToggle={(_, data) =>
                        setOpenAddonItems(data.openItems as string[])
                      }
                    >
                      <AccordionItem value="foundational-cspm">
                        <AccordionHeader size="small">
                          <div className={styles.addonAccordionHeader}>
                            <div className={styles.addonHeaderLeft}>
                              <Text className={styles.addonCardTitle}>
                                Foundational CSPM
                              </Text>
                              <Badge
                                appearance="tint"
                                color="informative"
                                size="small"
                              >
                                Included
                              </Badge>
                            </div>
                            <div className={styles.addonHeaderRight}>
                              <Text className={styles.addonPriceInline}>
                                Free
                              </Text>
                              {addedAddons.has("foundational-cspm") ? (
                                <span
                                  className={styles.addedButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAddon("foundational-cspm");
                                  }}
                                >
                                  <Checkmark16Regular />
                                  <Text size={200}>Added</Text>
                                </span>
                              ) : (
                                <span
                                  className={styles.addButtonInHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAddon("foundational-cspm");
                                  }}
                                >
                                  Add
                                </span>
                              )}
                            </div>
                          </div>
                        </AccordionHeader>
                        <AccordionPanel>
                          <Text className={styles.addonCardDesc}>
                            Continuously assess your cloud environment with
                            agentless, risk-prioritized insights.{" "}
                            <Link inline>Learn more</Link>
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem value="defender-cspm">
                        <AccordionHeader size="small">
                          <div className={styles.addonAccordionHeader}>
                            <div className={styles.addonHeaderLeft}>
                              <Text className={styles.addonCardTitle}>
                                Defender CSPM
                              </Text>
                              <Badge
                                appearance="tint"
                                color="success"
                                size="small"
                              >
                                Recommended
                              </Badge>
                            </div>
                            <div className={styles.addonHeaderRight}>
                              <Text className={styles.addonPriceInline}>
                                $14.88/mo
                              </Text>
                              {addedAddons.has("defender-cspm") ? (
                                <span
                                  className={styles.addedButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAddon("defender-cspm");
                                  }}
                                >
                                  <Checkmark16Regular />
                                  <Text size={200}>Added</Text>
                                </span>
                              ) : (
                                <span
                                  className={styles.addButtonInHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAddon("defender-cspm");
                                  }}
                                >
                                  Add
                                </span>
                              )}
                            </div>
                          </div>
                        </AccordionHeader>
                        <AccordionPanel>
                          <Text className={styles.addonCardDesc}>
                            Identifies misconfigurations, exposed secrets, and
                            compliance risks across multi-cloud workloads.{" "}
                            <Link inline>Learn more</Link>
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem value="defender-servers">
                        <AccordionHeader size="small">
                          <div className={styles.addonAccordionHeader}>
                            <div className={styles.addonHeaderLeft}>
                              <Text className={styles.addonCardTitle}>
                                Defender for Servers Plan 2
                              </Text>
                              <Badge
                                appearance="tint"
                                color="success"
                                size="small"
                              >
                                Recommended
                              </Badge>
                            </div>
                            <div className={styles.addonHeaderRight}>
                              <Text className={styles.addonPriceInline}>
                                $24.36/mo
                              </Text>
                              {addedAddons.has("defender-servers") ? (
                                <span
                                  className={styles.addedButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAddon("defender-servers");
                                  }}
                                >
                                  <Checkmark16Regular />
                                  <Text size={200}>Added</Text>
                                </span>
                              ) : (
                                <span
                                  className={styles.addButtonInHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAddon("defender-servers");
                                  }}
                                >
                                  Add
                                </span>
                              )}
                            </div>
                          </div>
                        </AccordionHeader>
                        <AccordionPanel>
                          <Text className={styles.addonCardDesc}>
                            Comprehensive server protection with EDR,
                            vulnerability management, and advanced threat
                            detection. <Link inline>Learn more</Link>
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>

              {/* Cost & Impact summary */}
              <div className={styles.costImpactGrid}>
                <div className={styles.impactCard}>
                  <Text className={styles.impactTitle}>What gets enabled</Text>
                  <Text size={200}>
                    Enable these capabilities for{" "}
                    <Text weight="semibold">{includedCount} resources</Text> in{" "}
                    <Text weight="semibold">{subscription || "Sub-01"}</Text> in
                    one place:
                  </Text>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr",
                      gap: tokens.spacingHorizontalXXL,
                      alignItems: "start",
                    }}
                  >
                    <ul className={styles.impactList}>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Monitor</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Update Manager</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Machine Configuration</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Change Tracking &amp; Inventory</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Security Baseline Policy</Text>
                      </li>
                    </ul>
                    {useCases.has("secure") && addedAddons.size > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: tokens.spacingVerticalXS,
                        }}
                      >
                        <Text size={200} weight="semibold">
                          Add-ons:
                        </Text>
                        <ul className={styles.impactList}>
                          {Array.from(addedAddons).map((id) => (
                            <li key={id} className={styles.impactItem}>
                              <CheckmarkCircle16Filled
                                className={styles.impactCheckIcon}
                              />
                              <Text>{addonLabels[id]}</Text>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.costCard}>
                  <Text className={styles.costTitle}>Cost summary</Text>
                  <div className={styles.costStatsRow}>
                    <div className={styles.costStatCol}>
                      <Text className={styles.costLabel}>Price:</Text>
                      <Text className={styles.costValueBlack}>
                        {costDisplay}
                      </Text>
                    </div>
                    <div className={styles.costStatCol}>
                      <Text className={styles.costLabel}>
                        Estimated monthly savings
                      </Text>
                      <Text className={styles.costValue}>$5,773.77</Text>
                    </div>
                  </div>
                  <Button
                    appearance="outline"
                    size="small"
                    style={{
                      alignSelf: "flex-start",
                      marginTop: tokens.spacingVerticalM,
                    }}
                  >
                    View details
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* ═══════════ STEP: SUMMARY ═══════════ */}
          {step === "summary" && (
            <>
              <div className={styles.formSection}>
                <div className={styles.reviewSection}>
                  <Text className={styles.reviewGroupTitle}>Summary</Text>
                  <Accordion collapsible multiple defaultOpenItems={["basics"]}>
                    <AccordionItem value="basics">
                      <AccordionHeader size="small">Basics</AccordionHeader>
                      <AccordionPanel>
                        <div className={styles.reviewGroup}>
                          <div className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              Subscription
                            </Text>
                            <Text className={styles.reviewValue}>
                              {subscription}
                            </Text>
                          </div>
                          <div className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              Log analytics workspace
                            </Text>
                            <Text className={styles.reviewValue}>
                              {logWorkspace || "—"}
                            </Text>
                          </div>
                          <div className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              Managed identity
                            </Text>
                            <Text className={styles.reviewValue}>
                              {managedIdentity || "—"}
                            </Text>
                          </div>
                          <div className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              Azure Monitor
                            </Text>
                            <Text className={styles.reviewValue}>
                              {azureMonitor || "—"}
                            </Text>
                          </div>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem value="addons">
                      <AccordionHeader size="small">Add-ons</AccordionHeader>
                      <AccordionPanel>
                        <div className={styles.reviewGroup}>
                          <div className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              Use cases
                            </Text>
                            <Text className={styles.reviewValue}>
                              {useCases.size > 0
                                ? Array.from(useCases)
                                    .map((v) => useCaseLabels[v])
                                    .join(", ")
                                : "—"}
                            </Text>
                          </div>
                          {Array.from(addedAddons).map((id) => (
                            <div key={id} className={styles.reviewRow}>
                              <Text className={styles.reviewLabel}>
                                {addonLabels[id]}
                              </Text>
                              <Text className={styles.reviewValue}>
                                {addonPrices[id] === 0
                                  ? "Free"
                                  : `$${addonPrices[id].toFixed(2)}/mo`}
                              </Text>
                            </div>
                          ))}
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem value="resources">
                      <AccordionHeader size="small">Resources</AccordionHeader>
                      <AccordionPanel>
                        <div className={styles.reviewGroup}>
                          <div className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              Included resources
                            </Text>
                            <Text className={styles.reviewValue}>
                              {includedCount} of {allResources.length}
                            </Text>
                          </div>
                          {excludedResources.size > 0 && (
                            <div className={styles.reviewRow}>
                              <Text className={styles.reviewLabel}>
                                Excluded
                              </Text>
                              <Text className={styles.reviewValue}>
                                {excludedResources.size} resources
                              </Text>
                            </div>
                          )}
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Resources in subscription */}
              <div className={styles.excludeSection}>
                <div className={styles.resourceSectionHeaderRow}>
                  <div>
                    <Text className={styles.excludeLabel}>
                      Resources in subscription: {subscription || "Sub-01"}
                    </Text>
                    <Text className={styles.resourceCountsText}>
                      {includedCount} included · {excludedResources.size}{" "}
                      excluded
                    </Text>
                  </div>
                  <Button
                    appearance="secondary"
                    size="small"
                    onClick={() => {
                      setShowResourceBlade(true);
                      setBladeHasChanges(false);
                    }}
                  >
                    Exclude resources
                  </Button>
                </div>
              </div>

              {/* Cost & Impact in summary */}
              <div className={styles.costImpactGrid}>
                <div className={styles.impactCard}>
                  <Text className={styles.impactTitle}>What gets enabled</Text>
                  <Text size={200}>
                    Enable these capabilities for{" "}
                    <Text weight="semibold">{includedCount} resources</Text> in{" "}
                    <Text weight="semibold">{subscription || "Sub-01"}</Text> in
                    one place:
                  </Text>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr",
                      gap: tokens.spacingHorizontalXXL,
                      alignItems: "start",
                    }}
                  >
                    <ul className={styles.impactList}>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Monitor</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Update Manager</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Machine Configuration</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Change Tracking &amp; Inventory</Text>
                      </li>
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled
                          className={styles.impactCheckIcon}
                        />
                        <Text>Azure Security Baseline Policy</Text>
                      </li>
                    </ul>
                    {useCases.has("secure") && addedAddons.size > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: tokens.spacingVerticalXS,
                        }}
                      >
                        <Text size={200} weight="semibold">
                          Add-ons:
                        </Text>
                        <ul className={styles.impactList}>
                          {Array.from(addedAddons).map((id) => (
                            <li key={id} className={styles.impactItem}>
                              <CheckmarkCircle16Filled
                                className={styles.impactCheckIcon}
                              />
                              <Text>{addonLabels[id]}</Text>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.costCard}>
                  <Text className={styles.costTitle}>Cost summary</Text>
                  <div className={styles.costStatsRow}>
                    <div className={styles.costStatCol}>
                      <Text className={styles.costLabel}>Price:</Text>
                      <Text className={styles.costValueBlack}>
                        {costDisplay}
                      </Text>
                    </div>
                    <div className={styles.costStatCol}>
                      <Text className={styles.costLabel}>
                        Estimated monthly savings
                      </Text>
                      <Text className={styles.costValue}>$5,773.77</Text>
                    </div>
                  </div>
                  <Button
                    appearance="outline"
                    size="small"
                    style={{
                      alignSelf: "flex-start",
                      marginTop: tokens.spacingVerticalM,
                    }}
                  >
                    View details
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* ═══════════ STEP: SUCCESS ═══════════ */}
          {step === "success" && (
            <div className={styles.formSection}>
              <Text className={styles.successTitle}>You&apos;re all set!</Text>
              <div className={styles.successBanner}>
                <CheckmarkCircle16Filled className={styles.successBannerIcon} />
                <div className={styles.successBannerText}>
                  <Text size={300} weight="semibold">
                    Essential Machine Management enabled
                  </Text>
                  <Text size={200}>
                    {includedCount} resources enrolled in {subscription} now
                    have management capabilities enabled
                  </Text>
                </div>
              </div>

              <div className={styles.successSubInfo}>
                <div className={styles.successSubRow}>
                  <Text size={200} className={styles.reviewLabel}>
                    Subscription
                  </Text>
                  <Text size={200} weight="semibold">
                    {subscription}
                  </Text>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: tokens.spacingHorizontalXXL }}
              >
                <div>
                  <Text className={styles.successSectionLabel}>
                    Enabled capabilities
                  </Text>
                  <div className={styles.successCapabilitiesGrid}>
                    <div className={styles.successCapItem}>
                      <CheckmarkCircle16Filled
                        className={styles.successCapIcon}
                      />
                      <Text size={200}>Azure Monitor</Text>
                    </div>
                    <div className={styles.successCapItem}>
                      <CheckmarkCircle16Filled
                        className={styles.successCapIcon}
                      />
                      <Text size={200}>Azure Update Manager</Text>
                    </div>
                    <div className={styles.successCapItem}>
                      <CheckmarkCircle16Filled
                        className={styles.successCapIcon}
                      />
                      <Text size={200}>Machine Configuration</Text>
                    </div>
                    <div className={styles.successCapItem}>
                      <CheckmarkCircle16Filled
                        className={styles.successCapIcon}
                      />
                      <Text size={200}>Change Tracking</Text>
                    </div>
                    <div className={styles.successCapItem}>
                      <CheckmarkCircle16Filled
                        className={styles.successCapIcon}
                      />
                      <Text size={200}>Security Baseline Policy</Text>
                    </div>
                  </div>
                </div>

                {addedAddons.size > 0 && (
                  <div>
                    <Text className={styles.successSectionLabel}>Add-ons</Text>
                    <div className={styles.successCapabilitiesGrid}>
                      {Array.from(addedAddons).map((id) => (
                        <div key={id} className={styles.successCapItem}>
                          <CheckmarkCircle16Filled
                            className={styles.successCapIcon}
                          />
                          <Text size={200}>{addonLabels[id]}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.successDivider} />

              <div className={styles.summaryGrid}>
                <Card className={styles.summaryCard}>
                  <Text className={styles.summaryCardTitle}>Cost</Text>
                  <div className={styles.statBoxes}>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Price</Text>
                      <Text className={styles.statBoxValueGreen}>
                        {costDisplay}
                      </Text>
                    </div>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>
                        Est. monthly savings
                      </Text>
                      <Text className={styles.statBoxValueGreen}>
                        $5,773.77
                      </Text>
                    </div>
                  </div>
                </Card>
                <Card className={styles.summaryCard}>
                  <Text className={styles.summaryCardTitle}>Machines</Text>
                  <div className={styles.statBoxes}>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Enrolled</Text>
                      <Text className={styles.statBoxValueNeutral}>
                        {includedCount}
                      </Text>
                    </div>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Excluded</Text>
                      <Text className={styles.statBoxValueNeutral}>
                        {excludedResources.size}
                      </Text>
                    </div>
                  </div>
                </Card>
                <Card className={styles.summaryCard}>
                  <Text className={styles.summaryCardTitle}>Alerts</Text>
                  <div className={styles.statBoxes}>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Active issues</Text>
                      <Text className={styles.statBoxValueNeutral}>3</Text>
                    </div>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Critical</Text>
                      <Text className={styles.statBoxValueNeutral}>0</Text>
                    </div>
                  </div>
                </Card>
              </div>

              <Button
                appearance="primary"
                size="medium"
                style={{
                  alignSelf: "flex-start",
                  marginTop: tokens.spacingVerticalM,
                }}
                onClick={onViewDashboard}
              >
                View dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {step === "config" && (
            <>
              <Button appearance="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                appearance="secondary"
                icon={<ArrowRight20Regular />}
                iconPosition="after"
                disabled={
                  !subscription ||
                  !managedIdentity ||
                  !logWorkspace ||
                  !azureMonitor
                }
                onClick={() => setStep("summary")}
              >
                Next
              </Button>
            </>
          )}
          {step === "summary" && (
            <>
              <Button
                appearance="transparent"
                icon={<ChevronLeft20Regular />}
                onClick={() => setStep("config")}
              />
              <Button
                appearance="primary"
                icon={<Checkmark20Regular />}
                onClick={() => {
                  // Save configuration to shared state
                  const vmCount = allResources.filter(r => r.type === "Virtual Machine" && !excludedResources.has(r.id)).length;
                  const arcCount = allResources.filter(r => r.type === "Arc machine" && !excludedResources.has(r.id)).length;
                  emmState.enable({
                    subscription: subscription || "Sub-01",
                    addons: Array.from(addedAddons),
                    excludedResourceIds: Array.from(excludedResources),
                    totalResources: allResources.length - excludedResources.size,
                    vmCount,
                    arcCount,
                    enabledAt: new Date().toISOString(),
                  });
                  setStep("success");
                }}
              >
                Enable
              </Button>
            </>
          )}
          {step === "success" && (
            <Button appearance="secondary" onClick={() => { onEnabled?.(); handleClose(); }}>
              Close
            </Button>
          )}
          <button className={styles.feedbackLink}>
            <PersonFeedback20Regular />
            Give feedback
          </button>
        </div>
      </div>

      {/* Resource blade overlay */}
      {showResourceBlade && (
        <div
          className={styles.bladeBackdrop}
          onClick={() => setShowResourceBlade(false)}
        >
          <div
            className={styles.bladePanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.bladeHeader}>
              <Text className={styles.bladeTitle}>
                Exclude machines in {subscription || "Sub-01"}
              </Text>
              <Button
                appearance="transparent"
                icon={<Dismiss20Regular />}
                onClick={() => setShowResourceBlade(false)}
              />
            </div>
            <div className={styles.bladeContent}>
              {/* Machine count cards */}
              {(() => {
                const sub = subscriptionOptions.find((s) => s.value === subscription) || subscriptionOptions[0];
                const totalMachines = sub.vms + sub.arc;
                return (
                  <div style={{ display: "flex", gap: tokens.spacingHorizontalM, alignSelf: "stretch" }}>
                    <div style={{
                      flex: 1,
                      backgroundColor: tokens.colorNeutralBackground3,
                      borderRadius: tokens.borderRadiusMedium,
                      padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: tokens.spacingVerticalXXS,
                    }}>
                      <Text style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground2 }}>Total machines</Text>
                      <Text style={{ fontSize: tokens.fontSizeBase600, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 }}>{totalMachines}</Text>
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: tokens.colorNeutralBackground3,
                      borderRadius: tokens.borderRadiusMedium,
                      padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: tokens.spacingVerticalXXS,
                    }}>
                      <Text style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground2 }}>Virtual machines</Text>
                      <Text style={{ fontSize: tokens.fontSizeBase600, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 }}>{sub.vms}</Text>
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: tokens.colorNeutralBackground3,
                      borderRadius: tokens.borderRadiusMedium,
                      padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: tokens.spacingVerticalXXS,
                    }}>
                      <Text style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground2 }}>Arc machines</Text>
                      <Text style={{ fontSize: tokens.fontSizeBase600, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 }}>{sub.arc}</Text>
                    </div>
                  </div>
                );
              })()}

              {/* Filter bar */}
              <div className={styles.filterPillGroup}>
                <Input
                  contentBefore={<List20Regular />}
                  placeholder="Filter for any field..."
                  value={bladeTextFilter}
                  onChange={(_, data) => setBladeTextFilter(data.value)}
                  size="small"
                  style={{ width: "200px" }}
                />
                <Popover withArrow>
                  <PopoverTrigger disableButtonEnhancement>
                    <span className={styles.filterPill}>
                      Name : <span className={styles.filterPillValue}>{filterName.size === 0 ? "all" : filterName.size === 1 ? [...filterName][0] : `${filterName.size} selected`}</span>
                      {filterName.size > 0 && (
                        <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setFilterName(new Set()); }}>
                          <Dismiss20Regular style={{ width: 12, height: 12 }} />
                        </button>
                      )}
                    </span>
                  </PopoverTrigger>
                  <PopoverSurface>
                    <div className={styles.filterPopoverList}>
                      {uniqueNames.map((n) => (
                        <button key={n} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(filterName, setFilterName, n)}>
                          <Checkbox size="medium" checked={filterName.has(n)} />
                          {n}
                        </button>
                      ))}
                    </div>
                  </PopoverSurface>
                </Popover>
                <Popover withArrow>
                  <PopoverTrigger disableButtonEnhancement>
                    <span className={styles.filterPill}>
                      Type : <span className={styles.filterPillValue}>{filterType.size === 0 ? "all" : filterType.size === 1 ? [...filterType][0] : `${filterType.size} selected`}</span>
                      {filterType.size > 0 && (
                        <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setFilterType(new Set()); }}>
                          <Dismiss20Regular style={{ width: 12, height: 12 }} />
                        </button>
                      )}
                    </span>
                  </PopoverTrigger>
                  <PopoverSurface>
                    <div className={styles.filterPopoverList}>
                      {uniqueTypes.map((t) => (
                        <button key={t} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(filterType, setFilterType, t)}>
                          <Checkbox size="medium" checked={filterType.has(t)} />
                          {t}
                        </button>
                      ))}
                    </div>
                  </PopoverSurface>
                </Popover>
                <Popover withArrow>
                  <PopoverTrigger disableButtonEnhancement>
                    <span className={styles.filterPill}>
                      Location : <span className={styles.filterPillValue}>{filterLocation.size === 0 ? "all" : filterLocation.size === 1 ? [...filterLocation][0] : `${filterLocation.size} selected`}</span>
                      {filterLocation.size > 0 && (
                        <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setFilterLocation(new Set()); }}>
                          <Dismiss20Regular style={{ width: 12, height: 12 }} />
                        </button>
                      )}
                    </span>
                  </PopoverTrigger>
                  <PopoverSurface>
                    <div className={styles.filterPopoverList}>
                      {uniqueLocations.map((loc) => (
                        <button key={loc} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(filterLocation, setFilterLocation, loc)}>
                          <Checkbox size="medium" checked={filterLocation.has(loc)} />
                          {loc}
                        </button>
                      ))}
                    </div>
                  </PopoverSurface>
                </Popover>
                <Popover withArrow>
                  <PopoverTrigger disableButtonEnhancement>
                    <span className={styles.filterPill}>
                      Tags : <span className={styles.filterPillValue}>{filterTag.size === 0 ? "all" : filterTag.size === 1 ? [...filterTag][0] : `${filterTag.size} selected`}</span>
                      {filterTag.size > 0 && (
                        <button className={styles.filterPillDismiss} onClick={(e) => { e.stopPropagation(); setFilterTag(new Set()); }}>
                          <Dismiss20Regular style={{ width: 12, height: 12 }} />
                        </button>
                      )}
                    </span>
                  </PopoverTrigger>
                  <PopoverSurface>
                    <div className={styles.filterPopoverList}>
                      {uniqueTags.map((tag) => (
                        <button key={tag} className={styles.filterPopoverItem} onClick={() => toggleFilterValue(filterTag, setFilterTag, tag)}>
                          <Checkbox size="medium" checked={filterTag.has(tag)} />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </PopoverSurface>
                </Popover>
              </div>

              {lastBulkExclude && (
                <div className={styles.undoBar}>
                  <Text size={200}>
                    Excluded {lastBulkExclude.length} resources
                  </Text>
                  <Button
                    appearance="transparent"
                    size="small"
                    onClick={handleUndoExclude}
                  >
                    Undo
                  </Button>
                </div>
              )}

              {/* Included machines accordion */}
              <Accordion collapsible defaultOpenItems={["included"]}>
                <AccordionItem value="included">
                  <AccordionHeader size="small">
                    Included machines ({(() => {
                      const included = allResources.filter((r) => !excludedResources.has(r.id));
                      return applyPillFilters(included).length;
                    })()})
                  </AccordionHeader>
                  <AccordionPanel>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: tokens.spacingVerticalS,
                        alignItems: "stretch",
                      }}
                    >
                      <Button
                        appearance="secondary"
                        size="small"
                        disabled={selectedForExclusion.size === 0}
                        onClick={handleBulkExclude}
                        style={{ alignSelf: "flex-start" }}
                      >
                        Exclude ({selectedForExclusion.size})
                      </Button>
                      <div className={styles.resourceGrid}>
                        <div className={styles.resourceGridHeader}>
                          <Checkbox
                            size="medium"
                            checked={(() => {
                              const included = applyPillFilters(allResources.filter(
                                (r) => !excludedResources.has(r.id),
                              ));
                              if (included.length === 0) return false;
                              if (selectedForExclusion.size === included.length)
                                return true;
                              if (selectedForExclusion.size === 0) return false;
                              return "mixed" as const;
                            })()}
                            onChange={() => {
                              const included = applyPillFilters(allResources.filter(
                                (r) => !excludedResources.has(r.id),
                              ));
                              if (
                                selectedForExclusion.size === included.length
                              ) {
                                setSelectedForExclusion(new Set());
                              } else {
                                setSelectedForExclusion(
                                  new Set(included.map((r) => r.id)),
                                );
                              }
                            }}
                          />
                          <Text className={styles.resourceGridHeaderText}>
                            Name
                          </Text>
                          <Text className={styles.resourceGridHeaderText}>
                            Type
                          </Text>
                          <Text className={styles.resourceGridHeaderText}>
                            Location
                          </Text>
                          <Text className={styles.resourceGridHeaderText}>
                            Tags
                          </Text>
                        </div>
                        {(() => {
                          const included = applyPillFilters(allResources.filter(
                            (r) => !excludedResources.has(r.id),
                          ));
                          return included.map((r) => (
                            <div key={r.id} className={styles.resourceGridRow}>
                              <Checkbox
                                size="medium"
                                checked={selectedForExclusion.has(r.id)}
                                onChange={() => toggleResource(r.id)}
                              />
                              <Link className={styles.resourceGridLink}>
                                {r.name}
                              </Link>
                              <Text className={styles.resourceGridCell}>
                                {r.type}
                              </Text>
                              <Text className={styles.resourceGridCell}>
                                {r.location}
                              </Text>
                              <Text className={styles.resourceGridCell}>
                                {r.tags.join(", ")}
                              </Text>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* Excluded machines accordion */}
              <Accordion
                collapsible
                openItems={excludedAccordionOpen ? ["excluded"] : []}
                onToggle={(_, data) =>
                  setExcludedAccordionOpen(data.openItems.includes("excluded"))
                }
              >
                <AccordionItem value="excluded">
                  <AccordionHeader size="small">
                    Excluded machines ({excludedResources.size})
                  </AccordionHeader>
                  <AccordionPanel>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: tokens.spacingVerticalS,
                        alignItems: "stretch",
                      }}
                    >
                      {excludedResources.size === 0 ? (
                        <Text className={styles.emptyState}>
                          No resources excluded
                        </Text>
                      ) : (
                        <>
                          {excludeStatusLabel && (
                            <Text className={styles.excludeStatusText}>
                              Excluded resources: {excludeStatusLabel}
                            </Text>
                          )}
                          <Button
                            appearance="secondary"
                            size="small"
                            disabled={selectedForAddBack.size === 0}
                            onClick={handleBulkAddBack}
                            style={{ alignSelf: "flex-start" }}
                          >
                            Add back ({selectedForAddBack.size})
                          </Button>
                          <div className={styles.resourceGrid}>
                            <div className={styles.resourceGridHeader}>
                              <Checkbox
                                size="medium"
                                checked={
                                  excludedResources.size > 0 &&
                                  selectedForAddBack.size ===
                                    excludedResources.size
                                    ? true
                                    : selectedForAddBack.size === 0
                                      ? false
                                      : "mixed"
                                }
                                onChange={() => {
                                  if (
                                    selectedForAddBack.size ===
                                    excludedResources.size
                                  ) {
                                    setSelectedForAddBack(new Set());
                                  } else {
                                    setSelectedForAddBack(
                                      new Set(excludedResources),
                                    );
                                  }
                                }}
                              />
                              <Text className={styles.resourceGridHeaderText}>
                                Name
                              </Text>
                              <Text className={styles.resourceGridHeaderText}>
                                Type
                              </Text>
                              <Text className={styles.resourceGridHeaderText}>
                                Location
                              </Text>
                              <Text className={styles.resourceGridHeaderText}>
                                Tags
                              </Text>
                            </div>
                            {allResources
                              .filter((r) => excludedResources.has(r.id))
                              .map((r) => (
                                <div
                                  key={r.id}
                                  className={styles.resourceGridRow}
                                >
                                  <Checkbox
                                    size="medium"
                                    checked={selectedForAddBack.has(r.id)}
                                    onChange={() =>
                                      toggleSelectedForAddBack(r.id)
                                    }
                                  />
                                  <Link className={styles.resourceGridLink}>
                                    {r.name}
                                  </Link>
                                  <Text className={styles.resourceGridCell}>
                                    {r.type}
                                  </Text>
                                  <Text className={styles.resourceGridCell}>
                                    {r.location}
                                  </Text>
                                  <Text className={styles.resourceGridCell}>
                                    {r.tags.join(", ")}
                                  </Text>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
            {/* Blade footer */}
            <div
              style={{
                flexShrink: 0,
                padding: tokens.spacingVerticalL,
                borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
                backgroundColor: tokens.colorNeutralBackground1,
                display: "flex",
                justifyContent: "flex-start",
                gap: tokens.spacingHorizontalS,
              }}
            >
              <Button
                appearance="secondary"
                size="small"
                onClick={() => setShowResourceBlade(false)}
              >
                Close
              </Button>
              <Button
                appearance={bladeHasChanges ? "primary" : "secondary"}
                size="small"
                disabled={!bladeHasChanges}
                onClick={() => setShowResourceBlade(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FRE Dialog */}
      {showFre && (
        <div className={styles.freOverlay}>
          <div className={styles.freDialog}>
            <div className={styles.freHero}>
              <div className={styles.freHubContainer}>
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                >
                  <line
                    x1="190"
                    y1="100"
                    x2="66"
                    y2="28"
                    stroke="#0078D4"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="190"
                    y1="100"
                    x2="314"
                    y2="28"
                    stroke="#0078D4"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="190"
                    y1="100"
                    x2="24"
                    y2="100"
                    stroke="#0078D4"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="190"
                    y1="100"
                    x2="86"
                    y2="172"
                    stroke="#0078D4"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="190"
                    y1="100"
                    x2="294"
                    y2="172"
                    stroke="#0078D4"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="190"
                    y1="100"
                    x2="356"
                    y2="100"
                    stroke="#0078D4"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                  />
                </svg>
                <div className={styles.freHubCenter}>
                  <img
                    src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
                    alt="EMM"
                    className={styles.freHubCenterIcon}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <div
                  className={styles.freSpoke}
                  style={{ top: "4px", left: "42px" }}
                >
                  <Eye20Regular className={styles.freSpokeIcon} />
                </div>
                <div
                  className={styles.freSpoke}
                  style={{ top: "4px", right: "42px" }}
                >
                  <ArrowSync20Regular className={styles.freSpokeIcon} />
                </div>
                <div
                  className={styles.freSpoke}
                  style={{
                    top: "50%",
                    left: "0px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Shield20Regular className={styles.freSpokeIcon} />
                </div>
                <div
                  className={styles.freSpoke}
                  style={{ bottom: "4px", left: "62px" }}
                >
                  <DocumentBulletList20Regular
                    className={styles.freSpokeIcon}
                  />
                </div>
                <div
                  className={styles.freSpoke}
                  style={{ bottom: "4px", right: "62px" }}
                >
                  <ShieldCheckmark20Regular className={styles.freSpokeIcon} />
                </div>
                <div
                  className={styles.freSpoke}
                  style={{
                    top: "50%",
                    right: "0px",
                    transform: "translateY(-50%)",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "#0078D4",
                    backgroundColor: tokens.colorNeutralBackground1,
                  }}
                >
                  <Add20Regular className={styles.freSpokeIcon} />
                </div>
              </div>
            </div>
            <div className={styles.freBody}>
              <Text className={styles.freTitle}>
                Essential machine management
              </Text>
              <Text className={styles.freDesc}>
                Enable centralized management with essential capabilities:
              </Text>
              <div className={styles.freCapabilityList}>
                <div className={styles.freCapabilityRow}>
                  <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                  <Text className={styles.freCapabilityText}>
                    <span className={styles.freCapabilityBold}>
                      Azure Monitor
                    </span>{" "}
                    – Performance and health insights
                  </Text>
                </div>
                <div className={styles.freCapabilityRow}>
                  <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                  <Text className={styles.freCapabilityText}>
                    <span className={styles.freCapabilityBold}>
                      Azure Update Manager
                    </span>{" "}
                    – Automated OS updates
                  </Text>
                </div>
                <div className={styles.freCapabilityRow}>
                  <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                  <Text className={styles.freCapabilityText}>
                    <span className={styles.freCapabilityBold}>
                      Azure Machine Configuration
                    </span>{" "}
                    – Audits or configures operating system settings
                  </Text>
                </div>
                <div className={styles.freCapabilityRow}>
                  <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                  <Text className={styles.freCapabilityText}>
                    <span className={styles.freCapabilityBold}>
                      Change Tracking &amp; Inventory
                    </span>{" "}
                    – Configuration tracking and inventory
                  </Text>
                </div>
                <div className={styles.freCapabilityRow}>
                  <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                  <Text className={styles.freCapabilityText}>
                    <span className={styles.freCapabilityBold}>
                      Azure Security Baseline Policy
                    </span>{" "}
                    – Assesses and enforces your machine&#39;s security posture
                  </Text>
                </div>
              </div>
            </div>
            <div className={styles.freFooter}>
              <Button
                appearance="secondary"
                onClick={() => {
                  setShowFre(false);
                  handleClose();
                }}
              >
                Close
              </Button>
              <Button appearance="primary" onClick={() => setShowFre(false)}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </NavigationProvider>
  );
}
