"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Checkmark16Regular,
  Server24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    maxWidth: "800px",
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },

  introText: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },

  sectionLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },

  /* Environment cards row */
  envRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  envCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": {
      borderColor: tokens.colorNeutralStroke1,
    },
  },
  envCardSelected: {
    borderColor: tokens.colorBrandStroke1,
    borderWidth: "2px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  envCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  envCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  defaultBadge: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  checkIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  checkIconHidden: {
    visibility: "hidden",
    flexShrink: 0,
  },
  checkText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
  },

  /* Workload type cards */
  workloadRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  workloadCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": {
      borderColor: tokens.colorNeutralStroke1,
    },
  },
  workloadCardSelected: {
    borderColor: tokens.colorBrandStroke1,
    borderWidth: "2px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  workloadCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  workloadCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  workloadSection: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  workloadSectionIcon: {
    flexShrink: 0,
    color: tokens.colorNeutralForeground3,
    marginTop: "2px",
  },
  workloadSectionContent: {
    display: "flex",
    flexDirection: "column",
  },
  workloadSectionTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
  },
  workloadSectionDesc: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
  },
});

const environments = [
  {
    id: "dev-test",
    name: "Dev/Test",
    default: false,
    checks: [
      { label: "Boot diagnostics", checked: false },
      { label: "High availability", checked: false },
      { label: "Azure backup (where available)", checked: false },
    ],
  },
  {
    id: "production",
    name: "Production",
    default: true,
    checks: [
      { label: "Boot diagnostics", checked: true },
      { label: "High availability", checked: true },
      { label: "Azure backup (where available)", checked: true },
    ],
  },
];

const workloadTypes = [
  {
    id: "general-purpose",
    name: "General purpose (D-Series)",
    default: true,
    sizes: ["DS2_v2: 2 CPU, 7 GB", "DS3_v2: 4 CPU, 14 GB"],
    description: "Fast CPUs with optimal CPU-to-memory configuration",
    workloads: "Enterprise applications, relational databases, analytics",
  },
  {
    id: "memory-optimized",
    name: "Memory optimized (E-Series)",
    default: false,
    sizes: ["E2s_v3: 2 CPU, 16 GB", "E4s_v3: 4 CPU, 32 GB"],
    description:
      "High memory-to-core ratio optimized for heavy in-memory applications",
    workloads: "SAP HANA, SQL Hekaton, other large in-memory workloads",
  },
  {
    id: "compute-optimized",
    name: "Compute optimized (F-Series)",
    default: false,
    sizes: ["F2s_v2: 2 CPU, 4 GB", "F4s_v2: 4 CPU, 8 GB"],
    description:
      "High CPU-to-memory ratio optimized for compute intensive workloads",
    workloads: "Batch processing, web servers, gaming",
  },
];

/** VM workload selection page — Choose recommended defaults that match your workload. */
export default function VmWorkloadSelector() {
  const styles = useStyles();
  const [selectedEnv, setSelectedEnv] = useState("production");
  const [selectedWorkload, setSelectedWorkload] = useState("general-purpose");

  return (
    <div className={styles.container}>
      <Text className={styles.introText}>
        To quickly customize your virtual machine, choose one of the following
        pre-set configurations. You can modify these configurations at any time.
      </Text>

      {/* Select a workload environment */}
      <div>
        <Text as="p" className={styles.sectionLabel}>
          Select a workload environment
        </Text>
        <div className={styles.envRow}>
          {environments.map((env) => (
            <div
              key={env.id}
              className={mergeClasses(
                styles.envCard,
                selectedEnv === env.id && styles.envCardSelected
              )}
              onClick={() => setSelectedEnv(env.id)}
            >
              <div className={styles.envCardHeader}>
                <Text className={styles.envCardTitle}>{env.name}</Text>
                {env.default && (
                  <Text className={styles.defaultBadge}>default</Text>
                )}
              </div>
              {env.checks.map((check) => (
                <div key={check.label} className={styles.checkRow}>
                  <Checkmark16Regular
                    className={
                      check.checked || selectedEnv === env.id
                        ? styles.checkIcon
                        : styles.checkIconHidden
                    }
                  />
                  <Text className={styles.checkText}>{check.label}</Text>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Select a workload type */}
      <div>
        <Text as="p" className={styles.sectionLabel}>
          Select a workload type
        </Text>
        <div className={styles.workloadRow}>
          {workloadTypes.map((wl) => (
            <div
              key={wl.id}
              className={mergeClasses(
                styles.workloadCard,
                selectedWorkload === wl.id && styles.workloadCardSelected
              )}
              onClick={() => setSelectedWorkload(wl.id)}
            >
              <div className={styles.workloadCardHeader}>
                <Text className={styles.workloadCardTitle}>{wl.name}</Text>
                {wl.default && (
                  <Text className={styles.defaultBadge}>default</Text>
                )}
              </div>

              {/* Example sizes */}
              <div className={styles.workloadSection}>
                <Server24Regular className={styles.workloadSectionIcon} />
                <div className={styles.workloadSectionContent}>
                  <Text className={styles.workloadSectionTitle}>
                    Example sizes
                  </Text>
                  {wl.sizes.map((size) => (
                    <Text key={size} className={styles.workloadSectionDesc}>
                      {size}
                    </Text>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className={styles.workloadSection}>
                <Server24Regular className={styles.workloadSectionIcon} />
                <div className={styles.workloadSectionContent}>
                  <Text className={styles.workloadSectionDesc}>
                    {wl.description}
                  </Text>
                </div>
              </div>

              {/* Workload types */}
              <div className={styles.workloadSection}>
                <Settings24Regular className={styles.workloadSectionIcon} />
                <div className={styles.workloadSectionContent}>
                  <Text className={styles.workloadSectionTitle}>
                    Workload types
                  </Text>
                  <Text className={styles.workloadSectionDesc}>
                    {wl.workloads}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
