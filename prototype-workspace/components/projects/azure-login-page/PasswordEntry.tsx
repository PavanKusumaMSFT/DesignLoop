"use client";

import { useState, type FormEvent } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Field,
  Input,
  Button,
  Checkbox,
  Link,
  Caption1,
  Spinner,
} from "@fluentui/react-components";
import { Eye20Regular, EyeOff20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  echo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground2,
    flexWrap: "wrap",
  },
  optionsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  toggle: {
    minWidth: "auto",
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

export interface PasswordEntryProps {
  email: string;
  onSubmit: (password: string, keepSignedIn: boolean) => void;
  onChangeAccount: () => void;
  onAnotherWay: () => void;
  isSubmitting?: boolean;
  /** External error (e.g. wrong-password) to associate with the field. */
  externalError?: string | null;
}

/**
 * S3 — Password entry, the guaranteed fallback floor (C15, FR-3 AC2 / FR-4 AC1).
 * Show/hide toggle, keep-me-signed-in, forgot-password link, and a one-action
 * return to method selection.
 */
export default function PasswordEntry({
  email,
  onSubmit,
  onChangeAccount,
  onAnotherWay,
  isSubmitting = false,
  externalError = null,
}: PasswordEntryProps) {
  const styles = useStyles();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shownError = error ?? externalError;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.trim() === "") {
      setError("Enter your password.");
      return;
    }
    setError(null);
    onSubmit(password, keep);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Caption1 className={styles.echo}>
        <span>{email}</span>
        {" \u00b7 "}
        <Link as="button" type="button" onClick={onChangeAccount}>
          Change
        </Link>
      </Caption1>

      <Field
        label="Password"
        validationState={shownError ? "error" : "none"}
        validationMessage={shownError ?? undefined}
      >
        <Input
          type={show ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={(_, data) => {
            setPassword(data.value);
            if (error) setError(null);
          }}
          contentAfter={
            <Button
              appearance="transparent"
              size="small"
              className={styles.toggle}
              icon={show ? <EyeOff20Regular /> : <Eye20Regular />}
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow((s) => !s)}
              type="button"
            />
          }
        />
      </Field>

      <div className={styles.optionsRow}>
        <Checkbox
          label="Keep me signed in"
          checked={keep}
          onChange={(_, data) => setKeep(Boolean(data.checked))}
        />
        <Link href="#forgot">Forgot password?</Link>
      </div>

      <div className={styles.actions}>
        <Button
          type="submit"
          appearance="primary"
          className={styles.primary}
          disabled={isSubmitting}
          icon={isSubmitting ? <Spinner size="tiny" /> : undefined}
        >
          {isSubmitting ? "Signing in\u2026" : "Sign in"}
        </Button>
        <Button
          appearance="subtle"
          className={styles.subtle}
          onClick={onAnotherWay}
          type="button"
        >
          Sign in another way
        </Button>
      </div>
    </form>
  );
}
