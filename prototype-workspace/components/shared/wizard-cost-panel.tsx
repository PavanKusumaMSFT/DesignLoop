"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Skeleton,
  SkeletonItem,
  mergeClasses,
} from "@fluentui/react-components";
import { ArrowMaximize20Regular } from "@fluentui/react-icons";
import { ReactNode } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CostLineItem {
  /** Label for the cost item (e.g., "Virtual Machine") */
  label: string;
  /** Cost value as a string (e.g., "$30.37", "$0.00") */
  value: string;
  /** Optional detail text (e.g., "Standard_B2s (2 vCPU, 4 GB)") */
  detail?: string;
}

export interface WizardCostPanelProps {
  /** Title text above the cost breakdown (default: "Estimated monthly cost") */
  title?: string;
  /** Total estimated cost (e.g., "$30.37") — shown prominently */
  total?: string;
  /** Unit label after total (e.g., "/month") */
  totalUnit?: string;
  /** Individual cost line items */
  items?: CostLineItem[];
  /** Whether to show a loading skeleton instead of real data */
  loading?: boolean;
  /** Optional footer text (e.g., disclaimer) */
  disclaimer?: ReactNode;
  /** Optional attribution line (e.g., "Cost estimated by Copilot") */
  attribution?: ReactNode;
  /** Show expand icon in the header */
  expandable?: boolean;
  /** Called when expand icon is clicked */
  onExpand?: () => void;
  /** Optional className for the root container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    alignSelf: "flex-start",
    position: "sticky",
    top: "72px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalS,
  },
  headerTitle: {
    color: tokens.colorNeutralForeground2,
  },
  expandIcon: {
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
  },
  totalValue: {
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  totalUnit: {
    color: tokens.colorNeutralForeground2,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemLabel: {
    color: tokens.colorNeutralForeground1,
  },
  itemDetail: {
    color: tokens.colorNeutralForeground3,
  },
  itemValue: {
    color: tokens.colorNeutralForeground1,
    textAlign: "right" as const,
    flexShrink: 0,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  attribution: {
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalS,
  },
  disclaimer: {
    marginTop: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  // Skeleton loading
  skeletonValue: {
    width: "170px",
    height: "44px",
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalM,
  },
  skeletonLine: {
    width: "100%",
    height: "14px",
    borderRadius: tokens.borderRadiusSmall,
    marginBottom: tokens.spacingVerticalS,
  },
  skeletonLineShort: {
    width: "72%",
    height: "14px",
    borderRadius: tokens.borderRadiusSmall,
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Right-side cost estimation panel for wizard flows. Supports line items, totals, skeleton loading, and disclaimers. */
export default function WizardCostPanel({
  title = "Estimated monthly cost",
  total,
  totalUnit = "/month",
  items,
  loading = false,
  disclaimer,
  attribution,
  expandable = false,
  onExpand,
  className,
}: WizardCostPanelProps) {
  const styles = useStyles();

  if (loading) {
    return (
      <div className={mergeClasses(styles.root, className)}>
        <div className={styles.header}>
          <Text size={300} className={styles.headerTitle}>
            {title}
          </Text>
          {expandable && (
            <ArrowMaximize20Regular className={styles.expandIcon} />
          )}
        </div>
        <Skeleton animation="wave">
          <SkeletonItem className={styles.skeletonValue} />
          <SkeletonItem className={styles.skeletonLine} />
          <SkeletonItem className={styles.skeletonLineShort} />
        </Skeleton>
      </div>
    );
  }

  return (
    <div className={mergeClasses(styles.root, className)}>
      {/* Header */}
      <div className={styles.header}>
        <Text size={300} className={styles.headerTitle}>
          {title}
        </Text>
        {expandable && (
          <ArrowMaximize20Regular
            className={styles.expandIcon}
            onClick={onExpand}
          />
        )}
      </div>

      {/* Line items */}
      {items && items.length > 0 && (
        <div className={styles.itemsContainer}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <div>
                <Text size={300} className={styles.itemLabel}>
                  {item.label}
                </Text>
                {item.detail && (
                  <Text size={200} className={styles.itemDetail} block>
                    {item.detail}
                  </Text>
                )}
              </div>
              <Text size={300} className={styles.itemValue}>
                {item.value}
              </Text>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      {total && (
        <>
          {items && items.length > 0 ? (
            <div className={styles.totalRow}>
              <Text size={300} weight="semibold">
                Estimated monthly
              </Text>
              <Text size={500} weight="semibold">
                {total}
              </Text>
            </div>
          ) : (
            <Text size={600} weight="semibold" className={styles.totalValue}>
              {total}
              <Text size={300} weight="regular" className={styles.totalUnit}>
                {totalUnit}
              </Text>
            </Text>
          )}
        </>
      )}

      {/* Attribution */}
      {attribution && (
        <Text size={200} className={styles.attribution} block>
          {attribution}
        </Text>
      )}

      {/* Disclaimer */}
      {disclaimer && <div className={styles.disclaimer}>{disclaimer}</div>}
    </div>
  );
}
