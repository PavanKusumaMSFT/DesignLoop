"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../lib/navigation-context";
import {
  makeStyles,
  tokens as fluentTokens,
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
  Checkmark16Regular,
} from "@fluentui/react-icons";
import SearchSuggestionPanelP1 from "./search-suggestion-panel-p1";
import { GradientSearchIcon } from "./gradient-search-icon";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import AgentWelcome from "./agent-welcome-clean";

const useStyles = makeStyles({
  topNav: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "0 16px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1100, // Ensure top nav is above other content
  },
  leftNav: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  middleNav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
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
  },
  agentModeToggle: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  agentModeToggleActive: {
    backgroundColor: `${tokens.colorBrandBackground} !important`,
    color: `${tokens.colorNeutralForegroundInverted} !important`,
    border: `1px solid ${tokens.colorBrandBackground} !important`,
    "&:hover": {
      backgroundColor: `${tokens.colorBrandBackgroundHover} !important`,
      color: `${tokens.colorNeutralForegroundInverted} !important`,
    },
  },
  checkIcon: {
    fontSize: "14px",
  },
  navButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
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
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow8,
    padding: "4px",
    width: "625px",
    height: "40px",
    transition: "box-shadow 0.2s ease, border 0.2s ease",
    "&:hover": {
      border: `1px solid ${tokens.colorNeutralStroke1Hover}`,
      boxShadow: tokens.shadow16,
    },
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    margin: "0 8px",
  },
  searchInput: {
    flex: 1,
    padding: "4px 8px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
  },
  askCopilotButton: {
    borderRadius: "50px",
    marginLeft: "-4px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
    border: "1px solid transparent",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
    position: "relative",
    "&:hover": {
      background:
        "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
      border: "1px solid transparent",
      color: tokens.colorNeutralForeground1,
    },
  },
});

interface TopNavProps {
  activeLink?: string;
  experienceLevel?: "new" | "smb" | "enterprise";
  disabledItems?: string[];
  initialSearchValue?: string;
  hideSuggestions?: boolean;
  expandSearch?: boolean;
  stayOnCurrentPage?: boolean;
  homeNavigatesTo?: string;
  onAgentModeChange?: (enabled: boolean) => void;
  showAgentModeToggle?: boolean;
  agentModeEnabled?: boolean;
  onCopilotOpen?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeLink = "",
  experienceLevel = "new",
  disabledItems = [],
  initialSearchValue,
  hideSuggestions,
  expandSearch,
  stayOnCurrentPage = false,
  homeNavigatesTo,
  onAgentModeChange,
  showAgentModeToggle = false,
  agentModeEnabled,
  onCopilotOpen,
}) => {
  const styles = useStyles();
  const { handlePageChange, selectedPage, setSearchQuery } = useNavigation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(
    expandSearch || false,
  );
  const [searchValue, setSearchValue] = useState(initialSearchValue || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAgentWelcome, setShowAgentWelcome] = useState(false);
  // Use controlled agentMode if provided, otherwise use local state
  const agentMode =
    agentModeEnabled !== undefined ? agentModeEnabled : showAgentModeToggle;
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update search value and expand state when props change
  useEffect(() => {
    if (initialSearchValue) {
      setSearchValue(initialSearchValue);
    }
    if (expandSearch !== undefined) {
      setIsSearchExpanded(expandSearch);
    }
  }, [initialSearchValue, expandSearch]);

  const getPageForExperienceLevel = (basePage: string) => {
    console.log("[v0] Navigation attempt:", {
      basePage,
      experienceLevel,
      activeLink,
    });

    switch (basePage) {
      case "home":
        return "returning-home-2";
      case "discover":
        return "discover"; // Changed from "discover-content-2" to "discover"
      case "build":
        return "build-content-2";
      case "manage":
        return "manage-content-2";
      case "search":
        return "search-fullpage-results";
      default:
        return basePage;
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("[v0] Performing search for:", searchValue);
      const targetPage = getPageForExperienceLevel("search");
      setSearchQuery(searchValue);
      handlePageChange(targetPage);
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
        {showAgentModeToggle && (
          <div
            className={`${styles.agentModeToggle} ${agentMode ? styles.agentModeToggleActive : ""}`}
            onClick={() => {
              const newMode = !agentMode;
              onAgentModeChange?.(newMode);
            }}
          >
            {agentMode && <Checkmark16Regular className={styles.checkIcon} />}
            <span>Agent mode</span>
          </div>
        )}
      </div>
      <div className={styles.middleNav}>
        {showAgentModeToggle && agentMode ? null : isSearchExpanded ? (
          <div ref={searchRef} className={styles.searchWrapper}>
            <GradientSearchIcon className={styles.searchIcon} />
            <Input
              placeholder="Search, ask questions, or let Copilot help you get things done (Ctrl + K)"
              className={styles.searchInput}
              autoFocus
              ref={inputRef}
              value={searchValue}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e, data) => setSearchValue(data.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <FluentButton
              appearance="subtle"
              className={styles.askCopilotButton}
              icon={<CopilotSVGIcon />}
              onClick={handleSearch}
            >
              Ask Copilot
            </FluentButton>
            {showSuggestions && !hideSuggestions && (
              <SearchSuggestionPanelP1
                searchValue={searchValue}
                showSuggestions={showSuggestions}
                onSuggestionClick={(suggestion) => {
                  setSearchValue(suggestion);
                  setShowSuggestions(false);
                }}
                setShowSuggestions={setShowSuggestions}
                inputRef={inputRef}
                viewMode={
                  experienceLevel === "smb" || experienceLevel === "enterprise"
                    ? "bubbles-history"
                    : "list"
                }
              />
            )}
          </div>
        ) : (
          <>
            <div
              className={`${styles.navLink} ${activeLink === "Home" ? styles.navLinkActive : ""}`}
              onClick={() => {
                if (!stayOnCurrentPage) {
                  const targetPage =
                    homeNavigatesTo || getPageForExperienceLevel("home");
                  console.log("[v0] Navigating to Home:", targetPage);
                  handlePageChange(targetPage);
                } else {
                  console.log("[v0] Staying on current page (azure-portal)");
                }
              }}
            >
              Home
            </div>
            <div
              className={`${styles.navLink} ${activeLink === "Discover" ? styles.navLinkActive : ""}`}
              onClick={() => {
                const targetPage = getPageForExperienceLevel("discover");
                console.log(
                  "[v0] Navigating to Discover:",
                  targetPage,
                  "from selectedPage:",
                  selectedPage,
                );
                // Use actual selectedPage from navigation context instead of activeLink mapping
                handlePageChange(targetPage, selectedPage || undefined);
              }}
            >
              Discover
            </div>
            {disabledItems.includes("Build") ? (
              <Tooltip
                content="This page will be available once you start creating an Azure resource"
                relationship="description"
                positioning={{
                  align: "start",
                  position: "after",
                  offset: { crossAxis: 30, mainAxis: 2 },
                }}
              >
                <div
                  className={styles.navLinkDisabled}
                  onClick={() => {
                    console.log("[v0] Build is disabled - showing tooltip");
                  }}
                >
                  Build
                </div>
              </Tooltip>
            ) : (
              <div
                className={`${styles.navLink} ${activeLink === "Build" ? styles.navLinkActive : ""}`}
                onClick={() => {
                  const targetPage = getPageForExperienceLevel("build");
                  console.log("[v0] Navigating to Build:", targetPage);
                  handlePageChange(targetPage);
                }}
              >
                Build
              </div>
            )}
            {disabledItems.includes("Manage") ? (
              <Tooltip
                content="This page will be available once you start creating an Azure resource"
                relationship="description"
                positioning={{
                  align: "start",
                  position: "after",
                  offset: { crossAxis: 30, mainAxis: 2 },
                }}
              >
                <div
                  className={styles.navLinkDisabled}
                  onClick={() => {
                    console.log("[v0] Manage is disabled - showing tooltip");
                  }}
                >
                  Manage
                </div>
              </Tooltip>
            ) : (
              <div
                className={`${styles.navLink} ${activeLink === "Manage" ? styles.navLinkActive : ""}`}
                onClick={() => {
                  const targetPage = getPageForExperienceLevel("manage");
                  console.log("[v0] Navigating to Manage:", targetPage);
                  handlePageChange(targetPage);
                }}
              >
                Manage
              </div>
            )}
            {/* <FluentButton
              appearance="subtle"
              className={styles.navLink}
              icon={<GradientSearchIcon />}
              onClick={() => {
                setIsSearchExpanded(true)
                setShowSuggestions(true)
              }}
            >
              Search
            </FluentButton> */}
          </>
        )}
      </div>
      <div className={styles.rightNav}>
        <FluentButton
          appearance="secondary"
          icon={<CopilotSVGIcon />}
          onClick={() => {
            console.log("Copilot button clicked");
            setShowAgentWelcome(true);
            onCopilotOpen?.();
          }}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButton}
          icon={<Alert24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButton}
          icon={<Settings24Regular />}
        />
        <FluentButton
          appearance="subtle"
          className={styles.navButton}
          icon={<QuestionCircle24Regular />}
        />
        <div className={styles.userProfile}>
          <div>
            <div className={styles.userName}>Connie Wilson</div>
            <div className={styles.userEmail}>connie@contoso.com</div>
          </div>
          <div className={styles.userAvatar}>CW</div>
        </div>
      </div>

      {/* Agent Welcome Modal */}
      {showAgentWelcome && (
        <AgentWelcome
          onClose={() => setShowAgentWelcome(false)}
          userName="Connie"
        />
      )}
    </div>
  );
};
