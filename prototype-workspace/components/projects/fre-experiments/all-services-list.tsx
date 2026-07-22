"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Input,
  Badge,
} from "@fluentui/react-components";
import {
  Search16Regular,
  ChevronUp20Regular,
  ChevronDown20Regular,
} from "@fluentui/react-icons";
import {
  categories,
  services,
  type Service,
} from "../build-2026/all-services-data";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const featuredServices = [
  { name: "Microsoft\nEntra ID", icon: "/azure-service-icons/identity/03400-icon-Entra-Identity.svg" },
  { name: "Virtual\nmachines", icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
  { name: "App Services", icon: "/azure-service-icons/web/10035-icon-service-App-Services.svg" },
  { name: "Storage\naccounts", icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg" },
  { name: "Cost\nManagement", icon: "/azure-service-icons/general/00004-icon-service-Cost-Management-and-Billing.svg" },
  { name: "Virtual\nnetworks", icon: "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg" },
];

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
  },
  layout: {
    display: "flex",
    flex: 1,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  sidebar: {
    width: "160px",
    flexShrink: 0,
    paddingRight: tokens.spacingHorizontalL,
    position: "sticky" as const,
    top: "0",
    alignSelf: "flex-start",
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto" as const,
  },
  sidebarItem: {
    display: "block",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    border: "none",
    background: "none",
    textAlign: "left" as const,
    width: "100%",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sidebarItemActive: {
    display: "block",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    border: "none",
    background: "none",
    textAlign: "left" as const,
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1Selected,
    fontWeight: tokens.fontWeightSemibold,
  },
  sidebarLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingLeft: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalXS,
    display: "block",
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  filterInput: {
    width: "200px",
  },
  filterPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusCircular,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  filterPillLabel: {
    color: tokens.colorNeutralForeground2,
  },
  filterPillValue: {
    fontWeight: tokens.fontWeightSemibold,
  },
  featuredRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalL,
  },
  featuredItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
    cursor: "pointer",
  },
  featuredIcon: {
    width: "36px",
    height: "36px",
  },
  featuredName: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground1,
    textAlign: "center" as const,
    lineHeight: tokens.lineHeightBase100,
    whiteSpace: "pre-line" as const,
  },
  categorySection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalM,
  },
  categoryTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  categoryCount: {
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    marginLeft: tokens.spacingHorizontalS,
  },
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingVerticalXS,
  },
  serviceItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  serviceIcon: {
    width: "18px",
    height: "18px",
    flexShrink: 0,
  },
  serviceName: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden" as const,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
});

export interface AllServicesListProps {
  customHeader?: React.ReactNode;
}

/** All Services list view with left sidebar category nav, matching Azure portal layout. */
export default function AllServicesList({ customHeader }: AllServicesListProps) {
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const servicesByCategory = useMemo(() => {
    const map: Record<string, Service[]> = {};
    for (const cat of categories) {
      map[cat.id] = services.filter((s) => s.category === cat.id);
    }
    return map;
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((cat) =>
      servicesByCategory[cat.id]?.some((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, servicesByCategory]);

  const getFilteredServices = (categoryId: string) => {
    const catServices = servicesByCategory[categoryId] || [];
    if (!searchQuery.trim()) return catServices;
    return catServices.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = categoryRefs.current[categoryId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Make sure the category is expanded
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      next.delete(categoryId);
      return next;
    });
  };

  return (
    <div className={styles.root}>
      {customHeader}
      <Text className={styles.pageTitle}>All services</Text>
      <div className={styles.layout}>
        {/* Left sidebar */}
        <div className={styles.sidebar}>
          <button
            className={activeCategory === "all" ? styles.sidebarItemActive : styles.sidebarItem}
            onClick={() => { setActiveCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            All
          </button>
          <button className={styles.sidebarItem}>Favorites</button>
          <button className={styles.sidebarItem}>Recents</button>
          <Text className={styles.sidebarLabel}>Categories</Text>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={activeCategory === cat.id ? styles.sidebarItemActive : styles.sidebarItem}
              onClick={() => scrollToCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className={styles.mainContent}>
          <div className={styles.toolbar}>
            <Input
              className={styles.filterInput}
              contentBefore={<Search16Regular />}
              placeholder="Filter services"
              value={searchQuery}
              onChange={(_, data) => setSearchQuery(data.value)}
              size="small"
            />
            <span className={styles.filterPill}>
              <span className={styles.filterPillLabel}>Service providers :</span>{" "}
              <span className={styles.filterPillValue}>All</span>
            </span>
            <span className={styles.filterPill}>
              <span className={styles.filterPillLabel}>Release Status :</span>{" "}
              <span className={styles.filterPillValue}>All</span>
            </span>
          </div>

          {/* Featured row */}
          <div className={styles.featuredRow}>
            {featuredServices.map((svc) => (
              <div key={svc.name} className={styles.featuredItem}>
                <img src={svc.icon} alt={svc.name} className={styles.featuredIcon} />
                <Text className={styles.featuredName}>{svc.name}</Text>
              </div>
            ))}
          </div>

          {/* Category sections */}
          {filteredCategories.map((cat) => {
            const catServices = getFilteredServices(cat.id);
            if (catServices.length === 0) return null;
            const isCollapsed = collapsedCategories.has(cat.id);

            return (
              <div
                key={cat.id}
                className={styles.categorySection}
                ref={(el) => { categoryRefs.current[cat.id] = el; }}
              >
                <div
                  className={styles.categoryHeader}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <Text>
                    <span className={styles.categoryTitle}>{cat.name}</span>
                    <span className={styles.categoryCount}>({catServices.length})</span>
                  </Text>
                  {isCollapsed ? <ChevronDown20Regular /> : <ChevronUp20Regular />}
                </div>
                {!isCollapsed && (
                  <div className={styles.serviceGrid}>
                    {catServices.map((svc) => (
                      <div key={svc.id} className={styles.serviceItem}>
                        <img src={svc.icon} alt="" className={styles.serviceIcon} />
                        <Text className={styles.serviceName}>{svc.name}</Text>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
