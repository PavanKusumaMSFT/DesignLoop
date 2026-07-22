"use client";

import {
  Text,
  makeStyles,
  tokens as fluentTokens,
  Button,
  Tag,
  Tooltip,
  Avatar,
} from "@fluentui/react-components";
import {
  Apps20Regular,
  Cloud20Regular,
  People20Regular,
  ChevronDown16Regular,
  ChevronUp16Regular,
  History20Regular,
  Sparkle24Filled,
  Info16Regular,
  Open16Regular,
} from "@fluentui/react-icons";
import { useEffect, useRef, useState } from "react";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import {
  type RecentResource,
  allSearchHistory,
  allRecentResources,
  serviceDescriptions,
  getResourceIcon,
  getServiceIconPath,
  getResourceTypeIcon,
  shuffleArray,
  generateServices,
  generateResources,
  generateEntraIdResults,
  generateResourceGroups,
  generateMarketplace,
  generateDocumentation,
  MOCK_MAX_RESULTS,
  MOCK_SUBSCRIPTION_INFO,
  MOCK_DEFAULT_COUNTS,
} from "@/data/search-mock-data";

// Constants
const DEBOUNCE_DELAY = 600;
const DEFAULT_VISIBLE_ITEMS = 4;

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    width: "548px",
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    maxHeight: "740px",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0",
  },
  filterTagsContainer: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
    padding: "16px 16px 0 16px",
  },
  filterTag: {
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBlockColor: tokens.colorNeutralStroke1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      border: tokens.colorNeutralStroke1Hover,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      border: tokens.colorNeutralStroke1Pressed,
    },
  },
  filterTagActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    border: `1px solid ${tokens.colorBrandBackground}`,
    cursor: "pointer",
    fontWeight: tokens.fontWeightSemibold,
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      border: `1px solid ${tokens.colorBrandBackgroundHover}`,
    },
    "&:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      border: `1px solid ${tokens.colorBrandBackgroundPressed}`,
    },
  },
  menuGroup: {
    marginBottom: "16px",
    "&:last-child": {
      marginBottom: "0",
    },
  },
  menuGroupHeader: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    padding: "8px 16px 4px 16px",
  },
  menuGroupHeaderWithButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    padding: "8px 16px 4px 16px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    minHeight: "44px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  menuItemWithSubtext: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    minHeight: "54px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  menuItemIcon: {
    color: tokens.colorNeutralForeground2,
    flexShrink: 0,
    width: "20px",
    height: "20px",
  },
  menuItemContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: 1,
  },
  menuItemText: {
    fontSize: "14px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  tooltipIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    marginLeft: "auto",
    flexShrink: 0,
    "&:hover": {
      color: tokens.colorNeutralForeground2,
    },
  },
  menuItemSubtext: {
    fontSize: "12px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground3,
  },
  documentationLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  externalLinkIcon: {
    color: tokens.colorNeutralForeground3,
    marginLeft: "auto",
    flexShrink: 0,
  },
  seeMoreButton: {
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      border: `1px solid ${tokens.colorNeutralStroke1Hover}`,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      border: `1px solid ${tokens.colorNeutralStroke1Pressed}`,
    },
  },
  filterInfoLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "0 16px",
  },
  changeLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px 4px",
    margin: "-12px -4px",
    borderRadius: "4px",
    transition: "all 0.2s",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  stickyFooter: {
    position: "sticky",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px",
    marginTop: "16px",
  },
  footerItemNonInteractive: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 8px",
    backgroundColor: "transparent",
    width: "100%",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    "&:last-child": {
      marginBottom: "0",
    },
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  footerItemIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },
  copilotFooterIcon: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
    color: tokens.colorBrandForeground1,
  },
  footerItemContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  footerItemText: {
    flex: 1,
  },
  footerItemLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  footerItemSearch: {
    fontSize: "14px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  footerItemCaption: {
    fontSize: "12px",
    fontWeight: "400",
    color: tokens.colorNeutralForeground1,
  },
  startChatButton: {
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      border: `1px solid ${tokens.colorNeutralStroke1Hover}`,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      border: `1px solid ${tokens.colorNeutralStroke1Pressed}`,
    },
  },
  recentResourcesGroup: {
    marginBottom: tokens.spacingVerticalL,
  },
  noResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    textAlign: "center",
  },
  noResultsImage: {
    width: "120px",
    height: "120px",
    opacity: 0.4,
    marginBottom: tokens.spacingVerticalXXL,
  },
  noResultsTitle: {
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
  },
  noResultsSubtitle: {
    color: tokens.colorNeutralForeground2,
  },
});

interface SearchSuggestionPanelBuildMVPProps {
  searchValue: string;
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  setShowSuggestions: (show: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchSuggestionPanelBuildMVP: React.FC<
  SearchSuggestionPanelBuildMVPProps
> = ({
  searchValue,
  showSuggestions,
  onSuggestionClick,
  setShowSuggestions,
  inputRef,
}) => {
  const styles = useStyles();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Randomized history and resources
  const [currentSearchHistory, setCurrentSearchHistory] = useState<string[]>(
    [],
  );
  const [currentRecentResources, setCurrentRecentResources] = useState<
    RecentResource[]
  >([]);

  const [expandedSections, setExpandedSections] = useState({
    services: false,
    resources: false,
    entra: false,
    resourceGroups: false,
    marketplace: false,
    documentation: false,
  });

  const [showAllInSection, setShowAllInSection] = useState({
    resourceGroups: false,
    marketplace: false,
    documentation: false,
  });

  const [filterCounts, setFilterCounts] = useState({
    all: 0,
    services: 0,
    resources: 0,
    entra: 0,
    resourceGroups: 0,
    marketplace: 0,
    documentation: 0,
  });

  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  // Debounce search value to avoid updating counts on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Calculate actual filter counts based on debounced search value
  useEffect(() => {
    const services = generateServices(
      MOCK_MAX_RESULTS.services,
      debouncedSearchValue,
    ).length;
    const resources = generateResources(
      MOCK_MAX_RESULTS.resources,
      debouncedSearchValue,
    ).length;
    const entra = generateEntraIdResults(
      MOCK_MAX_RESULTS.entra,
      debouncedSearchValue,
    ).length;
    const resourceGroups = generateResourceGroups(
      MOCK_MAX_RESULTS.resourceGroups,
      debouncedSearchValue,
    ).length;
    const marketplace = generateMarketplace(
      MOCK_MAX_RESULTS.marketplace,
      debouncedSearchValue,
    ).length;
    const documentationResults = generateDocumentation(
      MOCK_MAX_RESULTS.documentation,
      debouncedSearchValue,
    ).length;
    // Display count is always 99 for documentation, but actual results are capped at 25
    const documentation = documentationResults > 0 ? 99 : 0;
    const all =
      services +
      resources +
      entra +
      resourceGroups +
      marketplace +
      documentation;

    setFilterCounts({
      all,
      services,
      resources,
      entra,
      resourceGroups,
      marketplace,
      documentation,
    });
  }, [debouncedSearchValue]);

  // Calculate hasSearchValue here so it can be used in effects
  const hasSearchValue = searchValue.trim().length > 0;

  // Check if search query is semantic/conversational
  const isSemanticQuery = (query: string): boolean => {
    if (!query.trim()) return false;
    const lowerQuery = query.toLowerCase().trim();
    const semanticPatterns = [
      "how",
      "where",
      "why",
      "what",
      "when",
      "who",
      "can i",
      "should i",
      "could i",
      "would i",
      "find my",
      "show me",
      "tell me",
      "help me",
      "is there",
      "are there",
      "do i",
      "does it",
      "how do",
      "how can",
      "how to",
      "where can",
      "where is",
    ];
    return semanticPatterns.some((pattern) => lowerQuery.startsWith(pattern));
  };

  // Get display name for filter
  const getFilterDisplayName = (filter: string): string => {
    const displayNames: Record<string, string> = {
      services: "Services",
      resources: "Resources",
      entra: "Microsoft Entra ID",
      resourceGroups: "Resource Groups",
      marketplace: "Marketplace",
      documentation: "Documentation",
    };
    return displayNames[filter] || filter;
  };

  // Randomize search history and recent resources when suggestions panel opens
  useEffect(() => {
    if (showSuggestions && !hasSearchValue) {
      setCurrentSearchHistory(
        shuffleArray(allSearchHistory, MOCK_DEFAULT_COUNTS.searchHistory),
      );
      setCurrentRecentResources(
        shuffleArray(allRecentResources, MOCK_DEFAULT_COUNTS.recentResources),
      );
    }
  }, [showSuggestions, hasSearchValue]);

  const toggleSectionExpansion = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSectionButton = (
    section: "resourceGroups" | "marketplace" | "documentation",
  ) => {
    if (!expandedSections[section]) {
      // First click: expand to show 4 items
      setExpandedSections((prev) => ({ ...prev, [section]: true }));
      setShowAllInSection((prev) => ({ ...prev, [section]: false }));
    } else if (!showAllInSection[section]) {
      // Second click: navigate to filter view
      setActiveFilter(section);
      // Reset expansion states
      setExpandedSections((prev) => ({ ...prev, [section]: false }));
      setShowAllInSection((prev) => ({ ...prev, [section]: false }));
    } else {
      // Third click: collapse
      setExpandedSections((prev) => ({ ...prev, [section]: false }));
      setShowAllInSection((prev) => ({ ...prev, [section]: false }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [showSuggestions, setShowSuggestions, inputRef]);

  if (!showSuggestions) return null;

  return (
    <div ref={popoverRef} className={styles.container}>
      {!hasSearchValue ? (
        <>
          {/* Search History */}
          <div className={styles.menuGroup}>
            <div className={styles.menuGroupHeader}>Search history</div>
            {currentSearchHistory.map((item, index) => (
              <button
                key={`history-${index}`}
                className={styles.menuItem}
                onClick={() => onSuggestionClick(item)}
              >
                <History20Regular className={styles.menuItemIcon} />
                <span className={styles.menuItemText}>{item}</span>
              </button>
            ))}
          </div>

          {/* Recent Resources */}
          <div className={`${styles.menuGroup} ${styles.recentResourcesGroup}`}>
            <div className={styles.menuGroupHeader}>Recent resources</div>
            {currentRecentResources.map((item, index) => (
              <button
                key={`recent-${index}`}
                className={styles.menuItem}
                onClick={() => onSuggestionClick(item.name)}
              >
                <img
                  src={getResourceIcon(item.type)}
                  alt={item.type}
                  className={styles.menuItemIcon}
                />
                <span className={styles.menuItemText}>{item.name}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Filter Tags */}
          <div className={styles.filterTagsContainer}>
            <Tag
              size="small"
              appearance="outline"
              className={
                activeFilter === "all"
                  ? styles.filterTagActive
                  : styles.filterTag
              }
              onClick={() => setActiveFilter("all")}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFilter("all");
                }
              }}
            >
              All ({filterCounts.all})
            </Tag>
            <Tag
              size="small"
              appearance="outline"
              className={
                activeFilter === "services"
                  ? styles.filterTagActive
                  : styles.filterTag
              }
              onClick={() => setActiveFilter("services")}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFilter("services");
                }
              }}
            >
              Services ({filterCounts.services})
            </Tag>
            <Tag
              size="small"
              appearance="outline"
              className={
                activeFilter === "resources"
                  ? styles.filterTagActive
                  : styles.filterTag
              }
              onClick={() => setActiveFilter("resources")}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFilter("resources");
                }
              }}
            >
              Resources ({filterCounts.resources})
            </Tag>
            <Tag
              size="small"
              appearance="outline"
              className={
                activeFilter === "entra"
                  ? styles.filterTagActive
                  : styles.filterTag
              }
              onClick={() => setActiveFilter("entra")}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFilter("entra");
                }
              }}
            >
              Microsoft Entra ID ({filterCounts.entra})
            </Tag>
            <Tag
              size="small"
              appearance="outline"
              className={styles.filterTag}
              icon={
                showMoreFilters ? (
                  <ChevronUp16Regular />
                ) : (
                  <ChevronDown16Regular />
                )
              }
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowMoreFilters(!showMoreFilters);
                }
              }}
            >
              {showMoreFilters ? "Less filters" : "More filters (3)"}
            </Tag>
            {showMoreFilters && (
              <>
                <Tag
                  size="small"
                  appearance="outline"
                  className={
                    activeFilter === "resourceGroups"
                      ? styles.filterTagActive
                      : styles.filterTag
                  }
                  onClick={() => setActiveFilter("resourceGroups")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFilter("resourceGroups");
                    }
                  }}
                >
                  Resource Groups ({filterCounts.resourceGroups})
                </Tag>
                <Tag
                  size="small"
                  appearance="outline"
                  className={
                    activeFilter === "marketplace"
                      ? styles.filterTagActive
                      : styles.filterTag
                  }
                  onClick={() => setActiveFilter("marketplace")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFilter("marketplace");
                    }
                  }}
                >
                  Marketplace ({filterCounts.marketplace})
                </Tag>
                <Tag
                  size="small"
                  appearance="outline"
                  className={
                    activeFilter === "documentation"
                      ? styles.filterTagActive
                      : styles.filterTag
                  }
                  onClick={() => setActiveFilter("documentation")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFilter("documentation");
                    }
                  }}
                >
                  Documentation ({filterCounts.documentation})
                </Tag>
              </>
            )}
          </div>

          {/* Filter Info Label */}
          <div className={styles.filterInfoLabel}>
            <span>
              Search filter on: {MOCK_SUBSCRIPTION_INFO.activeSubscriptions} of{" "}
              {MOCK_SUBSCRIPTION_INFO.totalSubscriptions} subscriptions
              discoverable.
            </span>
            <a
              href="#"
              className={styles.changeLink}
              onClick={(e) => e.preventDefault()}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                }
              }}
            >
              Change
            </a>
          </div>

          {/* No Results Message */}
          {((activeFilter !== "all" &&
            filterCounts[activeFilter as keyof typeof filterCounts] === 0) ||
            (hasSearchValue && isSemanticQuery(searchValue))) && (
            <div className={styles.noResultsContainer}>
              <img
                src="/azure-service-icons/general/search-no-results.svg"
                alt="No results"
                className={styles.noResultsImage}
                onError={(e) => {
                  // Fallback if custom icon doesn't exist
                  e.currentTarget.style.display = "none";
                }}
              />
              <Text
                size={400}
                weight="semibold"
                className={styles.noResultsTitle}
              >
                {activeFilter !== "all" &&
                filterCounts[activeFilter as keyof typeof filterCounts] === 0
                  ? `No results found in ${getFilterDisplayName(activeFilter)}`
                  : `No results were found for "${searchValue}".`}
              </Text>
              <Text size={300} className={styles.noResultsSubtitle}>
                {activeFilter !== "all" &&
                filterCounts[activeFilter as keyof typeof filterCounts] === 0
                  ? "Try selecting a different filter or adjusting your search."
                  : "Try a different search term."}
              </Text>
            </div>
          )}

          {/* Services Section */}
          {!isSemanticQuery(searchValue) &&
            (activeFilter === "all" || activeFilter === "services") &&
            filterCounts.services > 0 && (
              <div className={styles.menuGroup}>
                <div className={styles.menuGroupHeaderWithButton}>
                  <span>Services</span>
                  {activeFilter === "all" && filterCounts.services > 4 && (
                    <Button
                      size="small"
                      appearance="outline"
                      className={styles.seeMoreButton}
                      onClick={() => toggleSectionExpansion("services")}
                    >
                      {expandedSections.services ? "Show less" : "See all"}
                    </Button>
                  )}
                </div>
                {generateServices(
                  MOCK_MAX_RESULTS.services,
                  debouncedSearchValue,
                )
                  .slice(
                    0,
                    expandedSections.services || activeFilter === "services"
                      ? filterCounts.services
                      : DEFAULT_VISIBLE_ITEMS,
                  )
                  .map((item, index) => (
                    <button
                      key={`service-${index}`}
                      className={styles.menuItem}
                      onClick={() => onSuggestionClick(item)}
                    >
                      <img
                        src={getServiceIconPath(item)}
                        alt={item}
                        className={styles.menuItemIcon}
                      />
                      <span className={styles.menuItemText}>{item}</span>
                      <Tooltip
                        content={serviceDescriptions[item] || "Azure service"}
                        relationship="label"
                        positioning="above"
                      >
                        <Info16Regular
                          className={styles.tooltipIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </Tooltip>
                    </button>
                  ))}
              </div>
            )}

          {/* Resources Section */}
          {!isSemanticQuery(searchValue) &&
            (activeFilter === "all" || activeFilter === "resources") &&
            filterCounts.resources > 0 && (
              <div className={styles.menuGroup}>
                <div className={styles.menuGroupHeaderWithButton}>
                  <span>Resources</span>
                  {activeFilter === "all" && filterCounts.resources > 4 && (
                    <Button
                      size="small"
                      appearance="outline"
                      className={styles.seeMoreButton}
                      onClick={() => toggleSectionExpansion("resources")}
                    >
                      {expandedSections.resources ? "Show less" : "See all"}
                    </Button>
                  )}
                </div>
                {generateResources(
                  MOCK_MAX_RESULTS.resources,
                  debouncedSearchValue,
                )
                  .slice(
                    0,
                    expandedSections.resources || activeFilter === "resources"
                      ? filterCounts.resources
                      : DEFAULT_VISIBLE_ITEMS,
                  )
                  .map((item, index) => {
                    const resourceType = item.subtext.split("|")[0].trim();
                    return (
                      <button
                        key={`resource-${index}`}
                        className={styles.menuItemWithSubtext}
                        onClick={() => onSuggestionClick(item.name)}
                      >
                        <img
                          src={getResourceTypeIcon(resourceType)}
                          alt={resourceType}
                          className={styles.menuItemIcon}
                        />
                        <div className={styles.menuItemContent}>
                          <span className={styles.menuItemText}>
                            {item.name}
                          </span>
                          <span className={styles.menuItemSubtext}>
                            {item.subtext}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}

          {/* Microsoft Entra ID Section */}
          {!isSemanticQuery(searchValue) &&
            (activeFilter === "all" || activeFilter === "entra") &&
            filterCounts.entra > 0 && (
              <div className={styles.menuGroup}>
                <div className={styles.menuGroupHeaderWithButton}>
                  <span>Microsoft Entra ID</span>
                  {activeFilter === "all" && filterCounts.entra > 4 && (
                    <Button
                      size="small"
                      appearance="outline"
                      className={styles.seeMoreButton}
                      onClick={() => toggleSectionExpansion("entra")}
                    >
                      {expandedSections.entra ? "Show less" : "See all"}
                    </Button>
                  )}
                </div>
                {generateEntraIdResults(
                  MOCK_MAX_RESULTS.entra,
                  debouncedSearchValue,
                )
                  .slice(
                    0,
                    expandedSections.entra || activeFilter === "entra"
                      ? filterCounts.entra
                      : DEFAULT_VISIBLE_ITEMS,
                  )
                  .map((item, index) => (
                    <button
                      key={`entra-${index}`}
                      className={styles.menuItemWithSubtext}
                      onClick={() => onSuggestionClick(item.name)}
                    >
                      <Avatar name={item.name} color="colorful" size={20} />
                      <div className={styles.menuItemContent}>
                        <span className={styles.menuItemText}>{item.name}</span>
                        <span className={styles.menuItemSubtext}>
                          {item.subtext}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            )}

          {/* Resource Groups Section */}
          {!isSemanticQuery(searchValue) &&
            activeFilter === "all" &&
            filterCounts.resourceGroups > 0 && (
              <div className={styles.menuGroup}>
                <div className={styles.menuGroupHeaderWithButton}>
                  <span>Resource Groups</span>
                  <Button
                    size="small"
                    appearance="outline"
                    className={styles.seeMoreButton}
                    onClick={() => handleSectionButton("resourceGroups")}
                  >
                    {!expandedSections.resourceGroups
                      ? "See more"
                      : filterCounts.resourceGroups > 4
                        ? "See all"
                        : "Show less"}
                  </Button>
                </div>
                {expandedSections.resourceGroups &&
                  generateResourceGroups(
                    MOCK_MAX_RESULTS.resourceGroups,
                    debouncedSearchValue,
                  )
                    .slice(0, Math.min(4, filterCounts.resourceGroups))
                    .map((item, index) => (
                      <button
                        key={`resource-group-${index}`}
                        className={styles.menuItemWithSubtext}
                        onClick={() => onSuggestionClick(item.name)}
                      >
                        <img
                          src="/azure-service-icons/general/10007-icon-service-Resource-Groups.svg"
                          alt="Resource Group"
                          className={styles.menuItemIcon}
                        />
                        <div className={styles.menuItemContent}>
                          <span className={styles.menuItemText}>
                            {item.name}
                          </span>
                          <span className={styles.menuItemSubtext}>
                            {item.subtext}
                          </span>
                        </div>
                      </button>
                    ))}
              </div>
            )}

          {/* Resource Groups Section - Filter View */}
          {!isSemanticQuery(searchValue) &&
            activeFilter === "resourceGroups" &&
            filterCounts.resourceGroups > 0 && (
              <div className={styles.menuGroup}>
                {generateResourceGroups(
                  MOCK_MAX_RESULTS.resourceGroups,
                  debouncedSearchValue,
                ).map((item, index) => (
                  <button
                    key={`resource-group-${index}`}
                    className={styles.menuItemWithSubtext}
                    onClick={() => onSuggestionClick(item.name)}
                  >
                    <img
                      src="/azure-service-icons/general/10007-icon-service-Resource-Groups.svg"
                      alt="Resource Group"
                      className={styles.menuItemIcon}
                    />
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuItemText}>{item.name}</span>
                      <span className={styles.menuItemSubtext}>
                        {item.subtext}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

          {/* Marketplace Section */}
          {!isSemanticQuery(searchValue) &&
            (activeFilter === "all" || activeFilter === "marketplace") &&
            filterCounts.marketplace > 0 && (
              <div className={styles.menuGroup}>
                <div className={styles.menuGroupHeaderWithButton}>
                  <span>Marketplace</span>
                  {activeFilter === "all" && (
                    <Button
                      size="small"
                      appearance="outline"
                      className={styles.seeMoreButton}
                      onClick={() => handleSectionButton("marketplace")}
                    >
                      {!expandedSections.marketplace
                        ? "See more"
                        : !showAllInSection.marketplace
                          ? "See all"
                          : "Show less"}
                    </Button>
                  )}
                </div>
                {(activeFilter === "marketplace" ||
                  expandedSections.marketplace) &&
                  generateMarketplace(
                    MOCK_MAX_RESULTS.marketplace,
                    debouncedSearchValue,
                  )
                    .slice(
                      0,
                      activeFilter === "marketplace" ||
                        showAllInSection.marketplace
                        ? filterCounts.marketplace
                        : DEFAULT_VISIBLE_ITEMS,
                    )
                    .map((item, index) => (
                      <button
                        key={`marketplace-${index}`}
                        className={styles.menuItemWithSubtext}
                        onClick={() => onSuggestionClick(item.name)}
                      >
                        <div className={styles.menuItemContent}>
                          <span className={styles.menuItemText}>
                            {item.name}
                          </span>
                          <span className={styles.menuItemSubtext}>
                            {item.subtext}
                          </span>
                        </div>
                      </button>
                    ))}
              </div>
            )}

          {/* Documentation Section */}
          {!isSemanticQuery(searchValue) &&
            (activeFilter === "all" || activeFilter === "documentation") &&
            filterCounts.documentation > 0 && (
              <div className={styles.menuGroup}>
                <div className={styles.menuGroupHeaderWithButton}>
                  <span>Documentation</span>
                  {activeFilter === "all" && (
                    <Button
                      size="small"
                      appearance="outline"
                      className={styles.seeMoreButton}
                      onClick={() => handleSectionButton("documentation")}
                    >
                      {!expandedSections.documentation
                        ? "See more"
                        : !showAllInSection.documentation
                          ? "See all"
                          : "Show less"}
                    </Button>
                  )}
                </div>
                {(activeFilter === "documentation" ||
                  expandedSections.documentation) &&
                  generateDocumentation(
                    MOCK_MAX_RESULTS.documentation,
                    debouncedSearchValue,
                  )
                    .slice(
                      0,
                      activeFilter === "documentation" ||
                        showAllInSection.documentation
                        ? filterCounts.documentation
                        : DEFAULT_VISIBLE_ITEMS,
                    )
                    .map((item, index) => (
                      <button
                        key={`documentation-${index}`}
                        className={styles.menuItemWithSubtext}
                        onClick={() => onSuggestionClick(item.name)}
                      >
                        <div className={styles.menuItemContent}>
                          <span
                            className={`${styles.menuItemText} ${styles.documentationLink}`}
                          >
                            {item.name}
                          </span>
                          <span className={styles.menuItemSubtext}>
                            {item.subtext}
                          </span>
                        </div>
                        <Open16Regular className={styles.externalLinkIcon} />
                      </button>
                    ))}
              </div>
            )}
        </>
      )}

      {/* Sticky Footer - Only show when user has entered search text */}
      {hasSearchValue && (
        <div className={styles.stickyFooter}>
          <div className={styles.footerItemNonInteractive}>
            <CopilotSVGIcon className={styles.copilotFooterIcon} />
            <div className={styles.footerItemContent}>
              <span className={styles.footerItemText}>
                <span className={styles.footerItemLabel}>Ask Copilot: </span>
                <span className={styles.footerItemSearch}>'{searchValue}'</span>
              </span>
              <Button
                size="small"
                appearance="outline"
                className={styles.startChatButton}
              >
                Start chat
              </Button>
            </div>
          </div>
          <button className={styles.footerItem}>
            <img
              src="/azure-service-icons/identity/03400-icon-Entra-Identity.svg"
              alt="Microsoft Entra ID"
              className={styles.footerItemIcon}
            />
            <span className={styles.footerItemCaption}>
              Continue searching in Microsoft Entra ID
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestionPanelBuildMVP;
