# Stage 9: AI log

## Tools
- Claude

## Key requests

### 1. Stage 9 steps adapted to MotoVault
Asked: Read the Stage 9 guide and my project and tell me, step by step, how to replace json-server with my own Express API.
- Got: `backend/` with `package.json` (`"type": "module"`, `start` and `dev` scripts), `.gitignore`, `.env.example`, `src/server.js`, `src/app.js` (cors, express.json, /health, the 404 route and the central error handler), `src/routes/products.js` with the five routes and `src/validation.js`.
- Changed or rejected: Names adapted to my theme: `/products` (the resource from `tw.json`), `validateProduct`, `TAGS` identical to `constants.js`, English error messages ("The product does not exist"); my products from the old `db.json` moved to `backend/src/sample-products.json`, and the server loads them into memory at every start.

### 2. Server validation for my own fields
Asked: The server must also accept my extra fields, quantity and photo, not only name, tag and available.
- Got: quantity checked as a whole number from 0 to 9999 (0 when it is missing), photo checked as a JPG, PNG or WEBP image of at most 3 MB, the same limits as the form; any other field (for example `id` or `user_id`) is ignored by the whitelist.
- Changed or rejected: `express.json({ limit: "5mb" })` instead of the default 100 KB, otherwise a product photo is refused by the server.

### 3. Testing with curl and removing json-server
Asked: How to test the routes with curl on Windows and what has to be deleted from the frontend.
- Got: the curl commands run in Git Bash (PowerShell handles the quotes differently); `body.error` read in `api.js`; `db.json`, the `api` script and the `json-server` package removed, then `npm install` to update `package-lock.json`.
- Changed or rejected: the error message on the list page now says to start the backend, not `npm run api`.

## What I learned / what did not work
I learned how an Express route is built (method, path, function), why the order of the middleware matters and why the error handler needs four parameters. I tested with curl: list 200, create 201, empty name 400, missing id 404, delete 204. Then the React app worked with json-server removed, and opening it from http://127.0.0.1:5173 showed the CORS error in the console, because the server only allows http://localhost:5173. The data resets when the server restarts; Stage 10 moves it to MariaDB.