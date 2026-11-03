// aici sunt toate cererile HTTP - componentele nu apeleaza fetch direct
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchProduse() {
  const res = await fetch(`${API_URL}/produse`);
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.json();
}