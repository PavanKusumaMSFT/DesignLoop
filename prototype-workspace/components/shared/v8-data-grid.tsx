/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useState, useCallback, useMemo } from 'react';
import './v8-data-grid.css';

// Sort icons
import UnsortedIcon from './v8-icons/commands/column-sort-arrows/unsorted.svg?react';
import SortedAscIcon from './v8-icons/commands/column-sort-arrows/sorted-ascending.svg?react';
import SortedDescIcon from './v8-icons/commands/column-sort-arrows/sorted-descending.svg?react';

// Hierarchy icons
import TreeExpandedIcon from './v8-icons/commands/chevron-down.svg?react';
import TreeCollapsedIcon from './v8-icons/commands/chevron-right.svg?react';

// Default action icon
import EllipsisIcon from './v8-icons/commands/ellipsis.svg?react';

// Tag component
import { Tag } from './v8-tag';

// Checkbox component
import { Checkbox } from './v8-checkbox';

/* ===========================================
   DataGrid Types
   =========================================== */

export interface DataGridColumn {
  /** Unique key matching a property in row data */
  key: string;
  /** Column header label */
  label: string;
  /** Cell content rendering type */
  type?: 'text' | 'link' | 'icon-text' | 'tag' | 'action' | 'progress';
  /** Whether this column supports sorting */
  sortable?: boolean;
  /** Column width (CSS value, e.g. '200px') — defaults to flexible */
  width?: string;
  /** Minimum column width */
  minWidth?: string;
  /** Icon size in pixels (applied to icon-text cells) */
  iconSize?: number;
  /** Show hierarchy expand/collapse controls in this column */
  isTreeColumn?: boolean;
}

export interface DataGridRow {
  /** Unique row identifier */
  id: string;
  /** Cell values keyed by column key.
   *  - 'text': string
   *  - 'link': string  OR  { text: string, href?: string, onClick?: () => void }
   *  - 'icon-text': { icon: React.ReactNode, text: string }
   *  - 'tag': string | string[]
   *  - 'progress': { current: number, total: number, thresholds?: { warning: number, critical: number } }
   *  - 'action': (auto-renders ellipsis; override with { icon, label, onClick })
   */
  [key: string]: any;
  /** Child rows for hierarchical display */
  children?: DataGridRow[];
}

export interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column definitions */
  columns: DataGridColumn[];
  /** Row data */
  rows: DataGridRow[];
  /** Selected row IDs (controlled) */
  selectedIds?: string[];
  /** Selection change callback */
  onSelectionChange?: (ids: string[]) => void;
  /** Currently sorted column key */
  sortColumn?: string;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Sort change callback */
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
  /** Row selection mode */
  selectionMode?: 'none' | 'single' | 'multiple';
  /** Expanded row IDs for hierarchy (controlled). Omit for internal state. */
  expandedIds?: string[];
  /** Expanded state change callback */
  onExpandedChange?: (ids: string[]) => void;
  /** Row click callback */
  onRowClick?: (row: DataGridRow) => void;
  /** Row action (overflow) button click callback */
  onRowAction?: (row: DataGridRow) => void;
}

/* ===========================================
   Internal helpers
   =========================================== */

interface FlatRow {
  row: DataGridRow;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
}

/** Extract comparable text from any cell value */
function getCellTextValue(value: any): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    if (value.text) return String(value.text);
    if (value.label) return String(value.label);
    if (Array.isArray(value)) return value.join(', ');
  }
  return String(value);
}

/** Flatten hierarchical rows into a renderable list */
function flattenRows(
  rows: DataGridRow[],
  expandedSet: Set<string>,
  depth: number = 0
): FlatRow[] {
  const result: FlatRow[] = [];
  for (const row of rows) {
    const hasChildren = !!(row.children && row.children.length > 0);
    const isExpanded = expandedSet.has(row.id);
    result.push({ row, depth, hasChildren, isExpanded });
    if (hasChildren && isExpanded) {
      result.push(...flattenRows(row.children!, expandedSet, depth + 1));
    }
  }
  return result;
}

/** Collect all row IDs recursively */
function collectAllIds(rows: DataGridRow[]): string[] {
  const ids: string[] = [];
  for (const row of rows) {
    ids.push(row.id);
    if (row.children) {
      ids.push(...collectAllIds(row.children));
    }
  }
  return ids;
}

/** Sort rows recursively (for uncontrolled sort) */
function sortRowsRecursive(
  rows: DataGridRow[],
  columnKey: string,
  direction: 'asc' | 'desc'
): DataGridRow[] {
  const sorted = [...rows].sort((a, b) => {
    const aVal = getCellTextValue(a[columnKey]);
    const bVal = getCellTextValue(b[columnKey]);
    const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
    return direction === 'asc' ? cmp : -cmp;
  });
  return sorted.map(row => ({
    ...row,
    children: row.children
      ? sortRowsRecursive(row.children, columnKey, direction)
      : undefined,
  }));
}

/* ===========================================
   DataGrid Component
   =========================================== */

export function DataGrid({
  columns,
  rows,
  selectedIds,
  onSelectionChange,
  sortColumn: sortColumnProp,
  sortDirection: sortDirectionProp,
  onSortChange,
  selectionMode = 'none',
  expandedIds,
  onExpandedChange,
  onRowClick,
  onRowAction,
  className = '',
  ...props
}: DataGridProps) {
  /* --- Expanded state (controlled / uncontrolled) --- */
  const isExpandedControlled = expandedIds !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set());

  const expandedSet = useMemo(
    () => (isExpandedControlled ? new Set(expandedIds) : internalExpanded),
    [isExpandedControlled, expandedIds, internalExpanded]
  );

  const updateExpanded = useCallback(
    (next: Set<string>) => {
      if (isExpandedControlled) {
        onExpandedChange?.(Array.from(next));
      } else {
        setInternalExpanded(next);
      }
    },
    [isExpandedControlled, onExpandedChange]
  );

  const toggleExpanded = useCallback(
    (rowId: string) => {
      const next = new Set(expandedSet);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      updateExpanded(next);
    },
    [expandedSet, updateExpanded]
  );

  /* --- Sort state (controlled / uncontrolled) --- */
  const isSortControlled = sortColumnProp !== undefined;
  const [internalSortCol, setInternalSortCol] = useState<string | undefined>();
  const [internalSortDir, setInternalSortDir] = useState<'asc' | 'desc'>('asc');

  const activeSortCol = isSortControlled ? sortColumnProp : internalSortCol;
  const activeSortDir = isSortControlled ? (sortDirectionProp ?? 'asc') : internalSortDir;

  const handleSort = useCallback(
    (columnKey: string) => {
      const newDir =
        activeSortCol === columnKey && activeSortDir === 'asc' ? 'desc' : 'asc';
      if (isSortControlled) {
        onSortChange?.(columnKey, newDir);
      } else {
        setInternalSortCol(columnKey);
        setInternalSortDir(newDir);
        onSortChange?.(columnKey, newDir);
      }
    },
    [activeSortCol, activeSortDir, isSortControlled, onSortChange]
  );

  /* --- Sorted rows --- */
  const sortedRows = useMemo(() => {
    if (isSortControlled || !activeSortCol) return rows;
    return sortRowsRecursive(rows, activeSortCol, activeSortDir);
  }, [rows, isSortControlled, activeSortCol, activeSortDir]);

  /* --- Flatten tree --- */
  const flatRows = useMemo(
    () => flattenRows(sortedRows, expandedSet),
    [sortedRows, expandedSet]
  );

  /* --- Selection state (controlled / uncontrolled) --- */
  const isSelectionControlled = selectedIds !== undefined;
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());

  const selectedSet = useMemo(
    () => (isSelectionControlled ? new Set(selectedIds) : internalSelected),
    [isSelectionControlled, selectedIds, internalSelected]
  );

  const updateSelection = useCallback(
    (ids: string[]) => {
      if (isSelectionControlled) {
        onSelectionChange?.(ids);
      } else {
        setInternalSelected(new Set(ids));
        onSelectionChange?.(ids);
      }
    },
    [isSelectionControlled, onSelectionChange]
  );

  const visibleIds = useMemo(() => flatRows.map((fr) => fr.row.id), [flatRows]);
  const isAllSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedSet.has(id));
  const isIndeterminate =
    !isAllSelected && visibleIds.some((id) => selectedSet.has(id));

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      updateSelection([]);
    } else {
      updateSelection(visibleIds);
    }
  }, [isAllSelected, visibleIds, updateSelection]);

  const handleRowSelect = useCallback(
    (rowId: string) => {
      if (selectionMode === 'single') {
        updateSelection(selectedSet.has(rowId) ? [] : [rowId]);
      } else {
        const next = new Set(selectedSet);
        if (next.has(rowId)) next.delete(rowId);
        else next.add(rowId);
        updateSelection(Array.from(next));
      }
    },
    [selectionMode, selectedSet, updateSelection]
  );

  /* --- Cell style helper --- */
  const getCellStyle = (column: DataGridColumn): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (column.width) {
      style.flex = `0 0 ${column.width}`;
      style.width = column.width;
    }
    if (column.minWidth) {
      style.minWidth = column.minWidth;
    }
    return style;
  };

  /* --- Cell content renderer --- */
  const renderCellContent = (column: DataGridColumn, value: any) => {
    const type = column.type || 'text';

    switch (type) {
      case 'link': {
        const text = typeof value === 'object' ? value?.text : String(value ?? '');
        const href = typeof value === 'object' ? value?.href : undefined;
        const onClick = typeof value === 'object' ? value?.onClick : undefined;
        return (
          <a
            className="ap-datagrid__link"
            href={href || '#'}
            onClick={(e) => {
              if (!href || onClick) e.preventDefault();
              onClick?.();
            }}
          >
            {text}
          </a>
        );
      }

      case 'icon-text': {
        const icon = typeof value === 'object' ? value?.icon : null;
        const text = typeof value === 'object' ? value?.text : String(value ?? '');
        const size = column.iconSize;
        const iconStyle = size ? { width: size, height: size } : undefined;
        return (
          <>
            {icon && (
              <span className="ap-datagrid__cell-icon" style={iconStyle}>
                {icon}
              </span>
            )}
            <span className="ap-datagrid__cell-text">{text}</span>
          </>
        );
      }

      case 'tag': {
        const items: Array<{ label: string; value: string }> = Array.isArray(value)
          ? value.map((v: any) =>
              typeof v === 'object' && v.label
                ? { label: v.label, value: v.value ?? '' }
                : { label: String(v), value: '' }
            )
          : value
            ? [
                typeof value === 'object' && value.label
                  ? { label: value.label, value: value.value ?? '' }
                  : { label: String(value), value: '' },
              ]
            : [];
        return (
          <span className="ap-datagrid__tags">
            {items.map((tag, i) => (
              <Tag
                key={i}
                label={tag.label}
                value={tag.value}
                onClick={(e) => e.stopPropagation()}
              />
            ))}
          </span>
        );
      }

      case 'progress': {
        const current = typeof value === 'object' ? (value?.current ?? 0) : 0;
        const total = typeof value === 'object' ? (value?.total ?? 1) : 1;
        const thresholds = typeof value === 'object' ? value?.thresholds : undefined;
        const pct = total > 0 ? Math.round((current / total) * 100) : 0;

        let barColorClass = '';
        if (thresholds) {
          if (pct >= thresholds.warning) barColorClass = 'ap-datagrid__progress-bar--success';
          else if (pct >= thresholds.critical) barColorClass = 'ap-datagrid__progress-bar--warning';
          else barColorClass = 'ap-datagrid__progress-bar--error';
        }

        return (
          <div className="ap-datagrid__progress">
            <span className="ap-datagrid__progress-text">
              {pct}% ({current} out of {total})
            </span>
            <div className="ap-datagrid__progress-track">
              <div
                className={`ap-datagrid__progress-bar ${barColorClass}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      }

      case 'action': {
        // Action columns render via the row-level onRowAction;
        // individual overrides supported through cell value
        return null; // handled in renderCell
      }

      default:
        return (
          <span className="ap-datagrid__cell-text">
            {String(value ?? '')}
          </span>
        );
    }
  };

  /* --- Full cell renderer (wraps content + tree controls) --- */
  const renderCell = (
    column: DataGridColumn,
    row: DataGridRow,
    depth: number,
    hasChildren: boolean,
    isExpanded: boolean
  ) => {
    const value = row[column.key];
    const isTree = column.isTreeColumn;
    const isAction = column.type === 'action';

    /* Action column */
    if (isAction) {
      const customIcon =
        typeof value === 'object' && value?.icon ? value.icon : <EllipsisIcon />;
      const customLabel =
        typeof value === 'object' && value?.label
          ? value.label
          : 'More actions';
      const customOnClick =
        typeof value === 'object' && value?.onClick ? value.onClick : undefined;

      return (
        <div
          className="ap-datagrid__cell ap-datagrid__cell--action"
          role="gridcell"
          style={getCellStyle(column)}
        >
          <button
            type="button"
            className="ap-datagrid__action-btn"
            aria-label={customLabel}
            onClick={(e) => {
              e.stopPropagation();
              if (customOnClick) customOnClick();
              else onRowAction?.(row);
            }}
          >
            {customIcon}
          </button>
        </div>
      );
    }

    return (
      <div
        className={`ap-datagrid__cell ap-datagrid__cell--${column.type || 'text'}`}
        role="gridcell"
        style={getCellStyle(column)}
      >
        {/* Tree indentation */}
        {isTree && depth > 0 && (
          <span
            className="ap-datagrid__tree-indent"
            style={{ width: depth * 24 }}
          />
        )}

        {/* Expand / collapse toggle */}
        {isTree && hasChildren && (
          <button
            type="button"
            className="ap-datagrid__tree-toggle"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded(row.id);
            }}
            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
          >
            {isExpanded ? <TreeExpandedIcon /> : <TreeCollapsedIcon />}
          </button>
        )}

        {/* Leaf spacer (keeps text aligned when siblings have toggles) */}
        {isTree && !hasChildren && (
          <span className="ap-datagrid__tree-leaf-spacer" />
        )}

        {renderCellContent(column, value)}
      </div>
    );
  };

  /* --- Render --- */
  const classNames = ['ap-datagrid', className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="grid" {...props}>
      {/* Header */}
      <div className="ap-datagrid__header" role="row">
        {selectionMode === 'multiple' && (
          <div
            className="ap-datagrid__header-cell ap-datagrid__header-cell--checkbox"
            role="columnheader"
          >
            <Checkbox
              checked={isAllSelected || isIndeterminate}
              indeterminate={isIndeterminate}
              onChange={handleSelectAll}
              aria-label="Select all rows"
            />
          </div>
        )}

        {columns.map((col) => {
          const isSorted = activeSortCol === col.key;
          const headerClasses = [
            'ap-datagrid__header-cell',
            col.type === 'action' && 'ap-datagrid__header-cell--action',
            col.sortable && 'ap-datagrid__header-cell--sortable',
            isSorted && 'ap-datagrid__header-cell--sorted',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              key={col.key}
              className={headerClasses}
              role="columnheader"
              style={getCellStyle(col)}
              aria-sort={
                isSorted
                  ? activeSortDir === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
            >
              <span className="ap-datagrid__header-label">{col.label}</span>
              {col.sortable && (
                <span className="ap-datagrid__sort-icon">
                  {isSorted && activeSortDir === 'asc' ? (
                    <SortedAscIcon />
                  ) : isSorted && activeSortDir === 'desc' ? (
                    <SortedDescIcon />
                  ) : (
                    <UnsortedIcon />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div className="ap-datagrid__body">
        {flatRows.map(({ row, depth, hasChildren, isExpanded }) => {
          const isSelected = selectedSet.has(row.id);
          const rowClasses = [
            'ap-datagrid__row',
            isSelected && 'ap-datagrid__row--selected',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              key={row.id}
              className={rowClasses}
              role="row"
              aria-selected={selectionMode !== 'none' ? isSelected : undefined}
              tabIndex={0}
              onClick={() => {
                if (selectionMode !== 'none') handleRowSelect(row.id);
                onRowClick?.(row);
              }}
            >
              {selectionMode === 'multiple' && (
                <div
                  className="ap-datagrid__cell ap-datagrid__cell--checkbox"
                  role="gridcell"
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleRowSelect(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select row ${row.id}`}
                  />
                </div>
              )}

              {columns.map((col) => (
                <React.Fragment key={col.key}>
                  {renderCell(col, row, depth, hasChildren, isExpanded)}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
