"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button as FluentButton,
  MessageBar,
  MessageBarBody,
  MessageBarActions,
  Card,
  CardPreview,
  Subtitle2,
} from "@fluentui/react-components";
import {
  Search24Regular,
  Document24Regular,
  Globe24Regular,
  Settings24Regular,
  Alert24Regular,
  Cube24Regular as CopilotIcon,
} from "@fluentui/react-icons";
import { CopilotSVGIcon } from "./copilot-svg-icon";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  dropdown: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 28px)",
    maxWidth: "calc(768px - 28px)",
    marginBottom: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 20px 16px 0 rgba(0, 30, 68, 0.05), 0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    zIndex: 1001,
    overflowY: "auto",
    maxHeight: "70vh",
  },
  suggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalM} ${tokens.spacingHorizontalXXL}`,
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  suggestionItemNoGap: {
    gap: "0",
  },
  copilotSuggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalM} ${tokens.spacingHorizontalXXL}`,
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "block",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  // Cross-platform results
  crossPlatformText: {
    fontSize: tokens.fontSizeBase300,
  },
  crossPlatformBold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  crossPlatformSubtext: {
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXS,
  },
  crossPlatformSuggestions: {
    marginTop: tokens.spacingVerticalS,
  },
  // Icon sizes
  iconSize16: {
    width: "16px",
    height: "16px",
  },
  iconSize16Blue: {
    width: "16px",
    height: "16px",
    color: tokens.colorBrandForeground1,
  },
  // Categorized results
  categorizedContainer: {
    padding: `${tokens.spacingVerticalL} 0`,
    maxHeight: "384px",
    overflowY: "auto",
  },
  sectionBlock: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  subtitleWithPadding: {
    marginBottom: tokens.spacingVerticalL,
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  taskCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  taskCardContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalL,
  },
  taskIconBox32: {
    width: "32px",
    height: "32px",
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#dbeafe",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  flexGrowMin: {
    flex: 1,
    minWidth: 0,
  },
  taskText: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.4",
    fontWeight: tokens.fontWeightRegular,
  },
  taskActionButton: {
    fontSize: tokens.fontSizeBase200,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    height: "auto",
    flexShrink: 0,
    backgroundColor: tokens.colorBrandForeground1,
  },
  // Copilot help section
  copilotIconBox24: {
    width: "24px",
    height: "24px",
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#dbeafe",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  flexOne: {
    flex: 1,
  },
  copilotHeadingText: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  openCopilotButton: {
    fontSize: tokens.fontSizeBase300,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    height: "auto",
    backgroundColor: tokens.colorBrandForeground1,
  },
  chipRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  copilotChipButton: {
    fontSize: tokens.fontSizeBase200,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    height: "auto",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  copilotHelpCard: {
    marginBottom: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  cardPadding: {
    padding: tokens.spacingHorizontalL,
  },
  copilotHeaderRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  // Category sections
  horizontalPaddingL: {
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  categoryRowWithBorder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  categoryRowBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalS} 0`,
  },
  categoryRowInner: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  categoryLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  categoryCount: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  seeAllButton: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  categoryItemName: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  // V2 header
  v2PromptHeader: {
    padding: "16px 16px 4px 26px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.8",
  },
  suggestionsListPadding: {
    padding: `${tokens.spacingVerticalS} 0`,
  },
  // V1 Copilot bottom section
  v1CopilotSection: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
  },
  v1CopilotHeading: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: "18px",
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalL,
    fontWeight: tokens.fontWeightSemibold,
    marginLeft: tokens.spacingHorizontalL,
  },
  copilotPillButton: {
    backgroundColor: "white",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "20px",
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    height: "auto",
    cursor: "pointer",
  },
});

interface HpCopilotSuggestionPanelProps {
  searchValue: string;
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  setShowSuggestions: (show: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  experienceLevel?: string;
  searchResultsCache?: Record<string, any>;
  setSearchResultsCache?: (cache: Record<string, any>) => void;
  version?: "v1" | "v2";
  onCopilotClick?: () => void;
  onClearSearchField?: () => void;
  onSetSearchField?: (value: string) => void;
  onNavigateToDiscover?: () => void;
}

/** Dropdown suggestion panel that appears below the homepage search/input bar.
 * Displays contextual suggestions including cross-platform term mappings (AWS/GCP→Azure),
 * categorized search results (tasks, resources, services, docs), and Copilot prompts.
 * Instead of: building inline search dropdowns with custom suggestion logic. */
export default function HpCopilotSuggestionPanel({
  searchValue,
  showSuggestions,
  onSuggestionClick,
  setShowSuggestions,
  inputRef,
  experienceLevel = "new",
  searchResultsCache,
  setSearchResultsCache,
  version = "v1",
  onCopilotClick,
  onClearSearchField,
  onSetSearchField,
  onNavigateToDiscover,
}: HpCopilotSuggestionPanelProps) {
  const styles = useStyles();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
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

  // Cross-platform term mapping
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

    vm: { azure: "Virtual Machine", platform: "Generic" },
    lb: { azure: "Load Balancer", platform: "Generic" },
    db: { azure: "Database", platform: "Generic" },
  };

  // Utility functions
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

  // Suggestion data
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
    "How to create a storage account",
    "How to set up authentication",
    "What is Azure App Service?",
    "What are the pricing options for Azure?",
    "View my virtual machines",
    "View my resource groups",
    "Show me my recent deployments",
    "Show me my cost analysis",
  ];

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

  // Mock data for categorized results
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

  // Main search results logic
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
      if (!searchResultsCache?.[cacheKey]) {
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

        if (setSearchResultsCache) {
          setSearchResultsCache((prev: Record<string, any>) => ({
            ...prev,
            [cacheKey]: randomizedData,
          }));
        }

        return { type: "categorized", data: randomizedData };
      }

      return {
        type: "categorized",
        data: searchResultsCache?.[cacheKey] || [],
      };
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

  if (!showSuggestions) {
    return null;
  }

  const searchResults = getSearchResults();

  // Render cross-platform results
  const renderCrossPlatformResults = (
    match: any,
    suggestions: string[] = [],
  ) => {
    return (
      <div>
        <MessageBar>
          <MessageBarBody>
            <Text as="p" className={styles.crossPlatformText}>
              <span className={styles.crossPlatformBold}>Did you mean:</span>{" "}
              {match.azureTerm}?
            </Text>
            <Text as="p" className={styles.crossPlatformSubtext}>
              It looks like you're using {match.platform} terminology. In Azure,
              "{match.originalTerm}" is called "{match.azureTerm}".
            </Text>
          </MessageBarBody>
          <MessageBarActions>
            <FluentButton
              appearance="primary"
              size="small"
              onClick={() => onSuggestionClick(`Create ${match.azureTerm}`)}
            >
              Use Azure term
            </FluentButton>
          </MessageBarActions>
        </MessageBar>

        {suggestions.length > 0 && (
          <div className={styles.crossPlatformSuggestions}>
            {suggestions
              .slice(0, 4)
              .map((suggestion: string, index: number) => (
                <button
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => onSuggestionClick(suggestion)}
                >
                  <Search24Regular className={styles.iconSize16} />
                  <span>{suggestion}</span>
                </button>
              ))}
          </div>
        )}
      </div>
    );
  };

  const renderCategorizedResults = (data: any) => {
    const getCategoryCount = (category: string, defaultCount: number) => {
      return data.counts?.[category] || defaultCount;
    };

    return (
      <div className={styles.categorizedContainer}>
        {/* Suggested Tasks Section */}
        <div className={styles.sectionBlock}>
          <Subtitle2 className={styles.subtitleWithPadding}>
            Suggested tasks
          </Subtitle2>
          <div className={styles.taskGrid}>
            <Card className={styles.taskCard}>
              <CardPreview>
                <div className={styles.taskCardContent}>
                  <div className={styles.taskIconBox32}>
                    <Document24Regular className={styles.iconSize16Blue} />
                  </div>
                  <div className={styles.flexGrowMin}>
                    <Text className={styles.taskText}>
                      Create and deploy a VM in one click with our ready-made
                      starter kits.
                    </Text>
                  </div>
                  <FluentButton
                    appearance="primary"
                    size="small"
                    className={styles.taskActionButton}
                  >
                    Create
                  </FluentButton>
                </div>
              </CardPreview>
            </Card>
            <Card className={styles.taskCard}>
              <CardPreview>
                <div className={styles.taskCardContent}>
                  <div className={styles.taskIconBox32}>
                    <Globe24Regular className={styles.iconSize16Blue} />
                  </div>
                  <div className={styles.flexGrowMin}>
                    <Text className={styles.taskText}>
                      Secure your data by enabling backups for your virtual
                      machines.
                    </Text>
                  </div>
                  <FluentButton
                    appearance="primary"
                    size="small"
                    className={styles.taskActionButton}
                  >
                    Enable
                  </FluentButton>
                </div>
              </CardPreview>
            </Card>
          </div>
        </div>

        {/* Get help with Copilot Section */}
        <div className={styles.sectionBlock}>
          <Subtitle2 className={styles.subtitleWithPadding}>
            Get help with Copilot
          </Subtitle2>
          <div className={styles.horizontalPaddingL}>
            <Card className={styles.copilotHelpCard}>
              <CardPreview>
                <div className={styles.cardPadding}>
                  <div className={styles.copilotHeaderRow}>
                    <div className={styles.copilotIconBox24}>
                      <CopilotIcon className={styles.iconSize16Blue} />
                    </div>
                    <div className={styles.flexOne}>
                      <Text className={styles.copilotHeadingText}>
                        It looks like you're trying to work with your virtual
                        machines? Do you want to:
                      </Text>
                    </div>
                    <FluentButton
                      appearance="primary"
                      size="small"
                      className={styles.openCopilotButton}
                      onClick={() => {
                        if (onCopilotClick) {
                          onCopilotClick();
                        }
                      }}
                    >
                      Open Copilot
                    </FluentButton>
                  </div>
                  <div className={styles.chipRow}>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      className={styles.copilotChipButton}
                    >
                      Breakdown my monthly costs
                    </FluentButton>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      className={styles.copilotChipButton}
                    >
                      View CPU performance
                    </FluentButton>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      className={styles.copilotChipButton}
                    >
                      Scale the size of a virtual machine
                    </FluentButton>
                  </div>
                </div>
              </CardPreview>
            </Card>
          </div>
        </div>

        {/* Category sections */}
        <div className={styles.horizontalPaddingL}>
          <div className={styles.categoryRowWithBorder}>
            <div className={styles.categoryRowInner}>
              <span className={styles.categoryLabel}>Your resources</span>
              <span className={styles.categoryCount}>
                ({getCategoryCount("resources", 12)})
              </span>
            </div>
            <button className={styles.seeAllButton}>See all</button>
          </div>

          {[
            { name: "Azure Services", key: "azureServices", count: 22 },
            { name: "Resource Groups", key: "resourceGroups", count: 8 },
            { name: "Microsoft Entra ID", key: "entraId", count: 50 },
            { name: "Marketplace", key: "marketplace", count: 9 },
            {
              name: "Documentation",
              key: "documentation",
              count: 99,
              suffix: "+",
            },
          ].map((category, index, array) => (
            <div
              key={category.key}
              className={
                index === array.length - 1
                  ? styles.categoryRowBase
                  : styles.categoryRowWithBorder
              }
            >
              <div className={styles.categoryRowInner}>
                <span className={styles.categoryItemName}>{category.name}</span>
                <span className={styles.categoryCount}>
                  ({getCategoryCount(category.key, category.count)}
                  {category.suffix || ""})
                </span>
              </div>
              <button className={styles.seeAllButton}>See all</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {searchResults.type === "cross-platform" ? (
        renderCrossPlatformResults(
          searchResults.match,
          searchResults.suggestions,
        )
      ) : (
        <div>
          {/* V2 Header - Prompt suggestions */}
          {version === "v2" && (
            <div className={styles.v2PromptHeader}>Prompt suggestions</div>
          )}

          {/* Regular Suggestions - Show for both V1 and V2 */}
          <div className={styles.suggestionsListPadding}>
            {(searchResults.suggestions || [])
              .slice(0, 6)
              .map((suggestion: string, index: number) => (
                <button
                  key={index}
                  className={mergeClasses(
                    styles.suggestionItem,
                    version === "v2" && styles.suggestionItemNoGap,
                  )}
                  onClick={() => {
                    if (version === "v2") {
                      // V2: Only set suggestion in input, don't navigate yet
                      // User will click submit button to navigate
                      if (onSetSearchField) {
                        onSetSearchField(suggestion);
                      }
                      setShowSuggestions(false);
                    } else {
                      // V1: Navigate to search results immediately
                      onSuggestionClick(suggestion);
                    }
                  }}
                >
                  {version !== "v2" && (
                    <Search24Regular className={styles.iconSize16} />
                  )}
                  <span>{suggestion}</span>
                </button>
              ))}
          </div>

          {/* Get help with Copilot Section - V1 only / Change search settings - V2 only */}
          {version === "v2" ? null : (
            /* V1: Get help with Copilot section */
            <div className={styles.v1CopilotSection}>
              <div className={styles.v1CopilotHeading}>
                <CopilotSVGIcon width={20} height={20} />
                Get help with Copilot
              </div>

              <div className={styles.horizontalPaddingL}>
                <div className={styles.chipRow}>
                  <FluentButton
                    appearance="outline"
                    className={styles.copilotPillButton}
                    onClick={() => {
                      if (onCopilotClick) {
                        onCopilotClick();
                      }
                    }}
                  >
                    Getting started with Azure
                  </FluentButton>

                  <FluentButton
                    appearance="outline"
                    className={styles.copilotPillButton}
                    onClick={() => {
                      if (onCopilotClick) {
                        onCopilotClick();
                      }
                    }}
                  >
                    Which Azure services to use
                  </FluentButton>

                  <FluentButton
                    appearance="outline"
                    className={styles.copilotPillButton}
                    onClick={() => {
                      if (onCopilotClick) {
                        onCopilotClick();
                      }
                    }}
                  >
                    Learn more about Azure CLI
                  </FluentButton>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
