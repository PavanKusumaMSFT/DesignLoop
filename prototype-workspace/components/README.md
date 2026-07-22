# Component Organization

Three buckets — keep it simple.

## Structure

```
components/
  shared/          ← anything reusable (cards, panels, shells, widgets, icons)
  projects/        ← one folder per project, organized by project name
    search-p0/
    fre-short-term/
    fy27-1h/
  agents/          ← cross-project intelligent assistants
    index.tsx
```

## Rules

1. **Building something others might use?** → put it in `shared/`
2. **Building your project?** → put it in `projects/<your-project>/`
3. **Building a cross-project agent?** → add/update cards in `agents/index.tsx`
4. **Need something from someone else?** → look in `shared/`

That's it. The project registry (`data/projects.ts`) handles all the organizational metadata — team, experience area, timeframe, pillars. The folder structure doesn't need to repeat it.

## Adding a new project

Use the Create Project form on `/workspace` or run:
```bash
git checkout -b <team>/<project-name> && pnpm create-project "<id>" --team "<name>" --horizon "<horizon>"
```
