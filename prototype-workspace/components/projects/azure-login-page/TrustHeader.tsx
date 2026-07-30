"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Button,
} from "@fluentui/react-components";
import {
  ShieldCheckmark20Filled,
  ChevronDown16Regular,
  Person16Filled,
} from "@fluentui/react-icons";
import type { KnownAccount } from "./types";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    width: "100%",
    maxWidth: "440px",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    boxSizing: "border-box",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  logo: {
    height: "20px",
    width: "auto",
  },
  cue: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground1,
  },
  cueIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  cueText: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
  chip: {
    fontSize: tokens.fontSizeBase200,
  },
});

export interface TrustHeaderProps {
  /** The active account/tenant context, shown once known (C22). */
  account?: KnownAccount | null;
  /** Alternate tenants the account can switch to (C36 tenant switcher). */
  tenants?: string[];
  onSwitchTenant?: (tenant: string) => void;
}

/**
 * Reserved trust zone above the sign-in card. Always renders the verified-surface
 * cue (checkmark icon + text) — tenant branding may theme around it but can never
 * remove or restyle it (FR-7 AC1/AC2). Optionally shows the active account/tenant
 * chip with a tenant switcher Menu (C36).
 */
export default function TrustHeader({
  account,
  tenants,
  onSwitchTenant,
}: TrustHeaderProps) {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/icons/microsoft.svg" alt="Microsoft" className={styles.logo} />
        <span className={styles.cue}>
          <ShieldCheckmark20Filled className={styles.cueIcon} aria-hidden="true" />
          <Text className={styles.cueText}>Verified Microsoft sign-in</Text>
        </span>
      </div>

      {account ? (
        tenants && tenants.length > 1 ? (
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                size="small"
                className={styles.chip}
                icon={<Person16Filled aria-hidden="true" />}
                iconPosition="before"
              >
                <span aria-hidden="false">
                  {account.tenant}
                </span>
                <ChevronDown16Regular aria-hidden="true" />
              </Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {tenants.map((t) => (
                  <MenuItem key={t} onClick={() => onSwitchTenant?.(t)}>
                    {t}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        ) : (
          <Button
            appearance="subtle"
            size="small"
            className={styles.chip}
            icon={<Person16Filled aria-hidden="true" />}
            iconPosition="before"
            aria-label={`Signed in as ${account.email} in ${account.tenant}`}
          >
            {account.tenant}
          </Button>
        )
      ) : null}
    </header>
  );
}
