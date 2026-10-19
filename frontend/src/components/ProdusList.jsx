import ProdusCard from "./ProdusCard.jsx";

export default function ProdusList({ produse }) {
  // verifica daca lista e goala
  if (!produse || produse.length === 0) {
    return <p className="empty">Nu există niciun produs în stoc.</p>;
  }

  return (
    <div className="inventory-list">
      {produse.map((produs) => (
        <ProdusCard key={produs.id} produs={produs} />
      ))}
    </div>
  );
}