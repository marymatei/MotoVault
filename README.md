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

Details per stage: see the ai-log/ folder.

## Stage 2: data logic

Plain JavaScript, no DOM. produse.js holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: Vite and React project
