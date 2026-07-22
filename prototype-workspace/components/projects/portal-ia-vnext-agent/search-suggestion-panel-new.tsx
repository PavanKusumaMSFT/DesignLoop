/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
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


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Search24Regular,
  Document24Regular,
  Globe24Regular,
  Settings24Regular,
  Alert24Regular,
  Cube24Regular as CopilotIcon,
} from "@fluentui/react-icons";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";

const useStyles = makeStyles({
  dropdown: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 28px)",
    maxWidth: "calc(768px - 28px)",
    marginBottom: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "14px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow16,
    zIndex: 1001,
    overflowY: "auto",
    maxHeight: "70vh",
  },
  suggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px 12px 24px", // Added extra left padding for indentation
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  copilotSuggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px 12px 24px", // Added extra left padding for indentation
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "block", // Use block instead of flex for text-only items
    fontSize: "16px",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  crossPlatformMessageText: {
    fontSize: "14px",
  },
  boldText: {
    fontWeight: "600",
  },
  crossPlatformSubText: {
    fontSize: "12px",
    marginTop: "4px",
  },
  marginTop8: {
    marginTop: "8px",
  },
  icon16: {
    width: "16px",
    height: "16px",
  },
  icon16Blue: {
    width: "16px",
    height: "16px",
    color: "#2563eb",
  },
  categorizedContainer: {
    padding: "16px 0",
    maxHeight: "384px",
    overflowY: "auto",
  },
  sectionBlock: {
    marginBottom: "24px",
  },
  sectionTitle: {
    marginBottom: "16px",
    padding: "0 16px",
  },
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    padding: "0 16px",
  },
  taskCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  taskCardContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
  },
  iconBox32: {
    width: "32px",
    height: "32px",
    backgroundColor: "#dbeafe",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  flexContent: {
    flex: 1,
    minWidth: 0,
  },
  taskText: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.4",
    fontWeight: "400",
  },
  actionButtonSmall: {
    fontSize: "12px",
    padding: "4px 12px",
    height: "auto",
    flexShrink: 0,
    backgroundColor: "#2563eb",
  },
  sectionPadded: {
    padding: "0 16px",
  },
  copilotCard: {
    marginBottom: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
  },
  paddedBlock: {
    padding: "16px",
  },
  copilotHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
  },
  iconBox24: {
    width: "24px",
    height: "24px",
    backgroundColor: "#dbeafe",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  flexGrow: {
    flex: 1,
  },
  copilotQuestionText: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  copilotOpenButton: {
    fontSize: "14px",
    padding: "8px 16px",
    height: "auto",
    backgroundColor: "#2563eb",
  },
  chipRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  outlineChipSmall: {
    fontSize: "12px",
    padding: "8px 12px",
    height: "auto",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  categoryLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  categoryLabel: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  categoryCount: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  seeAllButton: {
    fontSize: "12px",
    color: tokens.colorBrandForeground1,
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  categoryRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
  },
  categoryRowBorder: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  categoryName: {
    fontSize: "16px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  v2PromptHeader: {
    padding: "16px 16px 4px 26px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    fontWeight: "600",
    lineHeight: "1.8",
  },
  suggestionsListPadded: {
    padding: "8px 0",
  },
  v2SuggestionGap: {
    gap: "0",
  },
  copilotSectionV1: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  copilotSectionHeaderV1: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    fontWeight: "600",
    marginLeft: "16px",
  },
  copilotPillButton: {
    backgroundColor: "white",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "20px",
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
    fontWeight: "400",
    padding: "8px 16px",
    height: "auto",
    cursor: "pointer",
  },
});

interface SearchSuggestionPanelNewProps {
  searchValue: string;
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  setShowSuggestions: (show: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  experienceLevel?: "new" | "smb" | "enterprise";
  searchResultsCache?: Record<string, any>;
  setSearchResultsCache?: (cache: Record<string, any>) => void;
  version?: "v1" | "v2";
  onCopilotClick?: () => void;
  onClearSearchField?: () => void;
  onNavigateToDiscover?: () => void;
}

export default function SearchSuggestionPanelNew({
  searchValue,
  showSuggestions,
  onSuggestionClick,
  setShowSuggestions,
  inputRef,
  experienceLevel = "new",
  searchResultsCache = {},
  setSearchResultsCache,
  version = "v1",
  onCopilotClick,
  onClearSearchField,
  onNavigateToDiscover,
}: SearchSuggestionPanelNewProps) {
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

        if (setSearchResultsCache) {
          setSearchResultsCache((prev: Record<string, any>) => ({
            ...prev,
            [cacheKey]: randomizedData,
          }));
        }

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
            <Text as="p" className={styles.crossPlatformMessageText}>
              <span className={styles.boldText}>Did you mean:</span>{" "}
              {match.azureTerm}?
            </Text>
            <Text as="p" className={styles.crossPlatformSubText}>
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
          <div className={styles.marginTop8}>
            {suggestions
              .slice(0, 4)
              .map((suggestion: string, index: number) => (
                <button
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => onSuggestionClick(suggestion)}
                >
                  <Search24Regular className={styles.icon16} />
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
          <Subtitle2 className={styles.sectionTitle}>Suggested tasks</Subtitle2>
          <div className={styles.taskGrid}>
            <Card className={styles.taskCard}>
              <CardPreview>
                <div className={styles.taskCardContent}>
                  <div className={styles.iconBox32}>
                    <Document24Regular className={styles.icon16Blue} />
                  </div>
                  <div className={styles.flexContent}>
                    <Text className={styles.taskText}>
                      Create and deploy a VM in one click with our ready-made
                      starter kits.
                    </Text>
                  </div>
                  <FluentButton
                    appearance="primary"
                    size="small"
                    className={styles.actionButtonSmall}
                  >
                    Create
                  </FluentButton>
                </div>
              </CardPreview>
            </Card>
            <Card className={styles.taskCard}>
              <CardPreview>
                <div className={styles.taskCardContent}>
                  <div className={styles.iconBox32}>
                    <Globe24Regular className={styles.icon16Blue} />
                  </div>
                  <div className={styles.flexContent}>
                    <Text className={styles.taskText}>
                      Secure your data by enabling backups for your virtual
                      machines.
                    </Text>
                  </div>
                  <FluentButton
                    appearance="primary"
                    size="small"
                    className={styles.actionButtonSmall}
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
          <Subtitle2 className={styles.sectionTitle}>
            Get help with Copilot
          </Subtitle2>
          <div className={styles.sectionPadded}>
            <Card className={styles.copilotCard}>
              <CardPreview>
                <div className={styles.paddedBlock}>
                  <div className={styles.copilotHeader}>
                    <div className={styles.iconBox24}>
                      <CopilotIcon className={styles.icon16Blue} />
                    </div>
                    <div className={styles.flexGrow}>
                      <Text className={styles.copilotQuestionText}>
                        It looks like you're trying to work with your virtual
                        machines? Do you want to:
                      </Text>
                    </div>
                    <FluentButton
                      appearance="primary"
                      size="small"
                      className={styles.copilotOpenButton}
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
                      className={styles.outlineChipSmall}
                    >
                      Breakdown my monthly costs
                    </FluentButton>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      className={styles.outlineChipSmall}
                    >
                      View CPU performance
                    </FluentButton>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      className={styles.outlineChipSmall}
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
        <div className={styles.sectionPadded}>
          <div className={styles.categoryHeader}>
            <div className={styles.categoryLabelRow}>
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
              className={mergeClasses(
                styles.categoryRow,
                index !== array.length - 1
                  ? styles.categoryRowBorder
                  : undefined,
              )}
            >
              <div className={styles.categoryLabelRow}>
                <span className={styles.categoryName}>{category.name}</span>
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
      ) : searchResults.type === "categorized" ? (
        renderCategorizedResults(searchResults.data)
      ) : (
        <div>
          {/* V2 Header - Prompt suggestions */}
          {version === "v2" && (
            <div className={styles.v2PromptHeader}>Prompt suggestions</div>
          )}

          {/* Regular Suggestions - Show for both V1 and V2 */}
          <div className={styles.suggestionsListPadded}>
            {(searchResults.suggestions || [])
              .slice(0, 6)
              .map((suggestion: string, index: number) => (
                <button
                  key={index}
                  className={mergeClasses(
                    styles.suggestionItem,
                    version === "v2" ? styles.v2SuggestionGap : undefined,
                  )}
                  onClick={() => {
                    if (version === "v2") {
                      // V2: Set suggestion in input and navigate to Discover
                      onSuggestionClick(suggestion);
                      setShowSuggestions(false);
                      if (onNavigateToDiscover) {
                        onNavigateToDiscover();
                      }
                    } else {
                      // V1: Navigate to search results
                      onSuggestionClick(suggestion);
                    }
                  }}
                >
                  {version !== "v2" && (
                    <Search24Regular className={styles.icon16} />
                  )}
                  <span>{suggestion}</span>
                </button>
              ))}
          </div>

          {/* Get help with Copilot Section - V1 only / Change search settings - V2 only */}
          {version === "v2" ? null : (
            /* V1: Get help with Copilot section */
            <div className={styles.copilotSectionV1}>
              <div className={styles.copilotSectionHeaderV1}>
                <CopilotSVGIcon width={20} height={20} />
                Get help with Copilot
              </div>

              <div className={styles.sectionPadded}>
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
