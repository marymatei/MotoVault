# MotoVault

MotoVault is a specialized inventory management system for motorcycle dealerships and gear shops. It tracks vehicle and equipment availability, logs sales status, and categorizes products by type and riding discipline.

## Data model

| Field | Type | Notes |
| :--- | :--- | :--- |
| name | text | required, item make and model, max 100 chars |
| isSold | boolean | toggled from the list, default false (Available vs Sold) |
| itemType | fixed values | Motorcycle, Gear, Accessory |
| category | relation | Naked, Sport, Touring, Protective |
| user | relation | store manager / inventory operator (from week 11) |

Sample data used across all stages:
1. Honda CB600F Hornet, active, Motorcycle
2. Casca Integrala AGV K6 S, done, Gear
3. Yamaha MT-07, active, Motorcycle

## Stages summary

- **Stage 1 (Static mockup)**: Semantic HTML structure and custom dark theme CSS layout on 2 columns.
- **Stage 2 (Data logic)**: Plain JavaScript, no DOM. `mockup/produse.js` holds the array and immutable functions (add, filter, toggle, count). Results printed in the browser console (F12).
- **Stage 3 (Vite and React project)**: Migrated to Vite + React inside `frontend/`. Data moved to `App.jsx`, counters computed dynamically, and the inventory list is printed raw as JSON per assignment requirements.
- **Stage 4 (React components)**: Decomposed interface into reusable React components (`ProdusList` and `ProdusCard`) driven by props, `.map()` iteration with unique keys, and conditional empty state handling.
- **Stage 5 (Local state and events)**: Maintained inventory state using `useState` in `App.jsx`, added interactive toggle and delete handlers, derived counters, and implemented a Light/Dark mode switcher via CSS data attributes.

## How to run

- **Stages 1 & 2**: Open `mockup/index.html` in a browser. No build step, no server.
- **Stages 3–5**: Run the following commands in the terminal:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
  Then open the address printed in the terminal (http://localhost:5173).

## AI usage

| Tool | Used for |
| :--- | :--- |
| Gemini | Architecture mapping, Vite & React setup, component decomposition, React state management, Light/Dark theme implementation |
| Claude | SVG logo and vector branding generation |

Details per stage: see the `ai_log/` folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: React components
- [x] Stage 5: local state and events

## Verification Table - Stage 1

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S1-R1 | README: description, fields, sample data, how to run | README.md | read |
| S1-R2 | AI usage section | README.md | read |
| S1-R3 | AI log for stage 1 | ai_log/etapa_1.md | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L63](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/index.html#L10-L63) | open the page |
| S1-R5 | finished card looks different | [style.css#L169-L172](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/style.css#L169-L172) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L186-L190](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/style.css#L186-L190) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L181-L201](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/style.css#L181-L201) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [Commit Stage 1](https://github.com/marymatei/MotoVault/commit/700b6225eb8f23017ded086cc6925a7791773933) | commit history |

## Verification Table - Stage 2

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | [index.html#L62](https://github.com/marymatei/MotoVault/blob/3a709bb/index.html#L62) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [produse.js#L2-L8](https://github.com/marymatei/MotoVault/blob/3a709bb/produse.js#L2-L8) | read |
| S2-R3 | list, count, search, add, toggle, delete | [produse.js#L11-L66](https://github.com/marymatei/MotoVault/blob/3a709bb/produse.js#L11-L66) | console output |
| S2-R4 | add rejects empty name and invalid tag | [produse.js#L34-L44](https://github.com/marymatei/MotoVault/blob/3a709bb/produse.js#L34-L44) | last 2 console lines |
| S2-R5 | original array unchanged after add | [produse.js#L77](https://github.com/marymatei/MotoVault/blob/3a709bb/produse.js#L77) | console line |
| S2-R6 | README Stage 2 section + AI log | README.md, ai_log/etapa_2.md | read |
| S2-R7 | commit "Stage 2" pushed | [Commit Stage 2](https://github.com/marymatei/MotoVault/commit/3a709bb) | commit history |

## Verification Table - Stage 3

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | npm run dev starts without errors | frontend/package.json | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | frontend/src/App.jsx | edit data, save |
| S3-R3 | data from README, not from the example | frontend/src/App.jsx | compare with README |
| S3-R4 | stage 1 styles reused | frontend/src/App.css | look at the page |
| S3-R5 | node_modules ignored, build passes | frontend/.gitignore | npm run build |
| S3-R6 | README Stage 3 section + AI log | README.md, ai_log/etapa_3.md | read |
| S3-R7 | commit "Stage 3" pushed | [Commit Stage 3](https://github.com/marymatei/MotoVault/commit/149e456) | commit history |

## Verification Table - Stage 4

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in src/components/ | frontend/src/components/ | open folder |
| S4-R2 | card receives data through props | frontend/src/components/ProdusCard.jsx#L1 | read |
| S4-R3 | map + key={id}, no console warnings | frontend/src/components/ProdusList.jsx#L11 | F12, Console |
| S4-R4 | message for empty list | frontend/src/components/ProdusList.jsx#L5 | set array to [] |
| S4-R5 | state changes the card look | frontend/src/components/ProdusCard.jsx#L3 | toggle a disponibil flag |
| S4-R6 | README Stage 4 section + AI log | README.md, ai_log/etapa_4.md | read |
| S4-R7 | commit "Stage 4" pushed | [Commit Stage 4](https://github.com/marymatei/MotoVault/commit/718e575) | commit history |

## Verification Table - Stage 5

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | list kept in useState, in App | frontend/src/App.jsx#L14 | read |
| S5-R2 | toggling changes state and card look | frontend/src/App.jsx#L18, frontend/src/components/ProdusCard.jsx#L8 | click a checkbox |
| S5-R3 | delete removes the item | frontend/src/App.jsx#L24, frontend/src/components/ProdusCard.jsx#L34 | click Delete |
| S5-R4 | header counter derived, not in state | frontend/src/App.jsx#L36 | toggle/delete, watch counter |
| S5-R5 | immutable updates (no push, splice, assignment) | frontend/src/App.jsx#L18-L26 | read |
| S5-R6 | light/dark toggle: state + data-theme on html | frontend/src/App.jsx#L28, frontend/src/App.css#L10-L30 | click the button, test both themes |
| S5-R7 | no console warnings; README + AI log | README.md, ai_log/etapa_5.md | F12, Console |
| S5-R8 | commit "Stage 5" pushed | commit history | check git log |