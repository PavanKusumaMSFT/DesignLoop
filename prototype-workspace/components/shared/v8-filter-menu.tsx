import React from 'react';
import './v8-filter-menu.css';

/* ===========================================
   Filter Menu
   Dialog panel for configuring filter values
   =========================================== */

export interface FilterMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Menu title (typically the filter name) */
  title: string;
  /** Menu content (form fields) */
  children: React.ReactNode;
  /** Actions (typically Apply/Cancel buttons) */
  actions?: React.ReactNode;
}

export function FilterMenu({
  title,
  children,
  actions,
  className = '',
  ...props
}: FilterMenuProps) {
  const classNames = [
    'ap-filter-menu',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      <h3 className="ap-filter-menu__title">{title}</h3>
      {children}
      {actions && (
        <div className="ap-filter-menu__actions">
          {actions}
        </div>
      )}
    </div>
  );
}

/* ===========================================
   Filter Menu Field
   Labeled field container within filter menu
   =========================================== */

export interface FilterMenuFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label */
  label: string;
  /** Field content (dropdown, input, etc.) */
  children: React.ReactNode;
}

export function FilterMenuField({
  label,
  children,
  className = '',
  ...props
}: FilterMenuFieldProps) {
  const classNames = [
    'ap-filter-menu__field',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      <span className="ap-filter-menu__label">{label}</span>
      {children}
    </div>
  );
}
