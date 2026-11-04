import { useState, useEffect } from "react";
import ProdusList from "./components/ProdusList.jsx";
import Game from "./components/Game.jsx";
import BackgroundGears from "./components/BackgroundGears.jsx";
import { fetchProducts } from "./api.js";
import "./App.css";

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(initialTheme);

  function handleAdd() {
    if (!search.trim()) return;

    const newProduct = {
      id: Date.now(),
      nume: search.trim(),
      name: search.trim(),
      disponibil: true,
      available: true,
      categorie: "Gear",
      tag: "Gear"
    };

    setProducts((prev) => [newProduct, ...prev]);
    setSearch("");
  }

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

  function handleToggle(id) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              disponibil: !(p.disponibil ?? p.available),
              available: !(p.available ?? p.disponibil)
            }
          : p
      )
    );
  }

  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }

  const filteredProducts = products.filter((p) => {
    const itemName = p.nume || p.name || "";
    return itemName.toLowerCase().includes(search.toLowerCase());
  });

  const total = products.length;
  const available = products.filter((p) => p.disponibil ?? p.available).length;
  const unavailable = total - available;

  return (
    <div className="landing-app">
      <BackgroundGears />

      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="brand-logo">
            <img 
              src={theme === "dark" ? "/logo-transparent-cream.png" : "/logo-light-removebg-preview.png"} 
              alt="MotoVault Logo" 
              className="brand-logo-img"
            />
            <span className="brand-text">MotoVault</span>
          </div>
          <div className="nav-right">
            <button
              className="theme-toggle"
              onClick={handleTheme}
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#arcade" className="nav-link">Arcade 🏍️</a>
            <a href="#inventory" className="btn-primary btn-sm">Open Inventory</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tagline">MOTORCYCLE INVENTORY MANAGEMENT</span>
          <h1 className="hero-title">
            All your motorcycle stock, in one single <span className="highlight-text">vault</span>.
          </h1>
          <p className="hero-description">
            MotoVault tracks the availability of motorcycles, riding gear, and accessories so you always know what's in stock and what's unavailable.
          </p>
          <div className="hero-actions">
            <a href="#inventory" className="btn-primary">Open Inventory</a>
            <a href="#features" className="btn-secondary">View Features</a>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory-section" id="inventory">
        <div className="inventory-container">
          <div className="inventory-preview-card">
            <div className="preview-header">
              <div>
                <h3>Inventory</h3>
                <span className="preview-subtitle">MotoVault Stock</span>
              </div>
            </div>

            <div className="preview-search" style={{ display: "flex", gap: "10px", marginBottom: "1.25rem" }}>
              <input 
                type="text" 
                placeholder="Search or type new product name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                style={{ marginBottom: 0 }}
              />
              <button 
                type="button"
                className="btn-primary"
                onClick={handleAdd}
                title="Add product"
                style={{ padding: "0 1.25rem", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer" }}
              >
                +
              </button>
            </div>

            <div className="preview-stats">
              <div className="stat-box">
                <span className="stat-name">Total</span>
                <span className="stat-num white">{total}</span>
              </div>
              <div className="stat-box">
                <span className="stat-name">Available</span>
                <span className="stat-num green">{available}</span>
              </div>
              <div className="stat-box">
                <span className="stat-name">Unavailable</span>
                <span className="stat-num white">{unavailable}</span>
              </div>
            </div>

            {loading && <p className="info" style={{ padding: "16px" }}>Loading products...</p>}
            {error && (
              <p className="error" style={{ margin: "16px" }}>
                Could not load data: {error}. Did you run <code>npm run api</code>?
              </p>
            )}
            {!loading && !error && (
              <ProdusList
                produse={filteredProducts}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </section>

      {/* Arcade Game Section */}
      <section className="arcade-section" id="arcade" style={{ padding: "40px 20px" }}>
        <div className="inventory-container">
          <Game />
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="metrics-banner">
        <div className="metrics-container">
          <div className="metric-item">
            <span className="metric-number">3</span>
            <h4>Product types</h4>
            <p>Motorcycles, gear, accessories</p>
          </div>
          <div className="metric-item">
            <span className="metric-number">4</span>
            <h4>Categories</h4>
            <p>Naked, Sport, Touring, Protective</p>
          </div>
          <div className="metric-item">
            <span className="metric-number">2</span>
            <h4>Availability states</h4>
            <p>Available or unavailable</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-container">
          <h2 className="section-title">Everything you need to keep your inventory under control</h2>
          <p className="section-subtitle">A simple inventory system built for motorcycle dealers and riding gear shops.</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon green-icon">✓</div>
              <h3>Availability at a glance</h3>
              <p>Instantly see what is available and what is sold, directly in the list with a clear tag on each item.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green-icon">🔍</div>
              <h3>Search & filters</h3>
              <p>Search by name and filter by item type or availability, then reset with a single click.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green-icon">📦</div>
              <h3>Automatic counters</h3>
              <p>Total items, available products, and unavailable stock calculate automatically from your inventory.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green-icon">☰</div>
              <h3>Riding style categories</h3>
              <p>Naked, Sport, Touring, and Protective: your catalog stays neat and organized as it grows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-section" id="how-it-works">
        <div className="how-container">
          <h2 className="section-title">How it works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-num">01</span>
              <h3>Add the product</h3>
              <p>Enter the name, type, and category: motorcycle, gear, or accessory.</p>
            </div>
            <div className="step-card">
              <span className="step-num">02</span>
              <h3>Track availability</h3>
              <p>Mark products as sold or available as your inventory status changes.</p>
            </div>
            <div className="step-card">
              <span className="step-num">03</span>
              <h3>Filter & manage</h3>
              <p>Quickly find any item and check your entire stock status at a single glance.</p>
            </div>
          </div>

          <div className="cta-banner">
            <h2>Ready to get your inventory organized?</h2>
            <p>Open the inventory and see how your stock looks, item by item.</p>
            <a href="#inventory" className="btn-primary">Open Inventory</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bar">
        <div className="footer-container">
          <p>© 2026 MotoVault · Motorcycle Inventory Management</p>

          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#inventory">Inventory</a>
          </div>
        </div>
      </footer>
    </div>
  );
}