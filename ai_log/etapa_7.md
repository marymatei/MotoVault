# Stage 7: AI log

## Tools
- Claude

## Conversations
- Stage 7: form and validation

## Key requests

### 1. Stage 7 steps adapted to MotoVault
Asked: Read the Stage 7 guide and my project and tell me, step by step, what to change for the form, validation and saving on the server.
- Got: A shared `request` function in `api.js` with `createProduct`, `updateProduct`, `deleteProduct`; a new controlled `ProductForm` component; `handleAdd`, `handleToggle` and `handleDelete` in `App.jsx` that call the server first and update the state with the server response.
- Changed or rejected: Kept my field names from `db.json` (`products`, `name`, `available`, `tag`) instead of the TaskFlow names; the extra validation is the 100-character limit for the name from the README data model.

### 2. Automatic verification and layout
Asked: What `tw.json` and `data-testid` attributes my project needs and how to put the form next to the list.
- Got: `tw.json` with `products`, `name`, `available` and a sample tag; `data-testid` on the form, card, checkbox, title, delete button and messages; a two-column `.container` that becomes one column under 700px.
- Changed or rejected: The old search field no longer adds products with a local `Date.now()` id; it is only a search now, and products are added only from the form.

## What I learned / what did not work
I learned how a controlled form keeps every field in state, why `e.preventDefault()` is needed, and why the list must be updated with the object returned by the server (the id comes from json-server). I tested the empty field (no request in Network), adding, toggling and deleting with page reload, the API stopped (the text stays in the field) and `--delay 3000` (the button shows "Saving..." and is disabled).