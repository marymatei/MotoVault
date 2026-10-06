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

## How to run

Open index.html in a browser. No build step, no server.

## AI usage

| Tool | Used for |
| :--- | :--- |
| Gemini | Architecture mapping from domain to lab constraints, HTML semantic structure, CSS layout |

Details per stage: see the ai_log/ folder.

## Stage 2: data logic

Plain JavaScript, no DOM. produse.js holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: Vite and React project

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