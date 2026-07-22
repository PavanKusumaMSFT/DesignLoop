"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Divider,
} from "@fluentui/react-components";
import { Add16Regular } from "@fluentui/react-icons";
import type { Service } from "../build-2026/all-services-data";
import type { ServiceComparisonData } from "./intent-canned-data";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  serviceCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow16,
    },
  },
  cardHeader: {
    alignItems: "flex-start",
  },
  serviceIconContainer: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    alignSelf: "flex-start",
  },
  serviceIcon: {
    width: "32px",
    height: "32px",
  },
  serviceTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    flex: 1,
  },
  serviceName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    fontFamily: tokens.fontFamilyBase,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    flex: 1,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  rowLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
    fontFamily: tokens.fontFamilyBase,
  },
  rowText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    fontFamily: tokens.fontFamilyBase,
  },
  divider: {
    flexShrink: 0,
  },
  cardFooter: {
    paddingTop: tokens.spacingVerticalS,
  },
  pairWithList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalXXS,
    paddingLeft: tokens.spacingHorizontalM,
  },
  pairWithItem: {
    listStyleType: "disc",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  pairWithName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
});

export interface IntentComparisonCardProps {
  service: Service;
  comparison?: ServiceComparisonData;
  onClick?: () => void;
}

/** Comparison card for the intent-based results view. Shows best-at, management style, cost model, and why this service was suggested — with a single Create CTA. */
export default function IntentComparisonCard({
  service,
  comparison,
  onClick,
}: IntentComparisonCardProps) {
  const styles = useStyles();

  const fallback: ServiceComparisonData = {
    bestAt: service.description,
    management: "Management details not available for this service.",
    costModel: "",
    whySuggested: "This service is commonly used for workloads like yours.",
    pairWith: [] as { name: string; reason: string }[],
  };

  const data = comparison ?? fallback;

  return (
    <Card
      className={styles.serviceCard}
      appearance="filled"
      size="medium"
      focusMode="tab-exit"
      aria-label={service.name}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      <CardHeader
        className={styles.cardHeader}
        image={
          <div className={styles.serviceIconContainer}>
            <img src={service.icon} alt="" className={styles.serviceIcon} />
          </div>
        }
        header={
          <div className={styles.serviceTextContainer}>
            <div className={styles.serviceName}>{service.name}</div>
          </div>
        }
      />

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Why suggested</span>
          <span className={styles.rowText}>{data.whySuggested}</span>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.rowLabel}>Best at</span>
          <span className={styles.rowText}>{data.bestAt}</span>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.rowLabel}>Management</span>
          <span className={styles.rowText}>{data.management}</span>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.rowLabel}>Pair with</span>
          <ul className={styles.pairWithList}>
            {(data.pairWith ?? []).map((item) => (
              <li key={item.name} className={styles.pairWithItem}>
                <span className={styles.pairWithName}>{item.name}</span>
                {" — "}
                {item.reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CardFooter className={styles.cardFooter}>
        <Button
          appearance="primary"
          icon={<Add16Regular />}
          onClick={(e) => e.stopPropagation()}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
