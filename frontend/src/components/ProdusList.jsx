import ProdusCard from "./ProdusCard.jsx";

export default function ProdusList({ produse, onToggle, onDelete }) {
  if (!produse || produse.length === 0) {
    return <p className="empty-state">No items in stock.</p>;
  }

  return (
    <div className="inventory-cards-list">
      {produse.map((produs) => (
        <ProdusCard
          key={produs.id}
          produs={produs}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}