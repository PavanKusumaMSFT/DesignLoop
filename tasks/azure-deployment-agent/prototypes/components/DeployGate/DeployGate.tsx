import React, { useState, useMemo, useCallback, KeyboardEvent } from 'react';
import styles from './DeployGate.module.css';

export interface ResourceChange {
  name: string;
  type: string;
  status: 'added' | 'modified' | 'removed';
}

export interface ValidationResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message?: string;
}

export interface CostDriver {
  serviceName: string;
  previousCost: number;
  currentCost: number;
  delta: number;
}

export interface CostSummary {
  total: number;
  delta: number;
  drivers: CostDriver[];
}

export interface DeployGateProps {
  resources: ResourceChange[];
  validationResults: ValidationResult[];
  costSummary: CostSummary;
  environment?: 'production' | 'staging' | 'development' | 'test';
  onDeploy: () => void;
  onCancel: () => void;
  onSaveAsPR?: () => void;
  className?: string;
}

const STATUS_ICONS: Record<string, string> = {
  added: '+',
  modified: '✎',
  removed: '✕',
  pass: '✅',
  fail: '❌',
  warning: '⚠️',
};

interface SectionProps {
  title: string;
  index: number;
  defaultExpanded: boolean;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, index, defaultExpanded, children }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentId = `deploy-gate-section-${index}`;

  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded(!expanded)}
      >
        <span className={styles.chevron} aria-hidden="true">{expanded ? '▼' : '▶'}</span>
        <span>{`${index}. ${title}`}</span>
      </button>
      {expanded && (
        <div id={contentId} className={styles.sectionContent} role="region" aria-label={title}>
          {children}
        </div>
      )}
    </div>
  );
};

export const DeployGate: React.FC<DeployGateProps> = ({
  resources,
  validationResults,
  costSummary,
  environment = 'production',
  onDeploy,
  onCancel,
  onSaveAsPR,
  className,
}) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const isProduction = environment === 'production';
  const isFastTrack = !isProduction;

  const hasFailures = useMemo(
    () => validationResults.some((v) => v.status === 'fail'),
    [validationResults]
  );

  const hasWarnings = useMemo(
    () => validationResults.some((v) => v.status === 'warning'),
    [validationResults]
  );

  const hasDestructiveChanges = useMemo(
    () => resources.some((r) => r.status === 'removed'),
    [resources]
  );

  const deployDisabled = hasFailures || (hasDestructiveChanges && !acknowledged);

  const addedCount = resources.filter((r) => r.status === 'added').length;
  const modifiedCount = resources.filter((r) => r.status === 'modified').length;
  const removedCount = resources.filter((r) => r.status === 'removed').length;

  const handlePanelKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    },
    [onCancel]
  );

  return (
    <div
      className={`${styles.panel} ${className ?? ''}`}
      role="region"
      aria-label="Pre-deployment validation"
      onKeyDown={handlePanelKeyDown}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Deploy Gate</h2>
        {isFastTrack && <span className={styles.fastTrackBadge}>Fast-track</span>}
      </div>

      {/* Section 1: Resource Changes */}
      <Section title="Resource Changes Summary" index={1} defaultExpanded={true}>
        <div className={styles.changeSummary}>
          {addedCount > 0 && <span className={styles.addedBadge}>+ {addedCount} added</span>}
          {modifiedCount > 0 && <span className={styles.modifiedBadge}>✎ {modifiedCount} modified</span>}
          {removedCount > 0 && <span className={styles.removedBadge}>✕ {removedCount} deleted</span>}
        </div>
        <table className={styles.table} role="table">
          <thead>
            <tr>
              <th scope="col">Resource</th>
              <th scope="col">Type</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.type}</td>
                <td>
                  <span className={styles[r.status]} aria-label={r.status}>
                    {STATUS_ICONS[r.status]} {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Section 2: Validation Checks */}
      <Section title="Validation Checks" index={2} defaultExpanded={!isFastTrack}>
        <div className={styles.validationList} aria-live="polite">
          {validationResults.map((v) => (
            <div key={v.name} className={`${styles.validationItem} ${styles[`validation_${v.status}`]}`}>
              <span className={styles.statusIcon} aria-label={v.status}>{STATUS_ICONS[v.status]}</span>
              <span className={styles.validationName}>{v.name}</span>
              {v.message && <p className={styles.validationMessage}>{v.message}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3: Cost Impact */}
      <Section title="Cost Impact" index={3} defaultExpanded={true}>
        <table className={styles.table} role="table">
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Previous</th>
              <th scope="col">Current</th>
              <th scope="col">Delta</th>
            </tr>
          </thead>
          <tbody>
            {costSummary.drivers.map((d) => (
              <tr key={d.serviceName}>
                <td>{d.serviceName}</td>
                <td>{d.previousCost > 0 ? `$${d.previousCost}/mo` : '—'}</td>
                <td>{d.currentCost > 0 ? `$${d.currentCost}/mo` : '—'}</td>
                <td className={d.delta > 0 ? styles.costIncrease : d.delta < 0 ? styles.costDecrease : ''}>
                  {d.delta > 0 ? `+$${d.delta}` : d.delta < 0 ? `-$${Math.abs(d.delta)}` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.totalRow}>
              <td>Total</td>
              <td>${costSummary.total - costSummary.delta}/mo</td>
              <td>${costSummary.total}/mo</td>
              <td className={costSummary.delta > 0 ? styles.costIncrease : costSummary.delta < 0 ? styles.costDecrease : ''}>
                {costSummary.delta > 0 ? `+$${costSummary.delta}` : costSummary.delta < 0 ? `-$${Math.abs(costSummary.delta)}` : '—'}
              </td>
            </tr>
          </tfoot>
        </table>
      </Section>

      {/* Section 4: Bicep Preview */}
      <Section title="Bicep Preview" index={4} defaultExpanded={false}>
        <div className={styles.codePreview}>
          <code>// Generated Bicep files will appear here</code>
        </div>
      </Section>

      {/* Section 5: Deployment Target */}
      <Section title="Deployment Target" index={5} defaultExpanded={true}>
        <dl className={styles.targetInfo}>
          <dt>Environment</dt>
          <dd>{environment}</dd>
        </dl>
      </Section>

      {/* Destructive change acknowledgment */}
      {hasDestructiveChanges && (
        <div className={styles.acknowledgment}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            {isFastTrack
              ? 'I understand this deployment includes destructive changes'
              : 'I acknowledge all destructive changes listed above'}
          </label>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        {onSaveAsPR && (
          <button className={styles.secondaryButton} onClick={onSaveAsPR}>Save as PR</button>
        )}
        {hasFailures && (
          <button className={styles.secondaryButton} onClick={onCancel}>Fix Issues</button>
        )}
        <button
          className={styles.deployButton}
          onClick={onDeploy}
          disabled={deployDisabled}
          aria-disabled={deployDisabled}
          aria-label={
            deployDisabled
              ? `Deploy button, disabled, ${hasFailures ? 'resolve critical issues to proceed' : 'acknowledge destructive changes to proceed'}`
              : 'Deploy'
          }
        >
          Deploy
        </button>
      </div>
    </div>
  );
};
