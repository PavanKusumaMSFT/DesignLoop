"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Text,
  Title1,
  Body1,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Divider,
} from "@fluentui/react-components";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { useNavigation } from "../../../lib/navigation-context";
import { matchPrompt } from "./intent-canned-data";
import SuggestedArchItem from "./suggested-arch-item";
import type { ArchService } from "./suggested-arch-item";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ─── Architecture solution data ──────────────────────────────────────────────

const WEB_APP_SOLUTION: {
  title: string;
  subtitle: string;
  architectureDiagramUrl: string;
  docsUrl: string;
  totalCost: string;
  services: ArchService[];
} = {
  title: "Basic web application",
  subtitle:
    "App Service and Azure SQL Database are the simplest path to a web app with a database on Azure. App Service runs your code without managing servers — HTTPS, scaling, and deployment slots are built in. Azure SQL connects via a connection string in app settings. Microsoft Entra Easy Auth adds sign-in with no code changes, and Application Insights captures requests, exceptions, and SQL query telemetry from day one. Use this to validate your app and build CI/CD before you need production-grade reliability.",
  architectureDiagramUrl:
    "https://learn.microsoft.com/en-us/azure/architecture/web-apps/app-service/_images/basic-app-service-architecture-flow.svg",
  docsUrl:
    "https://learn.microsoft.com/en-us/azure/architecture/web-apps/app-service/architectures/basic-web-app",
  totalCost: "~$81/month",
  services: [
    {
      id: "app-services",
      name: "App Service",
      role: "Web hosting",
      tier: "Standard S1",
      cost: "$73/mo",
      icon: "/azure-service-icons/app services/10035-icon-service-App-Services.svg",
      description:
        "Deploy your web application code. Azure manages OS patching, load balancing, and SSL certificates on azurewebsites.net.",
      features: [
        "HTTPS included on azurewebsites.net",
        "CI/CD from GitHub or Azure DevOps",
        "Easy Auth with Microsoft Entra ID",
        "Auto-scale rules (Standard tier)",
      ],
      docsUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview",
    },
    {
      id: "azure-sql",
      name: "Azure SQL Database",
      role: "Relational database",
      tier: "Basic DTU",
      cost: "$4.90/mo",
      icon: "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
      description:
        "Fully managed relational database. Connect from App Service via a connection string stored in app settings.",
      features: [
        "Automated backups & point-in-time restore",
        "TLS-encrypted connections",
        "SQL Server-compatible dialect",
        "Scale DTUs without downtime",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
    },
    {
      id: "app-insights",
      name: "Application Insights",
      role: "Monitoring",
      tier: "Pay-per-use",
      cost: "~$3/mo",
      icon: "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
      description:
        "Automatically capture requests, exceptions, dependencies, and performance metrics from your app and database calls.",
      features: [
        "Live metrics & request tracing",
        "Exception and failure tracking",
        "SQL and HTTP dependency monitoring",
        "Query telemetry with KQL",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview",
    },
    {
      id: "entra-id",
      name: "Microsoft Entra ID",
      role: "Authentication",
      tier: "Free tier",
      cost: "Free",
      icon: "/azure-service-icons/identity/03400-icon-Entra-Identity.svg",
      description:
        "Enable Easy Auth in App Service to protect your web app with Microsoft Entra ID — no code changes required.",
      features: [
        "Zero code changes (App Service built-in)",
        "Microsoft, Google, or custom OIDC providers",
        "Protects all routes automatically",
        "Managed identity for SQL authentication",
      ],
      docsUrl: "https://learn.microsoft.com/en-us/entra/fundamentals/whatis",
    },
  ],
};

const BASELINE_SOLUTION: {
  title: string;
  subtitle: string;
  architectureDiagramUrl: string;
  docsUrl: string;
  totalCost: string;
  services: ArchService[];
} = {
  title: "Baseline zone-redundant web app",
  subtitle:
    "This architecture adds the security and reliability controls the basic pattern omits. Application Gateway with Web Application Firewall is the single public entry point — App Service never receives direct internet traffic. All traffic between App Service, SQL Database, and Key Vault travels over Private Link inside a Virtual Network, with public endpoints blocked. App Service and SQL Database deploy across availability zones so a single datacenter failure doesn't take your app offline. Choose this when compliance, uptime, or data sensitivity makes the simpler setup insufficient.",
  architectureDiagramUrl:
    "https://learn.microsoft.com/en-us/azure/architecture/web-apps/app-service/_images/baseline-app-service-architecture.svg",
  docsUrl:
    "https://learn.microsoft.com/en-us/azure/architecture/web-apps/app-service/architectures/baseline-zone-redundant",
  totalCost: "~$678/month",
  services: [
    {
      id: "app-gateways",
      name: "Application Gateway",
      role: "Load balancer + WAF",
      tier: "WAF_v2",
      cost: "~$219/mo",
      icon: "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg",
      description:
        "Layer-7 load balancer with integrated Web Application Firewall. Single public entry point that terminates TLS, inspects traffic, and routes requests to App Service through a private endpoint.",
      features: [
        "Azure Web Application Firewall (WAF_v2)",
        "TLS termination and end-to-end encryption",
        "Zone-redundant with autoscaling",
        "Private endpoint routing to App Service",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/application-gateway/overview",
    },
    {
      id: "app-services",
      name: "App Service",
      role: "Web hosting",
      tier: "Premium P2v3 (3 instances)",
      cost: "~$249/mo",
      icon: "/azure-service-icons/app services/10035-icon-service-App-Services.svg",
      description:
        "Zone-redundant web hosting with virtual network integration. Public access is blocked — all inbound traffic arrives through the Application Gateway private endpoint.",
      features: [
        "Availability zone redundancy (3+ instances)",
        "VNet integration for private outbound traffic",
        "Private endpoint for inbound isolation",
        "Easy Auth with Microsoft Entra ID",
      ],
      docsUrl: "https://learn.microsoft.com/en-us/azure/app-service/overview",
    },
    {
      id: "azure-sql",
      name: "Azure SQL Database",
      role: "Relational database",
      tier: "General Purpose, zone-redundant",
      cost: "~$185/mo",
      icon: "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
      description:
        "Zone-redundant managed database with private endpoint. Public network access is denied — App Service connects through the virtual network via Private Link.",
      features: [
        "Zone-redundant high availability",
        "Private endpoint (no public access)",
        "Transparent data encryption at rest",
        "Zone-redundant backup storage (ZRS)",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
    },
    {
      id: "key-vaults",
      name: "Key Vault",
      role: "Secrets & certificates",
      tier: "Standard",
      cost: "~$5/mo",
      icon: "/azure-service-icons/security/10245-icon-service-Key-Vaults.svg",
      description:
        "Stores TLS certificates for Application Gateway and application secrets for App Service. Accessed via private endpoint — public access is blocked.",
      features: [
        "TLS certificate storage for App Gateway",
        "App Service Key Vault references",
        "Private endpoint (no public access)",
        "Managed identity access (no passwords)",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/key-vault/general/overview",
    },
    {
      id: "vnets",
      name: "Virtual Network",
      role: "Network isolation",
      tier: "Standard",
      cost: "~$10/mo",
      icon: "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg",
      description:
        "Provides isolated subnets for Application Gateway, App Service VNet integration, and private endpoints. Private DNS zones resolve PaaS service FQDNs to private endpoint IPs.",
      features: [
        "Dedicated subnets per workload tier",
        "Network security groups on each subnet",
        "Private DNS zones for PaaS services",
        "DDoS protection on App Gateway subnet",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
    },
    {
      id: "app-insights",
      name: "Application Insights",
      role: "Monitoring",
      tier: "Pay-per-use",
      cost: "~$10/mo",
      icon: "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
      description:
        "Collects request traces, exceptions, dependency calls, and performance metrics from App Service, Application Gateway, and SQL Database.",
      features: [
        "Distributed tracing across all tiers",
        "Application Gateway access logs",
        "SQL Database monitoring via Database Watcher",
        "Custom alerts and Log Analytics queries",
      ],
      docsUrl:
        "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview",
    },
  ],
};

// ─── Styles ──────────────────────────────────────────────────────────────────

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
    backgroundColor: tokens.colorNeutralBackground1,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1480px",
    margin: "0 auto",
    padding: "0",
  },
  contentRow: {
    display: "flex",
    width: "100%",
    padding: `0 ${tokens.spacingHorizontalXXL} 100px`,
  },
  breadcrumbBar: {
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  breadcrumbBarWrapper: {
    flexShrink: 0,
  },
  pageTitle: {
    paddingTop: "48px",
    paddingBottom: tokens.spacingVerticalXXL,
    display: "block",
  },
  fullWidth: {
    width: "100%",
  },
  archsStack: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  dividerWrapper: {
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
});

// ─── Component ───────────────────────────────────────────────────────────────

export interface IntentResultsProps {
  prompt: string;
  onServiceSelect?: (serviceId: string) => void;
}

/** Intent results page — shows an opinionated architecture solution for the user's stated goal. */
export default function IntentResults({
  prompt,
  onServiceSelect,
}: IntentResultsProps) {
  const styles = useStyles();
  const router = useRouter();
  const { setSelectedPage } = useNavigation();

  useEffect(() => {
    setSelectedPage("all-services");
    return () => setSelectedPage(null);
  }, [setSelectedPage]);

  const resultKey = matchPrompt(prompt);
  const isWebApp = resultKey === "web-app-database";
  const solution = WEB_APP_SOLUTION;

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {/* Sticky header */}
        <div className={styles.stickyNav}>
          <AzureHeaderBuildMVP
            activeLink="Discover"
            navItemLabels={{ "all-services": "Discover services" }}
          />
        </div>

        <div className={styles.breadcrumbBarWrapper}>
          <div className={styles.breadcrumbBar}>
            <Breadcrumb aria-label="Breadcrumb" size="medium">
              <BreadcrumbItem>
                <BreadcrumbButton
                  onClick={() =>
                    router.push("/intent-based-discover/prototype")
                  }
                >
                  Home
                </BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider />
              <BreadcrumbItem>
                <BreadcrumbButton onClick={() => router.back()}>
                  Discover services
                </BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider />
              <BreadcrumbItem>
                <BreadcrumbButton current>{prompt}</BreadcrumbButton>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        <div className={styles.scrollArea}>
          <div className={styles.mainContent}>
            <div className={styles.contentRow}>
              {/* Page title */}
              <div className={styles.fullWidth}>
                <Title1 className={styles.pageTitle}>{prompt}</Title1>

                {isWebApp ? (
                  <div className={styles.archsStack}>
                    <SuggestedArchItem
                      title="Basic web app"
                      subtitle={solution.subtitle}
                      architectureDiagramUrl={solution.architectureDiagramUrl}
                      architectureDiagramAlt="Basic web app architecture diagram showing user, App Service, SQL Database, Application Insights, and Microsoft Entra ID"
                      docsUrl={solution.docsUrl}
                      totalCost={solution.totalCost}
                      pricingCalculatorUrl="https://azure.com/e/a5e725c0fda44d4286fd1836976f56f8"
                      services={solution.services}
                      onServiceSelect={onServiceSelect}
                    />
                    <div className={styles.dividerWrapper}>
                      <Divider />
                    </div>
                    <SuggestedArchItem
                      label="Production-ready architecture"
                      title={BASELINE_SOLUTION.title}
                      subtitle={BASELINE_SOLUTION.subtitle}
                      architectureDiagramUrl={
                        BASELINE_SOLUTION.architectureDiagramUrl
                      }
                      architectureDiagramAlt="Baseline zone-redundant web app architecture diagram showing Application Gateway, App Service, SQL Database, Key Vault, and Virtual Network with private endpoints"
                      docsUrl={BASELINE_SOLUTION.docsUrl}
                      totalCost={BASELINE_SOLUTION.totalCost}
                      pricingCalculatorUrl="https://azure.com/e/04fa6a287c1d47f9af40c91e4202f238"
                      services={BASELINE_SOLUTION.services}
                      onServiceSelect={onServiceSelect}
                    />
                  </div>
                ) : (
                  <Card>
                    <Body1>
                      We didn&apos;t find a specific architecture recommendation
                      for your goal. Try describing what you want to build — for
                      example, &ldquo;build a web app with a database&rdquo; —
                      and we&apos;ll suggest an opinionated Azure solution.
                    </Body1>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}
