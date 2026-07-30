"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
} from "@fluentui/react-components";
import { azureLoginTheme } from "./theme";
import SignInCard from "./SignInCard";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  viewport: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    boxSizing: "border-box",
  },
});

export interface LoginPageProps {
  /** Start on the returning-user account picker (S1b) instead of the empty field. */
  startWithPicker?: boolean;
}

/**
 * Azure sign-in / login page shell. Wraps the single-surface sign-in flow in a
 * FluentProvider with the Azure brand theme and a full-viewport neutral canvas.
 * Intentionally does NOT use ProjectLayout (which injects post-login portal chrome).
 */
export default function LoginPage({ startWithPicker = false }: LoginPageProps) {
  const styles = useStyles();

  return (
    <FluentProvider theme={azureLoginTheme}>
      <main className={styles.viewport}>
        <SignInCard startWithPicker={startWithPicker} />
      </main>
    </FluentProvider>
  );
}
