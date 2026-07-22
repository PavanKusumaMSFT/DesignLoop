"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Card,
  CardHeader,
  CardFooter,
} from "@fluentui/react-components";
import {
  Star20Regular,
  Star20Filled,
  Add16Regular,
  List16Regular,
} from "@fluentui/react-icons";
import type { Service } from "../projects/build-2026/all-services-data";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  serviceCard: {
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
  // Cost pill in the CardHeader action slot (top-right)
  costPillAction: {
    display: "inline-flex",
    alignItems: "center",
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteGreenBackground1,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorPaletteGreenForeground2,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
    marginTop: tokens.spacingVerticalXXS,
  },
  serviceDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
    fontFamily: tokens.fontFamilyBase,
    flex: 1,
    paddingBottom: tokens.spacingVerticalM,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  footerActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  existingButton: {
    minWidth: "auto",
  },
  // Star button in the footer (bottom-right)
  favoriteButton: {
    minWidth: "auto",
    padding: "6px",
    transitionProperty: "opacity",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: "ease",
  },
  favoriteButtonVisible: {
    opacity: 1,
  },
  favoriteButtonHidden: {
    opacity: 0,
  },
  starYellow: {
    color: tokens.colorPaletteYellowForeground1,
  },
});

export interface AllServicesCardOption4Props {
  service: Service;
  isFavorited: boolean;
  isHovered: boolean;
  costBasis?: string;
  onToggleFavorite: (service: Service, e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onExisting?: () => void;
  onCreate?: () => void;
}

/** Option 4 card layout for the All Services page. Based on Option 3 with star and cost basis swapped: pill is top-right in the header, star is bottom-right in the footer. */
export default function AllServicesCardOption4({
  service,
  isFavorited,
  isHovered,
  costBasis,
  onToggleFavorite,
  onMouseEnter,
  onMouseLeave,
  onExisting,
  onCreate,
}: AllServicesCardOption4Props) {
  const styles = useStyles();

  const showPill = costBasis !== undefined && costBasis !== null;

  return (
    <Card
      className={styles.serviceCard}
      appearance="filled"
      size="medium"
      focusMode="tab-exit"
      aria-label={service.name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
        action={
          showPill ? (
            <span className={styles.costPillAction}>{costBasis}</span>
          ) : undefined
        }
      />
      <div className={styles.serviceDescription}>{service.description}</div>
      <CardFooter>
        <div className={styles.cardFooter}>
          <div className={styles.footerActions}>
            <Button
              appearance="secondary"
              icon={<Add16Regular />}
              onClick={onCreate}
            >
              Create
            </Button>
            <Button
              appearance="subtle"
              icon={<List16Regular />}
              className={styles.existingButton}
              onClick={onExisting}
            >
              Existing
            </Button>
          </div>
          <Button
            appearance="transparent"
            icon={
              isFavorited ? (
                <Star20Filled className={styles.starYellow} />
              ) : (
                <Star20Regular />
              )
            }
            className={mergeClasses(
              styles.favoriteButton,
              isHovered || isFavorited
                ? styles.favoriteButtonVisible
                : styles.favoriteButtonHidden,
            )}
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
            onClick={(e) => onToggleFavorite(service, e)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
