"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import type { Bundle, StartupService } from "../startups-data";
import { BundleCard } from "./bundle-card";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: "4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
  },
});

interface Props {
  bundles: Bundle[];
  serviceMap: Map<string, StartupService>;
  onCreateClick: (bundleId: string) => void;
}

export function BundleList({ bundles, serviceMap, onCreateClick }: Props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.sectionLabel}>
        {bundles.length} quick-start bundle{bundles.length !== 1 ? "s" : ""}{" "}
        available for this goal
      </div>
      <div className={styles.grid}>
        {bundles.map((bundle) => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            serviceMap={serviceMap}
            onCreateClick={onCreateClick}
          />
        ))}
      </div>
    </div>
  );
}
