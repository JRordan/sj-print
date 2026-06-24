// Thin wrapper around the sjprint backend HTTP API.
// Base URL comes from VITE_API_BASE_URL (see .env.example). It is NOT a
// secret — VITE_* vars are inlined into the public bundle by design.

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000').replace(
  /\/+$/,
  '',
);

async function request(path, { method = 'GET', body } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Empty/non-JSON response — leave payload null.
  }

  if (!response.ok) {
    const message =
      (payload && (payload.detail || payload.message)) ||
      `Request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export function fetchPricing() {
  return request('/api/pricing');
}

export function submitOrder(order) {
  return request('/api/orders', { method: 'POST', body: order });
}
