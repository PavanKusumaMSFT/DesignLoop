"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Field,
  Input,
  Button,
  Checkbox,
  Body1,
  Text,
  Spinner,
  Link,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export type MfaChallenge = "number-match" | "totp" | "security-key";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  protective: {
    color: tokens.colorNeutralForeground2,
  },
  numberBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  number: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    letterSpacing: "0.1em",
  },
  waiting: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  primary: {
    width: "100%",
  },
  subtle: {
    alignSelf: "center",
  },
});

const TITLE: Record<MfaChallenge, string> = {
  "number-match": "Approve sign-in request",
  totp: "Enter code",
  "security-key": "Use your security key",
};

export interface MfaVerifyProps {
  challenge: MfaChallenge;
  /** Number the user matches on their device (number-match challenge). */
  matchNumber?: number;
  onVerified: (dontAskAgain: boolean) => void;
  onDifferentMethod: () => void;
  /** Auto-approve delay for number-match, in ms (simulated push). */
  autoApproveMs?: number;
}

/**
 * S4 — MFA / step-up verification (FR-5). Always leads with protective-framing copy
 * (C23). Supports number-matching push (live-region waiting state), 6-digit TOTP
 * (keyboard-operable), and FIDO2 security key. Offers a trusted-device opt-out and
 * a no-dead-end escape to choose another method.
 */
export default function MfaVerify({
  challenge,
  matchNumber = 42,
  onVerified,
  onDifferentMethod,
  autoApproveMs = 3200,
}: MfaVerifyProps) {
  const styles = useStyles();
  const [code, setCode] = useState("");
  const [dontAsk, setDontAsk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);

  // Simulate the push approval arriving from the phone for number-match.
  useEffect(() => {
    if (challenge !== "number-match") return;
    const t = setTimeout(() => {
      setApproved(true);
      onVerified(dontAsk);
    }, autoApproveMs);
    return () => clearTimeout(t);
    // dontAsk intentionally read at fire time via ref-less closure is fine for the mock
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, autoApproveMs]);

  function handleTotpSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setError(null);
    onVerified(dontAsk);
  }

  return (
    <div className={styles.wrapper}>
      <Body1 className={styles.protective}>
        Extra verification is required by your organization to keep your account
        secure.
      </Body1>

      {challenge === "number-match" ? (
        <div className={styles.numberBlock}>
          <Body1>Open Microsoft Authenticator and enter this number:</Body1>
          <Text className={styles.number} aria-label={`Match number ${matchNumber}`}>
            {matchNumber}
          </Text>
          <span className={styles.waiting} aria-live="polite">
            <Spinner size="tiny" />
            <Text>
              {approved ? "Request approved" : "Waiting for approval\u2026"}
            </Text>
          </span>
        </div>
      ) : null}

      {challenge === "totp" ? (
        <form
          className={styles.actions}
          onSubmit={handleTotpSubmit}
          noValidate
        >
          <Field
            label="Enter the 6-digit code"
            validationState={error ? "error" : "none"}
            validationMessage={error ?? undefined}
          >
            <Input
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              value={code}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onChange={(_, data) => {
                setCode(data.value.replace(/\D/g, ""));
                if (error) setError(null);
              }}
              placeholder="123456"
            />
          </Field>
          <Checkbox
            label="Don't ask again on this device"
            checked={dontAsk}
            onChange={(_, data) => setDontAsk(Boolean(data.checked))}
          />
          <Button type="submit" appearance="primary" className={styles.primary}>
            Verify
          </Button>
        </form>
      ) : null}

      {challenge === "security-key" ? (
        <div className={styles.actions}>
          <Body1>
            Insert your security key and touch it, or follow your browser's
            prompt.
          </Body1>
          <Checkbox
            label="Don't ask again on this device"
            checked={dontAsk}
            onChange={(_, data) => setDontAsk(Boolean(data.checked))}
          />
          <Button
            appearance="primary"
            className={styles.primary}
            onClick={() => onVerified(dontAsk)}
          >
            Use security key
          </Button>
        </div>
      ) : null}

      <Link as="button" type="button" onClick={onDifferentMethod}>
        I can't use this method
      </Link>
    </div>
  );
}
