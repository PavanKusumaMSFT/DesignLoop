"use client";

import { useState, useEffect } from "react";

import {
  Search24Regular,
  Bot24Regular,
  Document24Regular,
  Cube24Regular,
  FolderOpen24Regular,
  Database24Regular,
  Layer24Regular,
  ChevronDown24Regular,
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
} from "@fluentui/react-icons";
import { TopNav } from "../../shared/top-nav";
import { useNavigation } from "../../../lib/navigation-context";
import {
  FluentProvider,
  Button as FluentButton,
  Text,
  webLightTheme,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
} from "@fluentui/react-components";
import type { DropdownProps } from "@fluentui/react-components";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const COLORS = {
  blue: tokens.colorBrandForeground1,
  purple: tokens.colorPaletteBerryForeground1,
  cyan: tokens.colorPaletteTealForeground1,
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
  projectOverview: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
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
  // --- Converted from inline styles ---
  chevronIcon14: {
    fontSize: "14px",
  },
  searchWrapperHalf: {
    maxWidth: "50%",
  },
  copilotIconWrapper: {
    marginRight: "4px",
    display: "flex",
    alignItems: "center",
  },
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
  marginTopAuto: {
    marginTop: "auto",
  },
  archContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  archFlexLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: "0 60px",
    position: "relative",
    zIndex: 2,
  },
  archNodeColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  archNodeBox: {
    width: "80px",
    height: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  archNodeBoxBrand: {
    border: `2px solid ${tokens.colorBrandBackground}`,
  },
  archNodeBoxNeutral: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  archNodeLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  archNodeSublabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  svgOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
  },
  archContainerOverflow: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  archSideColumnBase: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
  },
  archSideColumnLeftSmb: {
    left: "20px",
    gap: "20px",
  },
  archSideColumnRightSmb: {
    right: "20px",
    gap: "20px",
  },
  archServiceItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
  },
  archServiceItemEnd: {
    justifyContent: "flex-end",
  },
  statusDot8: {
    width: "8px",
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "50%",
  },
  archCenterHub: {
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
  archSideColumnLeftEnt: {
    left: "10px",
    gap: "15px",
  },
  archSideColumnRightEnt: {
    right: "10px",
    gap: "15px",
  },
  archServiceItemSmall: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: tokens.colorNeutralForeground1,
  },
  archServiceItemSmallEnd: {
    justifyContent: "flex-end",
  },
  statusDot6: {
    width: "6px",
    height: "6px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderRadius: "50%",
  },
  archCenterMesh: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    zIndex: 2,
  },
  archMeshNode: {
    width: "20px",
    height: "20px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "50%",
  },
  archMeshNodeCenter: {
    backgroundColor: tokens.colorBrandForeground1,
    opacity: 1,
  },
  archMeshNodeOuter: {
    backgroundColor: tokens.colorNeutralBackground3,
    opacity: 0.7,
  },
  resourceNameCellContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  brandForeground: {
    color: tokens.colorBrandForeground1,
  },
  statusCellContent: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  statusDotDynamic: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  statusDotGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  statusDotOrange: {
    backgroundColor: tokens.colorPaletteYellowForeground1,
  },
  statusDotBlue: {
    backgroundColor: tokens.colorBrandForeground1,
  },
  serviceGroupsEmptyLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "300px",
  },
  emptyStateContainer: {
    padding: "40px",
    textAlign: "center",
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
  serviceGroupCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  serviceGroupCardIcon: {
    fontSize: "20px",
    color: tokens.colorBrandForeground1,
  },
  serviceGroupCardName: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  serviceGroupCardMembers: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
  },
  serviceGroupCardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "12px",
  },
  serviceGroupCardMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  healthDotBase: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  healthDotGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  healthDotOrange: {
    backgroundColor: tokens.colorPaletteYellowForeground1,
  },
  foregroundMuted: {
    color: tokens.colorNeutralForeground3,
  },
  iconGreen16: {
    fontSize: "16px",
    color: tokens.colorPaletteGreenForeground1,
  },
  iconRed16: {
    fontSize: "16px",
    color: tokens.colorPaletteRedForeground1,
  },
  topActionIconBlue: {
    color: tokens.colorBrandForeground1,
  },
  topActionIconPurple: {
    color: tokens.colorPaletteBerryForeground1,
  },
  topActionIconCyan: {
    color: tokens.colorPaletteTealForeground1,
  },
  topActionIconGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

interface Level1BuildProps {
  experienceLevel: "new" | "smb" | "enterprise";
}

const Level1BuildContent = ({ experienceLevel }: Level1BuildProps) => {
  const styles = useStyles();

  const cardColorClasses: Record<string, string> = {
    [COLORS.blue]: styles.topActionIconBlue,
    [COLORS.purple]: styles.topActionIconPurple,
    [COLORS.cyan]: styles.topActionIconCyan,
    [COLORS.green]: styles.topActionIconGreen,
  };
  const statusColorClasses: Record<string, string> = {
    [COLORS.green]: styles.statusDotGreen,
    [COLORS.orange]: styles.statusDotOrange,
    [COLORS.blue]: styles.statusDotBlue,
  };
  const healthColorClasses: Record<string, string> = {
    [COLORS.green]: styles.healthDotGreen,
    [COLORS.orange]: styles.healthDotOrange,
  };
  const { handlePageChange } = useNavigation();
  const [showFloatingCopilot, setShowFloatingCopilot] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] =
    useState("Business Apps");
  const [selectedScope, setSelectedScope] = useState("All subscriptions");
  const [selectedSubscription, setSelectedSubscription] = useState(
    "Azure subscription 1",
  );
  const [solutionGrouping, setSolutionGrouping] = useState<
    "resources" | "service-groups" | "architecture"
  >("resources");

  const getSelectedOption = () => {
    switch (experienceLevel) {
      case "new":
        return selectedSubscription;
      case "smb":
        return "All subscriptions";
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
            color: COLORS.blue,
            isPrimary: true,
            link: "continue-work-2",
          },
          {
            icon: <Bot24Regular />,
            title: "Create a new workload based off my existing infrastructure",
            button: "Open infrastructure agent",
            color: COLORS.purple,
            isPrimary: true,
            isInfrastructureAgent: true,
          },
          {
            icon: <Shield24Regular />,
            title: "Learn about Azure security basics",
            button: "Learn More",
            color: COLORS.cyan,
            isPrimary: false,
          },
        ];
      case "smb":
        return [
          {
            icon: <Database24Regular />,
            title: "Deploy new database for customer analytics",
            button: "Create Database",
            color: COLORS.green,
            isPrimary: true,
          },
          {
            icon: <Bot24Regular />,
            title: "Create new workload based off my existing infrastructure",
            button: "Open infrastructure agent",
            color: COLORS.purple,
            isPrimary: true,
            isInfrastructureAgent: true,
          },
          {
            icon: <Add24Regular />,
            title: "Expand production capacity for seasonal business growth",
            button: "Add Capacity",
            color: COLORS.blue,
            isPrimary: false,
          },
        ];
      case "enterprise":
        return [
          {
            icon: <Add24Regular />,
            title: "Launch new data lake for analytics expansion",
            button: "Create Data Lake",
            color: COLORS.blue,
            isPrimary: true,
          },
          {
            icon: <Server24Regular />,
            title: "Provision new subscription for acquired division",
            button: "Create Subscription",
            color: COLORS.green,
            isPrimary: true,
          },
          {
            icon: <Bot24Regular />,
            title: "Deploy containerized workloads to new AKS cluster",
            button: "Deploy Workload",
            color: COLORS.purple,
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
            name: "my-first-app",
            type: "App Service",
            status: "Running",
            cost: "$2.15",
            lastViewed: "5 minutes ago",
            icon: <Document24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "test-database",
            type: "SQL Database",
            status: "Online",
            cost: "$1.20",
            lastViewed: "1 hour ago",
            icon: <Database24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "learning-storage",
            type: "Storage Account",
            status: "Available",
            cost: "$0.05",
            lastViewed: "2 hours ago",
            icon: <Layer24Regular />,
            statusColor: COLORS.green,
          },
        ];
      case "smb":
        return [
          {
            name: "production-app",
            type: "App Service",
            status: "Running",
            cost: "$45.20",
            lastViewed: "2 minutes ago",
            icon: <Document24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "prod-database",
            type: "SQL Database",
            status: "Online",
            cost: "$89.40",
            lastViewed: "5 minutes ago",
            icon: <Database24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "business-storage",
            type: "Storage Account",
            status: "Available",
            cost: "$12.30",
            lastViewed: "30 minutes ago",
            icon: <Layer24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "production-rg",
            type: "Resource Group",
            status: "Active",
            cost: "$156.90",
            lastViewed: "1 hour ago",
            icon: <FolderOpen24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "dev-environment",
            type: "Virtual Machine",
            status: "Running",
            cost: "$23.50",
            lastViewed: "2 hours ago",
            icon: <Cube24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "staging-app",
            type: "App Service",
            status: "Stopped",
            cost: "$0.00",
            lastViewed: "1 day ago",
            icon: <Document24Regular />,
            statusColor: COLORS.orange,
          },
        ];
      case "enterprise":
        return [
          {
            name: "global-web-platform",
            type: "App Service",
            status: "Running",
            cost: "$1,245.80",
            lastViewed: "1 minute ago",
            icon: <Document24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "enterprise-data-warehouse",
            type: "Synapse Analytics",
            status: "Online",
            cost: "$2,890.50",
            lastViewed: "3 minutes ago",
            icon: <Database24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "global-cdn",
            type: "CDN Profile",
            status: "Active",
            cost: "$456.20",
            lastViewed: "10 minutes ago",
            icon: <Layer24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "north-america-prod",
            type: "Resource Group",
            status: "Active",
            cost: "$4,567.30",
            lastViewed: "15 minutes ago",
            icon: <FolderOpen24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "kubernetes-cluster",
            type: "AKS Cluster",
            status: "Running",
            cost: "$1,890.40",
            lastViewed: "30 minutes ago",
            icon: <Cube24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "ml-compute-cluster",
            type: "Machine Learning",
            status: "Scaling",
            cost: "$3,245.60",
            lastViewed: "45 minutes ago",
            icon: <Server24Regular />,
            statusColor: COLORS.blue,
          },
          {
            name: "backup-vault",
            type: "Recovery Services",
            status: "Protected",
            cost: "$234.10",
            lastViewed: "1 hour ago",
            icon: <Shield24Regular />,
            statusColor: COLORS.green,
          },
          {
            name: "analytics-workspace",
            type: "Log Analytics",
            status: "Collecting",
            cost: "$567.80",
            lastViewed: "2 hours ago",
            icon: <Gauge24Regular />,
            statusColor: COLORS.green,
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

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav activeLink="Build" experienceLevel={experienceLevel} />

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              Build
            </Text>
            {experienceLevel !== "new" && (
              <div className={styles.headerRight}>
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownButton}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>{getSelectedOption()}</span>
                    <ChevronDown24Regular className={styles.chevronIcon14} />
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
                      <ChevronDown24Regular className={styles.chevronIcon14} />
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
              </div>
            )}
          </div>

          <div
            className={mergeClasses(
              styles.searchWrapper,
              styles.searchWrapperHalf,
            )}
          >
            <div className={styles.copilotIconWrapper}>
              <CopilotSVGIcon width={20} height={20} />
            </div>
            <input
              type="text"
              placeholder="Message Copilot"
              className={styles.searchInput}
            />
          </div>

          <div className={styles.topActionsSection}>
            <div className={styles.topActionsTitle}>Top actions</div>
            <div className={styles.topActionsGrid}>
              {topActionCards.map((card, index) => (
                <div key={index} className={styles.topActionCard}>
                  <div className={styles.topActionCardContent}>
                    <div
                      className={mergeClasses(
                        styles.topActionCardIcon,
                        cardColorClasses[card.color] || "",
                      )}
                    >
                      {card.icon}
                    </div>
                    <div className={styles.topActionCardText}>
                      <div className={styles.topActionCardTitle}>
                        {card.title}
                      </div>
                    </div>
                  </div>
                  {(card as any).isInfrastructureAgent ? (
                    <button
                      onClick={() => handlePageChange("workload-agent")}
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
                      {card.button}
                    </button>
                  ) : (
                    <FluentButton
                      appearance="outline"
                      className={mergeClasses(
                        styles.outlineButton,
                        styles.marginTopAuto,
                      )}
                      onClick={() => {
                        if ((card as any).link) {
                          handlePageChange((card as any).link);
                        }
                      }}
                    >
                      {card.button}
                    </FluentButton>
                  )}
                </div>
              ))}
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

            {solutionGrouping === "architecture" && (
              <div className={styles.topologyView}>
                {experienceLevel === "new" && (
                  <div className={styles.archContainer}>
                    <div className={styles.archFlexLayout}>
                      {/* Frontend */}
                      <div className={styles.archNodeColumn}>
                        <div
                          className={mergeClasses(
                            styles.archNodeBox,
                            styles.archNodeBoxBrand,
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
                        <div className={styles.archNodeLabel}>Frontend</div>
                        <div className={styles.archNodeSublabel}>React App</div>
                      </div>

                      {/* Backend */}
                      <div className={styles.archNodeColumn}>
                        <div
                          className={mergeClasses(
                            styles.archNodeBox,
                            styles.archNodeBoxNeutral,
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
                        <div className={styles.archNodeLabel}>Backend</div>
                        <div className={styles.archNodeSublabel}>
                          API Server
                        </div>
                      </div>

                      {/* Database */}
                      <div className={styles.archNodeColumn}>
                        <div
                          className={mergeClasses(
                            styles.archNodeBox,
                            styles.archNodeBoxNeutral,
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
                        <div className={styles.archNodeLabel}>Database</div>
                        <div className={styles.archNodeSublabel}>
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
                  <div className={styles.archContainerOverflow}>
                    {/* Left side services */}
                    <div
                      className={mergeClasses(
                        styles.archSideColumnBase,
                        styles.archSideColumnLeftSmb,
                      )}
                    >
                      {[
                        "Web App",
                        "Mobile App",
                        "API Gateway",
                        "Load Balancer",
                      ].map((service, i) => (
                        <div key={i} className={styles.archServiceItem}>
                          <div className={styles.statusDot8} />
                          {service}
                        </div>
                      ))}
                    </div>

                    {/* Center hub */}
                    <div className={styles.archCenterHub}>☁️</div>

                    {/* Right side services */}
                    <div
                      className={mergeClasses(
                        styles.archSideColumnBase,
                        styles.archSideColumnRightSmb,
                      )}
                    >
                      {[
                        "SQL Database",
                        "Redis Cache",
                        "Blob Storage",
                        "Key Vault",
                      ].map((service, i) => (
                        <div
                          key={i}
                          className={mergeClasses(
                            styles.archServiceItem,
                            styles.archServiceItemEnd,
                          )}
                        >
                          {service}
                          <div className={styles.statusDot8} />
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
                  <div className={styles.archContainerOverflow}>
                    {/* Left side services */}
                    <div
                      className={mergeClasses(
                        styles.archSideColumnBase,
                        styles.archSideColumnLeftEnt,
                      )}
                    >
                      {[
                        "Infrastructure",
                        "Security",
                        "DevOps",
                        "Web",
                        "Mobile",
                        "Network",
                      ].map((service, i) => (
                        <div key={i} className={styles.archServiceItemSmall}>
                          <div className={styles.statusDot6} />
                          {service}
                        </div>
                      ))}
                    </div>

                    {/* Center mesh of nodes */}
                    <div className={styles.archCenterMesh}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                          key={i}
                          className={mergeClasses(
                            styles.archMeshNode,
                            i === 4
                              ? styles.archMeshNodeCenter
                              : styles.archMeshNodeOuter,
                          )}
                        />
                      ))}
                    </div>

                    {/* Right side services */}
                    <div
                      className={mergeClasses(
                        styles.archSideColumnBase,
                        styles.archSideColumnRightEnt,
                      )}
                    >
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
                          className={mergeClasses(
                            styles.archServiceItemSmall,
                            styles.archServiceItemSmallEnd,
                          )}
                        >
                          {service}
                          <div className={styles.statusDot6} />
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
                <thead>
                  <tr>
                    <th className={styles.resourcesTableHeader}>
                      Resource name
                    </th>
                    <th className={styles.resourcesTableHeader}>Type</th>
                    <th className={styles.resourcesTableHeader}>Status</th>
                    <th className={styles.resourcesTableHeader}>Cost</th>
                    <th className={styles.resourcesTableHeader}>Last viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {resourceData.map((resource, index) => (
                    <tr key={index}>
                      <td className={styles.resourcesTableCell}>
                        <div className={styles.resourceNameCellContent}>
                          <div className={styles.brandForeground}>
                            {resource.icon}
                          </div>
                          <span className={styles.brandForeground}>
                            {resource.name}
                          </span>
                        </div>
                      </td>
                      <td className={styles.resourcesTableCell}>
                        {resource.type}
                      </td>
                      <td className={styles.resourcesTableCell}>
                        <div className={styles.statusCellContent}>
                          <div
                            className={mergeClasses(
                              styles.statusDotDynamic,
                              statusColorClasses[resource.statusColor] || "",
                            )}
                          />
                          {resource.status}
                        </div>
                      </td>
                      <td
                        className={mergeClasses(
                          styles.resourcesTableCell,
                          styles.brandForeground,
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
                className={mergeClasses(
                  styles.projectsGrid,
                  experienceLevel === "new" && styles.serviceGroupsEmptyLayout,
                )}
              >
                {experienceLevel === "new" ? (
                  <div className={styles.emptyStateContainer}>
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
                        members: "234 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        healthColor: COLORS.green,
                      },
                      {
                        name: "Payment Service",
                        members: "456 members",
                        health: "Warning",
                        resilience: "Not resilient",
                        healthColor: COLORS.orange,
                      },
                    ].map((group, i) => (
                      <div key={i} className={styles.projectCard}>
                        <div className={styles.serviceGroupCardHeader}>
                          <Apps24Filled
                            className={styles.serviceGroupCardIcon}
                          />
                          <span className={styles.serviceGroupCardName}>
                            {group.name}
                          </span>
                        </div>
                        <div className={styles.serviceGroupCardMembers}>
                          {group.members}
                        </div>
                        <div className={styles.serviceGroupCardMeta}>
                          <div className={styles.statusCellContent}>
                            <div
                              className={mergeClasses(
                                styles.healthDotBase,
                                healthColorClasses[group.healthColor] || "",
                              )}
                            />
                            <span className={styles.foregroundMuted}>
                              {group.health}
                            </span>
                          </div>
                          <div className={styles.statusCellContent}>
                            {group.health === "Healthy" ? (
                              <Globe24Regular className={styles.iconGreen16} />
                            ) : (
                              <Warning24Filled className={styles.iconRed16} />
                            )}
                            <span className={styles.foregroundMuted}>
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
                        healthColor: COLORS.green,
                      },
                      {
                        name: "Authentication Service",
                        members: "234 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        healthColor: COLORS.green,
                      },
                      {
                        name: "Payment Service",
                        members: "456 members",
                        health: "Warning",
                        resilience: "Not resilient",
                        healthColor: COLORS.orange,
                      },
                      {
                        name: "Infrastructure Services",
                        members: "789 members",
                        health: "Healthy",
                        resilience: "Resilient",
                        healthColor: COLORS.green,
                      },
                    ].map((group, i) => (
                      <div key={i} className={styles.projectCard}>
                        <div className={styles.serviceGroupCardHeader}>
                          <Apps24Filled
                            className={styles.serviceGroupCardIcon}
                          />
                          <span className={styles.serviceGroupCardName}>
                            {group.name}
                          </span>
                        </div>
                        <div className={styles.serviceGroupCardMembers}>
                          {group.members}
                        </div>
                        <div className={styles.serviceGroupCardMeta}>
                          <div className={styles.statusCellContent}>
                            <div
                              className={mergeClasses(
                                styles.healthDotBase,
                                healthColorClasses[group.healthColor] || "",
                              )}
                            />
                            <span className={styles.foregroundMuted}>
                              {group.health}
                            </span>
                          </div>
                          <div className={styles.statusCellContent}>
                            {group.health === "Healthy" ? (
                              <Globe24Regular className={styles.iconGreen16} />
                            ) : (
                              <Warning24Filled className={styles.iconRed16} />
                            )}
                            <span className={styles.foregroundMuted}>
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

          <div className={styles.actionCards}>
            {actionCards.map((card, index) => (
              <div key={index} className={styles.actionCard}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>{card.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

const Level1Build = ({ experienceLevel }: Level1BuildProps) => {
  return <Level1BuildContent experienceLevel={experienceLevel} />;
};

export default Level1Build;
