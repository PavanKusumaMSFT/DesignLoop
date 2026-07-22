"use client";

import React, { useState } from "react";
import { useNavigation } from "../../../lib/navigation-context";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";
import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Database24Regular,
  Cube24Regular,
  FolderOpen24Regular,
  Money24Regular,
  Clock24Regular,
  Alert24Regular,
  QuestionCircle24Regular,
  Document24Regular,
  Globe24Regular,
  Info24Regular,
  Storage24Regular,
  Desktop24Regular,
  ChevronDown24Regular,
  Shield24Regular,
  Server24Regular,
  Search24Regular,
  ArrowSync24Regular,
  CloudArrowUp24Regular,
} from "@fluentui/react-icons";
import {
  FluentProvider,
  Button as FluentButton,
  Text,
} from "@fluentui/react-components";
import { webLightTheme } from "@fluentui/react-components";
import { TopNav } from "../../shared/top-nav";

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
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
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
  creditsInfo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: "8px 16px",
    borderRadius: "16px",
    fontSize: "14px",
  },
  creditsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  searchContainer: {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    width: "100%",
    maxWidth: "768px",
    padding: "0 24px",
  },
  floatingSearchContainer: {
    maxWidth: "768px",
    width: "90%",
  },
  searchBackdrop: {
    backdropFilter: "blur(8px)",
  },
  searchInputContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    padding: "8px 8px",
  },
  floatingSearchIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    marginRight: "8px",
  },
  searchInputWithPadding: {
    paddingLeft: "4px",
  },
  searchInputExpanded: {
    width: "300px",
  },
  navLinksHidden: {
    display: "none",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginBottom: "48px",
    marginTop: "24px",
  },
  actionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "48px",
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
    display: "flex",
    flexDirection: "column",
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
  cardIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  cardIconInContainer: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  alertIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorPaletteRedBackground1,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moneyIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorPaletteGreenBackground1,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moneyIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "20px",
  },
  alertIcon: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: "20px",
  },
  cardHeaderTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  cardSubHeaderContainer: {
    marginBottom: "16px",
  },
  cardSubHeaderTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
    lineHeight: "1.4",
  },
  cardSubHeaderDescription: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    lineHeight: "1.5",
  },
  cardStatsContainer: {
    marginBottom: "24px",
  },
  cardStatsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "12px",
  },
  creditsStatsContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  creditsStatsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  alertStatsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  alertStatBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
  },
  cardStatLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "6px",
    fontWeight: tokens.fontWeightRegular,
  },
  cardStatInfo: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  cardStatValue: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
  },
  cardButtonContainer: {
    marginTop: "auto",
  },
  outlineButton: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
  },
  resourcesContainer: {
    marginTop: "24px",
    marginBottom: "48px",
  },
  resourcesHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  resourcesIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resourcesIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "18px",
  },
  cardInfoIcon: {
    fontSize: "20px",
    color: tokens.colorNeutralForeground3,
  },
  cardHeaderTimestamp: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
  },
  cardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
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
  resourceIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
  },
  costCell: {
    color: tokens.colorBrandForeground1,
  },
  resourceName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: "0",
    marginTop: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    minWidth: "200px",
    overflow: "hidden",
  },
  dropdownItemParent: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  dropdownItemChild: {
    padding: "12px 16px 12px 32px",
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  chevronIcon: {
    fontSize: "14px",
  },
  infoIconBrand: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  searchWrapperHalf: {
    maxWidth: "50%",
  },
  copilotIconWrapper: {
    marginRight: "4px",
    display: "flex",
    alignItems: "center",
  },
  placeholderBar: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "6px",
  },
  placeholderBarSpaced: {
    marginBottom: "4px",
  },
  flexOne: {
    flex: 1,
  },
  cardButtonContainerRow: {
    display: "flex",
    gap: "8px",
  },
  costsDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
  },
  greenText: {
    color: tokens.colorPaletteGreenForeground1,
  },
  width60: { width: "60%" },
  width65: { width: "65%" },
  width70: { width: "70%" },
  width75: { width: "75%" },
  width80: { width: "80%" },
  width85: { width: "85%" },
  width90: { width: "90%" },
  widthFull: { width: "100%" },
});

interface HpReturningProps {
  experienceLevel: "new" | "smb" | "enterprise";
  onAgentModeChange?: (enabled: boolean) => void;
  showAgentModeToggle?: boolean;
  agentModeEnabled?: boolean;
}

const HpReturningContent = ({
  experienceLevel,
  onAgentModeChange,
  showAgentModeToggle,
  agentModeEnabled,
}: HpReturningProps) => {
  const styles = useStyles();
  const widthClass: Record<string, string> = {
    "60%": styles.width60,
    "65%": styles.width65,
    "70%": styles.width70,
    "75%": styles.width75,
    "80%": styles.width80,
    "85%": styles.width85,
    "90%": styles.width90,
    "100%": styles.widthFull,
  };
  const { handlePageChange } = useNavigation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] =
    useState("Business Apps");
  const [selectedScope, setSelectedScope] = useState("All subscriptions");
  const [selectedSubscription, setSelectedSubscription] = useState(
    experienceLevel === "enterprise" ? "Business Apps" : "All subscriptions",
  );

  const getWelcomeMessage = () => {
    return "Welcome back, Connie";
  };

  const getCreditsInfo = () => {
    switch (experienceLevel) {
      case "new":
        return "$200 in credits - Expires Aug 25, 2025";
      case "smb":
        return "$10,000 in credits - Expires Dec 31, 2025";
      case "enterprise":
        return "Enterprise Agreement - Contact billing admin";
      default:
        return "$200 in credits - Expires Aug 25, 2025";
    }
  };

  const getActionCards = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            icon: "/icons/templates.svg",
            title: "Start with a template",
            description: { width1: "85%", width2: null },
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: { width1: "75%", width2: null },
          },
          {
            icon: "/icons/aifoundry.svg",
            title: "Build an AI agent",
            description: { width1: "90%", width2: "60%" },
          },
          {
            icon: "/icons/github.svg",
            title: "Import code from GitHub",
            description: { width1: "80%", width2: "70%" },
          },
        ];
      case "smb":
        return [
          {
            icon: ArrowSync24Regular,
            title: "Migrate infrastructure",
            description: { width1: "85%", width2: null },
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: { width1: "75%", width2: null },
          },
          {
            icon: Shield24Regular,
            title: "Security & compliance",
            description: { width1: "85%", width2: "65%" },
          },
          {
            icon: Server24Regular,
            title: "Scale database",
            description: { width1: "80%", width2: "60%" },
          },
        ];
      case "enterprise":
        return [
          {
            icon: CloudArrowUp24Regular,
            title: "Deploy to AKS cluster",
            description: { width1: "85%", width2: null },
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: { width1: "75%", width2: null },
          },
          {
            icon: Database24Regular,
            title: "Enterprise database",
            description: { width1: "90%", width2: "75%" },
          },
          {
            icon: Storage24Regular,
            title: "Advanced storage",
            description: { width1: "85%", width2: "60%" },
          },
        ];
      default:
        return [
          {
            icon: "/icons/templates.svg",
            title: "Start with a template",
            description: { width1: "85%", width2: null },
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: { width1: "75%", width2: null },
          },
        ];
    }
  };

  const getAlertsData = () => {
    switch (experienceLevel) {
      case "smb":
        return {
          activeAlerts: "3",
          serviceIssues: "0",
        };
      case "enterprise":
        return {
          activeAlerts: "47",
          serviceIssues: "3",
        };
      default:
        return {
          activeAlerts: "--",
          serviceIssues: "0",
        };
    }
  };

  const getCostsData = () => {
    switch (experienceLevel) {
      case "smb":
        return {
          title: "Monthly spending on track",
          description: null,
          creditsSpent: "$10,000",
          creditsRemaining: "$8,234",
          spentLabel: "Monthly budget",
          remainingLabel: "Remaining budget",
          buttonText: "View costs",
        };
      case "enterprise":
        return {
          title: "Enterprise spending overview",
          description: null,
          creditsSpent: "$25,000",
          creditsRemaining: "$8,000",
          spentLabel: "Monthly budget",
          remainingLabel: "Remaining budget",
          buttonText: "View costs",
        };
      default:
        return {
          title: "30 days left in your free trial",
          description: null,
          creditsSpent: "$43.00",
          creditsRemaining: "$157.00",
          spentLabel: "Credits spent",
          remainingLabel: "Available credits",
          buttonText: "View costs",
        };
    }
  };

  const actionCards = getActionCards();
  const alertsData = getAlertsData();
  const costsData = getCostsData();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav
          activeLink="Home"
          experienceLevel={experienceLevel}
          onAgentModeChange={onAgentModeChange}
          showAgentModeToggle={showAgentModeToggle}
          agentModeEnabled={agentModeEnabled}
        />

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              {getWelcomeMessage()}
            </Text>
            {(experienceLevel === "smb" ||
              experienceLevel === "enterprise") && (
              <div className={styles.headerRight}>
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownButton}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>
                      {experienceLevel === "smb"
                        ? "All subscriptions"
                        : selectedServiceGroup}
                    </span>
                    <ChevronDown24Regular className={styles.chevronIcon} />
                  </div>
                  {showDropdown && (
                    <div className={styles.dropdownContent}>
                      {experienceLevel === "smb" ? (
                        <>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            All subscriptions
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Auth Service Non-Prod
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Auth Service Prod
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Payment Service Non-Prod
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Payment Service Prod
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Contoso Infra
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            All service groups
                          </div>
                          <div
                            className={styles.dropdownItemChild}
                            onClick={() => {
                              setSelectedServiceGroup("Business Apps");
                              setShowDropdown(false);
                            }}
                          >
                            Business Apps
                          </div>
                          <div
                            className={styles.dropdownItemChild}
                            onClick={() => {
                              setSelectedServiceGroup("Authentication Service");
                              setShowDropdown(false);
                            }}
                          >
                            Authentication Service
                          </div>
                          <div
                            className={styles.dropdownItemChild}
                            onClick={() => {
                              setSelectedServiceGroup("Payment Service");
                              setShowDropdown(false);
                            }}
                          >
                            Payment Service
                          </div>
                          <div
                            className={styles.dropdownItemChild}
                            onClick={() => {
                              setSelectedServiceGroup(
                                "Infrastructure Services",
                              );
                              setShowDropdown(false);
                            }}
                          >
                            Infrastructure Services
                          </div>
                        </>
                      )}
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
                      <ChevronDown24Regular className={styles.chevronIcon} />
                    </div>
                    {showScopeDropdown && (
                      <div className={styles.dropdownContent}>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("All subscriptions");
                            setShowScopeDropdown(false);
                          }}
                        >
                          All subscriptions
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Production only");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Production only
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Non-Production only");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Non-Production only
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Auth Service Prod");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Auth Service Prod
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Payment Service Prod");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Payment Service Prod
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {experienceLevel === "new" && (
              <div className={styles.creditsContainer}>
                <div className={styles.creditsInfo}>
                  <span>{getCreditsInfo()}</span>
                  <Info24Regular className={styles.infoIconBrand} />
                </div>
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

          <div className={styles.actionCards}>
            {actionCards?.map((card, index) => (
              <div key={index} className={styles.actionCard}>
                {typeof card.icon === "string" ? (
                  <img
                    src={card.icon}
                    alt={card.title}
                    className={styles.cardIcon}
                  />
                ) : (
                  <div className={styles.cardIconContainer}>
                    <card.icon className={styles.cardIconInContainer} />
                  </div>
                )}
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>
                  <div
                    className={mergeClasses(
                      styles.placeholderBar,
                      styles.placeholderBarSpaced,
                      widthClass[card.description.width1],
                    )}
                  ></div>
                  {card.description.width2 && (
                    <div
                      className={mergeClasses(
                        styles.placeholderBar,
                        widthClass[card.description.width2],
                      )}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.twoColumnGrid}>
            <div className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.alertIconContainer}>
                    <Alert24Regular className={styles.alertIcon} />
                  </div>
                  <div className={styles.cardHeaderTitle}>
                    Alerts and service issues
                  </div>
                </div>
                <div className={styles.cardHeaderTimestamp}>
                  Last updated: 07/10/2025
                </div>
              </div>

              <div className={styles.cardSubHeaderContainer}>
                <div className={styles.cardSubHeaderTitle}>
                  Set up alerts to catch issues
                </div>
                <div className={styles.cardSubHeaderDescription}>
                  <div className={styles.flexOne}>
                    <div
                      className={mergeClasses(
                        styles.placeholderBar,
                        styles.placeholderBarSpaced,
                        styles.widthFull,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.placeholderBar,
                        styles.width70,
                      )}
                    ></div>
                  </div>
                  <Info24Regular className={styles.cardInfoIcon} />
                </div>
              </div>

              <div className={styles.alertStatsContainer}>
                <div className={styles.alertStatBox}>
                  <div className={styles.cardStatLabel}>Active alerts</div>
                  <div className={styles.cardStatValue}>
                    {alertsData.activeAlerts}
                  </div>
                </div>
                <div className={styles.alertStatBox}>
                  <div className={styles.cardStatLabel}>Service issues</div>
                  <div className={styles.cardStatValue}>
                    {alertsData.serviceIssues}
                  </div>
                </div>
              </div>

              <div
                className={mergeClasses(
                  styles.cardButtonContainer,
                  styles.cardButtonContainerRow,
                )}
              >
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                >
                  {experienceLevel === "new" ? "Set up alerts" : "View alerts"}
                </FluentButton>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                >
                  View service health
                </FluentButton>
              </div>
            </div>
            <div className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.moneyIconContainer}>
                    <Money24Regular className={styles.moneyIcon} />
                  </div>
                  <div className={styles.cardHeaderTitle}>Costs</div>
                </div>
                <div className={styles.cardHeaderTimestamp}>
                  Last updated 3 minutes ago
                </div>
              </div>

              <div className={styles.cardSubHeaderContainer}>
                <div className={styles.cardSubHeaderTitle}>
                  {costsData.title}
                </div>
                <div className={styles.cardSubHeaderDescription}>
                  {costsData.description && (
                    <div className={styles.costsDescription}>
                      {costsData.description}
                    </div>
                  )}
                  <div className={styles.flexOne}>
                    <div
                      className={mergeClasses(
                        styles.placeholderBar,
                        styles.placeholderBarSpaced,
                        styles.widthFull,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.placeholderBar,
                        styles.width70,
                      )}
                    ></div>
                  </div>
                  <Info24Regular className={styles.cardInfoIcon} />
                </div>
              </div>

              <div className={styles.creditsStatsContainer}>
                <div className={styles.creditsStatsGrid}>
                  <div>
                    <div className={styles.cardStatLabel}>
                      {costsData.spentLabel}
                    </div>
                    <div className={styles.cardStatValue}>
                      {costsData.creditsSpent}
                    </div>
                  </div>
                  <div>
                    <div
                      className={mergeClasses(
                        styles.cardStatLabel,
                        styles.greenText,
                      )}
                    >
                      {costsData.remainingLabel}
                    </div>
                    <div
                      className={mergeClasses(
                        styles.cardStatValue,
                        styles.greenText,
                      )}
                    >
                      {costsData.creditsRemaining}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardButtonContainer}>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                  onClick={() => handlePageChange("cost-management")}
                >
                  {costsData.buttonText}
                </FluentButton>
              </div>
            </div>
          </div>

          <div className={styles.resourcesContainer}>
            <div className={styles.actionCard}>
              <div className={styles.resourcesHeader}>
                <div className={styles.resourcesIconContainer}>
                  <Clock24Regular className={styles.resourcesIcon} />
                </div>
                <div className={styles.cardTitle}>Resources</div>
              </div>

              <div className={styles.resourcesTabs}>
                <div
                  className={`${styles.resourcesTab} ${styles.resourcesTabActive}`}
                >
                  Recently viewed
                </div>
                <div className={styles.resourcesTab}>Favorites</div>
              </div>

              <table className={styles.resourcesTable}>
                <thead>
                  <tr>
                    <th className={styles.resourcesTableHeader}>
                      Resource name
                    </th>
                    <th className={styles.resourcesTableHeader}>Type</th>
                    <th className={styles.resourcesTableHeader}>Alerts</th>
                    <th
                      className={`${styles.resourcesTableHeader} ${styles.costCell}`}
                    >
                      Cost
                    </th>
                    <th className={styles.resourcesTableHeader}>Last viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceLevel === "new" ? (
                    <>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Globe24Regular className={styles.resourceIcon} />
                            my-first-web-app
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          App Service
                        </td>
                        <td className={styles.resourcesTableCell}>0</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $2.45
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 15, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Storage24Regular className={styles.resourceIcon} />
                            test-storage
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Storage account
                        </td>
                        <td className={styles.resourcesTableCell}>0</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $0.12
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 14, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Database24Regular
                              className={styles.resourceIcon}
                            />
                            learning-db
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          SQL Database
                        </td>
                        <td className={styles.resourcesTableCell}>1</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $8.90
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 13, 2024
                        </td>
                      </tr>
                    </>
                  ) : experienceLevel === "smb" ? (
                    <>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Globe24Regular className={styles.resourceIcon} />
                            Contoso Web Store
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          App Service
                        </td>
                        <td className={styles.resourcesTableCell}>0</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $124.50
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 15, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Database24Regular
                              className={styles.resourceIcon}
                            />
                            ContosoInventoryDB
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          SQL Database
                        </td>
                        <td className={styles.resourcesTableCell}>1</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $287.90
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 15, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Storage24Regular className={styles.resourceIcon} />
                            contoso-prod-storage
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Storage account
                        </td>
                        <td className={styles.resourcesTableCell}>0</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $45.67
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 14, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Desktop24Regular className={styles.resourceIcon} />
                            production-vm-cluster
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Virtual machine
                        </td>
                        <td className={styles.resourcesTableCell}>2</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $340.20
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 13, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <FolderOpen24Regular
                              className={styles.resourceIcon}
                            />
                            contoso-production-rg
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Resource group
                        </td>
                        <td className={styles.resourcesTableCell}>1</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $458.12
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 12, 2024
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Globe24Regular className={styles.resourceIcon} />
                            Global-Customer-Portal
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          App Service
                        </td>
                        <td className={styles.resourcesTableCell}>3</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $8,450.00
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 15, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Database24Regular
                              className={styles.resourceIcon}
                            />
                            Enterprise-DataWarehouse
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Synapse Analytics
                        </td>
                        <td className={styles.resourcesTableCell}>1</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $12,340.50
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 15, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Globe24Regular className={styles.resourceIcon} />
                            Global-CDN-Premium
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          CDN Profile
                        </td>
                        <td className={styles.resourcesTableCell}>0</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $3,240.80
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 14, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Cube24Regular className={styles.resourceIcon} />
                            AKS-Production-Cluster
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Kubernetes Service
                        </td>
                        <td className={styles.resourcesTableCell}>5</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $6,890.20
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 13, 2024
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.resourcesTableCell}>
                          <div className={styles.resourceName}>
                            <Storage24Regular className={styles.resourceIcon} />
                            Enterprise-Backup-Vault
                          </div>
                        </td>
                        <td className={styles.resourcesTableCell}>
                          Recovery Services
                        </td>
                        <td className={styles.resourcesTableCell}>0</td>
                        <td
                          className={`${styles.resourcesTableCell} ${styles.costCell}`}
                        >
                          $2,140.30
                        </td>
                        <td className={styles.resourcesTableCell}>
                          December 12, 2024
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

const HpReturning = ({
  experienceLevel,
  onAgentModeChange,
  showAgentModeToggle,
  agentModeEnabled,
}: HpReturningProps) => {
  return (
    <HpReturningContent
      experienceLevel={experienceLevel}
      onAgentModeChange={onAgentModeChange}
      showAgentModeToggle={showAgentModeToggle}
      agentModeEnabled={agentModeEnabled}
    />
  );
};

export default HpReturning;
