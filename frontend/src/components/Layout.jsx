import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import BackgroundGears from "./BackgroundGears.jsx";
import styles from "./Layout.module.css";

function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// NavLink marks the current page by itself
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [theme, setTheme] = useState(initialTheme);

  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }

  return (
    <div className={styles.app}>
      <BackgroundGears />

      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <img
              src={theme === "dark" ? "/logo-transparent-cream.png" : "/logo-light-removebg-preview.png"}
              alt="MotoVault Logo"
              className={styles.logoImg}
            />
            <span className={styles.logoText}>MotoVault</span>
          </div>
          <div className={styles.right}>
            <nav className={styles.nav} data-testid="nav">
              <NavLink to="/" end className={navClass}>
                Inventory
              </NavLink>
              <NavLink to="/about" className={navClass}>
                About
              </NavLink>
            </nav>
            <button
              className={styles.themeToggle}
              onClick={handleTheme}
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© 2026 MotoVault · Motorcycle Inventory Management</p>
          <div className={styles.footerLinks}>
            <Link to="/">Inventory</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}