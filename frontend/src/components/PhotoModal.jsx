import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PHOTO_TYPES } from "../photo.js";
import styles from "./PhotoModal.module.css";

// The photo at full quality, over the whole page (rendered in <body>, above the header).
// Closes with X, Esc or a click outside.
export default function PhotoModal({ product, onClose, onChangePhoto }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) onChangePhoto(product.id, file);
    e.target.value = "";
  }

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={product.name}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <h3 className={styles.title}>{product.name}</h3>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close" autoFocus>
            ×
          </button>
        </div>
        <img src={product.photo} alt={product.name} className={styles.img} />
        <label className={`btn-secondary ${styles.change}`}>
          Change photo
          <input type="file" accept={PHOTO_TYPES.join(",")} className={styles.input} onChange={handleChange} />
        </label>
      </div>
    </div>,
    document.body
  );
}