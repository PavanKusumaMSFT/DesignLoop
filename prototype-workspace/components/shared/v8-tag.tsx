import React from 'react';
import './v8-tag.css';

/* ===========================================
   Tag
   Metadata label displayed as "Label : Value"
   =========================================== */

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tag label (displayed before separator) */
  label: string;
  /** Tag value (displayed after separator, semibold) */
  value: string;
  /** Separator between label and value */
  separator?: string;
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>((
  {
    label,
    value,
    separator = ':',
    className = '',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-tag',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={classNames} type="button" {...props}>
      <span className="ap-tag__label">{label}</span>
      <span className="ap-tag__separator">{separator}</span>
      <span className="ap-tag__value">{value}</span>
    </button>
  );
});

Tag.displayName = 'Tag';

/* ===========================================
   TagGroup
   Container for displaying multiple tags
   =========================================== */

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tag elements */
  children: React.ReactNode;
}

export function TagGroup({
  className = '',
  children,
  ...props
}: TagGroupProps) {
  const classNames = [
    'ap-tag-group',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
