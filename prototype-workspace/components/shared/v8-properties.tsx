import React from 'react';
import './v8-properties.css';

/* ===========================================
   PropertyValue
   A single value within a property row,
   supporting text, links, and status icons
   =========================================== */

export interface PropertyValueProps {
  /** Display text */
  text: React.ReactNode;
  /** Optional href to render as a hyperlink */
  href?: string;
  /** Optional status icon (16px) rendered before text */
  statusIcon?: React.ReactNode;
}

/* ===========================================
   PropertyField
   A single key + value(s) row
   =========================================== */

export interface PropertyFieldProps {
  /** Field label (key) */
  label: string;
  /** One or more values for this key */
  values: PropertyValueProps[];
}

/* ===========================================
   PropertySection
   A group of fields under a header
   =========================================== */

export interface PropertySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section header text */
  header: string;
  /** Optional icon (20px) displayed before the header */
  icon?: React.ReactNode;
  /** Whether the header is rendered as a hyperlink */
  headerHref?: string;
  /** Fields within this section */
  fields: PropertyFieldProps[];
}

export function PropertySection({
  header,
  icon,
  headerHref,
  fields,
  className = '',
  ...props
}: PropertySectionProps) {
  const classNames = [
    'ap-property-section',
    className,
  ].filter(Boolean).join(' ');

  const headerContent = (
    <>
      {icon && <span className="ap-property-section__icon">{icon}</span>}
      {headerHref ? (
        <a className="ap-property-section__header-link" href={headerHref}>{header}</a>
      ) : (
        <span className="ap-property-section__header-text">{header}</span>
      )}
    </>
  );

  return (
    <div className={classNames} {...props}>
      <div className="ap-property-section__header">
        {headerContent}
      </div>
      <dl className="ap-property-section__fields">
        {fields.map((field, fi) => (
          <div className="ap-property-section__row" key={fi}>
            <dt className="ap-property-section__key">{field.label}</dt>
            <dd className="ap-property-section__value">
              {field.values.length === 0 ? (
                <span>-</span>
              ) : (
                field.values.map((val, vi) => (
                  <div className="ap-property-section__value-line" key={vi}>
                    {val.statusIcon && (
                      <span className="ap-property-section__status-icon">{val.statusIcon}</span>
                    )}
                    {val.href ? (
                      <a className="ap-property-section__value-link" href={val.href}>{val.text}</a>
                    ) : (
                      <span>{val.text}</span>
                    )}
                  </div>
                ))
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ===========================================
   Properties
   Top-level container for property sections,
   laid out in a two-column grid matching Essentials
   =========================================== */

export interface PropertiesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Property sections */
  children: React.ReactNode;
}

export function Properties({
  children,
  className = '',
  ...props
}: PropertiesProps) {
  const classNames = [
    'ap-properties',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
