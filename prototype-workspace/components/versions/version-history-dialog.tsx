"use client";

import { useCallback, useEffect, useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Text,
  Spinner,
  Badge,
  Avatar,
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
  History16Regular,
  Person16Regular,
  DocumentText16Regular,
  Circle12Filled,
} from "@fluentui/react-icons";
import {
  fetchPrototypeHistory,
  relativeTime,
  fullTime,
  sourceColor,
  type PrototypeHistory,
  type PrototypeVersion,
} from "@/lib/versions";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  surface: { maxWidth: "620px" },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  loading: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalL} 0`,
  },
  summaryRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  contributors: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
  },
  contribPill: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "420px",
    overflowY: "auto",
    paddingRight: tokens.spacingHorizontalXS,
  },
  entry: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  rail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    paddingTop: "2px",
  },
  railDot: {
    color: tokens.colorNeutralForeground4,
    fontSize: "12px",
  },
  railDotCurrent: {
    color: tokens.colorBrandForeground1,
    fontSize: "12px",
  },
  railLine: {
    flex: 1,
    width: "2px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginTop: "2px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flex: 1,
    minWidth: 0,
  },
  headRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  versionLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  summary: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  stats: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    fontFamily: tokens.fontFamilyMonospace,
  },
  add: { color: tokens.colorPaletteGreenForeground1 },
  del: { color: tokens.colorPaletteRedForeground1 },
  files: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginTop: tokens.spacingVerticalXXS,
  },
  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyMonospace,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileMore: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
  },
  empty: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    padding: `${tokens.spacingVerticalL} 0`,
  },
});

function VersionEntry({ v, last }: { v: PrototypeVersion; last: boolean }) {
  const styles = useStyles();
  const [showAll, setShowAll] = useState(false);
  const files = showAll ? v.files : v.files.slice(0, 3);
  const hasStats =
    typeof v.additions === "number" || typeof v.deletions === "number";

  return (
    <div className={styles.entry}>
      <div className={styles.rail}>
        <Circle12Filled
          className={v.current ? styles.railDotCurrent : styles.railDot}
        />
        {!last && <div className={styles.railLine} />}
      </div>
      <div className={styles.content}>
        <div className={styles.headRow}>
          <Text className={styles.versionLabel}>{v.label}</Text>
          <Badge appearance="tint" size="small" color={sourceColor(v.source)}>
            {v.sourceLabel}
          </Badge>
          {v.uncommitted && (
            <Badge appearance="filled" size="small" color="warning">
              Uncommitted
            </Badge>
          )}
          {v.shortHash && (
            <Text style={{ fontFamily: tokens.fontFamilyMonospace }}>
              {v.shortHash}
            </Text>
          )}
        </div>

        {v.summary && <Text className={styles.summary}>{v.summary}</Text>}

        <div className={styles.metaRow}>
          {v.author && (
            <span className={styles.metaItem}>
              <Avatar name={v.author} size={16} color="colorful" aria-hidden />
              {v.author}
            </span>
          )}
          {v.at && (
            <span className={styles.metaItem} title={fullTime(v.at)}>
              {relativeTime(v.at)}
            </span>
          )}
          {hasStats && (
            <span className={styles.stats}>
              {typeof v.additions === "number" && (
                <span className={styles.add}>+{v.additions}</span>
              )}
              {typeof v.deletions === "number" && (
                <span className={styles.del}>−{v.deletions}</span>
              )}
            </span>
          )}
          {!hasStats && v.files.length > 0 && (
            <span className={styles.metaItem}>
              {v.files.length} file{v.files.length === 1 ? "" : "s"} changed
            </span>
          )}
        </div>

        {files.length > 0 && (
          <div className={styles.files}>
            {files.map((f) => (
              <div key={f.path} className={styles.fileRow} title={f.path}>
                <DocumentText16Regular />
                {f.path.replace(/^prototype-workspace\//, "")}
              </div>
            ))}
            {v.files.length > 3 && (
              <button
                type="button"
                className={styles.fileMore}
                onClick={() => setShowAll((s) => !s)}
              >
                {showAll
                  ? "Show fewer"
                  : `+${v.files.length - 3} more file${
                      v.files.length - 3 === 1 ? "" : "s"
                    }`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VersionHistoryDialog({
  open,
  onClose,
  prototypeId,
  title,
}: {
  open: boolean;
  onClose: () => void;
  prototypeId: string;
  title: string;
}) {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<PrototypeHistory | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const h = await fetchPrototypeHistory(prototypeId);
      setHistory(h);
    } catch (e: any) {
      setError(
        e?.message ||
          "Couldn't load version history from the local bridge. Start it and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [prototypeId]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  return (
    <Dialog open={open} onOpenChange={(_, d) => !d.open && onClose()}>
      <DialogSurface className={styles.surface}>
        <DialogBody>
          <DialogTitle>Version history — {title}</DialogTitle>
          <DialogContent>
            <div className={styles.body}>
              {loading && (
                <div className={styles.loading}>
                  <Spinner size="tiny" />
                  <Text>Loading history…</Text>
                </div>
              )}

              {error && !loading && (
                <MessageBar intent="error">
                  <MessageBarBody>{error}</MessageBarBody>
                </MessageBar>
              )}

              {history && !loading && !error && (
                <>
                  <div className={styles.summaryRow}>
                    <Badge appearance="tint" color="informative">
                      {history.versionCount} version
                      {history.versionCount === 1 ? "" : "s"}
                    </Badge>
                    {history.contributors.length > 0 && (
                      <div className={styles.contributors}>
                        <Person16Regular />
                        {history.contributors.map((c) => (
                          <span key={c.name} className={styles.contribPill}>
                            <Avatar
                              name={c.name}
                              size={16}
                              color="colorful"
                              aria-hidden
                            />
                            {c.name}
                            {c.runs > 0 &&
                              ` · ${c.runs} run${c.runs === 1 ? "" : "s"}`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Divider />

                  {history.versions.length === 0 ? (
                    <Text className={styles.empty}>
                      No versions yet. Versions appear once this prototype is
                      committed or updated via a sub-task.
                    </Text>
                  ) : (
                    <div className={styles.timeline}>
                      {history.versions.map((v, i) => (
                        <VersionEntry
                          key={v.snapId || v.hash || `${v.kind}-${i}`}
                          v={v}
                          last={i === history.versions.length - 1}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            {history && !loading && (
              <Button
                appearance="secondary"
                onClick={load}
                icon={<History16Regular />}
              >
                Refresh
              </Button>
            )}
            <Button appearance="primary" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
