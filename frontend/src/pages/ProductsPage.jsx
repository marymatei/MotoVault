import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProdusList from "../components/ProdusList.jsx";
import ProductForm from "../components/ProductForm.jsx";
import Game from "../components/Game.jsx";
import PhotoModal from "../components/PhotoModal.jsx";
import { readPhoto } from "../photo.js";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../api.js";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [viewingId, setViewingId] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchProducts();
        if (!ignore) setProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Server first, then state: only what was saved reaches the screen
  async function handleAdd(product) {
    const created = await createProduct(product); // the server returns the item with its id
    setProducts((prev) => [...prev, created]);
  }

  async function handleToggle(id) {
    const product = products.find((p) => p.id === id);
    try {
      const updated = await updateProduct(id, { available: !product.available });
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  // + and -: 0 pieces makes the product unavailable, the first piece makes it available again
  async function handleQuantity(id, delta) {
    const product = products.find((p) => p.id === id);
    const current = product.quantity ?? 0;
    const next = Math.max(0, current + delta);
    if (next === current) return;
    const changes = { quantity: next };
    if (next === 0) changes.available = false;
    if (current === 0 && next > 0) changes.available = true;
    try {
      const updated = await updateProduct(id, changes);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  // Photo error from a card or the popup: stays 3 seconds, fades out, disappears
  useEffect(() => {
    if (!photoError) return;
    const timer = setTimeout(() => setPhotoError(""), 3500);
    return () => clearTimeout(timer);
  }, [photoError]);

  // A photo added from a card or changed in the popup: checked, then saved on the server
  async function handlePhoto(id, file) {
    let photo;
    try {
      photo = await readPhoto(file);
    } catch (err) {
      setPhotoError(err.message);
      return;
    }
    try {
      const updated = await updateProduct(id, { photo });
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const viewingProduct = products.find((p) => p.id === viewingId && p.photo);

  const filteredProducts = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const total = products.length;
  const available = products.filter((p) => p.available).length;
  const unavailable = total - available;

  return (
    <>
      <section className={styles.hero}>
        <span className="tagline">MOTORCYCLE INVENTORY MANAGEMENT</span>
        <h1 className={styles.heroTitle}>
          All your motorcycle stock, in one single <span className={styles.highlight}>vault</span>.
        </h1>
        <p className={styles.heroText}>
          MotoVault tracks the availability of motorcycles, riding gear, and accessories so you always know what's in stock and what's unavailable.
        </p>
        <div className={styles.heroActions}>
          <a href="#inventory" className="btn-primary">Open Inventory</a>
          <Link to="/about" className="btn-secondary">About MotoVault</Link>
        </div>
      </section>

      <div className={styles.grid} id="inventory">
        <section className="panel">
          <h2 className={styles.panelTitle}>Add product</h2>
          <p className={styles.panelSubtitle}>New item in stock</p>
          <ProductForm onAdd={handleAdd} existingNames={products.map((p) => p.name)} />
        </section>

        <section className="panel">
          <h2 className={styles.panelTitle}>Inventory</h2>
          <p className={styles.panelSubtitle}>MotoVault Stock</p>

          <input
            className={styles.search}
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.stats}>
            <div className={styles.statBox}>
              <span className={styles.statName}>Total</span>
              <span className={styles.statNum}>{total}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statName}>Available</span>
              <span className={`${styles.statNum} ${styles.accent}`}>{available}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statName}>Unavailable</span>
              <span className={styles.statNum}>{unavailable}</span>
            </div>
          </div>

          {loading && (
            <p className="info" data-testid="loading">
              Loading products...
            </p>
          )}
          {error && (
            <p className={`error ${styles.message}`} data-testid="error">
              Server problem: {error}. Did you run <code>npm run api</code>?
            </p>
          )}
          {photoError && (
            <p key={photoError} className={`error ${styles.message} ${styles.fadeOut}`} role="alert">
              {photoError}
            </p>
          )}
          {!loading && (
            <ProdusList
              produse={filteredProducts}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onQuantity={handleQuantity}
              onPhoto={handlePhoto}
              onOpenPhoto={setViewingId}
            />
          )}
        </section>
      </div>

      <Game />

      {viewingProduct && (
        <PhotoModal
          product={viewingProduct}
          onClose={() => setViewingId(null)}
          onChangePhoto={handlePhoto}
        />
      )}
    </>
  );
}