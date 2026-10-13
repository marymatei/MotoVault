const produse = [
  { id: 1, nume: "Honda CB600F Hornet", categorie: "Motorcycle", disponibil: true },
  { id: 2, nume: "AGV K6 S Full Face Helmet", categorie: "Equipment", disponibil: false },
  { id: 3, nume: "Yamaha MT-07", categorie: "Motorcycle", disponibil: true }
];

export default function App() {
  const active = produse.filter((p) => p.disponibil).length;

  return (
    <>
      <header className="app-header">
        <h1>MotoVault</h1>
        <p>Motorcycle and riding gear inventory management.</p>
        <p className="app-count">
          {produse.length} produse, dintre care {active} disponibile
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Stoc Curent</h2>
          {/* Temporar: date brute; componentele apar in Etapa 4 */}
          <pre>{JSON.stringify(produse, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}