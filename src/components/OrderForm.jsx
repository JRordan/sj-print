import { useEffect, useMemo, useState } from 'react';
import useCatalog from '../hooks/useCatalog.js';
import { submitOrder } from '../api.js';
import {
  defaultQuantityFor,
  defaultSidesFor,
  estimateItem,
  estimateOrder,
  formatUSD,
  productNeedsSides,
} from '../lib/pricing.js';

const CUSTOM = '__custom__';

// crypto.randomUUID() only exists in a secure context (HTTPS or localhost),
// so it's missing when the app is previewed over plain HTTP on a LAN/tailnet
// IP. Fall back to a spec-valid v4 UUID built from getRandomValues, which is
// available everywhere — keeps order_id a real UUID for the backend.
function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0'));
  return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`;
}

function emptyItem() {
  return {
    key: uid(),
    productId: '', // '' = unselected; CUSTOM = "Other / describe"
    quantity: 1,
    sides: 1,
    customDescription: '',
  };
}

export default function OrderForm() {
  const { products, productsById, loading, error: catalogError } = useCatalog();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState(() => [emptyItem()]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(null); // { confirmation_code }

  // Smart default: once the catalog loads, pre-select the most common product
  // on the still-pristine first row so the form opens with a real estimate.
  // The user's job becomes scan-and-adjust rather than fill-from-scratch.
  useEffect(() => {
    if (loading) return;
    const def = pickDefaultProduct(products);
    if (!def) return;
    setItems((prev) => {
      const first = prev[0];
      const pristine =
        prev.length === 1 && first.productId === '' && first.customDescription === '';
      if (!pristine) return prev;
      return [
        {
          ...first,
          productId: def.id,
          sides: defaultSidesFor(def),
          quantity: defaultQuantityFor(def),
        },
      ];
    });
  }, [loading, products]);

  const grouped = useMemo(() => groupProducts(products), [products]);
  const estimate = useMemo(() => estimateOrder(productsById, items), [productsById, items]);
  const hasPricedItem = items.some(
    (it) => it.productId !== '' && it.productId !== CUSTOM && productsById.has(it.productId),
  );
  const hasCustomItem = items.some((it) => it.productId === CUSTOM);

  function updateItem(key, patch) {
    setItems((prev) => prev.map((it) => (it.key === key ? { ...it, ...patch } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeItem(key) {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((it) => it.key !== key)));
  }

  function handleProductChange(key, raw) {
    if (raw === CUSTOM) {
      updateItem(key, { productId: CUSTOM, sides: null });
      return;
    }
    const id = raw === '' ? '' : Number(raw);
    const product = id === '' ? null : productsById.get(id);
    setItems((prev) =>
      prev.map((it) => {
        if (it.key !== key) return it;
        const patch = {
          productId: id,
          sides: product ? defaultSidesFor(product) : null,
        };
        // Smart default: seed a realistic quantity when the row hasn't had one
        // deliberately set yet (still at the initial 1), without clobbering a
        // quantity the user chose before switching products.
        if (product && it.quantity === 1) {
          patch.quantity = defaultQuantityFor(product);
        }
        return { ...it, ...patch };
      }),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError(null);

    const payload = buildPayload({ name, email, phone, notes, items });
    if (payload.items.length === 0) {
      setSubmitError('Add at least one item to your order.');
      return;
    }

    setSubmitting(true);
    try {
      const order = await submitOrder(payload);
      setSuccess({ confirmationCode: order.confirmation_code });
    } catch (err) {
      setSubmitError(
        err.status === 422
          ? 'Some fields look invalid — please double-check and try again.'
          : 'Something went wrong submitting your order. Please try again in a moment.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return <OrderFormSuccess confirmationCode={success.confirmationCode} />;
  }

  return (
    <section id="order" className="order">
      <div className="container">
        <div className="section-head fade-up">
          <div>
            <span className="eyebrow">Place an order</span>
            <h2 className="display">
              Tell us about<br />
              <em>your project.</em>
            </h2>
          </div>
          <p>
            Submit your order below. We'll review it and email a Square invoice
            (usually within 24 hours). Printing starts once the invoice is paid.
          </p>
        </div>

        <form className="order-form fade-up delay-1" onSubmit={handleSubmit} noValidate>
          <fieldset className="order-items" disabled={submitting}>
            <legend>Items</legend>
            {loading && <p className="order-loading">Loading catalog…</p>}
            {catalogError && (
              <p className="order-warning">
                Couldn't load the catalog — you can still send a custom request below.
              </p>
            )}

            {items.map((item, idx) => (
              <ItemRow
                key={item.key}
                item={item}
                index={idx}
                grouped={grouped}
                productsById={productsById}
                onChange={(patch) => updateItem(item.key, patch)}
                onChooseProduct={(raw) => handleProductChange(item.key, raw)}
                onRemove={items.length > 1 ? () => removeItem(item.key) : null}
              />
            ))}

            <button type="button" className="btn btn-arrow order-add" onClick={addItem}>
              + Add another item
            </button>
          </fieldset>

          <label className="order-field">
            <span>Notes <em>(optional)</em></span>
            <textarea
              rows={4}
              placeholder="Anything we should know — paper stock, deadline, references, file format…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={submitting}
            />
          </label>

          <div className="order-contact">
            <p className="order-contact-lead">
              Looks good? Tell us where to send your quote — no account needed.
            </p>
            <div className="order-grid">
              <label className="order-field">
                <span>Your name</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                />
              </label>

              <label className="order-field">
                <span>Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </label>

              <label className="order-field">
                <span>Phone <em>(optional)</em></span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={submitting}
                />
              </label>
            </div>
          </div>

          <div className="order-footer">
            <div className="order-estimate">
              <div className="order-estimate-label">Estimated total</div>
              <div className="order-estimate-amount">
                {hasPricedItem ? formatUSD(estimate) : '—'}
              </div>
              <p className="order-estimate-note">
                {hasCustomItem && !hasPricedItem
                  ? 'Custom jobs are quoted after we review your request.'
                  : 'Final price is set by the owner before your invoice goes out.'}
              </p>
            </div>
            <div className="order-submit-wrap">
              {submitError && <div className="order-error">{submitError}</div>}
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit order →'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function ItemRow({ item, index, grouped, productsById, onChange, onChooseProduct, onRemove }) {
  const isCustom = item.productId === CUSTOM;
  const product = !isCustom && item.productId !== '' ? productsById.get(item.productId) : null;
  const showSides = product && productNeedsSides(product);
  const est = product ? estimateItem(product, item) : null;

  return (
    <div className="order-item">
      <div className="order-item-head">
        <span className="order-item-num">— {String(index + 1).padStart(2, '0')}</span>
        {onRemove && (
          <button type="button" className="order-item-remove" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>

      <div className="order-item-grid">
        <label className="order-field">
          <span>Product</span>
          <select
            required
            value={item.productId}
            onChange={(e) => onChooseProduct(e.target.value)}
          >
            <option value="">Choose a product…</option>
            {grouped.map(([category, list]) => (
              <optgroup key={category} label={category}>
                {list.map((p) => (
                  <option key={p.id} value={p.id}>
                    {productLabel(p)}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={CUSTOM}>Other / describe what you need</option>
          </select>
        </label>

        <label className="order-field order-field-qty">
          <span>Quantity</span>
          <input
            type="number"
            min={1}
            required
            value={item.quantity}
            onChange={(e) => onChange({ quantity: Math.max(1, Number(e.target.value) || 1) })}
          />
        </label>

        {showSides && (
          <label className="order-field order-field-sides">
            <span>Sides</span>
            <select
              value={item.sides ?? 1}
              onChange={(e) => onChange({ sides: Number(e.target.value) })}
            >
              <option value={1}>1-sided</option>
              <option value={2}>2-sided</option>
            </select>
          </label>
        )}
      </div>

      {isCustom && (
        <label className="order-field">
          <span>Describe what you need</span>
          <textarea
            rows={2}
            required
            placeholder="e.g. 20-foot vinyl banner with grommets, finished by Friday"
            value={item.customDescription}
            onChange={(e) => onChange({ customDescription: e.target.value })}
          />
        </label>
      )}

      {est && (
        <div className="order-item-est">
          Line estimate: <strong>{formatUSD(est.lineTotal)}</strong>
        </div>
      )}
    </div>
  );
}

function OrderFormSuccess({ confirmationCode }) {
  return (
    <section id="order" className="order order-success">
      <div className="container">
        <div className="section-head fade-up">
          <div>
            <span className="eyebrow">Order received</span>
            <h2 className="display">
              Thanks —<br />
              <em>we'll be in touch.</em>
            </h2>
          </div>
          <p>
            Your confirmation code is <strong>{confirmationCode}</strong>. Save
            it for your records. We'll review your order and email you a Square
            invoice (typically within 24 hours).
          </p>
        </div>
        <div className="order-success-actions fade-up delay-1">
          <a href="#" className="btn btn-secondary" onClick={() => window.location.reload()}>
            Place another order
          </a>
        </div>
      </div>
    </section>
  );
}

// The most common order for this shop leads with business cards (see the
// services list and pricing). Prefer it as the pre-selected default; fall
// back to the first catalog product so the form always opens with a pick.
function pickDefaultProduct(products) {
  if (!products.length) return null;
  return products.find((p) => /business card/i.test(p.name)) ?? products[0];
}

function groupProducts(products) {
  const map = new Map();
  for (const p of products) {
    if (!map.has(p.category)) map.set(p.category, []);
    map.get(p.category).push(p);
  }
  return Array.from(map.entries());
}

function productLabel(p) {
  return p.variant ? `${p.name} — ${p.variant}` : p.name;
}

function buildPayload({ name, email, phone, notes, items }) {
  const cleanItems = items
    .filter((it) => it.productId === CUSTOM || (it.productId !== '' && it.productId != null))
    .map((it) => {
      if (it.productId === CUSTOM) {
        const description = it.customDescription.trim();
        if (!description) return null;
        return {
          quantity: it.quantity,
          custom_description: description,
        };
      }
      const payload = {
        product_id: it.productId,
        quantity: it.quantity,
      };
      if (it.sides) payload.sides = it.sides;
      return payload;
    })
    .filter(Boolean);

  return {
    order_id: uid(),
    customer_name: name.trim(),
    customer_email: email.trim(),
    customer_phone: phone.trim() || null,
    notes: notes.trim() || null,
    items: cleanItems,
  };
}
