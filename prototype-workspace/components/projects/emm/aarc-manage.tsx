"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Card,
  Link,
  Divider,
} from "@fluentui/react-components";
import {
  ArrowTurnUpLeft20Regular,
  AddCircle20Regular,
  History20Regular,
  Database20Regular,
  DatabaseMultiple20Regular,
  Storage20Regular,
  TextBulletListSquareSparkle20Regular,
  ChevronUp20Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Copy20Regular,
  ArrowSync20Regular,
  Send20Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  Warning16Filled,
  Sparkle20Regular,
  ShieldTask20Regular,
} from "@fluentui/react-icons";
import { NavigationProvider } from "../../../lib/navigation-context";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  pageContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },

  /* Title area */
  titleArea: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleLeft: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  resourceName: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  statusText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  titleActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },

  /* Summary section */
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  summaryCard: {
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  summaryCardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "24px",
  },
  statPairRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  statValue: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  statValueGreen: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "22px",
  },
  skeletonBar: {
    height: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
  },

  /* Recommended next steps */
  nextStepsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  nextStepCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  nextStepTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  nextStepDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  nextStepActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  copilotCardProgress: {
    height: "6px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: "#0078D4",
    width: "70%",
  },
  copilotCardProgressTrack: {
    height: "6px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralStroke2,
    width: "100%",
  },

  /* Carousel dots */
  carouselDots: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  carouselArrow: {
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralStroke2,
  },
  dotActive: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground1,
  },

  /* Included resources */
  resourcesSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalL,
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
    gridTemplateColumns: "1.5fr 1.2fr 1.2fr 1fr",
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
    gridTemplateColumns: "1.5fr 1.2fr 1.2fr 1fr",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalM} 0`,
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
  },
  tableNameLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  statusActiveLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  warningText: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorPaletteYellowForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tableIcon: {
    color: tokens.colorNeutralForeground3,
  },

  /* Copilot summary section */
  copilotSection: {
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  copilotHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  copilotHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  copilotTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  healthRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  healthDot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  healthText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  copilotBody: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  copilotActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  feedbackRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  disclaimer: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  chatInput: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  chatInputText: {
    flex: 1,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase300,
  },
  summarySection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  nextStepsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
});

export interface AarcManageProps {
  /** Resource name displayed in the header */
  resourceName?: string;
  /** Called when navigating to Home */
  onHome?: () => void;
  /** Called when navigating to Arc Center */
  onNavigateToArcCenter?: () => void;
  /** Called when a search result is selected */
  onSearchSelect?: (item: string) => void;
}

/** Resource detail page for an Azure Arc machine — shows summary, recommended next steps, included resources, and Copilot health summary. */
export default function AarcManage({
  resourceName = "Aarc-1",
  onHome,
  onNavigateToArcCenter,
  onSearchSelect,
}: AarcManageProps) {
  const styles = useStyles();
  const [copilotExpanded, setCopilotExpanded] = useState(true);

  return (
    <NavigationProvider>
      <div className={styles.root}>
        <AzureHeaderBuildMVP
          isDarkMode={false}
          onLogoClick={onHome}
          onSuggestionSelect={onSearchSelect}
        />
        <PageBreadcrumb
          noBorder
          items={[
            { label: "Home", onClick: onHome },
            { label: resourceName.toLowerCase() },
            { label: "" },
          ]}
        />

        <div className={styles.pageContent}>
          {/* Title area */}
          <div className={styles.titleArea}>
            <div className={styles.titleLeft}>
              <Text className={styles.resourceName}>{resourceName}</Text>
              <div className={styles.statusRow}>
                <div className={styles.statusDot} />
                <Text className={styles.statusText}>
                  All systems operational · Created 3 months ago · Last modified
                  2 days ago
                </Text>
              </div>
            </div>
            <div className={styles.titleActions}>
              <Button
                appearance="secondary"
                icon={<ArrowTurnUpLeft20Regular />}
                onClick={onNavigateToArcCenter}
              >
                Return to Arc Center
              </Button>
              <Button appearance="primary" icon={<AddCircle20Regular />}>
                Add a resource
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className={styles.summarySection}>
            <Text className={styles.sectionTitle}>Summary</Text>
            <div className={styles.summaryGrid}>
              {/* Cost card */}
              <Card className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>Cost</Text>
                <div className={styles.statPairRow}>
                  <div className={styles.statItem}>
                    <Text className={styles.statLabel}>Current month cost</Text>
                    <Text className={styles.statValueGreen}>$5,773.77</Text>
                  </div>
                  <div className={styles.statItem}>
                    <Text className={styles.statLabel}>Last month cost</Text>
                    <Text className={styles.statValue}>$7,045.70</Text>
                  </div>
                </div>
                <Button appearance="outline" size="small">
                  View details
                </Button>
              </Card>

              {/* Alerts card */}
              <Card className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>Alerts</Text>
                <div className={styles.statPairRow}>
                  <div className={styles.statItem}>
                    <Text className={styles.statLabel}>Total alerts</Text>
                    <Text className={styles.statValue}>12</Text>
                  </div>
                  <div className={styles.statItem}>
                    <Text className={styles.statLabel}>Critical alerts</Text>
                    <Text className={styles.statValue}>0</Text>
                  </div>
                </div>
                <Button appearance="outline" size="small">
                  View details
                </Button>
              </Card>

              {/* Something card (skeleton/placeholder) */}
              <Card className={styles.summaryCard}>
                <Text className={styles.summaryCardTitle}>Something</Text>
                <div className={styles.skeletonBar} style={{ width: "80%" }} />
                <div className={styles.skeletonBar} style={{ width: "60%" }} />
                <Button appearance="outline" size="small">
                  Action
                </Button>
              </Card>
            </div>
          </div>

          {/* Recommended next steps */}
          <div className={styles.nextStepsSection}>
            <Text className={styles.sectionTitle}>Recommended next steps</Text>
            <div className={styles.nextStepsGrid}>
              {/* Enable EMM card */}
              <Card className={styles.nextStepCard}>
                <Text className={styles.nextStepTitle}>
                  Enable Essential Machine Management
                </Text>
                <Text className={styles.nextStepDescription}>
                  Centrally manage, secure, and monitor your machines with
                  consistent policies, helping you reduce operational overhead,
                  lower costs, and improve reliability and compliance.
                </Text>
                <div className={styles.nextStepActions}>
                  <Button
                    appearance="primary"
                    size="small"
                    icon={<ShieldTask20Regular />}
                  >
                    Enable
                  </Button>
                  <Button appearance="outline" size="small">
                    Learn more
                  </Button>
                </div>
              </Card>

              {/* Troubleshoot with Copilot card */}
              <Card className={styles.nextStepCard}>
                <Text className={styles.nextStepTitle}>
                  Troubleshoot with Copilot
                </Text>
                <div className={styles.copilotCardProgressTrack}>
                  <div className={styles.copilotCardProgress} />
                </div>
                <Button
                  appearance="outline"
                  size="small"
                  icon={<Sparkle20Regular />}
                >
                  Add AI features
                </Button>
              </Card>
            </div>
          </div>

          {/* Carousel dots */}
          <div className={styles.carouselDots}>
            <ChevronLeft20Regular className={styles.carouselArrow} />
            <div className={styles.dotActive} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <ChevronRight20Regular className={styles.carouselArrow} />
          </div>

          {/* Included resources */}
          <div className={styles.resourcesSection}>
            <div className={styles.resourcesHeader}>
              <History20Regular className={styles.resourcesIcon} />
              <Text className={styles.resourcesTitle}>
                Included resources (3)
              </Text>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.spacingHorizontalS,
                }}
              >
                <Link className={styles.statusActiveLink}>Active</Link>
                <Text className={styles.warningText}>
                  · <Warning16Filled /> Approaching capacity
                </Text>
              </div>
              <Text className={styles.tableCell}>2 hours ago</Text>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.tableCellName}>
                <DatabaseMultiple20Regular className={styles.tableIcon} />
                <Link className={styles.tableNameLink}>drizzle-VM</Link>
              </div>
              <Text className={styles.tableCell}>Virtual Machine</Text>
              <Link className={styles.statusActiveLink}>Active</Link>
              <Text className={styles.tableCell}>2 hours ago</Text>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.tableCellName}>
                <Storage20Regular className={styles.tableIcon} />
                <Link className={styles.tableNameLink}>drizzle-Fabric</Link>
              </div>
              <Text className={styles.tableCell}>Service Fabric cluster</Text>
              <Link className={styles.statusActiveLink}>Active</Link>
              <Text className={styles.tableCell}>2 hours ago</Text>
            </div>
          </div>

          {/* Copilot summary section */}
          <Card className={styles.copilotSection}>
            <div className={styles.copilotHeader}>
              <div className={styles.copilotHeaderLeft}>
                <TextBulletListSquareSparkle20Regular />
                <Text className={styles.copilotTitle}>
                  Summarize with Copilot
                </Text>
              </div>
              <Button
                appearance="transparent"
                size="small"
                icon={<ChevronUp20Regular />}
                onClick={() => setCopilotExpanded(!copilotExpanded)}
              />
            </div>

            {copilotExpanded && (
              <>
                <div className={styles.healthRow}>
                  <div className={styles.healthDot} />
                  <Text className={styles.healthText}>
                    Your environment looks healthy in this scope
                  </Text>
                </div>

                <Text className={styles.copilotBody}>
                  No availability, performance, or reliability issues were
                  detected, and recent deployments completed successfully.
                  Resource usage is stable, and current spending is tracking
                  within expected patterns, with no unusual cost signals to
                  review. There are no active alerts or recent configuration
                  changes that require attention right now.
                </Text>

                <Text className={styles.copilotBody}>
                  If you want to go deeper, you can ask to show detailed health
                  signals or set up service groups to create uptime goals.
                </Text>

                <div className={styles.copilotActions}>
                  <Button
                    appearance="outline"
                    size="small"
                    icon={<ArrowSync20Regular />}
                  >
                    Set up service group
                  </Button>
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<Copy20Regular />}
                  />
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<ArrowSync20Regular />}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.feedbackRow}>
                    <Button
                      appearance="transparent"
                      size="small"
                      icon={<ThumbLike20Regular />}
                    />
                    <Button
                      appearance="transparent"
                      size="small"
                      icon={<ThumbDislike20Regular />}
                    />
                  </div>
                  <Text className={styles.disclaimer}>
                    AI generated content may be incorrect
                  </Text>
                </div>

                <Divider />

                <div className={styles.chatInput}>
                  <Text className={styles.chatInputText}>
                    Tell Copilot what to [action], or type &apos;/&apos; for
                    commands
                  </Text>
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<Send20Regular />}
                  />
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </NavigationProvider>
  );
}
