# Stage 4: AI log

## Tools
- Gemini

## Conversations
- React component decomposition, props data flow, list rendering with map and unique key attributes, and conditional empty state rendering.

## Key requests

### 1. Component structure setup
Asked: Help me create a `components/` directory in `frontend/src/` and decompose the application into single-responsibility components according to course guidelines.
- Got: Created `ProdusCard.jsx` for individual item presentation and `ProdusList.jsx` for array iteration and empty state checks.
- Changed or rejected: Named components after the domain entity (`ProdusCard`, `ProdusList`) while maintaining props destructured as `{ produs }` and `{ produse }`.

### 2. Props data flow and list rendering
Asked: Implement props passing from `App.jsx` down to `ProdusList` and `ProdusCard`, ensuring correct list rendering with `.map()` and the `key={produs.id}` attribute.
- Got: Structured `ProdusList` to receive the `produse` array, perform an early check for empty arrays returning a fallback `<p className="empty">`, and render `ProdusCard` components with `key={produs.id}`.
- Changed or rejected: Used `produs.id` as key instead of index to prevent state and rendering bugs in future stages.

### 3. Conditional styling for item status
Asked: Ensure unavailable or sold items visually adapt based on the `disponibil` boolean property.
- Got: Applied dynamic className `produs.disponibil ? "item-card" : "item-card sold"` inside `ProdusCard.jsx` to leverage the Stage 1 dark mode opacity and strikethrough styles.

## What I learned / what did not work
I learned how React passes read-only data downward via props, how array mapping requires stable `key` attributes on top-level returned JSX elements to avoid console warnings, and how early return patterns simplify conditional rendering for empty lists. Tested empty state and console output with zero React warnings.