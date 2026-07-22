"use client";

import { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Button,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Database24Regular,
  Storage24Regular,
  Shield24Regular,
  Cloud24Regular,
  ChevronRight20Regular,
  Search24Regular,
  ChevronLeft24Regular,
} from "@fluentui/react-icons";
import { TopNav } from "../../shared/top-nav";
import { useNavigation } from "../../../lib/navigation-context";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
  },
  sideNav: {
    width: "280px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 0",
    overflowY: "auto",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    marginBottom: "16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    transition: "all 0.2s",
    ":hover": {
      color: tokens.colorBrandForeground1,
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  searchContainer: {
    padding: "0 16px 16px 16px",
    marginBottom: "8px",
  },
  searchInput: {
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: tokens.colorNeutralBackground2,
    outline: "none",
  },
  navSection: {
    marginBottom: "16px",
  },
  navSectionTitle: {
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  navItem: {
    padding: "8px 16px 8px 32px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    borderLeft: `3px solid ${tokens.colorBrandForeground1}`,
    paddingLeft: "29px",
  },
  navItemIcon: {
    fontSize: "16px",
  },
  mainContent: {
    flex: 1,
    padding: "40px 48px",
    maxWidth: "1200px",
    width: "100%",
    overflowY: "auto",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    maxWidth: "800px",
  },
  tabsContainer: {
    display: "flex",
    gap: "32px",
    marginBottom: "32px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tab: {
    padding: "12px 0",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  tabActive: {
    color: tokens.colorBrandForeground1,
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "24px",
  },
  comparisonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "48px",
  },
  serviceCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s ease",
    cursor: "pointer",
    ":hover": {
      boxShadow: tokens.shadow4,
    },
  },
  serviceHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  serviceIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  serviceName: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  serviceDescription: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginBottom: "20px",
    flex: 1,
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  featureItem: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    lineHeight: "1.4",
  },
  bullet: {
    marginTop: "4px",
    fontSize: "8px",
    color: tokens.colorBrandForeground1,
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  link: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    ":hover": {
      textDecoration: "underline",
    },
  },
  createButton: {
    marginTop: "auto",
  },
  backIcon: {
    fontSize: "20px",
  },
  serviceImg: {
    width: "24px",
    height: "24px",
  },
  linkIcon: {
    fontSize: "12px",
  },
});

interface ServiceHubsProps {
  experienceLevel?: "new" | "smb" | "enterprise";
}

const ServiceHubs = ({ experienceLevel = "new" }: ServiceHubsProps) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [activeTab, setActiveTab] = useState("Get started");
  const [activeNavItem, setActiveNavItem] = useState("Overview");

  const tabs = ["Get started", "Insights", "What's new"];

  const navSections = [
    {
      title: "",
      items: [
        "Overview",
        "Azure Firewalls",
        "DDoS protection",
        "Web application firewall",
      ],
    },
    {
      title: "Related services",
      items: ["Virtual networks", "Azure Front Door"],
    },
  ];

  const networkSecurityServices = [
    {
      name: "Azure Firewall",
      icon: "/icons/Firewalls.svg",
      description: "Network and transport layer filtering (L3, L4).",
      bestFor: [
        "FQDN filtering",
        "DNS Proxy",
        "Tag-based management",
        "Threat intelligence",
      ],
      compatibleWith: ["Virtual network", "Virtual hub"],
      links: [
        { text: "Documentation", url: "#" },
        { text: "API references", url: "#" },
        { text: "Ask Azure community", url: "#" },
      ],
    },
    {
      name: "DDoS protection",
      icon: "/icons/DDoS-Protection-Plans.svg",
      description: "Multi-layer DDoS attack protection (L3, L4).",
      bestFor: [
        "Traffic monitoring",
        "Real-time tuning",
        "Telemetry and alerts",
        "Attack mitigation",
      ],
      compatibleWith: ["Virtual network", "Public IP"],
      links: [
        { text: "Documentation", url: "#" },
        { text: "API references", url: "#" },
        { text: "Ask Azure community", url: "#" },
      ],
    },
    {
      name: "Web Application Firewall",
      icon: "/icons/Web-Application-Firewall-Policies.svg",
      description: "Application layer protection (L7).",
      bestFor: [
        "OWASP top 10",
        "SSL/TLS inspection",
        "Bot protection",
        "DDoS mitigation",
      ],
      compatibleWith: ["Application Gateway", "Front Door"],
      links: [
        { text: "Documentation", url: "#" },
        { text: "API references", url: "#" },
        { text: "Ask Azure community", url: "#" },
      ],
    },
  ];

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav activeLink="Discover" experienceLevel={experienceLevel} />

        <div className={styles.contentWrapper}>
          {/* Side Navigation */}
          <div className={styles.sideNav}>
            <button
              className={styles.backButton}
              onClick={() => handlePageChange("discover")}
            >
              <ChevronLeft24Regular className={styles.backIcon} />
              <span>Back to Discover</span>
            </button>

            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
              />
            </div>

            {navSections.map((section, idx) => (
              <div key={idx} className={styles.navSection}>
                {section.title && (
                  <div className={styles.navSectionTitle}>{section.title}</div>
                )}
                {section.items.map((item) => (
                  <div
                    key={item}
                    className={`${styles.navItem} ${activeNavItem === item ? styles.navItemActive : ""}`}
                    onClick={() => setActiveNavItem(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Header */}
            <div className={styles.header}>
              <h1 className={styles.title}>Network security</h1>
              <p className={styles.subtitle}>
                Protect your network, apps, and resources from threats. Defend
                against attacks, filter and monitor traffic, and block
                vulnerabilities with products built on Azure Zero Trust™
                principles.
              </p>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Recommended Solutions Section */}
            <div className={styles.sectionTitle}>Recommended solutions</div>

            <div className={styles.comparisonGrid}>
              {networkSecurityServices.map((service, index) => (
                <div
                  key={index}
                  className={styles.serviceCard}
                  onClick={() => handlePageChange("create-resource-2")}
                >
                  {/* Service Header */}
                  <div className={styles.serviceHeader}>
                    <div className={styles.serviceIcon}>
                      <img
                        src={service.icon}
                        alt={service.name}
                        className={styles.serviceImg}
                      />
                    </div>
                    <div className={styles.serviceName}>{service.name}</div>
                  </div>

                  {/* Description */}
                  <div className={styles.serviceDescription}>
                    {service.description}
                  </div>

                  {/* Best For Section */}
                  <div>
                    <div className={styles.sectionLabel}>Best for</div>
                    <div className={styles.featureList}>
                      {service.bestFor.map((feature, idx) => (
                        <div key={idx} className={styles.featureItem}>
                          <span className={styles.bullet}>●</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compatible With Section */}
                  <div>
                    <div className={styles.sectionLabel}>Compatible with</div>
                    <div className={styles.featureList}>
                      {service.compatibleWith.map((item, idx) => (
                        <div key={idx} className={styles.featureItem}>
                          <span className={styles.bullet}>●</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* References Section */}
                  <div>
                    <div className={styles.sectionLabel}>References</div>
                    <div className={styles.linkList}>
                      {service.links.map((link, idx) => (
                        <a key={idx} href={link.url} className={styles.link}>
                          {link.text}
                          <ChevronRight20Regular className={styles.linkIcon} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Create Button */}
                  <Button
                    appearance="primary"
                    className={styles.createButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePageChange("create-resource-2");
                    }}
                  >
                    Create
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default ServiceHubs;
