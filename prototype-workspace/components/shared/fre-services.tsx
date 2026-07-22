"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
  webLightTheme,
  Button as FluentButton,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { List24Regular } from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";
import { CreateProjectModal } from "../projects/portal-ia/create-project-modal";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
    padding: "48px 32px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    marginBottom: "8px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "32px",
    lineHeight: "20px",
  },
  section: {
    marginBottom: "48px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  serviceCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cardIcon: {
    width: "24px",
    height: "24px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  freeBadge: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    padding: "2px 8px",
    borderRadius: "4px",
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorStatusSuccessForeground1,
    border: `1px solid ${tokens.colorStatusSuccessForeground1}`,
  },
  cardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "20px",
  },
  exploreCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    maxWidth: "400px",
  },
  exploreTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  exploreTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  exploreIcon: {
    color: tokens.colorNeutralForeground2,
  },
  exploreDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "20px",
  },
});

interface FreServicesProps {
  customHeader?: React.ReactNode | null;
  onBack?: () => void;
  onCreateVm?: () => void;
  onCreateWebapp?: () => void;
}

/** First Run Experience services page showing popular Azure services as cards with "Free" badges and an "All services" explore link.
 * Composed from: makeStyles layout, TopNav, service cards, CreateProjectModal.
 * Instead of: building an inline service selection grid with project creation flow. */
const FreServices: React.FC<FreServicesProps> = ({
  customHeader: customHeaderProp,
  onBack,
  onCreateVm,
  onCreateWebapp,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { handlePageChange } = useNavigation();

  // Use the customHeader prop directly - don't fall back to context
  // Portal-ia: no prop passed → undefined → show TopNav
  // App-modeling: customHeader={null} → null → no header (P1 header shown by page)
  const customHeader = customHeaderProp;
  const [showProjectModal, setShowProjectModal] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<string>("");

  const isAppModeling = customHeader === null;

  const popularServices = [
    {
      name: "Web App",
      description:
        "Easily host and manage websites and web applications without managing infrastructure.",
      icon: "/icons/Static-Web-Apps.svg",
      free: true,
      onClick: () => {
        setSelectedService("Web App");
        setShowProjectModal(true);
      },
    },
    {
      name: "Container Apps",
      description:
        "Run your app in containers with automatic scaling and built-in microservices support.",
      icon: "/icons/containerapps.svg",
      free: true,
    },
    {
      name: "Function App",
      description:
        "Build serverless apps that run code on demand without worrying about servers.",
      icon: "/icons/Function-App.svg",
      free: true,
      onClick: () => {
        setSelectedService("Function App");
        setShowProjectModal(true);
      },
    },
    {
      name: "Virtual machines",
      description:
        "Build, deploy, and run your applications on resilient and scalable infrastructure.",
      icon: "/icons/virtual-machine.svg",
      free: true,
      onClick: () => {
        setSelectedService("Virtual machines");
        setShowProjectModal(true);
      },
    },
    {
      name: "Storage accounts",
      description:
        "Store and access files, backups, and unstructured data reliably and securely.",
      icon: "/icons/Storage-Accounts-(Classic).svg",
      free: true,
    },
    {
      name: "SQL databases",
      description:
        "Set up a scalable, secure relational database in minutes with built-in intelligence.",
      icon: "/icons/SQL-Database.svg",
      free: true,
    },
  ];

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {/* Portal-ia (undefined): Show TopNav, App-modeling (null): No header */}
        {customHeader === undefined && <TopNav activeLink="Discover" />}
        {customHeader && customHeader}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Azure services</h1>
            <p className={styles.subtitle}>
              From hosting and storage to functions and containers, choose the
              service that matches your workload and deployment needs.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Popular services</h2>
            <div className={styles.cardsGrid}>
              {popularServices.map((service, index) => (
                <div
                  key={index}
                  className={styles.serviceCard}
                  onClick={
                    (service as any).onClick ||
                    (() => handlePageChange("discover"))
                  }
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleRow}>
                      {service.icon && (
                        <img
                          src={service.icon}
                          alt={service.name}
                          className={styles.cardIcon}
                        />
                      )}
                      <div className={styles.cardTitle}>{service.name}</div>
                    </div>
                    {service.free && (
                      <div className={styles.freeBadge}>Free</div>
                    )}
                  </div>
                  <div className={styles.cardDescription}>
                    {service.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Explore more</h2>
            <div
              className={styles.exploreCard}
              onClick={() => handlePageChange("service-hubs")}
            >
              <div className={styles.exploreTitleRow}>
                <List24Regular className={styles.exploreIcon} />
                <div className={styles.exploreTitle}>All services</div>
              </div>
              <div className={styles.exploreDescription}>
                Choose from over 200 services across various categories like
                compute, databases, analytics, and storage.
              </div>
            </div>
          </div>
        </div>

        <CreateProjectModal
          open={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          onCreateProject={(projectName) => {
            console.log(
              "Creating project:",
              projectName,
              "for service:",
              selectedService,
            );
            setShowProjectModal(false);

            if (isAppModeling) {
              // In embedded context, use callbacks if provided, otherwise go back
              if (selectedService === "Web App") {
                if (onCreateWebapp) {
                  onCreateWebapp();
                } else {
                  router.back();
                }
              } else if (selectedService === "Virtual machines") {
                if (onCreateVm) {
                  onCreateVm();
                } else {
                  router.back();
                }
              } else if (selectedService === "Function App") {
                router.back();
              }
            } else {
              // In portal-ia context, use handlePageChange
              if (selectedService === "Web App") {
                handlePageChange("create-resource-2");
              } else if (selectedService === "Virtual machines") {
                handlePageChange("create-vm-wizard");
              } else if (selectedService === "Function App") {
                handlePageChange("create-function-app-wizard");
              }
            }
          }}
          serviceName={selectedService}
        />
      </div>
    </FluentProvider>
  );
};

export default FreServices;
