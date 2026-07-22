import React, { useState } from 'react';
import './v8-essentials.css';

import ChevronDownIcon from './v8-icons/commands/chevron-down.svg?react';
import ChevronUpIcon from './v8-icons/commands/chevron-up.svg?react';

/* ===========================================
   EssentialsField
   A single key-value entry
   =========================================== */

export interface EssentialsFieldProps {
  /** Field label (key) */
  label: React.ReactNode;
  /** Field value — text, link, or any ReactNode */
  value: React.ReactNode;
}

/* ===========================================
   Essentials
   Collapsible two-column key-value panel
   =========================================== */

export interface EssentialsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left column fields */
  fields: EssentialsFieldProps[];
  /** Right column fields */
  fieldsRight?: EssentialsFieldProps[];
  /** Actions rendered at the right end of the header */
  actions?: React.ReactNode;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Whether the panel starts expanded (uncontrolled) */
  defaultExpanded?: boolean;
}

export function Essentials({
  fields,
  fieldsRight,
  actions,
  expanded: controlledExpanded,
  onExpandedChange,
  defaultExpanded = true,
  className = '',
  ...props
}: EssentialsProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    const next = !expanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }
    onExpandedChange?.(next);
  };

  const classNames = [
    'ap-essentials',
    expanded && 'ap-essentials--expanded',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      <div className="ap-essentials__header">
        <button
          type="button"
          className="ap-essentials__toggle"
          onClick={handleToggle}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <span className="ap-essentials__title">Essentials</span>
        </button>
        {actions && <div className="ap-essentials__actions">{actions}</div>}
      </div>

      {expanded && (
        <div className="ap-essentials__body">
          <dl className="ap-essentials__column">
            {fields.map((field, i) => (
              <div className="ap-essentials__row" key={i}>
                <dt className="ap-essentials__key">{field.label}</dt>
                <dd className="ap-essentials__value">
                  <span className="ap-essentials__colon" aria-hidden="true">:</span>
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
          {fieldsRight && fieldsRight.length > 0 && (
            <dl className="ap-essentials__column">
              {fieldsRight.map((field, i) => (
                <div className="ap-essentials__row" key={i}>
                  <dt className="ap-essentials__key">{field.label}</dt>
                  <dd className="ap-essentials__value">
                    <span className="ap-essentials__colon" aria-hidden="true">:</span>
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}
