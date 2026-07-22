"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Dropdown,
  Option,
  Link,
  Divider,
  Card,
  Badge,
} from "@fluentui/react-components";
import {
  Dismiss20Regular,
  Info16Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  Edit20Regular,
  CheckmarkCircle16Filled,
  Checkmark20Regular,
  Checkmark16Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  History20Regular,
  Database20Regular,
  DatabaseMultiple20Regular,
  Storage20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  /* Overlay backdrop */
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "40px",
    zIndex: 3000,
    display: "flex",
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    inset: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  /* Blade panel */
  blade: {
    position: "relative",
    width: "600px",
    maxWidth: "100%",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
  },
  bladeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  bladeTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  bladeContent: {
    flex: 1,
    overflowY: "auto",
    padding: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  labelRequired: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  asterisk: {
    color: tokens.colorPaletteRedForeground1,
  },

  /* Two-column bottom */
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  impactCard: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
  },
  impactTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  impactDescText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  boldText: {
    fontWeight: tokens.fontWeightSemibold,
  },
  impactList: {
    listStyleType: "none",
    paddingLeft: "0",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  impactItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
  },
  impactCheckIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  costCard: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  costTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  costLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  costValueBlack: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  costValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "32px",
  },
  costStatRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
  },
  costStatLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  costStatValue: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  costStatValueGreen: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "22px",
  },

  /* Step 2: Add-ons */
  addonsTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  addonsDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  addonsFormField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    maxWidth: "500px",
  },

  /* Add-on cards carousel */
  addonCardsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    overflowX: "auto",
    paddingBottom: tokens.spacingVerticalXS,
  },
  addonCard: {
    minWidth: "200px",
    maxWidth: "220px",
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    flex: "0 0 auto",
  },
  addonCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  addonCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  addonCardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
    flex: 1,
  },
  addonCardPrice: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  addonCardPriceValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  carouselDots: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
  },
  carouselDot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground1,
  },
  carouselDotInactive: {
    width: "6px",
    height: "6px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralStroke1,
  },
  addedButton: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* Footer */
  bladeFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },

  /* Step 3: Success view */
  successTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  summaryCard: {
    padding: tokens.spacingHorizontalM,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  summaryCardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "24px",
  },
  statBoxes: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  statBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  statBoxLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  statBoxValueGreen: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "22px",
  },
  statBoxValueNeutral: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  nextStepsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  nextStepCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  nextStepContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    flex: 1,
  },
  nextStepTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "24px",
  },
  nextStepDesc: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    flex: 1,
  },
  skeletonLine: {
    height: "18px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
  },
  resourcesSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  resourcesHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  resourcesIcon: {
    color: tokens.colorNeutralForeground2,
  },
  resourcesTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1.2fr 0.8fr 1fr",
    gap: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableHeaderCell: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1.2fr 0.8fr 1fr",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    alignItems: "center",
  },
  tableCell: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tableCellName: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  tableNameLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  statusActive: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  tableIcon: {
    color: tokens.colorNeutralForeground3,
  },
});

export interface ArcEnableBladeProps {
  /** Whether the blade is open */
  isOpen: boolean;
  /** Called when the blade is closed (X or backdrop click) */
  onClose: () => void;
  /** Called when EMM has been successfully enabled (Close from step 3) */
  onEnabled?: () => void;
}

/** Right-side context blade for enabling Essential Machine Management from the Azure Arc page — 3-step flow: config, add-ons, success. */
export default function ArcEnableBlade({
  isOpen,
  onClose,
  onEnabled,
}: ArcEnableBladeProps) {
  const styles = useStyles();
  const [bladeStep, setBladeStep] = useState(1);
  const [subscription, setSubscription] = useState("");
  const [managedIdentity, setManagedIdentity] = useState("");
  const [logWorkspace, setLogWorkspace] = useState("");
  const [azureMonitor, setAzureMonitor] = useState("");
  const [useCase, setUseCase] = useState("");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.blade}>
        {/* Blade header */}
        <div className={styles.bladeHeader}>
          <Text className={styles.bladeTitle}>
            Enable Essential Machine Management
          </Text>
          <Button
            appearance="transparent"
            icon={<Dismiss20Regular />}
            onClick={onClose}
          />
        </div>

        {/* Blade content */}
        <div className={styles.bladeContent}>
          {bladeStep === 1 && (
            <>
              {/* Subscription */}
              <div className={styles.formField}>
                <div className={styles.labelRow}>
                  <Text className={styles.labelRequired}>
                    Subscription <Text className={styles.asterisk}>*</Text>
                  </Text>
                  <Info16Regular />
                </div>
                <Dropdown
                  placeholder="Select subscription"
                  value={subscription || undefined}
                  selectedOptions={subscription ? [subscription] : []}
                  onOptionSelect={(_, data) =>
                    setSubscription(data.optionValue as string)
                  }
                >
                  <Option value="sub-01">
                    sub-01
                  </Option>
                  <Option value="sub-02">
                    sub-02
                  </Option>
                  <Option value="sub-03">
                    sub-03
                  </Option>
                </Dropdown>
              </div>

              {/* Managed identity */}
              <div className={styles.formField}>
                <div className={styles.labelRow}>
                  <Text className={styles.labelRequired}>
                    Managed identity <Text className={styles.asterisk}>*</Text>
                  </Text>
                  <Info16Regular />
                </div>
                <Dropdown
                  placeholder="Select managed identity"
                  value={managedIdentity === "user-assigned" ? "User assigned" : managedIdentity === "system-assigned" ? "System assigned" : undefined}
                  selectedOptions={managedIdentity ? [managedIdentity] : []}
                  onOptionSelect={(_, data) =>
                    setManagedIdentity(data.optionValue as string)
                  }
                >
                  <Option value="user-assigned">User assigned</Option>
                  <Option value="system-assigned">System assigned</Option>
                </Dropdown>
              </div>

              {/* Log analytics workspace */}
              <div className={styles.formField}>
                <div className={styles.labelRow}>
                  <Text className={styles.labelRequired}>
                    Log analytics workspace{" "}
                    <Text className={styles.asterisk}>*</Text>
                  </Text>
                  <Info16Regular />
                </div>
                <Dropdown
                  placeholder="Select log analytics workspace"
                  value={logWorkspace || undefined}
                  selectedOptions={logWorkspace ? [logWorkspace] : []}
                  onOptionSelect={(_, data) =>
                    setLogWorkspace(data.optionValue as string)
                  }
                >
                  <Option value="LA2">LA2</Option>
                  <Option value="LA1">LA1</Option>
                </Dropdown>
              </div>

              {/* Azure Monitor VM Insights */}
              <div className={styles.formField}>
                <div className={styles.labelRow}>
                  <Text className={styles.labelRequired}>
                    Azure Monitor VM Insights (Preview){" "}
                    <Text className={styles.asterisk}>*</Text>
                  </Text>
                  <Info16Regular />
                </div>
                <Dropdown
                  placeholder="Select Azure Monitor VM Insights workspace"
                  value={azureMonitor || undefined}
                  selectedOptions={azureMonitor ? [azureMonitor] : []}
                  onOptionSelect={(_, data) =>
                    setAzureMonitor(data.optionValue as string)
                  }
                >
                  <Option value="MVM2">MVM2</Option>
                  <Option value="MVM1">MVM1</Option>
                </Dropdown>
              </div>

              {/* Impact summary + Cost panel */}
              <div className={styles.bottomGrid}>
                <div className={styles.impactCard}>
                  <Text className={styles.impactTitle}>Impact summary</Text>
                  {subscription ? (
                    <Text className={styles.impactDescText}>
                      Enabling this feature will turn on the following capabilities
                      for <Text className={styles.boldText}>35 resources</Text> in{" "}
                      <Text className={styles.boldText}>{subscription}</Text> all in
                      one go, no separate setup required.
                    </Text>
                  ) : (
                    <Text size={200}>
                      Enabling this feature will turn on the following capabilities:
                    </Text>
                  )}
                  <ul className={styles.impactList}>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Azure Monitor VM insights (Preview)</Text>
                    </li>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Azure Policy and Machine Configurations</Text>
                    </li>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Change tracking and inventory</Text>
                    </li>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Azure Update Manager</Text>
                    </li>
                  </ul>
                </div>

                <Card className={styles.costCard}>
                  <Text className={styles.costTitle}>Cost</Text>
                  <Text className={styles.costLabel}>Price</Text>
                  <Text className={styles.costValueBlack}>$9.00</Text>
                  <Text className={styles.costLabel}>per server per month</Text>
                  <Divider />
                  <Text className={styles.costLabel}>Savings per month</Text>
                  <Text className={styles.costValue}>$5,773.77</Text>
                  <Button appearance="secondary" size="small">
                    View details
                  </Button>
                </Card>
              </div>
            </>
          )}

          {bladeStep === 2 && (
            <>
              {/* Add-ons section */}
              <div className={styles.formField}>
                <Text className={styles.addonsTitle}>Add-ons</Text>
                <Text className={styles.addonsDesc}>
                  Select a use case to get recommended add-ons to optimize your
                  subscription for improved security, cost savings, and
                  additional capabilities.
                </Text>
              </div>

              <div className={styles.addonsFormField}>
                <div className={styles.labelRow}>
                  <Text className={styles.labelRequired}>Use case</Text>
                  <Info16Regular />
                </div>
                <Dropdown
                  placeholder="Select use case"
                  value={({ secure: "Secure and govern machines", cost: "Optimize costs", simplify: "Simplify management", monitor: "Monitor performance", compliance: "Maintain updates and compliance" } as Record<string, string>)[useCase] || undefined}
                  selectedOptions={useCase ? [useCase] : []}
                  onOptionSelect={(_, data) =>
                    setUseCase(data.optionValue as string)
                  }
                >
                  <Option value="secure">Secure and govern machines</Option>
                  <Option value="cost">Optimize costs</Option>
                  <Option value="simplify">Simplify management</Option>
                  <Option value="monitor">Monitor performance</Option>
                  <Option value="compliance">Maintain updates and compliance</Option>
                </Dropdown>
              </div>

              {/* Add-on cards (shown when use case selected) */}
              {useCase === "secure" && (
                <>
                  <div className={styles.addonCardsRow}>
                    <Card className={styles.addonCard}>
                      <div className={styles.addonCardHeader}>
                        <Text className={styles.addonCardTitle}>Foundational CSPM</Text>
                        <Badge appearance="tint" color="informative" size="small">Included</Badge>
                      </div>
                      <Text className={styles.addonCardDesc}>
                        Continuously assess your cloud environment with agentless,
                        risk-prioritized insights. Recommended for all workloads.{" "}
                        <Link inline>Learn more</Link>
                      </Text>
                      <Text className={styles.addonCardPrice}>Price:</Text>
                      <Text className={styles.addonCardPriceValue}>Free</Text>
                      <div className={styles.addedButton}>
                        <Checkmark16Regular />
                        <Text size={200}>Added</Text>
                      </div>
                    </Card>

                    <Card className={styles.addonCard}>
                      <div className={styles.addonCardHeader}>
                        <Text className={styles.addonCardTitle}>Defender CSPM</Text>
                        <Badge appearance="tint" color="success" size="small">Recommended</Badge>
                      </div>
                      <Text className={styles.addonCardDesc}>
                        Identifies misconfigurations, exposed secrets, and compliance
                        risks across multi-cloud workloads to improve security.{" "}
                        <Link inline>Learn more</Link>
                      </Text>
                      <Text className={styles.addonCardPrice}>Price:</Text>
                      <Text className={styles.addonCardPriceValue}>$ XX.XX</Text>
                      <Button appearance="outline" size="small">Add</Button>
                    </Card>

                    <Card className={styles.addonCard}>
                      <div className={styles.addonCardHeader}>
                        <Text className={styles.addonCardTitle}>Defender for Servers Plan 2</Text>
                        <Badge appearance="tint" color="success" size="small">Recommended</Badge>
                      </div>
                      <Text className={styles.addonCardDesc}>
                        Comprehensive server protection with EDR, vulnerability
                        management, and advanced threat detection.{" "}
                        <Link inline>Learn more</Link>
                      </Text>
                      <Text className={styles.addonCardPrice}>Price:</Text>
                      <Text className={styles.addonCardPriceValue}>$ XX.XX</Text>
                      <Button appearance="outline" size="small">Add</Button>
                    </Card>
                  </div>

                  {/* Carousel dots */}
                  <div className={styles.carouselDots}>
                    <Button appearance="transparent" size="small" icon={<ChevronLeft20Regular />} />
                    <div className={styles.carouselDot} />
                    <div className={styles.carouselDotInactive} />
                    <div className={styles.carouselDotInactive} />
                    <Button appearance="transparent" size="small" icon={<ChevronRight20Regular />} />
                  </div>
                </>
              )}

              <Divider />

              {/* Impact summary + Cost panel */}
              <div className={styles.bottomGrid}>
                <div className={styles.impactCard}>
                  <Text className={styles.impactTitle}>Impact summary</Text>
                  <Text className={styles.impactDescText}>
                    Enabling this feature will turn on the following capabilities
                    for <Text className={styles.boldText}>35 resources</Text> in{" "}
                    <Text className={styles.boldText}>{subscription || "sub-01"}</Text> all in one
                    go, no separate setup required.
                  </Text>
                  <ul className={styles.impactList}>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Azure Monitor VM insights (Preview)</Text>
                    </li>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Azure Policy and Machine Configurations</Text>
                    </li>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Change tracking and inventory</Text>
                    </li>
                    <li className={styles.impactItem}>
                      <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                      <Text>Azure Update Manager</Text>
                    </li>
                    {useCase === "secure" && (
                      <li className={styles.impactItem}>
                        <CheckmarkCircle16Filled className={styles.impactCheckIcon} />
                        <Text>Foundational CSPM</Text>
                      </li>
                    )}
                  </ul>
                </div>

                <Card className={styles.costCard}>
                  <Text className={styles.costTitle}>Cost</Text>
                  <div className={styles.costStatRow}>
                    <Text className={styles.costStatLabel}>Price</Text>
                    <Text className={styles.costStatValue}>$9.00</Text>
                  </div>
                  <Text className={styles.costLabel}>per server per month</Text>
                  <div className={styles.costStatRow}>
                    <Text className={styles.costStatLabel}>Savings per month</Text>
                    <Text className={styles.costStatValueGreen}>$5,773.77</Text>
                  </div>
                  <Button appearance="secondary" size="small">
                    View details
                  </Button>
                </Card>
              </div>
            </>
          )}

          {bladeStep === 3 && (
            <>
              {/* Success heading */}
              <Text className={styles.successTitle}>You&apos;re all set!</Text>

              {/* Summary section */}
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
                <Text className={styles.sectionTitle}>Summary</Text>
                <div className={styles.summaryGrid}>
                  {/* Cost saved card */}
                  <Card className={styles.summaryCard}>
                    <Text className={styles.summaryCardTitle}>Cost saved</Text>
                    <div className={styles.statBoxes}>
                      <div className={styles.statBox}>
                        <Text className={styles.statBoxLabel}>This month cost</Text>
                        <Text className={styles.statBoxValueGreen}>$5,773.77</Text>
                      </div>
                      <div className={styles.statBox}>
                        <Text className={styles.statBoxLabel}>Last month cost</Text>
                        <Text className={styles.statBoxValueNeutral}>$7,045.70</Text>
                      </div>
                    </div>
                    <Button appearance="outline" size="small">View details</Button>
                  </Card>

                  {/* Machines card */}
                  <Card className={styles.summaryCard}>
                    <Text className={styles.summaryCardTitle}>Machines</Text>
                    <div className={styles.statBoxes}>
                      <div className={styles.statBox}>
                        <Text className={styles.statBoxLabel}>Total alerts</Text>
                        <Text className={styles.statBoxValueNeutral}>12</Text>
                      </div>
                      <div className={styles.statBox}>
                        <Text className={styles.statBoxLabel}>Critical alerts</Text>
                        <Text className={styles.statBoxValueNeutral}>0</Text>
                      </div>
                    </div>
                    <Button appearance="outline" size="small">View details</Button>
                  </Card>
                </div>
              </div>

              {/* Recommended next steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
                <Text className={styles.sectionTitle}>Recommended next steps</Text>
                <div className={styles.nextStepsGrid}>
                  <Card className={styles.nextStepCard}>
                    <div className={styles.nextStepContent}>
                      <Text className={styles.nextStepTitle}>Optimize your machines</Text>
                      <Text className={styles.nextStepDesc}>
                        Optimize performance and resource usage to improve efficiency and reduce costs.
                      </Text>
                    </div>
                    <Button appearance="outline" size="small">Add</Button>
                  </Card>

                  <Card className={styles.nextStepCard}>
                    <div className={styles.nextStepContent}>
                      <Text className={styles.nextStepTitle}>Troubleshoot with Copilot</Text>
                      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
                        <div className={styles.skeletonLine} style={{ width: "100%" }} />
                        <div className={styles.skeletonLine} style={{ width: "60%" }} />
                      </div>
                    </div>
                    <Button appearance="outline" size="small" icon={<Sparkle20Regular />}>
                      Add AI features
                    </Button>
                  </Card>
                </div>

                {/* Carousel nav */}
                <div className={styles.carouselDots}>
                  <Button appearance="transparent" size="small" icon={<ChevronLeft20Regular />} />
                  <div className={styles.carouselDot} />
                  <div className={styles.carouselDotInactive} />
                  <div className={styles.carouselDotInactive} />
                  <div className={styles.carouselDotInactive} />
                  <Button appearance="transparent" size="small" icon={<ChevronRight20Regular />} />
                </div>
              </div>

              {/* Included resources */}
              <div className={styles.resourcesSection}>
                <div className={styles.resourcesHeader}>
                  <History20Regular className={styles.resourcesIcon} />
                  <Text className={styles.resourcesTitle}>Included resources (35)</Text>
                </div>

                <div className={styles.tableHeader}>
                  <Text className={styles.tableHeaderCell}>Name</Text>
                  <Text className={styles.tableHeaderCell}>Type</Text>
                  <Text className={styles.tableHeaderCell}>Status</Text>
                  <Text className={styles.tableHeaderCell}>Last viewed</Text>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableCellName}>
                    <Database20Regular className={styles.tableIcon} />
                    <Link className={styles.tableNameLink}>drizzle-db</Link>
                  </div>
                  <Text className={styles.tableCell}>SQL Database</Text>
                  <Text className={styles.statusActive}>Active</Text>
                  <Text className={styles.tableCell}>2 hours ago</Text>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableCellName}>
                    <DatabaseMultiple20Regular className={styles.tableIcon} />
                    <Link className={styles.tableNameLink}>drizzle-VM</Link>
                  </div>
                  <Text className={styles.tableCell}>Virtual Machine</Text>
                  <Text className={styles.statusActive}>Active</Text>
                  <Text className={styles.tableCell}>2 hours ago</Text>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableCellName}>
                    <Storage20Regular className={styles.tableIcon} />
                    <Link className={styles.tableNameLink}>drizzle-Fabric</Link>
                  </div>
                  <Text className={styles.tableCell}>Service Fabric cluster</Text>
                  <Text className={styles.statusActive}>Active</Text>
                  <Text className={styles.tableCell}>2 hours ago</Text>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.bladeFooter}>
          <div className={styles.footerLeft}>
            {bladeStep === 3 ? (
              <Button
                appearance="outline"
                onClick={() => {
                  onEnabled?.();
                  onClose();
                }}
              >
                Close
              </Button>
            ) : (
              <>
                <Button
                  appearance="subtle"
                  icon={<ArrowLeft20Regular />}
                  disabled={bladeStep === 1}
                  onClick={() => setBladeStep(1)}
                />
                {bladeStep === 1 ? (
                  <Button
                    appearance="secondary"
                    icon={<ArrowRight20Regular />}
                    iconPosition="after"
                    onClick={() => setBladeStep(2)}
                  >
                    Next
                  </Button>
                ) : (
                  <>
                    <Button
                      appearance="secondary"
                      icon={<ArrowRight20Regular />}
                      iconPosition="after"
                      disabled
                    >
                      Next
                    </Button>
                    <Button
                      appearance="primary"
                      icon={<Checkmark20Regular />}
                      disabled={!useCase}
                      onClick={() => setBladeStep(3)}
                    >
                      Enable
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
          <div className={styles.footerRight}>
            <Button appearance="transparent" size="small" icon={<Edit20Regular />}>
              Give feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
