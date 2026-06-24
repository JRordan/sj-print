import { useMemo, useState } from 'react';
import useCatalog from '../hooks/useCatalog.js';
import { submitOrder } from '../api.js';
import {
  defaultSidesFor,
  estimateItem,
  estimateOrder,
  formatUSD,
  productNeedsSides,
} from '../lib/pricing.js';

const CUSTOM = '__custom__';

function emptyItem() {
  return {
    key: crypto.randomUUID(),
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

  const grouped = useMemo(() => groupProducts(products), [products]);
  const estimate = useMemo(() => estimateOrder(productsById, items), [productsById, items]);

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
    updateItem(key, {
      productId: id,
      sides: product ? defaultSidesFor(product) : null,
    });
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

          <div className="order-footer">
            <div className="order-estimate">
              <div className="order-estimate-label">Estimated total</div>
              <div className="order-estimate-amount">{formatUSD(estimate)}</div>
              <p className="order-estimate-note">
                Final price is set by the owner before your invoice goes out.
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
    order_id: crypto.randomUUID(),
    customer_name: name.trim(),
    customer_email: email.trim(),
    customer_phone: phone.trim() || null,
    notes: notes.trim() || null,
    items: cleanItems,
  };
}
