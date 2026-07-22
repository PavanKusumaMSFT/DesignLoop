/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { makeStyles, tokens as fluentTokens, Button } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Checkmark20Filled,
  ArrowRight20Regular,
  Open20Regular,
} from "@fluentui/react-icons";
import type { Bundle, StartupService } from "../startups-data";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
  },
  successRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  successIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#DFF6DD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: tokens.colorPaletteGreenForeground1,
  },
  successTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase500,
  },
  successSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    marginTop: "2px",
  },
  sectionLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyBase,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "8px",
  },
  servicesRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  serviceChip: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    fontSize: tokens.fontSizeBase200,
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
    boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
  },
  serviceIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },
  nextStepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  },
  nextStepCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "6px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  },
  nextStepTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
  },
  nextStepDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase200,
  },
  nextStepLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    fontFamily: tokens.fontFamilyBase,
    cursor: "pointer",
    textDecoration: "none",
    marginTop: "4px",
    ":hover": {
      textDecoration: "underline",
    },
  },
  actionsRow: {
    display: "flex",
    gap: "8px",
  },
  checkmarkIconLarge: {
    width: "24px",
    height: "24px",
  },
  openIconSmall: {
    width: "14px",
    height: "14px",
  },
});

interface Props {
  bundle: Bundle;
  serviceMap: Map<string, StartupService>;
  onDone: () => void;
}

const NEXT_STEPS = [
  {
    title: "Take the quickstart",
    description: "A 15-minute guided tutorial from Microsoft Learn.",
    link: "#",
    linkLabel: "Open tutorial",
  },
  {
    title: "Set up CI/CD",
    description: "Connect GitHub or Azure DevOps to auto-deploy on push.",
    link: "#",
    linkLabel: "Configure pipelines",
  },
  {
    title: "Add monitoring",
    description: "Enable Application Insights to track errors and performance.",
    link: "#",
    linkLabel: "Enable monitoring",
  },
  {
    title: "Manage costs",
    description: "Set a budget alert so you're never surprised by your bill.",
    link: "#",
    linkLabel: "Set budget",
  },
];

export function NextSteps({ bundle, serviceMap, onDone }: Props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {/* Success header */}
      <div className={styles.successRow}>
        <div className={styles.successIcon}>
          <Checkmark20Filled className={styles.checkmarkIconLarge} />
        </div>
        <div>
          <div className={styles.successTitle}>
            {bundle.title} — deployment initiated
          </div>
          <div className={styles.successSubtitle}>
            Your resources are being provisioned. This usually takes 2–3
            minutes.
          </div>
        </div>
      </div>

      {/* Provisioned services */}
      <div>
        <div className={styles.sectionLabel}>Resources being created</div>
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

      {/* Next steps */}
      <div>
        <div className={styles.sectionLabel}>What to do next</div>
        <div className={styles.nextStepsGrid}>
          {NEXT_STEPS.map((step, i) => (
            <div key={i} className={styles.nextStepCard}>
              <div className={styles.nextStepTitle}>{step.title}</div>
              <div className={styles.nextStepDesc}>{step.description}</div>
              <a
                href={step.link}
                className={styles.nextStepLink}
                target="_blank"
                rel="noreferrer"
              >
                {step.linkLabel}
                <Open20Regular className={styles.openIconSmall} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actionsRow}>
        <Button
          appearance="outline"
          size="small"
          icon={<ArrowRight20Regular />}
          iconPosition="after"
          onClick={onDone}
        >
          Pick another goal
        </Button>
      </div>
    </div>
  );
}
