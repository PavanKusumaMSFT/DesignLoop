import React, { useRef, useCallback, KeyboardEvent } from 'react';
import styles from './ModeSwitcher.module.css';

type Mode = 'ask' | 'plan' | 'agent';

export interface ModeSwitcherProps {
  mode: Mode;
  activeAgent?: string;
  onModeChange: (mode: Mode) => void;
  disabled?: boolean;
  className?: string;
}

const MODES: { key: Mode; label: string; icon: string }[] = [
  { key: 'ask', label: 'Ask', icon: '💬' },
  { key: 'plan', label: 'Plan', icon: '📋' },
  { key: 'agent', label: 'Agent', icon: '🤖' },
];

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  mode,
  activeAgent,
  onModeChange,
  disabled = false,
  className,
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (disabled) return;

      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = (index + 1) % MODES.length;
          break;
        case 'ArrowLeft':
          nextIndex = (index - 1 + MODES.length) % MODES.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = MODES.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onModeChange(MODES[index].key);
          return;
        default:
          return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabRefs.current[nextIndex]?.focus();
      }
    },
    [disabled, onModeChange]
  );

  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ''} ${className ?? ''}`}
      role="tablist"
      aria-label="Interaction mode"
    >
      {MODES.map((m, index) => {
        const isActive = mode === m.key;
        const showSubLabel = m.key === 'agent' && isActive && activeAgent;

        return (
          <button
            key={m.key}
            ref={(el) => { tabRefs.current[index] = el; }}
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled}
            aria-label={
              showSubLabel
                ? `Agent, @${activeAgent}, tab, ${index + 1} of ${MODES.length}`
                : `${m.label} tab, ${index + 1} of ${MODES.length}`
            }
            tabIndex={isActive ? 0 : -1}
            className={`${styles.segment} ${isActive ? styles.active : ''}`}
            onClick={() => {
              if (!disabled) onModeChange(m.key);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={disabled}
          >
            <span className={styles.icon} aria-hidden="true">{m.icon}</span>
            <span className={styles.label}>{m.label}</span>
            {showSubLabel && (
              <span className={styles.subLabel}>@{activeAgent}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
