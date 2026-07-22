"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Button,
  Text,
  Card,
  Divider,
  Link,
  makeStyles,
  tokens as fluentTokens,
} from "@fluentui/react-components";
import {
  Add20Regular,
  Open16Regular,
  List16Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../../../lib/navigation-context";
import { services, categories, serviceCostBasis } from "./all-services-data";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ─── Rich content types ────────────────────────────────────────────────────

interface PricingTier {
  name: string;
  price: string;
  description: string;
}

interface Alternative {
  name: string;
  reason: string;
  serviceId?: string;
  learnUrl?: string;
}

interface ServiceContent {
  tagline: string;
  overview: string;
  whenToUse: string[];
  alternatives: Alternative[];
  howItWorks: string;
  architectureImageUrl?: string;
  pricing: {
    model: string;
    tiers: PricingTier[];
  };
  learnUrls: {
    overview: string;
    whenToUse: string;
    howItWorks: string;
    training: string;
    getStarted: string;
    documentation: string;
  };
}

// ─── Rich content for featured services ───────────────────────────────────

const richContent: Record<string, ServiceContent> = {
  vm: {
    tagline: "Scalable, on-demand compute in the cloud",
    overview:
      "Azure Virtual Machines give you the flexibility of virtualization without the need to buy and maintain physical hardware. You choose the operating system, CPU, memory, and storage to match your workload — and pay only for what you use. VMs are available across dozens of regions worldwide and can be provisioned in seconds.",
    whenToUse: [
      "You need full control over the OS, installed software, or runtime environment",
      "You're lifting and shifting an existing on-premises workload to the cloud without re-architecture",
      "Your application requires specific hardware capabilities — GPU, high-memory, or high-compute SKUs",
      "You're running legacy software that isn't containerized or serverless-compatible",
      "You need a persistent, long-running server such as a game server, build agent, or database backend",
    ],
    alternatives: [
      {
        name: "Azure App Service",
        reason:
          "If you're hosting a web app or API and don't need OS-level control, App Service is fully managed and scales automatically.",
        serviceId: "app-services",
        learnUrl: "https://learn.microsoft.com/azure/app-service/overview",
      },
      {
        name: "Azure Container Apps",
        reason:
          "If your workload is containerized, Container Apps runs containers serverlessly without managing VMs.",
        serviceId: "container-apps",
        learnUrl: "https://learn.microsoft.com/azure/container-apps/overview",
      },
      {
        name: "Azure Kubernetes Service",
        reason:
          "For containerized microservices that need orchestration, scheduling, and auto-scaling across many containers.",
        serviceId: "aks",
        learnUrl: "https://learn.microsoft.com/azure/aks/intro-kubernetes",
      },
      {
        name: "Azure Functions",
        reason:
          "For event-driven, short-lived compute tasks where you want to pay per execution rather than per hour.",
        serviceId: "function-app",
        learnUrl:
          "https://learn.microsoft.com/azure/azure-functions/functions-overview",
      },
    ],
    howItWorks:
      "When you create a VM, Azure provisions a hypervisor-isolated guest on physical hardware in your chosen region. You select a VM series — D-series for general purpose, N-series for GPU, E-series for memory-optimized — attach one or more managed disks for storage, and configure networking via a Virtual Network. The VM boots from an OS image (Windows, Ubuntu, RHEL, and more), and you connect via RDP or SSH. Scale vertically by resizing the VM, or horizontally by adding more VMs behind a load balancer or using Virtual Machine Scale Sets for automated scaling.",
    architectureImageUrl:
      "https://learn.microsoft.com/azure/architecture/reference-architectures/n-tier/images/single-vm-diagram.svg",
    pricing: {
      model:
        "Billed per second of compute time. Reserved instances (1- or 3-year commitment) offer up to 72% savings versus pay-as-you-go.",
      tiers: [
        {
          name: "Free tier — B1s",
          price: "Free",
          description:
            "750 hours/month of B1s Windows or Linux VM included in the Azure free account for the first 12 months",
        },
        {
          name: "B1s — Burstable",
          price: "~$7.59 / month",
          description: "1 vCPU · 1 GB RAM — dev/test and low-traffic workloads",
        },
        {
          name: "D2s v5 — General Purpose",
          price: "~$69.35 / month",
          description: "2 vCPUs · 8 GB RAM — typical production workloads",
        },
        {
          name: "E4s v5 — Memory Optimized",
          price: "~$202 / month",
          description: "4 vCPUs · 32 GB RAM — in-memory caches and databases",
        },
        {
          name: "NC6s v3 — GPU",
          price: "~$2,628 / month",
          description:
            "6 vCPUs · 112 GB RAM · 1× V100 GPU — ML training and rendering",
        },
      ],
    },
    learnUrls: {
      overview: "https://learn.microsoft.com/azure/virtual-machines/overview",
      whenToUse: "https://learn.microsoft.com/azure/virtual-machines/sizes",
      howItWorks:
        "https://learn.microsoft.com/azure/virtual-machines/overview#how-does-azure-virtual-machines-work",
      training:
        "https://learn.microsoft.com/training/paths/azure-administrator-manage-compute-resources/",
      getStarted:
        "https://learn.microsoft.com/azure/virtual-machines/quick-create-portal",
      documentation: "https://learn.microsoft.com/azure/virtual-machines/",
    },
  },

  "azure-sql": {
    tagline: "Fully managed, intelligent relational database in the cloud",
    overview:
      "Azure SQL Database is a fully managed platform-as-a-service (PaaS) database engine that handles upgrading, patching, backups, and monitoring without user involvement. Built on the latest stable version of Microsoft SQL Server, it delivers predictable performance with dynamic scalability, built-in high availability, and intelligent optimizations like automatic index tuning.",
    whenToUse: [
      "You're building a new cloud-native application that needs a relational schema",
      "You're migrating an existing SQL Server database to the cloud with minimal re-work",
      "Your workload has variable traffic and benefits from serverless auto-scaling and auto-pause",
      "You need built-in high availability (99.99% SLA), geo-replication, and point-in-time restore",
      "You want automatic index tuning, query performance insights, and threat detection without DBA overhead",
    ],
    alternatives: [
      {
        name: "Azure Database for PostgreSQL",
        reason:
          "Open-source relational database — use this if your team prefers PostgreSQL syntax, extensions, or you're migrating from Postgres.",
        serviceId: "postgresql",
        learnUrl: "https://learn.microsoft.com/azure/postgresql/overview",
      },
      {
        name: "Azure Cosmos DB",
        reason:
          "For globally distributed, multi-model workloads (document, key-value, graph) that need single-digit millisecond reads at any scale.",
        serviceId: "cosmos-db",
        learnUrl: "https://learn.microsoft.com/azure/cosmos-db/introduction",
      },
      {
        name: "Azure Database for MySQL",
        reason:
          "If you're running a LAMP stack or migrating an existing MySQL workload.",
        serviceId: "mysql",
        learnUrl: "https://learn.microsoft.com/azure/mysql/overview",
      },
      {
        name: "SQL Server on Azure VM",
        reason:
          "When you need full SQL Server engine access — SQL Agent, cross-database queries — or must control the OS.",
        serviceId: "vm",
        learnUrl:
          "https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview",
      },
    ],
    howItWorks:
      "Azure SQL Database runs on managed infrastructure in your chosen region. You choose a service tier (General Purpose, Business Critical, or Hyperscale) and a compute and storage configuration. Backups are automatic with 7–35 day retention, and high availability is built in via replica sets with no failover cluster to configure. In serverless mode, compute scales up automatically and pauses when idle. Connectivity goes through a logical server endpoint; restrict access to specific IPs or use Private Endpoint for private network access. Microsoft Entra authentication and Transparent Data Encryption are on by default.",
    architectureImageUrl:
      "https://learn.microsoft.com/azure/azure-sql/database/media/connectivity-architecture/connectivity-overview.svg",
    pricing: {
      model:
        "DTU-based (bundled compute and storage) or vCore-based (separate compute and storage). Serverless scales compute automatically and bills per second of use.",
      tiers: [
        {
          name: "Free offer — Serverless",
          price: "Free",
          description:
            "1 database · 100,000 vCore seconds of General Purpose Serverless compute + 32 GB storage per month, always free",
        },
        {
          name: "Serverless — 1–4 vCores",
          price: "~$0.000163 / vCore·sec",
          description:
            "Auto-scales and auto-pauses — ideal for intermittent workloads",
        },
        {
          name: "General Purpose — 4 vCores",
          price: "~$367 / month",
          description: "Balanced compute and storage for most workloads",
        },
        {
          name: "Business Critical — 4 vCores",
          price: "~$1,118 / month",
          description:
            "High-performance in-memory OLTP with read scale-out and higher SLA",
        },
        {
          name: "Hyperscale — 4 vCores",
          price: "~$404 / month",
          description:
            "Rapidly scalable up to 100 TB with fast backups and restore",
        },
      ],
    },
    learnUrls: {
      overview:
        "https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview",
      whenToUse:
        "https://learn.microsoft.com/azure/azure-sql/database/features-comparison",
      howItWorks:
        "https://learn.microsoft.com/azure/azure-sql/database/connectivity-architecture",
      training:
        "https://learn.microsoft.com/training/paths/azure-sql-fundamentals/",
      getStarted:
        "https://learn.microsoft.com/azure/azure-sql/database/single-database-create-quickstart",
      documentation: "https://learn.microsoft.com/azure/azure-sql/database/",
    },
  },

  "azure-openai": {
    tagline:
      "OpenAI's powerful models through Azure's secure, enterprise-grade infrastructure",
    overview:
      "Azure OpenAI Service provides REST API access to OpenAI's language models — including GPT-4o, GPT-4, and the o-series reasoning models — through Azure's secure, compliant, and globally distributed cloud. Your data stays in your Azure tenant and never trains OpenAI's shared models. Enterprise features like private endpoints, Microsoft Entra authentication, content filtering, and managed identity are available out of the box.",
    whenToUse: [
      "You're building a copilot, chat assistant, or AI agent that needs natural language understanding and generation",
      "You need to summarize, classify, extract, or translate large volumes of text at scale",
      "You're generating embeddings for semantic search, RAG (retrieval-augmented generation), or recommendation systems",
      "Your enterprise requires data residency, private networking, and compliance controls (SOC 2, ISO 27001, HIPAA)",
      "You want to fine-tune a base model on your own domain-specific data while keeping it in your tenant",
    ],
    alternatives: [
      {
        name: "Azure AI Foundry",
        reason:
          "If you need to build, evaluate, and deploy AI apps end-to-end — Foundry wraps Azure OpenAI alongside other models, evaluation, and deployment tooling.",
        learnUrl:
          "https://learn.microsoft.com/azure/ai-studio/what-is-ai-studio",
      },
      {
        name: "Azure Machine Learning",
        reason:
          "For training, fine-tuning, and deploying custom ML models (not just LLMs) with full MLOps pipelines.",
        serviceId: "azure-ml",
        learnUrl:
          "https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning",
      },
      {
        name: "Azure AI Search",
        reason:
          "Often paired with Azure OpenAI for RAG — handles the vector search and document indexing layer.",
        serviceId: "ai-search",
        learnUrl:
          "https://learn.microsoft.com/azure/search/search-what-is-azure-search",
      },
      {
        name: "Phi-4 / open models via AI Foundry",
        reason:
          "For workloads where a smaller, cheaper model is sufficient and you want to reduce inference cost.",
        learnUrl:
          "https://learn.microsoft.com/azure/ai-studio/how-to/model-catalog-overview",
      },
    ],
    howItWorks:
      "You deploy a model (such as gpt-4o) to a named deployment in your Azure subscription within a supported region. Your application calls the Azure OpenAI REST API or SDK using the endpoint URL, API version, deployment name, and an API key or Entra token. Each request sends a prompt (and optionally conversation history) and receives a completion. Throughput is measured in tokens per minute (TPM); you can request quota increases for production workloads. Content filtering runs on both input and output by default. Azure manages hosting, scaling, and patching of the underlying inference infrastructure — you only manage your deployments and quotas.",
    pricing: {
      model:
        "Pay-per-token billing with input and output tokens priced separately. Provisioned Throughput Units (PTUs) offer reserved capacity for predictable latency at scale.",
      tiers: [
        {
          name: "GPT-4o — Standard",
          price: "$2.50 / 1M input tokens",
          description:
            "Most capable multimodal model — text, vision, and audio",
        },
        {
          name: "GPT-4o mini",
          price: "$0.15 / 1M input tokens",
          description:
            "Fast, cost-efficient model for simple tasks and high-volume throughput",
        },
        {
          name: "o3 — Reasoning",
          price: "$10 / 1M input tokens",
          description:
            "Advanced reasoning for complex analysis, coding, and multi-step problems",
        },
        {
          name: "text-embedding-3-large",
          price: "$0.13 / 1M tokens",
          description:
            "High-quality embeddings for semantic search and RAG pipelines",
        },
      ],
    },
    learnUrls: {
      overview: "https://learn.microsoft.com/azure/ai-services/openai/overview",
      whenToUse:
        "https://learn.microsoft.com/azure/ai-services/openai/concepts/use-your-data",
      howItWorks:
        "https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource",
      training:
        "https://learn.microsoft.com/training/paths/develop-ai-solutions-azure-openai/",
      getStarted:
        "https://learn.microsoft.com/azure/ai-services/openai/quickstart",
      documentation: "https://learn.microsoft.com/azure/ai-services/openai/",
    },
  },
};

// ─── Generic fallback content builder ─────────────────────────────────────

function buildGenericContent(
  serviceName: string,
  description: string,
  categoryName: string,
  costBasis?: string,
): ServiceContent {
  return {
    tagline: description,
    overview: `${serviceName} is an Azure service in the ${categoryName} category. ${description} It integrates with other Azure services and supports enterprise-grade security, compliance, and global availability.`,
    whenToUse: [
      `You need ${categoryName.toLowerCase()} capabilities managed by Microsoft`,
      "You want to reduce operational overhead and focus on your application logic",
      "You need global availability, built-in high availability, and automatic scaling",
      "Your workload requires enterprise security, compliance, and identity integration",
    ],
    alternatives: [
      {
        name: "Other Azure services",
        reason:
          "Explore the All Services catalog to find services tailored to your specific use case.",
      },
    ],
    howItWorks: `${serviceName} runs as a managed service on Azure infrastructure. You configure it through the Azure portal, CLI, or infrastructure-as-code tools like Bicep or Terraform. Microsoft handles the underlying infrastructure, updates, and availability, while you focus on configuration and integration with your application.`,
    pricing: {
      model:
        "Pricing varies by configuration, usage, and region. See the Azure pricing calculator for an estimate.",
      tiers: [
        ...(costBasis === "Free"
          ? [
              {
                name: "Free",
                price: "Free",
                description: `${serviceName} is free to use — no charge for the service itself`,
              },
            ]
          : costBasis === "Free limits"
            ? [
                {
                  name: "Always-free tier",
                  price: "Free",
                  description:
                    "A usage-capped free tier is always available at no charge — see Azure free services for limits",
                },
              ]
            : []),
        {
          name: "Pay-as-you-go",
          price: "Based on usage",
          description: "No upfront commitment — pay only for what you use",
        },
        {
          name: "Reserved capacity",
          price: "Up to 65% savings",
          description: "1- or 3-year commitment for predictable workloads",
        },
      ],
    },
    learnUrls: {
      overview: `https://learn.microsoft.com/search/?terms=${encodeURIComponent(serviceName)}`,
      whenToUse: `https://learn.microsoft.com/search/?terms=${encodeURIComponent(serviceName + " use cases")}`,
      howItWorks: `https://learn.microsoft.com/search/?terms=${encodeURIComponent(serviceName + " architecture")}`,
      training: `https://learn.microsoft.com/training/browse/?terms=${encodeURIComponent(serviceName)}`,
      getStarted: `https://learn.microsoft.com/search/?terms=${encodeURIComponent(serviceName + " quickstart")}`,
      documentation: `https://learn.microsoft.com/search/?terms=${encodeURIComponent(serviceName)}`,
    },
  };
}

// ─── Styles ────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  page: {
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  breadcrumbBar: {
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    position: "sticky",
    top: "48px",
    zIndex: 100,
  },
  heroSection: {
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
  },
  heroInner: {
    maxWidth: "1480px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalXXL,
  },
  heroIconCard: {
    width: "120px",
    height: "120px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow4,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  heroIcon: {
    width: "104px",
    height: "104px",
  },
  heroText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  heroTagline: {
    color: tokens.colorNeutralForeground2,
  },
  heroOverview: {
    color: tokens.colorNeutralForeground2,
    maxWidth: "600px",
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalS,
    marginBottom: "32px",
  },
  contentArea: {
    maxWidth: "1480px",
    margin: "0 auto",
    width: "100%",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "48px",
    paddingBottom: "80px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "0",
  },
  centerSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    padding: `0 ${tokens.spacingHorizontalXXL} 0 0`,
    minWidth: 0,
  },
  rightSection: {
    flex: "0 0 280px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    position: "sticky",
    top: "0",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalXXL,
  },
  bodyText: {
    color: tokens.colorNeutralForeground2,
  },
  bulletList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    listStyleType: "disc",
    margin: "0",
  },
  bulletItem: {
    color: tokens.colorNeutralForeground2,
    paddingLeft: tokens.spacingHorizontalXS,
  },
  alternativeCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  alternativeNameRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  alternativeReason: {
    color: tokens.colorNeutralForeground2,
  },
  alternativeLink: {
    background: "none",
    border: "none",
    padding: "0",
    margin: "0",
    cursor: "pointer",
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecorationLine: "underline",
      color: tokens.colorBrandForegroundHover,
    },
  },
  learnLinkInline: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    paddingLeft: tokens.spacingHorizontalS,
  },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  pricingModelText: {
    color: tokens.colorNeutralForeground2,
  },
  tierCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  tierPrice: {
    color: tokens.colorBrandForeground1,
  },
  tierDescription: {
    color: tokens.colorNeutralForeground3,
  },
  sectionRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  learnLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  pricingCalcLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalS,
  },
  overviewBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxWidth: "600px",
  },
  architectureImg: {
    width: "100%",
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  clickableLink: {
    cursor: "pointer",
  },
});

// ─── Component ─────────────────────────────────────────────────────────────

export interface ServiceProductPageProps {
  serviceId: string;
  onBack: () => void;
  onNavigateToService?: (serviceId: string) => void;
  backLabel?: string;
  onExistingSelect?: (service: {
    id: string;
    name: string;
    icon: string;
  }) => void;
  onCreateClick?: (serviceId: string) => void;
}

/** Product description page for a single Azure service. Shown when clicking a service card from the All Services page. */
export default function ServiceProductPage({
  serviceId,
  onBack,
  onNavigateToService,
  backLabel = "All services",
  onExistingSelect,
  onCreateClick,
}: ServiceProductPageProps) {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [activeServiceId, setActiveServiceId] = useState(serviceId);

  const service = services.find((s) => s.id === activeServiceId);
  const category = service
    ? categories.find((c) => c.id === service.category)
    : null;

  const content: ServiceContent = service
    ? (richContent[activeServiceId] ??
      buildGenericContent(
        service.name,
        service.description,
        category?.name ?? "Azure",
        serviceCostBasis[activeServiceId],
      ))
    : buildGenericContent("This service", "An Azure cloud service.", "Azure");

  if (!service) {
    return (
      <div className={styles.page}>
        <div className={styles.contentArea}>
          <Text>Service not found.</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Breadcrumb — sticky full-width bar */}
      <div className={styles.breadcrumbBar}>
        <Breadcrumb aria-label="Breadcrumb" size="medium">
          <BreadcrumbItem>
            <BreadcrumbButton onClick={() => handlePageChange("home-fre")}>
              Home
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton onClick={onBack}>{backLabel}</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton current>{service.name}</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Content sections */}
      <div className={styles.contentArea}>
        {/* Center — main content */}
        <div className={styles.centerSection}>
          {/* Hero header */}
          <div className={styles.heroInner}>
            <div className={styles.heroIconCard}>
              <img
                src={service.icon}
                alt={service.name}
                className={styles.heroIcon}
              />
            </div>
            <div className={styles.heroText}>
              <Text size={700} weight="semibold">
                {service.name}
              </Text>
              <Text size={300} className={styles.heroOverview}>
                {content.overview}
              </Text>
              <div className={styles.heroActions}>
                <Button
                  appearance="primary"
                  icon={<Add20Regular />}
                  onClick={() => onCreateClick?.(activeServiceId)}
                >
                  Create
                </Button>
                {onExistingSelect && service && (
                  <Button
                    appearance="secondary"
                    icon={<List16Regular />}
                    onClick={() =>
                      onExistingSelect({
                        id: service.id,
                        name: service.name,
                        icon: service.icon,
                      })
                    }
                  >
                    Existing
                  </Button>
                )}
                <Link href={content.learnUrls.overview} target="_blank">
                  <Button
                    appearance="subtle"
                    icon={<Open16Regular />}
                    iconPosition="after"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* When to use + When to consider alternatives — side by side */}
          <div className={styles.sectionRow}>
            <Card className={styles.section}>
              <Text size={500} weight="semibold">
                When to use {service.name}
              </Text>
              <ul className={styles.bulletList}>
                {content.whenToUse.map((item, i) => (
                  <li key={i} className={styles.bulletItem}>
                    <Text size={300}>{item}</Text>
                  </li>
                ))}
              </ul>
              <Link
                href={content.learnUrls.whenToUse}
                target="_blank"
                className={styles.learnLink}
              >
                <Open16Regular />
                More on Microsoft Learn
              </Link>
            </Card>

            <Card className={styles.section}>
              <Text size={500} weight="semibold">
                When to consider alternatives
              </Text>
              <Text size={300} className={styles.bodyText}>
                {service.name} is a great fit for many scenarios, but other
                Azure services may serve you better depending on your
                requirements.
              </Text>
              {content.alternatives.slice(0, 3).map((alt, i) => (
                <div key={i}>
                  {i > 0 && <Divider />}
                  <div className={styles.alternativeCard}>
                    <div className={styles.alternativeNameRow}>
                      {alt.serviceId != null ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveServiceId(alt.serviceId!);
                            onNavigateToService?.(alt.serviceId!);
                            window.scrollTo(0, 0);
                          }}
                          className={styles.alternativeLink}
                        >
                          {alt.name}
                        </button>
                      ) : (
                        <Text size={300} weight="semibold">
                          {alt.name}
                        </Text>
                      )}
                    </div>
                    <Text size={300} className={styles.alternativeReason}>
                      {alt.reason}
                    </Text>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* How it works */}
          <Card className={styles.section}>
            <Text size={500} weight="semibold">
              How it works
            </Text>
            {content.architectureImageUrl ? (
              <img
                src={content.architectureImageUrl}
                alt={`${service.name} reference architecture diagram`}
                className={styles.architectureImg}
              />
            ) : null}
            <Text size={300} className={styles.bodyText}>
              {content.howItWorks}
            </Text>
            <Link
              href={content.learnUrls.howItWorks}
              target="_blank"
              className={styles.learnLink}
            >
              <Open16Regular />
              View reference architecture on Microsoft Learn
            </Link>
          </Card>
        </div>

        {/* Right sidebar — Pricing + Links */}
        <div className={styles.rightSection}>
          <div className={styles.section}>
            <Text size={500} weight="semibold">
              Pricing
            </Text>
            <div>
              <Text size={300} className={styles.pricingModelText}>
                {content.pricing.model}
              </Text>
              <Link
                href="https://azure.microsoft.com/pricing/calculator/"
                target="_blank"
                className={styles.pricingCalcLink}
              >
                <Open16Regular />
                Open pricing calculator
              </Link>
            </div>
            {content.pricing.tiers.map((tier, i) => (
              <Card key={i} appearance="subtle" className={styles.tierCard}>
                <Text size={200} weight="semibold">
                  {tier.name}
                </Text>
                <Text size={400} weight="semibold" className={styles.tierPrice}>
                  {tier.price}
                </Text>
                <Text size={200} className={styles.tierDescription}>
                  {tier.description}
                </Text>
              </Card>
            ))}
          </div>

          <div className={styles.section}>
            <Text size={500} weight="semibold">
              Links
            </Text>
            <Link
              href={content.learnUrls.training}
              target="_blank"
              className={styles.sidebarLink}
            >
              <Open16Regular />
              Free training
            </Link>
            <Link
              href={content.learnUrls.getStarted}
              target="_blank"
              className={styles.sidebarLink}
            >
              <Open16Regular />
              Get started
            </Link>
            <Link
              href={content.learnUrls.documentation}
              target="_blank"
              className={styles.sidebarLink}
            >
              <Open16Regular />
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
