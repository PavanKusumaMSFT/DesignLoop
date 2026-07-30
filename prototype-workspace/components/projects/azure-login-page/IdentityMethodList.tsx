"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Divider,
  Caption1,
  Link,
} from "@fluentui/react-components";
import {
  Key24Regular,
  PhoneLaptop24Regular,
  Fingerprint24Regular,
  Password24Regular,
} from "@fluentui/react-icons";
import type { AuthMethod, MethodKind } from "./types";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  wrapper: {
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
  methods: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  method: {
    width: "100%",
    justifyContent: "flex-start",
    minHeight: "44px",
  },
  drawer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalS,
  },
  drawerLabel: {
    color: tokens.colorNeutralForeground3,
  },
  subtle: {
    justifyContent: "flex-start",
  },
});

const METHOD_ICON: Record<MethodKind, JSX.Element> = {
  passkey: <Key24Regular />,
  authenticator: <PhoneLaptop24Regular />,
  "windows-hello": <Fingerprint24Regular />,
  password: <Password24Regular />,
};

export interface IdentityMethodListProps {
  email: string;
  methods: AuthMethod[];
  onChooseMethod: (kind: MethodKind) => void;
  onChangeAccount: () => void;
}

/**
 * S2 — Passwordless-first method selection (FR-3, FR-4). The first enrolled method
 * (enrollment-ordered) is the visually dominant primary action; other methods are
 * secondary. Password is present but never the visual default when passwordless is
 * enrolled. "Sign in another way" reveals the full availability matrix (drawer).
 */
export default function IdentityMethodList({
  email,
  methods,
  onChooseMethod,
  onChangeAccount,
}: IdentityMethodListProps) {
  const styles = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const ordered = [...methods].sort((a, b) => a.order - b.order);
  const [hero, ...rest] = ordered;
  // Everything not shown as hero is available in the drawer (incl. password).
  const drawerMethods = rest;

  return (
    <div className={styles.wrapper}>
      <Caption1 className={styles.echo}>
        <span>Signed in as {email}</span>
        {" \u00b7 "}
        <Link as="button" type="button" onClick={onChangeAccount}>
          Change
        </Link>
      </Caption1>

      <div className={styles.methods}>
        {hero ? (
          <Button
            appearance="primary"
            className={styles.method}
            icon={METHOD_ICON[hero.kind]}
            onClick={() => onChooseMethod(hero.kind)}
          >
            {hero.label}
          </Button>
        ) : null}

        {/* Show up to one additional enrolled method inline as secondary. */}
        {rest.length > 0 && rest[0].kind !== "password" ? (
          <Button
            appearance="secondary"
            className={styles.method}
            icon={METHOD_ICON[rest[0].kind]}
            onClick={() => onChooseMethod(rest[0].kind)}
          >
            {rest[0].label}
          </Button>
        ) : null}
      </div>

      {drawerMethods.length > 0 ? (
        <>
          <Divider>or</Divider>
          {drawerOpen ? (
            <div className={styles.drawer}>
              <Caption1 className={styles.drawerLabel}>
                All ways to sign in
              </Caption1>
              {drawerMethods.map((m) => (
                <Button
                  key={m.kind}
                  appearance="secondary"
                  className={styles.method}
                  icon={METHOD_ICON[m.kind]}
                  onClick={() => onChooseMethod(m.kind)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              appearance="subtle"
              className={styles.subtle}
              onClick={() => setDrawerOpen(true)}
            >
              Sign in another way
            </Button>
          )}
        </>
      ) : null}
    </div>
  );
}
