"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Avatar,
  Badge,
  Body1,
  Caption1,
  Button,
} from "@fluentui/react-components";
import { Person24Regular } from "@fluentui/react-icons";
import type { KnownAccount, Environment } from "./types";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  listItem: {
    display: "flex",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    width: "100%",
    minHeight: "44px",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow4,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: "2px",
    },
  },
  rowText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flexGrow: 1,
    minWidth: 0,
  },
  name: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  email: {
    color: tokens.colorNeutralForeground2,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: "2px",
  },
  typeHint: {
    color: tokens.colorNeutralForeground3,
  },
  another: {
    justifyContent: "flex-start",
    marginTop: tokens.spacingVerticalXS,
  },
});

const ENV_COLOR: Record<Environment, "success" | "warning" | "informative"> = {
  Prod: "success",
  Staging: "warning",
  Dev: "informative",
};

export interface AccountPickerProps {
  accounts: KnownAccount[];
  onSelect: (account: KnownAccount) => void;
  onUseAnother: () => void;
}

/**
 * S1b — Returning-user account picker (FR-2, FR-9). Rich rows with avatar, name,
 * email, account-type hint, and optional environment badge (C37). Selecting a row
 * advances to that account's method screen without re-typing. Always offers
 * "Use another account".
 */
export default function AccountPicker({
  accounts,
  onSelect,
  onUseAnother,
}: AccountPickerProps) {
  const styles = useStyles();

  return (
    <div className={styles.list} role="list" aria-label="Choose an account">
      {accounts.map((acct) => (
        <div key={acct.id} role="listitem" className={styles.listItem}>
        <button
          type="button"
          className={styles.row}
          onClick={() => onSelect(acct)}
          aria-label={`${acct.displayName}, ${acct.email}, ${
            acct.type === "work" ? "work or school account" : "personal account"
          }${acct.environment ? `, ${acct.environment} environment` : ""}`}
        >
          <Avatar
            name={acct.displayName}
            icon={<Person24Regular />}
            color="colorful"
            aria-hidden="true"
          />
          <span className={styles.rowText}>
            <Body1 className={styles.name}>{acct.displayName}</Body1>
            <Caption1 className={styles.email}>{acct.email}</Caption1>
            <span className={styles.metaRow}>
              <Caption1 className={styles.typeHint}>
                {acct.type === "work" ? "Work or school" : "Personal"}
                {" \u00b7 "}
                {acct.tenant}
              </Caption1>
              {acct.environment ? (
                <Badge
                  appearance="tint"
                  color={ENV_COLOR[acct.environment]}
                  size="small"
                >
                  {acct.environment}
                </Badge>
              ) : null}
            </span>
          </span>
        </button>
        </div>
      ))}

      <Button
        appearance="subtle"
        className={styles.another}
        onClick={onUseAnother}
        icon={<Person24Regular />}
      >
        Use another account
      </Button>
    </div>
  );
}
