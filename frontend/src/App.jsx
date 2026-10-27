import { useState } from "react";
import ProdusList from "./components/ProdusList.jsx";
import "./App.css";

const PRODUSE_INITIALE = [
  { id: 1, nume: "Honda CB600F Hornet", categorie: "Motorcycle", disponibil: false },
  { id: 2, nume: "AGV K6 S Full Face Helmet", categorie: "Equipment", disponibil: false },
  { id: 3, nume: "Yamaha MT-07", categorie: "Motorcycle", disponibil: true }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [produse, setProduse] = useState(PRODUSE_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  function handleToggle(id) {
    setProduse((prev) =>
      prev.map((p) => (p.id === id ? { ...p, disponibil: !p.disponibil } : p))
    );
  }

  function handleDelete(id) {
    setProduse((prev) => prev.filter((p) => p.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Valori derivate (recalculate la fiecare randare)
  const total = produse.length;
  const disponibile = produse.filter((p) => p.disponibil).length;
  const indisponibile = total - disponibile;

  return (
    <div className="landing-app">
      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="brand-logo">
            <img 
              src="/logo-transparent-cream.png" 
              alt="MotoVault Logo" 
              style={{ width: "32px", height: "32px", objectFit: "contain" }} 
            />
            <span className="brand-text">MotoVault</span>
          </div>
          <div className="nav-right">
            <button
              className="theme-toggle"
              onClick={handleTema}
              aria-pressed={tema === "dark"}
            >
              {tema === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
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

            <div className="preview-search">
              <input type="text" placeholder="Search product..." readOnly />
            </div>

            <div className="preview-stats">
              <div className="stat-box">
                <span className="stat-name">Total</span>
                <span className="stat-num white">{total}</span>
              </div>
              <div className="stat-box">
                <span className="stat-name">Available</span>
                <span className="stat-num green">{disponibile}</span>
              </div>
              <div className="stat-box">
                <span className="stat-name">Unavailable</span>
                <span className="stat-num white">{indisponibile}</span>
              </div>
            </div>

            <ProdusList
              produse={produse}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </div>
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