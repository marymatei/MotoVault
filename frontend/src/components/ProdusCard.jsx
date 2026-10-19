export default function ProdusCard({ produs }) {
  return (
    <article className={produs.disponibil ? "item-card" : "item-card sold"}>
      <div>
        <h3>{produs.nume}</h3>
        <span className="badge">{produs.categorie}</span>
      </div>
      <span className="status">
        {produs.disponibil ? "Disponibil" : "Indisponibil"}
      </span>
    </article>
  );
}