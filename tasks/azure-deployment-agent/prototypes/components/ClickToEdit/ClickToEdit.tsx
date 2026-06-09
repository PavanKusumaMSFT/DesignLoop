import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import styles from './ClickToEdit.module.css';

export interface ClickToEditProps {
  value: string | number;
  type?: 'text' | 'number' | 'select';
  options?: string[];
  onSave: (newValue: string | number) => void;
  label: string;
  impactPreview?: string;
  readOnly?: boolean;
  validation?: (value: string | number) => { valid: boolean; message?: string };
  className?: string;
}

export const ClickToEdit: React.FC<ClickToEditProps> = ({
  value,
  type = 'text',
  options = [],
  onSave,
  label,
  impactPreview,
  readOnly = false,
  validation,
  className,
}) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>(String(value));
  const [error, setError] = useState<string | undefined>();
  const [showUpdated, setShowUpdated] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing]);

  const enterEditMode = useCallback(() => {
    if (readOnly) return;
    setEditValue(String(value));
    setError(undefined);
    setEditing(true);
  }, [readOnly, value]);

  const cancelEdit = useCallback(() => {
    setEditing(false);
    setEditValue(String(value));
    setError(undefined);
    containerRef.current?.focus();
  }, [value]);

  const confirmEdit = useCallback(() => {
    const parsedValue = type === 'number' ? Number(editValue) : editValue;

    if (validation) {
      const result = validation(parsedValue);
      if (!result.valid) {
        setError(result.message ?? 'Invalid value');
        return;
      }
    }

    onSave(parsedValue);
    setEditing(false);
    setError(undefined);
    setShowUpdated(true);
    setTimeout(() => setShowUpdated(false), 1500);
    containerRef.current?.focus();
  }, [editValue, type, validation, onSave]);

  const handleDisplayKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterEditMode();
      }
    },
    [enterEditMode]
  );

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmEdit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cancelEdit();
      }
    },
    [confirmEdit, cancelEdit]
  );

  const hasChanged = String(editValue) !== String(value);
  const errorId = `${label.replace(/\s+/g, '-')}-error`;

  if (editing) {
    return (
      <div className={`${styles.editContainer} ${className ?? ''}`}>
        <label className={styles.editLabel} htmlFor={`${label.replace(/\s+/g, '-')}-input`}>
          {label}
        </label>
        <div className={styles.editRow}>
          {type === 'select' ? (
            <select
              id={`${label.replace(/\s+/g, '-')}-input`}
              ref={inputRef as React.RefObject<HTMLSelectElement>}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
                setError(undefined);
              }}
              onKeyDown={handleInputKeyDown}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={`${label.replace(/\s+/g, '-')}-input`}
              ref={inputRef as React.RefObject<HTMLInputElement>}
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              type={type}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
                setError(undefined);
              }}
              onKeyDown={handleInputKeyDown}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
          <button
            className={styles.confirmButton}
            onClick={confirmEdit}
            aria-label="Confirm"
            disabled={!!error}
          >
            ✓
          </button>
          <button
            className={styles.cancelButton}
            onClick={cancelEdit}
            aria-label="Cancel"
          >
            ✕
          </button>
        </div>
        {error && (
          <p id={errorId} className={styles.errorMessage} role="alert">{error}</p>
        )}
        {impactPreview && hasChanged && !error && (
          <div className={styles.impactTooltip} role="status">
            {impactPreview}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.displayContainer} ${readOnly ? styles.readOnly : ''} ${showUpdated ? styles.updated : ''} ${className ?? ''}`}
      role={readOnly ? undefined : 'button'}
      tabIndex={readOnly ? undefined : 0}
      onClick={enterEditMode}
      onKeyDown={handleDisplayKeyDown}
      aria-label={readOnly ? `${label}: ${value}` : `${label}: ${value}. Click to edit`}
    >
      <span className={styles.displayValue}>{value}</span>
      {!readOnly && (
        <span className={styles.pencilIcon} aria-hidden="true">✏️</span>
      )}
      {showUpdated && (
        <span className={styles.updatedBadge} aria-live="polite">Updated</span>
      )}
    </div>
  );
};
