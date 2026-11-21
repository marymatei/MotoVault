import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../api.js";
import { TAG_LABELS } from "../constants.js";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { id } = useParams(); // text from the URL, for example "3"
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Loads again if the id in the address changes
  useEffect(() => {
    let ignore = false;

    fetchProduct(id)
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setError(null); // an error from a previous id no longer applies
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Loading product...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          The product could not be loaded: {error}
        </p>
        <Link to="/" className={styles.back}>
          Back to inventory
        </Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        Back to inventory
      </Link>
      <h2
        className={product.available ? styles.title : `${styles.title} ${styles.unavailable}`}
        data-testid="detail-title"
      >
        {product.name}
      </h2>
      <dl className={styles.fields}>
        <dt>Tag</dt>
        <dd>{TAG_LABELS[product.tag] ?? product.tag}</dd>
        <dt>Status</dt>
        <dd>{product.available ? "Available" : "Unavailable"}</dd>
        <dt>ID</dt>
        <dd>{product.id}</dd>
      </dl>
    </section>
  );
}