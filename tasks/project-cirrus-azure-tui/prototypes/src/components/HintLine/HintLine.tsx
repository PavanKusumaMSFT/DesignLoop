import styles from './HintLine.module.css';
import type { ComponentVariant } from '../../types';

export interface HintLineProps {
  /** expert-neutral copy, e.g. "3 required flags remain". Empty => not rendered. */
  message: string;
  /** referenced (documented, not hijacked) shortcut. */
  shortcut?: { keys: string; action: string };
  dismissible?: boolean;
  variant?: ComponentVariant;
  onDismiss: () => void;
  /** persistent "don't show hints" setting (AC-4.3). */
  onDisableAll?: () => void;
}

/**
 * One quiet, expert-framed, dismissible hint line (State D). Neutral copy only —
 * never beginner-stigma phrasing (NG5). role="note" in a polite live region so a
 * new hint is announced without stealing focus. Esc also dismisses (via host).
 */
export function HintLine({
  message,
  shortcut,
  dismissible = true,
  variant = 'rich',
  onDismiss,
  onDisableAll,
}: HintLineProps) {
  // Never renders when there is nothing useful to say (no nagging empty hint).
  if (!message) return null;

  // Plain variant (State F-1): plain text, no accent glyph or kbd chips.
  if (variant === 'plain') {
    return (
      <p className={styles.plainLine} role="note" aria-label="Cirrus hint">
        cirrus: {message}
        {shortcut ? ` (${shortcut.keys} to ${shortcut.action})` : ''}
      </p>
    );
  }

  return (
    <div
      className={styles.hint}
      role="note"
      aria-label="Cirrus hint"
      aria-live="polite"
    >
      <span className={styles.accent} aria-hidden="true">
        {'\u2301'}
      </span>

      <span className={styles.copy}>
        {message}
        {shortcut && (
          <>
            {' · '}
            <kbd className={styles.kbd}>{shortcut.keys}</kbd> to {shortcut.action}
          </>
        )}
      </span>

      <span className={styles.actions}>
        {onDisableAll && (
          <button
            type="button"
            className={styles.disableAll}
            onClick={onDisableAll}
          >
            Don't show hints
          </button>
        )}
        {dismissible && (
          <button
            type="button"
            className={styles.dismiss}
            aria-label="Hide hint"
            onClick={onDismiss}
          >
            {'\u2715'} hide
          </button>
        )}
      </span>
    </div>
  );
}
