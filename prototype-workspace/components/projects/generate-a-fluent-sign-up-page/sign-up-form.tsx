"use client";

import { useMemo, useState } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Field,
  Input,
  Dropdown,
  Option,
  Checkbox,
  Button,
  Spinner,
  Text,
  Caption1,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import { Eye20Regular, EyeOff20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  acceptedTerms: boolean;
  marketingOptIn: boolean;
}

export interface SignUpFormProps {
  /** Called with validated values when the form is submitted. */
  onSubmit?: (values: SignUpValues) => void | Promise<void>;
  /** Handler for the "Sign in" affordance (rendered by the page, optional here). */
  onSignInClick?: () => void;
  /** Country/region options; injected so the form stays format-agnostic. */
  countries?: { value: string; label: string }[];
  /** Primary submit button label. */
  submitLabel?: string;
  /** Root className override. */
  className?: string;
  /** Controlled submitting state; when omitted the form manages its own. */
  isSubmitting?: boolean;
}

const DEFAULT_COUNTRIES: { value: string; label: string }[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  nameRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  passwordToggle: {
    minWidth: "auto",
  },
  strengthHint: {
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  consentGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
  },
  submit: {
    width: "100%",
    marginTop: tokens.spacingVerticalL,
  },
  helperText: {
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
  },
  liveRegion: {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
  },
});

type FieldErrors = Partial<Record<keyof SignUpValues, string>>;

const EMPTY_VALUES: SignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  country: "",
  acceptedTerms: false,
  marketingOptIn: false,
};

function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordStrength(password: string): {
  label: string;
  hint: string;
} {
  if (password.length === 0) {
    return { label: "", hint: "Use at least 8 characters." };
  }
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length < 8) return { label: "Weak", hint: "Password strength: Weak — use at least 8 characters." };
  if (score <= 2) return { label: "Weak", hint: "Password strength: Weak." };
  if (score === 3) return { label: "Medium", hint: "Password strength: Medium." };
  return { label: "Strong", hint: "Password strength: Strong." };
}

/**
 * Reusable sign-up field block: identity + contact fields, consent, and the
 * primary submit CTA with inline validation and submitting/error states.
 * Composed entirely from Fluent `Field`, `Input`, `Dropdown`, `Checkbox`,
 * `Button`, and `Spinner` — no custom field wrappers.
 */
export default function SignUpForm({
  onSubmit,
  countries = DEFAULT_COUNTRIES,
  submitLabel = "Create account",
  className,
  isSubmitting: controlledSubmitting,
}: SignUpFormProps) {
  const styles = useStyles();
  const [values, setValues] = useState<SignUpValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const submitting = controlledSubmitting ?? internalSubmitting;
  const disabled = submitting;

  const strength = useMemo(
    () => passwordStrength(values.password),
    [values.password],
  );

  function setValue<K extends keyof SignUpValues>(
    key: K,
    value: SignUpValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!emailIsValid(values.email))
      next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 8)
      next.password = "Password must be at least 8 characters.";
    if (!values.country) next.country = "Select a country or region.";
    if (!values.acceptedTerms)
      next.acceptedTerms = "You must accept the terms to continue.";
    return next;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setGlobalError(null);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      if (controlledSubmitting === undefined) setInternalSubmitting(true);
      await onSubmit?.(values);
    } catch {
      setGlobalError("We couldn't create your account. Please try again.");
    } finally {
      if (controlledSubmitting === undefined) setInternalSubmitting(false);
    }
  }

  return (
    <form
      className={mergeClasses(styles.form, className)}
      onSubmit={handleSubmit}
      noValidate
    >
      {globalError && (
        <MessageBar intent="error" role="alert">
          <MessageBarBody>{globalError}</MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.nameRow}>
        <Field
          label="First name"
          required
          validationState={errors.firstName ? "error" : "none"}
          validationMessage={errors.firstName}
        >
          <Input
            value={values.firstName}
            disabled={disabled}
            onChange={(_, data) => setValue("firstName", data.value)}
          />
        </Field>
        <Field
          label="Last name"
          required
          validationState={errors.lastName ? "error" : "none"}
          validationMessage={errors.lastName}
        >
          <Input
            value={values.lastName}
            disabled={disabled}
            onChange={(_, data) => setValue("lastName", data.value)}
          />
        </Field>
      </div>

      <Field
        label="Email"
        required
        validationState={errors.email ? "error" : "none"}
        validationMessage={errors.email}
      >
        <Input
          type="email"
          value={values.email}
          disabled={disabled}
          onChange={(_, data) => setValue("email", data.value)}
        />
      </Field>

      <Field
        label="Password"
        required
        validationState={errors.password ? "error" : "none"}
        validationMessage={errors.password}
      >
        <Input
          type={showPassword ? "text" : "password"}
          value={values.password}
          disabled={disabled}
          onChange={(_, data) => setValue("password", data.value)}
          contentAfter={
            <Button
              appearance="transparent"
              className={styles.passwordToggle}
              icon={showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          }
        />
      </Field>
      <Caption1 className={styles.strengthHint} aria-live="polite">
        {strength.hint}
      </Caption1>

      <Field
        label="Country/Region"
        required
        validationState={errors.country ? "error" : "none"}
        validationMessage={errors.country}
      >
        <Dropdown
          placeholder="Select a country or region"
          disabled={disabled}
          selectedOptions={values.country ? [values.country] : []}
          value={
            countries.find((c) => c.value === values.country)?.label ?? ""
          }
          onOptionSelect={(_, data) =>
            setValue("country", data.optionValue ?? "")
          }
        >
          {countries.map((country) => (
            <Option key={country.value} value={country.value}>
              {country.label}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <div className={styles.consentGroup}>
        <Checkbox
          checked={values.acceptedTerms}
          disabled={disabled}
          onChange={(_, data) =>
            setValue("acceptedTerms", Boolean(data.checked))
          }
          label="I accept the Terms of Use and Privacy Statement."
        />
        {errors.acceptedTerms && (
          <Caption1 role="alert" className={styles.errorText}>
            {errors.acceptedTerms}
          </Caption1>
        )}
        <Checkbox
          checked={values.marketingOptIn}
          disabled={disabled}
          onChange={(_, data) =>
            setValue("marketingOptIn", Boolean(data.checked))
          }
          label="Send me product updates and offers. (Optional)"
        />
      </div>

      <Button
        type="submit"
        appearance="primary"
        size="large"
        className={styles.submit}
        disabled={disabled}
        icon={submitting ? <Spinner size="tiny" /> : undefined}
      >
        {submitting ? "Creating account\u2026" : submitLabel}
      </Button>
      {!values.acceptedTerms && (
        <Caption1 className={styles.helperText}>
          Accept the terms above to create your account.
        </Caption1>
      )}

      <div className={styles.liveRegion} aria-live="polite">
        {submitting ? "Creating account" : ""}
      </div>
    </form>
  );
}
