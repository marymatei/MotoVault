# Stage 8: AI log

## Tools
- Claude

## Conversations
- Stage 8: routing, detail page and CSS Modules (link: PASTE_THE_SHARE_LINK_HERE)

## Key requests

### 1. Stage 8 steps adapted to MotoVault
Asked: Read the Stage 8 guide and my project and tell me, step by step, how to add React Router, the detail page, the about page and the 404 page.
- Got: `BrowserRouter` in `main.jsx`, the route map in `App.jsx`, a `Layout` with `NavLink` and `Outlet`, `ProductsPage` with the Stage 7 logic, `ProductDetailPage` at `/products/:id` with `useParams` and `fetchProduct(id)`, `AboutPage` and `NotFoundPage`.
- Changed or rejected: Kept my names (`products`, `ProdusCard`, `ProdusList`, `ProductForm`) and the English interface; the detail route uses `products`, the resource from `tw.json`; my landing sections (features, how it works) moved to the About page.

### 2. CSS Modules and the automatic check
Asked: How to split `App.css` into `index.css` and one `.module.css` per component, and which `data-testid` attributes Stage 8 adds.
- Got: `index.css` with the color variables and shared classes; a `.module.css` next to every component and page; `nav`, `item-link`, `detail`, `detail-title` and `not-found`, while the Stage 7 attributes stay.
- Changed or rejected: The background gears canvas now has its own class instead of a global `canvas` rule, so it no longer affects the game canvas.

### 3. Stock quantity and duplicate names (my own extra)
Asked: Refuse a product name that already exists, and add a quantity for each product with - / + buttons that makes it unavailable at 0.
- Got: `existingNames` check in `ProductForm`; a `quantity` field in the form and in `db.json`; `handleQuantity` in `ProductsPage`, which sends `PATCH` with the new quantity and sets `available` to false at 0 and back to true from 0 to 1.
- Changed or rejected: Unchecking a product by hand keeps its quantity; `tw.json` got `"quantity": 2` in `sample`, as the guide asks for every form field.

## What I learned / what did not work
I learned how React Router changes the page without reloading, why `NavLink` needs `end` on the `/` link, how `useParams` reads the id as text and why the effect depends on `[id]`. I tested the header links (no HTML document in Network), opening a product, the browser Back button, refreshing on `/products/1`, `/products/999` (error message) and `/ceva` (404 page), and that the Stage 7 form, toggle and delete still work.