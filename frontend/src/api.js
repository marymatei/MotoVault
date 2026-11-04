// All HTTP requests are isolated here - components do not call fetch directly
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}