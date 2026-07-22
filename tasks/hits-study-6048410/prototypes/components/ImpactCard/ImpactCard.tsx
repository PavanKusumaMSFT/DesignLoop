import React, { useState, useCallback, KeyboardEvent } from 'react';
import styles from './ImpactCard.module.css';

export type ImpactCardState = 'default' | 'expanded' | 'shared';
export type ImpactCardVariant = 'compact' | 'detailed' | 'milestone';

export interface ImpactCardProps {
  /** Unique identifier */
  id: string;
  /** Study title the impact is from */
  studyTitle: string;
  /** Name of the researcher */
  researcherName: string;
  /** Summary of the impact made */
  impactSummary: string;
  /** Date the impact was reported */
  date: string;
  /** Product affected by the research */
  productAffected: string;
  /** Current state of the card */
  state?: ImpactCardState;
  /** Display variant */
  variant?: ImpactCardVariant;
  /** Extended details shown in expanded state */
  details?: string;
  /** Impact metric (e.g., "12% improvement") */
  impactMetric?: string;
  /** Number of participants in the study */
  participantCount?: number;
  /** Product icon/logo URL */
  productIcon?: string;
  /** Share handler */
  onShare?: (id: string) => void;
  /** Click handler */
  onClick?: (id: string) => void;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
  id,
  studyTitle,
  researcherName,
  impactSummary,
  date,
  productAffected,
  state: controlledState,
  variant = 'detailed',
  details,
  impactMetric,
  participantCount,
  productIcon,
  onShare,
  onClick,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  const isExpanded = controlledState === 'expanded' || internalExpanded;
  const isShared = controlledState === 'shared' || hasShared;

  const handleClick = useCallback(() => {
    onClick?.(id);
    if (variant !== 'compact') {
      setInternalExpanded((prev) => !prev);
    }
  }, [id, variant, onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setHasShared(true);
      onShare?.(id);
    },
    [id, onShare]
  );

  const handleShareKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        setHasShared(true);
        onShare?.(id);
      }
    },
    [id, onShare]
  );

  const productInitial = productAffected.charAt(0).toUpperCase();

  const classNames = [
    styles.card,
    styles[`variant-${variant}`],
    isExpanded ? styles.expanded : '',
    isShared ? styles.shared : '',
  ].filter(Boolean).join(' ');

  return (
    <article
      className={classNames}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Impact from study: ${studyTitle}. ${impactSummary}`}
      aria-expanded={variant !== 'compact' ? isExpanded : undefined}
    >
      {/* Milestone badge */}
      {variant === 'milestone' && (
        <div className={styles.milestoneBanner}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0l2 5h5.5l-4.3 3.5L12.8 14 8 10.7 3.2 14l1.6-5.5L.5 5H6z" />
          </svg>
          <span>Milestone Impact</span>
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.productBadge} aria-label={`Product: ${productAffected}`}>
          {productIcon ? (
            <img src={productIcon} alt="" className={styles.productIconImg} />
          ) : (
            <span className={styles.productInitial}>{productInitial}</span>
          )}
        </div>
        <div className={styles.headerText}>
          <span className={styles.productName}>{productAffected}</span>
          <span className={styles.date}>{date}</span>
        </div>
        {isShared && (
          <span className={styles.sharedBadge} aria-label="Shared">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M6.5 12.5l-4-4 1.4-1.4L6.5 9.7l5.6-5.6L13.5 5.5z" />
            </svg>
            Shared
          </span>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{studyTitle}</h3>
        <p className={styles.summary}>{impactSummary}</p>

        {impactMetric && (
          <div className={styles.metric}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.metricIcon}>
              <path d="M2 14V8h3v6H2zm4.5 0V4h3v10h-3zM11 14V1h3v13h-3z" />
            </svg>
            <span className={styles.metricValue}>{impactMetric}</span>
          </div>
        )}
      </div>

      {/* Expanded details */}
      {isExpanded && details && variant !== 'compact' && (
        <div className={styles.details} role="region" aria-label="Impact details">
          <p className={styles.detailsText}>{details}</p>
          {participantCount && (
            <div className={styles.participantInfo}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.icon}>
                <path d="M5.5 8a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm5 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM2 13c0-1.7 1.6-3 3.5-3 .7 0 1.4.2 2 .5A4.4 4.4 0 005 13v.5H2V13zm6.5.5V13c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3v.5h-7z" />
              </svg>
              <span>{participantCount} participants contributed</span>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.researcher}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.icon}>
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4z" />
          </svg>
          {researcherName}
        </span>
        <button
          className={`${styles.shareButton} ${isShared ? styles.shareButtonShared : ''}`}
          onClick={handleShare}
          onKeyDown={handleShareKeyDown}
          aria-label={isShared ? `Already shared: ${studyTitle}` : `Share impact from ${studyTitle}`}
          disabled={isShared}
        >
          {isShared ? (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M6.5 12.5l-4-4 1.4-1.4L6.5 9.7l5.6-5.6L13.5 5.5z" />
              </svg>
              Shared
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M12 1a3 3 0 00-2.8 4L5.5 7.3a3 3 0 100 5.4l3.7 2.3a3 3 0 10.9-1.5L6.4 11.2a3 3 0 000-2.4l3.7-2.3A3 3 0 1012 1z" />
              </svg>
              Share
            </>
          )}
        </button>
      </div>
    </article>
  );
};
