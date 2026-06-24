import { useState } from 'react';
import { pricing } from '../data/content.jsx';

export default function Pricing() {
  const [active, setActive] = useState(0);
  const [sided, setSided] = useState(1);
  const cat = pricing.categories[active];

  const handleTabChange = (i) => {
    setActive(i);
    setSided(1);
  };

  return (
    <section id="pricing">
      <div className="container">
        <div className="section-head fade-up">
          <div>
            <span className="eyebrow">Pricing</span>
            <h2 className="display">
              Honest,<br /><em>competitive</em> rates
            </h2>
          </div>
          <p>{pricing.note}</p>
        </div>

        <div className="pricing-tabs fade-up delay-1">
          {pricing.categories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => handleTabChange(i)}
              className={`pricing-tab-btn${i === active ? ' is-active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="pricing-panel fade-up delay-2">
          <div className="pricing-panel-top">
            <p className="pricing-panel-desc">{cat.description}</p>
            {cat.sides && (
              <div className="sided-toggle">
                <button
                  onClick={() => setSided(1)}
                  className={`sided-btn${sided === 1 ? ' is-active' : ''}`}
                >
                  1-Sided
                </button>
                <button
                  onClick={() => setSided(2)}
                  className={`sided-btn${sided === 2 ? ' is-active' : ''}`}
                >
                  2-Sided
                </button>
              </div>
            )}
          </div>

          <div className="price-table-scroll">
            <table className="price-table">
              <thead>
                <tr>
                  <th>{cat.itemLabel ?? 'Item'}</th>
                  {cat.qtys.map((q) => (
                    <th key={q}>{q}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item, idx) => {
                  if (item.group) {
                    return (
                      <tr key={`group-${idx}`} className="price-group-row">
                        <td colSpan={cat.qtys.length + 1}>{item.group}</td>
                      </tr>
                    );
                  }
                  const prices = cat.sides
                    ? (sided === 2 ? (item.prices2 ?? item.prices1) : item.prices1)
                    : item.prices;
                  return (
                    <tr key={idx}>
                      <td className="item-name">{item.name}</td>
                      {prices.map((p, i) => (
                        <td key={i} className="item-price" data-col={cat.qtys[i]}>{p}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="pricing-cta-line fade-up delay-3">
          Volume discounts available on larger runs.{' '}
          <a href="#order" className="btn-arrow btn">Request a quote →</a>
        </p>
      </div>
    </section>
  );
}
