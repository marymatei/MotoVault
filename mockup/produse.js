// Datele de test din README si valorile permise
const produse = [
  { id: 1, name: "Honda CB600F Hornet", isSold: false, itemType: "Motorcycle" },
  { id: 2, name: "AGV K6 S Full Face Helmet", isSold: true, itemType: "Equipment" },
  { id: 3, name: "Yamaha MT-07", isSold: false, itemType: "Motorcycle" }
];

const TIPURI = ["Motorcycle", "Equipment", "Accessory"];

// Listarea numelor
function listeazaNume(lista) {
  return lista.map((p) => p.name);
}

// Numararea produselor disponibile
function numaraDisponibile(lista) {
  return lista.filter((p) => !p.isSold).length;
}

// Cautarea dupa nume, case-insensitive
function cautaDupaNume(lista, text) {
  return lista.filter((p) => p.name.toLowerCase().includes(text.toLowerCase()));
}

// Calculul urmatorului id unic
function nextId(lista) {
  return lista.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

// Adaugarea cu validare
function adaugaProdus(lista, name, itemType = "Motorcycle") {
  const numeCurat = name.trim();

  // Validare 1: numele nu poate fi gol
  if (!numeCurat) {
    console.log("Eroare: Numele nu poate fi gol!");
    return lista;
  }

  // Validare 2: tipul trebuie sa fie in lista valorilor permise
  if (!TIPURI.includes(itemType)) {
    console.log(`Eroare: Tip invalid: "${itemType}". Tipuri permise: ${TIPURI.join(", ")}`);
    return lista;
  }

  // Creare obiect nou cu id generat
  const nou = {
    id: nextId(lista),
    name: numeCurat,
    isSold: false,
    itemType: itemType
  };

  // Intoarce array nou, fara a modifica originalul
  return [...lista, nou];
}

// Comutarea starii
function comutaVandut(lista, id) {
  return lista.map((p) => (p.id === id ? { ...p, isSold: !p.isSold } : p));
}

// Stergerea unui produs dupa id
function stergeProdus(lista, id) {
  return lista.filter((p) => p.id !== id);
}

// Testele din consola
console.log("--- Citire ---");
console.log("Produse:", listeazaNume(produse).join(", "));
console.log("Disponibile:", numaraDisponibile(produse));
console.log("Căutare 'honda':", listeazaNume(cautaDupaNume(produse, "honda")).join(", "));

console.log("--- Adăugare ---");
let lista = adaugaProdus(produse, "Kawasaki Z900", "Motorcycle");
console.log("Lista nouă:", lista.length, "articole");
console.log("Originalul a rămas cu:", produse.length, "articole");

console.log("--- Modificare și ștergere ---");
lista = comutaVandut(lista, 1);
console.log("După comutare stare id 1, disponibile:", numaraDisponibile(lista));
lista = stergeProdus(lista, 3);
console.log("După ștergerea id 3:", listeazaNume(lista).join(", "));

console.log("--- Validare ---");
adaugaProdus(lista, "");
adaugaProdus(lista, "Mănuși Alpinestars", "invalid");