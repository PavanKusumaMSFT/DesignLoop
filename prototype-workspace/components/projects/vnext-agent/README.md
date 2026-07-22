# vNext Agent - Infinite Canvas Experience

## Overview

The vNext Agent is an infinite canvas experience that guides users through deploying Azure resources with AI assistance. It features smooth transitions, progressive history tracking, and a clean, modern UI built with Fluent UI components.

## Architecture

### Component Structure

```
components/vnext-agent/
├── welcome-canvas.tsx              # State 1: Initial welcome screen
├── service-recommendations.tsx     # State 2: AI-recommended services
├── deployment-plan.tsx             # State 3: Deployment plan details
├── deployment-progress.tsx         # State 4: Live deployment progress
├── deployment-complete.tsx         # State 5: Success screen
└── shared/
    ├── canvas-header.tsx           # History dropdown + refresh button
    ├── canvas-footer.tsx           # Mic + Chat input buttons
    └── service-card.tsx            # Reusable service card component
```

### Main Orchestrator

**File:** `components/vnext-agent-content.tsx`

This is the main component that:
- Manages state transitions between canvas views
- Handles progressive history tracking
- Coordinates smooth fade animations
- Passes data between components

## User Flow

```
Welcome → Services → Deployment Plan → Deploying → Complete
   ↓         ↓            ↓              ↓           ↓
History builds progressively as user advances
```

### State Management

The orchestrator uses these key states:

```typescript
canvasState: "welcome" | "services" | "deployment" | "deploying" | "complete"
historyItems: string[]  // Progressively builds as user advances
selectedService: string // Tracks which service user selected
```

## How to Edit Components

### 1. Welcome Canvas (`welcome-canvas.tsx`)

**Purpose:** Initial landing page with prompt suggestions

**Key Props:**
- `userName`: Display name for personalized greeting
- `onLinkClick`: Handler for "deploy template" and "suggest services" links
- `onPromptClick`: Handler for prompt button clicks

**To Edit:**
- **Change prompts:** Modify the `prompts` array (line ~100)
- **Update styling:** Edit `useStyles` makeStyles object
- **Adjust spacing:** Modify `promptSection` marginTop/marginBottom

**Example - Add a new prompt:**
```typescript
const prompts = [
  "Help me build an AI agent",
  "Help me import existing code from Github",
  "Help me set up my Azure free account",
  "What can you do?",
  "Your new prompt here"  // Add here
]
```

### 2. Service Recommendations (`service-recommendations.tsx`)

**Purpose:** Display AI-recommended Azure services

**Key Props:**
- `onServiceSelect`: Handler when user clicks a service action

**To Edit:**
- **Add/modify services:** Edit the `services` array (line ~41)
- **Change service icons:** Update `icon` path to `/icons/your-icon.svg`
- **Modify features:** Edit the `features` array for each service
- **Add actions:** Update the `actions` array

**Example - Add a new service:**
```typescript
{
  icon: "/icons/your-service.svg",
  iconBgColor: "rgba(59, 130, 246, 0.1)",
  title: "Your Service Name",
  description: "Service description here",
  badge: "Recommended", // Optional
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  actions: [
    { label: "Deploy this service", action: "deploy" },
    { label: "Learn more", action: "learn" }
  ]
}
```

### 3. Deployment Plan (`deployment-plan.tsx`)

**Purpose:** Show deployment steps and configuration

**Key Props:**
- `serviceName`: Name of selected service
- `onDeploy`: Handler for "Approve and deploy" button
- `onCancel`: Handler for secondary actions

**To Edit:**
- **Modify plan details:** Edit `planDetails` grid items (line ~160)
- **Change steps:** Update the `steps` array (line ~130)
- **Add/remove actions:** Modify the actions section (line ~190)

**Example - Add a deployment step:**
```typescript
const steps = [
  {
    title: "Your new step title",
    description: "Detailed description of what this step does..."
  },
  // ... existing steps
]
```

### 4. Deployment Progress (`deployment-progress.tsx`)

**Purpose:** Animated progress through deployment steps

**Key Props:**
- `serviceName`: Name of service being deployed
- `onComplete`: Handler called when all steps complete

**To Edit:**
- **Adjust timing:** Change the `setTimeout` duration (line ~100) - default 2000ms per step
- **Modify steps:** Edit the `steps` array to match deployment-plan steps
- **Change animation:** Modify the `pulse` keyframe animation

**Example - Change step duration:**
```typescript
const timer = setTimeout(() => {
  setCurrentStep(currentStep + 1)
}, 3000) // Change from 2000ms to 3000ms (3 seconds per step)
```

### 5. Deployment Complete (`deployment-complete.tsx`)

**Purpose:** Success screen with resource details

**Key Props:**
- `serviceName`: Name of deployed service
- `resourceName`: Generated resource name
- `onPromptClick`: Handler for "What's next" prompts

**To Edit:**
- **Update resource details:** Modify the `resourceDetails` grid (line ~150)
- **Change next prompts:** Edit the `prompts` array (line ~120)
- **Modify resource icon:** Update the icon path

## Styling Guidelines

### Design System

All components use consistent styling:

- **Border Radius:** 18-20px for cards, 12px for inner elements
- **Shadows:** Dramatic, layered shadows for depth
  - Cards: `0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)`
  - Hover: `0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08)`
- **Font Sizes:**
  - Headings: 28px (regular weight)
  - Subheadings: 20px
  - Body: 13-14px
  - Labels: 12px
- **Colors:** Use Fluent UI tokens (`tokens.colorNeutralForeground1`, etc.)
- **Transitions:** `all 0.2s` for smooth interactions

### Hover States

- **Links:** Light blue background (`rgba(59, 130, 246, 0.04)`) + dashed underline
- **Buttons:** Lift effect (`translateY(-1px)`) + enhanced shadow
- **Cards:** Content section gets light blue background on hover

## Adding a New State

To add a new canvas state to the flow:

### 1. Create the Component

Create a new file in `components/vnext-agent/your-state.tsx`:

```typescript
"use client"

import { makeStyles, tokens } from "@fluentui/react-components"

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "20px 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  // ... your styles
})

interface YourStateProps {
  // Define your props
}

export default function YourState({ /* props */ }: YourStateProps) {
  const styles = useStyles()
  
  return (
    <div className={styles.container}>
      {/* Your content */}
    </div>
  )
}
```

### 2. Update the Orchestrator

In `vnext-agent-content.tsx`:

**a. Import your component:**
```typescript
import YourState from "./vnext-agent/your-state"
```

**b. Add to state type:**
```typescript
const [canvasState, setCanvasState] = useState<
  "welcome" | "services" | "deployment" | "deploying" | "complete" | "your-state"
>("welcome")
```

**c. Add transition handler:**
```typescript
const handleYourTransition = () => {
  setIsTransitioning(true)
  setTimeout(() => {
    setCanvasState("your-state")
    setSelectedHistory("Your State Name")
    if (!historyItems.includes("Your State Name")) {
      setHistoryItems([...historyItems, "Your State Name"])
    }
    setIsTransitioning(false)
  }, 300)
}
```

**d. Add to render logic:**
```typescript
{canvasState === "your-state" && (
  <YourState
    // Pass your props
  />
)}
```

**e. Update history navigation:**
```typescript
const handleHistoryChange = (value: string) => {
  // ... existing code
  } else if (value === "Your State Name") {
    setCanvasState("your-state")
  }
  // ...
}
```

## Animation System

### Fade Transitions

All state changes use a fade-in-up animation:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Duration:** 0.6s ease-out

### Transition Flow

1. Set `isTransitioning = true`
2. Wait 300ms (fade out)
3. Change state
4. Set `isTransitioning = false`
5. New content fades in (600ms)

## Progressive History

The history dropdown builds progressively as users advance:

```typescript
// Initial state
historyItems: ["Welcome, Connie"]

// After clicking "suggest services"
historyItems: ["Welcome, Connie", "Suggest services"]

// After selecting a service
historyItems: ["Welcome, Connie", "Suggest services", "App Service deployment plan"]

// And so on...
```

Users can click any history item to navigate back to that state.

## Common Tasks

### Change the User Name

In `vnext-agent-content.tsx`, update the `WelcomeCanvas` component:

```typescript
<WelcomeCanvas
  userName="Your Name Here"  // Change this
  onLinkClick={handleLinkClick}
  onPromptClick={handlePromptClick}
/>
```

### Modify Card Width

In the respective component, update `maxWidth`:

```typescript
planCard: {
  // ...
  maxWidth: "900px",  // Adjust this value
}
```

### Change Animation Speed

In `deployment-progress.tsx`:

```typescript
const timer = setTimeout(() => {
  setCurrentStep(currentStep + 1)
}, 2000) // Change this duration (milliseconds)
```

### Update Service Icons

1. Add your SVG icon to `/public/icons/`
2. Update the service object:

```typescript
{
  icon: "/icons/your-new-icon.svg",
  // ...
}
```

## Best Practices

1. **Maintain Consistency:** Follow existing patterns for styling and structure
2. **Use Fluent UI Tokens:** Always use design tokens instead of hard-coded colors
3. **Smooth Transitions:** Keep the 300ms transition timing for state changes
4. **Progressive History:** Always add to history when advancing, never remove
5. **Accessibility:** Include aria-labels for icon buttons
6. **Responsive Design:** Test on different screen sizes
7. **Type Safety:** Define proper TypeScript interfaces for all props

## Troubleshooting

### Transitions Not Working

- Check that `isTransitioning` is properly set/unset
- Verify the 300ms timeout matches your CSS transition duration

### History Not Building

- Ensure you're checking `if (!historyItems.includes(...))` before adding
- Verify `setHistoryItems([...historyItems, "New Item"])` syntax

### Styling Issues

- Check that you're using `makeStyles` from Fluent UI
- Verify all token references are correct
- Ensure className is applied to the element

### State Not Changing

- Verify the state name matches exactly in the type definition
- Check that the handler is properly connected
- Look for typos in state comparison strings

## Future Enhancements

Potential areas for expansion:

- Add error states for failed deployments
- Implement real-time cost estimation
- Add more service types
- Create branching paths based on user choices
- Add voice input functionality
- Implement chat interface
- Add resource monitoring dashboard

## Questions?

For questions or issues, refer to:
- Fluent UI Documentation: https://react.fluentui.dev/
- Azure Portal Design System
- Team design guidelines
