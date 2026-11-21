import { useState } from "react";
import { PHOTO_TYPES } from "../photo.js";
import styles from "./PhotoDrop.module.css";

// Drop zone: drag a photo here or click to choose one from the computer
export default function PhotoDrop({ photo, problem, onFile, onRemove }) {
  const [dragging, setDragging] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) onFile(file);
    e.target.value = ""; // the same file can be chosen again
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Photo (optional)</span>
      <label
        className={[styles.zone, dragging && styles.dragging, problem && styles.invalid].filter(Boolean).join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={PHOTO_TYPES.join(",")}
          className={styles.input}
          onChange={handleChange}
        />
        {photo ? (
          <img src={photo} alt="Selected product" className={styles.preview} />
        ) : problem ? (
          <span className={styles.hint}>
            This photo cannot be used.
            <br />
            <u>Choose another one</u> or remove it.
          </span>
        ) : (
          <span className={styles.hint}>
            Drag a photo here
            <br />
            or <u>click to choose</u>
            <small>JPG, PNG or WEBP · 200–4000 px · max 3 MB</small>
          </span>
        )}
      </label>
      {(photo || problem) && (
        <button type="button" className={styles.remove} onClick={onRemove}>
          Remove photo
        </button>
      )}
    </div>
  );
}