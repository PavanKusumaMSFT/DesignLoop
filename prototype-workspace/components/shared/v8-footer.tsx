import React from 'react';
import './v8-footer.css';

// Icons
import FeedbackIcon from './v8-icons/commands/feedback.svg?react';
import ChevronLeftIcon from './v8-icons/commands/chevron-left.svg?react';
import ChevronRightIcon from './v8-icons/commands/chevron-right.svg?react';

/* ===========================================
   Footer
   Page-level footer bar with three layout zones
   =========================================== */

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Left-aligned content (action buttons, browse summary) */
  left?: React.ReactNode;
  /** Center-aligned content (pagination controls) */
  center?: React.ReactNode;
  /** Right-aligned content. Renders FooterFeedback by default. */
  right?: React.ReactNode;
}

export function Footer({
  left,
  center,
  right,
  className = '',
  ...props
}: FooterProps) {
  const classNames = ['ap-footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classNames} {...props}>
      <div className="ap-footer__left">{left}</div>
      {center && <div className="ap-footer__center">{center}</div>}
      <div className="ap-footer__right">
        {right ?? <FooterFeedback />}
      </div>
    </footer>
  );
}

/* ===========================================
   FooterActions
   Horizontal button group for the left zone
   =========================================== */

export interface FooterActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Buttons and other controls */
  children: React.ReactNode;
}

export function FooterActions({
  children,
  className = '',
  ...props
}: FooterActionsProps) {
  const classNames = ['ap-footer-actions', className].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

/* ===========================================
   FooterFeedback
   "Give feedback" link with icon
   =========================================== */

export interface FooterFeedbackProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link label */
  label?: string;
  /** Link URL */
  href?: string;
  /** Click handler (prevents default navigation) */
  onClick?: () => void;
}

export function FooterFeedback({
  label = 'Give feedback',
  href = '#',
  onClick,
  className = '',
  ...props
}: FooterFeedbackProps) {
  return (
    <a
      className={['ap-footer-feedback', className].filter(Boolean).join(' ')}
      href={href}
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      {...props}
    >
      <FeedbackIcon />
      <span>{label}</span>
    </a>
  );
}

/* ===========================================
   FooterBrowseInfo
   "X-Y of Z. Display count:" text + dropdown
   =========================================== */

export type PageSize = 'auto' | 10 | 20 | 50 | 100 | 200;

const PAGE_SIZE_OPTIONS: PageSize[] = ['auto', 10, 20, 50, 100, 200];

export interface FooterBrowseInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** First item index (1-based) */
  start: number;
  /** Last item index */
  end: number;
  /** Total item count */
  total: number;
  /** Current page size */
  pageSize?: PageSize;
  /** Page size change handler */
  onPageSizeChange?: (size: PageSize) => void;
}

export function FooterBrowseInfo({
  start,
  end,
  total,
  pageSize = 'auto',
  onPageSizeChange,
  className = '',
  ...props
}: FooterBrowseInfoProps) {
  return (
    <div className={['ap-footer-browse-info', className].filter(Boolean).join(' ')} {...props}>
      <span className="ap-footer-browse-info__text">
        {start}-{end} of {total}. Display count:
      </span>
      <select
        className="ap-footer-browse-info__select"
        value={String(pageSize)}
        onChange={(e) => {
          if (!onPageSizeChange) return;
          const val = e.target.value;
          onPageSizeChange(val === 'auto' ? 'auto' : Number(val) as PageSize);
        }}
      >
        {PAGE_SIZE_OPTIONS.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {opt === 'auto' ? 'Auto' : String(opt)}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ===========================================
   FooterPagination
   Page navigation with prev/next chevrons
   =========================================== */

export interface FooterPaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onPageChange'> {
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
}

export function FooterPagination({
  page,
  totalPages,
  onPageChange,
  className = '',
  ...props
}: FooterPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={['ap-footer-pagination', className].filter(Boolean).join(' ')} aria-label="Pagination" {...props}>
      <button
        type="button"
        className="ap-footer-pagination__chevron"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={[
            'ap-footer-pagination__page',
            p === page && 'ap-footer-pagination__page--current',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="ap-footer-pagination__chevron"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
