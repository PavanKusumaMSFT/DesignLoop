"use client";

import React from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Tooltip,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  BoxMultiple24Regular,
  Flash24Regular,
  Database24Regular,
  Storage24Regular,
  Globe24Regular,
  CheckmarkCircle16Filled,
  Warning16Filled,
  ErrorCircle16Filled,
} from "@fluentui/react-icons";
import type {
  ServiceData,
  ServiceType,
  HealthStatus,
} from "../../../../data/manage-dashboard-data";

// ---------------------------------------------------------------------------
// ServiceCard — sidebar tile for each deployed service
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  card: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    border: `1px solid transparent`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "all 0.15s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    },
  },
  cardSelected: {
    border: `1.5px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  iconWrap: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  meta: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  statusDot: {
    display: "flex",
    alignItems: "center",
  },
  statusIconHealthy: { color: tokens.colorPaletteGreenForeground1 },
  statusIconDegraded: { color: tokens.colorPaletteYellowForeground2 },
  statusIconCritical: { color: tokens.colorPaletteRedForeground1 },
  iconBgContainerApp: { backgroundColor: tokens.colorBrandBackground2 },
  iconBgFunctionApp: { backgroundColor: tokens.colorPaletteYellowBackground1 },
  iconBgSqlDb: { backgroundColor: tokens.colorPaletteGreenBackground1 },
  iconBgStorageAccount: {
    backgroundColor: tokens.colorPaletteLavenderBackground2,
  },
  iconBgAppService: { backgroundColor: tokens.colorPaletteTealBackground2 },
  serviceIconBase: { width: "22px", height: "22px" },
  serviceIconContainerApp: { color: tokens.colorBrandForeground1 },
  serviceIconFunctionApp: { color: tokens.colorPaletteYellowForeground2 },
  serviceIconSqlDb: { color: tokens.colorPaletteGreenForeground1 },
  serviceIconStorageAccount: { color: tokens.colorPaletteLavenderForeground2 },
  serviceIconAppService: { color: tokens.colorPaletteTealForeground2 },
});

const ServiceIcon: React.FC<{ type: ServiceType }> = ({ type }) => {
  const styles = useStyles();
  const getIconClass = (): string => {
    switch (type) {
      case "container-app":
        return mergeClasses(
          styles.serviceIconBase,
          styles.serviceIconContainerApp,
        );
      case "function-app":
        return mergeClasses(
          styles.serviceIconBase,
          styles.serviceIconFunctionApp,
        );
      case "sql-database":
        return mergeClasses(styles.serviceIconBase, styles.serviceIconSqlDb);
      case "storage-account":
        return mergeClasses(
          styles.serviceIconBase,
          styles.serviceIconStorageAccount,
        );
      case "app-service":
        return mergeClasses(
          styles.serviceIconBase,
          styles.serviceIconAppService,
        );
    }
  };
  const cls = getIconClass();
  switch (type) {
    case "container-app":
      return <BoxMultiple24Regular className={cls} />;
    case "function-app":
      return <Flash24Regular className={cls} />;
    case "sql-database":
      return <Database24Regular className={cls} />;
    case "storage-account":
      return <Storage24Regular className={cls} />;
    case "app-service":
      return <Globe24Regular className={cls} />;
  }
};

const StatusIndicator: React.FC<{ status: HealthStatus }> = ({ status }) => {
  const styles = useStyles();
  switch (status) {
    case "healthy":
      return (
        <Tooltip content="Healthy" relationship="label">
          <CheckmarkCircle16Filled className={styles.statusIconHealthy} />
        </Tooltip>
      );
    case "degraded":
      return (
        <Tooltip content="Degraded" relationship="label">
          <Warning16Filled className={styles.statusIconDegraded} />
        </Tooltip>
      );
    case "critical":
      return (
        <Tooltip content="Critical" relationship="label">
          <ErrorCircle16Filled className={styles.statusIconCritical} />
        </Tooltip>
      );
  }
};

interface ServiceCardProps {
  service: ServiceData;
  selected: boolean;
  onClick: () => void;
}

/** Clickable sidebar tile showing a deployed service with icon, name, type/region metadata, and health status indicator.
 * Cross-project reusable: can be imported by any project. */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  selected,
  onClick,
}) => {
  const styles = useStyles();

  const getIconBgClass = (): string => {
    switch (service.type) {
      case "container-app":
        return styles.iconBgContainerApp;
      case "function-app":
        return styles.iconBgFunctionApp;
      case "sql-database":
        return styles.iconBgSqlDb;
      case "storage-account":
        return styles.iconBgStorageAccount;
      case "app-service":
        return styles.iconBgAppService;
      default:
        return "";
    }
  };

  return (
    <div
      className={mergeClasses(
        styles.card,
        selected ? styles.cardSelected : undefined,
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className={mergeClasses(styles.iconWrap, getIconBgClass())}>
        <ServiceIcon type={service.type} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{service.name}</span>
        <span className={styles.meta}>
          {service.typeLabel} · {service.region}
        </span>
      </div>
      <div className={styles.statusDot}>
        <StatusIndicator status={service.status} />
      </div>
    </div>
  );
};
