import { Link } from "react-router-dom";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <>
      <section className="panel">
        <h2 className={styles.title}>About MotoVault</h2>
        <p className={styles.text}>
          MotoVault is a specialized inventory management system for motorcycle dealerships and gear shops. It tracks vehicle and equipment availability, logs sales status, and categorizes products by type and riding discipline.
        </p>
        <p className={styles.text}>
          It is built step by step, during the semester, as the Web Technologies project.
        </p>
        <p className={styles.text}>Stack: React, Vite, React Router, Node.js, Express, MariaDB, Docker.</p>
      </section>

      <section className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricNumber}>3</span>
          <h4>Product types</h4>
          <p>Motorcycles, gear, accessories</p>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricNumber}>4</span>
          <h4>Categories</h4>
          <p>Naked, Sport, Touring, Protective</p>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricNumber}>2</span>
          <h4>Availability states</h4>
          <p>Available or unavailable</p>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className="section-title">Everything you need to keep your inventory under control</h2>
        <p className="section-subtitle">A simple inventory system built for motorcycle dealers and riding gear shops.</p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.icon}>✓</div>
            <h3>Availability at a glance</h3>
            <p>Instantly see what is available and what is sold, directly in the list with a clear tag on each item.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>🔍</div>
            <h3>Search & filters</h3>
            <p>Search by name and filter by item type or availability, then reset with a single click.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>📦</div>
            <h3>Automatic counters</h3>
            <p>Total items, available products, and unavailable stock calculate automatically from your inventory.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>☰</div>
            <h3>Riding style categories</h3>
            <p>Naked, Sport, Touring, and Protective: your catalog stays neat and organized as it grows.</p>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className="section-title">How it works</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNum}>01</span>
            <h3>Add the product</h3>
            <p>Enter the name, type, and category: motorcycle, gear, or accessory.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>02</span>
            <h3>Track availability</h3>
            <p>Mark products as sold or available as your inventory status changes.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>03</span>
            <h3>Filter & manage</h3>
            <p>Quickly find any item and check your entire stock status at a single glance.</p>
          </div>
        </div>

        <div className={`panel ${styles.cta}`}>
          <h2>Ready to get your inventory organized?</h2>
          <p>Open the inventory and see how your stock looks, item by item.</p>
          <Link to="/" className="btn-primary">Open Inventory</Link>
        </div>
      </section>
    </>
  );
}