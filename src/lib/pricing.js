// Client-side estimate for the order form. Mirrors the backend's tier
// lookup so the customer sees a sensible number while typing. The backend
// is still authoritative — surcharges and custom-job adjustments happen
// at owner finalization (see backend decisions.md #4).

const BUNDLE = 'bundle';

export function productNeedsSides(product) {
  return (product.prices ?? []).some((p) => p.sides !== null && p.sides !== undefined);
}

export function defaultSidesFor(product) {
  return productNeedsSides(product) ? 1 : null;
}

/** Return the price tier that applies to a (sides, quantity) pair, or null. */
function pickTier(product, sides, quantity) {
  const candidates = (product.prices ?? []).filter((p) =>
    productNeedsSides(product) ? p.sides === (sides ?? 1) : p.sides === null,
  );
  if (candidates.length === 0) return null;

  const fitting = candidates.filter((p) => p.min_quantity <= quantity);
  if (fitting.length > 0) {
    return fitting.reduce((best, p) => (p.min_quantity > best.min_quantity ? p : best));
  }
  // Under the lowest tier — show the lowest tier's unit price so customer
  // sees *something*. Backend will re-resolve at submit time.
  return candidates.reduce((best, p) => (p.min_quantity < best.min_quantity ? p : best));
}

/**
 * Compute the estimated line total for one item.
 * Returns { unitPrice, lineTotal } as numbers, or null if the item can't
 * be priced (no product selected, or custom item).
 */
export function estimateItem(product, item) {
  if (!product) return null;
  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity <= 0) return null;

  const tier = pickTier(product, item.sides, quantity);
  if (!tier) return null;

  const unit = Number(tier.unit_price);
  const total = product.pricing_type === BUNDLE ? unit : unit * quantity;
  return { unitPrice: unit, lineTotal: round2(total) };
}

/** Sum of all estimable line totals; custom items contribute 0. */
export function estimateOrder(productsById, items) {
  let total = 0;
  for (const item of items) {
    if (item.productId == null) continue;
    const product = productsById.get(item.productId);
    const est = estimateItem(product, item);
    if (est) total += est.lineTotal;
  }
  return round2(total);
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function formatUSD(amount) {
  if (amount == null || Number.isNaN(amount)) return '—';
  return `$${amount.toFixed(2)}`;
}
