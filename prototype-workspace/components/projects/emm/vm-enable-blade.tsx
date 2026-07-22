"use client";

import { useState, useEffect } from "react";
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
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";
import {
  Dismiss20Regular,
  Info16Regular,
  Info12Regular,
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
  Shield20Regular,
  Eye20Regular,
  ArrowSync20Regular,
  DocumentBulletList20Regular,
  ShieldCheckmark20Regular,
  Add20Regular,
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
  infoMessage: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: "16px",
    marginTop: tokens.spacingVerticalXXS,
  },
  infoMessageIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  aiRecommendation: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    lineHeight: "16px",
    marginTop: tokens.spacingVerticalXXS,
    cursor: "pointer",
  },
  aiRecommendationIcon: {
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
    fontSize: "14px",
  },

  /* Exclude resources section */
  excludeSection: {
    padding: `0 ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalS}`,
    flexShrink: 0,
  },
  excludeLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
  },
  resourceGrid: {
    maxHeight: "200px",
    overflowY: "auto",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  resourceGridHeader: {
    display: "grid",
    gridTemplateColumns: "32px 1fr 1fr 1fr",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    position: "sticky" as const,
    top: 0,
    zIndex: 1,
  },
  resourceGridHeaderText: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  resourceGridRow: {
    display: "grid",
    gridTemplateColumns: "32px 1fr 1fr 1fr",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    ":last-child": {
      borderBottom: "none",
    },
  },
  resourceGridCell: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  resourceGridLink: {
    fontSize: tokens.fontSizeBase200,
  },

  /* Two-column bottom */
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
    padding: `0 ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalS} ${tokens.spacingHorizontalXXL}`,
    flexShrink: 0,
  },
  impactCard: {
    padding: tokens.spacingHorizontalM,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
  },
  impactTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  impactList: {
    listStyleType: "none",
    paddingLeft: "0",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
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
    padding: tokens.spacingHorizontalM,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  costViewDetailsBtn: {
    marginTop: "auto",
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
  impactDescText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  boldText: {
    fontWeight: tokens.fontWeightSemibold,
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

  /* Add-on cards carousel */
  addonCardsStack: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  addonAccordionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: tokens.spacingHorizontalS,
  },
  addonHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flex: 1,
    minWidth: 0,
  },
  addonCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  addonHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  addonPriceInline: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
    whiteSpace: "nowrap",
  },
  addonCardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  addonPanelActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
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
  addButtonInHeader: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
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
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  successBanner: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorPaletteGreenBackground1,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalL,
  },
  successBannerIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "28px",
    flexShrink: 0,
  },
  successBannerText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  successSubInfo: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
  },
  successSubRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  successSectionLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  successCapabilitiesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalL,
  },
  successCapItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalXXS} 0`,
  },
  successCapIcon: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "16px",
    flexShrink: 0,
  },
  successDivider: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalS} 0`,
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  reviewSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  reviewGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  reviewGroupTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  reviewRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    minWidth: "140px",
    flexShrink: 0,
  },
  reviewValue: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
    textAlign: "right",
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
  resourceTable: {
    width: "100%",
    borderCollapse: "collapse",
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

  /* FRE Dialog overlay */
  freOverlay: {
    position: "absolute",
    inset: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  freDialog: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    width: "480px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  freHero: {
    width: "100%",
    height: "240px",
    background:
      "linear-gradient(135deg, #e8d5f5 0%, #b4d8fa 30%, #a0c4f0 50%, #c8dff8 70%, #f0e8f8 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  freHubContainer: {
    position: "relative",
    width: "380px",
    height: "200px",
  },
  freHubCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "72px",
    height: "72px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#0078D4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: tokens.shadow8,
    zIndex: 2,
  },
  freHubCenterIcon: {
    width: "36px",
    height: "36px",
  },
  freSpoke: {
    position: "absolute",
    width: "48px",
    height: "48px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: tokens.shadow4,
    zIndex: 2,
  },
  freSpokeIcon: {
    color: "#0078D4",
    fontSize: "20px",
  },
  freLine: {
    position: "absolute",
    backgroundColor: "#0078D4",
    opacity: 0.5,
    zIndex: 1,
    borderRadius: "2px",
  },
  freBody: {
    padding: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  freTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  freDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  freCapabilityList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
  },
  freCapabilityRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  freCapabilityText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  freCapabilityBold: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  freFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
  },
});

export interface EmmEnableBladeProps {
  /** Whether the blade is open */
  isOpen: boolean;
  /** Called when the blade is closed */
  onClose: () => void;
  /** Called when EMM has been successfully enabled (Close from step 3) */
  onEnabled?: () => void;
  /** Called when navigating to the VM overview page */
  onNavigateVm?: () => void;
  /** Pre-filled subscription value (empty = no default) */
  defaultSubscription?: string;
}

/** Right-side context blade for enabling Essential Machine Management, with an initial FRE dialog. */
export default function EmmEnableBlade({
  isOpen,
  onClose,
  onEnabled,
  onNavigateVm,
  defaultSubscription = "",
}: EmmEnableBladeProps) {
  const styles = useStyles();
  const [showFre, setShowFre] = useState(true);
  const [bladeStep, setBladeStep] = useState(1);
  const [subscription, setSubscription] = useState(defaultSubscription);
  const [managedIdentity, setManagedIdentity] = useState("");
  const [logWorkspace, setLogWorkspace] = useState("");
  const [azureMonitor, setAzureMonitor] = useState("");
  const [useCases, setUseCases] = useState<Set<string>>(new Set());

  // Reset state when blade opens
  useEffect(() => {
    if (isOpen) {
      setShowFre(true);
      setBladeStep(1);
      setSubscription(defaultSubscription);
      setManagedIdentity("");
      setLogWorkspace("");
      setAzureMonitor("");
      setUseCases(new Set());
      setExcludedResources(new Set());
      setAddedAddons(new Set(["foundational-cspm"]));
      setOpenAddonItems([]);
    }
  }, [isOpen, defaultSubscription]);

  const useCaseLabels: Record<string, string> = {
    secure: "Secure and govern machines",
    cost: "Optimize costs",
    simplify: "Simplify management",
    monitor: "Monitor performance",
    compliance: "Maintain updates and compliance",
  };
  const [excludedResources, setExcludedResources] = useState<Set<string>>(
    new Set(),
  );
  const [addedAddons, setAddedAddons] = useState<Set<string>>(
    new Set(["foundational-cspm"]),
  );
  const [openAddonItems, setOpenAddonItems] = useState<string[]>([]);

  const addonLabels: Record<string, string> = {
    "foundational-cspm": "Foundational CSPM",
    "defender-cspm": "Defender CSPM",
    "defender-servers": "Defender for Servers Plan 2",
  };

  const addonPrices: Record<string, number> = {
    "foundational-cspm": 0,
    "defender-cspm": 14.88,
    "defender-servers": 24.36,
  };

  const totalAddonCost = Array.from(addedAddons).reduce(
    (sum, id) => sum + (addonPrices[id] || 0),
    0,
  );

  const toggleAddon = (id: string) => {
    setAddedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setOpenAddonItems((o) => o.filter((v) => v !== id));
      } else {
        next.add(id);
        setOpenAddonItems((o) => (o.includes(id) ? o : [...o, id]));
      }
      return next;
    });
  };

  const allResources = [
    {
      id: "vm-1",
      name: "contoso-vm-prod-01",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-2",
      name: "contoso-vm-prod-02",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-3",
      name: "contoso-vm-dev-01",
      type: "Virtual Machine",
      rg: "rg-dev",
    },
    {
      id: "vm-4",
      name: "contoso-vm-staging",
      type: "Virtual Machine",
      rg: "rg-staging",
    },
    {
      id: "vm-5",
      name: "contoso-web-prod",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-6",
      name: "contoso-api-prod",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-7",
      name: "contoso-db-prod-01",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-8",
      name: "contoso-worker-01",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-9",
      name: "contoso-worker-02",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-10",
      name: "contoso-batch-01",
      type: "Virtual Machine",
      rg: "rg-batch",
    },
    {
      id: "vm-11",
      name: "contoso-cache-prod",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-12",
      name: "contoso-gateway-01",
      type: "Virtual Machine",
      rg: "rg-network",
    },
    {
      id: "vm-13",
      name: "contoso-monitor-01",
      type: "Virtual Machine",
      rg: "rg-ops",
    },
    {
      id: "vm-14",
      name: "contoso-jump-box",
      type: "Virtual Machine",
      rg: "rg-ops",
    },
    {
      id: "vm-15",
      name: "contoso-build-agent",
      type: "Virtual Machine",
      rg: "rg-devops",
    },
    {
      id: "vm-16",
      name: "contoso-sql-prod-01",
      type: "SQL Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-17",
      name: "contoso-sql-prod-02",
      type: "SQL Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-18",
      name: "contoso-sql-dev",
      type: "SQL Virtual Machine",
      rg: "rg-dev",
    },
    {
      id: "vm-19",
      name: "contoso-k8s-node-01",
      type: "Virtual Machine",
      rg: "rg-aks",
    },
    {
      id: "vm-20",
      name: "contoso-k8s-node-02",
      type: "Virtual Machine",
      rg: "rg-aks",
    },
    {
      id: "vm-21",
      name: "contoso-k8s-node-03",
      type: "Virtual Machine",
      rg: "rg-aks",
    },
    {
      id: "vm-22",
      name: "contoso-redis-prod",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-23",
      name: "contoso-nginx-prod",
      type: "Virtual Machine",
      rg: "rg-prod",
    },
    {
      id: "vm-24",
      name: "contoso-vpn-gateway",
      type: "Virtual Machine",
      rg: "rg-network",
    },
    {
      id: "vm-25",
      name: "contoso-dns-server",
      type: "Virtual Machine",
      rg: "rg-network",
    },
    {
      id: "vm-26",
      name: "contoso-ad-dc-01",
      type: "Virtual Machine",
      rg: "rg-identity",
    },
    {
      id: "vm-27",
      name: "contoso-ad-dc-02",
      type: "Virtual Machine",
      rg: "rg-identity",
    },
    {
      id: "vm-28",
      name: "contoso-file-server",
      type: "Virtual Machine",
      rg: "rg-storage",
    },
    {
      id: "vm-29",
      name: "contoso-backup-srv",
      type: "Virtual Machine",
      rg: "rg-storage",
    },
    {
      id: "vm-30",
      name: "contoso-test-01",
      type: "Virtual Machine",
      rg: "rg-test",
    },
    {
      id: "vm-31",
      name: "contoso-test-02",
      type: "Virtual Machine",
      rg: "rg-test",
    },
    {
      id: "vm-32",
      name: "contoso-perf-test",
      type: "Virtual Machine",
      rg: "rg-test",
    },
    {
      id: "vm-33",
      name: "contoso-analytics-01",
      type: "Virtual Machine",
      rg: "rg-data",
    },
    {
      id: "vm-34",
      name: "contoso-etl-prod",
      type: "Virtual Machine",
      rg: "rg-data",
    },
    {
      id: "vm-35",
      name: "contoso-spark-node",
      type: "Virtual Machine",
      rg: "rg-data",
    },
  ];

  const includedCount = allResources.length - excludedResources.size;

  const toggleResource = (id: string) => {
    setExcludedResources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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
                  value={subscription}
                  selectedOptions={subscription ? [subscription] : []}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setSubscription(data.optionValue as string);
                    }
                  }}
                >
                  <Option value="sub-03">sub-03</Option>
                  <Option value="sub-01">sub-01</Option>
                  <Option value="sub-02">sub-02</Option>
                </Dropdown>
                {defaultSubscription && (
                  <div className={styles.infoMessage}>
                    <Info12Regular className={styles.infoMessageIcon} />
                    <Text size={200}>
                      This is auto-filled.{" "}
                      <Link
                        inline
                        onClick={() => {
                          onNavigateVm?.();
                          onClose();
                        }}
                      >
                        Contoso-vm
                      </Link>{" "}
                      is in this subscription.
                    </Text>
                  </div>
                )}
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
                  value={managedIdentity}
                  selectedOptions={managedIdentity ? [managedIdentity] : []}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setManagedIdentity(data.optionValue as string);
                    }
                  }}
                >
                  <Option value="contoso-managed-identity">
                    contoso-managed-identity
                  </Option>
                  <Option value="contoso-system-identity">
                    contoso-system-identity
                  </Option>
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
                  value={logWorkspace}
                  selectedOptions={logWorkspace ? [logWorkspace] : []}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setLogWorkspace(data.optionValue as string);
                    }
                  }}
                >
                  <Option value="contoso-log-workspace">
                    contoso-log-workspace
                  </Option>
                  <Option value="default-workspace">default-workspace</Option>
                </Dropdown>
                <div
                  className={styles.aiRecommendation}
                  onClick={() => setLogWorkspace("contoso-log-workspace")}
                >
                  <Sparkle20Regular className={styles.aiRecommendationIcon} />
                  <Text size={200} style={{ color: "inherit" }}>
                    AI recommends:{" "}
                    <Text
                      weight="semibold"
                      size={200}
                      style={{ color: "inherit" }}
                    >
                      contoso-log-workspace
                    </Text>
                  </Text>
                </div>
              </div>

              {/* Azure Monitor */}
              <div className={styles.formField}>
                <div className={styles.labelRow}>
                  <Text className={styles.labelRequired}>
                    Azure Monitor agent configuration
                  </Text>
                  <Info16Regular />
                </div>
                <Dropdown
                  placeholder="Select Azure Monitor configuration"
                  value={azureMonitor}
                  selectedOptions={azureMonitor ? [azureMonitor] : []}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setAzureMonitor(data.optionValue as string);
                    }
                  }}
                >
                  <Option value="Default configuration">
                    Default configuration
                  </Option>
                  <Option value="Custom configuration">
                    Custom configuration
                  </Option>
                </Dropdown>
                <div
                  className={styles.aiRecommendation}
                  onClick={() => setAzureMonitor("Default configuration")}
                >
                  <Sparkle20Regular className={styles.aiRecommendationIcon} />
                  <Text size={200} style={{ color: "inherit" }}>
                    AI recommends:{" "}
                    <Text
                      weight="semibold"
                      size={200}
                      style={{ color: "inherit" }}
                    >
                      Default configuration
                    </Text>
                  </Text>
                </div>
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
                  placeholder="Select use cases"
                  multiselect
                  value={
                    Array.from(useCases)
                      .map((v) => useCaseLabels[v])
                      .join(", ") || ""
                  }
                  selectedOptions={Array.from(useCases)}
                  onOptionSelect={(_, data) => {
                    setUseCases((prev) => {
                      const next = new Set(prev);
                      const val = data.optionValue as string;
                      if (next.has(val)) {
                        next.delete(val);
                      } else {
                        next.add(val);
                      }
                      return next;
                    });
                  }}
                >
                  <Option value="secure">Secure and govern machines</Option>
                  <Option value="cost">Optimize costs</Option>
                  <Option value="simplify">Simplify management</Option>
                  <Option value="monitor">Monitor performance</Option>
                  <Option value="compliance">
                    Maintain updates and compliance
                  </Option>
                </Dropdown>
              </div>

              {/* Add-on cards (shown when use case selected) */}
              {useCases.has("secure") && (
                <div className={styles.addonCardsStack}>
                  <Accordion
                    collapsible
                    multiple
                    openItems={openAddonItems}
                    onToggle={(_, data) =>
                      setOpenAddonItems(data.openItems as string[])
                    }
                  >
                    <AccordionItem value="foundational-cspm">
                      <AccordionHeader size="small">
                        <div className={styles.addonAccordionHeader}>
                          <div className={styles.addonHeaderLeft}>
                            <Text className={styles.addonCardTitle}>
                              Foundational CSPM
                            </Text>
                            <Badge
                              appearance="tint"
                              color="informative"
                              size="small"
                            >
                              Included
                            </Badge>
                          </div>
                          <div className={styles.addonHeaderRight}>
                            <Text className={styles.addonPriceInline}>
                              Free
                            </Text>
                            {addedAddons.has("foundational-cspm") ? (
                              <span
                                className={styles.addedButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddon("foundational-cspm");
                                }}
                              >
                                <Checkmark16Regular />
                                <Text size={200}>Added</Text>
                              </span>
                            ) : (
                              <span
                                className={styles.addButtonInHeader}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddon("foundational-cspm");
                                }}
                              >
                                Add
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionHeader>
                      <AccordionPanel>
                        <Text className={styles.addonCardDesc}>
                          Continuously assess your cloud environment with
                          agentless, risk-prioritized insights. Recommended for
                          all workloads. <Link inline>Learn more</Link>
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem value="defender-cspm">
                      <AccordionHeader size="small">
                        <div className={styles.addonAccordionHeader}>
                          <div className={styles.addonHeaderLeft}>
                            <Text className={styles.addonCardTitle}>
                              Defender CSPM
                            </Text>
                            <Badge
                              appearance="tint"
                              color="success"
                              size="small"
                            >
                              Recommended
                            </Badge>
                          </div>
                          <div className={styles.addonHeaderRight}>
                            <Text className={styles.addonPriceInline}>
                              $14.88/mo
                            </Text>
                            {addedAddons.has("defender-cspm") ? (
                              <span
                                className={styles.addedButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddon("defender-cspm");
                                }}
                              >
                                <Checkmark16Regular />
                                <Text size={200}>Added</Text>
                              </span>
                            ) : (
                              <span
                                className={styles.addButtonInHeader}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddon("defender-cspm");
                                }}
                              >
                                Add
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionHeader>
                      <AccordionPanel>
                        <Text className={styles.addonCardDesc}>
                          Identifies misconfigurations, exposed secrets, and
                          compliance risks across multi-cloud workloads to
                          improve security. <Link inline>Learn more</Link>
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem value="defender-servers">
                      <AccordionHeader size="small">
                        <div className={styles.addonAccordionHeader}>
                          <div className={styles.addonHeaderLeft}>
                            <Text className={styles.addonCardTitle}>
                              Defender for Servers Plan 2
                            </Text>
                            <Badge
                              appearance="tint"
                              color="success"
                              size="small"
                            >
                              Recommended
                            </Badge>
                          </div>
                          <div className={styles.addonHeaderRight}>
                            <Text className={styles.addonPriceInline}>
                              $24.36/mo
                            </Text>
                            {addedAddons.has("defender-servers") ? (
                              <span
                                className={styles.addedButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddon("defender-servers");
                                }}
                              >
                                <Checkmark16Regular />
                                <Text size={200}>Added</Text>
                              </span>
                            ) : (
                              <span
                                className={styles.addButtonInHeader}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddon("defender-servers");
                                }}
                              >
                                Add
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionHeader>
                      <AccordionPanel>
                        <Text className={styles.addonCardDesc}>
                          Comprehensive server protection with EDR,
                          vulnerability management, and advanced threat
                          detection. <Link inline>Learn more</Link>
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </>
          )}

          {bladeStep === 3 && (
            <div className={styles.reviewSection}>
              <Text className={styles.reviewGroupTitle}>Summary</Text>

              <Accordion collapsible multiple defaultOpenItems={["basics"]}>
                <AccordionItem value="basics">
                  <AccordionHeader size="small">Basics</AccordionHeader>
                  <AccordionPanel>
                    <div className={styles.reviewGroup}>
                      <div className={styles.reviewRow}>
                        <Text className={styles.reviewLabel}>Subscription</Text>
                        <Text className={styles.reviewValue}>
                          {subscription}
                        </Text>
                      </div>
                      <div className={styles.reviewRow}>
                        <Text className={styles.reviewLabel}>
                          Managed identity
                        </Text>
                        <Text className={styles.reviewValue}>
                          {managedIdentity || "—"}
                        </Text>
                      </div>
                      <div className={styles.reviewRow}>
                        <Text className={styles.reviewLabel}>
                          Log analytics workspace
                        </Text>
                        <Text className={styles.reviewValue}>
                          {logWorkspace || "—"}
                        </Text>
                      </div>
                      <div className={styles.reviewRow}>
                        <Text className={styles.reviewLabel}>
                          Azure Monitor
                        </Text>
                        <Text className={styles.reviewValue}>
                          {azureMonitor || "—"}
                        </Text>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem value="addons">
                  <AccordionHeader size="small">Add-ons</AccordionHeader>
                  <AccordionPanel>
                    <div className={styles.reviewGroup}>
                      <div className={styles.reviewRow}>
                        <Text className={styles.reviewLabel}>Use cases</Text>
                        <Text className={styles.reviewValue}>
                          {useCases.size > 0
                            ? Array.from(useCases)
                                .map((v) => useCaseLabels[v])
                                .join(", ")
                            : "—"}
                        </Text>
                      </div>
                      {addedAddons.size > 0 &&
                        Array.from(addedAddons).map((id) => (
                          <div key={id} className={styles.reviewRow}>
                            <Text className={styles.reviewLabel}>
                              {addonLabels[id]}
                            </Text>
                            <Text className={styles.reviewValue}>
                              {addonPrices[id] === 0
                                ? "Free"
                                : `$${addonPrices[id].toFixed(2)}/mo`}
                            </Text>
                          </div>
                        ))}
                    </div>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem value="resources">
                  <AccordionHeader size="small">Resources</AccordionHeader>
                  <AccordionPanel>
                    <div className={styles.reviewGroup}>
                      <div className={styles.reviewRow}>
                        <Text className={styles.reviewLabel}>
                          Included resources
                        </Text>
                        <Text className={styles.reviewValue}>
                          {includedCount} of {allResources.length}
                        </Text>
                      </div>
                      {excludedResources.size > 0 && (
                        <div className={styles.reviewRow}>
                          <Text className={styles.reviewLabel}>Excluded</Text>
                          <Text className={styles.reviewValue}>
                            {excludedResources.size} resources
                          </Text>
                        </div>
                      )}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <div className={styles.excludeSection} style={{ padding: 0 }}>
                <Text className={styles.excludeLabel}>
                  Select machines to exclude
                </Text>
                <Accordion collapsible>
                  <AccordionItem value="included-resources-review">
                    <AccordionHeader size="small">
                      Included resources ({includedCount})
                    </AccordionHeader>
                    <AccordionPanel>
                      <div className={styles.resourceGrid}>
                        <div className={styles.resourceGridHeader}>
                          <Checkbox
                            size="medium"
                            checked={
                              excludedResources.size === 0
                                ? true
                                : excludedResources.size === allResources.length
                                  ? false
                                  : "mixed"
                            }
                            onChange={() => {
                              if (excludedResources.size === 0) {
                                setExcludedResources(
                                  new Set(allResources.map((r) => r.id)),
                                );
                              } else {
                                setExcludedResources(new Set());
                              }
                            }}
                          />
                          <Text className={styles.resourceGridHeaderText}>
                            Name
                          </Text>
                          <Text className={styles.resourceGridHeaderText}>
                            Type
                          </Text>
                          <Text className={styles.resourceGridHeaderText}>
                            Resource group
                          </Text>
                        </div>
                        {allResources.map((r) => (
                          <div key={r.id} className={styles.resourceGridRow}>
                            <Checkbox
                              size="medium"
                              checked={!excludedResources.has(r.id)}
                              onChange={() => toggleResource(r.id)}
                            />
                            <Link className={styles.resourceGridLink}>
                              {r.name}
                            </Link>
                            <Text className={styles.resourceGridCell}>
                              {r.type}
                            </Text>
                            <Text className={styles.resourceGridCell}>
                              {r.rg}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}

          {bladeStep === 4 && (
            <>
              {/* Success heading */}
              <Text className={styles.successTitle}>You&apos;re all set!</Text>

              {/* Success banner */}
              <div className={styles.successBanner}>
                <CheckmarkCircle16Filled className={styles.successBannerIcon} />
                <div className={styles.successBannerText}>
                  <Text size={300} weight="semibold">
                    Essential Machine Management enabled
                  </Text>
                  <Text size={200}>
                    {includedCount} resources enrolled in {subscription} now
                    have management capabilities enabled
                  </Text>
                </div>
              </div>

              {/* Subscription + capabilities + add-ons */}
              <div className={styles.successSubInfo}>
                <div className={styles.successSubRow}>
                  <Text size={200} className={styles.reviewLabel}>
                    Subscription
                  </Text>
                  <Text size={200} weight="semibold">
                    {subscription}
                  </Text>
                </div>
              </div>

              {/* Enabled capabilities — 2-column grid */}
              <Text className={styles.successSectionLabel}>
                Enabled capabilities
              </Text>
              <div className={styles.successCapabilitiesGrid}>
                <div className={styles.successCapItem}>
                  <CheckmarkCircle16Filled className={styles.successCapIcon} />
                  <Text size={200}>Azure Monitor</Text>
                </div>
                <div className={styles.successCapItem}>
                  <CheckmarkCircle16Filled className={styles.successCapIcon} />
                  <Text size={200}>Azure Update Manager</Text>
                </div>
                <div className={styles.successCapItem}>
                  <CheckmarkCircle16Filled className={styles.successCapIcon} />
                  <Text size={200}>Machine Configuration</Text>
                </div>
                <div className={styles.successCapItem}>
                  <CheckmarkCircle16Filled className={styles.successCapIcon} />
                  <Text size={200}>Change Tracking</Text>
                </div>
                <div className={styles.successCapItem}>
                  <CheckmarkCircle16Filled className={styles.successCapIcon} />
                  <Text size={200}>Security Baseline Policy</Text>
                </div>
              </div>

              {/* Add-ons */}
              {addedAddons.size > 0 && (
                <>
                  <Text className={styles.successSectionLabel}>Add-ons</Text>
                  <div className={styles.successCapabilitiesGrid}>
                    {Array.from(addedAddons).map((id) => (
                      <div key={id} className={styles.successCapItem}>
                        <CheckmarkCircle16Filled
                          className={styles.successCapIcon}
                        />
                        <Text size={200}>{addonLabels[id]}</Text>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className={styles.successDivider} />

              {/* Summary cards */}
              <div className={styles.summaryGrid}>
                <Card className={styles.summaryCard}>
                  <Text className={styles.summaryCardTitle}>Cost</Text>
                  <div className={styles.statBoxes}>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Price</Text>
                      <Text className={styles.statBoxValueGreen}>
                        {totalAddonCost === 0
                          ? "Free"
                          : `$${totalAddonCost.toFixed(2)}/mo`}
                      </Text>
                    </div>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>
                        Est. monthly savings
                      </Text>
                      <Text className={styles.statBoxValueGreen}>
                        $5,773.77
                      </Text>
                    </div>
                  </div>
                </Card>

                <Card className={styles.summaryCard}>
                  <Text className={styles.summaryCardTitle}>Machines</Text>
                  <div className={styles.statBoxes}>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Enrolled</Text>
                      <Text className={styles.statBoxValueNeutral}>
                        {includedCount}
                      </Text>
                    </div>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Excluded</Text>
                      <Text className={styles.statBoxValueNeutral}>
                        {excludedResources.size}
                      </Text>
                    </div>
                  </div>
                </Card>

                <Card className={styles.summaryCard}>
                  <Text className={styles.summaryCardTitle}>Alerts</Text>
                  <div className={styles.statBoxes}>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Active issues</Text>
                      <Text className={styles.statBoxValueNeutral}>3</Text>
                    </div>
                    <div className={styles.statBox}>
                      <Text className={styles.statBoxLabel}>Critical</Text>
                      <Text className={styles.statBoxValueNeutral}>0</Text>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>

        {/* Impact summary + Cost panel — shared across steps 1 and 2 */}
        {(bladeStep === 1 || bladeStep === 2 || bladeStep === 3) && (
          <>
            <div className={styles.bottomGrid}>
              <div className={styles.impactCard}>
                <Text className={styles.impactTitle}>Impact summary</Text>
                <Text size={200}>
                  Enable these capabilities for{" "}
                  <Text weight="semibold">{includedCount} resources</Text> in{" "}
                  <Text weight="semibold">sub-01</Text> in one place, no
                  separate setup required:
                </Text>
                <ul className={styles.impactList}>
                  <li className={styles.impactItem}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text>Azure Monitor</Text>
                  </li>
                  <li className={styles.impactItem}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text>Azure Update Manager</Text>
                  </li>
                  <li className={styles.impactItem}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text>Azure Machine Configuration</Text>
                  </li>
                  <li className={styles.impactItem}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text>Change Tracking &amp; Inventory</Text>
                  </li>
                  <li className={styles.impactItem}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text>Azure Security Baseline Policy</Text>
                  </li>
                </ul>
                {useCases.has("secure") && addedAddons.size > 0 && (
                  <>
                    <Text size={200} weight="semibold">
                      Add-ons:
                    </Text>
                    <ul className={styles.impactList}>
                      {Array.from(addedAddons).map((id) => (
                        <li key={id} className={styles.impactItem}>
                          <CheckmarkCircle16Filled
                            className={styles.impactCheckIcon}
                          />
                          <Text>{addonLabels[id]}</Text>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <Card className={styles.costCard}>
                <Text className={styles.costTitle}>Cost</Text>
                <Text className={styles.costLabel}>Price:</Text>
                <Text className={styles.costValueBlack}>
                  {totalAddonCost === 0
                    ? "Free"
                    : `$${totalAddonCost.toFixed(2)}/mo`}
                </Text>
                <Text className={styles.costLabel}>
                  Estimated monthly savings:
                </Text>
                <Text className={styles.costValue}>$5,773.77</Text>
                <Button
                  className={styles.costViewDetailsBtn}
                  appearance="secondary"
                  size="small"
                >
                  View details
                </Button>
              </Card>
            </div>
          </>
        )}

        {/* Footer */}
        <div className={styles.bladeFooter}>
          <div className={styles.footerLeft}>
            {bladeStep === 4 ? (
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
                  onClick={() =>
                    setBladeStep(bladeStep === 3 ? 2 : bladeStep === 2 ? 1 : 1)
                  }
                />
                {bladeStep === 1 ? (
                  <Button
                    appearance="secondary"
                    icon={<ArrowRight20Regular />}
                    iconPosition="after"
                    disabled={
                      !subscription ||
                      !managedIdentity ||
                      !logWorkspace ||
                      !azureMonitor
                    }
                    onClick={() => setBladeStep(2)}
                  >
                    Next
                  </Button>
                ) : bladeStep === 2 ? (
                  <Button
                    appearance="secondary"
                    icon={<ArrowRight20Regular />}
                    iconPosition="after"
                    disabled={useCases.size === 0}
                    onClick={() => setBladeStep(3)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    appearance="primary"
                    icon={<Checkmark20Regular />}
                    onClick={() => setBladeStep(4)}
                  >
                    Enable
                  </Button>
                )}
              </>
            )}
          </div>
          <div className={styles.footerRight}>
            <Button
              appearance="transparent"
              size="small"
              icon={<Edit20Regular />}
            >
              Give feedback
            </Button>
          </div>
        </div>

        {/* FRE Dialog overlay */}
        {showFre && (
          <div className={styles.freOverlay}>
            <div className={styles.freDialog}>
              <div className={styles.freHero}>
                <div className={styles.freHubContainer}>
                  {/* Connecting lines — SVG overlay */}
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}
                  >
                    {/* Center (190,100) → Monitor (66,28) */}
                    <line
                      x1="190"
                      y1="100"
                      x2="66"
                      y2="28"
                      stroke="#0078D4"
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    {/* Center (190,100) → Update Manager (314,28) */}
                    <line
                      x1="190"
                      y1="100"
                      x2="314"
                      y2="28"
                      stroke="#0078D4"
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    {/* Center (190,100) → Machine Config (24,100) */}
                    <line
                      x1="190"
                      y1="100"
                      x2="24"
                      y2="100"
                      stroke="#0078D4"
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    {/* Center (190,100) → Change Tracking (86,172) */}
                    <line
                      x1="190"
                      y1="100"
                      x2="86"
                      y2="172"
                      stroke="#0078D4"
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    {/* Center (190,100) → Security Baseline (294,172) */}
                    <line
                      x1="190"
                      y1="100"
                      x2="294"
                      y2="172"
                      stroke="#0078D4"
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                    />
                    {/* Center (190,100) → Add-ons (356,100) */}
                    <line
                      x1="190"
                      y1="100"
                      x2="356"
                      y2="100"
                      stroke="#0078D4"
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                      strokeDasharray="6 4"
                    />
                  </svg>

                  {/* Center hub — EMM */}
                  <div className={styles.freHubCenter}>
                    <img
                      src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
                      alt="EMM"
                      className={styles.freHubCenterIcon}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>

                  {/* Spoke: Azure Monitor — top left */}
                  <div
                    className={styles.freSpoke}
                    style={{ top: "4px", left: "42px" }}
                  >
                    <Eye20Regular className={styles.freSpokeIcon} />
                  </div>

                  {/* Spoke: Update Manager — top right */}
                  <div
                    className={styles.freSpoke}
                    style={{ top: "4px", right: "42px" }}
                  >
                    <ArrowSync20Regular className={styles.freSpokeIcon} />
                  </div>

                  {/* Spoke: Machine Config — left */}
                  <div
                    className={styles.freSpoke}
                    style={{
                      top: "50%",
                      left: "0px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Shield20Regular className={styles.freSpokeIcon} />
                  </div>

                  {/* Spoke: Change Tracking — bottom left */}
                  <div
                    className={styles.freSpoke}
                    style={{ bottom: "4px", left: "62px" }}
                  >
                    <DocumentBulletList20Regular
                      className={styles.freSpokeIcon}
                    />
                  </div>

                  {/* Spoke: Security Baseline — bottom right */}
                  <div
                    className={styles.freSpoke}
                    style={{ bottom: "4px", right: "62px" }}
                  >
                    <ShieldCheckmark20Regular className={styles.freSpokeIcon} />
                  </div>

                  {/* Spoke: Add-ons — right */}
                  <div
                    className={styles.freSpoke}
                    style={{
                      top: "50%",
                      right: "0px",
                      transform: "translateY(-50%)",
                      borderStyle: "dashed",
                      borderWidth: "2px",
                      borderColor: "#0078D4",
                      backgroundColor: tokens.colorNeutralBackground1,
                    }}
                  >
                    <Add20Regular className={styles.freSpokeIcon} />
                  </div>
                </div>
              </div>
              <div className={styles.freBody}>
                <Text className={styles.freTitle}>
                  Essential machine management
                </Text>
                <Text className={styles.freDesc}>
                  Enable centralized management with essential capabilities:
                </Text>
                <div className={styles.freCapabilityList}>
                  <div className={styles.freCapabilityRow}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text className={styles.freCapabilityText}>
                      <span className={styles.freCapabilityBold}>
                        Azure Monitor
                      </span>{" "}
                      – Performance and health insights
                    </Text>
                  </div>
                  <div className={styles.freCapabilityRow}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text className={styles.freCapabilityText}>
                      <span className={styles.freCapabilityBold}>
                        Azure Update Manager
                      </span>{" "}
                      – Automated OS updates
                    </Text>
                  </div>
                  <div className={styles.freCapabilityRow}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text className={styles.freCapabilityText}>
                      <span className={styles.freCapabilityBold}>
                        Azure Machine Configuration
                      </span>{" "}
                      – Security baseline compliance
                    </Text>
                  </div>
                  <div className={styles.freCapabilityRow}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text className={styles.freCapabilityText}>
                      <span className={styles.freCapabilityBold}>
                        Change Tracking &amp; Inventory
                      </span>{" "}
                      – Configuration tracking and inventory
                    </Text>
                  </div>
                  <div className={styles.freCapabilityRow}>
                    <CheckmarkCircle16Filled
                      className={styles.impactCheckIcon}
                    />
                    <Text className={styles.freCapabilityText}>
                      <span className={styles.freCapabilityBold}>
                        Azure Security Baseline Policy
                      </span>{" "}
                      – Assesses and enforces your machine&#39;s security
                      posture
                    </Text>
                  </div>
                </div>
              </div>
              <div className={styles.freFooter}>
                <Button
                  appearance="secondary"
                  onClick={() => {
                    setShowFre(false);
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button appearance="primary" onClick={() => setShowFre(false)}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
