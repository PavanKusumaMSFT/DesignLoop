"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Link,
  Button,
  Radio,
} from "@fluentui/react-components";
import {
  Checkmark16Filled,
  NotepadPerson20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

interface HostingPlan {
  id: string;
  name: string;
  description: string;
  scaleToZero: string | boolean;
  scaleBehavior: string;
  virtualNetworking: string | boolean;
  dedicatedCompute: string;
  maxScaleOut: string;
}

const hostingPlans: HostingPlan[] = [
  {
    id: "flex",
    name: "Flex Consumption",
    description: "Get high scalability with compute choices, virtual networking, and pay-as-you-go billing.",
    scaleToZero: true,
    scaleBehavior: "Fast event-driven",
    virtualNetworking: true,
    dedicatedCompute: "Optional with Always Ready",
    maxScaleOut: "1000",
  },
  {
    id: "premium",
    name: "Functions Premium",
    description: "Deploy multiple function apps on the same plan with event-driven scaling.",
    scaleToZero: "-",
    scaleBehavior: "Event-driven",
    virtualNetworking: true,
    dedicatedCompute: "Minimum of 1 instance required",
    maxScaleOut: "100",
  },
  {
    id: "appservice",
    name: "App Service",
    description: "Run web apps and function apps on the same plan with more compute choices and pay for the instances of the plan.",
    scaleToZero: "-",
    scaleBehavior: "Metrics based",
    virtualNetworking: true,
    dedicatedCompute: "Minimum of 1 instance required",
    maxScaleOut: "30",
  },
  {
    id: "container",
    name: "Container Apps environment",
    description: "Host function apps with other containerized microservices and pay for compute capacity.",
    scaleToZero: true,
    scaleBehavior: "Event-driven with KEDA",
    virtualNetworking: true,
    dedicatedCompute: "Optional with minimum replicas",
    maxScaleOut: "300",
  },
  {
    id: "consumption",
    name: "Consumption (Windows)",
    description: "Pay for compute resources when your functions are running (pay-as-you-go).",
    scaleToZero: true,
    scaleBehavior: "Event-driven",
    virtualNetworking: "-",
    dedicatedCompute: "-",
    maxScaleOut: "200",
  },
];

const comparisonRows = [
  { key: "scaleToZero", label: "Scale to zero" },
  { key: "scaleBehavior", label: "Scale behavior" },
  { key: "virtualNetworking", label: "Virtual networking" },
  { key: "dedicatedCompute", label: "Dedicated compute and prevent cold start" },
  { key: "maxScaleOut", label: "Max scale out (instances)" },
] as const;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    maxWidth: "1200px",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: "80px",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
    display: "block",
  },
  sectionDescription: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    display: "block",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerCell: {
    padding: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    verticalAlign: "top" as const,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    width: "18%",
    position: "relative" as const,
  },
  headerCellLabel: {
    padding: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    verticalAlign: "top" as const,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    width: "10%",
  },
  headerCellSelected: {
    padding: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    verticalAlign: "top" as const,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    width: "18%",
    position: "relative" as const,
    outline: `2px solid ${tokens.colorBrandStroke1}`,
    outlineOffset: "-2px",
  },
  radioWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: tokens.spacingVerticalS,
  },
  planName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  planDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    display: "block",
  },
  labelCellHeader: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "block",
  },
  bodyRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  bodyCell: {
    padding: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    verticalAlign: "middle" as const,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  bodyCellLabel: {
    padding: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    verticalAlign: "middle" as const,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightRegular,
  },
  checkIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  footer: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 100,
  },
  footerButtons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  feedbackLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
});

export interface CreateFunctionAppProps {
  onClose?: () => void;
}

/** Create Function App page — hosting plan selection step matching Azure portal. */
export default function CreateFunctionApp({ onClose }: CreateFunctionAppProps) {
  const styles = useStyles();
  const [selectedPlan, setSelectedPlan] = useState("flex");

  const renderCellValue = (value: string | boolean) => {
    if (value === true) {
      return <Checkmark16Filled className={styles.checkIcon} />;
    }
    return <>{value}</>;
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Text className={styles.sectionTitle}>Select a hosting option</Text>
        <Text className={styles.sectionDescription}>
          These options determine how your app scales, resources available per instance, and pricing.{" "}
          <Link inline href="#">Learn more about Functions hosting options</Link>
        </Text>

        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <td className={styles.headerCellLabel}>
                <Text className={styles.labelCellHeader}>Hosting plans</Text>
              </td>
              {hostingPlans.map((plan) => (
                <td
                  key={plan.id}
                  className={selectedPlan === plan.id ? styles.headerCellSelected : styles.headerCell}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className={styles.radioWrapper}>
                    <Radio
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                    />
                  </div>
                  <Text className={styles.planName}>{plan.name}</Text>
                  <Text className={styles.planDescription}>{plan.description}</Text>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.key} className={styles.bodyRow}>
                <td className={styles.bodyCellLabel}>{row.label}</td>
                {hostingPlans.map((plan) => (
                  <td key={plan.id} className={styles.bodyCell}>
                    {renderCellValue(plan[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerButtons}>
          <Button appearance="primary" size="medium">Select</Button>
        </div>
        <Link className={styles.feedbackLink} href="#">
          <NotepadPerson20Regular />
          Give feedback
        </Link>
      </div>
    </div>
  );
}
