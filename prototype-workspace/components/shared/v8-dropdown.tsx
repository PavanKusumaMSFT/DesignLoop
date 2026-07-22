/* eslint-disable react/forbid-dom-props, no-restricted-syntax, jsx-a11y/role-supports-aria-props */
import React from 'react';
import ChevronDownIcon from './v8-icons/commands/chevron-down.svg?react';
import CheckIcon from './v8-icons/commands/check.svg?react';
import './v8-dropdown.css';

/* ===========================================
   Dropdown (Input Trigger)
   Select input that opens a menu
   =========================================== */

export interface DropdownProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Display label (selected value or placeholder) */
  label?: string;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Whether the dropdown is open */
  isOpen?: boolean;
  /** Error state */
  error?: boolean;
}

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>((
  {
    label,
    placeholder = 'Select options',
    isOpen = false,
    error = false,
    className = '',
    disabled,
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-dropdown',
    isOpen && 'ap-dropdown--open',
    error && 'ap-dropdown--error',
    className,
  ].filter(Boolean).join(' ');

  const displayLabel = label || placeholder;
  const isPlaceholder = !label;

  return (
    <button 
      ref={ref}
      className={classNames} 
      disabled={disabled}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-invalid={error || undefined}
      {...props}
    >
      <span className={`ap-dropdown__label ${isPlaceholder ? 'ap-dropdown__label--placeholder' : ''}`}>
        {displayLabel}
      </span>
      <span className="ap-dropdown__chevron">
        <ChevronDownIcon />
      </span>
    </button>
  );
});

Dropdown.displayName = 'Dropdown';

import { FormMessage } from './v8-form-field';

/* ===========================================
   Dropdown Error
   Error message displayed below dropdown
   Now delegates to FormMessage for consistent styling
   =========================================== */

export interface DropdownErrorProps {
  /** Error icon */
  icon?: React.ReactNode;
  /** Error message */
  message: string;
  /** Additional CSS class */
  className?: string;
}

export function DropdownError({ icon, message, className, ...props }: DropdownErrorProps & React.HTMLAttributes<HTMLDivElement>) {
  return <FormMessage variant="error" icon={icon} message={message} className={className} {...props} />;
}

/* ===========================================
   Dropdown Menu
   Container for dropdown options
   =========================================== */

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Menu content */
  children: React.ReactNode;
  /** Search input component (optional) */
  searchInput?: React.ReactNode;
}

export function DropdownMenu({
  children,
  searchInput,
  className = '',
  ...props
}: DropdownMenuProps) {
  const classNames = [
    'ap-dropdown-menu',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="listbox" {...props}>
      {searchInput && (
        <div className="ap-dropdown-menu__search">
          {searchInput}
        </div>
      )}
      {children}
    </div>
  );
}

/* ===========================================
   Dropdown Item (Single Select)
   Individual option in dropdown
   =========================================== */

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Item label */
  label: string;
  /** Whether this item is selected */
  selected?: boolean;
}

export function DropdownItem({
  label,
  selected = false,
  className = '',
  ...props
}: DropdownItemProps) {
  const classNames = [
    'ap-dropdown-item',
    selected && 'ap-dropdown-item--selected',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button 
      type="button"
      className={classNames} 
      role="option"
      aria-selected={selected}
      {...props}
    >
      {label}
    </button>
  );
}

/* ===========================================
   Dropdown Checkbox Item (Multi Select)
   Checkbox option in dropdown
   =========================================== */

export interface DropdownCheckboxItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Item label */
  label: string;
  /** Whether this item is checked */
  checked?: boolean;
}

export function DropdownCheckboxItem({
  label,
  checked = false,
  className = '',
  ...props
}: DropdownCheckboxItemProps) {
  const classNames = [
    'ap-dropdown-checkbox-item',
    checked && 'ap-dropdown-checkbox-item--checked',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button 
      type="button"
      className={classNames} 
      role="option"
      aria-selected={checked}
      {...props}
    >
      <span className="ap-dropdown-checkbox-item__checkbox">
        {checked && <CheckIcon />}
      </span>
      <span className="ap-dropdown-checkbox-item__label">{label}</span>
    </button>
  );
}

/* ===========================================
   Dropdown Header (Group Label)
   Non-interactive group header
   =========================================== */

export interface DropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header label */
  label: string;
  /** Show border-top */
  border?: boolean;
}

export function DropdownHeader({
  label,
  border = false,
  className = '',
  ...props
}: DropdownHeaderProps) {
  const classNames = [
    'ap-dropdown-header',
    border && 'ap-dropdown-header--border',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="presentation" {...props}>
      {label}
    </div>
  );
}
