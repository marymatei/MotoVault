import { useState } from "react";
import { TAGS } from "../constants.js";
import styles from "./ProductForm.module.css";

const NAME_MAX = 100;

// Controlled form: React state is the source of truth for the fields
export default function ProductForm({ onAdd, existingNames = [] }) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("Gear");
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  function validate() {
    const n = name.trim();
    if (n === "") return "Product name is required.";
    if (n.length > NAME_MAX) return `Product name can have at most ${NAME_MAX} characters.`;
        if (existingNames.some((x) => x.trim().toLowerCase() === n.toLowerCase())) {
      return "This product is already in the inventory.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading
    const message = validate();
    if (message) {
      setFormError(message);
      return;
    }
    setFormError("");
    setSending(true);
    try {
      await onAdd({ name: name.trim(), tag, available: true });
      setName("");
      setTag("Gear");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSending(false);
    }
  }

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
          aria-invalid={Boolean(formError)}
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
      {formError && (
        <p className="error" data-testid="form-error">
          {formError}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={sending} data-testid="form-submit">
        {sending ? "Saving..." : "Add product"}
      </button>
    </form>
  );
}