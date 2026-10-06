# Stage 2: AI log

## Tools
- Gemini

## Conversations
- Data logic, immutability, and validation for MotoVault inventory

## Key requests

### 1. Data model and array setup
Asked: Help me structure the motorcycle inventory data array and allowed constants based on MotoVault domain.
- Got: Initialized produse array with unique IDs, names, sales status (isSold), and fixed item types (TIPURI).
- Changed or rejected: Kept English schema keys aligned with Stage 1 while providing console feedback matching lab guidelines.

### 2. Immutable operations and validation logic
Asked: Implement pure functions for listing, counting active items, searching, adding with validation, toggling state, and deleting.
- Got: Functions utilizing map, filter, and reduce with spread operator syntax for immutability; safe ID generator using Math.max.
- Changed or rejected: Explicit validation logging for empty strings and invalid tag categories before rejecting state changes.

## What I learned / what did not work
I learned how array immutability ensures data integrity by preventing in-place mutations like .push() or direct property reassignment. I also understood why calculating new IDs via reduce and Math.max prevents key collisions when items are deleted, which is critical for future React rendering.