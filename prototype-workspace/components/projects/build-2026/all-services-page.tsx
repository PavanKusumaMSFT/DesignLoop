/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Input,
  Text,
  TabList,
  Tab,
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  categories,
  services,
  serviceCostBasis,
  collectionOptions,
  startupServiceIds,
  startupServiceData,
  mostUsedCategoryOrder,
  mostUsedServicesByCategory,
  type Category,
  type Service,
} from "./all-services-data";
import {
  Star20Regular,
  Star20Filled,
  AppsList20Regular,
  Star16Filled,
  Dismiss20Regular,
  Add16Regular,
  List16Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "./azure-header-buildmvp";

import { useNavigation } from "../../../lib/navigation-context";
import { useFavorites } from "../../../lib/favorites-context";
import AllServicesCardDefault from "../../shared/all-services-card-default";
import AllServicesCardOption2 from "../../shared/all-services-card-option2";
import AllServicesCardOption3 from "../../shared/all-services-card-option3";
import AllServicesCardOption4 from "../../shared/all-services-card-option4";
import AllServicesCardOption5 from "../../shared/all-services-card-option5";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "8px 20px",
    maxWidth: "1480px",
    margin: "0 auto",
    width: "100%",
  },
  mainContent: {
    display: "flex",
    flex: 1,
    width: "100%",
    maxWidth: "1480px",
    margin: "0 auto",
    gap: "0",
    padding: "24px 0",
    overflow: "hidden",
    minHeight: 0,
  },
  filterTab: {
    padding: "4px",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "1em",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    borderBottom: "6px solid transparent",
    transition: "all 0.2s",
    ":hover": {
      textDecoration: "underline",
    },
  },
  filterTabActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `6px solid ${tokens.colorNeutralBackground3}`,
  },
  categoriesHeading: {
    display: "block",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.375em",
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  categoryItem: {
    padding: "4px",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "1.4285714285714286em",
    transition: "all 0.2s",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    color: tokens.colorNeutralForeground1,
    ":hover": {
      textDecoration: "underline",
    },
  },
  centerSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "1280px",
    padding: "0 24px 0 20px",
    minHeight: 0,
    overflow: "hidden",
  },
  rightSection: {
    flex: "0 0 180px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 20px 0 0",
    overflowY: "auto",
    minHeight: 0,
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  serviceCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    ":hover": {
      boxShadow: tokens.shadow16,
    },
  },
  serviceCardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
  },
  serviceCardLeft: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    flex: 1,
    minWidth: 0,
  },
  serviceIcon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
  },
  serviceIconContainer: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    paddingTop: "2px",
  },
  serviceTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    flex: 1,
  },
  serviceName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    fontFamily: tokens.fontFamilyBase,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  serviceCostBasis: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    fontFamily: tokens.fontFamilyBase,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  serviceDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
    fontFamily: tokens.fontFamilyBase,
    padding: `0 ${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "32px",
  },
  serviceCardFooter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
  existingButton: {
    minWidth: "auto",
  },
  favoriteButton: {
    minWidth: "auto",
    padding: "6px",
    transition: "opacity 0.2s ease",
  },
  categorySection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
  },
  categoryHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalXS,
    position: "sticky",
    top: 0,
    zIndex: 90,
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: "8px",
    paddingBottom: "4px",
    marginLeft: "-4px",
    paddingLeft: "4px",
    marginRight: "-8px",
    paddingRight: "8px",
  },
  seeAllLink: {
    display: "block",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorBrandForeground2,
    fontFamily: tokens.fontFamilyBase,
    textDecoration: "none",
    cursor: "pointer",
    marginTop: tokens.spacingVerticalM,
    ":hover": {
      textDecoration: "underline",
    },
  },
  categoryTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.4em",
    fontFamily: tokens.fontFamilyBase,
  },
  sectionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    overflowY: "auto",
    minHeight: 0,
    paddingLeft: "4px",
    paddingRight: "8px",
  },
  collectionBanner: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    flexShrink: 0,
    maxWidth: "70%",
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    flexShrink: 0,
    backgroundColor: tokens.colorNeutralBackground2,
    paddingBottom: "12px",
  },
  filterInput: {
    width: "180px",
    height: "24px",
  },
  pillFilter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: "3px 12px",
    backgroundColor: "rgba(0, 120, 212, 0.1)",
    borderRadius: tokens.borderRadius2XLarge,
    fontSize: "13px",
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    height: "24px",
    "&:hover": {
      backgroundColor: "rgba(0, 120, 212, 0.15)",
    },
  },
  pillFilterName: {
    fontWeight: tokens.fontWeightRegular,
  },
  pillFilterValue: {
    fontWeight: tokens.fontWeightSemibold,
  },
  pillDropdownWrapper: {
    position: "relative",
    display: "inline-block",
  },
  pillDropdownMenu: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    minWidth: "160px",
    zIndex: 9999,
    padding: "4px 0",
  },
  pillDropdownItem: {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    fontSize: tokens.fontSizeBase300,
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  pillDropdownItemActive: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  tabsSection: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "0 20px",
    flexShrink: 0,
    maxWidth: "1480px",
    margin: "0 auto",
    width: "100%",
  },
  breadcrumbConstraint: {
    maxWidth: "1480px",
    margin: "0 auto",
    width: "100%",
  },
  navItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "4px 8px 4px 12px",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    borderRadius: tokens.borderRadiusMedium,
    transition: "background 0.1s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  navItemActive: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    "::before": {
      content: "''",
      position: "absolute",
      left: "0",
      top: "4px",
      bottom: "4px",
      width: "3px",
      borderRadius: tokens.borderRadiusSmall,
      backgroundColor: tokens.colorCompoundBrandStroke,
    },
  },
  starYellow: {
    color: tokens.colorPaletteYellowForeground1,
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  headerTitleBlock: {
    display: "block",
  },
  emptyFavoritesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 24px",
    gap: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground2,
  },
  emptyFavoritesIcon: {
    width: "48px",
    height: "48px",
    color: tokens.colorNeutralForeground3,
  },
  emptyFavoritesTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
  },
  emptyFavoritesHint: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
  },
  favoriteButtonVisible: {
    opacity: 1,
  },
  favoriteButtonHidden: {
    opacity: 0,
  },
  clickableWrapper: {
    cursor: "pointer",
  },
  breadcrumbEl: {
    padding: `${tokens.spacingVerticalXS} 20px`,
  },
});

const AllServicesPage: React.FC<{
  customHeader?: React.ReactNode | null;
  cardLayout?: "default" | "option2" | "option3" | "option4" | "option5";
  onCardLayoutChange?: (
    layout: "default" | "option2" | "option3" | "option4" | "option5",
  ) => void;
  onServiceSelect?: (serviceId: string) => void;
  onExistingSelect?: (service: {
    id: string;
    name: string;
    icon: string;
  }) => void;
  onServiceCreate?: (serviceId: string) => void;
  isDarkMode?: boolean;
}> = ({
  customHeader,
  cardLayout: cardLayoutProp,
  onCardLayoutChange,
  onServiceSelect,
  onExistingSelect,
  onServiceCreate,
  isDarkMode = false,
}) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const { favorites, favoriteServices, toggleFavorite, isFavorite } =
    useFavorites();
  const toasterId = useId("toaster");
  const { dispatchToast, dismissToast } = useToastController(toasterId);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeNavCategory, setActiveNavCategory] = useState<string>("ai-ml");
  const [serviceCollection, setServiceCollection] =
    useState<string>("Most used");
  const [cardLayout, setCardLayout] = useState<
    "default" | "option2" | "option3" | "option4" | "option5"
  >(cardLayoutProp ?? "option4");
  // Sync with prop when parent controls the value
  const effectiveCardLayout = cardLayoutProp ?? cardLayout;
  const ServiceCard =
    effectiveCardLayout === "option2"
      ? AllServicesCardOption2
      : effectiveCardLayout === "option3"
        ? AllServicesCardOption3
        : effectiveCardLayout === "option4"
          ? AllServicesCardOption4
          : effectiveCardLayout === "option5"
            ? AllServicesCardOption5
            : AllServicesCardDefault;
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const collectionDropdownRef = useRef<HTMLDivElement>(null);
  const suppressScrollUpdate = useRef(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        collectionDropdownRef.current &&
        !collectionDropdownRef.current.contains(e.target as Node)
      ) {
        setCollectionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const scrollSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggleFavorite = (service: Service, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyFavorited = favorites.has(service.id);
    toggleFavorite({
      id: service.id,
      name: service.name,
      icon: service.icon,
      category: service.category,
    });
    if (!isCurrentlyFavorited) {
      window.dispatchEvent(new CustomEvent("portal:expandNavFavorites"));
      const toastId = `fav-toast-${service.id}-${Date.now()}`;
      dispatchToast(
        <Toast>
          <ToastTitle
            media={<Star16Filled className={styles.starYellow} />}
            action={
              <Button
                appearance="transparent"
                size="small"
                icon={<Dismiss20Regular />}
                onClick={() => dismissToast(toastId)}
              />
            }
          >
            {service.name} has been added to Favorite services
          </ToastTitle>
          <ToastBody>
            <Link
              onClick={() => {
                setSelectedFilter("favorites");
                dismissToast(toastId);
              }}
            >
              View Favorite services
            </Link>
          </ToastBody>
        </Toast>,
        { intent: "success", timeout: -1, position: "top-end", toastId },
      );
    }
  };

  const getCostBasis = (service: Service): string | undefined =>
    service.costBasis ?? serviceCostBasis[service.id];

  // ── Most used helpers ──────────────────────────────────────────────────────

  /** Categories sorted by the Excel-defined order when in "Most used" mode. */
  const getSortedCategories = (): Category[] => {
    if (serviceCollection !== "Most used") return categories;
    const inOrder = mostUsedCategoryOrder
      .map((id) => categories.find((c) => c.id === id))
      .filter(Boolean) as Category[];
    const rest = categories.filter(
      (c) => !mostUsedCategoryOrder.includes(c.id),
    );
    return [...inOrder, ...rest];
  };

  /**
   * Returns the pinned "most used" services for a category (ordered).
   * If the pinned list yields fewer than 2 services, fills up to 2 with the
   * first alphabetical services from that category so every category always
   * shows a minimum of 2 items.
   */
  const getMostUsedServicesForCategory = (categoryId: string): Service[] => {
    const ids = mostUsedServicesByCategory[categoryId] ?? [];
    const pinned = ids
      .map((id) =>
        services.find((s) => s.id === id && s.category === categoryId),
      )
      .filter(Boolean) as Service[];

    if (pinned.length >= 2) return pinned;

    const pinnedIds = new Set(pinned.map((s) => s.id));
    const fallbacks = services
      .filter((s) => s.category === categoryId && !pinnedIds.has(s.id))
      .slice(0, 2 - pinned.length);

    return [...pinned, ...fallbacks];
  };

  const updateActiveFromScroll = () => {
    if (suppressScrollUpdate.current) return;
    const scrollContainer = document.getElementById(
      "all-services-scroll-container",
    );
    if (!scrollContainer) return;
    const containerTop = scrollContainer.getBoundingClientRect().top;
    const visibleCategories = getSortedCategories();
    let activeId = visibleCategories[0]?.id ?? categories[0].id;
    for (const category of visibleCategories) {
      const el = document.getElementById(`category-${category.id}`);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Section has reached or passed the top of the scroll container
      if (rect.top - containerTop <= 8) {
        activeId = category.id;
      }
    }
    setActiveNavCategory(activeId);
  };

  useEffect(() => {
    if (selectedFilter !== "all" && selectedFilter !== "favorites") return;

    const scrollContainer = document.getElementById(
      "all-services-scroll-container",
    );
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", updateActiveFromScroll, {
      passive: true,
    });
    // Run once immediately to set the initial active state
    updateActiveFromScroll();

    return () =>
      scrollContainer.removeEventListener("scroll", updateActiveFromScroll);
  }, [selectedFilter]);

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection =
      serviceCollection === "Alphabetical" || startupServiceIds.has(service.id);
    return matchesCategory && matchesSearch && matchesCollection;
  });

  // Combined service lookup (services array takes precedence over startupServiceData)
  const allServicesById = new Map<string, Service>(
    [...startupServiceData, ...services].map((s) => [s.id, s]),
  );

  const favoritedServicesList = favoriteServices
    .map((fs) => allServicesById.get(fs.id))
    .filter(Boolean) as Service[];

  const favoriteCategories = categories.filter((cat) =>
    favoritedServicesList.some((s) => s.category === cat.id),
  );

  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <Toaster
        toasterId={toasterId}
        offset={{ horizontal: 16, vertical: 50 }}
      />
      <div className={styles.container}>
        {customHeader === undefined ? (
          <div className={styles.stickyNav}>
            <AzureHeaderBuildMVP
              activeLink="Discover"
              isDarkMode={isDarkMode}
              cardLayout={effectiveCardLayout}
              onCardLayoutChange={(layout) => {
                setCardLayout(layout);
                onCardLayoutChange?.(layout);
              }}
            />
          </div>
        ) : (
          customHeader && <div className={styles.stickyNav}>{customHeader}</div>
        )}

        <div className={styles.breadcrumbConstraint}>
          <Breadcrumb
            aria-label="Breadcrumb"
            size="medium"
            className={styles.breadcrumbEl}
          >
            <BreadcrumbItem>
              <BreadcrumbButton onClick={() => handlePageChange("home-fre")}>
                Home
              </BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton current>All services</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className={styles.header}>
          <div className={styles.headerRow}>
            <div>
              <Text
                size={600}
                weight="semibold"
                className={styles.headerTitleBlock}
              >
                All services
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.tabsSection}>
          <TabList
            selectedValue={selectedFilter}
            onTabSelect={(_, data) => {
              setSelectedFilter(data.value as string);
              setSelectedCategory("all");
              const scrollContainer = document.getElementById(
                "all-services-scroll-container",
              );
              if (scrollContainer) scrollContainer.scrollTop = 0;
            }}
          >
            <Tab value="all" icon={<AppsList20Regular />}>
              All
            </Tab>
            <Tab value="favorites" icon={<Star20Regular />}>
              Favorites
            </Tab>
          </TabList>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.centerSection}>
            {selectedFilter !== "favorites" && (
              <div className={styles.filterBar}>
                <Input
                  className={styles.filterInput}
                  placeholder="Filter services"
                  appearance="outline"
                  size="small"
                />
                <div
                  ref={collectionDropdownRef}
                  className={styles.pillDropdownWrapper}
                >
                  <button
                    className={styles.pillFilter}
                    onClick={() => setCollectionDropdownOpen((prev) => !prev)}
                  >
                    <span className={styles.pillFilterName}>Sort by</span>
                    <span>:</span>
                    <span className={styles.pillFilterValue}>
                      {serviceCollection}
                    </span>
                  </button>
                  {collectionDropdownOpen && (
                    <div className={styles.pillDropdownMenu}>
                      {collectionOptions.map((option) => (
                        <button
                          key={option}
                          className={`${styles.pillDropdownItem} ${
                            serviceCollection === option
                              ? styles.pillDropdownItemActive
                              : ""
                          }`}
                          onClick={() => {
                            setServiceCollection(option);
                            setExpandedCategories(new Set());
                            setCollectionDropdownOpen(false);
                            const scrollContainer = document.getElementById(
                              "all-services-scroll-container",
                            );
                            if (scrollContainer) scrollContainer.scrollTop = 0;
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              id="all-services-scroll-container"
              className={styles.sectionsContainer}
            >
              {/* Favorites Tab */}
              {selectedFilter === "favorites" &&
                (favoriteCategories.length === 0 ? (
                  <div className={styles.emptyFavoritesContainer}>
                    <Star20Regular className={styles.emptyFavoritesIcon} />
                    <div className={styles.emptyFavoritesTitle}>
                      No favorites yet
                    </div>
                    <div className={styles.emptyFavoritesHint}>
                      Hover over a service card and click the star to add it
                      here.
                    </div>
                  </div>
                ) : (
                  favoriteCategories.map((category) => {
                    const catFavorites = favoritedServicesList.filter(
                      (s) => s.category === category.id,
                    );
                    return (
                      <div
                        key={category.id}
                        id={`category-${category.id}`}
                        className={styles.categorySection}
                      >
                        <div
                          className={styles.categoryHeader}
                          data-category-id={category.id}
                        >
                          <div className={styles.categoryTitle}>
                            {category.name}
                          </div>
                        </div>
                        <div className={styles.servicesGrid}>
                          {catFavorites.map((service) => (
                            <div
                              key={service.id}
                              className={styles.clickableWrapper}
                              onClick={(e) => {
                                if (
                                  !(e.target as HTMLElement).closest("button")
                                ) {
                                  onServiceSelect?.(service.id);
                                }
                              }}
                            >
                              <ServiceCard
                                service={service}
                                isFavorited={true}
                                isHovered={
                                  hoveredCard ===
                                  `fav-${category.id}-${service.id}`
                                }
                                costBasis={getCostBasis(service)}
                                onToggleFavorite={handleToggleFavorite}
                                onCreate={() => onServiceCreate?.(service.id)}
                                onExisting={() =>
                                  onExistingSelect?.({
                                    id: service.id,
                                    name: service.name,
                                    icon: service.icon,
                                  })
                                }
                                onMouseEnter={() =>
                                  setHoveredCard(
                                    `fav-${category.id}-${service.id}`,
                                  )
                                }
                                onMouseLeave={() => setHoveredCard(null)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ))}

              {/* Category Sections - hide when "favorites" filter is selected */}
              {selectedFilter !== "favorites" && selectedCategory === "all" ? (
                // Show all categories when "all" is selected
                getSortedCategories().map((category) => {
                  const isMostUsed = serviceCollection === "Most used";
                  const isExpanded = expandedCategories.has(category.id);

                  // Services to render in the grid
                  const categoryServices = (() => {
                    if (isMostUsed && !isExpanded) {
                      return getMostUsedServicesForCategory(category.id);
                    }
                    if (isMostUsed && isExpanded) {
                      // Keep the already-visible pinned services in place,
                      // then append the remaining services after them.
                      const pinned = getMostUsedServicesForCategory(
                        category.id,
                      );
                      const pinnedIds = new Set(pinned.map((s) => s.id));
                      const rest = services.filter(
                        (s) =>
                          s.category === category.id && !pinnedIds.has(s.id),
                      );
                      return [...pinned, ...rest];
                    }
                    return services.filter((s) => s.category === category.id);
                  })();

                  // All services in the category (to know if "See all" is needed)
                  const allCategoryServices = services.filter(
                    (s) => s.category === category.id,
                  );
                  const hasMore =
                    isMostUsed &&
                    !isExpanded &&
                    allCategoryServices.length > categoryServices.length;

                  if (categoryServices.length === 0) return null;
                  return (
                    <div
                      key={category.id}
                      id={`category-${category.id}`}
                      className={styles.categorySection}
                    >
                      <div
                        className={styles.categoryHeader}
                        data-category-id={category.id}
                      >
                        <div className={styles.categoryTitle}>
                          {category.name}
                        </div>
                      </div>
                      <div className={styles.servicesGrid}>
                        {categoryServices.map((service) => (
                          <div
                            key={service.id}
                            className={styles.clickableWrapper}
                            onClick={(e) => {
                              if (
                                !(e.target as HTMLElement).closest("button")
                              ) {
                                onServiceSelect?.(service.id);
                              }
                            }}
                          >
                            <ServiceCard
                              service={service}
                              isFavorited={favorites.has(service.id)}
                              isHovered={
                                hoveredCard ===
                                `cat-${category.id}-${service.id}`
                              }
                              costBasis={getCostBasis(service)}
                              onToggleFavorite={handleToggleFavorite}
                              onCreate={() => onServiceCreate?.(service.id)}
                              onExisting={() =>
                                onExistingSelect?.({
                                  id: service.id,
                                  name: service.name,
                                  icon: service.icon,
                                })
                              }
                              onMouseEnter={() =>
                                setHoveredCard(
                                  `cat-${category.id}-${service.id}`,
                                )
                              }
                              onMouseLeave={() => setHoveredCard(null)}
                            />
                          </div>
                        ))}
                      </div>
                      {hasMore && (
                        <a
                          className={styles.seeAllLink}
                          onClick={() => {
                            setExpandedCategories(
                              (prev) => new Set([...prev, category.id]),
                            );
                          }}
                        >
                          See all: {category.name}
                        </a>
                      )}
                      {isMostUsed && isExpanded && (
                        <a
                          className={styles.seeAllLink}
                          onClick={() => {
                            setExpandedCategories((prev) => {
                              const next = new Set(prev);
                              next.delete(category.id);
                              return next;
                            });
                            setTimeout(() => {
                              const el = document.getElementById(
                                `category-${category.id}`,
                              );
                              const scrollContainer = document.getElementById(
                                "all-services-scroll-container",
                              );
                              if (el && scrollContainer) {
                                const containerTop =
                                  scrollContainer.getBoundingClientRect().top;
                                const elTop = el.getBoundingClientRect().top;
                                const end =
                                  scrollContainer.scrollTop +
                                  (elTop - containerTop - 8);
                                const start = scrollContainer.scrollTop;
                                const duration = 1000;
                                const startTime = performance.now();

                                const easeOutQuint = (t: number) =>
                                  1 - Math.pow(1 - t, 9);

                                const animateScroll = (now: number) => {
                                  const elapsed = now - startTime;
                                  const progress = Math.min(
                                    elapsed / duration,
                                    1,
                                  );
                                  scrollContainer.scrollTop =
                                    start +
                                    (end - start) * easeOutQuint(progress);
                                  if (progress < 1) {
                                    requestAnimationFrame(animateScroll);
                                  }
                                };

                                requestAnimationFrame(animateScroll);
                              }
                            }, 0);
                          }}
                        >
                          Show less
                        </a>
                      )}
                    </div>
                  );
                })
              ) : selectedFilter !== "favorites" ? (
                // Show only selected category
                <div className={styles.categorySection}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryTitle}>
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </div>
                  </div>
                  <div className={styles.servicesGrid}>
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className={styles.clickableWrapper}
                        onClick={(e) => {
                          if (!(e.target as HTMLElement).closest("button")) {
                            onServiceSelect?.(service.id);
                          }
                        }}
                      >
                        <ServiceCard
                          service={service}
                          isFavorited={favorites.has(service.id)}
                          isHovered={hoveredCard === `single-${service.id}`}
                          costBasis={getCostBasis(service)}
                          onToggleFavorite={handleToggleFavorite}
                          onCreate={() => onServiceCreate?.(service.id)}
                          onExisting={() =>
                            onExistingSelect?.({
                              id: service.id,
                              name: service.name,
                              icon: service.icon,
                            })
                          }
                          onMouseEnter={() =>
                            setHoveredCard(`single-${service.id}`)
                          }
                          onMouseLeave={() => setHoveredCard(null)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {(selectedFilter === "all" || selectedFilter === "favorites") && (
            <div className={styles.rightSection}>
              <Text
                className={styles.categoriesHeading}
                onClick={() => {
                  suppressScrollUpdate.current = true;
                  if (scrollSettleTimer.current)
                    clearTimeout(scrollSettleTimer.current);
                  setActiveNavCategory(categories[0].id);
                  const scrollContainer = document.getElementById(
                    "all-services-scroll-container",
                  );
                  if (scrollContainer) {
                    const start = scrollContainer.scrollTop;
                    const end = 0;
                    const duration = 1000;
                    const startTime = performance.now();
                    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 9);
                    const animate = (now: number) => {
                      const progress = Math.min(
                        (now - startTime) / duration,
                        1,
                      );
                      scrollContainer.scrollTop =
                        start + (end - start) * easeOutQuint(progress);
                      if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    scrollSettleTimer.current = setTimeout(() => {
                      suppressScrollUpdate.current = false;
                    }, 900);
                  }
                }}
              >
                Categories
              </Text>
              {(selectedFilter === "favorites"
                ? favoriteCategories
                : serviceCollection === "Most used"
                  ? getSortedCategories()
                  : categories
              ).map((category) => (
                <button
                  key={category.id}
                  className={`${styles.navItem} ${
                    activeNavCategory === category.id
                      ? styles.navItemActive
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedFilter !== "favorites") {
                      setSelectedFilter("all");
                      setSelectedCategory("all");
                    }
                    // Lock the indicator to the clicked item for the duration of the smooth scroll
                    suppressScrollUpdate.current = true;
                    if (scrollSettleTimer.current)
                      clearTimeout(scrollSettleTimer.current);
                    setActiveNavCategory(category.id);
                    setTimeout(() => {
                      const element = document.getElementById(
                        `category-${category.id}`,
                      );
                      const scrollContainer = document.getElementById(
                        "all-services-scroll-container",
                      );
                      if (element && scrollContainer) {
                        const elementPosition =
                          element.getBoundingClientRect().top;
                        const containerTop =
                          scrollContainer.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition -
                          containerTop +
                          scrollContainer.scrollTop;
                        const viewportHeight = scrollContainer.clientHeight;
                        const distance =
                          offsetPosition - scrollContainer.scrollTop;

                        if (Math.abs(distance) > viewportHeight) {
                          // Jump to one viewport-height away from the destination instantly
                          const jumpTo =
                            distance > 0
                              ? offsetPosition - viewportHeight
                              : offsetPosition + viewportHeight;
                          scrollContainer.scrollTop = jumpTo;
                        }

                        // Smooth-scroll the final stretch with a custom easing (~350ms)
                        const start = scrollContainer.scrollTop;
                        const end = offsetPosition;
                        const duration = 1000;
                        const startTime = performance.now();

                        const easeOutQuint = (t: number) =>
                          1 - Math.pow(1 - t, 9);

                        const animateScroll = (now: number) => {
                          const elapsed = now - startTime;
                          const progress = Math.min(elapsed / duration, 1);
                          scrollContainer.scrollTop =
                            start + (end - start) * easeOutQuint(progress);
                          if (progress < 1) {
                            requestAnimationFrame(animateScroll);
                          }
                        };

                        requestAnimationFrame(animateScroll);

                        scrollSettleTimer.current = setTimeout(() => {
                          suppressScrollUpdate.current = false;
                        }, 900);
                      } else {
                        suppressScrollUpdate.current = false;
                      }
                    }, 0);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </FluentProvider>
  );
};

export default AllServicesPage;
