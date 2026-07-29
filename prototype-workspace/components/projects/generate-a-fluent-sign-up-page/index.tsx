"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Card,
  Text,
  Body1,
  Caption1,
  Link,
  Button,
  Divider,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import { Checkmark48Regular } from "@fluentui/react-icons";
import SignUpForm, { type SignUpValues } from "./sign-up-form";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalL}`,
    minHeight: "100%",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    boxShadow: tokens.shadow16,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  brand: {
    display: "flex",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  logo: {
    height: "32px",
    width: "auto",
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    textAlign: "center",
  },
  title: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase700,
    color: tokens.colorNeutralForeground1,
  },
  signInRow: {
    color: tokens.colorNeutralForeground2,
  },
  altButtons: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  altButton: {
    width: "100%",
    justifyContent: "flex-start",
  },
  altIcon: {
    height: "20px",
    width: "20px",
    marginRight: tokens.spacingHorizontalS,
  },
  fineprint: {
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
  },
  success: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    textAlign: "center",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  successIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

/**
 * Full-page Azure-style account sign-up surface: brand logo, title, sign-in
 * link, alternate sign-up buttons, and the reusable SignUpForm field block.
 * Handles the success state inline using the Checkmark motif from SignupModal.
 */
export default function SignUpPage() {
  const styles = useStyles();
  const [submitted, setSubmitted] = useState<SignUpValues | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(values: SignUpValues) {
    setServerError(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitted(values);
  }

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <div className={styles.brand}>
          <img src="/icons/Azure.svg" alt="Azure" className={styles.logo} />
        </div>

        {submitted ? (
          <div className={styles.success} role="status">
            <Checkmark48Regular className={styles.successIcon} />
            <Text as="h1" className={styles.title}>
              Account created
            </Text>
            <Body1>
              Welcome, {submitted.firstName}. Check {submitted.email} to verify
              your account and get started.
            </Body1>
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              <Text as="h1" className={styles.title}>
                Create your account
              </Text>
              <Body1 className={styles.signInRow}>
                Already have an account? <Link href="#signin">Sign in</Link>
              </Body1>
            </div>

            {serverError && (
              <MessageBar intent="error" role="alert">
                <MessageBarBody>{serverError}</MessageBarBody>
              </MessageBar>
            )}

            <div className={styles.altButtons}>
              <Button
                appearance="secondary"
                className={styles.altButton}
                icon={
                  <img
                    src="/icons/microsoft.svg"
                    alt=""
                    aria-hidden="true"
                    className={styles.altIcon}
                  />
                }
              >
                Sign up with Microsoft
              </Button>
              <Button
                appearance="secondary"
                className={styles.altButton}
                icon={
                  <img
                    src="/icons/github.svg"
                    alt=""
                    aria-hidden="true"
                    className={styles.altIcon}
                  />
                }
              >
                Sign up with GitHub
              </Button>
            </div>

            <Divider>or</Divider>

            <SignUpForm countries={COUNTRIES} onSubmit={handleSubmit} />

            <Caption1 className={styles.fineprint}>
              By creating an account you agree to the{" "}
              <Link href="#terms">Terms of Use</Link> and{" "}
              <Link href="#privacy">Privacy Statement</Link>.
            </Caption1>
          </>
        )}
      </Card>
    </div>
  );
}
