import React from 'react';
import './v8-button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon';
  /** Icon element to display (should be 16x16) */
  icon?: React.ReactNode;
  /** Selected state (for icon variant toggle buttons) */
  selected?: boolean;
  /** Button contents (optional for icon variant) */
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  {
    variant = 'primary',
    icon,
    selected = false,
    className = '',
    children,
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-button',
    `ap-button--${variant}`,
    icon && 'ap-button--has-icon',
    selected && 'ap-button--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} className={classNames} type="button" {...props}>
      {icon && <span className="ap-button__icon">{icon}</span>}
      {children && <span className="ap-button__text">{children}</span>}
    </button>
  );
});

Button.displayName = 'Button';
