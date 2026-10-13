# Stage 3: AI log

## Tools
- Gemini
- Claude (for visual asset and SVG logo generation)

## Conversations
- Vite and React setup, legacy static file archiving, dark mode style migration, and dynamic JSX header counter calculation.

## Key requests

### 1. Project initialization and boilerplate cleanup
Asked: Help me isolate Stage 1 & 2 files into a mockup folder, initialize a clean Vite + React app inside `frontend/`, and remove default demo boilerplate assets and styles.
- Got: Step-by-step guidance to move files to `mockup/`, run `npm create vite@latest frontend -- --template react`, install dependencies via `npm install`, and delete unused Vite demo files (`assets/`, `index.css`, `favicon.svg`).
- Changed or rejected: Manually answered CLI setup prompts with "No" to control dependency installation and execution step-by-step as required by the course guidelines.

### 2. Style reuse and single-column layout adaptation
Asked: Adapt our custom dark theme styling and automotive color palette from `mockup/style.css` into `frontend/src/App.css` while setting the layout to a single column for Stage 3.
- Got: Transferred the entire glassmorphic design and CSS variables to `App.css`, updating the `main` container to `grid-template-columns: 1fr` and adding dark styling rules for the `<pre>` JSON display block.
- Changed or rejected: Preserved the custom neon chartreuse accent (`#d4ff32`) and header visual hierarchy while temporarily hiding 2-column form elements until future stages.

### 3. Component data binding and computed summary
Asked: Set up `App.jsx` with the MotoVault product dataset, dynamically calculate total and available stock counts, and print the raw data container as formatted JSON.
- Got: Clean React component computing active products via `.filter((p) => p.disponibil).length`, rendering live counts in the header, and displaying `<pre>{JSON.stringify(produse, null, 2)}</pre>`.
- Changed or rejected: Kept domain-specific product fields (`id`, `nume`, `categorie`, `disponibil`) matching the MotoVault specifications rather than generic boilerplate task models.

## What I learned / what did not work
I learned how Vite bootstraps a React application, how JSX requires attributes like `className` instead of `class`, and how dynamic counters update directly from in-memory arrays. An initial Vite import-analysis error occurred when default assets were removed while `App.jsx` still held demo imports; this was resolved by replacing `App.jsx` and `main.jsx` with our clean component code. Verified production stability via `npm run build`.