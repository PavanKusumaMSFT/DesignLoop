import React from 'react';
import './v8-create-summary.css';

/* ===========================================
   CreateSummaryField
   A single key-value row within a section
   =========================================== */

export interface CreateSummaryFieldProps {
  /** Field label (key) */
  label: string;
  /** Field value */
  value: React.ReactNode;
}

/* ===========================================
   CreateSummarySection
   A group of fields under a header
   =========================================== */

export interface CreateSummarySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section header text */
  header: string;
  /** Field definitions */
  fields: CreateSummaryFieldProps[];
}

export function CreateSummarySection({
  header,
  fields,
  className = '',
  ...props
}: CreateSummarySectionProps) {
  const classNames = [
    'ap-create-summary-section',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      <h3 className="ap-create-summary-section__header">{header}</h3>
      <dl className="ap-create-summary-section__fields">
        {fields.map((field, i) => (
          <div className="ap-create-summary-section__row" key={i}>
            <dt className="ap-create-summary-section__label">{field.label}</dt>
            <dd className="ap-create-summary-section__value">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ===========================================
   CreateSummary
   Top-level container for review/summary view
   =========================================== */

export interface CreateSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Summary sections */
  children: React.ReactNode;
}

export function CreateSummary({
  children,
  className = '',
  ...props
}: CreateSummaryProps) {
  const classNames = [
    'ap-create-summary',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
