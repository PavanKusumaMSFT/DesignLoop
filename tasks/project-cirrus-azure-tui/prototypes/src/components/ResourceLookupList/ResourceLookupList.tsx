import { useMemo } from 'react';
import styles from './ResourceLookupList.module.css';
import { SuggestionItem } from '../SuggestionItem/SuggestionItem';
import type {
  ComponentVariant,
  ResourceItem,
  ResourceStatus,
} from '../../types';

export interface ResourceLookupListProps {
  /** stable id for aria-controls / aria-activedescendant on the command input. */
  id: string;
  resourceType: string;
  subscriptionLabel: string;
  status: ResourceStatus;
  items: ResourceItem[];
  activeIndex: number;
  filterText?: string;
  variant?: ComponentVariant;
  onSelect: (item: ResourceItem) => void;
  onDismiss: () => void;
  onActiveIndexChange: (i: number) => void;
}

function computeMatchRanges(label: string, filter?: string): [number, number][] {
  if (!filter) return [];
  const i = label.toLowerCase().indexOf(filter.toLowerCase());
  return i >= 0 ? [[i, i + filter.length]] : [];
}

/**
 * Async, cached-first resource lookup (State C). Cached rows are usable while
 * live results stream in — never blocks or steals selection (C9/C10, NFR-1).
 * Esc collapses to free text (AC-3.3). ARIA listbox; aria-busy while loading.
 */
export function ResourceLookupList({
  id,
  resourceType,
  subscriptionLabel,
  status,
  items,
  activeIndex,
  filterText,
  variant = 'rich',
  onSelect,
  onDismiss: _onDismiss,
  onActiveIndexChange,
}: ResourceLookupListProps) {
  const filtered = useMemo(() => {
    const f = (filterText ?? '').toLowerCase();
    return f
      ? items.filter((it) => it.name.toLowerCase().includes(f))
      : items;
  }, [items, filterText]);

  // Plain variant (State F-1): single advisory text line, no selection model.
  if (variant === 'plain') {
    const names = filtered.map((r) => r.name).join(', ');
    return (
      <p className={styles.plainLine}>
        <span className={styles.plainPrefix}>cirrus:</span> {resourceType} in{' '}
        {subscriptionLabel}: {names || '(none cached)'}{' '}
        <span className={styles.plainNote}>(type value; Tab unavailable)</span>
      </p>
    );
  }

  const isLoading = status === 'loading';
  const activeId =
    filtered[activeIndex] &&
    `${id}-opt-${filtered[activeIndex].name.replace(/\W+/g, '-')}`;

  const headerBadge = (() => {
    switch (status) {
      case 'loading':
        return <span className={styles.badgeLoading}>looking up…</span>;
      case 'resolved':
        return <span className={styles.badgeLive}>{'\u25CF'} live</span>;
      case 'timeout':
        return <span className={styles.badgeMuted}>cached only</span>;
      default:
        return null;
    }
  })();

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>
          {resourceType} · sub: {subscriptionLabel}
        </span>
        {headerBadge}
      </div>

      {isLoading && (
        <div className={styles.loadingRow} aria-hidden="true">
          <span className={styles.shimmer} />
          <span className={styles.loadingText}>
            loading live resources (≤ 500 ms)
          </span>
        </div>
      )}

      {(status === 'loading' ||
        status === 'resolved' ||
        status === 'timeout') && (
        <ul
          role="listbox"
          id={id}
          aria-label={`${resourceType} in ${subscriptionLabel}`}
          aria-busy={isLoading}
          aria-activedescendant={activeId || undefined}
          className={styles.rows}
        >
          {filtered.map((item, i) => (
            <SuggestionItem
              key={item.name}
              id={`${id}-opt-${item.name.replace(/\W+/g, '-')}`}
              kind="resource"
              label={item.name}
              matchRanges={computeMatchRanges(item.name, filterText)}
              secondary={item.meta}
              freshness={item.freshness}
              selected={i === activeIndex}
              onSelect={() => {
                onActiveIndexChange(i);
                onSelect(item);
              }}
            />
          ))}
        </ul>
      )}

      {status === 'unauthenticated' && (
        <p className={styles.fallbackLine}>
          sign-in context unavailable — type any value (free text)
        </p>
      )}

      {status === 'empty' && (
        <p className={styles.fallbackLine}>
          no {resourceType} found — type a new name
        </p>
      )}

      {status === 'timeout' && (
        <p className={styles.fallbackLine}>
          showing cached · live lookup timed out — type any value
        </p>
      )}

      {status === 'loading' && (
        <p className={styles.refreshNote}>… refreshing from subscription</p>
      )}

      <div className={styles.footer}>
        <span>↑↓ move · Tab accept · Esc free text</span>
        {filterText && (
          <span className={styles.count}>
            {filtered.length} of {items.length} match "{filterText}"
          </span>
        )}
      </div>

      {/* Polite status announcer — status is never color-only. */}
      <span className={styles.srOnly} aria-live="polite">
        {status === 'resolved' &&
          `${filtered.length} resources loaded`}
        {status === 'timeout' && 'live lookup timed out, showing cached'}
        {status === 'unauthenticated' && 'sign-in unavailable, free text entry'}
        {status === 'empty' && `no ${resourceType} found`}
      </span>
    </div>
  );
}
