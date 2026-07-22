import './v8-card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the card */
  variant?: 'elevated' | 'outlined' | 'filled';
  /** Padding inside the card */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Card contents */
  children: React.ReactNode;
}

export function Card({
  variant = 'elevated',
  padding = 'medium',
  className = '',
  children,
  ...props
}: CardProps) {
  const classNames = [
    'ap-card',
    `ap-card--${variant}`,
    `ap-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
