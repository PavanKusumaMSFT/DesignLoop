import React, { useState, useRef, useCallback, KeyboardEvent } from 'react';
import styles from './CostBadge.module.css';

type TimeHorizon = 'hourly' | 'monthly' | 'annual';
type Status = 'normal' | 'warning' | 'critical';

export interface Alternative {
  sku: string;
  vCPUs: number;
  ram: string;
  cost: number;
  perfScore: number;
  recommended?: boolean;
}

export interface CostBadgeProps {
  cost: number;
  currency?: string;
  timeHorizon?: TimeHorizon;
  resourceName: string;
  alternatives?: Alternative[];
  onAlternativeSelect?: (sku: string) => void;
  status?: Status;
  loading?: boolean;
  className?: string;
}

const TIME_LABELS: Record<TimeHorizon, string> = {
  hourly: '/hr',
  monthly: '/mo',
  annual: '/yr',
};

function formatCost(cost: number, currency: string): string {
  return `~${currency}${cost.toLocaleString()}`;
}

export const CostBadge: React.FC<CostBadgeProps> = ({
  cost,
  currency = '$',
  timeHorizon = 'monthly',
  resourceName,
  alternatives = [],
  onAlternativeSelect,
  status = 'normal',
  loading = false,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [focusedRow, setFocusedRow] = useState(-1);
  const panelId = useRef(`cost-panel-${resourceName.replace(/\s+/g, '-')}`).current;

  const toggleExpanded = useCallback(() => {
    if (!loading) setExpanded((prev) => !prev);
  }, [loading]);

  const handleBadgeKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleExpanded();
      } else if (e.key === 'Escape' && expanded) {
        e.preventDefault();
        setExpanded(false);
      }
    },
    [expanded, toggleExpanded]
  );

  const handleTableKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTableSectionElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedRow((prev) => Math.min(prev + 1, alternatives.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedRow((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && focusedRow >= 0) {
        e.preventDefault();
        onAlternativeSelect?.(alternatives[focusedRow].sku);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setExpanded(false);
      }
    },
    [alternatives, focusedRow, onAlternativeSelect]
  );

  const statusClass = status === 'warning' ? styles.warning : status === 'critical' ? styles.critical : '';
  const costText = `${formatCost(cost, currency)}${TIME_LABELS[timeHorizon]}`;

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <button
        className={`${styles.badge} ${statusClass} ${loading ? styles.loading : ''}`}
        aria-label={`${resourceName} estimated cost: ${costText}`}
        aria-expanded={alternatives.length > 0 ? expanded : undefined}
        aria-controls={alternatives.length > 0 ? panelId : undefined}
        onClick={toggleExpanded}
        onKeyDown={handleBadgeKeyDown}
      >
        {loading ? (
          <span className={styles.skeleton} aria-hidden="true" />
        ) : (
          <>
            <span className={styles.costText}>{costText}</span>
            {status !== 'normal' && (
              <span className={styles.warningIcon} aria-hidden="true">⚠</span>
            )}
          </>
        )}
      </button>

      {expanded && alternatives.length > 0 && (
        <div id={panelId} className={styles.panel} role="region" aria-label={`SKU alternatives for ${resourceName}`}>
          <table className={styles.table} role="table" aria-label={`SKU alternatives for ${resourceName}`}>
            <thead>
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">vCPUs</th>
                <th scope="col">RAM</th>
                <th scope="col">Cost</th>
                <th scope="col">Perf</th>
              </tr>
            </thead>
            <tbody onKeyDown={handleTableKeyDown}>
              {alternatives.map((alt, index) => (
                <tr
                  key={alt.sku}
                  className={`${styles.row} ${alt.cost === cost ? styles.currentRow : ''} ${focusedRow === index ? styles.focusedRow : ''}`}
                  tabIndex={0}
                  aria-current={alt.cost === cost ? true : undefined}
                  onClick={() => onAlternativeSelect?.(alt.sku)}
                  onFocus={() => setFocusedRow(index)}
                >
                  <td>
                    {alt.sku}
                    {alt.recommended && <span className={styles.recommended}>★</span>}
                  </td>
                  <td>{alt.vCPUs}</td>
                  <td>{alt.ram}</td>
                  <td>{currency}{alt.cost}</td>
                  <td>{alt.perfScore}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
