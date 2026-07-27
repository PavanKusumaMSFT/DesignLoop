"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Spinner,
  Text,
  Button,
} from "@fluentui/react-components";
import { ArrowLeft20Regular } from "@fluentui/react-icons";
import Link from "next/link";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/** Base URL of the local DesignLoop bridge that stores + serves uploads. */
const BRIDGE_URL =
  process.env.NEXT_PUBLIC_BRIDGE_URL ?? "http://localhost:8099";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  frame: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    display: "block",
  },
  center: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalXXL,
    textAlign: "center",
  },
  errTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  errBody: {
    color: tokens.colorNeutralForeground3,
    maxWidth: "440px",
  },
});

function UploadedViewer() {
  const styles = useStyles();
  const params = useSearchParams();
  const id = (params.get("id") || "").trim();
  const [state, setState] = useState<
    | { phase: "loading" }
    | { phase: "ready"; src: string; title: string }
    | { phase: "error"; detail: string }
  >({ phase: "loading" });

  useEffect(() => {
    if (!id) {
      setState({ phase: "error", detail: "No prototype was specified." });
      return;
    }
    let cancelled = false;
    (async () => {
      // 1) Committed manifest — served same-origin by the site. Present after
      //    a prototype has "gone Live", so this path works hosted (no bridge).
      try {
        const mres = await fetch("/uploaded/manifest.json", { cache: "no-store" });
        if (mres.ok) {
          const manifest = await mres.json();
          const m = manifest && typeof manifest === "object" ? manifest[id] : null;
          if (m) {
            if (cancelled) return;
            const entry = (m.entry || "index.html").replace(/^\/+/, "");
            setState({
              phase: "ready",
              src: `/uploaded/${encodeURIComponent(id)}/${entry}`,
              title: m.title || id,
            });
            return;
          }
        }
      } catch {
        /* no committed manifest — fall through to the local bridge */
      }
      // 2) Local bridge — for un-promoted uploads that only exist on this machine.
      try {
        const res = await fetch(
          `${BRIDGE_URL}/api/prototypes/uploaded-entry?id=${encodeURIComponent(id)}`,
          { cache: "no-store" },
        );
        if (!res.ok) {
          if (cancelled) return;
          setState({
            phase: "error",
            detail:
              res.status === 404
                ? "This uploaded prototype no longer exists. It may have been removed."
                : `The local bridge returned ${res.status}.`,
          });
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        const entry = (data.entry || "index.html").replace(/^\/+/, "");
        setState({
          phase: "ready",
          src: `${BRIDGE_URL}/uploaded/${encodeURIComponent(id)}/${entry}`,
          title: data.title || id,
        });
      } catch {
        if (cancelled) return;
        setState({
          phase: "error",
          detail: `Couldn't reach the local bridge at ${BRIDGE_URL}. Uploaded prototypes are local — start the bridge and try again.`,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state.phase === "loading") {
    return (
      <div className={styles.center}>
        <Spinner size="large" label="Loading prototype…" />
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <div className={styles.center}>
        <Text className={styles.errTitle}>Can&rsquo;t open this prototype</Text>
        <Text className={styles.errBody}>{state.detail}</Text>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button appearance="secondary" icon={<ArrowLeft20Regular />}>
            Back to workspace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <iframe
      className={styles.frame}
      src={state.src}
      title={state.title}
      // Uploaded content is untrusted third-party HTML; sandbox it while still
      // allowing scripts so interactive prototypes work. Same-origin is omitted
      // so it can't script the parent workspace.
      sandbox="allow-scripts allow-forms allow-popups allow-modals allow-pointer-lock"
    />
  );
}

/**
 * Viewer for non-GitHub uploaded prototypes (dropped .html / .zip). The files
 * are stored and served by the local bridge; this route renders the entry HTML
 * full-viewport in a sandboxed iframe. Route: /uploaded/?id=<prototypeId>.
 */
export default function UploadedPage() {
  const styles = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <Suspense
          fallback={
            <div className={styles.center}>
              <Spinner size="large" label="Loading…" />
            </div>
          }
        >
          <UploadedViewer />
        </Suspense>
      </div>
    </FluentProvider>
  );
}
