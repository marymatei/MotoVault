# Stage 8: AI log

## Tools
- Claude

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
- Changed or rejected: The form error now fades out after 3 seconds; unchecking a product by hand keeps its quantity; `tw.json` got `"quantity": 2` in `sample`, as the guide asks for every form field.

### 4. Product photos (my own extra)
Asked: Add a photo to each product with drag and drop or from the computer, show it as a square in the card, open it large on click, and refuse photos that are too small or too large without losing quality.
- Got: `photo.js` (JPG/PNG/WEBP, 200–4000 px, max 3 MB, read as a data URL without resizing), `PhotoDrop` in the form, a photo square in `ProdusCard` with "+ Photo" for products without one, `PhotoModal` with Esc / click outside / Change photo, and the photo on the detail page.
- Changed or rejected: The photo is optional, because the automatic check cannot attach files; the photo error is shown together with the other form errors and fades out with them; json-server keeps the photo inside `db.json` until the Express server in Stage 9.
- Also: the tag is shown under the icon, and unavailable products have their name struck through.

## What I learned / what did not work
I learned how React Router changes the page without reloading, why `NavLink` needs `end` on the `/` link, how `useParams` reads the id as text and why the effect depends on `[id]`. I tested the header links (no HTML document in Network), opening a product, the browser Back button, refreshing on `/products/1`, `/products/999` (error message) and `/ceva` (404 page), and that the Stage 7 form, toggle and delete still work.