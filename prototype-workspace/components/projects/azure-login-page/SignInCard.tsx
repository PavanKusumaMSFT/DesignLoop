"use client";

import { useEffect, useMemo, useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Card,
  Title2,
  Body1,
  Spinner,
} from "@fluentui/react-components";
import { CheckmarkCircle48Filled } from "@fluentui/react-icons";
import TrustHeader from "./TrustHeader";
import TrustFooter from "./TrustFooter";
import IdentityInput from "./IdentityInput";
import AccountPicker from "./AccountPicker";
import IdentityMethodList from "./IdentityMethodList";
import PasswordEntry from "./PasswordEntry";
import MfaVerify, { type MfaChallenge } from "./MfaVerify";
import ErrorRecovery, { type RecoveryAction } from "./ErrorRecovery";
import {
  ERROR_TAXONOMY,
  MOCK_ACCOUNTS,
  getMethodsForAccount,
  wait,
  type ErrorKind,
  type KnownAccount,
  type LoginState,
  type MethodKind,
} from "./types";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: "440px",
    boxSizing: "border-box",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    boxShadow: tokens.shadow16,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  logoRow: {
    display: "flex",
    justifyContent: "flex-start",
  },
  logo: {
    height: "24px",
    width: "auto",
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  title: {
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
  },
  stepper: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    animationName: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveEasyEase,
    "@media (prefers-reduced-motion: reduce)": {
      animationName: "none",
    },
  },
  loadingBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  successBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    textAlign: "center",
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
  },
  successIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
  },
});

const SUBTITLE: Partial<Record<LoginState, string>> = {
  identify: "to continue to the Azure portal",
  picker: "Choose an account to continue to the Azure portal",
  method: "Choose how to verify your identity",
  password: "Enter your password to continue",
  mfa: "Help us keep your account secure",
};

const TITLE: Partial<Record<LoginState, string>> = {
  identify: "Sign in",
  picker: "Pick an account",
  method: "Verify your identity",
  password: "Enter password",
  mfa: "Verify your identity",
};

function challengeForMethod(kind: MethodKind): MfaChallenge {
  if (kind === "authenticator") return "number-match";
  if (kind === "windows-hello") return "security-key";
  if (kind === "passkey") return "security-key";
  return "totp";
}

export interface SignInCardProps {
  /** Seed the returning-user picker (S1b) on first load. */
  startWithPicker?: boolean;
}

/**
 * SignInCard — single-surface orchestrator for the Azure sign-in flow. All states
 * (S1–S7) are in-place transitions of one persistent Card; the trust header/footer
 * stay mounted. Auth is fully simulated (timeouts + validation) — no real MSAL.
 */
export default function SignInCard({ startWithPicker = false }: SignInCardProps) {
  const styles = useStyles();

  const [state, setState] = useState<LoginState>(
    startWithPicker ? "picker" : "identify",
  );
  const [identifier, setIdentifier] = useState<string>("");
  const [account, setAccount] = useState<KnownAccount | null>(null);
  const [chosenMethod, setChosenMethod] = useState<MethodKind | null>(null);
  const [error, setError] = useState<ErrorKind | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Signing you in\u2026");
  const [liveMessage, setLiveMessage] = useState("");

  // Move focus to the heading on each new state, and announce it (NFR-A11y AC1).
  useEffect(() => {
    if (state === "loading") return;
    const el = document.getElementById("signin-heading");
    el?.focus();
    const t = TITLE[state];
    if (t) setLiveMessage(`${t}. ${SUBTITLE[state] ?? ""}`);
  }, [state]);

  const methods = useMemo(
    () => (identifier ? getMethodsForAccount(identifier) : []),
    [identifier],
  );

  function goto(next: LoginState) {
    setError(null);
    setState(next);
  }

  // ---- S1 identify submit -------------------------------------------------
  async function handleIdentify(value: string) {
    setSubmitting(true);
    setIdentifier(value);
    setLoadingLabel("Checking your sign-in options\u2026");
    setState("loading");
    await wait(900);
    setSubmitting(false);
    // Simulate unknown account for a sentinel value.
    if (value.toLowerCase().startsWith("unknown@")) {
      showError("unknown-account", "identify");
      return;
    }
    setAccount({
      id: "typed",
      displayName: value.split("@")[0] || value,
      email: value,
      type: value.includes("@") && !/outlook|hotmail|gmail|live/.test(value)
        ? "work"
        : "personal",
      tenant: value.includes("@")
        ? value.split("@")[1] || "Microsoft account"
        : "Microsoft account",
    });
    const m = getMethodsForAccount(value);
    // Silent fallback: if only password is available, go straight to password (FR-4 AC1).
    if (m.length === 1 && m[0].kind === "password") {
      setChosenMethod("password");
      goto("password");
    } else {
      goto("method");
    }
  }

  // ---- S1b picker select --------------------------------------------------
  function handlePickAccount(acct: KnownAccount) {
    setAccount(acct);
    setIdentifier(acct.email);
    const m = getMethodsForAccount(acct.email);
    if (m.length === 1 && m[0].kind === "password") {
      setChosenMethod("password");
      goto("password");
    } else {
      goto("method");
    }
  }

  // ---- S2 method choose ---------------------------------------------------
  async function handleChooseMethod(kind: MethodKind) {
    setChosenMethod(kind);
    if (kind === "password") {
      goto("password");
      return;
    }
    // Passwordless → step-up verification (MFA-style challenge).
    goto("mfa");
  }

  // ---- S3 password submit -------------------------------------------------
  async function handlePasswordSubmit(password: string) {
    setSubmitting(true);
    setLoadingLabel("Verifying your password\u2026");
    setState("loading");
    await wait(1000);
    setSubmitting(false);
    // Sentinel: "wrong" triggers the wrong-password error; "locked" locks account.
    const p = password.toLowerCase();
    if (p === "wrong") {
      showError("wrong-password", "password");
      return;
    }
    if (p === "locked") {
      showError("locked-account", "password");
      return;
    }
    if (p === "policy") {
      showError("policy-block", "password");
      return;
    }
    // Work accounts require MFA step-up; personal go straight to success.
    if (account?.type === "work") {
      setChosenMethod("authenticator");
      goto("mfa");
    } else {
      finishSuccess();
    }
  }

  // ---- S4 MFA verified ----------------------------------------------------
  async function handleMfaVerified() {
    finishSuccess();
  }

  async function finishSuccess() {
    setLoadingLabel("Signing you in\u2026");
    setState("loading");
    await wait(1100);
    setState("success");
    setLiveMessage("You're signed in. Redirecting to the Azure portal.");
  }

  function showError(kind: ErrorKind, backTo: LoginState) {
    setError(kind);
    setState(backTo);
    setLiveMessage(ERROR_TAXONOMY[kind].message);
  }

  function resetToIdentify() {
    setError(null);
    setAccount(null);
    setChosenMethod(null);
    setIdentifier("");
    goto("identify");
  }

  // ---- Error recovery actions per taxonomy row ----------------------------
  function recoveryActions(kind: ErrorKind): RecoveryAction[] {
    switch (kind) {
      case "wrong-password":
        return [{ label: "Try again", onClick: () => setError(null) }];
      case "unknown-account":
        return [{ label: "Use another account", onClick: resetToIdentify }];
      case "locked-account":
        return [
          {
            label: "Unlock or reset",
            onClick: () => window.open("#reset", "_self"),
            asLink: true,
          },
        ];
      case "expired-session":
        return [{ label: "Sign in again", onClick: resetToIdentify }];
      case "network-error":
        return [{ label: "Try again", onClick: () => setError(null) }];
      case "policy-block":
        return [
          {
            label: "Contact your admin",
            onClick: () => window.open("#admin", "_self"),
            asLink: true,
          },
        ];
      case "mfa-failed":
        return [
          { label: "Try again", onClick: () => setError(null) },
          {
            label: "Choose another method",
            onClick: () => goto("method"),
            asLink: true,
          },
        ];
    }
  }

  const showStepper = state === "identify" || state === "method";
  const stepNumber = state === "identify" ? 1 : 2;

  return (
    <>
      <TrustHeader
        account={account}
        tenants={
          account?.type === "work"
            ? [account.tenant, "Microsoft account"]
            : undefined
        }
      />

      <Card className={styles.card}>
        <div className={styles.logoRow}>
          <img src="/icons/Azure.svg" alt="Azure" className={styles.logo} />
        </div>

        {/* Screen-reader live region for status + focus announcements */}
        <div className={styles.srOnly} aria-live="polite" role="status">
          {liveMessage}
        </div>

        {state !== "loading" && state !== "success" ? (
          <div className={styles.heading}>
            <Title2 as="h1" id="signin-heading" tabIndex={-1} className={styles.title}>
              {TITLE[state]}
            </Title2>
            {SUBTITLE[state] ? (
              <Body1 className={styles.subtitle}>{SUBTITLE[state]}</Body1>
            ) : null}
            {showStepper ? (
              <span className={styles.stepper}>Step {stepNumber} of 2</span>
            ) : null}
          </div>
        ) : null}

        {/* Error slot — above the primary action of the current state */}
        {error ? (
          <ErrorRecovery
            spec={ERROR_TAXONOMY[error]}
            actions={recoveryActions(error)}
          />
        ) : null}

        <div className={styles.body} key={state}>
          {state === "identify" ? (
            <IdentityInput
              onSubmit={handleIdentify}
              onUseAccountPicker={() => goto("picker")}
              isSubmitting={submitting}
              initialValue={identifier}
            />
          ) : null}

          {state === "picker" ? (
            <AccountPicker
              accounts={MOCK_ACCOUNTS}
              onSelect={handlePickAccount}
              onUseAnother={resetToIdentify}
            />
          ) : null}

          {state === "method" ? (
            <IdentityMethodList
              email={identifier}
              methods={methods}
              onChooseMethod={handleChooseMethod}
              onChangeAccount={resetToIdentify}
            />
          ) : null}

          {state === "password" ? (
            <PasswordEntry
              email={identifier}
              onSubmit={handlePasswordSubmit}
              onChangeAccount={resetToIdentify}
              onAnotherWay={() => goto("method")}
              isSubmitting={submitting}
              externalError={
                error === "wrong-password"
                  ? ERROR_TAXONOMY["wrong-password"].message
                  : null
              }
            />
          ) : null}

          {state === "mfa" && chosenMethod ? (
            <MfaVerify
              challenge={challengeForMethod(chosenMethod)}
              onVerified={handleMfaVerified}
              onDifferentMethod={() => goto("method")}
            />
          ) : null}

          {state === "loading" ? (
            <div className={styles.loadingBlock}>
              <Spinner size="large" label={loadingLabel} labelPosition="below" />
            </div>
          ) : null}

          {state === "success" ? (
            <div className={styles.successBlock} role="status">
              <CheckmarkCircle48Filled
                className={styles.successIcon}
                aria-hidden="true"
              />
              <Title2 as="h1" id="signin-heading" tabIndex={-1} className={styles.title}>
                You're signed in
              </Title2>
              <Body1 className={styles.subtitle}>
                {account?.displayName} {"\u00b7"} {account?.tenant}
              </Body1>
              <span className={styles.stepper}>
                <Spinner size="tiny" /> Redirecting to the Azure portal{"\u2026"}
              </span>
            </div>
          ) : null}
        </div>
      </Card>

      <TrustFooter />
    </>
  );
}
