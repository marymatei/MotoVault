import { readFileSync } from "node:fs";
import { Router } from "express";
import { parseId, validateProduct } from "../validation.js";

const router = Router();

// Stage 9: the data is kept in memory and is lost on restart (Stage 10 moves it to MariaDB).
// At every start the server loads my products from sample-products.json (the old db.json).
const start = JSON.parse(readFileSync(new URL("../sample-products.json", import.meta.url), "utf-8"));
let products = start.products;
let nextId = Math.max(0, ...products.map((p) => p.id)) + 1;

// Checks :id and finds the product, or answers with 400 / 404
function findIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return -1;
  }
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: "The product does not exist" });
  }
  return index;
}

// GET /products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /products/:id
router.get("/:id", (req, res) => {
  const index = findIndex(req, res);
  if (index === -1) return;
  res.json(products[index]);
});

// POST /products
router.post("/", (req, res) => {
  const { errors, data } = validateProduct(req.body ?? {});
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }
  const product = { id: nextId++, ...data };
  products.push(product);
  res.status(201).json(product);
});

// PATCH /products/:id (partial change)
router.patch("/:id", (req, res) => {
  const index = findIndex(req, res);
  if (index === -1) return;
  const { errors, data } = validateProduct(req.body ?? {}, { partial: true });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join("; ") });
  }
  products[index] = { ...products[index], ...data };
  res.json(products[index]);
});

// DELETE /products/:id
router.delete("/:id", (req, res) => {
  const index = findIndex(req, res);
  if (index === -1) return;
  products.splice(index, 1);
  res.status(204).end();
});

export default router;