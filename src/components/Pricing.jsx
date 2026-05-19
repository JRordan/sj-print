import { useState } from 'react';
import { pricing } from '../data/content.jsx';

export default function Pricing() {
  const [active, setActive] = useState(0);
  const cat = pricing.categories[active];

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
              onClick={() => setActive(i)}
              className={`pricing-tab-btn${i === active ? ' is-active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="pricing-panel fade-up delay-2">
          <p className="pricing-panel-desc">{cat.description}</p>
          <div className="price-table-scroll">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Item</th>
                  {cat.qtys.map((q) => (
                    <th key={q}>{q}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item) => (
                  <tr key={item.name}>
                    <td className="item-name">{item.name}</td>
                    {item.prices.map((p, i) => (
                      <td key={i} className="item-price">{p}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="pricing-cta-line fade-up delay-3">
          Volume discounts available on larger runs.{' '}
          <a href="#contact" className="btn-arrow btn">Request a quote →</a>
        </p>
      </div>
    </section>
  );
}
