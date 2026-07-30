"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  MessageBar,
  MessageBarBody,
  MessageBarActions,
  Button,
  Link,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
} from "@fluentui/react-components";
import type { ErrorSpec } from "./types";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  panelText: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
  },
});

export interface RecoveryAction {
  label: string;
  onClick: () => void;
  /** Render as a Link instead of a Button. */
  asLink?: boolean;
}

export interface ErrorRecoveryProps {
  spec: ErrorSpec;
  /** Adjacent recovery action(s) — always at least one (no dead-ends, FR-6 AC3). */
  actions: RecoveryAction[];
}

/**
 * S5 — Error / recovery system (FR-6). Renders one MessageBar (highest severity)
 * from the error taxonomy, with adjacent recovery action(s). Policy blocks add an
 * expandable plain-language panel (C8). Uses role="alert" (or role="status" for
 * non-urgent info) and color+icon+text — never color alone.
 */
export default function ErrorRecovery({ spec, actions }: ErrorRecoveryProps) {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <MessageBar
        intent={spec.intent}
        role={spec.status ? "status" : "alert"}
        aria-live={spec.status ? "polite" : "assertive"}
      >
        <MessageBarBody>{spec.message}</MessageBarBody>
        {actions.length > 0 ? (
          <MessageBarActions>
            {actions.map((a) =>
              a.asLink ? (
                <Link key={a.label} as="button" type="button" onClick={a.onClick}>
                  {a.label}
                </Link>
              ) : (
                <Button
                  key={a.label}
                  size="small"
                  appearance="primary"
                  onClick={a.onClick}
                >
                  {a.label}
                </Button>
              ),
            )}
          </MessageBarActions>
        ) : null}
      </MessageBar>

      {spec.policyPanel ? (
        <Accordion collapsible>
          <AccordionItem value="policy">
            <AccordionHeader>{spec.policyPanel.summary}</AccordionHeader>
            <AccordionPanel>
              <Text className={styles.panelText}>{spec.policyPanel.detail}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : null}
    </div>
  );
}
