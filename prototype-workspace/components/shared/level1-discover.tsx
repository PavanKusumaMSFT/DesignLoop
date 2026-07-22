"use client";

import { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
  webLightTheme,
  Text,
  Button as FluentButton,
} from "@fluentui/react-components";
import {
  Database24Regular,
  Cloud24Regular,
  Globe24Regular,
  Cube24Regular,
  Document24Regular,
  Settings24Regular,
  Search24Regular,
  Bot24Regular,
  Server24Regular,
  Shield24Regular,
  DataUsage24Regular,
  Code24Regular,
  Calculator24Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";
import SimpleSearchSuggestions from "./simple-search-suggestions";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { EnhancedInputBar } from "./enhanced-input-bar";
import { CreateProjectModal } from "../projects/portal-ia/create-project-modal";
import { NextStepsCard } from "./next-steps-carousel";
import { NextStepsCardGroup } from "../projects/portal-ia/next-steps-card-group";
import { TabListCarousel } from "../projects/portal-ia/tablist-carousel";

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
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
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
  dropdownItem: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "32px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    padding: "8px 8px 8px 16px",
    maxWidth: "768px",
    marginLeft: "0",
    marginRight: "auto",
    marginBottom: "32px",
    transition: "all 0.3s ease",
    height: "56px",
    position: "relative",
  },
  searchWrapperHover: {
    boxShadow:
      "0 20px 16px 0 rgba(0, 30, 68, 0.05), 0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
  },
  searchWrapperAgentMode: {
    height: "auto",
    minHeight: "80px",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "12px",
    padding: "16px",
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
  projectOverview: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
  },
  projectTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
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
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  serviceIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  heroSection: {
    marginBottom: "32px",
    position: "relative",
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
  architectureBuilderContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "32px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground2,
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
    position: "relative",
  },
  searchRelativeWrapper: {
    position: "relative",
  },
  suggestionsDropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    zIndex: 1000,
    maxWidth: "50%",
  },
  inputBarNoMargin: {
    marginBottom: "0",
  },
  actionCardsSection: {
    marginTop: tokens.spacingVerticalXXL,
  },
  cardIconBrand: {
    color: tokens.colorBrandForeground1,
  },
});

interface Level1DiscoverProps {
  experienceLevel?: "new" | "smb" | "enterprise";
}

/** Level 1 "Discover" page for exploring Azure services, templates, and architecture patterns.
 * Features search with copilot integration, scope dropdown, service cards, and next-steps carousel.
 * Composed from: TopNav, EnhancedInputBar, SimpleSearchSuggestions, NextStepsCarousel.
 * Instead of: building inline service catalog pages with custom search and filtering. */
const Level1Discover: React.FC<Level1DiscoverProps> = ({
  experienceLevel = "new",
}) => {
  const styles = useStyles();
  const { handlePageChange, sourcePage } = useNavigation();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedService, setSelectedService] = useState<
    "Web App" | "Function App"
  >("Web App");

  // Check if we came from hp-fre (home/FRE page) for special navigation behavior
  // Note: hp-fre.tsx has page ID "home-fre" in the navigation system
  const cameFromAzurePortal = sourcePage === "home-fre";
  console.log(
    "[v0] DiscoverContent2: sourcePage =",
    sourcePage,
    "cameFromAzurePortal =",
    cameFromAzurePortal,
  );
  const [viewMode, setViewMode] = useState<
    "services" | "templates" | "architecture"
  >("services");

  const getDefaultSelection = () => {
    if (experienceLevel === "enterprise") return "Scaling enterprise workloads";
    if (experienceLevel === "smb") return "Migrating infrastructure";
    return "Deploying an app";
  };

  const getInitialSearchValue = () => {
    if (experienceLevel === "enterprise")
      return "Scale my enterprise workloads";
    if (experienceLevel === "smb") return "Migrate my infrastructure to Azure";
    return "Deploy my first application to Azure";
  };

  const [selectedOption, setSelectedOption] = useState(getDefaultSelection());
  const [searchValue, setSearchValue] = useState(getInitialSearchValue());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dummyInputRef = useRef<HTMLInputElement>(null);

  // Update selectedOption and searchValue when experienceLevel changes
  useEffect(() => {
    setSelectedOption(getDefaultSelection());
    setSearchValue(getInitialSearchValue());
  }, [experienceLevel]);

  const getDropdownOptions = () => {
    if (experienceLevel === "enterprise") {
      return [
        "Scaling enterprise workloads",
        "Multi-cloud governance",
        "Enterprise security & compliance",
        "Global infrastructure deployment",
        "Advanced analytics & AI",
        "DevOps at enterprise scale",
      ];
    } else if (experienceLevel === "smb") {
      return [
        "Migrating infrastructure",
        "Modernizing business applications",
        "Setting up cloud backup",
        "Implementing basic security",
        "Cost optimization",
        "Remote work enablement",
      ];
    } else {
      return [
        "Deploying an app",
        "Scaling a service",
        "Migrating infrastructure",
        "Setting up monitoring",
        "Configuring security",
        "Managing databases",
      ];
    }
  };

  const getAzureServices = () => {
    if (experienceLevel === "enterprise") {
      return [
        {
          name: "Azure Kubernetes Service",
          description:
            "Deploy and scale containerized applications with enterprise-grade orchestration and management.",
          icon: "/icons/Kubernetes-Services.svg",
          status: "recommended",
        },
        {
          name: "Azure Service Fabric",
          description:
            "Build and operate always-on, scalable, distributed microservices applications.",
          icon: "/icons/Service-Fabric-Clusters.svg",
          status: "enterprise",
        },
        {
          name: "Azure Synapse Analytics",
          description:
            "Limitless analytics service with unmatched time to insight across data warehouses and big data.",
          icon: "/icons/Azure-Synapse-Analytics.svg",
          status: "popular",
        },
        {
          name: "Azure Arc",
          description:
            "Extend Azure management and services to any infrastructure across on-premises and multi-cloud.",
          icon: "/icons/Azure-Arc.svg",
          status: "recommended",
        },
      ];
    } else if (experienceLevel === "smb") {
      return [
        {
          name: "Azure Migrate",
          description:
            "Discover, assess, and migrate your on-premises workloads to Azure with guided tools.",
          icon: "/icons/Azure-Migrate.svg",
          status: "recommended",
        },
        {
          name: "Azure Network Security",
          description:
            "Protect your business with network security groups, firewalls, and DDoS protection.",
          icon: "/icons/Network-Security-Hub.svg",
          status: "popular",
          onClick: () => handlePageChange("service-hubs"),
        },
        {
          name: "Azure SQL Database",
          description:
            "Fully managed intelligent SQL database with built-in high availability and security.",
          icon: "/icons/SQL-Database.svg",
          status: "recommended",
        },
        {
          name: "Windows Virtual Desktop",
          description:
            "Enable secure remote work with virtualized Windows desktops and apps in the cloud.",
          icon: "/icons/Windows-Virtual-Desktop.svg",
          status: "popular",
        },
      ];
    } else {
      return [
        {
          name: "Web App",
          description:
            "Easily host and manage websites and web applications without managing infrastructure.",
          icon: "/icons/Static-Web-Apps.svg",
          status: "recommended",
          pricing: "Free",
          onClick: () => {
            setSelectedService("Web App");
            setShowProjectModal(true);
          },
        },
        {
          name: "Container Apps",
          description:
            "Run your app in containers with automatic scaling and built-in microservices support.",
          icon: "/icons/containerapps.svg",
          status: "popular",
          pricing: "Free",
        },
        {
          name: "Function App",
          description:
            "Build serverless apps that run code on demand without worrying about servers.",
          icon: "/icons/Function-App.svg",
          status: "recommended",
          pricing: "Free",
          onClick: () => {
            setSelectedService("Function App");
            setShowProjectModal(true);
          },
        },
        {
          name: "App Services",
          description:
            "Build and deploy enterprise-ready web apps at scale with fully managed platform.",
          icon: "/icons/App-Services.svg",
          status: "popular",
          pricing: "Free",
        },
      ];
    }
  };

  const getActionCards = () => {
    if (experienceLevel === "enterprise") {
      return [
        {
          icon: Globe24Regular,
          title: "All Services",
          description:
            "Browse and explore all available Azure services across all categories.",
          onClick: () => handlePageChange("all-services"),
        },
        {
          icon: Database24Regular,
          title: "Marketplace",
          description:
            "Explore curated Azure services organized by category with guided setup and best practices.",
          onClick: () => handlePageChange("service-hubs"),
        },
        {
          icon: Document24Regular,
          title: "All Templates",
          description:
            "Discover deployment templates and quickstart solutions for Azure services.",
        },
        {
          icon: Bot24Regular,
          title: "AI Templates",
          description:
            "Pre-built AI templates for common scenarios like chatbots, document analysis, and image recognition.",
        },
      ];
    } else if (experienceLevel === "smb") {
      return [
        {
          icon: Globe24Regular,
          title: "All Services",
          description:
            "Browse and explore all available Azure services across all categories.",
          onClick: () => handlePageChange("all-services"),
        },
        {
          icon: Database24Regular,
          title: "Marketplace",
          description:
            "Explore curated Azure services organized by category with guided setup and best practices.",
          onClick: () => handlePageChange("service-hubs"),
        },
        {
          icon: Document24Regular,
          title: "All Templates",
          description:
            "Discover deployment templates and quickstart solutions for Azure services.",
        },
        {
          icon: Bot24Regular,
          title: "AI Templates",
          description:
            "Pre-built AI templates for common scenarios like chatbots, document analysis, and image recognition.",
        },
      ];
    } else {
      return [
        {
          icon: Globe24Regular,
          title: "All Services",
          description:
            "Browse and explore all available Azure services across all categories.",
          onClick: () => handlePageChange("all-services"),
        },
        {
          icon: Database24Regular,
          title: "Marketplace",
          description:
            "Explore curated Azure services organized by category with guided setup and best practices.",
          onClick: () => handlePageChange("service-hubs"),
        },
        {
          icon: Document24Regular,
          title: "All Templates",
          description:
            "Discover deployment templates and quickstart solutions for Azure services.",
        },
        {
          icon: Bot24Regular,
          title: "AI Templates",
          description:
            "Pre-built AI templates for common scenarios like chatbots, document analysis, and image recognition.",
        },
      ];
    }
  };

  const getNextStepsCards = (): NextStepsCard[] => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            title: "What's new",
            description:
              "Get the latest news, updates, and announcements from experts.",
            buttons: [
              { label: "Summarize the latest", primary: true, icon: true },
              { label: "Go to Azure Blog", primary: false },
            ],
          },
          {
            title: "Explore pricing options",
            description:
              "Check pricing options for your services and templates",
            buttons: [
              {
                label: "Estimate pricing for my workload",
                primary: true,
                icon: true,
              },
              { label: "Go to pricing calculator", primary: false },
            ],
          },
          {
            title: "Customize your learning",
            description:
              "Based on your needs or goals, view learning material that is relevant to you.",
            buttons: [
              {
                label: "Create tutorial plan for your goal",
                primary: true,
                icon: true,
              },
              { label: "Go to Learn", primary: false },
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

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "workload-agent") {
      handlePageChange("workload-agent");
    } else {
      setSearchValue(suggestion);
    }
    setShowSuggestions(false);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <div className={styles.stickyNav}>
          <TopNav
            activeLink="Discover"
            experienceLevel={experienceLevel}
            disabledItems={cameFromAzurePortal ? ["Build", "Manage"] : []}
            homeNavigatesTo={cameFromAzurePortal ? "home-fre" : undefined}
          />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <Text as="h1" className={styles.title}>
                Discover
              </Text>
            </div>
          </div>

          <div className={styles.searchRelativeWrapper}>
            <EnhancedInputBar
              value={searchValue}
              onChange={(newValue) => {
                setSearchValue(newValue);
                setShowSuggestions(true);
              }}
              onSubmit={(value) => {
                if (value.trim()) {
                  handleSuggestionClick(value);
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Message Copilot"
              className={styles.inputBarNoMargin}
            />

            {showSuggestions &&
              (searchValue === getInitialSearchValue() ||
                searchValue === "") && (
                <div className={styles.suggestionsDropdown}>
                  <SimpleSearchSuggestions
                    showSuggestions={showSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                    setShowSuggestions={setShowSuggestions}
                    inputRef={dummyInputRef}
                    experienceLevel={experienceLevel}
                    searchValue={searchValue}
                  />
                </div>
              )}
          </div>

          <NextStepsCardGroup cards={nextStepsCards} />

          <TabListCarousel experienceLevel={experienceLevel} />

          <div className={styles.actionCardsSection}>
            <div className={styles.actionCards}>
              {getActionCards().map((card, i) => (
                <div
                  key={i}
                  className={styles.actionCard}
                  onClick={card.onClick}
                >
                  {card.icon && (
                    <card.icon
                      className={`${styles.cardIcon} ${styles.cardIconBrand}`}
                    />
                  )}
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardDescription}>
                    {card.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateProjectModal
        open={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onCreateProject={(projectName) => {
          console.log("Creating project:", projectName);
          setShowProjectModal(false);
          // Navigate to the appropriate wizard based on selected service
          if (selectedService === "Function App") {
            handlePageChange("create-function-app-wizard");
          } else {
            handlePageChange("create-resource-2");
          }
        }}
        serviceName={selectedService}
      />
    </FluentProvider>
  );
};

export default Level1Discover;
