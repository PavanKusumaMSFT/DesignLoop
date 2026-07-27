"use client";

import { useCallback, useEffect, useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Input,
  Text,
  Spinner,
  Field,
  Dropdown,
  Option,
  Badge,
  MessageBar,
  MessageBarBody,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Divider,
} from "@fluentui/react-components";
import {
  Copy16Regular,
  Checkmark16Regular,
  LockClosed16Regular,
  LockOpen16Regular,
  Eye20Regular,
  EyeOff20Regular,
} from "@fluentui/react-icons";
import {
  createShare,
  listShares,
  lockShare,
  buildShareUrl,
  type ShareRecord,
} from "@/lib/shares";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const DURATION_OPTIONS: { label: string; minutes: number }[] = [
  { label: "1 hour", minutes: 60 },
  { label: "8 hours", minutes: 60 * 8 },
  { label: "24 hours", minutes: 60 * 24 },
  { label: "3 days", minutes: 60 * 24 * 3 },
  { label: "7 days", minutes: 60 * 24 * 7 },
  { label: "30 days", minutes: 60 * 24 * 30 },
];

const useStyles = makeStyles({
  surface: { maxWidth: "540px" },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  passwordInput: {
    "& input::-ms-reveal": { display: "none" },
    "& input::-ms-clear": { display: "none" },
  },
  linkRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  linkInput: { flex: "1 1 auto" },
  listTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  shareItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
  },
  shareMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
  },
  shareLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  shareSub: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  shareActions: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    flexShrink: 0,
  },
  emptyText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
  },
});

function statusColor(
  status: ShareRecord["status"],
): "success" | "warning" | "danger" {
  if (status === "active") return "success";
  if (status === "locked") return "danger";
  return "warning";
}

function formatExpiry(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  prototypeId: string;
  route: string;
  title: string;
}

/**
 * Owner-facing dialog to create and manage password-protected, time-boxed
 * external share links for a prototype.
 */
export default function ShareDialog({
  open,
  onClose,
  prototypeId,
  route,
  title,
}: ShareDialogProps) {
  const styles = useStyles();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState(DURATION_OPTIONS[2].minutes);
  const [durationText, setDurationText] = useState(DURATION_OPTIONS[2].label);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [createdUrl, setCreatedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const [shares, setShares] = useState<ShareRecord[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [busyToken, setBusyToken] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoadingList(true);
    try {
      const rows = await listShares(prototypeId);
      setShares(rows);
    } catch (e: any) {
      setError(e?.message || "Could not load existing links.");
    } finally {
      setLoadingList(false);
    }
  }, [prototypeId]);

  useEffect(() => {
    if (open) {
      setError("");
      setCreatedUrl("");
      setPassword("");
      setLabel("");
      refresh();
    }
  }, [open, refresh]);

  const handleCreate = useCallback(async () => {
    if (password.trim().length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setCreating(true);
    setError("");
    setCreatedUrl("");
    try {
      const res = await createShare({
        prototypeId,
        route,
        password: password.trim(),
        expiresInMinutes: minutes,
        label: label.trim(),
      });
      setCreatedUrl(buildShareUrl(res.route || route, res.token));
      setPassword("");
      setLabel("");
      await refresh();
    } catch (e: any) {
      setError(e?.message || "Could not create the share link.");
    } finally {
      setCreating(false);
    }
  }, [password, minutes, label, prototypeId, route, refresh]);

  const handleCopy = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable */
    }
  }, []);

  const handleToggleLock = useCallback(
    async (share: ShareRecord) => {
      setBusyToken(share.token);
      setError("");
      try {
        await lockShare(prototypeId, share.token, !share.locked);
        await refresh();
      } catch (e: any) {
        setError(e?.message || "Could not update the link.");
      } finally {
        setBusyToken(null);
      }
    },
    [prototypeId, refresh],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
    >
      <DialogSurface
        className={styles.surface}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogBody>
          <DialogTitle>Share externally — {title}</DialogTitle>
          <DialogContent>
            <div className={styles.body}>
              <Text className={styles.shareSub}>
                Create a password-protected link that works without Microsoft
                sign-in for a limited time. Lock it any time to revoke access.
              </Text>

              {error && (
                <MessageBar intent="error">
                  <MessageBarBody>{error}</MessageBarBody>
                </MessageBar>
              )}

              <div className={styles.form}>
                <Field label="Password" required>
                  <Input
                    className={styles.passwordInput}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(_, d) => setPassword(d.value)}
                    placeholder="Set a password for viewers"
                    contentAfter={
                      <Button
                        appearance="transparent"
                        size="small"
                        icon={
                          showPassword ? <EyeOff20Regular /> : <Eye20Regular />
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      />
                    }
                  />
                </Field>

                <Field label="Access window">
                  <Dropdown
                    value={durationText}
                    selectedOptions={[String(minutes)]}
                    onOptionSelect={(_, data) => {
                      const m = Number(data.optionValue);
                      setMinutes(m);
                      setDurationText(data.optionText || "");
                    }}
                  >
                    {DURATION_OPTIONS.map((o) => (
                      <Option key={o.minutes} value={String(o.minutes)}>
                        {o.label}
                      </Option>
                    ))}
                  </Dropdown>
                </Field>

                <Field label="Label (optional)">
                  <Input
                    value={label}
                    onChange={(_, d) => setLabel(d.value)}
                    placeholder="e.g. Research round 2"
                  />
                </Field>

                <Button
                  appearance="primary"
                  onClick={handleCreate}
                  disabled={creating || password.trim().length < 4}
                  icon={creating ? <Spinner size="tiny" /> : undefined}
                >
                  {creating ? "Creating…" : "Create share link"}
                </Button>
              </div>

              {createdUrl && (
                <Field label="Shareable link">
                  <div className={styles.linkRow}>
                    <Input
                      className={styles.linkInput}
                      readOnly
                      value={createdUrl}
                      onFocus={(e) => e.currentTarget.select()}
                    />
                    <Button
                      appearance="secondary"
                      icon={
                        copied ? <Checkmark16Regular /> : <Copy16Regular />
                      }
                      onClick={() => handleCopy(createdUrl)}
                    >
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </Field>
              )}

              <Divider />

              <Text className={styles.listTitle}>Existing links</Text>
              {loadingList ? (
                <Spinner size="tiny" label="Loading…" />
              ) : shares.length === 0 ? (
                <Text className={styles.emptyText}>
                  No external links yet.
                </Text>
              ) : (
                shares.map((s) => (
                  <div key={s.token} className={styles.shareItem}>
                    <div className={styles.shareMeta}>
                      <Text className={styles.shareLabel}>
                        {s.label || "Untitled link"}
                      </Text>
                      <Text className={styles.shareSub}>
                        {s.status === "expired"
                          ? `Expired ${formatExpiry(s.expiresAt)}`
                          : `Expires ${formatExpiry(s.expiresAt)}`}
                      </Text>
                    </div>
                    <div className={styles.shareActions}>
                      <Badge
                        appearance="tint"
                        size="small"
                        color={statusColor(s.status)}
                      >
                        {s.status}
                      </Badge>
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<Copy16Regular />}
                        aria-label="Copy link"
                        onClick={() =>
                          handleCopy(buildShareUrl(s.route || route, s.token))
                        }
                      />
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={
                          busyToken === s.token ? (
                            <Spinner size="tiny" />
                          ) : s.locked ? (
                            <LockOpen16Regular />
                          ) : (
                            <LockClosed16Regular />
                          )
                        }
                        aria-label={s.locked ? "Unlock link" : "Lock link"}
                        disabled={busyToken === s.token || s.status === "expired"}
                        onClick={() => handleToggleLock(s)}
                      >
                        {s.locked ? "Unlock" : "Lock"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
