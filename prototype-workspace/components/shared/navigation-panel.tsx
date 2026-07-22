"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useFavorites } from "../../lib/favorites-context";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavCategory,
  NavCategoryItem,
  NavSubItem,
  NavSubItemGroup,
  NavDivider,
  type NavItemValue,
  type OnNavItemSelectData,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Home20Regular,
  Home20Filled,
  GlobeSearch20Regular,
  GlobeSearch20Filled,
  Glasses20Regular,
  Glasses20Filled,
  GridDots20Regular,
  GridDots20Filled,
  AppsListDetail20Regular,
  AppsListDetail20Filled,
  Cube20Regular,
  Cube20Filled,
  AppsAddIn20Regular,
  AppsAddIn20Filled,
  ChartMultiple20Regular,
  ChartMultiple20Filled,
  Star20Regular,
  Star20Filled,
  ChevronDown20Regular,
  bundleIcon,
} from "@fluentui/react-icons";

// Create bundled icons for filled/regular states
const HomeIcon = bundleIcon(Home20Filled, Home20Regular);
const GlobeSearchIcon = bundleIcon(GlobeSearch20Filled, GlobeSearch20Regular);
const AppsListDetailIcon = bundleIcon(
  AppsListDetail20Filled,
  AppsListDetail20Regular,
);
const CubeIcon = bundleIcon(Cube20Filled, Cube20Regular);
const GlassesIcon = bundleIcon(Glasses20Filled, Glasses20Regular);
const AppsAddInIcon = bundleIcon(AppsAddIn20Filled, AppsAddIn20Regular);
const GridDotsIcon = bundleIcon(GridDots20Filled, GridDots20Regular);
const ChartMultipleIcon = bundleIcon(
  ChartMultiple20Filled,
  ChartMultiple20Regular,
);
const StarIcon = bundleIcon(Star20Filled, Star20Regular);

const useStyles = makeStyles({
  navOverlay: {
    position: "fixed",
    top: "48px",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "transparent",
    zIndex: "1200",
    transitionProperty: "opacity",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  navContainer: {
    position: "fixed",
    top: "48px",
    left: "0",
    bottom: "44px",
    width: "260px",
    zIndex: "1201",
    transitionProperty: "transform",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    boxShadow: tokens.shadow16,
    backgroundColor: tokens.colorNeutralBackground4,
  },
  navContainerHidden: {
    transform: "translateX(-100%)",
  },
  navContainerVisible: {
    transform: "translateX(0)",
  },
  navContainerDocked: {
    position: "fixed" as const,
    top: "48px",
    left: "0",
    bottom: "44px",
    width: "260px",
    zIndex: "1100",
    transitionProperty: "transform",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    boxShadow: "none",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground4,
  },
  navContainerDockedHidden: {
    transform: "translateX(-100%)",
  },
  emptyHint: {
    padding: "8px 12px 8px 44px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
    whiteSpace: "normal",
    lineHeight: tokens.lineHeightBase200,
  },
  favItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px 6px 28px",
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ":hover .fav-star": {
      opacity: 1,
    },
  },
  favItemText: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  favStarBtn: {
    opacity: 0,
    flexShrink: 0,
    background: "none",
    border: "none",
    padding: "0 2px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
    transition: "opacity 0.15s",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  favStarBtnVisible: {
    opacity: 1,
  },
  noTransition: {
    transitionDuration: "0s",
  },
  microsoftIcon: {
    width: "18px",
    height: "18px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    columnGap: "1.5px",
    rowGap: "1.5px",
  },
  microsoftSquare: {
    width: "8.25px",
    height: "8.25px",
  },
  navWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  navMain: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
  },

  navFooter: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground4,
    padding: "4px",
    position: "relative",
    zIndex: 5,
    flexShrink: 0,
  },
  footerCategory: {
    position: "relative",
  },
  drawerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.colorNeutralBackground4,
    transform: "translateY(100%)",
    transition: "transform 0.25s ease-out",
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
    boxShadow: tokens.shadow16,
    maxHeight: "calc(100% - 20px)",
  },
  drawerOverlayOpen: {
    transform: "translateY(0)",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    cursor: "pointer",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  drawerContent: {
    overflowY: "auto",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    cursor: "pointer",
    flexShrink: 0,
    borderRadius: tokens.borderRadiusMedium,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    "&:focus": {
      outline: `2px solid ${tokens.colorNeutralForeground1}`,
      outlineOffset: "-2px",
    },
    "&:focus-visible": {
      outline: `2px solid ${tokens.colorNeutralForeground1}`,
      outlineOffset: "-2px",
    },
  },
  footerItemText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  chevron: {
    marginLeft: "auto",
    transition: "transform 0.2s",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  dropdownItem: {
    display: "block",
    padding: "8px 12px 8px 44px",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    "&:focus": {
      outline: `2px solid ${tokens.colorNeutralForeground1}`,
      outlineOffset: "-2px",
    },
    "&:focus-visible": {
      outline: `2px solid ${tokens.colorNeutralForeground1}`,
      outlineOffset: "-2px",
    },
  },
  starIcon: {
    width: "16px",
    height: "16px",
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorPaletteYellowForeground1,
  },
  msSquareRed: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#F25022",
  },
  msSquareGreen: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#80BA01",
  },
  msSquareBlue: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#02A4EF",
  },
  msSquareYellow: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#FFB902",
  },
});

// Small component so hover state is self-contained per item
const FavItem: React.FC<{
  svc: { id: string; name: string; icon: string };
  styles: ReturnType<typeof useStyles>;
  onRemove: () => void;
}> = ({ svc, styles, onRemove }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={styles.favItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.favItemText}>{svc.name}</span>
      <button
        className={mergeClasses(
          styles.favStarBtn,
          hovered && styles.favStarBtnVisible,
        )}
        title="Remove from favorites"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <Star20Filled className={styles.starIcon} />
      </button>
    </div>
  );
};

interface NavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage?: string;
  disableSoftDismiss?: boolean;
  hideManage?: boolean;
  navMode?: "overlay" | "docked";
  navItemLabels?: Record<string, string>;
}

// Map page names to nav item values
const pageToNavValueMap: Record<string, NavItemValue> = {
  "returning-home": "home",
  home: "home",
  "all-services": "all-services",
  "resource-manager": "all-resources",
  manage: "manage",
  dashboard: "dashboard",
};

/** Left sidebar navigation drawer with Home, All Services, Resources, Manage, and Dashboard items.
 * Supports overlay (slide-in, dismissible) and docked (persistent, shifts content) modes.
 * Composed from: Fluent NavDrawer, NavItem, NavCategory, bundled icons, localStorage persistence.
 * Instead of: building custom sidebar navigation with manual open/close and keyboard handling. */
export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPage,
  disableSoftDismiss = false,
  hideManage = false,
  navMode = "overlay",
  navItemLabels = {},
}) => {
  const styles = useStyles();

  let favoriteServices: ReturnType<typeof useFavorites>["favoriteServices"] =
    [];
  let toggleFavorite: ReturnType<
    typeof useFavorites
  >["toggleFavorite"] = () => {};
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const favCtx = useFavorites();
    favoriteServices = favCtx.favoriteServices;
    toggleFavorite = favCtx.toggleFavorite;
  } catch {
    // FavoritesProvider not in tree (e.g. other pages) — render empty list
  }

  // Set CSS custom property on documentElement for docked mode to shift page content.
  // No cleanup — during page navigation the old NavigationPanel unmounts and a new one
  // mounts. If cleanup resets the offset to 0px the body margin flickers.
  useEffect(() => {
    const root = document.documentElement;
    if (navMode === "docked") {
      const offset = isOpen ? "260px" : "0px";
      root.style.setProperty("--nav-docked-offset", offset);
    } else {
      root.style.setProperty("--nav-docked-offset", "0px");
    }
  }, [navMode, isOpen]);

  // Suppress the slide-in transition on initial mount when docked and already open,
  // so the nav doesn't visually replay its entrance animation during page switches.
  const [suppressTransition, setSuppressTransition] = useState(
    navMode === "docked" && isOpen,
  );
  useEffect(() => {
    if (suppressTransition) {
      const id = requestAnimationFrame(() => setSuppressTransition(false));
      return () => cancelAnimationFrame(id);
    }
  }, [suppressTransition]);

  // Compute selected value directly from currentPage prop
  const selectedValue: NavItemValue = currentPage
    ? pageToNavValueMap[currentPage] || "home"
    : "home";

  // Initialize open categories from localStorage
  const [openCategories, setOpenCategories] = useState<NavItemValue[]>(() => {
    if (typeof window !== "undefined") {
      const categories: NavItemValue[] = [];
      if (localStorage.getItem("nav-favorites-expanded") === "true") {
        categories.push("favorites");
      }
      if (localStorage.getItem("nav-microsoft-cloud-expanded") === "true") {
        categories.push("microsoft-cloud");
      }
      return categories;
    }
    return [];
  });

  // Save to localStorage whenever openCategories changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "nav-favorites-expanded",
        JSON.stringify(openCategories.includes("favorites")),
      );
      localStorage.setItem(
        "nav-microsoft-cloud-expanded",
        JSON.stringify(openCategories.includes("microsoft-cloud")),
      );
    }
  }, [openCategories]);

  // Expand Favorite services when a service is starred from any page
  useEffect(() => {
    const handler = () => {
      setOpenCategories((prev) =>
        prev.includes("favorites") ? prev : [...prev, "favorites"],
      );
    };
    window.addEventListener("portal:expandNavFavorites", handler);
    return () =>
      window.removeEventListener("portal:expandNavFavorites", handler);
  }, []);

  // Handle Escape key to close navigation (overlay mode only)
  useEffect(() => {
    if (navMode === "docked") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, navMode]);

  // Focus first nav item when panel is toggled open by user (not on initial mount)
  const navRef = useRef<HTMLDivElement>(null);
  const microsoftCloudRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isOpen && navRef.current) {
      const timer = setTimeout(() => {
        const firstNavItem = navRef.current?.querySelector(
          'button, [role="menuitem"], [role="treeitem"], a',
        ) as HTMLElement;
        firstNavItem?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Collapse Microsoft Cloud when nav closes
  useEffect(() => {
    if (!isOpen) {
      setOpenCategories((prev) => prev.filter((c) => c !== "microsoft-cloud"));
    }
  }, [isOpen]);

  // Focus first item when Microsoft Cloud drawer opens
  useEffect(() => {
    if (
      openCategories.includes("microsoft-cloud") &&
      microsoftCloudRef.current
    ) {
      const timer = setTimeout(() => {
        const firstItem = microsoftCloudRef.current?.querySelector(
          '[role="menuitem"]',
        ) as HTMLElement;
        firstItem?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [openCategories]);

  const handleNavItemSelect = useCallback(
    (_: unknown, data: OnNavItemSelectData) => {
      const value = data.value;

      // Map nav item values to page names
      const pageMap: Record<string, string> = {
        home: "returning-home",
        "all-services": "all-services",
        "all-resources": "resource-manager",
        manage: "manage",
        dashboard: "dashboard",
      };

      if (pageMap[value]) {
        onNavigate(pageMap[value]);
        // Only close panel in overlay mode; keep it open when docked
        if (navMode === "overlay") {
          onClose();
        }
      }
    },
    [onNavigate, onClose, navMode],
  );

  const handleCategoryToggle = useCallback(
    (_: unknown, data: OnNavItemSelectData) => {
      const categoryValue = data.categoryValue;
      if (categoryValue) {
        setOpenCategories((prev) =>
          prev.includes(categoryValue)
            ? prev.filter((c) => c !== categoryValue)
            : [...prev, categoryValue],
        );
      }
    },
    [],
  );

  const MicrosoftIcon = () => (
    <div className={styles.microsoftIcon}>
      <div
        className={mergeClasses(styles.microsoftSquare, styles.msSquareRed)}
      />
      <div
        className={mergeClasses(styles.microsoftSquare, styles.msSquareGreen)}
      />
      <div
        className={mergeClasses(styles.microsoftSquare, styles.msSquareBlue)}
      />
      <div
        className={mergeClasses(styles.microsoftSquare, styles.msSquareYellow)}
      />
    </div>
  );

  return (
    <>
      {/* Navigation Overlay - only for overlay mode */}
      {navMode === "overlay" && isOpen && !disableSoftDismiss && (
        <div
          className={styles.navOverlay}
          role="presentation"
          onClick={onClose}
        />
      )}

      {/* Navigation Drawer Container */}
      <div
        className={
          navMode === "docked"
            ? mergeClasses(
                styles.navContainerDocked,
                !isOpen && styles.navContainerDockedHidden,
                suppressTransition && styles.noTransition,
              )
            : mergeClasses(
                styles.navContainer,
                isOpen ? styles.navContainerVisible : styles.navContainerHidden,
                suppressTransition && styles.noTransition,
              )
        }
      >
        <div className={styles.navWrapper}>
          <div className={styles.navMain} ref={navRef}>
            <NavDrawer
              open={true}
              type="inline"
              selectedValue={selectedValue}
              onNavItemSelect={handleNavItemSelect}
              openCategories={openCategories}
              onNavCategoryItemToggle={handleCategoryToggle}
              multiple={true}
              surfaceMotion={navMode === "docked" ? null : undefined}
            >
              <NavDrawerBody>
                <NavItem icon={<HomeIcon />} value="home">
                  Home
                </NavItem>

                <NavDivider />

                <NavItem icon={<AppsListDetailIcon />} value="all-services">
                  {navItemLabels["all-services"] ?? "All services"}
                </NavItem>

                <NavItem icon={<CubeIcon />} value="all-resources">
                  All resources
                </NavItem>

                {!hideManage && (
                  <NavItem icon={<AppsAddInIcon />} value="manage">
                    Manage
                  </NavItem>
                )}

                {!hideManage && (
                  <NavItem icon={<ChartMultipleIcon />} value="dashboard">
                    Dashboard
                  </NavItem>
                )}

                <NavDivider />

                <NavCategory value="favorites">
                  <NavCategoryItem icon={<StarIcon />}>
                    Favorite services
                  </NavCategoryItem>
                  <NavSubItemGroup>
                    {favoriteServices.length === 0 ? (
                      <div className={styles.emptyHint}>
                        To add a service to Favorites,
                        <br />
                        click its star icon
                      </div>
                    ) : (
                      favoriteServices.map((svc) => (
                        <FavItem
                          key={svc.id}
                          svc={svc}
                          styles={styles}
                          onRemove={() => toggleFavorite(svc)}
                        />
                      ))
                    )}
                  </NavSubItemGroup>
                </NavCategory>
              </NavDrawerBody>
            </NavDrawer>
          </div>

          {/* Pinned footer with More Microsoft Cloud */}
          <div className={styles.navFooter}>
            <div
              className={styles.footerItem}
              tabIndex={0}
              role="button"
              aria-expanded={
                openCategories.includes("microsoft-cloud") ? "true" : "false"
              }
              onClick={() =>
                setOpenCategories((prev) =>
                  prev.includes("microsoft-cloud")
                    ? prev.filter((c) => c !== "microsoft-cloud")
                    : [...prev, "microsoft-cloud"],
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenCategories((prev) =>
                    prev.includes("microsoft-cloud")
                      ? prev.filter((c) => c !== "microsoft-cloud")
                      : [...prev, "microsoft-cloud"],
                  );
                }
              }}
            >
              <MicrosoftIcon />
              <span className={styles.footerItemText}>
                More Microsoft Cloud
              </span>
              <ChevronDown20Regular
                className={mergeClasses(
                  styles.chevron,
                  openCategories.includes("microsoft-cloud") &&
                    styles.chevronOpen,
                )}
              />
            </div>
          </div>

          {/* Slide-up drawer overlay */}
          <div
            className={mergeClasses(
              styles.drawerOverlay,
              openCategories.includes("microsoft-cloud") &&
                styles.drawerOverlayOpen,
            )}
          >
            <div
              className={styles.drawerHeader}
              onClick={() =>
                setOpenCategories((prev) =>
                  prev.filter((c) => c !== "microsoft-cloud"),
                )
              }
            >
              <MicrosoftIcon />
              <span className={styles.footerItemText}>
                More Microsoft Cloud
              </span>
              <ChevronDown20Regular
                className={mergeClasses(styles.chevron, styles.chevronOpen)}
              />
            </div>
            <div
              className={styles.drawerContent}
              ref={microsoftCloudRef}
              role="menu"
              onKeyDown={(e) => {
                const items = Array.from(
                  e.currentTarget.querySelectorAll('[role="menuitem"]'),
                ) as HTMLElement[];
                const currentIndex = items.indexOf(e.target as HTMLElement);
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const nextIndex =
                    currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                  items[nextIndex]?.focus();
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const prevIndex =
                    currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                  items[prevIndex]?.focus();
                }
              }}
            >
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                AI Foundry
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Copilot Studio
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Data Explorer
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Defender
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                DevOps
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Entra
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Fabric
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Github
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Intune
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Microsoft 365 Admin
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Power Automate
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Power Platform
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Purview
              </div>
              <div className={styles.dropdownItem} tabIndex={0} role="menuitem">
                Visual Studio Code
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
