"use client";

import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Link,
} from "@fluentui/react-components";
import {
  Open16Regular,
  Add24Regular,
  AppsListDetail24Regular,
  Sparkle24Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import ActionCard, { ActionCardGrid } from "../../shared/action-card";
import ServiceTile, { ServiceTileGrid } from "../../shared/service-tile";
import KubernetesHighlightCard from "./kubernetes-highlight-card";

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
    marginBottom: tokens.spacingVerticalXXL,
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
  highlightSection: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
  highlightTile: {
    borderTopColor: tokens.colorBrandStroke1,
    borderRightColor: tokens.colorBrandStroke1,
    borderBottomColor: tokens.colorBrandStroke1,
    borderLeftColor: tokens.colorBrandStroke1,
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: tokens.shadow8,
  },
  resourceLinks: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    maxWidth: "480px",
  },
  resourceLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase300,
  },
});

const externalLinks = [
  {
    label: "Azure Kubernetes Service documentation",
    href: "https://learn.microsoft.com/azure/aks/",
  },
  {
    label: "AKS learning path",
    href: "https://learn.microsoft.com/training/paths/intro-to-kubernetes-on-azure/",
  },
  {
    label: "Pricing calculator",
    href: "https://azure.microsoft.com/pricing/calculator/",
  },
  { label: "Service health status", href: "https://azure.status.microsoft/" },
];

/** Azure portal home page prototype with a spotlighted Azure Kubernetes Service card:
 * welcome hero, featured Kubernetes highlight, quick-action cards, and popular services
 * where the Kubernetes tile is visually emphasized. */
export default function AzureHomeKubernetesHighlight({
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

        {/* Featured Kubernetes highlight */}
        <div className={styles.highlightSection}>
          <KubernetesHighlightCard
            onPrimaryAction={() => go("/create-vm")}
            onSecondaryAction={() =>
              window.open("https://learn.microsoft.com/azure/aks/", "_blank")
            }
            onCopilotAction={() => go("/agents")}
          />
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

        {/* Popular services — Kubernetes tile emphasized */}
        <div className={styles.section}>
          <Text as="h2" className={styles.sectionTitle}>
            Popular services
          </Text>
          <ServiceTileGrid columns={3}>
            <ServiceTile
              icon="/icons/Kubernetes-Services.svg"
              name="Kubernetes services"
              description="Deploy and manage containerized applications at scale."
              badge="Featured"
              className={styles.highlightTile}
              onClick={() => go("/all-services")}
            />
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
          </ServiceTileGrid>
        </div>

        {/* Kubernetes resources */}
        <div className={styles.section}>
          <Text as="h2" className={styles.sectionTitle}>
            Kubernetes resources
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
  );
}
