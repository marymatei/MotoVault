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
- **Stage 2 (Data logic)**: Plain JavaScript, no DOM. `mockup/products.js` holds the array and immutable functions (add, filter, toggle, count). Results printed in the browser console (F12).
- **Stage 3 (Vite and React project)**: Migrated to Vite + React inside `frontend/`. Data moved to `App.jsx`, counters computed dynamically, and the inventory list is printed raw as JSON per assignment requirements.
- **Stage 4 (React components)**: Decomposed interface into reusable React components (`ProdusList` and `ProdusCard`) driven by props, `.map()` iteration with unique keys, and conditional empty state handling.
- **Stage 5 (Local state and events)**: Maintained inventory state using `useState` in `App.jsx`, added interactive toggle and delete handlers, derived counters, and implemented a Light/Dark mode switcher via CSS data attributes.
- **Stage 6 (Mock API)**: Served list from `db.json` via `json-server`. Fetched data asynchronously on load with `useEffect` using a cleanup flag, and handled loading and error states.

## How to run

- **Stages 1 & 2**: Open `mockup/index.html` in a browser. No build step, no server.
- **Stages 3–5**: Run the following commands in the terminal:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
  Then open the address printed in the terminal (http://localhost:5173)
  - **Stage 6**: Open two separate terminals in `frontend/`:
  # Terminal 1 (API Server)
  ```bash
  npm run api
  ```
  # Terminal 2 (Vite Frontend)
  ```bash
  npm run dev
  ```
  Then open http://localhost:5173

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
- [x] Stage 6: data from a mock API
- [ ] Stage 7: form and validation

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
| S2-R2 | 3+ items with id, name, state, tag | [products.js#L2-L8](https://github.com/marymatei/MotoVault/blob/3a709bb/products.js#L2-L8) | read |
| S2-R3 | list, count, search, add, toggle, delete | [products.js#L11-L66](https://github.com/marymatei/MotoVault/blob/3a709bb/products.js#L11-L66) | console output |
| S2-R4 | add rejects empty name and invalid tag | [products.js#L34-L44](https://github.com/marymatei/MotoVault/blob/3a709bb/products.js#L34-L44) | last 2 console lines |
| S2-R5 | original array unchanged after add | [products.js#L77](https://github.com/marymatei/MotoVault/blob/3a709bb/products.js#L77) | console line |
| S2-R6 | README Stage 2 section + AI log | README.md, ai_log/etapa_2.md | read |
| S2-R7 | commit "Stage 2" pushed | [Commit Stage 2](https://github.com/marymatei/MotoVault/commit/3a709bb) | commit history |

## Verification Table - Stage 3

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | npm run dev starts without errors | [`frontend/package.json`](https://github.com/marymatei/MotoVault/blob/main/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx) | edit data, save |
| S3-R3 | data from README, not from the example | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx) | compare with README |
| S3-R4 | stage 1 styles reused | [`App.css`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [`frontend/.gitignore`](https://github.com/marymatei/MotoVault/blob/main/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [`README.md`](https://github.com/marymatei/MotoVault/blob/main/README.md), [`ai_log/etapa_3.md`](https://github.com/marymatei/MotoVault/blob/main/ai_log/etapa_3.md) | read |
| S3-R7 | commit "Stage 3" pushed | [Commit Stage 3](https://github.com/marymatei/MotoVault/commit/149e456) | commit history |

## Verification Table - Stage 4

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in src/components/ | [`src/components/`](https://github.com/marymatei/MotoVault/tree/main/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [`ProdusCard.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/components/ProdusCard.jsx) | read |
| S4-R3 | map + key={id}, no console warnings | [`ProdusList.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/components/ProdusList.jsx) | F12, Console |
| S4-R4 | message for empty list | [`ProdusList.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/components/ProdusList.jsx) | set array to [] |
| S4-R5 | state changes the card look | [`ProdusCard.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/components/ProdusCard.jsx) | toggle a disponibil flag |
| S4-R6 | README Stage 4 section + AI log | [`README.md`](https://github.com/marymatei/MotoVault/blob/main/README.md), [`ai_log/etapa_4.md`](https://github.com/marymatei/MotoVault/blob/main/ai_log/etapa_4.md) | read |
| S4-R7 | commit "Stage 4" pushed | [Commit Stage 4](https://github.com/marymatei/MotoVault/commit/718e575) | commit history |
| S4-R7 | commit "Stage 4" pushed | [Commit Stage 4](https://github.com/marymatei/MotoVault/commit/718e575) | commit history |

## Verification Table - Stage 5

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | list kept in useState, in App | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx) | read |
| S5-R2 | toggling changes state and card look | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx), [`ProdusCard.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/components/ProdusCard.jsx) | click a checkbox |
| S5-R3 | delete removes the item | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx), [`ProdusCard.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/components/ProdusCard.jsx) | click Delete |
| S5-R4 | header counter derived, not in state | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx) | toggle/delete, watch counter |
| S5-R5 | immutable updates (no push, splice, assignment) | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx) | read |
| S5-R6 | light/dark toggle: state + data-theme on html | [`App.jsx`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx), [`App.css`](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.css) | click the button, test both themes |
| S5-R7 | no console warnings; README + AI log | [`README.md`](https://github.com/marymatei/MotoVault/blob/main/README.md), [`ai_log/etapa_5.md`](https://github.com/marymatei/MotoVault/blob/main/ai_log/etapa_5.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [Commit Stage 5](https://github.com/marymatei/MotoVault/commit/a11e33a14456bde13f3806bd6779523a39142e9e) | commit history |

## Verification Table - Stage 6

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S6-R1 | npm run api starts, route shows JSON | [frontend/package.json](https://github.com/marymatei/MotoVault/blob/main/frontend/package.json#L11), [frontend/db.json](https://github.com/marymatei/MotoVault/blob/main/frontend/db.json) | open localhost:3001/products |
| S6-R2 | data no longer in React code | [frontend/src/App.jsx](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx#L12) | read |
| S6-R3 | loading message while waiting | [frontend/src/App.jsx](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx#L106) | -delay 4000 |
| S6-R4 | error message when API is down | [frontend/src/App.jsx](https://github.com/marymatei/MotoVault/blob/main/frontend/src/App.jsx#L107-L111) | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | [frontend/src/api.js](https://github.com/marymatei/MotoVault/blob/main/frontend/src/api.js#L4-L10), [frontend/.env.example](https://github.com/marymatei/MotoVault/blob/main/frontend/.env.example) | search for fetch |
| S6-R6 | README Stage 6 section + AI log | README.md, ai_log/etapa_6.md | read |
| S6-R7 | commit "Stage 6" pushed | [Commit Stage 6](https://github.com/marymatei/MotoVault/commit/9041775) | commit history |