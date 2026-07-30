"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Link,
  Divider,
} from "@fluentui/react-components";
import { ShieldCheckmark16Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    width: "100%",
    maxWidth: "440px",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    boxSizing: "border-box",
  },
  reassurance: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground2,
  },
  reassuranceIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  reassuranceText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    fontSize: tokens.fontSizeBase200,
  },
  vdivider: {
    height: "12px",
  },
});

/**
 * Reserved trust footer (C24). Genuine-surface reassurance plus static legal /
 * support links. Help is read-only — no credential-taking widget (NFR-Sec, C42).
 */
export default function TrustFooter() {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <span className={styles.reassurance}>
        <ShieldCheckmark16Regular
          className={styles.reassuranceIcon}
          aria-hidden="true"
        />
        <Text className={styles.reassuranceText}>
          Genuine Microsoft sign-in surface
        </Text>
      </span>
      <nav className={styles.links} aria-label="Legal and support">
        <Link href="#privacy" className={styles.link}>
          Privacy
        </Link>
        <Divider vertical aria-hidden="true" className={styles.vdivider} />
        <Link href="#terms" className={styles.link}>
          Terms
        </Link>
        <Divider vertical aria-hidden="true" className={styles.vdivider} />
        <Link href="#help" className={styles.link}>
          Help
        </Link>
      </nav>
    </footer>
  );
}
