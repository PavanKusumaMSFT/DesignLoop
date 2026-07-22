import { DataGrid } from './v8-data-grid';
import type { DataGridColumn, DataGridRow } from './v8-data-grid';
import type { CopilotCardInstance } from './v8-copilot-types';

import './v8-copilot-card-data-grid.css';

/* ===========================================
   Data Grid Card — Built-in card renderer
   Renders tabular data inside a Copilot message
   Wraps the existing DataGrid component
   =========================================== */

export interface DataGridCardProps {
  card: CopilotCardInstance;
}

/**
 * Expected `card.props`:
 * - `columns: DataGridColumn[]` — column definitions
 * - `rows: DataGridRow[]` — row data
 * - `sortable?: boolean` — enable sorting (default: false)
 * - `maxHeight?: string` — scrollable area height (default: '240px')
 */
export function DataGridCard({ card }: DataGridCardProps) {
  const columns = (card.props.columns as DataGridColumn[]) ?? [];
  const rows = (card.props.rows as DataGridRow[]) ?? [];
  const maxHeight = (card.props.maxHeight as string) ?? '240px';

  return (
    <div className="ap-copilot-datagrid-card">
      <DataGrid
        columns={columns}
        rows={rows}
        selectionMode="none"
        style={{ maxHeight }}
      />
    </div>
  );
}
