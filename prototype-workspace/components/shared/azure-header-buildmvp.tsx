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
  SearchBox,
  Avatar,
  Radio,
  RadioGroup,
  Label,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Navigation24Regular,
  Alert24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Apps24Regular,
  CodeBlock24Regular,
  PersonFeedback24Regular,
  Search24Regular,
  MoreHorizontal24Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons";
import SearchSuggestionPanelBuildMVP from "./search-suggestion-panel-buildmvp";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { NavigationPanel } from "./navigation-panel";

const useStyles = makeStyles({
  topNav: {
    backgroundColor: tokens.colorBrandBackground,
    padding: "0 16px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,
  },
  topNavSpacer: {
    height: "48px",
    flexShrink: 0,
  },
  leftNav: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
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
    top: "0",
    transform: "translateX(-50%)",
    maxWidth: "548px",
    width: "548px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: "48px",
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
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "16px",
    whiteSpace: "nowrap",
  },
  prototypeBadge: {
    fontSize: "10px",
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "0.5px",
    color: tokens.colorNeutralForegroundInverted,
    border: `1px solid ${tokens.colorNeutralForegroundInverted}`,
    borderRadius: tokens.borderRadiusSmall,
    padding: "1px 6px",
    opacity: 0.85,
    lineHeight: "16px",
  },
  navButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    color: tokens.colorNeutralForegroundInverted,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForegroundInverted,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForegroundInverted,
    },
  },
  navButtonCollapsible: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    color: tokens.colorNeutralForegroundInverted,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForegroundInverted,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForegroundInverted,
    },
    "@media (max-width: 1308px)": {
      display: "none",
    },
  },
  moreButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    color: tokens.colorNeutralForegroundInverted,
    display: "none",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForegroundInverted,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForegroundInverted,
    },
    "@media (max-width: 1308px)": {
      display: "flex",
    },
  },
  searchIconButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    color: tokens.colorNeutralForegroundInverted,
    display: "none",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForegroundInverted,
    },
    "&:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: tokens.colorNeutralForegroundInverted,
    },
    "@media (max-width: 768px)": {
      display: "inline-flex",
    },
  },
  searchInputWrapper: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    "&:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
    },
  },
  userInfo: {
    textAlign: "right",
    "@media (max-width: 1536px)": {
      display: "none",
    },
  },
  userName: {
    fontSize: "14px",
    color: tokens.colorNeutralForegroundInverted,
  },
  userEmail: {
    fontSize: "10px",
    color: tokens.colorNeutralForegroundInverted,
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
    "@media (max-width: 1386px)": {
      width: "460px",
    },
    "@media (max-width: 1220px)": {
      width: "400px",
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
    color: tokens.colorNeutralForegroundInverted,
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
  navButtonActive: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      color: tokens.colorNeutralForegroundInverted,
    },
    "&:active": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      color: tokens.colorNeutralForegroundInverted,
    },
    "@media (max-width: 1308px)": {
      display: "none",
    },
  },
  settingsOverlay: {
    position: "fixed" as const,
    top: "48px",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: "1200",
    transitionProperty: "opacity",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  settingsPanel: {
    position: "fixed" as const,
    top: "48px",
    right: "0",
    bottom: "0",
    width: "380px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "-4px 0 16px rgba(0, 0, 0, 0.14)",
    zIndex: "1201",
    display: "flex",
    flexDirection: "column" as const,
    transitionProperty: "transform",
    transitionDuration: "0.25s",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  settingsPanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  settingsPanelTitle: {
    fontSize: "20px",
    fontWeight: "600" as const,
    color: tokens.colorNeutralForeground1,
    fontFamily: "'Segoe UI', sans-serif",
  },
  settingsPanelBody: {
    flex: 1,
    padding: "20px",
    overflowY: "auto" as const,
  },
  settingsSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  settingsSectionSpaced: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    marginTop: tokens.spacingVerticalXXL,
  },
  settingsSectionLabel: {
    fontSize: "14px",
    fontWeight: "600" as const,
    color: tokens.colorNeutralForeground1,
    fontFamily: "'Segoe UI', sans-serif",
  },
  settingsPanelFooter: {
    padding: "16px 20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    flexShrink: 0,
  },
  // Dark mode overrides
  topNavDark: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#0a0a0a",
    // eslint-disable-next-line no-restricted-syntax
    ["--colorNeutralForegroundInverted" as string]: "#d6d6d6",
    // eslint-disable-next-line no-restricted-syntax
    ["--colorNeutralForegroundInverted2" as string]: "#d6d6d6",
  },
  logoDark: {
    // eslint-disable-next-line no-restricted-syntax
    color: "#479ef5",
  },
  searchRefWrapper: {
    width: "548px",
    position: "relative",
  },
  searchBoxControl: {
    width: "548px",
    minWidth: "548px",
    maxWidth: "548px",
    border: "none",
    outline: "none",
    boxShadow: "none",
  },
  searchBoxDarkFocus: {
    border: `2px solid ${tokens.colorBrandForegroundInverted}`,
  },
  applyButton: {
    marginTop: tokens.spacingVerticalM,
    alignSelf: "flex-start",
  },
  settingsPanelOpen: {
    transform: "translateX(0)",
  },
  settingsPanelClosed: {
    transform: "translateX(100%)",
  },
});
interface AzureHeaderBuildMVPProps {
  activeLink: string;
  experienceLevel?: "new" | "smb" | "enterprise";
  disabledItems?: string[];
  viewMode?: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2";
  onCopilotOpen?: (prompt?: string) => void;
  initialSearchValue?: string;
  searchPlaceholder?: string;
  hideSuggestions?: boolean;
  expandSearch?: boolean;
  initialShowSuggestions?: boolean;
  stayOnCurrentPage?: boolean;
  homeNavigatesTo?: string;
  isDarkMode?: boolean;
  initialNavOpen?: boolean;
  hideManage?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
  onLogoClick?: () => void;
  cardLayout?: "default" | "option2" | "option3" | "option4" | "option5";
  onCardLayoutChange?: (
    layout: "default" | "option2" | "option3" | "option4" | "option5",
  ) => void;
  navItemLabels?: Record<string, string>;
}

/** Azure portal header bar (Build 2026 / MVP horizon) with brand background, centered search, Copilot button, and nav panel.
 * Composed from: makeStyles header, SearchBox, NavigationPanel, Copilot icon, user avatar.
 * Instead of: building an inline header with search and navigation for each page. */
export const AzureHeaderBuildMVP: React.FC<AzureHeaderBuildMVPProps> = ({
  activeLink,
  experienceLevel = "new",
  viewMode = "list",
  onCopilotOpen,
  disabledItems = [],
  initialSearchValue,
  searchPlaceholder,
  hideSuggestions,
  expandSearch,
  initialShowSuggestions = false,
  stayOnCurrentPage = false,
  homeNavigatesTo,
  isDarkMode = false,
  initialNavOpen = false,
  hideManage = false,
  onSuggestionSelect,
  onLogoClick,
  cardLayout = "option4",
  onCardLayoutChange,
  navItemLabels,
}) => {
  const styles = useStyles();
  const { handlePageChange, selectedPage, setSearchQuery } = useNavigation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(true); // Always expanded by default
  const [searchValue, setSearchValue] = useState(initialSearchValue || "");
  const [showSuggestions, setShowSuggestions] = useState(
    initialShowSuggestions,
  );
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(() => {
    if (initialNavOpen) return true;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("navPanelBehavior");
      return saved === "docked";
    }
    return false;
  });
  const [userToggledNav, setUserToggledNav] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [pendingNavPanelBehavior, setPendingNavPanelBehavior] = useState<
    "overlay" | "docked"
  >("overlay");
  const [pendingCardLayout, setPendingCardLayout] = useState<
    "default" | "option2" | "option3" | "option4" | "option5"
  >(cardLayout);
  const [navPanelBehavior, setNavPanelBehavior] = useState<
    "overlay" | "docked"
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("navPanelBehavior");
      if (saved === "docked" || saved === "overlay") return saved;
    }
    return "overlay";
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Animate nav panel open on mount when initialNavOpen is true
  useEffect(() => {
    if (!initialNavOpen) return;

    // Small delay to allow the page to render first, then animate the panel in
    const animationTimer = setTimeout(() => {
      setIsNavOpen(true);
    }, 100);

    return () => clearTimeout(animationTimer);
  }, [initialNavOpen]);

  // Responsive nav panel behavior
  useEffect(() => {
    if (!initialNavOpen) return;

    const handleResize = () => {
      if (!userToggledNav) {
        setIsNavOpen(window.innerWidth >= 768);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialNavOpen, userToggledNav]);

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

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

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
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <>
      <NavigationPanel
        isOpen={isNavOpen}
        onClose={() => {
          setIsNavOpen(false);
          setUserToggledNav(true);
        }}
        onNavigate={handlePageChange}
        currentPage={selectedPage ?? undefined}
        disableSoftDismiss={false}
        navMode={navPanelBehavior}
        hideManage={hideManage}
        navItemLabels={navItemLabels}
      />

      <div
        className={mergeClasses(styles.topNav, isDarkMode && styles.topNavDark)}
      >
        <div className={styles.leftNav}>
          <FluentButton
            appearance="subtle"
            className={styles.navButton}
            icon={<Navigation24Regular />}
            aria-label="Menu"
            onClick={() => {
              setIsNavOpen(!isNavOpen);
              setUserToggledNav(true);
            }}
          />
          <div
            className={mergeClasses(styles.logo, isDarkMode && styles.logoDark)}
            onClick={onLogoClick}
            style={onLogoClick ? { cursor: "pointer" } : undefined}
          >
            <span>Microsoft Azure</span>
            <span className={styles.prototypeBadge}>PROTOTYPE</span>
          </div>
        </div>
        <div className={styles.middleNav}>
          {/* Full search input for larger screens */}
          <div
            ref={searchRef}
            className={mergeClasses(
              styles.searchInputWrapper,
              styles.searchRefWrapper,
            )}
          >
            <SearchBox
              appearance="outline"
              placeholder={
                searchPlaceholder || "Search or ask Copilot (Ctrl + K)"
              }
              value={searchValue}
              dismiss={{
                onClick: () => {
                  setSearchValue("");
                  setShowSuggestions(false);
                },
              }}
              className={mergeClasses(
                styles.searchBoxControl,
                showSuggestions && isDarkMode && styles.searchBoxDarkFocus,
              )}
              onFocus={() => {
                setShowSuggestions(true);
                setIsLoadingResults(true);
                setTimeout(() => setIsLoadingResults(false), 200);
              }}
              onChange={(e, data) => {
                // Handle both event object and data object from Fluent UI
                const value =
                  data?.value ?? (e?.target as HTMLInputElement)?.value ?? "";
                setSearchValue(value);
                setShowSuggestions(true);

                // Clear existing timers
                if (debounceTimerRef.current) {
                  clearTimeout(debounceTimerRef.current);
                  debounceTimerRef.current = null;
                }
                if (loadingTimerRef.current) {
                  clearTimeout(loadingTimerRef.current);
                  loadingTimerRef.current = null;
                }

                // If empty value (cleared), don't show loading
                if (!value || value.trim() === "") {
                  setIsLoadingResults(false);
                  return;
                }

                const isDatabaseSearch = value
                  .toLowerCase()
                  .includes("database");

                if (isDatabaseSearch) {
                  // For database searches, wait for user to finish typing
                  setIsLoadingResults(false);

                  // Wait for user to stop typing (500ms debounce)
                  debounceTimerRef.current = setTimeout(() => {
                    // Now show loading
                    setIsLoadingResults(true);

                    // Shorter delay to simulate AI processing
                    loadingTimerRef.current = setTimeout(
                      () => setIsLoadingResults(false),
                      800,
                    );
                  }, 500);
                } else {
                  // For other searches, show loading immediately with short delay
                  setIsLoadingResults(true);
                  loadingTimerRef.current = setTimeout(
                    () => setIsLoadingResults(false),
                    300,
                  );
                }
              }}
              onKeyDown={handleSearchKeyDown}
            />
            {showSuggestions && !hideSuggestions && (
              <SearchSuggestionPanelBuildMVP
                searchValue={searchValue}
                showSuggestions={showSuggestions}
                onSuggestionClick={(suggestion: string) => {
                  setSearchValue(suggestion);
                  setShowSuggestions(false);
                  onSuggestionSelect?.(suggestion);
                }}
                setShowSuggestions={setShowSuggestions}
                inputRef={inputRef}
              />
            )}
          </div>
        </div>
        <div className={styles.rightNav}>
          {/* Search icon button for mobile - appears next to Copilot */}
          <FluentButton
            appearance="subtle"
            className={styles.searchIconButton}
            icon={<Search24Regular />}
            onClick={() => setShowSuggestions(true)}
            aria-label="Search"
          />
          <FluentButton
            appearance="secondary"
            icon={<CopilotSVGIcon />}
            onClick={onCopilotOpen ? () => onCopilotOpen() : handleSearch}
          >
            Copilot
          </FluentButton>
          <FluentButton
            appearance="subtle"
            className={styles.navButtonCollapsible}
            icon={<CodeBlock24Regular />}
            aria-label="Code"
          />
          <FluentButton
            appearance="subtle"
            className={styles.navButtonCollapsible}
            icon={<Alert24Regular />}
            aria-label="Notifications"
          />
          <FluentButton
            appearance="subtle"
            className={
              isSettingsOpen
                ? styles.navButtonActive
                : styles.navButtonCollapsible
            }
            icon={<Settings24Regular />}
            aria-label="Settings"
            onClick={() => {
              if (!isSettingsOpen) {
                setPendingNavPanelBehavior(navPanelBehavior);
              }
              setIsSettingsOpen(!isSettingsOpen);
            }}
          />
          <FluentButton
            appearance="subtle"
            className={styles.navButtonCollapsible}
            icon={<QuestionCircle24Regular />}
            aria-label="Help"
          />
          <FluentButton
            appearance="subtle"
            className={styles.navButtonCollapsible}
            icon={<PersonFeedback24Regular />}
            aria-label="Feedback"
          />
          <FluentButton
            appearance="subtle"
            className={styles.moreButton}
            icon={<MoreHorizontal24Regular />}
            aria-label="More options"
          />
          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {hideManage ? "Jen Wilson" : "Connie Wilson"}
              </div>
              <div className={styles.userEmail}>
                {hideManage ? "ZAVA" : "CONTOSO"}
              </div>
            </div>
            <Avatar
              name={hideManage ? "Jen Wilson" : "Connie Wilson"}
              initials={hideManage ? "JW" : "CW"}
              image={hideManage ? { src: "/jen-wilson.png" } : undefined}
              size={32}
              color="colorful"
            />
          </div>
        </div>
      </div>
      <div className={styles.topNavSpacer} />

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div
          className={styles.settingsOverlay}
          onClick={() => setIsSettingsOpen(false)}
        />
      )}
      <div
        className={mergeClasses(
          styles.settingsPanel,
          isSettingsOpen
            ? styles.settingsPanelOpen
            : styles.settingsPanelClosed,
        )}
      >
        <div className={styles.settingsPanelHeader}>
          <span className={styles.settingsPanelTitle}>Settings</span>
          <FluentButton
            appearance="subtle"
            icon={<Dismiss24Regular />}
            aria-label="Close settings"
            onClick={() => setIsSettingsOpen(false)}
          />
        </div>
        <div className={styles.settingsPanelBody}>
          <div className={styles.settingsSection}>
            <Label className={styles.settingsSectionLabel}>
              Nav panel behavior
            </Label>
            <RadioGroup
              value={pendingNavPanelBehavior}
              onChange={(_, data) => {
                setPendingNavPanelBehavior(data.value as "overlay" | "docked");
              }}
            >
              <Radio value="docked" label="Docked" />
              <Radio value="overlay" label="Overlay" />
            </RadioGroup>
            <FluentButton
              appearance="primary"
              className={styles.applyButton}
              onClick={() => {
                setNavPanelBehavior(pendingNavPanelBehavior);
                localStorage.setItem(
                  "navPanelBehavior",
                  pendingNavPanelBehavior,
                );
                if (pendingNavPanelBehavior === "docked") {
                  setIsNavOpen(true);
                }
                setIsSettingsOpen(false);
              }}
            >
              Apply
            </FluentButton>
          </div>
          <div className={styles.settingsSectionSpaced}>
            <Label className={styles.settingsSectionLabel}>
              All service cards
            </Label>
            <RadioGroup
              value={pendingCardLayout}
              onChange={(_, data) => {
                setPendingCardLayout(
                  data.value as
                    | "default"
                    | "option2"
                    | "option3"
                    | "option4"
                    | "option5",
                );
              }}
            >
              <Radio value="default" label="Default" />
              <Radio value="option2" label="Option 2" />
              <Radio value="option3" label="Option 3" />
              <Radio value="option4" label="Option 4" />
              <Radio value="option5" label="Option 5" />
            </RadioGroup>
            <FluentButton
              appearance="primary"
              className={styles.applyButton}
              onClick={() => {
                onCardLayoutChange?.(pendingCardLayout);
                setIsSettingsOpen(false);
              }}
            >
              Apply
            </FluentButton>
          </div>
        </div>
      </div>
    </>
  );
};
