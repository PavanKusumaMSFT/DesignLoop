import type { CSSProperties } from 'react';
import styles from './SuggestionItem.module.css';
import type {
  ComponentVariant,
  EnumStatus,
  Freshness,
  ParamRequirement,
  SuggestionKind,
} from '../../types';

export interface SuggestionItemProps {
  /** DOM id so the parent listbox can point aria-activedescendant at it. */
  id: string;
  kind: SuggestionKind;
  label: string;
  /** char ranges to highlight (fuzzy match); decorative (aria-hidden). */
  matchRanges?: [number, number][];
  secondary?: string;
  typeHint?: string;
  requirement?: ParamRequirement;
  status?: EnumStatus;
  freshness?: Freshness;
  selected: boolean;
  variant?: ComponentVariant;
  onSelect: () => void;
}

/** Fold every non-color signal into the accessible name (never color-alone). */
function buildAriaLabel(props: SuggestionItemProps): string {
  const parts: string[] = [props.label];
  if (props.requirement) parts.push(props.requirement);
  if (props.status) parts.push(props.status);
  if (props.freshness) parts.push(props.freshness);
  if (props.secondary) parts.push(props.secondary);
  if (props.typeHint) parts.push(props.typeHint.replace(/[<>]/g, ''));
  return parts.join(', ');
}

/** Split the label so matched char ranges can be visually emphasised. */
function renderLabel(label: string, ranges?: [number, number][]) {
  if (!ranges || ranges.length === 0) return label;
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const out: JSX.Element[] = [];
  let cursor = 0;
  sorted.forEach(([start, end], i) => {
    if (start > cursor) {
      out.push(<span key={`t${i}`}>{label.slice(cursor, start)}</span>);
    }
    out.push(
      <span key={`m${i}`} className={styles.match} aria-hidden="true">
        {label.slice(start, end)}
      </span>,
    );
    cursor = end;
  });
  if (cursor < label.length) {
    out.push(<span key="tail">{label.slice(cursor)}</span>);
  }
  return out;
}

const FRESHNESS_GLYPH: Record<Freshness, string> = {
  live: '\u25CF', // ●
  cached: '\u26A1', // ⚡
};

export function SuggestionItem(props: SuggestionItemProps) {
  const {
    id,
    kind,
    label,
    matchRanges,
    secondary,
    typeHint,
    requirement,
    status,
    freshness,
    selected,
    variant = 'rich',
    onSelect,
  } = props;

  // Plain variant (State F-1): a bare text token used inside comma-joined output.
  if (variant === 'plain') {
    const suffix = status === 'deprecated' ? ' (deprecated)' : '';
    return <span className={styles.plain}>{label + suffix}</span>;
  }

  const className = [styles.row, selected ? styles.selected : '']
    .filter(Boolean)
    .join(' ');

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- roving
    // selection is owned by the parent listbox via aria-activedescendant; this
    // row is intentionally not individually focusable (keyboard handled above).
    <li
      id={id}
      role="option"
      aria-selected={selected}
      aria-label={buildAriaLabel(props)}
      className={className}
      style={{ '--kind': kind } as CSSProperties}
      onMouseDown={(e) => {
        // Prevent the command input from losing DOM focus on click.
        e.preventDefault();
        onSelect();
      }}
    >
      <span className={styles.primary} aria-hidden="true">
        {renderLabel(label, matchRanges)}
        {requirement === 'required' && (
          <span className={styles.requiredGlyph}>{'\u00A0*'}</span>
        )}
      </span>

      {typeHint && (
        <span className={styles.typeHint} aria-hidden="true">
          {typeHint}
        </span>
      )}

      {secondary && (
        <span className={styles.secondary} aria-hidden="true">
          {secondary}
        </span>
      )}

      {status && (
        <span
          className={status === 'deprecated' ? styles.deprecated : styles.valid}
          aria-hidden="true"
        >
          {status}
        </span>
      )}

      {requirement && (
        <span
          className={
            requirement === 'required' ? styles.required : styles.optional
          }
          aria-hidden="true"
        >
          {requirement}
        </span>
      )}

      {freshness && (
        <span
          className={freshness === 'live' ? styles.live : styles.cached}
          aria-hidden="true"
        >
          {FRESHNESS_GLYPH[freshness]} {freshness}
        </span>
      )}
    </li>
  );
}
