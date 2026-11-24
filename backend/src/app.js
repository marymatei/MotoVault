import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();

// CORS: the browser blocks requests from :5173 to :3001
// unless the server says explicitly that it allows them
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

// Turns the JSON body of the request into req.body
// (5 MB instead of the default 100 KB, so that a 3 MB product photo fits)
app.use(express.json({ limit: "5mb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/products", productsRouter);

// Unknown route
app.use((req, res) => {
  res.status(404).json({ error: "The route does not exist" });
});

// Central error handling (Express 5 also sends async errors here)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: status === 500 ? "Internal error" : err.message });
});

export default app;