import { Link } from "react-router-dom";
import { TAG_LABELS } from "../constants.js";
import { PHOTO_TYPES } from "../photo.js";
import styles from "./ProdusCard.module.css";

// A different line icon for every tag (same size and style for all)
function TagIcon({ tag }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (tag === "Motorcycle") {
    return (
      <svg {...common}>
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6h2l3 5v4M9 17.5l2.5-6h4.5M12 11.5L9.5 6H5" />
      </svg>
    );
  }
  if (tag === "Gear") {
    // helmet
    return (
      <svg {...common}>
        <path d="M3 16a9 9 0 0 1 18 0v2H3z" />
        <path d="M12 7v5h9" />
      </svg>
    );
  }
  if (tag === "Protection") {
    // shield
    return (
      <svg {...common}>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  if (tag === "Accessories") {
    // padlock
    return (
      <svg {...common}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    );
  }
  if (tag === "Consumables") {
    // oil drop
    return (
      <svg {...common}>
        <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      </svg>
    );
  }
  // any other tag: a box
  return (
    <svg {...common}>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  );
}

export default function ProdusCard({ produs, onToggle, onDelete, onQuantity, onPhoto, onOpenPhoto }) {
  const quantity = produs.quantity ?? 0;

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
        {produs.photo ? (
          <button
            type="button"
            className={styles.photo}
            onClick={() => onOpenPhoto(produs.id)}
            aria-label={`View the photo of ${produs.name}`}
          >
            <img src={produs.photo} alt={produs.name} className={styles.photoImg} />
          </button>
        ) : (
          <label
            className={`${styles.photo} ${styles.photoEmpty}`}
            title="Add a photo"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) onPhoto(produs.id, file);
            }}
          >
            <span aria-hidden="true">+</span>
            <small>Photo</small>
            <input
              type="file"
              accept={PHOTO_TYPES.join(",")}
              className={styles.fileInput}
              aria-label={`Add a photo for ${produs.name}`}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onPhoto(produs.id, file);
                e.target.value = "";
              }}
            />
          </label>
        )}
        <div className={styles.iconCol}>
          <div className={styles.iconBox}>
            <TagIcon tag={produs.tag} />
          </div>
          <p className={styles.category}>{TAG_LABELS[produs.tag] ?? produs.tag}</p>
        </div>
        <div className={styles.info}>
          <Link to={`/products/${produs.id}`} className={styles.title} data-testid="item-link">
            {produs.name}
          </Link>
        </div>
      </div>

      <div className={styles.qty}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => onQuantity(produs.id, -1)}
          disabled={quantity === 0}
          aria-label={`Decrease quantity of ${produs.name}`}
        >
          −
        </button>
        <span className={styles.qtyValue} title="Pieces in stock">{quantity}</span>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => onQuantity(produs.id, 1)}
          aria-label={`Increase quantity of ${produs.name}`}
        >
          +
        </button>
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