import React, { useState, useCallback, useRef, KeyboardEvent } from 'react';
import styles from './VersionTimeline.module.css';

export interface Version {
  id: string;
  label: string;
  date: string;
  changeCount: number;
  author: string;
}

export interface VersionTimelineProps {
  versions: Version[];
  selectedVersions: [string, string];
  onVersionSelect: (versionId: string) => void;
  onRollback?: (versionId: string) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const VersionTimeline: React.FC<VersionTimelineProps> = ({
  versions,
  selectedVersions,
  onVersionSelect,
  onRollback,
  searchQuery = '',
  onSearch,
  className,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredVersions = versions.filter((v) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.label.toLowerCase().includes(q) ||
      v.author.toLowerCase().includes(q) ||
      v.date.toLowerCase().includes(q)
    );
  });

  const isSelected = useCallback(
    (id: string) => selectedVersions.includes(id),
    [selectedVersions]
  );

  const getConnectorRange = useCallback(() => {
    const idx0 = filteredVersions.findIndex((v) => v.id === selectedVersions[0]);
    const idx1 = filteredVersions.findIndex((v) => v.id === selectedVersions[1]);
    if (idx0 === -1 || idx1 === -1) return null;
    return { start: Math.min(idx0, idx1), end: Math.max(idx0, idx1) };
  }, [filteredVersions, selectedVersions]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = Math.min(index + 1, filteredVersions.length - 1);
          break;
        case 'ArrowLeft':
          nextIndex = Math.max(index - 1, 0);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onVersionSelect(filteredVersions[index].id);
          return;
        default:
          return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        setFocusedIndex(nextIndex);
        dotRefs.current[nextIndex]?.focus();
      }
    },
    [filteredVersions, onVersionSelect]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, versionId: string) => {
      if (!onRollback) return;
      e.preventDefault();
      setContextMenuId(contextMenuId === versionId ? null : versionId);
    },
    [onRollback, contextMenuId]
  );

  const connectorRange = getConnectorRange();

  if (filteredVersions.length === 0) {
    return (
      <div className={`${styles.container} ${className ?? ''}`}>
        {onSearch && (
          <div className={styles.searchBar}>
            <input
              className={styles.searchInput}
              type="search"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search versions..."
              aria-label="Search versions"
            />
          </div>
        )}
        <p className={styles.emptyMessage}>No versions found</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      {onSearch && (
        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search versions..."
            aria-label="Search versions"
          />
        </div>
      )}

      <div className={styles.timeline} role="listbox" aria-label="Version timeline">
        <div className={styles.track} aria-hidden="true" />

        {connectorRange && (
          <div
            className={styles.connector}
            aria-hidden="true"
            style={{
              left: `${(connectorRange.start / (filteredVersions.length - 1)) * 100}%`,
              width: `${((connectorRange.end - connectorRange.start) / (filteredVersions.length - 1)) * 100}%`,
            }}
          />
        )}

        {filteredVersions.map((version, index) => {
          const selected = isSelected(version.id);
          const hovered = hoveredId === version.id;
          const focused = focusedIndex === index;

          return (
            <div
              key={version.id}
              className={styles.dotWrapper}
              style={{
                left: filteredVersions.length > 1
                  ? `${(index / (filteredVersions.length - 1)) * 100}%`
                  : '50%',
              }}
            >
              <button
                ref={(el) => { dotRefs.current[index] = el; }}
                className={`${styles.dot} ${selected ? styles.dotSelected : styles.dotInactive}`}
                role="option"
                aria-selected={selected}
                aria-label={`${version.label}, ${version.date}, ${version.changeCount} changes by ${version.author}${selected ? ', selected' : ''}`}
                tabIndex={focused || (focusedIndex === -1 && index === 0) ? 0 : -1}
                onClick={() => onVersionSelect(version.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onMouseEnter={() => setHoveredId(version.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setFocusedIndex(index)}
                onContextMenu={(e) => handleContextMenu(e, version.id)}
              />

              {(hovered || focused) && (
                <div className={styles.tooltip} role="tooltip" aria-describedby={`tooltip-${version.id}`}>
                  <div id={`tooltip-${version.id}`}>
                    <strong className={styles.tooltipLabel}>{version.label}</strong>
                    <span className={styles.tooltipDate}>{version.date}</span>
                    <span className={styles.tooltipMeta}>
                      {version.changeCount} changes · {version.author}
                    </span>
                  </div>
                </div>
              )}

              {contextMenuId === version.id && onRollback && (
                <div className={styles.contextMenu} role="menu">
                  <button
                    className={styles.contextMenuItem}
                    role="menuitem"
                    onClick={() => {
                      onRollback(version.id);
                      setContextMenuId(null);
                    }}
                  >
                    Rollback to {version.label}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.labels} aria-hidden="true">
        {filteredVersions.map((version, index) => (
          <span
            key={version.id}
            className={styles.dotLabel}
            style={{
              left: filteredVersions.length > 1
                ? `${(index / (filteredVersions.length - 1)) * 100}%`
                : '50%',
            }}
          >
            {version.label}
          </span>
        ))}
      </div>
    </div>
  );
};
