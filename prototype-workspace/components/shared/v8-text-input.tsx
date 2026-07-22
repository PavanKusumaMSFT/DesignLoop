import React from 'react';
import './v8-text-input.css';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  /** Visual variant */
  variant?: 'standard' | 'multiline';
  /** Error state - shows red border */
  error?: boolean;
  /** Icon element to render on the left side */
  iconStart?: React.ReactNode;
  /** Icon element to render on the right side */
  iconEnd?: React.ReactNode;
  /** Number of rows for multiline variant (default: 3) */
  rows?: number;
}

/**
 * TextInput - Single-line and multiline text input component
 * 
 * Features:
 * - 2 variants: standard (input) and multiline (textarea)
 * - 5 states: rest, hover, focus, disabled, error
 * - Optional icons on left and/or right
 * 
 * For form layouts with labels, help text, and error messages,
 * wrap this in a FormField component.
 */
export const TextInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputProps
>(({
  variant = 'standard',
  error = false,
  iconStart,
  iconEnd,
  className = '',
  disabled,
  rows = 3,
  ...props
}, ref) => {
  const wrapperClasses = [
    'ap-text-input',
    `ap-text-input--${variant}`,
    error && 'ap-text-input--error',
    disabled && 'ap-text-input--disabled',
    iconStart && 'ap-text-input--has-icon-start',
    iconEnd && 'ap-text-input--has-icon-end',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    disabled,
    'aria-invalid': error || undefined,
    ...props,
  };

  return (
    <div className={wrapperClasses}>
      {iconStart && (
        <span className="ap-text-input__icon ap-text-input__icon--start">
          {iconStart}
        </span>
      )}
      
      {variant === 'multiline' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className="ap-text-input__field"
          rows={rows}
          {...sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type="text"
          className="ap-text-input__field"
          {...sharedProps as React.InputHTMLAttributes<HTMLInputElement>}
        />
      )}
      
      {iconEnd && (
        <span className="ap-text-input__icon ap-text-input__icon--end">
          {iconEnd}
        </span>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';
