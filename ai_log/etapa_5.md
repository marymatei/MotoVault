# Stage 5: AI log

## Tools
- Gemini

## Conversations
- React local state management with useState, handler functions for immutable state updates, event propagation via props, controlled form components (checkboxes), accessible action buttons, and dynamic theme switching using CSS data attributes.

## Key requests

### 1. Local state setup & immutable handlers
Asked: Help me convert static data into React state inside `App.jsx` and implement immutable handlers (`handleToggle` and `handleDelete`) using functional updates (`setProduse(prev => ...)`).
- Got: Initialized `produse` state with `PRODUSE_INITIALE`. Implemented `handleToggle` using `.map()` with object spread, and `handleDelete` using `.filter()`.
- Changed or rejected: Ensured no direct mutation (`push`, `splice`, or direct property assignment) was performed on state.

### 2. Event propagation and controlled checkbox
Asked: Pass action handlers down to `ProdusList` and `ProdusCard`. Add a controlled checkbox and an accessible delete button to each card.
- Got: Added `onToggle` and `onDelete` props to `ProdusList` and `ProdusCard`. Created controlled `input[type="checkbox"]` with `checked={produs.disponibil}` and `onChange={() => onToggle(produs.id)}`. Added `<button className="btn-danger">` with `aria-label={`Delete ${produs.nume}`}`.
- Changed or rejected: Used arrow function wrappers (`() => onDelete(produs.id)`) to prevent immediate invocation during render.

### 3. Derived state counters
Asked: Keep header counters updated dynamically when items are toggled or deleted without creating separate state variables.
- Got: Calculated `total`, `disponibile`, and `indisponibile` directly from `produse` before `return`.

### 4. Light/Dark theme toggle
Asked: Implement a light/dark mode switch using state and the `data-theme` attribute on the `<html>` element.
- Got: Added `tema` state initialized with `temaInitiala` function. Implemented `handleTema` to toggle `tema` state and update `document.documentElement.dataset.theme`. Configured CSS variables and `@media (prefers-color-scheme: dark)` rules with `:root:not([data-theme="light"])`.

## What I learned / what did not work
I learned how state lifting keeps a single source of truth in `App.jsx`, how functional state updates prevent stale state bugs, why controlled checkboxes require `onChange`, how derived state simplifies counters without extra state synchronization, and how setting `data-theme` on `<html>` cleanly controls dark/light CSS variables. Tested toggling, deleting, empty state fallback, theme switching, and confirmed zero console warnings.