---
tool: wireframe-spec
---

# Verification: Wireframe Spec

## Dimensions

```yaml
dimensions:
  state-coverage:
    weight: 30
    threshold: 75
    failure_instruction: "Every interactive screen must document all required states:
      Default, Empty State, Error State, Loading State, and Success/Confirmation State.
      A wireframe spec that only covers the happy path default state is incomplete and
      cannot be used for implementation. For each state, include: what triggers it,
      what content is shown, what actions are available, and which Fluent component
      communicates the state."

  fluent-region-mapping:
    weight: 35
    threshold: 75
    failure_instruction: "Every layout region and inventory element must include a
      component-map.json pattern match, existing shared component, or exact Fluent UI
      primitive. Examples: header → page-header-bar → AzureHeaderBuildMVP, page shell →
      ProjectLayout, kpi tile → MetricCard, form field → Field + Input. Add 'No existing
      match' only when a search was performed and document the closest Fluent primitive."

  interaction-precision:
    weight: 20
    threshold: 72
    failure_instruction: "Every interactive element listed in the content inventory must
      have a corresponding interaction note covering: trigger action, immediate response,
      visual state change, Fluent state, and error handling. Specify what the UI does
      while requests are in flight, on success, and on failure."

  requirements-traceability:
    weight: 15
    threshold: 70
    failure_instruction: "Every Must Have functional requirement from requirements-prd.md
      must map to at least one screen in the wireframe index. Add a requirements
      traceability table listing each FR-N and which screen(s) implement it."

accept_threshold: 76
```

## What the Verifier Checks

1. Screen inventory index exists with all screens listed
2. Every interactive screen covers all 5 states (Default, Empty, Error, Loading, Success)
3. Every layout region has a component-map/shared component/Fluent primitive annotation
4. Every interactive element has a complete interaction note (trigger + response + state change + Fluent state + error)
5. Every Must Have requirement from the PRD maps to a screen
6. Every screen has 3–8 annotation notes (A-N)
7. Responsive behaviour documented for each layout region

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Screens missing states (list by screen ID and missing state)
- Regions or elements missing Fluent/shared component mapping
- Interactive elements without interaction notes (list by screen and element)
- PRD requirements with no screen mapping (list by FR-N)
- The best output produced so far
