import React from 'react';
import './v8-radio.css';

/* ===========================================
   Radio
   Radio button with optional label and description
   =========================================== */

export interface RadioProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the radio is selected */
  checked?: boolean;
  /** Label text displayed beside radio */
  label?: string;
  /** Description text displayed below the label */
  description?: string;
  /** Radio button name (for grouping) */
  name?: string;
  /** Value for this radio option */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>((
  {
    checked = false,
    label,
    description,
    name,
    value = '',
    onChange,
    disabled,
    className = '',
    onClick,
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-radio',
    checked && 'ap-radio--checked',
    disabled && 'ap-radio--disabled',
    description && 'ap-radio--has-description',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={classNames}
      onClick={handleClick}
      data-name={name}
      {...props}
    >
      <span className="ap-radio__circle">
        <span className="ap-radio__dot" />
      </span>
      {(label || description) && (
        <span className="ap-radio__content">
          {label && <span className="ap-radio__label">{label}</span>}
          {description && <span className="ap-radio__description">{description}</span>}
        </span>
      )}
    </button>
  );
});

Radio.displayName = 'Radio';

/* ===========================================
   RadioGroup
   Vertically stacked group of radios
   =========================================== */

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radio elements */
  children: React.ReactNode;
}

export function RadioGroup({
  className = '',
  children,
  ...props
}: RadioGroupProps) {
  const classNames = [
    'ap-radio-group',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="radiogroup" {...props}>
      {children}
    </div>
  );
}
