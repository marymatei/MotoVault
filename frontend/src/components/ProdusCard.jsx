import { Link } from "react-router-dom";
import { TAG_LABELS } from "../constants.js";
import styles from "./ProdusCard.module.css";

export default function ProdusCard({ produs, onToggle, onDelete }) {
  const isMotorcycle = produs.tag === "Motorcycle";

  return (
    <li
      className={produs.available ? styles.card : `${styles.card} ${styles.unavailable}`}
      data-testid="item"
      data-id={produs.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={produs.available}
          onChange={() => onToggle(produs.id)}
          aria-label={`Mark ${produs.name} as available`}
          data-testid="item-toggle"
        />
        <div className={styles.iconBox}>
          {isMotorcycle ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6h2l3 5v4M9 17.5l2.5-6h4.5M12 11.5L9.5 6H5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
          )}
        </div>
        <div className={styles.info}>
          <Link to={`/products/${produs.id}`} className={styles.title} data-testid="item-link">
            {produs.name}
          </Link>
          <p className={styles.category}>{TAG_LABELS[produs.tag] ?? produs.tag}</p>
        </div>
      </div>

      <span className={produs.available ? `${styles.pill} ${styles.available}` : styles.pill}>
        {produs.available ? "Available" : "Unavailable"}
      </span>

      <button
        className="btn-danger"
        onClick={() => onDelete(produs.id)}
        aria-label={`Delete ${produs.name}`}
        data-testid="item-delete"
      >
        Delete
      </button>
    </li>
  );
}