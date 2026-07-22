"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../lib/navigation-context";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Input,
  Button as FluentButton,
  Tooltip,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  GridDots24Regular,
  Alert24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Apps24Regular,
  CodeBlock24Regular,
  PersonFeedback24Regular,
  Search24Regular,
  MoreHorizontal24Regular,
} from "@fluentui/react-icons";
import SearchSuggestionPanelP1 from "./search-suggestion-panel-p1";
import { GradientSearchIconP1 } from "./gradient-search-icon-p1";
import { CopilotSVGIcon } from "./copilot-svg-icon";

const useStyles = makeStyles({
  topNav: {
    backgroundColor: tokens.colorNeutralBackground4,
    padding: "0 16px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 1100,
  },
  leftNav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
    justifyContent: "flex-end",
  },
  middleNav: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "700px",
    width: "700px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    "@media (max-width: 1366px)": {
      width: "500px",
      maxWidth: "500px",
    },
    "@media (max-width: 1220px)": {
      width: "460px",
      maxWidth: "460px",
    },
    "@media (max-width: 1024px)": {
      width: "400px",
      maxWidth: "400px",
    },
    "@media (max-width: 868px)": {
      width: "360px",
      maxWidth: "360px",
    },
    "@media (max-width: 768px)": {
      width: "auto",
      maxWidth: "none",
    },
  },
  navLink: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navLinkDisabled: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground4,
    cursor: "not-allowed",
    padding: "6px 12px",
    borderRadius: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground3,
    opacity: 0.6,
  },
  navLinkActive: {
    fontWeight: 600,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid transparent`,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "16px",
    whiteSpace: "nowrap",
  },
  navButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
  },
  navButtonCollapsible: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    "@media (max-width: 1228px)": {
      display: "none",
    },
  },
  moreButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    display: "none",
    "@media (max-width: 1228px)": {
      display: "flex",
    },
  },
  searchIconButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    display: "none",
    "@media (max-width: 768px)": {
      display: "inline-flex",
    },
  },
  searchInputWrapper: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  searchWrapperSuggestionsDark: {
    boxShadow: `inset 0 0 0 2px ${tokens.colorBrandForegroundInverted}`,
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  userInfo: {
    textAlign: "right",
    "@media (max-width: 1536px)": {
      display: "none",
    },
  },
  userAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
  },
  userName: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  userEmail: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
  },
  searchWrapperOuter: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    boxShadow: `inset 0 0 0 1px ${tokens.colorNeutralStroke1}`,
    padding: "4px 12px",
    width: "648px",
    height: "32px",
    margin: "0 auto",
    position: "relative",
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: `inset 0 0 0 1px ${tokens.colorNeutralStroke1}`,
    },
    "@media (max-width: 1366px)": {
      width: "500px",
    },
    "@media (max-width: 1220px)": {
      width: "460px",
    },
    "@media (max-width: 1024px)": {
      width: "400px",
    },
    "@media (max-width: 868px)": {
      width: "360px",
    },
  },
  searchIcon: {
    width: "16px",
    height: "16px",
    color: tokens.colorNeutralForeground3,
    marginRight: "8px",
  },
  searchInputField: {
    flex: 1,
    padding: "4px 12px",
    paddingLeft: "4px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
  },
  copilotButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      border: `1px solid ${tokens.colorNeutralStroke2}`,
    },
  },
});
interface AzureHeaderP1Props {
  activeLink: string;
  experienceLevel?: "new" | "smb" | "enterprise";
  disabledItems?: string[];
  viewMode?: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2";
  onCopilotOpen?: (prompt?: string) => void;
  initialSearchValue?: string;
  hideSuggestions?: boolean;
  expandSearch?: boolean;
  stayOnCurrentPage?: boolean;
  homeNavigatesTo?: string;
  isDarkMode?: boolean;
}

/** Azure portal header bar (Phase 1 variant) with neutral background, centered search, pill-style nav links, and Copilot button.
 * Composed from: makeStyles header, search input, SearchSuggestionPanelP1, CopilotSVGIcon, user avatar.
 * Instead of: building an inline P1-style header with search and suggestions for each page. */
export const AzureHeaderP1: React.FC<AzureHeaderP1Props> = ({
  activeLink,
  experienceLevel = "new",
  viewMode = "list",
  onCopilotOpen,
  disabledItems = [],
  initialSearchValue,
  hideSuggestions,
  expandSearch,
  stayOnCurrentPage = false,
  homeNavigatesTo,
  isDarkMode = false,
}) => {
  const styles = useStyles();
  const { handlePageChange, selectedPage, setSearchQuery } = useNavigation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(true); // Always expanded by default
  const [searchValue, setSearchValue] = useState(initialSearchValue || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update search value and expand state when props change
  useEffect(() => {
    if (initialSearchValue !== undefined) {
      setSearchValue(initialSearchValue);
    }
    if (expandSearch !== undefined) {
      setIsSearchExpanded(expandSearch);
    }
  }, [initialSearchValue, expandSearch]);

  // Close suggestions when hideSuggestions becomes true
  useEffect(() => {
    if (hideSuggestions) {
      setShowSuggestions(false);
    }
  }, [hideSuggestions]);

  const getPageForExperienceLevel = (basePage: string) => {
    console.log("[AzureHeaderP1] Navigation attempt:", {
      basePage,
      experienceLevel,
      activeLink,
    });

    switch (basePage) {
      case "home":
        return "returning-home-2";
      case "discover":
        return "discover";
      case "build":
        return "build-content-2";
      case "manage":
        return "manage-content-2";
      case "search":
        return "azure-search-results";
      default:
        return basePage;
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("[AzureHeaderP1] Performing search for:", searchValue);
      // Navigate to full-page search results
      setSearchQuery(searchValue);
      handlePageChange("search-fullpage-results");
      setIsSearchExpanded(false);
      setShowSuggestions(false);
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className={styles.topNav}>
      <div className={styles.leftNav}>
        <FluentButton
          appearance="subtle"
          className={styles.navButton}
          icon={<GridDots24Regular />}
        />
        <div className={styles.logo}>
          <span>Microsoft Azure</span>
        </div>
      </div>
      <div className={styles.middleNav}>
        {/* Full search input for larger screens */}
        <div
          ref={searchRef}
          className={mergeClasses(
            styles.searchWrapperOuter,
            styles.searchInputWrapper,
            showSuggestions &&
              isDarkMode &&
              styles.searchWrapperSuggestionsDark,
          )}
        >
          <Search24Regular className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search or ask Copilot (Ctrl + K)"
            className={styles.searchInputField}
            ref={inputRef}
            value={searchValue}
            onFocus={() => {
              setShowSuggestions(true);
              setIsLoadingResults(true);
              setTimeout(() => setIsLoadingResults(false), 200);
            }}
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);
              setShowSuggestions(true);

              // Clear existing timer
              if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
              }

              const isDatabaseSearch = value.toLowerCase().includes("database");

              if (isDatabaseSearch) {
                // For database searches, wait for user to finish typing
                setIsLoadingResults(false);

                // Wait for user to stop typing (500ms debounce)
                debounceTimerRef.current = setTimeout(() => {
                  // Now show loading
                  setIsLoadingResults(true);

                  // Shorter delay to simulate AI processing
                  setTimeout(() => setIsLoadingResults(false), 800);
                }, 500);
              } else {
                // For other searches, show loading immediately with short delay
                setIsLoadingResults(true);
                setTimeout(() => setIsLoadingResults(false), 300);
              }
            }}
            onKeyDown={handleSearchKeyDown}
          />
          {showSuggestions && !hideSuggestions && (
            <SearchSuggestionPanelP1
              searchValue={searchValue}
              showSuggestions={showSuggestions}
              onSuggestionClick={(suggestion: string) => {
                setSearchValue(suggestion);
                setShowSuggestions(false);
              }}
              setShowSuggestions={setShowSuggestions}
              inputRef={inputRef}
              isLoading={isLoadingResults}
              viewMode={viewMode}
              onCopilotOpen={onCopilotOpen}
            />
          )}
        </div>
      </div>
      <div className={styles.rightNav}>
        {/* Search icon button for mobile - appears next to Copilot */}
        <FluentButton
          appearance="secondary"
          className={styles.searchIconButton}
          icon={<Search24Regular />}
          onClick={() => setShowSuggestions(true)}
        />
        <FluentButton
          appearance="secondary"
          icon={<CopilotSVGIcon />}
          onClick={handleSearch}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButtonCollapsible}
          icon={<CodeBlock24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButtonCollapsible}
          icon={<Alert24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButtonCollapsible}
          icon={<Settings24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButtonCollapsible}
          icon={<QuestionCircle24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButtonCollapsible}
          icon={<PersonFeedback24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.moreButton}
          icon={<MoreHorizontal24Regular />}
        />
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Connie Wilson</div>
            <div className={styles.userEmail}>CONTOSO</div>
          </div>
          <div className={styles.userAvatar}>CW</div>
        </div>
      </div>
    </div>
  );
};
