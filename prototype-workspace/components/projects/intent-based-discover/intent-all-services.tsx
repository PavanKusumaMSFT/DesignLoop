"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Text,
  Title1,
  Subtitle2,
  TabList,
  Tab,
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId,
  Link,
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
} from "../build-2026/all-services-data";
import {
  Star20Regular,
  Star20Filled,
  AppsList20Regular,
  Star16Filled,
  Dismiss20Regular,
  Add16Regular,
  List16Regular,
} from "@fluentui/react-icons";
import { CopilotProvider, ChatInput } from "@fluentui-copilot/react-copilot";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import { useNavigation } from "../../../lib/navigation-context";
import { useFavorites } from "../../../lib/favorites-context";
import AllServicesCardDefault from "../../shared/all-services-card-default";
import AllServicesCardOption2 from "../../shared/all-services-card-option2";
import AllServicesCardOption3 from "../../shared/all-services-card-option3";
import AllServicesCardOption4 from "../../shared/all-services-card-option4";
import AllServicesCardOption5 from "../../shared/all-services-card-option5";
import ReasoningCard from "../optimize/reasoning-card";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXL}`,
    maxWidth: "1480px",
    margin: "0 auto",
    width: "100%",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1480px",
    margin: "0 auto",
    gap: "0",
    padding: "0",
  },
  contentRow: {
    display: "flex",
    width: "100%",
    gap: "0",
  },
  filterTab: {
    padding: tokens.spacingHorizontalXS,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "1em",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    borderBottom: "6px solid transparent",
    transitionProperty: "all",
    transitionDuration: tokens.durationNormal,
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
    padding: tokens.spacingHorizontalXS,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "1.4285714285714286em",
    transitionProperty: "all",
    transitionDuration: tokens.durationNormal,
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
    padding: "0 24px",
  },
  rightSection: {
    flex: "0 0 180px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: "48px 24px 0 0",
    overflowY: "auto",
    position: "sticky",
    top: "48px",
    alignSelf: "flex-start",
    maxHeight: "calc(100vh - 48px)",
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
    transitionProperty: "all",
    transitionDuration: tokens.durationNormal,
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
    paddingTop: tokens.spacingVerticalXXS,
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
    transitionProperty: "opacity",
    transitionDuration: tokens.durationNormal,
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
    top: "96px",
    zIndex: 89,
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalXS,
    marginLeft: "-4px",
    paddingLeft: tokens.spacingHorizontalXS,
    marginRight: "-8px",
    paddingRight: tokens.spacingHorizontalS,
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
    gap: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalXXL,
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
    paddingBottom: tokens.spacingVerticalM,
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
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadius2XLarge,
    fontSize: tokens.fontSizeBase200,
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    height: "24px",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
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
    marginLeft: tokens.spacingHorizontalM,
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
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  pillDropdownItem: {
    display: "block",
    width: "100%",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
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
  pageTitleSection: {
    paddingTop: "48px",
    flexShrink: 0,
    width: "100%",
    textAlign: "center",
  },
  pageTitle: {
    display: "block",
    textAlign: "center",
    marginBottom: "0",
  },
  pageSubtitle: {
    display: "block",
    textAlign: "center",
    marginBottom: "0",
    color: tokens.colorNeutralForeground2,
  },
  chatInputWrapper: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: "48px",
    width: "100%",
    maxWidth: "640px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tabsSection: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "0",
    flexShrink: 0,
    paddingBottom: tokens.spacingVerticalM,
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: "48px",
    zIndex: 91,
  },
  tabSeparator: {
    width: "1px",
    height: "20px",
    backgroundColor: tokens.colorNeutralStroke1,
    flexShrink: 0,
    margin: `0 ${tokens.spacingHorizontalM}`,
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
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
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
    transitionProperty: "background-color",
    transitionDuration: tokens.durationFaster,
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
      top: tokens.spacingVerticalXS,
      bottom: tokens.spacingVerticalXS,
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
  cardClickWrapper: {
    cursor: "pointer",
  },
  thinkingOverlay: {
    position: "fixed",
    inset: "0",
    backgroundColor: tokens.colorBackgroundOverlay,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  thinkingContent: {
    maxWidth: "680px",
    width: "100%",
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  overlayClickable: {
    cursor: "pointer",
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
  isDarkMode?: boolean;
}> = ({
  customHeader,
  cardLayout: cardLayoutProp,
  onCardLayoutChange,
  onServiceSelect,
  onExistingSelect,
  isDarkMode = false,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { handlePageChange, setSelectedPage } = useNavigation();
  const [thinkingPrompt, setThinkingPrompt] = useState<string | null>(null);
  const [reasoningComplete, setReasoningComplete] = useState(false);

  // Mark "Discover services" as the active nav item while this page is mounted
  useEffect(() => {
    setSelectedPage("all-services");
    return () => setSelectedPage(null);
  }, [setSelectedPage]);

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
  const tabsSectionRef = useRef<HTMLDivElement>(null);
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
    const containerTop =
      tabsSectionRef.current?.getBoundingClientRect().bottom ?? 96;
    const visibleCategories = getSortedCategories();
    let activeId = visibleCategories[0]?.id ?? categories[0].id;
    for (const category of visibleCategories) {
      const el = document.getElementById(`category-${category.id}`);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Section has reached or passed the top of the visible content area
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
      <div id="all-services-scroll-container" className={styles.container}>
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
              navItemLabels={{ "all-services": "Discover services" }}
            />
          </div>
        ) : (
          customHeader && <div className={styles.stickyNav}>{customHeader}</div>
        )}

        <div className={styles.mainContent}>
          <div className={styles.pageTitleSection}>
            <Title1 className={styles.pageTitle}>Discover services</Title1>
            <Subtitle2 className={styles.pageSubtitle}>
              Describe your goal, and I&apos;ll suggest an approach.
            </Subtitle2>
            <CopilotProvider>
              <div className={styles.chatInputWrapper}>
                <ChatInput
                  designVersion="next"
                  aria-label="Describe your goal"
                  placeholderValue="E.g. I want to host a web app with a database..."
                  charactersRemainingMessage={undefined}
                  hideSendWhenEmpty
                  onSubmit={(_ev, data) => {
                    const value = data.value.trim();
                    if (value) {
                      setReasoningComplete(false);
                      setThinkingPrompt(value);
                    }
                  }}
                />
              </div>
            </CopilotProvider>
          </div>
          <div className={styles.contentRow}>
            <div className={styles.centerSection}>
              <div ref={tabsSectionRef} className={styles.tabsSection}>
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
                {selectedFilter !== "favorites" && (
                  <>
                    <div className={styles.tabSeparator} />
                    <div
                      ref={collectionDropdownRef}
                      className={styles.pillDropdownWrapper}
                    >
                      <button
                        className={styles.pillFilter}
                        onClick={() =>
                          setCollectionDropdownOpen((prev) => !prev)
                        }
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
                                if (scrollContainer)
                                  scrollContainer.scrollTop = 0;
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className={styles.sectionsContainer}>
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
                                className={styles.cardClickWrapper}
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
                                  onMouseEnter={() =>
                                    setHoveredCard(
                                      `fav-${category.id}-${service.id}`,
                                    )
                                  }
                                  onMouseLeave={() => setHoveredCard(null)}
                                  onExisting={() =>
                                    onExistingSelect?.({
                                      id: service.id,
                                      name: service.name,
                                      icon: service.icon,
                                    })
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ))}

                {/* Category Sections - hide when "favorites" filter is selected */}
                {selectedFilter !== "favorites" &&
                selectedCategory === "all" ? (
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
                              className={styles.cardClickWrapper}
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
                                onMouseEnter={() =>
                                  setHoveredCard(
                                    `cat-${category.id}-${service.id}`,
                                  )
                                }
                                onMouseLeave={() => setHoveredCard(null)}
                                onExisting={() =>
                                  onExistingSelect?.({
                                    id: service.id,
                                    name: service.name,
                                    icon: service.icon,
                                  })
                                }
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
                        {
                          categories.find((c) => c.id === selectedCategory)
                            ?.name
                        }
                      </div>
                    </div>
                    <div className={styles.servicesGrid}>
                      {filteredServices.map((service) => (
                        <div
                          key={service.id}
                          className={styles.cardClickWrapper}
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
                            onMouseEnter={() =>
                              setHoveredCard(`single-${service.id}`)
                            }
                            onMouseLeave={() => setHoveredCard(null)}
                            onExisting={() =>
                              onExistingSelect?.({
                                id: service.id,
                                name: service.name,
                                icon: service.icon,
                              })
                            }
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
                      const easeOutQuint = (t: number) =>
                        1 - Math.pow(1 - t, 9);
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
                            tabsSectionRef.current?.getBoundingClientRect()
                              .bottom ?? 96;
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
      </div>
      {thinkingPrompt ? (
        <div
          className={mergeClasses(
            styles.thinkingOverlay,
            reasoningComplete && styles.overlayClickable,
          )}
          onClick={
            reasoningComplete
              ? () =>
                  router.push(
                    `/intent-based-discover/prototype/results?q=${encodeURIComponent(thinkingPrompt)}`,
                  )
              : undefined
          }
        >
          <div className={styles.thinkingContent}>
            <CopilotProvider>
              <ReasoningCard
                title="Analyzing your goal"
                hideArtifacts
                revealStepsSequentially
                collapseOnComplete={false}
                steps={[
                  {
                    name: "Parsing your intent",
                    desc: "Understanding what you want to build...",
                  },
                  {
                    name: "Identifying Azure services",
                    desc: "Matching capabilities to your goal...",
                  },
                  {
                    name: "Preparing your recommendations",
                    desc: "Organizing services by relevance...",
                  },
                ]}
                stepDelay={1000}
                isActive={true}
                onComplete={() => {
                  setReasoningComplete(true);
                }}
              />
            </CopilotProvider>
          </div>
        </div>
      ) : null}
    </FluentProvider>
  );
};

export default AllServicesPage;
