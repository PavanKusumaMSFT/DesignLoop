import { useEffect, useRef } from 'react';
import styles from './GhostTextCompletion.module.css';
import type { ComponentVariant } from '../../types';

export interface GhostTextCompletionProps {
  /** full predicted continuation; null => render nothing. */
  suggestion: string | null;
  /** the already-typed segment to visually de-emphasise. */
  matchedPrefix?: string;
  /** gated by debounce + az-context detection. */
  visible: boolean;
  /** clamp to remaining viewport; overflow => ellipsis. */
  maxWidthCh?: number;
  /** plain => not rendered inline (guidance moves to HintLine). */
  variant?: ComponentVariant;
  /** fired on Tab / arrow-at-EOL (wired by the overlay host, not here). */
  onAccept: (accepted: string) => void;
}

/**
 * Inline, low-emphasis prediction rendered after the caret (State A).
 * Decorative for the visual layer (aria-hidden); the accessible announcement is
 * carried by a polite live region so screen readers never read half-typed text
 * as real input.
 */
export function GhostTextCompletion({
  suggestion,
  matchedPrefix,
  visible,
  maxWidthCh,
  variant = 'rich',
  onAccept: _onAccept,
}: GhostTextCompletionProps) {
  const liveRef = useRef<HTMLSpanElement>(null);

  // Announce the suggestion politely when it changes (accessible companion).
  useEffect(() => {
    if (!liveRef.current) return;
    liveRef.current.textContent =
      visible && suggestion
        ? `suggestion: ${suggestion}, press Tab to accept`
        : '';
  }, [visible, suggestion]);

  // Plain variant never renders ghosts inline (degraded surfaces — F-1).
  const renderInline = variant === 'rich' && visible && !!suggestion;

  // The remaining continuation after the matched prefix.
  const emphasis =
    matchedPrefix && suggestion?.startsWith(matchedPrefix) ? matchedPrefix : '';
  const remainder = emphasis ? suggestion!.slice(emphasis.length) : suggestion;

  return (
    <>
      {renderInline && (
        <span
          className={styles.ghost}
          aria-hidden="true"
          style={
            maxWidthCh ? { maxWidth: `${maxWidthCh}ch` } : undefined
          }
        >
          {emphasis && <span className={styles.emphasis}>{emphasis}</span>}
          <span className={styles.continuation}>{remainder}</span>
        </span>
      )}
      {/* Accessible companion: announces the suggestion without being typed. */}
      <span ref={liveRef} className={styles.srOnly} aria-live="polite" />
    </>
  );
}
