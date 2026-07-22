"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
  webLightTheme,
  Text,
  Button,
  Input,
  Tab,
  TabList,
  Avatar,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  Send24Regular,
  Sparkle20Regular,
  PanelLeft24Regular,
  Add24Regular,
  Document24Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  ChatAdd20Regular,
  MoreHorizontal20Regular,
  PanelRight20Regular,
  PanelLeftContract20Regular,
  Chat20Regular,
  Bot20Regular,
} from "@fluentui/react-icons";
import { TopNav } from "../../shared/top-nav";
import { useNavigation } from "../../../lib/navigation-context";
import { AzureHeaderP1 } from "../../shared/azure-header-p1";

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
  container: {
    height: "90vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    height: "100%",
  },
  sidebar: {
    width: "240px",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexShrink: 0,
    padding: "12px 8px",
    transition: "width 0.3s ease, padding 0.3s ease",
    height: "100%",
    overflowY: "auto",
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
    padding: "8px 16px",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "12px",
    border: `1px solid transparent`,
    background: "transparent",
    cursor: "pointer",
    position: "relative",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
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
  conversationItem: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  allConversationsLink: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  conversationPanel: {
    padding: "24px",
    paddingTop: "0px",
    maxWidth: "888px",
    border: "none",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  userMessage: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "24px",
    padding: "12px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    maxWidth: "fit-content",
    marginLeft: "auto",
    alignSelf: "flex-end",
    display: "inline-block",
    textAlign: "right",
  },
  copilotResponse: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    maxWidth: "85%",
    alignSelf: "flex-start",
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
    lineHeight: "20px",
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
    lineHeight: "20px",
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
  codePanel: {
    width: "0",
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: "none",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "width 0.3s ease-in-out",
    flexShrink: 0,
    height: "100%",
  },
  codePanelOpen: {
    width: "340px",
    minWidth: "340px",
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
    backgroundColor: tokens.colorNeutralBackground3,
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
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
    height: "100%",
  },
  header: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "64px",
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
    backgroundColor: tokens.colorNeutralBackground2,
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "24px",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
    padding: "16px 24px 24px 24px",
    backgroundColor: tokens.colorNeutralBackground2,
    flexShrink: 0,
    marginBottom: "50px",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: "none",
    borderRadius: "30px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.14)",
    maxWidth: "888px",
    width: "100%",
    margin: "0 auto",
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
  collapseButton: {
    minWidth: "32px",
    height: "32px",
  },
  copilotResponseAnimated: {
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
  },
  sectionSpacingMd: {
    marginTop: "16px",
  },
  sectionSpacingLg: {
    marginTop: "24px",
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    marginBottom: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    cursor: "pointer",
  },
  userCardInfo: {
    flex: 1,
  },
  userCardName: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    display: "block",
  },
  userCardDetail: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    display: "block",
  },
  suggestedMatchText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginTop: "8px",
    display: "block",
  },
  architectureImage: {
    width: "50%",
    height: "auto",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  hiddenSection: {
    display: "none",
  },
  documentIcon: {
    width: "20px",
    height: "20px",
    marginRight: "6px",
  },
  criteriaIcon: {
    width: "16px",
    height: "16px",
  },
  darkModeFilter: {
    filter: "invert(1) brightness(1.2)",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px 12px 16px",
  },
  panelHeaderTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
  },
  closePanelButton: {
    minWidth: "32px",
    padding: "4px",
  },
  codePanelContentPadded: {
    padding: "0 16px 16px 16px",
  },
  copilotSuggestionsHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  iconSmall: {
    width: "20px",
    height: "20px",
  },
  iconXSmall: {
    width: "16px",
    height: "16px",
  },
  suggestionsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
    alignItems: "flex-start",
  },
  suggestionButton: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    color: tokens.colorNeutralForeground1,
    fontSize: "12px",
    fontWeight: tokens.fontWeightRegular,
    padding: "4px 12px",
    height: "auto",
    cursor: "pointer",
    width: "auto",
    minWidth: "auto",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    transitionProperty: "all",
    "&:hover": {
      border: `1px solid ${tokens.colorBrandForeground1}`,
      color: tokens.colorBrandForeground1,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  panelSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  panelSectionTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
  },
  seeAllButton: {
    minWidth: "auto",
    padding: "4px 8px",
  },
  panelItemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  panelListItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 4px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  panelListItemWithAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 4px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  panelListItemInner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  panelItemText: {
    fontSize: "13px",
  },
  infoIcon: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
  },
});

interface WorkloadAgentProps {
  onClose?: () => void;
  viewMode?: "list" | "bubbles" | "bubbles-history";
  onViewModeChange?: (mode: "list" | "bubbles" | "bubbles-history") => void;
  initialPrompt?: string;
  initialSuggestionsPanelOpen?: boolean;
  isDarkMode?: boolean;
  selectedPrompt?: string;
  openedFromSidePanel?: boolean;
}

// Content mapping for different prompts
const promptContent: Record<string, any> = {
  aj1sa: {
    userMessage: "aj1sa",
    copilotResponse: {
      text: `The term "aj1sa" appears to be the name of an Azure Storage Account within the resource group "aj1sa_group" in your Azure subscription.

To manage your Azure Storage Account, you can use several methods and tools provided by Microsoft Azure. Here are some key ways to manage your storage account:`,
      sections: [
        {
          title: "1. Azure Portal:",
          items: [
            {
              description:
                "You can manage your storage account directly through the Azure Portal. This includes viewing and copying your account access keys, managing containers, and configuring settings.",
            },
            {
              description:
                'To view and copy your storage account access keys, navigate to your storage account in the Azure Portal, go to the "Access keys" section under "Security + networking," and use the provided options to show and copy keys or connection strings.',
            },
          ],
        },
        {
          title: "2. Azure CLI:",
          items: [
            {
              description:
                "Use the Azure Command-Line Interface (CLI) to manage your storage account programmatically.",
            },
          ],
        },
        {
          title: "3. PowerShell:",
          items: [
            {
              description:
                "Azure PowerShell can also be used to manage your storage account. You can retrieve your account access keys with the Get-AzStorageAccountKey command.",
            },
          ],
        },
        {
          title: "4. Azure Explorer for Eclipse:",
          items: [
            {
              description:
                "Although deprecated, Azure Explorer for Eclipse was a tool for Java developers to manage storage accounts within the Eclipse IDE.",
            },
          ],
        },
      ],
    },
    suggestions: [
      "Show me access keys for aj1sa",
      "Create a new storage container",
      "View storage account metrics",
    ],
    azureServices: [
      { name: "Storage accounts", icon: "/icons/Storage.svg" },
      { name: "Storage browser", icon: "/icons/Browser.svg" },
      {
        name: "Storage Sync Services",
        icon: "/icons/Storage-Sync-Services.svg",
      },
    ],
    resources: [
      {
        name: "aj1sa-0",
        type: "Storage account",
        rg: "Contoso-rg",
        location: "East US",
        subscription: "Contoso-sub2",
      },
      {
        name: "aj1sa-1",
        type: "Storage account",
        rg: "Contoso-rg",
        location: "West US 2",
        subscription: "Contoso-sub2",
      },
    ],
  },
  "Create a new App Service": {
    userMessage: "Create a new App Service",
    copilotResponse: {
      text: "You deployed contoso-webapp01 yesterday — I can help you spin up another.",
      options: [
        {
          title: "Option 1: Reuse last configuration",
          details: [
            "Runtime: Node.js 18 LTS",
            "Operating system: Linux",
            "Plan: Basic (B1) – shared with existing apps",
            "Resource group: RG-WebApps",
          ],
        },
        {
          title: "Option 2: Start fresh",
          details: [
            "Choose your own:",
            "Runtime stack (Node.js, .NET, Python, Java, etc.)",
            "Region (recommended: near West US 2)",
            "Pricing plan (Basic, Standard, Premium)",
            "Resource group (use existing or create new)",
          ],
        },
      ],
    },
    suggestions: [
      "View deployment logs for my App Service",
      "Scale my App Service to a higher tier",
      "Set up custom domains and SSL for my App Service",
    ],
    azureServices: [
      { name: "App Services", icon: "/icons/App-Services.svg", count: 10 },
      { name: "App Service Certificates", icon: "/icons/Certificate.svg" },
      { name: "App Service Domains", icon: "/icons/App-Service-Domains.svg" },
    ],
    resources: [
      {
        name: "myAppService",
        type: "App Service",
        rg: "Contoso-rg",
        location: "West US 2",
        subscription: "Contoso-sub2",
      },
      {
        name: "Contoso-AppService",
        type: "App Service",
        rg: "Contoso-rg",
        location: "East US 2",
        subscription: "Contoso-sub2",
      },
    ],
  },
  "Learn about different database types in Azure": {
    userMessage: "Learn about different database types in Azure",
    copilotResponse: {
      text: "Azure offers a variety of database types to cater to different needs. Here's a quick overview of the main types available:",
      sections: [
        {
          title: "1. Relational Databases:",
          items: [
            {
              label: "Azure SQL Database:",
              description: "A fully managed, cloud-based version of SQL Server",
            },
            {
              label: "Azure SQL Managed Instance:",
              description:
                "Offers a near-complete SQL Server environment in the cloud",
            },
            {
              label: "Azure Database for PostgreSQL:",
              description:
                "A managed PostgreSQL service supporting open-source extensions",
            },
            {
              label: "Azure Database for MySQL:",
              description: "A managed MySQL database service",
            },
          ],
        },
        {
          title: "2. NoSQL Databases:",
          items: [
            {
              label: "Azure Cosmos DB:",
              description:
                "A fully managed NoSQL database with multiple APIs, including MongoDB, Cassandra, and Gremlin",
            },
            {
              label: "Azure Managed Instance for Apache Cassandra:",
              description: "A managed service for Apache Cassandra workloads",
            },
          ],
        },
        {
          title: "3. In-memory Databases:",
          items: [
            {
              label: "Azure Cache for Redis:",
              description:
                "Provides high-throughput and low-latency access to data for applications",
            },
          ],
        },
      ],
      conclusion:
        "These databases support various data models and are designed to meet different application requirements, from transactional workloads to large-scale analytics. Each service offers unique features, such as distributed multiregion writes and virtual network connectivity support, to enhance performance and security.",
    },
    suggestions: [
      "Create a new SQL database",
      "Connect my app to an Azure database",
      "Show me my database performance metrics",
    ],
    azureServices: [
      { name: "Azure SQL Database", icon: "/icons/SQL-Database.svg" },
      { name: "Azure Cosmos DB", icon: "/icons/SQL-Database.svg" },
      { name: "Azure Cache for Redis", icon: "/icons/SQL-Database.svg" },
    ],
    resources: [],
  },
  "Assign the Reader role to Adam": {
    userMessage: "Assign the Reader role to Adam",
    copilotResponse: {
      text: "I found multiple users named Adam. Choose the correct one to continue.",
      users: [
        {
          name: "Adam Farz",
          email: "adam.farz@contoso.com",
          note: "Last active today",
        },
        {
          name: "Adam Lee",
          email: "adam.lee@contoso.com",
          note: "Last active 14 days ago",
        },
        {
          name: "Adam Chen",
          email: "adam.chen@partnerorg.com (guest)",
          note: "Last active 2 days ago",
        },
      ],
      suggestedMatch: "Adam Farz (recent activity, same tenant)",
    },
    suggestions: [
      "Find users named Adam in Microsoft Entra ID",
      "Give Adam access to the resource group RG1",
      "Reset Adam's password",
    ],
    azureServices: [
      { name: "Adam Anderson", icon: "/icons/Users.svg" },
      { name: "Adam Blakely", icon: "/icons/Users.svg" },
      { name: "Adam Bensen", icon: "/icons/Users.svg" },
      { name: "Adam Carlson", icon: "/icons/Users.svg" },
      { name: "Adam Carrson", icon: "/icons/Users.svg" },
      { name: "Adam Clark", icon: "/icons/Users.svg" },
    ],
    resourceGroups: [{ name: "Resource Groups (6)", count: 6 }],
    documentation: [{ name: "Documentation (99+)", count: "99+" }],
  },
  "Help me reset Adam's password": {
    userMessage: "Help me reset Adam's password",
    copilotResponse: {
      text: "I found multiple users named Adam. Choose the correct one to continue.",
      users: [
        {
          name: "Adam Farz",
          email: "adam.farz@contoso.com",
          note: "Last active today",
        },
        {
          name: "Adam Lee",
          email: "adam.lee@contoso.com",
          note: "Last active 14 days ago",
        },
        {
          name: "Adam Chen",
          email: "adam.chen@partnerorg.com (guest)",
          note: "Last active 2 days ago",
        },
      ],
      suggestedMatch: "Adam Farz (recent activity, same tenant)",
    },
    suggestions: [
      "Find users named Adam in Microsoft Entra ID",
      "Give Adam access to the resource group RG1",
      "Assign the Reader role to Adam",
    ],
    azureServices: [
      { name: "Adam Anderson", icon: "/icons/Users.svg" },
      { name: "Adam Blakely", icon: "/icons/Users.svg" },
      { name: "Adam Bensen", icon: "/icons/Users.svg" },
      { name: "Adam Carlson", icon: "/icons/Users.svg" },
      { name: "Adam Carrson", icon: "/icons/Users.svg" },
      { name: "Adam Clark", icon: "/icons/Users.svg" },
    ],
    resourceGroups: [{ name: "Resource Groups (6)", count: 6 }],
    documentation: [{ name: "Documentation (99+)", count: "99+" }],
  },
  "Visualize RG1 architecture map": {
    userMessage: "Visualize RG1 architecture map",
    copilotResponse: {
      text: "Here's the architecture for your RG1 resource group in West US. I've mapped out how your virtual machines, databases, and services connect within the network.",
      image: "/rg1-architecture.png",
    },
    suggestions: [
      "Check RG1 for cost and performance",
      "Visualize RG1 topology map",
      "Compare RG1's architecture against best practices",
    ],
    resourceGroups: [
      { name: "RG1", icon: "/icons/Resource-Groups.svg" },
      { name: "RG2", icon: "/icons/Resource-Groups.svg" },
      { name: "Contoso-rg", icon: "/icons/Resource-Groups.svg" },
      { name: "Dev-RG", icon: "/icons/Resource-Groups.svg" },
      { name: "testingRG", icon: "/icons/Resource-Groups.svg" },
    ],
    documentation: [{ name: "Documentation (99+)", count: "99+" }],
  },
};

const WorkloadAgent: React.FC<WorkloadAgentProps> = ({
  onClose,
  viewMode = "list",
  onViewModeChange,
  initialPrompt,
  initialSuggestionsPanelOpen = true,
  isDarkMode = false,
  selectedPrompt,
  openedFromSidePanel,
}) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [activeSection, setActiveSection] = useState<
    "chat" | "researcher" | "analyst" | "infrastructure"
  >("chat");
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(
    initialSuggestionsPanelOpen,
  );
  const [showCopilotResponse, setShowCopilotResponse] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Get content based on selected prompt, initial prompt, or use default
  const activePrompt = selectedPrompt || initialPrompt;
  console.log("Active prompt received:", activePrompt);
  console.log("Available prompts:", Object.keys(promptContent));
  const currentContent =
    activePrompt && promptContent[activePrompt]
      ? promptContent[activePrompt]
      : promptContent["Learn about different database types in Azure"];
  console.log("Selected content:", currentContent.userMessage);

  const suggestions = [
    "Create a AKS cluster to deploy and manage a scalable and secure web application for hosting a blog",
    "Restart my virtual machines in West US",
    "How can I optimize my monthly bill?",
  ];

  // Scroll to bottom when component loads and show copilot response after delay
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }

    // Show copilot response after 800ms delay
    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <AzureHeaderP1 activeLink="Home" hideSuggestions={true} />

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
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
                  className={styles.copilotLogo}
                />
                <Text className={styles.sidebarTitle}>Copilot</Text>
              </div>
            )}
            <Button
              appearance="subtle"
              icon={<PanelLeftContract20Regular />}
              className={styles.collapseButton}
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
                  <Chat20Regular className={styles.navIcon} />
                  <span>Chat</span>
                </button>
              </div>
            </>
          )}

          {/* Conversations Section */}
          {!isSidebarCollapsed && (
            <div className={styles.conversationsSection}>
              <Text className={styles.agentsSubheader}>Conversations</Text>

              <div className={styles.conversationItem}>
                Deploy Kubernetes cluster...
              </div>
              <div className={styles.conversationItem}>
                Set up CI/CD pipeline with...
              </div>
              <div className={styles.conversationItem}>
                Optimize Docker containe...
              </div>
              <div className={styles.conversationItem}>
                Configure Azure App Serv...
              </div>
              <div className={styles.conversationItem}>
                Implement microservices ...
              </div>

              <a className={styles.allConversationsLink}>All conversations</a>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Text className={styles.headerTitle}>New chat</Text>
            </div>
            <div className={styles.headerRight}>
              <Button
                appearance="subtle"
                icon={<MoreHorizontal20Regular />}
                className={styles.headerButton}
                title="More options"
              />
              <Button
                appearance="outline"
                icon={<ChatAdd20Regular />}
                className={styles.newChatButton}
                title="New chat"
              >
                New chat
              </Button>
              <Button
                appearance="subtle"
                icon={<PanelRight20Regular />}
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
                  {currentContent.userMessage}
                </div>

                {/* Copilot Response */}
                {showCopilotResponse && (
                  <div
                    className={mergeClasses(
                      styles.copilotResponse,
                      styles.copilotResponseAnimated,
                    )}
                  >
                    <img
                      src="/icons/copilot-icon.svg"
                      alt="Copilot"
                      className={styles.copilotAvatar}
                    />
                    <div className={styles.responseContent}>
                      <div className={styles.responseHeader}>
                        <Text className={styles.copilotLabel}>Copilot</Text>
                      </div>

                      <Text className={styles.responseDescription}>
                        {currentContent.copilotResponse.text}
                      </Text>

                      {/* Render options for App Service */}
                      {currentContent.copilotResponse.options &&
                        currentContent.copilotResponse.options.map(
                          (option: any, index: number) => (
                            <div
                              key={index}
                              className={styles.sectionSpacingMd}
                            >
                              <Text className={styles.sectionSubheader}>
                                {option.title}
                              </Text>
                              <ul className={styles.bulletList}>
                                {option.details.map(
                                  (detail: string, detailIndex: number) => (
                                    <li
                                      key={detailIndex}
                                      className={styles.bulletItem}
                                    >
                                      {detail}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ),
                        )}

                      {/* Render sections for database content */}
                      {currentContent.copilotResponse.sections &&
                        currentContent.copilotResponse.sections.map(
                          (section: any, index: number) => (
                            <div key={index}>
                              <Text className={styles.sectionSubheader}>
                                {section.title}
                              </Text>
                              <ul className={styles.bulletList}>
                                {section.items.map(
                                  (item: any, itemIndex: number) => (
                                    <li
                                      key={itemIndex}
                                      className={styles.bulletItem}
                                    >
                                      <strong>{item.label}</strong>{" "}
                                      {item.description}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ),
                        )}

                      {/* Render user selection for Adam role assignment */}
                      {currentContent.copilotResponse.users && (
                        <div className={styles.sectionSpacingMd}>
                          {currentContent.copilotResponse.users.map(
                            (user: any, index: number) => (
                              <div key={index} className={styles.userCard}>
                                <Avatar
                                  name={user.name}
                                  size={40}
                                  color="colorful"
                                />
                                <div className={styles.userCardInfo}>
                                  <Text className={styles.userCardName}>
                                    {user.name}
                                  </Text>
                                  <Text className={styles.userCardDetail}>
                                    {user.email} — {user.note}
                                  </Text>
                                </div>
                              </div>
                            ),
                          )}
                          {currentContent.copilotResponse.suggestedMatch && (
                            <Text className={styles.suggestedMatchText}>
                              Suggested match:{" "}
                              {currentContent.copilotResponse.suggestedMatch}
                            </Text>
                          )}
                        </div>
                      )}

                      {/* Render architecture diagram image if exists */}
                      {currentContent.copilotResponse.image && (
                        <div className={styles.sectionSpacingLg}>
                          <img
                            src={currentContent.copilotResponse.image}
                            alt="Architecture diagram"
                            className={styles.architectureImage}
                          />
                        </div>
                      )}

                      {/* Render conclusion if exists */}
                      {currentContent.copilotResponse.conclusion && (
                        <div
                          className={mergeClasses(
                            styles.responseDescription,
                            styles.sectionSpacingMd,
                          )}
                        >
                          {currentContent.copilotResponse.conclusion}
                        </div>
                      )}

                      <div
                        className={mergeClasses(
                          styles.actionButtons,
                          styles.hiddenSection,
                        )}
                      >
                        <Button appearance="primary">Deploy</Button>
                        <Button appearance="outline">
                          <Document24Regular className={styles.documentIcon} />
                          View script
                        </Button>
                        <Button appearance="outline">Open in VSCode Web</Button>
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
                              styles.criteriaIcon,
                              isDarkMode ? styles.darkModeFilter : undefined,
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

            {/* Input Section */}
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
                        isDarkMode ? styles.darkModeFilter : undefined,
                      )}
                    />
                    <span>Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copilot Suggestions Panel */}
        <div
          className={`${styles.codePanel} ${showSuggestionsPanel ? styles.codePanelOpen : ""}`}
        >
          <div className={styles.panelHeader}>
            <Text className={styles.panelHeaderTitle}>From your search</Text>
            <Button
              appearance="subtle"
              icon={<PanelRight20Regular />}
              onClick={() => setShowSuggestionsPanel(false)}
              title="Close panel"
              className={styles.closePanelButton}
            />
          </div>
          <div
            className={mergeClasses(
              styles.codePanelContent,
              styles.codePanelContentPadded,
            )}
          >
            <div className={styles.copilotSuggestionsHeader}>
              <img
                src="/icons/copilot-icon.svg"
                alt="Copilot"
                className={styles.iconSmall}
              />
              <Text className={styles.panelHeaderTitle}>
                Copilot suggestions
              </Text>
            </div>

            <div className={styles.suggestionsColumn}>
              {currentContent.suggestions.map(
                (suggestion: string, index: number) => (
                  <Button
                    key={index}
                    appearance="outline"
                    className={styles.suggestionButton}
                  >
                    {suggestion}
                  </Button>
                ),
              )}
            </div>

            {/* Microsoft Entra ID Section */}
            {currentContent.azureServices &&
              currentContent.azureServices.length > 0 &&
              currentContent.azureServices[0].icon?.includes("Users") && (
                <div className={styles.sectionSpacingLg}>
                  <div className={styles.panelSectionHeader}>
                    <Text className={styles.panelSectionTitle}>
                      Microsoft Entra ID (25)
                    </Text>
                    <Button
                      appearance="outline"
                      size="small"
                      className={styles.seeAllButton}
                    >
                      See all
                    </Button>
                  </div>

                  <div className={styles.panelItemsList}>
                    {currentContent.azureServices.map(
                      (user: any, index: number) => (
                        <div key={index} className={styles.panelListItem}>
                          <img
                            src={user.icon}
                            alt={user.name}
                            className={styles.iconXSmall}
                          />
                          <Text className={styles.panelItemText}>
                            {user.name}
                          </Text>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Azure Services Section (for non-user content) */}
            {currentContent.azureServices &&
              currentContent.azureServices.length > 0 &&
              !currentContent.azureServices[0].icon?.includes("Users") && (
                <div className={styles.sectionSpacingLg}>
                  <div className={styles.panelSectionHeader}>
                    <Text className={styles.panelSectionTitle}>
                      Azure Services{" "}
                      {currentContent.azureServices[0]?.count
                        ? `(${currentContent.azureServices[0].count})`
                        : ""}
                    </Text>
                    <Button
                      appearance="outline"
                      size="small"
                      className={styles.seeAllButton}
                    >
                      See all
                    </Button>
                  </div>

                  <div className={styles.panelItemsList}>
                    {currentContent.azureServices.map(
                      (service: any, index: number) => (
                        <div
                          key={index}
                          className={styles.panelListItemWithAction}
                          onClick={() => {
                            if (service.name === "App Services") {
                              handlePageChange("appser-control-old");
                            }
                          }}
                        >
                          <div className={styles.panelListItemInner}>
                            <img
                              src={service.icon}
                              alt={service.name}
                              className={styles.iconXSmall}
                            />
                            <Text className={styles.panelItemText}>
                              {service.name}
                            </Text>
                          </div>
                          <span className={styles.infoIcon}>ⓘ</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Resource Groups Section */}
            {currentContent.resourceGroups &&
              currentContent.resourceGroups.length > 0 && (
                <div className={styles.sectionSpacingLg}>
                  <div className={styles.panelSectionHeader}>
                    <Text className={styles.panelSectionTitle}>
                      Resource Groups (
                      {currentContent.resourceGroups[0].count || 32})
                    </Text>
                    <Button
                      appearance="outline"
                      size="small"
                      className={styles.seeAllButton}
                    >
                      See all
                    </Button>
                  </div>

                  {/* Show resource group items if they have icons (not just count) */}
                  {currentContent.resourceGroups[0].icon && (
                    <div className={styles.panelItemsList}>
                      {currentContent.resourceGroups.map(
                        (rg: any, index: number) => (
                          <div key={index} className={styles.panelListItem}>
                            <img
                              src={rg.icon}
                              alt={rg.name}
                              className={styles.iconXSmall}
                            />
                            <Text className={styles.panelItemText}>
                              {rg.name}
                            </Text>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}

            {/* Documentation Section */}
            {currentContent.documentation && (
              <div className={styles.sectionSpacingLg}>
                <div className={styles.panelSectionHeader}>
                  <Text className={styles.panelSectionTitle}>
                    Documentation ({currentContent.documentation[0].count})
                  </Text>
                  <Button
                    appearance="outline"
                    size="small"
                    className={styles.seeAllButton}
                  >
                    See all
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { WorkloadAgent as CopilotImmersive };
export default WorkloadAgent;
