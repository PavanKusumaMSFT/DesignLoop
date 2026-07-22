import React from 'react';
import CheckIcon from './v8-icons/commands/check.svg?react';
import './v8-checkbox.css';

/* ===========================================
   Checkbox
   Tri-state checkbox with optional label
   =========================================== */

export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Indeterminate state (overrides checked visually) */
  indeterminate?: boolean;
  /** Label text displayed beside checkbox */
  label?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((
  {
    checked = false,
    indeterminate = false,
    label,
    onChange,
    disabled,
    className = '',
    onClick,
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-checkbox',
    checked && !indeterminate && 'ap-checkbox--checked',
    indeterminate && 'ap-checkbox--indeterminate',
    disabled && 'ap-checkbox--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={classNames}
      onClick={handleClick}
      {...props}
    >
      <span className="ap-checkbox__box">
        {indeterminate ? (
          <span className="ap-checkbox__indeterminate" />
        ) : (
          <CheckIcon />
        )}
      </span>
      {label && <span className="ap-checkbox__label">{label}</span>}
    </button>
  );
});

Checkbox.displayName = 'Checkbox';

/* ===========================================
   CheckboxGroup
   Vertically stacked group of checkboxes
   =========================================== */

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Checkbox elements */
  children: React.ReactNode;
}

export function CheckboxGroup({
  className = '',
  children,
  ...props
}: CheckboxGroupProps) {
  const classNames = [
    'ap-checkbox-group',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="group" {...props}>
      {children}
    </div>
  );
}
