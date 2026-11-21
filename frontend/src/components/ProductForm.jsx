import { useEffect, useState } from "react";
import { TAGS } from "../constants.js";
import { readPhoto } from "../photo.js";
import PhotoDrop from "./PhotoDrop.jsx";
import styles from "./ProductForm.module.css";

const NAME_MAX = 100;
const QUANTITY_MAX = 9999;

// Controlled form: React state is the source of truth for the fields
export default function ProductForm({ onAdd, existingNames = [] }) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("Gear");
  const [quantity, setQuantity] = useState("1");
  const [photo, setPhoto] = useState("");
  const [photoProblem, setPhotoProblem] = useState(""); // message for a rejected photo
  const [errors, setErrors] = useState({}); // { name, quantity, photo, server }
  const [errorKey, setErrorKey] = useState(0);
  const [sending, setSending] = useState(false);

  // All the messages shown together stay 3 seconds, fade out together, then disappear
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timer = setTimeout(() => setErrors({}), 3500);
    return () => clearTimeout(timer);
  }, [errors]);

  function showErrors(found) {
    setErrors(found);
    setErrorKey((k) => k + 1); // restarts the fade for every new message
  }

  function validate() {
    const found = {};
    const n = name.trim();
    if (n === "") found.name = "Product name is required.";
    else if (n.length > NAME_MAX) found.name = `Product name can have at most ${NAME_MAX} characters.`;
    else if (existingNames.some((x) => x.trim().toLowerCase() === n.toLowerCase())) {
      found.name = "This product is already in the inventory.";
    }
    const q = Number(quantity);
    if (quantity === "" || !Number.isInteger(q) || q < 0 || q > QUANTITY_MAX) {
      found.quantity = `Quantity must be a whole number between 0 and ${QUANTITY_MAX}.`;
    }
    if (photoProblem) found.photo = photoProblem;
    return found;
  }

  // The photo is checked as soon as it is chosen; its error joins the other messages
  async function handlePhoto(file) {
    try {
      setPhoto(await readPhoto(file));
      setPhotoProblem("");
    } catch (err) {
      setPhoto("");
      setPhotoProblem(err.message);
      showErrors({ ...errors, photo: err.message });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading
    const found = validate();
    if (Object.keys(found).length > 0) {
      showErrors(found);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const q = Number(quantity);
      // A product with 0 pieces starts as unavailable; the photo is optional
      await onAdd({ name: name.trim(), tag, quantity: q, available: q > 0, ...(photo ? { photo } : {}) });
      setName("");
      setTag("Gear");
      setQuantity("1");
      setPhoto("");
      setPhotoProblem("");
    } catch (err) {
      showErrors({ server: err.message });
    } finally {
      setSending(false);
    }
  }

  const messages = Object.values(errors).filter(Boolean);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Product name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Honda CB600F Hornet"
          maxLength={NAME_MAX}
          aria-invalid={Boolean(errors.name || errors.server)}
          data-testid="form-title"
        />
      </label>
      <label>
        Tag
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          data-testid="form-tag"
        >
          {TAGS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Quantity
        <input
          type="number"
          min="0"
          max={QUANTITY_MAX}
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-invalid={Boolean(errors.quantity)}
          data-testid="form-quantity"
        />
      </label>
      <PhotoDrop
        photo={photo}
        problem={photoProblem}
        onFile={handlePhoto}
        onRemove={() => {
          setPhoto("");
          setPhotoProblem("");
        }}
      />
      {messages.length > 0 && (
        <p key={errorKey} className={`error ${styles.fadeOut}`} data-testid="form-error">
          {messages.map((m) => (
            <span key={m} className={styles.errorLine}>
              {m}
            </span>
          ))}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={sending} data-testid="form-submit">
        {sending ? "Saving..." : "Add product"}
      </button>
    </form>
  );
}