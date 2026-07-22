/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React from 'react';
import './v8-form-field.css';

/* ===========================================
   FormMessage
   Inline message displayed below an input
   Replaces DropdownError with a more general pattern
   =========================================== */

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Message variant */
  variant?: 'error' | 'info';
  /** Icon element */
  icon?: React.ReactNode;
  /** Message text */
  message: string;
  /** Optional hyperlink */
  link?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export function FormMessage({
  variant = 'error',
  icon,
  message,
  link,
  className = '',
  ...props
}: FormMessageProps) {
  const classNames = [
    'ap-form-message',
    `ap-form-message--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role={variant === 'error' ? 'alert' : undefined} {...props}>
      {icon && <span className="ap-form-message__icon">{icon}</span>}
      <span className="ap-form-message__text">
        {message}
        {link && (
          <>
            {' '}
            <a
              className="ap-form-message__link"
              href={link.href || '#'}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
            >
              {link.text}
            </a>
          </>
        )}
      </span>
    </div>
  );
}

/* ===========================================
   FormField
   Label + input wrapper with optional messages
   =========================================== */

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label text */
  label: string;
  /** Whether the field is required (shows * indicator) */
  required?: boolean;
  /** Show info icon next to label */
  infoIcon?: React.ReactNode;
  /** Whether this field is subordinate to the field above */
  subordinate?: boolean;
  /** Field content (input, dropdown, checkbox, etc.) */
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  infoIcon,
  subordinate = false,
  children,
  className = '',
  ...props
}: FormFieldProps) {
  const classNames = [
    'ap-form-field',
    subordinate && 'ap-form-field--subordinate',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {subordinate && <span className="ap-form-field__connector" aria-hidden="true" />}
      <div className="ap-form-field__label">
        <span className="ap-form-field__label-text">
          {label}
          {required && <span className="ap-form-field__required" aria-label="required"> *</span>}
        </span>
        {infoIcon && <span className="ap-form-field__info">{infoIcon}</span>}
      </div>
      <div className="ap-form-field__input">
        {children}
      </div>
    </div>
  );
}

/* ===========================================
   FormSection
   Groups fields under optional header + body
   =========================================== */

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section header text */
  header?: string;
  /** Section body / description (text, links, or any node) */
  description?: React.ReactNode;
  /** Optional info box or banner slot */
  infoBox?: React.ReactNode;
  /** Form fields and other content */
  children?: React.ReactNode;
}

export function FormSection({
  header,
  description,
  infoBox,
  children,
  className = '',
  ...props
}: FormSectionProps) {
  const classNames = [
    'ap-form-section',
    className,
  ].filter(Boolean).join(' ');

  const hasHeader = header || description || infoBox;

  return (
    <div className={classNames} {...props}>
      {hasHeader && (
        <div className="ap-form-section__intro">
          {header && <h3 className="ap-form-section__header">{header}</h3>}
          {description && <div className="ap-form-section__description">{description}</div>}
          {infoBox && <div className="ap-form-section__infobox">{infoBox}</div>}
        </div>
      )}
      {children && (
        <div className="ap-form-section__fields">
          {children}
        </div>
      )}
    </div>
  );
}

/* ===========================================
   Form
   Top-level form container with optional max width
   =========================================== */

export interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the form */
  maxWidth?: string;
  /** Form sections and content */
  children: React.ReactNode;
}

export function Form({
  maxWidth,
  children,
  className = '',
  style,
  ...props
}: FormProps) {
  const classNames = [
    'ap-form',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      style={{ ...style, ...(maxWidth ? { maxWidth } : {}) }}
      {...props}
    >
      {children}
    </div>
  );
}
