"use client";

import { useState, type FormEvent } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Field,
  Input,
  Button,
  Link,
  Caption1,
  Spinner,
} from "@fluentui/react-components";
import {
  isValidIdentifier,
  detectAccountType,
  type AccountType,
} from "./types";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  hint: {
    color: tokens.colorNeutralForeground3,
  },
  typeHint: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  primary: {
    width: "100%",
  },
  secondaryRow: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
});

const TYPE_LABEL: Record<AccountType, string> = {
  work: "Work or school account",
  personal: "Personal account",
};

export interface IdentityInputProps {
  /** Called with the validated identifier to advance to method selection. */
  onSubmit: (identifier: string) => void;
  onUseAccountPicker?: () => void;
  isSubmitting?: boolean;
  initialValue?: string;
}

/**
 * S1 — Identifier-first entry (FR-1). Single email/phone/Skype field with inline
 * account-type detection (C2, never a manual toggle) and a single primary action.
 */
export default function IdentityInput({
  onSubmit,
  onUseAccountPicker,
  isSubmitting = false,
  initialValue = "",
}: IdentityInputProps) {
  const styles = useStyles();
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const detectedType = detectAccountType(value);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim() === "") {
      setError("Enter your email, phone, or Skype name.");
      return;
    }
    if (!isValidIdentifier(value)) {
      setError("That doesn't look right. Check your email or phone and try again.");
      return;
    }
    setError(null);
    onSubmit(value.trim());
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Field
        label="Email, phone, or Skype"
        validationState={error ? "error" : "none"}
        validationMessage={error ?? undefined}
        hint={
          detectedType ? (
            <Caption1 className={styles.typeHint}>
              {TYPE_LABEL[detectedType]}
            </Caption1>
          ) : (
            <Caption1 className={styles.hint}>
              Use your work, school, or personal Microsoft account.
            </Caption1>
          )
        }
      >
        <Input
          type="email"
          inputMode="email"
          autoComplete="username"
          value={value}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={(_, data) => {
            setValue(data.value);
            if (error) setError(null);
          }}
          placeholder="someone@example.com"
        />
      </Field>

      <div className={styles.actions}>
        <Button
          type="submit"
          appearance="primary"
          className={styles.primary}
          disabled={isSubmitting}
          icon={isSubmitting ? <Spinner size="tiny" /> : undefined}
        >
          {isSubmitting ? "Checking\u2026" : "Next"}
        </Button>
        <Caption1 className={styles.secondaryRow}>
          <Link href="#create">No account? Create one</Link>
          {onUseAccountPicker ? (
            <>
              {" \u00b7 "}
              <Link as="button" type="button" onClick={onUseAccountPicker}>
                Use a saved account
              </Link>
            </>
          ) : null}
        </Caption1>
      </div>
    </form>
  );
}
