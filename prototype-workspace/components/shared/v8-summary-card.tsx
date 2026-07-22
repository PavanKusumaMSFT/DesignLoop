import React from 'react';
import { Card } from './v8-card';
import './v8-summary-card.css';

export type SummaryCardIconColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'upsell';

export interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title text */
  title: string;
  /** Optional icon element rendered before the title */
  icon?: React.ReactNode;
  /** Background color variant for the icon badge */
  iconColor?: SummaryCardIconColor;
  /** Optional timestamp or other free-form text shown at the trailing end of the header */
  timestamp?: string;
  /** Footer content — typically Button components, links, or text */
  footerActions?: React.ReactNode;
  /** Card body content */
  children?: React.ReactNode;
}

export function SummaryCard({
  title,
  icon,
  iconColor = 'success',
  timestamp,
  footerActions,
  children,
  className = '',
  ...props
}: SummaryCardProps) {
  const classNames = [
    'ap-summary-card',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Card variant="outlined" padding="none" className={classNames} {...props}>
      <div className="ap-summary-card__header">
        <div className="ap-summary-card__header-start">
          {icon && (
            <span className={`ap-summary-card__icon ap-summary-card__icon--${iconColor}`}>
              {icon}
            </span>
          )}
          <span className="ap-summary-card__title">{title}</span>
        </div>
        {timestamp && (
          <span className="ap-summary-card__timestamp">{timestamp}</span>
        )}
      </div>

      <div className="ap-summary-card__body">
        {children}
      </div>

      {footerActions && (
        <div className="ap-summary-card__footer">
          {footerActions}
        </div>
      )}
    </Card>
  );
}
