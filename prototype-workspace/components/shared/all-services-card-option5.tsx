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
  // Same hover treatment as the Default card but no description — compact layout
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
  costPill: {
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
    alignSelf: "flex-start",
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
  existingButton: {
    minWidth: "auto",
  },
  favoriteButton: {
    minWidth: "auto",
    padding: "6px",
    transitionProperty: "opacity",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: "ease",
    alignSelf: "flex-start",
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

export interface AllServicesCardOption5Props {
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

/** Option 5 card layout for the All Services page. Based on the Default card — 32px icon, name, cost basis subtitle, description body text, and star top-right. */
export default function AllServicesCardOption5({
  service,
  isFavorited,
  isHovered,
  costBasis,
  onToggleFavorite,
  onMouseEnter,
  onMouseLeave,
  onExisting,
  onCreate,
}: AllServicesCardOption5Props) {
  const styles = useStyles();

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
            {costBasis && <span className={styles.costPill}>{costBasis}</span>}
          </div>
        }
        action={
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
        }
      />
      <div className={styles.serviceDescription}>{service.description}</div>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}
