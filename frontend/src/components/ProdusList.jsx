import ProdusCard from "./ProdusCard.jsx";
import styles from "./ProdusList.module.css";

export default function ProdusList({ produse, onToggle, onDelete }) {
  if (!produse || produse.length === 0) {
    return (
      <p className="empty-state" data-testid="empty">
        No items in stock.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {produse.map((produs) => (
        <ProdusCard
          key={produs.id}
          produs={produs}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}