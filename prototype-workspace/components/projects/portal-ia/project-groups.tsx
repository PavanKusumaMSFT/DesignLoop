/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
} from "@fluentui/react-components";
import { TopNav } from "../../shared/top-nav";
import { useState } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  breadcrumbSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
  },
  breadcrumbRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: tokens.fontSizeBase300,
  },
  breadcrumbItem: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusSmall,
  },
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
  },
  titleSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleLeftContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  titleIcon: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorPaletteGreenBackground2,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleIconEmoji: {
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase300,
  },
  titleText: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  titleDescriptionRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  titleDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  headerActionsRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  headerActionPlaceholder: {
    width: "24px",
    height: "24px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusMedium,
  },
  mainLayout: {
    display: "flex",
    height: "100%",
  },
  sidebar: {
    width: "256px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
  },
  searchSection: {
    padding: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  searchContainer: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusSmall,
  },
  searchInput: {
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "12px",
    paddingTop: "8px",
    paddingBottom: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    height: "32px",
  },
  navSection: {
    flex: 1,
    padding: tokens.spacingVerticalL,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: "8px",
  },
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
  },
  navIcon: {
    width: "16px",
    height: "16px",
    borderRadius: tokens.borderRadiusSmall,
    marginRight: "12px",
  },
  navIconActive: {
    backgroundColor: tokens.colorBrandForeground1,
  },
  navIconInactive: {
    backgroundColor: tokens.colorNeutralBackground4,
  },
  navText: {
    height: "12px",
    borderRadius: tokens.borderRadiusSmall,
  },
  navTextActive: {
    backgroundColor: tokens.colorBrandForeground2,
  },
  navTextInactive: {
    backgroundColor: tokens.colorNeutralBackground4,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentArea: {
    flex: 1,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
  },
  sectionWithMargin: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    width: "128px",
    height: "20px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusSmall,
  },
  viewModeButtons: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  viewModeButton: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase300,
    border: "none",
    cursor: "pointer",
  },
  viewModeButtonActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  viewModeButtonInactive: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground4,
    },
  },
  actionButton: {
    width: "80px",
    height: "32px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalL,
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow8,
    },
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    gap: "12px",
  },
  statusIndicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  statusGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  statusBlue: {
    backgroundColor: tokens.colorBrandForeground1,
  },
  statusOrange: {
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
  },
  cardTitle: {
    width: "96px",
    height: "16px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusSmall,
  },
  cardContent: {
    marginBottom: "12px",
  },
  cardLine: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    marginBottom: "8px",
  },
  cardLineShort: {
    width: "75%",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardMeta: {
    width: "64px",
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground5,
    borderRadius: tokens.borderRadiusSmall,
  },
  cardAction: {
    width: "32px",
    height: "24px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
  },
  topologyView: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    marginBottom: tokens.spacingVerticalXXL,
    height: "500px",
    position: "relative",
    overflow: "hidden",
  },
  table: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableHeader: {
    padding: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableTitle: {
    width: "160px",
    height: "16px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusSmall,
  },
  tableActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tableAction: {
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
  },
  tableActionSecondary: {
    width: "64px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  tableActionPrimary: {
    width: "64px",
    backgroundColor: tokens.colorBrandBackground,
  },
  tableHeaderRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  tableHeaderCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tableHeaderText: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground5,
    borderRadius: tokens.borderRadiusSmall,
  },
  tableHeaderIcon: {
    width: "12px",
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground5,
    borderRadius: tokens.borderRadiusSmall,
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalL,
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  tableCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  tableCellText: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: tokens.borderRadiusSmall,
  },
  tableCellActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tableCellAction: {
    height: "24px",
    borderRadius: tokens.borderRadiusMedium,
  },
  tableCellActionPrimary: {
    width: "48px",
    backgroundColor: tokens.colorBrandBackground,
  },
  tableCellActionSecondary: {
    width: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  // Width modifiers
  w48: { width: "48px" },
  w64: { width: "64px" },
  w72: { width: "72px" },
  w80: { width: "80px" },
  w96: { width: "96px" },
  // Topology: overlay & background
  topoOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    opacity: 0.05,
  },
  topoGridBg: {
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(circle, #0078d4 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  // Topology: central hub
  topoCenterAnchor: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
  topoRelative: {
    position: "relative",
  },
  topoCentralNode: {
    width: "80px",
    height: "80px",
    backgroundImage: "linear-gradient(to bottom right, #0078D4, #005A9E)",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `4px solid ${tokens.colorNeutralBackground1}`,
  },
  topoCentralInner: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topoCentralCore: {
    width: "24px",
    height: "24px",
    backgroundColor: "#0078D4",
    borderRadius: tokens.borderRadiusMedium,
  },
  topoCentralLabelWrap: {
    position: "absolute",
    bottom: "-32px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  topoPulseRing: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    borderRadius: tokens.borderRadiusXLarge,
    border: "2px solid #0078D4",
    animationName: {
      "0%": { transform: "scale(1)", opacity: 0.3 },
      "75%": { transform: "scale(2)", opacity: 0 },
      "100%": { transform: "scale(2)", opacity: 0 },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
    opacity: 0.3,
  },
  // Topology: database (top)
  topoTopAnchor: {
    position: "absolute",
    top: "48px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  topoMediumNode: {
    width: "56px",
    height: "56px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  topoNodeGreen: {
    backgroundImage: `linear-gradient(to bottom right, ${tokens.colorPaletteGreenForeground1}, ${tokens.colorPaletteGreenForeground2})`,
  },
  topoNodeOrange: {
    backgroundImage: `linear-gradient(to bottom right, ${tokens.colorPaletteDarkOrangeForeground1}, ${tokens.colorPaletteDarkOrangeForeground2})`,
  },
  topoNodePurple: {
    backgroundImage: `linear-gradient(to bottom right, ${tokens.colorPalettePurpleForeground1}, ${tokens.colorPalettePurpleForeground2})`,
  },
  topoMediumInner: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topoMediumCoreGreen: {
    width: "20px",
    height: "20px",
    backgroundColor: tokens.colorPaletteGreenForeground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoMediumCoreOrange: {
    width: "20px",
    height: "20px",
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoMediumCorePurple: {
    width: "20px",
    height: "20px",
    backgroundColor: tokens.colorPalettePurpleForeground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoLabelBarCenter: {
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: "8px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  topoLabelBar: {
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: "8px",
  },
  topoLabelBarLg: {
    width: "96px",
    height: "12px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoSvgConnectorTop: {
    position: "absolute",
    top: "56px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  // Topology: web app (left)
  topoLeftAnchor: {
    position: "absolute",
    top: "50%",
    left: "64px",
    transform: "translateY(-50%)",
  },
  topoSvgConnectorLeft: {
    position: "absolute",
    top: "28px",
    left: "56px",
  },
  // Topology: storage (right)
  topoRightAnchor: {
    position: "absolute",
    top: "50%",
    right: "64px",
    transform: "translateY(-50%)",
  },
  topoSvgConnectorRight: {
    position: "absolute",
    top: "28px",
    right: "56px",
  },
  // Topology: API gateway (bottom-left)
  topoBottomLeftAnchor: {
    position: "absolute",
    bottom: "64px",
    left: "25%",
    transform: "translateX(-50%)",
  },
  topoSmallNode: {
    width: "48px",
    height: "48px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  topoNodeTeal: {
    backgroundImage: `linear-gradient(to bottom right, ${tokens.colorPaletteTealForeground2}, ${tokens.colorPaletteTealBorderActive})`,
  },
  topoNodeRed: {
    backgroundImage: `linear-gradient(to bottom right, ${tokens.colorPaletteRedForeground1}, ${tokens.colorPaletteRedForeground2})`,
  },
  topoSmallInner: {
    width: "28px",
    height: "28px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topoSmallCoreTeal: {
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorPaletteTealForeground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoSmallCoreRed: {
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorPaletteRedForeground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoSvgConnectorBotLeft: {
    position: "absolute",
    top: "0",
    left: "24px",
  },
  // Topology: functions (bottom-right)
  topoBottomRightAnchor: {
    position: "absolute",
    bottom: "64px",
    right: "25%",
    transform: "translateX(50%)",
  },
  topoSvgConnectorBotRight: {
    position: "absolute",
    top: "0",
    right: "24px",
  },
  // Topology: monitoring (top-right)
  topoTopRightAnchor: {
    position: "absolute",
    top: "80px",
    right: "80px",
  },
  topoTinyNode: {
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  topoNodeBerry: {
    backgroundImage: `linear-gradient(to bottom right, ${tokens.colorPaletteBerryForeground1}, ${tokens.colorPaletteBerryForeground2})`,
  },
  topoTinyInner: {
    width: "24px",
    height: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topoTinyCoreBerry: {
    width: "12px",
    height: "12px",
    backgroundColor: tokens.colorPaletteBerryForeground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  topoLabelBarTiny: {
    width: "48px",
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: "4px",
  },
  // Topology: status legend
  topoLegendCard: {
    position: "absolute",
    top: "24px",
    right: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalL,
    boxShadow: tokens.shadow4,
  },
  topoLegendList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  topoLegendRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  topoLegendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  topoPulseAnim: {
    animationName: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
  },
  topoLegendDotGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  topoLegendDotBlue: {
    backgroundColor: "#0078D4",
  },
  topoLegendDotOrange: {
    backgroundColor: tokens.colorPaletteDarkOrangeForeground1,
  },
  topoLegendLabel: {
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
  },
  // Topology: data flow indicators
  topoDataFlowWrap: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  topoDataFlowRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  topoDataFlowDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  topoBounceAnim: {
    animationName: {
      "0%, 100%": { transform: "translateY(-25%)" },
      "50%": { transform: "translateY(0)" },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  animDelay200: {
    animationDelay: "0.2s",
  },
  animDelay400: {
    animationDelay: "0.4s",
  },
  topoDataFlowDotBlue: {
    backgroundColor: "#0078D4",
  },
  topoDataFlowDotGreen: {
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  topoDataFlowDotPurple: {
    backgroundColor: tokens.colorPalettePurpleForeground1,
  },
  topoDataFlowLabel: {
    height: "8px",
    backgroundColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const ProjectGroups = () => {
  const [viewMode, setViewMode] = useState<"cards" | "topology">("cards");
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav activeLink="Project Groups" />

        <div className={styles.breadcrumbSection}>
          <div className={styles.breadcrumbRow}>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w48)}
            ></div>
            <span className={styles.breadcrumbSeparator}>›</span>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w64)}
            ></div>
            <span className={styles.breadcrumbSeparator}>›</span>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w80)}
            ></div>
          </div>
        </div>

        <div className={styles.titleSection}>
          <div className={styles.titleRow}>
            <div className={styles.titleLeftContent}>
              <div className={styles.titleIcon}>
                <span className={styles.titleIconEmoji}>📁</span>
              </div>
              <div>
                <h1 className={styles.titleText}>Project Groups | Overview</h1>
                <div className={styles.titleDescriptionRow}>
                  <span className={styles.titleDescription}>
                    Azure Project Groups
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.headerActionsRow}>
              <div className={styles.headerActionPlaceholder}></div>
              <div className={styles.headerActionPlaceholder}></div>
              <div className={styles.headerActionPlaceholder}></div>
            </div>
          </div>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.sidebar}>
            <div className={styles.searchSection}>
              <div className={styles.searchContainer}>
                <div className={styles.searchIcon}></div>
                <div className={styles.searchInput}></div>
              </div>
            </div>

            <div className={styles.navSection}>
              <div
                className={mergeClasses(styles.navItem, styles.navItemActive)}
              >
                <div
                  className={mergeClasses(styles.navIcon, styles.navIconActive)}
                ></div>
                <div
                  className={mergeClasses(
                    styles.navText,
                    styles.navTextActive,
                    styles.w80,
                  )}
                ></div>
              </div>
              <div className={styles.navItem}>
                <div
                  className={mergeClasses(
                    styles.navIcon,
                    styles.navIconInactive,
                  )}
                ></div>
                <div
                  className={mergeClasses(
                    styles.navText,
                    styles.navTextInactive,
                    styles.w96,
                  )}
                ></div>
              </div>
              <div className={styles.navItem}>
                <div
                  className={mergeClasses(
                    styles.navIcon,
                    styles.navIconInactive,
                  )}
                ></div>
                <div
                  className={mergeClasses(
                    styles.navText,
                    styles.navTextInactive,
                    styles.w80,
                  )}
                ></div>
              </div>
              <div className={styles.navItem}>
                <div
                  className={mergeClasses(
                    styles.navIcon,
                    styles.navIconInactive,
                  )}
                ></div>
                <div
                  className={mergeClasses(
                    styles.navText,
                    styles.navTextInactive,
                    styles.w72,
                  )}
                ></div>
              </div>
              <div className={styles.navItem}>
                <div
                  className={mergeClasses(
                    styles.navIcon,
                    styles.navIconInactive,
                  )}
                ></div>
                <div
                  className={mergeClasses(
                    styles.navText,
                    styles.navTextInactive,
                    styles.w64,
                  )}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.contentArea}>
              {/* Projects Grid */}
              <div className={styles.sectionWithMargin}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}></div>
                  <div className={styles.viewModeButtons}>
                    <button
                      onClick={() => setViewMode("cards")}
                      className={mergeClasses(
                        styles.viewModeButton,
                        viewMode === "cards"
                          ? styles.viewModeButtonActive
                          : styles.viewModeButtonInactive,
                      )}
                    >
                      Cards
                    </button>
                    <button
                      onClick={() => setViewMode("topology")}
                      className={mergeClasses(
                        styles.viewModeButton,
                        viewMode === "topology"
                          ? styles.viewModeButtonActive
                          : styles.viewModeButtonInactive,
                      )}
                    >
                      Topology
                    </button>
                    <div className={styles.actionButton}></div>
                  </div>
                </div>

                {viewMode === "cards" ? (
                  <div className={styles.cardsGrid}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className={styles.card}>
                        <div className={styles.cardHeader}>
                          <div
                            className={mergeClasses(
                              styles.statusIndicator,
                              i <= 2
                                ? styles.statusGreen
                                : i <= 4
                                  ? styles.statusBlue
                                  : styles.statusOrange,
                            )}
                          ></div>
                          <div className={styles.cardTitle}></div>
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.cardLine}></div>
                          <div
                            className={mergeClasses(
                              styles.cardLine,
                              styles.cardLineShort,
                            )}
                          ></div>
                        </div>
                        <div className={styles.cardFooter}>
                          <div className={styles.cardMeta}></div>
                          <div className={styles.cardAction}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.topologyView}>
                    {/* Background Grid Pattern */}
                    <div className={styles.topoOverlay}>
                      <div className={styles.topoGridBg}></div>
                    </div>

                    {/* Central Hub - Main Project */}
                    <div className={styles.topoCenterAnchor}>
                      <div className={styles.topoRelative}>
                        <div className={styles.topoCentralNode}>
                          <div className={styles.topoCentralInner}>
                            <div className={styles.topoCentralCore}></div>
                          </div>
                        </div>
                        <div className={styles.topoCentralLabelWrap}>
                          <div className={styles.topoLabelBarLg}></div>
                        </div>
                        {/* Pulsing ring animation */}
                        <div className={styles.topoPulseRing}></div>
                      </div>
                    </div>

                    {/* Database Resource - Top */}
                    <div className={styles.topoTopAnchor}>
                      <div className={styles.topoRelative}>
                        <div
                          className={mergeClasses(
                            styles.topoMediumNode,
                            styles.topoNodeGreen,
                          )}
                        >
                          <div className={styles.topoMediumInner}>
                            <div className={styles.topoMediumCoreGreen}></div>
                          </div>
                        </div>
                        <div
                          className={mergeClasses(
                            styles.topoLabelBarCenter,
                            styles.w72,
                          )}
                        ></div>
                        {/* Connection Line with gradient */}
                        <svg
                          className={styles.topoSvgConnectorTop}
                          width="2"
                          height="80"
                        >
                          <defs>
                            <linearGradient
                              id="lineGradient1"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#0078d4" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="1"
                            y1="0"
                            x2="1"
                            y2="80"
                            stroke="url(#lineGradient1)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Web App - Left */}
                    <div className={styles.topoLeftAnchor}>
                      <div className={styles.topoRelative}>
                        <div
                          className={mergeClasses(
                            styles.topoMediumNode,
                            styles.topoNodeOrange,
                          )}
                        >
                          <div className={styles.topoMediumInner}>
                            <div className={styles.topoMediumCoreOrange}></div>
                          </div>
                        </div>
                        <div
                          className={mergeClasses(
                            styles.topoLabelBar,
                            styles.w64,
                          )}
                        ></div>
                        {/* Connection Line */}
                        <svg
                          className={styles.topoSvgConnectorLeft}
                          width="80"
                          height="2"
                        >
                          <defs>
                            <linearGradient
                              id="lineGradient2"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#0078d4" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="0"
                            y1="1"
                            x2="80"
                            y2="1"
                            stroke="url(#lineGradient2)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Storage - Right */}
                    <div className={styles.topoRightAnchor}>
                      <div className={styles.topoRelative}>
                        <div
                          className={mergeClasses(
                            styles.topoMediumNode,
                            styles.topoNodePurple,
                          )}
                        >
                          <div className={styles.topoMediumInner}>
                            <div className={styles.topoMediumCorePurple}></div>
                          </div>
                        </div>
                        <div
                          className={mergeClasses(
                            styles.topoLabelBar,
                            styles.w64,
                          )}
                        ></div>
                        {/* Connection Line */}
                        <svg
                          className={styles.topoSvgConnectorRight}
                          width="80"
                          height="2"
                        >
                          <defs>
                            <linearGradient
                              id="lineGradient3"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#0078d4" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="0"
                            y1="1"
                            x2="80"
                            y2="1"
                            stroke="url(#lineGradient3)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* API Gateway - Bottom Left */}
                    <div className={styles.topoBottomLeftAnchor}>
                      <div className={styles.topoRelative}>
                        <div
                          className={mergeClasses(
                            styles.topoSmallNode,
                            styles.topoNodeTeal,
                          )}
                        >
                          <div className={styles.topoSmallInner}>
                            <div className={styles.topoSmallCoreTeal}></div>
                          </div>
                        </div>
                        <div
                          className={mergeClasses(
                            styles.topoLabelBar,
                            styles.w48,
                          )}
                        ></div>
                        {/* Diagonal Connection Line */}
                        <svg
                          className={styles.topoSvgConnectorBotLeft}
                          width="60"
                          height="60"
                        >
                          <defs>
                            <linearGradient
                              id="lineGradient4"
                              x1="0%"
                              y1="100%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#14b8a6" />
                              <stop offset="100%" stopColor="#0078d4" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="0"
                            y1="60"
                            x2="60"
                            y2="0"
                            stroke="url(#lineGradient4)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Functions - Bottom Right */}
                    <div className={styles.topoBottomRightAnchor}>
                      <div className={styles.topoRelative}>
                        <div
                          className={mergeClasses(
                            styles.topoSmallNode,
                            styles.topoNodeRed,
                          )}
                        >
                          <div className={styles.topoSmallInner}>
                            <div className={styles.topoSmallCoreRed}></div>
                          </div>
                        </div>
                        <div
                          className={mergeClasses(
                            styles.topoLabelBar,
                            styles.w48,
                          )}
                        ></div>
                        {/* Diagonal Connection Line */}
                        <svg
                          className={styles.topoSvgConnectorBotRight}
                          width="60"
                          height="60"
                        >
                          <defs>
                            <linearGradient
                              id="lineGradient5"
                              x1="100%"
                              y1="100%"
                              x2="0%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#0078d4" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="60"
                            y1="60"
                            x2="0"
                            y2="0"
                            stroke="url(#lineGradient5)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Monitoring - Top Right */}
                    <div className={styles.topoTopRightAnchor}>
                      <div className={styles.topoRelative}>
                        <div
                          className={mergeClasses(
                            styles.topoTinyNode,
                            styles.topoNodeBerry,
                          )}
                        >
                          <div className={styles.topoTinyInner}>
                            <div className={styles.topoTinyCoreBerry}></div>
                          </div>
                        </div>
                        <div className={styles.topoLabelBarTiny}></div>
                      </div>
                    </div>

                    {/* Status Legend */}
                    <div className={styles.topoLegendCard}>
                      <div className={styles.topoLegendList}>
                        <div className={styles.topoLegendRow}>
                          <div
                            className={mergeClasses(
                              styles.topoLegendDot,
                              styles.topoPulseAnim,
                              styles.topoLegendDotGreen,
                            )}
                          ></div>
                          <div
                            className={mergeClasses(
                              styles.topoLegendLabel,
                              styles.w64,
                            )}
                          ></div>
                        </div>
                        <div className={styles.topoLegendRow}>
                          <div
                            className={mergeClasses(
                              styles.topoLegendDot,
                              styles.topoPulseAnim,
                              styles.topoLegendDotBlue,
                            )}
                          ></div>
                          <div
                            className={mergeClasses(
                              styles.topoLegendLabel,
                              styles.w80,
                            )}
                          ></div>
                        </div>
                        <div className={styles.topoLegendRow}>
                          <div
                            className={mergeClasses(
                              styles.topoLegendDot,
                              styles.topoPulseAnim,
                              styles.topoLegendDotOrange,
                            )}
                          ></div>
                          <div
                            className={mergeClasses(
                              styles.topoLegendLabel,
                              styles.w72,
                            )}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Data Flow Indicators */}
                    <div className={styles.topoDataFlowWrap}>
                      <div className={styles.topoDataFlowRow}>
                        <div
                          className={mergeClasses(
                            styles.topoDataFlowDot,
                            styles.topoBounceAnim,
                            styles.topoDataFlowDotBlue,
                          )}
                        ></div>
                        <div
                          className={mergeClasses(
                            styles.topoDataFlowLabel,
                            styles.w64,
                          )}
                        ></div>
                      </div>
                      <div className={styles.topoDataFlowRow}>
                        <div
                          className={mergeClasses(
                            styles.topoDataFlowDot,
                            styles.topoBounceAnim,
                            styles.animDelay200,
                            styles.topoDataFlowDotGreen,
                          )}
                        ></div>
                        <div
                          className={mergeClasses(
                            styles.topoDataFlowLabel,
                            styles.w80,
                          )}
                        ></div>
                      </div>
                      <div className={styles.topoDataFlowRow}>
                        <div
                          className={mergeClasses(
                            styles.topoDataFlowDot,
                            styles.topoBounceAnim,
                            styles.animDelay400,
                            styles.topoDataFlowDotPurple,
                          )}
                        ></div>
                        <div
                          className={mergeClasses(
                            styles.topoDataFlowLabel,
                            styles.w72,
                          )}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.table}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableTitle}></div>
                  <div className={styles.tableActions}>
                    <div
                      className={mergeClasses(
                        styles.tableAction,
                        styles.tableActionSecondary,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.tableAction,
                        styles.tableActionPrimary,
                      )}
                    ></div>
                  </div>
                </div>

                <div className={styles.tableHeaderRow}>
                  <div className={styles.tableHeaderCell}>
                    <div
                      className={mergeClasses(
                        styles.tableHeaderText,
                        styles.w80,
                      )}
                    ></div>
                    <div className={styles.tableHeaderIcon}></div>
                  </div>
                  <div className={styles.tableHeaderCell}>
                    <div
                      className={mergeClasses(
                        styles.tableHeaderText,
                        styles.w64,
                      )}
                    ></div>
                    <div className={styles.tableHeaderIcon}></div>
                  </div>
                  <div className={styles.tableHeaderCell}>
                    <div
                      className={mergeClasses(
                        styles.tableHeaderText,
                        styles.w48,
                      )}
                    ></div>
                    <div className={styles.tableHeaderIcon}></div>
                  </div>
                  <div className={styles.tableHeaderCell}>
                    <div
                      className={mergeClasses(
                        styles.tableHeaderText,
                        styles.w72,
                      )}
                    ></div>
                    <div className={styles.tableHeaderIcon}></div>
                  </div>
                  <div className={styles.tableHeaderCell}>
                    <div
                      className={mergeClasses(
                        styles.tableHeaderText,
                        styles.w64,
                      )}
                    ></div>
                    <div className={styles.tableHeaderIcon}></div>
                  </div>
                </div>

                <div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={styles.tableRow}>
                      <div className={styles.tableCell}>
                        <div
                          className={mergeClasses(
                            styles.statusIndicator,
                            i <= 2
                              ? styles.statusGreen
                              : i <= 3
                                ? styles.statusBlue
                                : styles.statusOrange,
                          )}
                        ></div>
                        <div
                          className={mergeClasses(
                            styles.tableCellText,
                            styles.w96,
                          )}
                        ></div>
                      </div>
                      <div
                        className={mergeClasses(
                          styles.tableCellText,
                          styles.w80,
                        )}
                      ></div>
                      <div
                        className={mergeClasses(
                          styles.tableCellText,
                          styles.w64,
                        )}
                      ></div>
                      <div
                        className={mergeClasses(
                          styles.tableCellText,
                          styles.w72,
                        )}
                      ></div>
                      <div className={styles.tableCellActions}>
                        <div
                          className={mergeClasses(
                            styles.tableCellAction,
                            styles.tableCellActionPrimary,
                          )}
                        ></div>
                        <div
                          className={mergeClasses(
                            styles.tableCellAction,
                            styles.tableCellActionSecondary,
                          )}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default ProjectGroups;
