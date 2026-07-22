# P1 Header Components - Isolated for Search Updates

## Overview
These components are P1-specific versions that can be modified without affecting other pages.

## Created Components

### 1. `azure-header-p1.tsx`
**Main header component for P1**
- Always-expanded search field
- No navigation menu items (Home, Discover, Build, Manage removed)
- Uses P1-specific sub-components

### 2. `search-suggestion-panel-p1.tsx`
**P1-specific search suggestions panel**
- Used for search suggestions in P1 header
- Can be modified independently
- Handles general search suggestions

## What's Safe to Modify

✅ **Fully isolated - modify freely:**
- `azure-header-p1.tsx` - All styles and layout
- `search-suggestion-panel-p1.tsx` - All styles and functionality

✅ **Shared but safe (only used by P1):**
- `CopilotSVGIcon` - Currently shared, but only P1 uses it in this context

❌ **Still shared - be careful:**
- `useNavigation` hook - Used across the app
- Fluent UI components - System-wide
- Token system - Global design tokens

## Preview Page

**Location:** `/app/copilotsearchsandbox/p1-header/page.tsx`

**URL:** http://localhost:3000/copilotsearchsandbox/p1-header

## Shared Components (Used Across App)

These are used by multiple pages - modify with caution:
- `TopNav.tsx` - Used by sitemap POC and other pages
- `CopilotSVGIcon.tsx` - Used by multiple components

## Usage Example

```typescript
import { AzureHeaderP1 } from "../components/azure-header-p1"

<AzureHeaderP1 activeLink="Home" />
```

## Next Steps

1. Modify P1 components as needed for search updates
2. Test on preview page: `/copilotsearchsandbox/p1-header`
3. Changes won't affect sitemap POC or other pages
4. Commit to `search-updates` branch when ready

## File Structure

```
components/
├── azure-header-p1.tsx                    ← Main P1 header
├── search-suggestion-panel-p1.tsx         ← P1 suggestions
├── TopNav.tsx                             ← Shared (used by sitemap POC)
└── CopilotSVGIcon.tsx                     ← Shared icon component
```

## Notes

- P1 components have "P1" or "p1" suffix to avoid confusion
- Shared components (TopNav, CopilotSVGIcon) used across multiple pages
- Preview page isolated in copilotsearchsandbox
- Safe to experiment and iterate on P1-specific components
