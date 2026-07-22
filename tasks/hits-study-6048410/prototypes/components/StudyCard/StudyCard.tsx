import React, { useCallback, KeyboardEvent } from 'react';
import styles from './StudyCard.module.css';

export type StudyCardState = 'default' | 'hover' | 'enrolled' | 'completed' | 'expired';
export type StudyCardVariant = 'compact' | 'expanded' | 'featured';

export interface StudyCardTag {
  label: string;
  color?: string;
}

export interface StudyCardProps {
  /** Unique identifier for the study */
  id: string;
  /** Study title */
  title: string;
  /** Brief description of the study */
  description?: string;
  /** Estimated time to complete (e.g. "30 min") */
  estimatedTime: string;
  /** Compensation amount (e.g. "$25 Gift Card") */
  compensation: string;
  /** Match score percentage (0-100) */
  matchScore: number;
  /** Tags for categorization */
  tags: StudyCardTag[];
  /** Deadline date string */
  deadline: string;
  /** Current state of the card */
  state?: StudyCardState;
  /** Visual variant */
  variant?: StudyCardVariant;
  /** Researcher name */
  researcherName?: string;
  /** Number of spots remaining */
  spotsRemaining?: number;
  /** Click handler */
  onClick?: (id: string) => void;
  /** Enroll handler */
  onEnroll?: (id: string) => void;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  id,
  title,
  description,
  estimatedTime,
  compensation,
  matchScore,
  tags,
  deadline,
  state = 'default',
  variant = 'expanded',
  researcherName,
  spotsRemaining,
  onClick,
  onEnroll,
}) => {
  const handleClick = useCallback(() => {
    if (state !== 'expired') onClick?.(id);
  }, [id, state, onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const handleEnroll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (state !== 'expired' && state !== 'completed') onEnroll?.(id);
    },
    [id, state, onEnroll]
  );

  const handleEnrollKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (state !== 'expired' && state !== 'completed') onEnroll?.(id);
      }
    },
    [id, state, onEnroll]
  );

  const getMatchScoreClass = () => {
    if (matchScore >= 80) return styles.matchHigh;
    if (matchScore >= 50) return styles.matchMedium;
    return styles.matchLow;
  };

  const getStateLabel = () => {
    switch (state) {
      case 'enrolled': return 'Enrolled';
      case 'completed': return 'Completed';
      case 'expired': return 'Expired';
      default: return null;
    }
  };

  const getButtonLabel = () => {
    switch (state) {
      case 'enrolled': return 'View Details';
      case 'completed': return 'See Results';
      case 'expired': return 'Expired';
      default: return 'Enroll Now';
    }
  };

  const stateLabel = getStateLabel();

  const classNames = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`state-${state}`],
  ].filter(Boolean).join(' ');

  return (
    <article
      className={classNames}
      role="button"
      tabIndex={state === 'expired' ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Study: ${title}. Match score: ${matchScore}%. Estimated time: ${estimatedTime}. Compensation: ${compensation}.`}
      aria-disabled={state === 'expired'}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {variant === 'featured' && (
            <span className={styles.featuredBadge} aria-label="Featured study">
              ★ Featured
            </span>
          )}
          {stateLabel && (
            <span className={`${styles.stateBadge} ${styles[`badge-${state}`]}`}>
              {stateLabel}
            </span>
          )}
        </div>
        <div className={`${styles.matchScore} ${getMatchScoreClass()}`} aria-label={`${matchScore}% match`}>
          <svg className={styles.matchIcon} viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
          </svg>
          {matchScore}% match
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {description && variant !== 'compact' && (
          <p className={styles.description}>{description}</p>
        )}
        {researcherName && variant !== 'compact' && (
          <p className={styles.researcher}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.icon}>
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 1c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4z" />
            </svg>
            {researcherName}
          </p>
        )}
      </div>

      {/* Meta info */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.icon}>
            <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1.2A5.8 5.8 0 1013.8 8 5.8 5.8 0 008 2.2zM8.5 4v4.3l3 1.8-.5.8L7.5 9V4z" />
          </svg>
          <span>{estimatedTime}</span>
        </div>
        <div className={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.icon}>
            <path d="M8 1.5a1.5 1.5 0 011.5 1.5v.5h2A1.5 1.5 0 0113 5v7.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 12.5V5a1.5 1.5 0 011.5-1.5h2V3A1.5 1.5 0 018 1.5zM7 4h2V3a.5.5 0 00-1 0v.5H7V3a.5.5 0 011-1z" />
          </svg>
          <span>{compensation}</span>
        </div>
        <div className={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={styles.icon}>
            <path d="M4.5 1a.5.5 0 01.5.5V2h6v-.5a.5.5 0 011 0V2h1.5A1.5 1.5 0 0115 3.5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 13.5v-10A1.5 1.5 0 012.5 2H4v-.5a.5.5 0 01.5-.5zM2 6v7.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V6z" />
          </svg>
          <span>Due {deadline}</span>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className={styles.tags} role="list" aria-label="Study tags">
          {tags.map((tag) => (
            <span key={tag.label} className={styles.tag} role="listitem">
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        {spotsRemaining !== undefined && state === 'default' && (
          <span className={styles.spots}>
            {spotsRemaining <= 5 ? (
              <span className={styles.spotsUrgent}>Only {spotsRemaining} spots left!</span>
            ) : (
              `${spotsRemaining} spots remaining`
            )}
          </span>
        )}
        <button
          className={`${styles.actionButton} ${styles[`action-${state}`]}`}
          onClick={handleEnroll}
          onKeyDown={handleEnrollKeyDown}
          disabled={state === 'expired'}
          aria-label={`${getButtonLabel()} for ${title}`}
        >
          {state === 'completed' && (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ marginRight: '4px' }}>
              <path d="M6.5 12.5l-4-4 1.4-1.4L6.5 9.7l5.6-5.6L13.5 5.5z" />
            </svg>
          )}
          {getButtonLabel()}
        </button>
      </div>
    </article>
  );
};
