"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Divider,
  Badge,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ChevronDown20Regular,
  ChevronUp20Regular,
  Dismiss20Regular,
  Checkmark20Regular,
} from "@fluentui/react-icons";
import type { Bundle, StartupService } from "../startups-data";

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    boxShadow:
      "0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 4px 0px rgba(0,0,0,0.14)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 0.15s ease",
    ":hover": {
      boxShadow: tokens.shadow16,
    },
  },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase400,
  },
  outcomeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
  },
  sectionLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyBase,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "6px",
  },
  servicesRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
  },
  serviceChip: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 8px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "4px",
    fontSize: tokens.fontSizeBase200,
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
  },
  serviceIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },
  learnList: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    paddingLeft: "0",
    margin: "0",
    listStyle: "none",
  },
  learnItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "6px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
  },
  learnIcon: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
    marginTop: "2px",
    width: "14px",
    height: "14px",
  },
  whyExpander: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: "none",
    borderRadius: "4px",
    padding: "10px 12px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    transition: "background 0.12s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  whyContent: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "0 0 4px 4px",
    padding: "8px 12px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  whyItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "6px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
  },
  whyBullet: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightBold,
    flexShrink: 0,
  },
  cardFooter: {
    padding: "12px 20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    gap: "8px",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  // Compare panel overlay
  overlayBackdrop: {
    position: "fixed",
    inset: "0",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  comparePanel: {
    position: "fixed",
    right: "0",
    top: "0",
    bottom: "0",
    width: "480px",
    maxWidth: "90vw",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  comparePanelHeader: {
    padding: "20px 20px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  comparePanelTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
  },
  comparePanelBody: {
    padding: "20px",
    overflowY: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  optionHeading: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    marginBottom: "6px",
  },
  optionChipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "8px",
  },
  prosList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  prosItem: {
    display: "flex",
    gap: "6px",
    alignItems: "flex-start",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
  },
  prosIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
    marginTop: "2px",
    width: "14px",
    height: "14px",
  },
  consIcon: {
    color: tokens.colorStatusDangerForeground1,
    flexShrink: 0,
    marginTop: "2px",
    width: "14px",
    height: "14px",
  },
  recommendedBadge: {
    marginLeft: "8px",
  },
  iconMd: {
    width: "16px",
    height: "16px",
  },
  optionHeadingRow: {
    display: "flex",
    alignItems: "center",
  },
  dividerMt: {
    marginTop: "16px",
  },
});

interface Props {
  bundle: Bundle;
  serviceMap: Map<string, StartupService>;
  onCreateClick: (bundleId: string) => void;
}

export function BundleCard({ bundle, serviceMap, onCreateClick }: Props) {
  const styles = useStyles();
  const [whyExpanded, setWhyExpanded] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  // telemetry stubs
  const trackCompareOpened = () => {
    console.info("[Telemetry] Startups_compare_opened", bundle.id);
  };
  const trackCreateClicked = () => {
    console.info("[Telemetry] Startups_create_clicked", bundle.id);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardTitle}>{bundle.title}</div>
          <div className={styles.outcomeText}>{bundle.outcome}</div>

          {/* Included services */}
          <div>
            <div className={styles.sectionLabel}>Included services</div>
            <div className={styles.servicesRow}>
              {bundle.serviceIds.map((svcId) => {
                const svc = serviceMap.get(svcId);
                return (
                  <div key={svcId} className={styles.serviceChip}>
                    {svc?.icon && (
                      <img
                        src={svc.icon}
                        alt={svc.name}
                        className={styles.serviceIcon}
                      />
                    )}
                    {svc?.name ?? svcId}
                  </div>
                );
              })}
            </div>
          </div>

          {/* What you'll learn */}
          <div>
            <div className={styles.sectionLabel}>What you&apos;ll learn</div>
            <ul className={styles.learnList}>
              {bundle.whatYouLearn.map((item, i) => (
                <li key={i} className={styles.learnItem}>
                  <Checkmark20Regular className={styles.learnIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Why this? expandable */}
          <div>
            <button
              className={styles.whyExpander}
              onClick={() => setWhyExpanded((v) => !v)}
              aria-expanded={whyExpanded}
            >
              <span>Why this?</span>
              {whyExpanded ? (
                <ChevronUp20Regular className={styles.iconMd} />
              ) : (
                <ChevronDown20Regular className={styles.iconMd} />
              )}
            </button>
            {whyExpanded && (
              <div className={styles.whyContent}>
                {bundle.whyThis.map((bullet, i) => (
                  <div key={i} className={styles.whyItem}>
                    <span className={styles.whyBullet}>·</span>
                    {bullet}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className={styles.cardFooter}>
          <Button
            appearance="primary"
            size="small"
            onClick={() => {
              trackCreateClicked();
              onCreateClick(bundle.id);
            }}
          >
            Create
          </Button>
          <Button
            appearance="outline"
            size="small"
            onClick={() => {
              trackCompareOpened();
              setCompareOpen(true);
            }}
            disabled={bundle.alternatives.length === 0}
          >
            Compare alternatives
          </Button>
        </div>
      </div>

      {/* Compare drawer */}
      {compareOpen && (
        <>
          <div
            className={styles.overlayBackdrop}
            onClick={() => setCompareOpen(false)}
          />
          <div className={styles.comparePanel} role="dialog" aria-modal="true">
            <div className={styles.comparePanelHeader}>
              <span className={styles.comparePanelTitle}>Compare options</span>
              <Button
                appearance="transparent"
                size="small"
                icon={<Dismiss20Regular />}
                onClick={() => setCompareOpen(false)}
                aria-label="Close compare panel"
              />
            </div>
            <div className={styles.comparePanelBody}>
              {/* Recommended option */}
              <div>
                <div className={styles.optionHeadingRow}>
                  <div className={styles.optionHeading}>{bundle.title}</div>
                  <Badge
                    appearance="filled"
                    color="brand"
                    size="small"
                    className={styles.recommendedBadge}
                  >
                    Recommended
                  </Badge>
                </div>
                <div className={styles.optionChipRow}>
                  {bundle.serviceIds.map((svcId) => {
                    const svc = serviceMap.get(svcId);
                    return (
                      <div key={svcId} className={styles.serviceChip}>
                        {svc?.icon && (
                          <img
                            src={svc.icon}
                            alt={svc.name}
                            className={styles.serviceIcon}
                          />
                        )}
                        {svc?.name ?? svcId}
                      </div>
                    );
                  })}
                </div>
                <ul className={styles.prosList}>
                  {bundle.whyThis.map((b, i) => (
                    <li key={i} className={styles.prosItem}>
                      <Checkmark20Regular className={styles.prosIcon} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Alternative options */}
              {bundle.alternatives.map((alt, i) => (
                <div key={i}>
                  <div className={styles.optionHeading}>{alt.title}</div>
                  <div className={styles.optionChipRow}>
                    {alt.serviceIds.map((svcId) => {
                      const svc = serviceMap.get(svcId);
                      return (
                        <div key={svcId} className={styles.serviceChip}>
                          {svc?.icon && (
                            <img
                              src={svc.icon}
                              alt={svc.name}
                              className={styles.serviceIcon}
                            />
                          )}
                          {svc?.name ?? svcId}
                        </div>
                      );
                    })}
                  </div>
                  <ul className={styles.prosList}>
                    {alt.pros.map((p, j) => (
                      <li key={`p-${j}`} className={styles.prosItem}>
                        <Checkmark20Regular className={styles.prosIcon} />
                        {p}
                      </li>
                    ))}
                    {alt.cons.map((c, j) => (
                      <li key={`c-${j}`} className={styles.prosItem}>
                        <Dismiss20Regular className={styles.consIcon} />
                        {c}
                      </li>
                    ))}
                  </ul>
                  {i < bundle.alternatives.length - 1 && (
                    <Divider className={styles.dividerMt} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
