"use client";

import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Link,
  Divider,
} from "@fluentui/react-components";
import {
  ChevronRight16Regular,
  Open16Regular,
  Add24Regular,
  AppsListDetail24Regular,
  Sparkle24Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import ActionCard, { ActionCardGrid } from "../../shared/action-card";
import ServiceTile, { ServiceTileGrid } from "../../shared/service-tile";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
    boxSizing: "border-box",
  },
  hero: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
    color: tokens.colorNeutralForeground1,
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
    display: "block",
  },
  section: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "48px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    fontFamily: tokens.fontFamilyBase,
    transitionDuration: tokens.durationNormal,
    transitionProperty: "background-color, border-color, box-shadow",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
      boxShadow: tokens.shadow4,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: tokens.colorStrokeFocus2,
      outlineOffset: "2px",
    },
  },
  linkRowLabel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  linkRowMeta: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3,
  },
  chevron: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  resourceLinks: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
  },
  resourceLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase300,
  },
  divider: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
});

interface QuickLink {
  id: string;
  title: string;
  meta: string;
  route: string;
}

const recentResources: QuickLink[] = [
  {
    id: "rg-prod",
    title: "rg-production",
    meta: "Resource group · East US",
    route: "/resource-manager-mvp",
  },
  {
    id: "vm-web01",
    title: "vm-web-01",
    meta: "Virtual machine · Running",
    route: "/create-vm",
  },
  {
    id: "sql-orders",
    title: "sql-orders-db",
    meta: "SQL database · Online",
    route: "/all-services",
  },
  {
    id: "storage-assets",
    title: "stassets2026",
    meta: "Storage account · Available",
    route: "/all-services",
  },
];

const navLinks: QuickLink[] = [
  {
    id: "all-services",
    title: "All services",
    meta: "Browse the full Azure catalog",
    route: "/all-services",
  },
  {
    id: "search",
    title: "Search resources",
    meta: "Find resources, services, and docs",
    route: "/search",
  },
  {
    id: "agents",
    title: "Copilot & agents",
    meta: "Automate tasks with AI agents",
    route: "/agents",
  },
];

const externalLinks = [
  { label: "Azure documentation", href: "https://learn.microsoft.com/azure/" },
  {
    label: "Microsoft Learn",
    href: "https://learn.microsoft.com/training/azure/",
  },
  {
    label: "Pricing calculator",
    href: "https://azure.microsoft.com/pricing/calculator/",
  },
  { label: "Service health status", href: "https://azure.status.microsoft/" },
];

/** Azure portal home page: welcome hero, quick-action cards, popular services,
 * recent resources, navigation shortcuts, and external resource links — all clickable. */
export default function AzureHomePage({
  isDarkMode = false,
}: {
  isDarkMode?: boolean;
}) {
  const styles = useStyles();
  const router = useRouter();
  const go = (route: string) => router.push(route);

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP activeLink="Home" isDarkMode={isDarkMode} />

      <div className={styles.content}>
        <div className={styles.hero}>
          <Text as="h1" className={styles.title}>
            Welcome to Azure
          </Text>
          <Text as="p" className={styles.subtitle}>
            Build, manage, and monitor everything from apps to infrastructure in
            one place.
          </Text>
        </div>

        {/* Quick actions */}
        <div className={styles.section}>
          <Text as="h2" className={styles.sectionTitle}>
            Get started
          </Text>
          <ActionCardGrid columns={3}>
            <ActionCard
              icon={Add24Regular}
              iconBackground
              title="Create a resource"
              description="Deploy virtual machines, databases, web apps, and more."
              buttonText="Create"
              onClick={() => go("/create-vm")}
            />
            <ActionCard
              icon={AppsListDetail24Regular}
              iconBackground
              title="Explore services"
              description="Browse the full catalog to find the right Azure service."
              buttonText="Explore services"
              onClick={() => go("/all-services")}
            />
            <ActionCard
              icon={Sparkle24Regular}
              iconBackground
              title="Build with AI"
              description="Create AI apps and agents using the latest models."
              buttonText="Go to AI Foundry"
              onClick={() => go("/agents")}
            />
          </ActionCardGrid>
        </div>

        {/* Popular services */}
        <div className={styles.section}>
          <Text as="h2" className={styles.sectionTitle}>
            Popular services
          </Text>
          <ServiceTileGrid columns={3}>
            <ServiceTile
              icon="/icons/virtual-machine.svg"
              name="Virtual machines"
              description="Run scalable Linux and Windows compute on demand."
              free
              onClick={() => go("/create-vm")}
            />
            <ServiceTile
              icon="/icons/Static-Web-Apps.svg"
              name="Web App"
              description="Host web apps without managing infrastructure."
              free
              onClick={() => go("/all-services")}
            />
            <ServiceTile
              icon="/icons/SQL-Database.svg"
              name="SQL databases"
              description="Set up a scalable, secure relational database."
              free
              onClick={() => go("/all-services")}
            />
            <ServiceTile
              icon="/icons/Storage.svg"
              name="Storage accounts"
              description="Durable, highly available object and file storage."
              onClick={() => go("/all-services")}
            />
            <ServiceTile
              icon="/icons/Function-App.svg"
              name="Function App"
              description="Run event-driven serverless code."
              free
              onClick={() => go("/all-services")}
            />
            <ServiceTile
              icon="/icons/Kubernetes-Services.svg"
              name="Kubernetes services"
              description="Deploy and manage containerized applications."
              onClick={() => go("/all-services")}
            />
          </ServiceTileGrid>
        </div>

        {/* Recent + navigation + resources */}
        <div className={styles.columns}>
          <div className={styles.section}>
            <Text as="h2" className={styles.sectionTitle}>
              Recent resources
            </Text>
            <div className={styles.linkList}>
              {recentResources.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.linkRow}
                  onClick={() => go(item.route)}
                >
                  <span className={styles.linkRowLabel}>
                    <span>{item.title}</span>
                    <span className={styles.linkRowMeta}>{item.meta}</span>
                  </span>
                  <ChevronRight16Regular className={styles.chevron} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <Text as="h2" className={styles.sectionTitle}>
              Navigate
            </Text>
            <div className={styles.linkList}>
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.linkRow}
                  onClick={() => go(item.route)}
                >
                  <span className={styles.linkRowLabel}>
                    <span>{item.title}</span>
                    <span className={styles.linkRowMeta}>{item.meta}</span>
                  </span>
                  <ChevronRight16Regular className={styles.chevron} />
                </button>
              ))}
            </div>

            <Divider className={styles.divider} />

            <Text as="h2" className={styles.sectionTitle}>
              Useful links
            </Text>
            <div className={styles.resourceLinks}>
              {externalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.resourceLink}
                >
                  {link.label}
                  <Open16Regular />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
