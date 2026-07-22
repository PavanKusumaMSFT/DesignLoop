"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Title2,
  Body1,
  Caption1Strong,
  Button,
  Divider,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import {
  Add20Regular,
  Open16Regular,
  CheckmarkCircle16Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ArchService {
  id: string;
  name: string;
  role: string;
  tier: string;
  cost: string;
  icon: string;
  description: string;
  features: string[];
  docsUrl: string;
}

export interface SuggestedArchItemProps {
  /** Short label shown above the title — defaults to "Recommended architecture" */
  label?: string;
  /** Title of the architecture pattern, e.g. "Basic web app" */
  title: string;
  /** Multi-sentence description of the architecture */
  subtitle: string;
  /** URL of the architecture diagram image */
  architectureDiagramUrl: string;
  /** Alt text for the architecture diagram */
  architectureDiagramAlt?: string;
  /** URL for the "Learn more" docs link */
  docsUrl: string;
  /** Human-readable total estimated cost, e.g. "~$81/month" */
  totalCost: string;
  /** Optional URL for the Azure pricing calculator */
  pricingCalculatorUrl?: string;
  /** Services included in this architecture */
  services: ArchService[];
  /** Called when the user clicks a service card */
  onServiceSelect?: (serviceId: string) => void;
  /** Called when the user clicks the primary Create button */
  onCreateClick?: () => void;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "100%",
  },
  // ─── Full-width module header ─────────────────────────────────────────────
  moduleHeader: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  // ─── Body row: description | diagram | cost ───────────────────────────────
  mainCol: {
    display: "flex",
    flexDirection: "row",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "flex-start",
    width: "100%",
  },
  // ─── Left content column: description+diagram split + services ────────────
  contentCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: 0,
  },
  centerSplit: {
    display: "flex",
    flexDirection: "row",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "flex-start",
  },
  // ─── Description + buttons column ────────────────────────────────────────
  archHero: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: 0,
    maxWidth: "600px",
  },
  archLabel: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXXS,
  },
  archLabelDot: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
    display: "flex",
  },
  archLabelText: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  archTitle: {
    display: "block",
  },
  archDescription: {
    display: "block",
    color: tokens.colorNeutralForeground2,
    whiteSpace: "pre-line",
  },
  archButtonGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  externalLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  // ─── Diagram ─────────────────────────────────────────────────────────────
  diagramCard: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    cursor: "pointer",
    padding: "0",
    width: "156px",
    height: "100px",
    flexShrink: 0,
    transitionProperty: "box-shadow, border-color",
    transitionDuration: tokens.durationFast,
    ":hover": {
      boxShadow: tokens.shadow16,
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
    },
  },
  diagramImg: {
    width: "156px",
    height: "100px",
    objectFit: "cover",
    display: "block",
  },
  // ─── Diagram modal ────────────────────────────────────────────────────────
  dialogSurface: {
    maxWidth: "90vw",
    width: "960px",
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  dialogImgWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalXXL,
  },
  dialogImg: {
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  dialogCloseRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: tokens.spacingVerticalM,
  },
  // ─── Services ─────────────────────────────────────────────────────────────
  servicesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalS,
  },
  serviceCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: "pointer",
    transitionProperty: "box-shadow",
    transitionDuration: tokens.durationFast,
    ":hover": {
      boxShadow: tokens.shadow8,
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
    },
  },
  serviceCardIcon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
  },
  serviceCardName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  // ─── Cost panel (right pane) ──────────────────────────────────────────────
  costPanel: {
    flex: "0 0 280px",
    position: "sticky",
    top: tokens.spacingVerticalL,
    alignSelf: "flex-start",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  costPanelTitle: {
    display: "block",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  costLineItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalS,
  },
  costLineLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  costLineValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    flexShrink: 0,
  },
  costTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  costTotalLabel: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  costTotalValue: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    flexShrink: 0,
  },
  costPanelNote: {
    display: "block",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase300,
  },
});

// ─── Component ───────────────────────────────────────────────────────────────

/** Renders a suggested architecture item — description + diagram (65/35), services grid, and a sticky cost panel. */
export default function SuggestedArchItem({
  label = "Recommended architecture",
  title,
  subtitle,
  architectureDiagramUrl,
  architectureDiagramAlt,
  docsUrl,
  totalCost,
  pricingCalculatorUrl,
  services,
  onServiceSelect,
  onCreateClick,
}: SuggestedArchItemProps) {
  const styles = useStyles();
  const [diagramModalOpen, setDiagramModalOpen] = useState(false);

  return (
    <div className={styles.root}>
      {/* ── Full-width header: label + title ───────────────────────── */}
      <div className={styles.moduleHeader}>
        <div className={styles.archLabel}>
          <CheckmarkCircle16Regular className={styles.archLabelDot} />
          <Text className={styles.archLabelText}>{label}</Text>
        </div>
        <Title2 className={styles.archTitle}>{title}</Title2>
      </div>

      {/* ── Body row: contentCol | costPanel ────────────────────────── */}
      <div className={styles.mainCol}>
        <div className={styles.contentCol}>
          {/* Diagram + description split */}
          <div className={styles.centerSplit}>
            {/* Architecture diagram */}
            <div
              className={styles.diagramCard}
              onClick={() => setDiagramModalOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="View architecture diagram"
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setDiagramModalOpen(true)
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={architectureDiagramUrl}
                alt={architectureDiagramAlt ?? `${title} architecture diagram`}
                className={styles.diagramImg}
              />
            </div>

            {/* Description + buttons */}
            <div className={styles.archHero}>
              <Body1 className={styles.archDescription}>{subtitle}</Body1>
              <div className={styles.archButtonGroup}>
                <Button
                  appearance="primary"
                  icon={<Add20Regular />}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCreateClick?.();
                  }}
                >
                  Create
                </Button>
                <a
                  href={docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  Learn more <Open16Regular />
                </a>
              </div>
            </div>
          </div>

          {/* Services grid — below diagram + description */}
          <div className={styles.servicesContainer}>
            <Text weight="semibold" size={400}>
              Services used
            </Text>
            <div className={styles.servicesGrid}>
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className={styles.serviceCard}
                  onClick={() => onServiceSelect?.(svc.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    onServiceSelect?.(svc.id)
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svc.icon}
                    alt={svc.name}
                    className={styles.serviceCardIcon}
                  />
                  <Caption1Strong>{svc.name}</Caption1Strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cost panel ────────────────────────────────────────────── */}
        <div className={styles.costPanel}>
          <Text className={styles.costPanelTitle}>Estimated cost</Text>
          <Divider />
          {services.map((svc) => (
            <div key={svc.id} className={styles.costLineItem}>
              <Text className={styles.costLineLabel}>{svc.name}</Text>
              <Text className={styles.costLineValue}>{svc.cost}</Text>
            </div>
          ))}
          <div className={styles.costTotalRow}>
            <Text className={styles.costTotalLabel}>Total</Text>
            <Text className={styles.costTotalValue}>{totalCost}</Text>
          </div>
          <Text className={styles.costPanelNote}>
            Estimated / month. Costs vary by region and usage.
          </Text>
          {pricingCalculatorUrl && (
            <a
              href={pricingCalculatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              Pricing calculator <Open16Regular />
            </a>
          )}
        </div>
      </div>
      <Dialog
        open={diagramModalOpen}
        onOpenChange={(_, data) => setDiagramModalOpen(data.open)}
      >
        <DialogSurface className={styles.dialogSurface}>
          <DialogBody>
            <DialogContent>
              <div className={styles.dialogCloseRow}>
                <Button
                  appearance="subtle"
                  icon={<Dismiss24Regular />}
                  onClick={() => setDiagramModalOpen(false)}
                  aria-label="Close diagram"
                />
              </div>
              <div className={styles.dialogImgWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={architectureDiagramUrl}
                  alt={
                    architectureDiagramAlt ?? `${title} architecture diagram`
                  }
                  className={styles.dialogImg}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <a
                href={architectureDiagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                Open original <Open16Regular />
              </a>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
