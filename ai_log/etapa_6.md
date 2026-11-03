# Stage 6: AI log

## Tools
- Gemini
- Claude

## Conversations
- Stage 6 requirement analysis, mock API integration, package.json syntax fix, UI preservation, and useEffect implementation.

## Key requests
### 1. Mock API & useEffect Integration
Asked: How to setup json-server, fix package.json syntax error, fetch products via api.js using useEffect, handle loading/error UI states, and preserve MotoVault landing page structure.
- Got: Step-by-step setup for json-server, api.js helper, useEffect cleanup flag logic, and error/loading styles while keeping custom UI.
Changed or rejected: Adapted dataset to MotoVault products ('produse', 'disponibil').

## What I learned / what did not work
Learned how to create a mock REST server using json-server, fetch data asynchronously with res.ok validation, handle loading, error, and success states in React, and use a cleanup flag in useEffect to avoid double state updates during development.