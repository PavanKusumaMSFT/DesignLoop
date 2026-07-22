"use client";

import {
  FluentProvider,
  webLightTheme,
  tokens as fluentTokens,
  MessageBar,
  MessageBarBody,
  Text,
  Subtitle2,
  Card,
  CardPreview,
  Spinner,
  Button as FluentButton,
  makeStyles,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Search24Regular,
  Document24Regular,
  Bot24Regular,
  Settings24Regular,
  ArrowEnterLeft20Regular,
  ChevronDown16Regular,
} from "@fluentui/react-icons";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../lib/navigation-context";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    width: "648px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    border: `0.5px solid ${tokens.colorNeutralStrokeTransparentInteractive}`,
    boxShadow: tokens.shadow16,
    zIndex: 1001,
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  dropdownContent: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  suggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: "8px 16px",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground2,
    fontSize: "14px",
    fontWeight: "400",
    display: "block", // Changed to block since no icons
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    marginTop: "16px",
    paddingLeft: "16px",
  },
  searchSettingsFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    height: "44px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground1,
    flexShrink: 0, // Prevent footer from shrinking
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  resourceItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  resourceText: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
  },
  resourceDetails: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  // Icon sizing classes
  iconSmall: {
    width: tokens.spacingHorizontalL,
    height: tokens.spacingHorizontalL,
  },
  iconMedium: {
    width: tokens.spacingHorizontalXL,
    height: tokens.spacingHorizontalXL,
  },
  iconLarge: {
    width: tokens.spacingHorizontalXXL,
    height: tokens.spacingHorizontalXXL,
  },
  // Layout utility classes
  flexShrink0: {
    flexShrink: 0,
  },
  flex1: {
    flex: 1,
  },
  paddingL: {
    padding: tokens.spacingHorizontalL,
  },
  paddingM: {
    padding: tokens.spacingHorizontalM,
  },
  // Filter bar layouts
  filterBar: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginTop: "0",
    marginBottom: tokens.spacingVerticalL,
  },
  // Divider lines
  dividerLine: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },
  dividerLineHorizontal: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
    marginLeft: tokens.spacingHorizontalL,
    marginRight: tokens.spacingHorizontalL,
  },
  // Section header variants
  sectionTitleFlush: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "0",
    marginTop: "0",
    paddingLeft: "0",
  },
  sectionHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  sectionHeaderRowPadded: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  sectionHeaderRowWithMargin: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
  },
  sectionHeaderRowPaddedWithMargin: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  // Resource text variants
  resourceName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  resourceNameSemibold: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  resourceNameWithLine: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
  },
  resourceDetailSmall: {
    fontSize: "10px",
    lineHeight: "14px",
    color: tokens.colorNeutralForeground2,
  },
  // Action grid layouts
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  actionCard: {
    padding: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  actionCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  actionCardDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalM,
  },
  // Button styling
  buttonFilter: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalS}`,
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonFilterWithBg: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalS}`,
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonFilterWithPadding: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalM}`,
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonCompact: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: "6px 12px",
    border: "1px solid transparent",
    borderRadius: tokens.borderRadiusMedium,
    background: `linear-gradient(${tokens.colorNeutralBackground1}, ${tokens.colorNeutralBackground1}) padding-box, linear-gradient(90deg, #0078D4, #8B5CF6) border-box`,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
    fontWeight: "normal",
  },
  // Sticky panel layouts
  stickyPanel: {
    backgroundColor: tokens.colorNeutralBackground2,
    position: "sticky",
    bottom: "0",
    marginTop: tokens.spacingVerticalXXL,
    padding: tokens.spacingHorizontalL,
    marginLeft: `-${tokens.spacingHorizontalL}`,
    marginRight: `-${tokens.spacingHorizontalL}`,
    marginBottom: `-${tokens.spacingHorizontalL}`,
    zIndex: 10,
  },
  stickyPanelWithFooter: {
    backgroundColor: tokens.colorNeutralBackground2,
    position: "sticky",
    bottom: "0",
    marginTop: tokens.spacingVerticalXXL,
    padding: tokens.spacingHorizontalL,
    marginLeft: `-${tokens.spacingHorizontalL}`,
    marginRight: `-${tokens.spacingHorizontalL}`,
    marginBottom: `-${tokens.spacingHorizontalL}`,
    zIndex: 10,
  },
  stickyPanelBottom: {
    backgroundColor: tokens.colorNeutralBackground1,
    position: "sticky",
    bottom: "44px",
    zIndex: 10,
    padding: tokens.spacingHorizontalL,
  },
  // Panel header layouts
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
  },
  panelHeaderBadge: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "0 6px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    borderRadius: tokens.borderRadiusMedium,
    marginLeft: tokens.spacingHorizontalS,
  },
  panelHeaderBadgeExtended: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "4px 12px",
    borderRadius: tokens.borderRadiusMedium,
    marginLeft: tokens.spacingHorizontalS,
  },
  // Copilot card layouts
  copilotCard: {
    padding: tokens.spacingHorizontalL,
    borderLeft: `4px solid ${tokens.colorBrandForeground1}`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  // Suggestion button layouts
  suggestionButton: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: "400",
    padding: "4px 12px",
    height: "auto",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  // Text styling variants
  textSemibold: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  textRegular: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
  },
  textSmall: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  textSmallSecondary: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  // Info icon styling
  infoIcon: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground3,
  },
  // Loading state
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    padding: "32px",
  },
  loadingText: {
    marginLeft: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  // Button filter variants
  buttonFilterPrimary: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalS}`,
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonFilterSubtleWithBg: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalS}`,
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonFilterMediumPadding: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalM}`,
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonFilterOutline: {
    fontWeight: "400",
    fontSize: tokens.fontSizeBase300,
    padding: `0 ${tokens.spacingHorizontalS}`,
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
  },
  // Section title variants
  sectionTitleNoPadding: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingLeft: "0",
  },
  sectionTitlePaddedLeft: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingLeft: tokens.spacingHorizontalL,
  },
  // Resource name variants
  resourceNameBasic: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  resourceNameWithLineHeight: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
  },
  resourceDetailSmallWithLineHeight: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: "14px",
    color: tokens.colorNeutralForeground2,
  },
  // Panel header parts
  panelHeaderTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  panelHeaderBadgeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  panelHeaderBadgeTextSecondary: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  // Copilot card hover states
  copilotCardHoverable: {
    padding: tokens.spacingHorizontalL,
    borderLeft: `4px solid ${tokens.colorBrandForeground1}`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  copilotCardDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  // Grid layouts
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  serviceGridBottom: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
  },
  // Flex layouts
  flexWrap: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  historyContainer: {
    marginBottom: tokens.spacingVerticalL,
  },
  historyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalM,
  },
  historyHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  historyLink: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
  },
  suggestionItemHistory: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: tokens.fontSizeBase300,
  },
  // Specific panel containers
  gettingStartedContainer: {
    padding: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: "0",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  recentServicesContainer: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  stickyPanelGettingStarted: {
    backgroundColor: tokens.colorNeutralBackground2,
    position: "sticky",
    bottom: "0",
    marginTop: "auto",
    padding: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingHorizontalL,
    marginLeft: `-${tokens.spacingHorizontalL}`,
    marginRight: `-${tokens.spacingHorizontalL}`,
    marginBottom: "0",
    zIndex: 10,
  },
  // New classes for remaining static styles
  borderTop: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },
  sectionRowLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  sectionRowLayoutWithTopMargin: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
  },
  aj1saResourceName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
  },
  aj1saResourceDetail: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: "14px",
    color: tokens.colorNeutralForeground2,
  },
  aj1saUserName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  aj1saUserEmail: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  aj1saButtonStyle: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: "400",
    padding: "4px 12px",
    height: "auto",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  aj1saCopilotCard: {
    padding: tokens.spacingHorizontalL,
    borderLeft: `4px solid ${tokens.colorBrandForeground1}`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  aj1saCopilotCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  aj1saCopilotCardDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  aj1saStickyPanelLayout: {
    backgroundColor: tokens.colorNeutralBackground2,
    position: "sticky",
    bottom: "0",
    marginTop: tokens.spacingVerticalXXL,
    padding: tokens.spacingHorizontalL,
    marginLeft: `-${tokens.spacingHorizontalL}`,
    marginRight: `-${tokens.spacingHorizontalL}`,
    marginBottom: `-${tokens.spacingHorizontalL}`,
    zIndex: 10,
  },
  aj1saPanelHeaderContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
  },
  aj1saBadgeContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "0 6px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    borderRadius: tokens.borderRadiusMedium,
    marginLeft: tokens.spacingHorizontalS,
  },
  aj1saBadgeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  aj1saActionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  // Panel layouts for getting started
  gettingStartedPadding: {
    padding: "16px 16px 8px 16px",
  },
  gettingStartedHeaderContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  gettingStartedBadge: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "4px 12px",
    borderRadius: tokens.borderRadiusMedium,
    marginLeft: tokens.spacingHorizontalS,
  },
  gettingStartedBadgeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  // Sticky panel for bubbles view
  bubblesStickyPanel: {
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    position: "sticky",
    bottom: "44px",
    zIndex: 10,
  },
  // For history section layouts
  historyHeaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalM,
  },
  historyLeftSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  historyClearLink: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
  },
  historyItemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  historyItemButton: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: tokens.fontSizeBase300,
  },
  // Recent services section
  recentServicesTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  recentServicesGridTop: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  recentServicesGridBottom: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
  },
  recentServiceItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
  },
  recentServiceText: {
    fontSize: tokens.fontSizeBase300,
  },
  cursorPointer: {
    cursor: "pointer",
  },
  // Getting started main container layout
  gettingStartedMainContainer: {
    padding: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: "0",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  architectureDiagramSuggestionsContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    marginBottom: tokens.spacingVerticalL,
  },
  buttonNeutralBackground3: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  cursorDefault: {
    cursor: "default",
  },
  sectionHeaderRowTopXXL: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalXXL,
  },
});

interface SearchSuggestionPanelProps {
  searchValue: string;
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  viewMode?: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2";
  onCopilotOpen?: (prompt?: string) => void;
  setShowSuggestions: (show: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading?: boolean;
}

export default function SearchSuggestionPanelP1({
  searchValue,
  showSuggestions,
  onSuggestionClick,
  viewMode = "list",
  onCopilotOpen,
  setShowSuggestions,
  inputRef,
  isLoading = false,
}: SearchSuggestionPanelProps) {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeAdamFilter, setActiveAdamFilter] = useState<
    "all" | "entra-id" | "marketplace" | "documentation"
  >("all");

  const renderSearchSettingsFooter = () => (
    <div className={styles.searchSettingsFooter}>
      <div className={styles.footerLeft}>
        <ArrowEnterLeft20Regular className={styles.iconSmall} />
        <span>Press enter to view full page results</span>
      </div>
      <div className={styles.footerRight}>
        <Settings24Regular className={styles.iconSmall} />
        <span>Change search settings</span>
      </div>
    </div>
  );
  const [searchResultsCache, setSearchResultsCache] = useState<
    Record<string, any>
  >({});

  const crossPlatformTerms = {
    ec2: { azure: "Virtual Machine", platform: "AWS" },
    s3: { azure: "Blob Storage", platform: "AWS" },
    lambda: { azure: "Functions", platform: "AWS" },
    "compute engine": { azure: "Virtual Machine", platform: "Google Cloud" },
  };

  const detectCrossPlatformTerm = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    for (const [term, mapping] of Object.entries(crossPlatformTerms)) {
      if (lowerQuery.includes(term)) {
        return {
          originalTerm: term,
          azureTerm: mapping.azure,
          platform: mapping.platform,
        };
      }
    }
    return null;
  };

  const suggestions = [
    "Create a new App Service",
    "View deployment logs for my App Service",
    "Scale my App Service to a higher tier",
    "Set up custom domains and SSL for my App Service",
    "How do I set up a CI/CD pipeline?",
    "What are the best practices for securing my resources?",
    "How do I set up a CI/CD pipeline for my App Service?",
    "What are the best practices for securing my App Service?",
  ];

  const databaseSuggestions = [
    "Create a new SQL database",
    "Connect my app to an Azure database",
    "Learn about different database types in Azure",
    "Show me my database performance metrics",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    console.log("handleSuggestionClick called with:", suggestion);
    console.log("onCopilotOpen callback exists:", !!onCopilotOpen);
    // Check if it's a copilot suggestion that should open immersive view
    const copilotSuggestions = [
      "Learn about different database types in Azure",
      "Create a new App Service",
      "View deployment logs for my App Service",
      "Scale my App Service to a higher tier",
      "Set up custom domains and SSL for my App Service",
      "What does Microsoft Entra ID do",
      "Help me reset Adam's password",
      "Assign the Reader role to Adam",
      "Invite a new user to one of my groups",
      "Show me how to build a secure architecture",
      "Check RG1 for cost and performance",
      "Visualize RG1 architecture map",
      "Compare RG1's architecture against best practices",
      "Clone VM1",
      "Status of VM1",
      "Restart VM1",
      "View VM1 metrics",
    ];

    // Check if it's a workload agent suggestion that should open workload-agent view
    const workloadAgentSuggestions = [
      "Make a clone of VM01",
      "Check the status of VM01",
    ];

    if (copilotSuggestions.includes(suggestion)) {
      // Open copilot immersive experience in context with the selected prompt
      if (onCopilotOpen) {
        onCopilotOpen(suggestion);
      } else {
        // Fallback to navigation if no callback provided
        window.location.href = "/copilot-immersive";
      }
    } else if (workloadAgentSuggestions.includes(suggestion)) {
      // Open workload agent immersive experience
      if (onCopilotOpen) {
        onCopilotOpen(suggestion);
      } else {
        // Fallback to navigation if no callback provided
        window.location.href = "/workload-agent";
      }
    } else {
      onSuggestionClick(suggestion);
    }
  };

  const gettingStartedSuggestions = [
    "How do I create a virtual machine and connect to it?",
    "Show me how to set up storage.",
    "Configure automatic scaling for my deployed app.",
    "Set up staging and production environments for my app",
  ];

  const mockCategorizedResults = {
    "VM102-13": {
      topTasks: ["Start VM102-13", "Stop VM102-13"],
      yourResources: ["VM102-13 (Virtual Machine)", "VM102-13-disk (Disk)"],
      documentation: ["VM troubleshooting guide", "VM sizing options"],
    },
  };

  const isSpecificResourceSearch = (query: string) => {
    return query.length > 3 && /^[A-Za-z]+\d+(-\d+)?$/.test(query);
  };

  const getSearchResults = () => {
    if (searchValue.length === 0) {
      console.log("[v0] Returning getting-started results");
      return {
        type: "getting-started",
        suggestions: gettingStartedSuggestions,
        workloadAgent: {
          title: "Workload Agent",
          description:
            "Get AI-powered infrastructure recommendations and deployment scripts",
        },
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
        const data = mockCategorizedResults["VM102-13"]; // Simplified
        setSearchResultsCache((prev) => ({ ...prev, [cacheKey]: data }));
        return { type: "categorized", data };
      }
      return { type: "categorized", data: searchResultsCache[cacheKey] };
    }

    // Check if searching for database - show loading then results
    if (searchValue.toLowerCase().includes("database")) {
      // If loading is already false, it means we've already loaded
      if (!isLoading) {
        return { type: "filtered", suggestions: databaseSuggestions };
      }
      return { type: "filtered", suggestions: [] };
    }

    // Check if searching for "aj1sa" - show aj1sa results
    if (searchValue.toLowerCase().includes("aj1sa")) {
      return { type: "aj1sa" };
    }

    // Check if searching for "vm1" - show VM1 results (check before "contoso")
    if (searchValue.toLowerCase().includes("vm1")) {
      return { type: "vm1" };
    }

    // Check if searching for contoso - show VM resources
    if (searchValue.toLowerCase().includes("contoso")) {
      return { type: "contoso-vm" };
    }

    // Check if searching for "app ser" - show App Service resources
    if (searchValue.toLowerCase().includes("app ser")) {
      return { type: "app-service" };
    }

    // Check if searching for "adam" - show Adam user results
    if (searchValue.toLowerCase().includes("adam")) {
      return { type: "adam-user" };
    }

    // Check if searching for "diagram" or "rg1" - show architecture diagram suggestions
    if (
      searchValue.toLowerCase().includes("diagram") ||
      searchValue.toLowerCase().includes("rg1")
    ) {
      return { type: "architecture-diagram" };
    }

    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(searchValue.toLowerCase()),
    );
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputRef, setShowSuggestions]);

  const renderCategorizedResults = (data: any) => (
    <div className="py-4 max-h-96 overflow-y-auto">
      <div className="mb-6">
        <Subtitle2 className="mb-4 px-4">Suggested tasks</Subtitle2>
        <div className="grid grid-cols-2 gap-4 px-4">
          <Card className="hover:border-blue-500 transition-colors">
            <CardPreview>
              <div className="flex items-start gap-3 p-4">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                  <Document24Regular className="w-4 h-4 text-blue-600" />
                </div>
                <Text className="text-sm text-gray-900 leading-tight">
                  Create and deploy a VM in one click.
                </Text>
              </div>
            </CardPreview>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderCrossPlatformResults = (
    match: any,
    suggestions: string[] = [],
  ) => (
    <div className="py-2">
      <MessageBar>
        <MessageBarBody>
          <Text as="p" className="text-sm">
            <span className="font-medium">Did you mean:</span> {match.azureTerm}
            ?
          </Text>
        </MessageBarBody>
      </MessageBar>
      {suggestions.length > 0 && (
        <div>
          <div className={styles.sectionTitle}>Copilot suggestions</div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className={styles.suggestionItem}
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderContosoVMResults = () => (
    <div className={styles.paddingL}>
      {/* Filter buttons */}
      <div className={styles.filterBar}>
        <FluentButton appearance="primary" className={styles.buttonFilter}>
          All
        </FluentButton>
        <FluentButton appearance="outline" className={styles.buttonFilter}>
          Resources
        </FluentButton>
        <FluentButton appearance="outline" className={styles.buttonFilter}>
          Microsoft Entra ID
        </FluentButton>
        <FluentButton
          appearance="outline"
          icon={<ChevronDown16Regular />}
          className={styles.buttonFilter}
        >
          More filters (3)
        </FluentButton>
      </div>

      {/* Azure Services */}
      <div className={styles.sectionTitle}>Azure Services (3)</div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/virtual-machine.svg"
          alt="Virtual machines"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceText}>Virtual machines</div>
          <div className={styles.resourceDetails}>
            Azure VMs provide the flexibility of virtualization without the need
            to maintain physical hardware.
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/VM-Scale-Sets.svg"
          alt="Virtual machine scale sets"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceText}>Virtual machine scale sets</div>
          <div className={styles.resourceDetails}>
            Azure Virtual Machine Scale Sets let you create and manage a group
            of load balanced virtual machines (VM) instances.
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Azure-Arc-Servers.svg"
          alt="Machines - Azure Arc"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceText}>Machines - Azure Arc</div>
          <div className={styles.resourceDetails}>
            Azure Arc-enabled servers lets you manage Windows and Linux physical
            servers and virtual machines hosted outside of Azure.
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.dividerLineHorizontal} />

      {/* Resources */}
      <div className={styles.sectionHeaderRowPadded}>
        <div className={styles.sectionTitleFlush}>Resources (23)</div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.resourceItem}>
          <img
            src="/icons/virtual-machine.svg"
            alt="VM"
            width={24}
            height={24}
            className={styles.flexShrink0}
          />
          <div>
            <div className={styles.resourceText}>Contoso-VM0{i}</div>
            <div className={styles.resourceDetails}>
              Type: Public IP address, OS: Linux, Location: West US, Size:
              Standard_D16ds_v4, Status: Running
            </div>
          </div>
        </div>
      ))}

      {/* Divider */}
      <div className={styles.dividerLineHorizontal} />

      {/* Copilot recommendations */}
      <div className={styles.sectionHeaderRowPadded}>
        <div className={styles.panelHeaderTitle}>
          <CopilotSVGIcon width={20} height={20} />
          <div
            className={mergeClasses(
              styles.sectionTitle,
              styles.sectionTitleFlush,
            )}
          >
            Copilot recommendations
          </div>
        </div>

        <div className={styles.actionGrid}>
          {/* Card 1 */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardTitle}>
              Use infrastructure agent for enterprise scaling
            </div>
            <div className={styles.actionCardDescription}>
              Get AI-powered recommendations for scaling enterprise workloads
              and infrastructure
            </div>
            <button
              onClick={() => onCopilotOpen?.()}
              className={styles.buttonCompact}
            >
              <img
                src="/icons/Copilot-line.svg"
                alt="Copilot"
                width={16}
                height={16}
              />
              Open infrastructure agent
            </button>
          </div>

          {/* Card 2 */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardTitle}>
              Use infrastructure agent for enterprise scaling
            </div>
            <div className={styles.actionCardDescription}>
              Get AI-powered recommendations for scaling enterprise workloads
              and infrastructure
            </div>
            <button
              onClick={() => onCopilotOpen?.()}
              className={styles.buttonCompact}
            >
              <img
                src="/icons/Copilot-line.svg"
                alt="Copilot"
                width={16}
                height={16}
              />
              Open infrastructure agent
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.dividerLineHorizontal} />

      {/* Category Sections */}
      <div className={styles.sectionHeaderRowPadded}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Resource Groups (8)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowPaddedWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Microsoft Entra ID (50)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowPaddedWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Marketplace (9)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowPaddedWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Documentation (99+)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>
    </div>
  );

  const renderAppServiceResults = () => (
    <div className={styles.paddingL}>
      {/* Filter buttons */}
      <div className={styles.filterBar}>
        <FluentButton
          appearance="primary"
          className={styles.buttonFilterPrimary}
        >
          All results
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Services
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Resources
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Microsoft Entra ID
        </FluentButton>
        <FluentButton
          appearance="outline"
          icon={<ChevronDown16Regular />}
          iconPosition="after"
          className={styles.buttonFilterOutline}
        >
          More filters (3)
        </FluentButton>
      </div>

      {/* Azure Services */}
      <div className={styles.sectionTitleNoPadding}>Azure Services (3)</div>

      <div
        className={mergeClasses(styles.resourceItem, styles.cursorPointer)}
        onClick={() => {
          handlePageChange("appser-control-old");
          setShowSuggestions(false);
        }}
      >
        <img
          src="/icons/App-Services.svg"
          alt="App Services"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameBasic}>App Services</div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Certificate.svg"
          alt="App Service Certificates"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameBasic}>
            App Service Certificates
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/App-Service-Domains.svg"
          alt="App Service Domains"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameBasic}>App Service Domains</div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.dividerLine} />

      {/* Resources */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Resources (2)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>
      <div className={styles.resourceItem}>
        <img
          src="/icons/App-Services.svg"
          alt="App Service"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameWithLineHeight}>myAppService</div>
          <div className={styles.resourceDetailSmallWithLineHeight}>
            Type: App Service, Resource Group: Contoso-rg, Location: West US 2,
            Subscription: Contoso-sub2
          </div>
        </div>
      </div>
      <div className={styles.resourceItem}>
        <img
          src="/icons/App-Services.svg"
          alt="App Service"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameWithLineHeight}>
            Contoso-AppService
          </div>
          <div className={styles.resourceDetailSmallWithLineHeight}>
            Type: App Service, Resource Group: Contoso-rg, Location: East US 2,
            Subscription: Contoso-sub
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.dividerLine} />

      {/* Category Sections */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Microsoft Entra ID (50)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Marketplace (9)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Documentation (99+)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      {/* Sticky Copilot Suggestions */}
      <div className={styles.stickyPanelWithFooter}>
        <div className={styles.panelHeaderTitle}>
          <CopilotSVGIcon width={24} height={24} />
          <Text className={styles.textSemibold}>Copilot suggestions</Text>
          <div className={styles.panelHeaderBadgeExtended}>
            <Text className={styles.panelHeaderBadgeText}>
              Selecting a prompt opens Copilot
            </Text>
          </div>
        </div>

        <div className={styles.flexWrap}>
          {[
            "Create a new App Service",
            "View deployment logs for my App Service",
            "Scale my App Service to a higher tier",
            "Set up custom domains and SSL for my App Service",
          ].map((suggestion: string, index: number) => (
            <FluentButton
              key={index}
              appearance="outline"
              className={styles.suggestionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  tokens.colorBrandForeground1;
                e.currentTarget.style.color = tokens.colorBrandForeground1;
                e.currentTarget.style.backgroundColor =
                  tokens.colorBrandBackground2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = tokens.colorNeutralStroke1;
                e.currentTarget.style.color = tokens.colorNeutralForeground1;
                e.currentTarget.style.backgroundColor =
                  tokens.colorNeutralBackground1;
              }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </FluentButton>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVM1Results = () => (
    <div className={styles.paddingL}>
      {/* Filter buttons */}
      <div className={styles.filterBar}>
        <FluentButton
          appearance="primary"
          className={styles.buttonFilterPrimary}
        >
          All results
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Services
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Resources
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Resource Groups
        </FluentButton>
        <FluentButton
          appearance="outline"
          icon={<ChevronDown16Regular />}
          iconPosition="after"
          className={styles.buttonFilterOutline}
        >
          More filters (3)
        </FluentButton>
      </div>

      {/* Azure Services */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Azure Services (10)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/virtual-machine.svg"
          alt="Virtual Machines"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div className={styles.flex1}>
          <div className={styles.resourceNameBasic}>Virtual machines</div>
        </div>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/VM-Scale-Sets.svg"
          alt="Virtual machine scale sets"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div className={styles.flex1}>
          <div className={styles.resourceNameBasic}>
            Virtual machine scale sets
          </div>
        </div>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Virtual-Networks.svg"
          alt="Virtual networks"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div className={styles.flex1}>
          <div className={styles.resourceNameBasic}>Virtual networks</div>
        </div>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      {/* Divider */}
      <div className={styles.dividerLine} />

      {/* Resources */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Resources (10)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/virtual-machine.svg"
          alt="Virtual Machine"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameWithLineHeight}>myContosoVM</div>
          <div className={styles.resourceDetailSmallWithLineHeight}>
            Type: Virtual machine, Resource Group: Contoso-rg, Location: West US
            2, Subscription: Contoso-sub2
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/VM-Scale-Sets.svg"
          alt="Virtual Machine Scale Set"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameWithLineHeight}>myContosoVMss</div>
          <div className={styles.resourceDetailSmallWithLineHeight}>
            Type: Virtual machine scale sets, Resource Group: Contoso-rg,
            Location: West US 2, Subscription: Contoso-sub2
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/virtual-machine.svg"
          alt="Virtual Machine"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameWithLineHeight}>VM1</div>
          <div className={styles.resourceDetailSmallWithLineHeight}>
            Type: Virtual machine, Resource Group: Northwind-rg, Location: East
            US, Subscription: Northwind-sub3
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/virtual-machine.svg"
          alt="Virtual Machine"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.resourceNameWithLineHeight}>VM011</div>
          <div className={styles.resourceDetailSmallWithLineHeight}>
            Type: Virtual machine, Resource Group: Fabrikam-rg, Location:
            Central US, Subscription: Fabrikam-sub1
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.dividerLine} />

      {/* Category Sections */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Resource Groups (6)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Microsoft Entra ID (12)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Marketplace (9)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Documentation (99+)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      {/* Sticky Copilot Suggestions */}
      <div className={styles.stickyPanelWithFooter}>
        <div className={styles.panelHeaderTitle}>
          <CopilotSVGIcon width={24} height={24} />
          <Text className={styles.textSemibold}>Copilot suggestions</Text>
          <div className={styles.panelHeaderBadgeExtended}>
            <Text className={styles.panelHeaderBadgeText}>
              Selecting a prompt opens Copilot
            </Text>
          </div>
        </div>

        <div className={styles.actionGrid}>
          {/* Card 1 */}
          <div
            onClick={() => handleSuggestionClick("Make a clone of VM01")}
            className={styles.copilotCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1Hover;
              e.currentTarget.style.boxShadow = tokens.shadow8;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className={styles.copilotCardHoverable}>
              Make a clone of VM01
            </div>
            <div className={styles.copilotCardDescription}>
              Create an identical copy of this virtual machine, including its
              configuration and disks.
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => handleSuggestionClick("Check the status of VM01")}
            className={styles.copilotCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1Hover;
              e.currentTarget.style.boxShadow = tokens.shadow8;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className={styles.copilotCardHoverable}>
              Check the status of VM01
            </div>
            <div className={styles.copilotCardDescription}>
              View the current state and health of VM01, including its power
              status, performance, etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAj1saResults = () => (
    <div className={styles.paddingL}>
      {/* Filter buttons */}
      <div className={styles.filterBar}>
        <FluentButton
          appearance="primary"
          className={styles.buttonFilterPrimary}
        >
          All results
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Services
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Resources
        </FluentButton>
        <FluentButton
          appearance="subtle"
          className={styles.buttonFilterSubtleWithBg}
        >
          Resource Groups
        </FluentButton>
        <FluentButton
          appearance="outline"
          icon={<ChevronDown16Regular />}
          iconPosition="after"
          className={styles.buttonFilterOutline}
        >
          More filters (3)
        </FluentButton>
      </div>

      {/* Azure Services */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Azure Services (10)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Storage.svg"
          alt="Storage accounts"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div className={styles.flex1}>
          <div className={styles.resourceNameBasic}>Storage accounts</div>
        </div>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Browser.svg"
          alt="Storage browser"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div className={styles.flex1}>
          <div className={styles.resourceNameBasic}>Storage browser</div>
        </div>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Storage-Sync-Services.svg"
          alt="Storage Sync Services"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div className={styles.flex1}>
          <div className={styles.resourceNameBasic}>Storage Sync Services</div>
        </div>
        <span className={styles.infoIcon}>ⓘ</span>
      </div>

      {/* Divider */}
      <div className={styles.dividerLine} />

      {/* Resources */}
      <div className={styles.sectionRowLayoutWithTopMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Resources (10)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Storage.svg"
          alt="Storage account"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.aj1saResourceName}>aj1sa-0</div>
          <div className={styles.aj1saResourceDetail}>
            Type: Storage account, Resource Group: Contoso-rg, Location: East
            US, Subscription: Contoso-sub2
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Storage.svg"
          alt="Storage account"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.aj1saResourceName}>aj1sa-1</div>
          <div className={styles.aj1saResourceDetail}>
            Type: Storage account, Resource Group: Contoso-rg, Location: West US
            2, Subscription: Contoso-sub2
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Storage.svg"
          alt="Storage account"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.aj1saResourceName}>aj1sa-2</div>
          <div className={styles.aj1saResourceDetail}>
            Type: Storage account, Resource Group: Contoso-rg, Location: Central
            US, Subscription: Contoso-sub2
          </div>
        </div>
      </div>

      <div className={styles.resourceItem}>
        <img
          src="/icons/Storage.svg"
          alt="Storage account"
          width={24}
          height={24}
          className={styles.flexShrink0}
        />
        <div>
          <div className={styles.aj1saResourceName}>aj1sa-3</div>
          <div className={styles.aj1saResourceDetail}>
            Type: Storage account, Resource Group: Contoso-rg, Location: West US
            2, Subscription: Contoso-sub2
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.dividerLine} />

      {/* Category Sections */}
      <div className={styles.sectionHeaderRow}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Resource Groups (6)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Microsoft Entra ID (12)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Marketplace (9)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      <div className={styles.sectionHeaderRowWithMargin}>
        <div
          className={mergeClasses(
            styles.sectionTitle,
            styles.sectionTitleFlush,
          )}
        >
          Documentation (99+)
        </div>
        <FluentButton appearance="outline" size="small">
          See all
        </FluentButton>
      </div>

      {/* Sticky Copilot Suggestions */}
      <div className={styles.aj1saStickyPanelLayout}>
        <div className={styles.aj1saPanelHeaderContainer}>
          <CopilotSVGIcon width={24} height={24} />
          <Text className={styles.textSemibold}>Copilot recommendations</Text>
          <div className={styles.aj1saBadgeContainer}>
            <Text className={styles.aj1saBadgeText}>
              Selecting a prompt triggers an agent task
            </Text>
          </div>
        </div>

        <div className={styles.aj1saActionGrid}>
          {/* Card 1 */}
          <div
            onClick={() =>
              handleSuggestionClick("Check the status of the storage account")
            }
            className={styles.aj1saCopilotCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1Hover;
              e.currentTarget.style.boxShadow = tokens.shadow8;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className={styles.aj1saCopilotCardTitle}>
              Check the status of the storage account
            </div>
            <div className={styles.aj1saCopilotCardDescription}>
              Check and report the current status of resources, ensuring they
              are healthy and operational.
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() =>
              handleSuggestionClick("Check performance of the storage account")
            }
            className={styles.aj1saCopilotCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1Hover;
              e.currentTarget.style.boxShadow = tokens.shadow8;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground1;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className={styles.aj1saCopilotCardTitle}>
              Check performance of the storage account
            </div>
            <div className={styles.aj1saCopilotCardDescription}>
              View CPU, memory, and disk utilization to assess current
              performance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdamUserResults = () => {
    const allUsers = [
      { name: "Adam Anderson", email: "aanderson@contoso.com" },
      { name: "Adam Blakely", email: "adamb@contoso.com" },
      { name: "Adam Bensen", email: "adamben@contoso.com" },
      { name: "Adam Carlson", email: "acarlson@contoso.com" },
      { name: "Adam Carrson", email: "acarrson@contoso.com" },
      { name: "Adam Clark", email: "acarlson@contoso.com" },
      { name: "Adam Farz", email: "acarlson@contoso.com" },
      { name: "Adam Franklin", email: "acarlson@contoso.com" },
      { name: "Adam Koska", email: "" },
    ];

    return (
      <div className={styles.paddingL}>
        {/* Filter buttons */}
        <div className={styles.filterBar}>
          <FluentButton
            appearance={activeAdamFilter === "all" ? "primary" : "subtle"}
            onClick={() => setActiveAdamFilter("all")}
            className={mergeClasses(
              styles.buttonFilterMediumPadding,
              activeAdamFilter !== "all" && styles.buttonNeutralBackground3,
            )}
          >
            All results
          </FluentButton>
          <FluentButton
            appearance={activeAdamFilter === "entra-id" ? "primary" : "subtle"}
            onClick={() => setActiveAdamFilter("entra-id")}
            className={mergeClasses(
              styles.buttonFilterMediumPadding,
              activeAdamFilter !== "entra-id" &&
                styles.buttonNeutralBackground3,
            )}
          >
            Microsoft Entra ID
          </FluentButton>
          <FluentButton
            appearance={
              activeAdamFilter === "marketplace" ? "primary" : "subtle"
            }
            onClick={() => setActiveAdamFilter("marketplace")}
            className={mergeClasses(
              styles.buttonFilterMediumPadding,
              activeAdamFilter !== "marketplace" &&
                styles.buttonNeutralBackground3,
            )}
          >
            Marketplace
          </FluentButton>
          <FluentButton
            appearance={
              activeAdamFilter === "documentation" ? "primary" : "subtle"
            }
            onClick={() => setActiveAdamFilter("documentation")}
            className={mergeClasses(
              styles.buttonFilterMediumPadding,
              activeAdamFilter !== "documentation" &&
                styles.buttonNeutralBackground3,
            )}
          >
            Documentation
          </FluentButton>
        </div>

        {/* Microsoft Entra ID Section */}
        {(activeAdamFilter === "all" || activeAdamFilter === "entra-id") && (
          <>
            <div className={styles.sectionHeaderRow}>
              <div
                className={mergeClasses(
                  styles.sectionTitle,
                  styles.sectionTitleFlush,
                )}
              >
                Microsoft Entra ID (25)
              </div>
              <FluentButton appearance="outline" size="small">
                See all
              </FluentButton>
            </div>

            {(activeAdamFilter === "entra-id"
              ? allUsers
              : allUsers.slice(0, 4)
            ).map((user, index) => (
              <div
                key={index}
                className={mergeClasses(
                  styles.resourceItem,
                  user.name !== "Adam Farz" && styles.cursorDefault,
                )}
                onClick={() => {
                  if (user.name === "Adam Farz") {
                    handlePageChange("user-control-old");
                    setShowSuggestions(false);
                  }
                }}
              >
                <img
                  src="/icons/Users.svg"
                  alt="User"
                  width={24}
                  height={24}
                  className={styles.flexShrink0}
                />
                <div>
                  <div className={styles.aj1saUserName}>{user.name}</div>
                  {user.email && (
                    <div className={styles.aj1saUserEmail}>{user.email}</div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Marketplace Section */}
        {(activeAdamFilter === "all" || activeAdamFilter === "marketplace") && (
          <div
            className={
              activeAdamFilter === "all"
                ? styles.sectionHeaderRowTopXXL
                : styles.sectionHeaderRow
            }
          >
            <div
              className={mergeClasses(
                styles.sectionTitle,
                styles.sectionTitleFlush,
              )}
            >
              Marketplace (9)
            </div>
            <FluentButton appearance="outline" size="small">
              See all
            </FluentButton>
          </div>
        )}

        {/* Documentation Section */}
        {(activeAdamFilter === "all" ||
          activeAdamFilter === "documentation") && (
          <div
            className={
              activeAdamFilter === "all"
                ? styles.sectionHeaderRowTopXXL
                : styles.sectionHeaderRow
            }
          >
            <div
              className={mergeClasses(
                styles.sectionTitle,
                styles.sectionTitleFlush,
              )}
            >
              Documentation (99+)
            </div>
            <FluentButton appearance="outline" size="small">
              See all
            </FluentButton>
          </div>
        )}

        {/* Sticky Copilot Suggestions */}
        <div className={styles.aj1saStickyPanelLayout}>
          <div className={styles.aj1saPanelHeaderContainer}>
            <CopilotSVGIcon width={24} height={24} />
            <Text className={styles.textSemibold}>Copilot suggestions</Text>
            <div className={styles.aj1saBadgeContainer}>
              <Text className={styles.gettingStartedBadgeText}>
                Selecting a prompt opens Copilot
              </Text>
            </div>
          </div>

          <div className={styles.flexWrap}>
            {[
              "What does Microsoft Entra ID do",
              "Help me reset Adam's password",
              "Assign the Reader role to Adam",
              "Invite a new user to one of my groups",
            ].map((suggestion: string, index: number) => (
              <FluentButton
                key={index}
                appearance="outline"
                className={styles.aj1saButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    tokens.colorBrandForeground1;
                  e.currentTarget.style.color = tokens.colorBrandForeground1;
                  e.currentTarget.style.backgroundColor =
                    tokens.colorBrandBackground2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    tokens.colorNeutralStroke1;
                  e.currentTarget.style.color = tokens.colorNeutralForeground1;
                  e.currentTarget.style.backgroundColor =
                    tokens.colorNeutralBackground1;
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </FluentButton>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderArchitectureDiagramResults = () => (
    <div className={styles.paddingL}>
      {/* Copilot Suggestions */}
      <div className={styles.architectureDiagramSuggestionsContainer}>
        <div className={styles.panelHeaderTitle}>
          <CopilotSVGIcon width={24} height={24} />
          <Text className={styles.textSemibold}>Copilot suggestions</Text>
          <div className={styles.panelHeaderBadgeExtended}>
            <Text className={styles.panelHeaderBadgeText}>
              Selecting a prompt opens Copilot
            </Text>
          </div>
        </div>

        <div className={styles.flexWrap}>
          {[
            "Show me how to build a secure architecture",
            "Check RG1 for cost and performance",
            "Visualize RG1 architecture map",
            "Compare RG1's architecture against best practices",
          ].map((suggestion: string, index: number) => (
            <FluentButton
              key={index}
              appearance="outline"
              className={styles.aj1saButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  tokens.colorBrandForeground1;
                e.currentTarget.style.color = tokens.colorBrandForeground1;
                e.currentTarget.style.backgroundColor =
                  tokens.colorBrandBackground2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = tokens.colorNeutralStroke1;
                e.currentTarget.style.color = tokens.colorNeutralForeground1;
                e.currentTarget.style.backgroundColor =
                  tokens.colorNeutralBackground1;
              }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </FluentButton>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGettingStartedResults = (
    suggestions: string[],
    workloadAgent?: any,
  ) => (
    <div>
      {/* List View - Only show if viewMode is "list" */}
      {viewMode === "list" && (
        <div className={styles.gettingStartedPadding}>
          <div className={styles.gettingStartedHeaderContainer}>
            <CopilotSVGIcon width={24} height={24} />
            <Text className={styles.textSemibold}>Copilot suggestions</Text>
            <div className={styles.gettingStartedBadge}>
              <Text className={styles.gettingStartedBadgeText}>
                Selecting a prompt opens Copilot
              </Text>
            </div>
          </div>
          {suggestions.map((suggestion: string, index: number) => (
            <button
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Prompt Bubbles Section - Only show if viewMode is "bubbles" */}
      {viewMode === "bubbles" && (
        <div className={styles.bubblesStickyPanel}>
          <div className={styles.gettingStartedHeaderContainer}>
            <CopilotSVGIcon width={24} height={24} />
            <Text className={styles.textSemibold}>Copilot suggestions</Text>
            <div className={styles.gettingStartedBadge}>
              <Text className={styles.gettingStartedBadgeText}>
                Selecting a prompt opens Copilot
              </Text>
            </div>
          </div>

          <div className={styles.flexWrap}>
            {suggestions.map((suggestion: string, index: number) => (
              <FluentButton
                key={index}
                appearance="outline"
                className={styles.aj1saButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    tokens.colorBrandForeground1;
                  e.currentTarget.style.color = tokens.colorBrandForeground1;
                  e.currentTarget.style.backgroundColor =
                    tokens.colorBrandBackground2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    tokens.colorNeutralStroke1;
                  e.currentTarget.style.color = tokens.colorNeutralForeground1;
                  e.currentTarget.style.backgroundColor =
                    tokens.colorNeutralBackground1;
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </FluentButton>
            ))}
          </div>
        </div>
      )}

      {/* Bubbles with History - For returning users */}
      {(viewMode === "bubbles-history" || viewMode === "bubbles-history-2") && (
        <div className={styles.gettingStartedMainContainer}>
          {/* Search History Section */}
          <div className={styles.historyContainer}>
            <div className={styles.historyHeaderContainer}>
              <div className={styles.historyLeftSection}>
                <img
                  src="/icons/History.svg"
                  alt="History"
                  className={styles.iconMedium}
                />
                <Text className={styles.textSemibold}>Search history</Text>
              </div>
              <a href="#" className={styles.historyClearLink}>
                Clear all
              </a>
            </div>
            <div className={styles.historyItemsContainer}>
              {["contoso-rg", "virtual", "App ser", "Vnet"].map(
                (item, index) => (
                  <button
                    key={index}
                    className={`${styles.suggestionItem} ${styles.historyItemButton}`}
                    onClick={() => {
                      // Update the input value using React's native setter
                      if (inputRef.current) {
                        const nativeInputValueSetter =
                          Object.getOwnPropertyDescriptor(
                            window.HTMLInputElement.prototype,
                            "value",
                          )?.set;

                        if (nativeInputValueSetter) {
                          nativeInputValueSetter.call(inputRef.current, item);

                          // Trigger React's onChange by dispatching an input event
                          const event = new Event("input", { bubbles: true });
                          inputRef.current.dispatchEvent(event);
                        }

                        // Focus the input to keep suggestions open
                        inputRef.current.focus();
                      }
                    }}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Recent Services Section */}
          <div className={styles.recentServicesContainer}>
            <Text className={styles.recentServicesTitle}>
              Recent services (6)
            </Text>
            <div className={styles.recentServicesGridTop}>
              <div
                className={`${styles.suggestionItem} ${styles.recentServiceItem}`}
              >
                <img
                  src="/icons/Resource-Groups.svg"
                  alt="Resource groups"
                  className={styles.iconSmall}
                />
                <Text className={styles.recentServiceText}>
                  Resource groups
                </Text>
              </div>
              <div
                className={`${styles.suggestionItem} ${styles.recentServiceItem}`}
              >
                <img
                  src="/icons/App-Services.svg"
                  alt="App Services"
                  className={styles.iconSmall}
                />
                <Text className={styles.recentServiceText}>App Services</Text>
              </div>
              <div
                className={`${styles.suggestionItem} ${styles.recentServiceItem}`}
              >
                <img
                  src="/icons/virtual-machine.svg"
                  alt="Virtual machines"
                  className={styles.iconSmall}
                />
                <Text className={styles.recentServiceText}>
                  Virtual machines
                </Text>
              </div>
            </div>
            <div className={styles.recentServicesGridBottom}>
              <div
                className={`${styles.suggestionItem} ${styles.recentServiceItem}`}
              >
                <img
                  src="/icons/Function-App.svg"
                  alt="Function Apps"
                  className={styles.iconSmall}
                />
                <Text className={styles.recentServiceText}>Function Apps</Text>
              </div>
              <div
                className={`${styles.suggestionItem} ${styles.recentServiceItem}`}
              >
                <img
                  src="/icons/containerapps.svg"
                  alt="Container Apps"
                  className={styles.iconSmall}
                />
                <Text className={styles.recentServiceText}>Container Apps</Text>
              </div>
              <div
                className={`${styles.suggestionItem} ${styles.recentServiceItem}`}
              >
                <img
                  src="/icons/Static-Web-Apps.svg"
                  alt="Static Web Apps"
                  className={styles.iconSmall}
                />
                <Text className={styles.recentServiceText}>
                  Static Web Apps
                </Text>
              </div>
            </div>
          </div>

          {/* Copilot Suggestions */}
          <div className={styles.stickyPanelGettingStarted}>
            <div className={styles.gettingStartedHeaderContainer}>
              <CopilotSVGIcon width={24} height={24} />
              <Text className={styles.textSemibold}>Copilot suggestions</Text>
              <div className={styles.gettingStartedBadge}>
                <Text className={styles.gettingStartedBadgeText}>
                  Selecting a prompt opens Copilot
                </Text>
              </div>
            </div>

            <div className={styles.flexWrap}>
              {suggestions.map((suggestion: string, index: number) => (
                <FluentButton
                  key={index}
                  appearance="outline"
                  className={styles.aj1saButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      tokens.colorBrandForeground1;
                    e.currentTarget.style.color = tokens.colorBrandForeground1;
                    e.currentTarget.style.backgroundColor =
                      tokens.colorBrandBackground2;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      tokens.colorNeutralStroke1;
                    e.currentTarget.style.color =
                      tokens.colorNeutralForeground1;
                    e.currentTarget.style.backgroundColor =
                      tokens.colorNeutralBackground1;
                  }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </FluentButton>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const searchResults = getSearchResults();
  console.log("[v0] Search results:", searchResults);

  if (!showSuggestions) {
    console.log("[v0] Not showing suggestions, returning null");
    return null;
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownContent}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spinner size="small" />
            <Text className={styles.loadingText}>Searching...</Text>
          </div>
        ) : (
          <>
            {searchResults.type === "getting-started" &&
              searchResults.suggestions && (
                <>
                  {console.log(
                    "[v0] Rendering getting-started suggestions:",
                    searchResults.suggestions.length,
                  )}
                  {renderGettingStartedResults(
                    searchResults.suggestions,
                    searchResults.workloadAgent,
                  )}
                </>
              )}
            {searchResults.type === "filtered" && searchResults.suggestions && (
              <div className="py-2">
                {/* List View - Only show if viewMode is "list" */}
                {viewMode === "list" && (
                  <div className={styles.gettingStartedPadding}>
                    <div className={styles.gettingStartedHeaderContainer}>
                      <CopilotSVGIcon width={24} height={24} />
                      <Text className={styles.textSemibold}>
                        Copilot suggestions
                      </Text>
                      <div className={styles.gettingStartedBadge}>
                        <Text className={styles.gettingStartedBadgeText}>
                          Selecting a prompt opens Copilot
                        </Text>
                      </div>
                    </div>
                    {searchResults.suggestions.map(
                      (suggestion: string, index: number) => (
                        <button
                          key={index}
                          className={styles.suggestionItem}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ),
                    )}
                  </div>
                )}

                {/* Prompt Bubbles Section - Only show if viewMode is "bubbles" */}
                {viewMode === "bubbles" && (
                  <div className={styles.bubblesStickyPanel}>
                    <div className={styles.gettingStartedHeaderContainer}>
                      <CopilotSVGIcon width={24} height={24} />
                      <Text className={styles.textSemibold}>
                        Copilot suggestions
                      </Text>
                      <div className={styles.gettingStartedBadge}>
                        <Text className={styles.gettingStartedBadgeText}>
                          Selecting a prompt opens Copilot
                        </Text>
                      </div>
                    </div>

                    <div className={styles.flexWrap}>
                      {searchResults.suggestions.map(
                        (suggestion: string, index: number) => (
                          <FluentButton
                            key={index}
                            appearance="outline"
                            className={styles.aj1saButtonStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                tokens.colorBrandForeground1;
                              e.currentTarget.style.color =
                                tokens.colorBrandForeground1;
                              e.currentTarget.style.backgroundColor =
                                tokens.colorBrandBackground2;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                tokens.colorNeutralStroke1;
                              e.currentTarget.style.color =
                                tokens.colorNeutralForeground1;
                              e.currentTarget.style.backgroundColor =
                                tokens.colorNeutralBackground1;
                            }}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </FluentButton>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {searchResults.type === "categorized" &&
              renderCategorizedResults(searchResults.data)}
            {searchResults.type === "cross-platform" &&
              renderCrossPlatformResults(
                searchResults.match,
                searchResults.suggestions,
              )}
            {searchResults.type === "contoso-vm" && renderContosoVMResults()}
            {searchResults.type === "app-service" && renderAppServiceResults()}
            {searchResults.type === "adam-user" && renderAdamUserResults()}
            {searchResults.type === "architecture-diagram" &&
              renderArchitectureDiagramResults()}
            {searchResults.type === "vm1" && renderVM1Results()}
            {searchResults.type === "aj1sa" && renderAj1saResults()}
          </>
        )}
      </div>
      {!isLoading && renderSearchSettingsFooter()}
    </div>
  );
}
