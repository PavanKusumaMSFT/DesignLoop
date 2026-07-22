import type { CopilotCardRenderer } from './v8-copilot-types';
import { CodeCard, CodeCardHeaderActions } from './v8-copilot-card-code';
import { DataGridCard } from './v8-copilot-card-data-grid';
import { ResourceCard, ResourceCardHeaderActions } from './v8-copilot-card-resource';

/* ===========================================
   Default Card Registry
   Bundles all built-in card renderers so
   consumers can use:
     <CopilotProvider cardRegistry={defaultCardRegistry}>
   instead of wiring each card manually.
   =========================================== */

export const defaultCardRegistry: Record<string, CopilotCardRenderer> = {
  code: {
    component: CodeCard,
    headerActions: CodeCardHeaderActions,
    label: 'Code block',
  },
  'data-grid': {
    component: DataGridCard,
    hideHeader: true,
    label: 'Data grid',
  },
  resource: {
    component: ResourceCard,
    headerActions: ResourceCardHeaderActions,
    label: 'Azure resource',
  },
};
