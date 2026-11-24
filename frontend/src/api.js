// All HTTP requests are isolated here - components do not call fetch directly
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Shared function: sends JSON and throws an error if the response is not 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    // The own API answers with { error: "..." }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Server error: ${res.status}`);
  }
  // 204 No Content has no body
  return res.status === 204 ? null : res.json();
}

export function fetchProducts() {
  return request("/products");
}

export function fetchProduct(id) {
  return request(`/products/${id}`);
}

export function createProduct(product) {
  return request("/products", { method: "POST", body: JSON.stringify(product) });
}

export function updateProduct(id, changes) {
  return request(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, { method: "DELETE" });
}

// app vorbeste prin fetch cu severul
// aici se citeste mesajul de eroare trimis de server