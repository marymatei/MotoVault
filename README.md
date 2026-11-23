# MotoVault

MotoVault is a specialized inventory management system for motorcycle dealerships and gear shops. It tracks vehicle and equipment availability, logs sales status, and categorizes products by type and riding discipline.

## Data model

| Field | Type | Notes |
| :--- | :--- | :--- |
| name | text | required, item make and model, max 100 chars, no duplicates |
| available | boolean | toggled from the list; true = Available, false = Unavailable |
| tag | fixed values | Motorcycle, Gear, Protection, Accessories, Consumables |
| quantity | number | pieces in stock, changed with - / +; 0 makes the item unavailable |
| photo | image | optional; JPG, PNG or WEBP, 200–4000 px, max 3 MB; saved unchanged in db.json |
| category | relation | Naked, Sport, Touring, Protective |
| user | relation | store manager / inventory operator (from week 11) |

Sample data used across all stages:
1. Honda CB600F Hornet, available, Motorcycle
2. AGV K6 S Full Face Helmet, unavailable (sold), Gear
3. Yamaha MT-07, available, Motorcycle

## Stages summary

### Stage 1 (Static mockup)
Semantic HTML structure and custom dark theme CSS layout on 2 columns.
### Stage 2 (Data logic)
Plain JavaScript, no DOM. `mockup/produse.js` holds the array and immutable functions (add, filter, toggle, count). Results printed in the browser console (F12).
### Stage 3 (Vite and React project)
Migrated to Vite + React inside `frontend/`. Data moved to `App.jsx`, counters computed dynamically, and the inventory list is printed raw as JSON per assignment requirements.
### Stage 4 (React components)
Decomposed interface into reusable React components (`ProdusList` and `ProdusCard`) driven by props, `.map()` iteration with unique keys, and conditional empty state handling.
### Stage 5 (Local state and events)
Maintained inventory state using `useState` in `App.jsx`, added interactive toggle and delete handlers, derived counters, and implemented a Light/Dark mode switcher via CSS data attributes.
### Stage 6 (Mock API)
Served list from `db.json` via `json-server`. Fetched data asynchronously on load with `useEffect` using a cleanup flag, and handled loading and error states.
### Stage 7 (Form and validation)
form and validation. Products can be added from the page. The form is controlled and validated,
and every change (add, toggle, delete) goes to the API before it shows up in the list.
### Stage 8 (Routing and detail page)
routing and detail page
Three pages behind React Router: the list, a detail page at `/products/:id`,
and an about page, plus a 404 page. Component styles moved to CSS Modules.



## How to run

- **Stages 1 & 2**: Open `mockup/index.html` in a browser. No build step, no server.
- **Stages 3–5**: Run the following commands in the terminal:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
  Then open the address printed in the terminal (http://localhost:5173)
  - **Stage 6-8**: Open two separate terminals in `frontend/`:
  ### Terminal 1 (API Server)
  ```bash
  npm run api
  ```
  ### Terminal 2 (Vite Frontend)
  ```bash
  npm run dev
  ```
  Then open http://localhost:5173

## AI usage

| Tool | Used for |
| :--- | :--- |
| Gemini | Architecture mapping, Vite & React setup, component decomposition, React state management, Light/Dark theme implementation |
| Claude | SVG logo, vector branding generation, form, validation steps, ideas, routing, stock quantity |

Details per stage: see the [`ai_log/`](ai_log/) folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: React components
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

## Verification Table - Stage 1

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/README.md) | read |
| S1-R2 | AI usage section | [README.md](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/README.md) | read |
| S1-R3 | AI log for stage 1 | [etapa_1.md](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/ai_log/etapa_1.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L63](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/index.html#L10-L63) | open the page |
| S1-R5 | finished card looks different | [style.css#L169-L172](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/style.css#L169-L172) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L186-L190](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/style.css#L186-L190) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L181-L201](https://github.com/marymatei/MotoVault/blob/700b6225eb8f23017ded086cc6925a7791773933/style.css#L181-L201) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [Commit Stage 1](https://github.com/marymatei/MotoVault/commit/700b6225eb8f23017ded086cc6925a7791773933) | commit history |

## Verification Table - Stage 2

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | [index.html#L67](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/index.html#L67) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [produse.js#L2-L8](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/produse.js#L2-L8) | read |
| S2-R3 | list, count, search, add, toggle, delete | [produse.js#L11-L66](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/produse.js#L11-L66) | console output |
| S2-R4 | add rejects empty name and invalid tag | [produse.js#L34-L44](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/produse.js#L34-L44) | last 2 console lines |
| S2-R5 | original array unchanged after add | [produse.js#L77](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/produse.js#L77) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/README.md), [etapa_2.md](https://github.com/marymatei/MotoVault/blob/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf/ai_log/etapa_2.md) | read |
| S2-R7 | commit "Stage 2" pushed | [Commit Stage 2](https://github.com/marymatei/MotoVault/commit/3a709bb9d7c2ee79b1ddd6f540598654f778b3cf) | commit history |

## Verification Table - Stage 3

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | npm run dev starts without errors | [package.json](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx#L7-L18](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/frontend/src/App.jsx#L7-L18) | edit data, save |
| S3-R3 | data from README, not from the example | [App.jsx#L1-L5](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/frontend/src/App.jsx#L1-L5) | compare with README |
| S3-R4 | stage 1 styles reused | [App.css](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [.gitignore](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/README.md), [etapa_3.md](https://github.com/marymatei/MotoVault/blob/149e456e68a0004b366fa0d5453065fb437dfdd8/ai_log/etapa_3.md) | read |
| S3-R7 | commit "Stage 3" pushed | [Commit Stage 3](https://github.com/marymatei/MotoVault/commit/149e456e68a0004b366fa0d5453065fb437dfdd8) | commit history |

## Verification Table - Stage 4

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in src/components/ | [src/components/](https://github.com/marymatei/MotoVault/tree/718e5756ca7443545a452b13e3f607822dd8709e/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [ProdusCard.jsx#L1-L11](https://github.com/marymatei/MotoVault/blob/718e5756ca7443545a452b13e3f607822dd8709e/frontend/src/components/ProdusCard.jsx#L1-L11) | read |
| S4-R3 | map + key={id}, no console warnings | [ProdusList.jsx#L11-L13](https://github.com/marymatei/MotoVault/blob/718e5756ca7443545a452b13e3f607822dd8709e/frontend/src/components/ProdusList.jsx#L11-L13) | F12, Console |
| S4-R4 | message for empty list | [ProdusList.jsx#L4-L7](https://github.com/marymatei/MotoVault/blob/718e5756ca7443545a452b13e3f607822dd8709e/frontend/src/components/ProdusList.jsx#L4-L7) | set array to [] |
| S4-R5 | state changes the card look | [ProdusCard.jsx#L3](https://github.com/marymatei/MotoVault/blob/718e5756ca7443545a452b13e3f607822dd8709e/frontend/src/components/ProdusCard.jsx#L3) | toggle a disponibil flag |
| S4-R6 | README Stage 4 section + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/e603aa072e7075170aca4fd220117473c3868b8b/README.md), [etapa_4.md](https://github.com/marymatei/MotoVault/blob/718e5756ca7443545a452b13e3f607822dd8709e/ai_log/etapa_4.md) | read |
| S4-R7 | commit "Stage 4" pushed | [Commit Stage 4](https://github.com/marymatei/MotoVault/commit/718e5756ca7443545a452b13e3f607822dd8709e) | commit history |

## Verification Table - Stage 5

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | list kept in useState, in App | [App.jsx#L16](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.jsx#L16) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L19-L23](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.jsx#L19-L23), [ProdusCard.jsx#L5-L11](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/components/ProdusCard.jsx#L5-L11) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L25-L27](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.jsx#L25-L27), [ProdusCard.jsx#L35-L41](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/components/ProdusCard.jsx#L35-L41) | click Delete |
| S5-R4 | header counter derived, not in state | [App.jsx#L35-L38](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.jsx#L35-L38) | toggle/delete, watch counter |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L19-L27](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.jsx#L19-L27) | read |
| S5-R6 | light/dark toggle: state + data-theme on html | [App.jsx#L29-L33](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.jsx#L29-L33), [App.css#L7-L40](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/frontend/src/App.css#L7-L40) | click the button, test both themes |
| S5-R7 | no console warnings; README + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/README.md), [etapa_5.md](https://github.com/marymatei/MotoVault/blob/a11e33a14456bde13f3806bd6779523a39142e9e/ai_log/etapa_5.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [Commit Stage 5](https://github.com/marymatei/MotoVault/commit/a11e33a14456bde13f3806bd6779523a39142e9e) | commit history |

## Verification Table - Stage 6

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S6-R1 | npm run api starts, route shows JSON | [package.json#L11](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/package.json#L11), [db.json](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/db.json) | open localhost:3001/products |
| S6-R2 | data no longer in React code | [App.jsx#L13](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/src/App.jsx#L13) | read |
| S6-R3 | loading message while waiting | [App.jsx#L181](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/src/App.jsx#L181) | --delay 4000 |
| S6-R4 | error message when API is down | [App.jsx#L182-L186](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/src/App.jsx#L182-L186) | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | [api.js#L4-L10](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/src/api.js#L4-L10), [.env.example](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/frontend/.env.example) | search for fetch |
| S6-R6 | README Stage 6 section + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/README.md), [etapa_6.md](https://github.com/marymatei/MotoVault/blob/90417756f5bcd80d53228030086358dfc5c8d55c/ai_log/etapa_6.md) | read |
| S6-R7 | commit "Stage 6" pushed | [Commit Stage 6](https://github.com/marymatei/MotoVault/commit/90417756f5bcd80d53228030086358dfc5c8d55c) | commit history |

## Verification Table - Stage 7

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S7-R1 | controlled form: value + onChange on every field | [ProductForm.jsx#L48-L74](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/components/ProductForm.jsx#L48-L74) | read |
| S7-R2 | empty title shows an error, nothing is sent | [ProductForm.jsx#L20-L33](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/components/ProductForm.jsx#L20-L33) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [App.jsx#L39-L42](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/App.jsx#L39-L42), [api.js#L21-L23](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/api.js#L21-L23) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [App.jsx#L44-L61](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/App.jsx#L44-L61) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [ProductForm.jsx#L34-L45](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/components/ProductForm.jsx#L34-L45), [ProductForm.jsx#L80-L82](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/components/ProductForm.jsx#L80-L82) | --delay 3000; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | [tw.json](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/tw.json), [ProdusCard.jsx#L9-L49](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/frontend/src/components/ProdusCard.jsx#L9-L49) | querySelectorAll in the console |
| S7-R7 | README Stage 7 section + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/README.md), [ai_log/etapa_7.md](https://github.com/marymatei/MotoVault/blob/2c50fc7468cf211c96a9787418c5f4d4a34bbef6/ai_log/etapa_7.md) | read |
| S7-R8 | commit "Stage 7" pushed | [Commit Stage 7](https://github.com/marymatei/MotoVault/commit/2c50fc7468cf211c96a9787418c5f4d4a34bbef6) | commit history |

## Verification Table - Stage 8

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S8-R1 | header navigation changes page without reload | [App.jsx#L11-L18](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/App.jsx#L11-L18), [Layout.jsx#L39-L46](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/components/Layout.jsx#L39-L46) | click links, watch Network |
| S8-R2 | click on an item opens its detail page | [ProdusCard.jsx#L36-L38](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/components/ProdusCard.jsx#L36-L38), [ProductDetailPage.jsx](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages/ProductDetailPage.jsx) | click a title |
| S8-R3 | refresh on the detail URL works; missing id shows an error | [ProductDetailPage.jsx#L14-L34](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages/ProductDetailPage.jsx#L14-L34), [ProductDetailPage.jsx#L44-L55](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages/ProductDetailPage.jsx#L44-L55) | refresh /products/1, open /products/999 |
| S8-R4 | unknown URL shows the app 404 page | [App.jsx#L16](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/App.jsx#L16), [NotFoundPage.jsx](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages/NotFoundPage.jsx) | open /ceva |
| S8-R5 | each component has its .module.css; index.css only shared styles | [src/components](https://github.com/marymatei/MotoVault/tree/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/components), [src/pages](https://github.com/marymatei/MotoVault/tree/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages), [index.css](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/index.css) | read |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route /<resource>/:id | [Layout.jsx#L39](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/components/Layout.jsx#L39), [ProdusCard.jsx#L9-L55](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/components/ProdusCard.jsx#L9-L55), [ProductDetailPage.jsx#L58-L67](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages/ProductDetailPage.jsx#L58-L67), [NotFoundPage.jsx#L5](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/frontend/src/pages/NotFoundPage.jsx#L5), [tw.json](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/tw.json) | querySelector in the console |
| S8-R7 | README Stage 8 section + AI log | [README.md](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/README.md), [etapa_8.md](https://github.com/marymatei/MotoVault/blob/a5c6add2d5ebf7b713a248d46d9703ca43aa884e/ai_log/etapa_8.md) | read |
| S8-R8 | commit "Stage 8" pushed | [Commit Stage 8](https://github.com/marymatei/MotoVault/commit/a5c6add2d5ebf7b713a248d46d9703ca43aa884e) | commit history |