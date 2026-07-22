import { useMemo } from 'react';
import styles from './ParameterPalette.module.css';
import { SuggestionItem } from '../SuggestionItem/SuggestionItem';
import type {
  ComponentVariant,
  Freshness,
  ParamGroup,
  ParamItem,
} from '../../types';

export interface ParameterPaletteProps {
  /** stable id so the command input can point aria-controls/-activedescendant. */
  id: string;
  commandContext: string;
  freshness: Freshness;
  groups: ParamGroup[];
  activeIndex: number;
  filterText?: string;
  variant?: ComponentVariant;
  onSelect: (item: ParamItem) => void;
  onDismiss: () => void;
  onActiveIndexChange: (i: number) => void;
}

interface FlatRow {
  item: ParamItem;
  optionId: string;
  groupLabel: string;
  isGroupStart: boolean;
}

/** Flatten groups (required first) into a single indexable option list. */
function flatten(groups: ParamGroup[], paletteId: string, filter?: string) {
  const rows: FlatRow[] = [];
  const f = (filter ?? '').toLowerCase();
  let total = 0;
  groups.forEach((g) => {
    let first = true;
    g.items.forEach((item) => {
      total += 1;
      if (f && !item.label.toLowerCase().includes(f)) return;
      rows.push({
        item,
        optionId: `${paletteId}-opt-${rows.length}`,
        groupLabel: g.label,
        isGroupStart: first,
      });
      first = false;
    });
  });
  return { rows, total };
}

function computeMatchRanges(label: string, filter?: string): [number, number][] {
  if (!filter) return [];
  const i = label.toLowerCase().indexOf(filter.toLowerCase());
  return i >= 0 ? [[i, i + filter.length]] : [];
}

const FRESHNESS_GLYPH: Record<Freshness, string> = { live: '\u25CF', cached: '\u26A1' };

/**
 * Non-modal parameter/flag + enum popover (State B). ARIA listbox with roving
 * `aria-activedescendant` — the command input keeps DOM focus, so this is a
 * popup, NOT a focus trap (NG2). Never consumes Enter / Ctrl+C.
 */
export function ParameterPalette({
  id,
  commandContext,
  freshness,
  groups,
  activeIndex,
  filterText,
  variant = 'rich',
  onSelect,
  onDismiss: _onDismiss,
  onActiveIndexChange,
}: ParameterPaletteProps) {
  const { rows, total } = useMemo(
    () => flatten(groups, id, filterText),
    [groups, id, filterText],
  );

  // Plain variant (State F-1): one comma-joined advisory line, no selection.
  if (variant === 'plain') {
    const values = rows.map((r) => r.item.label).join(', ');
    return (
      <p className={styles.plainLine}>
        <span className={styles.plainPrefix}>cirrus:</span> valid values for{' '}
        {commandContext}: {values}{' '}
        <span className={styles.plainNote}>(Tab completion unavailable)</span>
      </p>
    );
  }

  const activeId = rows[activeIndex]?.optionId;
  const matched = filterText ? rows.length : total;

  return (
    <div
      className={styles.palette}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      role="presentation"
    >
      <div className={styles.header}>
        <span className={styles.headerLabel}>
          parameters · {commandContext}
        </span>
        <span
          className={freshness === 'live' ? styles.badgeLive : styles.badgeCached}
        >
          {FRESHNESS_GLYPH[freshness]} {freshness}
        </span>
      </div>

      <ul
        role="listbox"
        id={id}
        aria-label={`Parameters for ${commandContext}`}
        aria-activedescendant={activeId}
        className={styles.list}
      >
        {rows.map((row, i) => (
          <SuggestionItem
            key={row.optionId}
            id={row.optionId}
            kind={row.item.kind}
            label={row.item.label}
            matchRanges={computeMatchRanges(row.item.label, filterText)}
            secondary={row.item.description}
            typeHint={
              row.item.valueType ? `<${row.item.valueType}>` : undefined
            }
            requirement={row.item.requirement}
            status={row.item.status}
            selected={i === activeIndex}
            onSelect={() => {
              onActiveIndexChange(i);
              onSelect(row.item);
            }}
          />
        ))}
        {rows.length === 0 && (
          <li className={styles.emptyNote} role="note">
            no bounded values — type freely &lt;free text&gt;
          </li>
        )}
      </ul>

      <div className={styles.footer}>
        <span className={styles.footerLegend}>
          ↑↓ move · Tab accept · Esc dismiss · Ctrl+Space peek
        </span>
        {filterText && (
          <span className={styles.footerCount}>
            {matched} of {total} match
          </span>
        )}
      </div>
    </div>
  );
}
