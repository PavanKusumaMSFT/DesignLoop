"use client";

import React from "react";
import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import ServiceCard from "./shared/service-card";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "20px 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  heading: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    lineHeight: "1.4",
    maxWidth: "900px",
  },
  subheading: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "32px",
    lineHeight: "1.5",
  },
  headingWithMargin: {
    marginBottom: "32px",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
});

interface ServiceRecommendationsProps {
  onServiceSelect: (service: string, action: string) => void;
  customMessage?: string;
}

const ServiceRecommendations = React.memo(function ServiceRecommendations({
  onServiceSelect,
  customMessage,
}: ServiceRecommendationsProps) {
  const styles = useStyles();

  const services = [
    {
      icon: "/icons/App-Services.svg",
      iconBgColor: "rgba(59, 130, 246, 0.1)",
      title: "App Service",
      description:
        "Deploy web apps, mobile backends, and APIs without managing infrastructure.",
      badge: "Best for you",
      features: [
        "Native Azure OpenAI integration for AI apps",
        "Deploy small language models locally",
        "Network isolation and encryption",
        "Built-in GitHub integration",
      ],
      actions: [
        { label: "Deploy this service for...", action: "deploy" },
        {
          label: "Do S&P 500 AI companies use this service?",
          action: "research",
        },
      ],
    },
    {
      icon: "/icons/containerapps.svg",
      iconBgColor: "rgba(96, 165, 250, 0.1)",
      title: "Container Apps",
      description:
        "Serverless platform for containerized apps with microservices, APIs, and background jobs.",
      features: [
        "Auto-scales to zero—pay only when active",
        "Ideal for AI services with session isolation",
        "Shared virtual network and logging",
        "Deploy with LangChain, ChromaDB, and ChatGPT",
      ],
      actions: [
        { label: "Compare Container Apps to App Service", action: "compare" },
        { label: "Suggest more services like this", action: "suggest" },
      ],
    },
    {
      icon: "/icons/Static-Web-Apps.svg",
      iconBgColor: "rgba(147, 197, 253, 0.1)",
      title: "Static Web Apps",
      description:
        "Serverless hosting for static sites with fast global delivery and built-in CI/CD.",
      features: [
        "Global CDN for fast content delivery",
        "Serverless APIs with Azure Functions",
        "Native GitHub and Azure DevOps integration",
        "Free SSL and custom domains",
      ],
      actions: [
        { label: "Compare Static Web Apps to App Service", action: "compare" },
        { label: "Suggest more services like this", action: "suggest" },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <h2
        className={mergeClasses(
          styles.heading,
          customMessage ? styles.headingWithMargin : undefined,
        )}
      >
        {customMessage || "Here are a few services recommended for you."}
      </h2>
      {!customMessage && (
        <p className={styles.subheading}>
          App Service leads with native OpenAI support—ideal for AI apps.
        </p>
      )}

      <div className={styles.cardsGrid}>
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            iconBgColor={service.iconBgColor}
            title={service.title}
            description={service.description}
            badge={service.badge}
            features={service.features}
            actions={service.actions.map((action) => ({
              label: action.label,
              onClick: () => onServiceSelect(service.title, action.action),
            }))}
          />
        ))}
      </div>
    </div>
  );
});

/** Grid of service recommendation cards (App Service, Container Apps, Static Web Apps) with feature lists and deploy/compare actions.
 * Cross-project reusable: can be imported by any project. */
export default ServiceRecommendations;
